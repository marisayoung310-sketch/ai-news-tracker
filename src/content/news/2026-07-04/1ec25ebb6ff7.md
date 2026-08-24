---
title: "Gossamer"
originalUrl: "https://gossamer-lang.org/"
date: "2026-07-03T22:34:47.223Z"
---

# Gossamer

**Expressive and clear syntax**
Forward pipes (`|>`), immutable by default, and one obvious way to do things. Data flows top-to-bottom, the way you wrote it - not nested inside-out.
**富有表现力且清晰的语法**
采用前向管道（`|> `），默认不可变，且推崇“做一件事只有一种显而易见的方法”。数据流从上到下，正如你书写的那样，而不是嵌套在内部。

**A Swift-like memory model**
Deterministic reference counting - closely modeled on Swift's ARC, with automatic cycle collection added - plus `arena { }` regions reclaim memory as it goes out of scope. No borrow checker, no lifetimes, no tracing collector.
**类 Swift 的内存模型**
确定性引用计数——紧密模仿 Swift 的 ARC，并增加了自动循环回收机制；此外，`arena { }` 区域可在内存超出作用域时进行回收。无需借用检查器（borrow checker）、生命周期（lifetimes）或追踪式垃圾回收器（tracing collector）。

**Real goroutines, colorless functions**
`go` and typed channels on an M:N scheduler. Blocking calls park the goroutine, not the thread. No `async`, no `await`, no function colouring.
**真正的 Goroutine，无函数颜色（Colorless functions）**
在 M:N 调度器上运行 `go` 关键字和类型化通道。阻塞调用会挂起 Goroutine，而不是线程。没有 `async`，没有 `await`，也没有函数颜色问题。

**Run it, or ship it**
A bytecode VM and a REPL for fast iteration; a single, dependency-free native binary via LLVM when you ship. Same language, your choice of tier.
**运行或发布**
提供字节码虚拟机和 REPL 以实现快速迭代；发布时通过 LLVM 生成单个、无依赖的本地二进制文件。同一门语言，由你选择运行层级。

**Familiar types, fewer surprises**
Result / Option / `?`, exhaustive match, traits, generics, and no null. If you know Rust, Go, or F#, you can already read it.
**熟悉的类型，更少的意外**
包含 Result / Option / `?`、穷举匹配（exhaustive match）、Trait、泛型，且没有 `null`。如果你了解 Rust、Go 或 F#，你已经可以读懂它了。

**Batteries included, extensible in Rust**
A broad standard library - HTTP, JSON, crypto, SQL, compression, and more - and a clean path to drop down into safe Rust when you need it.
**内置功能丰富，支持 Rust 扩展**
拥有广泛的标准库——涵盖 HTTP、JSON、加密、SQL、压缩等——并且在需要时，可以轻松地向下调用安全的 Rust 代码。