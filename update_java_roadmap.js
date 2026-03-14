const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '/Users/ifocus/Documents/Systemmindz/CandidateBackend/.env' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'KnowledgeBase';

const roadmapContent = `### Java 45-Day Programming Mastery Roadmap
This structured roadmap is designed to take a candidate from zero to a professional coding level through rigorous daily assignments and mock evaluations.

#### PHASE 1: FOUNDATIONS (DAYS 1-14)
*   **Day 1:** Introduction of for-loop, Pgms on for-loop and 30 assignment questions.
*   **Day 2:** Doubts clarified on for-loop assignment.
*   **Day 3:** Pgms on for-loop and 30 assignment questions.
*   **Day 4:** Introduction of while loop, Pgms on while loop and 30 assignment questions.
*   **Day 5:** Doubts clarified on while-loop assignment.
*   **Day 6:** Pgms on while-loop and 30 assignment questions.
*   **Day 7:** Introduction of if conditions, Pgms on if conditions 30 assignment questions.
*   **Day 8:** Doubts clarified on if condition assignment.
*   **Day 9:** Pgms on if condition and 30 assignment questions.
*   **Day 10:** Combination of for-loop and if condition pgms and 30 assignment questions.
*   **Day 11:** Doubts clarified on for-loop and if condition pgms and 30 assignment questions.
*   **Day 12:** Combination of while-loop and if condition pgms and 30 assignment questions.
*   **Day 13:** Introduction on Switch case, pgms on Switch case and 30 pgms assignment.
*   **Day 14:** Doubt clarified on switch case.

⚡ **STRENGTH TEST: FRESHERS PRACTICE TEST (Day 15)**
*   **Day 15:** 2000 pgms assignment on for-loop, while-loop, Switch Case, and if condition within a week.

#### PHASE 2: PATTERNS & LOGIC (DAYS 16-25)
*   **Day 16:** 10 pgms on star patterns and 30 assignment.
*   **Day 17:** 10 pgms on uppercase character patterns and 30 assignment.
*   **Day 18:** 10 pgms on lowercase character patterns and 30 assignment.
*   **Day 19:** 5 pgms on number patterns and 30 assignment.
*   **Day 20:** Factorial, Sum of Factorial, Fibonacci (Standard & User-given), Sum of Fibonacci, FizzBuzz.
*   **Day 21:** Sum of digits, Count/Sum even & odd digits, Reverse number, Palindrome check.
*   **Day 22:** Swap 2 numbers (with/without 3rd variable), Prime number check, Range of Prime, Sum of Prime range.
*   **Day 23:** Strong number, Armstrong number, Perfect number, Happy number.
*   **Day 24:** Java inbuilt functions and methods along with pgms.
*   **Day 25:** Reverse string, String palindrome, Remove extra spaces, Character replacement.

🏆 **EVALUATION: FIRST MOCK (Day 25)**

#### PHASE 3: ARRAYS & DATA STRUCTURES (DAYS 26-31)
*   **Day 26:** Array printing, Even/Odd index value printing & sum, Even/Odd numbers in array & sum.
*   **Day 27:** Sorting array (Ascending) using inbuilt method vs. Manual Bubble Sort.
*   **Day 28:** String Anagram, Vowel finding, Reverse sentence, Reverse words in sentence.
*   **Day 29:** Character count, Duplicate character count/print, Even words count.
*   **Day 30:** Duplicate removal in array, Repeated numbers printing.
*   **Day 31:** Min/Max value find, Second Min/Max value find.

#### PHASE 4: PLATFORM MASTERY & TEST CASES (DAYS 32-45)
*   **Day 32-35:** Coding platform practice & Company Test Cases.
*   **Day 36-39:** Second Mock, Coding platform practice & Company Test Cases.
*   **Day 40-44:** Platform practice & Advanced Company Test Cases.
*   **Day 45:** Final Platform Practice.

🎓 **GRADUATION: FINAL MOCK (Day 45)**`;

async function syncRoadmap() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const col = db.collection('java');

        const result = await col.updateOne(
            { title: 'Road Map' },
            {
                $set: {
                    content: roadmapContent,
                    order: 1,
                    updatedAt: new Date()
                }
            },
            { upsert: true }
        );

        console.log('Successfully restored Java Road Map content.');

    } catch (err) {
        console.error('Update error:', err);
    } finally {
        await client.close();
    }
}

syncRoadmap();
