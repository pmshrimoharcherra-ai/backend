import mongoose from 'mongoose';

const holidaySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Number, // day of month e.g. 2, 15, or start day
      required: true
    },
    endDate: {
      type: Number, // optional end day if multi-day vacation
      default: null
    },
    dateDisplay: {
      type: String, // e.g. "02", "18 – 28", "25 Dec – 01 Jan"
      default: ''
    },
    month: {
      type: Number, // 0 to 11 (0=Jan, 1=Feb, ..., 9=Oct, 11=Dec)
      required: true
    },
    monthName: {
      type: String, // e.g. "October", "OCT"
      default: ''
    },
    year: {
      type: Number,
      required: true,
      default: 2026
    },
    dayOfWeek: {
      type: String, // e.g. "Friday", "Monday"
      default: ''
    },
    type: {
      type: String, // 'national', 'state', 'school', 'special'
      enum: ['national', 'state', 'school', 'special'],
      default: 'school'
    },
    category: {
      type: String, // 'National Holiday', 'State Holiday', 'School Vacation', 'Special Observance'
      default: 'School Holiday'
    },
    description: {
      type: String,
      default: ''
    },
    isClosed: {
      type: Boolean, // whether school is closed
      default: true
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

holidaySchema.virtual('id').get(function () {
  return this._id.toHexString();
});
holidaySchema.set('toJSON', { virtuals: true });
holidaySchema.set('toObject', { virtuals: true });

export default mongoose.model('Holiday', holidaySchema);
