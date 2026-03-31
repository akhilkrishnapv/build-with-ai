import mongoose from 'mongoose';

const CompareSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  leftMediaUrl: { type: String, required: true },
  rightMediaUrl: { type: String, required: true },
  leftFileName: { type: String },
  rightFileName: { type: String },
  comparisonSummary: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Compare', CompareSchema);
