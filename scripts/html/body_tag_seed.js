/**
 * Seed HTML/CSS course — Lesson 5 (Module 2): "<body> Tag"
 * Run from CandidateBackend: node scripts/html/body_tag_seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COURSE_SLUG = 'html-css';
const MODULE_TITLE = 'Basic HTML Structure';
const LESSON_TITLE = '<body> Tag';
const LESSON_ID = '6a0100188c89a2213bb71354'; // Generating a unique ID

function buildContent() {
  return [
    { type: 'label', value: 'The Visible Container' },
    { type: 'heading', value: 'The <body> Tag' },
    { type: 'duration', value: '15 min' },

    { type: 'section_heading', value: 'Introduction' },
    { type: 'rich_text', value: 'While the <code>&lt;head&gt;</code> contains the invisible brains of the webpage, the <code>&lt;body&gt;</code> tag contains absolutely everything that the user can actually see. It is the main container for the visible content of your webpage.' },

    { type: 'section_heading', value: 'Definition' },
    {
      type: 'list',
      value: [
        'It displays content directly to the users.',
        'It houses text paragraphs, images, hyperlinks, videos, and layout containers.',
      ],
    },
    { type: 'rich_text', value: '<strong>Syntax:</strong>' },
    { type: 'code_block', language: 'html', value: '<body>\n  <!-- All your visible website content goes here -->\n</body>' },

    { type: 'section_heading', value: 'Key Points' },
    {
      type: 'list',
      value: [
        '<strong>Visibility Rule:</strong> Everything you want a user to read, click, or see <strong>MUST</strong> be placed inside the <code>&lt;body&gt;</code> tag.',
        '<strong>Uniqueness:</strong> There can only be exactly <strong>one</strong> <code>&lt;body&gt;</code> tag per HTML page. You cannot split it or have twins.',
        '<strong>Placement:</strong> It always immediately follows the closing <code>&lt;/head&gt;</code> tag.',
      ],
    },

    { type: 'section_heading', value: 'Example: A Complete Structure' },
    { type: 'rich_text', value: 'Observe how the <code>&lt;body&gt;</code> operates independently of the <code>&lt;head&gt;</code>:' },
    { type: 'code_block', language: 'html', value: '<!DOCTYPE html>\n<html>\n  <head>\n      <title>My Portfolio</title>\n  </head>\n  \n  <body>\n      <!-- This is what the user actually sees! -->\n      <h1>Welcome to my website!</h1>\n      <p>This is my first paragraph on a live webpage.</p>\n      <img src="my-photo.jpg" alt="A photo of me">\n  </body>\n</html>' },

    { type: 'section_heading', value: 'Best Practices' },
    {
      type: 'list',
      value: [
        '<strong>Keep Content Structured:</strong> Do not just throw text everywhere inside the body. Wrap your text in appropriate structural tags like <code>&lt;p&gt;</code> (paragraphs) and <code>&lt;h1&gt;</code> (headers).',
        '<strong>Use Proper Placement:</strong> External scripts (JavaScript) that modify the page are often placed at the absolute bottom of the <code>&lt;body&gt;</code> right before the closing <code>&lt;/body&gt;</code> tag to ensure the visual elements load fast first.',
      ],
    },

    { type: 'section_heading', value: 'Check Your Understanding' },
    {
      type: 'checkpoint',
      index: 1,
      points: 5,
      value: 'Add an opening and closing body tag, and place the following paragraph inside: <code>&lt;p&gt;Learning HTML is fun!&lt;/p&gt;</code>',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Make sure your paragraph tag is fully contained within <body> and </body>.' }] }],
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
      order: 5, // Fifth lesson in Module 2
      type: 'lesson',
      title: LESSON_TITLE,
      duration: '15 min',
      language: 'html',
      isTerminal: false,
      fileName: 'body_tag.html',
      starterCode: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Testing Content</title>\n</head>\n\n  <!-- Provide the body structure below this line -->\n\n</html>',
      content,
      validationCriteria: [
        { index: 1, matchCode: '<body>.*<p>Learning HTML is fun!</p>.*</body>' }
      ],
    };

    await lessonsCol.updateOne({ _id: lessonId }, { $set: doc }, { upsert: true });
    
    // Ensure course linkage
    await coursesCol.updateOne(
      { _id: course._id, 'modules._id': mod._id },
      { $set: { 'modules.$.lessons.4': { // Index 4
        _id: lessonId,
        moduleId: mod._id,
        courseId: course._id,
        order: 5,
        type: 'lesson',
        title: LESSON_TITLE,
        duration: '15 min',
        language: 'html'
      } } }
    );

    console.log('✅ Lesson "' + LESSON_TITLE + '" seeded successfully.');
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
