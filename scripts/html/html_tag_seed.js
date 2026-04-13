/**
 * Seed HTML/CSS course — Lesson 2 (Module 2): "<html> Tag"
 * Run from CandidateBackend: node scripts/html/html_tag_seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COURSE_SLUG = 'html-css';
const MODULE_TITLE = 'Basic HTML Structure';
const LESSON_TITLE = '<html> Tag';
const LESSON_ID = '6a0100188c89a2213bb71351'; // Generating a unique ID

function buildContent() {
  return [
    { type: 'label', value: 'The Root Container' },
    { type: 'heading', value: 'The <html> Tag' },
    { type: 'duration', value: '15 min' },

    { type: 'section_heading', value: 'Introduction' },
    { type: 'rich_text', value: 'The <code>&lt;html&gt;</code> tag is the absolute foundation of your webpage. It acts as the "root element," which is a technical way of saying it wraps and contains every single other piece of code on your page. Every valid HTML file must contain this tag.' },
    {
       type: 'rich_text',
       value: '<div class="bg-indigo-50 p-3 rounded border border-indigo-200 text-indigo-800 font-medium my-4 italic underline text-center"><strong>IMPORTANT POINT:</strong> The entire document exists inside the <code>&lt;html&gt;</code> tag.</div>'
    },

    { type: 'section_heading', value: 'Definition' },
    {
      type: 'list',
      value: [
        'It is known as the <strong>root element</strong> of the HTML document.',
        'It acts as a giant container for all other elements (specifically the <code>&lt;head&gt;</code> and <code>&lt;body&gt;</code>).',
      ],
    },
    { type: 'rich_text', value: '<strong>Syntax:</strong>' },
    { type: 'code_block', language: 'html', value: '<html>\n  <!-- Everything goes here -->\n</html>' },

    { type: 'section_heading', value: 'Key Points' },
    {
      type: 'list',
      value: [
        'Everything (headers, footers, scripts, metadata) must be placed inside this wrapper.',
        'You can only ever have <strong>one</strong> <code>&lt;html&gt;</code> tag opening and closing per document.',
        'It must physically come directly after the <code>&lt;!DOCTYPE html&gt;</code> declaration.',
      ],
    },

    { type: 'section_heading', value: 'The Language Attribute' },
    { type: 'rich_text', value: 'When creating the <code>&lt;html&gt;</code> tag, it is a critical best practice to define the language of the page content. We do this using the <code>lang</code> attribute.' },
    { type: 'code_block', language: 'html', value: '<html lang="en">' },
    {
      type: 'list',
      value: [
        'It explicitly defines the primary language of the webpage (e.g., <code>en</code> for English, <code>es</code> for Spanish).',
        'It greatly assists Search Engines (SEO) in serving your page to the right audience.',
        'It is essential for <strong>Accessibility</strong>. Screen readers use this attribute to determine what pronunciation rules they should use when reading the page aloud to visually impaired users.',
      ],
    },

    { type: 'section_heading', value: 'Example: Full Context' },
    { type: 'rich_text', value: 'Look at how the <code>&lt;html&gt;</code> tag wraps around the two main sub-containers of the page:' },
    { type: 'code_block', language: 'html', value: '<!DOCTYPE html>\n<html lang="en">\n\n  <head>\n      <title>My Page</title>\n  </head>\n\n  <body>\n      <h1>Hello</h1>\n  </body>\n\n</html>' },

    { type: 'section_heading', value: 'Best Practices' },
    {
      type: 'list',
      value: [
        '<strong>Always include the <code>lang</code> attribute.</strong> It takes two seconds but provides massive benefits.',
        '<strong>Keep structure clean:</strong> Never place text or visual elements directly inside the <code>&lt;html&gt;</code> tag without wrapping them in the <code>&lt;body&gt;</code> first.',
      ],
    },

    { type: 'section_heading', value: 'Check Your Understanding' },
    {
      type: 'checkpoint',
      index: 1,
      points: 5,
      value: 'Create the opening HTML tag and assign its language attribute to English.',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Use the lang attribute with the value "en".' }] }],
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
      order: 2, // Second lesson in Module 2
      type: 'lesson',
      title: LESSON_TITLE,
      duration: '15 min',
      language: 'html',
      isTerminal: false,
      fileName: 'html_tag.html',
      starterCode: '<!DOCTYPE html>\n<!-- Write your opening html tag below with the English language attribute -->\n\n<head>\n  <title>Testing</title>\n</head>\n<body>\n  <h1>Welcome</h1>\n</body>\n</html>',
      content,
      validationCriteria: [
        { index: 1, matchCode: '<html.*lang="en".*>' }
      ],
    };

    await lessonsCol.updateOne({ _id: lessonId }, { $set: doc }, { upsert: true });
    
    // Ensure course linkage
    await coursesCol.updateOne(
      { _id: course._id, 'modules._id': mod._id },
      { $set: { 'modules.$.lessons.1': { // Index 1
        _id: lessonId,
        moduleId: mod._id,
        courseId: course._id,
        order: 2,
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
