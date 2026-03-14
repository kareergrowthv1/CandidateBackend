/** Module 6 — Arrays */
const { seedModule, TABLE } = require('./_helpers');
seedModule({
    moduleTitle: 'Arrays',
    moduleOrder: 6,
    description: 'Declaring, initializing, accessing, looping, multidimensional arrays.',
    label: 'ARRAYS',
    lessons: [
        {
            "title": "Introduction to Arrays",
            "duration": "45 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "In high-performance computing, managing individual variables for massive datasets is impossible. An <strong>Array</strong> is a fundamental data structure that stores a fixed-size, sequential collection of elements of the same type. Conceptually, it represents a contiguous block of memory where each 'slot' is identified by an index, allowing for <strong>O(1) constant-time access</strong> to any element."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Fixed Capacity:</strong> Once instantiated, an array's length is immutable; it cannot grow or shrink dynamically.",
                        "<strong>Homogeneous Storage:</strong> Every element in an array must share the same data type, ensuring strict type safety.",
                        "<strong>Random Access:</strong> Any element can be retrieved instantly using its index without traversing the entire collection.",
                        "<strong>Indexed Logic:</strong> In Java, arrays are objects that use zero-based indexing (0 to length-1) for addressing."
                    ]
                },
                {
                    "type": "section",
                    "title": "Memory Architecture",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/java_arrays_memory_layout_1773475253774.png\" alt=\"Array Memory Layout\" style=\"max-width: 70%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "The Hardware Advantage",
                    "rich": "Because elements are stored contiguously (side-by-side) in memory, CPUs can efficiently cache arrays. This architectural trait makes arrays significantly faster for search and traversal operations compared to linked structures like Lists, making them the preferred choice for performance-critical systems."
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Explore how arrays serve as the backbone for structured data storage in various industrial scenarios."
                },
                {
                    "type": "section",
                    "title": "1. Static Registry Storage",
                    "code": "String[] serverRoles = new String[3];\nserverRoles[0] = \"GATEWAY\";\nserverRoles[1] = \"WORKER\";\nserverRoles[2] = \"DATABASE\";",
                    "rich": "<strong>How it works:</strong> A fixed cluster of servers is defined at startup. An array ensures that the registry size remains constant throughout the application lifecycle."
                },
                {
                    "type": "section",
                    "title": "2. Sensor Data Buffering",
                    "code": "double[] temperatureReadings = new double[24];\n// Stores hourly readings for one day",
                    "rich": "<strong>How it works:</strong> Arrays are ideal for time-series data where the number of intervals (hours in a day) is known and unchangeable."
                },
                {
                    "type": "section",
                    "title": "3. Object Reference Array",
                    "code": "User[] activeUsers = new User[100];\nactiveUsers[0] = new User(\"Admin\");",
                    "rich": "<strong>How it works:</strong> Arrays don't just store primitives; they can store references to complex objects, acting as a fixed-size container for entity management."
                },
                {
                    "type": "section",
                    "title": "4. Batch Processing Buffer",
                    "code": "byte[] buffer = new byte[1024];\ninputStream.read(buffer);",
                    "rich": "<strong>How it works:</strong> In file I/O, arrays act as 'buckets' to move data in chunks, significantly improving throughput by reducing system calls."
                },
                {
                    "type": "section",
                    "title": "5. Constant Lookup Tables",
                    "code": "int[] DAYS_IN_MONTH = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};",
                    "rich": "<strong>How it works:</strong> A hardcoded array provides an efficient lookup mechanism for values that never change during program execution."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Create Buffer<br/><br/>Declare an integer array named <code class=\"font-mono\">data</code> with exactly 10 slots using the <code class=\"font-mono\">new</code> keyword. Print the length of the array.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Type Match<br/><br/>Declare a <code class=\"font-mono\">double</code> array named <code class=\"font-mono\">rates</code> with 5 slots. Print the length of the array.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Index Limit<br/><br/>Given an array of size 5, what is the index of the <strong>last</strong> element? Print that number directly.",
                    "hints": [
                        "Remember zero-based indexing: (length - 1)."
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Array Check<br/><br/>Initialize an array of 3 integers. Print the value of <code class=\"font-mono\">array.length</code>.",
                    "hints": [
                        "Use int[] arr = new int[3]; then print its length."
                    ],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "10",
                    "matchCode": "new int\\[10\\]"
                },
                {
                    "index": 2,
                    "match": "5",
                    "matchCode": "double\\[\\]"
                },
                {
                    "index": 3,
                    "match": "4",
                    "matchCode": ""
                },
                {
                    "index": 4,
                    "match": "3",
                    "matchCode": "length"
                }
            ]
        },
        {
            "title": "Declaring Arrays (Complete Coverage)",
            "duration": "50 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "Array declaration is the critical process of creating a <strong>reference variable</strong> that can store the memory address of an array object. Unlike primitive variables, an array variable does not directly hold values; it holds a pointer to a contiguous memory block. In Java, this is a two-step lifecycle: first defining the reference (Declaration) and then reserving the physical space (Instantiation)."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Reference vs Value:</strong> Declaration creates only the address variable (reference); at this stage, the variable points to <code>null</code>.",
                        "<strong>Bracket Convention:</strong> While Java supports <code>int nums[]</code>, the professional standard is <code>int[] nums</code> for better readability.",
                        "<strong>Heap Allocation:</strong> Memory for the array elements is only reserved during instantiation using the <code>new</code> keyword.",
                        "<strong>Type Homogeneity:</strong> Once declared for a specific type (e.g., <code>double[]</code>), the array can only reference objects of that type."
                    ]
                },
                {
                    "type": "section",
                    "title": "Declaration vs Instantiation",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/java_array_declaration_concept_1773495490703.png\" alt=\"Array Declaration vs Instantiation\" style=\"max-width: 75%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "1. What is Array Declaration?",
                    "rich": "Array declaration is the process of creating a reference variable that can store the address of an array object. <br/><br/>Example: <code class=\"bg-gray-100 px-1 rounded text-orange-600\">int[] numbers;</code><br/>Explanation:<br/>• <strong>int</strong> → type of elements stored<br/>• <strong>[]</strong> → indicates array structure<br/>• <strong>numbers</strong> → reference variable<br/><br/>At this stage: <code class=\"font-mono\">numbers → null</code>. No memory has been allocated yet."
                },
                {
                    "type": "section",
                    "title": "2. Syntax & Alternative Styles",
                    "rich": "Java supports two syntax styles, though only one is recommended in modern engineering:<br/><br/>• <strong>Preferred:</strong> <code class=\"font-mono\">int[] data;</code> (Brackets with type)<br/>• <strong>Discouraged:</strong> <code class=\"font-mono\">int data[];</code> (C-style brackets with variable)<br/><br/><strong>Why it matters:</strong> Using the preferred style avoids confusion when declaring multiple variables. For example, <code class=\"font-mono\">int[] a, b;</code> makes <i>both</i> arrays, whereas <code class=\"font-mono\">int a[], b;</code> makes one array and one normal integer."
                },
                {
                    "type": "section",
                    "title": "3. Default Values and Memory Rules",
                    "rich": "When an array variable is declared but not initialized, its default value is <strong>null</strong>. Attempting to access its elements (e.g., <code class=\"font-mono\">numbers[0] = 10;</code>) before allocation will trigger a <code>NullPointerException</code>. <br/><br/><strong>The Compile-Time Rule:</strong> You cannot specify the size during declaration. <code class=\"text-red-600 font-mono\">int numbers[5];</code> is invalid and will cause a compiler error."
                },
                {
                    "type": "section",
                    "title": "Common Beginner Mistakes",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Mistake</th><th class="px-4 py-2">Consequence</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Using array before <code>new</code></td><td class="px-4 py-2 text-red-600">NullPointerException</td></tr>
<tr><td class="px-4 py-2 border-r"><code>int nums[10];</code> during declaration</td><td class="px-4 py-2 text-red-600">Compile Error (Illegal Syntax)</td></tr>
<tr><td class="px-4 py-2 border-r">Mixing styles: <code>int a[], b;</code></td><td class="px-4 py-2">Logical confusion (b is only an int)</td></tr>
</tbody>`)
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "See how declaration variations are used across different data types and allocation strategies."
                },
                {
                    "type": "section",
                    "title": "1. Integer Registry Setup",
                    "code": "int[] scores;\nscores = new int[5];",
                    "rich": "<strong>How it works:</strong> Classic deferred allocation. The reference is created on the stack, and memory for 5 integers is allocated later."
                },
                {
                    "type": "section",
                    "title": "Reference vs Allocation",
                    "code": "// 1. Declaration (Stack Reference)\nint[] myData;\n\n// 2. Instantiation (Heap Allocation)\nmyData = new int[10];",
                    "rich": "<strong>Visual Context:</strong> At runtime, the variable <code>myData</code> resides on the stack, while the actual array object is created on the heap."
                },
                {
                    "type": "section",
                    "title": "Default Value Matrix",
                    "rich": "Understanding initial states is critical to avoiding logic errors. Java guarantees the following defaults upon instantiation:"
                },
                {
                    "type": "section",
                    "title": "Comparison Table",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Primitive Type</th><th class="px-4 py-2 border-r">Default State</th><th class="px-4 py-2">Memory Size</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">int / byte / short</td><td class="px-4 py-2 border-r"><code>0</code></td><td class="px-4 py-2">Depends on type</td></tr>
<tr><td class="px-4 py-2 border-r">boolean</td><td class="px-4 py-2 border-r"><code>false</code></td><td class="px-4 py-2">1 bit</td></tr>
<tr><td class="px-4 py-2 border-r">char</td><td class="px-4 py-2 border-r"><code>'\\u0000'</code></td><td class="px-4 py-2">2 bytes</td></tr>
<tr><td class="px-4 py-2 border-r">String / Objects</td><td class="px-4 py-2 border-r"><code>null</code></td><td class="px-4 py-2">4/8 byte ref</td></tr>
</tbody>`)
                },
                {
                    "type": "section",
                    "title": "Common Implementation Scenarios",
                    "rich": "See how declaration variations and default values impact system startup."
                },
                {
                    "type": "section",
                    "title": "1. Standard Allocation",
                    "code": "int[] scores = new int[5];\nSystem.out.println(scores[0]); // Prints 0",
                    "rich": "<strong>How it works:</strong> Space for 5 integers is reserved. Since no values were provided, Java fills them with 0 automatically."
                },
                {
                    "type": "section",
                    "title": "2. Combined Inline Allocation",
                    "code": "boolean[] switches = new boolean[3];",
                    "rich": "<strong>How it works:</strong> Most common pattern. Combines declaration and memory allocation in a single, atomic statement."
                },
                {
                    "type": "section",
                    "title": "3. Object Reference Array",
                    "code": "String[] names;\nnames = new String[4];",
                    "rich": "<strong>How it works:</strong> Declaring an array for objects. The array itself stores references to String objects, initially all pointing to <code>null</code>."
                },
                {
                    "type": "section",
                    "title": "4. Floating Point Buffer",
                    "code": "float[] temperatures = new float[24];",
                    "rich": "<strong>How it works:</strong> Reserving space for high-precision data. All 24 slots are zero-initialized to <code>0.0f</code>."
                },
                {
                    "type": "section",
                    "title": "5. Bulk Reference Declaration",
                    "code": "int[] a, b, c;",
                    "rich": "<strong>How it works:</strong> Efficiently creating three separate array references at once. Each can later point to arrays of different sizes."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Reference Setup<br/><br/>Declare an integer array named <code class=\"font-mono\">data</code>. Do <strong>not</strong> allocate memory yet. Print the variable name directly.",
                    "hints": [
                        "Just int[] data;"
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Proper Syntax<br/><br/>Declare a <code class=\"font-mono\">double</code> array named <code class=\"font-mono\">prices</code> using the <strong>preferred</strong> Java syntax (brackets with type). print its name.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Multiple Refs<br/><br/>Declare two array references of type <code class=\"font-mono\">long</code> named <code class=\"font-mono\">x</code> and <code class=\"font-mono\">y</code> in a single line. Print the value of x.",
                    "hints": [
                        "long[] x, y;"
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Object Base<br/><br/>Declare a <code class=\"font-mono\">String</code> array reference named <code class=\"font-mono\">categories</code>. Print the name Categories.",
                    "hints": [],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "data",
                    "matchCode": "int\\[\\]\\s*data;"
                },
                {
                    "index": 2,
                    "match": "prices",
                    "matchCode": "double\\[\\]\\s*prices"
                },
                {
                    "index": 3,
                    "match": "null",
                    "matchCode": "long\\[\\]\\s*x,\\s*y"
                },
                {
                    "index": 4,
                    "match": "Categories",
                    "matchCode": "String\\[\\]\\s*categories"
                }
            ]
        },
        {
            "title": "Initializing Arrays (Complete Concept Coverage)",
            "duration": "60 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "Initialization is the process of assigning values to the elements of an array after memory has been allocated. When an array is created, Java automatically fills it with default values; initialization replaces those defaults with meaningful data."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Default State:</strong> Numeric arrays start at 0, booleans at false, and objects at null.",
                        "<strong>Manual vs. Inline:</strong> You can assign values one-by-one or use shorthand literal syntax for efficiency.",
                        "<strong>Zero-Basics:</strong> All initialization follows zero-based indexing (0 to length-1).",
                        "<strong>Type Enforcement:</strong> All initialized values must strictly match the array's declared data type."
                    ]
                },
                {
                    "type": "section",
                    "title": "Initialization Architecture",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/java_array_initialization_concept_1773495954656.png\" alt=\"Array Initialization Concept\" style=\"max-width: 80%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "1. What Initialization Means",
                    "code": "int[] numbers = new int[3];\nnumbers[0] = 10;\nnumbers[1] = 20;\nnumbers[2] = 30;",
                    "rich": "This replaces the default zeros with <strong>10, 20, and 30</strong> respectively."
                },
                {
                    "type": "section",
                    "title": "2. Default Initialization by Java",
                    "rich": "When an array is created but not explicitly initialized, Java assigns default values automatically to prevent garbage data."
                },
                {
                    "type": "section",
                    "title": "Default Value Matrix",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Data Type</th><th class="px-4 py-2">Default Value</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">int / byte / short</td><td class="px-4 py-2">0</td></tr>
<tr><td class="px-4 py-2 border-r">double / float</td><td class="px-4 py-2">0.0</td></tr>
<tr><td class="px-4 py-2 border-r">boolean</td><td class="px-4 py-2">false</td></tr>
<tr><td class="px-4 py-2 border-r">char</td><td class="px-4 py-2">'\u0000'</td></tr>
<tr><td class="px-4 py-2 border-r">Object references</td><td class="px-4 py-2">null</td></tr>
</tbody>`)
                },
                {
                    "type": "section",
                    "title": "3. Manual Initialization (Element by Element)",
                    "code": "int[] values = new int[4];\nvalues[0] = 5;\nvalues[1] = 10;\nvalues[2] = 15;\nvalues[3] = 20;",
                    "rich": "<strong>Memory representation:</strong> Index 0→5, 1→10, 2→15, 3→20. Useful when values are assigned dynamically."
                },
                {
                    "type": "section",
                    "title": "4. Inline Initialization (Array Literal)",
                    "code": "int[] numbers = {10, 20, 30, 40};",
                    "rich": "Java automatically determines size = 4. This is the most <strong>concise</strong> and <strong>readable</strong> method."
                },
                {
                    "type": "section",
                    "title": "5. Initialization After Declaration",
                    "code": "int[] numbers;\nnumbers = new int[]{1, 2, 3};",
                    "rich": "<strong>Important:</strong> If declaration and initialization are separate, the <code>new datatype[]{}</code> syntax is mandatory. Shorthand <code>{1,2,3}</code> will cause a compilation error."
                },
                {
                    "type": "section",
                    "title": "6. Anonymous Array Initialization",
                    "code": "printScores(new int[]{80, 85, 90});",
                    "rich": "Created without a variable name. Reduces temporary variables and keeps the code clean."
                },
                {
                    "type": "section",
                    "title": "7. Array Type Variations",
                    "rich": "Arrays can store any Java type, from core primitives to custom objects."
                },
                {
                    "type": "section",
                    "title": "Type Implementation Examples",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Array Category</th><th class="px-4 py-2">Implementation</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">String Array</td><td class="px-4 py-2"><code>String[] names = {"Alice", "Bob"};</code></td></tr>
<tr><td class="px-4 py-2 border-r">Character Array</td><td class="px-4 py-2"><code>char[] vowels = {'a', 'e'};</code></td></tr>
<tr><td class="px-4 py-2 border-r">Boolean Array</td><td class="px-4 py-2"><code>boolean[] flags = {true, false};</code></td></tr>
</tbody>`)
                },
                {
                    "type": "section",
                    "title": "8. Partial Initialization",
                    "code": "int[] data = new int[5];\ndata[0] = 10;\ndata[3] = 40;",
                    "rich": "Result indices [1], [2], [4] retain the default value of <strong>0</strong>."
                },
                {
                    "type": "section",
                    "title": "9. Initialization with Expressions",
                    "code": "int[] numbers = {5+5, 10*2, 30/3};",
                    "rich": "Java evaluates the math (10, 20, 10) <strong>before</strong> storing the values in memory."
                },
                {
                    "type": "section",
                    "title": "10. Initialization Order & Fixed Size",
                    "rich": "Elements are stored in the exact order written. Once initialized, the size is <strong>immutable</strong>; attempting to add more elements will cause a runtime error."
                },
                {
                    "type": "section",
                    "title": "Common Initialization Errors",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Error Type</th><th class="px-4 py-2">Consequence</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Shorthand after declaration</td><td class="px-4 py-2 text-red-600">Compile Error</td></tr>
<tr><td class="px-4 py-2 border-r">Mismatched data types</td><td class="px-4 py-2 text-red-600">Type Mismatch Exception</td></tr>
<tr><td class="px-4 py-2 border-r">Missing commas</td><td class="px-4 py-2">Syntax Error</td></tr>
</tbody>`)
                },
                {
                    "type": "section",
                    "title": "Industry Best Practices",
                    "rich": "Professional developers <strong>prefer shorthand initialization</strong> when values are known at compile-time to reduce boilerplate and improve maintainability."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Prime Set<br/><br/>Initialize an <code class=\"font-mono\">int</code> array named <code class=\"font-mono\">primes</code> with values <code class=\"font-mono\">2, 3, 5</code> using shorthand syntax. Print value at index 1.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: String Literals<br/><br/>Create a <code class=\"font-mono\">String</code> array named <code class=\"font-mono\">codes</code> with <code class=\"font-mono\">\"A1\", \"B2\"</code>. Print its length.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Manual Step<br/><br/>Declare a <code class=\"font-mono\">char</code> array of size 2. Set the first element to <code class=\"font-mono\">'X'</code> manually. Print the first element.",
                    "hints": [
                        "char[] letters = new char[2]; letters[0] = 'X';"
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Late Setup<br/><br/>Declare an <code class=\"font-mono\">int</code> array <code>vals</code>, then on the next line initialize it with <code>1, 2</code> using <code>new int[]{}</code>. Print <code>vals[0]</code>.",
                    "hints": [],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "3",
                    "matchCode": "\\{\\s*2,\\s*3,\\s*5\\s*\\}"
                },
                {
                    "index": 2,
                    "match": "2",
                    "matchCode": "String\\[\\]"
                },
                {
                    "index": 3,
                    "match": "X",
                    "matchCode": "char\\[\\]"
                },
                {
                    "index": 4,
                    "match": "1",
                    "matchCode": "new int\\[\\]\\s*\\{\\s*1,\\s*2\\s*\\}"
                }
            ]
        },
        {
            "title": "Accessing Array Elements (Complete Depth)",
            "duration": "60 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "Accessing an array element means retrieving or modifying a specific value stored inside an array using its <strong>index position</strong>. This operation is the foundation of data manipulation in Java, offering O(1) constant-time performance."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Zero-Based Indexing:</strong> The first logical item is always at index 0.",
                        "<strong>Mutable Mapping:</strong> Elements can be both read and updated using the same index operator <code>[]</code>.",
                        "<strong>Dynamic Bound Checks:</strong> The <code>length</code> property is used to determine the valid access range.",
                        "<strong>Exception Safety:</strong> Accessing indices outside 0 to length-1 triggers an <code>ArrayIndexOutOfBoundsException</code>."
                    ]
                },
                {
                    "type": "section",
                    "title": "1. What Accessing an Array Element Means",
                    "code": "int[] numbers = {10, 20, 30};\nSystem.out.println(numbers[0]); // Output: 10",
                    "rich": "Retrieved the <strong>first element</strong> by pointing to memory slot 0."
                },
                {
                    "type": "section",
                    "title": "2. Understanding Array Index",
                    "rich": "Every element in an array has a unique index number starting at <strong>0</strong>. For an array of size 4, indices are 0, 1, 2, and 3."
                },
                {
                    "type": "section",
                    "title": "3. Syntax for Accessing Elements",
                    "code": "arrayName[index]",
                    "rich": "The integer inside the square brackets tells Java exactly which memory slot to read or modify."
                },
                {
                    "type": "section",
                    "title": "4. Reading Values from an Array",
                    "code": "String[] cities = {\"London\", \"Paris\", \"Tokyo\"};\nSystem.out.println(cities[2]); // Output: Tokyo",
                    "rich": "Accessing <code>cities[2]</code> retrieves the <strong>third</strong> element in the sequence."
                },
                {
                    "type": "section",
                    "title": "5. Modifying (Updating) Array Elements",
                    "code": "int[] scores = {50, 60, 70};\nscores[1] = 80; // Array is now {50, 80, 70}",
                    "rich": "Arrays are <strong>mutable</strong>, allowing you to overwrite existing values as long as the data type matches."
                },
                {
                    "type": "section",
                    "title": "6. Using Variables as Index",
                    "code": "int[] numbers = {10, 20, 30};\nint i = 1;\nSystem.out.println(numbers[i]); // Output: 20",
                    "rich": "This allows for <strong>dynamic element access</strong>, where the index is determined at runtime."
                },
                {
                    "type": "section",
                    "title": "7. Using Expressions as Index",
                    "code": "int[] values = {5, 10, 15, 20};\nint result = values[1 + 2]; // values[3]",
                    "rich": "Java evaluates the math (1+2=3) <strong>before</strong> accessing the memory location."
                },
                {
                    "type": "section",
                    "title": "8. Accessing the First Element",
                    "code": "int[] arr = {100, 200, 300};\nint first = arr[0];",
                    "rich": "The first element <strong>always</strong> uses index 0 across all array types."
                },
                {
                    "type": "section",
                    "title": "9. Accessing the Last Element",
                    "code": "int[] data = {5, 10, 15, 20};\nint last = data[data.length - 1]; // last = 20",
                    "rich": "A standard and vital pattern: <code>length - 1</code> always points to the final valid slot."
                },
                {
                    "type": "section",
                    "title": "10. Array Boundaries",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/java_array_index_bounds_1773475268035.png\" alt=\"Array Boundaries\" style=\"max-width: 65%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "Boundary Rules",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Constraint</th><th class="px-4 py-2">Value</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">First Valid Index</td><td class="px-4 py-2"><code>0</code></td></tr>
<tr><td class="px-4 py-2 border-r">Last Valid Index</td><td class="px-4 py-2"><code>length - 1</code></td></tr>
<tr><td class="px-4 py-2 border-r">Invalid Access</td><td class="px-4 py-2">Anything outside 0 to length-1</td></tr>
</tbody>`)
                },
                {
                    "type": "section",
                    "title": "11. ArrayIndexOutOfBoundsException",
                    "code": "int[] values = {1, 2, 3};\nSystem.out.println(values[5]); // ERROR!",
                    "rich": "Java protects memory by throwing an <strong>exception</strong> if you try to step outside the allocated bounds."
                },
                {
                    "type": "section",
                    "title": "12. Accessing Object Arrays",
                    "code": "String[] names = {\"Alice\", \"Bob\", \"Charlie\"};\nString first = names[0];",
                    "rich": "Access works the same way for objects; here, the array stores <strong>references</strong> (pointers) to String objects."
                },
                {
                    "type": "section",
                    "title": "13. Accessing Multi-Type Arrays",
                    "rich": "Whether it's <code>boolean[]</code>, <code>char[]</code>, or <code>Double[]</code>, the <code>[index]</code> operator remains standard."
                },
                {
                    "type": "section",
                    "title": "14. Memory Perspective of Access",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/java_array_access_memory_math_1773496279982.png\" alt=\"Array Memory Math\" style=\"max-width: 75%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "How Java Calculates Address",
                    "rich": "Internally, Java uses the formula: <strong>base address + (index × element size)</strong>. This allows the JVM to jump directly to any slot without looking at the others."
                },
                {
                    "type": "section",
                    "title": "15. Common Beginner Mistakes",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Mistake</th><th class="px-4 py-2">Consequence</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Using 1 as first index</td><td class="px-4 py-2">Missing first element (index 0)</td></tr>
<tr><td class="px-4 py-2 border-r">Using <code>arr[length]</code></td><td class="px-4 py-2 text-red-600">ArrayIndexOutOfBoundsException</td></tr>
<tr><td class="px-4 py-2 border-r">Negative index</td><td class="px-4 py-2 text-red-600">Crashes the application</td></tr>
</tbody>`)
                },
                {
                    "type": "section",
                    "title": "16. Professional Coding Practices",
                    "rich": "Professional developers always validate boundaries and use <code>array.length</code> rather than hardcoded numbers to ensure robust, error-free code."
                },
                {
                    "type": "section",
                    "title": "17. Key Points Summary",
                    "list": [
                        "Index numbering <strong>starts at 0</strong> and ends at length-1.",
                        "Syntax <code>arr[i]</code> works for reading and writing all data types.",
                        "Access is <strong>extremely fast</strong> O(1) due to direct memory addressing.",
                        "Out-of-bounds access is the leading cause of array-related crashes in Java."
                    ]
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Fetch First<br/><br/>Given <code class=\"font-mono\">int[] data = {100, 200, 300};</code>, print the value stored at index 0.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Update Slot<br/><br/>Create an array with values <code class=\"font-mono\">5, 10</code>. Change the value at index 0 to <code class=\"font-mono\">99</code> and print the new value.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: End Pointer<br/><br/>Given an array <code class=\"font-mono\">nums</code> of size 4, print the value at the last index using <code class=\"font-mono\">length - 1</code>.",
                    "hints": [
                        "nums[nums.length - 1]"
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Bounds Check<br/><br/>Given <code class=\"font-mono\">int[] n = {10, 20, 30};</code>, print the element at index 2.",
                    "hints": [],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "100",
                    "matchCode": "data\\[0\\]"
                },
                {
                    "index": 2,
                    "match": "99",
                    "matchCode": "index\\s*0"
                },
                {
                    "index": 3,
                    "match": "[0-9]+",
                    "matchCode": "length\\s*-\\s*1"
                },
                {
                    "index": 4,
                    "match": "30",
                    "matchCode": "n\\[2\\]"
                }
            ]
        },
        {
            "title": "Looping Through Arrays (Complete Concept Coverage)",
            "duration": "60 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "Looping through an array (also called <strong>array traversal</strong>) means visiting each element of the array one by one to perform some operation. This automation is essential for processing large datasets efficiently without manual index management."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Automation:</strong> Replace repetitive <code>arr[0], arr[1]</code> calls with a single loop block.",
                        "<strong>Scalability:</strong> Logic that works for 3 items works for 3 million items.",
                        "<strong>Dual Patterns:</strong> Use traditional loops for control and enhanced loops for readability.",
                        "<strong>Memory Depth:</strong> Sequential access leverages CPU cache for maximum performance."
                    ]
                },
                {
                    "type": "section",
                    "title": "1. What Looping Through an Array Means",
                    "code": "int[] numbers = {10, 20, 30, 40};",
                    "rich": "Traversal allows the program to process elements <code>10 → 20 → 30 → 40</code> automatically."
                },
                {
                    "type": "section",
                    "title": "2. Why Looping Is Needed",
                    "code": "for(int i = 0; i < numbers.length; i++) {\n    System.out.println(numbers[i]);\n}",
                    "rich": "Loops make your code <strong>scalable</strong> and adaptable to arrays of any size without manual repetition."
                },
                {
                    "type": "section",
                    "title": "3. Types of Array Traversal in Java",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Loop Type</th><th class="px-4 py-2">Description</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Traditional For Loop</td><td class="px-4 py-2">Uses index positions (0, 1, 2...)</td></tr>
<tr><td class="px-4 py-2 border-r">Enhanced For-Each Loop</td><td class="px-4 py-2">Iterates directly over values</td></tr>
</tbody>`)
                },
                {
                    "type": "section",
                    "title": "Visual Comparison",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/java_array_loop_comparison_1773496733461.png\" alt=\"Loop Comparison\" style=\"max-width: 80%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "4. Traditional For Loop",
                    "code": "int[] values = {5, 10, 15};\nfor(int i = 0; i < values.length; i++) {\n    System.out.println(values[i]);\n}",
                    "rich": "The loop uses an <strong>index variable</strong> <code>i</code> to access each slot from 0 to <code>length - 1</code>."
                },
                {
                    "type": "section",
                    "title": "5. Understanding the Loop Boundary",
                    "rich": "The rule <code>i < array.length</code> is critical. Writing <code>i <= array.length</code> will cause an <strong>ArrayIndexOutOfBoundsException</strong> because the last valid index is always length - 1."
                },
                {
                    "type": "section",
                    "title": "6. Enhanced For-Each Loop",
                    "code": "int[] numbers = {10, 20, 30};\nfor(int n : numbers) {\n    System.out.println(n);\n}",
                    "rich": "A simpler syntax that retrieves the <strong>value directly</strong>. It is cleaner and avoids manual index management errors."
                },
                {
                    "type": "section",
                    "title": "7. When to Use Each Loop",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Situation</th><th class="px-4 py-2">Best Loop</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Need index position</td><td class="px-4 py-2">Traditional loop</td></tr>
<tr><td class="px-4 py-2 border-r">Modify elements</td><td class="px-4 py-2">Traditional loop</td></tr>
<tr><td class="px-4 py-2 border-r">Just reading values</td><td class="px-4 py-2">Enhanced loop</td></tr>
<tr><td class="px-4 py-2 border-r">Maximum readability</td><td class="px-4 py-2">Enhanced loop</td></tr>
</tbody>`)
                },
                {
                    "type": "section",
                    "title": "8. Modifying Array Elements",
                    "code": "for(int i = 0; i < numbers.length; i++) {\n    numbers[i] = numbers[i] * 2;\n}",
                    "rich": "Only the <strong>traditional loop</strong> can modify elements. In a for-each loop, the value variable is a temporary copy and does not change the original array."
                },
                {
                    "type": "section",
                    "title": "9. Reverse Traversal",
                    "code": "for(int i = data.length - 1; i >= 0; i--) {\n    System.out.println(data[i]);\n}",
                    "rich": "Helpful for stack-like processing (LIFO) or undo operations. We start at <code>length - 1</code> and decrement <code>i</code>."
                },
                {
                    "type": "section",
                    "title": "10. Skipping Elements",
                    "code": "for(int i = 0; i < arr.length; i += 2) {\n    System.out.println(arr[i]);\n}",
                    "rich": "Using <code>i += 2</code> allows you to visit every second element (e.g., only even indices)."
                },
                {
                    "type": "section",
                    "title": "11. Searching Elements",
                    "code": "for(String u : users) {\n    if(u.equals(\"Admin\")) break;\n}",
                    "rich": "Traversal is the standard way to find data. The <strong>break</strong> statement stops the loop immediately once the target is found."
                },
                {
                    "type": "section",
                    "title": "12. Aggregation Operations",
                    "code": "int total = 0;\nfor(int p : prices) {\n    total += p;\n}",
                    "rich": "Common uses include calculating sums, averages, or finding the <strong>Maximum/Minimum</strong> values in a dataset."
                },
                {
                    "type": "section",
                    "title": "13. Parallel Array Traversal",
                    "code": "for(int i = 0; i < ids.length; i++) {\n    System.out.println(ids[i] + \" \" + names[i]);\n}",
                    "rich": "When processing two separate arrays that share the same indices, a traditional for loop is required to coordinate the access."
                },
                {
                    "type": "section",
                    "title": "14. Performance Considerations",
                    "rich": "Both loops run in <strong>O(n)</strong> time. Sequential memory access is cache-friendly, making array traversal one of the fastest operations in the JVM."
                },
                {
                    "type": "section",
                    "title": "15. Common Beginner Mistakes",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Mistake</th><th class="px-4 py-2">Consequence</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Off-by-One</td><td class="px-4 py-2 text-red-600">ArrayIndexOutOfBoundsException</td></tr>
<tr><td class="px-4 py-2 border-r">Modify in For-Each</td><td class="px-4 py-2">Original array remains unchanged</td></tr>
<tr><td class="px-4 py-2 border-r">Infinite Loop</td><td class="px-4 py-2 text-red-600">System hangs (missing increment)</td></tr>
</tbody>`)
                },
                {
                    "type": "section",
                    "title": "16. Memory-Level Behavior",
                    "rich": "Internally, Java calculates: <code>Index Address = Start + (i × size)</code>. Moving sequentially through these addresses is high-performance because the CPU pre-fetches the next elements into its cache."
                },
                {
                    "type": "section",
                    "title": "17. Professional Best Practices",
                    "rich": "Professional developers prefer <strong>for-each</strong> for simple reads and traditional loops only when index control (like modification or parallel access) is mandatory."
                },
                {
                    "type": "section",
                    "title": "18. Key Concepts Summary",
                    "list": [
                        "<strong>Traversal:</strong> Visiting every element sequentially.",
                        "<strong>Index Control:</strong> Traditional loops provide <code>i</code> for complex logic.",
                        "<strong>Readability:</strong> Enhanced loops provide a cleaner, safer syntax.",
                        "<strong>Efficiency:</strong> O(n) performance with sequential memory access."
                    ]
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Array Total<br/><br/>Initialize <code class=\"font-mono\">int[] nums = {1, 2, 3, 4};</code>. Use a <strong>for-each</strong> loop to sum them and print the final total.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Selective Print<br/><br/>Given <code class=\"font-mono\">int[] arr = {10, 20, 30, 40};</code>. Use a traditional <code class=\"font-mono\">for</code> loop to print only values at even indices (0, 2).",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Match & Count<br/><br/>Loop through <code class=\"font-mono\">{5, 2, 5, 1}</code>. Use a counter to print how many times <code class=\"font-mono\">5</code> appears.",
                    "hints": [
                        "Use an external int count = 0; and increment it inside the loop."
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Backwards Log<br/><br/>Given <code class=\"font-mono\">{1, 2, 3}</code>, print them in reverse order (3 then 2 then 1).",
                    "hints": [
                        "for (int i = arr.length - 1; i >= 0; i--)"
                    ],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "10",
                    "matchCode": "for\\s*\\([\\s\\S]*:[\\s\\S]*\\)"
                },
                {
                    "index": 2,
                    "match": "10[\\s\\S]*30",
                    "matchCode": "i\\s*\\+=\\s*2"
                },
                {
                    "index": 3,
                    "match": "2",
                    "matchCode": "=="
                },
                {
                    "index": 4,
                    "match": "3[\\s\\S]*2[\\s\\S]*1",
                    "matchCode": "--"
                }
            ]
        },
        {
            "title": "Multidimensional Arrays (Complete Concept Coverage)",
            "duration": "60 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "A multidimensional array is an <strong>array that stores other arrays</strong> as its elements. While 1D arrays represent lines, 2D arrays represent grids or tables, allowing you to model complex real-world data like maps, game boards, and spreadsheets."
                },
                {
                    "type": "section",
                    "title": "1. What a Multidimensional Array Is",
                    "code": "int[][] matrix;",
                    "rich": "Commonly described as an <strong>Array of Arrays</strong>, where the main array contains references to secondary arrays."
                },
                {
                    "type": "section",
                    "title": "2. Why Multidimensional Arrays Are Used",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Scenario</th><th class="px-4 py-2">Example Structure</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Spreadsheet</td><td class="px-4 py-2">Rows × Columns</td></tr>
<tr><td class="px-4 py-2 border-r">Game Board</td><td class="px-4 py-2">Grid (Chess/Sudoku)</td></tr>
<tr><td class="px-4 py-2 border-r">Image Pixels</td><td class="px-4 py-2">Width × Height</td></tr>
</tbody>`)
                },
                {
                    "type": "section",
                    "title": "3. Understanding Dimensions",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/java_multidimensional_dimensions_1773497241329.png\" alt=\"Array Dimensions\" style=\"max-width: 85%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "Dimensions Hierarchy",
                    "rich": "Dimensions represent levels of indexing. A <strong>1D array</strong> is a list, a <strong>2D array</strong> is a table, and a <strong>3D array</strong> is a cube."
                },
                {
                    "type": "section",
                    "title": "4. Structure of a 2D Array",
                    "code": "int[][] matrix = new int[2][3];",
                    "rich": "In a <code>[2][3]</code> matrix, Java creates 2 rows and 3 columns. Internally, a 'main' array of size 2 points to two separate arrays of size 3."
                },
                {
                    "type": "section",
                    "title": "5. Accessing Elements",
                    "code": "int[][] matrix = {\n    {10, 20, 30},\n    {40, 50, 60}\n};\nint val = matrix[0][1]; // Result: 20",
                    "rich": "Use the syntax <code>array[row][column]</code> to jump directly to any coordinate in the grid."
                },
                {
                    "type": "section",
                    "title": "6. Declaring Multidimensional Arrays",
                    "code": "datatype[][] arrayName;",
                    "rich": "This only creates the reference variable. No memory is allocated until the <code>new</code> keyword is used."
                },
                {
                    "type": "section",
                    "title": "7. Creating Multidimensional Arrays",
                    "code": "int[][] grid = new int[2][2];",
                    "rich": "Memory is allocated for a fixed grid. In this example, 4 integer slots are reserved (2x2)."
                },
                {
                    "type": "section",
                    "title": "8. Manual Initialization",
                    "code": "grid[0][0] = 1;\ngrid[1][1] = 4;",
                    "rich": "Each element can be assigned a value individually using its specific row/column coordinates."
                },
                {
                    "type": "section",
                    "title": "9. Literal (Inline) Initialization",
                    "code": "int[][] matrix = {\n    {1, 2, 3},\n    {4, 5, 6}\n};",
                    "rich": "A much cleaner and more readable way to define small matrices or game boards directly in the code."
                },
                {
                    "type": "section",
                    "title": "10. Traversing with Nested Loops",
                    "code": "for(int r = 0; r < matrix.length; r++) {\n    for(int c = 0; c < matrix[r].length; c++) {\n        System.out.print(matrix[r][c]);\n    }\n}",
                    "rich": "Use an <strong>outer loop</strong> for rows and an <strong>inner loop</strong> for columns to visit every cell in the grid."
                },
                {
                    "type": "section",
                    "title": "11. Row vs Column Length",
                    "code": "int rows = matrix.length;\nint cols = matrix[0].length;",
                    "rich": "<code>matrix.length</code> gives the number of rows. <code>matrix[i].length</code> gives the number of elements in that specific row."
                },
                {
                    "type": "section",
                    "title": "12. Jagged Arrays (Non-Rectangular)",
                    "rich": "<div class=\"my-4 text-center\"><img src=\"/public/images/java_jagged_array_structure_1773497261944.png\" alt=\"Jagged Array Structure\" style=\"max-width: 75%; margin: 0 auto;\" class=\"rounded-lg shadow-sm border border-gray-100\" /></div>"
                },
                {
                    "type": "section",
                    "title": "Jagged Array Logic",
                    "code": "int[][] jagged = new int[3][];\njagged[0] = new int[2];\njagged[1] = new int[5];",
                    "rich": "Java allows rows to have <strong>different sizes</strong>. This is highly memory-efficient for data that naturally varies in length."
                },
                {
                    "type": "section",
                    "title": "13. Jagged Array Literals",
                    "code": "int[][] jagged = {\n    {1, 2},\n    {3, 4, 5},\n    {6}\n};",
                    "rich": "Defining uneven rows directly using nested curly braces."
                },
                {
                    "type": "section",
                    "title": "14. Arrays of Objects",
                    "code": "String[][] cities = {\n    {\"New York\", \"Boston\"},\n    {\"London\", \"Paris\"}\n};",
                    "rich": "Multidimensional arrays work for any type, including <code>String</code>, storing references to objects in memory."
                },
                {
                    "type": "section",
                    "title": "15. Java Memory Model",
                    "rich": "Unlike C++, Java doesn't store 2D arrays as a single block. It stores a main array of <strong>references</strong>, which point to various child arrays scattered in memory."
                },
                {
                    "type": "section",
                    "title": "16. Higher-Dimensional Arrays",
                    "code": "int[][][] cube = new int[3][3][3];",
                    "rich": "Used in 3D graphics and complex simulations. Every set of brackets <code>[]</code> adds a new layer of depth."
                },
                {
                    "type": "section",
                    "title": "17. Common Mistakes",
                    "rich": TABLE(`<thead><tr class="bg-gray-50 border-b"><th class="px-4 py-2 border-r">Mistake</th><th class="px-4 py-2">Consequence</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r">Missing sub-array init</td><td class="px-4 py-2 text-red-600">NullPointerException</td></tr>
<tr><td class="px-4 py-2 border-r">Wrong loop limits</td><td class="px-4 py-2 text-red-600">ArrayIndexOutOfBoundsException</td></tr>
</tbody>`)
                },
                {
                    "type": "section",
                    "title": "18. Performance & Complexity",
                    "rich": "Access time is <strong>O(1)</strong>. Traversal time is <strong>O(R × C)</strong>, where R is rows and C is columns."
                },
                {
                    "type": "section",
                    "title": "19. Real-World Applications",
                    "list": [
                        "<strong>Game Engines:</strong> Storing maps and voxel grids.",
                        "<strong>Image Processing:</strong> Manipulating individual pixel segments.",
                        "<strong>Data Science:</strong> Performing matrix math and linear algebra."
                    ]
                },
                {
                    "type": "section",
                    "title": "20. Professional Best Practices",
                    "rich": "Always use <code>matrix[r].length</code> in inner loops to handle jagged structures safely. Prefer jagged arrays when data size varies to conserve JVM heap memory."
                },
                {
                    "type": "section",
                    "title": "Key Concepts Summary",
                    "list": [
                        "2D arrays represent <strong>tabular data</strong> using Row/Column logic.",
                        "Access syntax is <code>arr[row][col]</code>.",
                        "<strong>Jagged Arrays</strong> allow rows of different lengths.",
                        "Memory is stored as an <strong>array of references</strong>."
                    ]
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Map Pointer<br/><br/>Create a 2D integer array <code class=\"font-mono\">matrix</code> with 2 rows and 2 columns. Set the value at <code class=\"font-mono\">[0][1]</code> to <code class=\"font-mono\">50</code> and print it.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Jagged Length<br/><br/>Create a jagged array <code class=\"font-mono\">j</code> with 2 rows. Allocate Row 0 with 3 slots. Print the length of the main array.",
                    "hints": [
                        "int[][] j = new int[2][]; j[0] = new int[3];"
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Corner Sum<br/><br/>Given <code class=\"font-mono\">int[][] g = {{1, 0}, {0, 9}};</code>. Print the sum of <code class=\"font-mono\">g[0][0]</code> and <code class=\"font-mono\">g[1][1]</code>.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Row Depth<br/><br/>Given <code class=\"font-mono\">int[][] n = {{1, 2, 3}, {4, 5}};</code>. Print the length of the second row.",
                    "hints": [
                        "n[1].length"
                    ],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "50",
                    "matchCode": "new int\\[2\\]\\[2\\]"
                },
                {
                    "index": 2,
                    "match": "2",
                    "matchCode": "new int\\[2\\]\\[\\]"
                },
                {
                    "index": 3,
                    "match": "10",
                    "matchCode": "\\+"
                },
                {
                    "index": 4,
                    "match": "2",
                    "matchCode": "length"
                }
            ]
        }
    ]
}).catch(console.error);
