const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Configuration
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COLLECTION_NAME = 'Courses';

async function migrate() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // 1. Read and parse module.txt
        const filePath = path.join(__dirname, 'module.txt');
        const content = fs.readFileSync(filePath, 'utf8');
        
        const sections = content.split(/------------------------------------------------/);
        const parsedModules = [];

        for (const section of sections) {
            const lines = section.trim().split('\n').filter(l => l.trim().length > 0);
            if (lines.length === 0) continue;

            const titleMatch = lines[0].match(/^\d+\.\s*(.+)$/);
            if (!titleMatch) continue;

            const moduleTitle = titleMatch[1].trim().replace(/\s*\(Introduction\)$/, '');
            const lessonTitles = lines.slice(1)
                .map(l => l.trim().startsWith('-') ? l.trim().substring(1).trim() : null)
                .filter(l => l !== null);

            parsedModules.push({
                title: moduleTitle,
                lessons: lessonTitles
            });
        }

        console.log(`Parsed ${parsedModules.length} modules from module.txt`);

        // 2. Fetch Java course
        const course = await collection.findOne({ slug: 'java' });
        if (!course) {
            console.error('Java course not found!');
            return;
        }

        const existingModules = course.modules || [];
        const helloWorldModule = existingModules.find(m => m.title === 'Hello World');
        
        if (!helloWorldModule) {
            console.warn('Hello World module not found, using first module as anchor.');
        }

        const newModulesArray = [];
        
        // Always keep the original Hello World if it exists
        if (helloWorldModule) {
            newModulesArray.push(helloWorldModule);
        } else if (existingModules.length > 0) {
            newModulesArray.push(existingModules[0]);
        }

        // 3. Add new modules starting from index 1 (Variables, etc.)
        // parsedModules[0] is HelloWorld, so we skip it (as per user request "dont touch module 1")
        for (let i = 1; i < parsedModules.length; i++) {
            const pMod = parsedModules[i];
            const moduleId = new ObjectId();
            
            const moduleDoc = {
                _id: moduleId,
                courseId: course._id,
                order: i + 1,
                title: pMod.title,
                description: `Learn about ${pMod.title.toLowerCase()} in Java.`,
                lessonsCount: pMod.lessons.length,
                articlesCount: 0,
                quizzesCount: 0,
                projectsCount: 0,
                videosCount: 0,
                conceptsCount: pMod.lessons.length,
                items: [
                   { 
                     type: 'lesson', 
                     title: pMod.title, // Placeholder title that matches heading triggers nesting in frontend
                     order: 1
                   }
                ],
                lessons: pMod.lessons.map((lTitle, lIdx) => ({
                    _id: new ObjectId(),
                    moduleId: moduleId,
                    courseId: course._id,
                    order: lIdx + 1,
                    type: 'lesson',
                    title: lTitle,
                    duration: '10 min',
                    language: 'java'
                }))
            };
            
            newModulesArray.push(moduleDoc);
        }

        // 4. Update the course document
        const result = await collection.updateOne(
            { _id: course._id },
            { $set: { modules: newModulesArray } }
        );

        console.log(`Updated course ${course.title}. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
        console.log(`Total modules now: ${newModulesArray.length}`);

    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await client.close();
    }
}

migrate();
