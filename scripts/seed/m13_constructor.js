/** Module 13 — Constructor (Manual implementation) */
const { seedModule, MAIN } = require('./_helpers');

const NOTE = (text) => `<div class="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 my-4 text-sm font-medium shadow-sm leading-relaxed">${text}</div>`;
const WARNING = (text) => `<div class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 my-4 text-sm font-medium shadow-sm leading-relaxed">${text}</div>`;
const TABLE = (html) => `<div class="overflow-x-auto my-6 border border-slate-200 rounded-xl shadow-sm bg-white"><table class="w-full text-left border-collapse text-sm">${html}</table></div>`;

const SVG_CONSTRUCTOR_FLOW = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1">
<svg width="100%" height="auto" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
  <!-- Dark Background -->
  <rect width="800" height="600" rx="12" fill="#0F172A"/>
  
  <!-- Header with Code -->
  <rect x="0" y="0" width="800" height="70" fill="#1E293B" rx="12 12 0 0"/>
  <circle cx="20" cy="25" r="5" fill="#EF4444"/><circle cx="40" cy="25" r="5" fill="#F59E0B"/><circle cx="60" cy="25" r="5" fill="#10B981"/>
  <text x="400" y="45" font-family="monospace" font-size="20" font-weight="bold" fill="#38BDF8" text-anchor="middle">Student s1 = new Student();</text>

  <!-- Labels -->
  <text x="210" y="110" font-family="Arial" font-size="14" font-weight="bold" fill="#94A3B8" text-anchor="middle uppercase">STACK (Ref)</text>
  <text x="590" y="110" font-family="Arial" font-size="14" font-weight="bold" fill="#94A3B8" text-anchor="middle uppercase">HEAP (Instance)</text>

  <!-- Stack Frame -->
  <rect x="60" y="130" width="300" height="420" rx="12" fill="#1E293B" stroke="#334155" stroke-width="2"/>
  
  <!-- 4th Step: Reference storage -->
  <g id="step4" opacity="0">
    <rect x="80" y="480" width="260" height="50" rx="8" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
    <text x="100" y="512" font-family="monospace" font-size="16" fill="#F1F5F9">s1 <tspan fill="#64748B">:</tspan> <tspan fill="#38BDF8">0xABC</tspan></text>
    <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="7s" fill="freeze" />
  </g>

  <!-- Heap Object Area -->
  <rect x="440" y="130" width="300" height="420" rx="12" fill="#1E293B" stroke="#334155" stroke-width="2"/>
  
  <!-- Object Container -->
  <rect x="460" y="150" width="260" height="380" rx="12" fill="#0F172A" stroke="#3B82F6" stroke-width="2" stroke-dasharray="5,5">
    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" begin="0.5s" fill="freeze" />
  </rect>
  <text x="590" y="185" font-family="Arial" font-size="16" font-weight="bold" fill="#3B82F6" text-anchor="middle">Student @ 0xABC</text>

  <!-- Flow Paths -->
  <path id="allocation-path" d="M 68 68 Q 150 220, 470 220" fill="none" stroke="#334155" stroke-width="1" stroke-dasharray="5,5" />
  <path id="ref-path" d="M 340 500 C 450 500, 420 160, 470 160" fill="none" stroke="#38BDF8" stroke-width="3" stroke-dasharray="400" stroke-dashoffset="400">
    <animate attributeName="stroke-dashoffset" from="400" to="0" dur="1s" begin="6.5s" fill="freeze" />
  </path>

  <!-- Sequential Step Boxes -->
  <g opacity="0">
    <rect x="480" y="210" width="220" height="40" rx="6" fill="#1E293B" stroke="#334155"/>
    <text x="495" y="235" font-family="monospace" font-size="13" fill="#64748B">1st: Raw Allocation</text>
    <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1s" fill="freeze" />
  </g>

  <g opacity="0">
    <rect x="480" y="270" width="220" height="50" rx="6" fill="#1E293B" stroke="#334155"/>
    <text x="495" y="300" font-family="monospace" font-size="13" fill="#94A3B8">2nd: Default values</text>
    <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="3s" fill="freeze" />
  </g>

  <g opacity="0">
    <rect x="480" y="340" width="220" height="90" rx="8" fill="#064E3B" fill-opacity="0.3" stroke="#22C55E" stroke-width="2"/>
    <text x="495" y="375" font-family="monospace" font-size="14" font-weight="bold" fill="#4ADE80">name = "Unknown"</text>
    <text x="495" y="405" font-family="monospace" font-size="14" font-weight="bold" fill="#4ADE80">age = 0</text>
    <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="5s" fill="freeze" />
  </g>

  <!-- Numbered Indicators -->
  <g opacity="0">
    <circle cx="210" cy="180" r="16" fill="#1E293B" stroke="#94A3B8" stroke-width="2" />
    <text x="210" y="185" font-family="Arial" font-size="12" font-weight="bold" fill="#F1F5F9" text-anchor="middle">1st</text>
    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="1s" fill="freeze" />
  </g>

  <g opacity="0">
    <circle cx="430" cy="295" r="16" fill="#1E293B" stroke="#94A3B8" stroke-width="2" />
    <text x="430" y="300" font-family="Arial" font-size="12" font-weight="bold" fill="#F1F5F9" text-anchor="middle">2nd</text>
    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="3s" fill="freeze" />
  </g>

  <g opacity="0">
    <circle cx="430" cy="385" r="16" fill="#064E3B" stroke="#4ADE80" stroke-width="2" />
    <text x="430" y="390" font-family="Arial" font-size="12" font-weight="bold" fill="#F1F5F9" text-anchor="middle">3rd</text>
    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="5s" fill="freeze" />
  </g>

  <g opacity="0">
    <circle cx="370" cy="505" r="16" fill="#38BDF8" stroke="#F1F5F9" stroke-width="2" />
    <text x="370" y="510" font-family="Arial" font-size="12" font-weight="bold" fill="#0F172A" text-anchor="middle">4th</text>
    <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="7s" fill="freeze" />
  </g>

  <circle r="5" fill="#38BDF8">
    <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.5s">
      <mpath href="#allocation-path"/>
    </animateMotion>
    <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
  </circle>

  <g transform="translate(68, 68)">
    <circle r="22" fill="#3B82F6" stroke="#FFF" stroke-width="3">
      <animate attributeName="stroke-opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
    </circle>
    <text y="0" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="white">JVM</text>
  </g>
</svg>
<p class="px-4 py-2 text-center text-[10px] text-slate-500 font-mono italic">Object Creation: 4-step execution flow for every 'new' keyword.</p>
</div>`;

const SVG_PARAMETERIZED_FLOW = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1">
<svg width="100%" height="auto" viewBox="0 0 700 450" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
  <rect width="700" height="450" rx="12" fill="#0F172A"/>
  
  <!-- Window Header -->
  <rect width="700" height="40" rx="12 12 0 0" fill="#1E293B"/>
  <circle cx="20" cy="20" r="5" fill="#EF4444"/><circle cx="40" cy="20" r="5" fill="#F59E0B"/><circle cx="60" cy="20" r="5" fill="#10B981"/>
  <text x="350" y="25" fill="#38BDF8" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">data_mapping_engine.sh</text>

  <!-- STEP 1: Main Call -->
  <rect x="50" y="70" width="300" height="60" rx="10" fill="#1E293B" stroke="#334155"/>
  <text x="65" y="95" fill="#94A3B8" font-family="monospace" font-size="10" font-weight="bold uppercase tracking-widest">In Main Class:</text>
  <text x="65" y="115" fill="#38BDF8" font-family="monospace" font-size="18" font-weight="bold">new Student(<tspan fill="#F59E0B">101</tspan>, <tspan fill="#10B981">"Alice"</tspan>);</text>
  
  <circle cx="45" cy="110" r="10" fill="#38BDF8" filter="drop-shadow(0 0 5px #38BDF8)"/><text x="45" y="113" fill="white" font-size="8" font-weight="bold" text-anchor="middle">1</text>

  <!-- STEP 2: Parameters Receive Values -->
  <rect x="50" y="180" width="400" height="80" rx="16" fill="#1E293B" stroke="#334155" stroke-width="2"/>
  <text x="70" y="205" fill="#94A3B8" font-family="monospace" font-size="10" font-weight="bold uppercase tracking-widest">Constructor Parameters:</text>
  
  <text x="70" y="240" fill="#888" font-family="monospace" font-size="16">Student(int </text>
  <text x="180" y="240" fill="#F59E0B" font-family="monospace" font-size="18" font-weight="bold italic">id</text>
  <text x="210" y="240" fill="#888" font-family="monospace" font-size="16">, String </text>
  <text x="285" y="240" fill="#10B981" font-family="monospace" font-size="18" font-weight="bold italic">name</text>
  <text x="330" y="240" fill="#888" font-family="monospace" font-size="16">)</text>

  <circle cx="45" cy="225" r="10" fill="#F59E0B" filter="drop-shadow(0 0 5px #F59E0B)"/><text x="45" y="228" fill="white" font-size="8" font-weight="bold" text-anchor="middle">2</text>

  <!-- Arrows from 1 to 2 -->
  <path d="M 185 130 L 195 180" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4 4" marker-end="url(#arrow-orange)"/>
  <path d="M 285 130 L 300 180" stroke="#10B981" stroke-width="2" stroke-dasharray="4 4" marker-end="url(#arrow-green)"/>
  
  <text x="185" y="160" fill="#F59E0B" font-size="10" font-weight="black tracking-tighter uppercase italic">1st: 101 flows to id</text>
  <text x="310" y="160" fill="#10B981" font-size="10" font-weight="black tracking-tighter uppercase italic">2nd: "Alice" flows to name</text>

  <!-- STEP 3: Assignment to this. (HEAP) -->
  <rect x="50" y="320" width="600" height="100" rx="20" fill="#0F172A" stroke="#10B981" stroke-width="2" stroke-opacity="0.3"/>
  <text x="70" y="340" fill="#94A3B8" font-family="monospace" font-size="10" font-weight="bold uppercase tracking-widest">Heap Area: Actual Memory Saved</text>

  <g transform="translate(100, 360)">
    <rect width="200" height="40" rx="8" fill="#1E293B" stroke="#334155"/>
    <text x="10" y="25" fill="#64748B" font-family="monospace" font-size="14">obj.id = </text>
    <text x="100" y="25" fill="#F59E0B" font-family="monospace" font-size="18" font-weight="bold">101</text>
  </g>

  <g transform="translate(350, 360)">
    <rect width="200" height="40" rx="8" fill="#1E293B" stroke="#334155"/>
    <text x="10" y="25" fill="#64748B" font-family="monospace" font-size="14">obj.name = </text>
    <text x="110" y="25" fill="#10B981" font-family="monospace" font-size="18" font-weight="bold">"Alice"</text>
  </g>

  <circle cx="45" cy="370" r="10" fill="#10B981" filter="drop-shadow(0 0 5px #10B981)"/><text x="45" y="373" fill="white" font-size="8" font-weight="bold" text-anchor="middle">3</text>

  <!-- Final Link Arrows -->
  <path d="M 195 260 L 195 320" stroke="#F59E0B" stroke-width="3" marker-end="url(#arrow-orange-big)"/>
  <path d="M 300 260 L 410 320" stroke="#10B981" stroke-width="3" marker-end="url(#arrow-green-big)"/>

  <text x="210" y="300" fill="#F59E0B" font-size="11" font-weight="black uppercase tracking-tighter">3rd: ID stored</text>
  <text x="420" y="300" fill="#10B981" font-size="11" font-weight="black uppercase tracking-tighter">4th: Name stored</text>

  <defs>
    <marker id="arrow-orange" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#F59E0B"/></marker>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981"/></marker>
    <marker id="arrow-orange-big" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#F59E0B"/></marker>
    <marker id="arrow-green-big" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981"/></marker>
  </defs>
</svg>
<p class="px-4 py-2 text-center text-[10px] text-slate-500 font-mono italic font-bold">Concept: Values transfer from Code (1) ➔ Receiver Params (2) ➔ Real Memory (3).</p>
</div>`;
const SVG_OVERLOADING_CHOICE = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1">
<svg width="100%" height="auto" viewBox="0 0 600 350" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
  <rect width="600" height="350" rx="12" fill="#0F172A"/>
  <rect width="600" height="40" rx="12 12 0 0" fill="#1E293B"/>
  <circle cx="20" cy="20" r="5" fill="#EF4444"/><circle cx="40" cy="20" r="5" fill="#F59E0B"/><circle cx="60" cy="20" r="5" fill="#10B981"/>
  <text x="80" y="25" fill="#94A3B8" font-family="monospace" font-size="12">constructor_overloading_map.sh</text>

  <!-- Title -->
  <text x="300" y="75" font-family="Arial" font-size="16" font-weight="bold" fill="#38BDF8" text-anchor="middle">CONSTRUCTOR SELECTION ENGINE</text>

  <!-- Input Call -->
  <rect x="50" y="100" width="180" height="150" rx="16" fill="#1E293B" stroke="#334155"/>
  <text x="140" y="125" fill="#94A3B8" font-family="Arial" font-size="12" font-weight="bold" text-anchor="middle uppercase">Object Request</text>
  
  <g transform="translate(65, 145)">
    <rect width="150" height="35" rx="6" fill="#3B82F6" fill-opacity="0.1" stroke="#3B82F6"/>
    <text x="75" y="22" fill="#93C5FD" font-family="monospace" font-size="11" text-anchor="middle">new Student(101)</text>
  </g>
  <text x="140" y="235" fill="#64748B" font-family="Arial" font-size="10" text-anchor="middle">(Matches based on params)</text>

  <!-- Method Selection logic -->
  <line x1="230" y1="175" x2="330" y2="175" stroke="#334155" stroke-dasharray="4 4" />
  <circle cx="280" cy="175" r="5" fill="#3B82F6" />

  <!-- Constructor Options -->
  <!-- Option 1: No Arg -->
  <g transform="translate(350, 100)">
    <rect width="200" height="50" rx="8" fill="#1E293B" stroke="#334155"/>
    <text x="15" y="25" fill="#64748B" font-family="monospace" font-size="12">Student() { ... }</text>
    <text x="150" y="40" fill="#F87171" font-family="Arial" font-size="9" text-anchor="middle italic text-rose-400">❌ Mismatch</text>
  </g>

  <!-- Option 2: 1 Arg -->
  <g transform="translate(350, 170)">
    <rect width="200" height="50" rx="8" fill="#064E3B" fill-opacity="0.4" stroke="#10B981" stroke-width="2"/>
    <text x="15" y="25" fill="#D1FAE5" font-family="monospace" font-size="12">Student(int id) { ... }</text>
    <text x="150" y="40" fill="#4ADE80" font-family="Arial" font-size="9" text-anchor="middle font-bold text-emerald-400 font-bold uppercase">✅ 100% Match</text>
    
    <!-- Match indicator -->
    <circle cx="-20" cy="25" r="10" fill="#10B981" transform="translate(20, 0)">
       <animate attributeName="r" values="8;12;8" dur="1s" repeatCount="indefinite" />
    </circle>
  </g>

  <!-- Option 3: 2 Args -->
  <g transform="translate(350, 240)">
    <rect width="200" height="50" rx="8" fill="#1E293B" stroke="#334155"/>
    <text x="15" y="25" fill="#64748B" font-family="monospace" font-size="12">Student(int id, String n)</text>
    <text x="150" y="40" fill="#F87171" font-family="Arial" font-size="9" text-anchor="middle italic text-rose-400">❌ Mismatch</text>
  </g>
</svg>
<p class="px-4 py-2 text-center text-[10px] text-slate-500 font-mono italic">Signature Matching: JVM selects the constructor whose parameters exactly match the 'new' call arguments.</p>
</div>`;

const SVG_CHAINING_FLOW = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1">
<svg width="100%" height="auto" viewBox="0 0 600 350" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
  <rect width="600" height="350" rx="12" fill="#0F172A"/>
  <rect width="600" height="40" rx="12 12 0 0" fill="#1E293B"/>
  <circle cx="20" cy="20" r="5" fill="#EF4444"/><circle cx="40" cy="20" r="5" fill="#F59E0B"/><circle cx="60" cy="20" r="5" fill="#10B981"/>
  <text x="80" y="25" fill="#94A3B8" font-family="monospace" font-size="12">constructor_chaining.sh</text>

  <!-- Constructor Area 1 (Caller) -->
  <rect x="50" y="80" width="220" height="120" rx="16" fill="#1E293B" stroke="#334155"/>
  <text x="65" y="105" fill="#94A3B8" font-family="monospace" font-size="12" font-weight="bold">Student() {</text>
  <text x="85" y="140" fill="#F59E0B" font-family="monospace" font-size="14" font-weight="bold">this(101, "Guest");</text>
  <text x="65" y="180" fill="#94A3B8" font-family="monospace" font-size="12">}</text>
  
  <text x="160" y="220" fill="#64748B" font-family="Arial" font-size="10" text-anchor="middle italic text-rose-400">❶ Call must be 1st line!</text>

  <!-- Flow Path -->
  <path d="M 270 140 C 320 140 320 180 340 180" stroke="#3B82F6" stroke-width="2" stroke-dasharray="4 4" marker-end="url(#arrow-blue)"/>

  <!-- Constructor Area 2 (Target) -->
  <rect x="350" y="150" width="220" height="150" rx="16" fill="#064E3B" fill-opacity="0.2" stroke="#10B981" stroke-width="2"/>
  <text x="365" y="175" fill="#D1FAE5" font-family="monospace" font-size="11" font-weight="bold">Student(int id, String n) {</text>
  <text x="385" y="210" fill="#94A3B8" font-family="monospace" font-size="11">this.id = id;</text>
  <text x="385" y="240" fill="#94A3B8" font-family="monospace" font-size="11">this.name = n;</text>
  <text x="365" y="280" fill="#D1FAE5" font-family="monospace" font-size="11">}</text>
</svg>
<p class="px-4 py-2 text-center text-[10px] text-slate-500 font-mono italic">Constructor Chaining: Using this() to delegate initialization logic to another constructor.</p>
</div>`;

const SVG_DEFAULT_VALUES = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1">
<svg width="100%" height="auto" viewBox="0 0 600 380" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
  <rect width="600" height="380" rx="12" fill="#0F172A"/>
  <rect width="600" height="40" rx="12 12 0 0" fill="#1E293B"/>
  <circle cx="20" cy="20" r="5" fill="#EF4444"/><circle cx="40" cy="20" r="5" fill="#F59E0B"/><circle cx="60" cy="20" r="5" fill="#10B981"/>
  <text x="80" y="25" fill="#94A3B8" font-family="monospace" font-size="12">jvm_default_values.sh</text>

  <text x="300" y="65" font-family="Arial" font-size="16" font-weight="bold" fill="#38BDF8" text-anchor="middle">JVM DEFAULT INITIALIZATION</text>

  <!-- Table Body -->
  <rect x="50" y="90" width="500" height="240" rx="12" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
  
  <!-- Headers -->
  <text x="175" y="125" font-family="Arial" font-size="14" font-weight="bold" fill="#94A3B8" text-anchor="middle">Data Type</text>
  <text x="425" y="125" font-family="Arial" font-size="14" font-weight="bold" fill="#94A3B8" text-anchor="middle">Default Value</text>
  <line x1="50" y1="140" x2="550" y2="140" stroke="#334155" stroke-width="1.5"/>

  <!-- Row 1: Numbers -->
  <g transform="translate(0, 0)">
    <text x="175" y="180" font-family="monospace" font-size="12" fill="#F1F5F9" text-anchor="middle">int / byte / short</text>
    <rect x="375" y="160" width="100" height="30" rx="4" fill="#3B82F6" fill-opacity="0.1" stroke="#3B82F6"/>
    <text x="425" y="181" font-family="monospace" font-size="12" font-weight="bold" fill="#38BDF8" text-anchor="middle">0</text>
  </g>

  <!-- Row 2: boolean -->
  <g transform="translate(0, 50)">
    <text x="175" y="180" font-family="monospace" font-size="12" fill="#F1F5F9" text-anchor="middle">boolean</text>
    <rect x="375" y="160" width="100" height="30" rx="4" fill="#EF4444" fill-opacity="0.1" stroke="#EF4444"/>
    <text x="425" y="181" font-family="monospace" font-size="12" font-weight="bold" fill="#F87171" text-anchor="middle">false</text>
  </g>

  <!-- Row 3: char -->
  <g transform="translate(0, 100)">
    <text x="175" y="180" font-family="monospace" font-size="12" fill="#F1F5F9" text-anchor="middle">char</text>
    <rect x="375" y="160" width="100" height="30" rx="4" fill="#64748B" fill-opacity="0.1" stroke="#64748B"/>
    <text x="425" y="181" font-family="monospace" font-size="10" font-weight="bold" fill="#CBD5E1" text-anchor="middle">\\u0000</text>
  </g>

  <!-- Row 4: Objects -->
  <g transform="translate(0, 150)">
    <text x="175" y="180" font-family="monospace" font-size="12" fill="#F1F5F9" text-anchor="middle">Objects / String</text>
    <rect x="375" y="160" width="100" height="30" rx="4" fill="#818CF8" fill-opacity="0.1" stroke="#818CF8" stroke-dasharray="3 3"/>
    <text x="425" y="181" font-family="monospace" font-size="12" font-weight="bold" fill="#818CF8" text-anchor="middle">null</text>
  </g>
</svg>
<p class="px-4 py-2 text-center text-[10px] text-slate-500 font-mono italic">Initialization: JVM assigns default values before user code executes.</p>
</div>`;

seedModule({
    moduleTitle: 'Constructor',
    moduleOrder: 13,
    description: 'Master object initialization, default and parameterized constructors, and overloading patterns.',
    label: 'CONSTRUCTORS',
    lessons: [
        {
            title: 'Introduction to Constructor',
            duration: '35 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\">A <strong>Constructor</strong> in Java is a special type of method that is used to <strong>initialize objects</strong> when they are created.</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>It is automatically called when an object is created using the <code>new</code> keyword.</li><li>Its primary job is to set up the starting state of an object.</li></ul>" },
                { "type": "section", "title": "2. Core Idea", "code": "Student s1 = new Student();", "rich": "<p class=\"mt-4\">Whenever you create an object, Java internally calls a constructor to:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li><strong>Allocate memory</strong> (in Heap)</li><li><strong>Initialize variables</strong> (default or custom values)</li></ul>" },
                { "type": "section", "title": "3. Why Constructors Exist", "rich": "<p class=\"mb-4\">Without constructors, objects would be created with uninitialized or meaningless data, and you would need to manually assign values every time. Constructors ensure:</p><ul class=\"list-disc ml-5 space-y-2 mb-4\"><li class=\"p-2 bg-emerald-50 border-l-4 border-emerald-400\">✅ Every object starts in a <strong>valid state</strong>.</li><li class=\"p-2 bg-blue-50 border-l-4 border-blue-400\">✅ Initialization logic is <strong>centralized</strong> and controlled.</li></ul>" },
                { "type": "section", "title": "4. Basic Characteristics", "rich": "<ul class=\"grid grid-cols-1 md:grid-cols-2 gap-3 mb-6\"><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold\">📛 Name must be SAME as Class name</li><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold\">🚫 No return type (not even void)</li><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold\">⚡ Automatically invoked by <code>new</code></li><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold\">1️⃣ Runs exactly ONCE per object</li></ul>" },
                { "type": "section", "title": "5. Simple Example", "code": "class Student {\n    Student() {\n        System.out.println(\"Constructor Called\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student();\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl border border-slate-700\">Constructor Called</pre>" },
                { "type": "section", "title": "Step-by-Step Explanation", "rich": "<ol class=\"list-decimal ml-5 space-y-2 mb-4 bg-slate-50 p-4 rounded-lg text-sm\"><li><code>new Student()</code> is executed.</li><li><strong>JVM Analysis:</strong> Loads class, allocates memory in Heap.</li><li><strong>Constructor Trigger:</strong> <code>Student()</code> is automatically called.</li><li><strong>Execution:</strong> Code inside the constructor runs (printing the message).</li></ol>" },
                { "type": "section", "title": "6. Constructor vs Method", "rich": TABLE(`<thead><tr class=\"bg-slate-100\"><th class=\"px-4 py-3 border-r font-bold\">Feature</th><th class=\"px-4 py-3 border-r font-bold\">Constructor</th><th class=\"px-4 py-3 font-bold\">Method</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-semibold italic\">Purpose</td><td class=\"px-4 py-3 border-r\">Initialize object</td><td class=\"px-4 py-3\">Perform operations</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-semibold italic\">Name</td><td class=\"px-4 py-3 border-r\">Same as class</td><td class=\"px-4 py-3\">Any valid name</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-semibold italic\">Return Type</td><td class=\"px-4 py-3 border-r\">None</td><td class=\"px-4 py-3\">Must have return type</td></tr><tr><td class=\"px-4 py-3 border-r font-semibold italic\">Call</td><td class=\"px-4 py-3 border-r\">Automatic</td><td class=\"px-4 py-3\">Manual</td></tr></tbody>`) },
                { "type": "section", "title": "7. Default Constructor (Very Important)", "rich": "<p class=\"mb-4\">If you do not write any constructor in your class, Java <strong>automatically</strong> provides one for you. This is called the <strong>Default Constructor</strong>.</p><div class=\"p-4 bg-slate-100 rounded-lg font-mono mb-4 text-sm\">class Student { } // Empty class<br/>// Java adds Student() { } internally</div>" },
                { "type": "section", "title": "Real Meaning of Initialization", "code": "class Student {\n    String name;\n    int age;\n\n    Student() {\n        name = \"Unknown\";\n        age = 0;\n    }\n}", "rich": "<p class=\"mb-2 mt-4 font-bold text-xs uppercase tracking-tighter\">Inside the object:</p><ul class=\"list-none p-0 text-sm italic text-slate-600\"><li>👉 name → \"Unknown\"</li><li>👉 age → 0</li></ul>" },
                { "type": "section", "title": "8. Object Creation Flow (JVM Level)", "rich": SVG_CONSTRUCTOR_FLOW },
                { "type": "section", "title": "Internal Tracing", "rich": "<ol class=\"list-decimal ml-5 space-y-2 mb-4 bg-slate-50 p-4 rounded-lg text-sm text-slate-700\"><li><strong>Class Load</strong> (Method Area)</li><li><strong>Memory Allocation</strong> (Heap)</li><li><strong>Field Level Defaults:</strong> JVM sets <code>name = null</code>, <code>age = 0</code>.</li><li><strong>Constructor Execution:</strong> Your code runs and assigns <code>\"Unknown\"</code>.</li><li><strong>Reference Storage:</strong> Address of Heap object is stored in Stack variable <code>s1</code>.</li></ol>" },
                { "type": "section", "title": "9. Key Responsibilities & Rules", "rich": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\"><div><p class=\"font-bold text-xs text-indigo-600 mb-2 uppercase\">Responsibilities</p><ul class=\"list-disc ml-5 text-sm space-y-1 mb-4\"><li>Initialize variables</li><li>Prepare object for use</li><li>Enforce required data</li></ul></div><div><p class=\"font-bold text-xs text-rose-600 mb-2 uppercase\">Important Rules</p><ul class=\"list-disc ml-5 text-sm space-y-1 mb-4\"><li>Not inherited</li><li>Cannot be <code>static</code> / <code>abstract</code> / <code>final</code></li><li>Can be overloaded (covered later)</li></ul></div></div>" },
                { "type": "section", "title": "10. Real Example (Practical)", "code": "class Car {\n    String brand;\n    int speed;\n\n    Car() {\n        brand = \"Default\";\n        speed = 0;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car c1 = new Car();\n        System.out.println(c1.brand);\n        System.out.println(c1.speed);\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl border border-slate-700\">Default\n0</pre>" },
                { "type": "section", "title": "11. Why It Matters in Real Projects", "rich": "<p class=\"mb-4\">Constructors are essential for dependency injection and state management:</p><ul class=\"list-disc ml-5 space-y-1 mb-4 font-medium text-slate-800\"><li>Database connection setup</li><li>API object initialization</li><li>Configuration preparation</li></ul>" },
                { "type": "section", "title": "12. Mental Model", "rich": NOTE("Think of a constructor like a <strong>🏗️ Factory Setup Step</strong>. When you order a product (object), the constructor is the setup process that runs in the factory before the product is delivered. It ensures everything is ready for use the moment you receive it.") },
                { "type": "section", "title": "13. Common Beginner Mistakes", "rich": WARNING("<ul><li class=\"mb-2 underline\">Mistake 1: Adding return type</li><p class=\"text-xs\"><code>void Student() {}</code> is a METHOD, not a constructor. JVM will not call it automatically!</p><li class=\"mb-2 underline\">Mistake 2: Calling manually</li><p class=\"text-xs\"><code>s1.Student();</code> will cause a compiler error.</p></ul>") },
                { "type": "section", "title": "Summary & Next Steps", "rich": "<p class=\"text-sm italic\">Constructor = Object Initialization Engine. It runs automatically to ensure your object is ready immediately. Next, we will explore <strong>Constructor Types</strong> and <strong>Overloading</strong>.</p>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic\">Put the initialization engine to the test.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Define a class <code>Employee</code> with a constructor that prints <code>\"Hired\"</code>. In <code>main</code>, create an object of <code>Employee</code>. <br/><strong>Match Output:</strong> <code>Hired</code>", "hints": ["public class Employee { Employee() { ... } }", "new Employee();"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Create a class <code>Point</code> with a constructor that sets an instance variable <code>x = 100</code>. Create object <code>p</code> and print <code>p.x</code>. <br/><strong>Match Output:</strong> <code>100</code>", "hints": ["int x;", "Point() { x = 100; }"], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Define a class <code>Test</code> with a <code>void Test()</code> method that prints <code>\"Method\"</code>. In <code>main</code>, create <code>new Test()</code>. What prints? <br/><strong>Match Output:</strong> <code>(empty)</code>", "hints": ["JVM ignores methods with return types during creation", "If output is empty, just match nothing or check behavior"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "Hired", "matchCode": "Employee" },
                { "index": 2, "match": "100", "matchCode": "Point" },
                { "index": 3, "match": "^\\s*$", "matchCode": "void" }
            ]
        },
        {
            title: 'Default Constructor',
            duration: '40 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\">A <strong>Default Constructor</strong> is a constructor that takes <strong>no parameters</strong> and is either:</p><ul class=\"list-disc ml-5 space-y-2 font-semibold text-slate-700\"><li>Automatically provided by the Java compiler (if no constructor is written).</li><li>Explicitly defined by the programmer with no parameters.</li></ul>" },
                { "type": "section", "title": "2. Core Concept", "code": "// Object creation triggers a constructor\nStudent s1 = new Student();", "rich": "<p class=\"mt-4\">Java needs a constructor to initialize the object. If you don’t define any constructor, Java automatically provides a <strong>compiler-generated</strong> default constructor like:</p><pre class=\"p-3 bg-slate-800 text-sky-400 rounded-lg font-mono text-sm\">Student() { }</pre>" },
                { "type": "section", "title": "3. Key Idea", "rich": "<div class=\"space-y-3 mb-6\"><div class=\"flex items-start gap-3 p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl\"><span class=\"mt-1 text-emerald-600 font-bold\">✔</span><p class=\"text-sm text-emerald-900\"><strong>Ensures success:</strong> Every object starts in a valid physical state.</p></div><div class=\"flex items-start gap-3 p-3 bg-blue-50/50 border border-blue-100 rounded-xl\"><span class=\"mt-1 text-blue-600 font-bold\">✔</span><p class=\"text-sm text-blue-900\"><strong>Auto-Defaults:</strong> JVM assigns 0, false, or null to variables immediately.</p></div><div class=\"flex items-start gap-3 p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl\"><span class=\"mt-1 text-indigo-600 font-bold\">✔</span><p class=\"text-sm text-indigo-900\"><strong>No-Arg Support:</strong> Allows <code>new Student()</code> without constructor data.</p></div><div class=\"flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl\"><span class=\"mt-1 text-slate-400 font-bold\">✔</span><p class=\"text-sm text-slate-700\"><strong>Compiler Check:</strong> Only provided if NO other constructor is defined.</p></div><div class=\"flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl\"><span class=\"mt-1 text-slate-400 font-bold\">✔</span><p class=\"text-sm text-slate-700\"><strong>Naming Rule:</strong> Must strictly match the class name (case-sensitive).</p></div><div class=\"flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl\"><span class=\"mt-1 text-slate-400 font-bold\">✔</span><p class=\"text-sm text-slate-700\"><strong>Return Rule:</strong> Strictly NO return type (not even <code>void</code>).</p></div></div>" },
                { "type": "section", "title": "4. Default Values Assigned by JVM", "rich": SVG_DEFAULT_VALUES },
                { "type": "section", "title": "5. Compiler-Generated Default Constructor", "code": "class Student {\n    String name;\n    int age;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student();\n        System.out.println(s1.name);\n        System.out.println(s1.age);\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase text-slate-500 tracking-widest\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm\">null\n0</pre> <div class=\"mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs italic text-slate-600\">Explanation: No constructor is written, so Java creates <code>Student() { }</code> automatically. Variables name (null) and age (0) get JVM defaults.</div>" },
                { "type": "section", "title": "6. User-Defined Default Constructor", "code": "class Student {\n    String name;\n    int age;\n\n    // Explicitly written\n    Student() {\n        name = \"Unknown\";\n        age = 18;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student();\n        System.out.println(s1.name);\n        System.out.println(s1.age);\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase text-slate-500 tracking-widest\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm\">Unknown\n18</pre> <div class=\"mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs italic text-slate-600\">Explanation: JVM does NOT create a default constructor because one is already defined manually.</div>" },
                { "type": "section", "title": "7. Important Rule (Critical)", "rich": "<h4 class=\"text-xl font-bold text-slate-800 mb-2\">Golden Rule</h4><p class=\"mb-6 text-slate-700 font-semibold italic\">If you define ANY constructor, Java will NOT provide a default constructor.</p><pre class=\"p-5 bg-[#0d1117] text-white rounded-2xl font-mono text-sm border border-slate-800 leading-relaxed shadow-2xl\"><span class=\"text-[#ff7b72]\">class</span> <span class=\"text-[#ffa657]\">Student</span> {\n  <span class=\"text-[#d2a8ff]\">Student</span>(<span class=\"text-[#ff7b72]\">int</span> x) { }\n}\n\n<span class=\"text-[#ffa657]\">Student</span> s = <span class=\"text-[#ff7b72]\">new</span> <span class=\"text-[#ffa657]\">Student</span>(); <span class=\"text-[#49ed94]\">// ❌ COMPILE ERROR</span>\n<span class=\"text-[#8b949e]\">// Reason: No-argument constructor doesn't exist anymore!</span></pre>" },
                { "type": "section", "title": "8. How JVM Handles Default Constructor", "rich": "<div class=\"bg-slate-50 p-6 rounded-2xl border border-slate-200\"><ol class=\"list-decimal ml-5 space-y-3 text-sm text-slate-700 font-medium font-medium\"><li><strong>Class Load</strong> into Method Area.</li><li><strong>Memory Allocation</strong> in Heap.</li><li><strong>Instance variables</strong> get default values (null/0/false).</li><li><strong>Default constructor executes</strong> (your code runs).</li><li><strong>Reference storage</strong> in Stack.</li></ol></div>" },
                { "type": "section", "title": "9. Real Example (Complete Flow)", "code": "class Car {\n    String brand;\n    int speed;\n\n    Car() {\n        System.out.println(\"Car Created\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car c1 = new Car();\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase text-slate-500 tracking-widest\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm\">Car Created</pre>" },
                { "type": "section", "title": "Step-by-Step Execution (Tracing)", "rich": "<ul class=\"space-y-3\"><li class=\"flex items-center gap-3 p-3 bg-slate-50 rounded-lg text-sm\"><span class=\"w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold\">1</span> <code>new Car()</code> called</li><li class=\"flex items-center gap-3 p-3 bg-slate-50 rounded-lg text-sm\"><span class=\"w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold\">2</span> JVM allocates memory</li><li class=\"flex items-center gap-3 p-3 bg-slate-50 rounded-lg text-sm\"><span class=\"w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold\">3</span> Variables initialized: brand → null, speed → 0</li><li class=\"flex items-center gap-3 p-3 bg-slate-50 rounded-lg text-sm\"><span class=\"w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold\">4</span> Constructor logic runs (Prints message)</li><li class=\"flex items-center gap-3 p-3 bg-teal-50 rounded-lg text-sm\"><span class=\"w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs\">DONE</span> Object reference assigned</li></ul>" },
                { "type": "section", "title": "10. When to Use & Advantages", "rich": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-6\"><div class=\"p-4 border border-indigo-100 rounded-2xl bg-indigo-50/50\"><h5 class=\"font-black text-indigo-900 text-sm mb-3 uppercase tracking-wider\">When to Use</h5><ul class=\"list-disc ml-5 text-sm space-y-1 text-slate-700 font-medium font-medium\"><li>No initial data needed</li><li>Framework requirements</li><li>Creating simple models</li></ul></div><div class=\"p-4 border border-emerald-100 rounded-2xl bg-emerald-50/50\"><h5 class=\"font-black text-emerald-900 text-sm mb-3 uppercase tracking-wider\">Advantages</h5><ul class=\"list-disc ml-5 text-sm space-y-1 text-slate-700 font-medium font-medium\"><li>Simplifies creation</li><li>Ensures initialization</li><li>Reduces boilerplate</li></ul></div></div>" },
                { "type": "section", "title": "11. Framework Usage", "rich": "<div class=\"p-4 rounded-xl bg-orange-50 border border-orange-200 mt-6 shadow-sm font-semibold\"><div class=\"flex items-center gap-3 mb-2\"><span class=\"text-xl\">⚙️</span><span class=\"font-bold tracking-tight uppercase text-xs text-orange-800\">Pro Insight</span></div><p class=\"text-sm text-orange-950 leading-relaxed\">Frameworks like <strong>Spring, Hibernate, and Jackson</strong> REQUIRE a default constructor to create objects through <span class=\"underline\">Reflection</span> or <span class=\"underline\">Serialization</span>.</p></div>" },
                { "type": "section", "title": "12. Mental Model", "rich": NOTE("Think of a default constructor as <strong>🏗️ Basic Object Setup</strong>. It does the absolute minimum: creates the physical object and applies default JVM settings to make the object usable immediately.") },
                { "type": "section", "title": "13. Common Mistakes", "rich": WARNING("<ul><li><strong>Mistake 1:</strong> Assuming default constructor always exists after you write a parameterized one.</li><li><strong>Mistake 2:</strong> Confusing JVM default values (null/0) with custom constructor logic.</li><li><strong>Mistake 3:</strong> Expecting local variables to have default values (they DON'T, only instance fields do).</li></ul>") },
                { "type": "section", "title": "Summary Checklist", "rich": "🏁 <strong>Key Rules Summary:</strong><ul class=\"list-none p-0 mt-4 space-y-2\"><li class=\"flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm\"><span class=\"w-4 h-4 rounded-full bg-slate-800\"></span> Takes zero arguments</li><li class=\"flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm\"><span class=\"w-4 h-4 rounded-full bg-slate-800\"></span> Added by compiler ONLY if zero other constructors exist</li><li class=\"flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm\"><span class=\"w-4 h-4 rounded-full bg-slate-800\"></span> Triggers JVM default value assignment</li></ul>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic\">Verify your understanding of compiler behavior.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Create a class <code>Game</code> with NO constructors. In <code>main</code>, create <code>new Game()</code> and print \"Ready\". <br/><strong>Match Output:</strong> <code>Ready</code>", "hints": ["JVM will provide the constructor for you", "System.out.println(\"Ready\");"], "points": 10 },
                { "index": 2, "type": "task", "value": "2. <strong>Instruction:</strong> Create a class <code>User</code> with an instance variable <code>int score;</code> but NO constructor. Create object <code>u</code> and print <code>u.score</code>. <br/><strong>Match Output:</strong> <code>0</code>", "hints": ["Check the JVM default value for int"], "points": 10 },
                { "index": 3, "type": "task", "value": "3. <strong>Instruction:</strong> Create a class <code>Box</code> with a constructor <code>Box(int size) { }</code>. In <code>main</code>, try creating <code>new Box();</code>. What happens? (Predict error or print 'Error' manually). <br/><strong>Match Output:</strong> <code>Error</code>", "hints": ["Compiler no longer provides default constructor", "You'll see: 'constructor Box in class Box cannot be applied to given types'"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "Ready", "matchCode": "Game" },
                { "index": 2, "match": "0", "matchCode": "User" },
                { "index": 3, "match": "Error|error", "matchCode": "new Box\\(\\)" }
            ]
        },
        {
            title: 'Parameterized Constructor',
            duration: '45 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\">A <strong>Parameterized Constructor</strong> is a constructor that <strong>accepts arguments (parameters)</strong> at the time of object creation, allowing you to initialize object properties with specific values instead of default values.</p>" },
                { "type": "section", "title": "2. Concept Explanation (Scratch ➔ Advanced)", "rich": "<p class=\"mt-4\">When you create an object using <code>new</code>, Java allocates memory and then calls a constructor to initialize that object.</p><ul class=\"list-disc ml-5 space-y-2 mt-4\"><li>A <strong>default constructor</strong> initializes objects with default values (0, null, false).</li><li>But in real-world applications, objects need <strong>custom data</strong> at creation time.</li></ul> <p class=\"mt-4\">That’s where Parameterized Constructors come in. They allow:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Passing values during object creation</li><li>Initializing instance variables dynamically</li><li>Creating flexible and reusable objects</li></ul>" },
                { "type": "section", "title": "3. The Advantage", "rich": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 my-6\"><div><p class=\"font-bold text-xs uppercase text-slate-500 mb-2 tracking-widest\">Instead of:</p><pre class=\"p-3 bg-slate-100 text-slate-800 rounded-lg font-mono text-xs shadow-sm shadow-inner\">Student s = new Student();\ns.name = \"John\";\ns.age = 20;</pre></div><div><p class=\"font-bold text-xs uppercase text-emerald-600 mb-2 tracking-widest italic font-black\">You do (The Better Way):</p><pre class=\"p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg font-mono text-xs shadow-sm font-bold\">Student s = new Student(\"John\", 20);</pre></div></div> <p class=\"mb-2 font-bold text-xs uppercase tracking-widest text-slate-400\">This ensures:</p><ul class=\"flex flex-wrap gap-2 mb-4 p-0\"><li class=\"px-3 py-1 bg-slate-100 border border-slate-200 text-xs rounded-full font-semibold italic\">Cleaner code</li><li class=\"px-3 py-1 bg-slate-100 border border-slate-200 text-xs rounded-full font-semibold italic\">Better encapsulation</li><li class=\"px-3 py-1 bg-slate-100 border border-slate-200 text-xs rounded-full font-semibold italic\">Safer object creation</li></ul>" },
                { "type": "section", "title": "4. Syntax", "code": "class ClassName {\n    ClassName(datatype param1, datatype param2) {\n        // initialization logic\n    }\n}" },
                { "type": "section", "title": "5. Key Points (Important for Interviews + Real Projects)", "rich": "<ul class=\"grid grid-cols-1 md:grid-cols-2 gap-3 mb-6\"><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold\"><span class=\"mr-2 text-indigo-500\">🚀</span> Constructor name must match class name</li><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold\"><span class=\"mr-2 text-indigo-500\">🚫</span> No return type (not even void)</li><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold\"><span class=\"mr-2 text-indigo-500\">⚡</span> Called automatically when object is created</li><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold\"><span class=\"mr-2 text-indigo-500\">👥</span> Can have multiple parameters</li><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold\"><span class=\"mr-2 text-indigo-500\">📦</span> Supports constructor overloading</li><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold\"><span class=\"mr-2 text-indigo-500\">⚙️</span> Used to initialize instance variables</li><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold\"><span class=\"mr-2 text-indigo-500\">📚</span> Improves code readability</li><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-emerald-700\"><span class=\"mr-2 text-indigo-500\">🛠️</span> Essential for maintainability</li></ul>" },
                { "type": "section", "title": "6. Basic Example", "code": "class Student {\n    String name;\n    int age;\n\n    Student(String n, int a) {\n        name = n;\n        age = a;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student(\"John\", 20);\n\n        System.out.println(s1.name);\n        System.out.println(s1.age);\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border border-slate-700\">John\n20</pre>" },
                { "type": "section", "title": "Step-by-Step Execution", "rich": "<ol class=\"list-decimal ml-5 space-y-2 mb-4 bg-slate-50 p-4 rounded-lg text-sm text-slate-700\"><li><code>new Student(\"John\", 20)</code> is called</li><li>Memory allocated in <strong>Heap</strong></li><li>Constructor is invoked</li><li><code>\"John\"</code> → assigned to <code>name</code></li><li><code>20</code> → assigned to <code>age</code></li><li>Reference <code>s1</code> points to object</li><li>Values printed</li></ol>" },
                { "type": "section", "title": "7. Using 'this' Keyword (Best Practice)", "code": "class Student {\n    String name;\n    int age;\n\n    Student(String name, int age) {\n        this.name = name;\n        this.age = age;\n    }\n}", "rich": "<div class=\"mt-4 p-4 border border-blue-100 rounded-xl bg-blue-50/50\"><p class=\"font-black text-blue-900 text-xs uppercase tracking-wider mb-2\">Why this?</p><ul class=\"list-disc ml-5 text-sm space-y-1 text-slate-700\"><li>Differentiates <strong>instance variables</strong> from parameters</li><li>Improves <strong>readability</strong></li><li>Standard <strong>industry practice</strong></li></ul></div>" },
                { "type": "section", "title": "8. Multiple Objects Example", "code": "class Employee {\n    String name;\n    int salary;\n\n    Employee(String name, int salary) {\n        this.name = name;\n        this.salary = salary;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Employee e1 = new Employee(\"Alice\", 50000);\n        Employee e2 = new Employee(\"Bob\", 60000);\n\n        System.out.println(e1.name + \" \" + e1.salary);\n        System.out.println(e2.name + \" \" + e2.salary);\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl pb-3\">Alice 50000\nBob 60000</pre>" },
                { "type": "section", "title": "9. Constructor Overloading (Advanced Use)", "code": "class Product {\n    String name;\n    double price;\n\n    Product(String name) {\n        this.name = name;\n    }\n\n    Product(String name, double price) {\n        this.name = name;\n        this.price = price;\n    }\n}\n\n// Usage:\nProduct p1 = new Product(\"Pen\");\nProduct p2 = new Product(\"Book\", 50.0);", "rich": "<p class=\"text-xs mt-4 text-slate-500 italic uppercase tracking-wider font-bold\">Note: Covered more deeply in the next lesson.</p>" },
                { "type": "section", "title": "10. Real-World Example (Industry Level)", "code": "class User {\n    String username;\n    String password;\n\n    User(String username, String password) {\n        this.username = username;\n        this.password = password;\n    }\n\n    void login() {\n        System.out.println(\"User \" + username + \" logged in\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        User u = new User(\"admin\", \"1234\");\n        u.login();\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-[#FF453A]\">Output:</p><pre class=\"p-4 bg-black text-rose-300 rounded-lg font-mono text-sm shadow-xl\">User admin logged in</pre>" },
                { "type": "section", "title": "11. Memory Behavior (JVM View)", "rich": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 my-4 mb-6\"><div class=\"p-4 border border-slate-100 bg-[#0F172A] rounded-2xl\"><p class=\"text-sky-400 font-black text-xs uppercase mb-3\">STACK (Ref)</p><p class=\"text-slate-400 text-sm\"><code>u</code> ➔ reference variable</p></div><div class=\"p-4 border border-slate-100 bg-[#0F172A] rounded-2xl\"><p class=\"text-emerald-400 font-black text-xs uppercase mb-3\">HEAP (Instance)</p><ul class=\"list-none p-0 space-y-1 text-slate-400 text-sm italic text-xs\"><li>➊ Object allocated in memory</li><li>➋ Fields assigned values from constructor</li></ul></div></div>" },
                { "type": "section", "title": "Understanding Data Flow (Visual)", "rich": SVG_PARAMETERIZED_FLOW },
                { "type": "section", "title": "12. Common Mistakes", "rich": WARNING("<ul><li class=\"mb-2 underline font-bold underline font-black\">❌ Forgetting to assign values:</li><p class=\"text-xs\"><code>Student(String name, int age) { }</code> — Nothing assigned to instance fields!</p><li class=\"mb-2 underline font-black\">❌ Not using 'this' when needed:</li><p class=\"text-xs\">Parameter names matching instance variable names without <code>this</code> leads to shadowing.</p><li class=\"mb-2 underline font-black\">❌ Wrong parameter order:</li><p class=\"text-xs\"><code>new Student(20, \"John\");</code> — ERROR if data types mismatch (int vs String).</p><li class=\"mb-2 underline font-black\">❌ Assuming constructor is a normal method:</li><p class=\"text-xs\">Cannot call it like <code>s1.Student(...)</code> after creation!</p></ul>") },
                { "type": "section", "title": "13. Why It Is Important", "rich": "<ul class=\"space-y-4 mb-6\"><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium\"><span class=\"mr-2\">💎</span> Mandatory for real-world models (User, Order, Product).</li><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium\"><span class=\"mr-2\">💎</span> Helps create fully initialized objects.</li><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium\"><span class=\"mr-2\">💎</span> Avoids partially filled or invalid objects.</li><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium\"><span class=\"mr-2\">💎</span> Makes APIs cleaner.</li></ul>" },
                { "type": "section", "title": "Interview Insight", "rich": "<div class=\"p-6 rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-2xl\"><div class=\"flex items-center gap-3 mb-4\"><div class=\"w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs\">💡</div><h5 class=\"text-blue-400 font-black tracking-tight uppercase\">Quick Check</h5></div><p class=\"mb-2 text-sm\"><strong>👉 Difference:</strong> Default Constructor ➔ No parameters | Parameterized ➔ Accepts values</p><p class=\"mb-2 text-sm\"><strong>👉 Most asked:</strong> Can constructor be overloaded? ➔ <strong>YES</strong></p><p class=\"mb-2 text-sm\"><strong>👉 Most asked:</strong> Can constructor return value? ➔ <strong>NO</strong></p><p class=\"text-sm italic text-slate-400\">👉 Can constructor be private? ➔ <strong>YES</strong> (Factory pattern)</p></div>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic text-sm tracking-tight border-l-2 border-slate-200 pl-3 leading-tight uppercase font-black\">Put the custom setup to the test.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Create a class <code>Product</code> with a constructor that takes <code>String name</code>. Print the name in <code>main</code> using <code>new Product(\"Laptop\")</code>. <br/><strong>Match Output:</strong> <code>Laptop</code>", "hints": ["String name;", "Product(String n) { name = n; }"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Create a class <code>Adder</code> with a constructor that takes <code>int a</code> and <code>int b</code> and prints their sum. Create <code>new Adder(5, 10)</code>. <br/><strong>Match Output:</strong> <code>15</code>", "hints": ["Adder(int n1, int n2) { System.out.println(n1 + n2); }"], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Create a class <code>User</code> with <code>int age</code> and a constructor using <code>this.age = age</code>. Print <code>age</code> for <code>new User(21)</code>. <br/><strong>Match Output:</strong> <code>21</code>", "hints": ["this.age = age;"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "Laptop", "matchCode": "Product" },
                { "index": 2, "match": "15", "matchCode": "Adder" },
                { "index": 3, "match": "21", "matchCode": "User" }
            ]
        },
        {
            title: 'Constructor Overloading',
            duration: '45 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\"><strong>Constructor Overloading</strong> is a feature in Java where a class defines multiple constructors with different parameter lists (signatures).</p><p class=\"mb-4\">Each constructor provides a different way to initialize an object, depending on the data available at the time of creation.</p><p class=\"mb-2 font-bold\">Java identifies which constructor to execute based on:</p><ul class=\"list-disc ml-5 space-y-2 mb-4 text-slate-700\"><li>Number of parameters</li><li>Data types of parameters</li><li>Order of parameters</li></ul>" },
                { "type": "section", "title": "2. Concept Explanation (From Scratch → Advanced)", "rich": "<p class=\"mb-4\">When an object is created using <code>new</code>, Java must decide which constructor to call.</p><ul class=\"list-none p-0 space-y-2 mb-6\"><li>👉 If a class has only one constructor → simple</li><li>👉 If a class has multiple constructors → Java uses Constructor Overloading</li></ul><p class=\"mb-4 font-bold\">This allows:</p><ul class=\"list-disc ml-5 space-y-2 mb-6 text-slate-700\"><li>Flexible object creation</li><li>Cleaner code design</li><li>Better handling of optional data</li></ul><div class=\"p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-sm\"><p class=\"mb-2 font-bold text-slate-800 uppercase text-xs\">👉 Real-world thinking:</p><p class=\"mb-2 text-slate-600\">Not all users provide complete data.</p><p class=\"mb-2 text-slate-600\">So your system must support:</p><ul class=\"list-disc ml-5 space-y-1 mb-4 text-slate-700\"><li>Minimal initialization</li><li>Partial initialization</li><li>Full initialization</li></ul><p class=\"font-medium text-slate-800\">Constructor Overloading solves this.</p></div>" },
                { "type": "section", "title": "3. Core Concept (Understanding the Flow)", "code": "class Student {\n    Student() { }\n    Student(int id) { }\n    Student(int id, String name) { }\n}", "rich": "<p class=\"mb-2 mt-4 font-bold\">When calling:</p><pre class=\"p-2 bg-slate-100 rounded mb-4 font-mono text-sm border inline-block\">new Student(101);</pre><p class=\"mb-2 font-bold\">Java:</p><ul class=\"list-disc ml-5 space-y-2 mb-4 text-slate-700 font-medium\"><li>Checks all constructors</li><li>Matches parameters</li><li>Picks exact match</li></ul>" },
                { "type": "section", "title": "4. Constructor Selection Mechanism (Deep Understanding)", "rich": "<p class=\"mb-4\">Java uses <strong>Compile-Time Resolution</strong>.</p><p class=\"mb-2 font-bold\">Matching Priority:</p><ul class=\"list-decimal ml-5 space-y-2 mb-6 text-slate-800 font-medium bg-slate-50 p-4 border rounded-xl\"><li>Exact match</li><li>Type compatibility</li><li>Widening (int → long)</li><li>Autoboxing (int → Integer)</li></ul>" },
                { "type": "section", "rich": "<p class=\"mb-2 font-bold\">Example:</p>", "code": "class Test {\n    Test(int a) {\n        System.out.println(\"int constructor\");\n    }\n\n    Test(double a) {\n        System.out.println(\"double constructor\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        new Test(10);     // int\n        new Test(10.5);   // double\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mb-2 font-bold\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm\">int constructor\ndouble constructor</pre>" },
                { "type": "section", "title": "5. Rules for Constructor Overloading", "rich": "<p class=\"mb-4 font-bold\">To overload constructors, signatures must differ by:</p><ul class=\"list-none p-0 space-y-2 mb-6 font-medium text-slate-700\"><li><span class=\"text-emerald-500 mr-2\">✔</span> Number of parameters</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Type of parameters</li><li><span class=\"text-emerald-500 mr-2\">✔</span> Order of parameters</li></ul><div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-4\"><div class=\"p-3 bg-rose-50 border border-rose-200 rounded-lg text-sm\"><p class=\"mb-2 font-bold text-rose-800 uppercase text-xs tracking-wider\">❌ NOT VALID:</p><pre class=\"text-rose-700 font-mono\">Student(int id)\nStudent(int age)   // ❌ SAME signature → ERROR</pre></div><div class=\"p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm\"><p class=\"mb-2 font-bold text-emerald-800 uppercase text-xs tracking-wider\">✔ VALID:</p><pre class=\"text-emerald-700 font-mono\">Student(int id)\nStudent(String name)\nStudent(int id, String name)\nStudent(String name, int id)</pre></div></div>" },
                { "type": "section", "title": "6. Practical Example (Full Implementation)", "code": "class Employee {\n    int id;\n    String name;\n\n    // Constructor 1\n    Employee() {\n        id = 0;\n        name = \"Guest\";\n    }\n\n    // Constructor 2\n    Employee(int id) {\n        this.id = id;\n        this.name = \"Unknown\";\n    }\n\n    // Constructor 3\n    Employee(int id, String name) {\n        this.id = id;\n        this.name = name;\n    }\n\n    void display() {\n        System.out.println(id + \" \" + name);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Employee e1 = new Employee();\n        Employee e2 = new Employee(500);\n        Employee e3 = new Employee(101, \"Alice\");\n\n        e1.display();\n        e2.display();\n        e3.display();\n    }\n}" },
                { "type": "section", "title": "7. Output", "rich": "<pre class=\"p-4 bg-black flex flex-col text-white rounded-lg font-mono text-sm mb-4 shadow-xl border-l-4 border-emerald-500\"><span>0 Guest</span><span>500 Unknown</span><span>101 Alice</span></pre>" },
                { "type": "section", "title": "8. Step-by-Step Execution (Tracing)", "rich": "<p class=\"mb-2 font-bold text-slate-800\">For:</p><pre class=\"p-2 bg-slate-100 rounded mb-4 text-sm font-mono border border-slate-200 w-auto inline-block\">Employee e2 = new Employee(500);</pre><p class=\"mb-2 font-bold\">Flow:</p><ul class=\"list-none p-0 space-y-4 mb-4 text-sm text-slate-700 font-medium bg-white p-4 rounded-xl border\"><li><p>JVM finds constructor with one parameter</p></li><li><p>Calls:</p><pre class=\"p-2 bg-slate-50 border rounded text-[11px] mt-2 font-mono\">Employee(int id)</pre></li><li><p>Assigns:</p><pre class=\"p-2 bg-slate-50 border rounded text-[11px] mt-2 font-mono\">id = 500\nname = \"Unknown\"</pre></li><li><p>Object created in Heap</p></li><li><p>Reference stored in Stack</p></li></ul>" },
                { "type": "section", "title": "9. Constructor Chaining (Advanced Concept)", "rich": "<p class=\"mb-4\">You can reuse constructors using <code>this()</code>.</p>", "code": "class Student {\n    int id;\n    String name;\n\n    Student() {\n        this(0, \"Guest\");\n    }\n\n    Student(int id) {\n        this(id, \"Unknown\");\n    }\n\n    Student(int id, String name) {\n        this.id = id;\n        this.name = name;\n    }\n}" },
                { "type": "section", "rich": "<div class=\"p-4 bg-indigo-50 border border-indigo-100 rounded-xl my-4 text-sm\"><p class=\"mb-2 font-bold text-indigo-900 uppercase tracking-widest text-[10px]\">Why this is powerful:</p><ul class=\"list-disc ml-5 space-y-1 mb-0 text-indigo-800 font-medium\"><li>Avoids duplicate code</li><li>Centralized initialization</li><li>Cleaner design</li></ul></div>" },
                { "type": "section", "title": "10. Real-World Industry Example", "code": "class User {\n    String username;\n    String role;\n\n    User() {\n        this(\"guest\", \"viewer\");\n    }\n\n    User(String username) {\n        this(username, \"viewer\");\n    }\n\n    User(String username, String role) {\n        this.username = username;\n        this.role = role;\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mb-2 font-bold\">Usage:</p>", "code": "User u1 = new User();\nUser u2 = new User(\"admin\");\nUser u3 = new User(\"john\", \"editor\");" },
                { "type": "section", "title": "11. Internal JVM View", "rich": "<p class=\"mb-2 font-bold text-slate-700\">When:</p><pre class=\"p-2 bg-slate-100 border rounded mb-4 text-sm font-mono inline-block\">new User(\"admin\");</pre><p class=\"mb-2 font-bold text-slate-700\">JVM:</p><ul class=\"list-none p-0 space-y-2 mb-4 text-slate-700 font-medium\"><li>Allocates object in Heap</li><li>Finds matching constructor</li><li>Executes constructor logic</li><li>Assigns values</li><li>Returns reference</li></ul>" },
                { "type": "section", "title": "12. Common Mistakes (Very Important)", "rich": WARNING("<ul class=\"list-none p-0 space-y-2 mb-0 text-sm font-medium\"><li>❌ Same parameter types</li><li>❌ Confusing with method overloading</li><li>❌ Thinking return type matters</li><li>❌ Not using this() → code duplication</li><li>❌ Wrong parameter order</li></ul>") },
                { "type": "section", "title": "13. Design Insights (Pro Level Thinking)", "rich": "<div class=\"p-5 bg-white border border-slate-200 rounded-xl shadow-sm mb-6 text-sm\"><p class=\"mb-3 font-bold text-slate-800\">\u2714\uFE0F Use Constructor Overloading when:</p><ul class=\"list-disc ml-6 space-y-1 mb-6 text-slate-600 font-medium\"><li>Object has optional fields</li><li>Multiple initialization scenarios exist</li><li>API needs flexibility</li></ul><p class=\"mb-3 font-bold text-rose-800\">\u26D4 Avoid:</p><ul class=\"list-disc ml-6 space-y-1 mb-0 text-slate-600 font-medium\"><li>Too many constructors (confusing)</li><li>Complex logic inside constructors</li></ul></div>" },
                { "type": "section", "title": "14. Mental Model (Simplified)", "rich": NOTE("<p class=\"mb-3 font-bold\">Think like:</p><p class=\"mb-4 text-indigo-700 font-bold bg-indigo-50 border border-indigo-100 p-3 rounded-lg flex items-center gap-2\">👉 Multiple Entry Gates to the Same Building</p><ul class=\"list-none p-0 space-y-3 mb-6 font-medium text-slate-700 bg-white p-4 rounded-xl border\"><li>Gate 1 → No data</li><li>Gate 2 → Partial data</li><li>Gate 3 → Full data</li></ul><p class=\"italic font-bold text-slate-800\">All lead to the same object, but initialized differently.</p>") },
                { "type": "section", "title": "15. Interview-Level Insights", "rich": "<div class=\"p-6 bg-slate-900 border border-slate-700 rounded-2xl shadow-xl mb-6 text-sm\"><ul class=\"list-disc ml-5 space-y-3 text-emerald-400 font-mono\"><li>Constructor Overloading = Compile-Time Polymorphism</li><li>Cannot overload only by return type</li><li>this() must be first statement</li><li>Constructors are NOT inherited</li></ul></div>" },
                { "type": "section", "title": "16. Why This Matters in Real Projects", "rich": "<ul class=\"list-none p-0 space-y-3 mb-6 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 p-5 rounded-xl\"><li>Used in DTOs, Models, Entities</li><li>Used in API design</li><li>Used in libraries (like ArrayList, HashMap)</li><li>Makes code flexible and clean</li></ul>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic uppercase text-[10px] font-black\">Test your signature matching skills.</p>" },
                { "type": "task", "value": "1. <strong>Instruction (MCQ):</strong> Given <code>class A { A(int x) {} A(double x) {} }</code>. What runs for <code>new A(10)</code>?<br/><strong>Match Output:</strong> <code>int constructor</code>", "hints": ["JVM prefers exact match over widening", "Wait, what does the example output say? Ah, match the exact console text if you were doing the snippet"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Create a class <code>Box</code> with two constructors: <code>Box()</code> prints \"Empty\" and <code>Box(int s)</code> prints \"Sized\". In <code>main</code>, create <code>new Box(10)</code>. <br/><strong>Match Output:</strong> <code>Sized</code>", "hints": ["Match the parameter type"], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Create a class <code>Test</code> with constructors <code>Test(int a, float b)</code> and <code>Test(float a, int b)</code>. Create <code>new Test(10.5f, 2)</code> and print \"FloatFirst\". <br/><strong>Match Output:</strong> <code>FloatFirst</code>", "hints": ["Check parameter order"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "int constructor", "matchCode": "new A\\(10\\)" },
                { "index": 2, "match": "Sized", "matchCode": "Box" },
                { "index": 3, "match": "FloatFirst", "matchCode": "Test" }
            ]
        },
        {
            title: 'Constructor Chaining',
            duration: '50 min',
            sections: [
                { "type": "section", "title": "1. Foundation Recap (Very Important)", "rich": "<p class=\"mb-4 font-bold uppercase underline font-black\">Constructor Overloading means:</p><ul class=\"list-none p-0 space-y-3 mb-4 font-medium text-slate-700 bg-slate-50 border border-slate-200 p-4 rounded-xl\"><li>👉 A class can have multiple constructors</li><li>👉 Each constructor has different parameters</li><li>👉 Java chooses the correct one at compile time</li></ul><p class=\"mt-4\">This enables: <strong>Flexible object creation</strong>, <strong>Cleaner APIs</strong>, and <strong>Real-world usability</strong>.</p>" },
                { "type": "section", "title": "2. Deep Dive: Constructor Chaining (this())", "rich": "<div class=\"p-4 bg-indigo-50 border border-indigo-100 rounded-xl mb-6\"><p class=\"text-indigo-900 font-black uppercase text-xs mb-2\">Definition:</p><p class=\"text-sm text-slate-700 font-medium\">Constructor Chaining is calling one constructor from another constructor within the same class using <code>this()</code>.</p></div><p class=\"font-black text-xs uppercase text-slate-500 mb-3\">Rules:</p><ul class=\"list-disc ml-5 space-y-2 mb-6 font-semibold text-sm text-slate-700\"><li><span class=\"px-2 py-1 bg-rose-50 border border-rose-200 rounded text-rose-700\">this()</span> must be the first statement</li><li>Only one <span class=\"px-2 py-1 bg-slate-100 border border-slate-200 rounded\">this()</span> call allowed per constructor</li><li>Used to avoid duplicate code</li></ul>" },
                { "type": "section", "title": "Example (Core Understanding)", "code": "class Student {\n    int id;\n    String name;\n\n    Student() {\n        this(0, \"Guest\");\n    }\n\n    Student(int id) {\n        this(id, \"Unknown\");\n    }\n\n    Student(int id, String name) {\n        this.id = id;\n        this.name = name;\n    }\n\n    void display() {\n        System.out.println(id + \" \" + name);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s1 = new Student();\n        Student s2 = new Student(101);\n        Student s3 = new Student(102, \"Alice\");\n\n        s1.display();\n        s2.display();\n        s3.display();\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black flex flex-col text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-indigo-500\"><span>0 Guest</span><span>101 Unknown</span><span>102 Alice</span></pre>" },
                { "type": "section", "title": "Execution Flow (Tracing)", "rich": "<p class=\"mb-3 font-bold text-sm text-slate-800\">For: <code class=\"bg-slate-100 p-1 border rounded\">Student s1 = new Student();</code></p><p class=\"mb-2 font-bold\">Flow:</p><ol class=\"list-decimal ml-5 space-y-2 mb-4 text-sm font-medium text-slate-700 bg-white p-4 rounded-xl border\"><li>Calls <code>Student()</code></li><li>Inside ➔ <code>this(0, \"Guest\")</code></li><li>Calls main constructor</li><li>Assigns values</li><li>Object initialized</li></ol><div class=\"mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl\"><p class=\"text-xs text-slate-800 font-black uppercase mb-2\">Why Constructor Chaining Matters:</p><ul class=\"list-disc ml-5 space-y-1 text-sm font-medium text-slate-600\"><li>Eliminates repetition</li><li>Centralizes logic</li><li>Improves maintainability</li></ul></div>" },
                { "type": "section", "title": "Visualizing the Chain Link", "rich": SVG_CHAINING_FLOW },
                { "type": "section", "title": "3. Constructor Chaining with super() (Inheritance)", "rich": "<div class=\"p-4 bg-sky-50 border border-sky-100 rounded-xl mb-6\"><p class=\"text-sky-900 font-black uppercase text-xs mb-2\">Definition:</p><p class=\"text-sm text-slate-700 font-medium\"><code>super()</code> is used to call parent class constructor.</p></div><p class=\"font-black text-xs uppercase text-slate-500 mb-3\">Rules:</p><ul class=\"list-disc ml-5 mb-6 text-sm space-y-2 font-semibold text-slate-700\"><li>Must be first statement.</li><li>If not written ➔ Java adds default <code>super()</code> automatically.</li><li>Used to initialize parent fields.</li></ul>" },
                { "type": "section", "title": "Example", "code": "class Person {\n    String name;\n\n    Person(String name) {\n        this.name = name;\n    }\n}\n\nclass Employee extends Person {\n    int id;\n\n    Employee(int id, String name) {\n        super(name);  // Call parent constructor\n        this.id = id;\n    }\n\n    void display() {\n        System.out.println(id + \" \" + name);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Employee e = new Employee(101, \"John\");\n        e.display();\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-xs uppercase tracking-widest text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-sky-300 rounded-lg font-mono text-sm border-l-4 border-sky-500\">101 John</pre>" },
                { "type": "section", "title": "Execution Flow", "rich": "<p class=\"mb-3 font-bold text-[11px] text-slate-800 uppercase tracking-widest px-2 py-1 bg-slate-100 rounded inline-block\">new Employee(101, \"John\")</p><ol class=\"list-decimal ml-5 space-y-2 mb-4 text-sm font-medium text-slate-700 bg-white p-4 rounded-xl border\"><li>Calls Employee constructor.</li><li><code>super(name)</code> ➔ calls Person constructor.</li><li>Parent initializes <code>name</code>.</li><li>Child initializes <code>id</code>.</li></ol>" },
                { "type": "section", "title": "4. Real Industry Example (Spring Boot Style)", "code": "// DTO / Service Pattern\nclass UserService {\n    String repo;\n\n    // Constructor Injection\n    UserService(String repo) {\n        this.repo = repo;\n    }\n\n    void process() {\n        System.out.println(\"Using repo: \" + repo);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        UserService service = new UserService(\"MySQL\");\n        service.process();\n    }\n}", "rich": "<div class=\"p-5 bg-slate-900 text-white rounded-xl my-4 text-sm shadow-xl\"><p class=\"text-blue-400 font-black uppercase text-xs mb-3 italic\">Why Used in Real Projects</p><ul class=\"list-disc ml-5 font-medium space-y-2 text-slate-300\"><li>Dependency Injection</li><li>Immutable design</li><li>Clean architecture</li></ul></div>" },
                { "type": "section", "title": "5. Constructor vs Setter Injection", "rich": "<div class=\"overflow-x-auto my-6 shadow-xl rounded-xl border border-slate-700\"><table class=\"w-full text-xs sm:text-sm border-collapse text-left\"><thead><tr class=\"bg-slate-900 text-slate-300 font-black uppercase tracking-wider\"><th class=\"p-3 border-r border-slate-700\">Aspect</th><th class=\"p-3 border-r border-slate-700 text-sky-400\">Constructor Injection ✅</th><th class=\"p-3 text-rose-400\">Setter Injection ❌</th></tr></thead><tbody class=\"bg-slate-800 text-slate-400 font-medium\"><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white whitespace-nowrap\">Initialization</td><td class=\"p-3 border-t border-r border-slate-700\">At object creation</td><td class=\"p-3 border-t border-slate-700\">After object creation</td></tr><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Safety</td><td class=\"p-3 border-t border-r border-slate-700\">Fully initialized</td><td class=\"p-3 border-t border-slate-700 text-rose-300\">Risk of incomplete object</td></tr><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Immutability</td><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Supports</td><td class=\"p-3 border-t border-slate-700\">Not guaranteed</td></tr><tr><td class=\"p-3 border-t border-r border-slate-700 font-bold text-white\">Preferred</td><td class=\"p-3 border-t border-r border-slate-700 font-bold text-emerald-400\">✅ Yes</td><td class=\"p-3 border-t border-slate-700\">❌ Less preferred</td></tr></tbody></table></div>" },
                { "type": "section", "title": "Example Comparison", "rich": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\"><div class=\"p-4 bg-slate-50 border border-slate-200 rounded-xl\"><p class=\"text-slate-800 font-bold text-xs mb-3 font-black uppercase tracking-widest text-emerald-700\">Constructor Injection</p><pre class=\"text-xs font-mono leading-relaxed bg-white p-3 border rounded-lg shadow-sm\">class Car {\n  String engine;\n  Car(String engine) {\n    this.engine = engine;\n  }\n}</pre></div><div class=\"p-4 bg-slate-50 border border-slate-200 rounded-xl\"><p class=\"text-slate-800 font-bold text-xs mb-3 font-black uppercase tracking-widest text-rose-700\">Setter Injection</p><pre class=\"text-xs font-mono leading-relaxed bg-white p-3 border rounded-lg shadow-sm\">class Car {\n  String engine;\n  void setEngine(String engine) {\n    this.engine = engine;\n  }\n}</pre></div></div>" },
                { "type": "section", "title": "6. Advanced Concepts (Important)", "rich": "<div class=\"space-y-4\"><div class=\"p-4 border border-slate-200 bg-white rounded-xl shadow-sm\"><h4 class=\"font-black text-sm text-rose-600 mb-3 uppercase tracking-tight\">6.1 Ambiguity Problem</h4><pre class=\"text-xs block bg-slate-50 p-3 rounded border text-slate-700 font-mono\">class Test {\n  Test(int a, double b) {}\n  Test(double a, int b) {}\n}\n// new Test(10, 20); ❌ Confusing</pre></div><div class=\"p-4 border border-slate-200 bg-white rounded-xl shadow-sm\"><h4 class=\"font-black text-sm text-sky-600 mb-3 uppercase tracking-tight\">6.2 Autoboxing Case</h4><pre class=\"text-xs block bg-slate-50 p-3 rounded border text-slate-700 font-mono\">class Demo {\n  Demo(int a) { System.out.println(\"int\"); }\n  Demo(Integer a) { System.out.println(\"Integer\"); }\n}\nnew Demo(10); // prefers int</pre></div><div class=\"p-4 border border-slate-200 bg-white rounded-xl shadow-sm overflow-x-auto\"><h4 class=\"font-black text-sm text-indigo-600 mb-3 uppercase tracking-tight\">6.3 Overloading vs Overriding</h4><table class=\"w-full text-xs text-left border-collapse\"><tr class=\"bg-slate-100 font-bold text-slate-800 border-b-2\"><th class=\"p-2\">Feature</th><th class=\"p-2\">Overloading</th><th class=\"p-2\">Overriding</th></tr><tr class=\"border-b\"><td class=\"p-2 font-semibold text-slate-700\">Time</td><td class=\"p-2\">Compile-time</td><td class=\"p-2\">Runtime</td></tr><tr class=\"border-b\"><td class=\"p-2 font-semibold text-slate-700\">Inheritance</td><td class=\"p-2\">Not required</td><td class=\"p-2\">Required</td></tr><tr><td class=\"p-2 font-semibold text-slate-700\">Constructors</td><td class=\"p-2 text-emerald-600 font-bold bg-emerald-50 rounded\">✔ Supported</td><td class=\"p-2 text-rose-600 font-bold bg-rose-50 rounded\">❌ Not possible</td></tr></table></div></div>" },
                { "type": "section", "title": "7. Common Mistakes (Critical Section)", "rich": WARNING("<ul class=\"list-none p-0 space-y-2 mb-0 text-sm font-medium\"><li>❌ <strong>Same parameter types</strong></li><li>❌ <strong>Not using this()</strong></li><li>❌ <strong>Wrong parameter order</strong></li><li>❌ <strong>Expecting runtime decision</strong></li><li>❌ <strong>Forgetting super()</strong> in inheritance</li></ul>") },
                { "type": "section", "title": "8. Interview Questions (Must Know)", "rich": "<div class=\"p-5 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl\"><ul class=\"space-y-4\"><li class=\"flex flex-col mb-2\"><span class=\"text-blue-400 text-[11px] uppercase font-bold italic tracking-wider mb-1\">Q1: Can constructors be overloaded?</span><span class=\"text-emerald-400 text-sm font-black\">👉 Yes</span></li><li class=\"flex flex-col mb-2\"><span class=\"text-blue-400 text-[11px] uppercase font-bold italic tracking-wider mb-1\">Q2: Can constructors be overridden?</span><span class=\"text-rose-400 text-sm font-black\">👉 No</span></li><li class=\"flex flex-col mb-2\"><span class=\"text-blue-400 text-[11px] uppercase font-bold italic tracking-wider mb-1\">Q3: Can constructor call another constructor?</span><span class=\"text-sky-300 text-sm font-black\">👉 Yes using this()</span></li><li class=\"flex flex-col\"><span class=\"text-blue-400 text-[11px] uppercase font-bold italic tracking-wider mb-1\">Q4: Can constructor be private?</span><span class=\"text-sky-300 text-sm font-black\">👉 Yes (Singleton pattern)</span></li></ul></div>" },
                { "type": "section", "title": "9. MCQs (Practice)", "rich": "<ul class=\"space-y-4 mb-6\"><li class=\"p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm italic font-bold tracking-tight\"><p class=\"mb-3 text-slate-600 font-mono bg-white p-2 border rounded shadow-sm\">class A {<br/>&nbsp;&nbsp;A() { System.out.println(\"A\"); }<br/>&nbsp;&nbsp;A(int x) { System.out.println(\"B\"); }<br/>}<br/>new A(10);</p><p class=\"text-indigo-600 font-black flex items-center gap-2\"><span>👉 Output:</span> <span class=\"px-2 py-1 bg-indigo-100 rounded\">B</span></p></li><li class=\"p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm italic font-bold tracking-tight\"><p class=\"mb-3 text-slate-600 font-mono bg-white p-2 border rounded shadow-sm\">class A {<br/>&nbsp;&nbsp;A(int x) {}<br/>&nbsp;&nbsp;A(double x) {}<br/>}<br/>new A(10);</p><p class=\"text-indigo-600 font-black flex items-center gap-2\"><span>👉 Output:</span> <span class=\"px-2 py-1 bg-indigo-100 rounded\">int constructor</span></p></li><li class=\"p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm italic font-bold tracking-tight\"><p class=\"mb-3 text-slate-600 font-mono bg-white p-2 border rounded shadow-sm\">class A {<br/>&nbsp;&nbsp;A() { this(10); }<br/>&nbsp;&nbsp;A(int x) { System.out.println(x); }<br/>}<br/>new A();</p><p class=\"text-indigo-600 font-black flex items-center gap-2\"><span>👉 Output:</span> <span class=\"px-2 py-1 bg-indigo-100 rounded\">10</span></p></li></ul>" },
                { "type": "section", "title": "10. Real Design Insight", "rich": NOTE("<p class=\"mb-2\"><strong>Use Constructor Overloading when:</strong></p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Multiple ways to create object exist</li><li>Some fields are optional</li><li>Object must be valid at creation</li></ul><p class=\"mb-2\"><strong>Avoid when:</strong></p><ul class=\"list-disc ml-5 space-y-1\"><li>Too many constructors (use Builder Pattern instead)</li></ul>") },
                { "type": "section", "title": "11. Final Mental Model", "rich": "<div class=\"p-5 bg-indigo-50 border border-indigo-100 rounded-xl my-4 text-indigo-900\"><p class=\"font-black text-sm uppercase mb-3\">Think like:</p><p class=\"text-sm font-bold bg-white inline-block p-2 rounded shadow-sm mb-4\">👉 Different ways to enter the same system</p><ul class=\"mt-2 space-y-2 text-sm font-medium\"><li>🚪 <strong>No data</strong> → Default setup</li><li>🚪 <strong>Partial</strong> → Semi setup</li><li>🚪 <strong>Full</strong> → Complete setup</li></ul><p class=\"mt-4 text-xs font-bold uppercase tracking-widest text-indigo-700 bg-indigo-100 inline-block p-2 rounded\">All lead to the same object, but initialized differently.</p></div>" },
                { "type": "section", "title": "12. What You’ve Mastered Now", "rich": "<div class=\"grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6 font-bold uppercase tracking-tight italic text-slate-600 bg-slate-50 p-4 border rounded-xl\"><p class=\"text-[11px] flex items-center gap-2\"><span class=\"text-emerald-500\">✔</span> Constructor Overloading</p><p class=\"text-[11px] flex items-center gap-2\"><span class=\"text-emerald-500\">✔</span> Constructor Chaining (this)</p><p class=\"text-[11px] flex items-center gap-2\"><span class=\"text-emerald-500\">✔</span> Inheritance Chaining (super)</p><p class=\"text-[11px] flex items-center gap-2\"><span class=\"text-emerald-500\">✔</span> Real-world usage</p><p class=\"text-[11px] flex items-center gap-2\"><span class=\"text-emerald-500\">✔</span> JVM behavior</p><p class=\"text-[11px] flex items-center gap-2\"><span class=\"text-emerald-500\">✔</span> Interview questions</p><p class=\"text-[11px] flex items-center gap-2\"><span class=\"text-emerald-500\">✔</span> Edge cases</p></div>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic uppercase text-[10px] font-black\">Chain the logic for efficient initialization.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Create a class <code>Test</code> with <code>Test()</code> that calls <code>this(10)</code>. <code>Test(int x)</code> should print the value of <code>x</code>. In <code>main</code>, create <code>new Test()</code>. <br/><strong>Match Output:</strong> <code>10</code>", "hints": ["this(10); must be first line", "Test(int x) { System.out.println(x); }"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Create a class <code>Car</code> with <code>Car(String b)</code> that calls <code>this(b, 0)</code>. <code>Car(String b, int s)</code> calls <code>System.out.println(b + s)</code>. Match output for <code>new Car(\"Audi\")</code>. <br/><strong>Match Output:</strong> <code>Audi0</code>", "hints": ["this(b, 0);"], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Create a class <code>A</code> with <code>A() { this(10.5); } A(double x) { System.out.println(\"chained\"); }</code>. Create <code>new A()</code>. <br/><strong>Match Output:</strong> <code>chained</code>", "hints": ["this() delegates to the matching constructor"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "10", "matchCode": "this\\(10\\)" },
                { "index": 2, "match": "Audi0", "matchCode": "this\\(b, 0\\)" },
                { "index": 3, "match": "chained", "matchCode": "this\\(" }
            ]
        }

    ],
}).catch(console.error);
