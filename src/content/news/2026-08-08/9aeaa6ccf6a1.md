---
title: "Making Postgres 300x faster for analytics: batching, operator fusion, and SIMD"
originalUrl: "https://malisper.me/how-we-made-postgres-hundreds-of-times-faster-the-query-engine/"
date: "2026-08-07T21:59:40.741Z"
---

# Making Postgres 300x faster for analytics: batching, operator fusion, and SIMD
# 让 Postgres 的分析性能提升 300 倍：批处理、算子融合与 SIMD

Last week we released version 0.2 of pgrust. This release was all about performance. It’s 10x faster than the previous version of pgrust. On OLTP benchmarks, pgrust is 30% faster than Postgres, and on Clickbench, Clickhouse’s benchmark for analytical databases, pgrust is 300x faster than Postgres. It’s even ahead of Clickhouse!
上周我们发布了 pgrust 的 0.2 版本。此次更新的核心在于性能提升。它的速度比上一版 pgrust 快了 10 倍。在 OLTP 基准测试中，pgrust 比 Postgres 快 30%；而在 Clickhouse 的分析型数据库基准测试 Clickbench 中，pgrust 比 Postgres 快 300 倍，甚至超越了 Clickhouse 本身！

The query engine is one of the biggest changes we made to achieve much better performance. On its own, the query engine drove ~10x of the 300x. We’ll start with a miniature version of the Postgres query engine and we’ll one by one add the same optimizations we made to make the pgrust query engine so fast.
查询引擎是我们实现性能飞跃所做的最大改动之一。仅查询引擎一项就贡献了 300 倍提升中的约 10 倍。我们将从一个 Postgres 查询引擎的微型版本开始，逐步加入我们为 pgrust 查询引擎所做的各项优化，从而实现极致性能。

To give some background on why there’s so much room for improvement vs Postgres, Postgres was created in a different era. The original Postgres project dates back to the 80s. It was built at a time when the main bottleneck to database performance was disk I/O.
为了说明为什么相比 Postgres 还有如此大的提升空间，我们需要了解背景：Postgres 诞生于另一个时代。最初的 Postgres 项目可以追溯到 80 年代，它构建于数据库性能的主要瓶颈在于磁盘 I/O 的时期。

Three trends have made that no longer the case:
1. Many datasets now fit in RAM, eliminating most disk I/O.
2. For datasets that don’t fit in RAM, the workloads differ. Data analytics scans data in bulk. The bottleneck is often no longer your disk throughput and is often either your CPU throughput or memory throughput.
3. Disks have gotten much faster in recent years. NVMe is hundreds of times faster than a hard drive.
All three trends have made CPU and memory speeds more important than they were historically. Many of the optimizations we’ve made target this.
有三个趋势改变了这一现状：
1. 许多数据集现在可以完全放入内存，消除了大部分磁盘 I/O。
2. 对于无法放入内存的数据集，工作负载也发生了变化。数据分析通常进行批量扫描，瓶颈往往不再是磁盘吞吐量，而是 CPU 或内存吞吐量。
3. 近年来磁盘速度大幅提升，NVMe 比传统硬盘快了数百倍。
这三个趋势使得 CPU 和内存速度比以往任何时候都更加重要。我们所做的许多优化正是针对这一点。

The query engine is the main user of CPU in a database. We optimized the pgrust query engine to use less CPU and less memory bandwidth than Postgres when processing the same queries.
查询引擎是数据库中 CPU 的主要消耗者。我们优化了 pgrust 查询引擎，使其在处理相同查询时比 Postgres 消耗更少的 CPU 和内存带宽。

To give you a sense of just how slow the Postgres query engine is, let’s take a simple query that sums the first 500 million numbers:
为了让你直观感受 Postgres 查询引擎有多慢，我们来看一个对前 5 亿个数字求和的简单查询：

```sql
CREATE TABLE my_table AS select col::float8 from generate_series(1.0, 500000000.0) g(col);
SELECT SUM(col) FROM my_table;
```

When I run this in Postgres, it takes ~20 seconds. This was done on a c8g.4xl with parallel queries disabled. For comparison, when I time the equivalent in Rust:
在 Postgres 中运行此查询大约需要 20 秒（测试环境为 c8g.4xl，已禁用并行查询）。相比之下，用 Rust 实现同样逻辑的耗时为：

```rust
let table: Vec<f64> = (1..=500_000_000usize).map(|i| i as f64).collect();
let mut sum = 0.0;
for &value in &table { sum += value; }
```

The query takes 358ms. That’s around 55x faster, and believe it or not, we can do even faster than 358ms.
该查询仅需 358 毫秒。这大约快了 55 倍，而且信不信由你，我们甚至可以做到比 358 毫秒更快。

Now this example isn’t an apples-to-apples comparison. There’s a lot more going on under the hood in Postgres. At the same time, optimizing a database is all about removing as much of this overhead as possible. (If you’re curious two of the biggest causes of overhead from Postgres are 1. locking and 2. parsing the Postgres storage format and extracting the tuples relevant to the query).
当然，这个例子并非完全对等的比较，Postgres 在底层做了更多的工作。但同时，优化数据库的核心就在于尽可能消除这些开销。（如果你好奇的话，Postgres 开销最大的两个来源是：1. 锁机制；2. 解析 Postgres 存储格式并提取查询相关的元组）。

To narrow our focus to just the impact of the query engine, let’s build a miniature version of the Postgres query engine. First, a brief explanation of what a query engine is. When processing your SQL query, Postgres first converts your query into an internal representation called a “Query Plan,” which describes *how* Postgres will execute the query.
为了将重点缩小到查询引擎的影响上，我们来构建一个 Postgres 查询引擎的微型版本。首先简要解释一下什么是查询引擎：当处理 SQL 查询时，Postgres 首先会将查询转换为一种称为“查询计划（Query Plan）”的内部表示，它描述了 Postgres 将*如何*执行该查询。

In the example above, Postgres will produce a query plan that may look something like the following:
在上面的例子中，Postgres 生成的查询计划可能如下所示：

This effectively says “get rows from my_table and sum the values in those rows”. This query plan is pretty simple given the nature of the query, but they can get much more complicated when you start working with joins/sorts/subqueries etc. In total Postgres has over 40 different types of plan nodes.
这实际上是在说“从 my_table 获取行并对这些行中的值求和”。鉴于查询的性质，这个查询计划非常简单，但当你开始处理连接（join）、排序（sort）或子查询时，它会变得复杂得多。Postgres 总共有超过 40 种不同类型的计划节点。

After generating the query plan, Postgres passes it to the query engine. The Postgres query engine is the part of Postgres that takes the query plan and actually retrieves the rows and performs the aggregation. Postgres uses a style of executor known as the “Volcano model.”
生成查询计划后，Postgres 会将其传递给查询引擎。Postgres 查询引擎负责接收查询计划，实际检索行并执行聚合操作。Postgres 使用了一种称为“火山模型（Volcano model）”的执行器风格。

To get a sense of how it works, here’s a miniature implementation of the Postgres query engine:
为了让你了解它是如何工作的，这里有一个 Postgres 查询引擎的微型实现：

```rust
use std::hint::black_box;

trait Node {
    fn next(&mut self) -> Option<f64>;
}

struct SeqScan<'a> {
    table: &'a [f64],
    pos: usize,
}

impl Node for SeqScan<'_> {
    fn next(&mut self) -> Option<f64> {
        if self.pos >= self.table.len() {
            return None; // end of table
        }
        let value = self.table[self.pos];
        self.pos += 1;
        Some(value)
    }
}

struct SumAggregate<'a> {
    child: Box<dyn Node + 'a>,
    total: f64,
    done: bool,
}

impl Node for SumAggregate<'_> {
    fn next(&mut self) -> Option<f64> {
        if self.done { return None; }
        while let Some(value) = self.child.next() {
            self.total += value;
        }
        self.done = true;
        Some(self.total)
    }
}

let table: Vec<f64> = (1..=500_000_000usize).map(|i| i as f64).collect();
let mut plan = SumAggregate {
    child: black_box(Box::new(SeqScan { table: &table, pos: 0 })),
    total: 0.0,
    done: false,
};
let sum = plan.next().unwrap();
```
(The black_box is needed to prevent compiler optimizations from thwarting our benchmark)
（使用 `black_box` 是为了防止编译器优化干扰我们的基准测试）

The key feature of the Volcano model is the `next()` method, which is supported by all nodes in the query plan. The job of `next()` is to return a single row. `next()` in a sequential scan returns the next row in the sequential scan. `next()` on an aggregation will compute the entire aggregation and then return the single row result. Executing a query plan is just a matter of calling `next()` on the root plan node until it no longer returns any rows.
火山模型的关键特性是 `next()` 方法，查询计划中的所有节点都支持该方法。`next()` 的任务是返回单行数据。顺序扫描中的 `next()` 返回扫描中的下一行；聚合操作中的 `next()` 会计算整个聚合结果，然后返回单行结果。执行查询计划就是不断调用根计划节点的 `next()`，直到它不再返回任何行为止。

The advantage of the Volcano model is that it’s very simple. You implement a single method for each of your plan nodes, and that’s it. While simplified, the above code is very close to what Postgres does internally.
火山模型的优点在于非常简单。你只需为每个计划节点实现一个方法即可。虽然经过了简化，但上述代码与 Postgres 内部的实现非常接近。

While the Volcano model makes things simple, it also adds a lot of overhead. When I run this example, it takes 1.3s. That’s much faster than the Postgres version because we’re removing a lot of the non-query engine pieces, but it’s still slower than the raw for loop because of the Volcano model’s overhead.
虽然火山模型简化了逻辑，但也带来了巨大的开销。当我运行这个示例时，耗时为 1.3 秒。这比 Postgres 版本快得多，因为我们去掉了许多非查询引擎的部分，但由于火山模型的开销，它仍然比原始的 `for` 循环慢。

The biggest performance hit in the code above is that `next()` processes only one row at a time. There’s no batching. The `SeqScan.next()` function is called once per row. That adds significant overhead, especially because many CPU optimizations, such as pipelining, don’t work well when...
上述代码中最大的性能损耗在于 `next()` 每次只处理一行。没有批处理，`SeqScan.next()` 函数每行被调用一次。这增加了巨大的开销，特别是当许多 CPU 优化（如流水线技术）在处理单行时无法发挥作用时……