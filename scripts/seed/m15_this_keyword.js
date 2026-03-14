const { seedModule, TABLE } = require('./_helpers');
seedModule({
    moduleTitle: 'Using this Keyword',
    moduleOrder: 15,
    description: 'Instance reference, shadowing, chaining, context.',
    label: 'THIS_KEYWORD',
    lessons: [
        {
            "title": "Introduction to this Keyword",
            "duration": "45 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "The <strong>this</strong> keyword in Java is a reference variable that points to the <strong>current object instance</strong>. It is the object's way of referring to itself. When a method is called, the JVM secretly passes a reference to the invoking object, allowing the method to access its own fields and other methods. It acts as a bridge between the static class blueprint and the living, breathing object in memory."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Implicit Pointer:</strong> Every non-static method has access to <code>this</code>, representing 'the object that called me'.",
                        "<strong>Instance Scope:</strong> It cannot be used in a <code>static</code> context because static members belong to the class, not an instance.",
                        "<strong>Memory Alias:</strong> <code>this</code> holds the exact same memory address as the reference variable used in the <code>main</code> method.",
                        "<strong>State Access:</strong> It provides a definitive path to instance variables even when local variables have similar names."
                    ]
                },
                {
                    "type": "section",
                    "title": "The 'Me' Perspective",
                    "rich": "Think of <code>this</code> like the pronoun 'I' or 'Me'. When a person says 'I am hungry', the word 'I' refers specifically to the person speaking at that moment. Similarly, when an object uses <code>this</code>, it refers to its own unique state."
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Utilizing instance reference."
                },
                {
                    "type": "section",
                    "title": "1. Instance Field Access",
                    "code": "void setAge(int age) {\n    this.age = age;\n}",
                    "rich": "<strong>How it works:</strong> Differentiating between the parameter 'age' and the object's permanent field 'age'."
                },
                {
                    "type": "section",
                    "title": "2. Context Passing",
                    "code": "void save() {\n    Database.persist(this);\n}",
                    "rich": "<strong>How it works:</strong> Passing the entire current object to an external service for processing or storage."
                },
                {
                    "type": "section",
                    "title": "3. Logger Identity",
                    "code": "void log() {\n    System.out.println(\"ID: \" + this.hashCode());\n}",
                    "rich": "<strong>How it works:</strong> Printing the unique identity of the specific object that is executing the code."
                },
                {
                    "type": "section",
                    "title": "4. Method Delegation",
                    "code": "void process() {\n    this.validate();\n    this.execute();\n}",
                    "rich": "<strong>How it works:</strong> Explicitly showing that <code>validate()</code> is an internal instance method of the same object."
                },
                {
                    "type": "section",
                    "title": "5. Event Listeners",
                    "code": "button.onClick(this);",
                    "rich": "<strong>How it works:</strong> Registering the current object as a handler for UI events, common in Android or Swing development."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Context Verification<br/><br/>Can the <code class=\"font-mono\">this</code> keyword be used inside a <code class=\"font-mono\">static</code> method? (Yes/No). Print the word.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Reference Identity<br/><br/>Does <code class=\"font-mono\">this</code> point to the **Class** or the **current Instance**? Print the answer.",
                    "hints": [
                        "It is about specific objects."
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Secret Parameter<br/><br/>True or False: Every non-static method receives an implicit parameter named <code class=\"font-mono\">this</code>. Print the boolean.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: HashCode Check<br/><br/>Will <code class=\"font-mono\">System.out.println(this);</code> and <code class=\"font-mono\">System.out.println(obj);</code> (where obj called the method) print the same reference? (Yes/No). Print the word.",
                    "hints": [],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "No",
                    "matchCode": ""
                },
                {
                    "index": 2,
                    "match": "Instance",
                    "matchCode": ""
                },
                {
                    "index": 3,
                    "match": "True",
                    "matchCode": ""
                },
                {
                    "index": 4,
                    "match": "Yes",
                    "matchCode": ""
                }
            ]
        },
        {
            "title": "Shadowing and this Keyword",
            "duration": "45 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "<strong>Variable Shadowing</strong> occurs when a local variable (usually a method parameter) has the same name as an instance field. In this scenario, the local variable 'hides' or 'shadows' the field, making it inaccessible by its simple name. The <code>this</code> keyword is the surgical tool used to peek through the shadow and explicitly target the instance variable."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Name Collision:</strong> Occurs frequently in constructors and setters where developers use logical names (like <code>id</code>) for both parameters and fields.",
                        "<strong>Explicit Scoping:</strong> Using <code>this.name</code> tells Java: 'I mean the field, NOT the parameter'.",
                        "<strong>Code Clarity:</strong> Allows for more readable code by maintaining consistent naming across the application.",
                        "<strong>Compiler Logic:</strong> Without <code>this</code>, an assignment like <code>name = name</code> just assigns the parameter to itself, leaving the field uninitialized."
                    ]
                },
                {
                    "type": "section",
                    "title": "Shadowing Matrix",
                    "rich": TABLE(`<thead><tr class="bg-indigo-50 border-b"><th class="px-4 py-2 border-r">Scenario</th><th class="px-4 py-2 border-r">Syntax</th><th class="px-4 py-2">Target Variable</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r border-b">Parameter Name Only</td><td class="px-4 py-2 border-r border-b"><code>name</code></td><td class="px-4 py-2 border-b">Local / Parameter</td></tr>
<tr><td class="px-4 py-2 border-r border-b">With this Prefixed</td><td class="px-4 py-2 border-r border-b"><code>this.name</code></td><td class="px-4 py-2 border-b">Instance / Field</td></tr>
</tbody>`) },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Resolving name conflicts."
                },
                {
                    "type": "section",
                    "title": "1. The Standard Setter",
                    "code": "void setId(int id) {\n    this.id = id;\n}",
                    "rich": "<strong>How it works:</strong> Correctly assigning a numeric ID from a parameter into the object's instance storage."
                },
                {
                    "type": "section",
                    "title": "2. Constructor Assignment",
                    "code": "User(String email) {\n    this.email = email;\n}",
                    "rich": "<strong>How it works:</strong> Ensuring the 'blueprint' data is locked into the 'object' instance during birth."
                },
                {
                    "type": "section",
                    "title": "3. Avoiding Self-Assignment",
                    "code": "void update(String data) {\n    data = data; // WRONG: Sets parameter to itself\n    this.data = data; // RIGHT\n}",
                    "rich": "<strong>How it works:</strong> Demonstrating the critical bug that occurs when <code>this</code> is forgotten."
                },
                {
                    "type": "section",
                    "title": "4. Nested Logic Clarity",
                    "code": "if(this.status == status) { ... }",
                    "rich": "<strong>How it works:</strong> Comparing a current object property (status field) with a requested change (status parameter)."
                },
                {
                    "type": "section",
                    "title": "5. Bulk Initializer",
                    "code": "void init(int x, int y, int z) {\n    this.x = x; this.y = y; this.z = z;\n}",
                    "rich": "<strong>How it works:</strong> Efficiently mapping multiple coordinates without needing complex variable suffixes like <code>x1, y1, z1</code>."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Fix Assignment<br/><br/>In <code class=\"font-mono\">setRate(double rate)</code>, the statement <code class=\"font-mono\">rate = rate;</code> does not update the field. Provide the correct line code.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Shadowing ID<br/><br/>If a parameter and field both have the name <code class=\"font-mono\">val</code>, what does the simple name <code class=\"font-mono\">val</code> refer to? (Local/Instance). Print the word.",
                    "hints": [
                        "Local variables 'win' by shadowing."
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Mandatory this<br/><br/>Is <code class=\"font-mono\">this</code> mandatory if the parameter name is **different** from the field name (e.g., <code class=\"font-mono\">setId(int n)</code>)? (Yes/No). Print the word.",
                    "hints": [
                        "It is technically optional if there is no conflict."
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Data Drift Prevention<br/><br/>True or False: Using <code class=\"font-mono\">this</code> makes code more maintainable by being explicit about memory scopes. Print the boolean.",
                    "hints": [],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "matchCode": "this\\.rate\\s*=\\s*rate",
                    "match": ""
                },
                {
                    "index": 2,
                    "match": "Local",
                    "matchCode": ""
                },
                {
                    "index": 3,
                    "match": "No",
                    "matchCode": ""
                },
                {
                    "index": 4,
                    "match": "True",
                    "matchCode": ""
                }
            ]
        },
        {
            "title": "Invoking Methods with this",
            "duration": "45 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "The <code>this</code> keyword can also be used to invoke other methods of the current class. While optional when there is no name conflict, using <code>this.methodName()</code> makes it explicitly clear to other developers that the method being called is an <strong>instance method</strong> of the same class. It reinforces the 'Self-invoking' nature of object behavior."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Internal Delegation:</strong> Allows one method to break down a complex task into smaller helper methods in the same class.",
                        "<strong>Context Reassurance:</strong> Ensures that the method being called belongs to the specific object instance currently executing.",
                        "<strong>Compiler Support:</strong> If you omit <code>this</code>, the compiler implicitly adds it during the bytecode generation phase.",
                        "<strong>Non-Static Constraint:</strong> You cannot use <code>this</code> to call a method from a <code>static</code> block or method."
                    ]
                },
                {
                    "type": "section",
                    "title": "Method Call Flow",
                    "rich": "Think of it as a person giving themselves instructions: 'I will <i>first</i> wash my hands, <i>then</i> I will eat'. The 'I' (this) connects the two actions to the same person."
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Orchestrating internal behaviors."
                },
                {
                    "type": "section",
                    "title": "1. Validation Chain",
                    "code": "void save() {\n    if(this.isValid()) {\n        this.commit();\n    }\n}",
                    "rich": "<strong>How it works:</strong> Ensuring that the specific object's data is valid before allowing it to save itself."
                },
                {
                    "type": "section",
                    "title": "2. State Logger",
                    "code": "void update() {\n    this.logState();\n    // execution logic\n}",
                    "rich": "<strong>How it works:</strong> Calling a 'side-effect' method like logging consistently across all state-change methods."
                },
                {
                    "type": "section",
                    "title": "3. UI Refresh",
                    "code": "void setVisible(boolean v) {\n    this.visibility = v;\n    this.repaint();\n}",
                    "rich": "<strong>How it works:</strong> Automatically triggering a screen update whenever an object's visual property changes."
                },
                {
                    "type": "section",
                    "title": "4. Dependency Flow",
                    "code": "void start() {\n    this.initResources();\n    this.runApp();\n}",
                    "rich": "<strong>How it works:</strong> Breaking a large 'start' process into specialized 'init' and 'run' steps for better maintenance."
                },
                {
                    "type": "section",
                    "title": "5. Permission Shield",
                    "code": "void delete() {\n    this.checkAdmin();\n    this.wipeData();\n}",
                    "rich": "<strong>How it works:</strong> Forcing a security check (checkAdmin) as the first step of a sensitive internal operation."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Call Identification<br/><br/>If you call <code class=\"font-mono\">display();</code> inside another method of the same class, what keyword is implicitly added by the compiler? Print it.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Static Method Call<br/><br/>Can you use <code class=\"font-mono\">this.print()</code> inside a <code class=\"font-mono\">public static void main</code>? (Yes/No). Print the word.",
                    "hints": [
                        "The main method has no instance context."
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Explicit Benefit<br/><br/>True or False: Using <code class=\"font-mono\">this.method()</code> can help avoid confusion if a local variable shares the same name as a method. Print the boolean.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Method Location<br/><br/>Where must a method be defined to be called using <code class=\"font-mono\">this</code>? (Same Class / Different Class). Print the answer.",
                    "hints": [],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "this",
                    "matchCode": ""
                },
                {
                    "index": 2,
                    "match": "No",
                    "matchCode": ""
                },
                {
                    "index": 3,
                    "match": "True",
                    "matchCode": ""
                },
                {
                    "index": 4,
                    "match": "Same Class",
                    "matchCode": ""
                }
            ]
        },
        {
            "title": "Constructor Chaining with this()",
            "duration": "45 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "<strong>Constructor Chaining</strong> is the process of calling one constructor from another constructor within the same class using the <code>this()</code> syntax. This is a powerful technique for reducing code duplication (DRY principle) and ensuring that shared initialization logic is kept in a single, central constructor. It allows for flexible object creation while maintaining a strict initialization path."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>First Statement Rule:</strong> A call to <code>this()</code> MUST be the very first line in the constructor body.",
                        "<strong>Signature Matching:</strong> The parameters passed to <code>this(...)</code> determine which constructor in the class is invoked.",
                        "<strong>Recursive Protection:</strong> Java forbids circular constructor calls (e.g., A calls B, and B calls A) to prevent infinite loops.",
                        "<strong>Logic Centralization:</strong> Typically, multiple constructors with few parameters chain to one 'Master' constructor with the most parameters."
                    ]
                },
                {
                    "type": "section",
                    "title": "The Relay Race Analogy",
                    "rich": "Think of constructors as runners in a relay race. One runner (constructor) takes the initial baton (start signal) but immediately passes it to the next runner (using <code>this()</code>) who knows the full route. This ensures the race is completed efficiently without every runner needing to know the entire path."
                },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Implementing DRY initialization."
                },
                {
                    "type": "section",
                    "title": "1. Default Value injection",
                    "code": "User() { this(\"Guest\"); } \nUser(String name) { this.name = name; }",
                    "rich": "<strong>How it works:</strong> The no-argument constructor automatically provides a default 'Guest' name by calling the parameterized one."
                },
                {
                    "type": "section",
                    "title": "2. Multi-Field Master",
                    "code": "Order(int id) { this(id, \"Pending\"); }\nOrder(int id, String s) { this.id = id; this.s = s; }",
                    "rich": "<strong>How it works:</strong> Ensuring that the 'status' field is always initialized, even if the caller only knows the ID."
                },
                {
                    "type": "section",
                    "title": "3. Security Layering",
                    "code": "Account(String u) { this(u, 0.0); }\nAccount(String u, double bal) { authenticate(); this.u = u; this.bal = bal; }",
                    "rich": "<strong>How it works:</strong> Forcing all paths to go through the master constructor where the <code>authenticate()</code> check is located."
                },
                {
                    "type": "section",
                    "title": "4. Performance Optimization",
                    "code": "Image(Path p) { this(p, 1024, 768); }\nImage(Path p, int w, int h) { load(p, w, h); }",
                    "rich": "<strong>How it works:</strong> Setting standard high-resolution defaults while still allowing power users to specify custom dimensions."
                },
                {
                    "type": "section",
                    "title": "5. Type Conversion Bridge",
                    "code": "Point(String s) { this(Integer.parseInt(s)); }\nPoint(int x) { this.x = x; }",
                    "rich": "<strong>How it works:</strong> Allowing a constructor to accept a String input, parse it, and then delegate to the numeric constructor."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Position Rule<br/><br/>If you use <code class=\"font-mono\">this()</code>, which line of the constructor must it occupy? (First/Any). Print the word.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Syntax Check<br/><br/>Which syntax is used to call another constructor in the same class: <code class=\"font-mono\">this.Constructor()</code> or <code class=\"font-mono\">this()</code>? Print the correct one.",
                    "hints": [
                        "It looks like a method call without a name."
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Parameter Matching<br/><br/>If you call <code class=\"font-mono\">this(5, \"A\");</code>, will Java call a constructor with (String, int) or (int, String)? Print the types in order.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Super Conflict<br/><br/>True or False: A constructor can contain BOTH <code class=\"font-mono\">this()</code> and <code class=\"font-mono\">super()</code> at the same time. Print the boolean.",
                    "hints": [
                        "Both must be the first line... only one can win."
                    ],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "First",
                    "matchCode": ""
                },
                {
                    "index": 2,
                    "match": "this()",
                    "matchCode": ""
                },
                {
                    "index": 3,
                    "match": "int, String",
                    "matchCode": ""
                },
                {
                    "index": 4,
                    "match": "False",
                    "matchCode": ""
                }
            ]
        },
        {
            "title": "this as a Return Type",
            "duration": "45 min",
            "sections": [
                {
                    "type": "section",
                    "title": "Lesson Description",
                    "rich": "The <code>return this;</code> statement allows a method to return a reference to the <strong>current object instance</strong>. This is the foundation of the <strong>Fluent Interface</strong> or <strong>Method Chaining</strong> pattern, ubiquitous in modern Java libraries like Stream API, Builders, and Testing frameworks (AssertJ). It allows code to be read like a sentence, making it more expressive and reducing boilerplate."
                },
                {
                    "type": "section",
                    "title": "Key Highlights",
                    "list": [
                        "<strong>Fluent API:</strong> Enables chaining like <code>obj.setName().setAge().save();</code>.",
                        "<strong>Reference Preservation:</strong> The same object address travels through every link in the chain.",
                        "<strong>Return Type:</strong> The method signature must specify the Class name as the return type to enable chaining.",
                        "<strong>UI/Builder Pattern:</strong> Heavily used in building complex objects where many parameters need to be set sequentially."
                    ]
                },
                {
                    "type": "section",
                    "title": "Comparison Table",
                    "rich": TABLE(`<thead><tr class="bg-indigo-50 border-b"><th class="px-4 py-2 border-r">Feature</th><th class="px-4 py-2 border-r">Standard Setter</th><th class="px-4 py-2">Fluent Setter</th></tr></thead><tbody>
<tr><td class="px-4 py-2 border-r border-b">Return Type</td><td class="px-4 py-2 border-r border-b"><code>void</code></td><td class="px-4 py-2 border-b">The Class Name</td></tr>
<tr><td class="px-4 py-2 border-r border-b">Return Statement</td><td class="px-4 py-2 border-r border-b">None</td><td class="px-4 py-2 border-b"><code>return this;</code></td></tr>
<tr><td class="px-4 py-2 border-r border-b">Usage</td><td class="px-4 py-2 border-r border-b">Multiple Lines</td><td class="px-4 py-2 border-b">Single Chained Line</td></tr>
</tbody>`) },
                {
                    "type": "section",
                    "title": "Five Practical Implementation Examples",
                    "rich": "Building fluent interfaces."
                },
                {
                    "type": "section",
                    "title": "1. Simple Method Chain",
                    "code": "User setName(String n) { this.name = n; return this; }",
                    "rich": "<strong>How it works:</strong> After setting the name, the object hands itself back so the caller can immediately call <code>setAge()</code>."
                },
                {
                    "type": "section",
                    "title": "2. Database Query Builder",
                    "code": "Query select(String f) { ... return this; }\nQuery where(String c) { ... return this; }",
                    "rich": "<strong>How it works:</strong> Standard pattern for constructing SQL queries programmatically: <code>q.select(\"*\").where(\"id=1\").exec();</code>"
                },
                {
                    "type": "section",
                    "title": "3. Calculation Chain",
                    "code": "Calc add(int n) { this.v += n; return this; }\nCalc mul(int n) { this.v *= n; return this; }",
                    "rich": "<strong>How it works:</strong> Performing a sequence of math operations: <code>calc.add(5).mul(2).print();</code>"
                },
                {
                    "type": "section",
                    "title": "4. Builder Pattern Base",
                    "code": "Pizza setSize(int s) { this.s = s; return this; }\nPizza addTopping(String t) { this.t.add(t); return this; }",
                    "rich": "<strong>How it works:</strong> Building a pizza object link by link: <code>new Pizza().setSize(12).addTopping(\"Cheese\");</code>"
                },
                {
                    "type": "section",
                    "title": "5. Validation Guard",
                    "code": "Auth verify() { if(!u) throw e; return this; }",
                    "rich": "<strong>How it works:</strong> verifying credentials and then passing the 'vetted' object onto the next secured method."
                },
                {
                    "type": "section",
                    "title": "Instructions"
                },
                {
                    "type": "task",
                    "value": "Task: Return Syntax<br/><br/>To return the current object from a method, which statement is used? Print the full statement.",
                    "hints": [],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Resulting Pattern<br/><br/>What is the name of the design pattern that uses <code class=\"font-mono\">return this;</code> to enable <code class=\"font-mono\">obj.a().b().c();</code>? Print the word.",
                    "hints": [
                        "Think of water flowing."
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Return Type Change<br/><br/>If a setter returns <code class=\"font-mono\">this</code>, what must its return type be changed from <code class=\"font-mono\">void</code> to? (The Class Name / Object). Print the better answer.",
                    "hints": [
                        "Using the specific Class name allows specialized methods to be reachable."
                    ],
                    "points": 10
                },
                {
                    "type": "task",
                    "value": "Task: Context Consistency<br/><br/>True or False: In a chain <code class=\"font-mono\">obj.a().b();</code>, both <code class=\"font-mono\">a()</code> and <code class=\"font-mono\">b()</code> execute on the same memory address. Print the boolean.",
                    "hints": [],
                    "points": 10
                }
            ],
            "validation": [
                {
                    "index": 1,
                    "match": "return this;",
                    "matchCode": ""
                },
                {
                    "index": 2,
                    "match": "Fluent",
                    "matchCode": ""
                },
                {
                    "index": 3,
                    "match": "The Class Name",
                    "matchCode": ""
                },
                {
                    "index": 4,
                    "match": "True",
                    "matchCode": ""
                }
            ]
        },
    ],
}).catch(console.error);
