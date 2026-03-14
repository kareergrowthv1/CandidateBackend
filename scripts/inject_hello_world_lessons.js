require('dotenv').config();
const { connect, getProgCollection, PROG_COLLECTIONS, close } = require('../src/config/mongo');
const { ObjectId } = require('mongodb');

const JVM_DIAGRAM_IMG = '/assets/java_jvm_diagram.png';

async function inject() {
    try {
        await connect();
        const col = await getProgCollection(PROG_COLLECTIONS.COURSES);

        // Get the Java course to find the Hello World module _id
        const javaCourse = await col.findOne({ slug: 'java' });
        if (!javaCourse) throw new Error('Java course not found');

        const helloWorldMod = (javaCourse.modules || []).find(m => m.title === 'Hello World');
        if (!helloWorldMod) throw new Error('Hello World module not found');

        const modId = helloWorldMod._id;
        const courseId = javaCourse._id;

        const lessons = [
            {
                _id: new ObjectId('69b2da46f98f988579f9b871'), moduleId: modId, courseId,
                order: 1, type: 'lesson', title: 'Introduction to Java', duration: '3 min', language: 'java',
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
                    { type: 'checkpoint', index: 1, value: "You're looking at a computer program written in Java.\n\nRun the code in the text editor to see what is printed to the screen." },
                    { type: 'section_heading', value: 'Concept Review' },
                    { type: 'text', value: 'Want to quickly review some of the concepts you\'ve been learning? Take a look at this material\'s cheatsheet!' },
                    { type: 'section_heading', value: 'Community Support' },
                    { type: 'text', value: 'Still have questions? Get help from the community.' },
                ]
            },
            {
                _id: new ObjectId('69b2da46f98f988579f9b872'), moduleId: modId, courseId,
                order: 2, type: 'lesson', title: 'Hello Java File!', duration: '7 min', language: 'java',
                starterCode: `public class HelloYou {\n  public static void main(String[] args) {\n    // Print your greeting here\n  }\n}`,
                content: [
                    { type: 'label', value: 'HELLO WORLD' },
                    { type: 'heading', value: 'Hello Java File!' },
                    { type: 'duration', value: '7 min' },
                    { type: 'text', value: "Java runs on different platforms, but programmers write it the same way. Let's explore some rules for writing Java." },
                    { type: 'text', value: 'In the last exercise, we saw the file HelloWorld.java. Java files have a .java extension. Some programs are one file, others are hundreds of files!' },
                    { type: 'text', value: 'Inside HelloWorld.java, we had a class:' },
                    { type: 'code_block', language: 'java', value: 'public class HelloWorld {\n  \n}' },
                    { type: 'text', value: "We'll talk about classes more in the future, but for now think of them as a single concept. The HelloWorld concept is: Hello World Printer." },
                    { type: 'text', value: 'Each file has one primary class named after the file. Every word is capitalized.' },
                    { type: 'text', value: 'Inside the class we had a main() method which lists our program tasks:' },
                    { type: 'code_block', language: 'java', value: 'public static void main(String[] args) {\n\n}' },
                    { type: 'text', value: "public, static, and void are syntax we'll learn about in future lessons. String[] args is a placeholder for program input." },
                    { type: 'text', value: 'Our program displayed the text "Hello World" on the screen using a print statement:' },
                    { type: 'code_block', language: 'java', value: 'System.out.println("Hello World");' },
                    { type: 'text', value: "We'll learn more about print statements in the next exercise!" },
                    { type: 'section_heading', value: 'Instructions' },
                    { type: 'checkpoint', index: 1, value: 'The text editor has a file, HelloYou.java, that contains a HelloYou class with a main() method.\n\nInside main(), add a statement which prints Hello someName!, with your name replacing someName. Make sure to end the statement with a semicolon.\n\nFor example, if your name were "Maria," the program would print Hello Maria!.' },
                    { type: 'hint', value: "Use System.out.println() and put the text inside quotes. Don't forget the semicolon!" },
                    { type: 'section_heading', value: 'Community Support' },
                    { type: 'text', value: 'Still have questions? Get help from the Codecademy community.' },
                ]
            },
            {
                _id: new ObjectId('69b2da46f98f988579f9b873'), moduleId: modId, courseId,
                order: 3, type: 'lesson', title: 'Print Statements', duration: '8 min', language: 'java',
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
                    { type: 'checkpoint', index: 1, value: "Inside main() and underneath the print statement System.out.println(\"Let's play hide and seek.\");, output the following two statements using System.out.print():",
                        content: [
                            { type: 'list', value: ['"Three..."', '"Two..."'] },
                            { type: 'hint', value: [
                                { type: 'text', value: "Be sure to use System.out.print(). Your code should look similar to the following example:" },
                                { type: 'code_block', language: 'java', value: 'System.out.print("First statement");\nSystem.out.print("Second statement");' },
                                { type: 'text', value: "Make sure the text in your print statements matches the instructions exactly. Capitalization, punctuation, and spaces matter!" }
                            ]}
                        ]
                    },
                    { type: 'checkpoint', index: 2, value: "Underneath your previous statements, output the following two text values using System.out.println():",
                        content: [
                            { type: 'list', value: ['"One..."', '"Ready or not, here I come!"'] },
                            { type: 'hint', value: [
                                { type: 'text', value: "This prompt asks you to use System.out.println() to output two statements." },
                                { type: 'text', value: "Make sure the text in your print statements matches the instructions exactly. Capitalization, punctuation, and spaces matter!" }
                            ]}
                        ]
                    },
                    { type: 'section_heading', value: 'Concept Review' },
                    { type: 'text', value: "Want to quickly review some of the concepts you’ve been learning? Take a look at this material's cheatsheet!" },
                    { type: 'section_heading', value: 'Community Support' },
                    { type: 'text', value: 'Still have questions? Get help from the Codecademy community.' },
                ],
                validationCriteria: [
                    { index: 1, match: 'Three\\.\\.\\.Two\\.\\.\\.' },
                    { index: 2, match: 'One\\.\\.\\.\\s*Ready or not, here I come!' }
                ]
            },
            {
                _id: new ObjectId('69b2da46f98f988579f9b874'), moduleId: modId, courseId,
                order: 4, type: 'lesson', title: 'Commenting Code', duration: '5 min', language: 'java',
                starterCode: `public class Timeline {\n  public static void main(String[] args) {\n    System.out.println("Hello Java!");\n    \n    System.out.println("You were born in 1995");\n\n    Sun Microsystems announced the release of Java in 1995\n    \n    System.out.println("You were created by James Gosling");\n    \n    James Gosling is a Canadian engineer who created Java while\n    working at Sun Microsystems. His favorite number is the\n    square root of 2!\n\n    System.out.println("You are a fun language!");\n  }\n}`,
                content: [
                    { type: 'label', value: 'HELLO WORLD' },
                    { type: 'heading', value: 'Commenting Code' },
                    { type: 'duration', value: '5 min' },
                    { type: 'text', value: "Writing code is an exciting process of instructing the computer to complete fantastic tasks." },
                    { type: 'text', value: "Code is also read by people, and we want our intentions to be clear to humans just like we want our instructions to be clear to the computer." },
                    { type: 'text', value: "Fortunately, we’re not limited to writing syntax that performs a task. We can also write comments, notes to human readers of our code. These comments are not executed, so there’s no need for valid syntax within a comment." },
                    { type: 'text', value: "When comments are short we use the single-line syntax: //." },
                    { type: 'code_block', language: 'java', value: '// calculate customer satisfaction rating' },
                    { type: 'text', value: "When comments are long we use the multi-line syntax: /* and */." },
                    { type: 'code_block', language: 'java', value: '/*\nWe chose to store information across multiple databases to\nminimize the possibility of data loss. We\'ll need to be careful\nto make sure it does not go out of sync!\n*/' },
                    { type: 'text', value: "Another type of commenting option is the Javadoc comment which is represented by /** and */. Javadoc comments are used to create documentation for APIs (Application Programming Interfaces). When writing Javadoc comments, remember that they will eventually be used in the documentation that your users might read, so make sure to be especially thoughtful when writing these comments." },
                    { type: 'text', value: "Javadoc comments are typically written before the declaration of fields, methods, and classes (which we’ll cover later in this course):" },
                    { type: 'code_block', language: 'java', value: '/**\n* The following class accomplishes the following task...\n*/' },
                    { type: 'text', value: "Here’s how a comment would look in a complete program:" },
                    { type: 'code_block', language: 'java', value: '/**\n* The following class shows what a comment would look like in a program.\n*/\npublic class CommentExample {\n  // I\'m a comment inside the class\n  public static void main(String[] args) {\n    // I\'m a comment inside a method\n    System.out.println("This program has comments!");\n  }\n}' },
                    { type: 'text', value: "Comments are different from printing to the screen, when we use System.out.println(). These comments won’t show up in our terminal, they’re only for people who read our code in the text editor." },
                    { type: 'section_heading', value: 'Instructions' },
                    { type: 'checkpoint', index: 1, value: "The file Timeline.java has plain text information about Java.",
                        content: [
                            { type: 'text', value: "Plain text facts aren’t valid syntax. We’ll use comments to avoid breaking the program." },
                            { type: 'text', value: "Use the single-line comment syntax for the first fact." },
                            { type: 'text', value: "Change this line into a comment:" },
                            { type: 'code_block', language: 'java', value: 'Sun Microsystems announced the release of Java in 1995' },
                            { type: 'hint', value: [
                                { type: 'text', value: "We use the following syntax for a single-line comment: //." },
                                { type: 'text', value: "To change A tale of sound and fury into a comment, place // before the line:" },
                                { type: 'code_block', language: 'java', value: '// A tale of sound and fury' }
                            ]}
                        ]
                    },
                    { type: 'checkpoint', index: 2, value: "Our program is still broken!",
                        content: [
                            { type: 'text', value: "Use the multi-line syntax to make these lines into a single comment:" },
                            { type: 'code_block', language: 'java', value: 'James Gosling is a Canadian engineer who created Java while\nworking at Sun Microsystems. His favorite number is the\nsquare root of 2!' },
                            { type: 'text', value: "You should still see You are a fun language! printed!" },
                            { type: 'hint', value: [
                                { type: 'text', value: "To comment out multiple lines, wrap them with /* and */." }
                            ]}
                        ]
                    },
                    { type: 'section_heading', value: 'Concept Review' },
                    { type: 'text', value: "Want to quickly review some of the concepts you’ve been learning? Take a look at this material's cheatsheet!" },
                    { type: 'section_heading', value: 'Community Support' },
                    { type: 'text', value: 'Still have questions? Get help from the Codecademy community.' },
                ],
                validationCriteria: [
                    { index: 1, match: 'You are a fun language!' },
                    { index: 2, match: 'You are a fun language!' }
                ]
            },
            {
                _id: new ObjectId('69b2da46f98f988579f9b875'), moduleId: modId, courseId,
                order: 5, type: 'lesson', title: 'Semicolons and Whitespace', duration: '5 min', language: 'java',
                starterCode: `public class LanguageFacts {\n  public static void main(String[] args) {\n    // Press enter or return on your keyboard after each semicolon!\n    \n    System.out.println("Java is a class-based language.");System.out.println("Java classes have a 'main' method.");System.out.println("Java statements end with a semicolon.");\n  }\n}`,
                content: [
                    { type: 'label', value: 'HELLO WORLD' },
                    { type: 'heading', value: 'Semicolons and Whitespace' },
                    { type: 'duration', value: '5 min' },
                    { type: 'rich_text', value: 'As we saw with <a href="#" class="text-blue-600 underline hover:text-blue-800">comments</a>, reading code is just as important as writing code.' },
                    { type: 'text', value: 'We should write code that is easy for other people to read. Those people can be co-workers, friends, or even yourself!' },
                    { type: 'rich_text', value: 'Java does not interpret <em>whitespace</em>, the areas of the code without syntax, but humans use whitespace to read code without difficulty.' },
                    { type: 'text', value: 'Functionally, these two code samples are identical:' },
                    { type: 'code_block', language: 'java', value: 'System.out.println("Java");System.out.println("Lava");System.out.println("Guava");' },
                    { type: 'code_block', language: 'java', value: 'System.out.println("Java");\n\nSystem.out.println("Lava");\n\nSystem.out.println("Guava");' },
                    { type: 'text', value: 'They will print the same text to the screen, but which would you prefer to read? Imagine if it was hundreds of instructions! Whitespace would be essential.' },
                    { type: 'rich_text', value: 'Java <strong>does</strong> interpret semicolons. Semicolons are used to mark the end of a <em>statement</em>, one line of code that performs a single task.' },
                    { type: 'rich_text', value: 'The only statements we\'ve seen so far are <code class="bg-gray-100 text-[12px] px-1.5 py-0.5 rounded font-mono text-gray-800">System.out.println("My message!");</code>.' },
                    { type: 'rich_text', value: 'Let\'s contrast statements with the curly brace, <code class="bg-gray-100 text-[12px] px-1.5 py-0.5 rounded font-mono text-gray-800">{}</code>. Curly braces mark the scope of our <a href="#" class="text-blue-600 underline hover:text-blue-800">classes</a> and <a href="#" class="text-blue-600 underline hover:text-blue-800">methods</a>. There are no semicolons at the end of a curly brace.' },
                    { type: 'section_heading', value: 'Instructions' },
                    {
                        type: 'checkpoint', index: 1,
                        value: 'The LanguageFacts.java file prints information about Java to the screen.',
                        content: [
                            { type: 'text', value: 'Unfortunately, the writer of the file has avoided using whitespace.' },
                            { type: 'text', value: 'Make the file easier to read by adding a newline after each statement!' },
                            { type: 'hint', value: [
                                { type: 'rich_text', value: 'Enter a newline character by pressing <kbd class="bg-gray-200 text-gray-700 text-[11px] px-1.5 py-0.5 rounded border border-gray-300 font-mono">return</kbd> or <kbd class="bg-gray-200 text-gray-700 text-[11px] px-1.5 py-0.5 rounded border border-gray-300 font-mono">enter</kbd>.' },
                                { type: 'text', value: 'You should see all the code after your cursor move down by one line.' },
                                { type: 'code_block', language: 'java', value: '// Before entering a newline\nSystem.out.println("Feels");System.out.println("Cramped!");\n\n// Entering a newline after the first semicolon\nSystem.out.println("Feels");\nSystem.out.println("Cramped!");' }
                            ]}
                        ]
                    },
                    {
                        type: 'checkpoint', index: 2,
                        value: 'Inside main(), add a new statement printing how you feel about coding.',
                        content: [
                            { type: 'rich_text', value: 'Start the message with: <code class="bg-gray-100 text-[12px] px-1.5 py-0.5 rounded font-mono text-gray-800">"Programming is… "</code>.' },
                            { type: 'text', value: 'Remember to place a semicolon at the end of the statement!' }
                        ]
                    },
                    { type: 'section_heading', value: 'Concept Review' },
                    { type: 'rich_text', value: 'Want to quickly review some of the concepts you\'ve been learning? Take a look at this material\'s <a href="#" class="text-blue-600 underline hover:text-blue-800">cheatsheet</a>!' },
                    { type: 'section_heading', value: 'Community Support' },
                    { type: 'rich_text', value: 'Still have questions? Get help from the <a href="#" class="text-blue-600 underline hover:text-blue-800">Codecademy community</a>.' },
                ],
                validationCriteria: [
                    { index: 3, match: 'Programming is... fun!' }
                ]
            },
            {
                _id: new ObjectId('69b2da46f98f988579f9b876'), moduleId: modId, courseId,
                order: 6, type: 'lesson', title: 'Compilation: Catching Errors', duration: '8 min', language: 'java',
                isTerminal: true,
                starterCode: `public class Compiling {\n  public static void main(String[] args) {\n    \n    System.out.println("Java is a class-based language.");\n    System.out.println("Java classes have a 'main' method.");\n    System.out.println("Java statements end with a semicolon.")\n\n    System.out.println("Programming is... fun!");\n    \n  }\n}`,
                content: [
                    { type: 'label', value: 'HELLO WORLD' },
                    { type: 'heading', value: 'Compilation: Catching Errors' },
                    { type: 'duration', value: '8 min' },
                    { type: 'rich_text', value: 'Java is a <em>compiled</em> programming language, meaning the code we write in a <strong>.java</strong> file is transformed into <em>byte code</em> by a <a href="#" class="text-blue-600 underline hover:text-blue-800">compiler</a> before it is executed by the Java Virtual Machine on your computer.' },
                    { type: 'text', value: 'A compiler is a program that translates human-friendly programming languages into other programming languages that computers can execute.' },
                    { type: 'section_heading', value: 'Steps of Java Compilation' },
                    { type: 'image', value: '/assets/catching.png', caption: 'Steps of Java Compilation' },
                    { type: 'rich_text', value: 'Previous exercises have automatically compiled and run the <a href="#" class="text-blue-600 underline hover:text-blue-800">files</a> for you. Off-platform development environments can also compile and run files for you, but it\'s important to understand this aspect of Java development so we\'ll do it ourselves.' },
                    { type: 'rich_text', value: 'The compiling process catches mistakes <strong>before</strong> the computer runs our code.' },
                    { type: 'text', value: 'The Java compiler runs a series of checks while it transforms the code. Code that does not pass these checks will not be compiled.' },
                    { type: 'rich_text', value: 'This exercise will use an interactive terminal. Codecademy has a <a href="#" class="text-blue-600 underline hover:text-blue-800">lesson on the command line</a> if you\'d like to learn more.' },
                    { type: 'rich_text', value: 'For example, with a file called <code class="bg-gray-100 text-[12px] px-1.5 py-0.5 rounded font-mono text-gray-800">Plankton.java</code>, we could compile it with the terminal command:' },
                    { type: 'code_block', language: 'bash', value: 'javac Plankton.java' },
                    { type: 'rich_text', value: 'A successful compilation produces a <strong>.class</strong> file: <code class="bg-gray-100 text-[12px] px-1.5 py-0.5 rounded font-mono text-gray-800">Plankton.class</code>, that we execute with the terminal command:' },
                    { type: 'code_block', language: 'bash', value: 'java Plankton' },
                    { type: 'rich_text', value: 'An unsuccessful compilation produces a list of <a href="#" class="text-blue-600 underline hover:text-blue-800">errors</a>. No <strong>.class</strong> file is made until the errors are corrected and the compile command is run again.' },
                    { type: 'section_heading', value: 'Instructions' },
                    {
                        type: 'checkpoint', index: 1,
                        value: "Let's practice compiling and executing a file by entering commands in the terminal!",
                        content: [
                            { type: 'rich_text', value: 'Our text editor contains a broken program so we can see how compilers help us catch mistakes. <strong>Don\'t make any corrections!</strong>' },
                            { type: 'rich_text', value: 'In the terminal, type this command: <code class="bg-gray-100 text-[12px] px-1.5 py-0.5 rounded font-mono text-gray-800">javac Compiling.java</code> and press <kbd class="bg-gray-200 text-gray-700 text-[11px] px-1.5 py-0.5 rounded border border-gray-300 font-mono">enter</kbd> or <kbd class="bg-gray-200 text-gray-700 text-[11px] px-1.5 py-0.5 rounded border border-gray-300 font-mono">return</kbd>. You will see an error message but don\'t worry, we will resolve it in the next step.' },
                            { type: 'rich_text', value: 'Click the <code class="bg-gray-100 text-[12px] px-1.5 py-0.5 rounded font-mono text-gray-800">Check Work</code> button to check your work and move on to the next checkpoint.' },
                            { type: 'hint', value: [
                                { type: 'rich_text', value: 'Running commands in the terminal is a little different from how we’ve executed code so far.' },
                                { type: 'text', value: 'You’ll need to click into the terminal and type in the command.' },
                                { type: 'rich_text', value: 'Press <kbd class="bg-gray-200 text-gray-700 text-[11px] px-1.5 py-0.5 rounded border border-gray-300 font-mono">enter</kbd> or <kbd class="bg-gray-200 text-gray-700 text-[11px] px-1.5 py-0.5 rounded border border-gray-300 font-mono">return</kbd> when you’ve typed the full command.' }
                            ]}
                        ]
                    },
                    {
                        type: 'checkpoint', index: 2,
                        value: 'Do you see the error?',
                        content: [
                            { type: 'text', value: 'The compiler is telling us one of the print statements is missing a semicolon.' },
                            { type: 'rich_text', value: 'In the terminal, type <code class="bg-gray-100 text-[12px] px-1.5 py-0.5 rounded font-mono text-gray-800">ls</code> and press <kbd class="bg-gray-200 text-gray-700 text-[11px] px-1.5 py-0.5 rounded border border-gray-300 font-mono">return</kbd> or <kbd class="bg-gray-200 text-gray-700 text-[11px] px-1.5 py-0.5 rounded border border-gray-300 font-mono">enter</kbd>.' },
                            { type: 'rich_text', value: '<code class="bg-gray-100 text-[12px] px-1.5 py-0.5 rounded font-mono text-gray-800">ls</code> is short for "list" and this command lists all the available files.' },
                            { type: 'rich_text', value: 'There is only one file: <code class="bg-gray-100 text-[12px] px-1.5 py-0.5 rounded font-mono text-gray-800">Compiling.java</code>, we did not successfully compile the file because of the error.' },
                            { type: 'rich_text', value: 'Click the <code class="bg-gray-100 text-[12px] px-1.5 py-0.5 rounded font-mono text-gray-800">Check Work</code> button to move on to the next checkpoint.' },
                        ]
                    },
                    {
                        type: 'checkpoint', index: 3,
                        value: 'Add the missing semicolon in the text editor, then click the Check Work button.',
                        content: [
                            { type: 'text', value: "We'll compile and execute this file in the next exercise!" }
                        ]
                    },
                    { type: 'section_heading', value: 'Concept Review' },
                    { type: 'rich_text', value: 'Want to quickly review some of the concepts you\'ve been learning? Take a look at this material\'s <a href="#" class="text-blue-600 underline hover:text-blue-800">cheatsheet</a>!' },
                    { type: 'section_heading', value: 'Community Support' },
                    { type: 'rich_text', value: 'Still have questions? Get help from the <a href="#" class="text-blue-600 underline hover:text-blue-800">Codecademy community</a>.' },
                ],
                validationCriteria: [
                ]
            },
            {
                _id: new ObjectId('69b2da46f98f988579f9b877'), moduleId: modId, courseId,
                order: 7, type: 'lesson', title: 'Compilation: Creating Executables', duration: '7 min', language: 'java',
                isTerminal: true,
                starterCode: `public class Compiling {\n  public static void main(String[] args) {\n    \n    System.out.println("Java is a class-based language.");\n    System.out.println("Java classes have a 'main' method.");\n    System.out.println("Java statements end with a semicolon.");\n\n    System.out.println("Programming is... fun!");\n    \n  }\n}`,
                content: [
                    { type: 'label', value: 'HELLO WORLD' },
                    { type: 'heading', value: 'Compilation: Creating Executables' },
                    { type: 'duration', value: '7 min' },
                    { type: 'rich_text', value: 'Compilation helped us catch an error. Now that we’ve corrected the file, let’s walk through a successful compilation.' },
                    { type: 'rich_text', value: 'As a reminder, we can compile a <strong>.java</strong> file from the terminal with the command:' },
                    { type: 'code_block', language: 'bash', value: 'javac Whales.java' },
                    { type: 'rich_text', value: 'If the file compiles successfully, this command produces an <em>executable</em> class: <strong>FileName.class</strong>. Executable means we can run this program from the terminal.' },
                    { type: 'rich_text', value: 'We run the executable with the command:' },
                    { type: 'code_block', language: 'bash', value: 'java Whales' },
                    { type: 'rich_text', value: 'Note that we leave off the <strong>.class</strong> part of the filename.' },
                    { type: 'rich_text', value: 'Here’s a full compilation cycle as an example:' },
                    { type: 'code_block', language: 'java', value: `// within the file: Welcome.java\npublic class Welcome {\n  public static void main(String[] args) {\n    System.out.println("Welcome to Codecademy's Java course!");\n  }\n}` },
                    { type: 'rich_text', value: 'We have one file: <strong>Welcome.java</strong>. We compile with the command:' },
                    { type: 'code_block', language: 'bash', value: 'javac Welcome.java' },
                    { type: 'rich_text', value: 'The terminal shows no <a href="#" class="text-blue-600 underline hover:text-blue-800">errors</a>, which indicates a successful compilation.' },
                    { type: 'rich_text', value: 'We now have two files:' },
                    { type: 'list', value: [
                        'Welcome.java, our original file with Java syntax.',
                        'Welcome.class, our compiled file with Java bytecode, ready to be executed by the Java Virtual Machine.'
                    ]},
                    { type: 'rich_text', value: 'We can execute the compiled class with the command:' },
                    { type: 'code_block', language: 'bash', value: 'java Welcome' },
                    { type: 'rich_text', value: 'The following is printed to the screen:' },
                    { type: 'code_block', language: 'text', value: 'Welcome to Codecademy\'s Java course!' },
                    { type: 'section_heading', value: 'Instructions' },
                    {
                        type: 'checkpoint', index: 1,
                        value: "Let's compile and execute our program!",
                        content: [
                            { type: 'rich_text', value: 'Run the <code class="bg-gray-100 text-[12px] px-1.5 py-0.5 rounded font-mono text-gray-800">ls</code> command in the terminal to see the uncompiled <strong>.java</strong> file.' },
                            { type: 'rich_text', value: 'Press the <code class="bg-gray-100 text-[12px] px-1.5 py-0.5 rounded font-mono text-gray-800">Check</code> button after you finish each checkpoint.' },
                            { type: 'hint', value: [
                                { type: 'rich_text', value: 'The <code class="bg-gray-100 text-[12px] px-1.5 py-0.5 rounded font-mono text-gray-800">l</code> in <code class="bg-gray-100 text-[12px] px-1.5 py-0.5 rounded font-mono text-gray-800">ls</code> is the letter l, not the number 1.' },
                                { type: 'rich_text', value: 'After you type <code class="bg-gray-100 text-[12px] px-1.5 py-0.5 rounded font-mono text-gray-800">ls</code> in the terminal and press <kbd class="bg-gray-200 text-gray-700 text-[11px] px-1.5 py-0.5 rounded border border-gray-300 font-mono">enter</kbd>, it should look like:' },
                                { type: 'code_block', language: 'bash', value: '$ ls\nCompiling.java' },
                                { type: 'rich_text', value: 'That means there’s currently a file named <strong>Compiling.java</strong> inside the folder.' }
                            ]}
                        ]
                    },
                    {
                        type: 'checkpoint', index: 2,
                        value: 'Compile the file from the terminal and then press the Check button.',
                        content: []
                    },
                    {
                        type: 'checkpoint', index: 3,
                        value: 'Enter ls again to see the new .class file. Run the executable file from the terminal and then press the Check button.',
                        content: []
                    },
                    { type: 'section_heading', value: 'Concept Review' },
                    { type: 'rich_text', value: 'Want to quickly review some of the concepts you\'ve been learning? Take a look at this material\'s <a href="#" class="text-blue-600 underline hover:text-blue-800">cheatsheet</a>!' },
                    { type: 'section_heading', value: 'Community Support' },
                    { type: 'rich_text', value: 'Still have questions? Get help from the <a href="#" class="text-blue-600 underline hover:text-blue-800">Codecademy community</a>.' },
                ]
            },
            {
                _id: new ObjectId('69b2da46f98f988579f9b878'), moduleId: modId, courseId,
                order: 8, type: 'lesson', title: 'Java Review: Putting It All Together', duration: '9 min', language: 'java',
                starterCode: '',
                content: [
                    { type: 'label', value: 'HELLO WORLD' },
                    { type: 'heading', value: 'Java Review: Putting It All Together' },
                    { type: 'duration', value: '9 min' },
                    { type: 'text', value: 'In this lesson, we’ve started writing our first programs in Java.' },
                    { type: 'text', value: 'We’ve also learned rules and guidelines for how to write Java programs:' },
                    { type: 'list', value: [
                        'Java programs have at least one class and one main() method.',
                        'Each class represents one real-world idea.',
                        'The main() method runs the tasks of the program.',
                        'Java <a href="#" class="text-blue-600 underline hover:text-blue-800">comments</a> add helpful context to human readers.',
                        'Java has whitespace, curly braces, and semicolons.',
                        'Whitespace is for humans to read code easily.',
                        'Curly braces mark the scope of a class and method.',
                        'Semicolons mark the end of a statement.',
                        'Java is a compiled language.',
                        'Compiling catches mistakes in our code.',
                        'Compilers transform code into an executable class.'
                    ]},
                    { type: 'section_heading', value: 'Instructions' },
                    {
                        type: 'checkpoint', index: 1,
                        value: 'The text editor holds an empty file named Review.java. Fill it in! Define a public class named Review. Use opening and closing curly braces for the scope of the class.',
                        content: [
                            { type: 'text', value: 'Remember, no semicolons for classes or methods!' },
                            { type: 'hint', value: [
                                { type: 'rich_text', value: 'We define a class in Java like so:' },
                                { type: 'code_block', language: 'java', value: 'public class MyClass {\n  // class code goes here\n}' }
                            ]}
                        ]
                    },
                    {
                        type: 'checkpoint', index: 2,
                        value: 'This code produces an error because Java programs need a main() method. Define the main() method within the curly braces of the Review class.',
                        content: [
                            { type: 'hint', value: [
                                { type: 'rich_text', value: 'The <strong>main()</strong> method is defined like this:' },
                                { type: 'code_block', language: 'java', value: 'public static void main(String[] args) {\n  // method code goes here\n}' }
                            ]}
                        ]
                    },
                    {
                        type: 'checkpoint', index: 3,
                        value: 'Inside of the curly braces for the main() method, write The main method executes the tasks of the class as a single-line comment.',
                        content: [
                            { type: 'hint', value: [
                                { type: 'rich_text', value: 'A single-line comment starts with two forward slashes:' },
                                { type: 'code_block', language: 'java', value: '// I am a comment!' }
                            ]}
                        ]
                    },
                    {
                        type: 'checkpoint', index: 4,
                        value: 'Below the comment, write a statement that prints the following: My first Java program from scratch!.',
                        content: [
                            { type: 'hint', value: [
                                { type: 'rich_text', value: 'We use <strong>System.out.println()</strong> to print text to the console:' },
                                { type: 'code_block', language: 'java', value: 'System.out.println("Hello World");' }
                            ]}
                        ]
                    },
                    { type: 'section_heading', value: 'Concept Review' },
                    { type: 'rich_text', value: 'Want to quickly review some of the concepts you\'ve been learning? Take a look at this material\'s <a href="#" class="text-blue-600 underline hover:text-blue-800">cheatsheet</a>!' },
                    { type: 'section_heading', value: 'Community Support' },
                    { type: 'rich_text', value: 'Still have questions? Get help from the <a href="#" class="text-blue-600 underline hover:text-blue-800">Codecademy community</a>.' },
                ],
                validationCriteria: [
                    { index: 4, match: 'My first Java program from scratch!' }
                ]
            }
        ];

        // Update the course: replace module lessons for Hello World
        const result = await col.updateOne(
            { slug: 'java', 'modules._id': modId },
            { $set: { 'modules.$.lessons': lessons } }
        );

        console.log(`✅ Hello World lessons injected: ${lessons.length} lessons (matched: ${result.matchedCount})`);
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await close();
    }
}

inject();
