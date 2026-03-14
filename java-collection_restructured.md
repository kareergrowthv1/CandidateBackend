### Java Collection Framework (The Professional Architect's Guide)
The Collection Framework is the backbone of Java's data management. It provides a standardized set of interfaces and classes for storing and manipulating groups of objects efficiently.

#### 1. CORE INTERFACES HIERARCHY
The framework is organized into a clean hierarchy of interfaces to ensure type safety and interoperability.

| Interface | Description | Ordering | Uniqueness |
|-----------|-------------|----------|------------|
| **List** | Ordered collection (index-based). | Yes | No (Duplicates allowed) |
| **Set** | Unordered collection of unique items. | No | Yes (No duplicates) |
| **Queue** | Holds elements prior to processing (FIFO). | Yes | No |
| **Map** | Key-Value pairs. Not a true 'Collection' but part of the library. | Relative | Keys must be unique |

&nbsp;
#### 2. THE LIST INTERFACE (Sequential Power)
Used when the order of insertion matters or when indexed access is required.

- **ArrayList (The Workhorse):**
  - **Internal:** Uses a dynamic resizing array.
  - **Performance:** O(1) for access, O(n) for insertion/deletion (shifting required).
  - **Best For:** Frequent reading and occasional writing.
- **LinkedList (The Chain):**
  - **Internal:** Doubly linked list.
  - **Performance:** O(n) for access, O(1) for insertion/deletion (at pointers).
  - **Best For:** Frequent insertion/deletion from the middle or ends.

&nbsp;
#### 3. THE SET INTERFACE (Uniqueness Guaranteed)
Used to filter out duplicates and manage unique datasets.

- **HashSet:** Uses a Hash Table. O(1) performance but no order.
- **LinkedHashSet:** Maintains insertion order using a linked list alongside the hash table.
- **TreeSet:** Implements `SortedSet`. Elements are stored in a Red-Black tree (O(log n)).

&nbsp;
#### 4. THE MAP INTERFACE (Dictionary Logic)
Maps unique keys to specific values.

⚡ **TWIST QUESTION: HashMap vs HashTable**
- **HashMap:** Not synchronized (fast), allows one null key and multiple null values.
- **HashTable:** Synchronized (thread-safe but slow), no nulls allowed. (Legacy class).

&nbsp;
#### 5. ITERATOR & LISTITERATOR
- **Iterator:** Can traverse `List`, `Set`, and `Queue`. Only moves forward.
- **ListIterator:** Specific to `List`. Can move forward and backward. Allows element replacement.

&nbsp;
#### 6. COMPARISON TABLE: COLLECTION PERFORMANCE
| Class | Get | Add | Remove | Null Allowed |
|-------|-----|-----|--------|--------------|
| ArrayList | O(1) | O(1)* | O(n) | Yes |
| LinkedList | O(n) | O(1) | O(1) | Yes |
| HashSet | O(1) | O(1) | O(1) | Yes |
| TreeSet | O(log n)| O(log n)| O(log n)| No |
| HashMap | O(1) | O(1) | O(1) | Yes |

&nbsp;
#### 7. INTERVIEW MASTER TIPS
1. **Capacity vs. Size:** Capacity is the reserved memory; size is the actual number of elements.
2. **Fail-Fast vs. Fail-Safe:** 
   - **Fail-Fast (ArrayList/HashMap):** Throws `ConcurrentModificationException` if modified during iteration.
   - **Fail-Safe (CopyOnWriteArrayList):** Operates on a clone; no exception thrown.

#### 8. AI LEARNING LAB
Featured Prompt: Collection Selector
"Act as a System Architect. I need to store 1 million user records with unique IDs and frequent lookups by ID. Should I use an `ArrayList`, `HashSet`, or `HashMap`? Explain the memory and time trade-offs for each."
