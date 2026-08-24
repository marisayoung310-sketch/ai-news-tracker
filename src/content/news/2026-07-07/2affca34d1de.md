---
title: "PREEMPT_NONE Is Dead; Your Postgres Probably Doesn’t Care"
originalUrl: "https://thebuild.com/blog/preempt_none-is-dead-your-postgres-probably-doesnt-care/"
date: "2026-07-06T22:47:55.571Z"
---

# PREEMPT_NONE Is Dead; Your Postgres Probably Doesn’t Care
# PREEMPT_NONE 已死；你的 Postgres 可能根本不在乎

A benchmark came out of AWS earlier this month showing PostgreSQL throughput on Linux 7.0 dropping to 0.51x what the same workload produced on Linux 6.x. The Phoronix headline wrote itself. Hacker News did what Hacker News does. By the end of the week, I had been asked by three separate clients whether they needed to hold their kernel upgrades. They don’t. Almost nobody does.

本月初，AWS 发布的一项基准测试显示，PostgreSQL 在 Linux 7.0 上的吞吐量下降到了 Linux 6.x 上相同工作负载的 0.51 倍。Phoronix 的标题党效应随之而来，Hacker News 也一如既往地展开了讨论。到周末时，已有三位不同的客户问我是否需要推迟内核升级。答案是不需要。几乎没人需要。

The regression is real, but it’s a narrow, loud artifact of a benchmark configuration that was already misconfigured for a 96-vCPU box with 100+ GB of shared memory. The headline undersells how much this is a “don’t do that” story and oversells how much this is a Linux-broke-Postgres story. Let me walk through what actually happened, because the explanation is interesting on its own merits — it touches the scheduler, the TLB, page faults, and the one spinlock in Postgres that nobody outside the buffer manager thinks about. And it ends where a lot of Postgres performance stories end: with huge pages.

这次性能回退是真实的，但它只是一个狭窄且被放大的基准测试配置产物，该配置对于一台拥有 100GB 以上共享内存的 96-vCPU 服务器来说，本身就是错误的。新闻标题低估了这是一个“别这么做”的案例，却夸大了“Linux 搞坏了 Postgres”的叙事。让我来梳理一下到底发生了什么，因为这个解释本身就很有趣——它涉及调度器、TLB、缺页中断，以及 Postgres 中除了缓冲区管理器之外没人会注意到的那个自旋锁（spinlock）。故事的结尾也和许多 Postgres 性能故事一样：落脚点在于大页内存（huge pages）。

Lætitia Avrot wrote her own clear-eyed walkthrough of the same regression on My DBA Notebook on April 15, and if you read only one piece on this, read hers. What follows is my version of the story, with more time spent on the mechanism and a few more diagrams.

Lætitia Avrot 于 4 月 15 日在《My DBA Notebook》上对这一回退现象撰写了清晰的分析，如果你只想读一篇相关文章，请读她的那篇。以下是我的版本，我会花更多时间探讨其背后的机制，并提供更多的图解。

### What Linux 7.0 actually changed
### Linux 7.0 到底改变了什么

Before Linux 7.0, you could build or boot a kernel in one of three preemption modes:
在 Linux 7.0 之前，你可以通过三种抢占模式之一来构建或启动内核：

*   **PREEMPT_NONE** — the kernel almost never interrupts a running userspace thread. Thread gets its slice, uses its slice, yields on syscall or sleep. This is what you historically wanted on a server: batch-throughput-friendly, minimum context-switch overhead.
    **PREEMPT_NONE** — 内核几乎从不中断正在运行的用户空间线程。线程获得时间片，使用时间片，并在系统调用或睡眠时让出 CPU。这是历史上服务器所追求的模式：对批处理吞吐量友好，上下文切换开销最小。
*   **PREEMPT_FULL** — the kernel can interrupt userspace at almost any safe point. Low latency, lots of context switches, historically the desktop default.
    **PREEMPT_FULL** — 内核几乎可以在任何安全点中断用户空间。低延迟，上下文切换频繁，历史上是桌面的默认设置。
*   **PREEMPT_LAZY** — a newer middle ground. The scheduler can interrupt, but will wait for “natural” boundaries when it can.
    **PREEMPT_LAZY** — 一种较新的折中方案。调度器可以进行中断，但在可能的情况下会等待“自然”边界。

Linux 7.0, via Peter Zijlstra’s preemption-cleanup series, removed PREEMPT_NONE entirely on arm64, x86, powerpc, riscv, s390, and loongarch. What you get now is PREEMPT_FULL or PREEMPT_LAZY. On most distros the default shifted to PREEMPT_LAZY.
Linux 7.0 通过 Peter Zijlstra 的抢占清理系列补丁，彻底移除了 arm64、x86、powerpc、riscv、s390 和 loongarch 架构上的 PREEMPT_NONE。现在你只能使用 PREEMPT_FULL 或 PREEMPT_LAZY。大多数发行版已将默认值改为 PREEMPT_LAZY。

For nearly every workload this is fine. PREEMPT_LAZY is supposed to approximate PREEMPT_NONE behavior under throughput-oriented loads. Most of the time it does. The exception is when a userspace thread enters a critical section where getting preempted is catastrophic — and then stays in that critical section just a little longer than the scheduler expects. Spinlocks, in other words.
对于几乎所有工作负载来说，这都没问题。PREEMPT_LAZY 旨在在面向吞吐量的工作负载下模拟 PREEMPT_NONE 的行为。大多数情况下它确实做到了。例外情况是，当用户空间线程进入一个被抢占即会导致灾难的临界区，并且在该临界区停留的时间比调度器预期的稍长时——换句话说，就是自旋锁。

### The benchmark
### 基准测试

Salvatore Dipietro at AWS posted the regression to LKML on April 3 as a one-patch series titled “sched: Restore PREEMPT_NONE as default.”
AWS 的 Salvatore Dipietro 于 4 月 3 日在 LKML 上发布了这一回退报告，标题为“sched: Restore PREEMPT_NONE as default”（调度：恢复 PREEMPT_NONE 为默认值）。

*   **The setup:** m8g.24xlarge — 96 vCPU Graviton4 — running Amazon Linux 2023.
    **环境：** m8g.24xlarge — 96 vCPU Graviton4 — 运行 Amazon Linux 2023。
*   **Kernel:** next-20260331, a linux-next snapshot, with and without a revert of commit 7dadeaa6e851 (“sched: Further restrict the preemption modes”), which is the 7.0-rc1 change that removed PREEMPT_NONE on arm64.
    **内核：** next-20260331（linux-next 快照），分别测试了包含和回退 commit 7dadeaa6e851（“sched: Further restrict the preemption modes”）的情况，该提交即为 7.0-rc1 中移除 arm64 上 PREEMPT_NONE 的变更。
*   **Storage:** 12× 1 TB io2 volumes at 32,000 IOPS each, RAID0, XFS.
    **存储：** 12 块 1TB io2 卷，每块 32,000 IOPS，RAID0，XFS 文件系统。
*   **PostgreSQL 17, pgbench simple-update, 1,024 clients, 96 threads, prepared protocol, scale factor 8,470, fillfactor=90, 1,200 second runs.**
    **PostgreSQL 17, pgbench simple-update, 1,024 个客户端, 96 个线程, 预处理协议, 比例因子 8,470, fillfactor=90, 运行 1,200 秒。**

**The results, averaged over three runs each:**
**结果（三次运行平均值）：**

| Configuration | Avg tps | Ratio |
| :--- | :--- | :--- |
| Baseline (linux-next, PREEMPT_LAZY) | 50,751.96 | 1.00x |
| With 7dadeaa6e851 reverted | 98,565.86 | 1.94x |

The baseline is the one that got the headline. Reverting the preemption-mode change nearly doubles throughput. Stated the other direction: on this workload, Linux 7.0 delivers 0.51x.
基准测试结果就是上头条的那个。回退抢占模式的变更使吞吐量几乎翻倍。换句话说：在此工作负载下，Linux 7.0 的性能仅为原来的 0.51 倍。

`perf` showed the regression sitting, almost undiluted, in a single call chain:
`perf` 显示回退几乎完全集中在单一调用链上：

```text
| - 56.03% - StartReadBuffer
  | - 55.93% - GetVictimBuffer
    | - 55.93% - StrategyGetBuffer
      | - 55.60% - s_lock <<<< 55% of CPU
        | - 0.08% - LockBufHdr
        | - 0.07% - hash_search_with_hash_value
```

More than half of the machine’s CPU time is being burned on one userspace spinlock, which is a very specific and very telling place for the hot spot to land.
超过一半的 CPU 时间被消耗在一个用户空间自旋锁上，这是一个非常具体且能说明问题的热点位置。

### Why that spinlock, and why now
### 为什么是那个自旋锁，为什么是现在？

`StrategyGetBuffer` is the function Postgres calls when a backend needs a buffer and doesn’t already have one. It serializes on one spinlock — `StrategyControl->buffer_strategy_lock` — in two cases. On a cold buffer pool, it pops from the freelist. Once the freelist drains, it runs the clock sweep, advances `nextVictimBuffer`, and returns a candidate. Both paths take the same spinlock.
`StrategyGetBuffer` 是 Postgres 在后端需要缓冲区但尚未获取时调用的函数。它在两种情况下会通过一个自旋锁 `StrategyControl->buffer_strategy_lock` 进行序列化。在冷缓冲区池中，它从空闲列表中弹出；一旦空闲列表耗尽，它会运行时钟扫描（clock sweep），推进 `nextVictimBuffer`，并返回一个候选者。两条路径都使用同一个自旋锁。

On a 96-vCPU machine with 1,024 clients, any serialization point will get loud, but this one has a specific property: the section protected by the spinlock can, under the wrong configuration, take a minor page fault. That’s the piece that turns a bad-but-tolerable serialization point into a 55%-of-CPU catastrophe, and it’s where the kernel change matters.
在拥有 1,024 个客户端的 96-vCPU 机器上，任何序列化点都会变得非常明显，但这个点有一个特殊属性：在错误配置下，被自旋锁保护的部分可能会发生轻微缺页中断（minor page fault）。正是这一点将一个“糟糕但可容忍”的序列化点变成了一场消耗 55% CPU 的灾难，而这正是内核变更产生影响的地方。

The contention is real at any parallelism this high. The question is why it got twice as bad under PREEMPT_LAZY. The answer — as Andres Freund worked out on -hackers and on Hacker News — is not the scheduler, or not directly.
在如此高的并行度下，争用是真实存在的。问题在于为什么在 PREEMPT_LAZY 下情况恶化了一倍。答案正如 Andres Freund 在 -hackers 和 Hacker News 上指出的那样——并不是调度器的问题，或者说不是直接原因。

### The actual culprit: minor page faults inside a spinlock
### 真正的罪魁祸首：自旋锁内的轻微缺页中断

This is the part that’s worth slowing down for. With `huge_pages=off`, Postgres’s shared memory is mapped with ordinary 4 KB pages. A 120 GB `shared_buffers` is, in PTE terms, roughly 31 million pages. Every one of those pages, on first touch, causes a minor page fault — the VM subsystem has to wire up a physical page and install a PTE. That minor fault takes microseconds, which is forever in spinlock terms.
这是最值得深究的部分。当 `huge_pages=off` 时，Postgres 的共享内存使用普通的 4KB 页进行映射。120GB 的 `shared_buffers` 在页表项（PTE）层面大约有 3100 万个页面。每一个页面在首次访问时都会导致轻微缺页中断——VM 子系统必须分配物理页并安装 PTE。这个轻微缺页中断需要微秒级的时间，而在自旋锁的语境下，这简直是永恒。

And a 1,200-second benchmark at scale factor 8,470 will keep touching previously-unmapped pages throughout the run, not just during the first few seconds: `pgbench`’s uniform-random access pattern against a 127 GB `pgbench_accounts` table means new pages keep entering the working set for a long time.
在比例因子 8,470 下运行 1,200 秒的基准测试，会在整个运行过程中不断触及之前未映射的页面，而不仅仅是在最初的几秒钟内：`pgbench` 对 127GB `pgbench_accounts` 表的均匀随机访问模式意味着新的页面会在很长一段时间内持续进入工作集。

Now consider the sequence on the hot path. A backend holds `buffer_strategy_lock`. To pop a buffer off the freelist — or to advance the clock sweep against a buffer whose header sits on a page the backend hasn’t touched — it has to read or write shared memory that hasn’t been faulted in. That access takes...
现在考虑热路径上的序列。一个后端持有 `buffer_strategy_lock`。为了从空闲列表中弹出一个缓冲区，或者为了对一个后端尚未触及的页面上的缓冲区头进行时钟扫描，它必须读写尚未发生缺页的共享内存。那次访问需要……