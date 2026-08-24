---
title: "Java Questions on Collections"
originalUrl: "https://dev.to/tapaspal/java-questions-on-collections-d1o"
date: "2026-05-11T23:11:21.625Z"
---

# Java Questions on Collections: HashMap Internals

**Day-1 1. How does HashMap work internally?**
**第一天 1. HashMap 的内部工作原理是什么？**

**Answer: High-Level Internal Structure**
**回答：高层内部结构**

Internally, HashMap uses: Array + LinkedList + Red-Black Tree (Java 8+)
在内部，HashMap 使用：数组 + 链表 + 红黑树（Java 8 及以上版本）

**Internal Data Structure**
**内部数据结构**
`transient Node<K,V>[] table;`
This is an array of buckets. Each bucket stores: single node, linked list, or tree nodes.
这是一个桶数组。每个桶存储：单个节点、链表或树节点。

**Basic Working Flow**
**基本工作流程**
When you do: `map.put(key, value);`
HashMap performs:
1. Calculate `hashCode()`
2. Calculate bucket index
3. Store value in bucket
4. Handle collision if needed
当你执行 `map.put(key, value);` 时，HashMap 会执行：
1. 计算 `hashCode()`
2. 计算桶索引
3. 将值存储在桶中
4. 必要时处理哈希冲突

---

**Step-by-Step Example**
**分步示例**
`Map<Integer, String> map = new HashMap<>();`
`map.put(101, "John");`
`map.put(102, "David");`
`map.put(103, "Alex");`
Now let us understand internally what happens.
现在让我们了解内部发生了什么。

**Step 1: Create HashMap**
**第一步：创建 HashMap**
`Map<Integer, String> map = new HashMap<>();`
Internally: capacity = 16, loadFactor = 0.75, threshold = 12
Meaning: resize after 12 elements.
内部：容量 = 16，负载因子 = 0.75，阈值 = 12
含义：在存入 12 个元素后进行扩容。

**Internal Array**
**内部数组**
Initially: `table[16]`
Like: index 0, 1, 2 ... 15. All buckets empty initially.
初始状态：`table[16]`
例如：索引 0, 1, 2 ... 15。所有桶初始为空。

**Step 2: Insert First Entry**
**第二步：插入第一个条目**
`map.put(101, "John");`
**Internal Working:**
A. Calculate `hashCode()`: For 101, hash = 101.
B. Calculate Bucket Index: Formula `index = (n - 1) & hash`.
15 & 101 = 5.
So element stored in: bucket 5.
**内部工作：**
A. 计算 `hashCode()`：对于 101，哈希值 = 101。
B. 计算桶索引：公式 `index = (n - 1) & hash`。
15 & 101 = 5。
因此元素存储在：桶 5。

**Step 3: Insert Another Entry**
**第三步：插入另一个条目**
`map.put(102, "David");`
Hash: 102. Index: 15 & 102 = 6.
Stored at: bucket 6.
哈希值：102。索引：15 & 102 = 6。
存储在：桶 6。

**What is a Node Internally?**
**内部节点是什么？**
Simplified internal class:
```java
static class Node<K,V> {
    final int hash;
    final K key;
    V value;
    Node<K,V> next;
}
```
简化的内部类如上所示。

---

**Collision Handling**
**哈希冲突处理**
Now suppose: `map.put(117, "Mike");`
Why Collision Happens? Index formula: 15 & 117 = 5. Same bucket as 101.
Now What Happens? HashMap creates a linked list.
假设：`map.put(117, "Mike");`
为什么会发生冲突？索引公式：15 & 117 = 5。与 101 在同一个桶中。
现在发生了什么？HashMap 创建了一个链表。

**How Retrieval Works**
**检索是如何工作的**
Suppose: `map.get(117);`
Step 1: Calculate hash (117).
Step 2: Find bucket (15 & 117 = 5).
Step 3: Traverse nodes. HashMap checks `equals()` until matching key found.
假设：`map.get(117);`
第一步：计算哈希值 (117)。
第二步：找到桶 (15 & 117 = 5)。
第三步：遍历节点。HashMap 检查 `equals()` 直到找到匹配的键。

**Why equals() is Important?**
**为什么 equals() 很重要？**
Hash collision is possible. So HashMap uses: `hashCode()` and `equals()`. Both are mandatory.
哈希冲突是可能的。因此 HashMap 同时使用 `hashCode()` 和 `equals()`。两者缺一不可。

---

**Java 8 Optimization**
**Java 8 优化**
Before Java 8: collisions stored as linked list only. Problem: worst-case O(n).
Java 8 Improvement: If bucket size > 8, linked list converts to Red-Black Tree (Treeification).
Now complexity becomes: O(log n) instead of O(n).
Java 8 之前：冲突仅存储为链表。问题：最坏情况为 O(n)。
Java 8 改进：如果桶大小 > 8，链表转换为红黑树（树化）。
现在复杂度变为：O(log n) 而不是 O(n)。

**Important Interview Point: Why Capacity Always Power of 2?**
**面试重点：为什么容量总是 2 的幂？**
Because index calculation `(n - 1) & hash` is faster than modulo `hash % n`.
因为索引计算 `(n - 1) & hash` 比取模运算 `hash % n` 更快。

**Load Factor**
**负载因子**
Default: 0.75. Meaning: resize when 75% full.
默认值：0.75。含义：当 75% 满时进行扩容。

**Why Immutable Keys Recommended?**
**为什么推荐使用不可变键？**
Suppose: `class Employee { String name; }`
If name changes, `hashCode` changes, retrieval fails. Very dangerous.
That is why `String`, `Integer` (immutable objects) are recommended as keys.
假设：`class Employee { String name; }`
如果名字改变，`hashCode` 也会改变，导致检索失败。非常危险。
这就是为什么推荐使用 `String`、`Integer`（不可变对象）作为键。

**Time Complexity**
**时间复杂度**
| Operation | Average | Worst |
| :--- | :--- | :--- |
| put | O(1) | O(n) |
| get | O(1) | O(n) |
| remove | O(1) | O(n) |
Java 8 treeification improves worst case to O(log n).
Java 8 的树化将最坏情况改进为 O(log n)。

**Null Handling**
**空值处理**
HashMap allows: one null key, multiple null values.
Null key always stored in: bucket 0.
HashMap 允许：一个 null 键，多个 null 值。
Null 键总是存储在：桶 0。

**Important Differences**
**重要区别**
| Feature | HashMap | Hashtable |
| :--- | :--- | :--- |
| Thread-safe | No | Yes |
| Null allowed | Yes | No |
| Performance | Faster | Slower |