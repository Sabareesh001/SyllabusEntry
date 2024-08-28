const pool = require('../config/db'); // Use the pool instead of a single connection
const jwt = require('jsonwebtoken') 

exports.getHodDetails = async(req,res)=>{
    try {
        const { userId } = req;
        const hodDetailsQuery = `SELECT * FROM master_hod WHERE faculty=?`
        const [results] = await pool.query(hodDetailsQuery,[userId]);
        res.json(results)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
   
}

exports.getRoles = async (req, res) => {
    const { userId } = req;

    const query = `
    SELECT DISTINCT role
    FROM (
        SELECT 'coe' AS role
        FROM master_coe
        WHERE faculty = ?
        UNION
        SELECT 'hod' AS role
        FROM master_hod
        WHERE faculty = ?
        UNION
        SELECT 'hod' AS role
        FROM master_faculty
        JOIN master_hod ON master_hod.faculty = master_faculty.id
        WHERE master_faculty.id = ?
        UNION
        SELECT 'faculty' AS role
        FROM master_faculty
        WHERE id = ?
    ) AS roles_table;
    `;

    try {
        const [results] = await pool.query(query, [userId, userId, userId, userId]);
        // Convert results to list format
        const roles = results.map(row => row.role);
        res.json({ roles });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.login = async(req,res)=>{
    const {email} = req.body;
    const getUserDetailsQuery = `SELECT * FROM master_faculty WHERE email  = ?`;
    try {
        const[results] = await pool.query(getUserDetailsQuery,[email]);
        const token  = jwt.sign({userData:results},'sembit001',{expiresIn:'1h'});
        res.json(token)
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}