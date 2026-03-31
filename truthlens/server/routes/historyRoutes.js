import express from 'express';
import { getHistory, createHistory, deleteHistory } from '../controllers/historyController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(protect, getHistory)
  .post(protect, upload.single('media'), createHistory);

router.route('/:id').delete(protect, deleteHistory);

export default router;
