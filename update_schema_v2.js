const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

async function updateSchema() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    const CANDIDATE_DB = process.env.CANDIDATE_DB_NAME || 'candidates_db';

    try {
        console.log('Adding new columns to college_candidates...');

        // Add columns if they don't exist
        const [columns] = await pool.query(`SHOW COLUMNS FROM \`${CANDIDATE_DB}\`.college_candidates`);
        const columnNames = columns.map(c => c.Field);

        if (!columnNames.includes('current_role')) {
            await pool.query(`ALTER TABLE \`${CANDIDATE_DB}\`.college_candidates ADD COLUMN current_role VARCHAR(255) DEFAULT 'Software Developer'`);
        }
        if (!columnNames.includes('location')) {
            await pool.query(`ALTER TABLE \`${CANDIDATE_DB}\`.college_candidates ADD COLUMN location VARCHAR(255) DEFAULT 'Pune, India'`);
        }
        if (!columnNames.includes('academic_year')) {
            await pool.query(`ALTER TABLE \`${CANDIDATE_DB}\`.college_candidates ADD COLUMN academic_year VARCHAR(100) DEFAULT 'Final Year'`);
        }

        console.log('Columns added successfully.');

        // Update the existing backfilled candidate with some data
        console.log('Updating existing candidates with defaults...');
        await pool.query(`
      UPDATE \`${CANDIDATE_DB}\`.college_candidates 
      SET 
        current_role = 'Software Developer',
        location = 'Pune, India',
        academic_year = 'Final Year',
        skills = '["React", "Node.js", "Tailwind", "Next.js"]'
      WHERE skills IS NULL OR current_role = 'Software Developer'
    `);

        console.log('Existing candidates updated.');
    } catch (err) {
        console.error('Update failed:', err);
    } finally {
        await pool.end();
    }
}

updateSchema();
