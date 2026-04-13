/**
 * Seed HTML/CSS course — Lesson 7 (Module 2): "Page Metadata"
 * Run from CandidateBackend: node scripts/html/page_metadata_seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COURSE_SLUG = 'html-css';
const MODULE_TITLE = 'Basic HTML Structure';
const LESSON_TITLE = 'Page Metadata';
const LESSON_ID = '6a0100188c89a2213bb71356'; // Generating a unique ID

function buildContent() {
  return [
    { type: 'label', value: 'Search Engine Signals' },
    { type: 'heading', value: 'Page Metadata' },
    { type: 'duration', value: '15 min' },

    { type: 'section_heading', value: 'Introduction' },
    { type: 'rich_text', value: 'Building on the previous lesson, <strong>Page Metadata</strong> specifically refers to the informational layer of your document. It is essentially the "about the author" and "book summary" section of your webpage, critical for how the outside world categorizes your site.' },

    { type: 'section_heading', value: 'Definition' },
    {
      type: 'list',
      value: [
        'It is literally <strong>Data about Data</strong>.',
        'It is stored exclusively inside the <code>&lt;head&gt;</code> element.',
        'It is used by search engine web crawlers (like Googlebot) to index your page appropriately in search results.',
      ],
    },

    { type: 'section_heading', value: 'Core Types of Metadata' },
    { type: 'rich_text', value: 'There are four primary pillars of page metadata that impact how the webpage is perceived:' },
    {
      type: 'list',
      value: [
        '<strong>Title:</strong> The clickable headline in search results.',
        '<strong>Description:</strong> The summary snippet beneath the title.',
        '<strong>Keywords:</strong> (Legacy) Words associated with your page.',
        '<strong>Author:</strong> The individual or organization that created the content.',
      ],
    },

    { type: 'section_heading', value: 'Examples' },
    { type: 'rich_text', value: 'You implement these pillars directly using <code>&lt;meta&gt;</code> and <code>&lt;title&gt;</code> tags:' },
    { type: 'code_block', language: 'html', value: '<head>\n    <!-- 1. The Title Pillar -->\n    <title>Learn Modern HTML | WebDev Academy</title>\n\n    <!-- 2. The Description Pillar -->\n    <meta name="description" content="A comprehensive guide to learning modern HTML5 structure.">\n\n    <!-- 3. The Author Pillar -->\n    <meta name="author" content="Sharan">\n\n    <!-- 4. The Keywords Pillar (Note: Mostly ignored by Google today, but good to know!) -->\n    <meta name="keywords" content="HTML, CSS, Web Development, Programming">\n</head>' },

    { type: 'section_heading', value: 'Importance' },
    {
      type: 'list',
      value: [
        '<strong>Helps search engines radically understand your content:</strong> If you do not give Google a description, it just randomly grabs the first text it spots on your page, which looks incredibly unprofessional.',
        '<strong>Directly improves website ranking (SEO):</strong> A well-written description matching search intent makes users incredibly likely to click your link over a competitor.',
        '<strong>Verification & Credit:</strong> Setting the author tag ensures proper attribution and is sometimes used by specialized feed scrapers.',
      ],
    },

    { type: 'section_heading', value: 'Best Practices' },
    {
      type: 'list',
      value: [
        '<strong>Keep metadata highly accurate:</strong> Clickbait descriptions ("Win a million dollars!") will penalize your site\'s ranking when users instantly bounce back to Google.',
        '<strong>Avoid Keyword Stuffing:</strong> Do not just list 500 comma-separated keywords inside the keyword tag. It is considered an outdated, spammy tactic that search engines might actively penalize.',
      ],
    },

    { type: 'section_heading', value: 'Check Your Understanding' },
    {
      type: 'checkpoint',
      index: 1,
      points: 5,
      value: 'Create an author meta tag with the content "John Doe".',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Use name="author", and place John Doe inside the content property.' }] }],
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
      order: 7, // Seventh lesson in Module 2
      type: 'lesson',
      title: LESSON_TITLE,
      duration: '15 min',
      language: 'html',
      isTerminal: false,
      fileName: 'metadata.html',
      starterCode: '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Course Catalog</title>\n\n  <!-- Create the author meta tag right here: -->\n  \n\n</head>\n<body>\n  <h1>Welcome</h1>\n</body>\n</html>',
      content,
      validationCriteria: [
        { index: 1, matchCode: '<meta.*name="author".*content="John Doe".*>' }
      ],
    };

    await lessonsCol.updateOne({ _id: lessonId }, { $set: doc }, { upsert: true });
    
    // Ensure course linkage
    await coursesCol.updateOne(
      { _id: course._id, 'modules._id': mod._id },
      { $set: { 'modules.$.lessons.6': { // Index 6
        _id: lessonId,
        moduleId: mod._id,
        courseId: course._id,
        order: 7,
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
