import mongoose from 'mongoose';

const galleryFolderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    description: {
      type: String,
      default: '',
      trim: true
    },
    coverImage: {
      type: String,
      default: ''
    },
    itemCount: {
      type: Number,
      default: 0
    },
    academicYear: {
      type: String,
      default: '2026-2027'
    },
    category: {
      type: String,
      default: 'Clubs & Activities',
      trim: true
    }
  },
  {
    timestamps: true
  }
);

galleryFolderSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
galleryFolderSchema.set('toJSON', { virtuals: true });
galleryFolderSchema.set('toObject', { virtuals: true });

export default mongoose.model('GalleryFolder', galleryFolderSchema);
