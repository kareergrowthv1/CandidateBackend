/** Module 22 — Abstract Class (generated) */
const { seedModule } = require('./_helpers');
seedModule({
    moduleTitle: 'Abstract Class',
    moduleOrder: 22,
    description: 'abstract class/methods vs concrete.',
    label: 'ABSTRACT',
    lessons: [
        { title: 'Introduction to Abstract Classes', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'Introduction to Abstract Classes: from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// Introduction to Abstract Classes\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("Introduction to Abstract Classes");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: Introduction to Abstract Classes</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
        { title: 'Abstract Methods', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'Abstract Methods: from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// Abstract Methods\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("Abstract Methods");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: Abstract Methods</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
        { title: 'Implementing Abstract Classes', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'Implementing Abstract Classes: from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// Implementing Abstract Classes\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("Implementing Abstract Classes");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: Implementing Abstract Classes</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
        { title: 'Abstract vs Normal Classes', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'Abstract vs Normal Classes: from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// Abstract vs Normal Classes\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("Abstract vs Normal Classes");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: Abstract vs Normal Classes</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
    ],
}).catch(console.error);
