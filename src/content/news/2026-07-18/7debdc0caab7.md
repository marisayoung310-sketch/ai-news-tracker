---
title: "I Reduced a 12-Second SQL Query to 300ms Without Changing the Server"
originalUrl: "https://dev.to/aasimghaffar/i-reduced-a-12-second-sql-query-to-300ms-without-changing-the-server-mch"
date: "2026-07-17T22:23:45.946Z"
---

# I Reduced a 12-Second SQL Query to 300ms Without Changing the Server
# 我在不更换服务器的情况下，将 12 秒的 SQL 查询优化到了 300 毫秒

Performance optimization isn't always about buying better hardware. Sometimes, it's about asking the database the right question.
性能优化并不总是意味着购买更好的硬件。有时，关键在于如何向数据库提出正确的问题。

### Introduction
### 引言

A slow application can quickly become a frustrating experience for users. Whether it's an e-commerce platform, a SaaS dashboard, or a reporting system, database performance often becomes the hidden bottleneck as data grows. Recently, I worked on optimizing a SQL query that consistently took around 12 seconds to execute. The interesting part? I didn't upgrade the server, increase memory, or add more CPU resources. Instead, I focused on understanding how the database was processing the query. After analyzing the execution plan and making a few targeted improvements, the execution time dropped to around 300 milliseconds. This experience reinforced an important lesson: Database performance is rarely just a hardware problem—it's often a query design problem.
缓慢的应用程序很快就会让用户感到沮丧。无论是电子商务平台、SaaS 仪表板还是报表系统，随着数据量的增长，数据库性能往往会成为隐藏的瓶颈。最近，我优化了一个执行时间始终在 12 秒左右的 SQL 查询。有趣的是，我没有升级服务器、增加内存或添加 CPU 资源。相反，我专注于理解数据库是如何处理该查询的。在分析了执行计划并进行了一些针对性的改进后，执行时间下降到了 300 毫秒左右。这次经历强化了一个重要的教训：数据库性能很少仅仅是硬件问题，它通常是查询设计问题。

### The Problem
### 问题所在

The application had grown significantly over time. What once handled thousands of records was now processing millions. Users were reporting: Slow dashboard loading, Delayed reports, Long waiting times when filtering data, Increased database resource usage. The query itself wasn't particularly complicated. It joined several tables, filtered records based on multiple conditions, sorted the results, and returned paginated data. On paper, everything looked reasonable. In practice, it was taking over 12 seconds.
随着时间的推移，该应用程序规模显著增长。曾经处理数千条记录的系统现在需要处理数百万条。用户反馈的问题包括：仪表板加载缓慢、报表延迟、数据筛选等待时间过长以及数据库资源占用增加。查询本身并不复杂，它连接了几个表，根据多个条件筛选记录，对结果进行排序，并返回分页数据。从理论上看，一切都很合理，但在实际操作中，它却耗时超过 12 秒。

### My First Step: Don't Guess
### 第一步：不要猜测

One of the biggest mistakes developers make is immediately trying random optimizations. Instead, I started by asking one simple question: Why is the database taking so long? Rather than rewriting everything, I analyzed the query execution plan. The execution plan quickly revealed several issues: Full table scans, Inefficient joins, Missing indexes, Expensive sorting operations, Unnecessary columns being selected. Instead of treating the symptoms, I focused on fixing the root causes.
开发人员常犯的最大错误之一就是盲目尝试各种随机优化。相反，我从一个简单的问题开始：为什么数据库需要这么长时间？我没有重写所有代码，而是分析了查询执行计划。执行计划很快揭示了几个问题：全表扫描、低效的连接、缺失索引、昂贵的排序操作以及选择了不必要的列。我没有只处理表面症状，而是专注于解决根本原因。

### The Optimizations
### 优化措施

**1. Eliminating Full Table Scans**
The first issue was that the database was scanning entire tables even when only a small subset of records was needed. Adding carefully planned indexes allowed the database engine to locate the required rows almost instantly instead of reading millions of unnecessary records. The difference was immediately noticeable.
**1. 消除全表扫描**
第一个问题是，即使只需要一小部分记录，数据库也在扫描整个表。添加精心规划的索引后，数据库引擎几乎可以立即定位到所需的行，而无需读取数百万条不必要的记录。这种差异立竿见影。

**2. Reviewing Every JOIN**
JOIN operations are powerful, but they're also one of the most common reasons for slow SQL queries. I reviewed every join individually and asked: Is this table actually required? Can the filtering happen before joining? Are both columns indexed? Is there a better join order? Removing unnecessary work reduced the amount of data flowing through the query.
**2. 审查每一个 JOIN**
JOIN 操作功能强大，但它们也是导致 SQL 查询缓慢的最常见原因之一。我逐一审查了每个连接，并思考：这个表真的需要吗？筛选可以在连接之前完成吗？两个列都有索引吗？是否有更好的连接顺序？移除不必要的工作减少了查询中流动的数据量。

**3. Selecting Only Required Columns**
One surprisingly common mistake is using `SELECT *`. While convenient during development, it often retrieves far more data than needed. Replacing it with only the required columns reduced: Memory usage, Network traffic, Disk reads. Small improvement individually. Significant improvement overall.
**3. 只选择所需的列**
一个令人惊讶的常见错误是使用 `SELECT *`。虽然在开发过程中很方便，但它通常会检索比实际需要多得多的数据。将其替换为仅需要的列，减少了：内存使用、网络流量、磁盘读取。单个改进虽小，但整体提升显著。

**4. Filtering Earlier**
Another optimization involved pushing filters as early as possible. Instead of joining large datasets first and filtering later, I filtered records before expensive operations occurred. This reduced the workload dramatically.
**4. 尽早筛选**
另一项优化涉及尽可能早地应用筛选器。我没有先连接大型数据集再进行筛选，而是在昂贵的操作发生之前就筛选了记录。这极大地减轻了工作负载。

**Improving Sorting**
Sorting millions of rows is expensive. By combining appropriate indexes with better query structure, the database avoided unnecessary sort operations altogether.
**改进排序**
对数百万行进行排序代价高昂。通过结合适当的索引和更好的查询结构，数据库完全避免了不必要的排序操作。

### The Result
### 结果

**Before optimization:** Execution time: ~12 seconds, High CPU usage, Heavy disk activity, Poor user experience.
**After optimization:** Execution time: ~300 milliseconds, Significantly lower database load, Faster application response, Better scalability. All achieved without changing the server specifications.
**优化前：** 执行时间约 12 秒，CPU 使用率高，磁盘活动频繁，用户体验差。
**优化后：** 执行时间约 300 毫秒，数据库负载显著降低，应用程序响应更快，可扩展性更好。所有这些都是在不更改服务器配置的情况下实现的。

### Then I asked AI...
### 然后我问了 AI……

Out of curiosity, I shared the problem with an AI coding assistant. Its recommendations included: Increase server RAM, Upgrade database hardware, Add caching immediately, Scale vertically, Use a faster cloud instance. None of these suggestions addressed the actual bottleneck. The issue wasn't hardware. It was query execution. AI generated reasonable generic advice—but it couldn't inspect the execution plan, understand the application's workload, or identify the real source of the slowdown without deeper context.
出于好奇，我与 AI 编程助手分享了这个问题。它的建议包括：增加服务器内存、升级数据库硬件、立即添加缓存、垂直扩展、使用更快的云实例。这些建议都没有解决实际的瓶颈。问题不在于硬件，而在于查询执行。AI 生成了合理的通用建议，但如果没有更深入的上下文，它无法检查执行计划、理解应用程序的工作负载或识别减速的真正来源。

### Why Engineering Judgment Still Matters
### 为什么工程判断依然重要

AI has become an incredible productivity tool. It can: Explain SQL syntax, Suggest query structures, Generate boilerplate code, Recommend best practices, Help troubleshoot common issues. But performance engineering often requires context. It requires understanding: Data distribution, Business logic, Database statistics, Execution plans, Index selectivity, Query costs, Real production workloads. These are decisions that still depend on engineering judgment. AI can assist. It shouldn't replace thoughtful analysis.
AI 已经成为一种不可思议的生产力工具。它可以：解释 SQL 语法、建议查询结构、生成样板代码、推荐最佳实践、帮助排查常见问题。但性能工程通常需要上下文。它需要理解：数据分布、业务逻辑、数据库统计信息、执行计划、索引选择性、查询成本、真实的生产工作负载。这些决策仍然依赖于工程判断。AI 可以提供辅助，但不应取代深入的分析。

### Lessons I Took Away
### 我的收获

This optimization reminded me of a few principles I try to follow on every project:
* Measure before optimizing.
* Never assume hardware is the problem.
* Read the execution plan before rewriting queries.
* Good indexing is often worth more than bigger servers.
* Avoid premature optimization, but don't ignore obvious inefficiencies.
* Performance improvements should be based on evidence, not assumptions.
这次优化提醒了我几个在每个项目中都应遵循的原则：
* 先测量，再优化。
* 永远不要假设问题出在硬件上。
* 在重写查询之前，先阅读执行计划。
* 良好的索引往往比更大的服务器更有价值。
* 避免过早优化，但不要忽视明显的低效。
* 性能改进应基于证据，而非假设。

### Final Thoughts
### 结语

Modern databases are incredibly powerful, but they perform best when we help them do less work. A well-designed query can outperform expensive infrastructure upgrades. Sometimes, a few carefully considered changes are enough to transform the performance of an application. And while AI continues to improve and has become an excellent development companion, experiences like this remind us that engineering is still about understanding systems, asking the right questions, and making informed decisions based on evidence. The best solutions rarely come from guessing—they come from careful observation, testing, and continuous learning.
现代数据库功能极其强大，但当我们帮助它们减少工作量时，它们的表现最好。一个设计良好的查询可以胜过昂贵的基础设施升级。有时，一些经过深思熟虑的改动就足以改变应用程序的性能。虽然 AI 不断进步并已成为优秀的开发伙伴，但这样的经历提醒我们，工程学仍然关乎理解系统、提出正确的问题，并基于证据做出明智的决策。最好的解决方案很少来自猜测，它们来自仔细的观察、测试和持续的学习。