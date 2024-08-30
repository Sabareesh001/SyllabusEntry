const pool = require('../config/db'); // Use the pool instead of a single connection

// Get all course PO mappings
exports.getAllCoursePoMappings = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM course_po_mapping');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching course PO mappings:', error);
        res.status(500).json({ message: 'Error fetching course PO mappings' });
    }
};

// Get course PO mapping by ID
exports.getCoursePoMappingById = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const [rows] = await pool.query('SELECT * FROM course_po_mapping WHERE course_outcome = ?', [id]);
        if (rows.length === 0) {
            return res.status(204).json({message: 'Course PO mapping not found' });
        }
        res.json(rows);
    } catch (error) {
        console.error('Error fetching course PO mapping:', error);
        res.status(500).json({ message: 'Error fetching course PO mapping' });
    }
};

// Create a new course PO mapping
exports.createCoursePoMapping = async (req, res) => {
    const mappings = req.body; // Assume req.body is an array of mappings
    try {
        for (const mapping of mappings) {
            const { course_outcome, po, level } = mapping;

            // Check if the mapping already exists
            const [existingMapping] = await pool.query(
                'SELECT * FROM course_po_mapping WHERE course_outcome = ? AND po = ?',
                [course_outcome, po]
            );

            if (existingMapping.length > 0) {
                // Update the existing mapping
                await pool.query(
                    'UPDATE course_po_mapping SET level = ? WHERE course_outcome = ? AND po = ?',
                    [level, course_outcome, po]
                );
            } else {
                // Insert a new mapping
                await pool.query(
                    'INSERT INTO course_po_mapping (course_outcome, po, level) VALUES (?, ?, ?)',
                    [course_outcome, po, level]
                );
            }
        }

        res.status(200).json({ message: 'Course PO mappings processed successfully' });
    } catch (error) {
        console.error('Error processing course PO mappings:', error);
        res.status(500).json({ message: 'Error processing course PO mappings' });
    }
};

// Update course PO mapping
exports.updateCoursePoMapping = async (req, res) => {
    const { id } = req.params;
    const { course, po, status } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE course_po_mapping SET course = ?, po = ?, status = ? WHERE id = ?',
            [course, po, status, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Course PO mapping not found' });
        }
        res.json({ message: 'Course PO mapping updated successfully' });
    } catch (error) {
        console.error('Error updating course PO mapping:', error);
        res.status(500).json({ message: 'Error updating course PO mapping' });
    }
};

// Delete course PO mapping
exports.deleteCoursePoMapping = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM course_po_mapping WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Course PO mapping not found' });
        }
        res.json({ message: 'Course PO mapping deleted successfully' });
    } catch (error) {
        console.error('Error deleting course PO mapping:', error);
        res.status(500).json({ message: 'Error deleting course PO mapping' });
    }
};
