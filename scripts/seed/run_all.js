/**
 * Run all Java module seeds 4–32 (sequential).
 * node scripts/seed/run_all.js
 */
const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const dir = __dirname;
const files = fs
    .readdirSync(dir)
    .filter((f) => /^m\d{2}_.+\.js$/.test(f))
    .sort();

for (const f of files) {
    console.log('\n==========', f, '==========');
    const r = spawnSync(process.execPath, [path.join(dir, f)], { stdio: 'inherit', cwd: path.join(dir, '../..') });
    if (r.status !== 0) {
        console.error('Failed:', f);
        process.exit(r.status || 1);
    }
}
console.log('\n✅ All seeds finished:', files.length, 'modules');
