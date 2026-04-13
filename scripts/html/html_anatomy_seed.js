/**
 * Seed HTML/CSS course — Lesson 4: "HTML Document Anatomy" (Refined for 100% fidelity).
 * Run from CandidateBackend: node scripts/html/html_anatomy_seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COURSE_SLUG = 'html-css';
const MODULE_TITLE = 'Introduction to HTML';
const LESSON_TITLE = 'HTML Document Anatomy';
const LESSON_ID = '69b900188c89a2213bb7134a';

function buildContent() {
  return [
    { type: 'label', value: 'HTML Structure' },
    { type: 'heading', value: 'HTML Document Anatomy' },
    { type: 'duration', value: '30 min' },

    { type: 'section_heading', value: '1. Introduction' },
    { type: 'text', value: 'HTML Document Anatomy means understanding all the important parts inside an HTML file and how they are organized.' },
    {
      type: 'list',
      value: [
        'What elements exist in a page',
        'Where they are placed',
        'Why they are important',
      ],
    },
    {
       type: 'rich_text',
       value: '<div class="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 my-4 text-indigo-900 font-medium"><strong>IMPORTANT POINT:</strong> A well-structured HTML document makes the webpage clean and easy to understand.</div>'
    },

    { type: 'section_heading', value: '2. Basic Skeleton Recap' },
    {
      type: 'code_block',
      language: 'html',
      value: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Page Title</title>\n</head>\n<body>\n    Content goes here\n</body>\n</html>',
    },
    { type: 'text', value: 'This is the full anatomy (structure) of an HTML document.' },

    { type: 'section_heading', value: '3. Main Parts of HTML Anatomy' },
    { type: 'text', value: 'There are 3 main parts:' },
    {
      type: 'list',
      value: [
        '1. Document Declaration',
        '2. Root Element',
        '3. Head and Body Sections',
      ],
    },

    { type: 'section_heading', value: '4. Document Declaration' },
    { type: 'code_block', language: 'html', value: '<!DOCTYPE html>' },
    {
      type: 'list',
      value: [
        'Declares HTML version (HTML5)',
        'Always written at the top',
      ],
    },
    {
       type: 'rich_text',
       value: '<div class="bg-amber-50 p-3 rounded border border-amber-200 text-amber-800 italic"><strong>IMPORTANT POINT:</strong> Without this, browser may behave incorrectly.</div>'
    },

    { type: 'section_heading', value: '5. Root Element (<html>)' },
    { type: 'code_block', language: 'html', value: '<html> ... </html>' },
    {
      type: 'list',
      value: [
        'The main container of the entire page',
        'Everything must be inside this tag',
      ],
    },
    { type: 'text', value: 'Extra Attribute:' },
    { type: 'code_block', language: 'html', value: '<html lang="en">' },
    {
      type: 'list',
      value: [
        'Defines language of the page',
        'Helps SEO and accessibility',
      ],
    },

    { type: 'section_heading', value: '6. Head Section Deep Dive' },
    { type: 'code_block', language: 'html', value: '<head> ... </head>' },
    { type: 'text', value: 'This section contains invisible data for browser.' },
    { type: 'text', value: 'Common Elements inside <head>:' },
    
    { type: 'rich_text', value: '<h4 class="font-bold text-gray-800 underline">a) &lt;title&gt;</h4>' },
    { type: 'text', value: 'Title shown in browser tab.' },

    { type: 'rich_text', value: '<h4 class="font-bold text-gray-800 underline mt-2">b) &lt;meta&gt;</h4>' },
    { type: 'text', value: 'Provides additional information.' },
    {
      type: 'code_block',
      language: 'html',
      value: '<meta charset="UTF-8">\n<meta name="description" content="Learning HTML">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    },
    {
       type: 'rich_text',
       value: '<div class="bg-amber-50 p-3 rounded border border-amber-200 text-amber-800 italic mt-2"><strong>IMPORTANT POINT:</strong> Meta tags help with SEO and responsiveness.</div>'
    },

    { type: 'rich_text', value: '<h4 class="font-bold text-gray-800 underline mt-2">c) &lt;link&gt;</h4>' },
    { type: 'text', value: 'Connects external CSS.' },
    { type: 'code_block', language: 'html', value: '<link rel="stylesheet" href="style.css">' },

    { type: 'rich_text', value: '<h4 class="font-bold text-gray-800 underline mt-2">d) &lt;script&gt; (optional)</h4>' },
    { type: 'text', value: 'Used to link JavaScript.' },

    { type: 'section_heading', value: '7. Body Section Deep Dive' },
    { type: 'code_block', language: 'html', value: '<body> ... </body>' },
    { type: 'text', value: 'Contains all the visible content.' },
    { type: 'text', value: 'Elements inside body:' },
    {
      type: 'list',
      value: [
        '<code>&lt;header&gt;</code>: The top section (logo, title)',
        '<code>&lt;nav&gt;</code>: Navigation links',
        '<code>&lt;main&gt;</code>: The primary content area',
        '<code>&lt;footer&gt;</code>: The bottom section (copyright, contact)',
      ],
    },
    {
       type: 'rich_text',
       value: '<div class="bg-amber-50 p-3 rounded border border-amber-200 text-amber-800 italic mt-2"><strong>IMPORTANT POINT:</strong> What user sees = Body content.</div>'
    },

    { type: 'section_heading', value: '8. Nested Structure (Hierarchy)' },
    { type: 'text', value: 'HTML follows a tree structure:' },
    {
      type: 'code_block',
      language: 'html',
      value: '<html>\n    <head>\n        <title></title>\n    </head>\n    <body>\n        <div>\n            <p>Text</p>\n        </div>\n    </body>\n</html>',
    },
    {
       type: 'image',
       value: '/images/html_tree_structure.png',
       caption: 'Visualizing the Parent-Child hierarchy (The DOM Tree).',
    },
    {
      type: 'list',
      value: [
        '<strong>IMPORTANT POINT:</strong> Elements can be inside other elements.',
        '<strong>IMPORTANT POINT:</strong> This is called nesting.',
      ],
    },

    {
      type: 'code_block',
      language: 'html',
      value: '<!-- Header -->\n<header>\n    <h1>My Website</h1>\n</header>\n\n<!-- Main Content -->\n<main>\n    <p>Welcome to the main area.</p>\n</main>\n\n<!-- Footer -->\n<footer>\n    <p>&copy; 2024 My Portfolio</p>\n</footer>',
    },
    {
       type: 'rich_text',
       value: '<div class="bg-amber-50 p-3 rounded border border-amber-200 text-amber-800 italic mt-2"><strong>IMPORTANT POINT:</strong> The closing tag must always match the opening tag exactly but with a <code>/</code>.</div>'
    },

    { type: 'section_heading', value: '10. Self-Closing Tags' },
    { type: 'text', value: 'Some tags do not need a closing tag and are called "void" or "self-closing" tags.' },
    {
      type: 'code_block',
      language: 'html',
      value: '<!-- Image -->\n<img src="logo.png" alt="Company Logo">\n\n<!-- Line Break -->\nFirst Line<br>Second Line\n\n<!-- Horizontal Line -->\n<hr>\n\n<!-- Metadata -->\n<meta charset="UTF-8">',
    },

    { type: 'section_heading', value: '11. Attributes in Anatomy' },
    { type: 'text', value: 'Attributes provide extra information about an element and are always placed inside the **opening tag**.' },
    {
      type: 'code_block',
      language: 'html',
      value: '<!-- Link with href attribute -->\n<a href="https://google.com">Go to Google</a>\n\n<!-- Image with src and width attributes -->\n<img src="photo.jpg" width="500" height="300">\n\n<!-- Paragraph with an ID attribute -->\n<p id="main-text">This paragraph has an ID</p>',
    },
    {
       type: 'rich_text',
       value: '<div class="bg-amber-50 p-3 rounded border border-amber-200 text-amber-800 italic mt-2"><strong>IMPORTANT POINT:</strong> Attributes are always inside the opening tag, never the closing tag.</div>'
    },

    { type: 'section_heading', value: '12. Whitespace and Readability' },
    {
      type: 'list',
      value: [
        'Browser ignores extra spaces',
        'But proper formatting is important for developers',
      ],
    },

    { type: 'section_heading', value: '13. Comments in HTML' },
    { type: 'text', value: 'Used to explain code: <code>&lt;!-- This is a comment --&gt;</code>' },
    { type: 'text', value: 'Not visible in browser.' },

    { type: 'section_heading', value: '14. Common Errors in Structure' },
    {
      type: 'list',
      value: [
        'Missing closing tags',
        'Incorrect nesting',
        'Placing content in &lt;head&gt;',
        'Forgetting lang attribute',
      ],
    },

    { type: 'section_heading', value: 'Practical Experiment' },
    {
      type: 'checkpoint',
      index: 1,
      points: 5,
      value: 'In the code editor below, add a <strong>meta description</strong> inside the head and an <strong>hr</strong> tag inside the body.',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Meta tags go in the <head>; <hr> is self-closing and goes in the <body>.' }] }],
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
      order: 4,
      type: 'lesson',
      title: LESSON_TITLE,
      duration: '30 min',
      language: 'html',
      isTerminal: false,
      fileName: 'anatomy.html',
      starterCode: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title>Anatomy Test</title>\n</head>\n<body>\n    <h1>This is anatomy</h1>\n    <p>Study the parts.</p>\n</body>\n</html>',
      content,
      validationCriteria: [
        { index: 1, matchCode: '<meta name="description"' },
        { index: 2, matchCode: '<main>.*</main>' },
      ],
    };

    await lessonsCol.updateOne({ _id: lessonId }, { $set: doc }, { upsert: true });
    
    // Ensure course linkage
    await coursesCol.updateOne(
      { _id: course._id, 'modules._id': mod._id },
      { $set: { 'modules.$.lessons.3': {
        _id: lessonId,
        moduleId: mod._id,
        courseId: course._id,
        order: 4,
        type: 'lesson',
        title: LESSON_TITLE,
        duration: '30 min',
        language: 'html'
      } } }
    );

    console.log('✅ Lesson "' + LESSON_TITLE + '" seeded successfully.');
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
