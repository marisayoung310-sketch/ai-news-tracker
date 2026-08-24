---
title: "PExA: Parallel Exploration Agent for Complex Text-to-SQL"
originalUrl: "https://arxiv.org/abs/2604.22934"
date: "2026-04-29T06:29:19.716Z"
---

# PExA: Parallel Exploration Agent for Complex Text-to-SQL
# PExA：用于复杂 Text-to-SQL 的并行探索智能体

**Abstract:** LLM-based agents for text-to-SQL often struggle with latency-performance trade-off, where performance improvements come at the cost of latency or vice versa. 
**摘要：** 基于大语言模型（LLM）的 Text-to-SQL 智能体通常面临延迟与性能之间的权衡难题，即性能的提升往往以增加延迟为代价，反之亦然。

We reformulate text-to-SQL generation within the lens of software test coverage where the original query is prepared with a suite of test cases with simpler, atomic SQLs that are executed in parallel and together ensure semantic coverage of the original query. 
我们将 Text-to-SQL 的生成过程重新定义为软件测试覆盖问题：通过准备一系列包含更简单、原子化 SQL 的测试用例，并行执行这些用例，从而共同确保对原始查询的语义覆盖。

After iterating on test case coverage, the final SQL is generated only when enough information is gathered, leveraging the explored test case SQLs to ground the final generation. 
在对测试用例覆盖率进行迭代后，只有在收集到足够信息时才会生成最终的 SQL，并利用已探索的测试用例 SQL 为最终生成提供基础支撑。

We validated our framework on a state-of-the-art benchmark for text-to-SQL, Spider 2.0, achieving a new state-of-the-art with 70.2% execution accuracy.
我们在 Text-to-SQL 的前沿基准测试 Spider 2.0 上验证了该框架，以 70.2% 的执行准确率创下了新的业界最佳水平（SOTA）。