/**
 * Seed HTML/CSS course — Lesson 5: "Your First HTML Page" (full rich content).
 * Run from CandidateBackend: node scripts/html/first_html_page_seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COURSE_SLUG = 'html-css';
const MODULE_TITLE = 'Introduction to HTML';
const LESSON_TITLE = 'Your First HTML Page';
const LESSON_ID = '69b900188c89a2213bb7134b';

function buildContent() {
  return [
    { type: 'label', value: 'Getting Started' },
    { type: 'heading', value: 'Your First HTML Page' },
    { type: 'duration', value: '30 min' },

    { type: 'section_heading', value: '1. Introduction' },
    { type: 'text', value: 'Creating your first HTML page is the first step into web development. In this lesson, you will learn how to create a file, write the basic code, and view it in your browser.' },
    {
      type: 'list',
      value: [
        'How to create an HTML file',
        'How to write basic HTML code',
        'How to open it in a browser',
      ],
    },
    {
       type: 'rich_text',
       value: '<div class="bg-indigo-50 p-3 rounded border border-indigo-200 text-indigo-800 font-medium my-4 italic underline text-center italic"><strong>IMPORTANT POINT:</strong> HTML files are simple text files with a <code>.html</code> extension.</div>'
    },

    { type: 'section_heading', value: '2. What You Need' },
    { type: 'text', value: 'To create your first HTML page, you only need two basic tools:' },
    {
      type: 'rich_text',
      value: '<div class="grid grid-cols-2 gap-4 my-2"><div class="p-3 bg-gray-50 rounded border"><strong>A Text Editor</strong><br/><ul class="list-disc pl-5 mt-1"><li>Notepad (Windows)</li><li>VS Code (Professional)</li><li>Sublime Text</li></ul></div><div class="p-3 bg-gray-50 rounded border"><strong>A Web Browser</strong><br/><ul class="list-disc pl-5 mt-1"><li>Chrome</li><li>Safari</li><li>Edge</li></ul></div></div>'
    },

    { type: 'section_heading', value: '3. Step-by-Step: Create Your First Page' },
    
    { type: 'rich_text', value: '<h4 class="font-bold text-gray-800 border-b pb-1">Step 1: Create a File</h4>' },
    {
      type: 'list',
      value: [
        'Right-click on your desktop or folder → <strong>New File</strong>',
        'Name it: <code class="bg-gray-100 px-1 rounded">index.html</code>',
      ],
    },
    {
       type: 'rich_text',
       value: '<div class="bg-amber-50 p-2 rounded border border-amber-200 text-amber-800 mb-4 italic"><strong>IMPORTANT POINT:</strong> Always use the <code>.html</code> extension.</div>'
    },

    { type: 'rich_text', value: '<h4 class="font-bold text-gray-800 border-b pb-1 mt-4">Step 2: Write Basic HTML Code</h4>' },
    { type: 'text', value: 'Type the following standard structure into your editor:' },
    {
      type: 'code_block',
      language: 'html',
      value: '<!DOCTYPE html>\n<html>\n<head>\n    <title>My First Page</title>\n</head>\n<body>\n    <h1>Hello World</h1>\n    <p>This is my first HTML page</p>\n</body>\n</html>',
    },

    { type: 'rich_text', value: '<h4 class="font-bold text-gray-800 border-b pb-1 mt-4">Step 3: Save the File</h4>' },
    {
      type: 'list',
      value: [
        'Save the file (Ctrl + S or File → Save)',
        '<strong>Make sure:</strong> File name = <code class="bg-gray-100 px-1">index.html</code> (not .txt)',
      ],
    },

    { type: 'rich_text', value: '<h4 class="font-bold text-gray-800 border-b pb-1 mt-4">Step 4: Open in Browser</h4>' },
    {
      type: 'list',
      value: [
        'Double-click the file',
        'OR: Right-click → <strong>Open with</strong> → Choose your Browser',
      ],
    },
    { type: 'text', value: 'You will see "Hello World" as an official heading and a paragraph below it.' },

    { type: 'section_heading', value: '4. Understanding the Code' },
    {
      type: 'list',
      value: [
        '<strong>&lt;!DOCTYPE html&gt;:</strong> Tells browser this is modern HTML5.',
        '<strong>&lt;html&gt;:</strong> The root element container.',
        '<strong>&lt;head&gt;:</strong> Contains page info (invisible to user).',
        '<strong>&lt;title&gt;:</strong> Text shown in the browser tab.',
        '<strong>&lt;body&gt;:</strong> Contains all visible content.',
        '<strong>&lt;h1&gt;:</strong> Main heading.',
        '<strong>&lt;p&gt;:</strong> Paragraph text.',
      ],
    },

    { type: 'section_heading', value: '5. Adding More Content' },
    { type: 'text', value: 'You can add more elements to build a real page structure:' },
    {
      type: 'code_block',
      language: 'html',
      value: '<body>\n    <h1>Welcome to My Website</h1>\n    <h2>About Me</h2>\n    <p>I am learning HTML</p>\n\n    <h2>My Skills</h2>\n    <p>HTML, CSS, JavaScript</p>\n</body>',
    },

    { type: 'section_heading', value: '6. Adding a Link' },
    { type: 'text', value: 'Use the <strong>Anchor tag</strong> to create links.' },
    { type: 'code_block', language: 'html', value: '<a href="https://www.google.com">Visit Google</a>' },
    {
      type: 'list',
      value: [
        '<strong>&lt;a&gt;:</strong> Anchor tag',
        '<strong>href:</strong> The URL destination',
      ],
    },

    { type: 'section_heading', value: '7. Adding an Image' },
    { type: 'text', value: 'Use the <strong>Image tag</strong> to display pictures.' },
    { type: 'code_block', language: 'html', value: '<img src="image.jpg" alt="My Image">' },
    {
       type: 'rich_text',
       value: '<div class="bg-amber-50 p-2 rounded border border-amber-200 text-amber-800 italic"><strong>IMPORTANT POINT:</strong> The image file must be in the same folder as your HTML file.</div>'
    },

    { type: 'section_heading', value: '8. Common Beginner Mistakes' },
    {
      type: 'list',
      value: [
        'Saving file as <code class="bg-gray-100">index.html.txt</code> instead of <code class="bg-gray-100">index.html</code>.',
        'Missing closing tags like <code class="bg-gray-100">&lt;/body&gt;</code>.',
        'Typing visible content outside of the <code class="bg-gray-100">&lt;body&gt;</code> tag.',
        'Not <strong>saving</strong> the file before refreshing the browser.',
      ],
    },

    { type: 'section_heading', value: '9. Tips for Beginners' },
    {
      type: 'list',
      value: [
        'Always Save (Ctrl/Cmd+S) before opening/refreshing.',
        'Use proper indentation (nesting) for readable code.',
        'Keep code clean and consistent.',
        'Practice making small changes to see what happens.',
      ],
    },

    {
      type: 'code_block',
      language: 'html',
      value: '<!DOCTYPE html>\n<html>\n<head>\n    <title>My Learning List</title>\n</head>\n<body>\n    <h1>Things I am Learning</h1>\n    <ul>\n        <li>HTML Basics</li>\n        <li>File Structure</li>\n    </ul>\n\n    <p>Check out <a href="https://www.example.com">this link</a> for more!</p>\n</body>\n</html>',
    },

    { type: 'section_heading', value: '11. Behind the Scenes' },
    {
      type: 'list',
      value: [
        'Browser reads the HTML file line by line.',
        'It understands the tags (elements).',
        'It builds the internal structure (DOM).',
        'It displays the content on your screen.',
      ],
    },
    {
       type: 'rich_text',
       value: '<div class="bg-indigo-50 p-3 rounded border border-indigo-200 text-indigo-800 font-medium italic my-2"><strong>IMPORTANT POINT:</strong> The browser is the only tool that can directly understand HTML structure.</div>'
    },

    { type: 'section_heading', value: '12. Real World Analogy' },
    {
       type: 'rich_text',
       value: '<div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 my-4 text-green-900 shadow-sm"><strong>The Letter Analogy:</strong><br/>- <strong>HTML:</strong> The structure and address on the envelope.<br/>- <strong>Browser:</strong> The person reading and interpreting the letter.<br/>- <strong>Content:</strong> The actual message inside.</div>',
    },

    { type: 'section_heading', value: '13. Key Points Summary' },
    {
      type: 'list',
      value: [
        'HTML page is a text file with a <code>.html</code> extension.',
        'Any text editor can create them; any browser can read them.',
        'Basic structure (html, head, body) is strictly required.',
        'Tags define what the content IS (heading, link, image).',
      ],
    },

    { type: 'section_heading', value: 'Check Your Understanding' },
    {
      type: 'checkpoint',
      index: 1,
      points: 5,
      value: 'Modify the starter code to change the main heading to <strong>"Welcome to My Page"</strong> and add an <strong>h2</strong> section about your hobbies below it.',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Use <h1> and <h2> tags inside the <body>.' }] }],
    },
    {
      type: 'checkpoint',
      index: 2,
      points: 5,
      value: 'Create a link that points to <strong>"https://www.wikipedia.org"</strong> with the text <strong>"Search Knowledge"</strong>.',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Use the <a href="..."> syntax.' }] }],
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
      order: 5,
      type: 'lesson',
      title: LESSON_TITLE,
      duration: '30 min',
      language: 'html',
      isTerminal: false,
      fileName: 'first_page.html',
      starterCode: '<!DOCTYPE html>\n<html>\n<head>\n    <title>My First Site</title>\n</head>\n<body>\n    <h1>Heading</h1>\n</body>\n</html>',
      content,
      validationCriteria: [
        { index: 1, matchCode: '<h1>Welcome to My Page</h1>' },
        { index: 1, matchCode: '<h2>' },
        { index: 2, matchCode: '<a href="https://www.wikipedia.org">Search Knowledge</a>' },
      ],
    };

    await lessonsCol.updateOne({ _id: lessonId }, { $set: doc }, { upsert: true });
    
    // Ensure course linkage
    await coursesCol.updateOne(
      { _id: course._id, 'modules._id': mod._id },
      { $set: { 'modules.$.lessons.4': {
        _id: lessonId,
        moduleId: mod._id,
        courseId: course._id,
        order: 5,
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
