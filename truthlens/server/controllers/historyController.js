import History from '../models/History.js';

export const getHistory = async (req, res) => {
  try {
    const history = await History.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHistory = async (req, res) => {
  try {
    const historyItem = await History.findById(req.params.id);
    if (!historyItem) return res.status(404).json({ message: 'Record not found' });
    if (historyItem.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    
    await historyItem.deleteOne();
    res.json({ message: 'Record removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createHistory = async (req, res) => {
  try {
    // Expect req.file from multer array setup
    const { aiProbability, realProbability, detectedPlatform, explanation } = req.body;
    
    // Assign mock data if body variables aren't passed by client yet
    const probability = Number(aiProbability) || Math.floor(Math.random() * 100);
    const riskLevel = probability > 70 ? 'High Risk' : probability > 30 ? 'Medium Risk' : 'Low Risk';

    const historyItem = await History.create({
      userId: req.user._id,
      fileName: req.file ? req.file.originalname : 'unknown-file',
      fileType: req.file ? req.file.mimetype : 'unknown-type',
      fileUrl: req.file ? `/uploads/${req.file.filename}` : '',
      aiProbability: probability,
      realProbability: 100 - probability,
      riskLevel,
      detectedPlatform: detectedPlatform || 'Unknown',
      explanation: explanation || 'Analysis generated automatically.'
    });

    res.status(201).json(historyItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
