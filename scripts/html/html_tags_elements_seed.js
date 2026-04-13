/**
 * Seed HTML/CSS course — Lesson 6: "HTML Tags and Elements" (full rich content).
 * Run from CandidateBackend: node scripts/html/html_tags_elements_seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COURSE_SLUG = 'html-css';
const MODULE_TITLE = 'Introduction to HTML';
const LESSON_TITLE = 'HTML Tags and Elements';
const LESSON_ID = '69b900188c89a2213bb7134c';

function buildContent() {
  return [
    { type: 'label', value: 'Core Concepts' },
    { type: 'heading', value: 'What are Tags and Different Types?' },
    { type: 'duration', value: '30 min' },

    { type: 'section_heading', value: '1. Introduction' },
    { type: 'rich_text', value: 'HTML is made up of Tags and Elements. They are the essential building blocks of every webpage you see on the internet.' },
    {
      type: 'list',
      value: [
        'What are HTML Tags',
        'What are HTML Elements',
        'The critical difference between them',
        'Types of tags and their specific usage',
      ],
    },
    {
       type: 'rich_text',
       value: '<div class="bg-indigo-50 p-3 rounded border border-indigo-200 text-indigo-800 font-medium my-4 italic underline text-center"><strong>IMPORTANT POINT:</strong> Without tags and elements, a webpage cannot be created.</div>'
    },

    { type: 'section_heading', value: '2. What is an HTML Tag?' },
    { type: 'rich_text', value: 'A <strong>Tag</strong> is a keyword enclosed in angle brackets. It acts as a command to the browser.' },
    { type: 'code_block', language: 'html', value: '<tagname>' },
    { type: 'rich_text', value: 'Examples of common tags:' },
    {
      type: 'list',
      value: [
        '<code>&lt;div&gt;</code> (Container)',
        '<code>&lt;span&gt;</code> (Inline text)',
        '<code>&lt;strong&gt;</code> (Bold)',
      ],
    },
    { type: 'rich_text', value: 'Tags tell the browser <strong>what type of content</strong> it is and <strong>how to display it</strong>.' },

    { type: 'section_heading', value: '3. Different Types of Tags' },
    { type: 'rich_text', value: 'HTML tags come in different forms: Opening tags, Closing tags, and Self-closing tags.' },
    { type: 'code_block', language: 'html', value: '<p>  <!-- Opening Tag -->\n</p> <!-- Closing Tag -->\n<br> <!-- Self-closing Tag -->' },

    { type: 'section_heading', value: 'Tag Segregation Table' },
    { type: 'rich_text', value: 'Quick reference for different tag categories:' },
    {
      type: 'rich_text',
      value: `<table class="min-w-full border-collapse border border-gray-200 my-4 text-sm text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="border border-gray-200 p-2">Category</th>
            <th class="border border-gray-200 p-2">Example Tags</th>
            <th class="border border-gray-200 p-2">Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-200 p-2 font-bold">Structural</td>
            <td class="border border-gray-200 p-2"><code>&lt;html&gt;, &lt;body&gt;, &lt;div&gt;</code></td>
            <td class="border border-gray-200 p-2">Defines the layout skeleton</td>
          </tr>
          <tr>
            <td class="border border-gray-200 p-2 font-bold">Text</td>
            <td class="border border-gray-200 p-2"><code>&lt;h1&gt;, &lt;p&gt;, &lt;span&gt;, &lt;b&gt;</code></td>
            <td class="border border-gray-200 p-2">Formats and organizes written content</td>
          </tr>
          <tr>
            <td class="border border-gray-200 p-2 font-bold">Media/Links</td>
            <td class="border border-gray-200 p-2"><code>&lt;img&gt;, &lt;a&gt;, &lt;video&gt;</code></td>
            <td class="border border-gray-200 p-2">Adds links, images, and rich media</td>
          </tr>
          <tr>
            <td class="border border-gray-200 p-2 font-bold">Void (No Content)</td>
            <td class="border border-gray-200 p-2"><code>&lt;br&gt;, &lt;hr&gt;, &lt;input&gt;</code></td>
            <td class="border border-gray-200 p-2">Standalone items without children</td>
          </tr>
        </tbody>
      </table>`
    },

    { type: 'section_heading', value: '4. What is an HTML Element?' },
    { type: 'rich_text', value: 'An <strong>Element</strong> is the complete package. It includes the opening tag, the content inside, and the closing tag.' },
    { type: 'rich_text', value: 'Breakdown example:' },
    { type: 'code_block', language: 'html', value: '<p>This is a paragraph</p>' },
    {
      type: 'list',
      value: [
        '<strong>&lt;p&gt;:</strong> Opening tag',
        '<strong>This is a paragraph:</strong> Content',
        '<strong>&lt;/p&gt;:</strong> Closing tag',
      ],
    },

    { type: 'section_heading', value: '5. Tag vs Element (Important Difference)' },
    { type: 'rich_text', value: 'It is easy to confuse these two, but here is the key distinction:' },
    {
      type: 'list',
      value: [
        '<strong>Tag:</strong> Only the keyword inside brackets (e.g., <code>&lt;p&gt;</code>).',
        '<strong>Element:</strong> The entire structure from start to finish (e.g., <code>&lt;p&gt;Hello&lt;/p&gt;</code>).',
      ],
    },
    {
       type: 'rich_text',
       value: '<div class="bg-amber-50 p-2 rounded border border-amber-200 text-amber-800 bold mb-4 italic"><strong>IMPORTANT POINT:</strong> A Tag is just a *part* of an Element.</div>'
    },

    { type: 'section_heading', value: '6. Nested Elements' },
    { type: 'rich_text', value: 'Elements can be placed inside other elements, like nesting dolls.' },
    { type: 'code_block', language: 'html', value: '<div>\n    <p>This paragraph is <b>nested</b> inside a div.</p>\n</div>' },
    {
      type: 'list',
      value: [
        'This relationship is called <strong>nesting</strong>.',
        'Elements must follow the correct LIFO (Last-In, First-Out) order.',
      ],
    },
    {
      type: 'rich_text',
      value: '<div class="grid grid-cols-2 gap-4 my-2"><div class="p-3 bg-green-50 rounded border text-green-800 font-bold">✔ Correct:<br/><code class="text-xs">&lt;p&gt;&lt;b&gt;Text&lt;/b&gt;&lt;/p&gt;</code></div><div class="p-3 bg-red-50 rounded border text-red-800 font-bold">✘ Wrong:<br/><code class="text-xs">&lt;p&gt;&lt;b&gt;Text&lt;/p&gt;&lt;/b&gt;</code></div></div>'
    },

    { type: 'section_heading', value: '7. Attributes in Tags' },
    { type: 'rich_text', value: 'Attributes provide extra information or settings for an element.' },
    { type: 'code_block', language: 'html', value: '<tagname attribute="value">' },
    { type: 'rich_text', value: 'Practical example:' },
    { type: 'code_block', language: 'html', value: '<a href="https://www.google.com">Visit Google</a>' },
    {
      type: 'list',
      value: [
        '<strong>href:</strong> The attribute name.',
        '<strong>URL:</strong> The attribute value.',
      ],
    },
    {
       type: 'rich_text',
       value: '<div class="bg-amber-50 p-2 rounded border border-amber-200 text-amber-800 mb-4 italic"><strong>IMPORTANT POINT:</strong> Attributes are always placed inside the <strong>opening tag</strong>.</div>'
    },

    { type: 'section_heading', value: '8. Common HTML Tags' },
    {
      type: 'rich_text',
      value: `<div class="space-y-4">
        <div>
          <h5 class="font-bold underline">Text Formatting</h5>
          <ul class="list-disc pl-5">
            <li><code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code>: Main and sub-headings</li>
            <li><code>&lt;p&gt;</code>: Standard paragraphs</li>
            <li><code>&lt;b&gt;</code> or <code>&lt;strong&gt;</code>: Bold and emphasized text</li>
            <li><code>&lt;i&gt;</code>: Italic text</li>
          </ul>
        </div>
        <div>
          <h5 class="font-bold underline">Structure</h5>
          <ul class="list-disc pl-5">
            <li><code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, <code>&lt;body&gt;</code></li>
            <li><code>&lt;div&gt;</code>: Container for layout sections</li>
          </ul>
        </div>
        <div>
          <h5 class="font-bold underline">Links & Lists</h5>
          <ul class="list-disc pl-5">
            <li><code>&lt;a&gt;</code>: Links to other pages</li>
            <li><code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code>, <code>&lt;li&gt;</code>: Different list types</li>
          </ul>
        </div>
      </div>`
    },

    { type: 'section_heading', value: '9. Block vs Inline Elements' },
    { type: 'rich_text', value: 'The browser treats elements differently based on their default "display" behavior.' },
    
    { type: 'rich_text', value: '<h4 class="font-bold text-gray-800 mt-2">Block Elements</h4>' },
    {
      type: 'list',
      value: [
        'Take up the <strong>full width</strong> available.',
        'Always start on a <strong>new line</strong>.',
        'Examples: <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>, <code>&lt;ul&gt;</code>.',
      ],
    },

    { type: 'rich_text', value: '<h4 class="font-bold text-gray-800 mt-2">Inline Elements</h4>' },
    {
      type: 'list',
      value: [
        'Only take up as much width as <strong>required by content</strong>.',
        'Do <strong>not</strong> start a new line.',
        'Examples: <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, <code>&lt;b&gt;</code>, <code>&lt;i&gt;</code>.',
      ],
    },
    {
       type: 'rich_text',
       value: '<div class="bg-indigo-50 p-2 rounded border border-indigo-200 text-indigo-800 mb-4 italic"><strong>IMPORTANT POINT:</strong> This distinction determines how your layout and design will look!</div>'
    },

    { type: 'section_heading', value: '10. Empty (Void) Elements' },
    { type: 'rich_text', value: 'These are unique elements that have no content inside them and therefore no closing tag.' },
    {
      type: 'list',
      value: [
        '<code>&lt;br&gt;</code>: Forces a line break.',
        '<code>&lt;hr&gt;</code>: Creates a horizontal thematic line.',
        '<code>&lt;img&gt;</code>: Displays an image.',
      ],
    },

    { type: 'section_heading', value: '11. Case Sensitivity' },
    { type: 'rich_text', value: 'Technically, HTML is not case-sensitive. <code>&lt;p&gt;</code> is the same as <code>&lt;P&gt;</code> to the browser.' },
    {
       type: 'rich_text',
       value: '<div class="bg-indigo-50 p-3 rounded border border-indigo-200 text-indigo-800 font-medium italic my-2"><strong>PRO TIP:</strong> Always use <strong>lowercase</strong> tags! It is the modern industry standard and required for cleaner code.</div>'
    },

    { type: 'section_heading', value: '12. Best Practices' },
    {
      type: 'list',
      value: [
        'Always close your tags properly to avoid layout bugs.',
        'Maintain proper nesting hierarchy (don\'t "overlap" tags).',
        'Use meaningful tags (e.g., use <code>&lt;h1&gt;</code> for headers, not styled <code>&lt;p&gt;</code>).',
        'Keep your code clean, indented, and readable.',
      ],
    },

    { type: 'section_heading', value: '13. Common Beginner Mistakes' },
    {
      type: 'list',
      value: [
        'Forgetting to add the <code>/</code> in a closing tag.',
        'Incorrect nesting (closing outer tag before inner tag).',
        'Using tags for style (like <code>&lt;i&gt;</code>) when they should be used for meaning.',
        'Missing mandatory attributes (like <code>src</code> for images).',
      ],
    },

    { type: 'section_heading', value: '14. Real World Analogy' },
    {
       type: 'rich_text',
       value: '<div class="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500 my-4 text-indigo-900 shadow-sm"><strong>The Box Analogy:</strong><br/>- <strong>Tag:</strong> The labels on the outside of a moving box (telling you what is inside).<br/>- <strong>Element:</strong> The full box itself, including the tape, the labels, and everything packed inside.</div>',
    },

    { type: 'section_heading', value: '15. Key Points Summary' },
    {
      type: 'list',
      value: [
        'Tags define the <strong>structure</strong> and type of content.',
        'Elements are <strong>complete units</strong> (Start Tag + Content + End Tag).',
        'Tags can be opening, closing, or self-closing.',
        'Nesting allows for complex, multi-layered structures.',
        'Attributes add <strong>extra info</strong> to tags (like links or image sources).',
        'Block and Inline behavior determines how elements sit on the page.',
      ],
    },

    { type: 'section_heading', value: 'Check Your Understanding' },
    {
      type: 'checkpoint',
      index: 1,
      points: 5,
      value: 'Create a paragraph that contains some <strong>bold</strong> text inside it using the <code>&lt;b&gt;</code> tag.',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Wrap the bold part of the sentence inside <b> and </b> tags within the paragraph.' }] }],
    },
    {
      type: 'checkpoint',
      index: 2,
      points: 5,
      value: 'Write an anchor tag that links to "https://www.example.com" and uses the correct syntax for an attribute.',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Use the <a href="URL">Text</a> structure.' }] }],
    },
    {
      type: 'checkpoint',
      index: 3,
      points: 5,
      value: 'Create a list item <code>&lt;li&gt;</code> that contains a link <code>&lt;a&gt;</code>. This is an example of nesting.',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Put the entire <a> element inside the <li> element.' }] }],
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
      order: 6,
      type: 'lesson',
      title: LESSON_TITLE,
      duration: '30 min',
      language: 'html',
      isTerminal: false,
      fileName: 'tags_elements.html',
      starterCode: '<!DOCTYPE html>\n<html>\n<body>\n    <!-- Practice nesting here -->\n</body>\n</html>',
      content,
      validationCriteria: [
        { index: 1, matchCode: '<p>.*<strong>.*</strong>.*</p>' },
        { index: 2, matchCode: '<div.*>.*</div>' },
        { index: 3, matchCode: '<span>.*<em>.*</em>.*</span>' },
      ],
    };

    await lessonsCol.updateOne({ _id: lessonId }, { $set: doc }, { upsert: true });
    
    // Ensure course linkage
    await coursesCol.updateOne(
      { _id: course._id, 'modules._id': mod._id },
      { $set: { 'modules.$.lessons.5': {
        _id: lessonId,
        moduleId: mod._id,
        courseId: course._id,
        order: 6,
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
