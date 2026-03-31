import Compare from '../models/Compare.js';

export const getCompareSessions = async (req, res) => {
  try {
    const sessions = await Compare.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCompareSession = async (req, res) => {
  try {
    const sessionItem = await Compare.findById(req.params.id);
    if (!sessionItem) return res.status(404).json({ message: 'Record not found' });
    if (sessionItem.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    await sessionItem.deleteOne();
    res.json({ message: 'Compare session removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCompareSession = async (req, res) => {
  try {
    const files = req.files || [];
    // We expect two files from multer array('media', 2)
    const leftFile = files[0];
    const rightFile = files[1];

    if (!leftFile || !rightFile) {
       return res.status(400).json({ message: 'Two media files are required for comparison' });
    }

    const { comparisonSummary } = req.body;

    const session = await Compare.create({
      userId: req.user._id,
      leftMediaUrl: `/uploads/${leftFile.filename}`,
      rightMediaUrl: `/uploads/${rightFile.filename}`,
      leftFileName: leftFile.originalname,
      rightFileName: rightFile.originalname,
      comparisonSummary: comparisonSummary || 'Left media shows 90% AI artifacts; Right media is authentic.'
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
