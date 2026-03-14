const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';

async function check() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const coursesCol = db.collection('Courses');
        const courses = await coursesCol.find({}).toArray();
        console.log('Available Courses:', JSON.stringify(courses, null, 2));
    } catch (e) {
        console.error('❌', e);
    } finally {
        await client.close();
    }
}

check();
