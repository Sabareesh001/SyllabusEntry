// routes.js
const express = require('express');
const router = express.Router();
const courseOutcomeController = require('../controllers/courseOutcomeController')

router.post('/course-outcomes', courseOutcomeController.createCourseOutcome);
router.get('/course-outcomes', courseOutcomeController.getAllCourseOutcomes);
router.get('/course-outcomes/:id', courseOutcomeController.getCourseOutcomeByCourse);
router.get('/course-outcomes-by-id/:id', courseOutcomeController.getCourseOutcomeById);
router.put('/course-outcomes/:id', courseOutcomeController.updateCourseOutcome);
router.delete('/course-outcomes/:id', courseOutcomeController.deleteCourseOutcome);

module.exports = router;
