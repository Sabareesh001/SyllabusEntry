const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController')

router.get('/report',reportController.getPDF)
router.get('/reportData/:courseId/:regulationId/:departmentId',reportController.getData)
module.exports = router