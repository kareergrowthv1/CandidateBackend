const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Configuration
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COLLECTION_NAME = 'Courses';

async function rebuildCurriculum() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // 1. Parse module.txt (Lessons)
        const moduleFile = path.join(__dirname, 'module.txt');
        const moduleContent = fs.readFileSync(moduleFile, 'utf8');
        const moduleSections = moduleContent.split(/------------------------------------------------/);
        const lessonsMap = {};
        const orderedModuleTitles = [];

        for (const section of moduleSections) {
            const lines = section.trim().split('\n').filter(l => l.trim().length > 0);
            if (lines.length === 0) continue;

            // Find the line that looks like a title: "1. HelloWorld" etc.
            let titleMatch = null;
            let titleLineIdx = -1;
            for (let j = 0; j < lines.length; j++) {
                const match = lines[j].match(/^\d+\.\s*(.+)$/);
                if (match) {
                    titleMatch = match;
                    titleLineIdx = j;
                    break;
                }
            }
            
            if (!titleMatch) continue;

            const fullTitle = titleMatch[1].trim();
            const cleanTitle = fullTitle.replace(/\s*\(Introduction\)$/, '');
            const lessons = lines.slice(titleLineIdx + 1)
                .map(l => l.trim().startsWith('-') ? l.trim().substring(1).trim() : null)
                .filter(l => l !== null);

            lessonsMap[cleanTitle.toLowerCase()] = {
                displayTitle: cleanTitle,
                lessons: lessons
            };
            orderedModuleTitles.push(cleanTitle.toLowerCase());
        }

        console.log(`Parsed ${orderedModuleTitles.length} modules from module.txt`);

        // 2. Parse art_mod.txt (Articles and Projects)
        const artFile = path.join(__dirname, 'art_mod.txt');
        const artContent = fs.readFileSync(artFile, 'utf8');
        const artSections = artContent.split(/------------------------------------------------/);
        const extrasMap = {};

        for (const section of artSections) {
            const lines = section.trim().split('\n').filter(l => l.trim().length > 0);
            if (lines.length === 0) continue;

            const moduleMatch = lines[0].match(/^\d+\.\s*(.+)$/i);
            if (!moduleMatch) continue;

            const moduleTitle = moduleMatch[1].trim().replace(/\s*\(Introduction\)$/, '').toLowerCase();
            const extras = [];
            
            let currentType = null;
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                const lowerLine = line.toLowerCase();
                if (lowerLine.startsWith('articles:')) {
                    currentType = 'article';
                    continue;
                }
                if (lowerLine.startsWith('projects:')) {
                    currentType = 'project';
                    continue;
                }
                if (line.startsWith('-') && currentType) {
                    extras.push({ 
                        type: currentType, 
                        title: line.substring(1).trim() 
                    });
                }
            }
            extrasMap[moduleTitle] = extras;
        }

        console.log(`Parsed ${Object.keys(extrasMap).length} modules from art_mod.txt`);

        // 3. Fetch Java course
        const course = await collection.findOne({ slug: 'java' });
        if (!course) {
            console.error('Java course not found!');
            return;
        }

        const existingModules = course.modules || [];
        const helloWorldModule = existingModules.find(m => m.title === 'Hello World');
        
        const newModulesArray = [];
        
        // Always keep the original Hello World
        if (helloWorldModule) {
            newModulesArray.push(helloWorldModule);
        } else {
            console.error('CRITICAL: Hello World module missing from DB!');
            // Fallback: create placeholder if it really is gone (shouldn't happen)
            newModulesArray.push(existingModules[0]);
        }

        // 4. Build new structure for modules 2...32
        for (let i = 0; i < orderedModuleTitles.length; i++) {
            const modKey = orderedModuleTitles[i];
            const modData = lessonsMap[modKey];
            if (!modData) continue;

            // Skip Hello World as we already added the original one
            if (modKey === 'helloworld' || modData.displayTitle === 'Hello World') {
                continue;
            }

            const moduleId = new ObjectId();
            const extras = extrasMap[modKey] || [];
            
            const articlesCount = extras.filter(e => e.type === 'article').length;
            const projectsCount = extras.filter(e => e.type === 'project').length;
            const lessonsCount = modData.lessons.length;

            const items = [];
            // Add the nested lesson trigger
            items.push({
                type: 'lesson',
                title: modData.displayTitle,
                order: 1
            });

            // Add articles and projects directly
            extras.forEach((extra, eIdx) => {
                items.push({
                    type: extra.type,
                    title: extra.title,
                    order: eIdx + 2
                });
            });

            const moduleDoc = {
                _id: moduleId,
                courseId: course._id,
                order: i + 1,
                title: modData.displayTitle,
                description: `Learn about ${modData.displayTitle.toLowerCase()} in Java.`,
                lessonsCount: lessonsCount,
                articlesCount: articlesCount,
                quizzesCount: 0,
                projectsCount: projectsCount,
                videosCount: 0,
                conceptsCount: lessonsCount + articlesCount + projectsCount,
                items: items,
                lessons: modData.lessons.map((lTitle, lIdx) => ({
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

        // 5. Final counts
        const totalArticles = newModulesArray.reduce((sum, m) => sum + (m.articlesCount || 0), 0);
        const totalProjects = newModulesArray.reduce((sum, m) => sum + (m.projectsCount || 0), 0);
        const totalLessons = newModulesArray.reduce((sum, m) => {
             // If multi-lesson but only 1 trigger item, count lessons array
             const lessonEntriesInItems = (m.items || []).filter(i => i.type === 'lesson').length;
             const mLessons = (lessonEntriesInItems === 1 && (m.lessons || []).length > 1) 
                ? m.lessons.length 
                : (lessonEntriesInItems || (m.lessons || []).length);
             return sum + mLessons;
        }, 0);

        // 6. Update Database
        const result = await collection.updateOne(
            { _id: course._id },
            { $set: { 
                modules: newModulesArray,
                articlesCount: totalArticles,
                projectsCount: totalProjects,
                lessonsCount: totalLessons
            } }
        );

        console.log(`\nMigration Summary:`);
        console.log(`Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
        console.log(`Total Modules: ${newModulesArray.length}`);
        console.log(`Total Lessons: ${totalLessons}`);
        console.log(`Total Articles: ${totalArticles}`);
        console.log(`Total Projects: ${totalProjects}`);

    } catch (err) {
        console.error('Rebuild failed:', err);
    } finally {
        await client.close();
    }
}

rebuildCurriculum();
