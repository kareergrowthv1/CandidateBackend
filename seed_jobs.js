/**
 * Seed 20 jobs into superadmin_db.jobs
 * Run: node seed_jobs.js
 */
require('dotenv').config();
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'radhe123',
    database: 'superadmin_db',
    waitForConnections: true,
    connectionLimit: 5,
});

const ADMIN_USER_ID = '00000000-0000-0000-0000-000000000001';
const ADMIN_EMAIL = 'admin@kareergrowth.in';
const CLIENT_SCHEMA = 'systemmindz';
const CLIENT_NAME = 'Systemmindz Pvt Ltd';

const jobs = [
    { title: 'Senior React Developer', position_type: 'Full-time', location: 'Bengaluru', experience_range: '3-5 years', salary_range: '12-25', is_it: 1, description: 'Build scalable React apps with TypeScript, Redux, and REST APIs.' },
    { title: 'Node.js Backend Engineer', position_type: 'Full-time', location: 'Hyderabad', experience_range: '2-4 years', salary_range: '6-12', is_it: 1, description: 'Design and implement RESTful microservices using Node.js and MySQL.' },
    { title: 'Python Data Scientist', position_type: 'Full-time', location: 'Pune', experience_range: '2-5 years', salary_range: '12-25', is_it: 1, description: 'Build ML models and data pipelines using Python, Pandas, and scikit-learn.' },
    { title: 'Full Stack Developer', position_type: 'Full-time', location: 'Chennai', experience_range: '3-6 years', salary_range: '12-25', is_it: 1, description: 'Develop full-stack features using React, Node.js, and PostgreSQL.' },
    { title: 'DevOps Engineer', position_type: 'Full-time', location: 'Remote', experience_range: '2-5 years', salary_range: '12-25', is_it: 1, description: 'Manage CI/CD pipelines, Docker, Kubernetes on AWS infrastructure.' },
    { title: 'UI/UX Designer', position_type: 'Contract', location: 'Mumbai', experience_range: '2-4 years', salary_range: '6-12', is_it: 1, description: 'Design user-centric interfaces using Figma. Work closely with dev teams.' },
    { title: 'Java Spring Boot Developer', position_type: 'Full-time', location: 'Noida', experience_range: '3-6 years', salary_range: '12-25', is_it: 1, description: 'Develop enterprise microservices using Java Spring Boot and Kafka.' },
    { title: 'Cloud Architect (AWS)', position_type: 'Full-time', location: 'Bengaluru', experience_range: '5-8 years', salary_range: '25+', is_it: 1, description: 'Lead cloud architecture and migration initiatives on AWS.' },
    { title: 'QA Automation Engineer', position_type: 'Full-time', location: 'Hyderabad', experience_range: '2-4 years', salary_range: '6-12', is_it: 1, description: 'Design and maintain automation test suites using Selenium and Cypress.' },
    { title: 'Mobile Developer (React Native)', position_type: 'Full-time', location: 'Remote', experience_range: '2-4 years', salary_range: '6-12', is_it: 1, description: 'Build cross-platform mobile apps using React Native and Redux.' },
    { title: 'Product Manager – Tech', position_type: 'Full-time', location: 'Bengaluru', experience_range: '4-7 years', salary_range: '12-25', is_it: 1, description: 'Define product roadmap and work with engineering teams on delivery.' },
    { title: 'Machine Learning Engineer', position_type: 'Full-time', location: 'Pune', experience_range: '3-6 years', salary_range: '12-25', is_it: 1, description: 'Develop and deploy NLP and computer vision models at scale.' },
    { title: 'Cybersecurity Analyst', position_type: 'Full-time', location: 'Delhi', experience_range: '2-5 years', salary_range: '6-12', is_it: 1, description: 'Monitor, protect and respond to security incidents across cloud infrastructure.' },
    { title: 'Data Engineer (Spark/Kafka)', position_type: 'Full-time', location: 'Bengaluru', experience_range: '3-5 years', salary_range: '12-25', is_it: 1, description: 'Build real-time data pipelines using Apache Spark, Kafka, and Airflow.' },
    { title: 'Blockchain Developer', position_type: 'Contract', location: 'Remote', experience_range: '2-4 years', salary_range: '12-25', is_it: 1, description: 'Build smart contracts on Ethereum and Solana using Solidity and Rust.' },
    { title: 'Android Developer (Kotlin)', position_type: 'Full-time', location: 'Chennai', experience_range: '2-4 years', salary_range: '6-12', is_it: 1, description: 'Develop high-performance Android apps using Kotlin and Jetpack Compose.' },
    { title: 'iOS Developer (Swift)', position_type: 'Full-time', location: 'Mumbai', experience_range: '2-4 years', salary_range: '6-12', is_it: 1, description: 'Build iOS apps using Swift, SwiftUI, and Core Data.' },
    { title: 'Database Administrator (PostgreSQL)', position_type: 'Full-time', location: 'Hyderabad', experience_range: '3-6 years', salary_range: '6-12', is_it: 1, description: 'Manage, optimize, and secure PostgreSQL databases at scale.' },
    { title: 'Technical Lead – Frontend', position_type: 'Full-time', location: 'Bengaluru', experience_range: '6-10 years', salary_range: '25+', is_it: 1, description: 'Lead a frontend team building design systems and scalable apps in React.' },
    { title: 'Internship – Software Engineer', position_type: 'Internship', location: 'Remote', experience_range: '0-1 years', salary_range: '3-6', is_it: 1, description: 'Work on real-world projects. Ideal for final-year students in CS/IT.' },
    { title: 'Marketing Manager', position_type: 'Full-time', location: 'Mumbai', experience_range: '3-6 years', salary_range: '6-12', is_it: 0, description: 'Lead digital marketing campaigns, SEO, and social media strategy for our brand.' },
    { title: 'HR Executive', position_type: 'Full-time', location: 'Pune', experience_range: '2-4 years', salary_range: '3-6', is_it: 0, description: 'Handle recruitment, onboarding, and employee relations for our growing team.' },
    { title: 'Sales Representative', position_type: 'Full-time', location: 'Delhi', experience_range: '1-3 years', salary_range: '3-6', is_it: 0, description: 'Identify new business opportunities and build relationships with potential clients.' },
];

async function seed() {
    console.log('🌱 Seeding 20 jobs into superadmin_db.jobs...\n');
    const conn = await pool.getConnection();
    try {
        let inserted = 0;
        for (const job of jobs) {
            const id = uuidv4();
            await conn.query(
                `INSERT INTO superadmin_db.jobs 
          (id, client_schema, client_name, admin_user_id, admin_email, title, description, position_type, location, experience_range, salary_range, is_it, status, is_active)
         VALUES (UNHEX(REPLACE(?, '-', '')), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'OPEN', 1)`,
                [id, CLIENT_SCHEMA, CLIENT_NAME, ADMIN_USER_ID, ADMIN_EMAIL, job.title, job.description, job.position_type, job.location, job.experience_range, job.salary_range, job.is_it]
            );
            console.log(`  ✅ Inserted: ${job.title}`);
            inserted++;
        }
        console.log(`\n✅ Done! Inserted ${inserted} jobs.`);
    } catch (err) {
        console.error('❌ Seed failed:', err.message);
    } finally {
        conn.release();
        await pool.end();
    }
}

seed();
