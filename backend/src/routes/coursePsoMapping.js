const express = require('express');
const router = express.Router();
const coursePsoMappingController = require('../controllers/coursePsoMappingController');

// Create a new course PSO mapping
router.post('/course-pso-mappings', coursePsoMappingController.createCoursePsoMapping);

// Get course PSO mappings by course_outcome
router.get('/course-pso-mappings/:id', coursePsoMappingController.getCoursePsoMappingByOutcome);

// Update a course PSO mapping
router.put('/course-pso-mappings/:id', coursePsoMappingController.updateCoursePsoMapping);

// Delete a course PSO mapping
router.delete('/course-pso-mappings/:id', coursePsoMappingController.deleteCoursePsoMapping);

module.exports = router;
