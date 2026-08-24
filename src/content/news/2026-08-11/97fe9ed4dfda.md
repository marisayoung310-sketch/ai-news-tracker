---
title: "Interpretable Unsupervised Community Detection with LLM-Symbolized Structured Processes"
originalUrl: "https://arxiv.org/abs/2608.06402"
date: "2026-08-10T22:06:42.933Z"
---

# Interpretable Unsupervised Community Detection with LLM-Symbolized Structured Processes
# 基于大语言模型符号化结构化过程的可解释无监督社区发现

**Abstract:** Community detection is a fundamental task in graph analytics that aims to identify cohesive groups of entities with similar behaviors or interests. Classic objective-driven methods struggle with complex graph structures, while deep-learning approaches improve performance at the expense of interpretability and rely on labeled data and training.

**摘要：** 社区发现是图分析中的一项基础任务，旨在识别具有相似行为或兴趣的实体凝聚群体。经典的基于目标驱动的方法在处理复杂图结构时往往力不从心，而深度学习方法虽然提升了性能，却以牺牲可解释性为代价，且依赖于标注数据和模型训练。

Large language models (LLMs), with strong reasoning capabilities and world knowledge, are promising for interpretable, label-free community detection. To leverage these strengths, we propose LUCID, an LLM-guided, interpretable, training-free, and unsupervised community detection method.

大语言模型（LLMs）凭借其强大的推理能力和世界知识，为实现可解释、无需标注的社区发现提供了广阔前景。为了利用这些优势，我们提出了 LUCID，这是一种由大模型引导、具备可解释性、无需训练且无监督的社区发现方法。

Inspired by phase-transition kinetics in natural systems, where complex structures emerge through initialization, merging, refinement, and selection, LUCID is designed as a four-stage pipeline. Within this pipeline, the LLM induces formal rules that translate implicit knowledge into explicit and interpretable logical structures.

受自然系统中相变动力学的启发——即复杂结构通过初始化、合并、细化和选择过程涌现——LUCID 被设计为一个四阶段流水线。在此流水线中，大模型会归纳出形式化规则，将隐性知识转化为显性且可解释的逻辑结构。

Specifically, (1) the Local-View Community Initialization stage encodes local graph structures using k-ego contexts and unsupervised node roles; (2) the Multi-factor Community Merge stage uses LLM-induced rules to iteratively merge local communities; (3) the Multi-grain Community Refinement stage applies LLM-induced coarse-to-fine rules in parallel to reduce boundary noise; and (4) the Global-view Community Selection stage identifies high-quality communities based on topological compactness and boundary clarity.

具体而言：(1) 局部视图社区初始化阶段利用 k-ego 上下文和无监督节点角色对局部图结构进行编码；(2) 多因素社区合并阶段使用大模型归纳的规则迭代合并局部社区；(3) 多粒度社区细化阶段并行应用大模型归纳的由粗到细规则，以减少边界噪声；(4) 全局视图社区选择阶段则基于拓扑紧凑性和边界清晰度识别高质量社区。

Extensive experiments on real-world datasets demonstrate that LUCID, as an unsupervised approach, achieves state-of-the-art performance and consistently outperforms leading unsupervised and semi-supervised baselines.

在真实数据集上的大量实验表明，作为一种无监督方法，LUCID 达到了最先进的性能，并持续优于领先的无监督和半监督基准模型。