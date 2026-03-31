import express from 'express';
import { getCompareSessions, createCompareSession, deleteCompareSession } from '../controllers/compareController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(protect, getCompareSessions)
  .post(protect, upload.array('media', 2), createCompareSession);

router.route('/:id').delete(protect, deleteCompareSession);

export default router;
