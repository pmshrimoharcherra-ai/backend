import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import GalleryFolder from '../models/GalleryFolder.js';
import GalleryItem from '../models/GalleryItem.js';

dotenv.config();

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer memory storage (files stored in RAM buffer for direct Cloudinary streaming)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB max for video/image uploads
  }
});

// Default initial folders and gallery items if empty
const DEFAULT_FOLDERS = [
  {
    name: 'School Campus & Infrastructure',
    slug: 'school-campus-infrastructure',
    description: 'Smart classrooms, PM SHRI science labs, library, computer center, and campus grounds',
    coverImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    itemCount: 4
  },
  {
    name: 'Annual Sports & Athletics 2026',
    slug: 'annual-sports-athletics-2026',
    description: 'Track and field events, football matches, relay race, and athletic celebrations',
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    itemCount: 3
  },
  {
    name: 'Cultural Events & Celebrations',
    slug: 'cultural-events-celebrations',
    description: 'Rabindra Jayanti, Kokborok Day, Republic Day parade, and inter-house dance competitions',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    itemCount: 3
  },
  {
    name: 'Science & Atal Tinkering Lab',
    slug: 'science-atal-tinkering-lab',
    description: 'Robotics projects, 3D printing, practical chemistry experiments, and physics models',
    coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    itemCount: 3
  }
];

const DEFAULT_ITEMS = [
  // Campus
  {
    folderSlug: 'school-campus-infrastructure',
    title: 'Main School Building & Grounds',
    caption: 'Modern two-storey academic wing with solar rooftop installations',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    publicId: 'default_campus_1',
    format: 'jpg'
  },
  {
    folderSlug: 'school-campus-infrastructure',
    title: 'PM SHRI Smart Classroom',
    caption: 'Interactive digital flat panels and ICT-enabled learning environment',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    publicId: 'default_campus_2',
    format: 'jpg'
  },
  {
    folderSlug: 'school-campus-infrastructure',
    title: 'Central Reading Library',
    caption: 'Over 5,000 curriculum and reference titles for students and teachers',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
    publicId: 'default_campus_3',
    format: 'jpg'
  },
  {
    folderSlug: 'school-campus-infrastructure',
    title: 'Junior Playground & Sports Arena',
    caption: 'Multipurpose ground for outdoor athletics, football, and morning assembly',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
    publicId: 'default_campus_4',
    format: 'jpg'
  },

  // Sports
  {
    folderSlug: 'annual-sports-athletics-2026',
    title: 'Inter-House 100m Sprint Finals',
    caption: 'Senior secondary students competing for the Gold Trophy',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    publicId: 'default_sports_1',
    format: 'jpg'
  },
  {
    folderSlug: 'annual-sports-athletics-2026',
    title: 'Football Championship Trophy Presentation',
    caption: 'Headmaster and sports faculty presenting medals to winners',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    publicId: 'default_sports_2',
    format: 'jpg'
  },
  {
    folderSlug: 'annual-sports-athletics-2026',
    title: 'Morning March Past & Flag Protocol',
    caption: 'House contingents saluting the tricolor on the annual athletic meet',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
    publicId: 'default_sports_3',
    format: 'jpg'
  },

  // Cultural
  {
    folderSlug: 'cultural-events-celebrations',
    title: 'Traditional Dance Performance',
    caption: 'Students performing Tripura folk dance on Annual Day',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    publicId: 'default_cultural_1',
    format: 'jpg'
  },
  {
    folderSlug: 'cultural-events-celebrations',
    title: 'Independence Day Choir & Patriotic Songs',
    caption: 'School chorus team presenting inspiring anthems during celebration',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    publicId: 'default_cultural_2',
    format: 'jpg'
  },
  {
    folderSlug: 'cultural-events-celebrations',
    title: 'Drama & Theatre Performance',
    caption: 'Student-directed stage play addressing environmental awareness',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=1200&q=80',
    publicId: 'default_cultural_3',
    format: 'jpg'
  },

  // Science
  {
    folderSlug: 'science-atal-tinkering-lab',
    title: 'Robotics & Sensor Demonstration',
    caption: 'Students assembling automated obstacle-detecting rovers',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
    publicId: 'default_science_1',
    format: 'jpg'
  },
  {
    folderSlug: 'science-atal-tinkering-lab',
    title: 'Hands-on Chemistry Practical',
    caption: 'Class XI Science students conducting titration experiments under guidance',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
    publicId: 'default_science_2',
    format: 'jpg'
  },
  {
    folderSlug: 'science-atal-tinkering-lab',
    title: 'Solar Energy & Innovation Model',
    caption: 'Working science exhibit displaying renewable energy principles',
    mediaType: 'image',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    publicId: 'default_science_3',
    format: 'jpg'
  }
];

// Helper: Seed defaults if empty
const ensureDefaultsSeeded = async () => {
  const folderCount = await GalleryFolder.countDocuments();
  if (folderCount === 0) {
    const createdFolders = await GalleryFolder.insertMany(DEFAULT_FOLDERS);
    const folderMap = new Map();
    createdFolders.forEach((f) => folderMap.set(f.slug, f));

    const itemsToInsert = DEFAULT_ITEMS.map((item) => {
      const folder = folderMap.get(item.folderSlug);
      return {
        folderId: folder ? folder._id : createdFolders[0]._id,
        folderName: folder ? folder.name : createdFolders[0].name,
        title: item.title,
        caption: item.caption,
        mediaType: item.mediaType,
        url: item.url,
        publicId: item.publicId,
        format: item.format,
        academicYear: '2026-2027'
      };
    });

    await GalleryItem.insertMany(itemsToInsert);
    console.log(` Seeded ${createdFolders.length} Gallery Folders and ${itemsToInsert.length} media items.`);
  }
};

// ==========================================
// 1. FOLDER ENDPOINTS
// ==========================================

// GET /api/gallery/folders - List all folders (supports optional ?parentId filter)
router.get('/folders', async (req, res) => {
  try {
    await ensureDefaultsSeeded();
    const { parentId } = req.query;
    const filter = {};
    if (parentId !== undefined) {
      if (parentId === 'root' || parentId === 'null' || parentId === '') {
        filter.parentId = null;
      } else {
        filter.parentId = parentId;
      }
    }

    const folders = await GalleryFolder.find(filter).sort({ createdAt: -1 });

    // Ensure item counts & covers stay strictly accurate
    const foldersWithCounts = await Promise.all(
      folders.map(async (folder) => {
        const directCount = await GalleryItem.countDocuments({ folderId: folder._id });
        const subfolderCount = await GalleryFolder.countDocuments({ parentId: folder._id });

        let totalItemsCount = directCount;
        if (subfolderCount > 0) {
          const subfolders = await GalleryFolder.find({ parentId: folder._id }, '_id');
          const subfolderIds = subfolders.map((sf) => sf._id);
          const subItemsCount = await GalleryItem.countDocuments({ folderId: { $in: subfolderIds } });
          totalItemsCount = directCount + subItemsCount;
        }

        let cover = folder.coverImage;
        if (!cover || cover === '') {
          // Fallback to the first image uploaded into this folder
          let firstItem = await GalleryItem.findOne({ folderId: folder._id, mediaType: 'image' }).sort({ createdAt: 1 });
          if (!firstItem && subfolderCount > 0) {
            const subfolders = await GalleryFolder.find({ parentId: folder._id }, '_id');
            const subfolderIds = subfolders.map((sf) => sf._id);
            firstItem = await GalleryItem.findOne({ folderId: { $in: subfolderIds }, mediaType: 'image' }).sort({ createdAt: 1 });
          }
          if (firstItem) cover = firstItem.url;
        }
        return {
          ...folder.toJSON(),
          itemCount: directCount,
          totalItemsCount,
          subfolderCount,
          coverImage: cover || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80'
        };
      })
    );

    res.json(foldersWithCounts);
  } catch (error) {
    console.error('Error fetching gallery folders:', error);
    res.status(500).json({ message: 'Error retrieving gallery folders', error: error.message });
  }
});

// POST /api/gallery/folders - Create new folder or subfolder
router.post('/folders', async (req, res) => {
  try {
    const { name, description, coverImage, category, parentId } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Folder name is required' });
    }

    const trimmedName = name.trim();
    let baseSlug = trimmedName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    if (!baseSlug) baseSlug = `folder-${Date.now()}`;

    // Ensure unique slug
    let slug = baseSlug;
    let counter = 1;
    while (await GalleryFolder.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    let parentFolder = null;
    if (parentId && parentId !== 'null' && parentId !== 'root') {
      parentFolder = await GalleryFolder.findById(parentId);
    }

    const folder = new GalleryFolder({
      name: trimmedName,
      slug,
      description: description ? description.trim() : '',
      coverImage: coverImage ? coverImage.trim() : '',
      itemCount: 0,
      academicYear: '2026-2027',
      category: category ? category.trim() : (parentFolder ? parentFolder.category : 'Clubs & Activities'),
      parentId: parentFolder ? parentFolder._id : null,
      parentName: parentFolder ? parentFolder.name : ''
    });

    const saved = await folder.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating folder:', error);
    res.status(500).json({ message: 'Error creating folder', error: error.message });
  }
});

// PUT /api/gallery/folders/:id - Update folder
router.put('/folders/:id', async (req, res) => {
  try {
    const { name, description, coverImage, category } = req.body;
    const update = {};
    if (name) update.name = name.trim();
    if (description !== undefined) update.description = description.trim();
    if (coverImage !== undefined) update.coverImage = coverImage;
    if (category !== undefined) update.category = category.trim();

    const updated = await GalleryFolder.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    // Also update cached folderName on items if renamed
    if (name) {
      await GalleryItem.updateMany({ folderId: req.params.id }, { folderName: name.trim() });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating folder', error: error.message });
  }
});

// POST /api/gallery/upload-cover - Upload a cover/thumbnail directly to Cloudinary
router.post('/upload-cover', upload.single('coverImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No thumbnail image file provided' });
    }

    const uploadStream = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'pm_shri_school/covers',
            transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto:good' }]
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const result = await uploadStream();
    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error('Error uploading folder cover to Cloudinary:', error);
    res.status(500).json({ message: 'Failed to upload folder cover', error: error.message });
  }
});

// POST /api/gallery/folders/:id/cover - Upload & set cover for specific folder
router.post('/folders/:id/cover', upload.single('coverImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const folder = await GalleryFolder.findById(req.params.id);
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    const uploadStream = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'pm_shri_school/covers',
            transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto:good' }]
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const result = await uploadStream();
    folder.coverImage = result.secure_url;
    await folder.save();

    res.json({
      success: true,
      message: 'Folder thumbnail updated successfully',
      folder
    });
  } catch (error) {
    console.error('Error updating folder cover:', error);
    res.status(500).json({ message: 'Failed to update folder cover', error: error.message });
  }
});

// DELETE /api/gallery/folders/:id - Delete folder (and any subfolders) and their media items
router.delete('/folders/:id', async (req, res) => {
  try {
    const folder = await GalleryFolder.findById(req.params.id);
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    // Find all subfolders under this folder
    const subfolders = await GalleryFolder.find({ parentId: req.params.id });
    const allFolderIds = [req.params.id, ...subfolders.map((sf) => sf._id)];

    // Find all items in folder and any subfolders to delete from Cloudinary
    const items = await GalleryItem.find({ folderId: { $in: allFolderIds } });
    for (const item of items) {
      if (item.publicId && !item.publicId.startsWith('default_')) {
        try {
          await cloudinary.uploader.destroy(item.publicId, {
            resource_type: item.mediaType === 'video' ? 'video' : 'image'
          });
        } catch (cErr) {
          console.warn(`Could not delete Cloudinary asset ${item.publicId}:`, cErr.message);
        }
      }
    }

    // Remove from MongoDB
    await GalleryItem.deleteMany({ folderId: { $in: allFolderIds } });
    await GalleryFolder.deleteMany({ _id: { $in: allFolderIds } });

    res.json({ message: `Folder "${folder.name}" and all contents removed successfully.` });
  } catch (error) {
    console.error('Error deleting folder:', error);
    res.status(500).json({ message: 'Error deleting folder', error: error.message });
  }
});

// ==========================================
// 2. MEDIA ITEMS ENDPOINTS
// ==========================================

// GET /api/gallery/items - List media items (filter by folderId, mediaType, includeSubfolders)
router.get('/items', async (req, res) => {
  try {
    await ensureDefaultsSeeded();
    const { folderId, mediaType, limit, includeSubfolders } = req.query;
    const filter = {};

    if (folderId && folderId !== 'all') {
      if (includeSubfolders === 'true') {
        const subfolders = await GalleryFolder.find({ parentId: folderId }, '_id');
        const allIds = [folderId, ...subfolders.map((sf) => sf._id)];
        filter.folderId = { $in: allIds };
      } else {
        filter.folderId = folderId;
      }
    }
    if (mediaType && mediaType !== 'all') {
      filter.mediaType = mediaType;
    }

    let query = GalleryItem.find(filter).sort({ createdAt: -1 });
    if (limit) {
      query = query.limit(Number(limit));
    }

    const items = await query.exec();
    res.json(items);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    res.status(500).json({ message: 'Error fetching gallery items', error: error.message });
  }
});

// POST /api/gallery/upload - Upload file directly to Cloudinary and save to MongoDB
router.post('/upload', upload.single('mediaFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { folderId, title, caption } = req.body;
    if (!folderId) {
      return res.status(400).json({ message: 'Destination folderId is required' });
    }

    const targetFolder = await GalleryFolder.findById(folderId);
    if (!targetFolder) {
      return res.status(404).json({ message: 'Target folder does not exist' });
    }

    // Determine media type
    const mime = req.file.mimetype;
    const isVideo = mime.startsWith('video/');
    const mediaType = isVideo ? 'video' : 'image';

    // Upload to Cloudinary using upload_stream
    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: `pm_shri_school/${targetFolder.slug}`,
            resource_type: isVideo ? 'video' : 'image',
            transformation: isVideo ? [] : [{ quality: 'auto:good' }]
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(fileBuffer);
      });
    };

    const cloudRes = await uploadToCloudinary(req.file.buffer);

    // Save to MongoDB
    const newItem = new GalleryItem({
      folderId: targetFolder._id,
      folderName: targetFolder.name,
      title: title ? title.trim() : req.file.originalname.replace(/\.[^/.]+$/, ''),
      caption: caption ? caption.trim() : '',
      mediaType,
      url: cloudRes.secure_url,
      publicId: cloudRes.public_id,
      format: cloudRes.format || (isVideo ? 'mp4' : 'jpg'),
      bytes: cloudRes.bytes || req.file.size,
      width: cloudRes.width || 0,
      height: cloudRes.height || 0,
      duration: cloudRes.duration || 0,
      academicYear: '2026-2027'
    });

    const savedItem = await newItem.save();

    // Update folder item count and cover if empty (first image becomes thumbnail)
    const currentCount = await GalleryItem.countDocuments({ folderId: targetFolder._id });
    const updateFolder = { itemCount: currentCount };
    if ((!targetFolder.coverImage || targetFolder.coverImage === '') && mediaType === 'image') {
      updateFolder.coverImage = cloudRes.secure_url;
    }
    await GalleryFolder.findByIdAndUpdate(targetFolder._id, updateFolder);

    // If this was inside a subfolder and parent folder has no cover, also update parent
    if (targetFolder.parentId && mediaType === 'image') {
      const parentFolder = await GalleryFolder.findById(targetFolder.parentId);
      if (parentFolder && (!parentFolder.coverImage || parentFolder.coverImage === '')) {
        await GalleryFolder.findByIdAndUpdate(targetFolder.parentId, {
          coverImage: cloudRes.secure_url
        });
      }
    }

    res.status(201).json({
      success: true,
      message: `${mediaType === 'video' ? 'Video' : 'Image'} uploaded successfully to "${targetFolder.name}"!`,
      item: savedItem
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// PUT /api/gallery/items/:id - Update media title, caption, or folder
router.put('/items/:id', async (req, res) => {
  try {
    const { title, caption, folderId } = req.body;
    const item = await GalleryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Media item not found' });
    }

    if (title !== undefined) item.title = title.trim();
    if (caption !== undefined) item.caption = caption.trim();

    if (folderId && folderId !== item.folderId.toString()) {
      const newFolder = await GalleryFolder.findById(folderId);
      if (newFolder) {
        // Adjust counts
        const oldCount = await GalleryItem.countDocuments({ folderId: item.folderId });
        await GalleryFolder.findByIdAndUpdate(item.folderId, {
          itemCount: Math.max(0, oldCount - 1)
        });
        const newCount = await GalleryItem.countDocuments({ folderId });
        await GalleryFolder.findByIdAndUpdate(folderId, {
          itemCount: newCount + 1
        });
        item.folderId = newFolder._id;
        item.folderName = newFolder.name;
      }
    }

    const updatedItem = await item.save();
    res.json({
      success: true,
      message: 'Media details updated successfully',
      item: updatedItem
    });
  } catch (error) {
    console.error('Error updating media item:', error);
    res.status(500).json({ message: 'Error updating media item', error: error.message });
  }
});

// DELETE /api/gallery/items/:id - Delete a media item
router.delete('/items/:id', async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Media item not found' });
    }

    // Delete from Cloudinary if not default asset
    if (item.publicId && !item.publicId.startsWith('default_')) {
      try {
        await cloudinary.uploader.destroy(item.publicId, {
          resource_type: item.mediaType === 'video' ? 'video' : 'image'
        });
      } catch (cErr) {
        console.warn(`Cloudinary deletion warning:`, cErr.message);
      }
    }

    // Delete from MongoDB
    await GalleryItem.findByIdAndDelete(req.params.id);

    // Update folder count and cover if the deleted item was the cover
    const remainingCount = await GalleryItem.countDocuments({ folderId: item.folderId });
    const targetFolder = await GalleryFolder.findById(item.folderId);
    if (targetFolder && targetFolder.coverImage === item.url) {
      const nextFirstImage = await GalleryItem.findOne({
        folderId: item.folderId,
        mediaType: 'image'
      }).sort({ createdAt: 1 });
      await GalleryFolder.findByIdAndUpdate(item.folderId, {
        itemCount: remainingCount,
        coverImage: nextFirstImage ? nextFirstImage.url : ''
      });
    } else {
      await GalleryFolder.findByIdAndUpdate(item.folderId, { itemCount: remainingCount });
    }

    res.json({ message: 'Media item deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('Error deleting media item:', error);
    res.status(500).json({ message: 'Error deleting media item', error: error.message });
  }
});

export default router;
