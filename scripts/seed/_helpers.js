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
function buildLessonContent(label, title, duration, sections) {
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
            if (s.code) out.push({ type: 'code_block', language: s.lang || 'java', value: s.code });
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
        lessons, // [{ title, duration?, sections: [...], validation?, starterCode?, fileName? }]
    } = options;

    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const lessonsCol = db.collection('Lessons');
        const coursesCol = db.collection('Courses');

        const course = await coursesCol.findOne({ slug: 'java' });
        if (!course) {
            console.error('❌ Course java not found');
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
            console.log('✅ Created module:', moduleTitle);
        }

        const moduleId = mod._id;
        let embedded = [...(mod.lessons || [])];
        const stubs = [];
        lessons.forEach((L, i) => {
            let s = embedded.find((x) => x.title === L.title);
            if (!s) {
                s = { _id: new ObjectId(), moduleId, courseId, order: i + 1, type: 'lesson', title: L.title, duration: L.duration || '30 min', language: 'java' };
                embedded.push(s);
            }
            stubs.push({ ...L, _id: s._id, order: i + 1 });
        });

        const toEmbed = [];
        const items = [];

        for (let i = 0; i < stubs.length; i++) {
            const L = stubs[i];
            const duration = L.duration || '30 min';
            const secs = L.sections || defaultSections(L.title);
            const { content, checkpoints } = buildLessonContent(label, L.title, duration, secs);
            const validationCriteria = L.validation || defaultValidation(checkpoints, L.title);

            const doc = {
                _id: L._id,
                moduleId,
                courseId,
                order: L.order,
                type: 'lesson',
                title: L.title,
                duration,
                language: 'java',
                isTerminal: false,
                fileName: L.fileName || 'Main.java',
                starterCode: L.starterCode || MAIN,
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
                language: 'java',
            });
            items.push({ type: 'lesson', title: L.title });
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

function defaultSections(title) {
    return [
        { type: 'section', title: '1. Overview', text: `${title} is a core Java topic. Master the syntax, then practice edge cases and JVM behavior at an intermediate level.` },
        { type: 'section', title: '2. Key ideas', list: ['Read compiler errors literally.', 'Prefer clarity over clever one-liners.', 'Match braces and indent consistently.'] },
        { type: 'section', title: '3. Quick reference', code: '// Practice in main()\nSystem.out.println("OK");' },
        { type: 'section', title: '4. Pro tips', text: 'Combine with debugging: print state before/after; unit-test boundary values.' },
        { type: 'task', value: `<strong>Task 1</strong><br/>Print a line containing <code class="font-mono">Lesson: ${title.replace(/"/g, '')}</code> from <code class="font-mono">main</code>.`, hints: ['Use println with string literal.'], points: 5 },
        { type: 'task', value: '<strong>Task 2</strong><br/>Declare <code class="font-mono">int x = 42</code> and print <code class="font-mono">Answer: 42</code>.', hints: ['int x = 42; System.out.println("Answer: " + x);'], points: 5 },
    ];
}

function defaultValidation(n, title) {
    const safe = title.replace(/[.*+?^${}()|[\]\\]/g, '').slice(0, 20);
    return [
        { index: 1, match: `Lesson:\\s*${safe}|Lesson:`, matchCode: 'println' },
        { index: 2, match: 'Answer:\\s*42', matchCode: '42' },
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
