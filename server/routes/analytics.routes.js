const express = require('express');
const router = express.Router();
const analyticsCtrl = require('../controllers/analytics.controller');

// record scan
router.post('/scan', analyticsCtrl.recordScan);

// metrics
router.get('/metrics/total-scans', analyticsCtrl.getTotalScans);
router.get('/metrics/unique-users', analyticsCtrl.getUniqueUsers);
router.get('/metrics/performance', analyticsCtrl.getPerformance);

module.exports = router;
