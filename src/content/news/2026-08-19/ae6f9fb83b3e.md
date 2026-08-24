---
title: "AutoMem: A Text-Gradient Recursive Self-Improvement Framework for Automated Memory Architectures Search"
originalUrl: "https://arxiv.org/abs/2608.14621"
date: "2026-08-18T21:50:25.394Z"
---

# AutoMem: A Text-Gradient Recursive Self-Improvement Framework for Automated Memory Architectures Search
# AutoMem：用于自动化内存架构搜索的文本梯度递归自改进框架

**Abstract:** Long-term memory is increasingly central to LLM agents, yet memory design remains a highly coupled architecture problem: what to encode, how to store it, how to retrieve it, and how to manage it can vary substantially across tasks and backbone models.
**摘要：** 长期记忆对于大语言模型（LLM）智能体而言正变得日益核心，然而内存设计仍然是一个高度耦合的架构难题：编码什么、如何存储、如何检索以及如何管理，这些在不同任务和骨干模型之间存在显著差异。

We construct a discrete search space with 5 encoders, 5 stores, 6 retrievers, and 4 managers, and show that no single memory architecture consistently dominates: different tasks favor different module combinations, leading to substantial performance gaps.
我们构建了一个包含 5 个编码器、5 个存储器、6 个检索器和 4 个管理器的离散搜索空间，并证明没有任何单一的内存架构能够始终占据主导地位：不同的任务偏好不同的模块组合，这导致了显著的性能差距。

Motivated by this, we propose \textsc{AutoMem}, a text-gradient recursive self-improvement framework for task-adaptive memory architecture search.
受此启发，我们提出了 \textsc{AutoMem}，这是一个用于任务自适应内存架构搜索的文本梯度递归自改进框架。

\textsc{AutoMem} optimizes over the factored space through two components: Experience-Guided Architecture Search, which proposes candidate architectures from historical search trajectories and accumulated reflections, and Failure-Guided Module Diagnosis, which localizes memory-related failures to specific modules and converts them into targeted textual feedback.
\textsc{AutoMem} 通过两个组件对分解后的空间进行优化：一是“经验引导架构搜索”（Experience-Guided Architecture Search），它根据历史搜索轨迹和积累的经验反思提出候选架构；二是“故障引导模块诊断”（Failure-Guided Module Diagnosis），它将内存相关的故障定位到特定模块，并将其转化为有针对性的文本反馈。

Experiments on GAIA, WebWalkerQA, and xBench-DeepSearch across two LLM backbones show that \textsc{AutoMem} consistently discovers task-adaptive memory architectures that outperform the strongest human-designed memory baselines, improving accuracy by $2.8$ points on average across six benchmark-backbone settings.
在两个 LLM 骨干模型上对 GAIA、WebWalkerQA 和 xBench-DeepSearch 进行的实验表明，\textsc{AutoMem} 能够持续发现优于最强人工设计内存基线的任务自适应内存架构，在六种基准测试与骨干模型组合设置中，平均准确率提升了 $2.8$ 个百分点。

Further analysis shows that \textsc{AutoMem} achieves a favorable accuracy-efficiency trade-off, reducing token cost by $14.3\%$ over the strongest accuracy baselines under Qwen3.5-122B-A10B, while also finding stronger architectures than substantially larger random searches within only a few guided iterations.
进一步分析显示，\textsc{AutoMem} 实现了良好的准确率与效率平衡，在 Qwen3.5-122B-A10B 模型下，其 Token 成本比最强的准确率基线降低了 $14.3\%$，同时仅需几次引导迭代，就能找到比规模大得多的随机搜索更强大的架构。