/**
 * Seed HTML/CSS course — Lesson 3 (Module 2): "<head> Section"
 * Run from CandidateBackend: node scripts/html/head_section_seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COURSE_SLUG = 'html-css';
const MODULE_TITLE = 'Basic HTML Structure';
const LESSON_TITLE = '<head> Section';
const LESSON_ID = '6a0100188c89a2213bb71352'; // Generating a unique ID

function buildContent() {
  return [
    { type: 'label', value: 'The Unseen Metadata' },
    { type: 'heading', value: 'The <head> Section' },
    { type: 'duration', value: '15 min' },

    { type: 'section_heading', value: 'Introduction' },
    { type: 'rich_text', value: 'The <code>&lt;head&gt;</code> section contains critical information about the webpage that is <strong>not directly visible</strong> to users. It acts as the brain of the document, providing the browser and search engines with instructions on how to understand, render, and handle the page.' },

    { type: 'section_heading', value: 'Definition' },
    {
      type: 'list',
      value: [
        'It is a special container designed specifically for <strong>metadata</strong> (data about data) and external resources.',
        'No visible layouts, text paragraphs, or images are placed inside the <code>&lt;head&gt;</code>.',
      ],
    },
    { type: 'rich_text', value: '<strong>Syntax:</strong>' },
    { type: 'code_block', language: 'html', value: '<head>\n  <!-- Metadata and resources go here -->\n</head>' },

    { type: 'section_heading', value: 'What Goes Inside the Head?' },
    { type: 'rich_text', value: 'The <code>&lt;head&gt;</code> element is remarkably strict about what tags can live inside it. The most common tags include:' },
    {
      type: 'list',
      value: [
        '<code>&lt;title&gt;</code>: Sets the name of the page in the browser tab.',
        '<code>&lt;meta&gt;</code>: Defines the character set, description, keywords, and responsive viewport settings.',
        '<code>&lt;link&gt;</code>: Connects external CSS stylesheets or favicons.',
        '<code>&lt;script&gt;</code>: Loads JavaScript files required to make the page interactive.',
        '<code>&lt;style&gt;</code>: Allows for inline CSS coding directly in the HTML file.',
      ],
    },

    { type: 'section_heading', value: 'Key Points' },
    {
      type: 'list',
      value: [
        '<strong>Vital for SEO:</strong> Search engines look directly into the <code>&lt;head&gt;</code> to understand what your website is about.',
        '<strong>Performance:</strong> The browser reads the <code>&lt;head&gt;</code> first, so the resources loaded here dictate how fast the rest of the page can render.',
        '<strong>Required Structure:</strong> Every valid HTML document must have a single <code>&lt;head&gt;</code> element, placed immediately <strong>after</strong> the opening <code>&lt;html&gt;</code> tag and <strong>before</strong> the opening <code>&lt;body&gt;</code> tag.',
      ],
    },

    { type: 'section_heading', value: 'Example' },
    { type: 'rich_text', value: 'Notice how the <code>&lt;head&gt;</code> is positioned at the top of the container, before the visible body begins:' },
    { type: 'code_block', language: 'html', value: '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <!-- Required meta tags -->\n    <meta charset="UTF-8">\n    \n    <!-- Tab title -->\n    <title>My Page</title>\n</head>\n\n<body>\n    <!-- Visible content starts here -->\n</body>\n\n</html>' },

    { type: 'section_heading', value: 'Best Practices' },
    {
      type: 'list',
      value: [
        '<strong>Keep only necessary data:</strong> Do not bloat the head with hundreds of tracking scripts unless absolutely necessary; it slows down the entire website.',
        '<strong>Never place visible content here:</strong> If you accidentally type a <code>&lt;h1&gt;</code> or paragraph inside the head tag, the browser will forcibly rip it out and shove it into the body to fix your mistake, which can cause erratic layout bugs.',
      ],
    },
    {
       type: 'rich_text',
       value: '<div class="bg-red-50 p-2 rounded border border-red-200 text-red-800 italic my-4 text-center"><strong>WARNING:</strong> Never put visible <code>&lt;img&gt;</code> or text tags inside the <code>&lt;head&gt;</code>.</div>'
    },

    { type: 'section_heading', value: 'Check Your Understanding' },
    {
      type: 'checkpoint',
      index: 1,
      points: 5,
      value: 'Create the opening and closing <head> tags, and place a simple meta tag inside them: <code>&lt;meta charset="UTF-8"&gt;</code>',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Wrap the meta tag with <head> and </head>.' }] }],
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
      order: 3, // Third lesson in Module 2
      type: 'lesson',
      title: LESSON_TITLE,
      duration: '15 min',
      language: 'html',
      isTerminal: false,
      fileName: 'head_section.html',
      starterCode: '<!DOCTYPE html>\n<html lang="en">\n  <!-- Create the head section below this line -->\n\n\n  <!-- Create the head section above this line -->\n  <body>\n    <h1>Welcome</h1>\n  </body>\n</html>',
      content,
      validationCriteria: [
        { index: 1, matchCode: '<head>.*<meta charset="UTF-8">.*</head>' }
      ],
    };

    await lessonsCol.updateOne({ _id: lessonId }, { $set: doc }, { upsert: true });
    
    // Ensure course linkage
    await coursesCol.updateOne(
      { _id: course._id, 'modules._id': mod._id },
      { $set: { 'modules.$.lessons.2': { // Index 2
        _id: lessonId,
        moduleId: mod._id,
        courseId: course._id,
        order: 3,
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
