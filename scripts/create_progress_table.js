const { pool, DB_NAME } = require('/Users/ifocus/Documents/Systemmindz/CandidateBackend/src/config/db');
const dotenv = require('dotenv');
dotenv.config({ path: '/Users/ifocus/Documents/Systemmindz/CandidateBackend/.env' });

async function createTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS ${DB_NAME}.candidate_course_points (
            id INT AUTO_INCREMENT PRIMARY KEY,
            candidate_id VARCHAR(36) NOT NULL,
            course_id VARCHAR(255) NOT NULL,
            overall_percentage DECIMAL(5, 2) DEFAULT 0.00,
            points INT DEFAULT 0,
            module_progress JSON NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE KEY candidate_course (candidate_id, course_id),
            INDEX idx_candidate (candidate_id),
            INDEX idx_course (course_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    try {
        await pool.query(sql);
        console.log('Table candidate_course_points created or already exists.');
    } catch (err) {
        console.error('Error creating table:', err);
    } finally {
        process.exit();
    }
}

createTable();
