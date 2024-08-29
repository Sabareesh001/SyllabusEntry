const pool = require('../config/db'); // Adjust the path to your database configuration

// Create a new course PSO mapping
exports.createCoursePsoMapping  = async (req, res) => {
    const { course_outcome, pso, level } = req.body;
    
    try {
        // Check if the mapping already exists
        const [existingMapping] = await pool.query(
            'SELECT id FROM course_pso_mapping WHERE course_outcome = ? AND pso = ?',
            [course_outcome, pso]
        );

        if (existingMapping.length > 0) {
            // Update the existing mapping
            const mappingId = existingMapping[0].id;
            await pool.query(
                'UPDATE course_pso_mapping SET level = ? WHERE id = ?',
                [level, mappingId]
            );
            res.status(200).json({ message: 'Course PSO mapping updated successfully' });
        } else {
            // Insert a new mapping
            const [result] = await pool.query(
                'INSERT INTO course_pso_mapping (course_outcome, pso, level) VALUES (?, ?, ?)',
                [course_outcome, pso, level]
            );
            res.status(201).json({ id: result.insertId, message: 'Course PSO mapping created successfully' });
        }
    } catch (error) {
        console.error('Error creating or updating course PSO mapping:', error);
        res.status(500).json({ message: 'Error creating or updating course PSO mapping' });
    }
};


// Get course PSO mappings by course_outcome
exports.getCoursePsoMappingByOutcome = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM course_pso_mapping WHERE course_outcome = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Course PSO mapping not found' });
        }
        res.json(rows);
    } catch (error) {
        console.error('Error fetching course PSO mapping:', error);
        res.status(500).json({ message: 'Error fetching course PSO mapping' });
    }
};

// Update a course PSO mapping
exports.updateCoursePsoMapping = async (req, res) => {
    const { id } = req.params;
    const { course_outcome, pso, level, status } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE course_pso_mapping SET course_outcome = ?, pso = ?, level = ?, status = ? WHERE id = ?',
            [course_outcome, pso, level, status, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Course PSO mapping not found' });
        }
        res.json({ message: 'Course PSO mapping updated successfully' });
    } catch (error) {
        console.error('Error updating course PSO mapping:', error);
        res.status(500).json({ message: 'Error updating course PSO mapping' });
    }
};

// Delete a course PSO mapping
exports.deleteCoursePsoMapping = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM course_pso_mapping WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Course PSO mapping not found' });
        }
        res.json({ message: 'Course PSO mapping deleted successfully' });
    } catch (error) {
        console.error('Error deleting course PSO mapping:', error);
        res.status(500).json({ message: 'Error deleting course PSO mapping' });
    }
};
