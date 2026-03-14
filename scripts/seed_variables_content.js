const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'Programming';

async function seedVariablesModule() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const lessonsCol = db.collection('Lessons');
        const coursesCol = db.collection('Courses');

        const courseId = new ObjectId('69b3d8039b2a0a6ff33d121b');
        const moduleId = new ObjectId('69b418ee484bc3c7a591889b');

        // Fetch syllabus to get existing lesson IDs
        const course = await coursesCol.findOne({ _id: courseId });
        const varMod = course.modules.find(m => m._id.toString() === moduleId.toString());

        if (!varMod) {
            console.error('❌ Variables module not found!');
            return;
        }

        // Lesson 1: Introduction to Variables
        const lesson1Id = varMod.lessons.find(l => l.order === 1)._id;
        const introLesson = {
            _id: lesson1Id,
            moduleId: moduleId,
            courseId: courseId,
            order: 1,
            type: 'lesson',
            title: 'Introduction to Variables',
            duration: '10 min',
            language: 'java',
            isTerminal: false,
            fileName: 'Main.java',
            starterCode: `public class Main {\n    public static void main(String[] args) {\n\n        // Write your code here\n\n    }\n}`,
            content: [
                { type: 'label', value: 'VARIABLES' },
                { type: 'heading', value: 'Introduction to Variables' },
                { type: 'duration', value: '10 min' },
                
                { type: 'section_heading', value: 'What is a Variable?' },
                { type: 'rich_text', value: 'A <strong>variable</strong> is a container for storing data values during the execution of a Java program. Think of it as a labeled box where you can put information, and later retrieve or change it using its name.' },
                { type: 'rich_text', value: 'Why are variables important?<ul><li><strong>Storing data:</strong> Keep track of user input, game scores, or user profiles.</li><li><strong>Reusing values:</strong> Use the same piece of information in multiple places without retyping it.</li><li><strong>Making programs dynamic:</strong> Allow your program to behave differently based on the data it receives.</li></ul>' },

                { type: 'section_heading', value: 'Basic Syntax' },
                { type: 'text', value: 'In Java, declaring a variable follows a specific structure: type name = value;' },
                { type: 'code_block', language: 'java', value: 'int age = 25;' },
                { type: 'rich_text', value: 'Here, <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">int</code> is the data type (integer), <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">age</code> is the name, and <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">25</code> is the initial value.' },

                { type: 'section_heading', value: 'Real-Life Analogy' },
                { type: 'text', value: 'Imagine you have different boxes in your room:' },
                { type: 'list', value: [
                    'A box labeled "age" containing the number 25.',
                    'A box labeled "name" containing the text "Alex".'
                ]},

                { type: 'section_heading', value: 'Simple Java Example' },
                { type: 'code_block', language: 'java', value: 'public class Main {\n    public static void main(String[] args) {\n        int age = 22;\n        String name = "John";\n\n        System.out.println(name);\n        System.out.println(age);\n    }\n}' },

                { type: 'section_heading', value: 'Common Beginner Mistakes' },
                { type: 'rich_text', value: '<strong>1. Not initializing variables:</strong> Trying to use a variable before giving it a value.' },
                { type: 'code_block', language: 'java', value: 'int score;\nSystem.out.println(score); // ❌ Error: score might not have been initialized' },
                
                { type: 'rich_text', value: '<strong>2. Using wrong data type:</strong> Trying to store text in an int variable.' },
                { type: 'code_block', language: 'java', value: 'int count = "Five"; // ❌ Error: incompatible types (String to int)' },
                
                { type: 'rich_text', value: '<strong>3. Invalid variable names:</strong> Using spaces or reserved words.' },
                { type: 'code_block', language: 'java', value: 'int my age = 22; // ❌ Error: spaces not allowed\nint class = 10;  // ❌ Error: "class" is a reserved word' },

                { type: 'rich_text', value: '<strong>4. Using commas in println:</strong> Java\'s println only takes one argument.' },
                { type: 'code_block', language: 'java', value: 'System.out.println(name, age); // ❌ Error: no suitable method found\nSystem.out.println(name + " " + age); // ✅ Correct: Use + to join them' },

                { type: 'section_heading', value: 'Instructions' },
                { 
                    type: 'checkpoint', 
                    index: 1, 
                    points: 5,
                    value: '<strong>Task 1: Basic Variable Program</strong><br/>Create a Java program that stores and prints your name, age, and favorite programming language.',
                    content: [
                        { type: 'text', value: 'Use appropriate types! String for text, int for numbers.' },
                        { type: 'hint', value: 'Format your output exactly like: "Name: Alex", "Age: 22", "Favorite Language: Java"' }
                    ]
                },
                { 
                    type: 'checkpoint', 
                    index: 2, 
                    points: 5,
                    value: '<strong>Task 2: Personal Information Program</strong><br/>Create variables for city, country, and hobby. Print them using System.out.println().',
                    content: [
                        { type: 'hint', value: 'Example: "City: Bangalore", "Country: India", "Hobby: Coding"' }
                    ]
                },
                { 
                    type: 'checkpoint', 
                    index: 3, 
                    points: 5,
                    value: '<strong>Task 3: Store and Display Numbers</strong><br/>Create variables for numbers and their sum. Print the result.',
                    content: [
                        { type: 'hint', value: 'Example: "Number 1: 10", "Number 2: 20", "Sum: 30"' }
                    ]
                },

                { type: 'section_heading', value: 'Learning Outcome' },
                { type: 'text', value: 'After completing this section, you will be able to declare variables, store values, and print them in Java!' }
            ],
            validationCriteria: [
                { 
                    index: 1, 
                    match: 'Name: [\\s\\S]*Age: [\\s\\S]*Favorite Language: [\\s\\S]*',
                    matchCode: '(?=[\\s\\S]*String\\s+[nN]ame\\s*=)(?=[\\s\\S]*int\\s+[aA]ge\\s*=)(?=[\\s\\S]*String\\s+(lang|language|favoriteLanguage|Lang|Language|FavoriteLanguage)\\s*=)'
                },
                { 
                    index: 2, 
                    match: 'City: [\\s\\S]*Country: [\\s\\S]*Hobby: [\\s\\S]*',
                    matchCode: '(?=[\\s\\S]*String\\s+[cC]ity\\s*=)(?=[\\s\\S]*String\\s+[cC]ountry\\s*=)(?=[\\s\\S]*String\\s+[hH]obby\\s*=)'
                },
                { 
                    index: 3, 
                    match: '(Number 1: [\\d]+[\\s\\S]*Number 2: [\\d]+[\\s\\S]*((Sum|Number 3): [\\d]+))',
                    matchCode: '(?=[\\s\\S]*int\\s+[a-zA-Z0-9_]+\\s*=)(?=[\\s\\S]*\\+)'
                }
            ]
        };

        // Lesson 2: Java Data Types
        const lesson2Id = varMod.lessons.find(l => l.order === 2)._id;
        const dataTypesLesson = {
            _id: lesson2Id,
            moduleId: moduleId,
            courseId: courseId,
            order: 2,
            type: 'lesson',
            title: 'Java Data Types',
            duration: '30 min',
            language: 'java',
            isTerminal: false,
            fileName: 'Main.java',
            starterCode: `public class Main {\n    public static void main(String[] args) {\n\n        // Write your code here\n\n    }\n}`,
            content: [
                { type: 'label', value: 'VARIABLES' },
                { type: 'heading', value: 'Java Data Types' },
                { type: 'duration', value: '30 min' },
                
                { type: 'section_heading', value: '1. What are Data Types in Java?' },
                { type: 'rich_text', value: 'A <strong>data type</strong> defines the type of value a variable can store. In Java, every variable must have a data type initialization. The data type is essential because it tells the compiler:' },
                { type: 'rich_text', value: '<ul><li>What kind of data is stored (numbers, text, etc.).</li><li>How much memory is required for that data.</li><li>What specific operations can be performed on it.</li></ul>' },
                { type: 'code_block', language: 'java', value: 'int age = 25;\ndouble price = 19.99;\nchar grade = \'A\';\nString name = "Alex";' },
                { type: 'rich_text', value: '<strong>Here:</strong><ul><li><strong>int:</strong> stores whole numbers</li><li><strong>double:</strong> stores decimal numbers</li><li><strong>char:</strong> stores a single character</li><li><strong>String:</strong> stores text</li></ul>' },

                { type: 'section_heading', value: '2. Types of Data Types in Java' },
                { type: 'rich_text', value: 'Java data types are strictly divided into two primary categories to handle data efficiently:' },
                { type: 'code_block', value: 'Java Data Types\n   |\n   |--- Primitive Data Types (Predefined in Java)\n   |\n   |--- Non-Primitive Data Types (Created by Programmer)' },

                { type: 'section_heading', value: 'Comparison: Primitive vs Non-Primitive' },
                { type: 'rich_text', value: 'Understanding the difference between these two categories is fundamental to Java programming. Here is a side-by-side comparison:' },
                { type: 'rich_text', value: `
<div class="overflow-x-auto my-4 border border-gray-100 rounded-md shadow-sm">
    <table class="min-w-full text-sm border-collapse">
        <thead>
            <tr class="bg-gray-50/80 border-b border-gray-200">
                <th class="px-6 py-3 text-left font-semibold text-gray-900 border-r border-gray-200">Feature</th>
                <th class="px-6 py-3 text-left font-semibold text-gray-900 border-r border-gray-200">Primitive Types</th>
                <th class="px-6 py-3 text-left font-semibold text-gray-900">Non-Primitive Types</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
            <tr><td class="px-6 py-4 border-r border-gray-200 font-bold bg-gray-50/30">Definition</td><td class="px-6 py-4 border-r border-gray-200">Predefined (built-in) in Java.</td><td class="px-6 py-4">Created by the programmer (except String).</td></tr>
            <tr><td class="px-6 py-4 border-r border-gray-200 font-bold bg-gray-50/30">Value Storage</td><td class="px-6 py-4 border-r border-gray-200">Stores simple values directly.</td><td class="px-6 py-4">Stores a memory address (reference).</td></tr>
            <tr><td class="px-6 py-4 border-r border-gray-200 font-bold bg-gray-50/30">Size</td><td class="px-6 py-4 border-r border-gray-200">Fixed size depending on type.</td><td class="px-6 py-4">Size can vary.</td></tr>
            <tr><td class="px-6 py-4 border-r border-gray-200 font-bold bg-gray-50/30">Nullability</td><td class="px-6 py-4 border-r border-gray-200">Always has a value (cannot be null).</td><td class="px-6 py-4">Can be null.</td></tr>
            <tr><td class="px-6 py-4 border-r border-gray-200 font-bold bg-gray-50/30">Methods</td><td class="px-6 py-4 border-r border-gray-200">Does not have methods.</td><td class="px-6 py-4">Has methods to perform operations.</td></tr>
            <tr><td class="px-6 py-4 border-r border-gray-200 font-bold bg-gray-50/30">Examples</td><td class="px-6 py-4 border-r border-gray-200 font-mono">int, char, boolean</td><td class="px-6 py-4 font-mono">String, Arrays, Classes</td></tr>
        </tbody>
    </table>
</div>` },

                { type: 'section_heading', value: '3. Primitive Data Types' },
                { type: 'rich_text', value: 'Primitive data types are the most basic built-in data types provided by Java. They serve as the building blocks for data manipulation and store simple values directly in memory efficiently.' },
                { type: 'rich_text', value: 'There are <strong>8 primitive data types</strong> in Java, each with its own specific size and range.' },
                { type: 'rich_text', value: `
<div class="overflow-x-auto my-4 border border-gray-100 rounded-md shadow-sm">
    <table class="min-w-full text-sm border-collapse">
        <thead>
            <tr class="bg-gray-50/80 border-b border-gray-200">
                <th class="px-6 py-3 text-left font-semibold text-gray-900 border-r border-gray-200">Data Type</th>
                <th class="px-6 py-3 text-left font-semibold text-gray-900 border-r border-gray-200">Size</th>
                <th class="px-6 py-3 text-left font-semibold text-gray-900 border-r border-gray-200">Description</th>
                <th class="px-6 py-3 text-left font-semibold text-gray-900">Example</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
            <tr class="hover:bg-gray-50/50"><td class="px-6 py-3 border-r border-gray-200 font-mono text-gray-700">byte</td><td class="px-6 py-3 border-r border-gray-200 text-gray-500">1 byte</td><td class="px-6 py-3 border-r border-gray-200">small integers (-128 to 127)</td><td class="px-6 py-3">100</td></tr>
            <tr class="hover:bg-gray-50/50"><td class="px-6 py-3 border-r border-gray-200 font-mono text-gray-700">short</td><td class="px-6 py-3 border-r border-gray-200 text-gray-500">2 bytes</td><td class="px-6 py-3 border-r border-gray-200">short integer</td><td class="px-6 py-3">20000</td></tr>
            <tr class="bg-blue-50/30 hover:bg-blue-50/50"><td class="px-6 py-3 border-r border-gray-200 font-mono text-blue-600 font-bold">int</td><td class="px-6 py-3 border-r border-gray-200 text-blue-600 font-bold">4 bytes</td><td class="px-6 py-3 border-r border-gray-200 text-blue-600 font-bold">whole numbers</td><td class="px-6 py-3 text-blue-600 font-bold">1000</td></tr>
            <tr class="hover:bg-gray-50/50"><td class="px-6 py-3 border-r border-gray-200 font-mono text-gray-700">long</td><td class="px-6 py-3 border-r border-gray-200 text-gray-500">8 bytes</td><td class="px-6 py-3 border-r border-gray-200">large integers</td><td class="px-6 py-3">100000L</td></tr>
            <tr class="hover:bg-gray-50/50"><td class="px-6 py-3 border-r border-gray-200 font-mono text-gray-700">float</td><td class="px-6 py-3 border-r border-gray-200 text-gray-500">4 bytes</td><td class="px-6 py-3 border-r border-gray-200">decimal numbers</td><td class="px-6 py-3">10.5f</td></tr>
            <tr class="bg-blue-50/30 hover:bg-blue-50/50"><td class="px-6 py-3 border-r border-gray-200 font-mono text-blue-600 font-bold">double</td><td class="px-6 py-3 border-r border-gray-200 text-blue-600 font-bold">8 bytes</td><td class="px-6 py-3 border-r border-gray-200 text-blue-600 font-bold">large decimal numbers</td><td class="px-6 py-3 text-blue-600 font-bold">19.99</td></tr>
            <tr class="hover:bg-gray-50/50"><td class="px-6 py-3 border-r border-gray-200 font-mono text-gray-700">char</td><td class="px-6 py-3 border-r border-gray-200 text-gray-500">2 bytes</td><td class="px-6 py-3 border-r border-gray-200">single character</td><td class="px-6 py-3">'A'</td></tr>
            <tr class="hover:bg-gray-50/50"><td class="px-6 py-3 border-r border-gray-200 font-mono text-gray-700">boolean</td><td class="px-6 py-3 border-r border-gray-200 text-gray-500">1 bit</td><td class="px-6 py-3 border-r border-gray-200">true or false</td><td class="px-6 py-3">true</td></tr>
        </tbody>
    </table>
</div>` },

                { type: 'section_heading', value: '4. Integer Data Types' },
                { type: 'rich_text', value: 'Integer data types are used to store whole numbers without any fractional part. Java provides four different types depending on the size of the value you need to store:' },
                { type: 'rich_text', value: '<ul><li><strong>byte:</strong> Stores numbers from -128 to 127. Useful for saving memory in large arrays.</li><li><strong>short:</strong> Smallest whole number type bigger than byte. Suitable for medium ranges.</li><li><strong>int:</strong> The default and most common type for whole numbers. Most popular in everyday programming.</li><li><strong>long:</strong> Used for extremely large numbers (like distances in space). Requires <strong>L</strong> suffix.</li></ul>' },
                { type: 'code_block', language: 'java', value: 'byte age = 25;\nshort population = 20000;\nint marks = 95;\nlong distance = 9876543210L;\n\nSystem.out.println(age);\nSystem.out.println(population);\nSystem.out.println(marks);\nSystem.out.println(distance);' },

                { type: 'section_heading', value: '5. Decimal Data Types' },
                { type: 'rich_text', value: 'Decimal data types are used to store numbers that have fractional parts (like 10.5 or 19.99). Java treats all decimal numbers differently depending on their precision:' },
                { type: 'rich_text', value: '<ul><li><strong>float:</strong> Suitable for small decimal values that don\'t require extreme precision. Requires <strong>f</strong> suffix.</li><li><strong>double:</strong> The standard type for decimals. Offers double precision and is the most frequently used.</li></ul>' },
                { type: 'code_block', language: 'java', value: 'float temperature = 36.5f;\ndouble price = 19.99;\n\nSystem.out.println(temperature);\nSystem.out.println(price);' },

                { type: 'section_heading', value: '6. Character Data Type' },
                { type: 'rich_text', value: 'The <strong>char</strong> data type is specifically designed to store a single 16-bit Unicode character. It is ideal for storing icons, symbols, or single letters.' },
                { type: 'rich_text', value: '<strong>Important Considerations:</strong>' },
                { type: 'rich_text', value: '<ul><li>Value must be enclosed in <strong>single quotes</strong> (\').</li><li>It cannot store more than one character at a time.</li><li>Internally, Java uses integers to track char symbols (A = 65).</li></ul>' },
                { type: 'code_block', language: 'java', value: "char grade = 'A';\nchar symbol = '$';\n\nSystem.out.println(grade);\nSystem.out.println(symbol);" },
                { type: 'rich_text', value: '<ul><li>❌ Wrong: <code class="bg-[#f3f4f6] px-1 rounded text-red-600">char letter = "A";</code></li><li>✅ Correct: <code class="bg-[#f3f4f6] px-1 rounded text-green-600">char letter = \'A\';</code></li></ul>' },

                { type: 'section_heading', value: '7. Boolean Data Type' },
                { type: 'rich_text', value: 'The <strong>boolean</strong> data type is used to represent simple flags that track true/false conditions. It is perfect for logic, conditional statements, and decisions in your code.' },
                { type: 'code_block', language: 'java', value: 'boolean isJavaFun = true;\nboolean isRainy = false;\n\nSystem.out.println(isJavaFun);\nSystem.out.println(isRainy);' },
                { type: 'rich_text', value: '<strong>Output:</strong><br/>true<br/>false' },

                { type: 'section_heading', value: '8. Non-Primitive Data Types' },
                { type: 'rich_text', value: 'Non-primitive (or Reference) data types are more complex structures that don\'t store the value directly but rather a memory reference. They are often defined by the programmer or coming from Java libraries.' },
                { type: 'rich_text', value: '<strong>Key Examples:</strong>' },
                { type: 'rich_text', value: '<ul><li><strong>String:</strong> A sequence of text characters (most popular).</li><li><strong>Arrays:</strong> A collection of multiple similar data types.</li><li><strong>Classes & Objects:</strong> Custom blueprints for software components.</li></ul>' },
                { type: 'code_block', language: 'java', value: 'String name = "John";\nSystem.out.println(name);' },

                { type: 'section_heading', value: '9. String Data Type' },
                { type: 'rich_text', value: 'The <strong>String</strong> type is unique in Java. Although it is technically an object (non-primitive), Java provides special support for it because text is used so frequently in software.' },
                { type: 'rich_text', value: 'It allows you to store a long sequence of characters, sentences, or even entire paragraphs. Strings are immutable, meaning they cannot be changed once created.' },
                { type: 'code_block', language: 'java', value: 'String message = "Hello Java";\nSystem.out.println(message);' },
                { type: 'rich_text', value: '<strong>Output:</strong><br/>Hello Java' },

                { type: 'section_heading', value: '10. Example Program Using Multiple Data Types' },
                { type: 'rich_text', value: 'Let\'s combine everything we\'ve learned into a single cohesive program that uses multiple data types together. This example shows how to declare, initialize, and print them.' },
                { type: 'code_block', language: 'java', value: 'public class Main {\n    public static void main(String[] args) {\n        int age = 25;\n        double salary = 55000.75;\n        char grade = \'A\';\n        boolean isEmployed = true;\n        String name = "Alex";\n\n        System.out.println("Name: " + name);\n        System.out.println("Age: " + age);\n        System.out.println("Salary: " + salary);\n        System.out.println("Grade: " + grade);\n        System.out.println("Employed: " + isEmployed);\n    }\n}' },

                { type: 'section_heading', value: '11. When to Use Each Data Type' },
                { type: 'rich_text', value: 'Choosing the right data type makes your code cleaner and more memory-efficient. Here are the best practices:' },
                { type: 'rich_text', value: '<ul><li><strong>Use int:</strong> For simple counting, ages, or scores.</li><li><strong>Use double:</strong> For financial data, measurements, or precise scientific calculations.</li><li><strong>Use char:</strong> For grades, gender symbols, or single codes.</li><li><strong>Use boolean:</strong> For switching between program states (on/off).</li><li><strong>Use String:</strong> For names, sentences, or structured text data.</li></ul>' },

                { type: 'section_heading', value: '12. Common Beginner Mistakes' },
                { type: 'rich_text', value: 'Even experienced developers sometimes make these data type errors. Watch out for these common pitfalls:' },
                { type: 'rich_text', value: '<strong>Mistake 1: Wrong data type</strong>' },
                { type: 'rich_text', value: '<ul><li>❌ Wrong: <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-red-600">int price = 10.5;</code> (Integers cannot have decimals)</li><li>✅ Correct: <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-green-600">double price = 10.5;</code></li></ul>' },
                { type: 'rich_text', value: '<strong>Mistake 2: Missing suffix</strong>' },
                { type: 'rich_text', value: '<ul><li>❌ Wrong: <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-red-600">float number = 5.5;</code> (Decimals are double by default)</li><li>✅ Correct: <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-green-600">float number = 5.5f;</code></li></ul>' },
                { type: 'rich_text', value: '<strong>Mistake 3: Using double quotes for char</strong>' },
                { type: 'rich_text', value: '<ul><li>❌ Wrong: <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-red-600">char grade = "A";</code></li><li>✅ Correct: <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-green-600">char grade = \'A\';</code></li></ul>' },

                { type: 'section_heading', value: '13. Practice Examples' },
                { type: 'rich_text', value: 'Study these complete examples to see how variables are used in real-world scenarios.' },
                { type: 'rich_text', value: '<strong>Example 1: Student Details</strong>' },
                { type: 'code_block', language: 'java', value: 'public class Student {\n    public static void main(String[] args) {\n        String name = "John";\n        int age = 20;\n        double percentage = 85.5;\n        char grade = \'A\';\n\n        System.out.println(name);\n        System.out.println(age);\n        System.out.println(percentage);\n        System.out.println(grade);\n    }\n}' },
                { type: 'rich_text', value: '<strong>Example 2: Product Information</strong>' },
                { type: 'code_block', language: 'java', value: 'public class Product {\n    public static void main(String[] args) {\n        String productName = "Laptop";\n        double price = 65000.50;\n        int quantity = 3;\n\n        System.out.println(productName);\n        System.out.println(price);\n        System.out.println(quantity);\n    }\n}' },

                { type: 'section_heading', value: 'Instructions' },
                { 
                    type: 'checkpoint', 
                    index: 1, 
                    points: 10,
                    value: '<strong>Task 1: Complete Profile</strong><br/>Create variables for: <strong>name</strong> (String), <strong>age</strong> (int), <strong>height</strong> (double), and <strong>gender</strong> (char). Print all values.',
                    content: [
                        { type: 'text', value: 'Example: "John", 25, 1.75, \'M\'' }
                    ]
                },
                { 
                    type: 'checkpoint', 
                    index: 2, 
                    points: 10,
                    value: '<strong>Task 2: Product Totals</strong><br/>Create variables for: <strong>productName</strong>, <strong>price</strong>, and <strong>quantity</strong>. Calculate and print the <strong>Total Price</strong>.',
                    content: [
                        { type: 'hint', value: 'Example: "Laptop", 65000.5, 3 -> Result: 195001.5' }
                    ]
                },
                { 
                    type: 'checkpoint', 
                    index: 3, 
                    points: 10,
                    value: '<strong>Task 3: Enrollment Check</strong><br/>Create variables for: <strong>isStudent</strong> (boolean), <strong>grade</strong> (char), and <strong>marks</strong> (int). Print all three.',
                    content: [
                        { type: 'text', value: 'Print them on separate lines.' }
                    ]
                }
            ],
            validationCriteria: [
                { 
                    index: 1, 
                    match: '(?=[\\s\\S]*[a-zA-Z]+)(?=[\\s\\S]*[\\d]+)(?=[\\s\\S]*[\\d]+\\.[\\d]+)(?=[\\s\\S]*[a-zA-Z])',
                    matchCode: '(?=[\\s\\S]*String\\s+[a-zA-Z0-9_]+\\s*=)(?=[\\s\\S]*int\\s+[a-zA-Z0-9_]+\\s*=)(?=[\\s\\S]*double\\s+[a-zA-Z0-9_]+\\s*=)(?=[\\s\\S]*char\\s+[a-zA-Z0-9_]+\\s*=)'
                },
                { 
                    index: 2, 
                    match: '(?=[\\s\\S]*[a-zA-Z]+)(?=[\\s\\S]*[\\d]+\\.[\\d]+)',
                    matchCode: '(?=[\\s\\S]*String\\s+[a-zA-Z0-9_]+\\s*=)(?=[\\s\\S]*double\\s+[a-zA-Z0-9_]+\\s*=)(?=[\\s\\S]*int\\s+[a-zA-Z0-9_]+\\s*=)(?=[\\s\\S]*\\*)'
                },
                { 
                    index: 3, 
                    match: '(?=[\\s\\S]*(true|false))(?=[\\s\\S]*[a-zA-Z])(?=[\\s\\S]*[\\d]+)',
                    matchCode: '(?=[\\s\\S]*boolean\\s+[a-zA-Z0-9_]+\\s*=)(?=[\\s\\S]*char\\s+[a-zA-Z0-9_]+\\s*=)(?=[\\s\\S]*int\\s+[a-zA-Z0-9_]+\\s*=)'
                }
            ]
        };

        // Lesson 3: Declaring Variables in Java
        const lesson3Id = varMod.lessons.find(l => l.order === 3)._id;
        const declaringVariablesLesson = {
            _id: lesson3Id,
            moduleId: moduleId,
            courseId: courseId,
            order: 3,
            type: 'lesson',
            title: 'Declaring Variables in Java',
            duration: '25 min',
            language: 'java',
            isTerminal: false,
            fileName: 'Main.java',
            starterCode: `public class Main {\n    public static void main(String[] args) {\n\n        // Write your code here\n\n    }\n}`,
            content: [
                { type: 'label', value: 'VARIABLES' },
                { type: 'heading', value: 'Declaring Variables in Java' },
                { type: 'duration', value: '25 min' },

                { type: 'section_heading', value: '1. What is Variable Declaration?' },
                { type: 'rich_text', value: 'Variable declaration means creating a variable by specifying its data type and name so that Java knows what type of data will be stored in it. Before using any variable in Java, it must first be declared.' },
                { type: 'code_block', value: 'dataType variableName;' },
                { type: 'rich_text', value: '<strong>Example:</strong>' },
                { type: 'code_block', language: 'java', value: 'int age;\ndouble price;\nString name;' },
                { type: 'rich_text', value: '<strong>Here:</strong><ul><li><strong>int, double, String:</strong> data types</li><li><strong>age, price, name:</strong> variable names</li></ul>' },

                { type: 'section_heading', value: '2. Declaring and Initializing Variables' },
                { type: 'rich_text', value: 'After declaring a variable, we usually assign a value to it. This is called initialization. You can do both in a single step.' },
                { type: 'code_block', value: 'dataType variableName = value;' },
                { type: 'code_block', language: 'java', value: 'int age = 22;\ndouble salary = 50000.50;\nString name = "Alex";' },
                { type: 'rich_text', value: '<strong>Full Program Example:</strong>' },
                { type: 'code_block', language: 'java', value: 'public class Main {\n    public static void main(String[] args) {\n        int age = 22;\n        String name = "Alex";\n        double salary = 50000.50;\n\n        System.out.println(name);\n        System.out.println(age);\n        System.out.println(salary);\n    }\n}' },

                { type: 'section_heading', value: '3. Declaring Variables Without Initializing' },
                { type: 'rich_text', value: 'Sometimes we declare variables first and assign values later. This is common when you don\'t have the data yet.' },
                { type: 'code_block', language: 'java', value: 'int age;\nage = 25;\nSystem.out.println(age);' },
                { type: 'rich_text', value: '<strong>Program Example:</strong>' },
                { type: 'code_block', language: 'java', value: 'public class Main {\n    public static void main(String[] args) {\n        int number;\n        number = 100;\n\n        System.out.println(number);\n    }\n}' },

                { type: 'section_heading', value: '4. Declaring Multiple Variables' },
                { type: 'rich_text', value: 'Java allows multiple variables of the same data type to be declared in one line to keep your code concise.' },
                { type: 'code_block', language: 'java', value: 'int a, b, c;\nint x = 10, y = 20, z = 30;' },
                { type: 'rich_text', value: '<strong>Program Example:</strong>' },
                { type: 'code_block', language: 'java', value: 'public class Main {\n    public static void main(String[] args) {\n        int a = 10, b = 20, c = 30;\n\n        System.out.println(a);\n        System.out.println(b);\n        System.out.println(c);\n    }\n}' },

                { type: 'section_heading', value: '5. Variable Naming Rules' },
                { type: 'rich_text', value: 'Java has strict rules for naming variables. If you break these, your code will not compile.' },
                { type: 'rich_text', value: '<strong>Rules:</strong><ul><li>Must start with a letter, underscore (_), or dollar sign ($).</li><li>Cannot start with a number.</li><li>Cannot contain spaces.</li><li>Cannot use Java keywords (like class, public, int).</li><li>Java is case-sensitive (Age and age are different).</li></ul>' },
                { type: 'rich_text', value: '<strong>Valid Examples:</strong>' },
                { type: 'code_block', language: 'java', value: 'int age;\nint studentAge;\nint _count;\nint $price;' },
                { type: 'rich_text', value: '<strong>Invalid Examples:</strong>' },
                { type: 'code_block', language: 'java', value: '// int 1age;       ❌ Error\n// int student age; ❌ Error\n// int class;       ❌ Error' },

                { type: 'section_heading', value: '6. Variable Naming Conventions' },
                { type: 'rich_text', value: 'Professional Java programs follow the <strong>camelCase</strong> naming convention for variables. This makes code easier to read for other developers.' },
                { type: 'rich_text', value: '<strong>Examples:</strong><ul><li>int studentAge;</li><li>double accountBalance;</li><li>String firstName;</li></ul>' },
                { type: 'rich_text', value: '<ul><li>❌ <strong>Bad Naming:</strong> int x, a, n; (Not descriptive)</li><li>✅ <strong>Good Naming:</strong> int totalMarks, numberOfStudents;</li></ul>' },

                { type: 'section_heading', value: '7. Default Values of Variables' },
                { type: 'rich_text', value: 'Local variables (declared inside a method) do not get default values and must be initialized before use, or Java will throw an error.' },
                { type: 'rich_text', value: '<strong>Error Example:</strong>' },
                { type: 'code_block', language: 'java', value: 'int number;\n// System.out.println(number); ❌ Error: might not have been initialized' },
                { type: 'rich_text', value: '<strong>Correct Version:</strong>' },
                { type: 'code_block', language: 'java', value: 'int number = 10;\nSystem.out.println(number); // ✅ Works' },

                { type: 'section_heading', value: '8. Updating Variable Values' },
                { type: 'rich_text', value: 'The value of a variable can be updated many times during program execution. This is why they are called "variables" (they can vary).' },
                { type: 'code_block', language: 'java', value: 'int score = 50;\nscore = 80; // Value is now updated to 80\nSystem.out.println(score);' },

                { type: 'section_heading', value: '9. Using Variables in Expressions' },
                { type: 'rich_text', value: 'Variables can participate in calculations, operations, and logical expressions.' },
                { type: 'code_block', language: 'java', value: 'int num1 = 10;\nint num2 = 20;\nint sum = num1 + num2;\nSystem.out.println(sum); // Output: 30' },

                { type: 'section_heading', value: '10. Example Program Using Multiple Variables' },
                { type: 'code_block', language: 'java', value: 'public class Student {\n    public static void main(String[] args) {\n        String name = "John";\n        int age = 20;\n        double percentage = 85.5;\n        char grade = \'A\';\n\n        System.out.println("Name: " + name);\n        System.out.println("Age: " + age);\n        System.out.println("Percentage: " + percentage);\n        System.out.println("Grade: " + grade);\n    }\n}' },

                { type: 'section_heading', value: '11. Common Beginner Mistakes' },
                { type: 'rich_text', value: '<ul><li><strong>Missing Semicolon:</strong> int age = 20 (❌ Must have \";\")</li><li><strong>Wrong Data Type:</strong> int price = 10.5; (❌ Use double for decimals)</li><li><strong>Invalid Name:</strong> int 2number = 10; (❌ Cannot start with number)</li></ul>' },

                { type: 'section_heading', value: 'Instructions' },
                { 
                    type: 'checkpoint', 
                    index: 1, 
                    points: 5,
                    value: '<strong>Task 1: Personal Information Program</strong><br/>Declare variables for: <strong>name</strong>, <strong>age</strong>, and <strong>city</strong>. Print all values.',
                    content: [
                        { type: 'text', value: 'Example Output: "Name: Alex", "Age: 22", "City: Bangalore"' }
                    ]
                },
                { 
                    type: 'checkpoint', 
                    index: 2, 
                    points: 5,
                    value: '<strong>Task 2: Simple Math Program</strong><br/>Create variables <strong>num1</strong> and <strong>num2</strong>. Find and print their sum.',
                    content: [
                        { type: 'hint', value: 'Example: "Number 1: 10", "Number 2: 20", "Sum: 30"' }
                    ]
                },
                { 
                    type: 'checkpoint', 
                    index: 3, 
                    points: 5,
                    value: '<strong>Task 3: Product Information Program</strong><br/>Create variables: <strong>productName</strong>, <strong>price</strong>, and <strong>quantity</strong>. Calculate and print total price.',
                    content: [
                        { type: 'hint', value: 'Example: "Product: Laptop", "Price: 50000", "Quantity: 2", "Total Price: 100000"' }
                    ]
                },
                { 
                    type: 'checkpoint', 
                    index: 4, 
                    points: 10,
                    value: '<strong>Task 4 (Intermediate): Average Marks</strong><br/>Create variables for a student: <strong>name</strong>, <strong>marks1</strong>, <strong>marks2</strong>, <strong>marks3</strong>. Calculate and print the average.',
                    content: [
                        { type: 'text', value: 'Average = (marks1 + marks2 + marks3) / 3' }
                    ]
                }
            ],
            validationCriteria: [
                { 
                    index: 1, 
                    match: '(?=[\\s\\S]*Name:)(?=[\\s\\S]*Age:)(?=[\\s\\S]*City:)',
                    matchCode: '(?=[\\s\\S]*String\\s+[a-zA-Z0-9_]+\\s*=)(?=[\\s\\S]*int\\s+[a-zA-Z0-9_]+\\s*=)(?=[\\s\\S]*String\\s+[a-zA-Z0-9_]+\\s*=)'
                },
                { 
                    index: 2, 
                    match: '(?=[\\s\\S]*Number 1:)(?=[\\s\\S]*Number 2:)(?=[\\s\\S]*Sum:)',
                    matchCode: '(?=[\\s\\S]*int\\s+num1\\s*=)(?=[\\s\\S]*int\\s+num2\\s*=)(?=[\\s\\S]*\\+)'
                },
                { 
                    index: 3, 
                    match: '(?=[\\s\\S]*Product:)(?=[\\s\\S]*Price:)(?=[\\s\\S]*Quantity:)(?=[\\s\\S]*Total Price:)',
                    matchCode: '(?=[\\s\\S]*String\\s+[a-zA-Z0-9_]+\\s*=)(?=[\\s\\S]*\\*)'
                },
                { 
                    index: 4, 
                    match: '(?=[\\s\\S]*[\\d]+)',
                    matchCode: '(?=[\\s\\S]*marks1)(?=[\\s\\S]*marks2)(?=[\\s\\S]*marks3)(?=[\\s\\S]*\\+)(?=[\\s\\S]*/)'
                }
            ]
        };

        // Lesson 4: Initializing Variables in Java
        const lesson4Id = varMod.lessons.find(l => l.order === 4)._id;
        const initializingVariablesLesson = {
            _id: lesson4Id,
            moduleId: moduleId,
            courseId: courseId,
            order: 4,
            type: 'lesson',
            title: 'Initializing Variables in Java',
            duration: '25 min',
            language: 'java',
            isTerminal: false,
            fileName: 'Main.java',
            starterCode: `public class Main {\n    public static void main(String[] args) {\n\n        // Write your code here\n\n    }\n}`,
            content: [
                { type: 'label', value: 'VARIABLES' },
                { type: 'heading', value: 'Initializing Variables in Java' },
                { type: 'duration', value: '25 min' },

                { type: 'section_heading', value: '1. What is Variable Initialization?' },
                { type: 'rich_text', value: 'Variable initialization means assigning a value to a variable after it has been declared. When a variable is declared, it only reserves memory, but when it is initialized, it stores an actual value in that memory location.<br/><br/>In Java, variables must be initialized before they are used, especially local variables inside methods. If a variable is used without initialization, the Java compiler will produce an error.' },
                { type: 'rich_text', value: '<strong>Example:</strong>' },
                { type: 'code_block', language: 'java', value: 'int age = 25;' },
                { type: 'rich_text', value: '<strong>Here:</strong><ul><li><strong>int:</strong> data type</li><li><strong>age:</strong> variable name</li><li><strong>25:</strong> value assigned during initialization</li></ul>' },

                { type: 'section_heading', value: '2. Declaring vs Initializing Variables' },
                { type: 'rich_text', value: 'Declaration and initialization are two different steps, although they are often combined.' },
                { type: 'rich_text', value: '<strong>Variable Declaration:</strong>' },
                { type: 'code_block', language: 'java', value: 'int age;' },
                { type: 'rich_text', value: 'The variable is created but no value is stored yet.' },
                { type: 'rich_text', value: '<strong>Variable Initialization:</strong>' },
                { type: 'code_block', language: 'java', value: 'age = 25;' },
                { type: 'rich_text', value: 'Now the variable stores the value 25.' },
                { type: 'rich_text', value: '<strong>Combined Example:</strong>' },
                { type: 'code_block', language: 'java', value: 'int age = 25;' },
                { type: 'rich_text', value: 'This is the most common way to declare and initialize variables.' },

                { type: 'section_heading', value: '3. Example Program' },
                { type: 'code_block', language: 'java', value: 'public class Main {\n    public static void main(String[] args) {\n        int age;\n        age = 22;\n\n        System.out.println("Age: " + age);\n    }\n}' },
                { type: 'rich_text', value: '<strong>Output:</strong><br/><code class="bg-gray-100 px-2 py-1 rounded">Age: 22</code>' },

                { type: 'section_heading', value: '4. Initializing Variables at Declaration' },
                { type: 'rich_text', value: 'The most common practice in Java is to initialize variables when they are declared. This ensures the variable always has a known value.' },
                { type: 'code_block', language: 'java', value: 'int marks = 90;\ndouble price = 15.5;\nString name = "Alex";\nchar grade = \'A\';' },
                { type: 'rich_text', value: '<strong>Program Example:</strong>' },
                { type: 'code_block', language: 'java', value: 'public class Main {\n    public static void main(String[] args) {\n        int marks = 90;\n        double price = 15.5;\n        String name = "Alex";\n        char grade = \'A\';\n\n        System.out.println(name);\n        System.out.println(marks);\n        System.out.println(price);\n        System.out.println(grade);\n    }\n}' },

                { type: 'section_heading', value: '5. Initializing Multiple Variables' },
                { type: 'rich_text', value: 'Java allows multiple variables of the same type to be initialized in one line, separated by commas.' },
                { type: 'code_block', language: 'java', value: 'int a = 10, b = 20, c = 30;' },
                { type: 'rich_text', value: '<strong>Program Example:</strong>' },
                { type: 'code_block', language: 'java', value: 'public class Main {\n    public static void main(String[] args) {\n        int a = 10, b = 20, c = 30;\n\n        System.out.println(a);\n        System.out.println(b);\n        System.out.println(c);\n    }\n}' },

                { type: 'section_heading', value: '6. Initializing Variables Using Expressions' },
                { type: 'rich_text', value: 'Variables can be initialized using expressions or calculations involving other variables or literal values.' },
                { type: 'code_block', language: 'java', value: 'int num1 = 10;\nint num2 = 20;\nint sum = num1 + num2;' },
                { type: 'rich_text', value: '<strong>Program Example:</strong>' },
                { type: 'code_block', language: 'java', value: 'public class Main {\n    public static void main(String[] args) {\n        int num1 = 10;\n        int num2 = 20;\n        int sum = num1 + num2;\n\n        System.out.println("Sum: " + sum);\n    }\n}' },
                { type: 'rich_text', value: '<strong>Output:</strong><br/><code class="bg-gray-100 px-2 py-1 rounded">Sum: 30</code>' },

                { type: 'section_heading', value: '7. Updating Initialized Variables' },
                { type: 'rich_text', value: 'Variables can be re-initialized or updated with new values during program execution. The old value is replaced by the new one.' },
                { type: 'code_block', language: 'java', value: 'int score = 50;\nscore = 80;\nSystem.out.println(score); // Output: 80' },
                { type: 'rich_text', value: 'This means the variable <strong>score</strong> now holds the updated value 80.' },

                { type: 'section_heading', value: '8. Default Values vs Local Variables' },
                { type: 'rich_text', value: 'Java provides default values for instance and static variables, but <strong>local variables</strong> (inside methods) must be initialized manually before use.' },
                { type: 'rich_text', value: '<strong>Error Example:</strong>' },
                { type: 'code_block', language: 'java', value: 'public class Main {\n    public static void main(String[] args) {\n        int number;\n        // System.out.println(number); ❌ Error: variable number might not have been initialized\n    }\n}' },
                { type: 'rich_text', value: '<strong>Correct Version:</strong>' },
                { type: 'code_block', language: 'java', value: 'int number = 10;\nSystem.out.println(number); // ✅ Works' },

                { type: 'section_heading', value: '9. Initialization with Different Data Types' },
                { type: 'rich_text', value: 'You can initialize variables of any supported data type including primitives and Strings.' },
                { type: 'code_block', language: 'java', value: 'public class Main {\n    public static void main(String[] args) {\n        int age = 25;\n        double salary = 45000.75;\n        char grade = \'A\';\n        boolean isPassed = true;\n        String name = "John";\n\n        System.out.println(age);\n        System.out.println(salary);\n        System.out.println(grade);\n        System.out.println(isPassed);\n        System.out.println(name);\n    }\n}' },

                { type: 'section_heading', value: '10. Common Beginner Mistakes' },
                { type: 'rich_text', value: '<ul><li><strong>Using Variable Before Initialization:</strong><br/>❌ <code>int n; System.out.println(n);</code><br/>✅ <code>int n = 10; System.out.println(n);</code></li><li><strong>Assigning Wrong Data Type:</strong><br/>❌ <code>int price = 15.5;</code><br/>✅ <code>double price = 15.5;</code></li><li><strong>Missing Semicolon:</strong><br/>❌ <code>int age = 20</code><br/>✅ <code>int age = 20;</code></li></ul>' },

                { type: 'section_heading', value: 'Instructions' },
                { 
                    type: 'checkpoint', 
                    index: 1, 
                    points: 5,
                    value: '<strong>Task 1: Basic Variable Initialization</strong><br/>Create variables for: <strong>name</strong>, <strong>age</strong>, and <strong>city</strong>. Initialize them and print the values.',
                    content: [
                        { type: 'text', value: 'Example Output: "Name: Alex", "Age: 23", "City: Bangalore"' }
                    ]
                },
                { 
                    type: 'checkpoint', 
                    index: 2, 
                    points: 5,
                    value: '<strong>Task 2: Number Calculation Program</strong><br/>Create variables <strong>num1</strong> and <strong>num2</strong>. Initialize them and print their <strong>sum</strong>, <strong>difference</strong>, and <strong>product</strong>.',
                    content: [
                        { type: 'hint', value: 'Product is calculated using asterisk (*)' }
                    ]
                },
                { 
                    type: 'checkpoint', 
                    index: 3, 
                    points: 5,
                    value: '<strong>Task 3: Student Marks Program</strong><br/>Create variables for: <strong>studentName</strong>, <strong>mark1</strong>, <strong>mark2</strong>, and <strong>mark3</strong>. Calculate and print the total marks.',
                    content: [
                        { type: 'text', value: 'Example: "Total Marks: 255"' }
                    ]
                },
                { 
                    type: 'checkpoint', 
                    index: 4, 
                    points: 10,
                    value: '<strong>Task 4: Product Billing Program</strong><br/>Create variables for: <strong>productName</strong>, <strong>price</strong>, and <strong>quantity</strong>. Calculate and print the total cost.',
                    content: [
                        { type: 'text', value: 'Example: "Product: Laptop", "Price: 50000", "Quantity: 2", "Total Cost: 100000"' }
                    ]
                }
            ],
            validationCriteria: [
                { 
                    index: 1, 
                    match: '(?=[\\s\\S]*Name:)(?=[\\s\\S]*Age:)(?=[\\s\\S]*City:)',
                    matchCode: '(?=[\\s\\S]*String\\s+[a-zA-Z0-9_]+\\s*=)(?=[\\s\\S]*int\\s+[a-zA-Z0-9_]+\\s*=)(?=[\\s\\S]*String\\s+[a-zA-Z0-9_]+\\s*=)'
                },
                { 
                    index: 2, 
                    match: '(?=[\\s\\S]*[\\d]+)(?=[\\s\\S]*[\\d]+)(?=[\\s\\S]*[\\d]+)',
                    matchCode: '(?=[\\s\\S]*int\\s+num1\\s*=)(?=[\\s\\S]*int\\s+num2\\s*=)(?=[\\s\\S]*\\+)(?=[\\s\\S]*\\-)(?=[\\s\\S]*\\*)'
                },
                { 
                    index: 3, 
                    match: '(?=[\\s\\S]*Total Marks:)',
                    matchCode: '(?=[\\s\\S]*mark1)(?=[\\s\\S]*mark2)(?=[\\s\\S]*mark3)(?=[\\s\\S]*\\+)'
                },
                { 
                    index: 4, 
                    match: '(?=[\\s\\S]*Product:)(?=[\\s\\S]*Price:)(?=[\\s\\S]*Quantity:)(?=[\\s\\S]*Total Cost:)',
                    matchCode: '(?=[\\s\\S]*productName)(?=[\\s\\S]*price)(?=[\\s\\S]*quantity)(?=[\\s\\S]*\\*)'
                }
            ]
        };

        // Lesson 5: Variable Naming Rules
        const lesson5Id = varMod.lessons.find(l => l.order === 5)._id;
        const namingRulesLesson = {
            _id: lesson5Id,
            moduleId: moduleId,
            courseId: courseId,
            order: 5,
            type: 'lesson',
            title: 'Variable Naming Rules',
            duration: '25 min',
            language: 'java',
            isTerminal: false,
            fileName: 'Main.java',
            starterCode: `public class Main {\n    public static void main(String[] args) {\n\n        // Write your code here\n\n    }\n}`,
            content: [
                { type: 'label', value: 'VARIABLES' },
                { type: 'heading', value: 'Variable Naming Rules' },
                { type: 'duration', value: '25 min' },

                { type: 'section_heading', value: '1. Introduction to Naming Rules' },
                { type: 'rich_text', value: 'Variable naming rules define how variables should be named in Java. Following these rules ensures that the Java compiler understands your code and that the program remains readable and maintainable for you and other developers.<br/><br/>A good variable name also helps developers understand the purpose of the variable immediately without needing to study the entire program.' },
                { type: 'rich_text', value: '<strong>Basic Syntax:</strong>' },
                { type: 'code_block', language: 'java', value: 'dataType variableName = value;' },
                { type: 'rich_text', value: '<strong>Example:</strong>' },
                { type: 'code_block', language: 'java', value: 'int age = 25;\nString name = "Alex";\ndouble price = 15.5;' },
                { type: 'rich_text', value: 'Here <code class="bg-gray-100 px-1 rounded">age</code>, <code class="bg-gray-100 px-1 rounded">name</code>, and <code class="bg-gray-100 px-1 rounded">price</code> are all valid variable names.' },

                { type: 'section_heading', value: '2. Rules for Naming Variables' },
                { type: 'rich_text', value: 'Java has strict rules that must be followed. If a name breaks these rules, the compiler will throw an error.' },
                { type: 'rich_text', value: '<strong>Rule 1: Must start with a letter, underscore (_), or dollar sign ($).</strong>' },
                { type: 'code_block', language: 'java', value: 'int age;    // ✅ Valid\nint _count; // ✅ Valid\nint $price; // ✅ Valid\n// int 2number; ❌ Invalid: Cannot start with a number' },
                { type: 'rich_text', value: '<strong>Rule 2: Cannot contain spaces.</strong>' },
                { type: 'code_block', language: 'java', value: '// int student age; ❌ Invalid\nint studentAge;    // ✅ Correct' },
                { type: 'rich_text', value: '<strong>Rule 3: Cannot use Java keywords.</strong>' },
                { type: 'rich_text', value: 'Keywords are reserved words that Java uses (like class, public, int, static).' },
                { type: 'code_block', language: 'java', value: '// int class = 10;   ❌ Invalid\nint classNumber = 10; // ✅ Correct' },
                { type: 'rich_text', value: '<strong>Rule 4: Names are case-sensitive.</strong>' },
                { type: 'code_block', language: 'java', value: 'int age = 20;\nint Age = 30; // These are TWO different variables' },

                { type: 'section_heading', value: '3. Professional Naming Conventions' },
                { type: 'rich_text', value: 'While rules are required, <strong>conventions</strong> are best practices that professional developers follow to keep code clean.' },
                { type: 'rich_text', value: '<strong>camelCase Naming:</strong> This is the standard for Java variables. Start with a lowercase letter and capitalize each subsequent word.' },
                { type: 'code_block', language: 'java', value: 'int studentAge;\ndouble accountBalance;\nString firstName;' },
                { type: 'rich_text', value: '<strong>Descriptive Names:</strong> Always use names that explain what the data represents.' },
                { type: 'rich_text', value: '<ul><li>❌ <strong>Bad Practice:</strong> <code>int x;</code>, <code>int a;</code> (Vague)</li><li>✅ <strong>Good Practice:</strong> <code>int totalMarks;</code>, <code>int numberOfStudents;</code></li></ul>' },

                { type: 'section_heading', value: '4. Summary of Naming Rules' },
                { type: 'rich_text', value: `
<div class="overflow-x-auto my-4 border border-gray-100 rounded-md shadow-sm">
    <table class="min-w-full text-sm border-collapse">
        <thead>
            <tr class="bg-gray-50/80 border-b border-gray-200">
                <th class="px-6 py-3 text-left font-semibold text-gray-900 border-r border-gray-200">Rule</th>
                <th class="px-6 py-3 text-left font-semibold text-gray-900">Description</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
            <tr><td class="px-6 py-3 border-r border-gray-200 font-bold bg-gray-50/30">First Character</td><td class="px-6 py-3 border-r border-gray-200">Letter, _, or $ only. NO numbers.</td></tr>
            <tr><td class="px-6 py-3 border-r border-gray-200 font-bold bg-gray-50/30">Spaces</td><td class="px-6 py-3 border-r border-gray-200">Not allowed. Use camelCase instead.</td></tr>
            <tr><td class="px-6 py-3 border-r border-gray-200 font-bold bg-gray-50/30">Keywords</td><td class="px-6 py-3 border-r border-gray-200">Reserved words like 'int' or 'class' cannot be used.</td></tr>
            <tr><td class="px-6 py-3 border-r border-gray-200 font-bold bg-gray-50/30">Case Sensitivity</td><td class="px-6 py-3 border-r border-gray-200">'name' and 'Name' are unique variables.</td></tr>
        </tbody>
    </table>
</div>` },

                { type: 'section_heading', value: '5. Example Program' },
                { type: 'code_block', language: 'java', value: 'public class StudentInfo {\n    public static void main(String[] args) {\n        String studentName = "John";\n        int studentAge = 21;\n        double studentPercentage = 88.5;\n\n        System.out.println("Student: " + studentName);\n        System.out.println("Age: " + studentAge);\n        System.out.println("Grade: " + studentPercentage + "%");\n    }\n}' },

                { type: 'section_heading', value: '6. Common Beginner Mistakes' },
                { type: 'rich_text', value: '<strong>Mistake 1: Starting with numbers</strong><br/>❌ <code>int 1age = 20;</code><br/>✅ <code>int age1 = 20;</code>' },
                { type: 'rich_text', value: '<strong>Mistake 2: Using spaces</strong><br/>❌ <code>int total marks;</code><br/>✅ <code>int totalMarks;</code>' },

                { type: 'section_heading', value: 'Instructions' },
                { 
                    type: 'checkpoint', 
                    index: 1, 
                    points: 5,
                    value: '<strong>Task 1: Proper Student Naming</strong><br/>Declare variables with proper names for: <strong>studentName</strong>, <strong>studentAge</strong>, and <strong>studentCity</strong>. Print them.',
                    content: [
                        { type: 'text', value: 'Example Output: "Student: Alex", "Age: 21", "City: Mumbai"' }
                    ]
                },
                { 
                    type: 'checkpoint', 
                    index: 2, 
                    points: 5,
                    value: '<strong>Task 2: Product Catalog Naming</strong><br/>Create variables for: <strong>productName</strong>, <strong>productPrice</strong>, and <strong>productQuantity</strong>. Print all values.',
                    content: [
                        { type: 'text', value: 'Ensure you follow the camelCase naming convention.' }
                    ]
                },
                { 
                    type: 'checkpoint', 
                    index: 3, 
                    points: 10,
                    value: '<strong>Task 3: Meaningful Statistics</strong><br/>Create variables for: <strong>numberOfStudents</strong>, <strong>averageMarks</strong>, and <strong>courseName</strong>. Display them with meaningful text.',
                    content: [
                        { type: 'text', value: 'Example: "Total Students: 50", "Average: 85.5", "Course: Java Programming"' }
                    ]
                }
            ],
            validationCriteria: [
                { 
                    index: 1, 
                    match: '(?=[\\s\\S]*Student:)(?=[\\s\\S]*Age:)(?=[\\s\\S]*City:)',
                    matchCode: '(?=[\\s\\S]*String\\s+studentName\\s*=)(?=[\\s\\S]*int\\s+studentAge\\s*=)(?=[\\s\\S]*String\\s+studentCity\\s*=)'
                },
                { 
                    index: 2, 
                    match: '(?=[\\s\\S]*[a-zA-Z0-9]+)(?=[\\s\\S]*[\\d]+)',
                    matchCode: '(?=[\\s\\S]*String\\s+productName\\s*=)(?=[\\s\\S]*double\\s+productPrice\\s*=)(?=[\\s\\S]*int\\s+productQuantity\\s*=)'
                },
                { 
                    index: 3, 
                    match: '(?=[\\s\\S]*Total Students:)(?=[\\s\\S]*Average:)(?=[\\s\\S]*Course:)',
                    matchCode: '(?=[\\s\\S]*int\\s+numberOfStudents\\s*=)(?=[\\s\\S]*double\\s+averageMarks\\s*=)(?=[\\s\\S]*String\\s+courseName\\s*=)'
                }
            ]
        };

        // Lesson 6: Variable Scope
        const lesson6Id = varMod.lessons.find(l => l.order === 6)._id;
        const variableScopeLesson = {
            _id: lesson6Id,
            moduleId: moduleId,
            courseId: courseId,
            order: 6,
            type: 'lesson',
            title: 'Variable Scope',
            duration: '25 min',
            language: 'java',
            isTerminal: false,
            fileName: 'Main.java',
            starterCode: `public class Main {\n    public static void main(String[] args) {\n\n        // Write your code here\n\n    }\n}`,
            content: [
                { type: 'label', value: 'VARIABLES' },
                { type: 'heading', value: 'Variable Scope' },
                { type: 'duration', value: '25 min' },

                { type: 'section_heading', value: '1. What is Variable Scope?' },
                { type: 'rich_text', value: 'Variable scope defines where a variable can be accessed or "seen" in a program. In Java, variables are only accessible within the specific region (block of code) where they are declared.<br/><br/>Understanding scope is critical for developers to:<ul><li>Avoid naming conflicts and errors.</li><li>Control data visibility (security).</li><li>Manage computer memory efficiently.</li></ul>' },

                { type: 'section_heading', value: '2. Types of Variable Scope' },
                { type: 'rich_text', value: 'Java variables are classified into three main types based on their scope and where they are declared:' },
                { type: 'code_block', value: 'Java Variables\n   |\n   |-- Local Variables (Inside methods)\n   |-- Instance Variables (Inside class, outside methods)\n   |-- Static Variables (Belong to the class)' },

                { type: 'section_heading', value: '3. Local Variables' },
                { type: 'rich_text', value: 'Local variables are declared inside methods, constructors, or code blocks. They are created when the block is entered and destroyed when it ends.' },
                { type: 'rich_text', value: '<strong>Key Rule:</strong> They can only be used within the specific method or block where they reside.' },
                { type: 'code_block', language: 'java', value: 'public class Main {\n    public static void main(String[] args) {\n        int number = 10; // Local variable\n        System.out.println(number); // Accessible here\n    }\n\n    public void otherMethod() {\n        // System.out.println(number); ❌ Error: number is not known here\n    }\n}' },

                { type: 'section_heading', value: '4. Instance Variables' },
                { type: 'rich_text', value: 'Instance variables are declared inside a class but outside any specific method. These variables belong to an <strong>Object</strong> (instance) of the class.' },
                { type: 'rich_text', value: 'Each time you create a new object, it gets its own "copy" of the instance variables.' },
                { type: 'code_block', language: 'java', value: 'class Student {\n    String name; // Instance variable\n    int age;    // Instance variable\n\n    public static void main(String[] args) {\n        Student s1 = new Student();\n        s1.name = "John";\n        s1.age = 20;\n\n        System.out.println(s1.name); // Accessible via object\n    }\n}' },

                { type: 'section_heading', value: '5. Static Variables' },
                { type: 'rich_text', value: 'Static variables (or class variables) are declared with the <code>static</code> keyword inside a class but outside methods. Unlike instance variables, there is only <strong>one copy</strong> of a static variable that is shared by all objects of that class.' },
                { type: 'code_block', language: 'java', value: 'class Counter {\n    static int count = 0; // Shared across all objects\n\n    public Counter() {\n        count++;\n    }\n\n    public static void main(String[] args) {\n        new Counter();\n        new Counter();\n        new Counter();\n\n        System.out.println(Counter.count); // Output: 3\n    }\n}' },

                { type: 'section_heading', value: '6. Scope Comparison Table' },
                { type: 'rich_text', value: `
<div class="overflow-x-auto my-4 border border-gray-100 rounded-md shadow-sm">
    <table class="min-w-full text-sm border-collapse">
        <thead>
            <tr class="bg-gray-50/80 border-b border-gray-200">
                <th class="px-6 py-3 text-left font-semibold text-gray-900 border-r border-gray-200">Variable Type</th>
                <th class="px-6 py-3 text-left font-semibold text-gray-900 border-r border-gray-200">Declared In</th>
                <th class="px-6 py-3 text-left font-semibold text-gray-900">Accessible In</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
            <tr><td class="px-6 py-3 border-r border-gray-200 font-bold bg-blue-50/30 text-blue-700">Local</td><td class="px-6 py-3 border-r border-gray-200">Method or Block</td><td class="px-6 py-3">Only inside that specific method/block.</td></tr>
            <tr><td class="px-6 py-3 border-r border-gray-200 font-bold bg-green-50/30 text-green-700">Instance</td><td class="px-6 py-3 border-r border-gray-200">Class (Outside methods)</td><td class="px-6 py-3">Any method inside the class (via object).</td></tr>
            <tr><td class="px-6 py-3 border-r border-gray-200 font-bold bg-orange-50/30 text-orange-700">Static</td><td class="px-6 py-3 border-r border-gray-200">Class (with static keyword)</td><td class="px-6 py-3">Entire class, shared by all objects.</td></tr>
        </tbody>
    </table>
</div>` },

                { type: 'section_heading', value: 'Instructions' },
                { 
                    type: 'checkpoint', 
                    index: 1, 
                    points: 5,
                    value: '<strong>Task 1: Local Scope Practice</strong><br/>Create a program with a local variable <strong>message</strong> inside the main method. Initialize it and print it.',
                    content: [
                        { type: 'text', value: 'Local variables can only be used where they are declared!' }
                    ]
                },
                { 
                    type: 'checkpoint', 
                    index: 2, 
                    points: 10,
                    value: '<strong>Task 2: Instance Variable Object</strong><br/>Create a <strong>Student</strong> class with instance variables: <strong>name</strong> and <strong>age</strong>. In the main method, create an object and print their values.',
                    content: [
                        { type: 'hint', value: 'Use "Student s = new Student();" to create the object.' }
                    ]
                },
                { 
                    type: 'checkpoint', 
                    index: 10, 
                    points: 10,
                    value: '<strong>Task 3: Shared Static Counter</strong><br/>Create a program using a <strong>static</strong> variable <code>objectCount</code>. In a constructor, increment it. Print the final count after creating 3 objects.',
                    content: [
                        { type: 'text', value: 'Static variables are shared across all instances of a class.' }
                    ]
                }
            ],
            validationCriteria: [
                { 
                    index: 1, 
                    match: '(?=[\\s\\S]*[a-zA-Z0-9]+)',
                    matchCode: '(?=[\\s\\S]*String\\s+message\\s*=)(?=[\\s\\S]*System.out.println)'
                },
                { 
                    index: 2, 
                    match: '(?=[\\s\\S]*[a-zA-Z]+)(?=[\\s\\S]*[\\d]+)',
                    matchCode: '(?=[\\s\\S]*Student[\\s\\S]*=[\\s\\S]*new\\s+Student)(?=[\\s\\S]*.name)(?=[\\s\\S]*.age)'
                },
                { 
                    index: 3, 
                    match: '(?=[\\s\\S]*3)',
                    matchCode: '(?=[\\s\\S]*static\\s+int\\s+objectCount)(?=[\\s\\S]*new\\s+Counter)'
                }
            ]
        };

        // Lesson 7: Constants (final keyword)
        const lesson7Id = varMod.lessons.find(l => l.order === 7)._id;
        const constantsLesson = {
            _id: lesson7Id,
            moduleId: moduleId,
            courseId: courseId,
            order: 7,
            type: 'lesson',
            title: 'Constants (final keyword)',
            duration: '25 min',
            language: 'java',
            isTerminal: false,
            fileName: 'Main.java',
            starterCode: `public class Main {\n    public static void main(String[] args) {\n\n        // Write your code here\n\n    }\n}`,
            content: [
                { type: 'label', value: 'VARIABLES' },
                { type: 'heading', value: 'Constants (final keyword)' },
                { type: 'duration', value: '25 min' },

                { type: 'section_heading', value: '1. What is a Constant?' },
                { type: 'rich_text', value: 'A <strong>constant</strong> is a variable whose value cannot be changed once it has been assigned. In Java, we create constants using the <code>final</code> keyword. Once a <code>final</code> variable is assigned a value, it becomes read-only.' },
                { type: 'code_block', language: 'java', value: 'final dataType CONSTANT_NAME = value;' },
                { type: 'rich_text', value: '<strong>Example:</strong>' },
                { type: 'code_block', language: 'java', value: 'final double PI = 3.14159;\n// PI = 3.14; ❌ Error: cannot assign a value to final variable PI' },

                { type: 'section_heading', value: '2. Naming Conventions: SCREAMING_SNAKE_CASE' },
                { type: 'rich_text', value: 'Professional Java developers use <strong>UPPERCASE</strong> with underscores for naming constants. This convention (SCREAMING_SNAKE_CASE) makes it immediately obvious to anyone reading the code that the value is immutable.' },
                { type: 'code_block', language: 'java', value: 'final int MAX_LOGIN_ATTEMPTS = 5;\nfinal String DEFAULT_LANGUAGE = "English";\nfinal double SALES_TAX = 0.08;' },

                { type: 'section_heading', value: '3. Pro-Level: Blank Final Variables' },
                { type: 'rich_text', value: 'A <strong>blank final</strong> is a final variable that is not initialized at the point of declaration. However, it <strong>must</strong> be initialized exactly once later in the code (e.g., in a constructor or a specific logic block).' },
                { type: 'code_block', language: 'java', value: 'public class Ticket {\n    final int TICKET_ID; // Blank final\n\n    public Ticket(int id) {\n        TICKET_ID = id; // Initialized in constructor\n    }\n}' },
                { type: 'rich_text', value: 'This is useful when the constant value is determined at runtime but should not change thereafter.' },

                { type: 'section_heading', value: '4. Critical Concept: Reference vs. State' },
                { type: 'rich_text', value: 'When you mark a <strong>Reference Type</strong> (like an Object or Array) as <code>final</code>, the <strong>reference</strong> (address) is constant, but the <strong>state</strong> (data inside) can still be changed.' },
                { type: 'code_block', language: 'java', value: 'final int[] NUMBERS = {1, 2, 3};\nNUMBERS[0] = 10; // ✅ Allowed: Modifying the data inside\n// NUMBERS = new int[]{4, 5}; ❌ Error: Cannot point to a new array' },
                { type: 'rich_text', value: '<blockquote><strong>Pro Tip:</strong> To make an object fully constant, the class itself must be designed to be <strong>Immutable</strong> (like <code>String</code>).</blockquote>' },

                { type: 'section_heading', value: '5. final Parameters' },
                { type: 'rich_text', value: 'Professional developers often mark method parameters as <code>final</code> to prevent accidental reassignment within the method body. This makes the code safer and easier to debug.' },
                { type: 'code_block', language: 'java', value: 'public void processPayment(final double amount) {\n    // amount = 50.0; ❌ Error: Cannot change a final parameter\n    System.out.println("Processing: " + amount);\n}' },

                { type: 'section_heading', value: '6. Performance & Optimization' },
                { type: 'rich_text', value: 'Using <code>final</code> is not just about safety; it also helps the <strong>Java Virtual Machine (JVM)</strong> optimize your code. Because the value is known to be constant, the JVM can perform "Method Inlining" and other optimizations to speed up execution.' },

                { type: 'section_heading', value: '7. Summary Table: final Usage' },
                { type: 'rich_text', value: `
<div class="overflow-x-auto my-4 border border-gray-100 rounded-md shadow-sm">
    <table class="min-w-full text-sm border-collapse">
        <thead>
            <tr class="bg-gray-50/80 border-b border-gray-200">
                <th class="px-6 py-3 text-left font-semibold text-gray-900 border-r border-gray-200">Context</th>
                <th class="px-6 py-3 text-left font-semibold text-gray-900">Effect</th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
            <tr><td class="px-6 py-3 border-r border-gray-200 font-bold bg-gray-50/30">Local Variable</td><td class="px-6 py-3">Value cannot be changed after first assignment.</td></tr>
            <tr><td class="px-6 py-3 border-r border-gray-200 font-bold bg-gray-50/30">Reference Type</td><td class="px-6 py-3">Cannot point to a different object, but object state can change.</td></tr>
            <tr><td class="px-6 py-3 border-r border-gray-200 font-bold bg-gray-50/30">Parameter</td><td class="px-6 py-3">Variable value protected from modification inside the method.</td></tr>
            <tr><td class="px-6 py-3 border-r border-gray-200 font-bold bg-gray-50/30">Performance</td><td class="px-6 py-3">Assists JVM in code optimization and safety checks.</td></tr>
        </tbody>
    </table>
</div>` },

                { type: 'section_heading', value: 'Instructions' },
                { 
                    type: 'checkpoint', 
                    index: 1, 
                    points: 5,
                    value: '<strong>Task 1: System Constants</strong><br/>Create three constants: <strong>APP_VERSION</strong> (double), <strong>ADMIN_NAME</strong> (String), and <strong>PORT_NUMBER</strong> (int). Print them.',
                    content: [
                        { type: 'text', value: 'Use SCREAMING_SNAKE_CASE for naming.' }
                    ]
                },
                { 
                    type: 'checkpoint', 
                    index: 2, 
                    points: 10,
                    value: '<strong>Task 2: Math & Business Rules</strong><br/>Create a constant <strong>DISCOUNT_RATE</strong>. Calculate the final price of an item costing 1000 and print it.',
                    content: [
                        { type: 'hint', value: 'Final Price = Price - (Price * DISCOUNT_RATE)' }
                    ]
                },
                { 
                    type: 'checkpoint', 
                    index: 3, 
                    points: 10,
                    value: '<strong>Task 3: Parameter Safety</strong><br/>Write a method <code>displayConfig</code> that takes a <strong>final String theme</strong> and prints "Theme: theme". Attempting to change "theme" should be impossible.',
                    content: [
                        { type: 'text', value: 'Call the method from main.' }
                    ]
                },
                { 
                    type: 'checkpoint', 
                    index: 4, 
                    points: 15,
                    value: '<strong>Task 4 (Pro): Reference Immutability</strong><br/>Create a <strong>final</strong> integer array with 3 values. Update the second value. Then correctly uncomment a line that would cause an error if you tried to point to a new array.',
                    content: [
                        { type: 'text', value: 'Example: NUMBERS[1] = 99;' }
                    ]
                }
            ],
            validationCriteria: [
                { 
                    index: 1, 
                    match: '(?=[\\s\\S]*[\\d]+\\.[\\d]+)(?=[\\s\\S]*[a-zA-Z]+)(?=[\\s\\S]*[\\d]+)',
                    matchCode: '(?=[\\s\\S]*final\\s+double\\s+APP_VERSION)(?=[\\s\\S]*final\\s+String\\s+ADMIN_NAME)(?=[\\s\\S]*final\\s+int\\s+PORT_NUMBER)'
                },
                { 
                    index: 2, 
                    match: '(?=[\\s\\S]*[\\d]+\\.[\\d]+)',
                    matchCode: '(?=[\\s\\S]*final\\s+double\\s+DISCOUNT_RATE)(?=[\\s\\S]*\\*)'
                },
                { 
                    index: 3, 
                    match: '(?=[\\s\\S]*Theme:)',
                    matchCode: '(?=[\\s\\S]*displayConfig[\\s\\S]*final\\s+String\\s+theme)'
                },
                { 
                    index: 4, 
                    match: '(?=[\\s\\S]*[\\d]+)',
                    matchCode: '(?=[\\s\\S]*final\\s+int\\[\\])(?=[\\s\\S]*\\[[\\d]+\\]\\s*=)'
                }
            ]
        };

        const lessons = [introLesson, dataTypesLesson, declaringVariablesLesson, initializingVariablesLesson, namingRulesLesson, variableScopeLesson, constantsLesson];

        for (const lesson of lessons) {
            await lessonsCol.updateOne(
                { _id: lesson._id },
                { $set: lesson },
                { upsert: true }
            );
        }
        console.log('✅ All 7 lessons in Variables module seeded successfully.');

        // Update Course syllabus titles
        const lessonUpdates = [
            { order: 3, title: "Declaring Variables in Java" },
            { order: 4, title: "Initializing Variables in Java" },
            { order: 5, title: "Variable Naming Rules" },
            { order: 6, title: "Variable Scope" },
            { order: 7, title: "Constants (final keyword)" }
        ];

        for (const update of lessonUpdates) {
            const lesson = varMod.lessons.find(l => l.order === update.order);
            if (lesson) {
                await coursesCol.updateOne(
                    { _id: courseId, "modules.lessons._id": lesson._id },
                    { $set: { "modules.$[m].lessons.$[l].title": update.title } },
                    { arrayFilters: [{ "m._id": moduleId }, { "l._id": lesson._id }] }
                );
            }
        }
        console.log('✅ Syllabus updated for all seven lessons.');

    } catch (error) {
        console.error('❌ Error seeding variables module:', error);
    } finally {
        await client.close();
    }
}

seedVariablesModule();

