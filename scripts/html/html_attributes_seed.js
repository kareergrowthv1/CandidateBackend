/**
 * Seed HTML/CSS course — Lesson 8: "HTML Attributes"
 * Run from CandidateBackend: node scripts/html/html_attributes_seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';
const COURSE_SLUG = 'html-css';
const MODULE_TITLE = 'Introduction to HTML';
const LESSON_TITLE = 'HTML Attributes';
const LESSON_ID = '6a0100188c89a2213bb7134d'; // Generating a unique ID

function buildContent() {
  return [
    { type: 'label', value: 'Element Configuration' },
    { type: 'heading', value: 'HTML Attributes' },
    { type: 'duration', value: '35 min' },

    { type: 'section_heading', value: '1. Introduction' },
    { type: 'rich_text', value: 'HTML Attributes provide essential additional information about HTML elements. They are the primary way to configure how an element behaves, looks, or functions.' },
    {
      type: 'list',
      value: [
        'They modify the <strong>Behavior</strong> of an element.',
        'They alter the <strong>Appearance</strong> or identity of an element.',
        'They enable the <strong>Functionality</strong> of elements (like making links clickable).',
      ],
    },
    {
       type: 'rich_text',
       value: '<div class="bg-indigo-50 p-3 rounded border border-indigo-200 text-indigo-800 font-medium my-4 italic underline text-center"><strong>IMPORTANT POINT:</strong> Attributes are ALWAYS written inside the opening tag.</div>'
    },

    { type: 'section_heading', value: '2. Definition & Syntax' },
    { type: 'rich_text', value: 'An attribute is a name-value pair added to a tag. It consists of the attribute name, an equal sign, and a value enclosed in double quotes.' },
    { type: 'code_block', language: 'html', value: '<tagname attribute="value">' },
    { type: 'rich_text', value: '<strong>Example:</strong>' },
    { type: 'code_block', language: 'html', value: '<a href="https://google.com">Visit</a>' },
    {
      type: 'list',
      value: [
        '<code>href</code> is the <strong>Attribute Name</strong>.',
        '<code>"https://google.com"</code> is the <strong>Attribute Value</strong>.',
      ],
    },

    { type: 'section_heading', value: '3. Structure of Attributes' },
    { type: 'rich_text', value: 'Every standard attribute is built using three distinct parts:' },
    {
      type: 'list',
      value: [
        '<strong>Attribute Name:</strong> Tells the browser what property you are setting.',
        '<strong>Equal Sign (=):</strong> Connects the name to the value.',
        '<strong>Value (inside quotes):</strong> The specific instruction or data for that property.',
      ],
    },
    { type: 'code_block', language: 'html', value: '<img src="image.jpg" alt="Sample Image">' },

    { type: 'section_heading', value: '4. Common HTML Attributes' },
    { type: 'rich_text', value: 'Here are the most frequently used attributes that are specific to certain elements:' },
    {
      type: 'rich_text',
      value: `<table class="min-w-full border-collapse border border-gray-200 my-4 text-sm text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="border border-gray-200 p-2">Attribute</th>
            <th class="border border-gray-200 p-2">Use Case</th>
            <th class="border border-gray-200 p-2">Example Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-200 p-2 font-bold text-blue-600">href</td>
            <td class="border border-gray-200 p-2">Used in links to specify the destination URL.</td>
            <td class="border border-gray-200 p-2"><code>&lt;a href="https://example.com"&gt;Click&lt;/a&gt;</code></td>
          </tr>
          <tr>
            <td class="border border-gray-200 p-2 font-bold text-blue-600">src</td>
            <td class="border border-gray-200 p-2">Specifies the source path of media like images or scripts.</td>
            <td class="border border-gray-200 p-2"><code>&lt;img src="photo.jpg"&gt;</code></td>
          </tr>
          <tr>
            <td class="border border-gray-200 p-2 font-bold text-blue-600">alt</td>
            <td class="border border-gray-200 p-2">Provides alternative text for images (crucial for accessibility).</td>
            <td class="border border-gray-200 p-2"><code>&lt;img src="img.jpg" alt="Profile Image"&gt;</code></td>
          </tr>
        </tbody>
      </table>`
    },

    { type: 'section_heading', value: '5. Global Attributes' },
    { type: 'rich_text', value: 'Global attributes can be applied to almost <strong>any</strong> HTML element, regardless of what the element is used for.' },
    {
      type: 'rich_text',
      value: `<table class="min-w-full border-collapse border border-gray-200 my-4 text-sm text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="border border-gray-200 p-2">Attribute</th>
            <th class="border border-gray-200 p-2">Use Case</th>
            <th class="border border-gray-200 p-2">Example Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-200 p-2 font-bold text-purple-600">id</td>
            <td class="border border-gray-200 p-2">Sets a unique identifier for an element on the page.</td>
            <td class="border border-gray-200 p-2"><code>&lt;p id="para1"&gt;Text&lt;/p&gt;</code></td>
          </tr>
          <tr>
            <td class="border border-gray-200 p-2 font-bold text-purple-600">class</td>
            <td class="border border-gray-200 p-2">Used for grouping elements together to style them with CSS.</td>
            <td class="border border-gray-200 p-2"><code>&lt;div class="container"&gt;&lt;/div&gt;</code></td>
          </tr>
          <tr>
            <td class="border border-gray-200 p-2 font-bold text-purple-600">title</td>
            <td class="border border-gray-200 p-2">Creates a tooltip that appears when you hover over the element.</td>
            <td class="border border-gray-200 p-2"><code>&lt;p title="Tooltip text"&gt;Hover me&lt;/p&gt;</code></td>
          </tr>
          <tr>
            <td class="border border-gray-200 p-2 font-bold text-purple-600">style</td>
            <td class="border border-gray-200 p-2">Applies inline CSS styling directly to the element.</td>
            <td class="border border-gray-200 p-2"><code>&lt;p style="color: red;"&gt;Text&lt;/p&gt;</code></td>
          </tr>
        </tbody>
      </table>`
    },

    { type: 'section_heading', value: '6. Multiple Attributes' },
    { type: 'rich_text', value: 'You can use more than one attribute on a single tag. Simply separate them with spaces.' },
    { type: 'code_block', language: 'html', value: '<img src="img.jpg" alt="Image" width="200" class="hero-image">' },

    { type: 'section_heading', value: '7. Boolean Attributes' },
    { type: 'rich_text', value: 'Boolean attributes are special. They represent true/false values. If the attribute is present, it is considered true. They do not need a stated value.' },
    {
      type: 'list',
      value: [
        '<code>disabled</code> (turns off an input)',
        '<code>checked</code> (pre-checks a checkbox or radio button)',
        '<code>required</code> (forces a form field to be filled out)',
      ],
    },
    { type: 'code_block', language: 'html', value: '<!-- This input field cannot be typed into -->\n<input type="text" disabled>' },

    { type: 'section_heading', value: '8. Best Practices' },
    {
      type: 'list',
      value: [
        '<strong>Always use lowercase:</strong> While HTML allows uppercase, lowercase attribute names are the modern standard.',
        '<strong>Always use quotes:</strong> Always surround your attribute values with double quotes (<code>"value"</code>).',
        '<strong>Use meaningful values:</strong> Give your IDs and classes names that describe their function (e.g., <code>class="nav-bar"</code> instead of <code>class="stuff"</code>).',
        '<strong>Avoid unnecessary attributes:</strong> Do not clutter your tags with attributes you don’t need.',
      ],
    },

    { type: 'section_heading', value: '9. Common Mistakes' },
    {
      type: 'list',
      value: [
        '<strong>Missing quotes:</strong> e.g., <code>&lt;a href=https://google.com&gt;</code> (can break layout in unpredictable ways).',
        '<strong>Wrong attribute name:</strong> e.g., typing <code>scr</code> instead of <code>src</code>.',
        '<strong>Using invalid values:</strong> Putting spaces in ID names (IDs cannot contain spaces).',
      ],
    },

    { type: 'section_heading', value: '10. Key Points Summary' },
    {
      type: 'list',
      value: [
        'Attributes add extra information and capabilities to tags.',
        'They are <strong>always</strong> placed inside the opening tag.',
        'The standard format is <code>name="value"</code>.',
        'You can stack multiple attributes on a single tag by separating them with spaces.',
      ],
    },

    { type: 'section_heading', value: 'Check Your Understanding' },
    {
      type: 'checkpoint',
      index: 1,
      points: 5,
      value: 'Create an image tag (<code>&lt;img&gt;</code>) that loads <code>logo.png</code> and has an alternative text of <code>Company Logo</code>.',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'You need both the src and alt attributes inside the img tag.' }] }],
    },
    {
      type: 'checkpoint',
      index: 2,
      points: 5,
      value: 'Fix this broken link: <code>&lt;a href=index.html&gt;Home&lt;/a&gt;</code> (It is missing something around the value).',
      content: [{ type: 'hint', value: [{ type: 'text', value: 'Always wrap attribute values in double quotes.' }] }],
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
      order: 8,
      type: 'lesson',
      title: LESSON_TITLE,
      duration: '35 min',
      language: 'html',
      isTerminal: false,
      fileName: 'attributes.html',
      starterCode: '<!DOCTYPE html>\n<html>\n<body>\n    <!-- Add the image tag correctly here -->\n    \n    <!-- Fix the link here -->\n    <a href=index.html>Home</a>\n</body>\n</html>',
      content,
      validationCriteria: [
        { index: 1, matchCode: '<img.*src="logo\\.png".*alt="Company Logo".*|.*alt="Company Logo".*src="logo\\.png".*' },
        { index: 2, matchCode: '<a.*href="index\\.html".*>.*</a>' },
      ],
    };

    await lessonsCol.updateOne({ _id: lessonId }, { $set: doc }, { upsert: true });
    
    // Ensure course linkage
    await coursesCol.updateOne(
      { _id: course._id, 'modules._id': mod._id },
      { $set: { 'modules.$.lessons.7': {
        _id: lessonId,
        moduleId: mod._id,
        courseId: course._id,
        order: 8,
        type: 'lesson',
        title: LESSON_TITLE,
        duration: '35 min',
        language: 'html'
      } } }
    );

    console.log('✅ Lesson "' + LESSON_TITLE + '" seeded successfully.');
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
