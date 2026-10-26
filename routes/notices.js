import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import Notice from '../models/Notice.js';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Ensure upload directory exists for local fallback
const uploadDir = path.join(__dirname, '../uploads/notices');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer memory storage (keeps buffer in RAM for Cloudinary or disk fallback)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Only accept PDF files
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;
  if (ext === '.pdf' || mime === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF documents are allowed.'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024 // 25MB max
  },
  fileFilter
});

// Helper to format file size
const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return 'PDF';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

// =========================================================================
// 1. GET ALL NOTICES (Public & Admin)
// =========================================================================
router.get('/', async (req, res) => {
  try {
    const { category, search, pinned } = req.query;
    const filter = {};

    if (category && category !== 'All' && category !== 'all') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }

    if (pinned === 'true') {
      filter.pinned = true;
    }

    if (search && search.trim()) {
      const q = search.trim();
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { noticeNo: { $regex: q, $options: 'i' } },
        { audience: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    const notices = await Notice.find(filter).sort({ pinned: -1, createdAt: -1 });

    res.json({
      success: true,
      count: notices.length,
      notices
    });
  } catch (err) {
    console.error('Error fetching notices:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve notices.',
      error: err.message
    });
  }
});

// =========================================================================
// 2. GET SINGLE NOTICE BY ID
// =========================================================================
router.get('/:id', async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found.' });
    }
    res.json({ success: true, notice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// =========================================================================
// 3. DOWNLOAD NOTICE PDF
// =========================================================================
router.get('/:id/download', async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found.' });
    }

    // 1. If stored in Cloudinary or external HTTPS URL, redirect to CDN
    if (notice.pdfUrl && (notice.pdfUrl.includes('cloudinary') || (!notice.pdfUrl.includes('localhost') && notice.pdfUrl.startsWith('http')))) {
      return res.redirect(notice.pdfUrl);
    }

    // 2. Check if file is stored locally in uploads/notices
    let filePath = '';
    if (notice.pdfUrl && notice.pdfUrl.includes('/uploads/notices/')) {
      const filename = notice.pdfUrl.split('/uploads/notices/').pop();
      filePath = path.join(uploadDir, filename);
    } else if (notice.pdfFileName) {
      filePath = path.join(uploadDir, notice.pdfFileName);
    }

    if (filePath && fs.existsSync(filePath)) {
      return res.download(filePath, notice.pdfFileName || 'PM_SHRI_Notice.pdf');
    }

    // 3. If file not found and URL is localhost, do NOT redirect to broken localhost
    return res.status(404).json({
      success: false,
      message: 'Notice PDF file not found on server or storage.'
    });
  } catch (err) {
    console.error('Error initiating download:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// =========================================================================
// 4. CREATE NEW NOTICE (Admin Form with PDF Upload)
// =========================================================================
router.post('/', upload.single('noticePdf'), async (req, res) => {
  try {
    const {
      title,
      noticeNo,
      category = 'General',
      audience = 'All Students & Guardians',
      publishDate,
      pinned,
      description
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Notice title is required.'
      });
    }

    if (!req.file && !req.body.pdfUrl) {
      return res.status(400).json({
        success: false,
        message: 'Notice PDF file is required.'
      });
    }

    let pdfUrl = '';
    let pdfFileName = 'Notice.pdf';
    let pdfFileSize = 'PDF Document';

    if (req.file) {
      pdfFileName = req.file.originalname;
      pdfFileSize = formatFileSize(req.file.size);

      // Attempt upload to Cloudinary (permanent storage for Render/cloud)
      if (process.env.CLOUDINARY_CLOUD_NAME) {
        try {
          const uploadToCloudinary = (buffer) => {
            return new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                {
                  folder: 'pm_shri_school/notices',
                  resource_type: 'raw',
                  use_filename: true,
                  unique_filename: true
                },
                (error, result) => {
                  if (error) return reject(error);
                  resolve(result);
                }
              );
              stream.end(buffer);
            });
          };

          const cloudRes = await uploadToCloudinary(req.file.buffer);
          pdfUrl = cloudRes.secure_url;
        } catch (cloudErr) {
          console.warn('Cloudinary upload failed, falling back to local disk:', cloudErr.message);
        }
      }

      // Local disk fallback if Cloudinary was not used or failed
      if (!pdfUrl) {
        const cleanOriginal = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e6);
        const filename = `${uniquePrefix}_${cleanOriginal}`;
        const localPath = path.join(uploadDir, filename);
        fs.writeFileSync(localPath, req.file.buffer);

        const host = req.get('host') || 'localhost:5000';
        const protocol = req.protocol || 'http';
        pdfUrl = `${protocol}://${host}/uploads/notices/${filename}`;
      }
    } else if (req.body.pdfUrl) {
      pdfUrl = req.body.pdfUrl;
      pdfFileName = req.body.pdfFileName || 'Notice.pdf';
      pdfFileSize = req.body.pdfFileSize || 'PDF';
    }

    const formattedDate = publishDate && publishDate.trim()
      ? publishDate
      : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const generatedNoticeNo = noticeNo && noticeNo.trim()
      ? noticeNo.trim()
      : `PMS/NOT/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`;

    const newNotice = new Notice({
      title: title.trim(),
      noticeNo: generatedNoticeNo,
      category,
      audience: audience.trim() || 'All Students',
      publishDate: formattedDate,
      pdfUrl,
      pdfFileName,
      pdfFileSize,
      pinned: pinned === 'true' || pinned === true,
      description: description ? description.trim() : ''
    });

    const savedNotice = await newNotice.save();

    res.status(201).json({
      success: true,
      message: 'Notice published successfully to public portal and notice board!',
      notice: savedNotice
    });
  } catch (err) {
    console.error('Error creating notice:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to create notice.',
      error: err.message
    });
  }
});

// =========================================================================
// 5. DELETE NOTICE
// =========================================================================
router.delete('/:id', async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found.' });
    }

    // Try deleting physical file if hosted locally
    if (notice.pdfUrl && notice.pdfUrl.includes('/uploads/notices/')) {
      const filename = notice.pdfUrl.split('/uploads/notices/').pop();
      const filePath = path.join(uploadDir, filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (unlinkErr) {
          console.warn('Could not delete local PDF file:', unlinkErr.message);
        }
      }
    }

    await Notice.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Notice and associated document removed successfully.'
    });
  } catch (err) {
    console.error('Error deleting notice:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// =========================================================================
// 6. TOGGLE PIN STATUS
// =========================================================================
router.patch('/:id/pin', async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found.' });
    }

    notice.pinned = !notice.pinned;
    await notice.save();

    res.json({
      success: true,
      message: `Notice ${notice.pinned ? 'pinned to top' : 'unpinned'} successfully.`,
      pinned: notice.pinned,
      notice
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
