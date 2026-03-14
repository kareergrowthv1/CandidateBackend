/**
 * Migration script to add salary_range and is_it columns to superadmin_db.jobs
 * Run: node add_job_filters.js
 */
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mysql = require('mysql2/promise');

async function migrate() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD,
        database: 'superadmin_db',
        waitForConnections: true,
        connectionLimit: 1,
    });

    console.log('🚀 Altering superadmin_db.jobs table...');
    const conn = await pool.getConnection();

    try {
        // Add salary_range
        try {
            await conn.query(`ALTER TABLE jobs ADD COLUMN salary_range VARCHAR(50) DEFAULT NULL AFTER experience_range`);
            console.log('✅ Column added: salary_range');
        } catch (e) {
            if (e.code === 'ER_DUP_FIELDNAME') console.log('ℹ️ Column already exists: salary_range');
            else throw e;
        }

        // Add is_it
        try {
            await conn.query(`ALTER TABLE jobs ADD COLUMN is_it TINYINT(1) DEFAULT 1 AFTER salary_range`);
            console.log('✅ Column added: is_it');
        } catch (e) {
            if (e.code === 'ER_DUP_FIELDNAME') console.log('ℹ️ Column already exists: is_it');
            else throw e;
        }

        // Optional: Update existing jobs with some random data for testing
        await conn.query("UPDATE jobs SET salary_range = '6-12', is_it = 1 WHERE title LIKE '%Developer%' OR title LIKE '%Engineer%' OR title LIKE '%Manager%'");
        await conn.query("UPDATE jobs SET salary_range = '3-6', is_it = 0 WHERE title LIKE '%Designer%' OR title LIKE '%Analyst%'");
        console.log('✅ Values initialized for existing jobs');

    } catch (err) {
        console.error('❌ Migration failed:', err.message);
    } finally {
        conn.release();
        await pool.end();
    }
}

migrate();
