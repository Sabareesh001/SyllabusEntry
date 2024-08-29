const pool = require('../config/db');

// Get all programme-specific outcomes
exports.getAllProgrammeSpecificOutcomes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM master_programme_specific_outcome');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching programme-specific outcomes:', error);
        res.status(500).json({ message: 'Error fetching programme-specific outcomes' });
    }
};

// Get a programme-specific outcome by ID
exports.getProgrammeSpecificOutcomeById = async (req, res) => {
    const { id ,regulation} = req.params;
    console.log(req.params)
    try {
        const [rows] = await pool.query('SELECT * FROM master_programme_specific_outcome WHERE department = ? AND regulation = ?', [id,regulation]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Programme-specific outcome not found' });
        }
        res.json(rows);
    } catch (error) {
        console.error('Error fetching programme-specific outcome:', error);
        res.status(500).json({ message: 'Error fetching programme-specific outcome' });
    }
};

// Create a new programme-specific outcome
exports.createProgrammeSpecificOutcome = async (req, res) => {
    const { department, programme_specific_outcome,regulation } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO master_programme_specific_outcome (department, programme_specific_outcome,regulation) VALUES (?, ?,?)', [department, programme_specific_outcome,regulation]);
        res.status(201).json({ id: result.insertId, department, programme_specific_outcome });
    } catch (error) {
        console.error('Error creating programme-specific outcome:', error);
        res.status(500).json({ message: 'Error creating programme-specific outcome' });
    }
};

// Update an existing programme-specific outcome
exports.updateProgrammeSpecificOutcome = async (req, res) => {
    const { id } = req.params;
    const { department, programme_specific_outcome,regulation } = req.body;
    try {
        const [result] = await pool.query('UPDATE master_programme_specific_outcome SET department = ?, programme_specific_outcome = ? ,regulation=? WHERE id = ?', [department, programme_specific_outcome, regulation ,id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Programme-specific outcome not found' });
        }
        res.json({ message: 'Programme-specific outcome updated successfully' });
    } catch (error) {
        console.error('Error updating programme-specific outcome:', error);
        res.status(500).json({ message: 'Error updating programme-specific outcome' });
    }
};

// Delete a programme-specific outcome
exports.deleteProgrammeSpecificOutcome = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM master_programme_specific_outcome WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Programme-specific outcome not found' });
        }
        res.json({ message: 'Programme-specific outcome deleted successfully' });
    } catch (error) {
        console.error('Error deleting programme-specific outcome:', error);
        res.status(500).json({ message: 'Error deleting programme-specific outcome' });
    }
};
