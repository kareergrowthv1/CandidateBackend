/**
 * Seed HTML/CSS course — Lesson 10: "HTML Best Practices"
 * Run from CandidateBackend: node scripts/html/html_best_practices_seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COURSE_SLUG = 'html-css';
const MODULE_TITLE = 'Introduction to HTML';
const LESSON_TITLE = 'HTML Best Practices';
const LESSON_ID = '6a0100188c89a2213bb7134f'; // Generating a unique ID

function buildContent() {
  return [
    { type: 'label', value: 'Clean Code Standards' },
    { type: 'heading', value: 'HTML Best Practices' },
    { type: 'duration', value: '45 min' },

    { type: 'section_heading', value: '1. Introduction' },
    { type: 'rich_text', value: 'Best Practices are professional guidelines used to write clean, efficient, and maintainable HTML code.' },
    {
      type: 'list',
      value: [
        'They dramatically <strong>improve readability</strong> for yourself and your team.',
        'They help <strong>avoid layout and rendering errors</strong> in different browsers.',
        'They ensure you <strong>follow global web standards</strong> set by the W3C.',
      ],
    },

    { type: 'section_heading', value: '2. Use Proper Structure' },
    { type: 'rich_text', value: 'Always begin your HTML with the absolute foundational structure (the boilerplate).' },
    { type: 'code_block', language: 'html', value: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Page Title</title>\n</head>\n<body>\n    <!-- Content goes here -->\n</body>\n</html>' },

    { type: 'section_heading', value: '3. Use Semantic Tags' },
    { type: 'rich_text', value: 'Use tags that carry meaning, rather than generic <code>&lt;div&gt;</code> tags for everything. It helps search engines (SEO) and screen readers understand your page.' },
    {
      type: 'list',
      value: [
        '<code>&lt;header&gt;</code> (for top navigation or titles)',
        '<code>&lt;footer&gt;</code> (for bottom copyright/links)',
        '<code>&lt;article&gt;</code> (for standalone content)',
        '<code>&lt;section&gt;</code> (for thematic groupings)',
      ],
    },

    { type: 'section_heading', value: '4. Write Clean and Readable Code' },
    { type: 'rich_text', value: 'Human eyes need to read your code. Space it out nicely.' },
    {
      type: 'list',
      value: [
        'Use consistent indentation (usually 2 or 4 spaces) for nested tags.',
        'Use empty line spacing to divide major sections of the page.',
        'Keep code logically organized.',
      ],
    },

    { type: 'section_heading', value: '5. Always Close Tags' },
    { type: 'rich_text', value: 'Even if the browser allows you to skip closing a <code>&lt;p&gt;</code> or <code>&lt;li&gt;</code> tag, <strong>close all tags anyway</strong>. It prevents invisible bugs.' },

    { type: 'section_heading', value: '6. Use Lowercase' },
    { type: 'rich_text', value: 'Write tag names and attribute names in strictly lowercase. It is the modern standard.' },
    { type: 'code_block', language: 'html', value: '<!-- Good -->\n<p class="text">\n\n<!-- Bad -->\n<P CLASS="text">' },

    { type: 'section_heading', value: '7. Use Quotes for Attributes' },
    { type: 'rich_text', value: 'Never omit double quotes around attribute values.' },
    {
      type: 'list',
      value: [
        '<strong>Correct:</strong> <code>&lt;a href="link.html"&gt;</code>',
        '<strong>Wrong:</strong> <code>&lt;a href=link.html&gt;</code>',
      ],
    },

    { type: 'section_heading', value: '8. Avoid Inline Styles' },
    { type: 'rich_text', value: 'Do not mix your layout structure (HTML) with your design styles (CSS).' },
    {
      type: 'list',
      value: [
        '<strong>Bad:</strong> <code>&lt;p style="color:red"&gt;</code>',
        '<strong>Good:</strong> Assign a class and use an external CSS file.',
      ],
    },

    { type: 'section_heading', value: '9. Use Meaningful Names' },
    { type: 'rich_text', value: 'When giving elements an <code>id</code> or a <code>class</code>, clearly state their purpose.' },
    {
      type: 'list',
      value: [
        '<code>class="header"</code>',
        '<code>id="main-content"</code>',
      ],
    },

    { type: 'section_heading', value: '10. Optimize Images' },
    { type: 'rich_text', value: 'Large images slow down websites heavily.' },
    {
      type: 'list',
      value: [
        'Use properly sized web-formats (WebP, optimized JPEG).',
        'Always, always include an exact, descriptive <code>alt</code> attribute.',
      ],
    },

    { type: 'section_heading', value: '11. Keep Files Organized' },
    { type: 'rich_text', value: 'A professional project separates concerns into clean folders.' },
    {
      type: 'list',
      value: [
        'Separate HTML, CSS, and JS into different files.',
        'Use folders like <code>/styles</code>, <code>/scripts</code>, and <code>/images</code>.',
      ],
    },

    { type: 'section_heading', value: '12. Validate HTML' },
    { type: 'rich_text', value: 'Use tools like the W3C Validator to automatically check your code for unclosed tags or structural errors against global standards.' },

    { type: 'section_heading', value: '13. Accessibility First' },
    { type: 'rich_text', value: 'Ensure users with disabilities can navigate your site.' },
    {
      type: 'list',
      value: [
        'Use <code>alt</code> text on all informational images.',
        'Use proper and ordered headings (H1, then H2, then H3—do not skip levels).',
      ],
    },

    { type: 'section_heading', value: '14. Performance Tips' },
    {
      type: 'list',
      value: [
        'Minimize code (remove unnecessary spaces/comments in production).',
        'Avoid wrapping things in too many unnecessary <code>&lt;div&gt;</code> elements ("div soup").',
      ],
    },

    { type: 'section_heading', value: '15. Common Mistakes Review' },
    {
      type: 'list',
      value: [
        'Poor, unreadable document structure.',
        'Zero code indentation.',
        'Overusing <code>&lt;div&gt;</code> instead of semantic tags like <code>&lt;section&gt;</code>.',
      ],
    },

    { type: 'section_heading', value: '16. Key Points Summary' },
    {
      type: 'list',
      value: [
        'Writing clean code separates professionals from amateurs.',
        'Always follow standards (lowercase, quotes, closing tags).',
        'Keep structure highly organized through proper spacing and semantic elements.',
      ],
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
      order: 10,
      type: 'lesson',
      title: LESSON_TITLE,
      duration: '45 min',
      language: 'html',
      isTerminal: false,
      fileName: 'best_practices.html',
      starterCode: '<!DOCTYPE html>\n<html>\n<body>\n    <!-- Write clean, semantic HTML here -->\n    \n</body>\n</html>',
      content,
      validationCriteria: [
        { index: 1, matchCode: '<!DOCTYPE html>' }
      ],
    };

    await lessonsCol.updateOne({ _id: lessonId }, { $set: doc }, { upsert: true });
    
    // Ensure course linkage
    await coursesCol.updateOne(
      { _id: course._id, 'modules._id': mod._id },
      { $set: { 'modules.$.lessons.9': {
        _id: lessonId,
        moduleId: mod._id,
        courseId: course._id,
        order: 10,
        type: 'lesson',
        title: LESSON_TITLE,
        duration: '45 min',
        language: 'html'
      } } }
    );

    console.log('✅ Lesson "' + LESSON_TITLE + '" seeded successfully.');
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
