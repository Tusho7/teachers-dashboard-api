import express from 'express';
import { getMonthlyRevenue } from '../controllers/studentsController.js';

const router = express.Router();

router.get('/monthly-revenue', getMonthlyRevenue);

export default router;
