### The String Class (Deep Dive into Immuteability)
Strings are the most widely used data type in Java. Unlike other languages, Java treats Strings as objects with a unique memory management system called the **String Constant Pool (SCP)**.

#### 1. INTERNAL REPRESENTATION
- **Java 8 and earlier:** `char[] value` (UTF-16).
- **Java 9 and later (Compact Strings):** `byte[] value` (LATIN1 or UTF16) to save 50% memory for common strings.

&nbsp;
#### 2. STRING IMMUTABILITY: THE "WHY"
Strings are **Immutable**, meaning once created, their value cannot be changed. If you modify a string, a new one is created.

| Why Immutable? | Explanation |
|----------------|-------------|
| **Security** | Strings handle sensitive data (Passwords, URLs, DB connection strings). |
| **Caching** | Enables the String Constant Pool (SCP). |
| **Thread Safety** | Multiple threads can share the same string without synchronization. |
| **Hash Efficiency** | The hash code is cached during creation, making them perfect for `HashMap` keys. |

&nbsp;
#### 3. THE STRING CONSTANT POOL (SCP)
When you create a string literal `String s1 = "Hello"`, Java checks the SCP first. If it exists, it returns the reference. If you use `new String("Hello")`, it bypasses the pool and creates a new object in the Heap.

&nbsp;
#### 4. STRING VS STRINGBUILDER VS STRINGBUFFER
| Feature | String | StringBuilder | StringBuffer |
|---------|--------|---------------|--------------|
| **Modifiability** | Immutable | Mutable | Mutable |
| **Thread Safe** | Yes (Implicit) | No | Yes (Synchronized)|
| **Performance** | Slow (for mods) | **Fastest** | Moderate |
| **Memory** | High (for mods) | Low | Low |

&nbsp;
#### 5. CRITICAL METHODS (ULTRA-DEEP)
- **intern():** Manually adds a string created via `new` to the SCP.
- **comparTo():** Lexicographical comparison (returns positive, negative, or zero).
- **split():** Uses Regular Expressions to break strings into arrays.
- **repeat(int n):** (Java 11+) Repeats a string `n` times.
- **strip() vs trim():** `strip()` is Unicode-aware (Java 11+); `trim()` only handles ASCII spaces.

&nbsp;
#### 6. COMPARISON TABLE: STRING STORAGE
| Method | Memory Location | Reference Reuse? |
|--------|-----------------|------------------|
| Literal ("Abc") | String Constant Pool | Yes |
| new String("Abc") | Heap Memory | No |
| intern() | SCP | Yes |

&nbsp;
#### 7. INTERVIEW MASTER TIPS
1. **Password storage:** Always use `char[]` instead of `String` for passwords. Strings stay in memory longer (SCP) and can be dumped, while `char[]` can be wiped after use.
2. **String + in Loops:** Never use `+` to concatenate in a loop. It creates a new `StringBuilder` and `String` object in every iteration (O(n²)). Use one `StringBuilder` instead.

#### 8. AI LEARNING LAB
Featured Prompt: Memory Auditor
"Explain exactly what happens in memory (Heap vs SCP) when I execute: `String s1 = new String("Java"); String s2 = "Java";`. How many objects are created? Use a diagram description."
