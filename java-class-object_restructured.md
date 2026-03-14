### Class and Object in Java (Advanced Guide)
Java is a pure Object-Oriented Programming (OOP) language where everything is wrapped within classes. Understanding the relationship between a class (the blueprint) and an object (the physical entity) is the foundation of Java expertise.

#### 1. THE CLASS: LOGICAL BLUEPRINT
A class is a user-defined template or prototype from which objects are created. It represents the set of properties or methods that are common to all objects of one type.
- **Components:** Data members (fields), Methods, Constructors, Blocks, and Nested classes.
- **Memory:** A class declaration does not occupy memory space until an object is instantiated.

#### 2. THE OBJECT: PHYSICAL ENTITY
An object is a basic unit of Object-Oriented Programming and represents real-life entities. An object is an **instance** of a class.
- **State:** Represented by attributes (variables) of an object. It also reflects the properties of an object.
- **Behavior:** Represented by methods of an object. It also reflects the response of an object with other objects.
- **Identity:** A unique name/address given to an object that enables it to interact with other objects.

#### 3. OBJECT CREATION & STACK/HEAP INTERACTION
Objects are typically created using the `new` keyword, which performs three steps:
1. **Declaration:** `MyClass obj;` — Sets up a reference variable on the **Stack**.
2. **Instantiation:** `new MyClass();` — Allocates memory on the **Heap** for all instance variables.
3. **Initialization:** Invokes the constructor to set the initial state.

&nbsp;
Memory Mapping:
- The reference variable `obj` on the Stack holds the **memory address** of the actual object sitting on the Heap.
- If you do `MyClass obj2 = obj;`, NO new object is created. Both references now point to the same Heap object.

#### 4. CONSTRUCTORS: DEEP MECHANICS
A constructor is a block of code similar to a method that is called when an instance of an object is created.
- **No Return Type:** Not even `void`.
- **Default Constructor:** If you don't write any constructor, the Java compiler provides a "no-arg" default constructor.
- **Constructor Overloading:** Defining multiple constructors with different parameter lists.

&nbsp;
Constructor Chaining:
The process of calling one constructor from another constructor with respect to current object using `this()` or parent object using `super()`.

#### 5. THE 'THIS' KEYWORD
`this` is a reference variable that refers to the **current object**.
1. To invoke current class constructor: `this();`
2. To refer to current class instance variable: `this.name = name;`
3. To invoke current class method: `this.methodName();`
4. To pass as an argument in the method call.

#### 6. OBJECT CLASS & METHODS
In Java, `java.lang.Object` is the root of the class hierarchy. Every class has `Object` as a superclass.
Key Methods Inherited by all Objects:
toString(): Returns a string representation of the object.
equals(Object obj): Indicates whether some other object is "equal to" this one.
hashCode(): Returns a hash code value for the object (used in HashMaps).
getClass(): Returns the runtime class of this Object.
clone(): Creates and returns a copy of this object.

#### 7. ANONYMOUS OBJECTS
An object that is created but not assigned to a reference variable. It is used for immediate, one-time execution.
`new Student().displayInfo();`

#### 8. BEST PRACTICES: CLASS DESIGN
1. **Single Responsibility Principle (SRP):** A class should have only one reason to change.
2. **Encapsulation:** Make all variables `private` and provide controlled access via `public` getters/setters.
3. **Don't use `public` fields:** It breaks data integrity.
4. **Use meaningful names:** `class UserProfile` instead of `class UP`.

#### 9. AI LEARNING LAB: INTERACTIVE OOP
Master class design and object lifecycles by using our expert-verified AI prompts.

Featured Prompt: Design Pattern Architect
"Act as a Java Architect. I need to model a Banking System. Design the 'Account' class with proper encapsulation and explain how the 'Object' class methods like `equals()` and `hashCode()` should be overridden to handle unique account numbers."
