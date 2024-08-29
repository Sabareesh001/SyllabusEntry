const express = require('express');
const router = express.Router();
const programmeOutcomeController = require('../controllers/programmeOutcomeController');

// GET all programme outcomes
router.get('/programme-outcomes', programmeOutcomeController.getAllProgrammeOutcomes);

// GET a specific programme outcome by ID
router.get('/programme-outcomes/:id', programmeOutcomeController.getProgrammeOutcomeById);

router.get('/programme-outcomes-by-id/:id', programmeOutcomeController.getProgrammeOutcomeByID);
// CREATE a new programme outcome
router.post('/programme-outcomes', programmeOutcomeController.createProgrammeOutcome);

// UPDATE an existing programme outcome
router.put('/programme-outcomes/:id', programmeOutcomeController.updateProgrammeOutcome);

// DELETE a programme outcome
router.delete('/programme-outcomes/:id', programmeOutcomeController.deleteProgrammeOutcome);

module.exports = router;
