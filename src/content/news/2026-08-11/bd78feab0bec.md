---
title: "Vars and muts )ruff("
originalUrl: "https://dev.to/tyrkanzyka/vars-and-muts-ruff-2i1l"
date: "2026-08-10T22:09:29.420Z"
---

# Vars and muts (Rust)

Okay, I've used the Rust book online and W3Schools mostly to learn most of what I know. Plus a video or two, but I can't focus on them as well. Alright, first time putting this to text, but I'll try and explain the concepts, how I myself understand them. From Ch 3 of the Rust book.
我主要通过在线的 Rust 官方教程和 W3Schools 来学习。虽然也看过一两个视频，但我很难集中注意力。好吧，这是我第一次尝试用文字记录，我会试着解释这些概念，以及我是如何理解它们的。内容来自 Rust 教程的第三章。

So in CH 3 it essentially focuses on variables (your x's, y's etc. etc.) and how variables in Rust are by def not able to be changed, "immutable" by the book. The gist of why is that it guarantees the variable isn't changed when it's not supposed to be or by another function.
第三章主要关注变量（比如 x, y 等等），以及 Rust 中的变量默认是如何不可更改的，书中称之为“不可变（immutable）”。其核心原因在于，它能保证变量在不该被改变时，或者被其他函数意外修改时，保持不变。

It also just serves like a safety blanket of sorts, say if you were to have a huge program. You use "let x = 5" you'll know that x = 5 EVERYWHERE. It won't change because the program won't run, you won't even get past the compiler if you try and change the value without saying it can change.
这就像是一种安全保障，假设你有一个庞大的程序。当你使用 `let x = 5` 时，你会知道在任何地方 `x` 都等于 5。它不会改变，因为如果没声明变量可变却试图修改其值，程序根本无法运行，甚至连编译器都过不去。

This helps in stopping bugs from cropping up, specially since it's how malactors get in. It helps debugging by knowing what can and can't flip a bit. Plus if you're building robust code, less stuff changing is better, cuz less stuff fails. Like a car.
这有助于防止 Bug 的产生，特别是考虑到恶意攻击者往往利用这一点。通过明确哪些变量可以改变、哪些不能，这也有助于调试。此外，如果你在构建健壮的代码，变动越少越好，因为出错的概率就越低。就像汽车一样。

```rust
fn main() {
    let x = 5;
    x = 20294; // you can't change this, it'll show as an error since your "x" isn't "mut" mutable, or changeable.
    // 你不能修改它，这会报错，因为你的 "x" 不是 "mut"（可变的）。
}
```

Simple, right? Roast me if wrong.
很简单，对吧？如果我说错了，欢迎指正。

08.10.26 - Tyr