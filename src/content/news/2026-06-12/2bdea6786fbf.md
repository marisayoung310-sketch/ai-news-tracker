---
title: "When GPU Utilization Lies: The Hidden Systems Problem Slowing Modern AI"
originalUrl: "https://towardsdatascience.com/when-gpu-utilization-lies-the-hidden-systems-problem-slowing-modern-ai/"
date: "2026-06-11T23:11:40.527Z"
---

# When GPU Utilization Lies: The Hidden Systems Problem Slowing Modern AI
# 当 GPU 利用率成为谎言：拖慢现代 AI 的隐形系统问题

**Artificial Intelligence: Why “average utilization” lies about how full your GPUs really are**
**人工智能：为什么“平均利用率”掩盖了 GPU 的真实负载情况**

*Arjun Kaarat | Jun 11, 2026 | 13 min read*
*Arjun Kaarat | 2026年6月11日 | 阅读时长 13 分钟*

***

Figure 1 – Scalar scheduling (left) scatters workloads and leaves large gaps in GPU capacity, while residual‑aware geometric packing (right) tightly fits differently shaped jobs into the same GPU, reducing fragmentation and waste. Illustration concept by the authors; image generated with an AI model and post‑edited.
图 1 – 标量调度（左）会分散工作负载，导致 GPU 容量出现大量空隙；而残差感知几何打包（右）则能将不同形状的任务紧密地填充到同一个 GPU 中，从而减少碎片化和浪费。插图概念由作者提供；图像由 AI 模型生成并经后期编辑。

At 2:00 AM, an infrastructure team gets pinged because inference latency has suddenly jumped by 60%. The dashboards are confusing. GPU utilization still looks healthy: 79%, 82%, 84%. Nothing appears catastrophically wrong. Autoscaling kicks in. More nodes are added. The cloud bill climbs. Latency barely improves.
凌晨 2 点，基础设施团队收到警报，因为推理延迟突然飙升了 60%。仪表盘显示的信息令人困惑：GPU 利用率看起来依然正常，维持在 79%、82% 和 84%。表面上并没有发生灾难性的故障。自动扩容机制启动，增加了更多节点，云服务账单随之攀升，但延迟几乎没有改善。

An hour later, the real problem turns out to be surprisingly mundane: three nodes quietly entered degraded RAID rebuild states, reducing storage throughput to the point of starving nearby inference workloads. The scheduler still treated those nodes as “healthy enough” because GPU and memory metrics looked acceptable. In simple words, one of the storage drives on those machines had failed or become unreliable, and the server was busy rebuilding the lost data across the remaining drives. The machines were technically still online. They were not “dead” enough to be removed from service. But their disk performance had slowed down badly.
一小时后，真正的问题被发现，竟出奇地平庸：三个节点悄然进入了降级的 RAID 重建状态，导致存储吞吐量下降，进而“饿死”了附近的推理工作负载。由于 GPU 和内存指标看起来尚可，调度器依然将这些节点视为“健康”。简单来说，这些机器上的某个存储驱动器发生故障或变得不可靠，服务器正忙于在剩余驱动器上重建丢失的数据。从技术上讲，这些机器依然在线，还没“死”到需要被移出服务的程度，但它们的磁盘性能已经严重下降。

This kind of failure is becoming increasingly common in modern AI infrastructure. And it exposes a deeper illusion hiding underneath many GenAI systems: GPUs can be busy without being productive. That distinction sounds subtle. Financially, it can mean millions of dollars.
这种故障在现代 AI 基础设施中正变得越来越普遍。它揭示了隐藏在许多生成式 AI 系统下的一个更深层的错觉：GPU 可能处于忙碌状态，却并未产生实际产出。这种区别听起来很微妙，但在财务上，它可能意味着数百万美元的损失。

Modern AI systems look smooth from the outside. A user sends a prompt to OpenAI’s ChatGPT, Anthropic’s Claude, or Google’s Gemini and gets a polished answer seconds later. Underneath that experience is an enormous coordination problem. GPUs execute tensor operations. CPUs feed requests and move data. HBM stores activations and KV cache. SSDs stream embeddings and retrieval context. Networks shuffle gradients and inference traffic across nodes. Storage systems absorb rebuilds, retries, and background work. Somewhere in the middle of all this, a scheduler decides where workloads should run. That scheduler quietly determines whether the cluster behaves like a coherent computing system or an expensive traffic jam.
现代 AI 系统从外部看运行顺畅。用户向 OpenAI 的 ChatGPT、Anthropic 的 Claude 或 Google 的 Gemini 发送提示词，几秒钟后就能得到精炼的回答。在这种体验背后，是一个巨大的协调难题。GPU 执行张量运算，CPU 提供请求并移动数据，HBM 存储激活值和 KV 缓存，SSD 流式传输嵌入向量和检索上下文，网络在节点间传输梯度和推理流量，存储系统则处理重建、重试和后台任务。在这一切的中间，调度器决定了工作负载的运行位置。正是这个调度器，悄然决定了集群是表现为一个协调的计算系统，还是一场昂贵的交通拥堵。

This article builds on residual-aware geometric packing (RAGP), introduced in Kaarat et al., and explores why modern AI schedulers increasingly need to reason about storage bandwidth, I/O pressure, and dynamic resource behavior, rather than treating GPUs as isolated compute devices. The deeper lesson is broader than one scheduling algorithm. It is a systems problem. And increasingly, it is an economic problem too.
本文基于 Kaarat 等人提出的“残差感知几何打包”（RAGP）技术，探讨了为什么现代 AI 调度器越来越需要考虑存储带宽、I/O 压力和动态资源行为，而不是将 GPU 仅仅视为孤立的计算设备。更深层的启示远不止于某一种调度算法，这是一个系统性问题，而且正日益演变成一个经济问题。

### The Utilization Illusion
### 利用率的错觉

GPU utilization is one of the most over-trusted metrics in AI infrastructure. High utilization feels efficient. If GPUs are mostly busy, the cluster appears healthy. But utilization averages hide the structure of what remains. A cluster can report high GPU occupancy, active workloads, and heavy memory usage while still having poor effective capacity. The problem is often not that resources are exhausted, but that the leftover resources survive only in unusable combinations.
GPU 利用率是 AI 基础设施中最被过度信任的指标之一。高利用率让人感觉效率很高。如果 GPU 大部分时间都在忙碌，集群看起来就很健康。但平均利用率掩盖了剩余资源的结构。一个集群可能报告 GPU 占用率高、工作负载活跃且内存使用沉重，但其实际有效容量却很差。问题往往不在于资源耗尽，而在于剩余的资源只能以无法组合利用的形式存在。

Imagine a large city during rush hour. Some roads are empty. Others are completely jammed. The city technically still has road capacity. But if the wrong intersections are congested, traffic across the entire system slows down anyway. Distributed AI systems behave similarly. A cluster may still contain spare GPUs, HBM, storage, and CPUs, yet remain unable to efficiently accommodate the next realistic workload. Not because capacity disappeared, but because the remaining capacity exists in the wrong shapes.
想象一下高峰时段的大城市。有些道路空旷，有些则完全堵死。从技术上讲，城市仍有道路容量，但如果关键路口拥堵，整个系统的交通依然会变慢。分布式 AI 系统的表现与之类似。集群可能仍有空闲的 GPU、HBM、存储和 CPU，却无法高效地容纳下一个实际的工作负载。这不是因为容量消失了，而是因为剩余的容量以“错误的形状”存在。

### Fragmentation: The Invisible Failure Mode
### 碎片化：隐形的故障模式

Consider three nodes after a burst of mixed GenAI workloads:
考虑在经历了一波混合生成式 AI 工作负载后的三个节点：

| Node | GPU Compute | HBM | Storage Bandwidth | I/O CPU |
| :--- | :--- | :--- | :--- | :--- |
| A | Available | Nearly Full | Available | Available |
| B | Available | Available | Saturated | Available |
| C | Limited | Available | Available | Saturated |

Now suppose a new inference workload arrives requiring: moderate GPU, moderate HBM, healthy storage bandwidth, and healthy I/O capacity. Across the cluster, enough total resources still exist. But no individual node has the right combination of remaining resources. The workload fits nowhere cleanly. This is resource fragmentation. The cluster is not empty. It is fragmented into leftovers that are difficult to use productively.
现在假设一个新的推理工作负载到来，需要：中等 GPU、中等 HBM、健康的存储带宽和健康的 I/O 容量。在整个集群中，总资源依然充足，但没有任何一个单独的节点拥有剩余资源的正确组合。该工作负载无法完美适配任何节点。这就是资源碎片化。集群并非空置，而是被碎片化成了难以高效利用的残余资源。

*Figure 1: Residual resources exist across three nodes, but none can host the next balanced job, illustrating fragmentation. Illustration generated with an AI-assisted diagramming tool.*
*图 1：三个节点上都存在剩余资源，但没有一个节点能承载下一个均衡的任务，这说明了碎片化现象。插图由 AI 辅助绘图工具生成。*

This becomes especially dangerous in GenAI systems because modern AI workloads depend heavily on retrieval pipelines, KV cache growth, storage throughput, and overall data-path efficiency. A cluster can look healthy from 10,000 feet while quietly degrading beneath the surface.
这在生成式 AI 系统中变得尤为危险，因为现代 AI 工作负载高度依赖检索流水线、KV 缓存增长、存储吞吐量以及整体数据路径效率。从宏观上看，集群可能看起来很健康，但在表面之下却在悄然退化。

### A Cluster Can Have Spare GPUs and Rising Queues
### 集群可能既有空闲 GPU，又有不断增长的队列

This is the most counterintuitive part of the entire problem. A cluster can simultaneously have: spare GPUs, rising queue times, worsening latency, and declining throughput. At first glance, that sounds contradictory. It is not. If the only “free” GPUs sit on nodes whose storage bandwidth is already overloaded, SSD queue depth is exploding, or I/O CPU is consumed by background work, then those GPUs are not meaningfully available for the next useful workload. A greedy scheduler may still place jobs there. Those jobs then run slower, increase contention, stretch queue times, and leave behind even worse fragmentation. This creates a vicious loop: more fragmentation → more stall → longer runtimes → more fragmentation. From the dashboard, the cluster still appears busy. Operationally, the system is slowly choking itself.
这是整个问题中最反直觉的部分。一个集群可以同时拥有：空闲的 GPU、不断增长的排队时间、恶化的延迟以及下降的吞吐量。乍一看这似乎很矛盾，其实不然。如果仅有的“空闲”GPU 位于存储带宽已过载、SSD 队列深度爆炸或 I/O CPU 被后台任务占用的节点上，那么这些 GPU 对于下一个有用的工作负载来说并没有实际意义。贪婪的调度器可能仍会将任务分配到那里，导致这些任务运行变慢、竞争加剧、排队时间延长，并留下更严重的碎片化。这形成了一个恶性循环：碎片化加剧 → 停滞增加 → 运行时间变长 → 碎片化进一步加剧。从仪表盘上看，集群依然显得很忙碌，但在运行层面，系统正在缓慢地自我窒息。