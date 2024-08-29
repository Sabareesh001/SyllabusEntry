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

  exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    const { course_name, course_code, lecture, tutorial, practical, credit, regulation, department, semester } = req.body;
  
    try {
      const [result] = await pool.query(
        `UPDATE master_courses
         SET course_name = ?, course_code = ?, lecture = ?, tutorial = ?, practical = ?, credit = ?, regulation = ?, department = ?, semester = ?
         WHERE id = ?`,
        [course_name, course_code, lecture, tutorial, practical, credit, regulation, department, semester,  id]
      );
  
      if (result.affectedRows > 0) {
        res.json({ message: 'Course updated successfully' });
      } else {
        res.status(404).json({ error: 'Course not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

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