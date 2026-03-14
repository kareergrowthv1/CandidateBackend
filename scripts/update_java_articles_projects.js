const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Configuration
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COLLECTION_NAME = 'Courses';

async function updateModules() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        // 1. Read and parse art_mod.txt
        const filePath = path.join(__dirname, 'art_mod.txt');
        const content = fs.readFileSync(filePath, 'utf8');
        
        const sections = content.split(/------------------------------------------------/);
        const parsedData = {};

        for (const section of sections) {
            const lines = section.trim().split('\n').filter(l => l.trim().length > 0);
            if (lines.length === 0) continue;

            // Match "1. HelloWorld (Introduction)" or "2. Variables"
            const moduleMatch = lines[0].match(/^\d+\.\s*(.+)$/i);
            if (!moduleMatch) continue;

            const moduleTitle = moduleMatch[1].trim().replace(/\s*\(Introduction\)$/, '');
            const items = [];
            
            let currentType = null;
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line.toLowerCase().startsWith('articles:')) {
                    currentType = 'article';
                    continue;
                }
                if (line.toLowerCase().startsWith('projects:')) {
                    currentType = 'project';
                    continue;
                }
                if (line.startsWith('-') && currentType) {
                    items.push({ 
                        type: currentType, 
                        title: line.substring(1).trim() 
                    });
                }
            }

            parsedData[moduleTitle.toLowerCase()] = items;
        }

        // 2. Fetch Java course
        const course = await collection.findOne({ slug: 'java' });
        if (!course) {
            console.error('Java course not found!');
            return;
        }

        let modified = false;
        const modules = course.modules || [];

        for (const mod of modules) {
            const modKey = mod.title.toLowerCase();
            const extraItems = parsedData[modKey];
            
            if (extraItems) {
                console.log(`Updating ${mod.title} with ${extraItems.length} items`);
                
                // RESET counts and items (except lessons) to ensure we matching the file exactly
                mod.items = mod.items?.filter(i => i.type !== 'article' && i.type !== 'project') || [];
                mod.articlesCount = 0;
                mod.projectsCount = 0;
                
                let currentMaxOrder = mod.items.length > 0 
                  ? Math.max(...mod.items.map(i => i.order || 0)) 
                  : 0;

                for (const extra of extraItems) {
                    currentMaxOrder++;
                    mod.items.push({
                        type: extra.type,
                        title: extra.title,
                        order: currentMaxOrder
                    });
                    
                    if (extra.type === 'article') mod.articlesCount = (mod.articlesCount || 0) + 1;
                    if (extra.type === 'project') mod.projectsCount = (mod.projectsCount || 0) + 1;
                }
                
                // Recalculate conceptsCount
                const lessonEntriesInItems = (mod.items || []).filter(i => i.type === 'lesson').length;
                const mLessons = (lessonEntriesInItems === 1 && (mod.lessons || []).length > 1) 
                    ? mod.lessons.length 
                    : (lessonEntriesInItems || (mod.lessons || []).length);
                
                mod.conceptsCount = mLessons + (mod.articlesCount || 0) + (mod.quizzesCount || 0) + (mod.projectsCount || 0) + (mod.videosCount || 0);
                modified = true;
            }
        }

        if (modified) {
            // Update total counts for the course
            const totalArticles = modules.reduce((sum, m) => sum + (m.articlesCount || 0), 0);
            const totalProjects = modules.reduce((sum, m) => sum + (m.projectsCount || 0), 0);
            const totalLessons = modules.reduce((sum, m) => {
                 const lessonEntriesInItems = (m.items || []).filter(i => i.type === 'lesson').length;
                 const mLessons = (lessonEntriesInItems === 1 && (m.lessons || []).length > 1) 
                    ? m.lessons.length 
                    : (lessonEntriesInItems || (m.lessons || []).length);
                 return sum + mLessons;
            }, 0);

            const result = await collection.updateOne(
                { _id: course._id },
                { $set: { 
                    modules: modules,
                    articlesCount: totalArticles,
                    projectsCount: totalProjects,
                    lessonsCount: totalLessons
                } }
            );
            console.log(`Updated course. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
        } else {
            console.log('No new items to add.');
        }

    } catch (err) {
        console.error('Update failed:', err);
    } finally {
        await client.close();
    }
}

updateModules();
