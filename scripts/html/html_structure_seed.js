/**
 * Seed HTML/CSS course — Lesson 3: "HTML File Structure" (full rich content).
 * Run from CandidateBackend: node scripts/html/html_structure_seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COURSE_SLUG = 'html-css';
const MODULE_TITLE = 'Introduction to HTML';
const LESSON_TITLE = 'HTML File Structure';
const LESSON_ID = '69b900188c89a2213bb71349';

function buildContent() {
  return [
    { type: 'label', value: 'HTML Foundation' },
    { type: 'heading', value: 'HTML File Structure' },
    { type: 'duration', value: '30 min' },

    { type: 'section_heading', value: '1. Introduction' },
    { type: 'text', value: 'An HTML file is the basic building block of any webpage. It defines the structure of the page and the specific content to be displayed in the browser.' },
    {
      type: 'rich_text',
      value: '<div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 my-4 text-blue-900 font-medium"><strong>Key Concepts:</strong><br/>- Every webpage starts with an HTML file.<br/>- Browsers read HTML files from top to bottom.</div>',
    },

    { type: 'section_heading', value: '2. Basic HTML File Structure' },
    { type: 'text', value: 'Every HTML document follows a standard, mandatory structure that tells the browser how to interpret the page:' },
    {
      type: 'code_block',
      language: 'html',
      value: '<!DOCTYPE html>\n<html>\n<head>\n    <title>My First Page</title>\n</head>\n<body>\n    <h2>Hello World</h2>\n</body>\n</html>',
    },

    { type: 'section_heading', value: 'Visual Website Layout' },
    {
      type: 'image',
      value: '/images/simple_website_preview.png',
      caption: 'Visualizing how HTML structure translates to a rendered website (Header, Menu, Content).',
    },

    { type: 'section_heading', value: '3. Explanation of Each Part' },
    
    { type: 'rich_text', value: '<h4 class="font-bold text-gray-800 underline">a) &lt;!DOCTYPE html&gt;</h4>' },
    { type: 'text', value: 'This declares the document type. It tells the browser that this is an HTML5 document, which helps the browser render the page correctly and consistently.' },

    { type: 'rich_text', value: '<h4 class="font-bold text-gray-800 underline mt-4">b) &lt;html&gt; Tag</h4>' },
    { type: 'text', value: 'The root element of the HTML document. All other content (head, body, etc.) must be nested inside this tag.' },
    {
      type: 'code_block',
      language: 'html',
      value: '<html>\n    <!-- head + body sections go here -->\n</html>',
    },

    { type: 'rich_text', value: '<h4 class="font-bold text-gray-800 underline mt-4">c) &lt;head&gt; Section</h4>' },
    { type: 'text', value: 'Contains metadata—information about the page that is NOT visible to the user. This section is used by the browser, search engines (SEO), and for linking external resources.' },
    {
      type: 'list',
      value: [
        '<strong>Title:</strong> The name of the page.',
        '<strong>Meta tags:</strong> Encoding, descriptions, keywords.',
        '<strong>Links:</strong> Connections to CSS stylesheets.',
        '<strong>Scripts:</strong> Optional JavaScript files.',
      ],
    },
    {
       type: 'rich_text',
       value: '<div class="bg-amber-50 p-3 rounded border border-amber-200 text-amber-800 text-xs italic"><strong>Note:</strong> Content in the Head is for the machine; content in the Body is for the human.</div>'
    },

    { type: 'rich_text', value: '<h4 class="font-bold text-gray-800 underline mt-4">d) &lt;title&gt; Tag</h4>' },
    { type: 'text', value: 'Defines the title of the webpage that appears in the browser tab.' },
    { type: 'code_block', language: 'html', value: '<title>My First Website</title>' },

    { type: 'rich_text', value: '<h4 class="font-bold text-gray-800 underline mt-4">e) &lt;body&gt; Section</h4>' },
    { type: 'text', value: 'Contains all the visible content that users see and interact with (Text, Images, Links, Buttons).' },
    {
      type: 'code_block',
      language: 'html',
      value: '<body>\n    <h2>Welcome</h2>\n    <p>This is my page</p>\n</body>',
    },

    { type: 'section_heading', value: '4. Complete Example with Comments' },
    {
      type: 'code_block',
      language: 'html',
      value: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Student Page</title>\n</head>\n<body>\n    <h2>This is Heading</h2>\n    <p>This is Paragraph</p>\n</body>\n</html>',
    },

    { type: 'section_heading', value: '5. Indentation and Formatting' },
    { type: 'text', value: 'It is a best practice to use proper spacing and indentation. This does not change how the page looks to the user, but it makes your code much more readable for you and other developers.' },
    {
      type: 'code_block',
      language: 'html',
      value: '<html>\n    <head>\n        <title>Page</title>\n    </head>\n    <body>\n        <h2>Hello</h2>\n    </body>\n</html>',
    },

    { type: 'section_heading', value: '6. Case Sensitivity' },
    {
       type: 'rich_text',
       value: 'HTML tags are <strong>NOT</strong> case sensitive (<code class="font-mono">&lt;body&gt;</code> is same as <code class="font-mono">&lt;BODY&gt;</code>). However, the industry standard is to always use <strong>lowercase</strong> for tags.',
    },

    { type: 'section_heading', value: '7. File Extension' },
    { type: 'text', value: 'HTML files must be saved with the <code class="font-mono">.html</code> extension to be recognized by browsers.' },
    {
      type: 'list',
      value: ['index.html (Standard home page name)', 'home.html', 'about.html'],
    },

    { type: 'section_heading', value: '8. How Browsers Read HTML' },
    { type: 'text', value: 'Browsers parse the file from top to bottom, building a internal structure called the <strong>DOM (Document Object Model)</strong> before displaying the content.' },

    { type: 'section_heading', value: '9. Common Beginner Mistakes' },
    {
      type: 'list',
      value: [
        'Missing closing tags (e.g. starting <p> but never writing </p>)',
        'Forgetting the <code class="font-mono">&lt;!DOCTYPE html&gt;</code> declaration.',
        'Writing content outside of the <code class="font-mono">&lt;body&gt;</code> tags.',
        'Saving the file with the wrong extension (e.g., <code class="font-mono">index.txt</code>).',
      ],
    },

    { type: 'section_heading', value: '10. Real World Analogy' },
    {
      type: 'rich_text',
      value: '<div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 my-4"><strong>The Human Body Analogy:</strong><br/>- <strong>&lt;html&gt;:</strong> The Whole Body.<br/>- <strong>&lt;head&gt;:</strong> The Brain (Contains info/logic, but isn\'t visible).<br/>- <strong>&lt;body&gt;:</strong> Face & Limbs (Everything you can actually see).</div>',
    },

    { type: 'section_heading', value: '11. Key Points Summary' },
    {
      type: 'list',
      value: [
        'HTML has a fixed, hierarchical basic structure.',
        '<!DOCTYPE html> defines a modern HTML5 document.',
        'The &lt;head&gt; stores metadata; the &lt;body&gt; displays content.',
        'Files must be saved as .html.',
        'Order and nesting matter significantly.',
      ],
    },

    { type: 'section_heading', value: 'Instructions' },
    {
      type: 'checkpoint',
      index: 1,
      points: 5,
      value: 'Edit the code below: Change the content of the <code class="font-mono">&lt;title&gt;</code> tag to <strong>"My Learning Path"</strong> and run the code.',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Look inside the <head> section for the <title> tag.' }] }],
    },
    {
      type: 'checkpoint',
      index: 2,
      points: 5,
      value: 'In the <code class="font-mono">&lt;body&gt;</code>, add an <code class="font-mono">&lt;h2&gt;</code> tag with the text <strong>"Module 1: Basics"</strong> below the main heading.',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'The <h2> tag behaves just like the <h1> tag but is slightly smaller.' }] }],
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
      order: 3,
      type: 'lesson',
      title: LESSON_TITLE,
      duration: '30 min',
      language: 'html',
      isTerminal: false,
      fileName: 'index.html',
      starterCode: '<!DOCTYPE html>\n<html>\n<head>\n    <title>Original Title</title>\n</head>\n<body>\n    <h2>Getting Started</h2>\n</body>\n</html>',
      content,
      validationCriteria: [
        { index: 1, matchCode: '<title>My Learning Path</title>' },
        { index: 2, matchCode: '<h2>Module 1: Basics</h2>' },
      ],
    };

    await lessonsCol.updateOne({ _id: lessonId }, { $set: doc }, { upsert: true });
    
    // Ensure course linkage
    await coursesCol.updateOne(
      { _id: course._id, 'modules._id': mod._id },
      { $set: { 'modules.$.lessons.2': {
        _id: lessonId,
        moduleId: mod._id,
        courseId: course._id,
        order: 3,
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
