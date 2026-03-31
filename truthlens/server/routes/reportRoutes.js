import express from 'express';
import { getReports, createReport, deleteReport } from '../controllers/reportController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getReports)
  .post(protect, createReport);

router.route('/:id').delete(protect, deleteReport);

export default router;
