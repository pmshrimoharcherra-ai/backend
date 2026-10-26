import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GalleryFolder',
      required: true
    },
    folderName: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '',
      trim: true
    },
    caption: {
      type: String,
      default: '',
      trim: true
    },
    mediaType: {
      type: String,
      enum: ['image', 'video'],
      default: 'image'
    },
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    format: {
      type: String,
      default: ''
    },
    bytes: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0
    },
    academicYear: {
      type: String,
      default: '2026-2027'
    }
  },
  {
    timestamps: true
  }
);

galleryItemSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
galleryItemSchema.set('toJSON', { virtuals: true });
galleryItemSchema.set('toObject', { virtuals: true });

export default mongoose.model('GalleryItem', galleryItemSchema);
