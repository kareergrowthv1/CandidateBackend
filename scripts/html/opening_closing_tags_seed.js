/**
 * Seed HTML/CSS course — Lesson 7: "Opening and Closing Tags" (full rich content).
 * Run from CandidateBackend: node scripts/html/opening_closing_tags_seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COURSE_SLUG = 'html-css';
const MODULE_TITLE = 'Introduction to HTML';
const LESSON_TITLE = 'Types of HTML Tags';
const LESSON_ID = '69b900188c89a2213bb7134d';

function buildContent() {
  return [
    { type: 'label', value: 'Syntax Basics' },
    { type: 'heading', value: 'Types of HTML Tags' },
    { type: 'duration', value: '30 min' },

    { type: 'section_heading', value: '1. Introduction' },
    { type: 'rich_text', value: 'Opening and Closing Tags are the most fundamental concepts in HTML. They act like the start and end markers for your content, defining exactly where an element begins and where it ends within the page structure.' },
    {
       type: 'rich_text',
       value: '<div class="bg-indigo-50 p-3 rounded border border-indigo-200 text-indigo-800 font-medium my-4 italic underline text-center"><strong>IMPORTANT POINT:</strong> Almost every HTML element uses a pair of opening and closing tags.</div>'
    },

    { type: 'section_heading', value: '2. Types of HTML Tags' },
    { type: 'rich_text', value: 'HTML tags can be broadly categorized into three main types based on their function and structure: <strong>Opening Tags</strong>, <strong>Closing Tags</strong>, and <strong>Self-Closing Tags</strong>.' },
    
    { type: 'section_heading', value: '3. Opening Tags' },
    { type: 'rich_text', value: 'An opening tag acts as the starting point of an HTML element. It instructs the browser exactly where a specific piece of content or a structural section begins on the page.' },
    {
      type: 'list',
      value: [
        'Consists of a purely lowercase tag name enclosed entirely within angle brackets (<code>&lt; &gt;</code>).',
        'The opening tag is the <em>only</em> place where you can add HTML attributes (like <code>class="box"</code> or <code>id="main"</code>).',
        'For non-void elements, the opening tag absolutely requires a matching closing tag later in the document.',
      ],
    },
    { type: 'rich_text', value: '<strong>Extensive Examples:</strong>' },
    { type: 'code_block', language: 'html', value: '<!-- Headings -->\n<h1> <!-- Largest heading -->\n<h3> <!-- Medium heading -->\n\n<!-- Text Containers -->\n<p> <!-- Paragraph -->\n<span> <!-- Inline container -->\n\n<!-- Structural Containers -->\n<div> <!-- Block container -->\n<article> <!-- Independent content -->\n<section> <!-- Thematic grouping -->' },

    { type: 'section_heading', value: '4. Closing Tags' },
    { type: 'rich_text', value: 'A closing tag marks the official ending point of an HTML element. It explicitly tells the browser to stop applying the element\'s formatting or structural rules.' },
    {
      type: 'list',
      value: [
        'Looks exactly like the opening tag, but it <em>must</em> include a forward slash (<code>/</code>) immediately after the first angle bracket.',
        'You can never, ever place an attribute inside a closing tag. It only contains the slash and the tag name.',
        'Failing to use a closing tag can cause "layout bleed," where the whole rest of the page accidentally absorbs the unclosed tag\'s styles.',
      ],
    },
    { type: 'rich_text', value: '<strong>Matching Examples:</strong>' },
    { type: 'code_block', language: 'html', value: '<!-- Headings -->\n</h1> <!-- Ends largest heading -->\n</h3> <!-- Ends medium heading -->\n\n<!-- Text Containers -->\n</p> <!-- Ends paragraph -->\n</span> <!-- Ends inline container -->\n\n<!-- Structural Containers -->\n</div> <!-- Ends block container -->\n</article> <!-- Ends independent content -->\n</section> <!-- Ends thematic grouping -->' },

    { type: 'section_heading', value: '5. Self-Closing Tags' },
    { type: 'rich_text', value: 'Self-closing tags (officially termed "Void Elements") are standalone elements that do not wrap around any internal text content. They are used exclusively to embed something directly into the page, like a picture or a line break.' },
    {
      type: 'list',
      value: [
        'They consist of a single tag. They do not have a counterpart closing tag.',
        'In modern HTML5, adding a trailing slash before the closing bracket (e.g., <code>&lt;br /&gt;</code>) is completely optional, though sometimes used for clarity.',
        'Because they cannot contain text, they rely heavily on attributes (like <code>src</code> or <code>href</code>) to define their content.',
      ],
    },
    { type: 'rich_text', value: '<strong>Complete List of Common Examples:</strong>' },
    { type: 'code_block', language: 'html', value: '<!-- Visual Embeds -->\n<img src="logo.png" alt="Company Logo">\n\n<!-- Structural Formatting -->\n<br> <!-- Forces a line break -->\n<hr> <!-- Draws a thematic horizontal line -->\n\n<!-- Forms and Inputs -->\n<input type="text" placeholder="Enter name">\n\n<!-- Document Metadata (Inside <head>) -->\n<meta charset="UTF-8">\n<link rel="stylesheet" href="style.css">' },

    { type: 'section_heading', value: '6. Basic Structure of an Element' },
    { type: 'rich_text', value: 'When you combine the tags with content, you create a complete HTML Element:' },
    { type: 'rich_text', value: '<div class="bg-gray-800 text-white p-4 rounded-md font-mono text-center my-4"> &lt;tagname&gt; Content &lt;/tagname&gt; </div>' },
    { type: 'rich_text', value: 'Real-world example:' },
    { type: 'code_block', language: 'html', value: '<p>This is a paragraph</p>' },

    { type: 'section_heading', value: '7. Why Both Tags are Important' },
    {
      type: 'list',
      value: [
        'They define the <strong>clear structure</strong> of the page.',
        'They help the browser understand exactly <strong>where content boundaries are</strong>.',
        'They <strong>prevent display errors</strong> (leaking styles).',
      ],
    },
    {
       type: 'rich_text',
       value: '<div class="bg-red-50 p-2 rounded border border-red-200 text-red-800 italic mb-4"><strong>IMPORTANT POINT:</strong> Without proper closing, your HTML layout can completely break.</div>'
    },

    { type: 'section_heading', value: '8. Examples of Common Elements' },
    { type: 'rich_text', value: 'See how different components are formed:' },
    {
      type: 'rich_text',
      value: `<table class="min-w-full border-collapse border border-gray-200 my-4 text-sm text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="border border-gray-200 p-2">Element Type</th>
            <th class="border border-gray-200 p-2">HTML Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-200 p-2 font-bold">Sub-Heading</td>
            <td class="border border-gray-200 p-2"><code>&lt;h2&gt;Sub-Section Title&lt;/h2&gt;</code></td>
          </tr>
          <tr>
            <td class="border border-gray-200 p-2 font-bold">Emphasis</td>
            <td class="border border-gray-200 p-2"><code>&lt;em&gt;Italicized text&lt;/em&gt;</code></td>
          </tr>
          <tr>
            <td class="border border-gray-200 p-2 font-bold">Article Section</td>
            <td class="border border-gray-200 p-2"><code>&lt;article&gt;Story content&lt;/article&gt;</code></td>
          </tr>
          <tr>
            <td class="border border-gray-200 p-2 font-bold">Button</td>
            <td class="border border-gray-200 p-2"><code>&lt;button&gt;Submit Form&lt;/button&gt;</code></td>
          </tr>
        </tbody>
      </table>`
    },

    { type: 'section_heading', value: '9. Nested Tags (Very Important)' },
    { type: 'rich_text', value: 'HTML allows you to place tags inside other tags. However, you must follow the <strong>LIFO (Last-In, First-Out)</strong> rule.' },
    { type: 'code_block', language: 'html', value: '<!-- Correct Nesting -->\n<p>This is <b>bold</b> text</p>' },
    {
       type: 'rich_text',
       value: '<div class="bg-indigo-50 p-3 rounded border border-indigo-200 text-indigo-800 font-medium italic my-2"><strong>IMPORTANT POINT:</strong> The tag you open <em>last</em> must be the tag you close <em>first</em>.</div>'
    },
    {
      type: 'rich_text',
      value: '<div class="grid grid-cols-2 gap-4 my-2"><div class="p-3 bg-green-50 rounded border text-green-800 font-bold">✔ Correct:<br/><code class="text-xs">&lt;p&gt;&lt;b&gt;Text&lt;/b&gt;&lt;/p&gt;</code></div><div class="p-3 bg-red-50 rounded border text-red-800 font-bold">✘ Wrong:<br/><code class="text-xs">&lt;p&gt;&lt;b&gt;Text&lt;/p&gt;&lt;/b&gt;</code></div></div>'
    },

    { type: 'section_heading', value: '10. Tags with Attributes' },
    { type: 'rich_text', value: 'Remember that attributes are always part of the opening tag, never the closing tag.' },
    { type: 'code_block', language: 'html', value: '<a href="https://google.com">Visit Google</a>' },
    {
      type: 'list',
      value: [
        '<code>&lt;a&gt;</code> is the opening tag containing the <code>href</code> attribute.',
        '<code>&lt;/a&gt;</code> is the simple closing tag.',
      ],
    },

    { type: 'section_heading', value: '11. Case Sensitivity' },
    { type: 'rich_text', value: 'HTML is not case-sensitive (<code>&lt;P&gt;</code> works the same as <code>&lt;p&gt;</code>), but modern developers **always** use lowercase.' },

    { type: 'section_heading', value: '12. Optional Closing Tags' },
    { type: 'rich_text', value: 'In some special cases, HTML5 allows you to omit closing tags for elements like <code>&lt;li&gt;</code> or <code>&lt;p&gt;</code>. The browser will guess where they end.' },
    {
       type: 'rich_text',
       value: '<div class="bg-amber-50 p-2 rounded border border-amber-200 text-amber-800 font-bold my-4 italic"><strong>IMPORTANT POINT:</strong> Even if optional, ALWAYS close your tags. It ensures your code is clean, consistent, and "future-proof."</div>'
    },

    { type: 'section_heading', value: '13. Browser Error Handling' },
    { type: 'rich_text', value: 'Browsers are very "forgiving." If you forget a closing tag, the browser will try to fix the mistake automatically to prevent the page from looking weird.' },
    { type: 'code_block', language: 'html', value: '<!-- You type this: -->\n<p>Hello\n<p>World\n\n<!-- Browser displays this: -->\n<p>Hello</p>\n<p>World</p>' },
    {
       type: 'rich_text',
       value: '<div class="bg-red-50 p-2 rounded border border-red-200 text-red-800 italic"><strong>WARNING:</strong> Never rely on the browser to fix your mistakes. It can lead to unpredictable layout bugs.</div>'
    },

    { type: 'section_heading', value: '14. Common Beginner Mistakes' },
    {
      type: 'list',
      value: [
        'Missing a closing tag entirely.',
        'Incorrect nesting (overlapping tags).',
        'Typing the wrong tag name in the closer (e.g., <code>&lt;p&gt;...&lt;/b&gt;</code>).',
        'Forgetting the forward slash (<code>/</code>) in the closing tag.',
      ],
    },

    { type: 'section_heading', value: '15. Best Practices' },
    {
      type: 'list',
      value: [
        'Always close tags properly.',
        'Follow correct nesting order (LIFO).',
        'Use indentation to make your tag structure visible.',
        'Stick to lowercase tag names.',
      ],
    },

    { type: 'section_heading', value: '16. Real World Analogy' },
    {
       type: 'rich_text',
       value: '<div class="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 my-4 text-indigo-900 shadow-sm"><strong>The Bracket Analogy:</strong><br/>Think of tags like mathematical brackets:<br/>- <strong>Opening tag</strong> = <code>(</code><br/>- <strong>Closing tag</strong> = <code>)</code><br/><br/>Example: <code>&lt;p&gt;Content&lt;/p&gt;</code> is logically same as <code>(Content)</code>.</div>',
    },

    { type: 'section_heading', value: '17. Key Points Summary' },
    {
      type: 'list',
      value: [
        'Opening tags define the start; Closing tags define the end.',
        'The slash (<code>/</code>) is mandatory for closing tags.',
        'Nesting must be perfectly balanced and ordered.',
        'Self-closing tags (<img>, <br>) are the exceptions.',
        'Writing clean, closed tags is the mark of a professional developer.',
      ],
    },

    { type: 'section_heading', value: 'Check Your Understanding' },
    {
      type: 'checkpoint',
      index: 1,
      points: 5,
      value: 'Create a paragraph that uses an <strong>italic</strong> tag (<code>&lt;i&gt;</code>) nested correctly around one word.',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Example: <p>This is <i>italic</i></p>' }] }],
    },
    {
      type: 'checkpoint',
      index: 2,
      points: 5,
      value: 'Fix this broken code: <code>&lt;div&gt;&lt;h1&gt;Broken Text&lt;/div&gt;&lt;/h1&gt;</code>',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Apply the LIFO rule: close h1 before closing div.' }] }],
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
      order: 7,
      type: 'lesson',
      title: LESSON_TITLE,
      duration: '30 min',
      language: 'html',
      isTerminal: false,
      fileName: 'tags_closing.html',
      starterCode: '<!DOCTYPE html>\n<html>\n<body>\n    <!-- Fix the nesting here -->\n    <div><h1>Correct Me</div></h1>\n</body>\n</html>',
      content,
      validationCriteria: [
        { index: 1, matchCode: '<p>.*<i>.*</i>.*</p>' },
        { index: 2, matchCode: '<div><h1>.*</h1></div>' },
      ],
    };

    await lessonsCol.updateOne({ _id: lessonId }, { $set: doc }, { upsert: true });
    
    // Ensure course linkage
    await coursesCol.updateOne(
      { _id: course._id, 'modules._id': mod._id },
      { $set: { 'modules.$.lessons.6': {
        _id: lessonId,
        moduleId: mod._id,
        courseId: course._id,
        order: 7,
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
