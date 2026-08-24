---
title: "NuCS vs Choco: A Pure-Python Constraint Solver Meets a JVM Veteran"
originalUrl: "https://towardsdatascience.com/nucs-vs-choco/"
date: "2026-06-11T23:11:46.562Z"
---

# NuCS vs Choco: A Pure-Python Constraint Solver Meets a JVM Veteran
# NuCS 对决 Choco：纯 Python 约束求解器与 JVM 老将的碰撞

**NuCS vs Choco: A Pure-Python Constraint Solver Meets a JVM Veteran. An in-depth performance test comparing Nucs and Choco.**
**NuCS 对决 Choco：纯 Python 约束求解器与 JVM 老将的碰撞。一份关于 Nucs 与 Choco 的深度性能对比测试。**

**TL;DR** NuCS is a constraint solver written 100% in Python, developed by me, accelerated by NumPy and Numba. Choco is one of the reference open-source constraint solvers, written in Java and developed for more than two decades. Comparing them looks lopsided: an interpreted language against a heavily optimized JVM solver with a rich catalog of arc-consistent global constraints. The reality is more interesting. When both solvers run the same model they are, for all practical purposes, the same speed — and on the largest instances NuCS actually pulls ahead, because once Numba has compiled the inner loops the Python tax is gone and only the cost-per-node remains.
**简而言之：** NuCS 是一个由我开发、完全用 Python 编写，并由 NumPy 和 Numba 加速的约束求解器。Choco 是开源约束求解器中的标杆之一，由 Java 编写，开发历史已超过二十年。将两者进行比较看起来有些悬殊：一边是解释型语言，另一边是经过深度优化的 JVM 求解器，且拥有丰富的弧相容（arc-consistent）全局约束库。但现实情况更有趣。当两个求解器运行同一个模型时，它们的实际速度几乎相同——而在处理最大规模的实例时，NuCS 甚至会领先，因为一旦 Numba 编译了内部循环，Python 的性能损耗就消失了，剩下的只有每个节点的计算成本。

When the models differ the result is a genuine trade rather than a rout: on some problems Choco’s arc consistency is the right, fast tool; on others NuCS’s cheap bound consistency plus a little remodeling wins outright; and on at least one problem NuCS’s modeling freedom lets it solve instances that neither plain solver can.
当模型不同时，结果是真正的权衡而非一边倒：在某些问题上，Choco 的弧相容是正确且快速的工具；而在另一些问题上，NuCS 低成本的边界相容（bound consistency）加上少许重构则能胜出；至少在一个问题上，NuCS 的建模自由度使其能够解决普通求解器无法处理的实例。

### NuCS History
### NuCS 的历史

NuCS is a project I recently started. Its first public release date is from 2024, and it has iterated very quickly since — the version benchmarked here is 11.2.0. It was built around a deliberately unusual bet: write a competitive finite-domain constraint solver entirely in Python, and recover the performance normally lost to interpretation through just-in-time compilation rather than a C or C++ core. It is distributed on PyPI (pip install nucs), which keeps installation as simple as any other Python package — no native toolchain, no JVM.
NuCS 是我最近启动的一个项目。其首次公开发布于 2024 年，此后迭代非常迅速——本文测试的版本是 11.2.0。它的构建基于一个刻意为之的非凡赌注：完全用 Python 编写一个具有竞争力的有限域约束求解器，并通过即时编译（JIT）而非 C 或 C++ 核心来挽回通常因解释执行而损失的性能。它通过 PyPI 分发（pip install nucs），安装过程像其他任何 Python 包一样简单——无需原生工具链，也无需 JVM。

### Architecture
### 架构

A Problem carries a NumPy array of variable domains — one (min, max) pair per variable, a variable being bound when min == max — together with a list of propagators. A propagator is a constraint’s filtering algorithm, registered under a numeric ALG_* identifier. Each propagator is three small functions: compute_domains_* — the actual filtering, returning inconsistency, consistency, or entailment; get_triggers_* — which domain events should re-wake the propagator; get_complexity_* — a cost estimate used to order the propagation queue.
一个“问题”（Problem）包含一个变量域的 NumPy 数组——每个变量对应一对 (min, max)，当 min == max 时变量即被绑定——以及一个传播器（propagator）列表。传播器是约束的过滤算法，通过数字 ALG_* 标识符注册。每个传播器由三个小函数组成：compute_domains_*（实际过滤，返回不相容、相容或蕴含状态）、get_triggers_*（哪些域事件应重新唤醒传播器）、get_complexity_*（用于对传播队列排序的成本估算）。

The BacktrackSolver interleaves propagation-to-a-fixpoint with a branching decision, chosen by a variable heuristic (which unbound variable to branch on) and a domain heuristic (which value to try). A MultiprocessingSolver fans several backtracking searches out over a split of the search space. What makes this fast despite being Python is that essentially every hot function is decorated with @njit(cache=True, fastmath=True). Numba compiles these to native code on first use and caches the result on disk, so a warm process runs compiled machine code, not interpreted bytecode.
BacktrackSolver（回溯求解器）将传播至不动点与分支决策交替进行，分支决策由变量启发式（选择哪个未绑定变量进行分支）和域启发式（尝试哪个值）决定。MultiprocessingSolver（多进程求解器）则将搜索空间拆分，并行展开多个回溯搜索。尽管是 Python 编写，但它之所以快，是因为本质上每个热点函数都使用了 @njit(cache=True, fastmath=True) 装饰。Numba 在首次使用时将这些函数编译为原生代码并缓存到磁盘上，因此热启动进程运行的是编译后的机器码，而非解释后的字节码。

### Choco History
### Choco 的历史

Choco is a veteran of the constraint-programming world. It first appeared around the turn of the 2000s and has been through several full rewrites. The modern lineage — Choco 3, then 4, and now 6 — is a ground-up redesign developed largely at IMT Atlantique (the TASC / LS2N research group in Nantes) by Charles Prud’homme, Jean-Guillaume Fages and contributors. It is an open-source Java library, distributed under a BSD license, and is widely used in both research and industry. The version benchmarked here is 6.0.1, a current release.
Choco 是约束编程界的资深老将。它最早出现在 2000 年代初，并经历了几次彻底的重写。其现代谱系——Choco 3、4 以及现在的 6——是由 IMT Atlantique（南特的 TASC / LS2N 研究小组）的 Charles Prud’homme、Jean-Guillaume Fages 及贡献者们主导的从零开始的重新设计。它是一个开源 Java 库，采用 BSD 许可证分发，广泛应用于学术研究和工业界。本文测试的版本是 6.0.1，即当前版本。

### Architecture
### 架构

Choco is an event-based constraint solver on the JVM. A Model holds integer, boolean, set and real variables together with Constraints; each constraint delegates filtering to one or more propagators driven by a fine-grained event/propagation engine. On top sits a configurable search loop with a large library of branching strategies, restart policies, and — historically a distinctive feature — explanations (conflict-based learning).
Choco 是 JVM 上基于事件的约束求解器。一个“模型”（Model）持有整数、布尔、集合和实数变量以及约束；每个约束将过滤任务委托给一个或多个由细粒度事件/传播引擎驱动的传播器。其上层是一个可配置的搜索循环，拥有庞大的分支策略库、重启策略，以及历史上的一大特色——解释（基于冲突的学习）。