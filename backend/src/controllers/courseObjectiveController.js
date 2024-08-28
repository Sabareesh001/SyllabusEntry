
const pool = require('../config/db'); // Use the pool instead of a single connection
const jwt = require('jsonwebtoken') 

exports.postCourseObjective = async (req, res) => {
    const { course, objective, status } = req.body;
  
    try {
      const [result] = await pool.query(
        `INSERT INTO master_course_objectives (course, objective, status)
         VALUES (?, ?, ?)`,
        [course, objective, status]
      );
  
      res.status(201).json({ id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

exports.getCourseObjectives = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [rows] = await pool.query('SELECT * FROM master_course_objectives WHERE course = ?', [id]);
  
      if (rows.length > 0) {
        res.json(rows);
      } else {
        res.status(404).json({ error: 'Course objective not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  exports.updateCourseObjectives = async (req, res) => {
    const { id } = req.params;
    const { course, objective, status } = req.body;
  
    try {
      // Prepare dynamic query components
      let updateFields = [];
      let updateValues = [];
  
      if (course !== undefined) {
        updateFields.push('course = ?');
        updateValues.push(course);
      }
      if (objective !== undefined) {
        updateFields.push('objective = ?');
        updateValues.push(objective);
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
        UPDATE master_course_objectives
        SET ${updateFields.join(', ')}
        WHERE id = ?
      `;
  
      // Add the id at the end of the updateValues array
      updateValues.push(id);
  
      // Execute the query
      const [result] = await pool.query(query, updateValues);
  
      if (result.affectedRows > 0) {
        res.json({ message: 'Course objective updated successfully' });
      } else {
        res.status(404).json({ error: 'Course objective not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.deleteCourseObjectives = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await pool.query('DELETE FROM master_course_objectives WHERE id = ?', [id]);
  
      if (result.affectedRows > 0) {
        res.json({ message: 'Course objective deleted successfully' });
      } else {
        res.status(404).json({ error: 'Course objective not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }