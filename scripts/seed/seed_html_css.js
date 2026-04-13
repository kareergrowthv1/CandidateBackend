const fs = require('fs');
const path = require('path');
const { seedModule, ObjectId } = require('./_helpers');

async function run() {
    const syllabusPath = path.join(__dirname, '../html/index.txt');
    const content = fs.readFileSync(syllabusPath, 'utf8');

    const courseSlug = 'html-css';
    const courseTitle = 'Learn HTML and CSS';
    const courseDescription = 'Master web development with this comprehensive HTML5 and CSS3 course. Learn structuring, styling, layouts, and responsive design.';

    const modules = [];
    const sections = content.split(/^-+\s*$/m);

    for (const section of sections) {
        const lines = section.trim().split('\n');
        if (lines.length < 2) continue;

        let moduleNum = null;
        let moduleTitle = null;
        let headerLineIndex = -1;

        for (let i = 0; i < lines.length; i++) {
            const headerMatch = lines[i].trim().match(/^(\d+)\.\s+(.*)$/);
            if (headerMatch) {
                moduleNum = parseInt(headerMatch[1]);
                moduleTitle = headerMatch[2].trim();
                headerLineIndex = i;
                break;
            }
        }

        if (moduleNum !== null && moduleTitle !== null) {
            const lessons = [];

            for (let i = headerLineIndex + 1; i < lines.length; i++) {
                const lessonLine = lines[i].trim();
                if (lessonLine.startsWith('- ')) {
                    const lessonTitle = lessonLine.substring(2).trim();
                    lessons.push({ title: lessonTitle });
                }
            }

            modules.push({
                num: moduleNum,
                title: moduleTitle,
                lessons: lessons
            });
        }
    }

    console.log(`Parsed ${modules.length} modules.`);

    // 1. Create/Update the combined course metadata and clear its modules
    const { MongoClient } = require('mongodb');
    require('dotenv').config({ path: path.join(__dirname, '../../.env') });
    const client = new MongoClient(process.env.MONGODB_URI);
    try {
        await client.connect();
        const db = client.db('Programming');
        const coursesCol = db.collection('Courses');

        console.log(`Ensuring combined course exists: ${courseSlug}`);
        await coursesCol.updateOne(
            { slug: courseSlug },
            { 
                $set: { 
                    name: courseTitle,
                    description: courseDescription,
                    level: 'Beginner',
                    slug: courseSlug,
                    modules: [] // Reset modules for clean seed
                } 
            },
            { upsert: true }
        );

        // 2. Delete existing individual courses to avoid duplication in UI
        console.log('Cleaning up old individual courses: html, css');
        await coursesCol.deleteOne({ slug: 'html' });
        await coursesCol.deleteOne({ slug: 'css' });

    } finally {
        await client.close();
    }

    for (const mod of modules) {
        const isHtml = mod.num <= 12;
        const language = isHtml ? 'html' : 'css';
        const label = isHtml ? 'HTML' : 'CSS';

        await seedModule({
            moduleTitle: mod.title,
            moduleOrder: mod.num,
            description: `Master the essentials of ${mod.title}. This module covers key concepts and practical applications within the ${label} section.`,
            label: label,
            courseSlug: courseSlug,
            language: language,
            nested: false,
            lessons: mod.lessons
        });
    }

    console.log('Seeding complete.');
}

run().catch(console.error);
