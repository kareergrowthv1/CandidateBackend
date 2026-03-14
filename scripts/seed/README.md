# Java syllabus seed scripts (modules 4–32)

Each file seeds **one MongoDB module** on the **Java** course (`slug: java`): lessons, rich content (sections, lists, code, tasks), and `modules.items`.

## Prerequisites

- `.env` with `MONGODB_URI`
- Database: **Programming**, collections: **Courses**, **Lessons**
- Course **java** must exist

## Layout

| File | Module |
|------|--------|
| `_helpers.js` | Shared: connect, `seedModule()`, tables, checkpoints |
| `m04_conditional_statements.js` | Conditional Statements (6 lessons) |
| `m05_loop_statements.js` | Loop Statements (7 lessons) |
| `m06_arrays.js` | Arrays (6 lessons) |
| `m07_methods.js` … `m32_file_handling.js` | Generated rich template per sub-lesson |
| `generate_m07_m32.js` | Rebuild m07–m32 after editing lesson lists |

## Run one module

```bash
cd CandidateBackend
node scripts/seed/m04_conditional_statements.js
```

## Run all (sequential)

```bash
node scripts/seed/run_all.js
```

**Note:** Each script **creates the module if missing** or **updates** it. Module **order** is set by `moduleOrder` (4–32). If you already have many Java modules, you may want to adjust orders to avoid duplicates — or run on a course clone.

## Customize

- **Deeper content:** Edit a module file; add `sections` with `{ type: 'section', title, text, list, code, rich }` and `{ type: 'task', value, hints, points }`.
- **Regenerate bulk:** Edit `MODULES` in `generate_m07_m32.js`, then `node scripts/seed/generate_m07_m32.js`.
