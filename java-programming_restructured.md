### Java Programming Lab (Advanced Guide)
This section provides optimized implementations of core algorithms. Mastery of these problems involves understanding not just the "how" but the "why"—including time and space complexity.

#### 1. FACTORIAL OF A NUMBER
Mathematical Definition: `n! = n * (n - 1) * ... * 1`. 

&nbsp;
Iterative (Best for primitive ranges):
Time Complexity: O(n) | Space Complexity: O(1)
```java
public long getFactorial(int n) {
    long fact = 1;
    for (int i = 1; i <= n; i++) fact *= i;
    return fact;
}
```

&nbsp;
Recursive (Elegant but limited by Stack size):
Time Complexity: O(n) | Space Complexity: O(n) due to Stack Frames.
```java
public long getFactorial(int n) {
    if (n == 0) return 1;
    return n * getFactorial(n - 1);
}
```

#### 2. FIBONACCI SERIES
A sequence where each number is the sum of the two preceding ones.

&nbsp;
Efficient Iteration:
Time Complexity: O(n) | Space Complexity: O(1)
```java
public void printFibonacci(int count) {
    int a = 0, b = 1;
    System.out.print(a + " " + b);
    for (int i = 2; i < count; i++) {
        int next = a + b;
        System.out.print(" " + next);
        a = b;
        b = next;
    }
}
```

#### 3. PRIME NUMBER DETECTION
A number greater than 1 with exactly two divisors: 1 and itself.

&nbsp;
Optimized Trial Division:
Logic: If a number `n` has a divisor, it must have one less than or equal to `√n`.
Time Complexity: O(√n)
```java
public boolean isPrime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) return false;
    }
    return true;
}
```

#### 4. STRING REVERSAL TECHNIQUES
Mastering string manipulation requires knowing different utility classes.

&nbsp;
Using StringBuilder (The Modern Way):
```java
public String reverse(String str) {
    return new StringBuilder(str).reverse().toString();
}
```

&nbsp;
Manual Character Swap (The Algorithmic Way):
```java
public String reverse(String str) {
    char[] chars = str.toCharArray();
    int left = 0, right = chars.length - 1;
    while (left < right) {
        char temp = chars[left];
        chars[left] = chars[right];
        chars[right] = temp;
        left++; right--;
    }
    return new String(chars);
}
```

#### 5. ODD & EVEN LOGIC
Fundamental check using the Bitwise operator (faster than modulo %).
```java
public boolean isEven(int n) {
    // If last bit is 0, it is even
    return (n & 1) == 0;
}
```

#### 6. PATTERN PROGRAMMING (LOOP MATH)
Patterns are about understanding how coordinate `(i, j)` relates to the character being printed.

&nbsp;
Right Triangle:
```java
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= i; j++) System.out.print("* ");
    System.out.println();
}
```

&nbsp;
Pyramid (The logic breakthrough):
```java
for (int i = 1; i <= 5; i++) {
    for (int j = 5; j >= i; j--) System.out.print(" "); // Leading Spaces
    for (int k = 1; k <= i; k++) System.out.print("* "); // Stars
    System.out.println();
}
```

#### 7. COMPARISON TABLE: ALGORITHM EFFICIENCY
| Problem | Efficient Approach | Time | Space |
|---------|-------------------|------|-------|
| Factorial | Iterative | O(n) | O(1) |
| Fibonacci | Iterative / DP | O(n) | O(1) |
| Prime no | Trial Division (√n) | O(√n) | O(1) |
| Reversal | Dual Pointer | O(n) | O(n) |
| Patterns | Nested Loops | O(n²) | O(1) |

#### 8. AI LEARNING LAB: INTERACTIVE PROGRAMMING
Master algorithms and data structures by using our expert-verified AI prompts.

Featured Prompt: Competitive Code Auditor
"Act as a Tech Lead. I have an O(n²) solution for finding all prime numbers up to n. Refactor this using the **Sieve of Eratosthenes** (O(n log log n)) and explain why the memory trade-off is worth the speed gain."
