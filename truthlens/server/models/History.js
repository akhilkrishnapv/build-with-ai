import mongoose from 'mongoose';

const HistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileUrl: { type: String, required: true },
  aiProbability: { type: Number, required: true },
  realProbability: { type: Number, required: true },
  riskLevel: { type: String, enum: ['Low Risk', 'Medium Risk', 'High Risk'], required: true },
  detectedPlatform: { type: String },
  explanation: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('History', HistorySchema);
