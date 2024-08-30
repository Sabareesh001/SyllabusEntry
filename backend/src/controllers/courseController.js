const pool = require('../config/db'); // Use the pool instead of a single connection
const jwt = require('jsonwebtoken') 


exports.postCourse = async (req, res) => {
    const { course_name, course_code, lecture, tutorial, practical, credit, regulation, department, semester } = req.body;
  
    try {
      const [result] = await pool.query(
        `INSERT INTO master_courses (course_name, course_code, lecture, tutorial, practical, credit, regulation,  department, semester)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [course_name, course_code, lecture, tutorial, practical, credit, regulation, department, semester]
      );
  
      res.status(201).json({ message:"Successfully Added Course" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

// API endpoint for micro-updates
exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const fieldsToUpdate = req.body; // Contains only the fields that need to be updated

  // Define the valid columns that can be updated in the 'master_courses' table
  const validColumns = [
    'course_name',
    'course_code',
    'lecture',
    'tutorial',
    'practical',
    'credit',
    'regulation',
    'department',
    'semester',
    'References',
    'status',
  ];

  // Filter the incoming fields to only include valid columns
  const updateFields = Object.keys(fieldsToUpdate)
    .filter((field) => validColumns.includes(field))
    .reduce((obj, key) => {
      obj[key] = fieldsToUpdate[key];
      return obj;
    }, {});

  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  // Create SQL SET clause dynamically based on updateFields
  const setClause = Object.keys(updateFields)
  .map((field) => `\`${field}\` = ?`)
  .join(', ');


  const values = [...Object.values(updateFields), id]; // Append 'id' at the end for the WHERE clause

  try {
    console.log(`UPDATE master_courses
       SET ${setClause}
       WHERE id = ?`)
    const [result] = await pool.query(
      `UPDATE master_courses
       SET ${setClause}
       WHERE id = ?`,
      values
    );

    if (result.affectedRows > 0) {
      res.json({ message: 'Course updated successfully' });
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.deleteCourse = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await pool.query('DELETE FROM master_courses WHERE id = ?', [id]);
  
      if (result.affectedRows > 0) {
        res.json({ message: 'Course deleted successfully' });
      } else {
        res.status(404).json({ error: 'Course not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  exports.getCourses = async (req, res) => {
    const { department,regulation,semester } = req.query;
    
    try {
      const [rows] = await pool.query('SELECT * FROM master_courses WHERE department = ? AND regulation = ? AND semester = ?', [department,regulation,semester]);
  
      if (rows.length > 0) {
        res.json(rows);
      } else {
        res.status(404).json({ error: 'Course not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  exports.getCoursesById = async (req, res) => {
    const { id} = req.query;
    
    try {
      const [rows] = await pool.query('SELECT * FROM master_courses WHERE id = ?', [id]);
  
      if (rows.length > 0) {
        res.json(rows);
      } else {
        res.status(404).json({ error: 'Course not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }