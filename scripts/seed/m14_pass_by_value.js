/** Module 14 — Pass by Value */
const { seedModule } = require('./_helpers');

const NOTE = (text) => `<div class="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 my-4 text-sm font-medium shadow-sm leading-relaxed">${text}</div>`;
const WARNING = (text) => `<div class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 my-4 text-sm font-medium shadow-sm leading-relaxed">${text}</div>`;

const SVG_PASS_BY_VALUE_MEMORY = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-[#0F172A] p-2">
<svg width="100%" height="auto" viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
    <defs>
        <linearGradient id="bg-grad" x1="0" y1="0" x2="900" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#0F172A" />
            <stop offset="100%" stop-color="#1E293B" />
        </linearGradient>
        <linearGradient id="stack-grad" x1="50" y1="100" x2="300" y2="520" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1E293B" />
            <stop offset="100%" stop-color="#334155" />
        </linearGradient>
        <linearGradient id="heap-grad" x1="400" y1="100" x2="850" y2="520" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1E293B" />
            <stop offset="100%" stop-color="#0F172A" />
        </linearGradient>
        <filter id="shadow">
            <feDropShadow dx="0" dy="8" stdDeviation="6" flood-opacity="0.3" />
        </filter>
        <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
        </marker>
        <marker id="arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#A78BFA" />
        </marker>
        <marker id="arrow-pink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#F472B6" />
        </marker>
    </defs>

    <rect width="900" height="600" fill="url(#bg-grad)" />

    <path d="M400 150 L850 150 M400 250 L850 250 M400 350 L850 350 M400 450 L850 450" stroke="#334155" stroke-width="1" stroke-dasharray="4 4" opacity="0.3" />
    <path d="M450 100 L450 520 M550 100 L550 520 M650 100 L650 520 M750 100 L750 520" stroke="#334155" stroke-width="1" stroke-dasharray="4 4" opacity="0.3" />

    <rect x="50" y="40" width="250" height="40" rx="6" fill="#3B82F6" fill-opacity="0.2" stroke="#3B82F6" stroke-width="2" />
    <text x="175" y="66" fill="#93C5FD" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="2">STACK MEMORY</text>

    <rect x="400" y="40" width="450" height="40" rx="6" fill="#10B981" fill-opacity="0.2" stroke="#10B981" stroke-width="2" />
    <text x="625" y="66" fill="#6EE7B7" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="2">HEAP MEMORY</text>

    <rect x="50" y="100" width="250" height="460" rx="12" fill="url(#stack-grad)" stroke="#475569" stroke-width="2" filter="url(#shadow)" />
    <rect x="400" y="100" width="450" height="460" rx="12" fill="url(#heap-grad)" stroke="#059669" stroke-width="2" filter="url(#shadow)" />

    <!-- Phase 1 -->
    <text x="70" y="140" fill="#38BDF8" font-family="Arial, sans-serif" font-size="15" font-weight="bold">1. main() Execution</text>
    <rect x="70" y="160" width="210" height="46" rx="8" fill="#0F172A" stroke="#38BDF8" stroke-width="2" />
    <text x="85" y="188" fill="#94A3B8" font-family="monospace" font-size="13">Student</text>
    <text x="160" y="188" fill="#F8FAFC" font-family="monospace" font-size="16" font-weight="bold">s1</text>
    <circle cx="250" cy="183" r="5" fill="#38BDF8" />

    <rect x="450" y="140" width="200" height="80" rx="10" fill="#0F172A" stroke="#10B981" stroke-width="2" />
    <text x="550" y="165" fill="#6EE7B7" font-family="monospace" font-size="13" text-anchor="middle">Object 1 (@100)</text>
    <line x1="450" y1="180" x2="650" y2="180" stroke="#10B981" stroke-dasharray="4 4" stroke-opacity="0.5" />
    <text x="550" y="206" fill="#F8FAFC" font-family="monospace" font-size="16" text-anchor="middle">age = <tspan fill="#F87171">20</tspan></text>

    <path d="M255 183 C 320 183, 380 180, 440 180" stroke="#38BDF8" stroke-width="3" fill="none" marker-end="url(#arrow-blue)" />

    <!-- Phase 2 -->
    <text x="70" y="260" fill="#A78BFA" font-family="Arial, sans-serif" font-size="15" font-weight="bold">2. change(s1)</text>
    <rect x="70" y="280" width="210" height="46" rx="8" fill="#0F172A" stroke="#A78BFA" stroke-width="2" />
    <text x="85" y="308" fill="#94A3B8" font-family="monospace" font-size="13">Student</text>
    <text x="160" y="308" fill="#F8FAFC" font-family="monospace" font-size="16" font-weight="bold">s</text>
    <circle cx="250" cy="303" r="5" fill="#A78BFA" />

    <path d="M255 303 C 320 303, 380 230, 440 210" stroke="#A78BFA" stroke-width="3" fill="none" stroke-dasharray="6 4" marker-end="url(#arrow-purple)" />
    
    <rect x="420" y="235" width="260" height="28" rx="6" fill="#0F172A" stroke="#A78BFA" stroke-width="1" />
    <text x="550" y="253" fill="#C4B5FD" font-family="Arial, sans-serif" font-size="12" text-anchor="middle">Copy 's' joins original Object 1</text>

    <!-- Phase 3 -->
    <text x="70" y="400" fill="#F472B6" font-family="Arial, sans-serif" font-size="15" font-weight="bold">3. Reassignment</text>
    <text x="70" y="425" fill="#94A3B8" font-family="monospace" font-size="12">s = new Student();</text>
    
    <!-- Cut line over purple path -->
    <line x1="330" y1="250" x2="355" y2="280" stroke="#EF4444" stroke-width="4" />
    <line x1="355" y1="250" x2="330" y2="280" stroke="#EF4444" stroke-width="4" />

    <!-- s to Object 2 -->
    <path d="M255 303 C 340 380, 400 480, 435 480" stroke="#F472B6" stroke-width="3" fill="none" marker-end="url(#arrow-pink)" />

    <rect x="450" y="440" width="200" height="80" rx="10" fill="#0F172A" stroke="#F472B6" stroke-width="2" />
    <text x="550" y="465" fill="#FBCFE8" font-family="monospace" font-size="13" text-anchor="middle">Object 2 (@200)</text>
    <line x1="450" y1="480" x2="650" y2="480" stroke="#F472B6" stroke-dasharray="4 4" stroke-opacity="0.5" />
    <text x="550" y="506" fill="#F8FAFC" font-family="monospace" font-size="16" text-anchor="middle">age = <tspan fill="#34D399">50</tspan></text>
</svg>
</div>
`;

const SVG_PASS_PRIMITIVE_MEMORY = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-[#0F172A] p-4">
<svg width="100%" height="auto" viewBox="0 0 900 450" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
    <defs>
        <linearGradient id="bg-grad_prim" x1="0" y1="0" x2="900" y2="450" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#0F172A" />
            <stop offset="100%" stop-color="#1E293B" />
        </linearGradient>
        <linearGradient id="stack-main" x1="50" y1="50" x2="400" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1E293B" />
            <stop offset="100%" stop-color="#334155" />
        </linearGradient>
        <linearGradient id="stack-method" x1="500" y1="50" x2="850" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1E293B" />
            <stop offset="100%" stop-color="#0F172A" />
        </linearGradient>
        <marker id="arrow-copy" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
        </marker>
    </defs>

    <rect width="900" height="450" fill="url(#bg-grad_prim)" />

    <!-- Main Stack -->
    <rect x="50" y="50" width="350" height="350" rx="12" fill="url(#stack-main)" stroke="#475569" stroke-width="2" filter="url(#shadow)" />
    <rect x="50" y="50" width="350" height="40" rx="12" fill="#3B82F6" fill-opacity="0.2" stroke="#3B82F6" stroke-width="2" />
    <text x="225" y="76" fill="#93C5FD" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="2">MAIN STACK FRAME</text>
    
    <rect x="100" y="150" width="250" height="50" rx="8" fill="#0F172A" stroke="#38BDF8" stroke-width="2" />
    <text x="130" y="180" fill="#F8FAFC" font-family="monospace" font-size="18" font-weight="bold">x</text>
    <text x="280" y="180" fill="#34D399" font-family="monospace" font-size="20" font-weight="bold">10</text>

    <rect x="100" y="240" width="250" height="50" rx="8" fill="#0F172A" stroke="#38BDF8" stroke-width="2" />
    <text x="130" y="270" fill="#F8FAFC" font-family="monospace" font-size="18" font-weight="bold">y</text>
    <text x="280" y="270" fill="#34D399" font-family="monospace" font-size="20" font-weight="bold">20</text>

    <!-- Method Stack -->
    <rect x="500" y="50" width="350" height="350" rx="12" fill="url(#stack-method)" stroke="#A78BFA" stroke-width="2" filter="url(#shadow)" />
    <rect x="500" y="50" width="350" height="40" rx="12" fill="#A78BFA" fill-opacity="0.2" stroke="#A78BFA" stroke-width="2" />
    <text x="675" y="76" fill="#C4B5FD" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle" letter-spacing="2">METHOD STACK: swap()</text>

    <rect x="550" y="150" width="250" height="50" rx="8" fill="#0F172A" stroke="#A78BFA" stroke-width="2" />
    <text x="580" y="180" fill="#F8FAFC" font-family="monospace" font-size="18" font-weight="bold">a (copy)</text>
    <text x="730" y="180" fill="#F87171" font-family="monospace" font-size="20" font-weight="bold">10</text>

    <rect x="550" y="240" width="250" height="50" rx="8" fill="#0F172A" stroke="#A78BFA" stroke-width="2" />
    <text x="580" y="270" fill="#F8FAFC" font-family="monospace" font-size="18" font-weight="bold">b (copy)</text>
    <text x="730" y="270" fill="#F87171" font-family="monospace" font-size="20" font-weight="bold">20</text>

    <text x="675" y="340" fill="#FBCFE8" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Swapping a &amp; b only changes this frame!</text>

    <!-- Passing Arrows -->
    <path d="M350 175 C 420 175, 480 175, 540 175" stroke="#38BDF8" stroke-width="3" stroke-dasharray="6 4" fill="none" marker-end="url(#arrow-copy)" />
    <text x="450" y="165" fill="#93C5FD" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Copied</text>

    <path d="M350 265 C 420 265, 480 265, 540 265" stroke="#38BDF8" stroke-width="3" stroke-dasharray="6 4" fill="none" marker-end="url(#arrow-copy)" />
    <text x="450" y="255" fill="#93C5FD" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle">Copied</text>

</svg>
</div>
`;

const SVG_PASS_MEMORY_BEHAVIOR = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-[#0F172A] p-4">
<svg width="100%" height="auto" viewBox="0 0 900 650" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
    <defs>
        <linearGradient id="bg-main" x1="0" y1="0" x2="900" y2="650" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#0F172A" />
            <stop offset="100%" stop-color="#1E293B" />
        </linearGradient>
        <linearGradient id="box-grad" x1="0" y1="0" x2="200" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#1E293B" />
            <stop offset="100%" stop-color="#334155" />
        </linearGradient>
        <filter id="glow-mem">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.5" />
        </filter>
        <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
        </marker>
        <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#F43F5E" />
        </marker>
    </defs>

    <rect width="900" height="650" fill="url(#bg-main)" />

    <!-- CASE 1: Modify Object -->
    <rect x="30" y="30" width="840" height="260" rx="16" fill="#0F172A" stroke="#10B981" stroke-width="2" filter="url(#glow-mem)" />
    <rect x="30" y="30" width="840" height="40" rx="14" fill="#10B981" fill-opacity="0.1" />
    <text x="450" y="56" fill="#10B981" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" letter-spacing="1">CASE 1: MODIFY OBJECT (Change Visible)</text>

    <!-- Stack: main -->
    <rect x="70" y="100" width="180" height="60" rx="8" fill="url(#box-grad)" stroke="#64748B" stroke-width="2" />
    <text x="160" y="125" fill="#94A3B8" font-family="monospace" font-size="12" text-anchor="middle">Stack: main()</text>
    <text x="160" y="145" fill="#F8FAFC" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">ref s (original)</text>
    <circle cx="230" cy="130" r="5" fill="#10B981" />

    <!-- Stack: method -->
    <rect x="70" y="200" width="180" height="60" rx="8" fill="url(#box-grad)" stroke="#64748B" stroke-width="2" />
    <text x="160" y="225" fill="#94A3B8" font-family="monospace" font-size="12" text-anchor="middle">Stack: method()</text>
    <text x="160" y="245" fill="#F8FAFC" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">ref s (copy)</text>
    <circle cx="230" cy="230" r="5" fill="#10B981" />

    <!-- Object 1 -->
    <rect x="550" y="100" width="250" height="150" rx="12" fill="#0F172A" stroke="#10B981" stroke-width="3" filter="url(#glow-mem)" />
    <rect x="550" y="100" width="250" height="40" rx="10" fill="#10B981" fill-opacity="0.2" />
    <text x="675" y="126" fill="#6EE7B7" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">Object 1 (Heap)</text>
    
    <!-- Object 1 State -->
    <text x="675" y="170" fill="#94A3B8" font-family="monospace" font-size="14" text-anchor="middle" text-decoration="line-through">marks = 50</text>
    <text x="675" y="210" fill="#10B981" font-family="monospace" font-size="22" font-weight="bold" text-anchor="middle">marks = 100</text>
    <text x="675" y="235" fill="#34D399" font-family="Arial, sans-serif" font-size="12" font-style="italic" text-anchor="middle">Both update same object</text>

    <!-- Arrows for Case 1 -->
    <path d="M235 130 C 350 130, 450 130, 535 130" stroke="#10B981" stroke-width="3" fill="none" marker-end="url(#arrow-green)" />
    <path d="M235 230 C 350 230, 450 230, 535 180" stroke="#10B981" stroke-width="3" stroke-dasharray="6 4" fill="none" marker-end="url(#arrow-green)" />

    <!-- CASE 2: Reassign Reference -->
    <rect x="30" y="340" width="840" height="280" rx="16" fill="#0F172A" stroke="#F43F5E" stroke-width="2" filter="url(#glow-mem)" />
    <rect x="30" y="340" width="840" height="40" rx="14" fill="#F43F5E" fill-opacity="0.1" />
    <text x="450" y="366" fill="#F43F5E" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" letter-spacing="1">CASE 2: REASSIGN REFERENCE (Change NOT Visible)</text>

    <!-- Stack: main -->
    <rect x="70" y="410" width="180" height="60" rx="8" fill="url(#box-grad)" stroke="#64748B" stroke-width="2" />
    <text x="160" y="435" fill="#94A3B8" font-family="monospace" font-size="12" text-anchor="middle">Stack: main()</text>
    <text x="160" y="455" fill="#F8FAFC" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">ref s (original)</text>
    <circle cx="230" cy="440" r="5" fill="#F43F5E" />

    <!-- Stack: method -->
    <rect x="70" y="530" width="180" height="60" rx="8" fill="url(#box-grad)" stroke="#64748B" stroke-width="2" />
    <text x="160" y="555" fill="#94A3B8" font-family="monospace" font-size="12" text-anchor="middle">Stack: method()</text>
    <text x="160" y="575" fill="#F8FAFC" font-family="monospace" font-size="16" font-weight="bold" text-anchor="middle">ref s (copy)</text>
    <circle cx="230" cy="560" r="5" fill="#38BDF8" />

    <!-- Old Arrow Broken -->
    <path d="M235 560 C 350 560, 450 500, 535 450" stroke="#64748B" stroke-width="2" stroke-dasharray="4 4" fill="none" opacity="0.5" />
    <line x1="370" y1="520" x2="395" y2="480" stroke="#F43F5E" stroke-width="4" />
    <line x1="395" y1="520" x2="370" y2="480" stroke="#F43F5E" stroke-width="4" />

    <!-- Object 1 -->
    <rect x="550" y="400" width="220" height="90" rx="12" fill="#0F172A" stroke="#F43F5E" stroke-width="3" />
    <text x="660" y="430" fill="#FDA4AF" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">Object 1 (Heap)</text>
    <text x="660" y="460" fill="#F8FAFC" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle">marks = 50</text>
    <text x="660" y="480" fill="#94A3B8" font-family="Arial, sans-serif" font-size="12" text-anchor="middle">Unchanged</text>

    <path d="M235 440 C 350 440, 450 440, 535 440" stroke="#F43F5E" stroke-width="3" fill="none" marker-end="url(#arrow-red)" />

    <!-- Object 2 -->
    <rect x="550" y="510" width="220" height="90" rx="12" fill="#0F172A" stroke="#38BDF8" stroke-width="3" filter="url(#glow-mem)" />
    <text x="660" y="540" fill="#7DD3FC" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">Object 2 (Heap)</text>
    <text x="660" y="570" fill="#38BDF8" font-family="monospace" font-size="18" font-weight="bold" text-anchor="middle">marks = 200</text>
    <text x="660" y="590" fill="#94A3B8" font-family="Arial, sans-serif" font-size="12" text-anchor="middle">New Object Created</text>

    <!-- Arrow to Object 2 -->
    <path d="M235 560 C 350 560, 450 560, 535 560" stroke="#38BDF8" stroke-width="3" fill="none" marker-end="url(#arrow-blue)" />

</svg>
</div>
`;

seedModule({
    moduleTitle: 'Pass by Value',
    moduleOrder: 14,
    description: 'Master how data is passed in Java – from primitive copies to reference behaviors.',
    label: 'PASS_VALUE',
    lessons: [
        {
            title: 'Concept of Pass by Value',
            duration: '45 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\"><strong>Pass by Value</strong> means that when a variable is passed to a method, a <strong>copy of its value</strong> is passed, not the original variable itself.</p><div class=\"p-4 bg-indigo-50 border border-indigo-100 rounded-xl mb-4\"><p class=\"text-indigo-900 font-bold\">👉 Any changes made inside the method do <strong>NOT</strong> affect the original variable.</p></div>" },
                { "type": "section", "title": "2. Core Concept (From Scratch)", "rich": "<p class=\"mb-3 font-bold text-slate-800\">In Java, ALL parameters are passed by value.</p><p class=\"mb-2 font-medium text-slate-700\">This includes:</p><ul class=\"list-disc ml-5 space-y-3 mb-6 font-semibold text-slate-700 bg-slate-50 p-4 border rounded-xl\"><li>Primitive types ➔ actual value is copied</li><li>Object references ➔ reference value is copied (NOT the object)</li></ul>" },
                { "type": "section", "title": "3. Key Understanding (Most Important)", "rich": "<p class=\"mb-4 font-bold text-slate-800\">There are two levels of “value”:</p><div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-4\"><div class=\"p-4 bg-white border border-slate-200 rounded-xl shadow-sm\"><p class=\"text-slate-500 font-black uppercase text-xs tracking-widest mb-3\">Case 1: Primitive Types</p><pre class=\"text-xs font-mono bg-slate-100 p-2 border rounded mb-3 text-slate-700\">int x = 10;</pre><p class=\"text-emerald-700 font-bold text-sm bg-emerald-50 p-2 rounded\">👉 Value = 10 ➔ copied</p></div><div class=\"p-4 bg-white border border-slate-200 rounded-xl shadow-sm\"><p class=\"text-slate-500 font-black uppercase text-xs tracking-widest mb-3\">Case 2: Object References</p><pre class=\"text-xs font-mono bg-slate-100 p-2 border rounded mb-3 text-slate-700\">Student s = new Student();</pre><p class=\"text-emerald-700 font-bold text-sm bg-emerald-50 p-2 rounded mb-3\">👉 Value = memory address (reference) ➔ copied</p></div></div>" + WARNING("<p class=\"font-bold mb-0 text-sm\">⚠️ This is where confusion happens!</p>") },
                { "type": "section", "title": "4. Primitive Example (Basic Understanding)", "code": "class Main {\n    static void change(int x) {\n        x = 50;\n    }\n\n    public static void main(String[] args) {\n        int a = 10;\n        change(a);\n\n        System.out.println(a);\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-slate-500\">10</pre>" },
                { "type": "section", "title": "Explanation (Step-by-Step)", "rich": "<ol class=\"list-decimal ml-5 space-y-2 mb-6 text-sm font-medium text-slate-700 bg-slate-50 p-5 rounded-xl border\"><li><code>a = 10</code></li><li><code>change(a)</code> ➔ copy of <code>a</code> is passed</li><li>Inside method ➔ <code>x = 50</code></li><li>Original <code>a</code> is untouched</li><li>Output remains <strong>10</strong></li></ol>" },
                { "type": "section", "title": "5. Object Example (Important Twist)", "code": "class Student {\n    int age;\n}\n\nclass Main {\n    static void change(Student s) {\n        s.age = 25;\n    }\n\n    public static void main(String[] args) {\n        Student s1 = new Student();\n        s1.age = 20;\n\n        change(s1);\n\n        System.out.println(s1.age);\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-indigo-500\">25</pre>" },
                { "type": "section", "title": "Why Did It Change?", "rich": "<div class=\"p-5 bg-indigo-50 border border-indigo-200 rounded-xl mb-6\"><p class=\"mb-3 font-bold text-indigo-900 uppercase tracking-widest text-[11px]\">Because:</p><ul class=\"list-disc ml-5 space-y-2 text-indigo-800 font-medium text-sm\"><li>Copy of reference is passed</li><li>Both original and copy point to SAME object</li><li>So modifying object data affects original</li></ul></div>" },
                { "type": "section", "title": "6. Critical Concept (Interview Level)", "rich": "<p class=\"mb-4 font-black p-3 bg-emerald-100 text-emerald-900 rounded-lg inline-block text-sm\">👉 Java is ALWAYS Pass by Value</p><p class=\"mb-3 font-bold text-slate-700 uppercase tracking-widest text-xs\">BUT:</p><div class=\"overflow-x-auto my-4 shadow-xl rounded-xl border border-slate-700\"><table class=\"w-full text-xs sm:text-sm border-collapse text-left\"><thead><tr class=\"bg-slate-900 text-slate-300 font-black uppercase tracking-wider\"><th class=\"p-3 border-r border-slate-700\">Type</th><th class=\"p-3 border-r border-slate-700 text-sky-400\">What is Passed</th><th class=\"p-3 text-emerald-400\">Result</th></tr></thead><tbody class=\"bg-slate-800 text-slate-400 font-medium\"><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Primitive</td><td class=\"p-3 border-t border-r border-slate-700\">Value copy</td><td class=\"p-3 border-t border-slate-700\">No change</td></tr><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Object</td><td class=\"p-3 border-t border-r border-slate-700\">Reference copy</td><td class=\"p-3 border-t border-slate-700 text-rose-300\">Object can change</td></tr></tbody></table></div>" },
                { "type": "section", "title": "7. Reassignment Case (Very Important)", "code": "class Student {\n    int age;\n}\n\nclass Main {\n    static void change(Student s) {\n        s = new Student(); // NEW object\n        s.age = 50;\n    }\n\n    public static void main(String[] args) {\n        Student s1 = new Student();\n        s1.age = 20;\n\n        change(s1);\n\n        System.out.println(s1.age);\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-slate-400\">20</pre>" },
                { "type": "section", "title": "Explanation", "rich": "<ol class=\"list-decimal ml-5 space-y-2 mb-6 text-sm font-medium text-slate-700 bg-white p-5 rounded-xl border\"><li>Copy of reference passed</li><li>Inside method ➔ new object created</li><li>Copy now points to new object</li><li>Original still points to old object</li><li>So no change outside</li></ol>" },
                { "type": "section", "title": "8. Memory View (JVM Understanding)", "rich": "<div class=\"grid grid-cols-1 md:grid-cols-3 gap-4 mb-6\"><div class=\"p-4 bg-slate-50 border border-slate-200 rounded-xl\"><p class=\"text-slate-800 font-black uppercase text-[10px] tracking-widest mb-3\">Before Method Call:</p><ul class=\"list-disc ml-4 space-y-1 text-xs font-mono text-slate-600\"><li>Stack ➔ s1 ➔ object1</li><li>Heap ➔ object1(age = 20)</li></ul></div><div class=\"p-4 bg-sky-50 border border-sky-200 rounded-xl\"><p class=\"text-sky-800 font-black uppercase text-[10px] tracking-widest mb-3\">Inside Method:</p><ul class=\"list-disc ml-4 space-y-1 text-xs font-mono text-sky-700\"><li>Copy ➔ s ➔ object1</li><li>Modify ➔ affects object1</li></ul></div><div class=\"p-4 bg-emerald-50 border border-emerald-200 rounded-xl\"><p class=\"text-emerald-800 font-black uppercase text-[10px] tracking-widest mb-3\">After Reassignment:</p><ul class=\"list-disc ml-4 space-y-1 text-xs font-mono text-emerald-700\"><li>s ➔ object2</li><li>s1 ➔ object1 (unchanged)</li></ul></div></div>" },
                { "type": "section", "rich": SVG_PASS_BY_VALUE_MEMORY },
                { "type": "section", "title": "9. Common Mistakes", "rich": WARNING("<ul class=\"list-none p-0 space-y-2 text-sm font-medium mb-0\"><li>❌ Thinking Java is pass by reference</li><li>❌ Confusing object modification with reference change</li><li>❌ Assuming reassignment affects original</li></ul>") },
                { "type": "section", "title": "10. Advanced Insight (Real Development)", "rich": "<div class=\"p-5 bg-white border border-slate-200 rounded-xl shadow-sm mb-6\"><p class=\"mb-3 font-bold text-slate-800 text-sm uppercase\">In real projects:</p><ul class=\"list-disc ml-5 space-y-1 mb-4 text-sm text-slate-600 font-medium\"><li>Objects are often passed to methods</li><li>Changes inside methods affect shared state</li></ul><p class=\"mb-2 font-bold text-slate-800\">👉 This is why:</p><ul class=\"list-disc ml-5 space-y-1 mb-0 text-sm text-slate-600 font-medium\"><li>Immutability is important</li><li>Defensive copying is used</li></ul></div>" },
                { "type": "section", "title": "11. Defensive Copy Example (Pro Level)", "code": "class Data {\n    int value;\n\n    Data(int v) {\n        value = v;\n    }\n}\n\nclass Main {\n    static void change(Data d) {\n        Data copy = new Data(d.value);\n        copy.value = 100;\n    }\n\n    public static void main(String[] args) {\n        Data d1 = new Data(10);\n        change(d1);\n\n        System.out.println(d1.value);\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm mb-4 shadow-xl border-l-4 border-slate-500\">10</pre><p class=\"font-black p-3 bg-emerald-100 text-emerald-900 rounded-lg inline-block text-sm\">👉 Original object protected</p>" },
                { "type": "section", "title": "12. Real-World Example", "code": "class BankAccount {\n    int balance;\n\n    void deposit(int amount) {\n        balance += amount;\n    }\n}\n\nclass Main {\n    static void process(BankAccount acc) {\n        acc.deposit(100);\n    }\n\n    public static void main(String[] args) {\n        BankAccount b = new BankAccount();\n        b.balance = 500;\n\n        process(b);\n\n        System.out.println(b.balance);\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-sky-500\">600</pre>" },
                { "type": "section", "title": "13. Key Rules Summary", "rich": "<div class=\"p-5 bg-slate-50 border border-slate-200 rounded-xl mb-6\"><ul class=\"list-none p-0 space-y-3 font-semibold text-slate-700 text-sm\"><li><span class=\"text-emerald-500 mr-2\">✔</span> Java is ALWAYS pass by value</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Primitive ➔ copied value</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Object ➔ copied reference</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Object state can change</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Reference reassignment does NOT affect original</li></ul></div>" },
                { "type": "section", "title": "14. Interview Trap Question", "rich": "<div class=\"p-5 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl mb-6\"><p class=\"text-sky-300 font-bold italic mb-4 flex items-center gap-2\"><span>👉</span> “Is Java pass by reference?”</p><p class=\"text-rose-400 font-bold mb-2 text-sm\">❌ Wrong answer: Yes</p><p class=\"text-emerald-400 font-bold text-sm leading-relaxed\">✅ Correct answer:<br/><span class=\"text-slate-300 font-medium\">No, Java is strictly pass by value, but object references are passed by value.</span></p></div>" },
                { "type": "section", "title": "15. Mental Model", "rich": NOTE("<p class=\"mb-3 font-bold uppercase text-xs tracking-widest\">Think like:</p><p class=\"font-black text-sm mb-4 text-emerald-800 bg-emerald-100 p-2 rounded inline-block\">👉 You give a photocopy of a house address</p><ul class=\"list-disc ml-5 space-y-2 mb-0 font-medium text-sm text-slate-700\"><li>You can modify the house (object)</li><li>But if you change the address copy ➔ original not affected</li></ul>") },
                { "type": "section", "title": "16. Why This Concept is Critical", "rich": "<ul class=\"list-disc ml-5 space-y-3 font-semibold text-slate-700 text-sm bg-white p-5 rounded-xl border\"><li>Used in API design</li><li>Important for debugging</li><li>Essential for memory understanding</li><li>Prevents unexpected bugs</li></ul>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic uppercase text-[10px] font-black\">Test your knowledge of pass by value.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Given the trap question “Is Java pass by reference?”, what is the correct one-word start of the answer? <br/><strong>Match Output:</strong> <code>No</code>", "hints": ["Java is exactly strictly one thing."], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> When passing a primitive <code>int x = 10;</code>, the value is copied. State the value. <br/><strong>Match Output:</strong> <code>10</code>", "hints": ["Look at point 3, Case 1."], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> When an object's reference is passed, does changing its internal properties affect the original? (Yes/No) <br/><strong>Match Output:</strong> <code>Yes</code>", "hints": ["Both original and copy point to SAME object."], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "No", "matchCode": "No" },
                { "index": 2, "match": "10", "matchCode": "10" },
                { "index": 3, "match": "Yes", "matchCode": "Yes" }
            ]
        },
        {
            title: 'Passing Primitive Data Types',
            duration: '40 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\"><strong>Passing Primitive Data Types</strong> means sending primitive values (int, float, double, char, boolean, etc.) as arguments to methods, where Java creates a <strong>separate copy</strong> of the value for the method to use.</p><div class=\"p-4 bg-indigo-50 border border-indigo-100 rounded-xl mb-4\"><p class=\"text-indigo-900 font-bold uppercase tracking-widest text-xs mb-2\">👉 Key Rule</p><p class=\"text-indigo-800 font-medium text-[15px]\">Any modification inside the method does <strong>NOT</strong> affect the original variable.</p></div>" },
                { "type": "section", "title": "2. Core Concept (From Scratch)", "rich": "<p class=\"mb-3 font-bold text-slate-800\">Primitive data types store actual values directly in memory.</p><p class=\"mb-2 font-medium text-slate-700\">When passed to a method:</p><ul class=\"list-decimal ml-5 space-y-3 mb-6 font-semibold text-slate-700 bg-slate-50 p-4 border rounded-xl\"><li>Java copies the value</li><li>The method works on that copy</li><li>Original variable remains unchanged</li></ul>" },
                { "type": "section", "title": "3. Primitive Types in Java", "rich": "<div class=\"flex flex-wrap gap-2 mb-6 font-mono text-sm font-bold text-slate-700\"><span class=\"px-3 py-2 bg-white border rounded shadow-sm\">int</span><span class=\"px-3 py-2 bg-white border rounded shadow-sm\">float</span><span class=\"px-3 py-2 bg-white border rounded shadow-sm\">double</span><span class=\"px-3 py-2 bg-white border rounded shadow-sm\">char</span><span class=\"px-3 py-2 bg-white border rounded shadow-sm\">boolean</span><span class=\"px-3 py-2 bg-white border rounded shadow-sm\">byte</span><span class=\"px-3 py-2 bg-white border rounded shadow-sm\">short</span><span class=\"px-3 py-2 bg-white border rounded shadow-sm\">long</span></div><p class=\"font-black p-3 bg-emerald-100 text-emerald-900 rounded-lg inline-block text-sm\">All of these follow pass-by-value strictly.</p>" },
                { "type": "section", "title": "4. Basic Example (Understanding Copy Behavior)", "code": "class Main {\n    static void modify(int num) {\n        num = num + 10;\n    }\n\n    public static void main(String[] args) {\n        int x = 5;\n\n        modify(x);\n\n        System.out.println(x);\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-slate-500 mb-6\">5</pre>" },
                { "type": "section", "title": "Explanation (Step-by-Step)", "rich": "<ol class=\"list-decimal ml-5 space-y-2 mb-6 text-sm font-medium text-slate-700 bg-slate-50 p-5 rounded-xl border\"><li><code>x = 5</code></li><li><code>modify(x)</code> ➔ copy of 5 is passed</li><li>Inside method ➔ <code>num = 15</code></li><li>Original <code>x</code> remains unchanged</li><li>Output = <strong>5</strong></li></ol>" },
                { "type": "section", "title": "5. Multiple Primitive Parameters", "code": "class Main {\n    static void swap(int a, int b) {\n        int temp = a;\n        a = b;\n        b = temp;\n    }\n\n    public static void main(String[] args) {\n        int x = 10, y = 20;\n\n        swap(x, y);\n\n        System.out.println(x + \" \" + y);\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-rose-500 mb-6\">10 20</pre>" },
                { "type": "section", "title": "Key Insight", "rich": "<div class=\"p-5 bg-rose-50 border border-rose-200 rounded-xl mb-6\"><p class=\"mb-3 font-bold text-rose-900 uppercase tracking-widest text-[11px]\">👉 Swap fails because:</p><ul class=\"list-disc ml-5 space-y-2 text-rose-800 font-medium text-sm\"><li>Only copies are swapped</li><li>Original variables remain unchanged</li></ul></div>" },
                { "type": "section", "title": "6. JVM Memory Behavior (Very Important)", "rich": "<div class=\"grid grid-cols-1 md:grid-cols-3 gap-4 mb-6\"><div class=\"p-4 bg-slate-50 border border-slate-200 rounded-xl\"><p class=\"text-slate-800 font-black uppercase text-[10px] tracking-widest mb-3\">Before Method Call:</p><ul class=\"list-none p-0 ml-1 space-y-1 text-xs font-mono text-emerald-700\"><li>Stack:</li><li>x = 10</li><li>y = 20</li></ul></div><div class=\"p-4 bg-sky-50 border border-sky-200 rounded-xl\"><p class=\"text-sky-800 font-black uppercase text-[10px] tracking-widest mb-3\">During Method Call:</p><p class=\"text-[11px] uppercase tracking-wider text-sky-800 font-bold mb-2\">New stack frame created</p><ul class=\"list-none p-0 ml-1 space-y-1 text-xs font-mono text-sky-700\"><li>a = 10 (copy)</li><li>b = 20 (copy)</li></ul></div><div class=\"p-4 bg-emerald-50 border border-emerald-200 rounded-xl\"><p class=\"text-emerald-800 font-black uppercase text-[10px] tracking-widest mb-3\">After Method Ends:</p><p class=\"text-[11px] uppercase tracking-wider text-emerald-800 font-bold mb-2\">Method stack destroyed</p><p class=\"text-xs font-medium text-slate-700\">Original values remain same</p></div></div>" },
                { "type": "section", "title": "7. Visual Flow", "rich": SVG_PASS_PRIMITIVE_MEMORY },
                { "type": "section", "title": "8. Advanced Example (Mathematical Logic)", "code": "class Main {\n    static int square(int n) {\n        n = n * n;\n        return n;\n    }\n\n    public static void main(String[] args) {\n        int x = 4;\n\n        int result = square(x);\n\n        System.out.println(\"x = \" + x);\n        System.out.println(\"result = \" + result);\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black flex flex-col focus:outline-none text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-indigo-500 mb-6\"><span>x = 4</span><span>result = 16</span></pre>" },
                { "type": "section", "title": "Explanation", "rich": "<ul class=\"list-disc ml-5 space-y-2 mb-6 text-sm font-medium text-slate-700 bg-white p-5 rounded-xl border\"><li><code>x</code> remains unchanged</li><li>Result is returned separately</li><li>Method works on copy</li></ul>" },
                { "type": "section", "title": "9. Important Behavior (Reassignment Inside Method)", "code": "class Main {\n    static void change(int a) {\n        a = 100;\n    }\n\n    public static void main(String[] args) {\n        int x = 50;\n\n        change(x);\n\n        System.out.println(x);\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-slate-400 mb-4\">50</pre><p class=\"font-black p-3 bg-emerald-100 text-emerald-900 rounded-lg inline-block text-sm\">👉 Reassigning inside method does NOT affect original</p>" },
                { "type": "section", "title": "10. Common Mistakes", "rich": WARNING("<ul class=\"list-none p-0 space-y-2 text-sm font-medium mb-0\"><li>❌ Thinking primitive values change outside method</li><li>❌ Expecting swap to work</li><li>❌ Confusing with object behavior</li></ul>") },
                { "type": "section", "title": "11. Real-World Usage", "rich": "<p class=\"mb-3 font-bold text-slate-800 text-sm uppercase\">Primitive passing is used in:</p><ul class=\"list-disc ml-5 space-y-2 mb-6 text-sm text-slate-700 font-medium bg-slate-50 p-4 border rounded-xl\"><li>Calculations (math operations)</li><li>Business logic (tax, discount)</li><li>Utility methods</li></ul><p class=\"font-bold mb-3 uppercase text-xs tracking-widest text-slate-500\">Example:</p>", "code": "class Calculator {\n    static double calculateTax(double amount) {\n        return amount * 0.18;\n    }\n}\n\nclass Main {\n    public static void main(String[] args) {\n        double price = 1000;\n\n        double tax = Calculator.calculateTax(price);\n\n        System.out.println(tax);\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-emerald-500 mb-6\">180.0</pre>" },
                { "type": "section", "title": "12. Best Practices (Professional Level)", "rich": "<div class=\"p-5 bg-white border border-slate-200 rounded-xl mb-6 shadow-sm\"><ul class=\"list-none p-0 space-y-3 font-semibold text-slate-700 text-sm\"><li><span class=\"text-emerald-500 mr-2\">✔</span> Use return values instead of modifying parameters</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Keep methods pure (no side effects)</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Use meaningful parameter names</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Avoid unnecessary reassignment</li></ul></div>" },
                { "type": "section", "title": "13. Interview-Level Questions", "rich": "<div class=\"p-5 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl mb-6\"><ul class=\"space-y-6\"><li class=\"flex flex-col\"><span class=\"text-blue-400 text-[11px] uppercase font-bold italic tracking-wider mb-1\">Q1: Can primitive values change after method call?</span><span class=\"text-rose-400 text-sm font-black\">👉 No</span></li><li class=\"flex flex-col\"><span class=\"text-blue-400 text-[11px] uppercase font-bold italic tracking-wider mb-1\">Q2: Why swap doesn’t work in Java?</span><span class=\"text-emerald-400 text-sm font-bold\">👉 Because values are passed by copy</span></li><li class=\"flex flex-col\"><span class=\"text-blue-400 text-[11px] uppercase font-bold italic tracking-wider mb-1\">Q3: How to swap values then?</span><span class=\"text-emerald-400 text-sm font-bold\">👉 Use object/array wrapper</span></li></ul></div>" },
                { "type": "section", "title": "14. Trick Question", "code": "void change(int x) {\n    x++;\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-[14px] text-slate-800\">👉 Will original change?</p><ul class=\"list-none p-0 space-y-2 font-black text-sm\"><li class=\"text-rose-600\">❌ No</li><li class=\"text-emerald-600\">✔ Only local copy changes</li></ul>" },
                { "type": "section", "title": "15. Mental Model", "rich": NOTE("<p class=\"mb-3 font-bold uppercase text-xs tracking-widest\">Think like:</p><p class=\"font-black text-sm mb-4 text-emerald-800 bg-emerald-100 p-2 rounded inline-block\">👉 You give someone a photocopy of a number</p><ul class=\"list-disc ml-5 space-y-2 mb-0 font-medium text-sm text-slate-700\"><li>They can change their copy</li><li>Your original stays the same</li></ul>") },
                { "type": "section", "title": "16. Why This Concept is Critical", "rich": "<ul class=\"list-disc ml-5 space-y-3 font-semibold text-slate-700 text-sm bg-white p-5 rounded-xl border\"><li>Foundation for understanding Java memory</li><li>Prevents logical bugs</li><li>Important for debugging</li><li>Helps understand method design</li></ul>" },
                { "type": "section", "title": "17. Key Takeaways", "rich": "<div class=\"grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-bold tracking-tight text-slate-600 bg-slate-50 p-4 border rounded-xl text-sm\"><p class=\"flex items-center bg-white p-3 rounded border shadow-sm\"><span class=\"text-emerald-500 mr-2 text-lg\">✔</span> Primitive values are copied</p><p class=\"flex items-center bg-white p-3 rounded border shadow-sm\"><span class=\"text-emerald-500 mr-2 text-lg\">✔</span> Changes do NOT affect original</p><p class=\"flex items-center bg-white p-3 rounded border shadow-sm\"><span class=\"text-emerald-500 mr-2 text-lg\">✔</span> Stored in stack memory</p><p class=\"flex items-center bg-white p-3 rounded border shadow-sm\"><span class=\"text-emerald-500 mr-2 text-lg\">✔</span> Method works on independent copy</p></div>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic uppercase text-[10px] font-black\">Test your knowledge of Primitive Data Passing.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> When primitive data is passed to a method, does Java create a new copy of it or use the original reference? <br/><strong>Match Output:</strong> <code>copy</code>", "hints": ["Look at Point 1 and Key Takeaways."], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Can a method swapping two primitive variables (e.g. <code>a</code> and <code>b</code>) change the original variables outside the method? (Yes/No) <br/><strong>Match Output:</strong> <code>No</code>", "hints": ["Look at Multiple Primitive Parameters output."], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> For primitive passing, does modifying the parameter inside the method affect the original variable? (Yes/No) <br/><strong>Match Output:</strong> <code>No</code>", "hints": ["Look at the definition and Output."], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "copy", "matchCode": "copy" },
                { "index": 2, "match": "No", "matchCode": "No" },
                { "index": 3, "match": "No", "matchCode": "No" }
            ]
        },
        {
            title: 'Memory Behavior (Pass by Value in JVM)',
            duration: '45 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\"><strong>Memory Behavior</strong> in Java explains how data is stored, copied, and manipulated in Stack and Heap when values are passed to methods.</p><p class=\"mb-2 font-bold uppercase tracking-widest text-xs text-indigo-900 border border-indigo-200 bg-indigo-50 p-2 inline-block rounded\">👉 Java is strictly pass-by-value, meaning:</p><ul class=\"list-disc ml-5 space-y-2 mt-4 font-semibold text-slate-700\"><li>A copy of the variable is passed</li><li>The original memory location is never directly shared</li></ul>" },
                { "type": "section", "title": "2. Core Understanding (Very Important)", "rich": "<div class=\"p-5 bg-slate-50 border border-slate-200 rounded-xl mb-6\"><p class=\"mb-3 font-bold text-slate-800\">When a method is called:</p><ol class=\"list-decimal ml-5 space-y-3 font-medium text-sm text-slate-700\"><li>A new stack frame is created</li><li>Parameters are copied into that frame</li><li>Operations happen on the copied values</li><li>Original variables remain unchanged (in most cases)</li></ol></div>" },
                { "type": "section", "title": "Memory Areas Involved", "rich": "<div class=\"mb-4\"></div>" },
                { "type": "section", "title": "3. Stack Memory", "rich": "<div class=\"p-4 bg-sky-50 border border-sky-200 rounded-xl mb-4\"><p class=\"mb-3 font-bold text-sky-900 uppercase text-xs tracking-widest\">Stores:</p><ul class=\"list-disc ml-5 space-y-2 font-bold text-sm text-sky-800\"><li>Method calls</li><li>Local variables</li><li>Copies of parameters</li></ul></div>" },
                { "type": "section", "title": "4. Heap Memory", "rich": "<div class=\"p-4 bg-emerald-50 border border-emerald-200 rounded-xl mb-6\"><p class=\"mb-3 font-bold text-emerald-900 uppercase text-xs tracking-widest\">Stores:</p><ul class=\"list-disc ml-5 space-y-2 font-bold text-sm text-emerald-800\"><li>Objects</li><li>Actual data for reference types</li></ul></div>" },
                { "type": "section", "title": "Primitive Memory Behavior", "code": "public class Main {\n    public static void main(String[] args) {\n        int x = 10;\n        change(x);\n        System.out.println(x);\n    }\n\n    static void change(int x) {\n        x = 50;\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-slate-500 mb-6\">10</pre>" },
                { "type": "section", "title": "5. Step-by-Step Memory Flow (Primitive)", "rich": "<div class=\"space-y-4 mb-6\"><div class=\"p-4 bg-white border border-slate-200 rounded-xl shadow-sm\"><p class=\"text-xs font-black text-slate-400 uppercase tracking-widest mb-2\">Step 1:</p><pre class=\"text-sm font-mono text-slate-700 bg-slate-50 p-2 rounded\">Stack:\nmain()\nx = 10</pre></div><div class=\"p-4 bg-white border border-slate-200 rounded-xl shadow-sm\"><p class=\"text-xs font-black text-blue-400 uppercase tracking-widest mb-2\">Step 2 (Method Call):</p><pre class=\"text-sm font-mono text-blue-800 bg-blue-50 p-2 rounded\">Stack:\nmain() ➔ x = 10\nchange() ➔ x = 10 (copy)</pre></div><div class=\"p-4 bg-white border border-slate-200 rounded-xl shadow-sm\"><p class=\"text-xs font-black text-rose-400 uppercase tracking-widest mb-2\">Step 3 (Modification):</p><pre class=\"text-sm font-mono text-rose-800 bg-rose-50 p-2 rounded\">change() ➔ x = 50\n(main x unchanged)</pre></div><div class=\"p-4 bg-white border border-slate-200 rounded-xl shadow-sm\"><p class=\"text-xs font-black text-emerald-400 uppercase tracking-widest mb-2\">Step 4 (Return):</p><pre class=\"text-sm font-mono text-emerald-800 bg-emerald-50 p-2 rounded\">Stack:\nmain() ➔ x = 10</pre></div></div><p class=\"font-black p-3 bg-emerald-100 text-emerald-900 rounded-lg inline-block text-[14px]\">👉 Conclusion: Primitive values are completely independent copies.</p>" },
                { "type": "section", "title": "6. Object Memory Behavior (Important Twist ⚠️)", "code": "class Student {\n    int marks;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s = new Student();\n        s.marks = 50;\n\n        update(s);\n        System.out.println(s.marks);\n    }\n\n    static void update(Student s) {\n        s.marks = 100;\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-indigo-500 mb-6\">100</pre>" },
                { "type": "section", "title": "Why Did It Change?", "rich": "<div class=\"p-5 bg-indigo-50 border border-indigo-200 rounded-xl mb-6\"><p class=\"mb-3 font-bold text-indigo-900 uppercase tracking-widest text-[11px]\">👉 Java still uses pass-by-value, but:</p><ul class=\"list-disc ml-5 space-y-2 text-indigo-800 font-medium text-sm\"><li>The value passed = reference (address)</li><li>Both copies point to the same object in Heap</li></ul></div>" },
                { "type": "section", "title": "7. Memory Flow (Object Modification)", "rich": "<div class=\"space-y-4 mb-6\"><div class=\"p-4 bg-white border border-slate-200 rounded-xl shadow-sm\"><p class=\"text-xs font-black text-slate-400 uppercase tracking-widest mb-2\">Step 1:</p><pre class=\"text-sm font-mono text-slate-700 bg-slate-50 p-2 rounded\">Heap:\nStudent object ➔ marks = 50\n\nStack:\nmain() ➔ s ➔ (ref ➔ Heap)</pre></div><div class=\"p-4 bg-white border border-slate-200 rounded-xl shadow-sm\"><p class=\"text-xs font-black text-blue-400 uppercase tracking-widest mb-2\">Step 2:</p><pre class=\"text-sm font-mono text-blue-800 bg-blue-50 p-2 rounded\">Stack:\nupdate() ➔ s ➔ (copy of reference ➔ same Heap object)</pre></div><div class=\"p-4 bg-white border border-slate-200 rounded-xl shadow-sm\"><p class=\"text-xs font-black text-emerald-400 uppercase tracking-widest mb-2\">Step 3:</p><pre class=\"text-sm font-mono text-emerald-800 bg-emerald-50 p-2 rounded\">Heap:\nmarks updated ➔ 100</pre></div></div><p class=\"font-black p-3 bg-emerald-100 text-emerald-900 rounded-lg inline-block text-[15px]\">👉 Both references see same object ➔ change visible</p>" },
                { "type": "section", "title": "8. Reassigning Object (Important Case ⚠️)", "code": "static void update(Student s) {\n    s = new Student();\n    s.marks = 200;\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-rose-500 mb-4\">50</pre>" },
                { "type": "section", "title": "Why?", "rich": "<ol class=\"list-decimal ml-5 space-y-2 mb-6 text-sm font-medium text-slate-700 bg-slate-50 p-5 rounded-xl border\"><li>A new object is created</li><li>Only the local copy of reference changes</li><li>Original reference still points to old object</li></ol>" },
                { "type": "section", "title": "9. Visualization", "rich": SVG_PASS_MEMORY_BEHAVIOR },
                { "type": "section", "title": "10. Key Rules (Must Remember)", "rich": "<div class=\"p-5 bg-white border border-slate-200 rounded-xl mb-6 shadow-sm\"><ul class=\"list-none p-0 space-y-3 font-semibold text-slate-700 text-sm mb-4\"><li><span class=\"text-emerald-500 mr-2 text-lg\">✔</span> Java is 100% pass-by-value</li><li><span class=\"text-emerald-500 mr-2 text-lg\">✔</span> Primitive ➔ copy of value</li><li><span class=\"text-emerald-500 mr-2 text-lg\">✔</span> Object ➔ copy of reference</li></ul><p class=\"mb-2 font-bold text-slate-800 uppercase text-xs tracking-widest\">You can:</p><ul class=\"list-none p-0 space-y-2 font-medium text-sm\"><li class=\"text-emerald-700\"><span class=\"mr-2\">✔</span> Modify object</li><li class=\"text-rose-600\"><span class=\"mr-2\">❌</span> Cannot replace original reference</li></ul></div>" },
                { "type": "section", "title": "11. Advanced Example (Combined)", "code": "class Box {\n    int value;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        int a = 5;\n        Box b = new Box();\n        b.value = 10;\n\n        modify(a, b);\n\n        System.out.println(a);\n        System.out.println(b.value);\n    }\n\n    static void modify(int x, Box obj) {\n        x = 20;\n        obj.value = 50;\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black flex flex-col text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-indigo-500 mb-6\"><span>5</span><span>50</span></pre>" },
                { "type": "section", "title": "12. Tracing", "rich": "<div class=\"overflow-x-auto my-4 shadow-xl rounded-xl border border-slate-700\"><table class=\"w-full text-xs sm:text-sm border-collapse text-left\"><thead><tr class=\"bg-slate-900 text-slate-300 font-black uppercase tracking-wider\"><th class=\"p-3 border-r border-slate-700\">Variable</th><th class=\"p-3 border-r border-slate-700\">Before</th><th class=\"p-3 border-r border-slate-700 text-sky-400\">Inside Method</th><th class=\"p-3 text-emerald-400\">After</th></tr></thead><tbody class=\"bg-slate-800 text-slate-400 font-medium\"><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">int a</td><td class=\"p-3 border-t border-r border-slate-700\">5</td><td class=\"p-3 border-t border-r border-slate-700 text-white font-bold bg-slate-700\">20</td><td class=\"p-3 border-t border-slate-700 font-bold text-emerald-400\">5</td></tr><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">obj.value</td><td class=\"p-3 border-t border-r border-slate-700\">10</td><td class=\"p-3 border-t border-r border-slate-700 text-white font-bold bg-slate-700\">50</td><td class=\"p-3 border-t border-slate-700 font-bold text-rose-400\">50</td></tr></tbody></table></div>" },
                { "type": "section", "title": "13. Common Mistakes", "rich": WARNING("<ul class=\"list-none p-0 space-y-2 text-sm font-medium mb-0\"><li>❌ Thinking Java is pass-by-reference</li><li>❌ Expecting primitive changes to reflect</li><li>❌ Confusing reference copy with object copy</li><li>❌ Reassigning object and expecting change</li></ul>") },
                { "type": "section", "title": "14. Real-World Understanding", "rich": "<div class=\"grid grid-cols-1 md:grid-cols-3 gap-3 mb-6\"><div class=\"p-4 bg-white border rounded shadow-sm flex flex-col\"><span class=\"text-blue-500 font-black uppercase text-[10px] mb-2 tracking-widest\">Method</span><span class=\"font-bold text-slate-700 text-sm\">= temporary workspace</span></div><div class=\"p-4 bg-white border rounded shadow-sm flex flex-col\"><span class=\"text-blue-500 font-black uppercase text-[10px] mb-2 tracking-widest\">Parameters</span><span class=\"font-bold text-slate-700 text-sm\">= copies of inputs</span></div><div class=\"p-4 bg-white border rounded shadow-sm flex flex-col\"><span class=\"text-blue-500 font-black uppercase text-[10px] mb-2 tracking-widest\">Heap objects</span><span class=\"font-bold text-slate-700 text-sm\">= shared data layer</span></div></div>" },
                { "type": "section", "title": "15. Deep Insight (Pro Level Thinking)", "rich": "<ul class=\"list-disc ml-5 space-y-3 font-semibold text-slate-700 text-sm bg-slate-50 p-5 rounded-xl border\"><li>JVM ensures memory safety</li><li>No direct pointer manipulation</li><li>Everything controlled via copies</li><li>Prevents unintended side effects</li></ul>" },
                { "type": "section", "title": "16. One-Line Master Rule", "rich": "<p class=\"text-xl font-black text-indigo-900 bg-indigo-50 border-2 border-indigo-200 p-5 rounded-xl text-center leading-relaxed shadow-lg mb-6\">👉 Java always passes copies — but for objects, the copy points to the same memory.</p>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic uppercase text-[10px] font-black\">Test your knowledge of Memory Behavior.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> When an object's reference parameter is reassigned to a <code>new</code> object inside a method, does the original object outside the method change? (Yes/No) <br/><strong>Match Output:</strong> <code>No</code>", "hints": ["Look at Point 8 (Important Case)."], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> In the Combined Tracing example, the primitive <code>int a</code> goes into the method as 5, gets set to 20 inside, and outputs as what value perfectly at the end? <br/><strong>Match Output:</strong> <code>5</code>", "hints": ["Look at the tracing table for 'After' value of 'int a'."], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> According to the One-Line Master Rule, Java always passes what? <br/><strong>Match Output:</strong> <code>copies</code>", "hints": ["...but for objects, it points to the same memory."], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "No", "matchCode": "No" },
                { "index": 2, "match": "5", "matchCode": "5" },
                { "index": 3, "match": "copies", "matchCode": "copies" }
            ]
        }
    ]
}).catch(console.error);
