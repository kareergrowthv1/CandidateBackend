const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config({ path: '/Users/ifocus/Documents/Systemmindz/CandidateBackend/.env' });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'KnowledgeBase';

async function updateProgramming() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        const col = db.collection('java');

        const subtopics = [
            {
                title: "Factorial",
                type: "article",
                content: "### FACTORIAL OF A NUMBER\nMathematical Definition: `n! = n * (n - 1) * ... * 1`.\n\n&nbsp;\nIterative (Best for primitive ranges):\nTime Complexity: O(n) | Space Complexity: O(1)\n```java\npublic long getFactorial(int n) {\n    long fact = 1;\n    for (int i = 1; i <= n; i++) fact *= i;\n    return fact;\n}\n```\n\n&nbsp;\nRecursive (Elegant but limited by Stack size):\nTime Complexity: O(n) | Space Complexity: O(n) due to Stack Frames.\n```java\npublic long getFactorial(int n) {\n    if (n == 0) return 1;\n    return n * getFactorial(n - 1);\n}\n```"
            },
            {
                title: "Fibonacci series",
                type: "article",
                content: "### FIBONACCI SERIES\nA sequence where each number is the sum of the two preceding ones.\n\n&nbsp;\nEfficient Iteration:\nTime Complexity: O(n) | Space Complexity: O(1)\n```java\npublic void printFibonacci(int count) {\n    int a = 0, b = 1;\n    System.out.print(a + \" \" + b);\n    for (int i = 2; i < count; i++) {\n        int next = a + b;\n        System.out.print(\" \" + next);\n        a = b;\n        b = next;\n    }\n}\n```"
            },
            {
                title: "Reverse a String",
                type: "article",
                content: "### STRING REVERSAL TECHNIQUES\nMastering string manipulation requires knowing different utility classes.\n\n&nbsp;\nUsing StringBuilder (The Modern Way):\n```java\npublic String reverse(String str) {\n    return new StringBuilder(str).reverse().toString();\n}\n```\n\n&nbsp;\nManual Character Swap (The Algorithmic Way):\n```java\npublic String reverse(String str) {\n    char[] chars = str.toCharArray();\n    int left = 0, right = chars.length - 1;\n    while (left < right) {\n        char temp = chars[left];\n        chars[left] = chars[right];\n        chars[right] = temp;\n        left++; right--;\n    }\n    return new String(chars);\n}\n```"
            },
            {
                title: "Prime no",
                type: "article",
                content: "### PRIME NUMBER DETECTION\nA number greater than 1 with exactly two divisors: 1 and itself.\n\n&nbsp;\nOptimized Trial Division:\nLogic: If a number `n` has a divisor, it must have one less than or equal to `√n`.\nTime Complexity: O(√n)\n```java\npublic boolean isPrime(int n) {\n    if (n <= 1) return false;\n    for (int i = 2; i <= Math.sqrt(n); i++) {\n        if (n % i == 0) return false;\n    }\n    return true;\n}\n```"
            },
            {
                title: "Odd even",
                type: "article",
                content: "### ODD & EVEN LOGIC\nFundamental check using the Bitwise operator (faster than modulo %).\n```java\npublic boolean isEven(int n) {\n    // If last bit is 0, it is even\n    return (n & 1) == 0;\n}\n```"
            },
            {
                title: "Patterns",
                type: "article",
                content: "### PATTERN PROGRAMMING (LOOP MATH)\nPatterns are about understanding how coordinate `(i, j)` relates to the character being printed.\n\n&nbsp;\nRight Triangle:\n```java\nfor (int i = 1; i <= 5; i++) {\n    for (int j = 1; j <= i; j++) System.out.print(\"* \");\n    System.out.println();\n}\n```\n\n&nbsp;\nPyramid (The logic breakthrough):\n```java\nfor (int i = 1; i <= 5; i++) {\n    for (int j = 5; j >= i; j--) System.out.print(\" \"); // Leading Spaces\n    for (int k = 1; k <= i; k++) System.out.print(\"* \"); // Stars\n    System.out.println();\n}\n```"
            }
        ];

        const mainContent = `### Java Programming Lab (Advanced Guide)\nWelcome to the Programming Lab. Here, we tackle core algorithmic problems frequently asked in technical interviews. Use the sidebar to explore specific implementations including:\n\n- Factorial (Iterative & Recursive)\n- Fibonacci Series\n- Prime Number Detection\n- String Reversal Techniques\n- Odd & Even (Bitwise Logic)\n- Pattern Programming\n\n#### Algorithm Efficiency Comparison\n| Problem | Efficient Approach | Time | Space |\n|---------|-------------------|------|-------|\n| Factorial | Iterative | O(n) | O(1) |\n| Fibonacci | Iterative / DP | O(n) | O(1) |\n| Prime no | Trial Division (√n) | O(√n) | O(1) |\n| Reversal | Dual Pointer | O(n) | O(n) |\n| Patterns | Nested Loops | O(n²) | O(1) |`;

        const result = await col.updateOne(
            { title: { $regex: /programming/i } },
            {
                $set: {
                    content: mainContent,
                    subtopics: subtopics,
                    updatedAt: new Date()
                }
            }
        );

        if (result.matchedCount > 0) {
            console.log('Successfully updated Programming with subtopics.');
        } else {
            console.log('Could not find Programming document.');
        }

    } catch (err) {
        console.error('Update error:', err);
    } finally {
        await client.close();
    }
}

updateProgramming();
