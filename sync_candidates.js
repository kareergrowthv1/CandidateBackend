const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

async function getNextCandidateCode(pool, dbName) {
    const [rows] = await pool.query(
        `SELECT candidate_code FROM \`${dbName}\`.college_candidates
     WHERE candidate_code REGEXP '^CAN[0-9]{4,}$'
     ORDER BY CAST(SUBSTRING(candidate_code, 4) AS UNSIGNED) DESC
     LIMIT 1`
    );
    const last = rows[0]?.candidate_code;
    let nextNum = 1;
    if (last) {
        nextNum = parseInt(last.substring(3), 10) + 1;
    }
    return `CAN${String(nextNum).padStart(4, '0')}`;
}

async function sync() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        waitForConnections: true,
        connectionLimit: 5,
    });

    const CANDIDATE_DB = process.env.CANDIDATE_DB_NAME || 'candidates_db';
    const AUTH_DB = 'auth_db'; // Hardcoded based on SuperadminBackend config

    try {
        console.log('Fetching candidates from auth_db.candidate_login...');
        const [authCandidates] = await pool.query(`SELECT * FROM \`${AUTH_DB}\`.candidate_login`);
        console.log(`Found ${authCandidates.length} candidates in auth_db.`);

        for (const cand of authCandidates) {
            const email = cand.email;
            const name = cand.name || 'Candidate';
            const mobile = cand.mobile_number || '';
            const orgId = cand.organization_id || null;
            const candidateId = cand.id;

            // Check if already exists in college_candidates
            const [existing] = await pool.query(
                `SELECT candidate_id FROM \`${CANDIDATE_DB}\`.college_candidates WHERE email = ? LIMIT 1`,
                [email]
            );

            if (existing.length > 0) {
                console.log(`Skipping ${email} - already exists.`);
                continue;
            }

            console.log(`Syncing ${email}...`);
            const code = await getNextCandidateCode(pool, CANDIDATE_DB);
            const now = new Date();

            await pool.query(
                `INSERT INTO \`${CANDIDATE_DB}\`.college_candidates (
          candidate_id, organization_id, candidate_code, candidate_name, email, mobile_number,
          status, created_at, updated_at, candidate_created_at
        ) VALUES (?, ?, ?, ?, ?, ?, 'Active', ?, ?, ?)`,
                [candidateId, orgId, code, name, email, mobile, now, now, cand.created_at || now]
            );
            console.log(`Synced ${email} with code ${code}`);
        }

        console.log('Synchronization complete.');
    } catch (err) {
        console.error('Sync failed:', err);
    } finally {
        await pool.end();
    }
}

sync();
