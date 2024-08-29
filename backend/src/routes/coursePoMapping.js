const express = require('express');
const router = express.Router();
const coursePoMappingController = require('../controllers/coursePoMappingController');

// Routes for course_po_mapping
router.get('/course-po-mappings', coursePoMappingController.getAllCoursePoMappings);
router.get('/course-po-mappings/:id', coursePoMappingController.getCoursePoMappingById);
router.post('/course-po-mappings', coursePoMappingController.createCoursePoMapping);
router.put('/course-po-mappings/:id', coursePoMappingController.updateCoursePoMapping);
router.delete('/course-po-mappings/:id', coursePoMappingController.deleteCoursePoMapping);

module.exports = router;
