const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

async function checkUser() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    const CANDIDATE_DB = process.env.CANDIDATE_DB_NAME || 'candidates_db';

    try {
        const [rows] = await pool.query(`SELECT * FROM \`${CANDIDATE_DB}\`.college_candidates WHERE email = 'sharan@exe.in'`);
        console.log(JSON.stringify(rows, null, 2));
    } catch (err) {
        console.error('Check failed:', err);
    } finally {
        await pool.end();
    }
}

checkUser();
