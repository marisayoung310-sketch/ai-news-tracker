---
title: "Advanced C# Generics: Contravariance, Custom Comparers and Real Abstractions"
originalUrl: "https://dev.to/manoharij/advanced-c-generics-contravariance-custom-comparersand-real-abstractions-5711"
date: "2026-07-02T22:39:20.981Z"
---

# Advanced C# Generics: Contravariance, Custom Comparers and Real Abstractions
# C# 高级泛型：逆变、自定义比较器与实际抽象

A previous post on TechStack blog covered the foundations of C# generics - generic classes, methods, basic constraints, and the five main collection types. A reader on Dev.to asked specifically for a contravariant collection base class example. A separate comment noted the first post was too light for senior level. Both pieces of feedback point at the same gap: there is a meaningful difference between using generics and designing with them. This post covers the patterns that belong in the second category, with complete working code throughout.

TechStack 博客之前的一篇文章介绍了 C# 泛型的基础知识——泛型类、方法、基本约束以及五种主要的集合类型。一位 Dev.to 的读者专门询问了关于逆变集合基类的示例。另一条评论则指出，第一篇文章对于资深开发者来说内容过于浅显。这两条反馈都指向了同一个差距：使用泛型与利用泛型进行设计之间存在着本质的区别。本文将涵盖属于后者的设计模式，并提供完整的可运行代码。

### Quick Recap
### 快速回顾

The previous post covered these foundations:
上一篇文章涵盖了以下基础内容：

```csharp
// Generic class - type filled at point of use
// 泛型类 - 在使用时填充类型
public class Box<T> {
    private T _item;
    public void Store(T item) => _item = item;
    public T Retrieve() => _item;
}

// Generic method - type inferred from argument
// 泛型方法 - 类型从参数中推断
public T GetFirst<T>(List<T> items) => items.Count > 0 ? items[0] : default(T)!;

// Basic constraints
// 基本约束
where T : class // reference types only (仅限引用类型)
where T : new() // has parameterless constructor (具有无参构造函数)
where T : IComparable<T> // supports comparison (支持比较)
```

This post builds directly on that foundation.
本文将直接在此基础上进行深入探讨。

---

### Part 1: Covariance and Contravariance, Properly
### 第一部分：协变与逆变，正本清源

#### The Direction Problem
#### 方向问题

Generics are invariant by default. A `List<string>` is not a `List<object>`, even though every string is an object. This is correct behavior:
泛型默认是不变的（invariant）。`List<string>` 并不是 `List<object>`，尽管每个字符串都是对象。这是正确的行为：

```csharp
List<string> strings = new List<string>();
// Does NOT compile - correct behavior
// 无法编译 - 这是正确的行为
List<object> objects = strings; 

// If it compiled, strings would now contain an int 
// and crash at runtime - this is why invariance exists
// 如果能编译，strings 现在就会包含一个 int，导致运行时崩溃 - 这就是存在不变性的原因
objects.Add(42);
```

Covariance and contravariance are the two safe exceptions to this rule, and they work in opposite directions for a specific reason.
协变（Covariance）和逆变（Contravariance）是这条规则的两个安全例外，它们出于特定原因向相反的方向运作。

#### Covariance - Safe to Widen the Type (out T)
#### 协变 - 安全地扩大类型 (out T)

Covariance is safe when a generic type only ever PRODUCES values of T, never accepts them. If you can only read T out, widening is safe because every string you read out is already an object.
当泛型类型仅“生产”T 类型的值而不接受它们时，协变是安全的。如果你只能读取 T，那么扩大类型是安全的，因为你读出的每个字符串本身就是一个对象。

```csharp
// IEnumerable<T> is declared as IEnumerable<out T>
// It only produces T via foreach, never accepts it
// IEnumerable<T> 被声明为 IEnumerable<out T>
// 它仅通过 foreach 生产 T，从不接受它
IEnumerable<string> strings = new List<string> { "hello", "world" };

// Compiles - safe covariance
// 编译通过 - 安全的协变
IEnumerable<object> objects = strings;
foreach (var obj in objects) Console.WriteLine(obj); // "hello", "world"

// Your own covariant interface
// 自定义的协变接口
public interface IProducer<out T> {
    T Produce(); // only ever RETURNS T - safe to widen (仅返回 T - 扩大类型是安全的)
}
```

#### Contravariance - Safe to Narrow the Type (in T)
#### 逆变 - 安全地缩小类型 (in T)

Contravariance is safe when a generic type only ever CONSUMES values of T, never produces them. If something handles any object, it certainly handles a string.
当泛型类型仅“消费”T 类型的值而不生产它们时，逆变是安全的。如果某个东西能处理任何对象，它当然也能处理字符串。

```csharp
// Action<T> is declared as Action<in T>
// It only consumes T as a parameter, never returns it
// Action<T> 被声明为 Action<in T>
// 它仅将 T 作为参数消费，从不返回它
Action<object> processObject = obj => Console.WriteLine(obj.GetType().Name);

// Compiles - safe contravariance
// 编译通过 - 安全的逆变
Action<string> processString = processObject;
processString("hello"); // prints "String"

// Your own contravariant interface
// 自定义的逆变接口
public interface IConsumer<in T> {
    void Consume(T item); // only ACCEPTS T - safe to narrow (仅接受 T - 缩小类型是安全的)
}
```

The rule in plain English: `out T` means the type only produces T (safe to widen). `in T` means it only consumes T (safe to narrow).
用通俗的话说：`out T` 意味着该类型只生产 T（扩大类型是安全的）。`in T` 意味着它只消费 T（缩小类型是安全的）。

---

### The Contravariant Collection Base Class
### 逆变集合基类

Multiple concrete collections sharing a common generic base, usable polymorphically through a contravariant interface - the exact pattern requested on Dev.to.
多个具体集合共享一个通用的泛型基类，并通过逆变接口进行多态使用——这正是 Dev.to 上所要求的模式。

```csharp
// Data models
// 数据模型
public class Post { public int Id { get; set; } public string Title { get; set; } = ""; }
public class Tag { public string Name { get; set; } = ""; }

// Abstract generic base - shared behaviour
// 抽象泛型基类 - 共享行为
public abstract class EntityCollectionBase<T> : IEnumerable<T> where T : class {
    protected readonly List<T> _items = new();
    public void Add(T item) => _items.Add(item);
    public IEnumerator<T> GetEnumerator() => _items.GetEnumerator();
    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}

// Contravariant consumer interface
// 逆变消费者接口
public interface ICollectionProcessor<in T> {
    void Process(IEnumerable<T> items);
}

// A processor for object handles ANY entity collection
// 处理 object 的处理器可以处理任何实体集合
public class ItemLogger : ICollectionProcessor<object> {
    public void Process(IEnumerable<object> items) { /* ... */ }
}

// The polymorphism in action
// 多态的应用
var posts = new PostCollection();
ICollectionProcessor<object> logger = new ItemLogger();

// Contravariance - one logger, all entity types
// 逆变 - 一个记录器，处理所有实体类型
ICollectionProcessor<Post> postLogger = logger;
```