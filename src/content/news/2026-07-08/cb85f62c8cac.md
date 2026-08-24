---
title: "Signed Integers By Default"
originalUrl: "https://www.gingerbill.org/article/2026/05/03/signed-by-default/"
date: "2026-07-07T22:39:42.055Z"
---

# Signed Integers By Default

As with many discussions in the programming space, there are “wars” between different ways of doing things. These are typically about minor aesthetic preferences, such as: Tabs vs Spaces for indentation, snake_case vs camelCase vs Ada_Case for naming conventions, 'single quote' vs "double quote" for strings (if the language allows both), 1TBS vs K&R vs Allman for {} brace styles. These wars are largely pointless; what actually matters is coherency and consistency in your coding style.
在编程领域，正如许多讨论一样，不同做法之间存在着“战争”。这些通常是关于细微的审美偏好，例如：缩进使用制表符（Tabs）还是空格（Spaces）；命名规范使用 snake_case、camelCase 还是 Ada_Case；字符串使用单引号还是双引号（如果语言两者都允许）；{} 大括号风格使用 1TBS、K&R 还是 Allman。这些战争大多毫无意义；真正重要的是编码风格的连贯性和一致性。

However, when it comes to designing a language, some binary choices have a massive impact. This article focuses on one such choice: whether to default to signed or unsigned integers. A fellow language designer, Christoffer Lernö, of the C3 language has written an article regarding his decision to change from unsigned integers to signed integers as the default integer kind for C3: *Unsigned sizes: a five year mistake*. I highly recommend the article as it does cover the discovery process and trade-offs that have to be made when designing a programming language.
然而，在设计一门编程语言时，某些二元选择会产生巨大的影响。本文重点讨论其中一个选择：默认使用有符号整数还是无符号整数。C3 语言的开发者 Christoffer Lernö 写了一篇文章，讲述了他决定将 C3 的默认整数类型从无符号改为有符号的原因：《Unsigned sizes: a five year mistake》（无符号大小：一个五年的错误）。我强烈推荐这篇文章，因为它涵盖了设计编程语言时必须经历的探索过程和权衡取舍。

### The Different Camps
### 不同的阵营

When designing Odin, I explicitly chose signed-by-default. I used to be in the unsigned-by-default camp many years before I even started Odin, but I’ve seen too many people make mistakes with unsigned arithmetic. It could be argued that unsigned is better “in theory”, but signed works better “in practice”. Personally, if something doesn’t work “in theory” in practice, then the “theory” was wrong to begin with and merely a false hypothesis.
在设计 Odin 时，我明确选择了默认有符号。在开始 Odin 之前，我曾多年处于“默认无符号”阵营，但我见过太多人在无符号算术运算上犯错。有人可能会争辩说无符号在“理论上”更好，但有符号在“实践中”效果更好。就我个人而言，如果某样东西在实践中行不通，那么“理论”从一开始就是错的，仅仅是一个错误的假设。

The most common problem is the mentality of using unsigned types to “enforce” that a value is never negative. The irony is that these same people do arithmetic assuming normal algebra rules apply, where subexpressions (e.g. the a-b part of a-b+c) can go negative even if the final result is positive. This leads to infinite loops and out-of-bounds errors. The “never negative” mentality is a fundamental misunderstanding of how integers work on the machine. You could call it a skill issue, but it’s so widespread that I don’t think that’s a fair dismissal.
最常见的问题是试图使用无符号类型来“强制”确保数值永远不会为负。讽刺的是，这些人进行算术运算时又假设遵循普通的代数规则，即子表达式（例如 a-b+c 中的 a-b 部分）即使最终结果为正，中间过程也可能变为负数。这会导致无限循环和越界错误。“永远不会为负”的心态是对机器如何处理整数的根本性误解。你可以称之为技术问题，但这种现象如此普遍，我认为将其简单归结为技术问题并不公平。

My colleague is in the *Almost Always Unsigned* camp. My biggest disagreement with him on this topic is that staying in that camp requires being highly competent and careful with every single operation, and even most highly competent programmers aren’t that careful all of the time. He knows all the edge cases and pathological cases, which I don’t think most unsigned-by-default advocates actually do. But the ones who do are exactly the people for whom the default integer kind matters least.
我的同事属于“几乎总是无符号”阵营。在这个话题上，我与他最大的分歧在于，留在该阵营需要具备极高的能力，并对每一个操作都极其小心，而即使是大多数能力极强的程序员也无法时刻保持这种谨慎。他了解所有的边界情况和病态情况，但我认为大多数“默认无符号”的倡导者其实并不了解。而那些真正了解的人，恰恰是默认整数类型对他们影响最小的人。

I also defined all integer arithmetic in Odin to be wrapping, both unsigned and signed, along with defining the results of operations like x / 0 (The user can define division-by-zero behavior compiler-wide or file-wide) and INT_MAX - INT_MIN so that they are not “undefined/illegal behaviour”. Lastly, it matters whether the language supports implicit numeric conversions. Many languages still perform implicit integer conversions, especially when no value information is lost. In Odin I disallowed even this, for many reasons, but a big one is that type information is lost even if the value is preserved. Making all conversions explicit makes intent clearer and gives the programmer the choice. As the article notes, many unsigned bugs in C arise from implicit conversions between signed and unsigned. Language design should account for the mistakes of past languages and understand the context they were made in, rather than reject entire ideas wholesale.
我还定义了 Odin 中所有的整数算术运算均为环绕（wrapping）模式，无论是无符号还是有符号，并定义了诸如 x / 0（用户可以在编译器范围或文件范围内定义除以零的行为）和 INT_MAX - INT_MIN 的结果，以确保它们不是“未定义/非法行为”。最后，语言是否支持隐式数值转换也很重要。许多语言仍然执行隐式整数转换，特别是在没有丢失数值信息的情况下。在 Odin 中，我甚至禁止了这一点，原因有很多，但其中一个重要原因是，即使数值被保留，类型信息也会丢失。使所有转换显式化可以使意图更清晰，并赋予程序员选择权。正如那篇文章所指出的，C 语言中许多无符号相关的 Bug 都源于有符号和无符号之间的隐式转换。语言设计应该考虑到过去语言所犯的错误，并理解它们产生的背景，而不是全盘否定整个想法。

### Possible Implicit Conversion Rules
### 可能的隐式转换规则

Implicit integer conversion rules can be complex or very simplistic, and different rulesets lead to different outcomes. Take this example:
隐式整数转换规则可能很复杂，也可能非常简单，不同的规则集会导致不同的结果。以这个例子为例：
```
a: u8 = 53
b: u8 = 34
c: u16 = a * b
```
The question is: what happens to a * b? These are the possible approaches:
问题是：a * b 会发生什么？以下是可能的处理方式：

1. **No implicit conversions (Odin-style)**: Option 0 makes this a type error and forces the user to specify the intended behavior.
   **无隐式转换（Odin 风格）**：选项 0 会将其视为类型错误，并强制用户指定预期的行为。
2. **Naïve unidirectional (bottom-up) type conversions**: Either wraps to 8 bits (even though 53 * 34 fits in 16 bits) or treats the overflow as illegal or traps.
   **朴素的单向（自底向上）类型转换**：要么环绕到 8 位（尽管 53 * 34 可以放入 16 位），要么将溢出视为非法或触发陷阱。
3. **Convert to the “natural” integer size, then implicitly truncate (C-style)**: The operation becomes u16(u32(a) * u32(b)), preserving the most value information and likely performing better with a natural integer size.
   **转换为“自然”整数大小，然后隐式截断（C 风格）**：操作变为 u16(u32(a) * u32(b))，保留了最多的数值信息，并且在自然整数大小下性能可能更好。
4. **Convert to the largest integer size, then implicitly truncate**: The same idea but uses a larger intermediate type such as u64 or u128.
   **转换为最大整数大小，然后隐式截断**：同样的思路，但使用更大的中间类型，如 u64 或 u128。
5. **Bidirectional (top-down) type conversions**: My preferred approach if I wanted implicit conversions: propagate the type hint from the left-hand side top-down so that it serves as the widest type down the syntax tree, resulting in u16(a) * u16(b) directly.
   **双向（自顶向下）类型转换**：如果我想要隐式转换，这是我首选的方法：从左侧自顶向下传播类型提示，使其作为语法树中最大的类型，直接得出 u16(a) * u16(b)。

Of these approaches, I believe option 1 to be the objectively worse approach to choose from when designing a language. It leads to the most bugs in practice if value information is wanted to be preserved, and does not allow for any performance optimizations allowing for widening.
在这些方法中，我认为选项 1 是设计语言时客观上最糟糕的选择。如果希望保留数值信息，它在实践中会导致最多的 Bug，并且不允许任何允许位宽扩展的性能优化。

### Overflow/Underflow, Wombling Free
### 溢出/下溢，自由自在

Some languages, such as Rust, treat overflowing arithmetic as a trap in debug builds (with a significant runtime cost) but as wrapping in release builds. I don’t like behavior that changes based on optimization level; I want things to behave the same unless I explicitly ask otherwise. A separate question is which is worse when it happens: overflow or underflow, with signed or unsigned. I’d argue that overflow is far less common than going below zero for both signed and unsigned integers. And because of this, underflow on unsigned integers is the more common bug, and more likely to cause serious problems than simply having a negative value.
一些语言（如 Rust）在调试构建中将溢出算术视为陷阱（伴随显著的运行时开销），但在发布构建中则视为环绕。我不喜欢根据优化级别而改变的行为；我希望事物表现一致，除非我明确要求改变。另一个独立的问题是：当溢出或下溢发生时，哪种情况更糟糕？我认为，对于有符号和无符号整数，溢出远比低于零的情况少见。正因如此，无符号整数的下溢是更常见的 Bug，并且比仅仅得到一个负值更容易导致严重问题。