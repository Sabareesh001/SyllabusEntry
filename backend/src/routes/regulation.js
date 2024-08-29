const express = require('express');
const router = express.Router();
const regulationController = require('../controllers/regulationController');

// Get all regulations
router.get('/regulations', regulationController.getAllRegulations);

// Get a regulation by ID
router.get('/regulations/:id', regulationController.getRegulationById);

// Create a new regulation
router.post('/regulations', regulationController.createRegulation);

// Update an existing regulation
router.put('/regulations/:id', regulationController.updateRegulation);

// Delete a regulation
router.delete('/regulations/:id', regulationController.deleteRegulation);

module.exports = router;
