const { seedModule } = require('./_helpers');

// Helper Functions
const WARNING = (text) => `<div class="mt-4 mb-6 p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl shadow-sm"><div class="flex items-start"><span class="text-rose-500 mr-3 text-lg">⚠️</span><div class="text-rose-900 font-medium text-sm leading-relaxed">${text}</div></div></div>`;
const NOTE = (text) => `<div class="mt-4 mb-6 p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl shadow-sm"><div class="flex items-start"><span class="text-sky-500 mr-3 text-lg">💡</span><div class="text-sky-900 font-medium text-sm leading-relaxed">${text}</div></div></div>`;

const SVG_INHERITANCE_HIERARCHY = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-[#0F172A] p-4">
<svg width="100%" height="auto" viewBox="0 0 900 500" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl">
    <defs>
        <linearGradient id="bg-main-inh" x1="0" y1="0" x2="900" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stop-color="#0F172A" />
            <stop offset="100%" stop-color="#1E293B" />
        </linearGradient>
        <filter id="glow-inh">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.5" />
        </filter>
        <marker id="arrow-blue-inh-main" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
        </marker>
        <marker id="arrow-emerald-inh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
        </marker>
    </defs>

    <rect width="900" height="500" fill="url(#bg-main-inh)" />

    <!-- Parent Class: Animal -->
    <rect x="300" y="50" width="300" height="140" rx="20" fill="#1E293B" stroke="#38BDF8" stroke-width="3" filter="url(#glow-inh)" />
    <rect x="300" y="50" width="300" height="40" rx="18" fill="#38BDF8" fill-opacity="0.1" />
    <text x="450" y="78" fill="#7DD3FC" font-family="monospace" font-size="20" font-weight="bold" text-anchor="middle">Parent (Animal)</text>
    
    <text x="325" y="120" fill="#94A3B8" font-family="monospace" font-size="14">Fields: eyeColor, surname</text>
    <text x="325" y="150" fill="#F8FAFC" font-family="monospace" font-size="16" font-weight="bold">Method: eat()</text>

    <!-- Inheritance Arrow -->
    <path d="M450 190 L 450 255" stroke="#38BDF8" stroke-width="4" fill="none" marker-end="url(#arrow-blue-inh-main)" stroke-dasharray="8 4" />
    <text x="490" y="235" fill="#38BDF8" font-family="Arial, sans-serif" font-size="14" font-weight="bold">ISA</text>

    <!-- Child Class: Dog -->
    <rect x="250" y="270" width="400" height="160" rx="24" fill="#0F172A" stroke="#10B981" stroke-width="4" filter="url(#glow-inh)" />
    <rect x="250" y="270" width="400" height="45" rx="22" fill="#10B981" fill-opacity="0.1" />
    <text x="450" y="302" fill="#6EE7B7" font-family="monospace" font-size="22" font-weight="bold" text-anchor="middle">Child (Dog)</text>

    <!-- Inherited Part -->
    <rect x="275" y="325" width="350" height="40" rx="8" fill="#1E293B" stroke="#334155" stroke-width="1" />
    <text x="290" y="350" fill="#94A3B8" font-family="monospace" font-size="13">INHERITED: eyeColor, surname, eat()</text>
    
    <!-- Specialized Part -->
    <text x="290" y="395" fill="#F8FAFC" font-family="monospace" font-size="16" font-weight="bold">OWN METHOD: bark()</text>
    <text x="290" y="415" fill="#10B981" font-family="monospace" font-size="12" font-style="italic">// Specialized behavior</text>

    <!-- Bottom Legend -->
    <rect x="50" y="445" width="800" height="40" rx="8" fill="#1E293B" stroke="#334155" stroke-width="1" />
    <text x="450" y="470" fill="#94A3B8" font-family="Arial, sans-serif" font-size="14" text-anchor="middle">
        <tspan fill="#38BDF8" font-weight="bold">Inheritance:</tspan> Dog is an Animal. It gets everything from Animal and adds its own barking logic.
    </text>

</svg>
</div>
`;

const SVG_MULTILEVEL_INHERITANCE_MEMORY = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-[#0F172A] p-6 text-center">
<svg width="100%" height="auto" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl mx-auto">
    <defs>
        <marker id="arrow-blue-ml" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
        </marker>
        <linearGradient id="grad-ml" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1E293B" />
            <stop offset="100%" style="stop-color:#334155" />
        </linearGradient>
    </defs>

    <!-- Stack Section -->
    <rect x="50" y="150" width="180" height="200" rx="15" fill="#1E293B" stroke="#475569" stroke-width="2" />
    <text x="140" y="130" fill="#94A3B8" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold uppercase tracking-widest">Stack</text>
    
    <rect x="70" y="200" width="140" height="50" rx="8" fill="#0F172A" stroke="#38BDF8" stroke-width="2" />
    <text x="140" y="185" fill="#38BDF8" font-family="monospace" font-size="12" text-anchor="middle">Reference Variable</text>
    <text x="140" y="230" fill="#F8FAFC" font-family="monospace" font-size="18" text-anchor="middle" font-weight="bold">p</text>

    <!-- Heap Section -->
    <rect x="350" y="50" width="400" height="400" rx="20" fill="#1E293B" stroke="#475569" stroke-dasharray="8 4" />
    <text x="550" y="35" fill="#94A3B8" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold uppercase tracking-widest">Heap (Memory)</text>

    <!-- Combined Object -->
    <rect x="400" y="80" width="300" height="340" rx="15" fill="url(#grad-ml)" stroke="#38BDF8" stroke-width="2" />
    <text x="550" y="70" fill="#38BDF8" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Puppy Object</text>

    <!-- Animal Part -->
    <rect x="420" y="100" width="260" height="80" rx="10" fill="#0F172A" stroke="#10B981" stroke-width="2" />
    <text x="550" y="135" fill="#10B981" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Animal Part</text>
    <text x="550" y="155" fill="#64748B" font-family="monospace" font-size="10" text-anchor="middle">(Grandparent)</text>

    <!-- Dog Part -->
    <rect x="420" y="195" width="260" height="80" rx="10" fill="#0F172A" stroke="#38BDF8" stroke-width="2" />
    <text x="550" y="230" fill="#38BDF8" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Dog Part</text>
    <text x="550" y="250" fill="#64748B" font-family="monospace" font-size="10" text-anchor="middle">(Parent)</text>

    <!-- Puppy Part -->
    <rect x="420" y="290" width="260" height="80" rx="10" fill="#0F172A" stroke="#6366F1" stroke-width="2" />
    <text x="550" y="325" fill="#6366F1" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Puppy Part</text>
    <text x="550" y="345" fill="#64748B" font-family="monospace" font-size="10" text-anchor="middle">(Child)</text>

    <!-- Connection Arrow -->
    <path d="M210 225 C 300 225 300 250 395 250" stroke="#38BDF8" stroke-width="3" fill="none" marker-end="url(#arrow-blue-ml)" />

    <!-- Order Indicators -->
    <circle cx="390" cy="140" r="12" fill="#10B981" />
    <text x="390" y="145" fill="white" font-family="Arial" font-size="12" text-anchor="middle" font-weight="bold">1</text>
    
    <circle cx="390" cy="235" r="12" fill="#38BDF8" />
    <text x="390" y="240" fill="white" font-family="Arial" font-size="12" text-anchor="middle" font-weight="bold">2</text>

    <circle cx="390" cy="330" r="12" fill="#6366F1" />
    <text x="390" y="335" fill="white" font-family="Arial" font-size="12" text-anchor="middle" font-weight="bold">3</text>
</svg>
</div>
`;

const SVG_SINGLE_INHERITANCE_MEMORY = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-[#0F172A] p-6 text-center">
<svg width="100%" height="auto" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl mx-auto">
    <defs>
        <marker id="arrow-blue-inh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
        </marker>
        <linearGradient id="grad-parent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1E293B" />
            <stop offset="100%" style="stop-color:#334155" />
        </linearGradient>
    </defs>

    <!-- Stack Section -->
    <rect x="50" y="100" width="180" height="200" rx="15" fill="#1E293B" stroke="#475569" stroke-width="2" />
    <text x="140" y="80" fill="#94A3B8" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold uppercase tracking-widest">Stack</text>
    
    <rect x="70" y="150" width="140" height="50" rx="8" fill="#0F172A" stroke="#38BDF8" stroke-width="2" />
    <text x="140" y="135" fill="#38BDF8" font-family="monospace" font-size="12" text-anchor="middle">Reference Variable</text>
    <text x="140" y="180" fill="#F8FAFC" font-family="monospace" font-size="18" text-anchor="middle" font-weight="bold">d</text>

    <!-- Heap Section -->
    <rect x="350" y="50" width="400" height="300" rx="20" fill="#1E293B" stroke="#475569" stroke-dasharray="8 4" />
    <text x="550" y="35" fill="#94A3B8" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold uppercase tracking-widest">Heap (Memory)</text>

    <!-- Combined Object -->
    <rect x="400" y="100" width="300" height="200" rx="15" fill="url(#grad-parent)" stroke="#38BDF8" stroke-width="2" />
    <text x="550" y="90" fill="#38BDF8" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Dog Object</text>

    <!-- Parent Part -->
    <rect x="420" y="120" width="260" height="70" rx="10" fill="#0F172A" stroke="#10B981" stroke-width="2" />
    <text x="550" y="155" fill="#10B981" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Animal Part (Parent)</text>
    <text x="550" y="175" fill="#64748B" font-family="monospace" font-size="10" text-anchor="middle">variables & methods</text>

    <!-- Child Part -->
    <rect x="420" y="210" width="260" height="70" rx="10" fill="#0F172A" stroke="#38BDF8" stroke-width="2" />
    <text x="550" y="245" fill="#38BDF8" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Dog Part (Child)</text>
    <text x="550" y="265" fill="#64748B" font-family="monospace" font-size="10" text-anchor="middle">own features</text>

    <!-- Connection Arrow -->
    <path d="M210 175 C 300 175 300 200 395 200" stroke="#38BDF8" stroke-width="3" fill="none" marker-end="url(#arrow-blue-inh)" />

    <!-- Order Indicators -->
    <circle cx="390" cy="155" r="12" fill="#10B981" />
    <text x="390" y="160" fill="white" font-family="Arial" font-size="12" text-anchor="middle" font-weight="bold">1</text>
    
    <circle cx="390" cy="245" r="12" fill="#38BDF8" />
    <text x="390" y="250" fill="white" font-family="Arial" font-size="12" text-anchor="middle" font-weight="bold">2</text>
</svg>
</div>
`;

const SVG_HIERARCHICAL_INHERITANCE_MEMORY = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-[#0F172A] p-6 text-center">
<svg width="100%" height="auto" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl mx-auto">
    <defs>
        <marker id="arrow-blue-h" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
        </marker>
        <linearGradient id="grad-h" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1E293B" />
            <stop offset="100%" style="stop-color:#334155" />
        </linearGradient>
    </defs>

    <!-- Stack Section -->
    <rect x="50" y="100" width="180" height="300" rx="15" fill="#1E293B" stroke="#475569" stroke-width="2" />
    <text x="140" y="80" fill="#94A3B8" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold uppercase tracking-widest">Stack</text>
    
    <rect x="70" y="150" width="140" height="50" rx="8" fill="#0F172A" stroke="#38BDF8" stroke-width="2" />
    <text x="140" y="135" fill="#38BDF8" font-family="monospace" font-size="12" text-anchor="middle">ref d</text>
    <text x="140" y="180" fill="#F8FAFC" font-family="monospace" font-size="18" text-anchor="middle">@101</text>

    <rect x="70" y="250" width="140" height="50" rx="8" fill="#0F172A" stroke="#10B981" stroke-width="2" />
    <text x="140" y="235" fill="#10B981" font-family="monospace" font-size="12" text-anchor="middle">ref c</text>
    <text x="140" y="280" fill="#F8FAFC" font-family="monospace" font-size="18" text-anchor="middle">@202</text>

    <!-- Heap Section -->
    <rect x="350" y="50" width="400" height="400" rx="20" fill="#1E293B" stroke="#475569" stroke-dasharray="8 4" />
    <text x="550" y="35" fill="#94A3B8" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold uppercase tracking-widest">Heap (Memory)</text>

    <!-- Dog Object -->
    <rect x="400" y="80" width="300" height="150" rx="15" fill="url(#grad-h)" stroke="#38BDF8" stroke-width="2" />
    <text x="410" y="70" fill="#38BDF8" font-family="Arial" font-size="11" font-weight="bold">Dog Obj @101</text>
    <rect x="420" y="100" width="260" height="50" rx="8" fill="#0F172A" stroke="#10B981" stroke-width="1" />
    <text x="550" y="130" fill="#10B981" font-family="Arial" font-size="12" text-anchor="middle">Animal Part (Shared Logic)</text>
    <rect x="420" y="160" width="260" height="50" rx="8" fill="#0F172A" stroke="#38BDF8" stroke-width="1" />
    <text x="550" y="190" fill="#38BDF8" font-family="Arial" font-size="12" text-anchor="middle">Dog Part (barking)</text>

    <!-- Cat Object -->
    <rect x="400" y="250" width="300" height="150" rx="15" fill="url(#grad-h)" stroke="#10B981" stroke-width="2" />
    <text x="410" y="240" fill="#10B981" font-family="Arial" font-size="11" font-weight="bold">Cat Obj @202</text>
    <rect x="420" y="270" width="260" height="50" rx="8" fill="#0F172A" stroke="#10B981" stroke-width="1" />
    <text x="550" y="300" fill="#10B981" font-family="Arial" font-size="12" text-anchor="middle">Animal Part (Shared Logic)</text>
    <rect x="420" y="330" width="260" height="50" rx="8" fill="#0F172A" stroke="#6366F1" stroke-width="1" />
    <text x="550" y="360" fill="#6366F1" font-family="Arial" font-size="12" text-anchor="middle">Cat Part (meowing)</text>

    <!-- Connections -->
    <path d="M210 175 C 280 175 300 155 395 155" stroke="#38BDF8" stroke-width="2" fill="none" marker-end="url(#arrow-blue-h)" />
    <path d="M210 275 C 280 275 300 325 395 325" stroke="#10B981" stroke-width="2" fill="none" marker-end="url(#arrow-blue-h)" />
</svg>
<p class="mt-4 text-xs text-slate-400 italic">Each child object occupies its own unique heap memory space but reuses parent class logic.</p>
</div>
`;

const SVG_HYBRID_STRUCTURE = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white p-8 text-center">
<svg width="100%" height="auto" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg" class="block mx-auto">
    <!-- Filters for shadows -->
    <defs>
        <filter id="shadow-hy" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.1"/>
        </filter>
        <marker id="arrowhead-hy" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#64748B" />
        </marker>
    </defs>

    <!-- Parent Class -->
    <rect x="50" y="30" width="180" height="70" rx="12" fill="#10B981" filter="url(#shadow-hy)" />
    <text x="140" y="65" fill="white" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">Animal</text>
    <text x="140" y="85" fill="#DCFCE7" font-family="Arial" font-size="10" text-anchor="middle" font-weight="bold uppercase tracking-widest">(Class)</text>

    <!-- Interface -->
    <rect x="370" y="30" width="180" height="70" rx="12" fill="#F59E0B" filter="url(#shadow-hy)" />
    <text x="460" y="65" fill="white" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">Pet</text>
    <text x="460" y="85" fill="#FEF3C7" font-family="Arial" font-size="10" text-anchor="middle" font-weight="bold uppercase tracking-widest">(Interface)</text>

    <!-- Hybrid Child -->
    <rect x="210" y="200" width="180" height="80" rx="12" fill="#3B82F6" filter="url(#shadow-hy)" />
    <text x="300" y="240" fill="white" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle">Dog</text>
    <text x="300" y="260" fill="#DBEAFE" font-family="Arial" font-size="10" text-anchor="middle" font-weight="bold uppercase tracking-widest">(Hybrid Child)</text>

    <!-- Connections -->
    <path d="M140 100 V 150 H 300 V 190" stroke="#64748B" stroke-width="2" fill="none" marker-end="url(#arrowhead-hy)" />
    <path d="M460 100 V 150 H 300 V 190" stroke="#64748B" stroke-width="2" fill="none" marker-end="url(#arrowhead-hy)" />
    
    <!-- Relationship Labels -->
    <text x="170" y="140" fill="#059669" font-family="Arial" font-size="11" font-weight="bold italic">extends</text>
    <text x="400" y="140" fill="#D97706" font-family="Arial" font-size="11" font-weight="bold italic">implements</text>
</svg>
<p class="mt-4 text-xs text-slate-500 font-medium">Dog inherits the state of Animal and the behavior of Pet.</p>
</div>
`;

const SVG_HYBRID_INHERITANCE_MEMORY = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-[#0F172A] p-6 text-center">
<svg width="100%" height="auto" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl mx-auto">
    <defs>
        <marker id="arrow-blue-hy" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
        </marker>
        <linearGradient id="grad-hy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1E293B" />
            <stop offset="100%" style="stop-color:#334155" />
        </linearGradient>
    </defs>

    <!-- Stack Section -->
    <rect x="50" y="80" width="180" height="300" rx="15" fill="#1E293B" stroke="#475569" stroke-width="2" />
    <text x="140" y="60" fill="#94A3B8" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold uppercase tracking-widest">Stack</text>
    
    <rect x="70" y="180" width="140" height="60" rx="8" fill="#0F172A" stroke="#38BDF8" stroke-width="2" />
    <text x="140" y="165" fill="#38BDF8" font-family="monospace" font-size="12" text-anchor="middle">ref d</text>
    <text x="140" y="215" fill="#F8FAFC" font-family="monospace" font-size="18" text-anchor="middle">@777</text>

    <!-- Heap Section -->
    <rect x="350" y="50" width="400" height="350" rx="20" fill="#1E293B" stroke="#475569" stroke-dasharray="8 4" />
    <text x="550" y="35" fill="#94A3B8" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold uppercase tracking-widest">Heap (Memory)</text>

    <!-- Hybrid Dog Object -->
    <rect x="400" y="90" width="300" height="260" rx="15" fill="url(#grad-hy)" stroke="#38BDF8" stroke-width="2" />
    <text x="410" y="80" fill="#38BDF8" font-family="Arial" font-size="11" font-weight="bold">Hybrid Dog Obj @777</text>
    
    <!-- Part 1: Animal -->
    <rect x="420" y="110" width="260" height="60" rx="8" fill="#0F172A" stroke="#10B981" stroke-width="1" />
    <text x="550" y="145" fill="#10B981" font-family="Arial" font-size="12" text-anchor="middle" font-weight="bold">Animal Part (extends)</text>
    
    <!-- Part 2: Pet -->
    <rect x="420" y="185" width="260" height="60" rx="8" fill="#0F172A" stroke="#F59E0B" stroke-width="1" />
    <text x="550" y="220" fill="#F59E0B" font-family="Arial" font-size="12" text-anchor="middle" font-weight="bold">Pet Part (implements)</text>
    
    <!-- Part 3: Dog -->
    <rect x="420" y="260" width="260" height="60" rx="8" fill="#0F172A" stroke="#38BDF8" stroke-width="1" />
    <text x="550" y="295" fill="#38BDF8" font-family="Arial" font-size="12" text-anchor="middle" font-weight="bold">Dog Part (Specific)</text>

    <!-- Connection -->
    <path d="M210 210 C 280 210 320 220 395 220" stroke="#38BDF8" stroke-width="3" fill="none" marker-end="url(#arrow-blue-hy)" />
</svg>
<p class="mt-4 text-xs text-slate-400 italic">Hybrid inheritance combines class extension and interface implementation into a single robust object unit.</p>
</div>
`;

const SVG_DIAMOND_PROBLEM = `
<div class="my-8 rounded-2xl overflow-hidden border border-rose-200 shadow-2xl bg-[#0F172A] p-6 text-center">
<svg width="100%" height="auto" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl mx-auto">
    <defs>
        <marker id="arrow-rose-inh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#F43F5E" />
        </marker>
        <filter id="glow-rose">
            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#F43F5E" flood-opacity="0.6" />
        </filter>
    </defs>

    <!-- Class A (Top) -->
    <rect x="350" y="20" width="100" height="50" rx="10" fill="#1E293B" stroke="#94A3B8" />
    <text x="400" y="45" fill="#F8FAFC" font-family="monospace" font-size="16" text-anchor="middle" font-weight="bold">Class A</text>
    <text x="400" y="62" fill="#94A3B8" font-family="monospace" font-size="10" text-anchor="middle">show() { ... }</text>

    <!-- Connections B and C to A -->
    <path d="M350 110 Q 300 80 370 60" stroke="#94A3B8" stroke-width="2" fill="none" />
    <path d="M450 110 Q 500 80 430 60" stroke="#94A3B8" stroke-width="2" fill="none" />

    <!-- Class B (Left) -->
    <rect x="200" y="110" width="120" height="60" rx="12" fill="#1E293B" stroke="#38BDF8" />
    <text x="260" y="135" fill="#7DD3FC" font-family="monospace" font-size="14" text-anchor="middle" font-weight="bold">Class B</text>
    <text x="260" y="155" fill="#38BDF8" font-family="monospace" font-size="10" text-anchor="middle">Overrides show()</text>

    <!-- Class C (Right) -->
    <rect x="480" y="110" width="120" height="60" rx="12" fill="#1E293B" stroke="#38BDF8" />
    <text x="540" y="135" fill="#7DD3FC" font-family="monospace" font-size="14" text-anchor="middle" font-weight="bold">Class C</text>
    <text x="540" y="155" fill="#38BDF8" font-family="monospace" font-size="10" text-anchor="middle">Overrides show()</text>

    <!-- Multiple Inheritance Connections -->
    <path d="M260 170 Q 260 220 360 250" stroke="#F43F5E" stroke-width="3" stroke-dasharray="8 4" fill="none" marker-end="url(#arrow-rose-inh)" />
    <path d="M540 170 Q 540 220 440 250" stroke="#F43F5E" stroke-width="3" stroke-dasharray="8 4" fill="none" marker-end="url(#arrow-rose-inh)" />

    <!-- Class D (Bottom) -->
    <rect x="340" y="240" width="120" height="80" rx="15" fill="#0F172A" stroke="#F43F5E" stroke-width="3" filter="url(#glow-rose)" />
    <text x="400" y="275" fill="#FDA4AF" font-family="monospace" font-size="18" text-anchor="middle" font-weight="bold">Class D</text>
    <text x="400" y="300" fill="#F43F5E" font-family="monospace" font-size="12" text-anchor="middle">EXTENDS B, C?</text>

    <!-- Confusion / Question Marks -->
    <text x="320" y="210" fill="#F43F5E" font-family="Arial" font-size="30" font-weight="bold">?</text>
    <text x="470" y="210" fill="#F43F5E" font-family="Arial" font-size="30" font-weight="bold">?</text>

    <!-- Bottom Message -->
    <rect x="150" y="340" width="500" height="40" rx="10" fill="#F43F5E" fill-opacity="0.1" stroke="#F43F5E" stroke-width="1" />
    <text x="400" y="365" fill="#F43F5E" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">AMBIGUITY: Which show() logic should D inherit?</text>
</svg>
</div>
`;

const SVG_INHERITANCE_TYPES = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-[#0F172A] p-4 text-center">
<svg width="100%" height="auto" viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg" class="block rounded-xl mx-auto">
    <defs>
        <marker id="arrow-blue-inh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
        </marker>
        <marker id="arrow-rose-inh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#F43F5E" />
        </marker>
    </defs>

    <!-- 1. Single -->
    <text x="100" y="40" fill="#94A3B8" font-family="Arial" font-size="14" font-weight="bold">SINGLE</text>
    <rect x="60" y="60" width="80" height="40" rx="8" fill="#1E293B" stroke="#38BDF8" />
    <text x="100" y="85" fill="#F8FAFC" font-family="monospace" font-size="12" text-anchor="middle">Parent</text>
    <path d="M100 100 L 100 130" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow-blue-inh)" />
    <rect x="60" y="140" width="80" height="40" rx="8" fill="#1E293B" stroke="#38BDF8" />
    <text x="100" y="165" fill="#F8FAFC" font-family="monospace" font-size="12" text-anchor="middle">Child</text>

    <!-- 2. Multilevel -->
    <text x="300" y="40" fill="#94A3B8" font-family="Arial" font-size="14" font-weight="bold">MULTILEVEL</text>
    <rect x="260" y="60" width="80" height="40" rx="8" fill="#1E293B" stroke="#38BDF8" />
    <text x="300" y="85" fill="#F8FAFC" font-family="monospace" font-size="12" text-anchor="middle">Grandparent</text>
    <path d="M300 100 L 300 130" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow-blue-inh)" />
    <rect x="260" y="140" width="80" height="40" rx="8" fill="#1E293B" stroke="#38BDF8" />
    <text x="300" y="165" fill="#F8FAFC" font-family="monospace" font-size="12" text-anchor="middle">Parent</text>
    <path d="M300 180 L 300 210" stroke="#38BDF8" stroke-width="2" marker-end="url(#arrow-blue-inh)" />
    <rect x="260" y="220" width="80" height="40" rx="8" fill="#1E293B" stroke="#38BDF8" />
    <text x="300" y="245" fill="#F8FAFC" font-family="monospace" font-size="12" text-anchor="middle">Child</text>

    <!-- 3. Hierarchical -->
    <text x="550" y="40" fill="#94A3B8" font-family="Arial" font-size="14" font-weight="bold">HIERARCHICAL</text>
    <rect x="510" y="60" width="80" height="40" rx="8" fill="#1E293B" stroke="#38BDF8" />
    <text x="550" y="85" fill="#F8FAFC" font-family="monospace" font-size="12" text-anchor="middle">Parent</text>
    <path d="M510 80 Q 450 80 450 140" stroke="#38BDF8" stroke-width="2" fill="none" marker-end="url(#arrow-blue-inh)" />
    <path d="M590 80 Q 650 80 650 140" stroke="#38BDF8" stroke-width="2" fill="none" marker-end="url(#arrow-blue-inh)" />
    <rect x="410" y="140" width="80" height="40" rx="8" fill="#1E293B" stroke="#38BDF8" />
    <text x="450" y="165" fill="#F8FAFC" font-family="monospace" font-size="12" text-anchor="middle">Child A</text>
    <rect x="610" y="140" width="80" height="40" rx="8" fill="#1E293B" stroke="#38BDF8" />
    <text x="650" y="165" fill="#F8FAFC" font-family="monospace" font-size="12" text-anchor="middle">Child B</text>

    <!-- 4. Multiple (No for Classes) -->
    <text x="150" y="350" fill="#F43F5E" font-family="Arial" font-size="14" font-weight="bold">MULTIPLE (NO for classes)</text>
    <rect x="60" y="380" width="80" height="40" rx="8" fill="#1E293B" stroke="#F43F5E" />
    <text x="100" y="405" fill="#F8FAFC" font-family="monospace" font-size="12" text-anchor="middle">Parent A</text>
    <rect x="200" y="380" width="80" height="40" rx="8" fill="#1E293B" stroke="#F43F5E" />
    <text x="240" y="405" fill="#F8FAFC" font-family="monospace" font-size="12" text-anchor="middle">Parent B</text>
    <path d="M100 420 Q 150 480 150 480" stroke="#F43F5E" stroke-width="2" fill="none" marker-end="url(#arrow-rose-inh)" />
    <path d="M240 420 Q 150 480 150 480" stroke="#F43F5E" stroke-width="2" fill="none" marker-end="url(#arrow-rose-inh)" />
    <rect x="110" y="490" width="80" height="40" rx="8" fill="#1E293B" stroke="#F43F5E" />
    <text x="150" y="515" fill="#F8FAFC" font-family="monospace" font-size="12" text-anchor="middle">Child</text>
    <line x1="50" y1="370" x2="300" y2="540" stroke="#F43F5E" stroke-width="2" />
    <line x1="300" y1="370" x2="50" y2="540" stroke="#F43F5E" stroke-width="2" />

    <!-- 5. Hybrid -->
    <text x="600" y="350" fill="#94A3B8" font-family="Arial" font-size="14" font-weight="bold">HYBRID</text>
    <rect x="610" y="380" width="80" height="40" rx="8" fill="#1E293B" stroke="#38BDF8" />
    <text x="650" y="405" fill="#F8FAFC" font-family="monospace" font-size="12" text-anchor="middle">Parent A</text>
    <path d="M610 405 Q 550 405 550 450" stroke="#38BDF8" stroke-width="2" fill="none" marker-end="url(#arrow-blue-inh)" />
    <path d="M690 405 Q 750 405 750 450" stroke="#38BDF8" stroke-width="2" fill="none" marker-end="url(#arrow-blue-inh)" />
    <rect x="510" y="460" width="80" height="40" rx="8" fill="#1E293B" stroke="#38BDF8" />
    <text x="550" y="485" fill="#F8FAFC" font-family="monospace" font-size="12" text-anchor="middle">Child B</text>
    <rect x="710" y="460" width="80" height="40" rx="8" fill="#1E293B" stroke="#38BDF8" />
    <text x="750" y="485" fill="#F8FAFC" font-family="monospace" font-size="12" text-anchor="middle">Child C</text>
    <path d="M550 500 Q 650 560 650 560" stroke="#38BDF8" stroke-width="2" fill="none" marker-end="url(#arrow-blue-inh)" />
    <path d="M750 500 Q 650 560 650 560" stroke="#38BDF8" stroke-width="2" fill="none" marker-end="url(#arrow-blue-inh)" />
    <rect x="610" y="550" width="80" height="40" rx="8" fill="#1E293B" stroke="#38BDF8" />
    <text x="650" y="575" fill="#F8FAFC" font-family="monospace" font-size="12" text-anchor="middle">Grandchild</text>

</svg>
</div>
`;

const SVG_SUPER_KEYWORD = `
<div class="my-8 rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white p-6">
<svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
    <!-- Definitions -->
    <defs>
        <marker id="arrow-super" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#6366F1" />
        </marker>
        <linearGradient id="grad-parent" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#F8FAFC;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#F1F5F9;stop-opacity:1" />
        </linearGradient>
    </defs>

    <!-- Background Grid -->
    <rect width="800" height="450" fill="#FCFCFD" />
    <path d="M0 50 H800 M0 150 H800 M0 250 H800 M0 350 H800 M100 0 V450 M300 0 V450 M500 0 V450 M700 0 V450" stroke="#F1F5F9" stroke-width="1" />

    <!-- 1. Grandparent -->
    <rect x="300" y="40" width="200" height="60" rx="12" fill="#F1F5F9" stroke="#94A3B8" stroke-width="1" stroke-dasharray="4" />
    <text x="400" y="75" fill="#64748B" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">GRANDPARENT CLASS</text>

    <!-- 2. Parent -->
    <rect x="300" y="180" width="200" height="70" rx="12" fill="url(#grad-parent)" stroke="#6366F1" stroke-width="2" />
    <text x="400" y="220" fill="#4338CA" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">PARENT CLASS</text>
    <text x="400" y="240" fill="#6366F1" font-family="Arial" font-size="10" font-weight="bold" text-anchor="middle">IMMEDIATE ANCESTOR</text>

    <!-- 3. Child -->
    <rect x="300" y="340" width="200" height="70" rx="12" fill="#EEF2FF" stroke="#4F46E5" stroke-width="2" />
    <text x="400" y="380" fill="#312E81" font-family="Arial" font-size="16" font-weight="bold" text-anchor="middle">CHILD CLASS</text>

    <!-- super keyword mapping -->
    <path d="M400 340 V260" stroke="#6366F1" stroke-width="3" fill="none" marker-end="url(#arrow-super)" />
    
    <!-- labels -->
    <rect x="350" y="285" width="100" height="30" rx="15" fill="#6366F1" />
    <text x="400" y="305" fill="#FFFFFF" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">super</text>
    
    <text x="520" y="305" fill="#4B5563" font-family="Arial" font-size="12" font-style="italic">Refers to immediate parent</text>

    <!-- Key concepts -->
    <g transform="translate(550, 180)">
       <text x="0" y="0" fill="#1E293B" font-family="Arial" font-size="13" font-weight="bold">super handles:</text>
       <text x="0" y="25" fill="#4B5563" font-family="Arial" font-size="12">1. Parent Variables</text>
       <text x="0" y="45" fill="#4B5563" font-family="Arial" font-size="12">2. Parent Methods</text>
       <text x="0" y="65" fill="#4B5563" font-family="Arial" font-size="12">3. Parent Constructors</text>
    </g>

</svg>
</div>
`;

seedModule({
    moduleTitle: 'Inheritance',
    moduleOrder: 17,
    description: 'extends, types, super.',
    label: 'INHERITANCE',
    lessons: [
        {
            title: 'Introduction to Inheritance',
            duration: '45 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-4\"><strong>Inheritance</strong> is an Object-Oriented Programming (OOP) concept in Java where one class acquires the properties and behaviors (variables and methods) of another class.</p><p class=\"font-bold mb-2\">👉 It represents an “Is-A” relationship.</p><p class=\"mb-4\">Example: Dog is an Animal | Car is a Vehicle</p>" },
                { "type": "section", "title": "2. Core Understanding", "rich": "<p class=\"mb-3 font-medium text-slate-700\">In real-world programming, many objects share common features. Instead of writing the same code again and again, Java allows us to:</p><ul class=\"list-disc pl-5 space-y-2 mb-4 text-sm font-medium text-slate-700\"><li>Create a base class (Parent / Superclass)</li><li>Create a derived class (Child / Subclass)</li></ul><p class=\"font-bold mb-2 text-slate-800 uppercase text-xs tracking-widest pl-5 border-l-4 border-emerald-500\">The child class:</p><ul class=\"list-disc pl-10 space-y-1 mb-4 text-sm font-medium text-slate-700\"><li>inherits fields (variables)</li><li>inherits methods (functions)</li><li>can also add its own features</li></ul>" },
                { "type": "section", "title": "3. Why Inheritance is Important", "rich": `
<p class="mb-4 font-bold text-slate-700 uppercase text-xs tracking-widest pl-5 border-l-4 border-emerald-500">Inheritance solves major problems in software design:</p>

<div class="space-y-6 pl-5">
    <!-- 1. Code Reusability -->
    <div>
        <ul class="list-disc space-y-2">
            <li>
                <span class="font-bold text-slate-900 border-b border-slate-200">Code Reusability:</span>
                <p class="text-sm mt-1 text-slate-700 font-medium leading-relaxed">Inheritance allows us to use fields and methods of an existing class in a new class. This means we don't have to write the same logic again, saving time and effort.</p>
            </li>
        </ul>
        <pre class="p-4 bg-black text-white rounded-lg font-mono text-xs my-3 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Vehicle</span> {
    <span class="text-blue-400">void</span> start() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Vehicle started"</span>);
    }
}
<span class="text-blue-400">class</span> <span class="text-emerald-400">Car</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Vehicle</span> { } <span class="text-emerald-400 font-bold opacity-50">// Reuses start()</span></pre>
        <div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-emerald-500 mb-2">
            <span class="text-emerald-400">Output:</span> Vehicle started
        </div>
        <p class="text-xs italic text-slate-600">Explanation: Car class reuses the start() method from Vehicle without defining its own.</p>
    </div>

    <!-- 2. Reduced Duplication -->
    <div>
        <ul class="list-disc space-y-2">
            <li>
                <span class="font-bold text-slate-900 border-b border-slate-200">Reduced Duplication:</span>
                <p class="text-sm mt-1 text-slate-700 font-medium leading-relaxed">Instead of declaring common variables like 'name' or 'id' in every class, we keep them in one parent class. This keeps the code clean and small.</p>
            </li>
        </ul>
        <pre class="p-4 bg-black text-white rounded-lg font-mono text-xs my-3 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Member</span> {
    <span class="text-emerald-400">String</span> name = <span class="text-sky-300">"User"</span>;
}
<span class="text-blue-400">class</span> <span class="text-emerald-400">Admin</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Member</span> { }
<span class="text-blue-400">class</span> <span class="text-emerald-400">Guest</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Member</span> { }</pre>
        <div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-blue-500 mb-2">
            <span class="text-blue-400">Verification:</span> Both classes share one 'name' field
        </div>
        <p class="text-xs italic text-slate-600">Explanation: One 'name' field serves all member types, avoiding repetitive code.</p>
    </div>

    <!-- 3. Logical Hierarchy -->
    <div>
        <ul class="list-disc space-y-2">
            <li>
                <span class="font-bold text-slate-900 border-b border-slate-200">Logical Hierarchy:</span>
                <p class="text-sm mt-1 text-slate-700 font-medium leading-relaxed">Inheritance helps to organize classes in a way that matches real-world relationships, making it easy to understand how objects relate to each other.</p>
            </li>
        </ul>
        <pre class="p-4 bg-black text-white rounded-lg font-mono text-xs my-3 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Shape</span> { }
<span class="text-blue-400">class</span> <span class="text-emerald-400">Circle</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Shape</span> { }
<span class="text-blue-400">class</span> <span class="text-emerald-400">Square</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Shape</span> { }</pre>
        <div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-indigo-500 mb-2 text-indigo-400">
            Shape ➔ Circle, Square
        </div>
        <p class="text-xs italic text-slate-600">Explanation: It builds a parent-child structure that reflects real-world classification.</p>
    </div>

    <!-- 4. Maintainability -->
    <div>
        <ul class="list-disc space-y-2 pl-5">
            <li>
                <span class="font-bold text-slate-900 border-b border-slate-200">Maintainability:</span>
                <p class="text-sm mt-1 text-slate-700 font-medium leading-relaxed">When logic changes, you only need to update the parent class. The changes will automatically apply to all child classes.</p>
            </li>
        </ul>
        <pre class="p-4 bg-black text-white rounded-lg font-mono text-xs my-3 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Base</span> {
    <span class="text-blue-400">void</span> info() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"V1 Logic"</span>);
    }
}
<span class="text-emerald-400 font-bold opacity-50">// If we change "V1 Logic" to "V2", all children get it.</span></pre>
        <div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-sky-500 mb-2">
            <span class="text-sky-400">Status:</span> All children updated via Parent
        </div>
        <p class="text-xs italic text-slate-600">Explanation: Centralized control makes bug fixing and updates much faster.</p>
    </div>
</div>
` },
                { "type": "section", "title": "4. Basic Syntax", "code": "class Parent {\n    // properties and methods\n}\n\nclass Child extends Parent {\n    // inherits everything from Parent\n}", "rich": "<p class=\"mt-4 font-bold\">👉 extends keyword is used to achieve inheritance</p>" },
                { "type": "section", "title": "5. Simple Example", "code": "class Animal {\n    void eat() {\n        System.out.println(\"Eating...\");\n    }\n}\n\nclass Dog extends Animal {\n    void bark() {\n        System.out.println(\"Barking...\");\n    }\n}" },
                { "type": "section", "title": "Main Class", "code": "public class Main {\n    public static void main(String[] args) {\n        Dog d = new Dog();\n\n        d.eat();   // inherited\n        d.bark();  // own method\n    }\n}", "rich": "<p class=\"font-bold mb-2 uppercase text-xs text-slate-500\">Output:</p><pre class=\"p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-slate-500 mb-6\">Eating...\nBarking...</pre><p class=\"font-bold mb-2 uppercase text-xs text-slate-500 tracking-widest pl-5 border-l-4 border-emerald-500\">Explanation:</p><ul class=\"list-disc pl-10 space-y-1 mb-4 text-sm font-medium text-slate-700\"><li>Dog class inherits from Animal</li><li>eat() is defined in parent ➔ used in child</li><li>bark() is defined in child</li><li>No duplication of eat() method</li></ul>" },
                { "type": "section", "title": "6. Real-World Analogy", "rich": "<p class=\"font-bold mb-3 text-slate-700 italic\">Think of inheritance like a family tree:</p><ul class=\"list-disc pl-5 space-y-2 font-medium text-sm text-slate-600\"><li>Parent ➔ basic traits (eye color, surname)</li><li>Child ➔ inherits traits + adds own identity</li></ul><p class=\"mt-4 font-bold text-slate-800 text-sm\">👉 Same in Java: Parent class (common logic) / Child class (specialized behavior)</p>" },
                { "type": "section", "title": "7. Types of Members Inherited", "rich": "<p class=\"mb-3 font-bold text-slate-700\">A child class can inherit:</p><ul class=\"list-disc pl-5 space-y-2 mb-6 font-medium text-sm text-slate-600\"><li>Variables (fields)</li><li>Methods</li><li>Constructors (indirectly via chaining)</li></ul>" },
                { "type": "section", "title": "8. What is NOT Fully Inherited", "rich": "<p class=\"font-bold mb-2 text-rose-800 uppercase text-xs tracking-widest pl-5 border-l-4 border-rose-500\">What is NOT Fully Inherited:</p><ul class=\"list-disc pl-10 space-y-2 mb-6 text-sm font-medium text-slate-700\"><li>Private members (direct access not allowed)</li><li>Constructors are not inherited directly</li><li>Static members behave differently</li></ul>" },
                { "type": "section", "title": "9. Parent and Child Relationship", "rich": "<div class=\"overflow-x-auto my-4 rounded-xl border border-slate-300 mb-6\"><table class=\"w-full text-sm border-collapse text-left\"><thead><tr class=\"bg-slate-50 font-bold\"><th class=\"p-3 border-b border-slate-300\">Concept</th><th class=\"p-3 border-b border-slate-300\">Meaning</th></tr></thead><tbody><tr><td class=\"p-3 border-b border-r border-slate-300 font-bold\">Parent / Superclass</td><td class=\"p-3 border-b\">Base class</td></tr><tr><td class=\"p-3 border-b border-r border-slate-300 font-bold\">Child / Subclass</td><td class=\"p-3 border-b\">Derived class</td></tr><tr><td class=\"p-3 border-b border-r border-slate-300 font-bold\">extends</td><td class=\"p-3 border-b\">Keyword to inherit</td></tr><tr><td class=\"p-3 border-r border-slate-300 font-bold\">Is-A relationship</td><td class=\"p-3\">Core idea</td></tr></tbody></table></div>" },
                { "type": "section", "title": "10. Memory View (Basic Idea)", "rich": SVG_INHERITANCE_HIERARCHY + "<p class=\"mt-4 font-bold italic\">So internally: Dog Object = Animal part + Dog part</p>" },
                { "type": "section", "title": "11. Key Rules", "rich": "<ul class=\"list-disc pl-5 space-y-3 font-medium text-sm text-slate-700\"><li>Java supports single inheritance (one parent only)</li><li>A class can have multiple children</li><li>Inheritance builds a hierarchical structure</li></ul>" },
                { "type": "section", "title": "12. Common Beginner Mistakes", "rich": `<p class="font-bold mb-2 text-rose-800 uppercase text-xs tracking-widest pl-5 border-l-4 border-rose-500">Common Beginner Mistakes:</p><ul class="list-disc pl-10 space-y-2 text-sm font-medium text-slate-700"><li>Thinking inheritance copies code (it shares behavior, not copy-paste)</li><li>Confusing "Has-A" with "Is-A"</li><li>Trying to access private members directly</li><li>Overusing inheritance instead of composition</li></ul>` },
                { "type": "section", "title": "13. Where Inheritance is Used", "rich": "<ul class=\"list-disc ml-5 space-y-2 mb-6\"><li>Code frameworks (Spring Boot)</li><li>UI component systems</li><li>Game development (Player ➔ Enemy ➔ Boss)</li><li>Library design (Base class ➔ specialized classes)</li></ul>" },
                { "type": "section", "title": "15. Transition to Next Lessons", "rich": "<p class=\"mb-3 font-bold\">After this introduction, next lessons will cover:</p><ul class=\"list-disc ml-5 space-y-2 mb-6\"><li>Types of Inheritance</li><li>super keyword</li><li>Method Overriding</li><li>Runtime Polymorphism</li></ul>" },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"mb-4 italic font-bold\">Verify your inheritance expertise.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Which keyword is used in Java to inherit from another class? <br/><strong>Match Output:</strong> <code>extends</code>", "hints": ["Look at Point 4 or 9."], "points": 10 },
                { "index": 1, "match": "extends", "matchCode": "extends" },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Does a child class inherit 'private' members of a parent class? (Yes/No) <br/><strong>Match Output:</strong> <code>No</code>", "hints": ["Read Point 8: What is NOT Fully Inherited."], "points": 10 },
                { "index": 2, "match": "No", "matchCode": "No" },
                { "type": "task", "value": "3. <strong>Instruction:</strong> In the 'Simple Example', which method is defined in the Parent (Animal)? <br/><strong>Match Output:</strong> <code>eat()</code>", "hints": ["Animal has eat(), Dog adds bark()."], "points": 10 },
                { "index": 3, "match": "eat()", "matchCode": "eat()" }
            ],
            validation: [
                { "index": 1, "match": "extends", "matchCode": "extends" },
                { "index": 2, "match": "No", "matchCode": "No" },
                { "index": 3, "match": "eat()", "matchCode": "eat()" }
            ]
        },
        {
            title: 'Types of Inheritance',
            duration: '55 min',
            sections: [
                { "type": "section", "title": "1. Definition", "rich": "<p class=\"mb-3 font-medium\"><strong>Types of Inheritance</strong> describe the different ways in which classes can be related using inheritance in Java.</p><p class=\"font-bold mb-2\">👉 It defines how one or more classes derive from another class to reuse and extend functionality.</p>" },
                { "type": "section", "title": "2. Core Understanding", "rich": "<ul class=\"list-disc pl-5 space-y-2 mb-4 font-medium\"><li>Inheritance builds a hierarchical structure of classes.</li><li>Depending on how classes are connected, inheritance is categorized into different types.</li></ul><p class=\"font-bold mb-2\">👉 Each type represents a different relationship pattern between classes.</p>" },
                { "type": "section", "title": "3. Types of Inheritance in Java", "rich": SVG_INHERITANCE_TYPES + `<p class="font-bold mb-3 uppercase text-xs tracking-widest text-slate-500">There are 5 main types (conceptually):</p><ul class="list-disc pl-10 space-y-2 font-medium text-sm text-slate-700"><li>1. Single Inheritance</li><li>2. Multilevel Inheritance</li><li>3. Hierarchical Inheritance</li><li>4. Multiple Inheritance (Not supported with classes)</li><li>5. Hybrid Inheritance (Partially supported using interfaces)</li></ul>` },
                { "type": "section", "title": "4. Single Inheritance", "rich": `
<p class="font-bold mb-3 border-l-4 border-emerald-500 pl-3 uppercase text-xs text-slate-500">Definition</p>
<p class="text-sm mb-4 font-medium">A class inherits from only one parent class.</p>
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> eat() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Eating..."</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Dog</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> bark() { <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Barking..."</span>); }
}</pre>
<p class="font-bold mb-2 uppercase text-xs text-slate-500">Main</p>
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">public class</span> <span class="text-emerald-400">Main</span> {
    <span class="text-blue-400">public static void</span> main(<span class="text-emerald-400">String</span>[] args) {
        <span class="text-emerald-400">Dog</span> d = <span class="text-blue-400">new</span> <span class="text-emerald-400">Dog</span>();
        d.eat();
        d.bark();
    }
}</pre>
<div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-emerald-500 mb-4">
    <span class="text-emerald-400">Output:</span><br/>Eating...<br/>Barking...
</div>
<p class="font-bold mb-2 uppercase text-xs text-slate-500">Explanation</p>
<ul class="list-disc pl-5 space-y-1 text-sm font-medium text-slate-700">
    <li>Dog inherits from Animal</li>
    <li>Only one parent ➔ one child</li>
    <li>Most basic and commonly used type</li>
</ul>
` },
                { "type": "section", "title": "5. Multilevel Inheritance", "rich": `
<p class="font-bold mb-3 border-l-4 border-blue-500 pl-3 uppercase text-xs text-slate-500">Definition</p>
<p class="text-sm mb-4 font-medium">A class inherits from another class, which itself inherits from another class. <span class="font-bold">👉 Chain-like structure</span></p>
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> eat() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Eating..."</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Dog</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> bark() { <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Barking..."</span>); }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Puppy</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Dog</span> {
    <span class="text-blue-400">void</span> weep() { <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Weeping..."</span>); }
}</pre>
<p class="font-bold mb-2 uppercase text-xs text-slate-500">Main</p>
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">public class</span> <span class="text-emerald-400">Main</span> {
    <span class="text-blue-400">public static void</span> main(<span class="text-emerald-400">String</span>[] args) {
        <span class="text-emerald-400">Puppy</span> p = <span class="text-blue-400">new</span> <span class="text-emerald-400">Puppy</span>();
        p.eat();
        p.bark();
        p.weep();
    }
}</pre>
<div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-blue-500 mb-4">
    <span class="text-blue-400">Output:</span><br/>Eating...<br/>Barking...<br/>Weeping...
</div>
<p class="font-bold mb-2 uppercase text-xs text-slate-500">Explanation</p>
<p class="text-sm font-bold mb-2">Puppy gets:</p>
<ul class="list-disc pl-5 space-y-1 text-sm font-medium text-slate-700">
    <li>bark() from Dog</li>
    <li>eat() from Animal</li>
    <li class="font-bold italic">Chain: Animal ➔ Dog ➔ Puppy</li>
</ul>
` },
                { "type": "section", "title": "6. Hierarchical Inheritance", "rich": `
<p class="font-bold mb-3 border-l-4 border-indigo-500 pl-3 uppercase text-xs text-slate-500">Definition</p>
<p class="text-sm mb-4 font-medium">Multiple child classes inherit from one parent class.</p>
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> eat() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Eating..."</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Dog</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> bark() { <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Dog barking..."</span>); }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Cat</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> meow() { <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Cat meowing..."</span>); }
}</pre>
<p class="font-bold mb-2 uppercase text-xs text-slate-500">Main</p>
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">public class</span> <span class="text-emerald-400">Main</span> {
    <span class="text-blue-400">public static void</span> main(<span class="text-emerald-400">String</span>[] args) {
        <span class="text-emerald-400">Dog</span> d = <span class="text-blue-400">new</span> <span class="text-emerald-400">Dog</span>();
        <span class="text-emerald-400">Cat</span> c = <span class="text-blue-400">new</span> <span class="text-emerald-400">Cat</span>();
        d.eat();
        d.bark();
        c.eat();
        c.meow();
    }
}</pre>
<div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-indigo-500 mb-4">
    <span class="text-indigo-400">Output:</span><br/>Eating...<br/>Dog barking...<br/>Eating...<br/>Cat meowing...
</div>
<p class="font-bold mb-2 uppercase text-xs text-slate-500">Explanation</p>
<ul class="list-disc pl-5 space-y-1 text-sm font-medium text-slate-700">
    <li>Animal is shared parent</li>
    <li>Dog and Cat reuse common logic</li>
    <li>Avoids duplication</li>
</ul>
` },
                { "type": "section", "title": "7. Multiple Inheritance (Important Concept)", "rich": `
<p class="font-bold mb-3 border-l-4 border-rose-500 pl-3 uppercase text-xs text-slate-500">Definition</p>
<p class="text-sm mb-4 font-medium">A class inherits from more than one parent class. <span class="text-rose-600 font-bold">❌ Java DOES NOT support this with classes</span></p>

<p class="font-bold mb-2">Why? ➔ The Diamond Problem</p>
<p class="text-sm mb-4 font-medium italic">Java designers avoided multiple inheritance with classes to prevent complexity and ambiguity.</p>

${SVG_DIAMOND_PROBLEM}

<div class="mb-6 p-5 bg-rose-50 rounded-2xl border border-rose-200">
    <p class="font-bold text-rose-900 mb-4">The Ambiguity Explained:</p>
    <ul class="list-disc pl-10 space-y-3 text-sm text-rose-800">
        <li><span class="font-bold">Scenario:</span> Class <span class="font-bold">A</span> has a method <span class="font-mono bg-white px-1 rounded">show()</span>.</li>
        <li><span class="font-bold">Overriding:</span> Both Class <span class="font-bold">B</span> and Class <span class="font-bold">C</span> inherit from A and <span class="italic underline">override</span> the <span class="font-mono bg-white px-1 rounded">show()</span> method with different logic.</li>
        <li><span class="font-bold">The Conflict:</span> If Class <span class="font-bold">D</span> tries to inherit from <span class="italic">both</span> B and C, and calls <span class="font-mono bg-white px-1 rounded">obj.show()</span>, the compiler gets confused.</li>
        <li class="pt-2 border-t border-rose-200 font-bold text-rose-600 tracking-tight">👉 ERROR: Should the JVM execute B's version or C's version?</li>
    </ul>
</div>

<p class="font-bold mb-4 text-emerald-700 underline decoration-emerald-300 decoration-2 underline-offset-4">✔ The Java Solution: Interfaces</p>
<p class="text-sm mb-4 font-medium">Java allows a class to implement <span class="font-bold italic">multiple interfaces</span>. Since interfaces only provide method signatures (until Java 8/9 default methods, which have strict resolution rules), there is no ambiguity in state or implementation logic.</p>

<p class="font-bold mb-2 uppercase text-xs text-slate-500">Code Example (Interface approach)</p>
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">interface</span> <span class="text-emerald-400">A</span> {
    <span class="text-blue-400">void</span> show();
}

<span class="text-blue-400">interface</span> <span class="text-emerald-400">B</span> {
    <span class="text-blue-400">void</span> display();
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">C</span> <span class="text-blue-400">implements</span> <span class="text-emerald-400">A</span>, <span class="text-emerald-400">B</span> {
    <span class="text-blue-400">public void</span> show() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"From A"</span>);
    }
    <span class="text-blue-400">public void</span> display() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"From B"</span>);
    }
}</pre>

<p class="font-bold mb-2 uppercase text-xs text-slate-500">Main Execution</p>
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">public class</span> <span class="text-emerald-400">Main</span> {
    <span class="text-blue-400">public static void</span> main(<span class="text-emerald-400">String</span>[] args) {
        <span class="text-emerald-400">C</span> obj = <span class="text-blue-400">new</span> <span class="text-emerald-400">C</span>();
        obj.show();
        obj.display();
    }
}</pre>
<div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-rose-500 mb-4">
    <span class="text-rose-400">Output:</span><br/>From A<br/>From B
</div>
` },
                { "type": "section", "title": "8. Hybrid Inheritance", "rich": `
<p class="font-bold mb-3 border-l-4 border-sky-500 pl-3 uppercase text-xs text-slate-500">Definition</p>
<p class="text-sm mb-4 font-medium">Combination of two or more types of inheritance. <span class="text-rose-600 font-bold">❌ Not supported with classes directly</span> | <span class="text-emerald-600 font-bold">✔ Achieved using interfaces</span></p>

<p class="font-bold mb-2 uppercase text-xs text-slate-500">Example Structure</p>
<pre class="p-4 bg-slate-900 text-slate-300 rounded-lg font-mono text-xs mb-4">
       A
     /   \\
    B     C
     \\   /
       D</pre>

<p class="font-bold mb-2 uppercase text-xs text-slate-500">👉 Combination of:</p>
<ul class="list-disc pl-5 space-y-1 text-sm font-medium text-slate-700">
    <li>Hierarchical (A ➔ B, C)</li>
    <li>Multiple (B, C ➔ D)</li>
</ul>
` },
                { "type": "section", "title": "9. JVM Behavior (Important Insight)", "rich": `
<p class="mb-4 font-bold text-slate-700 uppercase text-xs tracking-widest">When inheritance is used:</p>
<p class="font-mono text-sm mb-3 text-emerald-600">Dog d = new Dog();</p>
<p class="font-bold mb-4">JVM creates:</p>
<div class="p-4 bg-emerald-50 rounded-xl border border-emerald-200 mb-6 font-bold text-emerald-900 border-l-4 border-emerald-500">
    Object = Parent Part + Child Part
</div>

<p class="font-bold mb-2 uppercase text-xs text-slate-500 italic">For multilevel:</p>
<p class="font-bold text-sm bg-slate-100 p-3 rounded-lg border">Puppy Object = Animal + Dog + Puppy</p>
` },
                { "type": "section", "title": "10. Comparison Summary", "rich": `
<div class="overflow-x-auto my-4 rounded-xl border border-slate-300">
<table class="w-full text-sm border-collapse text-left">
<thead><tr class="bg-slate-50 font-bold">
    <th class="p-3 border-b border-r border-slate-300">Type</th>
    <th class="p-3 border-b border-r border-slate-300">Structure</th>
    <th class="p-3 border-b border-slate-300">Supported in Java</th>
</tr></thead>
<tbody>
    <tr><td class="p-3 border-b border-r border-slate-300 font-bold">Single</td><td class="p-3 border-b border-r border-slate-300">One parent ➔ one child</td><td class="p-3 border-b text-emerald-600 font-bold">✅ Yes</td></tr>
    <tr><td class="p-3 border-b border-r border-slate-300 font-bold">Multilevel</td><td class="p-3 border-b border-r border-slate-300">Chain</td><td class="p-3 border-b text-emerald-600 font-bold">✅ Yes</td></tr>
    <tr><td class="p-3 border-b border-r border-slate-300 font-bold">Hierarchical</td><td class="p-3 border-b border-r border-slate-300">One parent ➔ many children</td><td class="p-3 border-b text-emerald-600 font-bold">✅ Yes</td></tr>
    <tr><td class="p-3 border-b border-r border-slate-300 font-bold">Multiple</td><td class="p-3 border-b border-r border-slate-300">Many parents ➔ one child</td><td class="p-3 border-b text-rose-600 font-bold">❌ No (classes)</td></tr>
    <tr><td class="p-3 border-r border-slate-300 font-bold">Hybrid</td><td class="p-3 border-r border-slate-300">Combination</td><td class="p-3 text-sky-600 font-bold italic">✅ (interfaces)</td></tr>
</tbody>
</table>
</div>
` },
                { "type": "section", "title": "11. When to Use Each Type", "rich": `
<ul class="list-disc pl-5 space-y-3 font-medium text-sm text-slate-700">
    <li>Single ➔ Simple reuse</li>
    <li>Multilevel ➔ Step-by-step specialization</li>
    <li>Hierarchical ➔ Shared base logic</li>
    <li>Interfaces ➔ Multiple inheritance needs</li>
</ul>
` },
                { "type": "section", "title": "12. Common Mistakes", "rich": `
<ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
    <li>Overusing multilevel inheritance ➔ hard to maintain</li>
    <li>Confusing multiple inheritance with interfaces</li>
    <li>Creating deep inheritance chains (bad design)</li>
    <li>Ignoring composition where better</li>
</ul>
` },
                { "type": "section", "title": "13. Design Insight (Very Important)", "rich": `
<div class="space-y-4">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-lg">
        <p class="font-bold text-sky-900 text-sm">👉 Use inheritance when:</p>
        <p class="text-sky-800 text-sm italic">There is a true “Is-A” relationship</p>
    </div>
    <div class="p-4 bg-rose-50 border-l-4 border-rose-500 rounded-lg">
        <p class="font-bold text-rose-900 text-sm">👉 Avoid when:</p>
        <p class="text-rose-800 text-sm italic">Relationship is “Has-A” ➔ use composition</p>
    </div>
</div>
` },
                { "type": "section", "title": "15. Final Understanding", "rich": `
<p class="font-bold mb-2">Types of inheritance define:</p>
<ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
    <li>How classes are structured</li>
    <li>How behavior is reused</li>
    <li>How systems scale</li>
</ul>
` },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"mb-4 italic font-bold\">Test your knowledge of inheritance types.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Does a class in Java support inheriting from multiple parent classes? (Yes/No) <br/><strong>Match Output:</strong> <code>No</code>", "hints": ["Read Point 7: Multiple Inheritance."], "points": 10 },
                { "index": 1, "match": "No", "matchCode": "No" },
                { "type": "task", "value": "2. <strong>Instruction:</strong> In Hybrid inheritance, which keyword is used to achieve multiple behavior? <br/><strong>Match Output:</strong> <code>interface</code>", "hints": ["Check Point 7 or 8."], "points": 10 },
                { "index": 2, "match": "interface", "matchCode": "interface" },
                { "type": "task", "value": "3. <strong>Instruction:</strong> What is the structure called when a child inherits from a parent, and that parent inherits from a grandparent? <br/><strong>Match Output:</strong> <code>Multilevel</code>", "hints": ["Read Point 5."], "points": 10 },
                { "index": 3, "match": "Multilevel", "matchCode": "Multilevel" }
            ],
            validation: [
                { "index": 1, "match": "No", "matchCode": "No" },
                { "index": 2, "match": "interface", "matchCode": "interface" },
                { "index": 3, "match": "Multilevel", "matchCode": "Multilevel" }
            ]
        },
        { title: 'Single Inheritance', duration: '28 min', sections: [
                { "type": "section", "title": "1. Definition", "rich": `
<p class="text-sm mb-4 font-medium italic">Single Inheritance is a type of inheritance in Java where one child class inherits from exactly one parent class.</p>
<p class="mb-4">👉 It represents a simple <span class="font-bold">“Is-A”</span> relationship.</p>
<p class="font-bold mb-2 uppercase text-xs text-slate-500 tracking-wider">Example:</p>
<ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
    <li>Dog <span class="italic text-slate-900 border-b border-slate-200">is a</span> Animal</li>
    <li>Car <span class="italic text-slate-900 border-b border-slate-200">is a</span> Vehicle</li>
</ul>
` },
                { "type": "section", "title": "2. Core Understanding", "rich": `
<p class="text-sm mb-4">In real-world systems, many entities share common features.</p>
<p class="mb-4 italic font-bold">Instead of rewriting the same code:</p>
<ul class="list-disc pl-5 space-y-3 mb-6 text-sm font-medium text-slate-700">
    <li>We define a <span class="font-bold text-slate-900">parent class</span> (common logic)</li>
    <li>And <span class="font-bold text-slate-900">extend</span> it into a child class (specific behavior)</li>
</ul>
<p class="font-bold mb-2">👉 This allows:</p>
<div class="grid grid-cols-1 md:grid-cols-3 gap-3">
    <div class="p-3 bg-white border-l-4 border-emerald-500 shadow-sm rounded-r-lg">
        <p class="font-bold text-xs uppercase text-emerald-700">Code reuse</p>
    </div>
    <div class="p-3 bg-white border-l-4 border-blue-500 shadow-sm rounded-r-lg">
        <p class="font-bold text-xs uppercase text-blue-700">Clean structure</p>
    </div>
    <div class="p-3 bg-white border-l-4 border-indigo-500 shadow-sm rounded-r-lg">
        <p class="font-bold text-xs uppercase text-indigo-700">Logical hierarchy</p>
    </div>
</div>
` },
                { "type": "section", "title": "3. Syntax", "rich": `
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Parent</span> {
    <span class="text-slate-500">// properties and methods</span>
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Child</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Parent</span> {
    <span class="text-slate-500">// inherits Parent</span>
}</pre>
<p class="text-sm mb-4">👉 <span class="font-mono bg-slate-100 px-1 rounded font-bold text-blue-700">extends</span> keyword is used to inherit</p>
` },
                { "type": "section", "title": "4. Basic Example (Foundation Level)", "rich": `
<p class="font-bold mb-2 uppercase text-xs text-slate-500">Base & Derived Classes</p>
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> eat() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Animal is eating"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Dog</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> bark() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Dog is barking"</span>);
    }
}</pre>

<p class="font-bold mb-2 uppercase text-xs text-slate-500">Main Execution</p>
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">public class</span> <span class="text-emerald-400">Main</span> {
    <span class="text-blue-400">public static void</span> main(<span class="text-emerald-400">String</span>[] args) {
        <span class="text-emerald-400">Dog</span> d = <span class="text-blue-400">new</span> <span class="text-emerald-400">Dog</span>();

        d.eat();   <span class="text-slate-500">// inherited</span>
        d.bark();  <span class="text-slate-500">// own</span>
    }
}</pre>

<div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-emerald-500 mb-6">
    <span class="text-emerald-400">Output:</span><br/>Animal is eating<br/>Dog is barking
</div>

<p class="font-bold mb-2 text-slate-900 underline decoration-emerald-500 underline-offset-4 decoration-2">Explanation:</p>
<ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
    <li>Dog <span class="font-bold uppercase text-[10px] bg-slate-100 px-1 rounded">inherits</span> from Animal</li>
    <li><span class="font-mono bg-white px-1 rounded">eat()</span> is reused (no duplication)</li>
    <li><span class="font-mono bg-white px-1 rounded">bark()</span> is child-specific</li>
</ul>
` },
                { "type": "section", "title": "5. Memory Representation (JVM View)", "rich": `
<p class="text-sm mb-4 font-medium italic">When you create a child object, the JVM allocates memory for both the Parent and Child parts as a single unit.</p>
<pre class="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-xs mb-4">Dog d = new Dog();</pre>

${SVG_SINGLE_INHERITANCE_MEMORY}

<p class="font-bold mb-2">👉 JVM behavior:</p>
<ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
    <li><span class="text-slate-900 font-bold tracking-tight text-xs uppercase underline decoration-slate-200">1. Parent Part:</span> Created first in memory.</li>
    <li><span class="text-slate-900 font-bold tracking-tight text-xs uppercase underline decoration-slate-200">2. Child Part:</span> Added next to complete the object.</li>
</ul>
<p class="mt-4 font-bold text-center border-t border-slate-100 pt-4 tracking-tighter text-blue-900 italic">So object = Parent + Child</p>
` },
                { "type": "section", "title": "6. Constructor Flow (Important)", "rich": `
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-emerald-400">Animal</span>() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Animal constructor"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Dog</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-emerald-400">Dog</span>() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Dog constructor"</span>);
    }
}</pre>

<p class="font-bold mb-2 uppercase text-xs text-slate-500">Main Execution</p>
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">public class</span> <span class="text-emerald-400">Main</span> {
    <span class="text-blue-400">public static void</span> main(<span class="text-emerald-400">String</span>[] args) {
        <span class="text-blue-400">new</span> <span class="text-emerald-400">Dog</span>();
    }
}</pre>

<div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-blue-500 mb-6">
    <span class="text-blue-400">Output:</span><br/>Animal constructor<br/>Dog constructor
</div>

<p class="font-bold mb-2 text-slate-900 underline decoration-blue-500 underline-offset-4 decoration-2">Explanation:</p>
<p class="mb-2">👉 Execution order:</p>
<ul class="list-disc pl-5 space-y-2 text-sm font-medium">
    <li>Parent constructor runs <span class="font-bold text-slate-900 underline decoration-slate-200">first</span></li>
    <li>Child constructor runs <span class="font-bold text-slate-900 underline decoration-slate-200">next</span></li>
</ul>
<p class="mt-3 font-bold text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 italic tracking-tight">✔ This happens automatically via super() call at the first line of the child constructor.</p>
` },
                { "type": "section", "title": "7. Method Inheritance", "rich": `
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> sound() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Animal sound"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Dog</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Animal</span> { }

<span class="text-blue-400">public class</span> <span class="text-emerald-400">Main</span> {
    <span class="text-blue-400">public static void</span> main(<span class="text-emerald-400">String</span>[] args) {
        <span class="text-emerald-400">Dog</span> d = <span class="text-blue-400">new</span> <span class="text-emerald-400">Dog</span>();
        d.sound();
    }
}</pre>

<div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-indigo-500 mb-4">
    <span class="text-indigo-400">Output:</span><br/>Animal sound
</div>
<p class="text-sm font-bold bg-indigo-50 p-2 rounded border border-indigo-100 text-indigo-900">👉 Rule: Child uses parent method directly if not overridden.</p>
` },
                { "type": "section", "title": "8. Method Overriding (Advanced Behavior)", "rich": `
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> sound() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Animal sound"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Dog</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> sound() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Dog barks"</span>);
    }
}</pre>

<p class="font-bold mb-2 uppercase text-xs text-slate-500">Main Execution</p>
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">public class</span> <span class="text-emerald-400">Main</span> {
    <span class="text-blue-400">public static void</span> main(<span class="text-emerald-400">String</span>[] args) {
        <span class="text-emerald-400">Dog</span> d = <span class="text-blue-400">new</span> <span class="text-emerald-400">Dog</span>();
        d.sound();
    }
}</pre>

<div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-rose-500 mb-6">
    <span class="text-rose-400">Output:</span><br/>Dog barks
</div>

<p class="font-bold mb-2 text-slate-900 underline decoration-rose-500 underline-offset-4 decoration-2">Explanation:</p>
<ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
    <li>Child <span class="font-bold text-slate-900 underline decoration-slate-200">overrides</span> parent method logic</li>
    <li>Runtime decides which method to call based on the object</li>
    <li class="pt-2 border-t border-slate-100 font-bold italic tracking-tight text-xs uppercase text-slate-300">👉 This leads to Runtime Polymorphism</li>
</ul>
` },
                { "type": "section", "title": "9. Accessing Parent Members", "rich": `
<p class="font-bold mb-3 border-l-4 border-emerald-500 pl-3 uppercase text-xs text-slate-500">Using inherited members directly:</p>
<pre class="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-xs mb-4">d.eat();</pre>

<p class="font-bold mb-3 border-l-4 border-blue-500 pl-3 uppercase text-xs text-slate-500">Using super keyword (Explicitly):</p>
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Dog</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> show() {
        <span class="text-blue-400">super</span>.eat(); <span class="text-slate-500">// Calls parent version</span>
    }
}</pre>
` },
                { "type": "section", "title": "10. Access Modifiers Behavior", "rich": `
<div class="overflow-hidden border border-slate-200 rounded-xl mb-6 shadow-sm">
<table class="w-full text-xs text-left">
    <thead class="bg-slate-50 font-bold uppercase tracking-widest text-slate-600">
        <tr>
            <th class="p-3">Modifier</th>
            <th class="p-3">Inherited?</th>
            <th class="p-3">Accessible in Child</th>
        </tr>
    </thead>
    <tbody class="divide-y divide-slate-100">
        <tr>
            <td class="p-3 font-bold text-slate-900 uppercase">public</td>
            <td class="p-3 text-emerald-600 font-bold">✅ Yes</td>
            <td class="p-3 text-emerald-600 font-bold">✅ Yes</td>
        </tr>
        <tr class="bg-slate-50/50">
            <td class="p-3 font-bold text-slate-900 uppercase">protected</td>
            <td class="p-3 text-emerald-600 font-bold">✅ Yes</td>
            <td class="p-3 text-emerald-600 font-bold">✅ Yes</td>
        </tr>
        <tr>
            <td class="p-3 font-bold text-slate-900 uppercase">default</td>
            <td class="p-3 text-emerald-600 font-bold underline">✅ Yes (same package)</td>
            <td class="p-3 text-emerald-600 font-bold">✅ Yes</td>
        </tr>
        <tr class="bg-rose-50/30">
            <td class="p-3 font-bold text-slate-900 uppercase italic">private</td>
            <td class="p-3 text-rose-600 font-bold">❌ No</td>
            <td class="p-3 text-rose-600 font-bold">❌ No</td>
        </tr>
    </tbody>
</table>
</div>
` },
                { "type": "section", "title": "11. Real-World Example (Better Understanding)", "rich": `
<p class="font-bold mb-2 uppercase text-xs text-slate-500 tracking-wider">Automotive Logic</p>
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Vehicle</span> {
    <span class="text-blue-400">void</span> start() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Vehicle starts"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Car</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Vehicle</span> {
    <span class="text-blue-400">void</span> drive() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Car drives"</span>);
    }
}</pre>

<p class="font-bold mb-2 uppercase text-xs text-slate-500">Main Execution</p>
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">public class</span> <span class="text-emerald-400">Main</span> {
    <span class="text-blue-400">public static void</span> main(<span class="text-emerald-400">String</span>[] args) {
        <span class="text-emerald-400">Car</span> c = <span class="text-blue-400">new</span> <span class="text-emerald-400">Car</span>();
        c.start(); <span class="text-slate-500">// Inherited method</span>
        c.drive(); <span class="text-slate-500">// Specific method</span>
    }
}</pre>

<div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-sky-500 mb-4">
    <span class="text-sky-400">Output:</span><br/>Vehicle starts<br/>Car drives
</div>
` },
                { "type": "section", "title": "12. Advantages of Single Inheritance", "rich": `
<ul class="list-disc pl-5 space-y-3 font-medium text-sm text-slate-700">
    <li>Code reuse</li>
    <li>Easy to understand</li>
    <li>Simple structure</li>
    <li>Less complexity</li>
    <li>Easy debugging</li>
</ul>
` },
                { "type": "section", "title": "13. Limitations", "rich": `
<ul class="list-disc pl-5 space-y-3 font-medium text-sm text-slate-700">
    <li>Only one parent allowed</li>
    <li>Cannot combine multiple behaviors directly</li>
    <li>Overuse leads to rigid design (Strong Coupling)</li>
</ul>
` },
                { "type": "section", "title": "14. Common Mistakes", "rich": `
<ul class="list-disc pl-5 space-y-4 font-medium text-sm text-slate-700">
    <li><span class="font-bold text-slate-900 border-b border-slate-200">1. Misinterpreting Relationships:</span> Confusing inheritance with composition (“Is-A” vs “Has-A”).</li>
    <li><span class="font-bold text-slate-900 border-b border-slate-200">2. Private Pitfall:</span> Trying to access private members of the parent class directly.</li>
    <li><span class="font-bold text-slate-900 border-b border-slate-200">3. super() Missing:</span> Forgetting constructor chaining is essential for proper object state.</li>
    <li><span class="font-bold text-slate-900 border-b border-slate-200">4. Override Errors:</span> Incorrectly overriding methods (misspelling name or changing parameters).</li>
    <li><span class="font-bold text-slate-900 border-b border-slate-200">5. Deep Hierarchies:</span> Creating too many levels (Animal -> Mammal -> Dog -> Puppy -> ...).</li>
</ul>
` },
                { "type": "section", "title": "15. Design Insight (Very Important)", "rich": `
<div class="p-5 border-2 border-dashed border-emerald-200 rounded-2xl bg-emerald-50/30">
    <p class="font-bold mb-3 text-slate-800 uppercase tracking-widest text-xs">👉 Use Single Inheritance when:</p>
    <ul class="list-disc pl-5 space-y-2 mb-6 text-sm font-medium text-slate-700">
        <li>Clear <span class="italic underline">Is-A</span> relationship exists</li>
        <li>Child is a <span class="font-bold text-slate-900 border-b border-slate-200">Specialized Version</span> of parent</li>
    </ul>

    <p class="font-bold mb-3 text-slate-800 uppercase tracking-widest text-xs">👉 Avoid when:</p>
    <ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
        <li>Relationship is <span class="italic underline text-rose-600">Has-A</span> ➔ use <span class="font-bold text-slate-900 border-b border-slate-200">Composition</span></li>
        <li>Behavior is not strongly related</li>
    </ul>
</div>
` },
                { "type": "section", "title": "16. Interview-Level Insight", "rich": `
<ul class="list-disc pl-5 space-y-4 text-sm font-medium text-slate-700">
    <li>
        <span class="font-bold text-slate-900 border-b border-slate-200">Core Rule:</span>
        <p class="mt-1">Java supports only single inheritance for classes.</p>
    </li>
    <li>
        <span class="font-bold text-slate-900 border-b border-slate-200">Benefit:</span>
        <p class="mt-1 italic underline decoration-slate-200">This restriction prevents ambiguity (Diamond Problem) and encourages better object-oriented design.</p>
    </li>
</ul>
` },
                { "type": "section", "title": "17. Final Understanding", "rich": `
<div class="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl">
    <p class="text-sm text-emerald-900 font-medium italic">Single Inheritance is the simplest form of inheritance, acting as the foundation for all advanced OOP concepts. It is used to build clear, maintainable, and predictable systems.</p>
</div>
` },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"mb-4 italic font-bold\">Apply Single Inheritance principles in practice.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Which keyword is essential in Java to inherit from a class? <br/><strong>Match Output:</strong> <code>extends</code>", "hints": ["Check Point 3: Syntax."], "points": 10 },
                { "index": 1, "match": "extends", "matchCode": "extends" },
                { "type": "task", "value": "2. <strong>Instruction:</strong> In what order do constructors run in single inheritance? (Parent first / Child first) <br/><strong>Match Output:</strong> <code>Parent first</code>", "hints": ["Check Point 6: Constructor Flow."], "points": 10 },
                { "index": 2, "match": "Parent first", "matchCode": "Parent first" },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Can a class inherit from two parent classes in Java? (Yes/No) <br/><strong>Match Output:</strong> <code>No</code>", "hints": ["Read Point 17: Interview Insight."], "points": 10 },
                { "index": 3, "match": "No", "matchCode": "No" }
            ],
            validation: [
                { "index": 1, "match": "extends", "matchCode": "extends" },
                { "index": 2, "match": "Parent first", "matchCode": "Parent first" },
                { "index": 3, "match": "No", "matchCode": "No" }
            ]
        },
        { title: 'Multilevel Inheritance', duration: '30 min', sections: [
                { "type": "section", "title": "1. Definition", "rich": `
<p class="text-sm mb-4 font-medium italic">Multilevel Inheritance is a type of inheritance in Java where a class is derived from another class, and that class is further derived from another class.</p>
<p class="mb-4">👉 It forms a <span class="font-bold underline decoration-blue-500">chain</span> of inheritance.</p>
<p class="font-bold mb-2 uppercase text-xs text-slate-500 tracking-wider">Example:</p>
<p class="text-sm font-bold bg-slate-50 p-2 rounded border border-slate-100 flex items-center justify-center">
    Grandparent <span class="mx-2 text-blue-500">→</span> Parent <span class="mx-2 text-blue-500">→</span> Child
</p>
` },
                { "type": "section", "title": "2. Core Understanding", "rich": `
<p class="text-sm mb-4">In multilevel inheritance, properties and behaviors are passed level by level down the chain.</p>
<ul class="list-disc pl-5 space-y-3 mb-6 text-sm font-medium text-slate-700">
    <li>Each class acts as both <span class="font-bold text-slate-900">child</span> and <span class="font-bold text-slate-900">parent</span> (except the root and leaf).</li>
    <li>Final child class gets access to <span class="font-bold text-slate-900 underline decoration-slate-300">all ancestors</span>.</li>
</ul>
<p class="font-bold mb-2 text-center text-xs uppercase tracking-widest text-slate-400">👉 It builds a hierarchical chain</p>
` },
                { "type": "section", "title": "3. Structure", "rich": `
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">A</span> { } <span class="text-slate-500">// Grandparent</span>

<span class="text-blue-400">class</span> <span class="text-emerald-400">B</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">A</span> { } <span class="text-slate-500">// Parent</span>

<span class="text-blue-400">class</span> <span class="text-emerald-400">C</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">B</span> { } <span class="text-slate-500">// Child</span></pre>
<p class="text-sm font-bold text-center italic text-blue-900 bg-blue-50 p-2 rounded">Flow: A ➔ B ➔ C</p>
` },
                { "type": "section", "title": "4. Basic Example", "rich": `
<p class="font-bold mb-2 uppercase text-xs text-slate-500">Class Chain</p>
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> eat() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Animal is eating"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Dog</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> bark() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Dog is barking"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Puppy</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Dog</span> {
    <span class="text-blue-400">void</span> weep() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Puppy is weeping"</span>);
    }
}</pre>

<p class="font-bold mb-2 uppercase text-xs text-slate-500">Main Execution</p>
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">public class</span> <span class="text-emerald-400">Main</span> {
    <span class="text-blue-400">public static void</span> main(<span class="text-emerald-400">String</span>[] args) {
        <span class="text-emerald-400">Puppy</span> p = <span class="text-blue-400">new</span> <span class="text-emerald-400">Puppy</span>();

        p.eat();   <span class="text-slate-500">// from Animal</span>
        p.bark();  <span class="text-slate-500">// from Dog</span>
        p.weep();  <span class="text-slate-500">// own method</span>
    }
}</pre>

<div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-emerald-500 mb-6">
    <span class="text-emerald-400">Output:</span><br/>Animal is eating<br/>Dog is barking<br/>Puppy is weeping
</div>
` },
                { "type": "section", "title": "5. Explanation", "rich": `
<ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700 mb-4">
    <li><span class="font-bold text-slate-900 underline decoration-slate-200">Animal</span>: Base class (Grandparent)</li>
    <li><span class="font-bold text-slate-900 underline decoration-slate-200">Dog</span>: Inherits Animal (Parent)</li>
    <li><span class="font-bold text-slate-900 underline decoration-slate-200">Puppy</span>: Inherits Dog (Child)</li>
</ul>
<p class="font-bold mb-2 uppercase text-xs text-slate-500">👉 So Puppy gets:</p>
<div class="space-y-2">
    <p class="p-2 bg-white border border-slate-100 rounded text-xs font-mono"><span class="text-slate-900 font-bold">eat()</span> from Animal</p>
    <p class="p-2 bg-white border border-slate-100 rounded text-xs font-mono"><span class="text-slate-900 font-bold">bark()</span> from Dog</p>
    <p class="p-2 bg-white border border-slate-100 rounded text-xs font-mono"><span class="text-slate-900 font-bold">weep()</span> its own</p>
</div>
` },
                { "type": "section", "title": "6. Memory Representation (JVM View)", "rich": `
<p class="text-sm mb-4 font-medium italic">When an object is created in a multilevel hierarchy, the JVM stacks all ancestor parts into a single object unit.</p>
<pre class="p-3 bg-slate-50 border border-slate-200 rounded font-mono text-xs mb-4">Puppy p = new Puppy();</pre>

${SVG_MULTILEVEL_INHERITANCE_MEMORY}

<p class="font-bold mb-2 uppercase text-[10px] tracking-widest text-slate-400 text-center">✔ Object Creation Order</p>
<ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
    <li>Parent parts are created <span class="font-bold text-slate-900 underline decoration-slate-200">First</span></li>
    <li>Then Child parts are added <span class="font-bold text-slate-900 underline decoration-slate-200">Next</span></li>
</ul>
` },
                { "type": "section", "title": "7. Constructor Execution Flow (Very Important)", "rich": `
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-emerald-400">Animal</span>() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Animal Constructor"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Dog</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-emerald-400">Dog</span>() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Dog Constructor"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Puppy</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Dog</span> {
    <span class="text-emerald-400">Puppy</span>() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Puppy Constructor"</span>);
    }
}</pre>

<div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-indigo-500 mb-6">
    <span class="text-indigo-400">Output:</span><br/>Animal Constructor<br/>Dog Constructor<br/>Puppy Constructor
</div>

<p class="font-bold mb-2 text-slate-900 underline decoration-indigo-500 underline-offset-4 decoration-2">Explanation:</p>
<p class="mb-2 uppercase text-xs font-bold text-slate-500">Execution happens top ➔ down:</p>
<ol class="list-decimal pl-5 space-y-1 text-sm font-medium">
    <li>Animal constructor</li>
    <li>Dog constructor</li>
    <li>Puppy constructor</li>
</ol>
<p class="mt-4 p-3 bg-indigo-50 rounded-lg text-xs font-bold text-indigo-900 border border-indigo-100 italic">👉 This is due to automatic super() calls inserted by the compiler at the first line of each constructor.</p>
` },
                { "type": "section", "title": "8. Method Inheritance Across Levels", "rich": `
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">A</span> {
    <span class="text-blue-400">void</span> showA() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"A method"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">B</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">A</span> {
    <span class="text-blue-400">void</span> showB() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"B method"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">C</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">B</span> { }

<span class="text-blue-400">public class</span> <span class="text-emerald-400">Main</span> {
    <span class="text-blue-400">public static void</span> main(<span class="text-emerald-400">String</span>[] args) {
        <span class="text-emerald-400">C</span> obj = <span class="text-blue-400">new</span> <span class="text-emerald-400">C</span>();
        obj.showA(); <span class="text-slate-500">// Grandparent method</span>
        obj.showB(); <span class="text-slate-500">// Parent method</span>
    }
}</pre>

<div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-emerald-500 mb-4">
    <span class="text-emerald-400">Output:</span><br/>A method<br/>B method
</div>
<p class="p-2 border border-blue-100 bg-blue-50 rounded text-center text-xs font-bold text-blue-900">👉 Rule: Child class accesses all inherited methods down the chain.</p>
` },
                { "type": "section", "title": "9. Method Overriding in Multilevel", "rich": `
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">A</span> {
    <span class="text-blue-400">void</span> show() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"A version"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">B</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">A</span> {
    <span class="text-blue-400">void</span> show() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"B version"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">C</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">B</span> {
    <span class="text-blue-400">void</span> show() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"C version"</span>);
    }
}</pre>

<div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-rose-500 mb-6 mt-4">
    <span class="text-rose-400">Output:</span><br/>C version
</div>

<p class="font-bold mb-2 text-slate-900 underline decoration-rose-500 underline-offset-4 decoration-2">Explanation:</p>
<ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
    <li>Method is <span class="font-bold text-slate-900 underline decoration-slate-200">overridden</span> at each level.</li>
    <li>Final call uses the <span class="font-bold underline decoration-slate-300">lowest child version</span> available.</li>
    <li class="pt-2 italic font-bold text-xs text-slate-500 uppercase tracking-tighter">👉 This is Runtime Polymorphism</li>
</ul>
` },
                { "type": "section", "title": "10. Accessing Parent Methods using super", "rich": `
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">B</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">A</span> {
    <span class="text-blue-400">void</span> show() {
        <span class="text-blue-400">super</span>.show();
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"B"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">C</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">B</span> {
    <span class="text-blue-400">void</span> show() {
        <span class="text-blue-400">super</span>.show();
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"C"</span>);
    }
}</pre>

<div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-sky-500 mb-4">
    <span class="text-sky-400">Output:</span><br/>A<br/>B<br/>C
</div>
<p class="text-sm font-bold text-slate-600 bg-slate-50 p-2 rounded italic">👉 super allows access to the immediate previous level.</p>
` },
                { "type": "section", "title": "11. Advantages", "rich": `
<ul class="list-disc pl-5 space-y-3 font-medium text-sm text-slate-700">
    <li>Reuse code across multiple levels</li>
    <li>Builds strong hierarchical models</li>
    <li>Reduces duplication (DRY)</li>
    <li>Easy extension of functionality</li>
</ul>
` },
                { "type": "section", "title": "12. Disadvantages", "rich": `
<ul class="list-disc pl-5 space-y-3 font-medium text-sm text-slate-700">
    <li>Hard to maintain if too deep</li>
    <li>Debugging becomes complex (Tracing chain)</li>
    <li>Tight coupling (Rigid dependencies)</li>
    <li>Changes in Grandparent affect all levels below</li>
</ul>
` },
                { "type": "section", "title": "13. Common Mistakes", "rich": `
<div class="space-y-3">
    <div class="p-3 border-l-4 border-rose-300 bg-rose-50/50 rounded-r-lg">
        <p class="text-sm font-bold text-rose-700 uppercase tracking-tighter mb-1">Deep Inheritance Chains</p>
        <p class="text-xs text-slate-600">Creating 5+ levels of inheritance (Over-engineering).</p>
    </div>
    <div class="p-3 border-l-4 border-rose-300 bg-rose-50/50 rounded-r-lg">
        <p class="text-sm font-bold text-rose-700 uppercase tracking-tighter mb-1">Overriding Blindly</p>
        <p class="text-xs text-slate-600">Overriding without understanding the original behavior in parents.</p>
    </div>
    <div class="p-3 border-l-4 border-rose-300 bg-rose-50/50 rounded-r-lg">
        <p class="text-sm font-bold text-rose-700 uppercase tracking-tighter mb-1">Constructor Confusion</p>
        <p class="text-xs text-slate-600">Forgetting that all ancestor constructors must run in sequence.</p>
    </div>
</div>
` },
                { "type": "section", "title": "14. Design Insight (Very Important)", "rich": `
<div class="p-5 border-2 border-dashed border-emerald-200 rounded-2xl bg-emerald-50/30">
    <p class="font-bold mb-3 text-slate-800 uppercase tracking-widest text-xs">👉 Use Multilevel Inheritance when:</p>
    <ul class="list-disc pl-5 space-y-2 mb-6 text-sm font-medium text-slate-700">
        <li>Clear <span class="font-bold underline decoration-slate-300">step-by-step specialization</span> exists.</li>
    </ul>
    <p class="text-xs font-bold mb-1 uppercase text-slate-400 tracking-tighter">Example:</p>
    <p class="text-sm font-bold italic text-slate-700 bg-white p-2 border border-slate-100 rounded inline-block">Vehicle ➔ Car ➔ ElectricCar</p>

    <p class="font-bold mb-3 mt-6 text-slate-800 uppercase tracking-widest text-xs">👉 Avoid when:</p>
    <ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
        <li>Hierarchy becomes <span class="font-bold text-slate-900 italic underline decoration-slate-200">too deep</span> (>3 levels).</li>
        <li>Classes become tightly and unnecessarily dependent.</li>
    </ul>
</div>
` },
                { "type": "section", "title": "15. Real-World Example", "rich": `
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Person</span> {
    <span class="text-blue-400">void</span> walk() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Person walks"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Employee</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Person</span> {
    <span class="text-blue-400">void</span> work() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Employee works"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Manager</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Employee</span> {
    <span class="text-blue-400">void</span> manage() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Manager manages"</span>);
    }
}</pre>

<div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-indigo-500 mb-4">
    <span class="text-indigo-400">Output:</span><br/>Person walks<br/>Employee works<br/>Manager manages
</div>
` },
                { "type": "section", "title": "16. Final Understanding", "rich": `
<div class="p-5 bg-indigo-50 border border-indigo-200 rounded-2xl shadow-inner">
    <p class="text-sm text-indigo-900 font-medium italic">Multilevel Inheritance creates a clear chain of classes, passing behavior through levels to build complex systems step-by-step while maintaining a rigid hierarchy.</p>
</div>
` },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"mb-4 italic font-bold\">Trace the Multilevel inheritance chain.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> If Class C extends B and B extends A, which class is the Grandparent? <br/><strong>Match Output:</strong> <code>A</code>", "hints": ["Read Point 3: Structure."], "points": 10 },
                { "index": 1, "match": "A", "matchCode": "A" },
                { "type": "task", "value": "2. <strong>Instruction:</strong> In what order do constructors run in a chain A➔B➔C? <br/><strong>Match Output:</strong> <code>Animal Dog Puppy</code>", "hints": ["Check Point 7: Constructor Flow. Use the names from the Puppy example."], "points": 10 },
                { "index": 2, "match": "Animal.*Dog.*Puppy", "matchCode": "Animal Dog Puppy" },
                { "type": "task", "value": "3. <strong>Instruction:</strong> Does a multilevel hierarchy allow reusing code from the grandparent in the grandchild? (Yes/No) <br/><strong>Match Output:</strong> <code>Yes</code>", "hints": ["Read Point 8: Method Inheritance."], "points": 10 },
                { "index": 3, "match": "Yes", "matchCode": "Yes" }
            ],
            validation: [
                { "index": 1, "match": "A", "matchCode": "A" },
                { "index": 2, "match": "Animal Dog Puppy", "matchCode": "Animal Dog Puppy" },
                { "index": 3, "match": "Yes", "matchCode": "Yes" }
            ]
        },
        { title: 'Hierarchical Inheritance', duration: '35 min', sections: [
                { "type": "section", "title": "1. Definition", "rich": `
<p class="text-sm mb-4 font-medium italic">Hierarchical Inheritance is a type of inheritance in Java where multiple child classes inherit from a single parent class.</p>
<p class="mb-4">👉 <span class="font-bold underline decoration-emerald-500">One Parent → Many Children</span></p>
<p class="text-sm">This allows different classes to share common properties and behavior while also having their own unique features.</p>
` },
                { "type": "section", "title": "2. Core Understanding", "rich": `
<p class="text-sm mb-4 text-slate-700 leading-relaxed font-medium">In real-world terms, think of a base class as a common template, and multiple classes extend it to build their own versions.</p>
<p class="text-sm font-bold text-slate-800 mb-3">Example Hierarchy:</p>
<ul class="list-disc pl-5 space-y-3 text-sm font-medium text-slate-700 mb-4">
    <li>A <span class="font-bold italic text-slate-900 border-b border-slate-200">Vehicle</span> class defines common features like speed and fuel.</li>
    <li><span class="font-bold text-blue-600">Car</span>, <span class="font-bold text-emerald-600">Bike</span>, and <span class="font-bold text-sky-600">Truck</span> inherit from Vehicle.</li>
    <li>Each child class adds its own specific behavior.</li>
</ul>
<p class="text-xs font-bold text-slate-500 tracking-widest uppercase text-center italic">✔ AVOIDS CODE DUPLICATION & IMPROVES MAINTAINABILITY</p>
` },
                { "type": "section", "title": "4. Key Characteristics", "rich": `
<ul class="list-disc pl-5 space-y-3 font-medium text-sm text-slate-700">
    <li>One parent class is shared by multiple child classes</li>
    <li>Child classes inherit fields and methods</li>
    <li>Each child can define its own unique methods</li>
    <li>Promotes code reusability</li>
    <li>Supports method overriding</li>
</ul>
` },
                { "type": "section", "title": "5. Basic Example", "rich": `
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> eat() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Animal is eating"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Dog</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> bark() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Dog is barking"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Cat</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> meow() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Cat is meowing"</span>);
    }
}

<span class="text-blue-400">public class</span> <span class="text-emerald-400">Main</span> {
    <span class="text-blue-400">public static void</span> main(<span class="text-emerald-400">String</span>[] args) {
        <span class="text-emerald-400">Dog</span> d = <span class="text-blue-400">new</span> <span class="text-emerald-400">Dog</span>();
        d.eat();
        d.bark();

        <span class="text-emerald-400">Cat</span> c = <span class="text-blue-400">new</span> <span class="text-emerald-400">Cat</span>();
        c.eat();
        c.meow();
    }
}</pre>
` },
                { "type": "section", "title": "6. Output", "rich": `
<div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-emerald-500 mb-4">
    <span class="text-emerald-400">Output:</span><br/>
    Animal is eating<br/>
    Dog is barking<br/>
    Animal is eating<br/>
    Cat is meowing
</div>
` },
                { "type": "section", "title": "7. Step-by-Step Execution", "rich": `
<ol class="list-decimal pl-5 space-y-2 text-sm font-medium">
    <li><span class="font-bold text-slate-900 underline decoration-slate-300 decoration-2">Step 1:</span> Animal class is loaded into memory.</li>
    <li><span class="font-bold text-slate-900 underline decoration-slate-300 decoration-2">Step 2:</span> Dog and Cat classes extend Animal.</li>
    <li><span class="font-bold text-slate-900 underline decoration-slate-300 decoration-2">Step 3:</span> Dog object is created; reuses <span class="font-mono bg-white px-1">eat()</span> from Animal.</li>
    <li><span class="font-bold text-slate-900 underline decoration-slate-300 decoration-2">Step 4:</span> Cat object is created; also reuses <span class="font-mono bg-white px-1">eat()</span> from Animal.</li>
</ol>
<p class="mt-4 p-3 bg-blue-50 rounded-lg text-xs font-bold text-blue-900 italic tracking-tight">👉 Both child classes independently reuse the parent method.</p>
` },
                { "type": "section", "title": "8. Advanced Example (Method Overriding)", "rich": `
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Employee</span> {
    <span class="text-blue-400">void</span> work() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Employee works"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Developer</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Employee</span> {
    <span class="text-blue-400">void</span> work() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Developer writes code"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Tester</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Employee</span> {
    <span class="text-blue-400">void</span> work() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Tester tests software"</span>);
    }
}

<span class="text-blue-400">public class</span> <span class="text-emerald-400">Main</span> {
    <span class="text-blue-400">public static void</span> main(<span class="text-emerald-400">String</span>[] args) {
        <span class="text-emerald-400">Employee</span> e1 = <span class="text-blue-400">new</span> <span class="text-emerald-400">Developer</span>();
        <span class="text-emerald-400">Employee</span> e2 = <span class="text-blue-400">new</span> <span class="text-emerald-400">Tester</span>();

        e1.work();
        e2.work();
    }
}</pre>
` },
                { "type": "section", "title": "9. Runtime Polymorphism Insight", "rich": `
<div class="p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl shadow-sm mb-4">
    <p class="font-bold text-rose-900 text-sm italic underline">Output:</p>
    <p class="font-mono text-xs mt-2 text-slate-800">Developer writes code<br/>Tester tests software</p>
</div>
<p class="text-sm font-medium">JVM decides which method to call at runtime based on the actual object (Developer/Tester), not the reference type (Employee). This is a core benefit of hierarchical inheritance.</p>
` },
                { "type": "section", "title": "10. Memory Behavior (JVM View)", "rich": `
<div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
    <div class="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
        <p class="font-bold text-xs uppercase text-slate-500 mb-1">Method Area</p>
        <p class="text-[11px] text-slate-600">Parent class methods are stored once.</p>
    </div>
    <div class="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
        <p class="font-bold text-xs uppercase text-slate-500 mb-1">Heap</p>
        <p class="text-[11px] text-slate-600 italic">Independent child objects are created.</p>
    </div>
    <div class="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
        <p class="font-bold text-xs uppercase text-slate-500 mb-1">Stack</p>
        <p class="text-[11px] text-slate-600 uppercase">References (e1, e2) are stored.</p>
    </div>
</div>
` },
                { "type": "section", "title": "11. Memory SVG", "rich": SVG_HIERARCHICAL_INHERITANCE_MEMORY },
                { "type": "section", "title": "12. Real-World Use Cases", "rich": `
<p class="text-sm mb-4 leading-relaxed text-slate-700 font-medium">Hierarchical inheritance is used whenever multiple entities share a common foundation but operate in distinct roles.</p>
<div class="space-y-8">
    <div>
        <p class="font-bold text-blue-900 text-sm mb-2 uppercase tracking-tight">1. USER ACCOUNT SYSTEM</p>
        <p class="text-sm text-slate-600 mb-3 leading-relaxed">A base <span class="font-bold italic text-slate-900 underline decoration-slate-200">User</span> class stores common details like name and email. Different roles then inherit this foundation to add their own unique permissions.</p>
        <pre class="p-4 bg-black text-white rounded-xl font-mono text-[11px] leading-relaxed shadow-lg">
<span class="text-blue-400">class</span> <span class="text-emerald-400">User</span> { 
    <span class="text-emerald-400">String</span> name, email; 
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Admin</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">User</span> { 
    <span class="text-blue-400">void</span> deleteUser() { } 
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Customer</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">User</span> { 
    <span class="text-blue-400">void</span> buy() { } 
}</pre>
    </div>
    <div>
        <p class="font-bold text-indigo-900 text-sm mb-2 uppercase tracking-tight">2. PAYMENT PROCESSING</p>
        <p class="text-sm text-slate-600 mb-3 leading-relaxed">The system defines a common <span class="font-bold italic text-slate-900 underline decoration-slate-200">Payment</span> gateway. Individual methods like CreditCard or UPI implement specific transaction logic while reusing common amount processing.</p>
        <pre class="p-4 bg-black text-white rounded-xl font-mono text-[11px] leading-relaxed shadow-lg">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Payment</span> { 
    <span class="text-blue-400">double</span> amount; 
    <span class="text-blue-400">void</span> process() { } 
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">UPI</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Payment</span> { 
    <span class="text-blue-400">void</span> scanQR() { } 
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">CreditCard</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Payment</span> { 
    <span class="text-blue-400">void</span> swipe() { } 
}</pre>
    </div>
</div>
` },
                { "type": "section", "title": "13. Advantages", "rich": `
<ul class="list-disc pl-5 space-y-2 font-medium text-sm text-slate-700">
    <li>Code reuse (write once, use many times)</li>
    <li>Clean architecture</li>
    <li>Easy to extend system</li>
    <li>Supports polymorphism</li>
</ul>
` },
                { "type": "section", "title": "14. Common Mistakes", "rich": `
<ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
    <li>Forgetting <span class="font-bold font-mono px-1">extends</span> keyword.</li>
    <li>Trying multiple inheritance with classes.</li>
    <li>Overriding with wrong method signature.</li>
    <li>Accessing private parent members directly.</li>
</ul>
` },
                { "type": "section", "title": "15. Rules to Remember", "rich": `
<ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
    <li>Use <span class="font-mono bg-slate-100 px-1 rounded font-bold text-emerald-700 text-xs">extends</span> for inheritance.</li>
    <li>Parent constructor always runs <span class="underline decoration-blue-500">before</span> the child constructor.</li>
    <li>Child classes can access <span class="text-emerald-600 italic">public</span> and <span class="text-blue-600 italic">protected</span> members, but <span class="text-rose-600 font-bold uppercase tracking-tighter">NOT private</span> members.</li>
</ul>
` },
                { "type": "section", "title": "16. Constructor Flow", "rich": `
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Parent</span> {
    <span class="text-emerald-400">Parent</span>() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Parent Constructor"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Child1</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Parent</span> {
    <span class="text-emerald-400">Child1</span>() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Child1 Constructor"</span>);
    }
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Child2</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Parent</span> {
    <span class="text-emerald-400">Child2</span>() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Child2 Constructor"</span>);
    }
}</pre>
<div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-indigo-500 mb-4">
    <span class="text-indigo-400">Output:</span><br/>Parent Constructor<br/>Child1 Constructor<br/>Parent Constructor<br/>Child2 Constructor
</div>
<p class="font-bold text-xs uppercase tracking-widest text-slate-500 italic pb-2">Explanation:</p>
<p class="text-[11px] font-medium leading-relaxed">Parent constructor always executes first. Each child object triggers parent initialization independently.</p>
` },
                { "type": "section", "title": "17. Final Understanding", "rich": `
<div class="p-5 bg-indigo-50 border border-indigo-200 rounded-2xl shadow-inner">
    <p class="text-sm text-indigo-900 font-medium italic">Hierarchical Inheritance is the most common way to build modular systems where a central base provides common rules, and various extensions provide specific implementation.</p>
</div>
` },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"mb-4 italic font-bold\">Validate your Hierarchical Inheritance mastery.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> In what order do constructors run when creating an object of Child1? <br/><strong>Match Output:</strong> <code>Parent Child1</code>", "hints": ["Check Point 16."], "points": 10 },
                { "index": 1, "match": "Parent.*Child1", "matchCode": "Parent Child1" },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Can a child class directly access a private variable of its parent? (Yes/No) <br/><strong>Match Output:</strong> <code>No</code>", "hints": ["Read Point 15: Rules to Remember."], "points": 10 },
                { "index": 2, "match": "No", "matchCode": "No" },
                { "type": "task", "value": "3. <strong>Instruction:</strong> How many parent classes can a child have in Java hierarchical inheritance? <br/><strong>Match Output:</strong> <code>One</code>", "hints": ["Definition: One Parent -> Many Children."], "points": 10 },
                { "index": 3, "match": "One", "matchCode": "One" }
            ],
            validation: [
                { "index": 1, "match": "Parent Child1", "matchCode": "Parent Child1" },
                { "index": 2, "match": "No", "matchCode": "No" },
                { "index": 3, "match": "One", "matchCode": "One" }
            ]
        },
        { title: 'Hybrid Inheritance', duration: '35 min', sections: [
                { "type": "section", "title": "1. Definition", "rich": `
<p class="text-sm mb-4 font-medium text-slate-700 leading-relaxed">Hybrid Inheritance is a combination of two or more types of inheritance into a single system. It is used to model complex real-world relationships where a class needs to inherit from a base class while also implementing multiple behaviors.</p>
<p class="mb-4">👉 <span class="font-bold">Multilevel + Multiple</span> (Common combination)</p>
` },
                { "type": "section", "title": "2. Why Hybrid?", "rich": `
<p class="text-sm mb-2 text-slate-700">Real-world systems are complex and don't always fit into a single model. Hybrid inheritance provides:</p>
<ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
    <li><span class="font-bold text-slate-900">Flexibility:</span> Allows a class to combine properties from multiple sources.</li>
    <li><span class="font-bold text-slate-900">Scalability:</span> New behaviors can be added without breaking the existing inheritance chain.</li>
</ul>
` },
                { "type": "section", "title": "3. Direct Restriction in Java", "rich": `
<p class="text-sm mb-3 font-medium text-slate-700">In Java, a class <span class="font-bold underline decoration-rose-500 underline-offset-4">cannot</span> extend more than one parent class. This prevents the "Diamond Problem" (ambiguity) where the JVM wouldn't know which parent's method to execute if they both had the same name.</p>
<p class="text-sm font-bold text-blue-700">✔ Solution: Use Interfaces to achieve hybrid behavior.</p>
` },
                { "type": "section", "title": "4. Achieving Hybrid via Interfaces", "rich": `
<p class="text-sm mb-3 font-medium text-slate-700">The most common hybrid pattern in Java is a class extending one base class and implementing one or more interfaces:</p>
<p class="font-mono text-xs bg-slate-50 p-3 rounded border border-slate-200 text-slate-800">class Dog <span class="text-blue-600 font-bold">extends</span> Animal <span class="text-emerald-600 font-bold">implements</span> Pet, Guardable { ... }</p>
` },
                { "type": "section", "title": "5. Visual Structure", "rich": SVG_HYBRID_STRUCTURE },
                { "type": "section", "title": "6. Key Characteristics", "rich": `
<ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
    <li>Combines multiple types (typically Single + Multiple interface).</li>
    <li>Prevents method ambiguity by requiring explicit implementations for interface methods.</li>
    <li>Encourages interface-driven design.</li>
    <li>Perfect for modeling complex entities like NPC characters or UI controllers.</li>
</ul>
` },
                { "type": "section", "title": "7. Basic Example (Hybrid Pattern)", "rich": `
<pre class="p-4 bg-black text-white rounded-lg font-mono text-xs mb-4 shadow-xl">
<span class="text-blue-400">class</span> <span class="text-emerald-400">Animal</span> {
    <span class="text-blue-400">void</span> eat() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Animal is eating"</span>);
    }
}

<span class="text-blue-400">interface</span> <span class="text-amber-400">Pet</span> {
    <span class="text-blue-400">void</span> play();
}

<span class="text-blue-400">class</span> <span class="text-emerald-400">Dog</span> <span class="text-blue-400">extends</span> <span class="text-emerald-400">Animal</span> <span class="text-blue-400">implements</span> <span class="text-amber-400">Pet</span> {
    <span class="text-blue-400">public void</span> play() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Dog is playing"</span>);
    }
    <span class="text-blue-400">void</span> bark() {
        <span class="text-emerald-400">System</span>.out.println(<span class="text-sky-300">"Dog is barking"</span>);
    }
}

<span class="text-blue-400">public class</span> <span class="text-emerald-400">Main</span> {
    <span class="text-blue-400">public static void</span> main(<span class="text-emerald-400">String</span>[] args) {
        <span class="text-emerald-400">Dog</span> d = <span class="text-blue-400">new</span> <span class="text-emerald-400">Dog</span>();
        d.eat();   <span class="text-slate-500">// from Animal class</span>
        d.play();  <span class="text-slate-500">// from Pet interface</span>
        d.bark();  <span class="text-slate-500">// unique to Dog</span>
    }
}</pre>
` },
                { "type": "section", "title": "8. Output", "rich": `
<div class="p-4 bg-black text-white rounded-lg font-mono text-sm shadow-xl border-l-4 border-orange-500 mb-6">
    <span class="text-orange-400">Output:</span><br/>
    Animal is eating<br/>
    Dog is playing<br/>
    Dog is barking
</div>
` },
                { "type": "section", "title": "9. Step-by-Step Execution", "rich": `
<ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
    <li>JVM loads metadata for the parent class and interfaces.</li>
    <li>Child class structure is resolved in memory, linking to all ancestors.</li>
    <li>When an object is created, the heap space accommodates the parent state while the object reference manages access to both class and interface methods.</li>
</ul>
` },
                { "type": "section", "title": "10. The Diamond Problem in Hybrid Context", "rich": `
<p class="text-sm mb-3 text-slate-700">If multiple class inheritance were allowed, inheriting from two classes with the same method would lead to a runtime deadlock. Here is how it looks visually:</p>
${SVG_DIAMOND_PROBLEM}
<p class="text-sm italic font-bold text-slate-600 mt-2 underline decoration-rose-300">Note: Interfaces solve this because the child MUST provide its own concrete logic.</p>
` },
                { "type": "section", "title": "11. Memory Behavior (JVM View)", "rich": `
<p class="text-sm text-slate-700 font-medium">A single Hybrid object in the heap acts as a container for all inherited parts (Class + Interface contracts).</p>
` },
                { "type": "section", "title": "12. Memory SVG", "rich": SVG_HYBRID_INHERITANCE_MEMORY },
                { "type": "section", "title": "13. Real-World Use Cases", "rich": `
<p class="text-sm mb-4">Hybrid inheritance is the backbone of major frameworks where objects must belong to a hierarchy but also support multiple capabilities.</p>
<div class="space-y-6">
    <div>
        <p class="font-bold text-slate-900 text-sm mb-2">1. Mobile App Activities (Android)</p>
        <p class="text-xs text-slate-600 mb-2 leading-relaxed italic underline tracking-tight">Activity <span class="text-blue-600 font-bold">extends</span> Context <span class="text-emerald-600 font-bold">implements</span> Listeners</p>
        <p class="text-[11px] text-slate-500 leading-relaxed font-medium">The Activity screen inherits core operating system roles from "Context" while implementing various "Listeners" (Click, Swipe) to interact with the user via a hybrid structure.</p>
    </div>
    <div>
        <p class="font-bold text-slate-900 text-sm mb-2">2. Game Character Systems</p>
        <p class="text-xs text-slate-600 mb-2 leading-relaxed italic underline tracking-tight">NPC <span class="text-blue-600 font-bold">extends</span> BaseCharacter <span class="text-emerald-600 font-bold">implements</span> Fightable, Tradeable</p>
        <p class="text-[11px] text-slate-500 leading-relaxed font-medium">A shopkeeper NPC is a core character but also has the hybrid capability to "Fight" or "Trade". This keeps the NPC system scalable and maintainable.</p>
    </div>
</div>
` },
                { "type": "section", "title": "14. Advantages", "rich": `
<ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
    <li>Provides maximum flexibility by combining static class hierarchies with dynamic interface contracts.</li>
    <li>Decouples logic making the individual components easier to test.</li>
    <li>Creates clear API contracts for what an object "Can Do" vs what it "Is".</li>
</ul>
` },
                { "type": "section", "title": "15. Disadvantages", "rich": `
<ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700 italic">
    <li>Can lead to interface pollution if not managed carefully.</li>
    <li>Slightly more complex to debug during nested method calls.</li>
    <li>Requires deep understanding of both class and interface lifecycle.</li>
</ul>
` },
                { "type": "section", "title": "16. Rules & Best Practices", "rich": `
<ul class="list-disc pl-5 space-y-2 text-sm font-medium text-slate-700">
    <li>Always extend the <span class="font-bold">primary identity</span> class first.</li>
    <li>Use interfaces to add <span class="font-bold italic">capabilities</span> or behaviors.</li>
    <li>Prefer Composition if the inheritance structure becomes too deep for tracking.</li>
</ul>
` },
                { "type": "section", "title": "17. Final Understanding", "rich": `
<p class="text-sm font-medium text-slate-800 italic leading-relaxed">Hybrid Inheritance is the masterpiece of class structure in Java. It allows building complex, real-world systems that are both rigid in hierarchy and flexible in behavior, ensuring technical deadlocks are avoided.</p>
` },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"mb-4 italic font-bold\">Challenge your Hybrid Inheritance logic.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Can a Java class extend two classes to achieve Hybrid inheritance? (Yes/No) <br/><strong>Match Output:</strong> <code>No</code>", "hints": ["Check Point 3: Direct Restriction."], "points": 10 },
                { "index": 1, "match": "No", "matchCode": "No" },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Which keyword is used to provide behavior from multiple sources in Hybrid inheritance? <br/><strong>Match Output:</strong> <code>implements</code>", "hints": ["Read Point 4: Solution."], "points": 10 },
                { "index": 2, "match": "implements", "matchCode": "implements" },
                { "type": "task", "value": "3. <strong>Instruction:</strong> What core problem arises if classes allow multiple inheritance? <br/><strong>Match Output:</strong> <code>Diamond Problem</code>", "hints": ["Read Point 10."], "points": 10 },
                { "index": 3, "match": "Diamond.*Problem", "matchCode": "Diamond Problem" }
            ],
            validation: [
                { "index": 1, "match": "No", "matchCode": "No" },
                { "index": 2, "match": "implements", "matchCode": "implements" },
                { "index": 3, "match": "Diamond Problem", "matchCode": "Diamond Problem" }
            ]
        },
        { title: 'super Keyword', duration: '45 min', sections: [
                { "type": "section", "title": "1. Definition", "rich": `
<p class="text-sm mb-4 font-medium italic">The <span class="font-bold text-indigo-600">super</span> keyword in Java is a reference variable used to refer to the immediate parent class object.</p>
<p class="mb-4 font-bold tracking-tight">👉 It allows a child class to:</p>
<ul class="list-disc pl-10 space-y-2 text-sm font-medium text-slate-700">
    <li>Access parent class variables</li>
    <li>Call parent class methods</li>
    <li>Invoke parent class constructors</li>
</ul>
` },
                { "type": "section", "title": "2. Concept Explanation", "rich": `
<p class="text-sm mb-4 text-slate-700 leading-relaxed font-medium">When inheritance is used, a child class automatically gets access to parent class members. However, when there is method overriding, variable hiding, or a need to call a parent constructor, Java provides the <span class="font-mono bg-slate-100 px-1 rounded font-bold text-indigo-700">super</span> keyword to explicitly refer to the parent version.</p>
<div class="p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl shadow-sm mb-4 font-bold text-indigo-900 text-sm italic underline decoration-indigo-200">Think of super as: "Go one level up and use parent version"</div>
` },
                { "type": "section", "title": "3. Where super is Used", "rich": SVG_SUPER_KEYWORD + `
<ul class="list-disc pl-10 space-y-2 mt-4 text-sm font-medium text-slate-700">
    <li>Access parent variables</li>
    <li>Call parent methods</li>
    <li>Call parent constructor</li>
</ul>
` },
                { "type": "section", "title": "1. Accessing Parent Class Variable", "code": "class Parent {\n    int x = 10;\n}\n\nclass Child extends Parent {\n    int x = 20;\n\n    void show() {\n        System.out.println(x);        // Child variable\n        System.out.println(super.x);  // Parent variable\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Child obj = new Child();\n        obj.show();\n    }\n}", "rich": `<p class="font-bold mb-2 uppercase text-xs text-slate-500 tracking-widest pl-5 border-l-4 border-emerald-500">Explanation:</p><ul class="list-disc pl-10 space-y-1 mb-4 text-sm font-medium text-slate-700"><li>If child has a variable with same name as parent, it "hides" the parent variable.</li><li>Using <span class="font-mono font-bold">super.x</span> fetches the value from the parent class.</li></ul>` },
                { "type": "section", "title": "2. Calling Parent Class Method", "code": "class Animal {\n    void eat() {\n        System.out.println(\"Animal is eating\");\n    }\n}\n\nclass Dog extends Animal {\n    void eat() {\n        System.out.println(\"Dog is eating\");\n    }\n\n    void display() {\n        eat();        // Calls Dog's eat()\n        super.eat();  // Calls Animal's eat()\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Dog d = new Dog();\n        d.display();\n    }\n}", "rich": `<p class="font-bold mb-2 uppercase text-xs text-slate-500 tracking-widest pl-5 border-l-4 border-indigo-500">Explanation:</p><ul class="list-disc pl-10 space-y-1 mb-4 text-sm font-medium text-slate-700"><li>Method overriding allows child to have its own version of a parent method.</li><li><span class="font-mono font-bold">super.methodName()</span> allows us to reuse the parent's logic even after overriding it.</li></ul>` },
                { "type": "section", "title": "3. Calling Parent Class Constructor", "code": "class Parent {\n    Parent() {\n        System.out.println(\"Parent Constructor Called\");\n    }\n}\n\nclass Child extends Parent {\n    Child() {\n        super(); // Explicitly calling parent constructor\n        System.out.println(\"Child Constructor Called\");\n    }\n}", "rich": `<p class="font-bold mb-2 uppercase text-xs text-slate-500 tracking-widest pl-5 border-l-4 border-amber-500">Explanation:</p><ul class="list-disc pl-10 space-y-1 mb-4 text-sm font-medium text-slate-700"><li>In Java, the parent constructor is always called before the child constructor.</li><li>If we don't write <span class="font-mono font-bold">super()</span>, the compiler adds it automatically as the first line.</li></ul>` },
                { "type": "section", "title": "4. Parameterized Constructor with super", "code": "class Parent {\n    Parent(String name) {\n        System.out.println(\"Parent name: \" + name);\n    }\n}\n\nclass Child extends Parent {\n    Child() {\n        super(\"King\"); // Must pass required arguments\n        System.out.println(\"Child constructor\");\n    }\n}", "rich": `<p class="font-bold mb-2 uppercase text-xs text-slate-500 tracking-widest pl-5 border-l-4 border-emerald-500">Explanation:</p><ul class="list-disc pl-10 space-y-1 mb-4 text-sm font-medium text-slate-700"><li>If parent class only has a parameterized constructor, child <span class="font-bold">must</span> explicitly call it using <span class="font-mono font-bold">super(values)</span>.</li></ul>` },
                { "type": "section", "title": "Rules to Remember", "rich": `
<ul class="list-disc pl-5 space-y-4 text-sm font-medium text-slate-700">
    <li><span class="font-bold">Rule 1:</span> <span class="font-mono bg-slate-100 px-1 rounded text-emerald-700 font-bold">super()</span> must be the very FIRST statement in the constructor.</li>
    <li><span class="font-bold">Rule 2:</span> You cannot use <span class="font-bold italic">super</span> inside a static method (like <span class="font-mono px-1">main</span>).</li>
    <li><span class="font-bold">Rule 3:</span> <span class="font-bold italic text-indigo-700">super</span> refers to the <span class="underline">immediate</span> parent class.</li>
</ul>
` },
                { "type": "section", "title": "Common Beginner Mistakes", "rich": `
<ul class="list-disc pl-5 space-y-3 font-medium text-sm text-slate-700">
    <li>Writing <span class="font-mono bg-rose-50 px-1 line-through text-rose-500">super()</span> after some other code in constructor.</li>
    <li>Trying to call <span class="font-mono bg-rose-50 px-1 line-through text-rose-500">super.super.x</span> (Grandparent access is not direct).</li>
    <li>Confusing <span class="font-bold italic text-indigo-600">super</span> with <span class="font-bold italic text-emerald-600">this</span>.</li>
</ul>
` },
                { "type": "section", "title": "super vs this", "rich": `
<div class="grid grid-cols-2 gap-4 mb-6">
    <div class="p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
        <p class="font-bold text-indigo-900 mb-2">super</p>
        <p class="text-xs text-indigo-700 leading-relaxed font-medium">Refers to members of the <span class="font-bold italic underline">PARENT</span> class.</p>
    </div>
    <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
        <p class="font-bold text-emerald-900 mb-2">this</p>
        <p class="text-xs text-emerald-700 leading-relaxed font-medium">Refers to members of the <span class="font-bold italic underline">CURRENT</span> class.</p>
    </div>
</div>
` },
                { "type": "section", "title": "Interactive Tasks", "rich": "<p class=\"mb-4 italic font-bold\">Validate your super Keyword mastery.</p>" },
                { "type": "task", "value": "1. <strong>Instruction:</strong> Can super() be the second statement in a constructor? (Yes/No) <br/><strong>Match Output:</strong> <code>No</code>", "hints": ["Check Point 1: Rules to Remember."], "points": 10 },
                { "index": 1, "match": "No", "matchCode": "No" },
                { "type": "task", "value": "2. <strong>Instruction:</strong> Which keyword is used to call the immediate parent's constructor? <br/><strong>Match Output:</strong> <code>super()</code>", "hints": ["Definition."], "points": 10 },
                { "index": 2, "match": "super.*", "matchCode": "super()" },
                { "type": "task", "value": "3. <strong>Instruction:</strong> What will happen if you use super in a static method? <br/><strong>Match Output:</strong> <code>Compilation Error</code>", "hints": ["Read Rule 2."], "points": 10 },
                { "index": 3, "match": "Compilation.*Error", "matchCode": "Compilation Error" }
            ],
            validation: [
                { "index": 1, "match": "No", "matchCode": "No" },
                { "index": 2, "match": "super()", "matchCode": "super()" },
                { "index": 3, "match": "Compilation Error", "matchCode": "Compilation Error" }
            ]
        },
    ],
}).catch(console.error);
