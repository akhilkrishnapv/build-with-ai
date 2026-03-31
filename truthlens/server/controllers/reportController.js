import Report from '../models/Report.js';

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user._id })
       .populate('linkedHistoryId')
       .sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const reportItem = await Report.findById(req.params.id);
    if (!reportItem) return res.status(404).json({ message: 'Record not found' });
    if (reportItem.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    
    await reportItem.deleteOne();
    res.json({ message: 'Report removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReport = async (req, res) => {
  try {
    const { title, content, linkedHistoryId } = req.body;

    const report = await Report.create({
      userId: req.user._id,
      title: title || 'Deepfake Detection Final Report',
      content: content || 'The media analyzed reveals significant inconsistencies aligned with generative neural network artifacts.',
      linkedHistoryId: linkedHistoryId || null
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
