/**
 * Seed HTML/CSS course — Lesson 1: "What is HTML?" (full rich content).
 * Run from CandidateBackend: node scripts/html/html_seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COURSE_SLUG = 'html-css';
const MODULE_TITLE = 'Introduction to HTML';
const LESSON_TITLE = 'What is HTML?';

const SIMPLE_HTML_STARTER = `<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>`;

function buildContent() {
  return [
    { type: 'label', value: 'HTML' },
    { type: 'heading', value: 'What is HTML?' },
    { type: 'duration', value: '25 min' },

    { type: 'section_heading', value: 'Introduction' },
    { type: 'text', value: 'HTML is the standard markup language for creating Web pages.' },
    {
      type: 'list',
      value: [
        'HTML stands for <strong>Hyper Text Markup Language</strong>',
        'HTML is the standard markup language for creating Web pages',
        'HTML describes the structure of a Web page',
        'HTML consists of a series of elements',
        'HTML elements tell the browser how to display the content',
        'HTML elements label pieces of content such as "this is a heading", "this is a paragraph", etc.',
      ],
    },
    {
      type: 'rich_text',
      value: 'HTML is not a programming language; it is a markup language used to define the structure of content on the web. HTML works together with CSS (for styling) and JavaScript (for behavior). HTML uses tags to mark up content so browsers can interpret and render it correctly. HTML files are saved with a <code class="font-mono">.html</code> or <code class="font-mono">.htm</code> extension. HTML is platform-independent and works on all devices and browsers. HTML follows a tree-like structure called the DOM (Document Object Model). HTML elements can be nested inside each other forming parent-child relationships. HTML is case-insensitive, but lowercase is recommended as best practice. HTML5 is the latest standard and introduces semantic tags, multimedia support, and better APIs.',
    },

    { type: 'section_heading', value: 'A Simple HTML Document' },
    { type: 'section_heading', value: 'Example' },
    {
      type: 'code_block',
      language: 'html',
      value: `<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>`,
    },
    { type: 'section_heading', value: 'Example Explained' },
    {
      type: 'list',
      value: [
        'The <code class="font-mono">&lt;!DOCTYPE html&gt;</code> declaration defines that this document is an HTML5 document',
        'The <code class="font-mono">&lt;html&gt;</code> element is the root element of an HTML page',
        'The <code class="font-mono">&lt;head&gt;</code> element contains meta information about the HTML page',
        'The <code class="font-mono">&lt;title&gt;</code> element specifies a title for the HTML page (which is shown in the browser\'s title bar or in the page\'s tab)',
        'The <code class="font-mono">&lt;body&gt;</code> element defines the document\'s body, and is a container for all the visible contents, such as headings, paragraphs, images, hyperlinks, tables, lists, etc.',
        'The <code class="font-mono">&lt;h1&gt;</code> element defines a large heading',
        'The <code class="font-mono">&lt;p&gt;</code> element defines a paragraph',
      ],
    },
    {
      type: 'text',
      value: 'The browser reads HTML from top to bottom and renders the page accordingly. Whitespace in HTML (spaces, tabs, new lines) is generally ignored by browsers. Indentation is used for readability but does not affect output. HTML elements can contain attributes that provide additional information. Attributes usually come in name="value" pairs.',
    },

    { type: 'section_heading', value: 'What is an HTML Element?' },
    {
      type: 'rich_text',
      value: 'An HTML element is defined by a start tag, some content, and an end tag: <code class="font-mono">&lt;tagname&gt; Content goes here... &lt;/tagname&gt;</code>',
    },
    {
      type: 'text',
      value: 'The HTML element is everything from the start tag to the end tag:',
    },
    {
      type: 'code_block',
      language: 'html',
      value: '<h1>My First Heading</h1>\n<p>My first paragraph.</p>',
    },
    {
      type: 'rich_text',
      value: '<table class="min-w-full text-sm border-collapse border border-gray-200"><thead><tr class="bg-gray-50"><th class="px-4 py-2 border">Start tag</th><th class="px-4 py-2 border">Element content</th><th class="px-4 py-2 border">End tag</th></tr></thead><tbody><tr><td class="px-4 py-2 border font-mono">&lt;h1&gt;</td><td class="px-4 py-2 border">My First Heading</td><td class="px-4 py-2 border font-mono">&lt;/h1&gt;</td></tr><tr><td class="px-4 py-2 border font-mono">&lt;p&gt;</td><td class="px-4 py-2 border">My first paragraph.</td><td class="px-4 py-2 border font-mono">&lt;/p&gt;</td></tr><tr><td class="px-4 py-2 border font-mono">&lt;br&gt;</td><td class="px-4 py-2 border">none</td><td class="px-4 py-2 border">none</td></tr></tbody></table>',
    },
    {
      type: 'text',
      value: 'Note: Some HTML elements have no content (like the <br> element). These elements are called empty elements. Empty elements do not have an end tag! Empty elements can also include <img>, <input>, <meta>, <link>. Some elements are block-level (take full width) and some are inline (take only needed space). Block elements example: <p>, <h1>. Inline elements example: <strong>, <em>.',
    },

    { type: 'section_heading', value: 'Web Browsers' },
    {
      type: 'text',
      value: 'The purpose of a web browser (Chrome, Edge, Firefox, Safari) is to read HTML documents and display them correctly. A browser does not display the HTML tags, but uses them to determine how to display the document.',
    },
    {
      type: 'rich_text',
      value: 'Browsers parse HTML and create a DOM structure internally. Rendering engines (like Blink, WebKit) interpret HTML and CSS to display the page. Different browsers may render slight differences, but standards ensure consistency.',
    },

    { type: 'section_heading', value: 'HTML Page Structure' },
    {
      type: 'text',
      value: 'Below is a visualization of an HTML page structure:',
    },
    {
      type: 'code_block',
      language: 'html',
      value: `<html>
<head>
<title>Page title</title>
</head>
<body>
<h1>This is a heading</h1>
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>
</body>
</html>`,
    },
    {
      type: 'text',
      value: 'Note: The content inside the <body> section will be displayed in a browser. The content inside the <title> element will be shown in the browser\'s title bar or in the page\'s tab. The <head> section may also include meta tags, links to CSS, scripts, and other resources. The <body> contains all visible UI elements of the webpage.',
    },

    { type: 'section_heading', value: 'HTML structure overview' },
    {
      type: 'image',
      value: '/images/html_intro.png',
      caption: 'HTML document structure and key concepts',
    },

    { type: 'section_heading', value: 'Why do we need HTML?' },
    {
      type: 'text',
      value: 'If you try to write a web page using just plain text, the browser will display it as one long, unorganized string. HTML (HyperText Markup Language) allows you to "mark up" your text so the browser understands the structure.',
    },
    {
      type: 'rich_text',
      value: '<div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 my-4"><strong>Key Concept:</strong> Plain text is just data. HTML is data + structure. It tells the browser where a heading starts, where a paragraph ends, and where an image should be placed.</div>',
    },
    { type: 'section_heading', value: 'The Role of HTML' },
    {
      type: 'text',
      value: 'HTML is one of the three core technologies of the web. It works alongside CSS and JavaScript to create the modern web experience:',
    },
    {
      type: 'list',
      value: [
        '<strong>HTML (The Skeleton):</strong> Provides the structure and content of the page.',
        '<strong>CSS (The Skin):</strong> Controls the look, colors, and layout.',
        '<strong>JavaScript (The Brain):</strong> Adds interactivity and dynamic behavior.',
      ],
    },
    {
      type: 'text',
      value: 'Without HTML, there would be no foundation for CSS or JavaScript to work on. It is the essential starting point for every website on the internet.',
    },

    { type: 'section_heading', value: 'Instructions' },
    {
      type: 'checkpoint',
      index: 1,
      points: 5,
      value: 'Edit the starter code: change the heading to <code class="font-mono">"My First Web Page"</code> and the paragraph to <code class="font-mono">"Hello, World!"</code>. Click <strong>Run</strong> to see your page in the preview.',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Update the text inside the <h1> and <p> tags, then run to view the result in the browser preview.' }] }],
    },
    {
      type: 'checkpoint',
      index: 2,
      points: 5,
      value: 'Add a second paragraph with any short sentence. Run again to confirm both paragraphs appear.',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Use another <p>...</p> element inside <body>.' }] }],
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
      console.error('❌ Course with slug "' + COURSE_SLUG + '" not found. Run seed_html_css.js first.');
      return;
    }

    let mod = (course.modules || []).find((m) => m.title === MODULE_TITLE);
    if (!mod) {
      console.error('❌ Module "' + MODULE_TITLE + '" not found.');
      return;
    }

    const moduleId = mod._id;
    const courseId = course._id;
    let lessonStub = (mod.lessons || []).find((l) => l.title === LESSON_TITLE);
    if (!lessonStub) {
      lessonStub = {
        _id: new ObjectId(),
        moduleId,
        courseId,
        order: 1,
        type: 'lesson',
        title: LESSON_TITLE,
        duration: '25 min',
        language: 'html',
      };
      await coursesCol.updateOne(
        { _id: courseId, 'modules._id': moduleId },
        { $push: { 'modules.$.lessons': lessonStub } }
      );
      console.log('✅ Created lesson stub:', LESSON_TITLE);
    }

    const lessonId = lessonStub._id;
    const content = buildContent();
    const doc = {
      _id: lessonId,
      moduleId,
      courseId,
      order: lessonStub.order || 1,
      type: 'lesson',
      title: LESSON_TITLE,
      duration: '25 min',
      language: 'html',
      isTerminal: false,
      fileName: 'index.html',
      starterCode: SIMPLE_HTML_STARTER,
      content,
      validationCriteria: [
        { index: 1, matchCode: '<h1>My First Web Page</h1>' },
        { index: 2, matchCode: '<p>.*</p>.*<p>.*</p>' },
      ],
    };

    await lessonsCol.updateOne({ _id: lessonId }, { $set: doc }, { upsert: true });
    console.log('✅ Lesson "' + LESSON_TITLE + '" seeded with full content (HTML, image, checkpoints).');
  } finally {
    await client.close();
  }
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
