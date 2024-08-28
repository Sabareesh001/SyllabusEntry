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
    SELECT * FROM master_users WHERE  id =?
    `;

    try {
        const [results] = await pool.query(query, [userId]);
        // Convert results to list format
        if(results.length>0){
            res.json({ role:'user' });
        }
        else{
            res.status(401).json({role:'unauthorized'})
        }
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.login = async(req,res)=>{
    const {email} = req.body;
    const getUserDetailsQuery = `SELECT * FROM master_users WHERE email  = ?`;
    try {
        const[results] = await pool.query(getUserDetailsQuery,[email]);
        
        const token  = jwt.sign({userData:results},'sembit001',{expiresIn:'1h'});
        res.json(token)
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}