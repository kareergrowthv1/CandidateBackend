/** Module 15 — Pass by Reference */
const { seedModule } = require('./_helpers');

// Helper Functions
const WARNING = (text) => `<div class="mt-4 mb-6 p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl shadow-sm"><div class="flex items-start"><span class="text-rose-500 mr-3 text-lg">⚠️</span><div class="text-rose-900 font-medium text-sm leading-relaxed">${text}</div></div></div>`;
const NOTE = (text) => `<div class="mt-4 mb-6 p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl shadow-sm"><div class="flex items-start"><span class="text-sky-500 mr-3 text-lg">💡</span><div class="text-sky-900 font-medium text-sm leading-relaxed">${text}</div></div></div>`;

const SVG_REFERENCE_HANDLING = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-[#0F172A] p-4">
<svg width="100%" height="auto" viewBox="0 0 900 450" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
    <defs>
        <linearGradient id="bg-main-rh" x1="0" y1="0" x2="900" y2="450" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#0F172A" />
            <stop offset="100%" stop-color="#1E293B" />
        </linearGradient>
        <linearGradient id="box-grad-rh" x1="0" y1="0" x2="200" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1E293B" />
            <stop offset="100%" stop-color="#334155" />
        </linearGradient>
        <filter id="glow-rh">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.5" />
        </filter>
        <marker id="arrow-green-rh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
        </marker>
        <marker id="arrow-blue-rh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
        </marker>
    </defs>

    <rect width="900" height="450" fill="url(#bg-main-rh)" />

    <!-- Heap Area -->
    <rect x="500" y="50" width="350" height="350" rx="16" fill="#0F172A" stroke="#10B981" stroke-width="2" stroke-dasharray="8 4" filter="url(#glow-rh)" />
    <text x="675" y="80" fill="#10B981" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="2">HEAP MEMORY</text>

    <!-- User Object in Heap -->
    <rect x="550" y="150" width="250" height="150" rx="12" fill="#1E293B" stroke="#10B981" stroke-width="3" filter="url(#glow-rh)" />
    <rect x="550" y="150" width="250" height="40" rx="10" fill="#10B981" fill-opacity="0.2" />
    <text x="675" y="176" fill="#6EE7B7" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">User Object</text>

    <!-- State inside Object -->
    <text x="675" y="240" fill="#10B981" font-family="monospace" font-size="28" font-weight="bold" text-anchor="middle">name = "John"</text>

    <!-- Stack Area -->
    <text x="160" y="80" fill="#38BDF8" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="2">STACK MEMORY</text>

    <!-- Stack: main() -->
    <rect x="50" y="120" width="220" height="220" rx="12" fill="url(#box-grad-rh)" stroke="#38BDF8" stroke-width="2" filter="url(#glow-rh)" />
    <rect x="50" y="120" width="220" height="35" rx="10" fill="#38BDF8" fill-opacity="0.2" />
    <text x="160" y="143" fill="#BAE6FD" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">main()</text>

    <!-- u1 Ref -->
    <text x="80" y="210" fill="#F8FAFC" font-family="monospace" font-size="18" font-weight="bold">u1</text>
    <circle cx="150" cy="205" r="8" fill="#38BDF8" />

    <!-- u2 Ref -->
    <text x="80" y="290" fill="#F8FAFC" font-family="monospace" font-size="18" font-weight="bold">u2</text>
    <circle cx="150" cy="285" r="8" fill="#10B981" />

    <!-- Connection Arrows -->
    <!-- u1 to Heap -->
    <path d="M160 205 C 320 205, 420 200, 535 220" stroke="#38BDF8" stroke-width="4" fill="none" marker-end="url(#arrow-blue-rh)" />
    
    <!-- u2 to Heap -->
    <path d="M160 285 C 320 285, 420 250, 535 230" stroke="#10B981" stroke-width="4" stroke-dasharray="6 4" fill="none" marker-end="url(#arrow-green-rh)" />
    
    <!-- Code Annotations -->
    <text x="350" y="190" fill="#38BDF8" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">new User()</text>
    <text x="350" y="310" fill="#10B981" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">u2 = u1 (copy ref)</text>

</svg>
</div>
`;

const SVG_BEHAVIOR_SHARING = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-[#0F172A] p-4">
<svg width="100%" height="auto" viewBox="0 0 900 500" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
    <defs>
        <linearGradient id="bg-main-sh" x1="0" y1="0" x2="900" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#0F172A" />
            <stop offset="100%" stop-color="#1E293B" />
        </linearGradient>
        <linearGradient id="box-grad" x1="0" y1="0" x2="200" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1E293B" />
            <stop offset="100%" stop-color="#334155" />
        </linearGradient>
        <filter id="glow-sh">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.5" />
        </filter>
        <marker id="arrow-blue-sh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
        </marker>
        <marker id="arrow-green-sh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
        </marker>
    </defs>

    <rect width="900" height="500" fill="url(#bg-main-sh)" />

    <!-- Heap Area -->
    <rect x="500" y="50" width="350" height="400" rx="16" fill="#0F172A" stroke="#10B981" stroke-width="2" stroke-dasharray="8 4" filter="url(#glow-sh)" />
    <text x="675" y="80" fill="#10B981" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="2">HEAP MEMORY</text>

    <!-- Student Object in Heap -->
    <rect x="550" y="150" width="250" height="200" rx="12" fill="#1E293B" stroke="#10B981" stroke-width="3" filter="url(#glow-sh)" />
    <rect x="550" y="150" width="250" height="40" rx="10" fill="#10B981" fill-opacity="0.2" />
    <text x="675" y="176" fill="#6EE7B7" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">Student Object</text>

    <!-- State inside Object -->
    <text x="675" y="230" fill="#94A3B8" font-family="monospace" font-size="16" text-anchor="middle" text-decoration="line-through">marks = 50</text>
    <text x="675" y="280" fill="#10B981" font-family="monospace" font-size="28" font-weight="bold" text-anchor="middle">marks = 90</text>
    <text x="675" y="320" fill="#34D399" font-family="Arial, sans-serif" font-size="13" font-style="italic" text-anchor="middle">Shared across 3 references</text>


    <!-- Stack Area -->
    <text x="160" y="80" fill="#38BDF8" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="2">STACK MEMORY</text>

    <!-- Stack: main() -->
    <rect x="50" y="120" width="220" height="150" rx="12" fill="url(#box-grad)" stroke="#38BDF8" stroke-width="2" filter="url(#glow-sh)" />
    <rect x="50" y="120" width="220" height="35" rx="10" fill="#38BDF8" fill-opacity="0.2" />
    <text x="160" y="143" fill="#BAE6FD" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">main()</text>

    <text x="80" y="190" fill="#F8FAFC" font-family="monospace" font-size="16" font-weight="bold">s1 (ref)</text>
    <circle cx="180" cy="185" r="6" fill="#38BDF8" />

    <text x="80" y="235" fill="#F8FAFC" font-family="monospace" font-size="16" font-weight="bold">s2 (copy)</text>
    <circle cx="180" cy="230" r="6" fill="#38BDF8" />


    <!-- Stack: update() -->
    <rect x="50" y="310" width="220" height="100" rx="12" fill="url(#box-grad)" stroke="#10B981" stroke-width="2" filter="url(#glow-sh)" />
    <rect x="50" y="310" width="220" height="35" rx="10" fill="#10B981" fill-opacity="0.2" />
    <text x="160" y="333" fill="#6EE7B7" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">update()</text>

    <text x="80" y="375" fill="#F8FAFC" font-family="monospace" font-size="16" font-weight="bold">s (arg)</text>
    <circle cx="180" cy="370" r="6" fill="#10B981" />

    <!-- Connection Arrows -->
    <!-- s1 to Heap -->
    <path d="M190 185 C 320 185, 420 200, 535 210" stroke="#38BDF8" stroke-width="3" fill="none" marker-end="url(#arrow-blue-sh)" />
    
    <!-- s2 to Heap -->
    <path d="M190 230 C 320 230, 420 220, 535 240" stroke="#38BDF8" stroke-width="3" fill="none" marker-end="url(#arrow-blue-sh)" />

    <!-- s to Heap (update method) -->
    <path d="M190 370 C 350 370, 450 330, 535 280" stroke="#10B981" stroke-width="3" stroke-dasharray="6 4" fill="none" marker-end="url(#arrow-green-sh)" />
    
    <!-- Label for Method update arrow -->
    <text x="360" y="350" fill="#10B981" font-family="Arial, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">Modifies data</text>

</svg>
</div>
`;

const SVG_OBJECT_REFERENCE_MEMORY = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-[#0F172A] p-4">
<svg width="100%" height="auto" viewBox="0 0 900 650" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
    <defs>
        <linearGradient id="bg-main-ref" x1="0" y1="0" x2="900" y2="650" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#0F172A" />
            <stop offset="100%" stop-color="#1E293B" />
        </linearGradient>
        <linearGradient id="box-stack" x1="0" y1="0" x2="200" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1E293B" />
            <stop offset="100%" stop-color="#334155" />
        </linearGradient>
        <filter id="glow-ref">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.5" />
        </filter>
        <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
        </marker>
        <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#F43F5E" />
        </marker>
        <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
        </marker>
    </defs>

    <rect width="900" height="650" fill="url(#bg-main-ref)" />

    <!-- CASE 1: Modify Object -->
    <rect x="30" y="30" width="840" height="260" rx="16" fill="#0F172A" stroke="#10B981" stroke-width="2" filter="url(#glow-ref)" />
    <rect x="30" y="30" width="840" height="40" rx="14" fill="#10B981" fill-opacity="0.1" />
    <text x="450" y="56" fill="#10B981" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" letter-spacing="1">CASE 1: MODIFY OBJECT (Car)</text>

    <!-- Stack: main -->
    <rect x="70" y="100" width="180" height="60" rx="8" fill="url(#box-stack)" stroke="#64748B" stroke-width="2" />
    <text x="160" y="125" fill="#94A3B8" font-family="monospace" font-size="12" text-anchor="middle">Stack: main()</text>
    <text x="160" y="145" fill="#F8FAFC" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">ref c</text>
    <circle cx="230" cy="130" r="5" fill="#10B981" />

    <!-- Stack: method -->
    <rect x="70" y="200" width="180" height="60" rx="8" fill="url(#box-stack)" stroke="#64748B" stroke-width="2" />
    <text x="160" y="225" fill="#94A3B8" font-family="monospace" font-size="12" text-anchor="middle">Stack: modify()</text>
    <text x="160" y="245" fill="#F8FAFC" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">ref car (copy)</text>
    <circle cx="230" cy="230" r="5" fill="#10B981" />

    <!-- Object 1 -->
    <rect x="550" y="100" width="250" height="150" rx="12" fill="#0F172A" stroke="#10B981" stroke-width="3" filter="url(#glow-ref)" />
    <rect x="550" y="100" width="250" height="40" rx="10" fill="#10B981" fill-opacity="0.2" />
    <text x="675" y="126" fill="#6EE7B7" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">Car Object (Heap)</text>
    
    <!-- Object 1 State -->
    <text x="675" y="170" fill="#94A3B8" font-family="monospace" font-size="14" text-anchor="middle" text-decoration="line-through">speed = 100</text>
    <text x="675" y="210" fill="#10B981" font-family="monospace" font-size="22" font-weight="bold" text-anchor="middle">speed = 200</text>
    <text x="675" y="235" fill="#34D399" font-family="Arial, sans-serif" font-size="12" font-style="italic" text-anchor="middle">✔ Change Visible outside</text>

    <!-- Arrows for Case 1 -->
    <path d="M235 130 C 350 130, 450 130, 535 130" stroke="#10B981" stroke-width="3" fill="none" marker-end="url(#arrow-green)" />
    <path d="M235 230 C 350 230, 450 230, 535 180" stroke="#10B981" stroke-width="3" stroke-dasharray="6 4" fill="none" marker-end="url(#arrow-green)" />


    <!-- CASE 2: Reassign Reference -->
    <rect x="30" y="340" width="840" height="280" rx="16" fill="#0F172A" stroke="#F43F5E" stroke-width="2" filter="url(#glow-ref)" />
    <rect x="30" y="340" width="840" height="40" rx="14" fill="#F43F5E" fill-opacity="0.1" />
    <text x="450" y="366" fill="#F43F5E" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" letter-spacing="1">CASE 2: REASSIGN REFERENCE (new Car())</text>

    <!-- Stack: main -->
    <rect x="70" y="410" width="180" height="60" rx="8" fill="url(#box-stack)" stroke="#64748B" stroke-width="2" />
    <text x="160" y="435" fill="#94A3B8" font-family="monospace" font-size="12" text-anchor="middle">Stack: main()</text>
    <text x="160" y="455" fill="#F8FAFC" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">ref c</text>
    <circle cx="230" cy="440" r="5" fill="#F43F5E" />

    <!-- Stack: method -->
    <rect x="70" y="530" width="180" height="60" rx="8" fill="url(#box-stack)" stroke="#64748B" stroke-width="2" />
    <text x="160" y="555" fill="#94A3B8" font-family="monospace" font-size="12" text-anchor="middle">Stack: modify()</text>
    <text x="160" y="575" fill="#F8FAFC" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">ref car (copied)</text>
    <circle cx="230" cy="560" r="5" fill="#38BDF8" />

    <!-- Old Arrow Broken -->
    <path d="M235 560 C 350 560, 450 500, 535 450" stroke="#64748B" stroke-width="2" stroke-dasharray="4 4" fill="none" opacity="0.5" />
    <line x1="370" y1="520" x2="395" y2="480" stroke="#F43F5E" stroke-width="4" />
    <line x1="395" y1="520" x2="370" y2="480" stroke="#F43F5E" stroke-width="4" />

    <!-- Object 1 -->
    <rect x="550" y="400" width="220" height="90" rx="12" fill="#0F172A" stroke="#F43F5E" stroke-width="3" />
    <text x="660" y="430" fill="#FDA4AF" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">Old Car (Heap)</text>
    <text x="660" y="460" fill="#F8FAFC" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle">speed = 100</text>
    <text x="660" y="480" fill="#94A3B8" font-family="Arial, sans-serif" font-size="12" text-anchor="middle">❌ Change NOT visible</text>

    <path d="M235 440 C 350 440, 450 440, 535 440" stroke="#F43F5E" stroke-width="3" fill="none" marker-end="url(#arrow-red)" />

    <!-- Object 2 -->
    <rect x="550" y="510" width="220" height="90" rx="12" fill="#0F172A" stroke="#38BDF8" stroke-width="3" filter="url(#glow-ref)" />
    <text x="660" y="540" fill="#7DD3FC" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">New Car (Heap)</text>
    <text x="660" y="570" fill="#38BDF8" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle">speed = 500</text>
    <text x="660" y="590" fill="#94A3B8" font-family="Arial, sans-serif" font-size="12" text-anchor="middle">Lost after method ends!</text>

    <!-- Arrow to Object 2 -->
    <path d="M235 560 C 350 560, 450 560, 535 560" stroke="#38BDF8" stroke-width="3" fill="none" marker-end="url(#arrow-blue)" />

</svg>
</div>
`;

seedModule({
    moduleTitle: 'Pass by Reference',
    moduleOrder: 15,
    description: 'Master how Object references are passed and mutated in Java methods.',
    label: 'PASS_REF',
    lessons: [
        {
            title: 'Object Reference Passing',
            duration: '45 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\"><strong>Object Reference Passing</strong> in Java refers to how objects are passed to methods using references (addresses).</p><p class=\"mb-3 font-semibold text-slate-700\">Even though Java is strictly pass-by-value, when objects are passed:</p><ul class=\"list-disc ml-5 space-y-2 mb-6 font-medium text-slate-800 bg-slate-50 p-4 rounded-xl border\"><li>The value being copied is the reference (memory address)</li><li>Both caller and method refer to the same object in Heap</li></ul>" },
                { "type": "section", "title": "2. Core Concept (Very Important)", "rich": "<div class=\"p-5 bg-indigo-50 border border-indigo-200 rounded-xl mb-6\"><p class=\"mb-3 font-bold text-indigo-900\">When an object is passed to a method:</p><ol class=\"list-decimal ml-5 space-y-2 mb-4 text-indigo-800 font-medium text-sm\"><li>A copy of the reference is created</li><li>Both references point to the same Heap object</li><li>Any modification to object data affects the original object</li></ol><p class=\"p-2 bg-white rounded border inline-block text-[13px] font-bold text-indigo-600\">👉 This creates the illusion of pass-by-reference</p></div>" },
                { "type": "section", "title": "3. Basic Example", "code": "class Car {\n    int speed;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car c = new Car();\n        c.speed = 100;\n\n        modify(c);\n        System.out.println(c.speed);\n    }\n\n    static void modify(Car car) {\n        car.speed = 200;\n    }\n}" },
                { "type": "section", "title": "Output", "rich": "<pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-emerald-500 mb-6\">200</pre>" },
                { "type": "section", "title": "4. Step-by-Step Memory Flow", "rich": "<div class=\"space-y-4 mb-6\"><div class=\"p-4 bg-white border border-slate-200 rounded-xl shadow-sm\"><p class=\"text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2\">Step 1 (Object Creation):</p><pre class=\"text-sm font-mono text-slate-700 bg-slate-50 p-2 rounded\">Heap:\nCar object ➔ speed = 100\n\nStack:\nmain() ➔ c ➔ (ref ➔ Heap)</pre></div><div class=\"p-4 bg-white border border-slate-200 rounded-xl shadow-sm\"><p class=\"text-[11px] font-black text-blue-400 uppercase tracking-widest mb-2\">Step 2 (Method Call):</p><pre class=\"text-sm font-mono text-blue-800 bg-blue-50 p-2 rounded\">Stack:\nmodify() ➔ car ➔ (copy of reference ➔ same Heap object)</pre></div><div class=\"p-4 bg-white border border-slate-200 rounded-xl shadow-sm\"><p class=\"text-[11px] font-black text-emerald-400 uppercase tracking-widest mb-2\">Step 3 (Modification):</p><pre class=\"text-sm font-mono text-emerald-800 bg-emerald-50 p-2 rounded\">Heap:\nspeed = 200</pre></div></div><p class=\"font-black p-3 bg-emerald-100 text-emerald-900 rounded-lg inline-block text-sm\">👉 Both references point to same object ➔ change visible</p>" },
                { "type": "section", "title": "5. Key Insight", "rich": "<div class=\"p-4 border rounded-xl bg-white shadow-sm mb-6 flex flex-col gap-2 font-bold text-slate-700\"><p>❌ You are NOT passing the object</p><p class=\"text-emerald-600\">✔ You are passing a copy of the reference</p></div>" },
                { "type": "section", "title": "6. Important Case: Reassigning Reference", "code": "static void modify(Car car) {\n    car = new Car();\n    car.speed = 500;\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-rose-500 mb-6\">100</pre>" },
                { "type": "section", "title": "7. Why This Happens", "rich": "<ul class=\"list-decimal ml-5 space-y-2 mb-6 font-medium text-sm text-slate-700 bg-slate-50 p-5 rounded-xl border\"><li>A new object is created inside method</li><li>Only the local copy of reference changes</li><li>Original reference still points to old object</li></ul>" },
                { "type": "section", "title": "8. Memory Visualization", "rich": SVG_OBJECT_REFERENCE_MEMORY },
                { "type": "section", "title": "9. Example with Multiple Fields", "code": "class User {\n    String name;\n    int age;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        User u = new User();\n        u.name = \"John\";\n        u.age = 25;\n\n        update(u);\n\n        System.out.println(u.name + \" \" + u.age);\n    }\n\n    static void update(User user) {\n        user.name = \"Alice\";\n        user.age = 30;\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-emerald-400 mb-6\">Alice 30</pre>" },
                { "type": "section", "title": "10. Tracing Table", "rich": "<div class=\"overflow-x-auto my-4 shadow-xl rounded-xl border border-slate-700\"><table class=\"w-full text-xs sm:text-sm border-collapse text-left\"><thead><tr class=\"bg-slate-900 text-slate-300 font-black uppercase tracking-wider\"><th class=\"p-3 border-r border-slate-700\">Step</th><th class=\"p-3 border-r border-slate-700\">Reference</th><th class=\"p-3 text-emerald-400\">Object Data</th></tr></thead><tbody class=\"bg-slate-800 text-slate-400 font-medium\"><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Before</td><td class=\"p-3 border-t border-r border-slate-700\">u ➔ Obj1</td><td class=\"p-3 border-t border-slate-700\">name=John, age=25</td></tr><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Inside</td><td class=\"p-3 border-t border-r border-slate-700\">user ➔ Obj1</td><td class=\"p-3 border-t border-slate-700 text-emerald-400\">name=Alice, age=30</td></tr><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">After</td><td class=\"p-3 border-t border-r border-slate-700\">u ➔ Obj1</td><td class=\"p-3 border-t border-slate-700 font-bold text-emerald-400\">name=Alice, age=30</td></tr></tbody></table></div>" },
                { "type": "section", "title": "11. Advanced Case (Mixed Behavior)", "code": "class Box {\n    int value;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Box b = new Box();\n        b.value = 10;\n\n        change(b);\n        System.out.println(b.value);\n    }\n\n    static void change(Box b) {\n        b.value = 50;      // modifies original\n        b = new Box();     // new object\n        b.value = 100;     // affects only new object\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-indigo-500 mb-6\">50</pre>" },
                { "type": "section", "title": "12. Explanation", "rich": "<ul class=\"list-none p-0 space-y-3 font-semibold text-slate-700 text-sm bg-slate-50 p-5 rounded-xl border\"><li><span class=\"text-emerald-500 mr-2\">✔</span> <span class=\"text-slate-900 border-b border-slate-200 pb-1\">First change</span> ➔ affects original object</li><li><span class=\"text-rose-500 mr-2\">❌</span> <span class=\"text-slate-900 border-b border-slate-200 pb-1\">Second change</span> ➔ creates new object, original unchanged</li></ul>" },
                { "type": "section", "title": "13. Key Rules (Must Remember)", "rich": "<div class=\"p-5 bg-white border border-slate-200 rounded-xl mb-6 shadow-sm\"><ul class=\"list-none p-0 space-y-2 font-semibold text-slate-700 text-sm mb-4\"><li><span class=\"text-emerald-500 mr-2\">✔</span> Java is always pass-by-value</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Object reference is copied</li></ul><p class=\"mb-2 font-bold text-slate-800 uppercase text-xs tracking-widest\">You can:</p><ul class=\"list-none p-0 space-y-2 font-medium text-sm\"><li class=\"text-emerald-700\">✔ Modify object data</li><li class=\"text-rose-600\">❌ Reassign reference (won’t affect original)</li></ul></div>" },
                { "type": "section", "title": "14. Common Mistakes", "rich": WARNING("<ul class=\"list-none p-0 space-y-2 text-sm font-medium mb-0\"><li>❌ Thinking Java supports pass-by-reference</li><li>❌ Confusing reference copy with object copy</li><li>❌ Expecting reassignment to reflect outside</li><li>❌ Not understanding heap sharing</li></ul>") },
                { "type": "section", "title": "15. Real-World Understanding", "rich": "<ul class=\"list-disc ml-5 space-y-3 font-semibold text-slate-700 text-sm bg-white p-5 rounded-xl border\"><li><strong>Object</strong> = shared resource (Heap)</li><li><strong>Reference</strong> = access key</li><li>Method gets a duplicate key, not a new object</li></ul>" },
                { "type": "section", "title": "16. Deep JVM Insight (Advanced)", "rich": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6\"><div class=\"p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 space-y-2\"><p class=\"font-black text-slate-800\">Stack:</p><p>References are stored in Stack.</p><p>Method calls create new stack frames.</p></div><div class=\"p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 space-y-2\"><p class=\"font-black text-slate-800\">Heap:</p><p>Objects are stored in Heap.</p><p>Only reference values are copied across frames.</p></div></div>" },
                { "type": "section", "title": "17. Professional Use Cases", "rich": "<ul class=\"list-decimal ml-5 space-y-2 font-semibold text-slate-700 text-sm bg-sky-50 p-5 rounded-xl border\"><li>Passing objects to service methods</li><li>Updating entity objects</li><li>Modifying collections (List, Map)</li><li>DTO transformations</li></ul>" },
                { "type": "section", "title": "18. One-Line Master Rule", "rich": "<div class=\"p-5 bg-indigo-50 border border-indigo-200 rounded-xl mb-6\"><p class=\"text-lg font-black text-indigo-900 leading-relaxed text-center\">👉 Java passes object references by value — allowing modification of the same object but not replacement of the reference.</p></div>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic uppercase text-[10px] font-black\">Test your knowledge of Object Reference Passing.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> When passing an object reference to a method, are you passing the object itself? (Yes/No) <br/><strong>Match Output:</strong> <code>No</code>", "hints": ["Look at Point 5 (Key Insight)."], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> In the Mixed Behavior example, what is the output of the code when printing <code>b.value</code>? <br/><strong>Match Output:</strong> <code>50</code>", "hints": ["Look at Point 11 and 12 Explanation."], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Can a method replace the original reference (reassigning pointing to a new object) for the caller? (Yes/No) <br/><strong>Match Output:</strong> <code>No</code>", "hints": ["Look at Case 2 / Point 13 Rules."], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "No", "matchCode": "No" },
                { "index": 2, "match": "50", "matchCode": "50" },
                { "index": 3, "match": "No", "matchCode": "No" }
            ]
        },
        {
            title: 'Behavior of Objects in Methods',
            duration: '45 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\"><strong>Behavior of Objects in Methods</strong> explains how objects behave when passed into methods, specifically how their state (data) can be modified, shared, or reassigned during method execution.</p><p class=\"mb-3 font-semibold text-slate-700 uppercase text-[11px] tracking-widest\">In Java:</p><ul class=\"list-disc ml-5 space-y-3 font-medium text-slate-800 bg-slate-50 p-5 rounded-xl border\"><li>Objects are passed as reference values (copy of reference)</li><li>The object itself lives in Heap memory</li><li>Methods can modify object state, but cannot replace the original reference</li></ul>" },
                { "type": "section", "title": "2. Core Understanding", "rich": "<div class=\"p-5 bg-indigo-50 border border-indigo-200 rounded-xl mb-6\"><p class=\"mb-3 font-bold text-indigo-900\">When an object is passed to a method:</p><ol class=\"list-decimal ml-5 space-y-2 mb-0 text-indigo-800 font-medium text-sm\"><li>A copy of the reference is passed</li><li>Both caller and method refer to the same object in Heap</li><li>Any state change (fields) is reflected outside</li><li>Reassigning the reference inside method does not affect original</li></ol></div>" },
                { "type": "section", "title": "Behavior Types (Very Important)", "rich": "<div class=\"mb-4\"></div>" },
                { "type": "section", "title": "1. State Modification (Visible Outside)", "code": "class Product {\n    int price;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Product p = new Product();\n        p.price = 100;\n\n        update(p);\n        System.out.println(p.price);\n    }\n\n    static void update(Product p) {\n        p.price = 200;\n    }\n}" },
                { "type": "section", "title": "Output", "rich": "<pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-emerald-500 mb-6\">200</pre>" },
                { "type": "section", "title": "Explanation", "rich": "<ul class=\"list-none p-0 space-y-2 font-medium text-slate-700 bg-emerald-50 p-4 border border-emerald-200 rounded-xl\"><li><span class=\"text-emerald-500 mr-2\">✔</span> Method modifies the same object</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Change reflects globally</li></ul>" },
                { "type": "section", "title": "2. Reference Reassignment (Not Visible)", "code": "static void update(Product p) {\n    p = new Product();\n    p.price = 500;\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-rose-500 mb-6\">100</pre>" },
                { "type": "section", "title": "Explanation", "rich": "<ul class=\"list-none p-0 space-y-2 font-medium text-slate-700 bg-rose-50 p-4 border border-rose-200 rounded-xl\"><li><span class=\"text-rose-500 mr-2\">❌</span> New object created</li><li><span class=\"text-rose-500 mr-2\">❌</span> Only local reference changes</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Original object untouched</li></ul>" },
                { "type": "section", "title": "3. Mixed Behavior (Most Important Case)", "code": "class Box {\n    int value;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Box b = new Box();\n        b.value = 10;\n\n        process(b);\n        System.out.println(b.value);\n    }\n\n    static void process(Box b) {\n        b.value = 50;      // affects original\n        b = new Box();     // new reference\n        b.value = 100;     // affects only new object\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-indigo-500 mb-6\">50</pre>" },
                { "type": "section", "title": "Memory Behavior (Step-by-Step)", "rich": "<div class=\"p-5 bg-white border border-slate-200 shadow-sm rounded-xl space-y-6 mb-6\"><div class=\"flex flex-col\"><p class=\"text-slate-500 font-black tracking-widest text-[10px] uppercase mb-2\">Before Method Call:</p><pre class=\"text-sm font-mono text-slate-700 bg-slate-50 p-3 rounded\">Heap:\nBox ➔ value = 10\n\nStack:\nmain ➔ b ➔ (ref ➔ Heap)</pre></div><div class=\"flex flex-col\"><p class=\"text-blue-500 font-black tracking-widest text-[10px] uppercase mb-2\">During Method Call:</p><pre class=\"text-sm font-mono text-blue-800 bg-blue-50 p-3 rounded\">Stack:\nprocess ➔ b ➔ (copy of reference ➔ same Heap object)</pre></div><div class=\"flex flex-col\"><p class=\"text-emerald-500 font-black tracking-widest text-[10px] uppercase mb-2\">After Modification:</p><pre class=\"text-sm font-mono text-emerald-800 bg-emerald-50 p-3 rounded\">Heap:\nvalue = 50</pre></div><div class=\"flex flex-col\"><p class=\"text-rose-500 font-black tracking-widest text-[10px] uppercase mb-2\">After Reassignment:</p><pre class=\"text-sm font-mono text-rose-800 bg-rose-50 p-3 rounded\">process ➔ new object (value = 100)\n(main still points to old object)</pre></div></div>" },
                { "type": "section", "title": "4. Passing Multiple Objects", "code": "class A {\n    int x;\n}\n\nclass B {\n    int y;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        A a = new A();\n        B b = new B();\n\n        a.x = 10;\n        b.y = 20;\n\n        modify(a, b);\n\n        System.out.println(a.x + \" \" + b.y);\n    }\n\n    static void modify(A a, B b) {\n        a.x = 100;\n        b.y = 200;\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black flex space-x-2 text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-purple-500 mb-6\"><span>100</span><span>200</span></pre>" },
                { "type": "section", "title": "5. Object Sharing Behavior", "code": "class Student {\n    int marks;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student();\n        s1.marks = 50;\n\n        Student s2 = s1; // shared reference\n\n        update(s2);\n\n        System.out.println(s1.marks);\n    }\n\n    static void update(Student s) {\n        s.marks = 90;\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-emerald-500 mb-6\">90</pre>" },
                { "type": "section", "title": "Why This Happens", "rich": "<ul class=\"list-decimal ml-5 space-y-2 mb-6 font-medium text-sm text-slate-700 bg-slate-50 p-5 rounded-xl border\"><li>Both <code>s1</code> and <code>s2</code> point to the same object</li><li>Method modifies that shared object</li></ul>" },
                { "type": "section", "title": "6. Memory Tracking Flow (Object Sharing)", "rich": SVG_BEHAVIOR_SHARING },
                { "type": "section", "title": "Key Behavioral Rules", "rich": "<div class=\"p-5 bg-white border border-slate-200 rounded-xl mb-6 shadow-sm\"><p class=\"mb-3 font-bold text-slate-800\">Objects are mutable by default</p><p class=\"mb-2 font-medium text-slate-700 uppercase tracking-widest text-[10px]\">Methods can:</p><ul class=\"list-none p-0 space-y-2 font-medium text-sm\"><li class=\"text-emerald-700\">✔ Modify object state</li><li class=\"text-emerald-700\">✔ Share changes across references</li><li class=\"text-rose-600\">❌ Cannot replace original reference</li></ul></div>" },
                { "type": "section", "title": "Behavior Summary Table", "rich": "<div class=\"overflow-x-auto my-4 shadow-xl rounded-xl border border-slate-700 mb-6\"><table class=\"w-full text-xs sm:text-sm border-collapse text-left\"><thead><tr class=\"bg-slate-900 text-slate-300 font-black uppercase tracking-wider\"><th class=\"p-3 border-r border-slate-700\">Action</th><th class=\"p-3 text-emerald-400\">Result</th></tr></thead><tbody class=\"bg-slate-800 text-slate-400 font-medium\"><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Modify field</td><td class=\"p-3 border-t border-slate-700 text-emerald-400\">Visible outside ✔</td></tr><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Reassign reference</td><td class=\"p-3 border-t border-slate-700 text-rose-400\">Not visible ❌</td></tr><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Create new object</td><td class=\"p-3 border-t border-slate-700 text-rose-400\">Only local ❌</td></tr><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Share reference</td><td class=\"p-3 border-t border-slate-700 font-bold text-emerald-400\">Changes reflect ✔</td></tr></tbody></table></div>" },
                { "type": "section", "title": "Common Mistakes", "rich": WARNING("<ul class=\"list-none p-0 space-y-2 text-sm font-medium mb-0\"><li>❌ Thinking reassignment affects original</li><li>❌ Confusing object with reference</li><li>❌ Not understanding shared memory</li><li>❌ Assuming deep copy automatically</li></ul>") },
                { "type": "section", "title": "Real-World Behavior", "rich": "<ul class=\"list-disc ml-5 space-y-3 font-semibold text-slate-700 text-sm bg-sky-50 p-5 rounded-xl border\"><li>Service methods modify objects (DTOs, Entities)</li><li>Collections passed to methods ➔ get modified</li><li>Shared objects ➔ act like global state</li></ul>" },
                { "type": "section", "title": "Advanced Insight", "rich": "<div class=\"p-5 border border-slate-200 rounded-xl bg-white space-y-3 font-medium text-sm text-slate-700 shadow-sm mb-6\"><p>Java avoids pointer complexity</p><p>Uses controlled reference copying</p><p>Ensures memory safety</p><p>Prevents accidental memory corruption</p></div>" },
                { "type": "section", "title": "Deep Understanding (Interview Level)", "rich": "<div class=\"p-5 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl mb-6\"><p class=\"text-sky-300 font-bold italic mb-4 flex items-center gap-2\"><span>👉</span> Java is:</p><p class=\"text-emerald-400 font-bold mb-2 text-sm\">✔ Pass-by-value</p><p class=\"text-emerald-400 font-bold text-sm leading-relaxed\">✔ Object behavior = shared heap modification</p></div>" },
                { "type": "section", "title": "One-Line Master Rule", "rich": "<div class=\"p-5 bg-indigo-50 border border-indigo-200 rounded-xl mb-6 shadow-sm\"><p class=\"text-lg font-black text-indigo-900 leading-relaxed text-center\">👉 Methods can change the object’s data, but they cannot change where the original reference points.</p></div>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic uppercase text-[10px] font-black\">Test your knowledge of Object Behavior in Methods.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> When modifying an object inside a method (e.g. <code>p.price = 200;</code>), is the change visible globally outside? (Yes/No) <br/><strong>Match Output:</strong> <code>Yes</code>", "hints": ["Look at Point 1 (State Modification)."], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> When checking the summary table, does reassigning the reference via <code>new</code> reflect as a visible change outside? (Yes/No) <br/><strong>Match Output:</strong> <code>No</code>", "hints": ["Not visible ❌."], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Can a method change where the original reference points? (Yes/No) <br/><strong>Match Output:</strong> <code>No</code>", "hints": ["Read the One-Line Master Rule."], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "Yes", "matchCode": "Yes" },
                { "index": 2, "match": "No", "matchCode": "No" },
                { "index": 3, "match": "No", "matchCode": "No" }
            ]
        },
        {
            title: 'Reference Handling',
            duration: '45 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\"><strong>Reference Handling</strong> in Java refers to how reference variables store, manage, share, and manipulate object addresses in memory (Heap).</p><p class=\"font-medium text-slate-700\">A reference variable does not store the actual object, instead it stores:</p><div class=\"mt-3 p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl font-bold text-emerald-900 shadow-sm\">👉 the memory address (reference) of the object</div>" },
                { "type": "section", "title": "2. Core Understanding", "rich": "<ul class=\"list-disc ml-5 space-y-3 mb-6 p-5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-900 font-medium text-sm\"><li>Objects are created in <strong>Heap Memory</strong></li><li>Reference variables are stored in <strong>Stack Memory</strong></li><li>References act like access points (pointers) to objects</li><li>Multiple references can point to the same object</li></ul>" },
                { "type": "section", "title": "3. Basic Example", "code": "class User {\n    String name;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        User u1 = new User();\n        u1.name = \"John\";\n\n        User u2 = u1;\n\n        System.out.println(u2.name);\n    }\n}" },
                { "type": "section", "title": "Output", "rich": "<pre class=\"p-4 bg-black text-emerald-400 rounded-lg font-mono text-sm shadow-xl border-l-4 border-emerald-500 mb-6\">John</pre>" },
                { "type": "section", "title": "Explanation", "rich": "<ul class=\"list-none p-0 space-y-2 font-medium text-slate-700 bg-slate-50 p-4 border border-slate-200 rounded-xl mb-6\"><li><span class=\"text-emerald-500 mr-2\">✔</span> <code>u1</code> holds reference to object in Heap</li><li><span class=\"text-emerald-500 mr-2\">✔</span> <code>u2 = u1</code> copies the reference (not object)</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Both point to same memory</li></ul>" },
                { "type": "section", "title": "4. Memory Visualization", "rich": SVG_REFERENCE_HANDLING },
                { "type": "section", "title": "Key Behaviors of References", "rich": "<div class=\"mb-4\"></div>" },
                { "type": "section", "title": "1. Shared References", "code": "u2.name = \"Alice\";\nSystem.out.println(u1.name);", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-sky-500 mb-4\">Alice</pre><p class=\"font-black text-sky-700 bg-sky-100 p-2 rounded inline-block text-[13px]\">👉 Change via one reference affects all</p>" },
                { "type": "section", "title": "2. Null References", "code": "User u = null;\nSystem.out.println(u.name);", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-rose-400 rounded-lg font-mono text-sm shadow-xl border-l-4 border-rose-500 mb-4\">NullPointerException</pre><p class=\"font-black text-rose-700 bg-rose-100 p-2 rounded inline-block text-[13px]\">👉 No object exists ➔ cannot access</p>" },
                { "type": "section", "title": "3. Reassigning References", "code": "User u1 = new User();\nUser u2 = u1;\n\nu2 = new User();", "rich": "<div class=\"p-4 bg-slate-100 border border-slate-300 rounded-xl\"><p class=\"font-black text-slate-800 mb-2 uppercase text-xs tracking-widest\">👉 Now:</p><p class=\"font-mono text-slate-700 text-sm mb-1\">u1 ➔ Object1</p><p class=\"font-mono text-slate-700 text-sm\">u2 ➔ Object2</p></div>" },
                { "type": "section", "title": "4. Dangling Objects (Garbage Collection)", "code": "User u = new User();\nu = null;", "rich": "<p class=\"font-black mt-4 text-emerald-700 bg-emerald-100 p-3 rounded-lg text-sm border border-emerald-300 shadow-sm\">👉 Object becomes eligible for Garbage Collection</p>" },
                { "type": "section", "title": "5. Passing References to Methods", "code": "class Data {\n    int val;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Data d = new Data();\n        d.val = 10;\n\n        update(d);\n        System.out.println(d.val);\n    }\n\n    static void update(Data d) {\n        d.val = 50;\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-indigo-500 mb-6\">50</pre>" },
                { "type": "section", "title": "6. Reference Comparison (== vs equals)", "code": "String s1 = new String(\"Hello\");\nString s2 = new String(\"Hello\");\n\nSystem.out.println(s1 == s2);\nSystem.out.println(s1.equals(s2));", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black flex flex-col gap-1 text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-amber-500 mb-4\"><span>false</span><span>true</span></pre><div class=\"flex flex-col gap-2 p-4 bg-amber-50 rounded border border-amber-200\"><p class=\"font-mono text-[13px] font-bold text-amber-900 border-b border-amber-200 pb-1\">== ➔ compares references</p><p class=\"font-mono text-[13px] font-bold text-amber-900\">.equals() ➔ compares content</p></div>" },
                { "type": "section", "title": "7. Multiple References Scenario", "code": "class Box {\n    int value;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Box a = new Box();\n        Box b = a;\n        Box c = b;\n\n        a.value = 99;\n\n        System.out.println(b.value);\n        System.out.println(c.value);\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black flex flex-col gap-1 text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-pink-500 mb-6\"><span>99</span><span>99</span></pre>" },
                { "type": "section", "title": "8. Reference Lifecycle", "rich": "<ol class=\"list-decimal ml-5 space-y-2 p-5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 shadow-sm\"><li>Object created ➔ <code>new</code></li><li>Reference assigned ➔ stored in stack</li><li>Multiple references may share object</li><li>References removed ➔ object becomes unused</li><li>Garbage Collector cleans memory</li></ol>" },
                { "type": "section", "title": "9. Important Rules", "rich": "<ul class=\"list-none p-0 space-y-3 font-medium text-sm text-slate-800 bg-sky-50 p-5 rounded-xl border border-sky-200\"><li><span class=\"text-sky-500 mr-2\">✔</span> Reference stores address, not data</li><li><span class=\"text-sky-500 mr-2\">✔</span> Assignment copies reference, not object</li><li><span class=\"text-sky-500 mr-2\">✔</span> Objects are shared across references</li><li><span class=\"text-sky-500 mr-2\">✔</span> <code>null</code> means no object</li><li><span class=\"text-sky-500 mr-2\">✔</span> JVM handles memory safely</li></ul>" },
                { "type": "section", "title": "10. Common Mistakes", "rich": WARNING("<ul class=\"list-none p-0 space-y-2 text-sm font-medium mb-0\"><li>❌ Thinking new reference = new object</li><li>❌ Confusing == with .equals()</li><li>❌ Forgetting null checks</li><li>❌ Assuming deep copy automatically</li><li>❌ Not understanding shared state</li></ul>") },
                { "type": "section", "title": "11. Advanced Concept: Shallow vs Deep Copy", "rich": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6\"><div class=\"p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow\"><p class=\"text-xs font-black tracking-widest uppercase text-slate-400 mb-3\">Shallow Copy</p><pre class=\"text-xs font-mono text-slate-700 bg-slate-50 p-2 rounded border mb-3\">User u2 = u1;</pre><p class=\"text-[13px] font-bold text-emerald-600 bg-emerald-50 p-2 rounded inline-block\">👉 Same object</p></div><div class=\"p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow\"><p class=\"text-xs font-black tracking-widest uppercase text-slate-400 mb-3\">Deep Copy</p><pre class=\"text-xs font-mono text-slate-700 bg-slate-50 p-2 rounded border mb-3\">User u2 = new User();\nu2.name = u1.name;</pre><p class=\"text-[13px] font-bold text-indigo-600 bg-indigo-50 p-2 rounded inline-block\">👉 Different object</p></div></div>" },
                { "type": "section", "title": "12. Real-World Understanding", "rich": "<ul class=\"list-disc ml-5 space-y-3 font-semibold text-slate-700 text-sm bg-indigo-50 p-5 rounded-xl border border-indigo-100\"><li>Objects passed in APIs ➔ shared references</li><li>Collections (List, Map) ➔ reference-based</li><li>Entity updates ➔ reflect globally</li><li>Memory efficiency ➔ reuse same objects</li></ul>" },
                { "type": "section", "title": "13. Deep JVM Insight", "rich": "<div class=\"flex flex-col gap-3 p-5 bg-slate-900 border-l-4 border-slate-500 rounded-r-xl text-slate-300 text-sm shadow-xl\"><p><strong class=\"text-white font-mono uppercase tracking-widest mr-2\">Stack:</strong> stores references</p><p><strong class=\"text-white font-mono uppercase tracking-widest mr-2\">Heap:</strong> stores objects</p><p><strong class=\"text-emerald-400\">Reference copying</strong> ➔ cheap (fast operation)</p><p><strong class=\"text-rose-400\">Object duplication</strong> ➔ expensive</p></div>" },
                { "type": "section", "title": "14. One-Line Master Rule", "rich": "<div class=\"p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl mb-6 shadow-sm\"><p class=\"text-lg font-black text-emerald-900 leading-relaxed text-center\">👉 References point to objects — and multiple references can control the same object.</p></div>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic uppercase text-[10px] font-black\">Test your knowledge of Reference Handling.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> When you execute <code>User u2 = u1;</code> are you creating a new Object in Heap memory? (Yes/No) <br/><strong>Match Output:</strong> <code>No</code>", "hints": ["Look at Concept 11: Shallow vs Deep Copy."], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> In the '== vs equals' rule, which one compares references? (==/equals) <br/><strong>Match Output:</strong> <code>==</code>", "hints": ["Look at Point 6 Reference Comparison."], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> If you set a reference to <code>null</code>, does it immediately destroy the object in Heap? (Yes/No) <br/><strong>Match Output:</strong> <code>No</code>", "hints": ["It only makes it eligible for Garbage Collection."], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "No", "matchCode": "No" },
                { "index": 2, "match": "==", "matchCode": "==" },
                { "index": 3, "match": "No", "matchCode": "No" }
            ]
        }
    ]
}).catch(console.error);
