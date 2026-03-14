/** Module 28 — Object Class (generated) */
const { seedModule } = require('./_helpers');
seedModule({
    moduleTitle: 'Object Class',
    moduleOrder: 28,
    description: 'toString equals hashCode clone.',
    label: 'OBJECT',
    lessons: [
        { title: 'Introduction to Object Class', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'Introduction to Object Class: from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// Introduction to Object Class\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("Introduction to Object Class");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: Introduction to Object Class</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
        { title: 'toString()', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'toString(): from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// toString()\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("toString()");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: toString()</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
        { title: 'equals()', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'equals(): from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// equals()\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("equals()");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: equals()</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
        { title: 'hashCode()', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'hashCode(): from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// hashCode()\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("hashCode()");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: hashCode()</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
        { title: 'clone()', duration: '32 min', sections: [
            { type: 'section', title: '1. Goals', text: 'clone(): from basics to professional use — syntax, JVM/runtime behavior, and pitfalls.' },
            { type: 'section', title: '2. Core concepts', list: ['Read official Java docs for this topic.', 'Write small main() experiments.', 'Use debugger / println to verify.'] },
            { type: 'section', title: '3. Example', code: '// clone()\npublic class Main {\n  public static void main(String[] a) {\n    System.out.println("clone()");\n  }\n}' },
            { type: 'section', title: '4. Pro level', text: 'Combine with unit tests, clear naming, and API contracts when building real features.' },
            { type: 'task', value: '<strong>Task</strong><br/>Print line containing <code class="font-mono">Topic: clone()</code>.', hints: ['println'], points: 6 },
            { type: 'task', value: '<strong>Task 2</strong><br/>Print <code class="font-mono">Done: true</code>.', hints: ['boolean'], points: 6 },
        ], validation: [{ index: 1, match: 'Topic:', matchCode: 'println' }, { index: 2, match: 'Done:\\s*true', matchCode: 'true' }] },
    ],
}).catch(console.error);
