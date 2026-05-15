import mongoose from 'mongoose';

const conciergeFaqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: 'general',
      trim: true,
      lowercase: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

conciergeFaqSchema.index({ isActive: 1, isFeatured: 1, sortOrder: 1, createdAt: -1 });
conciergeFaqSchema.index({ question: 'text', answer: 'text', category: 'text' });

export default mongoose.model('ConciergeFaq', conciergeFaqSchema);
