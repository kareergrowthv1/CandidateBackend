const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

async function alterAndSync() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    const CANDIDATE_DB = process.env.CANDIDATE_DB_NAME || 'candidates_db';

    try {
        console.log(`Allowing NULL for organization_id in ${CANDIDATE_DB}.college_candidates...`);
        await pool.query(`ALTER TABLE \`${CANDIDATE_DB}\`.college_candidates MODIFY organization_id VARCHAR(255) NULL`);
        console.log('Table altered successfully.');
    } catch (err) {
        console.error('Alter failed:', err);
    } finally {
        await pool.end();
    }
}

alterAndSync();
