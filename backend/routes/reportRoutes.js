const express = require('express');
const router = express.Router();
const { getMonthlyReport, downloadReport } = require('../controllers/reportController');
const { protect } = require('../middlewares/authMiddleware');

// GET /api/reports/monthly?month=4&year=2025
router.get('/monthly', protect, getMonthlyReport);

// GET /api/reports/download?month=4&year=2025&format=pdf
router.get('/download', protect, downloadReport);

module.exports = router;
