### JVM Memory & Non-Static Members (Advanced Guide)
Understanding the internal architecture of the Java Virtual Machine (JVM) is what separates a Java developer from a Java Expert. This module covers how Java manages memory and prepares you for the **First Mock Exam**.

#### 1. THE JVM MEMORY ARCHITECTURE
When you run a Java program, the JVM requests a block of memory from the OS and divides it into several logical runtime data areas:

&nbsp;
Heap Memory:
- **Purpose:** Stores all objects and their instance variables.
- **Nature:** Shared across all threads.
- **Key Feature:** This is the primary target for **Garbage Collection (GC)**.
- **Sub-areas:** Young Generation (Eden, S1, S2) and Old Generation.

&nbsp;
Stack Memory:
- **Purpose:** Stores local variables and method call frames.
- **Nature:** Thread-local (Each thread has its own stack).
- **Key Feature:** Operates on LIFO (Last-In-First-Out). When a method finishes, its frame is "popped" and memory is reclaimed instantly.

&nbsp;
Method Area (Metaspace):
- **Purpose:** Stores class-level data, including the name of the class, method information, and **Static Variables**.
- **Nature:** Replaced the "PermGen" area in Java 8+.

#### 2. NON-STATIC (INSTANCE) MEMBERS
Members not marked with `static` are called instance members. 
- **Storage:** They live on the **Heap** as part of an object.
- **Access:** They require an object reference to be accessed (`obj.member`).
- **Initialization:** They are initialized during object creation.

&nbsp;
Instance Initializer Block:
A block of code inside a class but outside any method. It runs every time an object is created, just before the constructor.
```java
class Test {
    {
        System.out.println("Instance block runs first");
    }
    Test() {
        System.out.println("Constructor runs second");
    }
}
```

#### 3. THE LIFE OF AN OBJECT (MEMORY FLOW)
1. **ClassName obj = new ClassName();**
2. JVM checks if the class is loaded. If not, it loads it into the **Method Area**.
3. Memory is allocated for the object on the **Heap**.
4. The reference `obj` is stored on the **Stack**, pointing to the Heap address.
5. Instance variables are initialized with default values.
6. Instance blocks and Constructors execute.

#### 4. STACK VS HEAP: COMPARISON TABLE
| Feature | Stack Memory | Heap Memory |
|---------|--------------|-------------|
| Order | LIFO (Lats-In-First-Out) | Dynamic / Random Access |
| Management | Automatic (Scope-based) | Garbage Collector |
| Access Speed | Very Fast | Slower (due to indirection) |
| Visibility | Single Thread | All Threads |
| Error | `StackOverflowError` | `OutOfMemoryError` |

#### 5. THE 'FIRST MOCK' PREPARATION
For the first mock exam, you must be able to:
- Trace code and draw memory diagrams (Stack/Heap).
- Explain why a static method cannot access a non-static variable.
- Identify when an object becomes eligible for Garbage Collection (when it has no references).

#### 6. VISUAL MEMORY LAYOUT
```
[  JVM MEMORY  ]
|
|-- [ STACK ] (Local Variables)
|   |-- main() frame -> args, localX
|   |-- methodA() frame -> paramY, localZ
|
|-- [ HEAP ] (Objects)
|   |-- ObjectA { instanceVar1: 10, instanceVar2: "text" }
|   |-- ObjectB { ... }
|
|-- [ METHOD AREA ] (Class Data)
|   |-- Class Blueprint
|   |-- Static Variables
```

#### 7. AI LEARNING LAB: INTERACTIVE INTERNALS
Master JVM architecture and memory management by using our expert-verified AI prompts.

Featured Prompt: Memory Profiler Architect
"Act as a JVM Internals Specialist. I have a memory dump showing an OutOfMemoryError in the Heap. Explain how I can use JConsole or VisualVM to identify which objects are consuming memory and whether I have a memory leak in my non-static collection."
