const { pool, DB_NAME } = require('/Users/ifocus/Documents/Systemmindz/CandidateBackend/src/config/db');
const dotenv = require('dotenv');
dotenv.config({ path: '/Users/ifocus/Documents/Systemmindz/CandidateBackend/.env' });

async function alterTable() {
    const sql = `
        ALTER TABLE ${DB_NAME}.candidate_course_points
        ADD COLUMN metadata JSON;
    `;
    
    try {
        await pool.query(sql);
        console.log('Added metadata column to candidate_course_points.');
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log('Metadata column already exists.');
        } else {
            console.error('Error altering table:', err);
        }
    } finally {
        process.exit();
    }
}

alterTable();
