/**
 * Seed HTML/CSS course — Lesson 1 (Module 2): "<!DOCTYPE html> Declaration"
 * Run from CandidateBackend: node scripts/html/doctype_declaration_seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COURSE_SLUG = 'html-css';
const MODULE_TITLE = 'Basic HTML Structure';
const LESSON_TITLE = '<!DOCTYPE html> Declaration';
const LESSON_ID = '6a0100188c89a2213bb71350'; // Generating a unique ID

function buildContent() {
  return [
    { type: 'label', value: 'The First Line' },
    { type: 'heading', value: '<!DOCTYPE html> Declaration' },
    { type: 'duration', value: '15 min' },

    { type: 'section_heading', value: 'Introduction' },
    { type: 'rich_text', value: 'The <code>&lt;!DOCTYPE html&gt;</code> declaration is the very first line in an HTML document. It tells the browser which version of HTML is being used so that the page is rendered correctly. In modern web development, it represents HTML5 and ensures that all browsers follow a standard way of displaying the webpage. Without this declaration, browsers may switch to "quirks mode", which can cause severe layout and styling issues.' },

    { type: 'section_heading', value: 'What is <!DOCTYPE html> Basically?' },
    {
      type: 'list',
      value: [
        'It is <strong>NOT</strong> an HTML tag.',
        'It is an <strong>instruction</strong> to the browser about what document type to expect.',
        'It defines the document type and version (defaults to HTML5).',
      ],
    },
    {
       type: 'rich_text',
       value: '<div class="bg-indigo-50 p-3 rounded border border-indigo-200 text-indigo-800 font-medium my-4 italic underline text-center"><strong>IMPORTANT POINT:</strong> It must always be the very first line in the HTML file, before any tags.</div>'
    },

    { type: 'section_heading', value: 'Why is it Important?' },
    {
      type: 'list',
      value: [
        '<strong>Ensures consistency:</strong> It ensures consistent rendering across different browsers (Chrome, Safari, Firefox).',
        '<strong>Prevents compatibility issues:</strong> Stops browsers from breaking their layout algorithms based on old assumptions.',
        '<strong>Enables standards mode:</strong> Forces browsers to use modern layout behaviors rather than legacy ones.',
      ],
    },
    {
       type: 'rich_text',
       value: '<div class="bg-red-50 p-2 rounded border border-red-200 text-red-800 italic mb-4 text-center"><strong>WARNING:</strong> Without it, the browser may behave unpredictably.</div>'
    },

    { type: 'section_heading', value: 'Syntax' },
    { type: 'rich_text', value: 'The syntax is incredibly simple and short in HTML5. It does not require a closing tag.' },
    { type: 'code_block', language: 'html', value: '<!DOCTYPE html>' },

    { type: 'section_heading', value: 'How the Browser Uses It' },
    {
      type: 'list',
      value: [
        'The browser reads the <code>&lt;!DOCTYPE html&gt;</code> declaration instantly when loading the file.',
        'It immediately switches its internal engine to standard rendering mode.',
        'It process all subsequent HTML code correctly based on modern HTML5 standards.',
      ],
    },

    { type: 'section_heading', value: 'Example: A Basic Built Page' },
    { type: 'rich_text', value: 'Notice how it sits at the absolute top of the document structure:' },
    { type: 'code_block', language: 'html', value: '<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <h1>Hello World</h1>\n</body>\n</html>' },

    { type: 'section_heading', value: 'What Happens Without It?' },
    { type: 'rich_text', value: 'If you omit the doctype, you force the browser into a fallback processing state:' },
    { type: 'code_block', language: 'html', value: '<!-- Missing Doctype Example -->\n<html>\n<head>\n    <title>No Doctype</title>\n</head>\n<body>\n    <h1>Hello</h1>\n</body>\n</html>' },
    { type: 'rich_text', value: '<strong>The Result:</strong>' },
    {
      type: 'list',
      value: [
        'Browser may enter "quirks mode".',
        'The layout grid may break entirely.',
        'CSS sizing, padding, and positioning may behave radically differently between different browsers.',
      ],
    },

    { type: 'section_heading', value: 'Old HTML Doctype (For Knowledge)' },
    { type: 'rich_text', value: 'Before HTML5, the web relied on older standards like HTML4 or XHTML. These required massive, confusing doctypes that referenced specific internet URL dictionaries.' },
    { type: 'rich_text', value: '<strong>Example from ancient HTML4:</strong>' },
    { type: 'code_block', language: 'html', value: '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"\n"http://www.w3.org/TR/html4/strict.dtd">' },
    {
       type: 'rich_text',
       value: '<div class="bg-green-50 p-3 rounded border border-green-200 text-green-800 font-medium italic mt-2 text-center"><strong>Thankfully:</strong> HTML5 simplified this down to a pristine single line!</div>'
    },

    { type: 'section_heading', value: 'Best Practices' },
    {
      type: 'list',
      value: [
        'Always, universally include <code>&lt;!DOCTYPE html&gt;</code> on every webpage.',
        'Place it at the absolute top of the file (Line 1).',
        'Do not add any text, spaces, comments, or whitespace before it.',
      ],
    },

    { type: 'section_heading', value: 'Real World Analogy' },
    {
       type: 'rich_text',
       value: '<div class="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 my-4 text-indigo-900 shadow-sm"><strong>The Rulebook Analogy:</strong><br/>Think of the Doctype declaration like handing the browser a rulebook.<br/><br/>It explicitly tells the browser: "Follow the rules written in the HTML5 manual." Without that rulebook, the browser just has to guess what rules apply to your code, leading to mistakes.</div>',
    },

    { type: 'section_heading', value: 'Key Points Summary' },
    {
      type: 'list',
      value: [
        'It defines the HTML version (HTML5).',
        'It is NOT an HTML tag.',
        'It MUST be the very first line of code.',
        'It enables "standards mode" to prevent layout rendering errors.',
      ],
    },

    { type: 'section_heading', value: 'Check Your Understanding' },
    {
      type: 'checkpoint',
      index: 1,
      points: 5,
      value: 'Add the required HTML5 Doctype Declaration to the top of the blank file below.',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'It must begin with an exclamation mark, be entirely uppercase for DOCTYPE, and use angled brackets.' }] }],
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
      order: 1, // First lesson in Module 2
      type: 'lesson',
      title: LESSON_TITLE,
      duration: '15 min',
      language: 'html',
      isTerminal: false,
      fileName: 'doctype.html',
      starterCode: '<!-- Write the Doctype here: -->\n\n\n<html>\n<head>\n  <title>Testing</title>\n</head>\n<body>\n  <h1>Welcome</h1>\n</body>\n</html>',
      content,
      validationCriteria: [
        { index: 1, matchCode: '<!DOCTYPE html>.*' }
      ],
    };

    await lessonsCol.updateOne({ _id: lessonId }, { $set: doc }, { upsert: true });
    
    // Ensure course linkage
    // We update the first lesson in the array (index 0)
    await coursesCol.updateOne(
      { _id: course._id, 'modules._id': mod._id },
      { $set: { 'modules.$.lessons.0': {
        _id: lessonId,
        moduleId: mod._id,
        courseId: course._id,
        order: 1,
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
