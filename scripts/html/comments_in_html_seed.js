/**
 * Seed HTML/CSS course — Lesson 9: "Comments in HTML"
 * Run from CandidateBackend: node scripts/html/comments_in_html_seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COURSE_SLUG = 'html-css';
const MODULE_TITLE = 'Introduction to HTML';
const LESSON_TITLE = 'Comments in HTML';
const LESSON_ID = '6a0100188c89a2213bb7134e'; // Generating a unique ID

function buildContent() {
  return [
    { type: 'label', value: 'Code Documentation' },
    { type: 'heading', value: 'Comments in HTML' },
    { type: 'duration', value: '20 min' },

    { type: 'section_heading', value: '1. Introduction' },
    { type: 'rich_text', value: 'Comments are an incredibly important tool used to explain or annotate HTML code. They are private notes for developers that the browser completely ignores.' },
    {
      type: 'list',
      value: [
        'They are <strong>not visible</strong> on the rendered web page.',
        'They exist <strong>only for developers</strong> viewing the source code.',
      ],
    },

    { type: 'section_heading', value: '2. Definition & Syntax' },
    { type: 'rich_text', value: 'Comments are notes written inside the HTML code that are intentionally skipped by the browser when parsing the page.' },
    { type: 'code_block', language: 'html', value: '<!-- This is a comment -->' },
    {
      type: 'list',
      value: [
        'Begins with a less-than sign, exclamation mark, and two dashes (<code>&lt;!--</code>).',
        'Ends with two dashes and a greater-than sign (<code>--&gt;</code>).',
      ],
    },

    { type: 'section_heading', value: '3. Purpose of Comments' },
    {
      type: 'list',
      value: [
        '<strong>Explain code:</strong> Describe what a complex section of layout does.',
        '<strong>Improve readability:</strong> Visually break up massive HTML files into clear sections (e.g., `<!-- Header Section -->`).',
        '<strong>Help debugging:</strong> Leave notes about known bugs or weird behaviors.',
        '<strong>Disable code temporarily:</strong> Prevent a block of code from rendering without deleting it permanently.',
      ],
    },

    { type: 'section_heading', value: '4. Examples of Usage' },
    { type: 'rich_text', value: '<strong>Single Line Comment:</strong>' },
    { type: 'code_block', language: 'html', value: '<!-- Main Title Heading -->\n<h1>Welcome to my website</h1>' },
    
    { type: 'rich_text', value: '<strong>Multi-line Comment:</strong>' },
    { type: 'code_block', language: 'html', value: '<!--\nThis section contains the entire\nnavigation bar including logo,\nlinks, and the search input.\n-->\n<nav>...</nav>' },

    { type: 'section_heading', value: '5. Commenting Out Code' },
    { type: 'rich_text', value: 'If something is broken, or you want to hide an element temporarily, you can wrap the actual HTML elements inside a comment. The browser will treat the code as text and ignore it.' },
    { type: 'code_block', language: 'html', value: '<p>This text will display.</p>\n\n<!-- <p>This broken paragraph will NOT display!</p> -->\n\n<p>This text will also display.</p>' },

    { type: 'section_heading', value: '6. Use Cases' },
    {
      type: 'list',
      value: [
        '<strong>Explaining Sections:</strong> Marking where the header ends and the main article begins.',
        '<strong>Marking TODOs:</strong> Leaving a note like `<!-- TODO: Add image here later -->`.',
        '<strong>Testing changes:</strong> Hiding old code while testing a new layout underneath it.',
      ],
    },

    { type: 'section_heading', value: '7. Best Practices' },
    {
      type: 'list',
      value: [
        '<strong>Keep comments clear and short:</strong> Don\'t write essays in your source code.',
        '<strong>Do not overuse comments:</strong> Good code should largely explain itself. Comment the "why", not the obvious "what".',
        '<strong>Update comments when code changes:</strong> An outdated, incorrect comment is worse than no comment at all.',
      ],
    },

    { type: 'section_heading', value: '8. Common Mistakes' },
    {
      type: 'list',
      value: [
        '<strong>Forgetting the closing <code>--&gt;</code>:</strong> If you forget to close a comment, the browser will assume everything else on the page is a comment, blanking out your entire website.',
        '<strong>Writing sensitive data:</strong> Never put passwords, API keys, or private notes in HTML comments.',
      ],
    },
    {
       type: 'rich_text',
       value: '<div class="bg-red-50 p-3 rounded border border-red-200 text-red-800 font-medium my-4 italic underline text-center"><strong>CRITICAL WARNING:</strong> Comments are physically sent to the browser and are fully visible to anyone who "Views Page Source." Do NOT put secrets in them!</div>'
    },

    { type: 'section_heading', value: '9. Key Points Summary' },
    {
      type: 'list',
      value: [
        'Comments are entirely ignored by the rendering engine (they do not show on the page).',
        'They are used purely for human explanation and temporary code disabling.',
        'The specific syntax is rigid: <code>&lt;!--</code> to open, and <code>--&gt;</code> to close.',
      ],
    },

    { type: 'section_heading', value: 'Check Your Understanding' },
    {
      type: 'checkpoint',
      index: 1,
      points: 5,
      value: 'Create a single line HTML comment that says <code>Navigation Bar</code>.',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Remember the opening and closing arrow-dash syntax.' }] }],
    },
    {
      type: 'checkpoint',
      index: 2,
      points: 5,
      value: 'Comment out the broken image tag below so the page runs successfully.',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Wrap the entire img tag inside <!-- and -->' }] }],
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
      order: 9,
      type: 'lesson',
      title: LESSON_TITLE,
      duration: '20 min',
      language: 'html',
      isTerminal: false,
      fileName: 'comments.html',
      starterCode: '<!DOCTYPE html>\n<html>\n<body>\n    <!-- Write your "Navigation Bar" comment here: -->\n    \n\n    <!-- Comment out the broken image below: -->\n    <img src="broken_link.jpg" alt="Missing Image">\n</body>\n</html>',
      content,
      validationCriteria: [
        { index: 1, matchCode: '<!--.*Navigation Bar.*-->' },
        { index: 2, matchCode: '<!--.*<img.*src="broken_link\\.jpg".*alt="Missing Image".*>.*-->' },
      ],
    };

    await lessonsCol.updateOne({ _id: lessonId }, { $set: doc }, { upsert: true });
    
    // Ensure course linkage
    await coursesCol.updateOne(
      { _id: course._id, 'modules._id': mod._id },
      { $set: { 'modules.$.lessons.8': {
        _id: lessonId,
        moduleId: mod._id,
        courseId: course._id,
        order: 9,
        type: 'lesson',
        title: LESSON_TITLE,
        duration: '20 min',
        language: 'html'
      } } }
    );

    console.log('✅ Lesson "' + LESSON_TITLE + '" seeded successfully.');
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
