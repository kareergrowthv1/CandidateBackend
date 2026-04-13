/** Module 10 — Non-Static and JVM Memory */
const { seedModule } = require('./_helpers');

const TABLE = (html) => `<div class=\"overflow-hidden border rounded-lg active-border-color my-6\"><table class=\"w-full text-left border-collapse\">${html}</table></div>`;
const NOTE = (text) => `<div class=\"p-4 my-6 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg\"><div class=\"flex items-center gap-3\"><span class=\"text-xl\">ℹ️</span><p class=\"text-sm font-medium text-blue-800\">${text}</p></div></div>`;

const SVG_VAR_MEMORY = `
<div class=\"my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1\">
<svg width=\"100%\" height=\"auto\" viewBox=\"0 0 600 350\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"block rounded-xl\">
  <rect width=\"600\" height=\"350\" rx=\"12\" fill=\"#0F172A\"/>
  <rect width=\"600\" height=\"40\" rx=\"12 12 0 0\" fill=\"#1E293B\"/>
  <circle cx=\"20\" cy=\"20\" r=\"5\" fill=\"#EF4444\"/><circle cx=\"40\" cy=\"20\" r=\"5\" fill=\"#F59E0B\"/><circle cx=\"60\" cy=\"20\" r=\"5\" fill=\"#10B981\"/>
  <text x=\"80\" y=\"25\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"12\">jvm_memory_inspector.exe (Variables)</text>
  <text x=\"50\" y=\"75\" fill=\"#3B82F6\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"14\">STACK MEMORY</text>
  <text x=\"50\" y=\"90\" fill=\"#64748B\" font-family=\"monospace\" font-size=\"10\">(References)</text>
  <rect x=\"50\" y=\"105\" width=\"180\" height=\"60\" rx=\"8\" fill=\"#1E293B\" stroke=\"#3B82F6\" stroke-opacity=\"0.3\"/>
  <text x=\"65\" y=\"125\" fill=\"#64748B\" font-family=\"monospace\" font-size=\"10\">pointer</text>
  <text x=\"65\" y=\"145\" fill=\"#F8FAFC\" font-family=\"monospace\" font-size=\"14\" font-weight=\"bold\">s1</text>
  <rect x=\"160\" y=\"125\" width=\"55\" height=\"18\" rx=\"4\" fill=\"#3B82F6\" fill-opacity=\"0.2\"/>
  <text x=\"166\" y=\"138\" fill=\"#60A5FA\" font-family=\"monospace\" font-size=\"10\">0x101</text>
  <rect x=\"50\" y=\"185\" width=\"180\" height=\"60\" rx=\"8\" fill=\"#1E293B\" stroke=\"#3B82F6\" stroke-opacity=\"0.3\"/>
  <text x=\"65\" y=\"205\" fill=\"#64748B\" font-family=\"monospace\" font-size=\"10\">pointer</text>
  <text x=\"65\" y=\"225\" fill=\"#F8FAFC\" font-family=\"monospace\" font-size=\"14\" font-weight=\"bold\">s2</text>
  <rect x=\"160\" y=\"205\" width=\"55\" height=\"18\" rx=\"4\" fill=\"#3B82F6\" fill-opacity=\"0.2\"/>
  <text x=\"166\" y=\"218\" fill=\"#60A5FA\" font-family=\"monospace\" font-size=\"10\">0x102</text>
  <path d=\"M235 135 C 270 135, 270 115, 310 115\" stroke=\"#3B82F6\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/>
  <path d=\"M235 215 C 270 215, 270 235, 310 235\" stroke=\"#3B82F6\" stroke-width=\"2\" marker-end=\"url(#arrow)\"/>
  <defs><marker id=\"arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" fill=\"#3B82F6\"/></marker></defs>
  <text x=\"320\" y=\"75\" fill=\"#10B981\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"14\">HEAP MEMORY</text>
  <text x=\"320\" y=\"90\" fill=\"#64748B\" font-family=\"monospace\" font-size=\"10\">(Objects)</text>
  <rect x=\"320\" y=\"105\" width=\"230\" height=\"85\" rx=\"12\" fill=\"#065F46\" fill-opacity=\"0.1\" stroke=\"#10B981\" stroke-opacity=\"0.3\"/>
  <text x=\"335\" y=\"122\" fill=\"#10B981\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"10\">STUDENT INSTANCE</text>
  <text x=\"500\" y=\"122\" fill=\"#10B981\" font-family=\"monospace\" font-size=\"10\">0x101</text>
  <rect x=\"330\" y=\"132\" width=\"210\" height=\"20\" rx=\"4\" fill=\"#1E293B\"/>
  <text x=\"338\" y=\"146\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"10\">name</text><text x=\"465\" y=\"146\" fill=\"#6EE7B7\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\">\"Sharan\"</text>
  <rect x=\"330\" y=\"156\" width=\"210\" height=\"20\" rx=\"4\" fill=\"#1E293B\"/>
  <text x=\"338\" y=\"170\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"10\">age</text><text x=\"495\" y=\"170\" fill=\"#6EE7B7\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\">22</text>
  <rect x=\"320\" y=\"215\" width=\"230\" height=\"85\" rx=\"12\" fill=\"#065F46\" fill-opacity=\"0.1\" stroke=\"#10B981\" stroke-opacity=\"0.3\"/>
  <text x=\"335\" y=\"232\" fill=\"#10B981\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"10\">STUDENT INSTANCE</text>
  <text x=\"500\" y=\"232\" fill=\"#10B981\" font-family=\"monospace\" font-size=\"10\">0x102</text>
  <rect x=\"330\" y=\"242\" width=\"210\" height=\"20\" rx=\"4\" fill=\"#1E293B\"/>
  <text x=\"338\" y=\"256\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"10\">name</text><text x=\"465\" y=\"256\" fill=\"#6EE7B7\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\">\"Rahul\"</text>
  <rect x=\"330\" y=\"266\" width=\"210\" height=\"20\" rx=\"4\" fill=\"#1E293B\"/>
  <text x=\"338\" y=\"280\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"10\">age</text><text x=\"495\" y=\"280\" fill=\"#6EE7B7\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\">25</text>
</svg>
<p class=\"px-4 py-2 text-center text-[10px] text-slate-500 font-mono italic\">Visualizing Stack (Refs) vs Heap (Data)</p>
</div>
`;

const SVG_METHOD_MEMORY = `
<div class=\"my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1\">
<svg width=\"100%\" height=\"auto\" viewBox=\"0 0 600 400\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"block rounded-xl\">
  <rect width=\"600\" height=\"400\" rx=\"12\" fill=\"#0F172A\"/>
  <rect width=\"600\" height=\"40\" rx=\"12 12 0 0\" fill=\"#1E293B\"/>
  <circle cx=\"20\" cy=\"20\" r=\"5\" fill=\"#EF4444\"/><circle cx=\"40\" cy=\"20\" r=\"5\" fill=\"#F59E0B\"/><circle cx=\"60\" cy=\"20\" r=\"5\" fill=\"#10B981\"/>
  <text x=\"80\" y=\"25\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"12\">jvm_memory_inspector.exe (Methods)</text>
  <text x=\"40\" y=\"75\" fill=\"#3B82F6\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"14\">STACK</text>
  <rect x=\"40\" y=\"90\" width=\"160\" height=\"280\" rx=\"8\" fill=\"#1E293B\" fill-opacity=\"0.5\" stroke=\"#3B82F6\" stroke-opacity=\"0.2\"/>
  <rect x=\"50\" y=\"280\" width=\"140\" height=\"40\" rx=\"4\" fill=\"#3B82F6\" fill-opacity=\"0.1\" stroke=\"#3B82F6\" stroke-opacity=\"0.5\"/>
  <text x=\"60\" y=\"305\" fill=\"#F8FAFC\" font-family=\"monospace\" font-size=\"12\" font-weight=\"bold\">main() frame</text>
  <rect x=\"50\" y=\"220\" width=\"140\" height=\"40\" rx=\"4\" fill=\"#F59E0B\" fill-opacity=\"0.1\" stroke=\"#F59E0B\" stroke-opacity=\"0.5\"/>
  <text x=\"60\" y=\"245\" fill=\"#F8FAFC\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\">setData() frame</text>
  <text x=\"60\" y=\"335\" fill=\"#64748B\" font-family=\"monospace\" font-size=\"10\">s1 → 0x101</text>
  <text x=\"240\" y=\"75\" fill=\"#10B981\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"14\">HEAP</text>
  <rect x=\"240\" y=\"90\" width=\"160\" height=\"120\" rx=\"12\" fill=\"#065F46\" fill-opacity=\"0.1\" stroke=\"#10B981\" stroke-opacity=\"0.3\"/>
  <text x=\"250\" y=\"110\" fill=\"#10B981\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"9\">STUDENT OBJECT</text>
  <text x=\"350\" y=\"110\" fill=\"#10B981\" font-family=\"monospace\" font-size=\"9\">0x101</text>
  <text x=\"250\" y=\"140\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"10\">name: \"Sharan\"</text>
  <text x=\"250\" y=\"160\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"10\">age: 22</text>
  <text x=\"440\" y=\"75\" fill=\"#A78BFA\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"14\">METHOD AREA</text>
  <rect x=\"440\" y=\"90\" width=\"130\" height=\"120\" rx=\"8\" fill=\"#5B21B6\" fill-opacity=\"0.1\" stroke=\"#A78BFA\" stroke-opacity=\"0.3\"/>
  <text x=\"450\" y=\"115\" fill=\"#A78BFA\" font-family=\"monospace\" font-size=\"10\">setData()</text>
  <text x=\"450\" y=\"140\" fill=\"#A78BFA\" font-family=\"monospace\" font-size=\"10\">showData()</text>
  <path d=\"M190 240 L 235 150\" stroke=\"#F59E0B\" stroke-width=\"1\" stroke-dasharray=\"4\" marker-end=\"url(#arrow-orange)\"/>
  <path d=\"M440 110 L 190 230\" stroke=\"#A78BFA\" stroke-width=\"1\" stroke-dasharray=\"4\" marker-start=\"url(#dot-purple)\"/>
  <defs>
    <marker id=\"arrow-orange\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" fill=\"#F59E0B\"/></marker>
    <marker id=\"dot-purple\" markerWidth=\"6\" markerHeight=\"6\" refX=\"3\" refY=\"3\" orient=\"auto\"><circle cx=\"3\" cy=\"3\" r=\"3\" fill=\"#A78BFA\"/></marker>
  </defs>
</svg>
<p class=\"px-4 py-2 text-center text-[10px] text-slate-500 font-mono italic\">Method Execution Flow: Method Area (Definition) → Stack (Execution) → Heap (Data)</p>
</div>
`;

const SVG_STACK_LIFO = `
<div class=\"my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1\">
<svg width=\"100%\" height=\"auto\" viewBox=\"0 0 600 400\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"block rounded-xl\">
  <rect width=\"600\" height=\"400\" rx=\"12\" fill=\"#0F172A\"/>
  <rect width=\"600\" height=\"40\" rx=\"12 12 0 0\" fill=\"#1E293B\"/>
  <circle cx=\"20\" cy=\"20\" r=\"5\" fill=\"#EF4444\"/><circle cx=\"40\" cy=\"20\" r=\"5\" fill=\"#F59E0B\"/><circle cx=\"60\" cy=\"20\" r=\"5\" fill=\"#10B981\"/>
  <text x=\"80\" y=\"25\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"12\">stack_execution_viz.sh</text>
  <path d=\"M250 80 L 250 350 L 450 350 L 450 80\" stroke=\"#334155\" stroke-width=\"4\" stroke-linecap=\"round\"/>
  <g class=\"stack-frames\">
    <rect x=\"260\" y=\"300\" width=\"180\" height=\"40\" rx=\"4\" fill=\"#1E293B\" stroke=\"#3B82F6\" stroke-opacity=\"0.5\"/>
    <text x=\"270\" y=\"325\" fill=\"#F8FAFC\" font-family=\"monospace\" font-size=\"12\">main()</text>
    <text x=\"400\" y=\"325\" fill=\"#64748B\" font-family=\"monospace\" font-size=\"10\">1st In</text>
    <rect x=\"260\" y=\"250\" width=\"180\" height=\"40\" rx=\"4\" fill=\"#1E293B\" stroke=\"#F59E0B\" stroke-opacity=\"0.5\"/>
    <text x=\"270\" y=\"275\" fill=\"#F8FAFC\" font-family=\"monospace\" font-size=\"12\">method1()</text>
    <rect x=\"260\" y=\"200\" width=\"180\" height=\"40\" rx=\"4\" fill=\"#1E293B\" stroke=\"#EF4444\" stroke-opacity=\"0.8\"/>
    <text x=\"270\" y=\"225\" fill=\"#F8FAFC\" font-family=\"monospace\" font-size=\"12\">method2()</text>
    <text x=\"390\" y=\"225\" fill=\"#EF4444\" font-family=\"monospace\" font-size=\"10\" font-weight=\"bold\">ACTIVE</text>
  </g>
  <text x=\"50\" y=\"225\" fill=\"#EF4444\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"16\">LIFO</text>
  <text x=\"50\" y=\"245\" fill=\"#64748B\" font-family=\"sans-serif\" font-size=\"10\">Last-In, First-Out</text>
  <path d=\"M470 200 L 470 120\" stroke=\"#10B981\" stroke-width=\"2\" marker-end=\"url(#arrow-green)\"/>
  <text x=\"480\" y=\"160\" fill=\"#10B981\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\">POP</text>
  <path d=\"M230 120 L 230 200\" stroke=\"#3B82F6\" stroke-width=\"2\" marker-end=\"url(#arrow-blue)\"/>
  <text x=\"185\" y=\"160\" fill=\"#3B82F6\" font-family=\"monospace\" font-size=\"11\" font-weight=\"bold\">PUSH</text>
  <defs>
    <marker id=\"arrow-green\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" fill=\"#10B981\"/></marker>
    <marker id=\"arrow-blue\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" fill=\"#3B82F6\"/></marker>
  </defs>
</svg>
<p class=\"px-4 py-2 text-center text-[10px] text-slate-500 font-mono italic\">Stack LIFO Principle: Last method called (method2) is the first to finish.</p>
</div>
`;

const SVG_HEAP_MEMORY = `
<div class=\"my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1\">
<svg width=\"100%\" height=\"auto\" viewBox=\"0 0 600 400\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"block rounded-xl\">
  <rect width=\"600\" height=\"400\" rx=\"12\" fill=\"#0F172A\"/>
  <rect width=\"600\" height=\"40\" rx=\"12 12 0 0\" fill=\"#1E293B\"/>
  <circle cx=\"20\" cy=\"20\" r=\"5\" fill=\"#EF4444\"/><circle cx=\"40\" cy=\"20\" r=\"5\" fill=\"#F59E0B\"/><circle cx=\"60\" cy=\"20\" r=\"5\" fill=\"#10B981\"/>
  <text x=\"80\" y=\"25\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"12\">jvm_heap_inspector.sh</text>
  
  <text x=\"50\" y=\"75\" fill=\"#10B981\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"14\">HEAP AREA (Global Dynamic Entry)</text>
  
  <!-- Object 1 -->
  <rect x=\"50\" y=\"100\" width=\"220\" height=\"100\" rx=\"12\" fill=\"#065F46\" fill-opacity=\"0.1\" stroke=\"#10B981\" stroke-opacity=\"0.4\"/>
  <text x=\"65\" y=\"120\" fill=\"#10B981\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"10\">Student Object (0x101)</text>
  <rect x=\"60\" y=\"130\" width=\"200\" height=\"20\" rx=\"4\" fill=\"#1E293B\"/>
  <text x=\"68\" y=\"144\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"10\">name = \"Rahul\"</text>
  <rect x=\"60\" y=\"155\" width=\"200\" height=\"20\" rx=\"4\" fill=\"#1E293B\"/>
  <text x=\"68\" y=\"169\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"10\">age = 22</text>

  <!-- Object 2 -->
  <rect x=\"330\" y=\"100\" width=\"220\" height=\"100\" rx=\"12\" fill=\"#065F46\" fill-opacity=\"0.1\" stroke=\"#10B981\" stroke-opacity=\"0.4\"/>
  <text x=\"345\" y=\"120\" fill=\"#10B981\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"10\">Student Object (0x102)</text>
  <rect x=\"340\" y=\"130\" width=\"200\" height=\"20\" rx=\"4\" fill=\"#1E293B\"/>
  <text x=\"348\" y=\"144\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"10\">name = \"Sharan\"</text>
  <rect x=\"340\" y=\"155\" width=\"200\" height=\"20\" rx=\"4\" fill=\"#1E293B\"/>
  <text x=\"348\" y=\"169\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"10\">age = 25</text>

  <!-- GC Block -->
  <path d=\"M50 250 L 550 250\" stroke=\"#334155\" stroke-dasharray=\"4\"/>
  <text x=\"50\" y=\"275\" fill=\"#EF4444\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"12\">GARBAGE COLLECTION (GC)</text>
  <rect x=\"50\" y=\"290\" width=\"220\" height=\"60\" rx=\"12\" fill=\"#EF4444\" fill-opacity=\"0.05\" stroke=\"#EF4444\" stroke-opacity=\"0.2\" stroke-dasharray=\"4\"/>
  <text x=\"65\" y=\"315\" fill=\"#EF4444\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"10\">Unreachable Object</text>
  <text x=\"65\" y=\"335\" fill=\"#64748B\" font-family=\"monospace\" font-size=\"9\">(No reference in Stack)</text>
  
  <text x=\"330\" y=\"310\" fill=\"#94A3B8\" font-family=\"sans-serif\" font-size=\"10\" style=\"font-style: italic;\">\"Heap stores objects until they are no longer <br/>reachable, then GC cleans them up automatically.\"</text>

</svg>
<p class=\"px-4 py-2 text-center text-[10px] text-slate-500 font-mono italic\">JVM Heap: Dynamically allocated memory for all objects and their instance variables.</p>
</div>
`;

const SVG_METHOD_AREA_DETAIL = `
<div class=\"my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1\">
<svg width=\"100%\" height=\"auto\" viewBox=\"0 0 600 400\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"block rounded-xl\">
  <rect width=\"600\" height=\"400\" rx=\"12\" fill=\"#0F172A\"/>
  <rect width=\"600\" height=\"40\" rx=\"12 12 0 0\" fill=\"#1E293B\"/>
  <circle cx=\"20\" cy=\"20\" r=\"5\" fill=\"#EF4444\"/><circle cx=\"40\" cy=\"20\" r=\"5\" fill=\"#F59E0B\"/><circle cx=\"60\" cy=\"20\" r=\"5\" fill=\"#10B981\"/>
  <text x=\"80\" y=\"25\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"12\">jvm_method_area_inspector.exe</text>
  
  <text x=\"40\" y=\"75\" fill=\"#A78BFA\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"14\">METHOD AREA (Class Context)</text>
  
  <rect x=\"40\" y=\"90\" width=\"250\" height=\"160\" rx=\"12\" fill=\"#5B21B6\" fill-opacity=\"0.05\" stroke=\"#A78BFA\" stroke-opacity=\"0.3\"/>
  <text x=\"55\" y=\"110\" fill=\"#A78BFA\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"10\">CLASS: Student</text>
  
  <rect x=\"50\" y=\"120\" width=\"230\" height=\"22\" rx=\"4\" fill=\"#1E293B\"/>
  <text x=\"58\" y=\"135\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"10\">static school = \"ABC School\"</text>
  
  <rect x=\"50\" y=\"147\" width=\"230\" height=\"22\" rx=\"4\" fill=\"#1E293B\"/>
  <text x=\"58\" y=\"162\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"10\">method show() { bytecode... }</text>

  <text x=\"55\" y=\"195\" fill=\"#FCD34D\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"10\">RUNTIME CONSTANT POOL</text>
  <rect x=\"50\" y=\"205\" width=\"230\" height=\"35\" rx=\"4\" fill=\"#F59E0B\" fill-opacity=\"0.1\" stroke=\"#FCD34D\" stroke-opacity=\"0.2\"/>
  <text x=\"58\" y=\"226\" fill=\"#FCD34D\" font-family=\"monospace\" font-size=\"10\">\"ABC School\", \"Java\", 100</text>

  <path d=\"M310 75 L 310 350\" stroke=\"#334155\" stroke-dasharray=\"4\"/>

  <text x=\"330\" y=\"75\" fill=\"#10B981\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"14\">HEAP</text>
  <rect x=\"330\" y=\"90\" width=\"230\" height=\"60\" rx=\"12\" fill=\"#065F46\" fill-opacity=\"0.05\" stroke=\"#10B981\" stroke-opacity=\"0.2\"/>
  <text x=\"345\" y=\"110\" fill=\"#64748B\" font-family=\"monospace\" font-size=\"10\">Student Object</text>
  <text x=\"345\" y=\"130\" fill=\"#10B981\" font-family=\"monospace\" font-size=\"10\">[Pointer to Student Class]</text>

  <text x=\"330\" y=\"190\" fill=\"#3B82F6\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"14\">STACK</text>
  <rect x=\"330\" y=\"205\" width=\"230\" height=\"45\" rx=\"8\" fill=\"#1E293B\" stroke=\"#3B82F6\" stroke-opacity=\"0.2\"/>
  <text x=\"345\" y=\"230\" fill=\"#F8FAFC\" font-family=\"monospace\" font-size=\"12\">s1 reference</text>

  <path d=\"M345 220 L 345 150\" stroke=\"#3B82F6\" stroke-width=\"1.5\" marker-end=\"url(#arrow-blue)\"/>
  <path d=\"M345 115 L 290 115\" stroke=\"#10B981\" stroke-width=\"1.5\" stroke-dasharray=\"3\"/>
  
  <text x=\"40\" y=\"320\" fill=\"#94A3B8\" font-family=\"sans-serif\" font-size=\"11\" style=\"font-style: italic;\">\"Method Area stores the 'blueprint' (how the class looks),<br/>Heap stores the 'actual building' (the object).\"</text>

</svg>
<p class=\"px-4 py-2 text-center text-[10px] text-slate-500 font-mono italic\">JVM Method Area: Global class information, constant pool, and static members.</p>
</div>
`;

const SVG_JVM_RUNTIME_AREAS = `
<div class=\"my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1\">
<svg width=\"100%\" height=\"auto\" viewBox=\"0 0 600 420\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"block rounded-xl\">
  <rect width=\"600\" height=\"420\" rx=\"12\" fill=\"#0F172A\"/>
  <rect width=\"600\" height=\"40\" rx=\"12 12 0 0\" fill=\"#1E293B\"/>
  <circle cx=\"20\" cy=\"20\" r=\"5\" fill=\"#EF4444\"/><circle cx=\"40\" cy=\"20\" r=\"5\" fill=\"#F59E0B\"/><circle cx=\"60\" cy=\"20\" r=\"5\" fill=\"#10B981\"/>
  <text x=\"80\" y=\"25\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"12\">jvm_memory_mapper.app</text>
  
  <rect x=\"30\" y=\"60\" width=\"260\" height=\"340\" rx=\"16\" fill=\"#1E293B\" fill-opacity=\"0.4\" stroke=\"#334155\"/>
  <text x=\"45\" y=\"85\" fill=\"#94A3B8\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"10\" style=\"letter-spacing: 0.1em;\">SHARED (ALL THREADS)</text>

  <!-- Method Area -->
  <rect x=\"45\" y=\"100\" width=\"230\" height=\"110\" rx=\"12\" fill=\"#5B21B6\" fill-opacity=\"0.1\" stroke=\"#A78BFA\" stroke-opacity=\"0.3\"/>
  <text x=\"60\" y=\"125\" fill=\"#A78BFA\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"12\">Method Area</text>
  <text x=\"60\" y=\"145\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"10\">- Class Metadata</text>
  <text x=\"60\" y=\"160\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"10\">- Static Variables</text>
  <text x=\"60\" y=\"175\" fill=\"#FCD34D\" font-family=\"monospace\" font-size=\"10\">- Constant Pool</text>

  <!-- Heap -->
  <rect x=\"45\" y=\"225\" width=\"230\" height=\"160\" rx=\"12\" fill=\"#065F46\" fill-opacity=\"0.1\" stroke=\"#10B981\" stroke-opacity=\"0.3\"/>
  <text x=\"60\" y=\"250\" fill=\"#10B981\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"12\">Heap Area</text>
  <text x=\"60\" y=\"270\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"10\">[Object A] (0x01)</text>
  <text x=\"60\" y=\"285\" fill=\"#94A3B8\" font-family=\"monospace\" font-size=\"10\">[Object B] (0x02)</text>
  <rect x=\"60\" y=\"300\" width=\"200\" height=\"60\" rx=\"8\" fill=\"#064E3B\" fill-opacity=\"0.4\"/>
  <text x=\"70\" y=\"320\" fill=\"#10B981\" font-family=\"monospace\" font-size=\"9\">Garbage Collector (GC)</text>
  <path d=\"M80 340 L 240 340\" stroke=\"#10B981\" stroke-width=\"1\" stroke-dasharray=\"2\"/>

  <rect x=\"310\" y=\"60\" width=\"260\" height=\"340\" rx=\"16\" fill=\"#1E293B\" fill-opacity=\"0.4\" stroke=\"#334155\"/>
  <text x=\"325\" y=\"85\" fill=\"#94A3B8\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"10\" style=\"letter-spacing: 0.1em;\">PRIVATE (PER THREAD)</text>

  <!-- Stack -->
  <rect x=\"325\" y=\"100\" width=\"230\" height=\"140\" rx=\"12\" fill=\"#1E3A8A\" fill-opacity=\"0.1\" stroke=\"#3B82F6\" stroke-opacity=\"0.3\"/>
  <text x=\"340\" y=\"125\" fill=\"#3B82F6\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"12\">Stack Memory</text>
  <rect x=\"340\" y=\"135\" width=\"200\" height=\"30\" rx=\"4\" fill=\"#1E293B\" stroke=\"#3B82F6\" stroke-opacity=\"0.2\"/>
  <text x=\"350\" y=\"155\" fill=\"#F8FAFC\" font-family=\"monospace\" font-size=\"10\">Frame: main()</text>
  <rect x=\"340\" y=\"170\" width=\"200\" height=\"30\" rx=\"4\" fill=\"#1E293B\" stroke=\"#3B82F6\" stroke-opacity=\"0.2\"/>
  <text x=\"350\" y=\"190\" fill=\"#F8FAFC\" font-family=\"monospace\" font-size=\"10\">Frame: display()</text>
  <text x=\"340\" y=\"225\" fill=\"#64748B\" font-family=\"monospace\" font-size=\"10\">LIFO Flow (Push/Pop)</text>

  <!-- Native Stack & PC -->
  <rect x=\"325\" y=\"255\" width=\"110\" height=\"130\" rx=\"12\" fill=\"#B91C1C\" fill-opacity=\"0.1\" stroke=\"#EF4444\" stroke-opacity=\"0.3\"/>
  <text x=\"335\" y=\"280\" fill=\"#EF4444\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"10\">Native Stack</text>
  <text x=\"335\" y=\"300\" fill=\"#64748B\" font-family=\"monospace\" font-size=\"8\">C/C++ Libs</text>

  <rect x=\"445\" y=\"255\" width=\"110\" height=\"130\" rx=\"12\" fill=\"#D97706\" fill-opacity=\"0.1\" stroke=\"#F59E0B\" stroke-opacity=\"0.3\"/>
  <text x=\"455\" y=\"280\" fill=\"#F59E0B\" font-family=\"sans-serif\" font-weight=\"bold\" font-size=\"10\">PC Register</text>
  <text x=\"455\" y=\"300\" fill=\"#64748B\" font-family=\"monospace\" font-size=\"8\">Inst: 0x00FF</text>

</svg>
<p class=\"px-4 py-2 text-center text-[10px] text-slate-500 font-mono italic\">Full Component Map: Methodology for JVM Execution Flow and Memory Separation.</p>
</div>
`;

seedModule({
    moduleTitle: 'Non-Static and JVM Memory',
    moduleOrder: 10,
    description: 'Instance variables/methods, stack, heap, and memory areas.',
    label: 'JVM',
    lessons: [
        {
            title: 'Instance Variables',
            duration: '32 min',
            sections: [
                { "type": "section", "title": "1. Concept & Definition", "rich": "<p class=\"mb-4\">Instance variables are non-static variables declared inside a class but outside any method, and they belong to an object (instance) of that class.</p><p class=\"mb-4\">Every time you create an object using the <code>new</code> keyword, a separate copy of instance variables is created for that object. This means each object can store its own unique data.</p><p class=\"mb-4\">At the JVM level, instance variables are stored in <strong>Heap Memory</strong>, inside the object structure.</p>" },
                { "type": "section", "title": "2. How They Work Internally (JVM View)", "rich": "<p class=\"mb-4\">When this line runs:</p>", "code": "Student s1 = new Student();" },
                { "type": "section", "rich": "<p class=\"mt-4 mb-2 font-semibold text-slate-700\">JVM performs:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Allocates memory in Heap</li><li>Creates space for all instance variables</li><li>Assigns default values</li><li>Stores reference <code>s1</code> in Stack</li></ul>" + NOTE("<strong>👉 Important:</strong><br/>• Instance variables live inside the object<br/>• Reference variable lives in Stack<br/>• Actual data lives in Heap") },
                { "type": "section", "title": "3. Syntax Structure", "code": "class ClassName {\n    dataType variableName; // Instance Variable\n}" },
                { "type": "section", "title": "Example:", "code": "class Student {\n    String name;\n    int age;\n}" },
                { "type": "section", "title": "4. Key Characteristics", "rich": "<ul class=\"grid grid-cols-1 md:grid-cols-2 gap-3 mb-6\"><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">👤 Belong to object, not class</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">⚡ Created when object is created</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🧊 Stored in Heap memory</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">📋 Each object gets separate copy</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🔗 Accessed using object reference</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🛠️ Have default values</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🔓 Accessible in methods/constructors</li></ul>" },
                { "type": "section", "title": "5. Default Values (Very Important)", "rich": "<p class=\"mb-4\">If you don’t assign values, Java automatically assigns:</p>" + TABLE(`<thead><tr class=\"bg-slate-100\"><th class=\"px-4 py-3 border-r font-bold\">Type</th><th class=\"px-4 py-3 font-bold\">Default Value</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-mono\">int</td><td class=\"px-4 py-3\">0</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-mono\">float/double</td><td class=\"px-4 py-3\">0.0</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-mono\">boolean</td><td class=\"px-4 py-3\">false</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-mono\">char</td><td class=\"px-4 py-3\">'\\u0000'</td></tr><tr><td class=\"px-4 py-3 border-r font-mono\">Objects</td><td class=\"px-4 py-3 text-amber-600 font-mono\">null</td></tr></tbody>`) },
                { "type": "section", "title": "6. Accessing Instance Variables", "rich": "<p class=\"mb-4\">You must use an object reference:</p>", "code": "objectName.variableName;" },
                { "type": "section", "title": "Example:", "code": "Student s1 = new Student();\ns1.name = \"Sharan\";\ns1.age = 22;" },
                { "type": "section", "title": "7. Complete Working Example (Important)", "code": "class Student {\n    String name;\n    int age;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n\n        Student s1 = new Student();\n        Student s2 = new Student();\n\n        s1.name = \"Sharan\";\n        s1.age = 22;\n\n        s2.name = \"Rahul\";\n        s2.age = 25;\n\n        System.out.println(s1.name + \" - \" + s1.age);\n        System.out.println(s2.name + \" - \" + s2.age);\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-4 mb-2 font-semibold text-slate-700 font-mono text-sm\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4\">Sharan - 22\nRahul - 25</pre>" + NOTE("<strong>👉 Insight:</strong><br/>Each object maintains its own separate data") },
                { "type": "section", "title": "8. Memory Representation (Visual)", "rich": SVG_VAR_MEMORY },
                { "type": "section", "title": "9. Instance vs Local Variables", "rich": TABLE(`<thead><tr class=\"bg-slate-100\"><th class=\"px-4 py-3 border-r font-bold\">Feature</th><th class=\"px-4 py-3 border-r font-bold\">Instance Variable</th><th class=\"px-4 py-3 font-bold\">Local Variable</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-semibold\">Location</td><td class=\"px-4 py-3 border-r\">Class (outside method)</td><td class=\"px-4 py-3\">Inside method</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-semibold\">Memory</td><td class=\"px-4 py-3 border-r\">Heap</td><td class=\"px-4 py-3\">Stack</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-semibold\">Default Value</td><td class=\"px-4 py-3 border-r text-emerald-600\">YES</td><td class=\"px-4 py-3 text-red-600\">NO</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-semibold\">Scope</td><td class=\"px-4 py-3 border-r\">Whole object</td><td class=\"px-4 py-3\">Only method</td></tr><tr><td class=\"px-4 py-3 border-r font-semibold\">Access</td><td class=\"px-4 py-3 border-r\">Object reference</td><td class=\"px-4 py-3\">Direct</td></tr></tbody>`) },
                { "type": "section", "title": "10. Access Inside Methods", "rich": "<p class=\"mb-4\">Instance variables can be used directly inside instance methods:</p>", "code": "class Car {\n    String brand;\n\n    void show() {\n        System.out.println(brand); // Direct access\n    }\n}" },
                { "type": "section", "title": "11. Using this Keyword", "rich": "<p class=\"mb-4\">Used to refer current object:</p>", "code": "class Student {\n    String name;\n\n    Student(String name) {\n        this.name = name;\n    }\n}" },
                { "type": "section", "rich": NOTE("<strong>👉 Helps differentiate:</strong><br/>• instance variable<br/>• method parameter") },
                { "type": "section", "title": "12. Common Mistakes", "rich": "<ul class=\"space-y-4 mb-6\"><li><span class=\"text-red-600 font-bold\">❌ 1. Accessing without object in static method</span></li></ul>", "code": "static void test() {\n    System.out.println(name); // ERROR\n}" },
                { "type": "section", "rich": "<ul class=\"space-y-4 mb-6\"><li><span class=\"text-red-600 font-bold\">❌ 2. Forgetting initialization logic</span><p class=\"text-sm text-slate-500 mt-1\">Leads to unexpected default values (0, null)</p>" + "</li>" + "<li><span class=\"text-red-600 font-bold\">❌ 3. Confusing with static variables</span><p class=\"text-sm text-slate-500 mt-1 italic\">Instance = per object | Static = shared</p></li></ul>" },
                { "type": "section", "title": "13. Real-World Understanding", "rich": "<p class=\"mb-4\">Instance variables represent real-world entity data:</p><div class=\"grid grid-cols-2 gap-4 mb-6\"><div class=\"p-4 border rounded-lg shadow-sm bg-blue-50\"><strong>Student</strong> → name, age</div><div class=\"p-4 border rounded-lg shadow-sm bg-emerald-50\"><strong>Car</strong> → brand, speed</div><div class=\"p-4 border rounded-lg shadow-sm bg-amber-50\"><strong>User</strong> → email, password</div></div><p class=\"italic text-center\">\"Each object stores its own identity\"</p>" },
                { "type": "section", "title": "14. Advanced Insight", "rich": "<p class=\"mb-4\">Instance variables are part of <strong>object state</strong>. They are crucial for Object-Oriented Programming and used in data modeling, encapsulation, and business logic.</p>" },
                { "type": "section", "title": "15. Final Summary", "rich": "<ul class=\"space-y-2 mb-8\"><li>✅ Instance variables belong to objects</li><li>✅ Stored in Heap memory</li><li>✅ Each object gets its own copy</li><li>✅ Accessed using object reference</li><li>✅ Automatically initialized with default values</li></ul>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic\">Test your understanding of instance variables with these hands-on tasks.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Create a <code>Car</code> class with instance variables <code>String model</code> and <code>int speed</code>. In main, create an object, set values to \"Tesla\" and 120, then print them in one line format: <code>model + \" - \" + speed</code>. <br/><strong>Match Output:</strong> <code>Tesla - 120</code>", "hints": ["Model should be String", "Speed should be int"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Check default values. Create a class <code>Check</code> with instance int <code>n</code> and boolean <code>b</code>. Print them: <code>n + \" \" + b</code>. <br/><strong>Match Output:</strong> <code>0 false</code>", "hints": ["Check output should be 0 and false"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "Tesla - 120", "matchCode": "new Car" },
                { "index": 2, "match": "0 false", "matchCode": "println" }
            ]
        },
        {
            title: 'Instance Methods',
            duration: '32 min',
            sections: [
                { "type": "section", "title": "1. Concept & Definition", "rich": "<p class=\"mb-4\">Instance methods are non-static methods defined inside a class that operate on instance variables and require an object to be invoked.</p><p class=\"mb-4\">They represent the <strong>behavior</strong> of an object. Since they are tied to a specific object, they can directly access and modify that object's data.</p><p class=\"mb-4\">At the JVM level, instance methods are stored in the <strong>Method Area</strong>, but they execute using the object’s data in <strong>Heap memory</strong>, accessed via a reference from the <strong>Stack</strong>.</p>" },
                { "type": "section", "title": "2. How They Work Internally (JVM View)", "rich": "<p class=\"mb-4\">When an instance method is called:</p>", "code": "obj.show();" },
                { "type": "section", "rich": "<p class=\"mt-4 mb-2 font-semibold text-slate-700\">JVM performs:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Finds method definition in Method Area</li><li>Uses object reference (obj) from Stack</li><li>Accesses object data from Heap</li><li>Creates a new stack frame for execution</li><li>Destroys frame after completion</li></ul>" + NOTE("<strong>👉 Important:</strong><br/>• Method code → Method Area<br/>• Object data → Heap<br/>• Execution → Stack") },
                { "type": "section", "title": "3. Syntax Structure", "code": "class ClassName {\n    returnType methodName(parameters) {\n        // logic\n    }\n}" },
                { "type": "section", "title": "Example:", "code": "class Student {\n    String name;\n    void display() {\n        System.out.println(name);\n    }\n}" },
                { "type": "section", "title": "4. Key Characteristics", "rich": "<ul class=\"grid grid-cols-1 md:grid-cols-2 gap-3 mb-6\"><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">👤 Belong to object</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">⚡ Require object to call</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🏢 Stored in Method Area</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">👉 Can use this keyword</li></ul>" },
                { "type": "section", "title": "5. Calling Instance Methods", "rich": "<p class=\"mb-4\">Must use object:</p>", "code": "Student s = new Student();\ns.display();" },
                { "type": "section", "title": "6. Complete Working Example", "code": "class Student {\n    String name;\n    void setData(String n) { name = n; }\n    void showData() { System.out.println(name); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student();\n        s1.setData(\"Sharan\");\n        s1.showData();\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-4 mb-2 font-semibold text-slate-700 font-mono text-sm\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4\">Sharan</pre>" },
                { "type": "section", "title": "7. Example with Multiple Objects", "code": "class Car {\n    String brand;\n    void setBrand(String b) { brand = b; }\n    void display() { System.out.println(brand); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Car c1 = new Car();\n        Car c2 = new Car();\n        c1.setBrand(\"BMW\");\n        c2.setBrand(\"Audi\");\n        c1.display();\n        c2.display();\n    }\n}" },
                { "type": "section", "title": "8. Using this Keyword (Important)", "code": "class Student {\n    String name;\n    void setName(String name) {\n        this.name = name;\n    }\n}" },
                { "type": "section", "title": "9. Returning Values", "code": "class Calculator {\n    int add(int a, int b) { return a + b; }\n}" },
                { "type": "section", "title": "10. Method Calling Another Method", "code": "class Demo {\n    void method1() {\n        System.out.println(\"M1\");\n        method2();\n    }\n    void method2() { System.out.println(\"M2\"); }\n}" },
                { "type": "section", "title": "11. Memory Representation", "rich": SVG_METHOD_MEMORY },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic\">Apply your knowledge of instance methods with these coding exercises.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Create a <code>Car</code> class with instance <code>String brand</code> and method <code>void set(String b)</code> to initialize it using <code>this.brand = b</code>. Also add <code>void show()</code> to print the brand. Demonstrate with \"Tesla\". <br/><strong>Match Output:</strong> <code>Tesla</code>", "hints": ["Use this keyword", "Create object and call methods"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Create a <code>Calculator</code> class with an instance method <code>int multiply(int a, int b)</code> that returns the product. In <code>main</code>, print the result of <code>5 * 4</code>. <br/><strong>Match Output:</strong> <code>20</code>", "hints": ["Return type should be int"], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Create a <code>Demo</code> class where <code>first()</code> calls <code>second()</code>. <code>first()</code> prints \"A\" and <code>second()</code> prints \"B\". Call <code>first()</code> from <code>main</code>. <br/><strong>Match Output:</strong> <code>A\nB</code>", "hints": ["Nested method calls"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "Tesla", "matchCode": "this.brand" },
                { "index": 2, "match": "20", "matchCode": "multiply" },
                { "index": 3, "match": "A[\\s\\S]*B", "matchCode": "first" }
            ]
        },
        {
            title: 'Stack Memory',
            duration: '32 min',
            sections: [
                { "type": "section", "title": "1. Concept & Definition", "rich": "<p class=\"mb-4\">Stack Memory is a JVM memory region used for method execution and temporary data storage, such as local variables, method parameters, and reference variables.</p><p class=\"mb-4\">It works in a <strong>Last-In-First-Out (LIFO)</strong> manner, meaning the last method that is called is the first one to finish execution.</p><p class=\"mb-4\">Each time a method is invoked, a new block called a <strong>Stack Frame</strong> is created.</p>" },
                { "type": "section", "title": "2. How It Works Internally (JVM View)", "rich": "<ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>main() method pushed to stack</li><li>Each method creates a new frame</li><li>When method ends → frame popped</li></ul>" + NOTE("<strong>👉 Important:</strong> Stack handles execution flow, NOT actual objects (only references)") },
                { "type": "section", "title": "3. Structure of Stack Frame", "rich": "<pre class=\"p-4 bg-slate-100 text-slate-800 rounded-lg font-mono text-[10px] border border-slate-200\">Stack Frame:\n-------------------\nMethod Name\nLocal Variables\nParameters\nReturn Address</pre>" },
                { "type": "section", "title": "4. Key Characteristics", "rich": "<ul class=\"grid grid-cols-1 md:grid-cols-2 gap-3 mb-6\"><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🔄 LIFO principle</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🧵 Each thread has own stack</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">⚙️ Auto management</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">⚠️ Limited size</li></ul>" },
                { "type": "section", "title": "5. Basic Execution Example", "code": "public class Main {\n    static void greet() { System.out.println(\"Hello\"); }\n    public static void main(String[] args) {\n        greet();\n        System.out.println(\"Main End\");\n    }\n}" },
                { "type": "section", "title": "6. Nested Method Calls", "code": "public class Main {\n    static void m1() { m2(); }\n    static void m2() { System.out.println(\"Done\"); }\n    public static void main(String[] args) { m1(); }\n}" },
                { "type": "section", "title": "7. Local Variables in Stack", "code": "public class Main {\n    public static void main(String[] args) {\n        int x = 10;\n        System.out.println(x);\n    }\n}" },
                { "type": "section", "title": "8. Reference Variables in Stack", "code": "Student s1 = new Student();" },
                { "type": "section", "title": "10. Recursive Calls (Important Case)", "code": "static void count(int n) {\n    if (n == 0) return;\n    System.out.println(n);\n    count(n - 1);\n}" },
                { "type": "section", "title": "11. StackOverflowError (Critical)", "code": "static void infinite() { infinite(); }" },
                { "type": "section", "title": "12. Stack vs Heap (Quick Understanding)", "rich": TABLE(`<thead><tr class=\"bg-slate-100\"><th class=\"px-4 py-3 border-r font-bold\">Feature</th><th class=\"px-4 py-3 border-r font-bold\">Stack</th><th class=\"px-4 py-3 font-bold\">Heap</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-semibold\">Stores</td><td class=\"px-4 py-3 border-r\">Method calls, variables</td><td class=\"px-4 py-3\">Objects</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-semibold\">Speed</td><td class=\"px-4 py-3 border-r\">Fast</td><td class=\"px-4 py-3\">Slower</td></tr></tbody>`) },
                { "type": "section", "title": "15. Internal Execution Summary (Flow)", "rich": SVG_STACK_LIFO },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic\">Practice stack memory principles and LIFO execution.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Create a static method <code>greet()</code> that prints \"Hello\". Call it from <code>main()</code>. <br/><strong>Match Output:</strong> <code>Hello</code>", "hints": ["Static method doesn't need 'new'"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Implement nested calls. Method <code>a()</code> calls <code>b()</code>. <code>a()</code> prints \"A\" first, then <code>b()</code> prints \"B\". Call <code>a()</code> from <code>main()</code>. <br/><strong>Match Output:</strong> <code>A\nB</code>", "hints": ["Print 'A' then call b()"], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Create a recursive method <code>countDown(int n)</code>. If <code>n == 0</code>, return. Print <code>n</code> and call <code>countDown(n-1)</code>. Call <code>countDown(2)</code> from <code>main()</code>. <br/><strong>Match Output:</strong> <code>2\n1</code>", "hints": ["Recursive base case: if n == 0"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "Hello", "matchCode": "greet" },
                { "index": 2, "match": "A[\\s\\S]*B", "matchCode": "a\\(\\)" },
                { "index": 3, "match": "2[\\s\\S]*1", "matchCode": "countDown" }
            ]
        },
        {
            title: 'Heap Memory',
            duration: '32 min',
            sections: [
                { "type": "section", "title": "1. Concept & Definition", "rich": "<p class=\"mb-4\">Heap Memory is a runtime memory area in the JVM where all objects and instance variables are stored. It is the primary storage for dynamically created data using the <code>new</code> keyword.</p><p class=\"mb-4\">Unlike Stack Memory, Heap is shared across all threads and is managed automatically by the JVM through <strong>Garbage Collection (GC)</strong>.</p>" + NOTE("<strong>👉 In simple terms:</strong><br/>• Heap = Actual data storage (objects live here)<br/>• Stack = Reference + execution control") },
                { "type": "section", "title": "2. How It Works Internally (JVM View)", "rich": "<p class=\"mb-4\">When this line executes:</p>", "code": "Student s1 = new Student();" },
                { "type": "section", "rich": "<p class=\"mt-4 mb-2 font-semibold text-slate-700\">JVM performs:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Checks class in Method Area</li><li>Allocates memory in Heap</li><li>Initializes instance variables (default values)</li><li>Calls constructor to assign values</li><li>Returns memory address (reference) to Stack</li></ul>" + NOTE("<strong>👉 Important:</strong><br/>• Object → Heap<br/>• Reference → Stack") },
                { "type": "section", "title": "3. Structure of Heap Memory", "rich": "<p class=\"mb-4\">Heap is logically divided (for JVM optimization):</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Young Generation (new objects)</li><li>Old Generation (long-lived objects)</li><li>Permanent/Metaspace (class metadata – JVM dependent)</li></ul>" + NOTE("<strong>👉 Note:</strong> You don’t control this directly — JVM manages it.") },
                { "type": "section", "title": "4. Key Characteristics", "rich": "<ul class=\"grid grid-cols-1 md:grid-cols-2 gap-3 mb-6\"><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">📦 Stores objects and instance variables</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🌍 Shared across all threads</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">♻️ Managed by Garbage Collector</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">⚡ Slower than Stack</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">📏 Size is larger than Stack</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">⏳ Objects exist until no reference points</li></ul>" },
                { "type": "section", "title": "5. Basic Object Creation Example", "code": "class Student {\n    String name;\n    int age;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student();\n        s1.name = \"Sharan\";\n        s1.age = 22;\n        System.out.println(s1.name + \" - \" + s1.age);\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-4 mb-2 font-semibold text-slate-700\">Execution Tracing:</p><ul class=\"list-decimal ml-5 space-y-1 mb-4\"><li>main() → Stack frame created</li><li>new Student() → object created in Heap</li><li>Default values assigned (null, 0)</li><li>Values updated via s1 reference</li><li>Output printed</li></ul>" },
                { "type": "section", "title": "Memory Representation", "rich": SVG_HEAP_MEMORY },
                { "type": "section", "title": "6. Multiple Objects in Heap", "code": "class Car {\n    String brand;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car c1 = new Car();\n        Car c2 = new Car();\n        c1.brand = \"BMW\";\n        c2.brand = \"Audi\";\n        System.out.println(c1.brand);\n        System.out.println(c2.brand);\n    }\n}" },
                { "type": "section", "rich": NOTE("<strong>👉 Insight:</strong> Heap stores separate objects, each with its own data") },
                { "type": "section", "title": "7. Reference Sharing (Important Concept)", "code": "class Demo {\n    int value;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Demo d1 = new Demo();\n        d1.value = 10;\n        Demo d2 = d1; // Same reference\n        d2.value = 50;\n        System.out.println(d1.value);\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-4 mb-2 font-semibold text-slate-700\">Explanation:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>d1 and d2 point to same object in Heap</li><li>Change via one reference affects the same object</li></ul>" },
                { "type": "section", "title": "8. Anonymous Objects", "code": "class Test {\n    void show() {\n        System.out.println(\"Hello\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        new Test().show();\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-4 mb-2 font-semibold text-slate-700\">Explanation:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Object created in Heap</li><li>No reference stored</li><li>Eligible for GC after execution</li></ul>" },
                { "type": "section", "title": "9. Garbage Collection (Very Important)", "rich": "<p class=\"mb-4\">When object has no reference, it becomes eligible for GC.</p>", "code": "Student s1 = new Student();\ns1 = null;" },
                { "type": "section", "rich": NOTE("<strong>👉 Now:</strong><br/>• No reference points to object<br/>• JVM removes it automatically") },
                { "type": "section", "title": "10. Example of Garbage Creation", "code": "class Demo {\n    int x;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Demo d1 = new Demo();\n        d1 = new Demo(); // Old object becomes garbage\n    }\n}" },
                { "type": "section", "rich": NOTE("<strong>👉 Fact:</strong> First object has no reference → garbage") },
                { "type": "section", "title": "11. Heap vs Stack (Core Understanding)", "rich": TABLE(`<thead><tr class=\"bg-slate-100\"><th class=\"px-4 py-3 border-r font-bold\">Feature</th><th class=\"px-4 py-3 border-r font-bold\">Heap</th><th class=\"px-4 py-3 font-bold\">Stack</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-3 border-r\">Stores</td><td class=\"px-4 py-3 border-r\">Objects</td><td class=\"px-4 py-3\">Variables, references</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r\">Memory Type</td><td class=\"px-4 py-3 border-r\">Dynamic</td><td class=\"px-4 py-3\">Static</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r\">Access Speed</td><td class=\"px-4 py-3 border-r\">Slower</td><td class=\"px-4 py-3\">Faster</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r\">Sharing</td><td class=\"px-4 py-3 border-r text-blue-600 font-bold\">Shared Area</td><td class=\"px-4 py-3 font-bold text-amber-600\">Thread-specific</td></tr><tr><td class=\"px-4 py-3 border-r\">Management</td><td class=\"px-4 py-3 border-r\">Garbage Collection</td><td class=\"px-4 py-3 text-red-600\">Auto cleanup</td></tr></tbody>`) },
                { "type": "section", "title": "12. Method Interaction with Heap", "code": "class Data {\n    int x;\n}\n\npublic class Main {\n    static void change(Data d) {\n        d.x = 100;\n    }\n    public static void main(String[] args) {\n        Data d = new Data();\n        d.x = 10;\n        change(d);\n        System.out.println(d.x);\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-4 mb-2 font-semibold text-slate-700\">Explanation:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Reference passed to method</li><li>Same object in Heap modified</li><li>Changes reflect outside method</li></ul>" },
                { "type": "section", "title": "13. Advanced JVM Insights", "rich": "<ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Heap is managed using Garbage Collector algorithms.</li><li>Objects are moved between generations.</li><li>Large applications depend heavily on Heap tuning.</li><li>Memory leaks occur when references are unintentionally retained.</li></ul>" },
                { "type": "section", "title": "14. Common Mistakes", "rich": "<ul class=\"space-y-4 mb-6\"><li><span class=\"text-red-600 font-bold\">❌ 1. Thinking objects are stored in stack</span><p class=\"text-sm text-slate-500\">Only references are stored in stack.</p></li><li><span class=\"text-red-600 font-bold\">❌ 2. Forgetting object sharing</span><p class=\"text-sm text-slate-500\">Multiple references can point to same object.</p></li><li><span class=\"text-red-600 font-bold\">❌ 3. Ignoring garbage collection</span><p class=\"text-sm text-slate-500\">Leads to memory leaks.</p></li></ul>" },
                { "type": "section", "title": "15. Real-World Understanding", "rich": "<p class=\"mb-4\">Heap stores:</p><ul class=\"grid grid-cols-2 gap-4 mb-6\"><li class=\"p-4 border rounded-lg shadow-sm bg-blue-50\">User objects</li><li class=\"p-4 border rounded-lg shadow-sm bg-emerald-50\">Database data models</li><li class=\"p-4 border rounded-lg shadow-sm bg-amber-50\">UI components</li><li class=\"p-4 border rounded-lg shadow-sm bg-violet-50\">Collections (ArrayList, etc.)</li></ul><p class=\"italic text-center font-bold\">\"Any real-world entity in Java → stored in Heap\"</p>" },
                { "type": "section", "title": "16. Internal Execution Flow", "rich": "<pre class=\"p-6 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto border border-slate-700\">Program starts\n↓\nObject created using new\n↓\nStored in Heap\n↓\nReferenced from Stack\n↓\nUsed in methods\n↓\nReference removed\n↓\nGarbage Collector cleans memory</pre>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic\">Verify your understanding of JVM heap allocation and garbage collection.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Create a <code>Student</code> class with an instance <code>String name</code>. In <code>main</code>, create an object, set <code>name = \"Sharan\"</code>, and print it. <br/><strong>Match Output:</strong> <code>Sharan</code>", "hints": ["Heap allocation happens with 'new Student()'"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Demonstrate reference sharing. Create a <code>Data</code> class with <code>int x</code>. Point <code>d2</code> to <code>d1</code>. Change <code>d2.x</code> to 100, then print <code>d1.x</code>. <br/><strong>Match Output:</strong> <code>100</code>", "hints": ["d1 and d2 will point to the same object"], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Create an anonymous object of class <code>Demo</code> having method <code>void hi() { System.out.println(\"Hi\"); }</code>. Call <code>hi()</code> directly in <code>main</code> without storing reference. <br/><strong>Match Output:</strong> <code>Hi</code>", "hints": ["Use: new Demo().hi();"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "Sharan", "matchCode": "new Student" },
                { "index": 2, "match": "100", "matchCode": "d2\\s*=\\s*d1" },
                { "index": 3, "match": "Hi", "matchCode": "new Demo\\(\\)\\.hi\\(\\)" }
            ]
        },
        {
            title: 'Method Area',
            duration: '32 min',
            sections: [
                { "type": "section", "title": "1. Concept & Definition", "rich": "<p class=\"mb-4\">Method Area is a JVM memory region used to store class-level data, such as:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Class definitions</li><li>Method code (bytecode)</li><li>Static variables</li><li>Runtime constant pool</li></ul><p class=\"mb-4\">It is shared across all threads and is created when the JVM starts.</p>" + NOTE("<strong>👉 In simple terms:</strong><br/>Method Area = Class Information Storage<br/>It holds everything related to the structure and behavior of classes") },
                { "type": "section", "title": "2. How It Works Internally (JVM View)", "rich": "<p class=\"mb-4\">When a class is used for the first time:</p>", "code": "Student s1 = new Student();" },
                { "type": "section", "rich": "<p class=\"mt-4 mb-2 font-semibold text-slate-700\">JVM performs:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>ClassLoader loads Student class</li><li>Class metadata stored in Method Area</li><li>Static variables initialized</li><li>Methods stored as bytecode</li><li>Then object is created in Heap</li></ul>" + NOTE("<strong>👉 Important:</strong><br/>• Class → Method Area<br/>• Object → Heap<br/>• Reference → Stack") },
                { "type": "section", "title": "3. What Exactly is Stored in Method Area", "rich": "<ul class=\"grid grid-cols-1 md:grid-cols-2 gap-3 mb-6\"><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🏷️ Class name and structure</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">⚙️ Method definitions (bytecode)</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🧊 Static variables</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">⚡ Static methods</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">🛠️ Constructors</li><li class=\"p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm\">💎 Constant pool (literals, strings)</li></ul>" },
                { "type": "section", "title": "4. Key Characteristics", "rich": "<ul class=\"space-y-2 mb-6\"><li>✅ Shared across all threads</li><li>✅ Created once per JVM</li><li>✅ Stores class-level data only</li><li>✅ Exists until JVM shuts down</li><li>✅ Does NOT store objects</li><li>✅ Supports class loading and execution</li></ul>" },
                { "type": "section", "title": "5. Basic Example", "code": "class Student {\n    static String school = \"ABC School\";\n    void show() {\n        System.out.println(\"Student method\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student();\n        s1.show();\n        System.out.println(Student.school);\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-4 mb-2 font-semibold text-slate-700 font-mono text-xs\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4\">Student method\nABC School</pre>" },
                { "type": "section", "rich": "<p class=\"mt-4 mb-2 font-semibold text-slate-700\">Execution Tracing:</p><ul class=\"list-decimal ml-5 space-y-1 mb-4\"><li>JVM starts → Method Area created</li><li>Student class loaded into Method Area</li><li><code>school</code> stored | <code>show()</code> stored</li><li>main() starts</li><li>Object created in Heap</li><li>Method executed using Method Area definition</li><li>Static variable accessed directly</li></ul>" },
                { "type": "section", "title": "6. Memory Representation", "rich": SVG_METHOD_AREA_DETAIL },
                { "type": "section", "title": "7. Static Variables in Method Area", "code": "class Test {\n    static int count = 10;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(Test.count);\n    }\n}" },
                { "type": "section", "rich": NOTE("<strong>👉 Fact:</strong> Only one copy exists, shared by all objects.") },
                { "type": "section", "title": "8. Static Methods in Method Area", "code": "class Utility {\n    static void greet() {\n        System.out.println(\"Hello\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Utility.greet();\n    }\n}" },
                { "type": "section", "rich": NOTE("<strong>👉 Fact:</strong> No object needed because method is in Method Area.") },
                { "type": "section", "title": "9. Constant Pool (Important Concept)", "code": "public class Main {\n    public static void main(String[] args) {\n        String s1 = \"Java\";\n        String s2 = \"Java\";\n        System.out.println(s1 == s2);\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-4 mb-2 font-semibold text-slate-700 font-mono text-xs\">Output:</p><code class=\"block p-2 bg-slate-100 rounded\">true</code><p class=\"mt-4 mb-2 font-semibold text-slate-700\">Explanation:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>String literals stored in Constant Pool (inside Method Area)</li><li>Both s1 and s2 point to same memory</li></ul>" },
                { "type": "section", "title": "10. Class Loading Flow", "rich": "<pre class=\"p-6 bg-slate-900 text-amber-400 rounded-xl font-mono text-xs border border-slate-700\">Program starts\n↓\nClassLoader loads class\n↓\nStored in Method Area\n↓\nStatic variables initialized\n↓\nMethods ready for execution\n↓\nObjects created (Heap)</pre>" },
                { "type": "section", "title": "11. Interaction with Other Memory Areas", "rich": TABLE(`<thead><tr class=\"bg-slate-100\"><th class=\"px-4 py-3 border-r font-bold\">Memory Area</th><th class=\"px-4 py-3 font-bold\">Role</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-semibold\">Method Area</td><td class=\"px-4 py-3\">Class data (Blueprint)</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-semibold\">Heap</td><td class=\"px-4 py-3\">Object storage (Actual Data)</td></tr><tr><td class=\"px-4 py-3 border-r font-semibold\">Stack</td><td class=\"px-4 py-3 text-blue-600\">Execution (Current Work)</td></tr></tbody>`) + NOTE("<strong>👉 Insight:</strong> All three work together.") },
                { "type": "section", "title": "12. Advanced JVM Insight", "rich": "<p class=\"mb-4\">In modern JVM (Java 8+), Method Area is implemented as <strong>Metaspace</strong>.</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Metaspace uses native memory (outside heap)</li><li>Automatically expands as needed</li></ul>" },
                { "type": "section", "title": "13. Common Mistakes", "rich": "<ul class=\"space-y-4 mb-6\"><li><span class=\"text-red-600 font-bold\">❌ 1. Thinking methods are stored in stack</span><p class=\"text-sm text-slate-500\">Methods definitions stay in Method Area; only execution frames go to Stack.</p></li><li><span class=\"text-red-600 font-bold\">❌ 2. Confusing static with instance</span><p class=\"text-sm text-slate-500\">Static members belong to Method Area; Instance members belong to Heap.</p></li><li><span class=\"text-red-600 font-bold\">❌ 3. Assuming multiple copies of static</span><p class=\"text-sm text-slate-500\">Only ONE copy exists in the Method Area, shared by all.</p></li></ul>" },
                { "type": "section", "title": "14. Real-World Understanding", "rich": "<p class=\"mb-4\">Method Area stores:</p><ul class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6\"><li class=\"p-4 border rounded-lg shadow-sm bg-blue-50\">Application logic</li><li class=\"p-4 border rounded-lg shadow-sm bg-emerald-50\">Class blueprints</li><li class=\"p-4 border rounded-lg shadow-sm bg-amber-50\">Shared configurations</li><li class=\"p-4 border rounded-lg shadow-sm bg-violet-50\">Utility methods</li></ul><p class=\"italic text-center font-bold\">\"It acts like the brain of the program\"</p>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic\">Master class-level data storage in the Method Area.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Create a class <code>Counter</code> with a <code>static int total = 5</code>. In <code>main</code>, print <code>Counter.total</code> directly. <br/><strong>Match Output:</strong> <code>5</code>", "hints": ["Access static variable using ClassName.variableName"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Create a class <code>Helper</code> with a <code>static void sayHi() { System.out.println(\"Hi\"); }</code>. Call it from <code>main</code> without creating an object. <br/><strong>Match Output:</strong> <code>Hi</code>", "hints": ["Static methods are stored in Method Area"], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Test String Constant Pool. Create two string literals <code>String a = \"JVM\"; String b = \"JVM\";</code>. Print the result of <code>a == b</code>. <br/><strong>Match Output:</strong> <code>true</code>", "hints": ["Literal strings are stored in Method Area's constant pool"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "5", "matchCode": "Counter\\.total" },
                { "index": 2, "match": "Hi", "matchCode": "Helper\\.sayHi" },
                { "index": 3, "match": "true", "matchCode": "==" }
            ]
        },
        {
            title: 'JVM Memory Structure',
            duration: '32 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\">JVM Memory Structure refers to how the Java Virtual Machine (JVM) organizes and manages memory during program execution. It divides memory into different regions, each designed for a specific purpose such as storing objects, methods, variables, and execution flow.</p><p class=\"mb-4\">It ensures:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Efficient memory usage</li><li>Automatic memory management</li><li>Safe execution (no direct memory corruption)</li></ul>" },
                { "type": "section", "title": "2. Concept Explanation", "rich": "<p class=\"mb-4\">When a Java program runs, the JVM starts execution and allocates different memory areas. Each part of your program goes into a specific region, and JVM manages allocation and deallocation automatically.</p><p class=\"mb-4\">The JVM memory is mainly divided into:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Stack Memory</li><li>Heap Memory</li><li>Method Area</li><li>Program Counter (PC Register)</li><li>Native Method Stack</li></ul>" },
                { "type": "section", "title": "3. Core Memory Components", "rich": "<div class=\"space-y-6\"><div><h4 class=\"font-bold text-blue-600\">3.1 Stack Memory</h4><p class=\"text-sm mb-2\">Used for: Method calls, Local variables, Reference variables</p><p class=\"text-xs text-slate-500 italic\">Key Behavior: Each thread has its own stack | Works in LIFO</p></div><div><h4 class=\"font-bold text-emerald-600\">3.2 Heap Memory</h4><p class=\"text-sm mb-2\">Used for: Object storage (new keyword)</p><p class=\"text-xs text-slate-500 italic\">Key Behavior: Shared across all threads | Managed by Garbage Collector</p></div><div><h4 class=\"font-bold text-violet-600\">3.3 Method Area</h4><p class=\"text-sm mb-2\">Used for: Class metadata, Static variables, Method code</p></div><div><h4 class=\"font-bold text-amber-600\">3.4 Program Counter (PC Register)</h4><p class=\"text-sm mb-2\">Used for: Tracking current instruction execution. Each thread has its own PC register.</p></div><div><h4 class=\"font-bold text-red-600\">3.5 Native Method Stack</h4><p class=\"text-sm mb-2\">Used for: Executing native (non-Java) code (like C/C++ methods)</p></div></div>" },
                { "type": "section", "title": "4. Memory Flow (Execution Understanding)", "rich": "<ol class=\"list-decimal ml-5 space-y-2 mb-4\"><li><strong>Step 1:</strong> Class loads → Method Area</li><li><strong>Step 2:</strong> main() enters → Stack</li><li><strong>Step 3:</strong> Object created → Heap</li><li><strong>Step 4:</strong> Reference stored → Stack</li><li><strong>Step 5:</strong> Methods execute → Stack frames</li><li><strong>Step 6:</strong> Object unused → Garbage Collector removes it</li></ol>" },
                { "type": "section", "title": "5. Visual Understanding (Conceptual)", "rich": SVG_JVM_RUNTIME_AREAS },
                { "type": "section", "title": "6. Example (Complete Code)", "code": "class Student {\n    String name;          // Instance variable (Heap)\n    static String school = \"ABC\"; // Method Area\n\n    void display() {\n        int marks = 90;   // Stack\n        System.out.println(name + \" \" + marks);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student(); // Object in Heap\n        s1.name = \"John\";\n        s1.display();\n    }\n}" },
                { "type": "section", "title": "7. Step-by-Step Internal Working", "rich": "<ul class=\"space-y-4 mb-6\"><li><strong>Step 1: Class Loading</strong><p class=\"text-sm\">Student class → Method Area | Static variable school → Method Area</p></li><li><strong>Step 2: main() Starts</strong><p class=\"text-sm\">main() enters Stack | Stack frame created</p></li><li><strong>Step 3: Object Creation</strong><p class=\"text-sm\">Object created in Heap | Reference s1 stored in Stack</p></li><li><strong>Step 4: Method Call</strong><p class=\"text-sm\">New stack frame created | marks stored in Stack | name accessed from Heap</p></li><li><strong>Step 5: Execution Output</strong><p class=\"text-sm\">John 90</p></li><li><strong>Step 6: Memory Cleanup</strong><p class=\"text-sm\">Stack frame removed | If s1 unused → eligible for GC</p></li></ul>" },
                { "type": "section", "title": "8. Important Rules", "rich": "<ul class=\"list-disc ml-5 space-y-2 mb-4\"><li>Objects always live in Heap</li><li>Local variables always live in Stack</li><li>Static data lives in Method Area</li><li>References are stored in Stack, but point to Heap</li><li>Each method call creates a new stack frame</li></ul>" },
                { "type": "section", "title": "9. Common Errors & Pitfalls", "rich": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6\"><div class=\"p-4 border border-red-200 bg-red-50 rounded-lg\"><strong>1. StackOverflowError</strong><p class=\"text-xs text-red-700 font-mono mt-1\">Cause: Infinite recursion, Too many method calls</p></div><div class=\"p-4 border border-red-200 bg-red-50 rounded-lg\"><strong>2. OutOfMemoryError (Heap)</strong><p class=\"text-xs text-red-700 font-mono mt-1\">Cause: Too many objects, Memory leak</p></div></div>" + NOTE("<strong>3. NullPointerException:</strong> Reference exists but object not created.<br/><code>Student s; s.display(); // ERROR</code>") },
                { "type": "section", "title": "10. Advanced Concepts", "rich": "<div><h4 class=\"font-bold\">10.1 Garbage Collection</h4><p class=\"text-sm mb-4\">JVM automatically removes unused objects. Works only on Heap.</p><h4 class=\"font-bold\">10.2 Memory Optimization</h4><ul class=\"list-disc ml-5 text-sm mb-4\"><li>Use primitives instead of objects when possible</li><li>Avoid unnecessary object creation</li><li>Reuse objects</li></ul><h4 class=\"font-bold\">10.3 Thread Memory Behavior</h4><p class=\"text-sm\">Each thread → own Stack | All threads → share Heap</p></div>" },
                { "type": "section", "title": "11. Real-World Understanding", "rich": "<ul class=\"space-y-3 mb-6\"><li>🏗️ <strong>Method Area</strong> → Blueprint storage</li><li>📦 <strong>Heap</strong> → Storage room (objects)</li><li>🛠️ <strong>Stack</strong> → Active workspace (execution)</li><li>📍 <strong>PC Register</strong> → Instruction tracker</li></ul>" },
                { "type": "section", "title": "12. One-Line Summary (Concept Clarity)", "rich": NOTE("JVM Memory Structure is a well-organized system where: <strong>Code</strong> lives in Method Area, <strong>Objects</strong> live in Heap, and <strong>Execution</strong> happens in Stack.") },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic\">Consolidate your knowledge of the complete JVM memory structure.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Create a class <code>App</code> with a <code>static int version = 1</code> and instance <code>String name = \"JVM\"</code>. In <code>main</code>, print both: <code>App.version + \" \" + new App().name</code>. <br/><strong>Match Output:</strong> <code>1 JVM</code>", "hints": ["Static belongs to Method Area", "Instance belongs to Heap"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Trigger a <code>StackOverflowError</code> (conceptual). Create a static method <code>crash()</code> that calls itself, then call it in <code>main</code>. <br/><strong>Match Output:</strong> <code>StackOverflowError</code>", "hints": ["Infinite recursion fills the Stack"], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Create a <code>Student</code> class. In <code>main</code>, only declare <code>Student s;</code> and then try to access <code>s.name</code> (assume it throws NullPointerException). Print \"NPE\". <br/><strong>Match Output:</strong> <code>NPE</code>", "hints": ["Reference without Object in Heap leads to NPE"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "1 JVM", "matchCode": "App\\.version[\\s\\S]*new App" },
                { "index": 2, "match": "StackOverflowError", "matchCode": "crash\\(\\)[\\s\\S]*crash\\(\\)" },
                { "index": 3, "match": "NPE", "matchCode": "s\\.name" }
            ]
        }
    ]
}).catch(console.error);
