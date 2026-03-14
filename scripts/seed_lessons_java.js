require('dotenv').config();
const { connect, getProgCollection, PROG_COLLECTIONS, close } = require('../src/config/mongo');
const { ObjectId } = require('mongodb');

// The image will be served as a static asset path from the frontend
const JVM_DIAGRAM_IMG = '/assets/java_jvm_diagram.png';

async function seed() {
    try {
        await connect();
        const coursesCol = await getProgCollection(PROG_COLLECTIONS.COURSES);
        const modulesCol = await getProgCollection(PROG_COLLECTIONS.MODULES);
        const lessonsCol = await getProgCollection(PROG_COLLECTIONS.LESSONS);

        await lessonsCol.deleteMany({});

        const javaCourse = await coursesCol.findOne({ slug: 'java' });
        if (!javaCourse) throw new Error('Java course not found — run seed_programming_syllabus.js first');

        const javaModules = await modulesCol.find({ courseId: javaCourse._id }).sort({ order: 1 }).toArray();
        const getModule = (title) => javaModules.find(m => m.title === title);

        const helloWorldMod = getModule('Hello World');
        const variablesMod = getModule('Variables');
        const oopMod = getModule('Object-Oriented Java');
        const condMod = getModule('Conditionals and Control Flow');
        const arraysMod = getModule('Arrays and ArrayLists');
        const loopsMod = getModule('Loops');
        const stringMod = getModule('String Methods');
        const accessMod = getModule('Access, Encapsulation, and Static Methods');
        const inhMod = getModule('Inheritance and Polymorphism');
        const debugMod = getModule('Debugging');
        const twoDmod = getModule('Two-Dimensional Arrays');

        const lessons = [

            // ═══════════════════════════════════════════════════
            // HELLO WORLD MODULE
            // ═══════════════════════════════════════════════════
            {
                _id: new ObjectId('69b2da46f98f988579f9b871'),
                moduleId: helloWorldMod._id, courseId: javaCourse._id,
                order: 1, type: 'lesson',
                title: 'Introduction to Java', duration: '3 min',
                language: 'java',
                fileName: 'HelloWorld.java',
                starterCode: `public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello World!");\n  }\n}`,
                content: [
                    { type: 'label', value: 'HELLO WORLD' },
                    { type: 'heading', value: 'Introduction to Java' },
                    { type: 'duration', value: '3 min' },
                    { type: 'text', value: 'Welcome to the world of Java programming!' },
                    { type: 'text', value: 'Programming languages enable humans to write instructions that a computer can perform. With precise instructions, computers coordinate applications and systems that run the modern world.' },
                    { type: 'text', value: 'Sun Microsystems released the Java programming language in 1995. Java is known for being simple, portable, secure, and robust. Though it was released over twenty years ago, Java remains one of the most popular programming languages today.' },
                    { type: 'text', value: 'One reason people love Java is the Java Virtual Machine, which ensures the same Java code can be run on different operating systems and platforms. Sun Microsystems\' slogan for Java was "write once, run everywhere".' },
                    { type: 'image', value: JVM_DIAGRAM_IMG, caption: 'Java Virtual Machine running Java on three different platforms' },
                    { type: 'text', value: 'Programming languages are composed of syntax, the specific instructions which Java understands. We write syntax in files to create programs, which are executed by the computer to perform the desired task.' },
                    { type: 'text', value: "Let's start with the universal greeting for a programming language. We'll explore the syntax in the next exercise." },
                    { type: 'section_heading', value: 'Instructions' },
                    { type: 'checkpoint', index: 1, points: 5, value: "You're looking at a computer program written in Java.\n\nRun the code in the text editor to see what is printed to the screen." },
                    { type: 'section_heading', value: 'Concept Review' },
                    { type: 'text', value: 'Want to quickly review some of the concepts you\'ve been learning? Take a look at this material\'s cheatsheet!' },
                    { type: 'section_heading', value: 'Community Support' },
                    { type: 'text', value: 'Still have questions? Get help from the community.' },
                ],
                validationCriteria: [
                    { index: 1, match: 'Hello World!' }
                ]
            },
            // order 2
            {
                _id: new ObjectId('69b2da46f98f988579f9b872'),
                moduleId: helloWorldMod._id, courseId: javaCourse._id,
                order: 2, type: 'lesson',
                title: 'Hello Java File!', duration: '7 min',
                language: 'java',
                fileName: 'HelloYou.java',
                starterCode: `public class HelloYou {\n  public static void main(String[] args) {\n    // Print your greeting here\n  }\n}`,
                content: [
                    { type: 'label', value: 'HELLO WORLD' },
                    { type: 'heading', value: 'Hello Java File!' },
                    { type: 'duration', value: '7 min' },
                    { type: 'text', value: 'Java runs on different platforms, but programmers write it the same way. Let\'s explore some rules for writing Java.' },
                    { type: 'text', value: 'In the last exercise, we saw the file HelloWorld.java. Java files have a .java extension. Some programs are one file, others are hundreds of files!' },
                    { type: 'text', value: 'Inside HelloWorld.java, we had a class:' },
                    { type: 'code_block', language: 'java', value: 'public class HelloWorld {\n  \n}' },
                    { type: 'text', value: 'The HelloWorld concept is: Hello World Printer. Other class concepts could be: Bicycle, or: Savings Account.' },
                    { type: 'text', value: 'We marked the domain of this concept using curly braces: {}. Syntax inside the curly braces is part of the class.' },
                    { type: 'text', value: 'Each file has one primary class named after the file. Our class name: HelloWorld and our file name: HelloWorld. Every word is capitalized.' },
                    { type: 'text', value: 'Inside the class we had a main() method which lists our program tasks:' },
                    { type: 'code_block', language: 'java', value: 'public static void main(String[] args) {\n\n}' },
                    { type: 'text', value: 'public, static, and void are syntax we\'ll learn about in future lessons. String[] args is a placeholder for information we want to pass into our program.' },
                    { type: 'text', value: 'Our program also displayed the text "Hello World" on the screen. This was accomplished using a print statement:' },
                    { type: 'code_block', language: 'java', value: 'System.out.println("Hello World");' },
                    { type: 'text', value: 'We\'ll learn more about print statements in the next exercise!' },
                    { type: 'section_heading', value: 'Instructions' },
                    { type: 'checkpoint', index: 1, points: 5, value: 'The text editor has a file, HelloYou.java, that contains a HelloYou class with a main() method.\n\nInside main(), add a statement which prints Hello someName!, with your name replacing someName. Make sure to end the statement with a semicolon.\n\nFor example, if your name were "Maria," the program would print Hello Maria!.' },
                    { type: 'hint', value: 'Use System.out.println() and put the text inside quotes. Don\'t forget the semicolon!' },
                    { type: 'section_heading', value: 'Concept Review' },
                    { type: 'text', value: 'Want to quickly review some of the concepts you\'ve been learning? Take a look at this material\'s cheatsheet!' },
                    { type: 'section_heading', value: 'Community Support' },
                    { type: 'text', value: 'Still have questions? Get help from the Codecademy community.' },
                ],
                validationCriteria: [
                    { index: 1, match: 'Hello ([A-Za-z ]+)!' }
                ]
            },
            // order 3
            {
                _id: new ObjectId('69b2da46f98f988579f9b873'),
                moduleId: helloWorldMod._id, courseId: javaCourse._id,
                order: 3, type: 'lesson',
                title: 'Print Statements', duration: '8 min',
                language: 'java',
                fileName: 'HideAndSeek.java',
                starterCode: `public class HideAndSeek {\n  public static void main(String[] args) {\n    System.out.println("Let's play hide and seek.");\n\n\n  }\n}`,
                content: [
                    { type: 'label', value: 'HELLO WORLD' },
                    { type: 'heading', value: 'Print Statements' },
                    { type: 'duration', value: '8 min' },
                    { type: 'text', value: "Let's take a closer look at this instruction from our previous program:" },
                    { type: 'code_block', language: 'java', value: 'System.out.println("Hello World");' },
                    { type: 'text', value: "Print statements output information to the screen (also referred to as the output terminal). Let’s break this line of code down a little more. Don’t worry if some of the terms here are new to you. We’ll dive into what all of these are in much more detail later on!" },
                    { type: 'list', value: [
                        "System is a built-in Java class that contains useful tools for our programs.",
                        "out is short for “output”.",
                        "println is short for “print line”."
                    ]},
                    { type: 'text', value: "We can use System.out.println() whenever we want the program to create a new line on the screen after outputting a value:" },
                    { type: 'code_block', language: 'java', value: 'System.out.println("Hello World");\nSystem.out.println("Today is a great day to code!");' },
                    { type: 'text', value: "After \"Hello World\" is printed, the output terminal creates a new line for the next statement to be outputted. This program will print each statement on a new line like so:" },
                    { type: 'code_block', language: 'java', value: 'Hello World\nToday is a great day to code!' },
                    { type: 'text', value: "We also can output information using System.out.print(). Notice that we’re using print(), not println(). Unlike System.out.println(), this type of print statement outputs everything on the same line. For example:" },
                    { type: 'code_block', language: 'java', value: 'System.out.print("Hello ");\nSystem.out.print("World");' },
                    { type: 'text', value: "The above code will have the following output:" },
                    { type: 'code_block', language: 'java', value: 'Hello World' },
                    { type: 'text', value: "In this example, if you were to use print() or println() again, the new text will print immediately after World on the same line. It’s important to remember where you left your program’s “cursor”. If you use println() the cursor is moved to the next line. If you use print() the cursor stays on the same line." },
                    { type: 'text', value: "Note: Going forward after this exercise, all exercises will use System.out.println() to output values. You will get to practice using System.out.print() statements in the Checkpoints below, however." },
                    { type: 'section_heading', value: 'Instructions' },
                    { 
                        type: 'checkpoint', 
                        index: 1, 
                        points: 5,
                        value: 'Inside <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">main()</code> and underneath the print statement <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">System.out.println("Let\'s play hide and seek.");</code>, output the following two statements using <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">System.out.print()</code>:',
                        content: [
                            {
                                type: 'list',
                                value: [
                                    '<code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">"Three..."</code>',
                                    '<code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">"Two..."</code>'
                                ]
                            },
                            { 
                                type: 'hint', 
                                value: [
                                    { type: 'rich_text', value: 'Be sure to use <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">System.out.print()</code>. Your code should look similar to the following example:' },
                                    { type: 'code_block', value: 'System.out.print("First statement");\nSystem.out.print("Second statement");' },
                                    { type: 'text', value: 'Make sure the text in your print statements matches the instructions exactly. Capitalization, punctuation, and spaces matter!' }
                                ]
                            }
                        ]
                    },
                    { 
                        type: 'checkpoint', 
                        index: 2, 
                        points: 5,
                        value: 'Underneath your previous statements, output the following two text values using <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">System.out.println()</code>:',
                        content: [
                            {
                                type: 'list',
                                value: [
                                    '<code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">"One..."</code>',
                                    '<code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">"Ready or not, here I come!"</code>'
                                ]
                            },
                            { 
                                type: 'hint', 
                                value: [
                                    { type: 'rich_text', value: 'This prompt asks you to use <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">System.out.println()</code> to output two statements.' },
                                    { type: 'text', value: 'Make sure the text in your print statements matches the instructions exactly. Capitalization, punctuation, and spaces matter!' }
                                ]
                            }
                        ]
                    },
                    { type: 'section_heading', value: 'Concept Review' },
                    { type: 'text', value: 'Want to quickly review some of the concepts you\'ve been learning? Take a look at this material\'s cheatsheet!' },
                    { type: 'section_heading', value: 'Community Support' },
                    { type: 'text', value: 'Still have questions? Get help from the Codecademy community.' },
                ],
                validationCriteria: [
                    { index: 1, match: 'Three\\.\\.\\.[\\s\\n]*Two\\.\\.\\.' },
                    { index: 2, match: 'One\\.\\.\\.[\\s\\S]*Ready or not, here I come!' }
                ]
            },
            // order 4
            {
                _id: new ObjectId('69b2da46f98f988579f9b874'),
                moduleId: helloWorldMod._id, courseId: javaCourse._id,
                order: 4, type: 'lesson',
                title: 'Commenting Code', duration: '5 min',
                language: 'java',
                fileName: 'Timeline.java',
                starterCode: `public class Timeline {\n  public static void main(String[] args) {\n    System.out.println("Hello Java!");\n    \n    System.out.println("You were born in 1995");\n    Sun Microsystems announced the release of Java in 1995\n    \n    System.out.println("You were created by James Gosling");\n    \n    James Gosling is a Canadian engineer who created Java while working at Sun Microsystems. His favorite number is the square root of 2!\n    \n    System.out.println("You are a fun language!");\n  }\n}`,
                content: [
                    { type: 'label', value: 'HELLO WORLD' },
                    { type: 'heading', value: 'Commenting Code' },
                    { type: 'duration', value: '5 min' },
                    { type: 'text', value: 'Writing code is an exciting process of instructing the computer to complete fantastic tasks.' },
                    { type: 'text', value: 'Code is also read by people, and we want our intentions to be clear to humans just like we want our instructions to be clear to the computer.' },
                    { type: 'rich_text', value: 'Fortunately, we’re not limited to writing syntax that performs a task. We can also write <span class="text-blue-600 underline">comments</span>, notes to human readers of our code. These comments are not executed, so there’s no need for valid syntax within a comment.' },
                    { type: 'rich_text', value: 'When comments are short we use the single-line syntax: <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">//</code>.' },
                    { type: 'code_block', value: '// calculate customer satisfaction rating' },
                    { type: 'rich_text', value: 'When comments are long we use the multi-line syntax: <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">/*</code> and <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">*/</code>.' },
                    { type: 'code_block', value: '/*\nWe chose to store information across multiple databases to\nminimize the possibility of data loss. We\'ll need to be careful\nto make sure it does not go out of sync!\n*/' },
                    { type: 'rich_text', value: 'Another type of commenting option is the Javadoc comment which is represented by <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">/**</code> and <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">*/</code>. Javadoc comments are used to create documentation for APIs (Application Programming Interfaces). When writing Javadoc comments, remember that they will eventually be used in the documentation that your users might read, so make sure to be especially thoughtful when writing these comments.' },
                    { type: 'rich_text', value: `Javadoc comments are typically written before the declaration of fields, <span class="text-blue-600 underline">methods</span>, and <span class="text-blue-600 underline">classes</span> (which we’ll cover later in this course):` },
                    { type: 'code_block', value: '/**\n* The following class accomplishes the following task...\n*/' },
                    { type: 'text', value: 'Here’s how a comment would look in a complete program:' },
                    { type: 'code_block', value: '/**\n* The following class shows what a comment would look like in a program.\n*/\npublic class CommentExample {\n  // I\'m a comment inside the class\n  public static void main(String[] args) {\n    // I\'m a comment inside a method\n    System.out.println("This program has comments!");\n  }\n}' },
                    { type: 'rich_text', value: 'Comments are different from printing to the screen, when we use <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">System.out.println()</code>. These comments <span class="font-bold">won\'t</span> show up in our terminal, they’re only for people who read our code in the text editor.' },
                    { type: 'section_heading', value: 'Instructions' },
                    { 
                        type: 'checkpoint', 
                        index: 1, 
                        points: 5,
                        value: 'The file <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">Timeline.java</code> has plain text information about Java.<br/><br/>Plain text facts aren\'t valid syntax. We\'ll use comments to avoid breaking the program.<br/><br/>Use the single-line comment syntax for the first fact.<br/><br/>Change this line into a comment:<br/><br/><code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">Sun Microsystems announced the release of Java in 1995</code>',
                        content: [
                            { 
                                type: 'hint', 
                                value: [
                                    { type: 'rich_text', value: 'We use the following syntax for a single-line comment: <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">//</code>.' },
                                    { type: 'rich_text', value: 'To change <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">A tale of sound and fury</code> into a comment, place <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">//</code> before the line:' },
                                    { type: 'code_block', value: '// A tale of sound and fury' }
                                ]
                            }
                        ]
                    },
                    { 
                        type: 'checkpoint', 
                        index: 2, 
                        points: 5,
                        value: 'Our program is still broken!<br/><br/>Use the <span class="font-bold">multi-line syntax</span> to make these lines into a <span class="font-bold">single</span> comment:',
                        content: [
                            {
                                type: 'code_block',
                                value: '    System.out.println("You were created by James Gosling");\n    \n    James Gosling is a Canadian engineer who created Java while\n    working at Sun Microsystems. His favorite number is the\n    square root of 2!'
                            },
                            { type: 'rich_text', value: 'You should still see <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">You are a fun language!</code> printed!' },
                            { 
                                type: 'hint', 
                                value: [
                                    { type: 'rich_text', value: 'Multi-line comments have an opening and closing syntax.' },
                                    { type: 'rich_text', value: 'Consider the text:' },
                                    { type: 'code_block', value: 'Life\'s but a walking shadow, a poor player That struts and frets his hour\nupon the stage And then is heard no more. It is a tale Told by an idiot,\nfull of sound and fury, Signifying nothing.' },
                                    { type: 'rich_text', value: 'We can make a comment from this text by surrounding it with <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">/*</code> and <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">*/</code>.' },
                                    { type: 'code_block', value: '/*\nLife\'s but a walking shadow, a poor player That struts and frets his hour\nupon the stage And then is heard no more. It is a tale Told by an idiot,\nfull of sound and fury, Signifying nothing.\n*/' }
                                ]
                            }
                        ]
                    },
                    { type: 'section_heading', value: 'Concept Review' },
                    { type: 'rich_text', value: 'Want to quickly review some of the concepts you\'ve been learning? Take a look at this material\'s <span class="text-blue-600 underline">cheatsheet</span>!' },
                    { type: 'section_heading', value: 'Community Support' },
                    { type: 'rich_text', value: 'Still have questions? Get help from the <span class="text-blue-600 underline">Codecademy community</span>.' },
                ],
                validationCriteria: [
                    { index: 1, match: 'Hello Java![\\s\\S]*You were born in 1995' },
                    { index: 2, match: '^Hello Java![\\s\\n\\r]+You were born in 1995[\\s\\n\\r]+You are a fun language![\\s\\n\\r]*$' }
                ]
            },
            {
                _id: new ObjectId('69b2da46f98f988579f9b875'),
                moduleId: helloWorldMod._id, courseId: javaCourse._id,
                order: 5, type: 'lesson',
                title: 'Semicolons and Whitespace', duration: '5 min',
                language: 'java',
                fileName: 'LanguageFacts.java',
                starterCode: `public class LanguageFacts {\n  public static void main(String[] args) {\n    // Press enter or return on your keyboard after each semicolon!\n    System.out.println("Java is a class-based language.")System.out.println("Java classes have a 'main' method.")System.out.println("Java statements end with a semicolon.")\n  }\n}`,
                content: [
                    { type: 'label', value: 'HELLO WORLD' },
                    { type: 'heading', value: 'Semicolons and Whitespace' },
                    { type: 'duration', value: '5 min' },
                    { type: 'rich_text', value: 'As we saw with <span class="text-blue-600 underline cursor-pointer">comments</span>, reading code is just as important as writing code.' },
                    { type: 'text', value: 'We should write code that is easy for other people to read. Those people can be co-workers, friends, or even yourself!' },
                    { type: 'rich_text', value: 'Java does not interpret <span class="italic">whitespace</span>, the areas of the code without syntax, but humans use whitespace to read code without difficulty.' },
                    { type: 'text', value: 'Functionally, these two code samples are identical:' },
                    { type: 'code_block', value: 'System.out.println("Java");System.out.println("Lava");System.out.println("Guava");' },
                    { type: 'code_block', value: 'System.out.println("Java");\n\nSystem.out.println("Lava");\n\nSystem.out.println("Guava");' },
                    { type: 'text', value: 'They will print the same text to the screen, but which would you prefer to read? Imagine if it was hundreds of instructions! Whitespace would be essential.' },
                    { type: 'rich_text', value: 'Java <span class="font-bold">does</span> interpret semicolons. Semicolons are used to mark the end of a <span class="italic text-gray-700">statement</span>, one line of code that performs a single task.' },
                    { type: 'rich_text', value: 'The only statements we’ve seen so far are <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">System.out.println("My message!");</code>.' },
                    { type: 'rich_text', value: 'Let’s contrast statements with the curly brace, <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">{}</code>. Curly braces mark the scope of our <span class="text-blue-600 underline cursor-pointer">classes</span> and <span class="text-blue-600 underline cursor-pointer">methods</span>. There are no semicolons at the end of a curly brace.' },
                    { type: 'section_heading', value: 'Instructions' },
                    { 
                        type: 'checkpoint', 
                        index: 1, 
                        points: 5,
                        value: 'The <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">LanguageFacts.java</code> file prints information about Java to the screen.<br/><br/>Unfortunately, the writer of the file has avoided using whitespace.<br/><br/>Make the file easier to read by adding a newline after each statement!',
                        content: [
                            { 
                                type: 'hint', 
                                value: [
                                    { type: 'rich_text', value: 'Enter a newline character by pressing <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">return</code> or <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">enter</code>.' },
                                    { type: 'text', value: 'You should see all the code after your cursor move down by one line.' },
                                    { 
                                        type: 'code_block', 
                                        value: '// Before entering a newline\nSystem.out.println("Feels");System.out.println("Cramped!");\n\n// Entering a newline after the first semicolon\nSystem.out.println("Feels");\nSystem.out.println("Cramped!");' 
                                    }
                                ]
                            }
                        ]
                    },
                    { 
                        type: 'checkpoint', 
                        index: 2, 
                        points: 5,
                        value: 'Inside <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">main()</code>, add a new statement printing how you feel about coding.<br/><br/>Start the message with: “Programming is… “.<br/><br/><span class="font-bold">Remember to place a semicolon at the end of the statement!</span>',
                        content: [
                            { 
                                type: 'hint', 
                                value: [
                                    { type: 'rich_text', value: 'For this checkpoint, you can use the <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">System.out.println()</code> function to print your message about coding. Don’t forget to end your statement with a semicolon ( <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-blue-600">;</code> ) to indicate the end of the statement.' }
                                ]
                            }
                        ]
                    },
                    { type: 'section_heading', value: 'Concept Review' },
                    { type: 'rich_text', value: 'Want to quickly review some of the concepts you\'ve been learning? Take a look at this material\'s <span class="text-blue-600 underline">cheatsheet</span>!' },
                    { type: 'section_heading', value: 'Community Support' },
                    { type: 'rich_text', value: 'Still have questions? Get help from the <span class="text-blue-600 underline border-blue-600">Codecademy community</span>.' },
                ],
                validationCriteria: [
                    { 
                        index: 1, 
                        match: 'Java is a class-based language\\.[\\s\\n\\r]+Java classes have a \'main\' method\\.[\\s\\n\\r]+Java statements end with a semicolon\\.',
                        matchCode: 'System\\.out\\.println\\("Java is a class-based language\\."\\);[\\s\\n\\r]+System\\.out\\.println\\("Java classes have a \'main\' method\\."\\);[\\s\\n\\r]+System\\.out\\.println\\("Java statements end with a semicolon\\."\\);'
                    },
                    { 
                        index: 2, 
                        match: 'Programming is[\\s\\S]*',
                        matchCode: 'System\\.out\\.println\\("Programming is[^"]*"\\);'
                    }
                ]
            },
            {
                _id: new ObjectId('69b2da46f98f988579f9b876'),
                moduleId: helloWorldMod._id, courseId: javaCourse._id,
                order: 6, type: 'lesson',
                title: 'Compilation: Catching Errors', duration: '8 min',
                language: 'java',
                isTerminal: true,
                fileName: 'Compiling.java',
                starterCode: `public class Compiling {\n  public static void main(String[] args) {\n\n    System.out.println("Java is a class-based language.");\n    System.out.println("Java classes have a 'main' method.");\n    System.out.println("Java statements end with a semicolon.")\n\n    System.out.println("Programming is... fun!");\n\n  }\n}`,
                content: [
                    { type: 'label', value: 'HELLO WORLD' },
                    { type: 'heading', value: 'Compilation: Catching Errors' },
                    { type: 'duration', value: '8 min' },
                    { 
                        type: 'rich_text', 
                        value: 'Java is a <span class="italic">compiled</span> programming language, meaning the code we write in a <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">.java</code> file is transformed into byte code by a <span class="text-blue-600 underline cursor-pointer">compiler</span> before it is executed by the Java Virtual Machine on your computer.' 
                    },
                    { type: 'text', value: 'A compiler is a program that translates human-friendly programming languages into other programming languages that computers can execute.' },
                    { type: 'section_heading', value: 'Steps of Java Compilation' },
                    { 
                        type: 'rich_text', 
                        value: 'Previous exercises have automatically compiled and run the <span class="text-blue-600 underline cursor-pointer">files</span> for you. Off-platform development environments can also compile and run files for you, but it’s important to understand this aspect of Java development so we’ll do it ourselves.' 
                    },
                    { type: 'image', value: '/assets/catching.png', alt: 'Steps of Java Compilation' },
                    { type: 'text', value: 'The compiling process catches mistakes before the computer runs our code.' },
                    { type: 'text', value: 'The Java compiler runs a series of checks while it transforms the code. Code that does not pass these checks will not be compiled.' },
                    { 
                        type: 'rich_text', 
                        value: 'This exercise will use an interactive terminal. Codecademy has a <span class="text-blue-600 underline cursor-pointer">lesson on the command line</span> if you’d like to learn more.' 
                    },
                    { 
                        type: 'rich_text', 
                        value: 'For example, with a file called <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">Plankton.java</code>, we could compile it with the terminal command:' 
                    },
                    { type: 'code_block', value: 'javac Plankton.java' },
                    { 
                        type: 'rich_text', 
                        value: 'A successful compilation produces a <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">.class</code> file: <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">Plankton.class</code>, that we execute with the terminal command:' 
                    },
                    { type: 'code_block', value: 'java Plankton' },
                    { 
                        type: 'rich_text', 
                        value: 'An unsuccessful compilation produces a list of <span class="text-blue-600 underline cursor-pointer">errors</span>. No <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">.class</code> file is made until the errors are corrected and the compile command is run again.' 
                    },
                    { type: 'section_heading', value: 'Instructions' },
                    { 
                        type: 'checkpoint', 
                        index: 1, 
                        points: 5,
                        value: 'Let’s practice compiling and executing a file by entering commands in the terminal!<br/><br/>Our text editor contains a broken program so we can see how compilers help us catch mistakes. <span class="font-bold">Don’t make any corrections!</span><br/><br/>In the terminal, type this command: <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">javac Compiling.java</code> and press <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">enter</code> or <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">return</code>. You will see an error message but don’t worry, we will resolve it in the next step.<br/><br/>Click the <code class="bg-gray-100 border border-gray-300 rounded px-1 text-[11px] font-semibold">Check Work</code> button to check your work and move on to the next checkpoint.',
                        content: [
                            { 
                                type: 'hint', 
                                value: [
                                    { type: 'text', value: 'Running commands in the terminal is a little different from how we’ve executed code so far.' },
                                    { type: 'text', value: 'You’ll need to click into the terminal and type in the command.' },
                                    { type: 'rich_text', value: 'Press <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">enter</code> or <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">return</code> when you’ve typed the full command.' }
                                ]
                            }
                        ]
                    },
                    { 
                        type: 'checkpoint', 
                        index: 2, 
                        points: 5,
                        value: 'Do you see the error?<br/><br/>The compiler is telling us one of the print statements is missing a semicolon.<br/><br/>In the terminal, type <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">ls</code> and press <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">return</code> or <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">enter</code>.<br/><br/><code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">ls</code> is short for "list" and this command lists all the available files.<br/><br/>There is only one file: <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">Compiling.java</code>, we did not successfully compile the file because of the error.<br/><br/>Click the <code class="bg-gray-100 border border-gray-300 rounded px-1 text-[11px] font-semibold">Check Work</code> button to move on to the next checkpoint.',
                        content: [
                            { 
                                type: 'hint', 
                                value: [
                                    { type: 'rich_text', value: 'Note that the <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">ls</code> command uses the letter "l" and the letter "s", not the numeral "1". If you type this command incorrectly, you will see a <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700 text-red-500">command not found</code> error message.' },
                                    { type: 'rich_text', value: 'Press the <code class="bg-gray-100 border border-gray-300 rounded px-1 text-[11px] font-semibold">Check Work</code> button after you correctly type the command to progress through this checkpoint.' }
                                ]
                            }
                        ]
                    },
                    { 
                        type: 'checkpoint', 
                        index: 3, 
                        points: 5,
                        value: 'Add the missing semicolon in the text editor, then click the <code class="bg-gray-100 border border-gray-300 rounded px-1 text-[11px] font-semibold">Check Work</code> button.<br/><br/>We’ll compile and execute this file in the next exercise!',
                        content: [
                            { 
                                type: 'hint', 
                                value: [
                                    { type: 'text', value: 'The error message will tell you which line is missing a semicolon.' }
                                ]
                            }
                        ]
                    }
                ],
                validationCriteria: [] // Handled by terminal simulation logic in frontend
            },
            {
                _id: new ObjectId('69b2da46f98f988579f9b877'),
                moduleId: helloWorldMod._id, courseId: javaCourse._id,
                order: 7, type: 'lesson',
                title: 'Compilation: Creating Executables', duration: '7 min',
                language: 'java',
                isTerminal: true,
                fileName: 'Compiling.java',
                starterCode: `public class Compiling {\n  public static void main(String[] args) {\n    \n    System.out.println("Java is a class-based language.");\n    System.out.println("Java classes have a 'main' method.");\n    System.out.println("Java statements end with a semicolon.");\n\n    System.out.println("Programming is... fun!");\n    \n  }\n}`,
                content: [
                    { type: 'label', value: 'HELLO WORLD' },
                    { type: 'heading', value: 'Compilation: Creating Executables' },
                    { type: 'duration', value: '7 min' },
                    { 
                        type: 'rich_text', 
                        value: 'Compilation helped us catch an error. Now that we’ve corrected the file, let’s walk through a successful compilation.' 
                    },
                    { 
                        type: 'rich_text', 
                        value: 'As a reminder, we can compile a <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">.java</code> file from the terminal with the command:' 
                    },
                    { type: 'code_block', value: 'javac Whales.java' },
                    { 
                        type: 'rich_text', 
                        value: 'If the file compiles successfully, this command produces an <span class="italic">executable</span> class: <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">FileName.class</code>. <span class="italic">Executable</span> means we can run this program from the terminal.' 
                    },
                    { 
                        type: 'rich_text', 
                        value: 'We run the executable with the command:' 
                    },
                    { type: 'code_block', value: 'java Whales' },
                    { type: 'text', value: 'Note that we leave off the .class part of the filename.' },
                    { type: 'text', value: 'Here’s a full compilation cycle as an example:' },
                    { 
                        type: 'code_block', 
                        language: 'java', 
                        value: '// within the file: Welcome.java\npublic class Welcome {\n  public static void main(String[] args) {\n    System.out.println("Welcome to Codecademy\'s Java course!");\n  }\n}' 
                    },
                    { type: 'text', value: 'We have one file: Welcome.java. We compile with the command:' },
                    { type: 'code_block', value: 'javac Welcome.java' },
                    { 
                        type: 'rich_text', 
                        value: 'The terminal shows no <span class="text-blue-600 underline cursor-pointer">errors</span>, which indicates a successful compilation.' 
                    },
                    { type: 'text', value: 'We now have two files:' },
                    { 
                        type: 'rich_text', 
                        value: '1. <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">Welcome.java</code>, our original file with Java syntax.<br/>2. <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">Welcome.class</code>, our compiled file with Java bytecode, ready to be executed by the Java Virtual Machine.' 
                    },
                    { type: 'text', value: 'We can execute the compiled class with the command:' },
                    { type: 'code_block', value: 'java Welcome' },
                    { type: 'text', value: 'The following is printed to the screen:' },
                    { type: 'code_block', value: "Welcome to Codecademy's Java course!" },
                    { type: 'section_heading', value: 'Instructions' },
                    { 
                        type: 'checkpoint', 
                        index: 1, 
                        points: 5,
                        value: 'Let’s compile and execute our program!<br/><br/>Run the <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">ls</code> command in the terminal to see the uncompiled <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">.java</code> file.<br/><br/>Press the <code class="bg-gray-100 border border-gray-300 rounded px-1 text-[11px] font-semibold">Check Work</code> button after you finish each checkpoint.',
                        content: [
                            { 
                                type: 'hint', 
                                value: [
                                    { type: 'rich_text', value: 'The <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">l</code> in <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">ls</code> is the letter l, not the number 1.' },
                                    { 
                                        type: 'rich_text', 
                                        value: 'After you type <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">ls</code> in the terminal and press enter, it should look like:' 
                                    },
                                    { type: 'code_block', value: '$ ls\nCompiling.java' },
                                    { type: 'rich_text', value: 'That means there’s currently a file named <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">Compiling.java</code> inside the folder.' }
                                ]
                            }
                        ]
                    },
                    { 
                        type: 'checkpoint', 
                        index: 2, 
                        points: 5,
                        value: 'Compile the file from the terminal and then press the <code class="bg-gray-100 border border-gray-300 rounded px-1 text-[11px] font-semibold">Check Work</code> button.',
                        content: [
                            { 
                                type: 'hint', 
                                value: [
                                    { type: 'text', value: 'We compile files with the command:' },
                                    { type: 'code_block', value: 'javac FileName.java' },
                                    { type: 'rich_text', value: 'If I wanted to compile a file named <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">Dog.java</code>, I would run:' },
                                    { type: 'code_block', value: 'javac Dog.java' },
                                    { type: 'rich_text', value: 'The file name here is <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">Compiling.java</code>.' }
                                ]
                            }
                        ]
                    },
                    { 
                        type: 'checkpoint', 
                        index: 3, 
                        points: 5,
                        value: 'Enter <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">ls</code> again to see the new <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200">.class</code> file.<br/><br/>Run the executable file from the terminal and then press the <code class="bg-gray-100 border border-gray-300 rounded px-1 text-[11px] font-semibold">Check Work</code> button.',
                        content: [
                            { 
                                type: 'hint', 
                                value: [
                                    { 
                                        type: 'rich_text', 
                                        value: 'We can run Java files from the terminal by using <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">java</code> and the name of the executable class.' 
                                    },
                                    { 
                                        type: 'rich_text', 
                                        value: 'For example, if I wanted to run <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">Dog.class</code>, I would enter <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">java Dog</code>.' 
                                    }
                                ]
                            }
                        ]
                    },
                    { type: 'section_heading', value: 'Concept Review' },
                    { type: 'rich_text', value: 'Want to quickly review some of the concepts you\'ve been learning? Take a look at this material\'s <span class="text-blue-600 underline">cheatsheet</span>!' },
                    { type: 'section_heading', value: 'Community Support' },
                    { type: 'rich_text', value: 'Still have questions? Get help from the <span class="text-blue-600 underline border-blue-600">Codecademy community</span>.' },
                ],
                validationCriteria: [] // Terminal logic handled in LessonPage.jsx
            },
            {
                _id: new ObjectId('69b2da46f98f988579f9b878'),
                moduleId: helloWorldMod._id, courseId: javaCourse._id,
                order: 8, type: 'lesson',
                title: 'Java Review: Putting It All Together', duration: '9 min',
                language: 'java',
                fileName: 'Review.java',
                starterCode: '', // Empty Review.java
                content: [
                    { type: 'label', value: 'HELLO WORLD' },
                    { type: 'heading', value: 'Java Review: Putting It All Together' },
                    { type: 'duration', value: '9 min' },
                    { type: 'text', value: 'In this lesson, we’ve started writing our first programs in Java.' },
                    { type: 'text', value: 'We’ve also learned rules and guidelines for how to write Java programs:' },
                    { 
                        type: 'rich_text', 
                        value: '<ul><li>Java programs have at least one class and one <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">main()</code> method.<ul><li>Each class represents one real-world idea.</li><li>The <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">main()</code> method runs the tasks of the program.</li></ul></li><li>Java <span class="text-blue-600 underline cursor-pointer">comments</span> add helpful context to human readers.</li><li>Java has whitespace, curly braces, and semicolons.<ul><li>Whitespace is for humans to read code easily.</li><li>Curly braces mark the scope of a class and method.</li><li>Semicolons mark the end of a statement.</li></ul></li><li>Java is a compiled language.<ul><li>Compiling catches mistakes in our code.</li><li>Compilers transform code into an executable class.</li></ul></li></ul>' 
                    },
                    { type: 'section_heading', value: 'Instructions' },
                    { 
                        type: 'checkpoint', 
                        index: 1, 
                        points: 10,
                        value: 'The text editor holds an empty file named <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">Review.java</code>. Fill it in!<br/><br/>Define a <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">public class</code> named <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">Review</code>.<br/><br/>Use opening and closing curly braces for the scope of the class.<br/><br/><span class="font-bold text-gray-800">Remember, no semicolons for classes or methods!</span>',
                        content: [
                            { 
                                type: 'hint', 
                                value: [
                                    { type: 'text', value: 'We define a class in Java like so:' },
                                    { type: 'code_block', value: 'public class MyClass {\n  // class code goes here\n}' }
                                ]
                            }
                        ]
                    },
                    { 
                        type: 'checkpoint', 
                        index: 2, 
                        points: 10,
                        value: 'This code produces an error because Java programs need a <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">main()</code> method.<br/><br/>Define the <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">main()</code> method within the curly braces of the <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">Review</code> class.',
                        content: [
                            { 
                                type: 'hint', 
                                value: [
                                    { type: 'rich_text', value: 'Every Java program has one <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">main()</code> method with the following signature:' },
                                    { type: 'code_block', value: 'public static void main(String[] args) {\n  // method code goes here\n}' }
                                ]
                            }
                        ]
                    },
                    { 
                        type: 'checkpoint', 
                        index: 3, 
                        points: 10,
                        value: 'Inside of the curly braces for the <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">main()</code> method, write <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">The main method executes the tasks of the class</code> as a single-line comment.',
                        content: [
                            { 
                                type: 'hint', 
                                value: [
                                    { type: 'text', value: 'We create a single-line comment like so:' },
                                    { type: 'code_block', value: '// Just a brief comment' }
                                ]
                            }
                        ]
                    },
                    { 
                        type: 'checkpoint', 
                        index: 4, 
                        points: 10,
                        value: 'Below the comment, write a statement that prints the following: <code class="bg-[#f3f4f6] px-1.5 py-0.5 rounded text-[12.5px] font-mono border border-gray-200 text-gray-700">My first Java program from scratch!</code>.',
                        content: [
                            { 
                                type: 'hint', 
                                value: [
                                    { type: 'text', value: 'We can print a statement with the following syntax:' },
                                    { type: 'code_block', value: 'System.out.println("Blah blah blah");' }
                                ]
                            }
                        ]
                    },
                    { type: 'section_heading', value: 'Concept Review' },
                    { type: 'rich_text', value: 'Want to quickly review some of the concepts you\'ve been learning? Take a look at this material\'s <span class="text-blue-600 underline">cheatsheet</span>!' },
                    { type: 'section_heading', value: 'Community Support' },
                    { type: 'rich_text', value: 'Still have questions? Get help from the <span class="text-blue-600 underline border-blue-600">Codecademy community</span>.' },
                ],
                validationCriteria: [
                    { 
                        index: 1, 
                        match: '', // Placeholder for output
                        matchCode: 'public[\\s\\n\\r]+class[\\s\\n\\r]+Review[\\s\\n\\r]*\\{' 
                    },
                    { 
                        index: 2, 
                        match: '', 
                        matchCode: 'public[\\s\\n\\r]+static[\\s\\n\\r]+void[\\s\\n\\r]+main[\\s\\n\\r]*\\([\\s\\n\\r]*String\\[\\][\\s\\n\\r]+args[\\s\\n\\r]*\\)' 
                    },
                    { 
                        index: 3, 
                        match: '', 
                        matchCode: '//[\\s\\n\\r]*The[\\s]+main[\\s]+method[\\s]+executes[\\s]+the[\\s]+tasks[\\s]+of[\\s]+the[\\s]+class' 
                    },
                    { 
                        index: 4, 
                        match: 'My first Java program from scratch!', 
                        matchCode: 'System\\.out\\.println\\("My first Java program from scratch!"\\);' 
                    }
                ]
            },

            // ═══════════════════════════════════════════════════
            // VARIABLES MODULE
            // ═══════════════════════════════════════════════════
            {
                _id: new ObjectId('69b2da46f98f988579f9b880'),
                moduleId: variablesMod._id, courseId: javaCourse._id,
                order: 1, type: 'lesson',
                title: 'Learn Java: Variables', duration: '8 min',
                language: 'java',
                starterCode: `public class Variables {\n  public static void main(String[] args) {\n    int age = 25;\n    String name = "Alice";\n    double gpa = 3.9;\n    boolean isStudent = true;\n    System.out.println(name + " is " + age + " years old.");\n  }\n}`,
                content: [
                    { type: 'label', value: 'VARIABLES' },
                    { type: 'heading', value: 'Learn Java: Variables' },
                    { type: 'duration', value: '8 min' },
                    { type: 'text', value: 'A variable is a named location in memory that stores a value. In Java, every variable must be declared with a data type.' },
                    { type: 'text', value: 'Java is a statically typed language, which means you must declare the type of a variable before using it. Common data types include:' },
                    { type: 'checkpoint', index: 1, value: 'int — Stores whole numbers (e.g., 42, -7)' },
                    { type: 'checkpoint', index: 2, value: 'double — Stores decimal numbers (e.g., 3.14)' },
                    { type: 'checkpoint', index: 3, value: 'String — Stores text (e.g., "Hello")' },
                    { type: 'checkpoint', index: 4, value: 'boolean — Stores true or false' },
                    { type: 'code_block', language: 'java', value: 'int myAge = 25;\nString myName = "Alice";\ndouble myGpa = 3.9;\nboolean isEnrolled = true;' },
                    { type: 'text', value: "In the example above, we declare four variables with different data types. The variable name comes after the type, followed by an = sign and the variable's value." },
                    { type: 'section_heading', value: 'Instructions' },
                    { type: 'checkpoint', index: 1, value: 'Declare an int variable called score and set it to 100.' },
                    { type: 'checkpoint', index: 2, value: 'Declare a String variable called playerName and set it to your name.' },
                    { type: 'checkpoint', index: 3, value: 'Print both variables using System.out.println().' },
                ],
                validationCriteria: [
                    { index: 1, match: '100' },
                    { index: 2, match: '[a-zA-Z]+' },
                    { index: 3, match: '100' }
                ]
            },

            // ═══════════════════════════════════════════════════
            // OOP MODULE — Lesson 1
            // ═══════════════════════════════════════════════════
            {
                _id: new ObjectId('69b2da46f98f988579f9b881'),
                moduleId: oopMod._id, courseId: javaCourse._id,
                order: 2, type: 'lesson',
                title: 'Java: Introduction to Classes', duration: '10 min',
                language: 'java',
                starterCode: `public class Car {\n  // Instance variables\n  String color;\n  int speed;\n\n  // Constructor\n  public Car(String color, int speed) {\n    this.color = color;\n    this.speed = speed;\n  }\n\n  // Method\n  public void honk() {\n    System.out.println("Beep beep!");\n  }\n\n  public static void main(String[] args) {\n    Car myCar = new Car("Red", 100);\n    myCar.honk();\n    System.out.println("My car is " + myCar.color);\n  }\n}`,
                content: [
                    { type: 'label', value: 'OBJECT-ORIENTED JAVA' },
                    { type: 'heading', value: 'Java: Introduction to Classes' },
                    { type: 'duration', value: '10 min' },
                    { type: 'text', value: 'In object-oriented programming, a class is a blueprint from which individual objects are created. A class defines the properties (instance variables) and behaviors (methods) that its objects will have.' },
                    { type: 'text', value: 'Think of a class like a cookie cutter and objects like the cookies. The cookie cutter defines the shape; the cookies are the actual items created from that mold.' },
                    { type: 'code_block', language: 'java', value: 'public class Dog {\n  String name;\n  String breed;\n\n  public Dog(String name, String breed) {\n    this.name = name;\n    this.breed = breed;\n  }\n\n  public void bark() {\n    System.out.println(name + " says: Woof!");\n  }\n}' },
                    { type: 'section_heading', value: 'Instructions' },
                    { type: 'checkpoint', index: 1, value: 'Create a class called Bicycle with instance variables color and gears.' },
                    { type: 'checkpoint', index: 2, value: 'Add a constructor that sets these variables.' },
                    { type: 'checkpoint', index: 3, value: 'Add a method called ride() that prints "Riding the [color] bicycle!".' },
                    { type: 'checkpoint', index: 4, value: 'In the main method, create a Bicycle object and call ride().' },
                ],
                validationCriteria: [
                    { index: 1, match: 'Riding the [a-zA-Z]+ bicycle!' },
                    { index: 2, match: 'Riding the [a-zA-Z]+ bicycle!' },
                    { index: 3, match: 'Riding the [a-zA-Z]+ bicycle!' },
                    { index: 4, match: 'Riding the [a-zA-Z]+ bicycle!' }
                ]
            },

            // ═══════════════════════════════════════════════════
            // LOOPS — Lesson 1
            // ═══════════════════════════════════════════════════
            {
                _id: new ObjectId('69b2da46f98f988579f9b882'),
                moduleId: loopsMod._id, courseId: javaCourse._id,
                order: 1, type: 'lesson',
                title: 'Learn Java: Loops', duration: '8 min',
                language: 'java',
                starterCode: `public class Loops {\n  public static void main(String[] args) {\n    // For loop\n    for (int i = 1; i <= 5; i++) {\n      System.out.println("Count: " + i);\n    }\n\n    // While loop\n    int count = 0;\n    while (count < 3) {\n      System.out.println("While: " + count);\n      count++;\n    }\n  }\n}`,
                content: [
                    { type: 'label', value: 'LOOPS' },
                    { type: 'heading', value: 'Learn Java: Loops' },
                    { type: 'duration', value: '8 min' },
                    { type: 'text', value: 'A loop is a programming construct that repeats a block of code until a condition is met. Java has three types of loops: for, while, and do-while.' },
                    { type: 'text', value: 'The for loop is used when you know exactly how many times you want to repeat a block. The while loop is used when you want to repeat a block as long as a condition is true.' },
                    { type: 'code_block', language: 'java', value: '// For loop: counts 1 to 10\nfor (int i = 1; i <= 10; i++) {\n  System.out.println(i);\n}\n\n// While loop: counts down from 5\nint countdown = 5;\nwhile (countdown > 0) {\n  System.out.println(countdown);\n  countdown--;\n}' },
                    { type: 'section_heading', value: 'Instructions' },
                    { type: 'checkpoint', index: 1, value: 'Write a for loop that prints the numbers 1 through 10.' },
                    { type: 'checkpoint', index: 2, value: 'Write a while loop that prints even numbers from 2 to 20.' },
                ],
                validationCriteria: [
                    { index: 1, match: '1[\\s\\S]*2[\\s\\S]*3[\\s\\S]*4[\\s\\S]*5[\\s\\S]*6[\\s\\S]*7[\\s\\S]*8[\\s\\S]*9[\\s\\S]*10' },
                    { index: 2, match: '2[\\s\\S]*4[\\s\\S]*6[\\s\\S]*8[\\s\\S]*10[\\s\\S]*12[\\s\\S]*14[\\s\\S]*16[\\s\\S]*18[\\s\\S]*20' }
                ]
            },
        ];

        await lessonsCol.insertMany(lessons);

        console.log(`✅ Java lessons seeded: ${lessons.length} lessons`);
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await close();
    }
}

seed();
