---
title: "The Secret to Reproducible and Portable Optimization: ORPilot’s Intermediate Representation (IR)"
originalUrl: "https://towardsdatascience.com/the-secret-to-reproducible-and-portable-optimization-orpilots-intermediate-representation-ir/"
date: "2026-06-17T23:06:15.956Z"
---

# The Secret to Reproducible and Portable Optimization: ORPilot’s Intermediate Representation (IR)
# 实现可复现与可移植优化的秘诀：ORPilot 的中间表示 (IR)

In my previous post, I walked through ORPilot’s four core innovations that makes ORPilot a production-oriented open-source LLM-for-OR tool, namely interview agent, data collection agent, parameter computation agent and intermediate representation (IR). Among the four innovations, the IR is the most important one that differentiates ORPilot from an academic prototype and endows it with the potential to be a production-level tool, since it deals with two issues that a production environment cares most about: reproducibility and portability. In this post, I will give you a deep dive into ORPilot’s IR structure.

在上一篇文章中，我介绍了 ORPilot 的四大核心创新，正是这些创新使 ORPilot 成为面向生产环境的开源“大模型+运筹学 (LLM-for-OR)”工具，即：访谈智能体、数据收集智能体、参数计算智能体以及中间表示 (IR)。在这四项创新中，IR 是最重要的一项，它将 ORPilot 与学术原型区分开来，并赋予其成为生产级工具的潜力，因为它解决了生产环境最关心的两个问题：可复现性和可移植性。在本文中，我将深入探讨 ORPilot 的 IR 结构。

### What Is IR?
### 什么是 IR？

There is a problem that almost nobody talks about when discussing AI-generated optimization models: what happens after the first solve? You get your model working. You get an optimal solution. And then three weeks later, you need to re-run it with updated demand data. Or your colleague on a different machine needs to reproduce the result. Or your company decides to switch from Gurobi to an open-source solver because of licensing costs. Or you want to ask “what if we increase the capacity of a facility by 20%?”

在讨论 AI 生成的优化模型时，几乎没人提到一个问题：第一次求解之后会发生什么？你让模型运行起来了，得到了最优解。三周后，你需要用更新后的需求数据重新运行它；或者你的同事在另一台机器上需要复现该结果；或者公司因为许可成本决定从 Gurobi 切换到开源求解器；又或者你想问“如果我们把设施产能提高 20% 会怎样？”

With most existing LLM-for-OR tools, the answer to all of these questions is the same: you need to start over, call the LLM again, pay the API cost again, generate the solver code again, and hope to get the same model structure. However, the open-source AI optimization modeling agent ORPilot provides an alternative solution to this problem: Intermediate Representation (IR).

对于大多数现有的 LLM-for-OR 工具，所有这些问题的答案都是一样的：你需要从头开始，再次调用大模型，再次支付 API 费用，再次生成求解器代码，并祈祷能得到相同的模型结构。然而，开源 AI 优化建模智能体 ORPilot 为此提供了一种替代方案：中间表示 (IR)。

The IR is a solver-agnostic, typed JSON schema that captures the complete mathematical structure of an optimization model. Not the optimization code, but the model itself, expressed in a form that is independent of any particular solver.

IR 是一种与求解器无关的、带类型的 JSON 模式，它捕获了优化模型的完整数学结构。它不是优化代码，而是模型本身，以一种独立于任何特定求解器的形式呈现。

ORPilot’s IR structure has five top-level sections:
(1) **Sets**: named collections of entities, such as Workers, Tasks, Plants, Periods. Each set knows where its members come from: a CSV file, a scalar count, or a hardcoded list.
(2) **Parameters**: indexed numerical data from CSV files, each linked to its domain (which sets index it) and to the exact column names needed to load it.
(3) **Variables**: decision variables with type (continuous, binary, integer), domain, bounds, and structural flags.
(4) **Objective**: a symbolic expression tree over variables and parameters — sums, differences, products, indexed sums in solver-neutral form.
(5) **Constraints**: named symbolic constraints with domains, expression trees, and sense (<= or = or >=). Every constraint is a complete, self-describing object.

ORPilot 的 IR 结构包含五个顶层部分：
(1) **集合 (Sets)**：实体的命名集合，例如工人、任务、工厂、周期。每个集合都知道其成员的来源：CSV 文件、标量计数或硬编码列表。
(2) **参数 (Parameters)**：来自 CSV 文件的索引数值数据，每个参数都链接到其域（由哪些集合索引）以及加载它所需的精确列名。
(3) **变量 (Variables)**：具有类型（连续、二进制、整数）、域、边界和结构标志的决策变量。
(4) **目标函数 (Objective)**：关于变量和参数的符号表达式树——以求解器中立的形式表示求和、差值、乘积和索引求和。
(5) **约束 (Constraints)**：具有域、表达式树和方向（<=、= 或 >=）的命名符号约束。每个约束都是一个完整的、自描述的对象。

### Worker-Task Assignment Problem Example
### 工人-任务分配问题示例

Let’s make this concrete by looking at a specific worker task assignment problem below. In this problem, four workers must be assigned to four tasks, one task per worker, one worker per task. Each (worker, task) pair has a cost from a CSV file. We try to minimize the total assignment cost.

让我们通过下面这个具体的工人-任务分配问题来具体说明。在这个问题中，四名工人必须分配给四项任务，每人一项任务，每项任务一人。每个（工人，任务）对都有一个来自 CSV 文件的成本。我们的目标是最小化总分配成本。

*(...IR JSON code omitted for brevity...)*

### Sets
### 集合

The “sets” field indicates where set members come from. The most important design decision in “sets” is the data source convention. ORPilot requires all set members to live in a single file called `sets.csv`, using a two-column format: “set_name” and “element”. Every set — entities (workers, tasks, plants) and time sets (periods, months) is a filtered slice of this file. In this problem, the “Workers” field says: load members from `sets.csv`, read the “element” column, keep only rows where “set_name” column equals “workers”. The result at compile time will be `Workers = ["w1", "w2", "w3", "w4"]`.

“sets”字段指明了集合成员的来源。“sets”中最关键的设计决策是数据源约定。ORPilot 要求所有集合成员都存放在一个名为 `sets.csv` 的文件中，并使用两列格式：“set_name”和“element”。每个集合——无论是实体（工人、任务、工厂）还是时间集合（周期、月份）——都是该文件的一个过滤切片。在这个问题中，“Workers”字段表示：从 `sets.csv` 加载成员，读取“element”列，仅保留“set_name”列等于“workers”的行。编译时的结果将是 `Workers = ["w1", "w2", "w3", "w4"]`。