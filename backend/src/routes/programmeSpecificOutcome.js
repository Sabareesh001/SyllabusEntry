const express = require('express');
const router = express.Router();
const programmeSpecificOutcomeController = require('../controllers/programmeSpecificOutcomeController')

router.get('/programme-specific-outcomes', programmeSpecificOutcomeController.getAllProgrammeSpecificOutcomes);
router.get('/programme-specific-outcomes/:id/:regulation', programmeSpecificOutcomeController.getProgrammeSpecificOutcomeById);
router.post('/programme-specific-outcomes', programmeSpecificOutcomeController.createProgrammeSpecificOutcome);
router.put('/programme-specific-outcomes/:id', programmeSpecificOutcomeController.updateProgrammeSpecificOutcome);
router.delete('/programme-specific-outcomes/:id', programmeSpecificOutcomeController.deleteProgrammeSpecificOutcome);

module.exports = router;