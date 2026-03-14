### Java
Java is one of the most popular programming languages in the world. It is widely used for building web applications, Android mobile apps, enterprise systems, and cloud-based software. Java follows the Object-Oriented Programming (OOP) approach which helps developers write clean, reusable, and maintainable code.
One of the biggest advantages of Java is its platform independence. This means a Java program can run on any system (Windows, Linux, Mac) without modification as long as the system has the Java Virtual Machine (JVM). Because of its stability, security, and large community support, Java is heavily used by companies for large-scale software systems.

#### 1. INTRODUCTION TO JAVA
What is Java:  
Java is a high-level, object-oriented programming language developed by Sun Microsystems (now owned by Oracle). It is designed to be simple, secure, portable, and powerful for building different types of applications.

History of Java:  
Java was created by James Gosling and his team at Sun Microsystems in 1995. Originally it was designed for interactive television systems but later became very popular for web development and enterprise software. Today, Java is maintained by Oracle Corporation.

&nbsp;
Features of Java:  

Object-Oriented: Everything in Java is based on classes and objects.
Platform Independent: Java programs can run on any operating system.
Secure: Java provides built-in security features like bytecode verification.
Robust: Strong memory management and exception handling.
Multithreaded: Java allows multiple tasks to run simultaneously.
Portable: Java programs can run on different machines without modification.

&nbsp;
Java SE (Standard Edition):  
Used for core Java programming and desktop applications.

Java EE (Enterprise Edition):  
Used for building large-scale enterprise applications such as web services and distributed systems.

Java ME (Micro Edition):  
Used for small devices like embedded systems and IoT devices.

&nbsp;
How Java Works:  
Java follows the principle: "Write Once, Run Anywhere".

Step 1: Java source code is written in a .java file.
Step 2: The Java compiler (javac) converts the code into bytecode.
Step 3: The JVM executes the bytecode on any platform.

Flow:
```flow
Java Source Code (.java)
        ↓
Java Compiler (javac)
        ↓
Bytecode (.class)
        ↓
Java Virtual Machine (JVM)
        ↓
Program Output
```

JVM (Java Virtual Machine):  
JVM is the engine that runs Java programs. It converts Java bytecode into machine code so the system can execute it.

JRE (Java Runtime Environment):  
JRE provides the environment required to run Java programs. It includes JVM + libraries needed to run applications.

JDK (Java Development Kit):  
JDK is the full development package used to develop Java programs. It contains: JDK = JRE + Development Tools (compiler, debugger, etc.)

&nbsp;
Platform Independence:  
Java programs are platform independent because they run on the JVM. The same compiled Java bytecode can run on Windows, Linux, or Mac without changing the program. This concept is known as: "WORA – Write Once Run Anywhere"

First Java Program (Hello World):  
Below is the simplest Java program:
```java
public class HelloWorld {
    public static void main(String[] args) {
        // Print message to screen
        System.out.println("Hello World!");
    }
}
```
Explanation:  
public class HelloWorld:  
Defines a class named HelloWorld.

public static void main(String[] args):  
This is the main method where the program starts execution.

System.out.println():  
Used to print text on the console.

#### 2. JAVA SETUP
To start programming in Java, you need to install the Java Development Kit (JDK) and optionally an IDE (Integrated Development Environment).

#### STEP 1: DOWNLOAD JDK
Official Java download website: https://www.oracle.com/java/technologies/downloads/
Steps:
• Open the website above.
• Choose the latest version of JDK (for example JDK 21).
• Select your operating system: Windows, Linux, Mac.
• Download the installer.
• Accept the license agreement.
• Run the installer.

#### STEP 2: INSTALL JDK
Windows Installation Steps:
• Run the downloaded .exe file.
• Click Next.
• Choose installation directory (default is fine).
• Click Install.
• Wait for installation to complete.
• Click Finish.

#### STEP 3: SET JAVA PATH (IMPORTANT)
• Open Start Menu.
• Search "Environment Variables".
• Click "Edit the system environment variables".
• Click "Environment Variables".
• Under System Variables click "Path" -> Click Edit.
• Add the JDK bin folder path (Example: C:\Program Files\Java\jdk-21\bin).
• Click OK and save.

#### STEP 4: VERIFY JAVA INSTALLATION
Open Command Prompt or Terminal and run: `java -version`. If installed correctly, you will see output like: `java version "21"`. Also check compiler: `javac -version`.

#### STEP 5: INSTALL AN IDE
An IDE helps you write and manage Java code easily. Popular IDEs: IntelliJ IDEA, Eclipse, VS Code. Recommended: IntelliJ IDEA Community Edition.

#### STEP 6: COMPILE AND RUN JAVA PROGRAM
Create a file: `HelloWorld.java`. Write the code:
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```
Compile program: `javac HelloWorld.java` -> Run program: `java HelloWorld` -> Output: `Hello World`.

#### STEP 7: JAVA PROGRAM STRUCTURE
Basic structure of a Java program: Class Declaration, Main Method, Statements.
```java
public class ProgramName {
    public static void main(String[] args) {
        // program code
    }
}
```

### 3. JAVA BASICS
• Comments: Notes added to the code that are ignored by the compiler for documentation.
• Identifiers: Unique names assigned to classes, variables, and methods for identification.
• Keywords: Reserved words with special meaning that cannot be used as identifiers.
• Variables: Named memory locations used to store data values during program execution.
• Data Types: Define the type and size of data that a variable can hold (e.g., int, float).
• Type Casting: The process of converting a value from one data type to another type.
• Operators: Symbols used to perform mathematical or logical operations (Arithmetic, Logical, Relational, Bitwise, Assignment, Ternary).

### 4. CONTROL STATEMENTS
• if, if-else, nested if: Used for making decisions based on specific conditions.
• switch: A multi-way branch statement that executes different code paths based on values.
• loops (for, while, do-while): Repeat code blocks multiple times.
• break, continue, return: Commands used to control the flow of loops or exit a method.

### 5. METHODS
• Syntax, Parameters, Return Types: The defined structure and inputs/outputs for a block of code.
• Overloading, Recursion: Same method name with different parameters, or a method calling itself.
• Static vs Instance Methods: Methods belonging to the class versus those belonging to objects.
• Varargs, Command Line Arguments: Acceptance of variable number of arguments and terminal inputs.

### 6. ARRAYS
• Single & Multi Dimensional: Linear or grid-like collections of elements of the same data type.
• Jagged Arrays: Multi-dimensional arrays where rows can have different lengths.
• Array Class & Methods: Utility functions for sorting, searching, and manipulating arrays.

### 7. STRINGS
• String Class & Methods: Powerful tools for character sequence representation and manipulation.
• Immutability & Pool: Concept where string objects cannot be changed and are shared for efficiency.
• StringBuilder & StringBuffer: Mutable alternatives for frequent modifications (thread-safe for buffer).

### 8. OBJECT ORIENTED PROGRAMMING (OOP)
• Class & Object, Constructors & Overloading: Blueprints, instances, and initialization methods.
• this & super Keywords: References to current and parent class instances.
• Inheritance, Overriding, Polymorphism: Mechanisms for acquiring properties and multiple forms.
• Encapsulation, Abstraction: Hiding data and complexity while showing essential features.

### 9. PACKAGES & ACCESS CONTROL
• Packages & Import: organize related classes into namespaces and bring in external ones.
• Access Modifiers: Keywords (public, private, protected, default) controlling visibility.

### 10. IMPORTANT JAVA CONCEPTS
• static & final Keywords: Shared members and constants that cannot be changed.
• abstract Class, Object Class: Templates for subclasses and the root of all Java classes.
• Wrapper Classes, Autoboxing/Unboxing: Object versions of primitive types and their conversions.
• Enum, Inner Classes: Fixed collections of constants and nested class structures.

### 11. INTERFACES
• Basics, Implementation, Multiple Inheritance: defining contracts and supporting multiple form implementation.
• Default & Static Methods: interface methods with logic for backward compatibility.
• Functional, Marker, Nested Interfaces: Single-method, tag, and nested interface definitions.

### 12. EXCEPTION HANDLING
• try, catch, finally, throw, throws: structured error handling and signaling mechanisms.
• Types of Exceptions, Custom Exceptions: standard and user-defined error classes.
• Checked vs Unchecked: Compile-time versus runtime error management.

### 13. GENERICS
• Classes, Methods, Bounded Types, Wildcards: type-safe implementation for different data types.

### 14. COLLECTION FRAMEWORK
• List (ArrayList, LinkedList): Ordered collections for dynamic sequences.
• Set (HashSet, LinkedHashSet, TreeSet): collections that prevent duplicate elements.
• Queue (PriorityQueue, Deque): managing tasks in a specific processing order.
• Map (HashMap, LinkedHashMap, TreeMap): key-value pairs for fast data lookup.
• Iterator, Comparable, Comparator: tools for traversing and specialized sorting logic.

### 15. JAVA 8 FEATURES
• Lambda Expressions, Functional Interfaces: concise representation of anonymous functions.
• Stream API: functional-style processing on sequences of data.
• Optional Class, Date & Time API: modern tools for handling nulls and calendar data.

### 16. FILE HANDLING (I/O)
• File, FileInputStream/FileOutputStream: core components for reading/writing raw data.
• FileReader/FileWriter, BufferedReader/BufferedWriter: character-based and buffered IO tools.
• Serialization/Deserialization: converting objects to byte streams and back.

### 17. MULTITHREADING
• Thread Class & Runnable: fundamental ways to create concurrent tasks.
• Lifecycle, Synchronization, Deadlocks: managing thread states and preventing conflicts.
• Executor Framework: advanced thread pool and task management system.

### 18. REGULAR EXPRESSIONS
• Pattern & Matcher Classes: used to define and execute search patterns on text.

### 19. MEMORY MANAGEMENT
• Stack & Heap: memory regions for method execution and object storage.
• JVM Architecture, Garbage Collection: internal JVM structure and automatic memory reclamation.

### 20. NETWORKING
• Sockets, TCP/UDP: endpoints and protocols for machine-to-machine communication.
• URL, HTTP Connections: tools for interacting with web resources and APIs.

### 21. DATABASE CONNECTIVITY (JDBC)
• Architecture, Drivers, Connection: connecting Java applications to database systems.
• Statements, ResultSet: executing SQL commands and processing retrieved data.

### 22. JAVA MODULE SYSTEM
• module-info.java, Modular Apps: explicit dependency and visibility definitions for modules.

### 23. BUILD TOOLS
• Maven, Gradle: automated dependency management and build orchestration.

### 24. TESTING
• JUnit, Unit Testing, Mockito: frameworks for automated testing and isolated mocking.

### 25. LOGGING
• sfl4j, log4j, java.util.logging: libraries for recording system events and errors.

### 26. DESIGN PATTERNS
• Singleton, Factory, Builder: creational patterns for efficient object instantiation.
• Observer, Strategy, MVC: structural and behavioral patterns for application logic.

### 27. ENTERPRISE JAVA
• Spring Boot, Hibernate, REST APIs, Microservices: frameworks for scalable enterprise systems.

### 28. PROJECTS
• Beginner: Calculator, Guessing Game: simple projects to learn basic programming logic.
• Intermediate: Banking System, Chat App: complex systems for deeper practice.
• Advanced: E-commerce, Microservices API: production-scale enterprise architectures.
