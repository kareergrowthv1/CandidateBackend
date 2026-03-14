require('dotenv').config();
const mysql = require('mysql2/promise');

async function check() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    try {
        const candidateId = '339e57de-5bd1-4dc7-9f6f-2940c43a184f';
        const [rows] = await pool.query(
            "SELECT * FROM `candidates_db`.college_candidates WHERE candidate_id = ?",
            [candidateId]
        );
        console.log('Candidate found:', rows.length > 0);
        if (rows.length > 0) {
            console.log('Candidate details:', JSON.stringify(rows[0], null, 2));
        } else {
            const [all] = await pool.query("SELECT * FROM `candidates_db`.college_candidates LIMIT 5");
            console.log('Other candidates in DB:', all.length);
            all.forEach(c => console.log(`- ${c.candidate_name} (${c.candidate_id})`));
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

check();
