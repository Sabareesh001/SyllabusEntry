const pool = require('../config/db'); // Use the pool instead of a single connection
const jwt = require('jsonwebtoken'); 

exports.getAllProgrammeOutcomes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM master_programme_outcome');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching programme outcomes:', error);
        res.status(500).json({ message: 'Error fetching programme outcomes' });
    }
};

exports.getProgrammeOutcomeById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM master_programme_outcome WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Programme outcome not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching programme outcome:', error);
        res.status(500).json({ message: 'Error fetching programme outcome' });
    }
};

exports.createProgrammeOutcome = async (req, res) => {
    const { regulation, programme_outcome, status } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO master_programme_outcome (regulation, programme_outcome, status) VALUES (?, ?, ?)', [regulation, programme_outcome, status]);
        res.status(201).json({ id: result.insertId, regulation, programme_outcome, status });
    } catch (error) {
        console.error('Error creating programme outcome:', error);
        res.status(500).json({ message: 'Error creating programme outcome' });
    }
};

exports.updateProgrammeOutcome = async (req, res) => {
    const { id } = req.params;
    const { regulation, programme_outcome, status } = req.body;
    try {
        const [result] = await pool.query('UPDATE master_programme_outcome SET regulation = ?, programme_outcome = ?, status = ? WHERE id = ?', [regulation, programme_outcome, status, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Programme outcome not found' });
        }
        res.json({ message: 'Programme outcome updated successfully' });
    } catch (error) {
        console.error('Error updating programme outcome:', error);
        res.status(500).json({ message: 'Error updating programme outcome' });
    }
};

exports.deleteProgrammeOutcome = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM master_programme_outcome WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Programme outcome not found' });
        }
        res.json({ message: 'Programme outcome deleted successfully' });
    } catch (error) {
        console.error('Error deleting programme outcome:', error);
        res.status(500).json({ message: 'Error deleting programme outcome' });
    }
};