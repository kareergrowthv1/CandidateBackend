/**
 * Module 5 — Loop Statements
 * node scripts/seed/m05_loop_statements.js
 */
const { seedModule, TABLE } = require('./_helpers');

const T_LOOPS = TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Loop Construct</th><th class="px-4 py-2">Typical Use Case</th></tr></thead>
<tbody><tr><td class="px-4 py-2 border-r font-mono">for</td><td class="px-4 py-2">When you know exactly how many iterations are needed beforehand. </td></tr>
<tr><td class="px-4 py-2 border-r font-mono">while</td><td class="px-4 py-2">When you want to repeat based on a logical state that changes during execution.</td></tr>
<tr><td class="px-4 py-2 border-r font-mono">do-while</td><td class="px-4 py-2">When you MUST execute the block at least once, primarily for menus and user input loops.</td></tr></tbody>`);

seedModule({
    moduleTitle: 'Loop Statements',
    moduleOrder: 5,
    description: 'Master iterative control flow architectures including while, do-while, deeply nested for loops, and runtime structural breaks.',
    label: 'LOOPS',
    lessons: [
        {
            "title": "Introduction to Loops",
            "duration": "45 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "Loops are the fundamental mechanisms that endow computers with their incredible processing speed advantage. In professional software architecture, a <strong>Loop</strong> is a control flow structure that allows a block of code to be executed repeatedly until a specific condition is met. This isn't just about saving lines of code—it's about <strong>Dynamic Scaling</strong>. Whether processing 10 rows of data or 10 million, the same loop logic handles the workload with surgical precision."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Automation Engine:</strong> Loops allow for the execution of repetitive tasks without manual code duplication.",
                        "<strong>Dynamic Workloads:</strong> A single loop can handle any amount of data, from a single record to millions.",
                        "<strong>Lifecycle Management:</strong> Every loop consists of initialization, a condition check, body execution, and an update step.",
                        "<strong>Computational Efficiency:</strong> Modern JVMs optimize loops into highly efficient machine code."
                    ]
                },
                {
                    "type": "section",
                    "title": "Comparative Context",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/loop_comparison_white.png\" alt=\"Loop Comparison\" style=\"max-width: 65%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "The Lifecycle of Iteration",
                    "rich": "Every loop in Java, regardless of its syntax, follows a core lifecycle: <strong>Initialization</strong> (setting up the control variable), <strong>Condition Check</strong> (evaluating if execution should continue), <strong>Body Execution</strong> (processing the logic), and <strong>Update</strong> (modifying the state to eventually terminate)."
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Explore how loops are used in real-world scenarios to automate and scale complex tasks."
                },
                {
                    "type": "section",
                    "title": "1. Simple Counter",
                    "code": "int i = 0;\nwhile (i < 5) {\n    System.out.println(\"Iteration: \" + i);\n    i++;\n}",
                    "rich": "<strong>How it works:</strong> A basic loop that prints the current count. The variable <code>i</code> is initialized to 0, checked against the condition <code>i < 5</code>, and incremented after each print."
                },
                {
                    "type": "section",
                    "title": "2. List Processing",
                    "code": "String[] users = {\"Alice\", \"Bob\", \"Charlie\"};\nfor (String user : users) {\n    System.out.println(\"Welcome, \" + user);\n}",
                    "rich": "<strong>How it works:</strong> An 'enhanced' for loop that iterates through every element in an array, performing an action for each."
                },
                {
                    "type": "section",
                    "title": "3. Data Accumulation",
                    "code": "int total = 0;\nfor (int i = 1; i <= 10; i++) {\n    total += i;\n}\nSystem.out.println(\"Total: \" + total);",
                    "rich": "<strong>How it works:</strong> A loop used to sum a range of numbers. Each iteration adds the current value of <code>i</code> to the <code>total</code>."
                },
                {
                    "type": "section",
                    "title": "4. Condition-Based Search",
                    "code": "boolean found = false;\nint[] codes = {101, 202, 303, 404};\nint target = 303;\nfor (int code : codes) {\n    if (code == target) {\n        found = true;\n        break;\n    }\n}",
                    "rich": "<strong>How it works:</strong> A loop that searches for a specific value. Once the <code>target</code> is found, it sets <code>found</code> to true and exits early using <code>break</code>."
                },
                {
                    "type": "section",
                    "title": "5. Dynamic Event Polling",
                    "code": "while (hasNewEvents()) {\n    Event e = pollEvent();\n    process(e);\n}",
                    "rich": "<strong>How it works:</strong> An indefinite loop that continues as long as there are new events to process. This is common in server-side application logic."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Basic Greeting<br/><br/>Print <code class=\"font-mono\">Hello</code> exactly 3 times using a loop.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Range Sum<br/><br/>Calculate the sum of numbers from 1 to 5 and print the final result.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Search Trigger<br/><br/>Loop through numbers 1 to 10. If the number is 7, print <code class=\"font-mono\">Found 7</code>.",
                    "hints": [
                        "Use an if statement inside your loop to check for the value 7."
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Counter Update<br/><br/>Create a loop that prints numbers from 5 down to 1.",
                    "hints": [
                        "Initialize your variable at 5 and use the -- operator to decrement it."
                    ],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "Hello[\\s\\S]*Hello[\\s\\S]*Hello",
                    "matchCode": "for|while"
                },
                {
                    "index": 2,
                    "match": "15",
                    "matchCode": "for|while"
                },
                {
                    "index": 3,
                    "match": "Found 7",
                    "matchCode": "if"
                },
                {
                    "index": 4,
                    "match": "5[\\s\\S]*4[\\s\\S]*2[\\s\\S]*1",
                    "matchCode": "--"
                }
            ]
        },
        {
            "title": "while Loop",
            "duration": "45 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "The <code class=\"font-mono\">while</code> loop is the purest expression of repetition in Java. It is structurally designed for <strong>indefinite iteration</strong>—scenarios where you don't know exactly how many times you will loop at compile time. It acts as a gatekeeper: as long as the condition evaluates to true, the block executes. This makes it the standard for reading files, monitoring sockets, or processing dynamic event queues."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Entry-Controlled Logic:</strong> The condition is checked <em>before</em> the loop body executes, ensuring no invalid data processing.",
                        "<strong>Zero-Pass Guarantee:</strong> If the initial condition is false, the loop will never execute its body.",
                        "<strong>Contextual Termination:</strong> Ideal for loops where exit depends on a state change that occurs at runtime.",
                        "<strong>Flexible Architecture:</strong> Can be used for both simple counters and complex event-driven polling."
                    ]
                },
                {
                    "type": "section",
                    "title": "Flow Analysis",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/loop_while_white.png\" alt=\"While Flow\" style=\"max-width: 65%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "The Gatekeeper Dynamic",
                    "rich": "Because it is an <strong>Entry-Controlled loop</strong>, the integrity of the data is maintained. You can check if a resource is available before you even attempt to process it, preventing runtime errors."
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Explore high-level examples of <code>while</code> loops in action, focusing on their unique indefinite iteration capabilities."
                },
                {
                    "type": "section",
                    "title": "1. Countdown Timer",
                    "code": "int timeLeft = 5;\nwhile (timeLeft > 0) {\n    System.out.println(\"Seconds left: \" + timeLeft);\n    timeLeft--;\n}",
                    "rich": "<strong>How it works:</strong> A standard countdown. The loop continues as long as <code>timeLeft</code> is greater than zero, decrementing the value each time."
                },
                {
                    "type": "section",
                    "title": "2. Indefinite User Input",
                    "code": "Scanner sc = new Scanner(System.in);\nString input = \"\";\nwhile (!input.equals(\"exit\")) {\n    System.out.println(\"Enter command:\");\n    input = sc.nextLine();\n}",
                    "rich": "<strong>How it works:</strong> A common usage for command-line interfaces. The loop runs until the user specifically typed 'exit'."
                },
                {
                    "type": "section",
                    "title": "3. Searching a Stream",
                    "code": "while (dataStream.hasNext()) {\n    String item = dataStream.getNext();\n    if (item.contains(\"ERROR\")) {\n        alertAdmin(item);\n    }\n}",
                    "rich": "<strong>How it works:</strong> Processing a stream of data where the total number of items is unknown. The loop persists until <code>hasNext()</code> returns false."
                },
                {
                    "type": "section",
                    "title": "4. Battery Level Monitor",
                    "code": "while (batteryLevel > 20) {\n    operateSystem();\n    batteryLevel = getBatteryStatus();\n}\nSystem.out.println(\"Battery low. Entering power save mode.\");",
                    "rich": "<strong>How it works:</strong> Monitoring a hardware state. The loop keeps the system active until the battery drops below a safe threshold."
                },
                {
                    "type": "section",
                    "title": "5. Retrying a Network Request",
                    "code": "int attempts = 0;\nboolean success = false;\nwhile (!success && attempts < 3) {\n    success = sendRequest();\n    attempts++;\n}",
                    "rich": "<strong>How it works:</strong> A common pattern for robust networking. It tries an action up to 3 times or until it succeeds."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: While Count<br/><br/>Print numbers from 1 to 4 using a <code class=\"font-mono\">while</code> loop.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Sentinel Loop<br/><br/>Print <code class=\"font-mono\">Working</code> while an <code class=\"font-mono\">int status = 1</code>. Inside the loop, change <code class=\"font-mono\">status = 0</code> so it only runs once.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Safety Guard<br/><br/>Given <code class=\"font-mono\">int val = 10</code>. Use a <code class=\"font-mono\">while</code> to print <code class=\"font-mono\">val</code> and subtract 2 each time until it reaches 6.",
                    "hints": [
                        "Use the condition val >= 6 and print val inside the loop."
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Match Finder<br/><br/>Print <code class=\"font-mono\">Match</code> if <code class=\"font-mono\">int key = 0</code> is less than 1. Increment <code class=\"font-mono\">key</code> inside your <code class=\"font-mono\">while</code> loop.",
                    "hints": [
                        "Use while (key < 1) and make sure to increment key++ inside the body."
                    ],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "1[\\s\\S]*2[\\s\\S]*3[\\s\\S]*4",
                    "matchCode": "while"
                },
                {
                    "index": 2,
                    "match": "Working",
                    "matchCode": "status[\\s\\S]*=[\\s\\S]*0"
                },
                {
                    "index": 3,
                    "match": "10[\\s\\S]*8[\\s\\S]*6",
                    "matchCode": "while"
                },
                {
                    "index": 4,
                    "match": "Match",
                    "matchCode": "key\\+\\+|key\\s*\\+=\\s*1"
                }
            ]
        },
        {
            "title": "do-while Loop",
            "duration": "40 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "The <code class=\"font-mono\">do-while</code> loop is unique in the Java ecosystem because it reverses the standard 'check-then-act' logic. It is an <strong>Exit-Controlled loop</strong>, meaning it forces the execution of its block once <em>before</em> asking if it should continue. In high-performance systems, this is used for 'Probing'—trying an action once to determine if further work is needed."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Guaranteed Execution:</strong> Unlike other loops, the <code>do-while</code> body always runs at least once.",
                        "<strong>Exit-Controlled Logic:</strong> The condition is evaluated at the end of the lifecycle, after the first execution.",
                        "<strong>Semicolon Requirement:</strong> A mandatory terminal <code>;</code> follows the <code>while</code> clause, distinguishing it from other loops.",
                        "<strong>Scope Isolation:</strong> Variables used in the condition must be declared outside the <code>do</code> block for proper visibility."
                    ]
                },
                {
                    "type": "section",
                    "title": "Execution Cycle",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/loop_do_while_white.png\" alt=\"Do-While Flow\" style=\"max-width: 65%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "The Recursive Fallback",
                    "rich": "In enterprise engineering, <code>do-while</code> is most frequently seen in console-based menu systems and network retry protocols where you must show options or send a packet at least once."
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Explore implementation scenarios where a guaranteed first pass is critical for system operational flow."
                },
                {
                    "type": "section",
                    "title": "1. Menu Display",
                    "code": "int choice;\ndo {\n    displayMenu();\n    choice = getUserChoice();\n} while (choice != 0);",
                    "rich": "<strong>How it works:</strong> Ensures the user sees the menu at least once before the loop checks if they want to exit by choosing 0."
                },
                {
                    "type": "section",
                    "title": "2. Data Validation Prompt",
                    "code": "int age;\ndo {\n    System.out.println(\"Enter valid age (0-120):\");\n    age = scanner.nextInt();\n} while (age < 0 || age > 120);",
                    "rich": "<strong>How it works:</strong> Continually prompts the user until they enter a value within the valid specified range."
                },
                {
                    "type": "section",
                    "title": "3. Single Packet Probe",
                    "code": "boolean ackReceived = false;\ndo {\n    sendProbePacket();\n    ackReceived = checkAck();\n} while (!ackReceived);",
                    "rich": "<strong>How it works:</strong> Sends an initial probe packet once and continues to retry until an acknowledgement is received."
                },
                {
                    "type": "section",
                    "title": "4. Random Number generation",
                    "code": "int luckyNumber;\ndo {\n    luckyNumber = generateRandom();\n} while (luckyNumber % 7 != 0);",
                    "rich": "<strong>How it works:</strong> Generates a random number at least once and continues until a number divisible by 7 is produced."
                },
                {
                    "type": "section",
                    "title": "5. Resource Warming",
                    "code": "boolean warmed = false;\ndo {\n    warmed = warmCache();\n} while (!warmed);",
                    "rich": "<strong>How it works:</strong> Attempts to warm the application cache once and continues until the process is successful."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Force Run<br/><br/>Print <code class=\"font-mono\">Run Once</code> exactly once using a <code class=\"font-mono\">do-while</code> loop with a <code class=\"font-mono\">false</code> condition.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Validation Loop<br/><br/>Print <code class=\"font-mono\">Try Again</code> while an <code class=\"font-mono\">int attempt = 1</code>. Set <code class=\"font-mono\">attempt = 2</code> inside to stop it immediately.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Number Probe<br/><br/>Initialize <code class=\"font-mono\">int n = 5</code>. In a <code class=\"font-mono\">do-while</code>, print <code class=\"font-mono\">n</code> and increment it. Repeat while <code class=\"font-mono\">n < 7</code>.",
                    "hints": [
                        "The loop should print 5 and then 6 before n becomes 7 and the loop exits."
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Terminal Semicolon<br/><br/>Print <code class=\"font-mono\">Semicolon Proof</code> once using a <code class=\"font-mono\">do-while</code> loop and ensure it terminates correctly with a semicolon.",
                    "hints": [
                        "Remember the syntax: do { ... } while(condition);"
                    ],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "Run Once",
                    "matchCode": "do[\\s\\S]*while"
                },
                {
                    "index": 2,
                    "match": "Try Again",
                    "matchCode": "attempt[\\s\\S]*=[\\s\\S]*2"
                },
                {
                    "index": 3,
                    "match": "5[\\s\\S]*6",
                    "matchCode": "n\\+\\+|n\\s*\\+=\\s*1"
                },
                {
                    "index": 4,
                    "match": "Semicolon Proof",
                    "matchCode": ";$"
                }
            ]
        },
        {
            "title": "for Loop",
            "duration": "50 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "The <code class=\"font-mono\">for</code> loop is the 'Precision Engine' of Java. It is designed for <strong>definite iteration</strong> where the number of cycles is known or pre-calculated. By consolidating initialization, condition, and increment into a single header, it provides the most readable and compact way to navigate arrays, ranges, and indexed data structures."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Header Consolidation:</strong> Combines initialization, condition, and update into a single, readable line.",
                        "<strong>Definite Iteration:</strong> The primary choice when the exact number of iterations is known beforehand.",
                        "<strong>Array Navigation:</strong> The industry standard for traversing indexed data structures with precision.",
                        "<strong>Lexical Scoping:</strong> Variables declared in the header are scoped strictly to the loop, preventing data leakage."
                    ]
                },
                {
                    "type": "section",
                    "title": "Structural Anatomy",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/loop_for_white.png\" alt=\"For Flow\" style=\"max-width: 65%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "The Indexing Standard",
                    "rich": "While <code>while</code> is about state, <code>for</code> is about <strong>Progression</strong>. Most professional Java code uses 0-indexed for loops to align perfectly with the way memory is allocated in arrays."
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Explore the versatility of the <code>for</code> loop in modern Java development, from simple sequences to complex data mapping."
                },
                {
                    "type": "section",
                    "title": "1. Range sequence",
                    "code": "for (int i = 1; i <= 5; i++) {\n    System.out.println(\"Day \" + i);\n}",
                    "rich": "<strong>How it works:</strong> A standard forward progression. The loop header manages the entire lifecycle of <code>i</code> from 1 to 5."
                },
                {
                    "type": "section",
                    "title": "2. Step-Based Iteration",
                    "code": "for (int i = 10; i >= 0; i -= 2) {\n    System.out.println(\"Interval: \" + i);\n}",
                    "rich": "<strong>How it works:</strong> A reverse loop that skips values. The update expression <code>i -= 2</code> controls the step size of each iteration."
                },
                {
                    "type": "section",
                    "title": "3. String traversal",
                    "code": "String word = \"JAVA\";\nfor (int i = 0; i < word.length(); i++) {\n    System.out.println(word.charAt(i));\n}",
                    "rich": "<strong>How it works:</strong> Using the index to access individual characters. The loop condition <code>i < word.length()</code> ensures we stay within bounds."
                },
                {
                    "type": "section",
                    "title": "4. Arithmetic Progression",
                    "code": "int result = 1;\nfor (int i = 1; i <= 4; i++) {\n    result *= 2;\n}\nSystem.out.println(\"2 to the power of 4 = \" + result);",
                    "rich": "<strong>How it works:</strong> Using the loop to perform repeated mathematical operations, in this case, calculating an exponent."
                },
                {
                    "type": "section",
                    "title": "5. Array Element Access",
                    "code": "double[] prices = {19.99, 25.50, 9.99};\nfor (int i = 0; i < prices.length; i++) {\n    System.out.println(\"Price \" + (i+1) + \": $\" + prices[i]);\n}",
                    "rich": "<strong>How it works:</strong> The standard way to iterate through an array by its index, allowing for precise control over element selection."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: For Count<br/><br/>Print numbers from 1 to 3 using a <code class=\"font-mono\">for</code> loop header.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Reverse For<br/><br/>Print <code class=\"font-mono\">3, 2, 1</code> using a <code class=\"font-mono\">for</code> loop starting at <code class=\"font-mono\">i = 3</code>.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Even Numbers<br/><br/>Print even numbers from 2 to 6 using a <code class=\"font-mono\">for</code> loop with a step of 2.",
                    "hints": [
                        "Use i += 2 in your update expression."
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Header Variables<br/><br/>Initialize <code class=\"font-mono\">int x = 0</code> in a <code class=\"font-mono\">for</code> loop header and print its value twice.",
                    "hints": [
                        "Use for(int x=0; x<2; x++) { ... }"
                    ],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "1[\\s\\S]*2[\\s\\S]*3",
                    "matchCode": "for"
                },
                {
                    "index": 2,
                    "match": "3[\\s\\S]*2[\\s\\S]*1",
                    "matchCode": "--"
                },
                {
                    "index": 3,
                    "match": "2[\\s\\S]*4[\\s\\S]*6",
                    "matchCode": "\\+=\\s*2"
                },
                {
                    "index": 4,
                    "match": "0[\\s\\S]*1",
                    "matchCode": "for\\s*\\(int\\s*x"
                }
            ]
        },
        {
            "title": "Nested Loops",
            "duration": "45 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "Real-world data is rarely linear. From image pixels to game maps and financial spreadsheets, data is often represented as a grid (2D) or a cube (3D). <strong>Nested Loops</strong> are the architectural solution for navigating these dimensions. They represent the concept of 'hierarchical work': for every single pass of the outer loop, the inner loop completes its <em>entire</em> lifecycle."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Dimensional Navigation:</strong> Essential for processing multi-dimensional data like grids, tables, and images.",
                        "<strong>Hierarchical Lifecycle:</strong> The inner loop completes its full operational cycle for every single iteration of the outer loop.",
                        "<strong>Computational Cost:</strong> Total work is the product of the loop cycles, requiring careful performance consideration (O(n²)).",
                        "<strong>Variable Distinction:</strong> Industry standards mandate distinct naming (e.g., i, j, k) to prevent logical interference."
                    ]
                },
                {
                    "type": "section",
                    "title": "Coordinate Logic",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/loop_nested_white.png\" alt=\"Nested Flow\" style=\"max-width: 65%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "The Multiplication Rule",
                    "rich": "The total work performed by nested loops is the <strong>Product</strong> of their iterations. If an outer loop runs 10 times and an inner loop runs 10 times, the deepest code block executes <strong>100 times</strong>."
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Explore how nested loops are used to handle complex multi-dimensional logic in software engineering."
                },
                {
                    "type": "section",
                    "title": "1. Grid Coordinates",
                    "code": "for (int i = 0; i < 2; i++) {\n    for (int j = 0; j < 2; j++) {\n        System.out.println(\"Pos: \" + i + \",\" + j);\n    }\n}",
                    "rich": "<strong>How it works:</strong> Navigating a basic 2D coordinate system. Useful for identifying positions in a grid."
                },
                {
                    "type": "section",
                    "title": "2. Multiplication Table",
                    "code": "for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 3; j++) {\n        System.out.print((i * j) + \" \");\n    }\n    System.out.println();\n}",
                    "rich": "<strong>How it works:</strong> Generating a small matrix of values. The outer loop manages rows, while the inner loop manages columns."
                },
                {
                    "type": "section",
                    "title": "3. Pattern Construction",
                    "code": "for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(\"*\");\n    }\n    System.out.println();\n}",
                    "rich": "<strong>How it works:</strong> The inner loop's limit depends on the outer loop's value, creating a stair-case visual pattern."
                },
                {
                    "type": "section",
                    "title": "4. Pairwise Comparison",
                    "code": "String[] items = {\"A\", \"B\", \"C\"};\nfor (int i = 0; i < items.length; i++) {\n    for (int j = i + 1; j < items.length; j++) {\n        System.out.println(items[i] + \" vs \" + items[j]);\n    }\n}",
                    "rich": "<strong>How it works:</strong> Comparing every item in a list with every other item precisely once. This is a common algorithm for matching systems."
                },
                {
                    "type": "section",
                    "title": "5. Clock Simulation",
                    "code": "for (int hours = 0; hours < 2; hours++) {\n    for (int mins = 0; mins < 60; mins++) {\n        // Process each minute\n    }\n}",
                    "rich": "<strong>How it works:</strong> Modeling time. The minutes loop must complete 60 cycles before the hours loop moves forward by one."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Basic Grid<br/><br/>Create a 2x2 grid of <code class=\"font-mono\">*</code> using nested loops.",
                    "hints": [],
                    "points": 15
                },
                {
                    "type": "task",
                    "value": "Task: Outer Limit<br/><br/>Print <code class=\"font-mono\">Outer</code> once for each of 2 cycles, and <code class=\"font-mono\">Inner</code> twice inside each outer cycle.",
                    "hints": [],
                    "points": 15
                },
                {
                    "type": "task",
                    "value": "Task: Stair Pattern<br/><br/>Print <code class=\"font-mono\">#</code> once on row 1, and <code class=\"font-mono\">##</code> on row 2 using nested loops.",
                    "hints": [
                        "The inner loop limit should be the outer loop's counter value."
                    ],
                    "points": 15
                },
                {
                    "type": "task",
                    "value": "Task: Coordinate Print<br/><br/>Print coordinates <code class=\"font-mono\">0:0</code> and <code class=\"font-mono\">0:1</code> using nested <code class=\"font-mono\">for</code> loops.",
                    "hints": [
                        "Outer loop i=0 once, Inner loop j from 0 to 1."
                    ],
                    "points": 15
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "\\*\\*[\\s\\S]*\\*\\*",
                    "matchCode": "for[\\s\\S]*for"
                },
                {
                    "index": 2,
                    "match": "Outer[\\s\\S]*Inner[\\s\\S]*Inner[\\s\\S]*Outer[\\s\\S]*Inner[\\s\\S]*Inner",
                    "matchCode": "for[\\s\\S]*for"
                },
                {
                    "index": 3,
                    "match": "#[\\s\\S]*##",
                    "matchCode": "for[\\s\\S]*for"
                },
                {
                    "index": 4,
                    "match": "0:0[\\s\\S]*0:1",
                    "matchCode": "for[\\s\\S]*for"
                }
            ]
        },
        {
            "title": "break Statement",
            "duration": "30 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "Iteration is powerful, but absolute control requires a 'Kill Switch'. The <code class=\"font-mono\">break</code> statement is the architectural mechanism used to <strong>force-terminate</strong> a loop immediately, regardless of the condition. In industrial software, this is more than an exit—it's an <strong>Optimization Tool</strong> used to stop processing the moment a result is found or a critical error occurs."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Instant Termination:</strong> Immediately exits the current loop block and moves control to the next instruction.",
                        "<strong>Contextual Exit:</strong> Primarily used when a specific 'matching' condition is met, saving CPU cycles.",
                        "<strong>Switch Integration:</strong> Also functions as the standard separator for cases within <code>switch</code> blocks.",
                        "<strong>Innermost Scope:</strong> By default, a <code>break</code> only exits the loop it is directly contained within."
                    ]
                },
                {
                    "type": "section",
                    "title": "Control Flow Shift",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/loop_break_white.png\" alt=\"Break Flow\" style=\"max-width: 65%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "The Intelligent Optimization",
                    "rich": "Professional engineers never let a loop run longer than necessary. If you are searching for a specific user in a database of a million records, using <code>break</code> the moment they are found prevents the system from wasting resources on the remaining 999,999 checks."
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Explore implementation scenarios where <code>break</code> provides tactical control over loop lifecycles."
                },
                {
                    "type": "section",
                    "title": "1. Search Early Exit",
                    "code": "int[] numbers = {10, 20, 30, 40, 50};\nfor (int n : numbers) {\n    if (n == 30) {\n        System.out.println(\"Found 30, stopping.\");\n        break;\n    }\n    System.out.println(\"Checking: \" + n);\n}",
                    "rich": "<strong>How it works:</strong> The loop explores elements one by one. As soon as 30 is encountered, the <code>break</code> triggers, preventing any further checks."
                },
                {
                    "type": "section",
                    "title": "2. infinite loop Control",
                    "code": "while (true) {\n    if (isSystemShutdown()) {\n        break;\n    }\n    maintainService();\n}",
                    "rich": "<strong>How it works:</strong> A standard pattern for background services. The loop runs 'forever' until an external signal (shutdown) triggers the <code>break</code>."
                },
                {
                    "type": "section",
                    "title": "3. Nested Break Logic",
                    "code": "outer: for (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        if (i + j == 3) break outer;\n    }\n}",
                    "rich": "<strong>How it works:</strong> Using labels to break out of multiple levels of nesting simultaneously when a specific global condition is met."
                },
                {
                    "type": "section",
                    "title": "4. Battery Safety Shutdown",
                    "code": "for (int task = 1; task <= 100; task++) {\n    if (getBatteryLevel() < 5) {\n        System.out.println(\"Critical Battery! Breaking.\");\n        break;\n    }\n    processTask(task);\n}",
                    "rich": "<strong>How it works:</strong> Safeguarding system integrity by exiting a long-running batch process if hardware resources drop below a threshold."
                },
                {
                    "type": "section",
                    "title": "5. Input Validation Exit",
                    "code": "while (true) {\n    String input = read();\n    if (input.equals(\"QUIT\")) break;\n    process(input);\n}",
                    "rich": "<strong>How it works:</strong> A common UI loop pattern. It keeps asking for input until the user provides the specific 'QUIT' command."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Force Stop<br/><br/>Loop from 1 to 5. If the number is 3, <code class=\"font-mono\">break</code> the loop. Print the number inside the loop.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: While Break<br/><br/>Use <code class=\"font-mono\">while(true)</code> to print <code class=\"font-mono\">Running</code> once, then <code class=\"font-mono\">break</code> immediately.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Match & Exit<br/><br/>Loop 1 to 10. If the number is 7, print <code class=\"font-mono\">Target Found</code> and exit the loop.",
                    "hints": [
                        "Use if(i == 7) { System.out.println(\"Target Found\"); break; }"
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Checkpoint Break<br/><br/>In a loop of 1 to 100, if the count hits 2, print <code class=\"font-mono\">Stop</code> and <code class=\"font-mono\">break</code>.",
                    "hints": [
                        "Use a conditional check for the value 2 inside your for loop."
                    ],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "1[\\s\\S]*2",
                    "matchCode": "break"
                },
                {
                    "index": 2,
                    "match": "Running",
                    "matchCode": "while\\s*\\(true\\)[\\s\\S]*break"
                },
                {
                    "index": 3,
                    "match": "Target Found",
                    "matchCode": "break"
                },
                {
                    "index": 4,
                    "match": "Stop",
                    "matchCode": "break"
                }
            ]
        },
        {
            "title": "continue Statement",
            "duration": "30 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "If <code>break</code> is the stop button, <code class=\"font-mono\">continue</code> is the 'Skip Button'. It is used to <strong>bypass</strong> a specific iteration of a loop without ending the loop entirely. This is functionally essential for 'Filtering'—allowing a loop to ignore invalid or irrelevant data while immediately jumping to the next cycle to continue processing."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Iteration Bypass:</strong> Skips the remaining code in the current loop body and moves directly to the next cycle.",
                        "<strong>Logic Filtering:</strong> Ideal for ignoring specific conditions (like null values or odd numbers) while continuing work.",
                        "<strong>State Persistence:</strong> The loop remains active; Only the <em>current</em> pass is terminated prematurely.",
                        "<strong>Update Step Trigger:</strong> In <code>for</code> loops, the increment/update expression still runs before the next condition check."
                    ]
                },
                {
                    "type": "section",
                    "title": "Iterative Bypass",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/loop_continue_white.png\" alt=\"Continue Flow\" style=\"max-width: 65%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "The Filtration Strategy",
                    "rich": "Continue statements are often used in clean-code patterns to create 'Guard Clauses'. Instead of nesting logic inside deep <code>if</code> statements, you can skip unwanted data at the very top of the loop, keeping the core logic flat and readable."
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Explore implementation scenarios where <code>continue</code> acts as a surgeon's scalpel, removing unwanted iterations from the process."
                },
                {
                    "type": "section",
                    "title": "1. Odd Number Filter",
                    "code": "for (int i = 1; i <= 5; i++) {\n    if (i % 2 != 0) {\n        continue;\n    }\n    System.out.println(\"Even: \" + i);\n}",
                    "rich": "<strong>How it works:</strong> The loop checks if a number is odd. If so, it invokes <code>continue</code>, skipping the print statement and jumping to the next number."
                },
                {
                    "type": "section",
                    "title": "2. Null Value Safety",
                    "code": "String[] logs = {\"info\", null, \"error\", null};\nfor (String log : logs) {\n    if (log == null) continue;\n    System.out.println(\"Processing: \" + log);\n}",
                    "rich": "<strong>How it works:</strong> A common safety pattern. By skipping nulls, the loop avoids potential <code>NullPointerException</code> errors in the main processing logic."
                },
                {
                    "type": "section",
                    "title": "3. Permission Filtering",
                    "code": "for (User u : users) {\n    if (!u.hasPermission()) continue;\n    chargeUser(u);\n}",
                    "rich": "<strong>How it works:</strong> In finance systems, <code>continue</code> ensures we only process entities that meet strict validation criteria without breaking the batch run."
                },
                {
                    "type": "section",
                    "title": "4. Character Exclusion",
                    "code": "String s = \"A B C\";\nfor (int i = 0; i < s.length(); i++) {\n    if (s.charAt(i) == ' ') continue;\n    System.out.print(s.charAt(i));\n}",
                    "rich": "<strong>How it works:</strong> Building a new string while skipping specific unwanted characters like spaces or punctuation."
                },
                {
                    "type": "section",
                    "title": "5. Priority task Skip",
                    "code": "for (Task t : queue) {\n    if (t.getPriority() < 5) continue;\n    executeHighPriority(t);\n}",
                    "rich": "<strong>How it works:</strong> Processing only high-priority tasks in an automated queue by skipping anything that doesn't meet the threshold."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Skip Number<br/><br/>Loop 1 to 4. If the number is 2, use <code class=\"font-mono\">continue</code>. Print all other numbers.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Even Skip<br/><br/>Print only odd numbers between 1 and 3. Use <code class=\"font-mono\">continue</code> if the number is even.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: No Space<br/><br/>Loop 1 to 2. If <code class=\"font-mono\">int i = 1</code>, print <code class=\"font-mono\">First</code>. If <code class=\"font-mono\">i = 2</code>, <code class=\"font-mono\">continue</code> before printing anything.",
                    "hints": [
                        "The output should only show 'First' because the second iteration is skipped."
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Filtered List<br/><br/>Loop 1 to 5. Use <code class=\"font-mono\">continue</code> to skip 1, 3, and 5. Print the rest.",
                    "hints": [
                        "Use if(i % 2 != 0) continue; to skip all odd numbers."
                    ],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "1[\\s\\S]*3[\\s\\S]*4",
                    "matchCode": "continue"
                },
                {
                    "index": 2,
                    "match": "1[\\s\\S]*3",
                    "matchCode": "continue"
                },
                {
                    "index": 3,
                    "match": "First",
                    "matchCode": "continue"
                },
                {
                    "index": 4,
                    "match": "2[\\s\\S]*4",
                    "matchCode": "continue"
                }
            ]
        }
    ]
}).catch(console.error);
