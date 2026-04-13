/**
 * Seed HTML/CSS course — Lesson 4 (Module 2): "<title> Tag"
 * Run from CandidateBackend: node scripts/html/title_tag_seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COURSE_SLUG = 'html-css';
const MODULE_TITLE = 'Basic HTML Structure';
const LESSON_TITLE = '<title> Tag';
const LESSON_ID = '6a0100188c89a2213bb71353'; // Generating a unique ID

function buildContent() {
  return [
    { type: 'label', value: 'The Browser Tab Name' },
    { type: 'heading', value: 'The <title> Tag' },
    { type: 'duration', value: '10 min' },

    { type: 'section_heading', value: 'Introduction' },
    { type: 'rich_text', value: 'The <code>&lt;title&gt;</code> tag defines the exact title of the webpage. This title is what visually appears on the browser tab right next to the favicon at the very top of your screen.' },
    {
       type: 'rich_text',
       value: '<div class="bg-indigo-50 p-3 rounded border border-indigo-200 text-indigo-800 font-medium my-4 italic underline text-center"><strong>IMPORTANT POINT:</strong> It must ALWAYS be placed inside the <code>&lt;head&gt;</code> section.</div>'
    },

    { type: 'section_heading', value: 'Definition' },
    {
      type: 'list',
      value: [
        'It is a mandatory part of the <code>&lt;head&gt;</code> element.',
        'It explicitly dictates the page title shown in the browser tab and web history logs.',
      ],
    },
    { type: 'rich_text', value: '<strong>Syntax:</strong>' },
    { type: 'code_block', language: 'html', value: '<title>Welcome to the Page!</title>' },

    { type: 'section_heading', value: 'Importance' },
    {
      type: 'list',
      value: [
        '<strong>Identification:</strong> Helps users identify your page when they have 50 different browser tabs open at the same time.',
        '<strong>Search Engine Optimization (SEO):</strong> This text is the most prominent headline that users will click on when they search for you on Google. The words here heavily influence your search ranking.',
        '<strong>Bookmarking:</strong> When a user favorites or bookmarks your page, the browser uses the content of the <code>&lt;title&gt;</code> tag as the default saved name.',
      ],
    },

    { type: 'section_heading', value: 'Example in Context' },
    { type: 'code_block', language: 'html', value: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <!-- The title sits nested cleanly inside the head -->\n    <title>My First Website Dashboard</title>\n</head>\n<body>\n    <h1>Welcome</h1>\n</body>\n</html>' },

    { type: 'section_heading', value: 'Best Practices' },
    {
      type: 'list',
      value: [
        '<strong>Keep it meaningfully short:</strong> Browsers truncate (cut off with "...") titles that are too long. Aim for around 50–60 characters maximum.',
        '<strong>Include keywords:</strong> If you sell shoes, make sure the word "Shoes" is in your homepage title.',
        '<strong>Make it unique per page:</strong> Do not just name every page "My Website". Name them "Home | My Website", "About Us | My Website", etc.',
      ],
    },

    { type: 'section_heading', value: 'Check Your Understanding' },
    {
      type: 'checkpoint',
      index: 1,
      points: 5,
      value: 'Create a title tag inside the head section with the text: <code>Login Portal</code>',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Do not forget to wrap it in </title>.' }] }],
    },
  ];
}

async function seed() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const coursesCol = db.collection('Courses');
    const lessonsCol = db.collection('Lessons');

    const course = await coursesCol.findOne({ slug: COURSE_SLUG });
    if (!course) {
      console.error('❌ Course not found.');
      return;
    }

    let mod = (course.modules || []).find((m) => m.title === MODULE_TITLE);
    if (!mod) {
      console.error('❌ Module not found.');
      return;
    }

    const lessonId = new ObjectId(LESSON_ID);
    const content = buildContent();

    const doc = {
      _id: lessonId,
      moduleId: mod._id,
      courseId: course._id,
      order: 4, // Fourth lesson in Module 2
      type: 'lesson',
      title: LESSON_TITLE,
      duration: '10 min',
      language: 'html',
      isTerminal: false,
      fileName: 'title_tag.html',
      starterCode: '<!DOCTYPE html>\n<html>\n<head>\n  <!-- Write your title tag below -->\n\n\n  <!-- Write your title tag above -->\n</head>\n<body>\n  <h1>Welcome</h1>\n</body>\n</html>',
      content,
      validationCriteria: [
        { index: 1, matchCode: '<title>.*Login Portal.*</title>' }
      ],
    };

    await lessonsCol.updateOne({ _id: lessonId }, { $set: doc }, { upsert: true });
    
    // Ensure course linkage
    await coursesCol.updateOne(
      { _id: course._id, 'modules._id': mod._id },
      { $set: { 'modules.$.lessons.3': { // Index 3
        _id: lessonId,
        moduleId: mod._id,
        courseId: course._id,
        order: 4,
        type: 'lesson',
        title: LESSON_TITLE,
        duration: '10 min',
        language: 'html'
      } } }
    );

    console.log('✅ Lesson "' + LESSON_TITLE + '" seeded successfully.');
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
