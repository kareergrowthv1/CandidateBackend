/** Module 11 — Blocks */
const { seedModule } = require('./_helpers');

const NOTE = (text) => `<div class="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 my-4 text-sm font-medium shadow-sm leading-relaxed">${text}</div>`;
const TABLE = (html) => `<div class="overflow-x-auto my-6 border border-slate-200 rounded-xl shadow-sm bg-white"><table class="w-full text-left border-collapse text-sm">${html}</table></div>`;

const SVG_STATIC_BLOCK_FLOW = `
<div class=\"my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1\">
<svg width=\"100%\" height=\"auto\" viewBox=\"0 0 600 420\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"block rounded-xl\">
  <rect width=\"600\" height=\"420\" rx=\"12\" fill=\"#0F172A\"/>
  <rect width=\"600\" height=\"40\" rx=\"12 12 0 0\" fill=\"#1E293B\"/>
  <circle cx=\"20\" cy=\"20\" r=\"5\" fill=\"#EF4444\"/><circle cx=\"40\" cy=\"20\" r=\"5\" fill=\"#F59E0B\"/><circle cx=\"60\" cy=\"20\" r=\"5\" fill=\"#10B981\"/>
  <text x=\"80\" y=\"25\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"12\">static_block_trigger.sh</text>
  
  <!-- Flow Container -->
  <rect x=\"50\" y=\"60\" width=\"500\" height=\"340\" rx=\"16\" fill=\"#1E293B\" fill-opacity=\"0.3\" stroke=\"#334155\"/>
  
  <!-- Step 1: Class Loading -->
  <rect x=\"70\" y=\"80\" width=\"180\" height=\"60\" rx=\"8\" fill=\"#5B21B6\" fill-opacity=\"0.1\" stroke=\"#A78BFA\" stroke-opacity=\"0.4\"/>
  <text x=\"85\" y=\"105\" fill=\"#A78BFA\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"12\">1. Class Loading</text>
  <text x=\"85\" y=\"125\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"9\">JVM loads .class into Method Area</text>

  <!-- Step 2: Static Fields -->
  <rect x=\"70\" y=\"160\" width=\"180\" height=\"60\" rx=\"8\" fill=\"#1E3A8A\" fill-opacity=\"0.1\" stroke=\"#3B82F6\" stroke-opacity=\"0.4\"/>
  <text x=\"85\" y=\"185\" fill=\"#3B82F6\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"12\">2. Static Init</text>
  <text x=\"85\" y=\"205\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"9\">Allocates static variables</text>

  <!-- Step 3: Static Blocks -->
  <rect x=\"350\" y=\"80\" width=\"180\" height=\"140\" rx=\"8\" fill=\"#D97706\" fill-opacity=\"0.1\" stroke=\"#F59E0B\" stroke-opacity=\"0.4\"/>
  <text x=\"365\" y=\"105\" fill=\"#F59E0B\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"12\">3. Static Blocks</text>
  <text x=\"365\" y=\"130\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"10\">static { ... }</text>
  <text x=\"365\" y=\"150\" fill=\"#FDE68A\" font-family=\"monospace\" font-size=\"9\">- Executes Once</text>
  <text x=\"365\" y=\"170\" fill=\"#FDE68A\" font-family=\"monospace\" font-size=\"9\">- Order: Top to Bottom</text>
  <text x=\"365\" y=\"190\" fill=\"#64748B\" font-family=\"monospace\" font-size=\"8\">(JVM Phase: &lt;clinit&gt;)</text>

  <!-- Step 4: Main Entry -->
  <rect x=\"350\" y=\"260\" width=\"180\" height=\"60\" rx=\"8\" fill=\"#065F46\" fill-opacity=\"0.1\" stroke=\"#10B981\" stroke-opacity=\"0.4\"/>
  <text x=\"365\" y=\"285\" fill=\"#10B981\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"12\">4. main() Entry</text>
  <text x=\"365\" y=\"305\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"9\">Application logic starts</text>

  <!-- Arrows -->
  <path d=\"M160 140 L 160 160\" stroke=\"#334155\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/>
  <path d=\"M250 110 L 350 110\" stroke=\"#A78BFA\" stroke-width=\"1.5\" stroke-dasharray=\"4\"/>
  <path d=\"M440 220 L 440 260\" stroke=\"#10B981\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/>

  <text x=\"70\" y=\"360\" fill=\"#94A3B8\" font-family=\"sans-serif\" font-size=\"11\" style=\"font-style: italic;\">\"Static blocks are the very first logic executed when a class is loaded,<br/>happening even before the main() method begins.\"</text>

  <defs>
    <marker id=\"arrow\" viewBox=\"0 0 10 10\" refX=\"5\" refY=\"5\" markerWidth=\"4\" markerHeight=\"4\" orient=\"auto\"><path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"#64748B\"/></marker>
  </defs>
</svg>
<p class=\"px-4 py-2 text-center text-[10px] text-slate-500 font-mono italic\">Class Initialization Flow: The guaranteed sequence of JVM class-level startup.</p>
</div>
`;

const SVG_INSTANCE_BLOCK_FLOW = `
<div class=\"my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1\">
<svg width=\"100%\" height=\"auto\" viewBox=\"0 0 600 440\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"block rounded-xl\">
  <rect width=\"600\" height=\"440\" rx=\"12\" fill=\"#0F172A\"/>
  <rect width=\"600\" height=\"40\" rx=\"12 12 0 0\" fill=\"#1E293B\"/>
  <circle cx=\"20\" cy=\"20\" r=\"5\" fill=\"#EF4444\"/><circle cx=\"40\" cy=\"20\" r=\"5\" fill=\"#F59E0B\"/><circle cx=\"60\" cy=\"20\" r=\"5\" fill=\"#10B981\"/>
  <text x=\"80\" y=\"25\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"12\">instance_init_flow.sh</text>
  
  <!-- Step 1: Trigger -->
  <rect x=\"40\" y=\"60\" width=\"150\" height=\"50\" rx=\"8\" fill=\"#3B82F6\" fill-opacity=\"0.1\" stroke=\"#3B82F6\" stroke-opacity=\"0.4\"/>
  <text x=\"55\" y=\"85\" fill=\"#3B82F6\" font-family=\"monospace\" font-weight=\"bold\" font-size=\"12\">new MyClass()</text>
  <text x=\"55\" y=\"100\" fill=\"#64748B\" font-family=\"sans-serif\" font-size=\"9\">Heap Trigger</text>

  <!-- Step 2: Allocation -->
  <rect x=\"240\" y=\"60\" width=\"150\" height=\"50\" rx=\"8\" fill=\"#10B981\" fill-opacity=\"0.1\" stroke=\"#10B981\" stroke-opacity=\"0.4\"/>
  <text x=\"255\" y=\"85\" fill=\"#10B981\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"11\">1. Heap Memory</text>
  <text x=\"255\" y=\"100\" fill=\"#64748B\" font-family=\"sans-serif\" font-size=\"9\">Space Allocated</text>

  <!-- Step 3: Variables -->
  <rect x=\"430\" y=\"60\" width=\"140\" height=\"50\" rx=\"8\" fill=\"#6366F1\" fill-opacity=\"0.1\" stroke=\"#6366F1\" stroke-opacity=\"0.4\"/>
  <text x=\"445\" y=\"85\" fill=\"#818CF8\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"11\">2. Var Init</text>
  <text x=\"445\" y=\"100\" fill=\"#64748B\" font-family=\"sans-serif\" font-size=\"9\">Default Values</text>

  <!-- Step 4: Instance Block -->
  <rect x=\"200\" y=\"160\" width=\"200\" height=\"100\" rx=\"16\" fill=\"#D97706\" fill-opacity=\"0.1\" stroke=\"#F59E0B\" stroke-opacity=\"0.6\" stroke-width=\"2\"/>
  <text x=\"220\" y=\"190\" fill=\"#F59E0B\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"14\">3. Instance Blocks</text>
  <text x=\"220\" y=\"215\" fill=\"#FDE68A\" font-family=\"monospace\" font-size=\"10\">{ // logic here }</text>
  <text x=\"220\" y=\"235\" fill=\"#94A3B8\" font-family=\"sans-serif\" font-size=\"10\">Runs for every object</text>

  <!-- Step 5: Constructor -->
  <rect x=\"200\" y=\"310\" width=\"200\" height=\"80\" rx=\"16\" fill=\"#065F46\" fill-opacity=\"0.1\" stroke=\"#10B981\" stroke-opacity=\"0.4\"/>
  <text x=\"220\" y=\"340\" fill=\"#10B981\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"14\">4. Constructor</text>
  <text x=\"220\" y=\"365\" fill=\"#FDE68A\" font-family=\"monospace\" font-size=\"10\">MyClass() { ... }</text>
  <text x=\"220\" y=\"380\" fill=\"#64748B\" font-family=\"sans-serif\" font-size=\"9\">(Object context ready)</text>

  <!-- Arrows -->
  <path d=\"M190 85 L 240 85\" stroke=\"#334155\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/>
  <path d=\"M390 85 L 430 85\" stroke=\"#334155\" stroke-width=\"1.5\" marker-end=\"url(#arrow)\"/>
  <path d=\"M500 110 L 500 140 L 300 140 L 300 160\" stroke=\"#A78BFA\" stroke-width=\"1.5\" fill=\"none\" marker-end=\"url(#arrow)\"/>
  <path d=\"M300 260 L 300 310\" stroke=\"#F59E0B\" stroke-width=\"2.5\" marker-end=\"url(#arrow-orange)\"/>

  <defs>
    <marker id=\"arrow\" viewBox=\"0 0 10 10\" refX=\"5\" refY=\"5\" markerWidth=\"4\" markerHeight=\"4\" orient=\"auto\"><path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"#64748B\"/></marker>
    <marker id=\"arrow-orange\" viewBox=\"0 0 10 10\" refX=\"5\" refY=\"5\" markerWidth=\"4\" markerHeight=\"4\" orient=\"auto\"><path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"#F59E0B\"/></marker>
  </defs>
</svg>
<p class=\"px-4 py-2 text-center text-[10px] text-slate-500 font-mono italic\">Object Initialization Flow: Memory → Default Vars → Instance Blocks → Constructor.</p>
</div>
`;

const SVG_LOCAL_BLOCK_SCOPE = `
<div class=\"my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1\">
<svg width=\"100%\" height=\"auto\" viewBox=\"0 0 600 380\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"block rounded-xl\">
  <rect width=\"600\" height=\"380\" rx=\"12\" fill=\"#0F172A\"/>
  <rect width=\"600\" height=\"40\" rx=\"12 12 0 0\" fill=\"#1E293B\"/>
  <circle cx=\"20\" cy=\"20\" r=\"5\" fill=\"#EF4444\"/><circle cx=\"40\" cy=\"20\" r=\"5\" fill=\"#F59E0B\"/><circle cx=\"60\" cy=\"20\" r=\"5\" fill=\"#10B981\"/>
  <text x=\"80\" y=\"25\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"12\">local_scope_viz.sh</text>
  
  <!-- Method Container (Full Frame) -->
  <rect x=\"40\" y=\"60\" width=\"520\" height=\"280\" rx=\"16\" fill=\"#1E293B\" fill-opacity=\"0.3\" stroke=\"#334155\"/>
  <text x=\"55\" y=\"85\" fill=\"#3B82F6\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"12\">Method Stack Frame (main)</text>

  <!-- Outside Variable -->
  <rect x=\"60\" y=\"110\" width=\"120\" height=\"40\" rx=\"8\" fill=\"#3B82F6\" fill-opacity=\"0.1\" stroke=\"#3B82F6\" stroke-opacity=\"0.4\"/>
  <text x=\"75\" y=\"135\" fill=\"#93C5FD\" font-family=\"monospace\" font-size=\"11\">int x = 5;</text>
  <text x=\"190\" y=\"133\" fill=\"#64748B\" font-family=\"sans-serif\" font-size=\"9\">// Alive throughout method</text>

  <!-- Local Block Scope -->
  <rect x=\"60\" y=\"170\" width=\"440\" height=\"120\" rx=\"12\" fill=\"#D97706\" fill-opacity=\"0.05\" stroke=\"#F59E0B\" stroke-opacity=\"0.3\" stroke-dasharray=\"4 4\"/>
  <text x=\"75\" y=\"190\" fill=\"#F59E0B\" font-family=\"monospace\" font-weight=\"bold\" font-size=\"12\">{ // Local Block Entry</text>

  <!-- Inside Variable -->
  <rect x=\"80\" y=\"210\" width=\"120\" height=\"40\" rx=\"8\" fill=\"#F59E0B\" fill-opacity=\"0.1\" stroke=\"#F59E0B\" stroke-opacity=\"0.4\"/>
  <text x=\"95\" y=\"235\" fill=\"#FDE68A\" font-family=\"monospace\" font-size=\"11\">int y = 10;</text>
  <text x=\"210\" y=\"233\" fill=\"#64748B\" font-family=\"sans-serif\" font-size=\"9\">// Only alive within these dashes</text>

  <!-- Block Exit -->
  <text x=\"75\" y=\"280\" fill=\"#F59E0B\" font-family=\"monospace\" font-weight=\"bold\" font-size=\"12\">} // Local Block Exit (y is destroyed)</text>

  <!-- Arrows -->
  <path d=\"M120 150 L 120 170\" stroke=\"#334155\" stroke-width=\"1\" marker-end=\"url(#arrow)\"/>
  <path d=\"M140 250 L 140 265\" stroke=\"#F59E0B\" stroke-width=\"1.5\" stroke-dasharray=\"2\" marker-end=\"url(#arrow-orange)\"/>

  <defs>
    <marker id=\"arrow\" viewBox=\"0 0 10 10\" refX=\"5\" refY=\"5\" markerWidth=\"4\" markerHeight=\"4\" orient=\"auto\"><path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"#64748B\"/></marker>
    <marker id=\"arrow-orange\" viewBox=\"0 0 10 10\" refX=\"5\" refY=\"5\" markerWidth=\"4\" markerHeight=\"4\" orient=\"auto\"><path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"#F59E0B\"/></marker>
  </defs>
</svg>
<p class=\"px-4 py-2 text-center text-[10px] text-slate-500 font-mono italic\">Variable Scope Lifetime: Variables inside <code>{ }</code> are pushed to stack and popped upon exit.</p>
</div>
`;

const SVG_BLOCK_EXECUTION_ORDER = `
<div class=\"my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1\">
<svg width=\"100%\" height=\"auto\" viewBox=\"0 0 600 520\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"block rounded-xl\">
  <rect width=\"600\" height=\"520\" rx=\"12\" fill=\"#0F172A\"/>
  <rect width=\"600\" height=\"40\" rx=\"12 12 0 0\" fill=\"#1E293B\"/>
  <circle cx=\"20\" cy=\"20\" r=\"5\" fill=\"#EF4444\"/><circle cx=\"40\" cy=\"20\" r=\"5\" fill=\"#F59E0B\"/><circle cx=\"60\" cy=\"20\" r=\"5\" fill=\"#10B981\"/>
  <text x=\"80\" y=\"25\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"12\">golden_flow_execution.sh</text>
  
  <!-- Flow Chart -->
  <!-- Step 1: Static -->
  <rect x=\"200\" y=\"60\" width=\"200\" height=\"60\" rx=\"30\" fill=\"#5B21B6\" fill-opacity=\"0.1\" stroke=\"#8B5CF6\" stroke-width=\"2\"/>
  <text x=\"300\" y=\"90\" fill=\"#DDD6FE\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"13\" text-anchor=\"middle\">1. Static Blocks</text>
  <text x=\"300\" y=\"105\" fill=\"#A78BFA\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">(Class Loading Phase)</text>

  <!-- Step 2: Main -->
  <rect x=\"200\" y=\"160\" width=\"200\" height=\"60\" rx=\"8\" fill=\"#065F46\" fill-opacity=\"0.1\" stroke=\"#10B981\" stroke-width=\"2\"/>
  <text x=\"300\" y=\"190\" fill=\"#D1FAE5\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"13\" text-anchor=\"middle\">2. main() Method</text>
  <text x=\"300\" y=\"205\" fill=\"#10B981\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">(Application Starts)</text>

  <!-- Step 3: Instance -->
  <rect x=\"200\" y=\"260\" width=\"200\" height=\"60\" rx=\"30\" fill=\"#7C2D12\" fill-opacity=\"0.1\" stroke=\"#F97316\" stroke-width=\"2\"/>
  <text x=\"300\" y=\"290\" fill=\"#FFEDD5\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"13\" text-anchor=\"middle\">3. Instance Blocks</text>
  <text x=\"300\" y=\"305\" fill=\"#F97316\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">(Object Init Phase)</text>

  <!-- Step 4: Constructor -->
  <rect x=\"200\" y=\"360\" width=\"200\" height=\"60\" rx=\"8\" fill=\"#1E3A8A\" fill-opacity=\"0.1\" stroke=\"#3B82F6\" stroke-width=\"2\"/>
  <text x=\"300\" y=\"390\" fill=\"#DBEAFE\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"13\" text-anchor=\"middle\">4. Constructor</text>
  <text x=\"300\" y=\"405\" fill=\"#60A5FA\" font-family=\"monospace\" font-size=\"9\" text-anchor=\"middle\">(Object Construction)</text>

  <!-- Final State -->
  <rect x=\"200\" y=\"450\" width=\"200\" height=\"40\" rx=\"8\" fill=\"#10B981\" fill-opacity=\"0.2\"/>
  <text x=\"300\" y=\"475\" fill=\"#10B981\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"12\" text-anchor=\"middle\">OBJECT READY ✅</text>

  <!-- Vertical Arrows -->
  <path d=\"M300 120 L 300 160\" stroke=\"#334155\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/>
  <path d=\"M300 220 L 300 260\" stroke=\"#334155\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/>
  <path d=\"M300 320 L 300 360\" stroke=\"#334155\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/>
  <path d=\"M300 420 L 300 450\" stroke=\"#334155\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/>

  <defs>
    <marker id=\"arrow\" viewBox=\"0 0 10 10\" refX=\"5\" refY=\"5\" markerWidth=\"4\" markerHeight=\"4\" orient=\"auto\"><path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"#64748B\"/></marker>
  </defs>
</svg>
<p class=\"px-4 py-2 text-center text-[10px] text-slate-500 font-mono italic\">The Golden Flow: JVM Guaranteed Execution Sequence for Classes and Objects.</p>
</div>
`;

seedModule({
    moduleTitle: 'Blocks',
    moduleOrder: 11,
    description: 'Static, instance, local blocks; execution order.',
    label: 'BLOCKS',
    lessons: [
        {
            title: 'Static Blocks',
            duration: '32 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\">A <strong>static block</strong> in Java is a special block of code that executes <strong>once</strong> when the class is loaded into memory, before any object is created and even before the <code>main()</code> method runs.</p><p class=\"mb-4\">It is mainly used for initializing static variables or performing one-time setup operations at the class level.</p>" },
                { "type": "section", "title": "2. Concept Explanation", "rich": "<p class=\"mb-4\">When a Java program starts, the JVM loads the class into memory. During this phase:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Static variables are initialized</li><li>Static blocks are executed</li><li>Only after that → <code>main()</code> method starts</li></ul>" + NOTE("<strong>👉 Insight:</strong> Static blocks are part of the class initialization phase, not object execution.") },
                { "type": "section", "title": "3. Syntax", "code": "static {\n    // initialization logic\n}" },
                { "type": "section", "title": "4. Key Characteristics", "rich": "<ul class=\"grid grid-cols-1 md:grid-cols-2 gap-3 mb-6\"><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">⌛ Executes only once per class</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🚀 Runs before main()</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🏗️ Runs before constructor</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🧊 Static context only</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🚫 Cannot access instance fields</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">⚙️ Supports complex logic</li></ul>" },
                { "type": "section", "title": "5. Execution Order (Very Important)", "rich": "<ol class=\"list-decimal ml-5 space-y-2 mb-4\"><li>Static variables initialized</li><li>Static blocks executed (top to bottom)</li><li><code>main()</code> method starts</li><li>Objects created (constructors run)</li></ol>" },
                { "type": "section", "title": "Visual Flow Understanding", "rich": SVG_STATIC_BLOCK_FLOW },
                { "type": "section", "title": "6. Basic Example", "code": "class Test {\n    static {\n        System.out.println(\"Static Block Executed\");\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Main Method\");\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-6 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4\">Static Block Executed\nMain Method</pre>" },
                { "type": "section", "title": "7. Internal Working (Step-by-Step)", "rich": "<ul class=\"list-decimal ml-5 space-y-1 mb-4\"><li>JVM loads Test class</li><li>Static block runs immediately</li><li>Then <code>main()</code> starts execution</li></ul>" },
                { "type": "section", "title": "8. Multiple Static Blocks", "code": "class Demo {\n    static {\n        System.out.println(\"Block 1\");\n    }\n    static {\n        System.out.println(\"Block 2\");\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Main\");\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-6 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4\">Block 1\nBlock 2\nMain</pre>" + NOTE("<strong>Key Point:</strong> Static blocks execute in order (top → bottom).") },
                { "type": "section", "title": "9. Static Variable + Static Block", "code": "class Config {\n    static int value;\n    static {\n        value = 100;\n        System.out.println(\"Initialized value\");\n    }\n    public static void main(String[] args) {\n        System.out.println(value);\n    }\n}" },
                { "type": "section", "title": "10. Real-World Use Case (Configuration Setup)", "rich": "<p class=\"mb-4\">Used for: Database configs, File loading, API initialization.</p>", "code": "class AppConfig {\n    static String DB_URL;\n    static {\n        DB_URL = \"jdbc:mysql://localhost:3306/app\";\n        System.out.println(\"Database Config Loaded\");\n    }\n}" },
                { "type": "section", "title": "11. Advanced Example (Complex Initialization)", "code": "import java.util.HashMap;\nimport java.util.Map;\n\nclass CountryCodes {\n    static final Map<String, String> CODES = new HashMap<>();\n    static {\n        CODES.put(\"IN\", \"India\");\n        CODES.put(\"US\", \"United States\");\n        CODES.put(\"UK\", \"United Kingdom\");\n    }\n    public static void main(String[] args) {\n        System.out.println(CODES.get(\"IN\"));\n    }\n}" },
                { "type": "section", "title": "12. Static Blocks in Inheritance", "code": "class Parent {\n    static {\n        System.out.println(\"Parent Static Block\");\n    }\n}\n\nclass Child extends Parent {\n    static {\n        System.out.println(\"Child Static Block\");\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Main Method\");\n    }\n}" },
                { "type": "section", "rich": NOTE("<strong>Key Concept:</strong> Parent static block executes before child.") },
                { "type": "section", "title": "13. Static Block vs Constructor", "rich": TABLE(`<thead><tr class=\"bg-slate-100\"><th class=\"px-4 py-3 border-r font-bold\">Feature</th><th class=\"px-4 py-3 border-r font-bold\">Static Block</th><th class=\"px-4 py-3 font-bold\">Constructor</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-3 border-r\">Runs</td><td class=\"px-4 py-3 border-r text-blue-600\">Once</td><td class=\"px-4 py-3 text-emerald-600\">Every object</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r\">Timing</td><td class=\"px-4 py-3 border-r\">Class load</td><td class=\"px-4 py-3\">Object creation</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r\">Access</td><td class=\"px-4 py-3 border-r\">Static only</td><td class=\"px-4 py-3 text-amber-600\">Instance + static</td></tr><tr><td class=\"px-4 py-3 border-r\">Purpose</td><td class=\"px-4 py-3 border-r\">Setup (Class)</td><td class=\"px-4 py-3\">Init (Object)</td></tr></tbody>`) },
                { "type": "section", "title": "14. Exception Handling in Static Blocks", "rich": "<p class=\"mb-4\">If an exception occurs in a static block, the class fails to load.</p>", "code": "class Test {\n    static {\n        try {\n            int x = 10 / 0;\n        } catch (Exception e) {\n            System.out.println(\"Handled\");\n        }\n    }\n}" },
                { "type": "section", "rich": NOTE("<strong>Important:</strong> Always handle exceptions to avoid <strong>ExceptionInInitializerError</strong>.") },
                { "type": "section", "title": "15. Common Mistakes", "rich": "<ul class=\"space-y-4 mb-6\"><li><span class=\"text-red-600 font-bold\">❌ 1. Using instance variables</span><p class=\"text-sm text-slate-500\">Static blocks run in static context.</p></li><li><span class=\"text-red-600 font-bold\">❌ 2. Heavy logic inside static block</span><p class=\"text-sm text-slate-500\">Makes class loading slow.</p></li><li><span class=\"text-red-600 font-bold\">❌ 3. Assuming it runs multiple times</span><p class=\"text-sm text-slate-500\">Runs exactly once per JVM session.</p></li><li><span class=\"text-red-600 font-bold\">❌ 4. Not handling exceptions</span><p class=\"text-sm text-slate-500\">Can crash application at startup.</p></li></ul>" },
                { "type": "section", "title": "16. Advanced JVM Insight", "rich": "<p class=\"mb-4\">Static blocks execute during class loading phase. Stored in Method Area. Triggered by:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Object creation</li><li>Static method call</li><li>Static variable access</li></ul>" },
                { "type": "section", "title": "17. When to Use Static Blocks", "rich": "<ul class=\"grid grid-cols-2 gap-4 mb-6\"><li class=\"p-4 border rounded-lg shadow-sm bg-blue-50\">One-time initialization</li><li class=\"p-4 border rounded-lg shadow-sm bg-emerald-50\">Preparing static data</li><li class=\"p-4 border rounded-lg shadow-sm bg-amber-50\">Loading configs/resources</li><li class=\"p-4 border rounded-lg shadow-sm bg-violet-50\">Pre-calculating static constants</li></ul>" },
                { "type": "section", "title": "18. Execution Trigger Example", "code": "class LoadTest {\n    static {\n        System.out.println(\"Loaded\");\n    }\n    static void show() {}\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        LoadTest.show(); // triggers static block\n    }\n}" },
                { "type": "section", "title": "19. One-Line Concept Clarity", "rich": NOTE("Static blocks are class-level initialization code that runs once at class loading, before anything else in the program.") },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic\">Master the timing and usage of static blocks.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Create a class with a static block that prints \"SB\" and a main method that prints \"M\". Observe the order. <br/><strong>Match Output:</strong> <code>SB\nM</code>", "hints": ["Static block runs before main"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Use a static block to initialize a static variable <code>secret = 777</code>. Print <code>secret</code> in main. <br/><strong>Match Output:</strong> <code>777</code>", "hints": ["Declare static int secret; then init in static {}"], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Demonstrate Inheritance order. Class <code>A</code> has static block printing \"A\". Class <code>B extends A</code> has static block printing \"B\". Run <code>B</code>'s main. <br/><strong>Match Output:</strong> <code>A\nB</code>", "hints": ["Parent static block runs first"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "SB[\\s\\S]*M", "matchCode": "static[\\s\\S]*println" },
                { "index": 2, "match": "777", "matchCode": "secret[\\s\\S]*=[\\s\\S]*777" },
                { "index": 3, "match": "A[\\s\\S]*B", "matchCode": "extends" }
            ]
        },
        {
            title: 'Instance Blocks',
            duration: '32 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\">An <strong>instance block</strong> (also called an instance initializer block) is a block of code that runs <strong>every time</strong> an object is created, just before the constructor executes.</p><p class=\"mb-4\">It is mainly used to perform common initialization logic that should run for every object, regardless of which constructor is used.</p>" },
                { "type": "section", "title": "2. Concept Explanation", "rich": "<p class=\"mb-4\">Whenever you create an object using <code>new</code>:</p><ul class=\"list-decimal ml-5 space-y-1 mb-4\"><li>Memory is allocated in the Heap</li><li>Instance variables get default values</li><li>Instance block executes</li><li>Constructor executes</li></ul>" + NOTE("<strong>👉 Insight:</strong> Instance blocks are part of the object initialization phase, not class loading.") },
                { "type": "section", "title": "3. Syntax", "code": "{\n    // instance initialization logic\n}" },
                { "type": "section", "rich": "<ul class=\"list-disc ml-5 space-y-1 mt-4\"><li>No keyword like <code>static</code></li><li>Written directly inside the class</li></ul>" },
                { "type": "section", "title": "4. Key Characteristics", "rich": "<ul class=\"grid grid-cols-1 md:grid-cols-2 gap-3 mb-6\"><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">👤 Executes every time an object is created</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🚀 Runs before constructor</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🔗 Accesses both Instance + Static vars</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🧹 Avoids duplicate code in constructors</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🔢 Multiple instance blocks permitted</li></ul>" },
                { "type": "section", "title": "5. Execution Order (Very Important)", "rich": "<ol class=\"list-decimal ml-5 space-y-2 mb-4\"><li>Static variables initialized</li><li>Static blocks executed</li><li><code>main()</code> starts</li><li>Object creation begins</li><li>Instance variables initialized</li><li>Instance blocks executed</li><li>Constructor executed</li></ol>" },
                { "type": "section", "title": "Visual Flow Understanding", "rich": SVG_INSTANCE_BLOCK_FLOW },
                { "type": "section", "title": "6. Basic Example", "code": "class Test {\n    {\n        System.out.println(\"Instance Block Executed\");\n    }\n\n    Test() {\n        System.out.println(\"Constructor Executed\");\n    }\n\n    public static void main(String[] args) {\n        Test t1 = new Test();\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-6 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4\">Instance Block Executed\nConstructor Executed</pre>" },
                { "type": "section", "title": "7. Internal Working (Step-by-Step)", "rich": "<p class=\"mb-4\">When <code>Test t1 = new Test();</code> runs:</p><ul class=\"list-decimal ml-5 space-y-1 mb-4\"><li>JVM allocates memory in Heap</li><li>Initializes variables</li><li>Runs instance block</li><li>Calls constructor</li></ul>" },
                { "type": "section", "title": "8. Multiple Instance Blocks", "code": "class Demo {\n    {\n        System.out.println(\"Block 1\");\n    }\n    {\n        System.out.println(\"Block 2\");\n    }\n    Demo() {\n        System.out.println(\"Constructor\");\n    }\n    public static void main(String[] args) {\n        new Demo();\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-6 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4\">Block 1\nBlock 2\nConstructor</pre>" + NOTE("<strong>Key Point:</strong> Instance blocks execute in top → bottom order.") },
                { "type": "section", "title": "9. Instance Block with Variables", "code": "class Student {\n    String name;\n    {\n        name = \"Default Name\";\n        System.out.println(\"Initialized name\");\n    }\n    Student() {\n        System.out.println(\"Constructor\");\n    }\n    public static void main(String[] args) {\n        Student s = new Student();\n        System.out.println(s.name);\n    }\n}" },
                { "type": "section", "title": "10. Real Use Case (Common Initialization)", "rich": "<p class=\"mb-4\">Used for default roles or shared values across multiple constructors.</p>", "code": "class User {\n    int id;\n    String role;\n    {\n        role = \"USER\"; // default role\n    }\n    User(int id) { this.id = id; }\n    User(int id, String role) {\n        this.id = id;\n        this.role = role;\n    }\n}" },
                { "type": "section", "title": "11. Instance Block + Constructor Overloading", "code": "class Product {\n    int price;\n    {\n        price = 100; // common initialization\n        System.out.println(\"Block\");\n    }\n    Product() {\n        System.out.println(\"Default Constructor\");\n    }\n    Product(int p) {\n        price = p;\n        System.out.println(\"Parameterized Constructor\");\n    }\n    public static void main(String[] args) {\n        new Product();\n        new Product(200);\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-6 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4\">Block\nDefault Constructor\nBlock\nParameterized Constructor</pre>" },
                { "type": "section", "title": "12. Instance Block vs Constructor", "rich": TABLE(`<thead><tr class=\"bg-slate-100\"><th class=\"px-4 py-3 border-r font-bold\">Feature</th><th class=\"px-4 py-3 border-r font-bold\">Instance Block</th><th class=\"px-4 py-3 font-bold\">Constructor</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-3 border-r\">Runs</td><td class=\"px-4 py-3 border-r\">Before constructor</td><td class=\"px-4 py-3\">After block</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r\">Frequency</td><td class=\"px-4 py-3 border-r\">Every object</td><td class=\"px-4 py-3\">Every object</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r\">Name</td><td class=\"px-4 py-3 border-r italic\">No name</td><td class=\"px-4 py-3\">Same as class</td></tr><tr><td class=\"px-4 py-3 border-r\">Purpose</td><td class=\"px-4 py-3 border-r\">Common logic</td><td class=\"px-4 py-3 font-semibold\">Object-specific setup</td></tr></tbody>`) },
                { "type": "section", "title": "13. Instance Block vs Static Block", "rich": TABLE(`<thead><tr class=\"bg-slate-100\"><th class=\"px-4 py-3 border-r font-bold\">Feature</th><th class=\"px-4 py-3 border-r font-bold\">Instance Block</th><th class=\"px-4 py-3 font-bold\">Static Block</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-3 border-r\">Runs</td><td class=\"px-4 py-3 border-r text-emerald-600 font-bold\">Every object</td><td class=\"px-4 py-3 text-blue-600 font-bold\">Once per class</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r\">Timing</td><td class=\"px-4 py-3 border-r\">Object creation</td><td class=\"px-4 py-3\">Class loading</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r\">Access</td><td class=\"px-4 py-3 border-r font-medium\">Instance + static</td><td class=\"px-4 py-3 font-medium\">Only static</td></tr><tr><td class=\"px-4 py-3 border-r\">Memory</td><td class=\"px-4 py-3 border-r underline\">Heap phase</td><td class=\"px-4 py-3 underline\">Method Area phase</td></tr></tbody>`) },
                { "type": "section", "title": "14. Advanced Concept (Inheritance)", "code": "class Parent {\n    {\n        System.out.println(\"Parent Instance Block\");\n    }\n    Parent() {\n        System.out.println(\"Parent Constructor\");\n    }\n}\n\nclass Child extends Parent {\n    {\n        System.out.println(\"Child Instance Block\");\n    }\n    Child() {\n        System.out.println(\"Child Constructor\");\n    }\n    public static void main(String[] args) {\n        new Child();\n    }\n}" },
                { "type": "section", "rich": NOTE("<strong>Key Concept:</strong> Parent instance block runs before child.") },
                { "type": "section", "title": "15. Common Mistakes", "rich": "<ul class=\"space-y-4 mb-6\"><li><span class=\"text-red-600 font-bold\">❌ 1. Assuming it runs once</span><p class=\"text-sm text-slate-500\">Runs for every single object created.</p></li><li><span class=\"text-red-600 font-bold\">❌ 2. Writing heavy logic</span><p class=\"text-sm text-slate-500\">Makes object creation noticeably slow.</p></li><li><span class=\"text-red-600 font-bold\">❌ 3. Confusing with constructor</span><p class=\"text-sm text-slate-500\">They are separate phases but both fire on 'new'.</p></li><li><span class=\"text-red-600 font-bold\">❌ 4. Overusing instance blocks</span><p class=\"text-sm text-slate-500\">Can make class structure harder to read.</p></li></ul>" },
                { "type": "section", "title": "16. Advanced JVM Insight", "rich": "<ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Instance blocks execute during object initialization</li><li>Stored as part of class bytecode</li><li>Executed automatically before constructor</li><li>Runs in Heap lifecycle phase</li></ul>" },
                { "type": "section", "title": "17. When to Use Instance Blocks", "rich": "<ul class=\"grid grid-cols-2 gap-4 mb-6\"><li class=\"p-4 border rounded-lg shadow-sm bg-blue-50\">Shared logic in all constructors</li><li class=\"p-4 border rounded-lg shadow-sm bg-emerald-50\">Cleaner constructor code</li><li class=\"p-4 border rounded-lg shadow-sm bg-amber-50\">Complex instance field init</li><li class=\"p-4 border rounded-lg shadow-sm bg-violet-50\">Pre-calculating object data</li></ul>" },
                { "type": "section", "title": "18. Execution Flow Example (Full)", "code": "class Flow {\n    static {\n        System.out.println(\"Static Block\");\n    }\n    {\n        System.out.println(\"Instance Block\");\n    }\n    Flow() {\n        System.out.println(\"Constructor\");\n    }\n    public static void main(String[] args) {\n        new Flow();\n    }\n}" },
                { "type": "section", "title": "19. One-Line Concept Clarity", "rich": NOTE("Instance blocks are object-level initialization blocks that run before the constructor every time an object is created.") },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic\">Master the timing and usage of instance initialization blocks.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Create a class with an instance block that prints \"IB\" and a constructor that prints \"C\". Create an object in main. <br/><strong>Match Output:</strong> <code>IB\nC</code>", "hints": ["Instance block runs before constructor"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Use an instance block to set <code>id = 101</code>. Print <code>id</code> in the constructor. <br/><strong>Match Output:</strong> <code>101</code>", "hints": ["Declare int id; inside class, set in { id = 101; }"], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Create <code>class A</code> with instance block printing \"A\" and <code>class B extends A</code> with instance block printing \"B\". Create <code>new B()</code>. <br/><strong>Match Output:</strong> <code>A\nB</code>", "hints": ["Parent instance block runs before child"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "IB[\\s\\S]*C", "matchCode": "\\{[\\s\\S]*println" },
                { "index": 2, "match": "101", "matchCode": "id[\\s\\S]*=[\\s\\S]*101" },
                { "index": 3, "match": "A[\\s\\S]*B", "matchCode": "extends" }
            ]
        },
        {
            title: 'Local Blocks',
            duration: '32 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\">A <strong>local block</strong> in Java is a block of code enclosed within <code>{ }</code> inside a method, constructor, or another block. It is used to limit the scope of variables, organize logic, and control execution flow.</p><p class=\"mb-4\">Unlike static or instance blocks, local blocks <strong>do not run automatically</strong> — they execute only when the program flow reaches them.</p>" },
                { "type": "section", "title": "2. Concept Explanation", "rich": "<p class=\"mb-4\">In Java, variables declared inside a method normally have scope throughout the method. But sometimes, you want temporary variables, limited visibility, and cleaner code.</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Reduce variable scope</li><li>Avoid conflicts</li><li>Improve readability</li></ul>" },
                { "type": "section", "title": "3. Syntax", "code": "{\n    // local block code\n}" },
                { "type": "section", "rich": "<p class=\"mt-4 mb-2 font-semibold\">Inside a method:</p><pre class=\"p-4 bg-slate-100 rounded-lg\">public void test() {\n    {\n        int x = 10;\n        System.out.println(x);\n    }\n}</pre>" },
                { "type": "section", "title": "4. Key Characteristics", "rich": "<ul class=\"grid grid-cols-1 md:grid-cols-2 gap-3 mb-6\"><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">📍 Defined inside methods/constructors</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🛤️ Executes when reached in flow</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🔒 Variables restricted to block</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">⚡ Memory optimization (stack)</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🏗️ Better structure</li></ul>" },
                { "type": "section", "title": "5. Scope Concept (Very Important)", "code": "public class Demo {\n    public static void main(String[] args) {\n        {\n            int x = 10;\n            System.out.println(x); // ✅ accessible\n        }\n        // System.out.println(x); ❌ ERROR\n    }\n}", "rich": NOTE("<strong>Key Rule:</strong> A variable exists only inside the block where it is defined.") },
                { "type": "section", "title": "6. Basic Example", "code": "public class Test {\n    public static void main(String[] args) {\n        {\n            int a = 5;\n            System.out.println(\"Inside Block: \" + a);\n        }\n        System.out.println(\"Outside Block\");\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-6 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4\">Inside Block: 5\nOutside Block</pre>" },
                { "type": "section", "title": "7. Internal Working", "rich": "<p class=\"mb-4\">When execution reaches <code>{ int a = 5; }</code>:</p><ol class=\"list-decimal ml-5 space-y-1 mb-4\"><li>JVM creates variable <code>a</code> in Stack Memory</li><li>Executes the logic within the block</li><li>Automatically removes <code>a</code> after the block ends</li></ol>" },
                { "type": "section", "title": "Visual Scope Understanding", "rich": SVG_LOCAL_BLOCK_SCOPE },
                { "type": "section", "title": "8. Nested Local Blocks", "code": "public class NestedBlock {\n    public static void main(String[] args) {\n        int x = 10;\n        {\n            int y = 20;\n            System.out.println(x + y);\n            {\n                int z = 30;\n                System.out.println(x + y + z);\n            }\n        }\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-6 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4\">30\n60</pre>" },
                { "type": "section", "title": "9. Real Use Case (Temporary Calculation)", "code": "public class Calc {\n    public static void main(String[] args) {\n        int result;\n        {\n            int a = 10;\n            int b = 20;\n            result = a + b;\n        }\n        System.out.println(result);\n    }\n}", "rich": NOTE("<strong>Why useful?</strong> <code>a</code> and <code>b</code> are not needed outside, so they are kept local and destroyed early.") },
                { "type": "section", "title": "10. Variable Shadowing", "code": "public class Shadow {\n    public static void main(String[] args) {\n        int x = 5;\n        {\n            int x = 10; // ❌ ERROR (same scope conflict)\n        }\n    }\n}", "rich": NOTE("<strong>Important:</strong> You cannot redeclare a variable in an overlapping scope in Java.") },
                { "type": "section", "title": "11. Loop + Local Block", "code": "for (int i = 0; i < 3; i++) {\n    {\n        int temp = i * 2;\n        System.out.println(temp);\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-6 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4\">0\n2\n4</pre>" },
                { "type": "section", "title": "12. Memory Behavior", "rich": "<ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Local variables are stored in <strong>Stack Memory</strong></li><li>They are destroyed immediately after block execution</li><li>Helps reduce overall memory usage and avoids variable pollution</li></ul>" },
                { "type": "section", "title": "13. Local Block vs Other Blocks", "rich": TABLE(`<thead><tr class=\"bg-slate-100\"><th class=\"px-4 py-3 border-r font-bold text-xs\">Feature</th><th class=\"px-4 py-3 border-r font-bold text-xs\">Local Block</th><th class=\"px-4 py-3 border-r font-bold text-xs\">Instance Block</th><th class=\"px-4 py-3 font-bold text-xs\">Static Block</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-3 border-r text-xs font-bold\">Location</td><td class=\"px-4 py-3 border-r text-xs\">Inside method</td><td class=\"px-4 py-3 border-r text-xs\">Inside class</td><td class=\"px-4 py-3 text-xs\">Inside class</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r text-xs font-bold\">Execution</td><td class=\"px-4 py-3 border-r text-xs\">When reached</td><td class=\"px-4 py-3 border-r text-xs\">Every object</td><td class=\"px-4 py-3 text-xs\">Once per class</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r text-xs font-bold\">Purpose</td><td class=\"px-4 py-3 border-r text-xs\">Scope control</td><td class=\"px-4 py-3 border-r text-xs\">Object init</td><td class=\"px-4 py-3 text-xs\">Class init</td></tr><tr><td class=\"px-4 py-3 border-r text-xs font-bold\">Keyword</td><td class=\"px-4 py-3 border-r text-xs italic\">None</td><td class=\"px-4 py-3 border-r text-xs italic\">None</td><td class=\"px-4 py-3 text-xs font-mono\">static</td></tr></tbody>`) },
                { "type": "section", "title": "14. Advanced Concept (Try-Catch Blocks)", "code": "public class Example {\n    public static void main(String[] args) {\n        try {\n            int x = 10 / 0;\n        } catch (Exception e) {\n            System.out.println(\"Error handled\");\n        }\n    }\n}", "rich": NOTE("<strong>Note:</strong> <code>try</code> and <code>catch</code> are also special types of local blocks.") },
                { "type": "section", "title": "15. Common Mistakes", "rich": "<ul class=\"space-y-4 mb-6\"><li><span class=\"text-red-600 font-bold\">❌ 1. Variable outside block</span><p class=\"text-sm text-slate-500\">Accessing a local block variable after the closing brace.</p></li><li><span class=\"text-red-600 font-bold\">❌ 2. Unnecessary blocks</span><p class=\"text-sm text-slate-500\">Overusing blocks makes code harder to read.</p></li><li><span class=\"text-red-600 font-bold\">❌ 3. Confusion with Instance/Static</span><p class=\"text-sm text-slate-500\">Local blocks are NOT automatic initialization logic.</p></li></ul>" },
                { "type": "section", "title": "16. When to Use Local Blocks", "rich": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6\"><div class=\"p-4 border rounded-lg bg-emerald-50\"><p class=\"font-bold\">✅ Use when:</p><ul class=\"text-sm list-disc ml-4\"><li>Temporary variables needed</li><li>Avoiding conflicts</li><li>Isolating complex logic</li></ul></div><div class=\"p-4 border rounded-lg bg-red-50\"><p class=\"font-bold\">❌ Avoid when:</p><ul class=\"text-sm list-disc ml-4\"><li>No scope restriction needed</li><li>Makes code complex</li></ul></div></div>" },
                { "type": "section", "title": "17. Execution Flow Example", "code": "public class Flow {\n    public static void main(String[] args) {\n        System.out.println(\"Start\");\n        {\n            int x = 10;\n            System.out.println(\"Inside Block\");\n        }\n        System.out.println(\"End\");\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-6 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4\">Start\nInside Block\nEnd</pre>" },
                { "type": "section", "title": "18. One-Line Concept Clarity", "rich": NOTE("Local blocks are scope-control structures used to limit variable visibility and manage temporary logic within methods.") },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic\">Practice restricting variable scope using local blocks.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Create a method with a local block containing <code>int temp = 55;</code>. Print <code>temp</code> inside the block. <br/><strong>Match Output:</strong> <code>55</code>", "hints": ["Wrap the logic in { }", "Use System.out.println(temp)"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Use a local block for a temporary calculation <code>int result = 10 + 20;</code>. Print <code>result</code> inside the block. <br/><strong>Match Output:</strong> <code>30</code>", "hints": ["Logic inside { }", "Keep it simple"], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Demonstrate flow. Print \"Start\", then a local block printing \"Mid\", then \"End\". <br/><strong>Match Output:</strong> <code>Start\nMid\nEnd</code>", "hints": ["Sequence: println, { println }, println"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "55", "matchCode": "\\{[\\s\\S]*temp" },
                { "index": 2, "match": "30", "matchCode": "\\{[\\s\\S]*result[\\s\\S]*30" },
                { "index": 3, "match": "Start[\\s\\S]*Mid[\\s\\S]*End", "matchCode": "\\{" }
            ]
        },
        {
            title: 'Execution Order of Blocks',
            duration: '32 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\"><strong>Execution Order of Blocks</strong> refers to the sequence in which different blocks of code execute in a Java program. This includes Static Blocks, Instance Blocks, Constructors, and Methods.</p><p class=\"mb-4\">Understanding this order is critical to know how the JVM initializes classes and objects internally.</p>" },
                { "type": "section", "title": "2. Concept Explanation", "rich": "<p class=\"mb-4\">When a Java program runs, two major phases occur:</p><div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-4\"><div class=\"p-4 border rounded-xl bg-violet-50\"><p class=\"font-bold text-violet-900\">Phase 1: Class Loading</p><ul class=\"text-sm text-violet-800\"><li>Static variables initialized</li><li>Static blocks executed</li></ul></div><div class=\"p-4 border rounded-xl bg-orange-50\"><p class=\"font-bold text-orange-900\">Phase 2: Object Creation</p><ul class=\"text-sm text-orange-800\"><li>Instance variables initialized</li><li>Instance blocks executed</li><li>Constructor executed</li></ul></div></div>" },
                { "type": "section", "title": "3. Complete Execution Order (Golden Flow)", "rich": "<ol class=\"list-decimal ml-8 space-y-2 mb-6 font-medium text-slate-700\"><li>Static variables initialization</li><li>Static blocks execution (top → bottom)</li><li><code>main()</code> method starts</li><li>Object creation begins (via <code>new</code>)</li><li>Instance variables initialization</li><li>Instance blocks execution (top → bottom)</li><li>Constructor execution</li></ol>" },
                { "type": "section", "title": "Visual Golden Flow Understanding", "rich": SVG_BLOCK_EXECUTION_ORDER },
                { "type": "section", "title": "4. Basic Example (Full Flow)", "code": "class Demo {\n    static {\n        System.out.println(\"1. Static Block\");\n    }\n    {\n        System.out.println(\"3. Instance Block\");\n    }\n    Demo() {\n        System.out.println(\"4. Constructor\");\n    }\n    public static void main(String[] args) {\n        System.out.println(\"2. Main Method\");\n        new Demo();\n    }\n}" },
                { "type": "section", "title": "5. Output", "rich": "<p class=\"mt-6 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">Full Order:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4\">1. Static Block\n2. Main Method\n3. Instance Block\n4. Constructor</pre>" },
                { "type": "section", "title": "6. Step-by-Step Internal Working", "rich": "<ul class=\"space-y-4 mb-6\"><li><span class=\"font-bold text-violet-600\">Step 1: Class Loading</span><p class=\"text-sm text-slate-500\">JVM loads class. Static block runs immediately.</p></li><li><span class=\"font-bold text-emerald-600\">Step 2: main() Starts</span><p class=\"text-sm text-slate-500\">Application entry point execution begins.</p></li><li><span class=\"font-bold text-orange-600\">Step 3: Object Creation</span><p class=\"text-sm text-slate-500\">Space allocated in Heap. Instance block runs before constructor.</p></li></ul>" },
                { "type": "section", "title": "7. Multiple Blocks Example", "code": "class Test {\n    static { System.out.println(\"Static 1\"); }\n    static { System.out.println(\"Static 2\"); }\n    { System.out.println(\"Instance 1\"); }\n    { System.out.println(\"Instance 2\"); }\n    Test() { System.out.println(\"Constructor\"); }\n    public static void main(String[] args) {\n        new Test();\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-6 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4\">Static 1\nStatic 2\nInstance 1\nInstance 2\nConstructor</pre>", "title": "Order is Top → Bottom" },
                { "type": "section", "title": "8. Inheritance Execution Order (VERY IMPORTANT)", "code": "class Parent {\n    static { System.out.println(\"Parent Static\"); }\n    { System.out.println(\"Parent Instance\"); }\n    Parent() { System.out.println(\"Parent Constructor\"); }\n}\n\nclass Child extends Parent {\n    static { System.out.println(\"Child Static\"); }\n    { System.out.println(\"Child Instance\"); }\n    Child() { System.out.println(\"Child Constructor\"); }\n    public static void main(String[] args) {\n        new Child();\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-6 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">Inheritance Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs\">Parent Static\nChild Static\nParent Instance\nParent Constructor\nChild Instance\nChild Constructor</pre>", "title": "Parent First, Always" },
                { "type": "section", "title": "9. Deep Understanding (Hierarchy Flow)", "rich": "<div class=\"p-4 border border-blue-200 bg-blue-50 rounded-xl mb-6\"><p class=\"font-bold text-blue-900 mb-2\">⚡ Static Phase:</p><p class=\"text-sm\">Parent Static → Child Static (Once)</p><p class=\"font-bold text-blue-900 mt-4 mb-2\">⚡ Object Phase:</p><p class=\"text-sm\">Parent Instance → Parent Constructor → Child Instance → Child Constructor (Every Object)</p></div>" },
                { "type": "section", "title": "10. Memory-Level Explanation (JVM View)", "rich": TABLE(`<thead><tr class=\"bg-slate-100\"><th class=\"px-4 py-3 border-r font-bold\">Phase</th><th class=\"px-4 py-3 border-r font-bold\">Memory Area</th><th class=\"px-4 py-3 font-bold\">JVM Trigger</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-3 border-r text-violet-600 font-bold\">Static</td><td class=\"px-4 py-3 border-r\">Method Area</td><td class=\"px-4 py-3 text-sm italic\">Class Loading</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r text-orange-600 font-bold\">Instance</td><td class=\"px-4 py-3 border-r\">Heap Memory</td><td class=\"px-4 py-3 text-sm italic\">Object Instantiation</td></tr><tr><td class=\"px-4 py-3 border-r\">Method</td><td class=\"px-4 py-3 border-r\">Stack Memory</td><td class=\"px-4 py-3 text-sm italic\">Application Flow</td></tr></tbody>`) },
                { "type": "section", "title": "11. Full Combined Example (Advanced)", "code": "class Flow {\n    static int a = initA();\n    static { System.out.println(\"Static Block\"); }\n    int b = initB();\n    { System.out.println(\"Instance Block\"); }\n    Flow() { System.out.println(\"Constructor\"); }\n    static int initA() { System.out.println(\"Var A\"); return 10; }\n    int initB() { System.out.println(\"Var B\"); return 20; }\n    public static void main(String[] args) {\n        new Flow();\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-6 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">Advanced Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4\">Var A\nStatic Block\nVar B\nInstance Block\nConstructor</pre>" },
                { "type": "section", "title": "12. Important Rules (Must Remember)", "rich": "<ul class=\"space-y-3 mb-6\"><li class=\"p-3 bg-slate-50 border rounded-lg\">🚀 <strong>Static:</strong> Once per JVM.</li><li class=\"p-3 bg-slate-50 border rounded-lg\">👤 <strong>Instance:</strong> Every object.</li><li class=\"p-3 bg-slate-50 border rounded-lg\">🚫 <strong>Access:</strong> Static cannot touch Instance directly.</li><li class=\"p-3 bg-slate-50 border rounded-lg\">⏬ <strong>Order:</strong> Top to bottom written.</li><li class=\"p-3 bg-slate-50 border rounded-lg\">👪 <strong>Hierarchy:</strong> Parent executes before child.</li></ul>" },
                { "type": "section", "title": "13. Common Mistakes", "rich": "<ul class=\"space-y-4 mb-6\"><li><span class=\"text-red-600 font-bold\">❌ 1. Expecting static multiple times</span><p class=\"text-sm text-slate-500\">It runs once ONLY, when class enters memory.</p></li><li><span class=\"text-red-600 font-bold\">❌ 2. Forgetting inheritance order</span><p class=\"text-sm text-slate-500\">JVM always ensures Parent is ready first.</p></li><li><span class=\"text-red-600 font-bold\">❌ 3. Mixing static & instance</span><p class=\"text-sm text-slate-500\">Static blocks cannot access non-static fields directly.</p></li><li><span class=\"text-red-600 font-bold\">❌ 4. Constructor first?</span><p class=\"text-sm text-slate-500\">False — Instance blocks run BEFORE the constructor logic.</p></li></ul>" },
                { "type": "section", "title": "14. Interview Trick Question", "code": "class A {\n    static { System.out.println(\"A\"); }\n    { System.out.println(\"B\"); }\n    A() { System.out.println(\"C\"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        new A();\n        new A();\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-6 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">OUTPUT:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl\">A\nB\nC\nB\nC</pre>" + NOTE("<strong>Insight:</strong> 'A' (static) prints only once during class load, while 'B' (instance) and 'C' (constructor) print for each new object created.") },
                { "type": "section", "title": "15. Real-World Use", "rich": "<div class=\"grid grid-cols-1 md:grid-cols-3 gap-4 mb-6\"><div class=\"p-3 border rounded shadow-sm\"><strong>Static:</strong> Configs/DB</div><div class=\"p-3 border rounded shadow-sm\"><strong>Instance:</strong> Shared Init</div><div class=\"p-3 border rounded shadow-sm\"><strong>Constructor:</strong> Custom Setup</div></div>" },
                { "type": "section", "title": "16. One-Line Concept Clarity", "rich": NOTE("Execution order defines how JVM initializes classes first (static), then objects (instance + constructor) in a strict, predictable sequence.") },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic\">Master the golden sequence of Java block execution.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Create a class with a static block and an instance block. Print \"S\" and \"I\". Create an object. <br/><strong>Match Output:</strong> <code>S\nI</code>", "hints": ["JVM runs static first, then instance during creation"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Demonstrate Inheritance. Parent has static block printing \"P\". Child extends Parent with static block \"C\". <br/><strong>Match Output:</strong> <code>P\nC</code>", "hints": ["Parent static block runs before child static"], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Create a class with static and instance blocks. Instantiate it twice in main. <br/><strong>Match Output:</strong> <code>S\nI\nI</code>", "hints": ["Observe that static runs only once for both objects"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "S[\\s\\S]*I", "matchCode": "static[\\s\\S]*println" },
                { "index": 2, "match": "P[\\s\\S]*C", "matchCode": "extends" },
                { "index": 3, "match": "S[\\s\\S]*I[\\s\\S]*I", "matchCode": "new[\\s\\S]*new" }
            ]
        }
    ],
}).catch(console.error);
