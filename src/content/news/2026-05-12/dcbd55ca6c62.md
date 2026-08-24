---
title: "Hidden Coalitions in Multi-Agent AI: A Spectral Diagnostic from Internal Representations"
originalUrl: "https://arxiv.org/abs/2605.06696"
date: "2026-05-11T22:55:19.694Z"
---

# Hidden Coalitions in Multi-Agent AI: A Spectral Diagnostic from Internal Representations
# 多智能体 AI 中的隐藏联盟：一种基于内部表征的谱诊断方法

**Abstract:**
Collections of interacting AI agents can form coalitions, creating emergent group-level organization that is critical for AI safety and alignment. However, observing agent behavior alone is often insufficient to distinguish genuine informational coupling from spurious similarity, as consequential coalitions may form at the level of internal representations before any overt behavioral change is apparent.

**摘要：**
交互式 AI 智能体集合可以形成联盟，从而产生对 AI 安全和对齐至关重要的涌现性群体组织。然而，仅观察智能体行为往往不足以区分真正的“信息耦合”与“虚假相似性”，因为在任何明显的行为改变显现之前，具有影响力的联盟可能已经在内部表征层面形成。

Here, we introduce a practical method for detecting coalition structure from the internal neural representations of multi-agent systems. The approach constructs a pairwise mutual-information graph from the hidden states of agents and applies spectral partitioning to identify the most salient coalition boundary.

在此，我们引入了一种从多智能体系统的内部神经表征中检测联盟结构的实用方法。该方法通过智能体的隐藏状态构建成对互信息图，并应用谱划分（spectral partitioning）来识别最显著的联盟边界。

We validate this method in two domains. First, in multi-agent reinforcement learning environments, the method successfully recovers programmed hierarchical and dynamic coalition structures and correctly rejects false positives arising from behavioral coordination without informational coupling.

我们在两个领域验证了该方法。首先，在多智能体强化学习环境中，该方法成功恢复了预设的层次化和动态联盟结构，并正确排除了因行为协调而非信息耦合所导致的误报。

Second, using a large language model, the method identifies coalition structures implied by descriptive prompts, tracks dynamic team reassignments, and reveals a representational hierarchy where explicit labels dominate over conflicting interaction patterns.

其次，在使用大语言模型时，该方法能够识别由描述性提示所暗示的联盟结构，追踪动态的团队重组，并揭示了一种表征层次结构，其中显式标签在冲突的交互模式中占据主导地位。

Across both settings, the recovered partition reveals subgroup organization that a scalar cross-agent mutual-information measure cannot distinguish. The results demonstrate that analyzing hidden-state mutual information through spectral partitioning provides a scalable diagnostic for identifying representational coalitions, offering a valuable tool for monitoring emergent structure in distributed AI systems.

在上述两种场景中，所恢复的划分结果揭示了标量跨智能体互信息度量无法区分的子群组织。研究结果表明，通过谱划分分析隐藏状态互信息，为识别表征联盟提供了一种可扩展的诊断手段，为监控分布式 AI 系统中的涌现结构提供了一个有价值的工具。