---
title: "The Art of 64-bit Assembly"
originalUrl: "https://nostarch.com/art-64-bit-assembly-v2"
date: "2026-08-01T22:15:00.680Z"
---

# The Art of 64-bit Assembly
# 《64位汇编的艺术》

**The Art of 64-Bit Assembly, Volume 2: Machine-Level OOP, Exceptions, and Concurrency by Randall Hyde**
**《64位汇编的艺术》第二卷：机器级面向对象编程、异常处理与并发，作者：Randall Hyde**

Available June 2026, 792 pp. ISBN-13: 9781718504349. Print Book and FREE Ebook, $79.99. Ebook (PDF, Mobi, and ePub), $63.99. Pre-Order Use coupon code PREORDER to get 25% off!
预计2026年6月出版，共792页。ISBN-13: 9781718504349。纸质书（含免费电子书）售价79.99美元，电子书（PDF、Mobi及ePub格式）售价63.99美元。预购请使用优惠码 PREORDER 可享75折优惠！

You can ask an AI to explain how vtables work in x86. It will give you something that sounds right. What it won’t give you is what Windows actually expects the vtable to look like, why method dispatch behaves the way it does at the instruction level, or what breaks when you deviate from convention.
你可以让AI解释x86架构下虚函数表（vtables）的工作原理。它会给你一个听起来很合理的答案。但它无法告诉你Windows实际上期望虚函数表是什么样子，为什么方法分发在指令层面表现出特定的行为，或者当你偏离惯例时会发生什么故障。

This volume of The Art of 64-Bit Assembly closes the gap between a plausible explanation and genuine understanding. Every chapter takes a construct you’ve used in C++, Python, or Rust, strips away the runtime, and rebuilds it from scratch in MASM, running under Windows. Objects, exceptions, closures, coroutines, concurrency: Each is dissected at the instruction level, with every decision made visible and explicit.
《64位汇编的艺术》这一卷旨在填补“看似合理的解释”与“真正理解”之间的鸿沟。每一章都会选取你在C++、Python或Rust中使用过的结构，剥离其运行时环境，并在Windows环境下使用MASM（微软宏汇编）从零开始重建。对象、异常、闭包、协程、并发：每一个概念都将在指令层面被剖析，使每一个决策都变得清晰可见。

**What you’ll build:**
**你将构建的内容：**

*   Object-oriented programs in MASM: vtables, method dispatch, and inheritance, from scratch by hand
*   在MASM中编写面向对象程序：从零开始手动实现虚函数表、方法分发和继承。
*   Windows structured exception handling (SEH) installed and managed at the instruction level
*   在指令层面安装并管理Windows结构化异常处理（SEH）。
*   Thunks, closures, and iterators that behave like higher-order functions
*   表现如同高阶函数的Thunks（形实转换程序）、闭包和迭代器。
*   Coroutines, generators, and fibers without resorting to HLL code
*   无需依赖高级语言（HLL）代码即可实现协程、生成器和纤程。
*   Concurrent programs with real synchronization primitives, directly from assembly
*   直接使用汇编语言实现带有真实同步原语的并发程序。
*   Unicode string handling done correctly, at the level where most code gets it wrong
*   在大多数代码容易出错的层面，正确处理Unicode字符串。
*   Domain-specific macro languages inside MASM, built from first principles
*   基于基本原理，在MASM内部构建领域特定宏语言。

If you already know assembly and want to stop taking the hard parts on faith, this is the book.
如果你已经掌握了汇编语言，并且不想再对那些难点“盲目相信”，那么这就是你需要读的书。

**Author Bio**
**作者简介**

Randall Hyde has spent decades writing assembly for medical devices, nuclear systems, and embedded hardware where correctness is not optional. He taught assembly language programming at the university level and is the author of The Art of Assembly Language, The Art of ARM Assembly, and the Write Great Code series, all from No Starch Press.
Randall Hyde花费了数十年时间为医疗设备、核系统和嵌入式硬件编写汇编代码，在这些领域，正确性是必须保证的。他曾在大学教授汇编语言编程，著有《汇编语言的艺术》、《ARM汇编的艺术》以及《编写高质量代码》（Write Great Code）系列丛书，均由No Starch Press出版。

**Table of Contents**
**目录**

*   Acknowledgments (致谢)
*   Introduction (引言)
*   Chapter 1: Advanced Macros (第1章：高级宏)
*   Chapter 2: Unicode Strings (第2章：Unicode字符串)
*   Chapter 3: Transcendental Functions (第3章：超越函数)
*   Chapter 4: Advanced Procedures (第4章：高级过程)
*   Chapter 5: Concurrent Programming (第5章：并发编程)
*   Chapter 6: Object-Oriented Programming With MASM (第6章：MASM面向对象编程)
*   Chapter 7: Exception Handling (第7章：异常处理)
*   Chapter 8: Thunks and Closures (第8章：Thunks与闭包)
*   Chapter 9: Advanced Parameter Implementation (第9章：高级参数实现)
*   Chapter 10: Iterators (第10章：迭代器)
*   Chapter 11: Coroutines, Generators, and Fibers (第11章：协程、生成器与纤程)
*   Appendix A: ASCII Character Set (附录A：ASCII字符集)
*   Appendix B: Glossary (附录B：术语表)
*   Appendix C: Installing and Using Visual Studio (附录C：安装与使用Visual Studio)
*   Index (索引)