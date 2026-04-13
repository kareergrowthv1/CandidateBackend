const { seedModule } = require('./_helpers');
const NOTE = (text) => `<div class="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 my-4 text-sm font-medium shadow-sm leading-relaxed">${text}</div>`;
const WARNING = (text) => `<div class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 my-4 text-sm font-medium shadow-sm leading-relaxed">${text}</div>`;
const TABLE = (html) => `<div class="overflow-x-auto my-6 border border-slate-200 rounded-xl shadow-sm bg-white"><table class="w-full text-left border-collapse text-sm">${html}</table></div>`;

const SVG_STRING_POOL = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1">
<svg width="100%" height="auto" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
  <rect width="600" height="400" rx="12" fill="#0F172A"/>
  <rect width="600" height="40" rx="12 12 0 0" fill="#1E293B"/>
  <circle cx="20" cy="20" r="5" fill="#EF4444"/><circle cx="40" cy="20" r="5" fill="#F59E0B"/><circle cx="60" cy="20" r="5" fill="#10B981"/>
  <text x="80" y="25" fill="#94A3B8" font-family="monospace" font-size="12">jvm_heap_string_pool.sh</text>
  
  <!-- Heap Memory -->
  <rect x="40" y="60" width="520" height="300" rx="16" fill="#1E293B" fill-opacity="0.3" stroke="#334155"/>
  <text x="55" y="85" fill="#94A3B8" font-family="sans-serif" font-weight="bold" font-size="14">JVM Heap Memory</text>

  <!-- String Pool -->
  <rect x="280" y="100" width="240" height="220" rx="20" fill="#065F46" fill-opacity="0.1" stroke="#10B981" stroke-dasharray="4 4"/>
  <text x="340" y="130" fill="#10B981" font-family="sans-serif" font-weight="bold" font-size="14">String Pool</text>

  <!-- String Objects -->
  <rect x="330" y="160" width="140" height="40" rx="8" fill="#10B981" fill-opacity="0.2" stroke="#10B981"/>
  <text x="350" y="185" fill="#D1FAE5" font-family="monospace" font-size="12">"Hello"</text>
  
  <rect x="330" y="220" width="140" height="40" rx="8" fill="#10B981" fill-opacity="0.2" stroke="#10B981"/>
  <text x="350" y="245" fill="#D1FAE5" font-family="monospace" font-size="12">"Java"</text>

  <!-- Stack References -->
  <rect x="60" y="140" width="120" height="40" rx="8" fill="#1E3A8A" fill-opacity="0.2" stroke="#3B82F6"/>
  <text x="75" y="165" fill="#93C5FD" font-family="monospace" font-size="12">s1 (Stack)</text>

  <rect x="60" y="220" width="120" height="40" rx="8" fill="#1E3A8A" fill-opacity="0.2" stroke="#3B82F6"/>
  <text x="75" y="245" fill="#93C5FD" font-family="monospace" font-size="12">s2 (Stack)</text>

  <!-- Arrows -->
  <path d="M180 160 L 320 175" stroke="#3B82F6" stroke-width="2" marker-end="url(#arrow-blue)"/>
  <path d="M180 240 L 320 185" stroke="#3B82F6" stroke-width="2" marker-end="url(#arrow-blue)"/>
  
  <text x="60" y="300" fill="#F59E0B" font-family="sans-serif" font-size="10" font-style="italic">Both s1 and s2 point to same "Hello" object</text>

  <defs>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3B82F6"/></marker>
  </defs>
</svg>
<p class="px-4 py-2 text-center text-[10px] text-slate-500 font-mono italic">String Pool: Memory optimization by reusing literal objects.</p>
</div>
`;

const SVG_STRING_IMMUTABILITY = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1">
<svg width="100%" height="auto" viewBox="0 0 600 380" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
  <rect width="600" height="380" rx="12" fill="#0F172A"/>
  <rect width="600" height="40" rx="12 12 0 0" fill="#1E293B"/>
  <circle cx="20" cy="20" r="5" fill="#EF4444"/><circle cx="40" cy="20" r="5" fill="#F59E0B"/><circle cx="60" cy="20" r="5" fill="#10B981"/>
  <text x="80" y="25" fill="#94A3B8" font-family="monospace" font-size="12">immutability_flow.sh</text>
  
  <!-- Step 1 -->
  <text x="40" y="80" fill="#A78BFA" font-family="monospace" font-size="12" font-weight="bold">1. String s = "Java";</text>
  <rect x="380" y="60" width="120" height="40" rx="8" fill="#5B21B6" fill-opacity="0.2" stroke="#A78BFA"/>
  <text x="405" y="85" fill="#DDD6FE" font-family="monospace" font-size="12">"Java"</text>
  
  <!-- Step 2 -->
  <text x="40" y="240" fill="#F59E0B" font-family="monospace" font-size="12" font-weight="bold">2. s = s.concat("Script");</text>
  <rect x="380" y="220" width="160" height="40" rx="8" fill="#7C2D12" fill-opacity="0.2" stroke="#F59E0B"/>
  <text x="405" y="245" fill="#FFEDD5" font-family="monospace" font-size="12">"JavaScript"</text>

  <!-- Variable Box (s) - SHIFTED TO AVOID OVERLAP -->
  <rect x="180" y="130" width="80" height="60" rx="8" fill="#1E3A8A" fill-opacity="0.2" stroke="#3B82F6" stroke-width="2"/>
  <text x="220" y="165" fill="#93C5FD" font-family="monospace" font-size="18" text-anchor="middle" font-weight="bold">s</text>

  <!-- Arcs for flow -->
  <path d="M260 145 Q 320 120 375 90" stroke="#EF4444" stroke-width="2" stroke-dasharray="4 4" marker-end="url(#arrow-red)"/>
  <path d="M260 175 Q 320 200 375 235" stroke="#10B981" stroke-width="2" marker-end="url(#arrow-green)"/>
  
  <text x="40" y="320" fill="#94A3B8" font-family="sans-serif" font-size="11" font-style="italic">The "Java" object is NOT modified. It stays in memory.<br/>A NEW "JavaScript" object is created and 's' points to it.</text>

  <defs>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#EF4444"/></marker>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981"/></marker>
  </defs>
</svg>
<p class="px-4 py-2 text-center text-[10px] text-slate-500 font-mono italic">Immutability: Re-assignment changes the pointer, NOT the object.</p>
</div>
`;

const SVG_STRING_METHODS_FLOW = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1">
<svg width="100%" height="auto" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
  <rect width="600" height="300" rx="12" fill="#0F172A"/>
  <rect width="600" height="40" rx="12 12 0 0" fill="#1E293B"/>
  <circle cx="20" cy="20" r="5" fill="#EF4444"/><circle cx="40" cy="20" r="5" fill="#F59E0B"/><circle cx="60" cy="20" r="5" fill="#10B981"/>
  <text x="80" y="25" fill="#94A3B8" font-family="monospace" font-size="12">string_method_pipe.sh</text>

  <!-- Input -->
  <rect x="40" y="120" width="120" height="40" rx="8" fill="#1E3A8A" fill-opacity="0.2" stroke="#3B82F6"/>
  <text x="100" y="145" fill="#93C5FD" font-family="monospace" font-size="14" text-anchor="middle">"java"</text>
  
  <!-- Method Box -->
  <rect x="230" y="100" width="140" height="80" rx="12" fill="#5B21B6" fill-opacity="0.2" stroke="#A78BFA" stroke-width="2"/>
  <text x="300" y="140" fill="#DDD6FE" font-family="monospace" font-size="14" text-anchor="middle" font-weight="bold">toUpperCase()</text>
  <text x="300" y="160" fill="#A78BFA" font-family="sans-serif" font-size="10" text-anchor="middle">Method Tool</text>

  <!-- Output -->
  <rect x="440" y="120" width="120" height="40" rx="8" fill="#065F46" fill-opacity="0.2" stroke="#10B981"/>
  <text x="500" y="145" fill="#D1FAE5" font-family="monospace" font-size="14" text-anchor="middle">"JAVA"</text>

  <!-- Flow Arrows -->
  <path d="M165 140 L 225 140" stroke="#3B82F6" stroke-width="2" marker-end="url(#arrow-blue)"/>
  <path d="M375 140 L 435 140" stroke="#10B981" stroke-width="2" marker-end="url(#arrow-green)"/>

  <text x="300" y="260" fill="#94A3B8" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle">Methods act as "Pure Functions" that return NEW strings.</text>

  <defs>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3B82F6"/></marker>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981"/></marker>
  </defs>
</svg>
</div>
`;

const SVG_STRING_COMPARISON = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1">
<svg width="100%" height="auto" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
  <rect width="600" height="400" rx="12" fill="#0F172A"/>
  <rect width="600" height="40" rx="12 12 0 0" fill="#1E293B"/>
  <circle cx="20" cy="20" r="5" fill="#EF4444"/><circle cx="40" cy="20" r="5" fill="#F59E0B"/><circle cx="60" cy="20" r="5" fill="#10B981"/>
  <text x="80" y="25" fill="#94A3B8" font-family="monospace" font-size="12">comparison_memory.sh</text>

  <!-- Stack -->
  <rect x="40" y="80" width="140" height="260" rx="16" fill="#1E3A8A" fill-opacity="0.1" stroke="#3B82F6"/>
  <text x="110" y="105" fill="#93C5FD" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">Stack (Refs)</text>
  
  <rect x="60" y="120" width="100" height="35" rx="8" fill="#1E3A8A" fill-opacity="0.3" stroke="#3B82F6"/>
  <text x="110" y="142" fill="#93C5FD" font-family="monospace" font-size="12" text-anchor="middle">s1</text>

  <rect x="60" y="170" width="100" height="35" rx="8" fill="#1E3A8A" fill-opacity="0.3" stroke="#3B82F6"/>
  <text x="110" y="192" fill="#93C5FD" font-family="monospace" font-size="12" text-anchor="middle">s2</text>

  <rect x="60" y="270" width="100" height="35" rx="8" fill="#1E3A8A" fill-opacity="0.3" stroke="#3B82F6"/>
  <text x="110" y="292" fill="#93C5FD" font-family="monospace" font-size="12" text-anchor="middle">s3</text>

  <!-- Heap & Pool -->
  <rect x="250" y="80" width="310" height="260" rx="16" fill="#065F46" fill-opacity="0.1" stroke="#10B981"/>
  <text x="405" y="105" fill="#10B981" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">Heap (Objects)</text>

  <!-- String Pool -->
  <rect x="300" y="130" width="200" height="80" rx="12" fill="#065F46" fill-opacity="0.2" stroke="#10B981" stroke-dasharray="4 4"/>
  <text x="400" y="150" fill="#10B981" font-family="sans-serif" font-size="10" text-anchor="middle">String Pool</text>
  <rect x="340" y="160" width="120" height="30" rx="6" fill="#10B981" fill-opacity="0.3" stroke="#10B981"/>
  <text x="400" y="180" fill="#D1FAE5" font-family="monospace" font-size="12" text-anchor="middle">"Java"</text>

  <!-- Heap Object -->
  <rect x="340" y="270" width="120" height="35" rx="8" fill="#5B21B6" fill-opacity="0.2" stroke="#A78BFA"/>
  <text x="400" y="292" fill="#DDD6FE" font-family="monospace" font-size="12" text-anchor="middle">"Java"</text>

  <!-- Comparison Lines -->
  <!-- s1, s2 to Pool -->
  <path d="M160 137 L 340 175" stroke="#3B82F6" stroke-width="2" marker-end="url(#arrow-blue)"/>
  <path d="M160 187 L 340 175" stroke="#3B82F6" stroke-width="2" marker-end="url(#arrow-blue)"/>
  
  <!-- s3 to Heap -->
  <path d="M160 287 L 340 287" stroke="#A78BFA" stroke-width="2" marker-end="url(#arrow-purple)"/>

  <!-- logic labels -->
  <text x="210" y="150" fill="#10B981" font-family="monospace" font-size="10" text-anchor="middle">s1 == s2 (true)</text>
  <text x="210" y="270" fill="#EF4444" font-family="monospace" font-size="10" text-anchor="middle">s1 == s3 (false)</text>
  <text x="300" y="370" fill="#D1FAE5" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle">.equals() checks text content, so s1.equals(s3) is always true.</text>

  <defs>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3B82F6"/></marker>
    <marker id="arrow-purple" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#A78BFA"/></marker>
  </defs>
</svg>
</div>
`;

const SVG_STRING_CONCAT = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1">
<svg width="100%" height="auto" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
  <rect width="600" height="300" rx="12" fill="#0F172A"/>
  <rect width="600" height="40" rx="12 12 0 0" fill="#1E293B"/>
  <circle cx="20" cy="20" r="5" fill="#EF4444"/><circle cx="40" cy="20" r="5" fill="#F59E0B"/><circle cx="60" cy="20" r="5" fill="#10B981"/>
  <text x="80" y="25" fill="#94A3B8" font-family="monospace" font-size="12">string_builder_optimization.sh</text>

  <!-- Fragments -->
  <rect x="40" y="80" width="80" height="35" rx="8" fill="#1E3A8A" fill-opacity="0.2" stroke="#3B82F6"/>
  <text x="80" y="102" fill="#93C5FD" font-family="monospace" font-size="12" text-anchor="middle">"Hello"</text>

  <rect x="40" y="130" width="80" height="35" rx="8" fill="#1E3A8A" fill-opacity="0.2" stroke="#3B82F6"/>
  <text x="80" y="152" fill="#93C5FD" font-family="monospace" font-size="12" text-anchor="middle">" "</text>

  <rect x="40" y="180" width="80" height="35" rx="8" fill="#1E3A8A" fill-opacity="0.2" stroke="#3B82F6"/>
  <text x="80" y="202" fill="#93C5FD" font-family="monospace" font-size="12" text-anchor="middle">"World"</text>

  <!-- StringBuilder Pipe -->
  <rect x="220" y="100" width="160" height="100" rx="16" fill="#5B21B6" fill-opacity="0.2" stroke="#A78BFA" stroke-width="2"/>
  <text x="300" y="145" fill="#DDD6FE" font-family="monospace" font-size="14" text-anchor="middle" font-weight="bold">StringBuilder</text>
  <text x="300" y="165" fill="#A78BFA" font-family="sans-serif" font-size="10" text-anchor="middle">append() pipe</text>

  <!-- Final Object -->
  <rect x="440" y="130" width="120" height="40" rx="8" fill="#065F46" fill-opacity="0.2" stroke="#10B981"/>
  <text x="500" y="155" fill="#D1FAE5" font-family="monospace" font-size="14" text-anchor="middle">"Hello World"</text>

  <!-- Connectors -->
  <path d="M125 100 Q 180 120 215 135" stroke="#3B82F6" stroke-width="2" marker-end="url(#arrow-blue)"/>
  <path d="M125 147 L 215 147" stroke="#3B82F6" stroke-width="2" marker-end="url(#arrow-blue)"/>
  <path d="M125 195 Q 180 175 215 160" stroke="#3B82F6" stroke-width="2" marker-end="url(#arrow-blue)"/>
  
  <path d="M385 150 L 435 150" stroke="#10B981" stroke-width="2" marker-end="url(#arrow-green)"/>

  <text x="300" y="260" fill="#94A3B8" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle">Internally, "+" uses StringBuilder to avoid creating multiple temporary objects.</text>

  <defs>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3B82F6"/></marker>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981"/></marker>
  </defs>
</svg>
</div>
`;

const SVG_STRING_IMMUTABILITY_ADV = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-[#0F172A] p-1">
<svg width="100%" height="auto" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
  <rect width="600" height="400" rx="12" fill="#0F172A"/>
  <rect width="600" height="40" rx="12 12 0 0" fill="#1E293B"/>
  <circle cx="20" cy="20" r="5" fill="#EF4444"/><circle cx="40" cy="20" r="5" fill="#F59E0B"/><circle cx="60" cy="20" r="5" fill="#10B981"/>
  <text x="80" y="25" fill="#94A3B8" font-family="monospace" font-size="12">immutability_proof.sh</text>

  <!-- Stack -->
  <rect x="40" y="80" width="140" height="260" rx="16" fill="#1E3A8A" fill-opacity="0.1" stroke="#3B82F6"/>
  <text x="110" y="105" fill="#93C5FD" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">Stack (Refs)</text>
  
  <rect x="60" y="130" width="100" height="40" rx="8" fill="#1E3A8A" fill-opacity="0.3" stroke="#3B82F6"/>
  <text x="110" y="155" fill="#93C5FD" font-family="monospace" font-size="12" text-anchor="middle">s1</text>

  <rect x="60" y="230" width="100" height="40" rx="8" fill="#1E3A8A" fill-opacity="0.3" stroke="#3B82F6"/>
  <text x="110" y="255" fill="#93C5FD" font-family="monospace" font-size="12" text-anchor="middle">s2</text>

  <!-- String Pool -->
  <rect x="300" y="80" width="260" height="260" rx="16" fill="#065F46" fill-opacity="0.1" stroke="#10B981"/>
  <text x="430" y="105" fill="#10B981" font-family="sans-serif" font-weight="bold" font-size="12" text-anchor="middle">String Pool</text>

  <!-- Old Object -->
  <rect x="350" y="130" width="160" height="40" rx="8" fill="#10B981" fill-opacity="0.2" stroke="#10B981"/>
  <text x="430" y="155" fill="#D1FAE5" font-family="monospace" font-size="14" text-anchor="middle">"Java"</text>
  <text x="430" y="125" fill="#94A3B8" font-family="sans-serif" font-size="10" text-anchor="middle">Original Object</text>

  <!-- New Object -->
  <rect x="350" y="230" width="160" height="40" rx="8" fill="#5B21B6" fill-opacity="0.2" stroke="#A78BFA"/>
  <text x="430" y="255" fill="#DDD6FE" font-family="monospace" font-size="14" text-anchor="middle">"Java Dev"</text>
  <text x="430" y="225" fill="#94A3B8" font-family="sans-serif" font-size="10" text-anchor="middle">New Object Created</text>

  <!-- Connection Logic -->
  <!-- s2 points to original -->
  <path d="M160 250 L 350 150" stroke="#10B981" stroke-width="2" marker-end="url(#arrow-green)"/>
  
  <!-- s1 points to new -->
  <path d="M160 150 L 350 250" stroke="#A78BFA" stroke-width="2" marker-end="url(#arrow-purple)"/>

  <text x="300" y="360" fill="#94A3B8" font-family="sans-serif" font-size="11" font-style="italic" text-anchor="middle">Updating s1 does not affect s2 because the original object is Frozen (Immutable).</text>

  <defs>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981"/></marker>
    <marker id="arrow-purple" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#A78BFA"/></marker>
  </defs>
</svg>
</div>
`;

seedModule({
    moduleTitle: 'String Functions',
    moduleOrder: 12,
    description: 'String API, compare, concat, immutability.',
    label: 'STRINGS',
    lessons: [
        {
            title: 'Introduction to String',
            duration: '35 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\">A <strong>String</strong> in Java is a sequence of characters used to store and manipulate text such as names, messages, or data.</p><p class=\"mb-4\">In Java, a String is <strong>not a primitive data type</strong> — it is an <strong>object</strong> of the <code>String</code> class.</p>" },
                { "type": "section", "title": "2. Concept Explanation", "rich": "<p class=\"mb-4\">Unlike primitive types like <code>int</code> or <code>boolean</code>, a String:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>Stores textual data</li><li>Is <strong>immutable</strong> (cannot be changed after creation)</li><li>Is handled differently by the JVM for performance optimization</li></ul>" },
                { "type": "section", "title": "Example", "code": "String name = \"Sharan\";", "rich": "<ul class=\"list-disc ml-5 space-y-1 mt-4\"><li><code>\"Sharan\"</code> is a String literal</li><li><code>name</code> is a reference variable</li><li>The actual object is stored in memory</li></ul>" },
                { "type": "section", "title": "3. Why Strings are Special in Java", "rich": "<p class=\"mb-4\">Strings are one of the most used data types, so Java provides:</p><ul class=\"grid grid-cols-1 md:grid-cols-3 gap-3 mb-6\"><li class=\"p-3 rounded-lg bg-blue-50 border border-blue-100 text-sm\">⚡ Built-in optimizations</li><li class=\"p-3 rounded-lg bg-emerald-50 border border-emerald-100 text-sm\">🧠 Memory management (String Pool)</li><li class=\"p-3 rounded-lg bg-amber-50 border border-amber-100 text-sm\">🔒 Security benefits (immutability)</li></ul>" },
                { "type": "section", "title": "4. String is an Object (Important Concept)", "code": "String s1 = \"Hello\";", "rich": "<p class=\"mt-4 mb-2\">Even though it looks simple:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li><code>s1</code> → reference variable</li><li><code>\"Hello\"</code> → object in memory</li></ul><p class=\"mb-2 font-semibold\">Internally it acts like:</p><code class=\"block p-3 bg-slate-100 rounded-lg\">String s1 = new String(\"Hello\");</code>" },
                { "type": "section", "title": "5. Ways to Create Strings", "rich": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6\"><div class=\"p-4 border rounded-xl bg-slate-50\"><p class=\"font-bold mb-2\">5.1 Using String Literal</p><code class=\"block p-2 bg-white border border-slate-200 rounded mb-2\">String s1 = \"Java\";</code><ul class=\"text-xs space-y-1 text-slate-600\"><li>Stored in String Pool</li><li>Memory efficient</li></ul></div><div class=\"p-4 border rounded-xl bg-slate-50\"><p class=\"font-bold mb-2\">5.2 Using new Keyword</p><code class=\"block p-2 bg-white border border-slate-200 rounded mb-2\">String s2 = new String(\"Java\");</code><ul class=\"text-xs space-y-1 text-slate-600\"><li>Stored in Heap memory</li><li>Always creates a new object</li></ul></div></div>" },
                { "type": "section", "title": "6. Memory Concept (Very Important)", "rich": "<p class=\"mb-4\"><strong>String Pool (Special Area in Heap):</strong> Java stores string literals in a String Pool to avoid duplicate objects.</p>" },
                { "type": "section", "title": "Visualizing the String Pool", "rich": SVG_STRING_POOL },
                { "type": "section", "title": "Example Case", "code": "String a = \"Hello\";\nString b = \"Hello\";", "rich": "<p class=\"mt-4 mb-2\"><strong>What happens?</strong></p><ul class=\"list-disc ml-5 space-y-1\"><li>Only <strong>one object</strong> created in the pool.</li><li>Both <code>a</code> and <code>b</code> point to same object.</li></ul>" },
                { "type": "section", "title": "Using new Keyword", "code": "String a = new String(\"Hello\");\nString b = new String(\"Hello\");", "rich": "<ul class=\"list-disc ml-5 space-y-1 mt-4\"><li>Creates <strong>two separate objects</strong> in Heap.</li><li>Even if values are same, memory locations are different.</li></ul>" },
                { "type": "section", "title": "7. Immutability (Core Concept)", "rich": "<p class=\"mb-4\">Once a String is created, it <strong>cannot be changed</strong>. If you try to modify it, a <strong>new object</strong> is created.</p>" },
                { "type": "section", "title": "Visualizing Immutability", "rich": SVG_STRING_IMMUTABILITY },
                { "type": "section", "title": "Execution Example", "code": "String s = \"Java\";\ns = \"Python\";", "rich": "<p class=\"mt-4 mb-2\"><strong>What happens?</strong></p><ul class=\"list-disc ml-5 space-y-1\"><li><code>\"Java\"</code> remains unchanged.</li><li>New object <code>\"Python\"</code> created.</li><li><code>s</code> now points to new object.</li></ul>" },
                { "type": "section", "title": "8. Why Immutability is Important", "rich": "<ul class=\"space-y-4 mb-6\"><li><span class=\"text-blue-600 font-bold tracking-tight uppercase text-xs border-l-2 border-blue-600 pl-2\">🛡️ Security</span><p class=\"text-sm text-slate-600\">Used safely in passwords, network connections, and file paths.</p></li><li><span class=\"text-emerald-600 font-bold tracking-tight uppercase text-xs border-l-2 border-emerald-600 pl-2\">🧵 Thread Safety</span><p class=\"text-sm text-slate-600\">Safe for multiple threads to access simultaneously.</p></li><li><span class=\"text-amber-600 font-bold tracking-tight uppercase text-xs border-l-2 border-amber-600 pl-2\">🧠 Memory Optimization</span><p class=\"text-sm text-slate-600\">Enables the existence of the String Pool.</p></li></ul>" },
                { "type": "section", "title": "9. String vs Primitive Types", "rich": TABLE(`<thead><tr class=\"bg-slate-100\"><th class=\"px-4 py-3 border-r font-bold\">Feature</th><th class=\"px-4 py-3 border-r font-bold\">Primitive</th><th class=\"px-4 py-3 font-bold\">String</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-3 border-r\">Type</td><td class=\"px-4 py-3 border-r\">Basic</td><td class=\"px-4 py-3 font-semibold text-blue-600\">Object</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r\">Memory</td><td class=\"px-4 py-3 border-r\">Stack</td><td class=\"px-4 py-3 text-emerald-600\">Heap</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r\">Mutability</td><td class=\"px-4 py-3 border-r\">Mutable</td><td class=\"px-4 py-3 text-red-600\">Immutable</td></tr><tr><td class=\"px-4 py-3 border-r\">Example</td><td class=\"px-4 py-3 border-r font-mono\">int x = 10</td><td class=\"px-4 py-3 font-mono\">String s = \"Hi\"</td></tr></tbody>`) },
                { "type": "section", "title": "10. Basic Example", "code": "public class Main {\n    public static void main(String[] args) {\n        String s1 = \"Hello\";\n        String s2 = \"Hello\";\n        String s3 = new String(\"Hello\");\n\n        System.out.println(s1);\n        System.out.println(s2);\n        System.out.println(s3);\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-6 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">OUTPUT:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl\">Hello\nHello\nHello</pre>" },
                { "type": "section", "title": "11. Internal Working (Step-by-Step)", "rich": "<p class=\"mb-2\">For <code>String s1 = \"Hello\";</code></p><ol class=\"list-decimal ml-5 space-y-1 mb-4\"><li>JVM checks String Pool</li><li>If \"Hello\" exists → reuse</li><li>Else → create new object</li><li>Store reference in s1</li></ol>" },
                { "type": "section", "title": "12. Reference Behavior", "code": "String a = \"Java\";\nString b = a;\nb = \"Python\";", "rich": "<p class=\"mt-4 mb-2\"><strong>What happens?</strong></p><ul class=\"list-disc ml-5 space-y-1\"><li>Both initially point to same <code>\"Java\"</code> object.</li><li>When <code>b = \"Python\"</code>, a NEW object is created.</li><li><code>a</code> still points to <code>\"Java\"</code>.</li></ul>" },
                { "type": "section", "title": "13. == vs equals() (Intro Only)", "code": "String a = \"Java\";\nString b = \"Java\";\nSystem.out.println(a == b);      // true (same reference)\nSystem.out.println(a.equals(b)); // true (same content)", "rich": NOTE("⚠️ <strong>Important:</strong> <code>==</code> checks memory reference, while <code>equals()</code> checks the actual text content.") },
                { "type": "section", "title": "14. Common Mistakes", "rich": "<ul class=\"space-y-3 mb-6\"><li><span class=\"text-red-600 font-bold\">❌ 1. Thinking String is primitive</span><p class=\"text-sm text-slate-500\">Wrong — it's a full-fledged Object Class.</p></li><li><span class=\"text-red-600 font-bold\">❌ 2. Expecting modification</span><p class=\"text-sm text-slate-500\"><code>s.concat(\"World\")</code> creates a new string; it doesn't change <code>s</code>.</p></li><li><span class=\"text-red-600 font-bold\">❌ 3. Using == incorrectly</span><p class=\"text-sm text-slate-500\"><code>new String(\"Hi\") == new String(\"Hi\")</code> is <strong>false</strong> (different refs).</p></li></ul>" },
                { "type": "section", "title": "15. Performance Insight", "rich": "<ul class=\"list-disc ml-5 space-y-1 mb-4 text-sm\"><li>String Pool reduces memory usage by 20-30% in typical apps.</li><li>Reusing literals is faster than creating heap objects.</li><li>Avoid unnecessary <code>new String()</code> calls.</li></ul>" },
                { "type": "section", "title": "16. Real-World Usage", "rich": "<p class=\"mb-4\">Strings are the most frequent data type in Java, used for:</p><div class=\"flex flex-wrap gap-2\">" + ["User Input", "API Responses", "Database Queries", "File Handling", "UI Labels"].map(t => `<span class="px-3 py-1 bg-slate-100 rounded text-slate-700 text-xs font-semibold border border-slate-200">${t}</span>`).join('') + "</div>" },
                { "type": "section", "title": "17. JVM Insight", "rich": TABLE(`<thead><tr class=\"bg-slate-100\"><th class=\"px-4 py-3 border-r font-bold\">Part</th><th class=\"px-4 py-3 font-bold\">Storage Area</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-3 border-r\">Literals</td><td class=\"px-4 py-3\">String Pool (In Heap)</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r\">Objects</td><td class=\"px-4 py-3\">Heap Memory</td></tr><tr><td class=\"px-4 py-3 border-r\">References</td><td class=\"px-4 py-3\">Stack Memory</td></tr></tbody>`) },
                { "type": "section", "title": "18. One-Line Concept Clarity", "rich": NOTE("A String in Java is an <strong>immutable object</strong> used to store text, optimized via the <strong>String Pool</strong> for memory efficiency.") },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic\">Practice the fundamentals of String creation and behavior.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Create a String <code>lang = \"Java\"</code> and print its value. <br/><strong>Match Output:</strong> <code>Java</code>", "hints": ["String lang = \"Java\";", "System.out.println(lang);"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Create two string literals <code>s1 = \"A\"</code> and <code>s2 = \"A\"</code>. Check if <code>s1 == s2</code> and print the result. <br/><strong>Match Output:</strong> <code>true</code>", "hints": ["Literals are reused in the pool", "System.out.println(s1 == s2);"], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Demonstrate immutability. Define <code>t = \"Hi\"</code>, then <code>t.concat(\"!\")</code>. Print <code>t</code>. Observe it hasn't changed. <br/><strong>Match Output:</strong> <code>Hi</code>", "hints": ["t.concat(\"!\") doesn't change t", "You need to reassign to see changes"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "Java", "matchCode": "String[\\s\\S]*=[\\s\\S]*\"Java\"" },
                { "index": 2, "match": "true", "matchCode": "==" },
                { "index": 3, "match": "Hi", "matchCode": "concat" }
            ]
        },
        {
            title: 'String Methods',
            duration: '35 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\"><strong>String Methods</strong> are predefined functions available in the <code>String</code> class in Java that allow you to perform operations like searching, modifying, comparing, extracting, and transforming string data.</p>" },
                { "type": "section", "title": "2. Core Concept", "rich": "<ul class=\"list-disc ml-5 space-y-1 mb-4\"><li>A String in Java is an <strong>object</strong>, not a primitive.</li><li>All operations are performed using methods of the String class.</li><li><strong>Fundamental Rule:</strong> Strings are <strong>immutable</strong>. Methods return a NEW string; they do NOT modify the original.</li></ul>" },
                { "type": "section", "title": "Internal Working Pipe", "rich": SVG_STRING_METHODS_FLOW },
                { "type": "section", "title": "Working Example", "code": "String s = \"hello\";\nString upper = s.toUpperCase();", "rich": "<ul class=\"list-disc ml-5 space-y-1 mt-4\"><li><code>\"hello\"</code> remains unchanged in memory.</li><li>A new string <code>\"HELLO\"</code> is created and assigned to <code>upper</code>.</li></ul>" },
                { "type": "section", "title": "3. Most Important String Methods (Core Set)", "rich": "<p class=\"mb-4 text-slate-500\">Master these 10 core tools for text manipulation:</p>" },
                { "type": "section", "title": "3.1 length()", "code": "String s = \"Java\";\nSystem.out.println(s.length());", "rich": "<p class=\"mt-2 text-sm\">Returns number of characters. <strong>Output:</strong> <code>4</code></p>" },
                { "type": "section", "title": "3.2 charAt(index)", "code": "String s = \"Java\";\nSystem.out.println(s.charAt(2));", "rich": "<p class=\"mt-2 text-sm\">Returns character at specific position. <strong>Output:</strong> <code>v</code></p>" },
                { "type": "section", "title": "3.3 toUpperCase() / toLowerCase()", "code": "String s = \"java\";\nSystem.out.println(s.toUpperCase());\nSystem.out.println(s.toLowerCase());", "rich": "<p class=\"mt-2 text-sm\">Transforms case. <strong>Output:</strong> <code>JAVA</code>, <code>java</code></p>" },
                { "type": "section", "title": "3.4 equals()", "code": "String a = \"java\";\nString b = \"java\";\nSystem.out.println(a.equals(b));", "rich": NOTE("<strong>CRITICAL:</strong> <code>equals()</code> compares <strong>content</strong>. Always use this for strings!") + "<p class=\"text-sm\"><strong>Output:</strong> <code>true</code></p>" },
                { "type": "section", "title": "3.5 equalsIgnoreCase()", "code": "System.out.println(\"Java\".equalsIgnoreCase(\"java\"));", "rich": "<p class=\"mt-2 text-sm\">Compares content ignoring case. <strong>Output:</strong> <code>true</code></p>" },
                { "type": "section", "title": "3.6 contains()", "code": "String s = \"Java Programming\";\nSystem.out.println(s.contains(\"Program\"));", "rich": "<p class=\"mt-2 text-sm\">Checks if substring exists. <strong>Output:</strong> <code>true</code></p>" },
                { "type": "section", "title": "3.7 substring()", "code": "String s = \"Java\";\nSystem.out.println(s.substring(1, 3));", "rich": "<p class=\"mt-2 text-sm text-amber-600\">⚠️ Note: end index is exclusive. <strong>Output:</strong> <code>av</code></p>" },
                { "type": "section", "title": "3.8 indexOf()", "code": "String s = \"Java\";\nSystem.out.println(s.indexOf('a'));", "rich": "<p class=\"mt-2 text-sm\">Returns position of first occurrence. <strong>Output:</strong> <code>1</code></p>" },
                { "type": "section", "title": "3.9 replace()", "code": "String s = \"Java\";\nSystem.out.println(s.replace('a', 'o'));", "rich": "<p class=\"mt-2 text-sm\">Replaces characters. <strong>Output:</strong> <code>Jovo</code></p>" },
                { "type": "section", "title": "3.10 trim()", "code": "String s = \"  hello  \";\nSystem.out.println(s.trim());", "rich": "<p class=\"mt-2 text-sm text-emerald-600 font-semibold\">Cleans whitespace. <strong>Output:</strong> <code>hello</code></p>" },
                { "type": "section", "title": "4. Advanced Methods (Pro Level)", "rich": TABLE(`<thead><tr class=\"bg-slate-50\"><th class=\"px-4 py-2 border-r\">Method</th><th class=\"px-4 py-2\">Usage</th><th class=\"px-4 py-2\">Output</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">startsWith(\"Ja\")</td><td class=\"px-4 py-2 text-xs\">Checks prefix</td><td class=\"px-4 py-2 text-xs\">true</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">endsWith(\"va\")</td><td class=\"px-4 py-2 text-xs\">Checks suffix</td><td class=\"px-4 py-2 text-xs\">true</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">split(\",\")</td><td class=\"px-4 py-2 text-xs\">Breaks into Array</td><td class=\"px-4 py-2 text-xs\">Array ref</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">isEmpty()</td><td class=\"px-4 py-2 text-xs\">Checks length == 0</td><td class=\"px-4 py-2 text-xs\">boolean</td></tr><tr><td class=\"px-4 py-2 border-r font-mono\">compareTo()</td><td class=\"px-4 py-2 text-xs\">Dictionary order</td><td class=\"px-4 py-2 text-xs\">int</td></tr></tbody>`) },
                { "type": "section", "title": "5. Complete Example (Real Usage)", "code": "public class Main {\n    public static void main(String[] args) {\n        String name = \"  Java Programming  \";\n\n        String trimmed = name.trim();\n        String upper = trimmed.toUpperCase();\n        boolean containsJava = upper.contains(\"JAVA\");\n\n        System.out.println(trimmed);\n        System.out.println(upper);\n        System.out.println(containsJava);\n    }\n}" },
                { "type": "section", "rich": "<p class=\"mt-6 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">Output</p><pre class=\"p-4 bg-slate-900 text-white rounded-lg font-mono text-xs mb-4 shadow-xl border border-slate-700\">Java Programming\nJAVA PROGRAMMING\ntrue</pre>" },
                { "type": "section", "title": "📘 Java String Methods (Complete Categorized List)", "rich": "<p class=\"mb-6 text-slate-500\">Master the full API of the String class, grouped by functionality.</p>" },
                { "type": "section", "title": "🔹 1. Basic Methods", "rich": TABLE(`<thead><tr class=\"bg-slate-50\"><th class=\"px-4 py-2 border-r\">Method</th><th class=\"px-4 py-2\">Description</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">length()</td><td class=\"px-4 py-2\">Returns the number of characters in the string.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">isEmpty()</td><td class=\"px-4 py-2\">Checks if <code>length()</code> is 0.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">isBlank()</td><td class=\"px-4 py-2\">Checks if empty or contains only whitespace (Java 11+).</td></tr><tr><td class=\"px-4 py-2 border-r font-mono\">charAt(index)</td><td class=\"px-4 py-2\">Returns the character at the specified index.</td></tr></tbody>`) },
                { "type": "section", "title": "🔹 2. Case Conversion", "rich": TABLE(`<thead><tr class=\"bg-slate-50\"><th class=\"px-4 py-2 border-r\">Method</th><th class=\"px-4 py-2\">Description</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">toUpperCase()</td><td class=\"px-4 py-2\">Converts all characters to uppercase.</td></tr><tr><td class=\"px-4 py-2 border-r font-mono\">toLowerCase()</td><td class=\"px-4 py-2\">Converts all characters to lowercase.</td></tr></tbody>`) },
                { "type": "section", "title": "🔹 3. Comparison Methods", "rich": TABLE(`<thead><tr class=\"bg-slate-50\"><th class=\"px-4 py-2 border-r\">Method</th><th class=\"px-4 py-2\">Description</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">equals(obj)</td><td class=\"px-4 py-2\">Checks if content matches exactly.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">equalsIgnoreCase(str)</td><td class=\"px-4 py-2\">Checks content match ignoring case.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">compareTo(str)</td><td class=\"px-4 py-2\">Dictionary comparison (returns int).</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">compareToIgnoreCase(str)</td><td class=\"px-4 py-2\">Dictionary comparison ignoring case.</td></tr><tr><td class=\"px-4 py-2 border-r font-mono\">contentEquals(seq)</td><td class=\"px-4 py-2\">Compares with StringBuffer/StringBuilder.</td></tr></tbody>`) },
                { "type": "section", "title": "🔹 4. Searching Methods", "rich": TABLE(`<thead><tr class=\"bg-slate-50\"><th class=\"px-4 py-2 border-r\">Method</th><th class=\"px-4 py-2\">Description</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">contains(str)</td><td class=\"px-4 py-2\">Checks if string contains substring.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">indexOf(str)</td><td class=\"px-4 py-2\">Index of first occurrence of character/string.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">lastIndexOf(str)</td><td class=\"px-4 py-2\">Index of last occurrence of character/string.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">startsWith(prefix)</td><td class=\"px-4 py-2\">Checks if string starts with prefix.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">endsWith(suffix)</td><td class=\"px-4 py-2\">Checks if string ends with suffix.</td></tr><tr><td class=\"px-4 py-2 border-r font-mono\">matches(regex)</td><td class=\"px-4 py-2\">Checks if string matches a Regex pattern.</td></tr></tbody>`) },
                { "type": "section", "title": "🔹 5. Substring & Extraction", "rich": TABLE(`<thead><tr class=\"bg-slate-50\"><th class=\"px-4 py-2 border-r\">Method</th><th class=\"px-4 py-2\">Description</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">substring(begin)</td><td class=\"px-4 py-2\">Returns part of string from start to end.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">substring(begin, end)</td><td class=\"px-4 py-2\">Returns part from begin (inc) to end (exc).</td></tr><tr><td class=\"px-4 py-2 border-r font-mono\">subSequence(begin, end)</td><td class=\"px-4 py-2\">Returns a CharSequence part.</td></tr></tbody>`) },
                { "type": "section", "title": "🔹 6. Modification Methods (Returns New String)", "rich": TABLE(`<thead><tr class=\"bg-slate-50\"><th class=\"px-4 py-2 border-r\">Method</th><th class=\"px-4 py-2\">Description</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">replace(old, new)</td><td class=\"px-4 py-2\">Replaces characters or substrings.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">replaceAll(regex, repl)</td><td class=\"px-4 py-2\">Replaces all occurrences matching Regex.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">replaceFirst(regex, repl)</td><td class=\"px-4 py-2\">Replaces only the first Regex match.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">concat(str)</td><td class=\"px-4 py-2\">Joins two strings together.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">trim()</td><td class=\"px-4 py-2\">Removes leading and trailing standard spaces.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">strip()</td><td class=\"px-4 py-2\">Unicode-aware space removal (Java 11+).</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">stripLeading()</td><td class=\"px-4 py-2\">Removes only leading whitespace.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">stripTrailing()</td><td class=\"px-4 py-2\">Removes only trailing whitespace.</td></tr><tr><td class=\"px-4 py-2 border-r font-mono\">repeat(n)</td><td class=\"px-4 py-2\">Returns the string repeated N times (Java 11+).</td></tr></tbody>`) },
                { "type": "section", "title": "🔹 7. Splitting & Joining", "rich": TABLE(`<thead><tr class=\"bg-slate-50\"><th class=\"px-4 py-2 border-r\">Method</th><th class=\"px-4 py-2\">Description</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">split(regex)</td><td class=\"px-4 py-2\">Breaks string into a String[] array.</td></tr><tr><td class=\"px-4 py-2 border-r font-mono\">join(delim, elements)</td><td class=\"px-4 py-2\">Joins multiple strings with a delimiter.</td></tr></tbody>`) },
                { "type": "section", "title": "🔹 8. Conversion Methods", "rich": TABLE(`<thead><tr class=\"bg-slate-50\"><th class=\"px-4 py-2 border-r\">Method</th><th class=\"px-4 py-2\">Description</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">toCharArray()</td><td class=\"px-4 py-2\">Converts the string into a <code>char[]</code> array.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">getBytes()</td><td class=\"px-4 py-2\">Encodes string into a <code>byte[]</code> array.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">valueOf(data)</td><td class=\"px-4 py-2\">Static method to convert any type to String.</td></tr><tr><td class=\"px-4 py-2 border-r font-mono\">intern()</td><td class=\"px-4 py-2\">Forcefully adds literal to the String Pool.</td></tr></tbody>`) },
                { "type": "section", "title": "🔹 9. Utility Methods", "rich": TABLE(`<thead><tr class=\"bg-slate-50\"><th class=\"px-4 py-2 border-r\">Method</th><th class=\"px-4 py-2\">Description</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">hashCode()</td><td class=\"px-4 py-2\">Returns the hash code for the string.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">toString()</td><td class=\"px-4 py-2\">Returns the string itself.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">format(format, ...)</td><td class=\"px-4 py-2\">Static method for complex formatting.</td></tr><tr><td class=\"px-4 py-2 border-r font-mono\">lines()</td><td class=\"px-4 py-2\">Returns a Stream of lines (Java 11+).</td></tr></tbody>`) },
                { "type": "section", "title": "🔹 10. Advanced / Less Used", "rich": TABLE(`<thead><tr class=\"bg-slate-50\"><th class=\"px-4 py-2 border-r\">Method</th><th class=\"px-4 py-2\">Description</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">codePointAt(i)</td><td class=\"px-4 py-2\">Unicode value at specific index.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">codePointBefore(i)</td><td class=\"px-4 py-2\">Unicode value before index.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">codePointCount(i, j)</td><td class=\"px-4 py-2\">Number of Unicode points in range.</td></tr><tr class=\"border-b\"><td class=\"px-4 py-2 border-r font-mono\">offsetByCodePoints()</td><td class=\"px-4 py-2\">Calculates index offset by Unicode points.</td></tr><tr><td class=\"px-4 py-2 border-r font-mono\">regionMatches()</td><td class=\"px-4 py-2\">Compares two specific string regions.</td></tr></tbody>`) },
                { "type": "section", "title": "Step-by-Step Execution (Tracing)", "rich": "<ol class=\"list-decimal ml-5 space-y-2 mb-4 bg-slate-50 p-4 rounded-lg\"><li><strong>Input:</strong> <code>\"  Java Programming  \"</code></li><li><strong>trim():</strong> Removes spaces → <code>\"Java Programming\"</code></li><li><strong>toUpperCase():</strong> → <code>\"JAVA PROGRAMMING\"</code></li><li><strong>contains(\"JAVA\"):</strong> checks substring → <code>true</code></li></ol>" },
                { "type": "section", "title": "6. Important Rules (Must Know)", "rich": "<ul class=\"grid grid-cols-1 md:grid-cols-2 gap-3 mb-6\"><li class=\"p-3 bg-red-50 border border-red-100 rounded-lg text-sm\">🔒 Strings are <strong>immutable</strong></li><li class=\"p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm\">🆕 Methods return <strong>new objects</strong></li><li class=\"p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-sm\">✅ Use <code>equals()</code> for content</li><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm\">0️⃣ Index starts from <strong>0</strong></li></ul>" },
                { "type": "section", "title": "7. Common Mistakes", "rich": "<ul class=\"space-y-4 mb-6\"><li><span class=\"text-red-600 font-bold tracking-tighter uppercase text-xs\">Wrong Comparison</span><p class=\"text-sm text-slate-500\">Using <code>==</code> instead of <code>.equals()</code>.</p></li><li><span class=\"text-red-600 font-bold tracking-tighter uppercase text-xs\">Ignoring Immutability</span><code class=\"block p-2 bg-slate-100 rounded mt-1\">s.toUpperCase(); // WRONG (result not stored)</code></li><li><span class=\"text-red-600 font-bold tracking-tighter uppercase text-xs\">Index Errors</span><p class=\"text-sm text-slate-500\">Accessing index 10 on a 5-char string → <code>StringIndexOutOfBoundsException</code>.</p></li></ul>" },
                { "type": "section", "title": "8. Mental Model", "rich": NOTE("Think of String methods like <strong>read-only blueprint tools</strong>. They examine or transform text to create a brand new version, but they NEVER damage or modify the original blueprint.") },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic\">Put these tools to work on some text data.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Define <code>msg = \" HELLO \"</code>. Trim it and print its length. <br/><strong>Match Output:</strong> <code>5</code>", "hints": ["msg.trim().length()", "System.out.println(...)"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Extract <code>\"Java\"</code> from <code>\"Java Programming\"</code> using <code>substring(0, 4)</code> and print it. <br/><strong>Match Output:</strong> <code>Java</code>", "hints": ["String s = \"Java Programming\";", "s.substring(0, 4)"], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Check if <code>\"Code\"</code> contains <code>\"o\"</code> and print the result. <br/><strong>Match Output:</strong> <code>true</code>", "hints": ["\"Code\".contains(\"o\")"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "5", "matchCode": "trim" },
                { "index": 2, "match": "Java", "matchCode": "substring" },
                { "index": 3, "match": "true", "matchCode": "contains" }
            ]
        },
        {
            title: 'String Comparison',
            duration: '35 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\"><strong>String Comparison</strong> is the process of checking whether two strings are equal, different, or ordered based on their content or memory reference.</p><p class=\"mb-4\">In Java, strings can be compared in two fundamentally different ways:</p><ul class=\"list-disc ml-5 space-y-1 mb-4\"><li><strong>Reference Comparison:</strong> Checks memory address.</li><li><strong>Content Comparison:</strong> Checks actual text characters.</li></ul>" },
                { "type": "section", "title": "Memory Visualization", "rich": SVG_STRING_COMPARISON },
                { "type": "section", "title": "2. Reference Comparison (==)", "rich": "<p class=\"mb-4\">The <code>==</code> operator checks if both variables point to the <strong>same memory location</strong>. In the String Pool, literals are reused, so they share the same reference.</p>" },
                { "type": "section", "title": "Pool Example", "code": "String a = \"Java\";\nString b = \"Java\";\nSystem.out.println(a == b);", "rich": "<p class=\"mt-4 mb-2\"><strong>Output:</strong> <code>true</code></p><p class=\"text-sm text-slate-500\">Both point to the same object in the String Pool.</p>" },
                { "type": "section", "title": "Heap Example", "code": "String a = new String(\"Java\");\nString b = new String(\"Java\");\nSystem.out.println(a == b);", "rich": "<p class=\"mt-4 mb-2\"><strong>Output:</strong> <code>false</code></p><p class=\"text-sm text-slate-500\"><code>new String()</code> forces the creation of separate objects in the Heap.</p>" },
                { "type": "section", "title": "3. Content Comparison (.equals())", "rich": "<p class=\"mb-4\">The <code>.equals()</code> method compares the <strong>actual text</strong> character by character. It ignores where the objects are stored in memory.</p>" },
                { "type": "section", "title": "Correct Content Check", "code": "String a = new String(\"Java\");\nString b = new String(\"Java\");\nSystem.out.println(a.equals(b));", "rich": "<p class=\"mt-4 mb-2\"><strong>Output:</strong> <code>true</code></p>" },
                { "type": "section", "title": "4. Case-Insensitive Comparison", "code": "String a = \"JAVA\";\nString b = \"java\";\nSystem.out.println(a.equalsIgnoreCase(b));", "rich": "<p class=\"mt-4 mb-2\"><strong>Output:</strong> <code>true</code></p>" },
                { "type": "section", "title": "5. Lexicographical Comparison (.compareTo())", "rich": "<p class=\"mb-4\">Compares strings based on <strong>dictionary order</strong>.</p>" },
                { "type": "section", "title": "Compare Values", "code": "System.out.println(\"apple\".compareTo(\"banana\"));\nSystem.out.println(\"cat\".compareTo(\"cat\"));", "rich": "<ul class=\"list-disc ml-5 space-y-1 mt-4 mb-4\"><li><code>0</code> → equal</li><li><code>< 0</code> → first is smaller</li><li><code>> 0</code> → first is greater</li></ul>" },
                { "type": "section", "title": "Internal Working", "rich": "<p class=\"text-sm text-slate-500 bg-slate-50 p-3 rounded-lg\"><code>\"apple\".compareTo(\"banana\")</code> compares 'a' vs 'b'. Since 'a' comes before 'b', the ASCII difference results in a <strong>negative</strong> value.</p>" },
                { "type": "section", "title": "compareToIgnoreCase()", "code": "System.out.println(\"JAVA\".compareToIgnoreCase(\"java\")); // 0", "rich": "" },
                { "type": "section", "title": "6. Real Example (Complete Flow)", "code": "public class Main {\n    public static void main(String[] args) {\n        String s1 = \"Java\";\n        String s2 = \"Java\";\n        String s3 = new String(\"Java\");\n        String s4 = \"java\";\n\n        System.out.println(s1 == s2);              // true (Pool)\n        System.out.println(s1 == s3);              // false (Heap)\n        System.out.println(s1.equals(s3));         // true (Content)\n        System.out.println(s1.equalsIgnoreCase(s4)); // true\n        System.out.println(s1.compareTo(s4));      // negative\n    }\n}" },
                { "type": "section", "title": "Comparison Steps (Tracing)", "rich": "<ul class=\"space-y-2 text-xs text-slate-600\"><li>1. s1/s2 are same Pool object → <code>== true</code></li><li>2. s3 is separate Heap object → <code>== false</code></li><li>3. .equals() checks character array → <code>true</code></li><li>4. case difference for s1/s4 → <code>.equals() false</code></li></ul>" },
                { "type": "section", "title": "7. Common Mistakes", "rich": "<ul class=\"space-y-4 mb-6\"><li><span class=\"block font-bold text-red-600 uppercase text-xs tracking-widest\">Null Pointer Danger</span><code class=\"block p-2 bg-slate-100 rounded mt-1\">s.equals(\"Java\"); // CRASH if s is null</code><p class=\"text-xs mt-1 text-emerald-600\">Safe way: <code>\"Java\".equals(s);</code></p></li></ul>" },
                { "type": "section", "title": "Advanced Insight (Pro Level)", "rich": NOTE("<strong>Why equals() works?</strong> Inside the String class, the <code>equals()</code> method loops through the internal <code>char[] value</code> and compares every character one by one.") },
                { "type": "section", "title": "Mental Model", "rich": "<div class=\"p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 my-6 shadow-sm\"><p class=\"font-bold mb-2\">Think like this:</p><ul class=\"text-sm space-y-2\"><li><strong>==</strong> → “Are these the EXACT SAME object?”</li><li><strong>.equals()</strong> → “Do they LOOK the same (text)?”</li><li><strong>.compareTo()</strong> → “Which comes FIRST in a dictionary?”</li></ul></div>" },
                { "type": "section", "title": "Summary Comparison", "rich": TABLE(`<thead><tr class=\"bg-slate-100\"><th class=\"px-4 py-3 border-r font-bold\">Method</th><th class=\"px-4 py-3 border-r font-bold\">Compares</th><th class=\"px-4 py-3 font-bold\">Result</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-mono\">==</td><td class=\"px-4 py-3 border-r\">Memory (Same Object?)</td><td class=\"px-4 py-3 font-semibold\">boolean</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-mono\">.equals()</td><td class=\"px-4 py-3 border-r\">Actual Text Content</td><td class=\"px-4 py-3 font-semibold\">boolean</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-mono\">.equalsIgnoreCase()</td><td class=\"px-4 py-3 border-r\">Text (Ignoring Case)</td><td class=\"px-4 py-3 font-semibold\">boolean</td></tr><tr><td class=\"px-4 py-3 border-r font-mono\">.compareTo()</td><td class=\"px-4 py-3 border-r\">Dictionary Order</td><td class=\"px-4 py-3 font-semibold\">int</td></tr></tbody>`) },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic\">Test your understanding of String comparison logic.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Define <code>s1 = \"A\"</code> and <code>s2 = new String(\"A\")</code>. Print <code>s1 == s2</code>. <br/><strong>Match Output:</strong> <code>false</code>", "hints": ["String literals and objects have different refs", "System.out.println(s1 == s2);"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Use <code>.equals()</code> to compare <code>s1</code> and <code>s2</code> from Task 1. Print result. <br/><strong>Match Output:</strong> <code>true</code>", "hints": ["s1.equals(s2)"], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Compare <code>\"apple\"</code> and <code>\"apple\"</code> using <code>compareTo()</code>. Print result. <br/><strong>Match Output:</strong> <code>0</code>", "hints": ["a.compareTo(b) returns 0 if equal"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "false", "matchCode": "==" },
                { "index": 2, "match": "true", "matchCode": "equals" },
                { "index": 3, "match": "0", "matchCode": "compareTo" }
            ]
        },
        {
            title: 'String Concatenation',
            duration: '35 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\"><strong>String Concatenation</strong> is the process of combining two or more strings into a single string.</p><p class=\"mb-4\">In Java, since String is an object and <strong>immutable</strong>, concatenation always creates a <strong>new string object</strong> in memory.</p>" },
                { "type": "section", "title": "Compiler Optimization", "rich": SVG_STRING_CONCAT },
                { "type": "section", "title": "2. Using the + Operator", "rich": "<p class=\"mb-4\">The most common way to join strings. It can combine strings with other data types like integers or booleans.</p>" },
                { "type": "section", "title": "Basic Join", "code": "String a = \"Hello\";\nString b = \"World\";\nString res = a + \" \" + b;\nSystem.out.println(res);", "rich": "<p class=\"mt-4\"><strong>Output:</strong> <code>Hello World</code></p>" },
                { "type": "section", "title": "3. Order of Evaluation (CRITICAL)", "rich": "<p class=\"mb-4 text-red-600 font-semibold\">Evaluation happens from Left to Right.</p>" },
                { "type": "section", "title": "Trap Example", "code": "System.out.println(\"Sum: \" + 10 + 20);", "rich": "<p class=\"mt-4 mb-2\"><strong>Output:</strong> <code>Sum: 1020</code></p><p class=\"text-xs text-slate-500\">Explanation: \"Sum: \" + 10 becomes \"Sum: 10\", then \"Sum: 10\" + 20 becomes \"Sum: 1020\".</p>" },
                { "type": "section", "title": "Correct Way", "code": "System.out.println(\"Sum: \" + (10 + 20));", "rich": "<p class=\"mt-4\"><strong>Output:</strong> <code>Sum: 30</code></p>" },
                { "type": "section", "title": "4. Using concat() Method", "code": "String a = \"Java\";\nString b = \"Script\";\nSystem.out.println(a.concat(b));", "rich": "<p class=\"mt-4 mb-2\"><strong>Output:</strong> <code>JavaScript</code></p>" + WARNING("<code>concat()</code> only works with Strings. It will throw an error if you pass a number or null.") },
                { "type": "section", "title": "5. Using StringBuilder (Performance)", "rich": "<p class=\"mb-4\">Since Strings are immutable, every <code>+</code> creates a new object. In loops, this is very slow.</p>" },
                { "type": "section", "title": "Bad (Slow) vs Good (Fast)", "code": "// BAD: Creates 1000 objects\nString s = \"\";\nfor (int i = 0; i < 1000; i++) {\n    s = s + i;\n}\n\n// GOOD: Efficient mutable buffer\nStringBuilder sb = new StringBuilder();\nfor (int i = 0; i < 1000; i++) {\n    sb.append(i);\n}\nString finalS = sb.toString();", "rich": "<p class=\"mt-2 text-xs text-slate-500\">StringBuilder is significantly faster for heavy operations.</p>" },
                { "type": "section", "title": "6. Using StringBuffer (Thread Safe)", "code": "StringBuffer sb = new StringBuffer();\nsb.append(\"Hello\");\nsb.append(\" Java\");\nSystem.out.println(sb.toString());", "rich": "<p class=\"mt-4 mb-2\"><strong>Difference:</strong></p><ul class=\"list-disc ml-5 text-sm space-y-1\"><li><strong>StringBuilder:</strong> Faster (non-synchronized).</li><li><strong>StringBuffer:</strong> Thread-safe (synchronized) but slower.</li></ul>" },
                { "type": "section", "title": "7. Internal Working (Advanced)", "rich": "<p class=\"mb-2\">When you write <code>String res = a + b + c;</code>, the Java compiler actually converts it to:</p><code class=\"block p-3 bg-slate-100 rounded text-xs\">new StringBuilder().append(a).append(b).append(c).toString();</code>" },
                { "type": "section", "title": "8. Real Example (Complete Flow)", "code": "public class Main {\n    public static void main(String[] args) {\n        String name = \"Java\";\n        int version = 17;\n        String result = \"Language: \" + name + \" Version: \" + version;\n        System.out.println(result);\n    }\n}", "rich": "<p class=\"mt-4\"><strong>Output:</strong> <code>Language: Java Version: 17</code></p>" },
                { "type": "section", "title": "Step-by-Step Execution (Tracing)", "rich": "<ol class=\"list-decimal ml-5 space-y-2 mb-4 bg-slate-50 p-4 rounded-lg\"><li><code>\"Language: \" + name</code> → <code>\"Language: Java\"</code></li><li><code>... + \" Version: \"</code> → <code>\"Language: Java Version: \"</code></li><li><code>... + 17</code> → <code>\"Language: Java Version: 17\"</code></li></ol>" },
                { "type": "section", "title": "9. Important Rules", "rich": "<ul class=\"grid grid-cols-1 md:grid-cols-2 gap-3 mb-6\"><li class=\"p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm\">🧩 Strings are <strong>Immutable</strong></li><li class=\"p-3 bg-red-50 border border-red-100 rounded-lg text-sm\">🆕 Every concat creates a <strong>New Object</strong></li><li class=\"p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-sm\">🚀 Use <strong>StringBuilder</strong> in loops</li><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm\">⬅️ Evaluation is <strong>Left to Right</strong></li></ul>" },
                { "type": "section", "title": "10. Common Mistakes", "rich": "<ul class=\"space-y-4 mb-6\"><li><span class=\"text-red-600 font-bold tracking-tighter uppercase text-xs\">Arithmetic Errors</span><p class=\"text-sm text-slate-500\"><code>\"Total: \" + 10 + 5</code> results in <code>Total: 105</code>, not 15.</p></li><li><span class=\"text-red-600 font-bold tracking-tighter uppercase text-xs\">Null with concat()</span><p class=\"text-sm text-slate-500\"><code>s.concat(\"Hi\")</code> crashes if <code>s</code> is null.</p></li></ul>" },
                { "type": "section", "title": "11. Advanced Use Cases", "rich": "<ul class=\"space-y-4 mb-6\"><li><span class=\"block text-indigo-600 font-bold text-xs uppercase\">Dynamic SQL</span><p class=\"text-sm italic\">\"SELECT * FROM users WHERE name = '\" + name + \"'\"</p></li><li><span class=\"block text-indigo-600 font-bold text-xs uppercase\">JSON Building</span><p class=\"text-sm italic\">\"{ \"name\": \"\" + name + \"\" }\"</p></li><li><span class=\"block text-indigo-600 font-bold text-xs uppercase\">Logging</span><p class=\"text-sm italic\">\"User: \" + userId + \" logged in\"</p></li></ul>" },
                { "type": "section", "title": "Mental Model", "rich": NOTE("Think of it like this:<br/><strong>+</strong> → Easy but creates new objects every time.<br/><strong>StringBuilder</strong> → Efficient builder tool for heavy logic.<br/><strong>concat()</strong> → Pure joining method.") },
                { "type": "section", "title": "Comparison Summary", "rich": TABLE(`<thead><tr class=\"bg-slate-100\"><th class=\"px-4 py-3 border-r font-bold\">Method</th><th class=\"px-4 py-3 border-r font-bold\">Use Case</th><th class=\"px-4 py-3 font-bold\">Performance</th></tr></thead><tbody><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-mono\">+ Operator</td><td class=\"px-4 py-3 border-r\">Simple joins</td><td class=\"px-4 py-3 text-amber-600 font-bold\">Medium</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-mono\">concat()</td><td class=\"px-4 py-3 border-r\">Basic string join</td><td class=\"px-4 py-3 text-amber-600 font-bold\">Medium</td></tr><tr class=\"border-b\"><td class=\"px-4 py-3 border-r font-mono\">StringBuilder</td><td class=\"px-4 py-3 border-r\">Loops / Heavy Tasks</td><td class=\"px-4 py-3 text-emerald-600 font-bold\">High (Fast)</td></tr><tr><td class=\"px-4 py-3 border-r font-mono\">StringBuffer</td><td class=\"px-4 py-3 border-r\">Multi-threading</td><td class=\"px-4 py-3 text-slate-500 font-bold\">Thread-Safe</td></tr></tbody>`) },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic\">Master concatenation rules and efficiency.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Print the result of <code>\"Result: \" + 50 + 50</code>. <br/><strong>Match Output:</strong> <code>Result: 5050</code>", "hints": ["Evaluation goes left to right", "The first join turns everything into a String"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Use <code>StringBuilder</code> to append <code>\"Java\"</code> and <code>\"17\"</code>. Print the final result. <br/><strong>Match Output:</strong> <code>Java17</code>", "hints": ["sb.append(\"Java\");", "sb.append(\"17\");", "Print sb.toString()"], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Concatenate <code>\"Hi\"</code> and <code>\"!\"</code> using the <code>concat()</code> method. Print the result. <br/><strong>Match Output:</strong> <code>Hi!</code>", "hints": ["\"Hi\".concat(\"!\")"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "Result: 5050", "matchCode": "+" },
                { "index": 2, "match": "Java17", "matchCode": "StringBuilder" },
                { "index": 3, "match": "Hi!", "matchCode": "concat" }
            ]
        },
        {
            title: 'String Immutability',
            duration: '35 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\"><strong>String Immutability</strong> means that once a String object is created in Java, its value <strong>cannot be changed</strong>.</p><p class=\"mb-4\">Any operation that seems to modify a string actually creates a <strong>new string object</strong>, leaving the original unchanged.</p>" },
                { "type": "section", "title": "2. Core Concept", "code": "String s = \"Java\";\ns = s + \" Programming\";", "rich": "<p class=\"mt-4\">👉 Looks like we modified <code>s</code><br/>❌ Actually, we did <strong>NOT</strong> modify the original string<br/><br/>✔ <strong>What really happens:</strong><br/><ul class=\"list-disc ml-5 space-y-1 mt-2 font-medium\"><li>\"Java\" remains unchanged</li><li>New string \"Java Programming\" is created</li><li><code>s</code> now points to the new string</li></ul></p>" },
                { "type": "section", "title": "How It Works Internally", "rich": "<p class=\"mb-2 font-bold\">Step-by-step:</p><ol class=\"list-decimal ml-5 space-y-2 mb-4\"><li><code>String s = \"Java\";</code> → \"Java\" stored in <strong>String Pool</strong>; <code>s</code> points to it.</li><li><code>s = s + \" Dev\";</code> → New string \"Java Dev\" created; Old \"Java\" still exists.</li><li><code>s</code> now points to new object.</li></ol>" },
                { "type": "section", "title": "Memory Visualization", "rich": SVG_STRING_IMMUTABILITY_ADV },
                { "type": "section", "title": "3. Proof Example", "code": "public class Main {\n    public static void main(String[] args) {\n        String s1 = \"Java\";\n        String s2 = s1;\n\n        s1 = s1 + \" Dev\";\n\n        System.out.println(s1);\n        System.out.println(s2);\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl border border-slate-700\">Java Dev\nJava</pre><p class=\"text-sm mt-4\"><strong>Explanation:</strong> <code>s2</code> still points to original \"Java\", while <code>s1</code> now points to new \"Java Dev\".</p>" },
                { "type": "section", "title": "4. Why Strings Are Immutable?", "rich": "<ul class=\"space-y-4 mb-6\"><li><span class=\"text-blue-600 font-bold tracking-tight uppercase text-xs border-l-2 border-blue-600 pl-2\">🛡️ 1. Security</span><p class=\"text-sm text-slate-600\">Strings are used in: File paths, Database connections, Network URLs. If mutable, they could be changed maliciously behind the scenes.</p></li><li><span class=\"text-emerald-600 font-bold tracking-tight uppercase text-xs border-l-2 border-emerald-600 pl-2\">🧠 2. String Pool Optimization</span><p class=\"text-sm text-slate-600\"><code>String a = \"Java\"; String b = \"Java\";</code> Both share same object → saves massive memory.</p></li><li><span class=\"text-purple-600 font-bold tracking-tight uppercase text-xs border-l-2 border-purple-600 pl-2\">🧵 3. Thread Safety</span><p class=\"text-sm text-slate-600\">Immutable objects are automatically thread-safe; no synchronization needed.</p></li><li><span class=\"text-amber-600 font-bold tracking-tight uppercase text-xs border-l-2 border-amber-600 pl-2\">⚡ 4. Caching & Performance</span><p class=\"text-sm text-slate-600\">Hashcodes can be cached; improves performance in collections like HashMap.</p></li></ul>" },
                { "type": "section", "title": "5. Common Operations That DO NOT Modify String", "code": "String s = \"java\";\ns.toUpperCase();   // NOT stored\ns.concat(\" Dev\");  // NOT stored", "rich": "<p class=\"mt-4\"><strong>Output:</strong> <code>java</code></p><p class=\"mt-4 text-xs text-blue-600\"><strong>Correct Way:</strong> <code>s = s.toUpperCase();</code></p>" },
                { "type": "section", "title": "Real Example (Full Flow)", "code": "public class Main {\n    public static void main(String[] args) {\n        String name = \"Java\";\n\n        name.concat(\" Programming\");\n        System.out.println(name); // unchanged\n\n        name = name.concat(\" Programming\");\n        System.out.println(name); // updated\n    }\n}", "rich": "<p class=\"mt-4 mb-2 font-bold text-slate-800 text-xs tracking-widest border-l-4 border-slate-800 pl-3 uppercase\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl border border-slate-700\">Java\nJava Programming</pre>" },
                { "type": "section", "title": "6. Internal Implementation (Advanced)", "rich": "<p class=\"mb-2\">Inside Java source code:</p><code class=\"block p-3 bg-slate-100 rounded text-xs\">final class String {<br/>&nbsp;&nbsp;private final char[] value;<br/>}</code><p class=\"mt-2 text-xs text-slate-500\"><strong>final</strong> → cannot be modified; internal array is also not changeable.</p>" },
                { "type": "section", "title": "7. Performance Issue Due to Immutability", "code": "// Problem: Creates multiple objects (Inefficient)\nString s = \"\";\nfor (int i = 0; i < 5; i++) {\n    s = s + i;\n}\n\n// Solution: StringBuilder\nStringBuilder sb = new StringBuilder();\nfor (int i = 0; i < 5; i++) {\n    sb.append(i);\n}\nString finalS = sb.toString();", "rich": "<p class=\"mt-4 text-sm text-slate-500 font-medium\">Using <code>+</code> repeatedly in a loop is slow. Use <code>StringBuilder</code> for heavy operations.</p>" },
                { "type": "section", "title": "8. String Pool and Immutability", "rich": "<div class=\"p-4 border rounded-xl bg-slate-50 mb-6 font-mono text-sm\">String a = \"Java\";<br/>String b = \"Java\";</div><p class=\"text-sm mb-4\">Only one object created. Safe because of immutability. If <strong>mutable</strong>, changing <code>a</code> would affect <code>b</code> ❌</p>" },
                { "type": "section", "title": "9. Common Mistakes", "rich": "<ul class=\"space-y-4 mb-6 text-sm\"><li><strong>1. Assuming modification:</strong> <code>s.toUpperCase(); // WRONG</code></li><li><strong>2. Ignoring reassignment:</strong> <code>s.concat(\"X\"); // No effect</code></li><li><strong>3. Performance issues in loops:</strong> Using <code>+</code> repeatedly ❌</li></ul>" },
                { "type": "section", "title": "10. Advanced Concept: Interning", "code": "String s1 = new String(\"Java\");\nString s2 = s1.intern(); // Moves string to pool", "rich": "<p class=\"mt-2 text-xs text-slate-500 underline decoration-slate-300\"><code>intern()</code> helps reuse memory by returning the pool reference.</p>" },
                { "type": "section", "title": "Real-Life Analogy", "rich": NOTE("Think of a String like a <strong>printed document 📄</strong>. You cannot edit it. You can only create a <strong>new document</strong> and replace the old one.") },
                { "type": "section", "title": "🧠 Mental Model", "rich": "<div class=\"p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 my-6 shadow-sm\"><ul class=\"text-sm space-y-2\"><li><strong>String</strong> = Read-only object</li><li><strong>Modification</strong> = Create new object</li><li>Reference changes, NOT the value itself</li></ul></div>" },
                { "type": "section", "title": "Key Rules (Summary)", "rich": "<ul class=\"grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 text-xs\"><li class=\"p-3 bg-red-50 border border-red-100 rounded-lg\">Strings are immutable</li><li class=\"p-3 bg-blue-50 border border-blue-100 rounded-lg\">Methods return new objects</li><li class=\"p-3 bg-emerald-50 border border-emerald-100 rounded-lg\">Pool relies on immutability</li><li class=\"p-3 bg-slate-50 border border-slate-200 rounded-lg\">Use StringBuilder for loops</li></ul>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"text-slate-500 mb-4 italic\">Verify your understanding of object persistence.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Define <code>s = \"A\"</code>. Call <code>s.concat(\"B\")</code> but DO NOT reassign it. Print <code>s</code>. <br/><strong>Match Output:</strong> <code>A</code>", "hints": ["Original string never changes", "Concat returns a new string which must be captured"], "points": 10 },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Perform <code>s = s.concat(\"B\")</code> and print <code>s</code>. <br/><strong>Match Output:</strong> <code>AB</code>", "hints": ["Reassignment updates the reference variable"], "points": 10 },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Print the result of <code>new String(\"X\") == \"X\"</code>. <br/><strong>Match Output:</strong> <code>false</code>", "hints": ["Literal is in Pool, new object is in Heap", "References will never be equal"], "points": 10 }
            ],
            validation: [
                { "index": 1, "match": "A", "matchCode": "concat" },
                { "index": 2, "match": "AB", "matchCode": "=" },
                { "index": 3, "match": "false", "matchCode": "==" }
            ]
        }
    ],
}).catch(console.error);
