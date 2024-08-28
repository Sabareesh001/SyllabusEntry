const express = require('express');
const router = express.Router();
const courseObjectiveController = require('../controllers/courseObjectiveController')
// Create a new course objective
router.post('/course-objectives', courseObjectiveController.postCourseObjective);
  
  // Read a course objective by ID
  router.get('/course-objectives/:id',courseObjectiveController.getCourseObjectives );
  
  // Update a course objective by ID
  router.put('/course-objectives/:id',courseObjectiveController.updateCourseObjectives);
  
  // Delete a course objective by ID
  router.delete('/course-objectives/:id',courseObjectiveController.deleteCourseObjectives );

  module.exports = router