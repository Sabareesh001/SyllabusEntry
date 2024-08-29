const pool = require('../config/db');

// Get all regulations
exports.getAllRegulations = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM master_regulation');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching regulations:', error);
        res.status(500).json({ message: 'Error fetching regulations' });
    }
};

// Get a regulation by ID
exports.getRegulationById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM master_regulation WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Regulation not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching regulation:', error);
        res.status(500).json({ message: 'Error fetching regulation' });
    }
};

// Create a new regulation
exports.createRegulation = async (req, res) => {
    const { regulation, status } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO master_regulation (regulation, status) VALUES (?, ?)', [regulation, status]);
        res.status(201).json({ id: result.insertId, regulation, status });
    } catch (error) {
        console.error('Error creating regulation:', error);
        res.status(500).json({ message: 'Error creating regulation' });
    }
};

// Update an existing regulation
exports.updateRegulation = async (req, res) => {
    const { id } = req.params;
    const { regulation, status } = req.body;
    try {
        const [result] = await pool.query('UPDATE master_regulation SET regulation = ?, status = ? WHERE id = ?', [regulation, status, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Regulation not found' });
        }
        res.json({ message: 'Regulation updated successfully' });
    } catch (error) {
        console.error('Error updating regulation:', error);
        res.status(500).json({ message: 'Error updating regulation' });
    }
};

// Delete a regulation
exports.deleteRegulation = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM master_regulation WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Regulation not found' });
        }
        res.json({ message: 'Regulation deleted successfully' });
    } catch (error) {
        console.error('Error deleting regulation:', error);
        res.status(500).json({ message: 'Error deleting regulation' });
    }
};
