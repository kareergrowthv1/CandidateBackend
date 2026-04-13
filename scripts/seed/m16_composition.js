/** Module 16 — Composition (Has-A Relationship) */
const { seedModule } = require('./_helpers');

// Helper Functions
const WARNING = (text) => `<div class="mt-4 mb-6 p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl shadow-sm"><div class="flex items-start"><span class="text-rose-500 mr-3 text-lg">⚠️</span><div class="text-rose-900 font-medium text-sm leading-relaxed">${text}</div></div></div>`;
const NOTE = (text) => `<div class="mt-4 mb-6 p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl shadow-sm"><div class="flex items-start"><span class="text-sky-500 mr-3 text-lg">💡</span><div class="text-sky-900 font-medium text-sm leading-relaxed">${text}</div></div></div>`;

const SVG_OBJECT_CREATION = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-[#0F172A] p-4">
<svg width="100%" height="auto" viewBox="0 0 900 450" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
    <defs>
        <linearGradient id="bg-main-oc" x1="0" y1="0" x2="900" y2="450" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#0F172A" />
            <stop offset="100%" stop-color="#1E293B" />
        </linearGradient>
        <filter id="glow-oc">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.5" />
        </filter>
        <marker id="arrow-blue-oc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
        </marker>
    </defs>

    <rect width="900" height="450" fill="url(#bg-main-oc)" />

    <!-- Step 1: Declaration -->
    <g transform="translate(50, 80)">
        <rect width="250" height="300" rx="16" fill="#1E293B" stroke="#334155" stroke-width="1" />
        <text x="125" y="-15" fill="#94A3B8" font-family="monospace" font-size="12" text-anchor="middle" font-weight="bold">STEP 1: DECLARATION</text>
        <text x="125" y="40" fill="#38BDF8" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">Student s;</text>
        
        <rect x="25" y="80" width="200" height="60" rx="8" fill="#0F172A" stroke="#38BDF8" stroke-width="2" />
        <text x="125" y="105" fill="#64748B" font-family="monospace" font-size="10" text-anchor="middle">STACK (Reference)</text>
        <text x="50" y="130" fill="#F8FAFC" font-family="monospace" font-size="18" font-weight="bold">s</text>
        <rect x="120" y="115" width="80" height="20" rx="4" fill="#334155" />
        <text x="160" y="130" fill="#94A3B8" font-family="monospace" font-size="12" text-anchor="middle">null</text>
    </g>

    <!-- Step 2: Creation & Assignment -->
    <g transform="translate(450, 80)">
        <rect width="400" height="300" rx="16" fill="#1E293B" stroke="#10B981" stroke-width="1" fill-opacity="0.05" />
        <text x="200" y="-15" fill="#10B981" font-family="monospace" font-size="12" text-anchor="middle" font-weight="bold">STEP 2: CREATION & ASSIGNMENT</text>
        <text x="200" y="40" fill="#10B981" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">s = new Student();</text>

        <!-- Stack Updated -->
        <rect x="25" y="80" width="120" height="60" rx="8" fill="#0F172A" stroke="#38BDF8" stroke-width="2" />
        <text x="85" y="105" fill="#64748B" font-family="monospace" font-size="10" text-anchor="middle">STACK</text>
        <text x="45" y="130" fill="#F8FAFC" font-family="monospace" font-size="18" font-weight="bold">s</text>
        <circle cx="110" cy="125" r="6" fill="#10B981" filter="url(#glow-oc)" />

        <!-- Heap Object -->
        <rect x="220" y="150" width="150" height="100" rx="12" fill="#1E293B" stroke="#10B981" stroke-width="3" filter="url(#glow-oc)" />
        <text x="295" y="180" fill="#6EE7B7" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">Student Obj</text>
        <text x="295" y="215" fill="#94A3B8" font-family="monospace" font-size="12" text-anchor="middle">name = null</text>

        <!-- Assignment Arrow -->
        <path d="M116 125 C 160 125, 180 180, 212 200" stroke="#10B981" stroke-width="3" fill="none" marker-end="url(#arrow-blue-oc)" />
        <text x="160" y="165" fill="#10B981" font-family="Arial, sans-serif" font-size="11" font-weight="bold" text-anchor="middle" transform="rotate(25, 160, 165)">points to</text>
    </g>

    <text x="450" y="420" fill="#94A3B8" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" font-style="italic">"Reference variable lives in Stack, Object lives in Heap."</text>
</svg>
</div>
`;

const SVG_REUSABILITY_DELEGATION = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-[#0F172A] p-4">
<svg width="100%" height="auto" viewBox="0 0 900 480" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
    <defs>
        <linearGradient id="bg-main-re" x1="0" y1="0" x2="900" y2="480" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#0F172A" />
            <stop offset="100%" stop-color="#1E293B" />
        </linearGradient>
        <filter id="glow-re">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.5" />
        </filter>
        <marker id="arrow-blue-re" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
        </marker>
        <marker id="arrow-emerald-re" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
        </marker>
    </defs>

    <rect width="900" height="480" fill="url(#bg-main-re)" />

    <!-- External Caller -->
    <rect x="50" y="100" width="180" height="80" rx="12" fill="#1E293B" stroke="#38BDF8" stroke-width="2" filter="url(#glow-re)" />
    <text x="140" y="125" fill="#94A3B8" font-family="monospace" font-size="12" text-anchor="middle">Main()</text>
    <text x="140" y="155" fill="#F8FAFC" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">car.drive()</text>

    <!-- Outer Class: Car -->
    <rect x="320" y="80" width="240" height="280" rx="20" fill="#0F172A" stroke="#38BDF8" stroke-width="3" filter="url(#glow-re)" />
    <rect x="320" y="80" width="240" height="45" rx="18" fill="#38BDF8" fill-opacity="0.1" />
    <text x="440" y="110" fill="#7DD3FC" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle">Car object</text>
    
    <!-- drive() method box -->
    <rect x="345" y="145" width="190" height="180" rx="10" fill="#1E293B" stroke="#334155" stroke-width="1" />
    <text x="440" y="170" fill="#F8FAFC" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">drive() {</text>
    <text x="440" y="200" fill="#38BDF8" font-family="monospace" font-size="13" text-anchor="middle" font-weight="bold">engine.start();</text>
    <text x="440" y="225" fill="#94A3B8" font-family="monospace" font-size="11" text-anchor="middle">// Delegated work</text>
    <text x="440" y="280" fill="#F8FAFC" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">}</text>

    <!-- Inner Class: Engine -->
    <rect x="650" y="160" width="200" height="120" rx="16" fill="#1E293B" stroke="#10B981" stroke-width="3" filter="url(#glow-re)" />
    <rect x="650" y="160" width="200" height="35" rx="14" fill="#10B981" fill-opacity="0.1" />
    <text x="750" y="185" fill="#6EE7B7" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">Engine object</text>
    <text x="750" y="235" fill="#F8FAFC" font-family="monospace" font-size="14" text-anchor="middle">start() { ... }</text>

    <!-- Delegation Arrow -->
    <path d="M500 200 C 580 200, 600 200, 642 210" stroke="#10B981" stroke-width="4" fill="none" marker-end="url(#arrow-emerald-re)" />
    <text x="590" y="180" fill="#10B981" font-family="Arial, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">Delegation</text>

    <!-- Initial Call Arrow -->
    <path d="M230 145 C 270 145, 290 145, 312 145" stroke="#38BDF8" stroke-width="3" fill="none" marker-end="url(#arrow-blue-re)" />

    <!-- Bottom Legend -->
    <rect x="50" y="400" width="800" height="60" rx="12" fill="#1E293B" stroke="#334155" stroke-width="1" />
    <text x="450" y="435" fill="#94A3B8" font-family="Arial, sans-serif" font-size="14" text-anchor="middle">
        <tspan fill="#38BDF8" font-weight="bold">Code Reusability:</tspan> Car reuses Engine's logic by delegating internal tasks.
    </text>

</svg>
</div>
`;

const SVG_HAS_A_MEMORY = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-[#0F172A] p-4">
<svg width="100%" height="auto" viewBox="0 0 900 500" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
    <defs>
        <linearGradient id="bg-main-comp" x1="0" y1="0" x2="900" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#0F172A" />
            <stop offset="100%" stop-color="#1E293B" />
        </linearGradient>
        <linearGradient id="box-grad-stack" x1="0" y1="0" x2="200" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1E293B" />
            <stop offset="100%" stop-color="#334155" />
        </linearGradient>
        <filter id="glow-comp">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.5" />
        </filter>
        <marker id="arrow-blue-comp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
        </marker>
        <marker id="arrow-emerald-comp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
        </marker>
    </defs>

    <rect width="900" height="500" fill="url(#bg-main-comp)" />

    <!-- Stack Area -->
    <text x="120" y="60" fill="#38BDF8" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="2">STACK</text>
    <rect x="30" y="100" width="180" height="80" rx="12" fill="url(#box-grad-stack)" stroke="#38BDF8" stroke-width="2" filter="url(#glow-comp)" />
    <text x="120" y="125" fill="#94A3B8" font-family="monospace" font-size="12" text-anchor="middle">main()</text>
    <text x="120" y="155" fill="#F8FAFC" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">Car c</text>
    <circle cx="190" cy="150" r="6" fill="#38BDF8" />

    <!-- Heap Area -->
    <text x="550" y="60" fill="#10B981" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="2">HEAP MEMORY</text>
    
    <!-- Car Object -->
    <rect x="350" y="100" width="220" height="180" rx="16" fill="#1E293B" stroke="#38BDF8" stroke-width="3" filter="url(#glow-comp)" />
    <rect x="350" y="100" width="220" height="40" rx="14" fill="#38BDF8" fill-opacity="0.2" />
    <text x="460" y="126" fill="#7DD3FC" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">Car Object</text>
    
    <!-- Field inside Car -->
    <text x="375" y="180" fill="#94A3B8" font-family="monospace" font-size="12">Field:</text>
    <text x="375" y="210" fill="#F8FAFC" font-family="monospace" font-size="15" font-weight="bold">Engine engine</text>
    <circle cx="530" cy="205" r="5" fill="#10B981" />

    <!-- Engine Object -->
    <rect x="630" y="250" width="200" height="120" rx="16" fill="#1E293B" stroke="#10B981" stroke-width="3" filter="url(#glow-comp)" />
    <rect x="630" y="250" width="200" height="35" rx="14" fill="#10B981" fill-opacity="0.2" />
    <text x="730" y="273" fill="#6EE7B7" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">Engine Object</text>
    <text x="730" y="320" fill="#94A3B8" font-family="monospace" font-size="14" text-anchor="middle">start() method</text>


    <!-- Connection Arrows -->
    <!-- main c to Car Object -->
    <path d="M196 150 C 250 150, 300 150, 342 150" stroke="#38BDF8" stroke-width="3" fill="none" marker-end="url(#arrow-blue-comp)" />
    
    <!-- Car engine to Engine Object -->
    <path d="M535 205 C 600 205, 650 210, 680 242" stroke="#10B981" stroke-width="3" stroke-dasharray="6 4" fill="none" marker-end="url(#arrow-emerald-comp)" />

    <!-- Labels -->
    <text x="270" y="135" fill="#38BDF8" font-family="Arial, sans-serif" font-size="12" font-weight="bold">reference</text>
    <text x="580" y="190" fill="#10B981" font-family="Arial, sans-serif" font-size="12" font-weight="bold">composed of</text>

    <rect x="50" y="420" width="800" height="50" rx="8" fill="#10B981" fill-opacity="0.1" stroke="#10B981" stroke-width="1" stroke-dasharray="4 2" />
    <text x="450" y="450" fill="#6EE7B7" font-family="Arial, sans-serif" font-size="15" font-weight="bold" text-anchor="middle">"Has-A": Car object holds the reference to Engine object</text>

</svg>
</div>
`;

seedModule({
    moduleTitle: 'Composition',
    moduleOrder: 16,
    description: 'Master Has-A relationship, code reusability, and modular design through Composition.',
    label: 'COMPOSITION',
    lessons: [
        {
            title: 'Has-A Relationship',
            duration: '45 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\">A <strong>Has-A Relationship</strong> represents a scenario where one class contains an object of another class as a part of it.</p><div class=\"p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl mb-6 shadow-sm\"><p class=\"font-bold text-emerald-900 uppercase text-xs tracking-widest mb-1\">👉 In simple terms:</p><p class=\"text-emerald-800 font-medium italic\">One object \"has\" another object inside it</p></div><p class=\"text-sm text-slate-600 font-medium mb-6 uppercase tracking-widest\">This is also known as <strong>Composition</strong> (or Aggregation in some cases).</p>" },
                { "type": "section", "title": "2. Basic Understanding", "rich": "<ul class=\"list-disc ml-5 space-y-3 font-semibold text-slate-700 text-sm bg-slate-50 p-5 rounded-xl border\"><li>Instead of inheriting behavior, a class uses another class</li><li>It promotes code reuse and modular design</li><li>Objects are connected through references</li></ul>" },
                { "type": "section", "title": "3. Real-Life Example", "rich": "<div class=\"grid grid-cols-1 md:grid-cols-3 gap-4 mb-6\"><div class=\"p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-3\"><div class=\"w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600\">🚗</div><p class=\"text-sm font-bold text-slate-800 tracking-tight\">Car ➔ Engine</p></div><div class=\"p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-3\"><div class=\"w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600\">👨‍🎓</div><p class=\"text-sm font-bold text-slate-800 tracking-tight\">Student ➔ Address</p></div><div class=\"p-4 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-3\"><div class=\"w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600\">🏢</div><p class=\"text-sm font-bold text-slate-800 tracking-tight\">Company ➔ Employees</p></div></div>" },
                { "type": "section", "title": "4. Basic Code Example", "code": "class Engine {\n    void start() {\n        System.out.println(\"Engine Started\");\n    }\n}\n\nclass Car {\n    Engine engine = new Engine(); // Has-A relationship\n\n    void drive() {\n        engine.start();\n        System.out.println(\"Car is moving\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car c = new Car();\n        c.drive();\n    }\n}" },
                { "type": "section", "title": "Output", "rich": "<pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-emerald-500 mb-6\">Engine Started\nCar is moving</pre>" },
                { "type": "section", "title": "Explanation", "rich": "<ul class=\"list-none p-0 space-y-2 font-medium text-slate-700 bg-slate-50 p-4 border border-slate-200 rounded-xl mb-6\"><li><span class=\"text-emerald-500 mr-2\">✔</span> Car class contains an Engine object</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Car uses Engine functionality</li><li><span class=\"text-emerald-500 mr-2\">✔</span> This is Has-A relationship (Composition)</li></ul>" },
                { "type": "section", "title": "5. Memory Behavior (JVM Level)", "rich": "<div class=\"p-5 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-6\"><div class=\"flex flex-col md:flex-row gap-6\"><div class=\"flex-1\"><p class=\"text-[11px] font-black text-blue-400 uppercase tracking-widest mb-3\">Stack:</p><p class=\"text-sm font-mono p-3 bg-blue-50 rounded-lg border border-blue-100 text-blue-900\">c ➔ reference to Car object</p></div><div class=\"flex-1\"><p class=\"text-[11px] font-black text-emerald-400 uppercase tracking-widest mb-3\">Heap:</p><div class=\"text-sm font-mono p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-emerald-900 space-y-1\"><p>Car Object ➔ contains Engine reference</p><p>Engine Object ➔ actual engine instance</p></div></div></div><p class=\"mt-4 font-black p-3 bg-indigo-100 text-indigo-900 rounded-lg inline-block text-sm\">👉 Objects are nested through references</p></div>" },
                { "type": "section", "title": "Has-A Visualized", "rich": SVG_HAS_A_MEMORY },
                { "type": "section", "title": "6. Types of Has-A Relationship", "rich": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-6 mb-6\"><div class=\"p-5 bg-rose-50 border border-rose-200 rounded-2xl\"><p class=\"font-black text-rose-800 text-sm mb-2\">1. Composition (Strong)</p><p class=\"text-xs text-rose-600 mb-3 font-semibold tracking-tight uppercase\">Object cannot exist independently. Lifecycle tied to parent.</p><pre class=\"text-[11px] font-mono p-2 bg-white rounded border border-rose-100 mb-2\">class Heart { }\nclass Human {\n  private Heart h = new Heart();\n}</pre><p class=\"text-[10px] italic font-bold text-rose-900\">👉 Heart cannot exist without Human</p></div><div class=\"p-5 bg-amber-50 border border-amber-200 rounded-2xl\"><p class=\"font-black text-amber-800 text-sm mb-2\">2. Aggregation (Weak)</p><p class=\"text-xs text-amber-600 mb-3 font-semibold tracking-tight uppercase\">Object can exist independently.</p><pre class=\"text-[11px] font-mono p-2 bg-white rounded border border-amber-100 mb-2\">class Address { }\nclass Student {\n  Address addr;\n}</pre><p class=\"text-[10px] italic font-bold text-amber-900\">👉 Address exists even without Student</p></div></div>" },
                { "type": "section", "title": "7. Example: Aggregation", "code": "class Address {\n    String city;\n\n    Address(String city) {\n        this.city = city;\n    }\n}\n\nclass Student {\n    String name;\n    Address address;\n\n    Student(String name, Address address) {\n        this.name = name;\n        this.address = address;\n    }\n\n    void display() {\n        System.out.println(name + \" lives in \" + address.city);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Address addr = new Address(\"Bangalore\");\n        Student s = new Student(\"Sharan\", addr);\n\n        s.display();\n    }\n}" },
                { "type": "section", "title": "Output", "rich": "<pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-amber-500\">Sharan lives in Bangalore</pre>" },
                { "type": "section", "title": "8. Key Characteristics", "rich": "<ul class=\"list-none p-0 space-y-3 font-semibold text-slate-700 text-sm mb-6\"><li><span class=\"text-emerald-500 mr-2\">✔</span> Uses object reference inside class</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Promotes code reuse</li><li><span class=\"text-emerald-500 mr-2\">✔</span> More flexible than inheritance</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Reduces tight coupling</li></ul>" },
                { "type": "section", "title": "9. Composition vs Inheritance", "rich": "<div class=\"overflow-x-auto my-4 shadow-xl rounded-xl border border-slate-700 mb-6\"><table class=\"w-full text-xs sm:text-sm border-collapse text-left\"><thead><tr class=\"bg-slate-900 text-slate-300 font-black uppercase tracking-wider\"><th class=\"p-3 border-r border-slate-700\">Feature</th><th class=\"p-3 border-r border-slate-700 text-emerald-400\">Composition (Has-A)</th><th class=\"p-3 text-rose-400\">Inheritance (Is-A)</th></tr></thead><tbody class=\"bg-slate-800 text-slate-400 font-medium font-mono\"><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Relationship</td><td class=\"p-3 border-t border-r border-slate-700 tracking-widest text-[#10B981]\">Has-A</td><td class=\"p-3 border-t border-slate-700 tracking-widest text-[#F43F5E]\">Is-A</td></tr><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Flexibility</td><td class=\"p-3 border-t border-r border-slate-700\">High</td><td class=\"p-3 border-t border-slate-700\">Low</td></tr><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Reusability</td><td class=\"p-3 border-t border-r border-slate-700 text-[#10B981]\">Better</td><td class=\"p-3 border-t border-slate-700\">Limited</td></tr><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Coupling</td><td class=\"p-3 border-t border-r border-slate-700 text-[#10B981]\">Loose</td><td class=\"p-3 border-t border-slate-700 text-[#F43F5E]\">Tight</td></tr></tbody></table></div>" },
                { "type": "section", "title": "10. Advanced Example (Professional Design)", "code": "class Database {\n    void connect() {\n        System.out.println(\"DB Connected\");\n    }\n}\n\nclass Service {\n    private Database db;\n\n    Service(Database db) {\n        this.db = db;\n    }\n\n    void process() {\n        db.connect();\n        System.out.println(\"Processing...\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Database db = new Database();\n        Service service = new Service(db);\n\n        service.process();\n    }\n}" },
                { "type": "section", "title": "Output", "rich": "<pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-indigo-500 mb-6\">DB Connected\nProcessing...</pre>" },
                { "type": "section", "title": "11. Why Composition is Preferred", "rich": "<ul class=\"list-decimal ml-5 space-y-2 mb-6 font-medium text-sm text-slate-700 bg-sky-50 p-5 rounded-xl border\"><li>Avoids deep inheritance chains</li><li>Easier to maintain</li><li>Better for real-world modeling</li><li>Supports dependency injection</li></ul>" },
                { "type": "section", "title": "12. Common Mistakes", "rich": WARNING("<ul class=\"list-none p-0 space-y-2 text-sm font-medium mb-0\"><li>❌ Using inheritance instead of composition</li><li>❌ Creating tight coupling between objects</li><li>❌ Not initializing contained objects (NullPointerException)</li><li>❌ Confusing aggregation and composition</li></ul>") },
                { "type": "section", "title": "13. Real-World Usage", "rich": "<ul class=\"list-disc ml-5 space-y-3 font-semibold text-slate-700 text-sm bg-white p-5 rounded-xl border\"><li><strong>Spring Boot</strong> ➔ Services use Repositories</li><li><strong>UI</strong> ➔ Page has components</li><li><strong>Systems</strong> ➔ Modules composed of sub-modules</li></ul>" },
                { "type": "section", "title": "14. Deep Insight (Pro Level)", "rich": "<div class=\"p-5 border-l-4 border-slate-500 bg-slate-900 rounded-r-xl shadow-xl mb-6\"><p class=\"text-xs text-slate-400 font-black uppercase tracking-widest mb-3\">The Professional Stance:</p><ul class=\"list-none p-0 space-y-3 text-sm font-bold text-slate-300\"><li>✔ Composition supports <span class=\"text-sky-400 font-black tracking-tight\">\"Favor Composition over Inheritance\"</span></li><li>✔ Helps in building scalable architectures</li><li>✔ Core concept in Design Patterns (like Strategy, Decorator)</li></ul></div>" },
                { "type": "section", "title": "15. One-Line Master Rule", "rich": "<div class=\"p-6 bg-indigo-50 border border-indigo-200 rounded-2xl mb-6 shadow-sm\"><p class=\"text-lg font-black text-indigo-900 leading-relaxed text-center\">👉 If one class uses another class as a part, it is a Has-A relationship.</p></div>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic uppercase text-[10px] font-black tracking-widest\">Verify your understanding of Composition.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> In the 'Strong vs Weak' relationship rules, is a 'Heart' inside a 'Human' considered Composition or Aggregation? <br/><strong>Match Output:</strong> <code>Composition</code>", "hints": ["Lifestyle is tied to the parent."], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Does Composition promote 'Tight' or 'Loose' coupling between objects? <br/><strong>Match Output:</strong> <code>Loose</code>", "hints": ["Look at the Comparison Table (Feature: Coupling)."], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> In the 'Basic Code Example', which class contains an instance of the other class? (Car/Engine) <br/><strong>Match Output:</strong> <code>Car</code>", "hints": ["Car HAS-A Engine."], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "Composition", "matchCode": "Composition" },
                { "index": 2, "match": "Loose", "matchCode": "Loose" },
                { "index": 3, "match": "Car", "matchCode": "Car" }
            ]
        },
        {
            title: 'Creating Object References',
            duration: '45 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\"><strong>Creating Object References</strong> in Java means declaring a reference variable and linking it to an object in memory (Heap) using the <code>new</code> keyword or other reference assignment techniques.</p><div class=\"p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl mb-6 shadow-sm\"><p class=\"font-bold text-sky-900 uppercase text-xs tracking-widest mb-1\">👉 A reference variable:</p><ul class=\"list-none p-0 space-y-1 text-sky-800 font-medium italic\"><li>Does not store the object</li><li>Stores the memory address (reference) of the object</li></ul></div>" },
                { "type": "section", "title": "2. Concept Explanation", "rich": "<p class=\"mb-3 font-semibold text-slate-700\">In Java, object creation happens in two steps:</p><ol class=\"list-decimal ml-5 space-y-2 mb-6 font-medium text-slate-800\"><li><strong>Reference Declaration</strong> (Stack)</li><li><strong>Object Creation</strong> (Heap) + Assignment</li></ol><pre class=\"p-4 bg-slate-900 text-slate-300 rounded-xl font-mono text-sm border-l-4 border-slate-500 mb-6\">ClassName ref;\nref = new ClassName();\n\n// OR\n\nClassName ref = new ClassName();</pre>" },
                { "type": "section", "title": "3. Basic Example", "code": "class Student {\n    String name;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s = new Student();\n        s.name = \"Sharan\";\n\n        System.out.println(s.name);\n    }\n}" },
                { "type": "section", "title": "Output", "rich": "<pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-emerald-500 mb-6\">Sharan</pre>" },
                { "type": "section", "title": "Explanation", "rich": "<ul class=\"list-none p-0 space-y-2 font-medium text-slate-700 bg-slate-50 p-4 border border-slate-200 rounded-xl mb-6\"><li><span class=\"text-sky-500 mr-2\">✔</span> <code>Student s</code> ➔ creates reference variable in Stack</li><li><span class=\"text-sky-500 mr-2\">✔</span> <code>new Student()</code> ➔ creates object in Heap</li><li><span class=\"text-sky-500 mr-2\">✔</span> <code>s</code> stores reference (address) of that object</li><li><span class=\"text-sky-500 mr-2\">✔</span> <code>s.name</code> accesses object data</li></ul>" },
                { "type": "section", "title": "4. Memory Representation", "rich": SVG_OBJECT_CREATION },
                { "type": "section", "title": "Ways to Create Object References", "rich": "<div class=\"mb-4\"></div>" },
                { "type": "section", "title": "1. Direct Initialization", "code": "Student s = new Student();", "rich": "<p class=\"font-black text-emerald-700 bg-emerald-100 p-2 rounded inline-block text-[13px] mt-2\">👉 Most common and recommended</p>" },
                { "type": "section", "title": "2. Separate Declaration and Initialization", "code": "Student s;\ns = new Student();", "rich": "<p class=\"font-black text-amber-700 bg-amber-100 p-2 rounded inline-block text-[13px] mt-2\">👉 Useful when initialization depends on logic</p>" },
                { "type": "section", "title": "3. Multiple References to Same Object", "code": "Student s1 = new Student();\nStudent s2 = s1;", "rich": "<p class=\"font-black text-indigo-700 bg-indigo-100 p-2 rounded inline-block text-[13px] mt-2\">👉 Both refer to same object</p>" },
                { "type": "section", "title": "Example", "code": "class Test {\n    int value;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Test t1 = new Test();\n        t1.value = 10;\n\n        Test t2 = t1;\n        t2.value = 50;\n\n        System.out.println(t1.value);\n    }\n}" },
                { "type": "section", "title": "Output", "rich": "<pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-rose-500 mb-6\">50</pre><p class=\"text-sm font-medium text-slate-600 mb-6\">Explanation: <code>t1</code> and <code>t2</code> point to same object. Change via <code>t2</code> affects <code>t1</code>.</p>" },
                { "type": "section", "title": "4. Creating Multiple Objects", "code": "Student s1 = new Student();\nStudent s2 = new Student();", "rich": "<p class=\"font-black text-sky-700 bg-sky-100 p-2 rounded inline-block text-[13px] mt-2\">👉 Each reference points to a different object</p>" },
                { "type": "section", "title": "Example", "code": "class Data {\n    int x;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Data d1 = new Data();\n        Data d2 = new Data();\n\n        d1.x = 10;\n        d2.x = 20;\n\n        System.out.println(d1.x);\n        System.out.println(d2.x);\n    }\n}" },
                { "type": "section", "title": "Output", "rich": "<pre class=\"p-4 bg-black flex flex-col gap-1 text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-emerald-500 mb-6\"><span>10</span><span>20</span></pre>" },
                { "type": "section", "title": "5. Null Reference", "code": "Student s = null;", "rich": "<p class=\"font-black text-rose-700 bg-rose-100 p-2 rounded inline-block text-[13px] mt-2\">👉 No object assigned</p>" },
                { "type": "section", "title": "6. Anonymous Object", "code": "new Student().name = \"Temp\";", "rich": "<div class=\"p-3 bg-slate-100 rounded border border-slate-300 font-bold text-slate-700 text-xs mt-2\"><p>👉 Object without reference</p><p>👉 Cannot reuse it later</p></div>" },
                { "type": "section", "title": "7. Reference Passing (Method Use)", "code": "class Box {\n    int val;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Box b = new Box();\n        b.val = 10;\n\n        update(b);\n        System.out.println(b.val);\n    }\n\n    static void update(Box b) {\n        b.val = 100;\n    }\n}" },
                { "type": "section", "title": "Output", "rich": "<pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-indigo-500 mb-6\">100</pre>" },
                { "type": "section", "title": "Key Points", "rich": "<ul class=\"list-none p-0 space-y-3 font-semibold text-slate-700 text-sm mb-6\"><li><span class=\"text-emerald-500 mr-2\">✔</span> Reference stores address, not actual object</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Object lives in Heap</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Reference lives in Stack</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Multiple references can share one object</li><li><span class=\"text-emerald-500 mr-2\">✔</span> new keyword creates object</li></ul>" },
                { "type": "section", "title": "Common Mistakes", "rich": WARNING("<ul class=\"list-none p-0 space-y-2 text-sm font-medium mb-0 tracking-tight\"><li>❌ Thinking reference stores object</li><li>❌ Forgetting to use <code>new</code></li><li>❌ Accessing null reference</li><li>❌ Confusing object copy vs reference copy</li></ul>") },
                { "type": "section", "title": "Advanced Understanding", "rich": "<div class=\"overflow-x-auto my-4 shadow-xl rounded-xl border border-slate-700 mb-6\"><table class=\"w-full text-xs sm:text-sm border-collapse text-left\"><thead><tr class=\"bg-slate-900 text-slate-300 font-black uppercase tracking-wider\"><th class=\"p-3 border-r border-slate-700\">Concept</th><th class=\"p-3 text-emerald-400\">Description</th></tr></thead><tbody class=\"bg-slate-800 text-slate-400 font-medium font-mono\"><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white uppercase tracking-widest\">Reference</td><td class=\"p-3 border-t border-slate-700\">Address of object</td></tr><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white uppercase tracking-widest\">Object</td><td class=\"p-3 border-t border-slate-700\">Actual data</td></tr></tbody></table></div><div class=\"p-4 bg-sky-50 border border-sky-200 rounded-xl space-y-2 mb-6 font-black text-sky-900 text-xs\"> <p>Shallow vs Deep Behavior:</p><p>👉 s2 = s1 ➔ same object</p><p>👉 s2 = new Student() ➔ new object</p></div>" },
                { "type": "section", "title": "Tracing Example (Step-by-Step)", "code": "class Demo {\n    int num;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Demo d1 = new Demo();\n        d1.num = 5;\n\n        Demo d2 = d1;\n        d2.num = 10;\n\n        System.out.println(d1.num);\n    }\n}" },
                { "type": "section", "title": "Flow", "rich": "<ol class=\"list-decimal ml-5 space-y-2 font-medium text-slate-700 text-sm mb-6\"><li>Object created ➔ <code>num = 5</code></li><li><code>d2 = d1</code> ➔ same reference</li><li><code>d2 modifies</code> ➔ <code>num = 10</code></li><li><code>d1</code> sees updated value</li></ol><p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-indigo-500 mb-6\">10</pre>" },
                { "type": "section", "title": "Real-World Use", "rich": "<ul class=\"list-disc ml-5 space-y-2 font-semibold text-slate-700 text-sm mb-6\"><li>Creating service objects</li><li>Passing objects across layers</li><li>Managing shared data</li><li>Building complex systems (composition)</li></ul>" },
                { "type": "section", "title": "Deep JVM Insight", "rich": "<div class=\"p-5 bg-slate-900 border-l-4 border-slate-500 rounded-r-xl shadow-xl space-y-3 font-mono text-sm text-slate-300\"> <p><strong class=\"text-white tracking-widest\">Stack:</strong> stores references</p> <p><strong class=\"text-white tracking-widest\">Heap:</strong> stores actual objects</p> <p class=\"text-emerald-400\">Reference copy is fast</p> <p class=\"text-rose-400\">Object creation is costly</p> </div>" },
                { "type": "section", "title": "One-Line Master Rule", "rich": "<div class=\"p-6 bg-indigo-50 border border-indigo-200 rounded-2xl mb-6 shadow-sm\"><p class=\"text-lg font-black text-indigo-900 leading-relaxed text-center\">👉 Reference variables point to objects — they don’t store the actual data.</p></div>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic uppercase text-[10px] font-black tracking-widest\">Verify your understanding of Object References.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Does a reference variable store the actual Object or its memory address? <br/><strong>Match Output:</strong> <code>memory address</code>", "hints": ["Read Concept 1 Definition."], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> When you execute <code>Demo d2 = d1;</code>, are you creating a new object in Heap? (Yes/No) <br/><strong>Match Output:</strong> <code>No</code>", "hints": ["You are only copying the reference."], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Which keyword is used to create a new object in Heap? <br/><strong>Match Output:</strong> <code>new</code>", "hints": ["Points 1 & 5."], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "memory address", "matchCode": "memory address" },
                { "index": 2, "match": "No", "matchCode": "No" },
                { "index": 3, "match": "new", "matchCode": "new" }
            ]
        },
        {
            title: 'Code Reusability with Composition',
            duration: '40 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\"><strong>Code Reusability with Composition</strong> is a design technique in Java where one class uses another class as a part of its structure (Has-A relationship) to reuse its functionality instead of rewriting code.</p><div class=\"p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl mb-6 shadow-sm\"><p class=\"text-emerald-900 font-bold italic text-sm\">👉 Instead of inheriting behavior, we compose objects together.</p></div>" },
                { "type": "section", "title": "2. Core Understanding (Concept in Depth)", "rich": "<p class=\"mb-3 font-semibold text-slate-700\">In real-world systems, objects are rarely isolated. They are made up of smaller reusable components.</p><div class=\"mb-4 p-4 border rounded-xl bg-slate-50\"><p class=\"text-xs font-black text-slate-400 uppercase tracking-widest mb-3\">Examples:</p><ul class=\"list-none p-0 space-y-2 text-sm font-bold text-slate-800\"><li>🚗 A Car has an Engine</li><li>📍 A User has an Address</li><li>🏢 A Company has Employees</li></ul></div><p class=\"mb-3 font-medium text-slate-700 uppercase text-[11px] tracking-widest\">Instead of writing all logic inside one class, we:</p><ul class=\"list-disc ml-5 space-y-2 mb-6 font-medium text-slate-800\"><li>Create separate reusable classes</li><li>Combine them using object references</li></ul><div class=\"grid grid-cols-2 md:grid-cols-4 gap-3 mb-6\"><div class=\"p-3 bg-white border border-slate-200 rounded-xl text-center shadow-sm\"><p class=\"text-[10px] font-black text-emerald-500 mb-1\">✔ CLEANER</p><p class=\"text-xs font-bold\">Code</p></div><div class=\"p-3 bg-white border border-slate-200 rounded-xl text-center shadow-sm\"><p class=\"text-[10px] font-black text-blue-500 mb-1\">✔ BETTER</p><p class=\"text-xs font-bold text-nowrap\">Maintenance</p></div><div class=\"p-3 bg-white border border-slate-200 rounded-xl text-center shadow-sm\"><p class=\"text-[10px] font-black text-indigo-500 mb-1\">✔ HIGH</p><p class=\"text-xs font-bold\">Modularity</p></div><div class=\"p-3 bg-white border border-slate-200 rounded-xl text-center shadow-sm\"><p class=\"text-[10px] font-black text-sky-500 mb-1\">✔ EASY</p><p class=\"text-xs font-bold\">Testing</p></div></div>" },
                { "type": "section", "title": "3. Why Composition is Powerful", "rich": "<ul class=\"list-decimal ml-5 space-y-3 font-semibold text-slate-700 text-sm bg-white p-5 rounded-xl border\"><li>Reuse logic without inheritance</li><li>Change internal behavior without affecting other classes</li><li>Avoid tight coupling</li><li>Build scalable applications</li></ul><p class=\"mt-4 font-black p-3 bg-indigo-100 text-indigo-900 rounded-lg inline-block text-[13px] border border-indigo-200 shadow-sm\">👉 In modern Java (Spring Boot, Microservices), composition is preferred over inheritance</p>" },
                { "type": "section", "title": "4. Key Principles", "rich": "<div class=\"space-y-4 mb-6\"><div class=\"p-4 bg-sky-50 border border-sky-200 rounded-xl\"><p class=\"font-black text-sky-900 text-sm mb-1\">✔ Has-A Relationship</p><p class=\"text-xs text-sky-700 italic\">A class contains another class as a field. Example: Car has Engine.</p></div><div class=\"p-4 bg-emerald-50 border border-emerald-200 rounded-xl\"><p class=\"font-black text-emerald-900 text-sm mb-1\">✔ Delegation</p><p class=\"text-xs text-emerald-700 italic\">The outer class delegates work to the inner object.</p></div><div class=\"p-4 bg-indigo-50 border border-indigo-200 rounded-xl\"><p class=\"font-black text-indigo-900 text-sm mb-1\">✔ Loose Coupling</p><p class=\"text-xs text-indigo-700 italic\">Classes are independent and interchangeable.</p></div><div class=\"p-4 bg-slate-50 border border-slate-200 rounded-xl\"><p class=\"font-black text-slate-900 text-sm mb-1\">✔ Reusability</p><p class=\"text-xs text-slate-700 italic\">Same class can be reused in multiple places.</p></div></div>" },
                { "type": "section", "title": "5. Basic Example (Understanding Reuse)", "rich": "<div class=\"p-4 bg-slate-900 rounded-xl mb-4\"><p class=\"text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2\">Step 1: Create Reusable Class</p></div>", "code": "class Engine {\n    void start() {\n        System.out.println(\"Engine started\");\n    }\n}" },
                { "type": "section", "title": "Step 2: Use Composition", "code": "class Car {\n    Engine engine = new Engine(); // Composition\n\n    void drive() {\n        engine.start(); // Delegating work\n        System.out.println(\"Car is moving\");\n    }\n}" },
                { "type": "section", "title": "Step 3: Main Execution", "code": "public class Main {\n    public static void main(String[] args) {\n        Car c = new Car();\n        c.drive();\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-emerald-500 mb-6\">Engine started\nCar is moving</pre><div class=\"p-4 bg-slate-50 border rounded-xl text-xs font-medium text-slate-600 space-y-1\"><p>Car does not implement engine logic</p><p>It reuses Engine class</p><p>drive() calls engine.start()</p></div>" },
                { "type": "section", "title": "6. Real-World Example (Multiple Reuse)", "code": "class Address {\n    String city;\n\n    Address(String city) {\n        this.city = city;\n    }\n\n    void showAddress() {\n        System.out.println(\"City: \" + city);\n    }\n}\n\nclass Employee {\n    String name;\n    Address address; // Composition\n\n    Employee(String name, Address address) {\n        this.name = name;\n        this.address = address;\n    }\n\n    void display() {\n        System.out.println(\"Name: \" + name);\n        address.showAddress(); // Reuse\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-black text-xs text-slate-400\">(Main Class + Setup)</p>", "code": "public class Main {\n    public static void main(String[] args) {\n        Address addr = new Address(\"Bangalore\");\n        Employee emp = new Employee(\"Sharan\", addr);\n\n        emp.display();\n    }\n}" },
                { "type": "section", "title": "Output", "rich": "<pre class=\"p-4 bg-black flex flex-col gap-1 text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-emerald-500\"><span>Name: Sharan</span><span>City: Bangalore</span></pre><ul class=\"list-none p-0 mt-4 space-y-2 text-[13px] font-bold text-slate-600\"><li>✔ Address is reusable</li><li>✔ Many Employee objects can share or use it</li><li>✔ No duplication of address logic</li></ul>" },
                { "type": "section", "title": "7. Advanced Example (Swappable Components)", "code": "class Payment {\n    void pay() {\n        System.out.println(\"Generic Payment\");\n    }\n}\n\nclass CreditCard extends Payment {\n    void pay() {\n        System.out.println(\"Paid using Credit Card\");\n    }\n}\n\nclass UPI extends Payment {\n    void pay() {\n        System.out.println(\"Paid using UPI\");\n    }\n}\n\nclass Order {\n    Payment payment;\n\n    Order(Payment payment) {\n        this.payment = payment;\n    }\n\n    void processOrder() {\n        payment.pay(); // Reusable behavior\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-black text-xs text-slate-400\">(Main Execution)</p>", "code": "public class Main {\n    public static void main(String[] args) {\n        Order o1 = new Order(new CreditCard());\n        o1.processOrder();\n\n        Order o2 = new Order(new UPI());\n        o2.processOrder();\n    }\n}" },
                { "type": "section", "title": "Output", "rich": "<pre class=\"p-4 bg-black flex flex-col gap-1 text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-indigo-500 mb-6\"><span>Paid using Credit Card</span><span>Paid using UPI</span></pre><div class=\"flex flex-col gap-2 font-bold text-slate-700 text-[13px]\"><p>Order doesn’t care how payment works</p><p>It just uses the object</p><p class=\"text-indigo-600\">Behavior can be swapped easily ➔ powerful reuse</p></div>" },
                { "type": "section", "title": "8. Composition vs Inheritance (Important Insight)", "rich": "<div class=\"overflow-x-auto my-4 shadow-xl rounded-xl border border-slate-700\"><table class=\"w-full text-xs sm:text-sm border-collapse text-left\"><thead><tr class=\"bg-slate-900 text-slate-300 font-black uppercase tracking-wider\"><th class=\"p-3 border-r border-slate-700\">Aspect</th><th class=\"p-3 border-r border-slate-700 text-emerald-400\">Composition</th><th class=\"p-3 text-rose-400\">Inheritance</th></tr></thead><tbody class=\"bg-slate-800 text-slate-400 font-medium font-mono\"><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Relationship</td><td class=\"p-3 border-t border-r border-slate-700\">Has-A</td><td class=\"p-3 border-t border-slate-700\">Is-A</td></tr><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Flexibility</td><td class=\"p-3 border-t border-r border-slate-700 text-emerald-400\">High</td><td class=\"p-3 border-t border-slate-700 text-rose-400\">Low</td></tr><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Reusability</td><td class=\"p-3 border-t border-r border-slate-700 text-emerald-400\">Better</td><td class=\"p-3 border-t border-slate-700\">Limited</td></tr><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Coupling</td><td class=\"p-3 border-t border-r border-slate-700 text-emerald-400\">Loose</td><td class=\"p-3 border-t border-slate-700 text-rose-400\">Tight</td></tr><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Change Impact</td><td class=\"p-3 border-t border-r border-slate-700\">Low</td><td class=\"p-3 border-t border-slate-700\">High</td></tr></tbody></table></div><p class=\"mt-4 font-black p-3 bg-indigo-100 text-indigo-900 rounded-lg inline-block text-[13px]\">👉 Rule: Prefer Composition over Inheritance</p>" },
                { "type": "section", "title": "9. Memory Perspective (JVM View)", "rich": SVG_REUSABILITY_DELEGATION + "<ul class=\"list-none p-0 space-y-2 mt-4 text-[13px] font-semibold text-slate-700\"><li>✔ Stack: <code>emp</code> ➔ reference</li><li>✔ Heap: <code>Employee Object</code> ➔ contains reference ➔ <code>Address Object</code></li><li>✔ Objects are linked, not duplicated</li><li>✔ Efficient memory usage</li></ul>" },
                { "type": "section", "title": "10. Common Mistakes", "rich": WARNING("<ul class=\"list-none p-0 space-y-2 text-sm font-medium mb-0 tracking-tight\"><li>❌ Creating objects inside methods repeatedly (wastes memory)</li><li>❌ Tight coupling (hardcoding dependencies)</li><li>❌ Not using constructors for dependency injection</li><li>❌ Confusing composition with inheritance</li></ul>") },
                { "type": "section", "title": "11. Real Industry Usage", "rich": "<ul class=\"list-decimal ml-5 space-y-2 font-semibold text-slate-700 text-sm bg-sky-50 p-5 rounded-xl border\"><li>Spring Boot (Dependency Injection)</li><li>Microservices architecture</li><li>UI component systems</li><li>Game engines</li><li>Design Patterns (Strategy, Decorator)</li></ul>" },
                { "type": "section", "title": "12. Key Takeaway", "rich": "<div class=\"p-6 bg-slate-900 rounded-2xl shadow-xl text-center border-b-4 border-indigo-500\"><p class=\"text-white font-black italic text-lg leading-relaxed\">Composition helps you build modular, reusable, and flexible systems without inheritance redundancy.</p></div>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic uppercase text-[10px] font-black\">Verify your module reusability expertise.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Does Composition promote 'Tight Coupling' or 'Loose Coupling'? <br/><strong>Match Output:</strong> <code>Loose Coupling</code>", "hints": ["Look at Point 4 Key Principles."], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> In modern Java (Spring, Microservices), which is generally preferred: Composition or Inheritance? <br/><strong>Match Output:</strong> <code>Composition</code>", "hints": ["Look at Point 3 or 8."], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> In the 'Advanced Example (Swappable Components)', if we add a new payment method, do we need to change the <code>Order</code> class code? (Yes/No) <br/><strong>Match Output:</strong> <code>No</code>", "hints": ["Composition allows swapping behavior easily without changing the container class."], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "Loose Coupling", "matchCode": "Loose Coupling" },
                { "index": 2, "match": "Composition", "matchCode": "Composition" },
                { "index": 3, "match": "No", "matchCode": "No" }
            ]
        }
    ]
}).catch(console.error);
