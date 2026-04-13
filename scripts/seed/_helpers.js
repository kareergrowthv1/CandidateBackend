/**
 * Shared helpers for Java syllabus seed scripts (modules 4–32).
 * DB: Programming, course slug: java
 */
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';

const TABLE = (rows) => `
<div class="overflow-x-auto my-4 border border-gray-100 rounded-md shadow-sm">
<table class="min-w-full text-sm border-collapse">
${rows}
</table></div>`;

const H = (...v) => ({ type: 'hint', value: v });

const MAIN = `public class Main {\n    public static void main(String[] args) {\n        // TODO\n    }\n}`;

/**
 * Build rich lesson content: intro → concepts → table → example → pitfalls → tasks
 */
function buildLessonContent(label, title, duration, sections, language = 'java') {
    const out = [
        { type: 'label', value: label },
        { type: 'heading', value: title },
        { type: 'duration', value: duration },
    ];
    let checkpointIndex = 0;
    for (const s of sections) {
        if (s.type === 'section') {
            out.push({ type: 'section_heading', value: s.title });
            if (s.text) out.push({ type: 'text', value: s.text });
            if (s.rich) out.push({ type: 'rich_text', value: s.rich });
            if (s.list) out.push({ type: 'list', value: s.list });
            if (s.code) out.push({ type: 'code_block', language: s.lang || language, value: s.code });
            if (s.image) out.push({ type: 'image', value: s.image, caption: s.caption || '' });
        } else if (s.type === 'task') {
            checkpointIndex += 1;
            out.push({
                type: 'checkpoint',
                index: checkpointIndex,
                points: s.points || 8,
                value: s.value,
                content: s.hints ? s.hints.map((h) => (typeof h === 'string' ? H({ type: 'text', value: h }) : H(h))) : [],
            });
        }
    }
    return { content: out, checkpoints: checkpointIndex };
}

async function seedModule(options) {
    const {
        moduleTitle,
        description,
        moduleOrder,
        label,
        courseSlug = 'java',
        language = 'java',
        lessons, // [{ title, duration?, sections: [...], validation?, starterCode?, fileName? }]
    } = options;

    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const lessonsCol = db.collection('Lessons');
        const coursesCol = db.collection('Courses');

        const course = await coursesCol.findOne({ slug: courseSlug });
        if (!course) {
            console.error(`❌ Course ${courseSlug} not found`);
            return;
        }
        const courseId = course._id;
        let mod = (course.modules || []).find((m) => m.title === moduleTitle);
        const maxOrder = Math.max(0, ...(course.modules || []).map((m) => m.order || 0));
        const order = moduleOrder != null ? moduleOrder : maxOrder + 1;

        if (!mod) {
            mod = {
                _id: new ObjectId(),
                courseId,
                order,
                title: moduleTitle,
                description: description || '',
                lessons: [],
                items: [],
            };
            await coursesCol.updateOne({ _id: courseId }, { $push: { modules: mod } });
            console.log(`✅ Created module in ${courseSlug}:`, moduleTitle);
        }

        const moduleId = mod._id;
        let embedded = [...(mod.lessons || [])];
        const stubs = [];
        lessons.forEach((L, i) => {
            let s = embedded.find((x) => x.title === L.title);
            if (!s) {
                s = { _id: new ObjectId(), moduleId, courseId, order: i + 1, type: 'lesson', title: L.title, duration: L.duration || '30 min', language };
                embedded.push(s);
            }
            stubs.push({ ...L, _id: s._id, order: i + 1 });
        });

        const toEmbed = [];
        const items = (options.nested) ? [{ type: 'lesson', title: moduleTitle }] : [];

        for (let i = 0; i < stubs.length; i++) {
            const L = stubs[i];
            const duration = L.duration || '30 min';
            const secs = L.sections || defaultSections(L.title, language);
            const { content, checkpoints } = buildLessonContent(label, L.title, duration, secs, language);
            const validationCriteria = L.validation || defaultValidation(checkpoints, L.title);

            const doc = {
                _id: L._id,
                moduleId,
                courseId,
                order: L.order,
                type: 'lesson',
                title: L.title,
                duration,
                language,
                isTerminal: false,
                fileName: L.fileName || (language === 'java' ? 'Main.java' : 'index.html'),
                starterCode: L.starterCode || (language === 'java' ? MAIN : '<!DOCTYPE html>\n<html>\n<head>\n<title>Page Title</title>\n</head>\n<body>\n\n<h1>This is a Heading</h1>\n<p>This is a paragraph.</p>\n\n</body>\n</html>'),
                content,
                validationCriteria,
            };

            await lessonsCol.updateOne({ _id: L._id }, { $set: doc }, { upsert: true });
            toEmbed.push({
                _id: L._id,
                moduleId,
                courseId,
                order: L.order,
                type: 'lesson',
                title: L.title,
                duration,
                language,
            });
            if (!options.nested) {
                items.push({ type: 'lesson', title: L.title });
            }
        }

        await coursesCol.updateOne(
            { _id: courseId, 'modules._id': moduleId },
            {
                $set: {
                    'modules.$.description': description,
                    'modules.$.lessons': toEmbed,
                    'modules.$.lessonsCount': toEmbed.length,
                    'modules.$.items': items,
                    'modules.$.articlesCount': 0,
                    'modules.$.projectsCount': 0,
                    'modules.$.quizzesCount': 0,
                    'modules.$.videosCount': 0,
                    'modules.$.conceptsCount': items.length,
                },
            }
        );

        console.log('✅', moduleTitle, ':', toEmbed.length, 'lessons');
    } finally {
        await client.close();
    }
}

function defaultSections(title, language = 'java') {
    const langLabel = language.toUpperCase();
    return [
        { type: 'section', title: '1. Overview', text: `${title} is a core ${langLabel} topic. Master the syntax, then practice edge cases and best practices.` },
        { type: 'section', title: '2. Key ideas', list: [`Read official ${langLabel} docs for this topic.`, 'Write small experiments.', 'Verify the output.'] },
        { type: 'section', title: '3. Quick reference', code: language === 'java' ? '// Practice in main()\nSystem.out.println("OK");' : '<!-- Practice here -->\n<p>Hello World</p>' },
        { type: 'section', title: '4. Pro tips', text: 'Focus on clean code and accessibility.' },
        { type: 'task', value: `<strong>Task 1</strong><br/>Implement a basic experiment for <code class="font-mono">${title.replace(/"/g, '')}</code>.`, hints: ['Refer to the quick reference.'], points: 5 },
    ];
}

function defaultValidation(n, title) {
    const safe = title.replace(/[.*+?^${}()|[\]\\]/g, '').slice(0, 20);
    return [
        { index: 1, match: `.*`, matchCode: '.*' },
    ].slice(0, n);
}

module.exports = {
    seedModule,
    buildLessonContent,
    TABLE,
    H,
    MAIN,
    ObjectId,
};
