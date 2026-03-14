/**
 * Generates m07..m32 seed files (run once: node scripts/seed/generate_m07_m32.js)
 */
const fs = require('fs');
const path = require('path');
const dir = __dirname;

const MODULES = [
    [7, 'Methods', 'METHODS', 'Methods: declaration, parameters, return, call, recursion.', [
        'Introduction to Methods', 'Method Declaration', 'Method Parameters', 'Method Return Types', 'Calling Methods', 'Recursive Methods',
    ]],
    [8, 'Class and Object', 'OOP', 'Classes, objects, members, memory.', [
        'Introduction to Classes', 'Creating Classes', 'Creating Objects', 'Accessing Object Members', 'Object Memory Concept',
    ]],
    [9, 'Static', 'STATIC', 'Static variables, methods, blocks, vs instance.', [
        'Static Variables', 'Static Methods', 'Static Blocks', 'Static vs Non Static',
    ]],
    [10, 'Non-Static and JVM Memory', 'JVM', 'Instance vars/methods, stack, heap, method area.', [
        'Instance Variables', 'Instance Methods', 'Stack Memory', 'Heap Memory', 'Method Area', 'JVM Memory Structure',
    ]],
    [11, 'Blocks', 'BLOCKS', 'Static, instance, local blocks; execution order.', [
        'Static Blocks', 'Instance Blocks', 'Local Blocks', 'Execution Order of Blocks',
    ]],
    [12, 'String Functions', 'STRINGS', 'String API, compare, concat, immutability.', [
        'Introduction to String', 'String Methods', 'String Comparison', 'String Concatenation', 'String Immutability',
    ]],
    [13, 'Constructor', 'CONSTRUCTORS', 'Default, parameterized, overloading, chaining.', [
        'Introduction to Constructor', 'Default Constructor', 'Parameterized Constructor', 'Constructor Overloading', 'Constructor Chaining',
    ]],
    [14, 'Pass by Value', 'PASS_VALUE', 'Primitives passed by value; memory behavior.', [
        'Concept of Pass by Value', 'Passing Primitive Data Types', 'Memory Behavior',
    ]],
    [15, 'Pass by Reference', 'PASS_REF', 'Object references; behavior in methods.', [
        'Object Reference Passing', 'Behavior of Objects in Methods', 'Reference Handling',
    ]],
    [16, 'Composition', 'COMPOSITION', 'Has-A, reuse via composition.', [
        'Has-A Relationship', 'Creating Object References', 'Code Reusability with Composition',
    ]],
    [17, 'Inheritance', 'INHERITANCE', 'extends, types, super.', [
        'Introduction to Inheritance', 'Types of Inheritance', 'Single Inheritance', 'Multilevel Inheritance', 'Hierarchical Inheritance', 'super Keyword',
    ]],
    [18, 'Method Overloading', 'OVERLOAD', 'Same name, different params; compile-time.', [
        'Introduction to Overloading', 'Changing Parameters', 'Method Signature', 'Compile Time Polymorphism',
    ]],
    [19, 'Method Overriding', 'OVERRIDE', 'Runtime polymorphism; super call.', [
        'Introduction to Overriding', 'Runtime Polymorphism', 'Overriding Rules', 'super Method Call',
    ]],
    [20, 'Typecasting', 'CAST', 'Upcast, downcast, instanceof.', [
        'Introduction to Typecasting', 'Upcasting', 'Downcasting', 'instanceof Operator',
    ]],
    [21, 'Polymorphism', 'POLY', 'Compile vs runtime polymorphism.', [
        'Introduction to Polymorphism', 'Compile Time Polymorphism', 'Runtime Polymorphism', 'Practical Examples',
    ]],
    [22, 'Abstract Class', 'ABSTRACT', 'abstract class/methods vs concrete.', [
        'Introduction to Abstract Classes', 'Abstract Methods', 'Implementing Abstract Classes', 'Abstract vs Normal Classes',
    ]],
    [23, 'Interface', 'INTERFACE', 'implements, multiple inheritance, default/static.', [
        'Introduction to Interface', 'Implementing Interfaces', 'Multiple Inheritance using Interface', 'Default and Static Methods',
    ]],
    [24, 'Package', 'PACKAGE', 'package, import, built-in vs user.', [
        'Introduction to Packages', 'Creating Packages', 'Importing Packages', 'Built-in Packages', 'User Defined Packages',
    ]],
    [25, 'Access Specifiers', 'ACCESS', 'private default protected public.', [
        'Private', 'Default', 'Protected', 'Public',
    ]],
    [26, 'Encapsulation', 'ENCAP', 'getters, setters, hiding.', [
        'Data Hiding', 'Getter Methods', 'Setter Methods', 'Encapsulation Best Practices',
    ]],
    [27, 'Collection', 'COLLECTION', 'List Set Map ArrayList LinkedList HashSet HashMap.', [
        'Introduction to Collection Framework', 'List Interface', 'Set Interface', 'Map Interface', 'ArrayList', 'LinkedList', 'HashSet', 'HashMap',
    ]],
    [28, 'Object Class', 'OBJECT', 'toString equals hashCode clone.', [
        'Introduction to Object Class', 'toString()', 'equals()', 'hashCode()', 'clone()',
    ]],
    [29, 'String Class', 'STRING_CLS', 'pool, immutable, Builder Buffer.', [
        'String Pool', 'Immutable Strings', 'StringBuilder', 'StringBuffer', 'String Methods',
    ]],
    [30, 'Exception Handling', 'EXCEPTIONS', 'try catch finally throw throws custom.', [
        'Introduction to Exceptions', 'try-catch', 'finally', 'throw', 'throws', 'Custom Exceptions',
    ]],
    [31, 'Threads', 'THREADS', 'Thread Runnable lifecycle sync.', [
        'Introduction to Multithreading', 'Thread Class', 'Runnable Interface', 'Thread Lifecycle', 'Synchronization',
    ]],
    [32, 'File Handling', 'FILES', 'File FileReader Writer Buffered.', [
        'Introduction to File Handling', 'File Class', 'FileReader', 'FileWriter', 'BufferedReader', 'BufferedWriter', 'Reading Files', 'Writing Files',
    ]],
];

function fileContent(num, title, label, desc, lessons) {
    const lessonsJs = lessons.map((t) => `        { title: '${t.replace(/'/g, "\\'")}', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: '${t}: from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// ${t}\\npublic class Main {\\n  public static void main(String[] a) {\\n    System.out.println("${t}");\\n  }\\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: ${t.replace(/"/g, '')}</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\\\s*true', matchCode: 'true' }] },`).join('\n');

    return `/** Module ${num} — ${title} (generated) */
const { seedModule } = require('./_helpers');
seedModule({
    moduleTitle: '${title.replace(/'/g, "\\'")}',
    moduleOrder: ${num},
    description: '${desc.replace(/'/g, "\\'")}',
    label: '${label}',
    lessons: [
${lessonsJs}
    ],
}).catch(console.error);
`;
}

for (const [num, title, label, desc, lessons] of MODULES) {
    const name = `m${String(num).padStart(2, '0')}_${title.replace(/\s+/g, '_').replace(/[^a-z0-9_]/gi, '').toLowerCase()}.js`;
    fs.writeFileSync(path.join(dir, name), fileContent(num, title, label, desc, lessons), 'utf8');
    console.log('Wrote', name);
}
console.log('Done.');
