const pool = require('../config/db'); // Use the pool instead of a single connection
const jwt = require('jsonwebtoken'); 
// Create
exports.createCourseOutcome = async (req, res) => {
  const { course, course_outcome, unit, syllabus, hours, status } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO master_course_outcome (course, course_outcome, unit, syllabus, hours, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [course, course_outcome, unit, syllabus, hours, status]
    );

    res.status(201).json({ message: 'Course outcome created successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read (All)
exports.getAllCourseOutcomes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM master_course_outcome');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read (Single)
exports.getCourseOutcomeByCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM master_course_outcome WHERE course = ?', [id]);
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: 'Course outcome not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getCourseOutcomeById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM master_course_outcome WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ error: 'Course outcome not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.updateCourseOutcome = async (req, res) => {
  const { id } = req.params;
  const { course, course_outcome, unit, syllabus, hours, status } = req.body;

  try {
    // Prepare dynamic query components
    let updateFields = [];
    let updateValues = [];

    if (course !== undefined) {
      updateFields.push('course = ?');
      updateValues.push(course);
    }
    if (course_outcome !== undefined) {
      updateFields.push('course_outcome = ?');
      updateValues.push(course_outcome);
    }
    if (unit !== undefined) {
      updateFields.push('unit = ?');
      updateValues.push(unit);
    }
    if (syllabus !== undefined) {
      updateFields.push('syllabus = ?');
      updateValues.push(syllabus);
    }
    if (hours !== undefined) {
      updateFields.push('hours = ?');
      updateValues.push(hours);
    }
    if (status !== undefined) {
      updateFields.push('status = ?');
      updateValues.push(status);
    }

    // Ensure there's something to update
    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields provided for update' });
    }

    // Construct the final query
    const query = `
      UPDATE master_course_outcome
      SET ${updateFields.join(', ')}
      WHERE id = ?
    `;

    // Add the id at the end of the updateValues array
    updateValues.push(id);

    // Execute the query
    const [result] = await pool.query(query, updateValues);

    if (result.affectedRows > 0) {
      res.json({ message: 'Course outcome updated successfully' });
    } else {
      res.status(404).json({ error: 'Course outcome not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
exports.deleteCourseOutcome = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM master_course_outcome WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      res.json({ message: 'Course outcome deleted successfully' });
    } else {
      res.status(404).json({ error: 'Course outcome not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
