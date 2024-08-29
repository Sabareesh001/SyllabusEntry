const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController')
// Create a new course
router.post('/courses',courseController.postCourse );
  
  // Read a course by ID
  router.get('/courses',courseController.getCourses );
  router.get('/coursesById',courseController.getCoursesById );
  
  // Update a course by ID
  router.put('/courses/:id',courseController.updateCourse );
  
  // Delete a course by ID
  router.delete('/courses/:id', courseController.deleteCourse);

  module.exports = router