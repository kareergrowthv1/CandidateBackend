/**
 * Seed HTML/CSS course — Lesson 6 (Module 2): "Meta Tags"
 * Run from CandidateBackend: node scripts/html/meta_tags_seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COURSE_SLUG = 'html-css';
const MODULE_TITLE = 'Basic HTML Structure';
const LESSON_TITLE = 'Meta Tags';
const LESSON_ID = '6a0100188c89a2213bb71355'; // Generating a unique ID

function buildContent() {
  return [
    { type: 'label', value: 'Invisible Instructions' },
    { type: 'heading', value: 'Meta Tags' },
    { type: 'duration', value: '20 min' },

    { type: 'section_heading', value: 'Introduction' },
    { type: 'rich_text', value: 'Meta tags are essentially tiny instruction manuals embedded inside your webpage. They provide additional information (metadata) about the HTML document to browsers, search engines, and web services.' },

    { type: 'section_heading', value: 'Definition' },
    {
      type: 'list',
      value: [
        'They are <strong>strictly</strong> placed inside the <code>&lt;head&gt;</code> section.',
        'They are completely <strong>invisible</strong> to the end user looking at the screen.',
        'They use a precise name/value attribute combination to deliver instructions.',
      ],
    },
    { type: 'rich_text', value: '<strong>Syntax Pattern:</strong>' },
    { type: 'code_block', language: 'html', value: '<meta name="property_name" content="the_actual_value">' },

    { type: 'section_heading', value: 'Common Essential Meta Tags' },
    { type: 'rich_text', value: 'Below is a table of the three absolute most critical Meta tags you will use on every modern website:' },
    {
      type: 'rich_text',
      value: `<table class="min-w-full border-collapse border border-gray-200 my-4 text-sm text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="border border-gray-200 p-2">Purpose</th>
            <th class="border border-gray-200 p-2">HTML Code</th>
            <th class="border border-gray-200 p-2">Why It Matters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-200 p-2 font-bold text-blue-600">Character Set (Charset)</td>
            <td class="border border-gray-200 p-2"><code>&lt;meta charset="UTF-8"&gt;</code></td>
            <td class="border border-gray-200 p-2">Tells the browser to use modern text encoding. Prevents emojis and special symbols from showing up as broken squares.</td>
          </tr>
          <tr>
            <td class="border border-gray-200 p-2 font-bold text-blue-600">Mobile Viewport</td>
            <td class="border border-gray-200 p-2"><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code></td>
            <td class="border border-gray-200 p-2">Forces the website to match the width of the user's phone screen. Without this, mobile websites look like tiny zoomed-out desktop sites.</td>
          </tr>
          <tr>
            <td class="border border-gray-200 p-2 font-bold text-blue-600">Page Description</td>
            <td class="border border-gray-200 p-2"><code>&lt;meta name="description" content="Learn HTML easily."&gt;</code></td>
            <td class="border border-gray-200 p-2">This is the exact grey text summary that Google displays underneath your blue link in search results.</td>
          </tr>
        </tbody>
      </table>`
    },

    { type: 'section_heading', value: 'Why are Meta Tags Important?' },
    {
      type: 'list',
      value: [
        '<strong>Helps SEO (Search Engine Optimization):</strong> Tells web crawlers exactly what your content is about.',
        '<strong>Improves Mobile Responsiveness:</strong> The viewport meta tag is the magic switch that activates modern responsive web design.',
        '<strong>Social Media Sharing:</strong> Special meta tags create those beautiful large image preview cards when you paste a link into Discord, Twitter, or Slack.',
      ],
    },

    { type: 'section_heading', value: 'Example in Context' },
    { type: 'code_block', language: 'html', value: '<!DOCTYPE html>\n<html>\n<head>\n    <!-- Essential Meta Tags -->\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <meta name="description" content="My awesome personal portfolio website.">\n    \n    <title>My Website</title>\n</head>\n<body>\n    <!-- Visible layout goes here -->\n</body>\n</html>' },

    { type: 'section_heading', value: 'Best Practices' },
    {
      type: 'list',
      value: [
        '<strong>Always, always include <code>charset</code> and <code>viewport</code>.</strong> Treat them as mandatory boilerplate for every file you ever write.',
        '<strong>Write meaningful descriptions:</strong> Keep your <code>description</code> tag under 160 characters so Google does not cut it off with "...".',
      ],
    },

    { type: 'section_heading', value: 'Check Your Understanding' },
    {
      type: 'checkpoint',
      index: 1,
      points: 5,
      value: 'Add the UTF-8 character set meta tag inside the head element.',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Type exactly: <meta charset="UTF-8">' }] }],
    },
    {
      type: 'checkpoint',
      index: 2,
      points: 5,
      value: 'Add a description meta tag stating "My awesome site".',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Use the attributes name="description" and content="My awesome site"' }] }],
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
      order: 6, // Sixth lesson in Module 2
      type: 'lesson',
      title: LESSON_TITLE,
      duration: '20 min',
      language: 'html',
      isTerminal: false,
      fileName: 'meta_tags.html',
      starterCode: '<!DOCTYPE html>\n<html>\n<head>\n  <!-- Add the charset meta tag -->\n  \n\n  <!-- Add the description meta tag -->\n  \n\n  <title>Tutorial Page</title>\n</head>\n<body>\n  <h1>Welcome</h1>\n</body>\n</html>',
      content,
      validationCriteria: [
        { index: 1, matchCode: '<meta charset="UTF-8">' },
        { index: 2, matchCode: '<meta.*name="description".*content="My awesome site".*>' }
      ],
    };

    await lessonsCol.updateOne({ _id: lessonId }, { $set: doc }, { upsert: true });
    
    // Ensure course linkage
    await coursesCol.updateOne(
      { _id: course._id, 'modules._id': mod._id },
      { $set: { 'modules.$.lessons.5': { // Index 5
        _id: lessonId,
        moduleId: mod._id,
        courseId: course._id,
        order: 6,
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
