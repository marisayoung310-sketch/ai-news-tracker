---
title: "AgentCo-op: Retrieval-Based Synthesis of Interoperable Multi-Agent Workflows"
originalUrl: "https://arxiv.org/abs/2605.20425"
date: "2026-05-22T22:27:06.910Z"
---

# AgentCo-op: Retrieval-Based Synthesis of Interoperable Multi-Agent Workflows
# AgentCo-op：基于检索的可互操作多智能体工作流合成

**Abstract:** Designing multi-agent workflows is especially difficult in open-ended scientific settings where tasks lack curated training sets, reliable scalar evaluation metrics, and standardized interfaces between existing tools and agents. 

**摘要：** 在开放式的科学研究环境中，由于任务缺乏精选的训练集、可靠的标量评估指标以及现有工具与智能体之间的标准化接口，设计多智能体工作流变得尤为困难。

We propose AgentCo-op, a retrieval-based synthesis framework that composes reusable skills, tools, and external agents into executable workflows through typed artifact handoffs, then applies bounded self-guided local repair to implicated components when execution evidence indicates failure. 

我们提出了 AgentCo-op，这是一个基于检索的合成框架。它通过类型化的工件移交（typed artifact handoffs）将可重用的技能、工具和外部智能体组合成可执行的工作流；当执行证据表明出现故障时，该框架会对相关组件应用有界的自引导局部修复。

In two open-world genomics case studies, AgentCo-op composes independently developed scientific agents and external tool repositories into auditable workflows without redesigning them or running global topology search. 

在两个开放世界的基因组学案例研究中，AgentCo-op 将独立开发的科学智能体和外部工具库组合成可审计的工作流，且无需重新设计这些组件或运行全局拓扑搜索。

It coordinates specialized agents for spatial transcriptomics and gene-set interpretation to enable collaborative discovery from spatial transcriptomics data, and builds a parallel workflow for cross-modality marker analysis on single-cell multiome data. 

它协调了用于空间转录组学和基因集解释的专业智能体，从而实现了基于空间转录组学数据的协同发现，并为单细胞多组学数据的跨模态标记分析构建了并行工作流。

AgentCo-op can also import a searched workflow as a structural prior and improve it by grounding nodes with retrieved components and applying local repair, showing that synthesis and search are complementary. 

AgentCo-op 还可以将搜索到的工作流作为结构先验导入，并通过检索到的组件对节点进行接地（grounding）和应用局部修复来改进工作流，这表明合成与搜索是互补的。

On six coding, math, and question-answering benchmarks, AgentCo-op achieves the best result on four benchmarks and the best average score under a unified backbone setting, while consistently reducing per-task cost relative to multi-agent baselines. 

在六个编码、数学和问答基准测试中，AgentCo-op 在四个基准测试中取得了最佳结果，并在统一的主干模型设置下获得了最佳平均分，同时相对于多智能体基准方法，持续降低了单任务成本。

Together, these results suggest that retrieval-based synthesis can extend automated agentic workflow design beyond benchmark-optimized agent graphs to open-world workflows built from existing agents, tools, and typed artifacts.

总之，这些结果表明，基于检索的合成方法可以将自动化智能体工作流设计从基准优化后的智能体图谱，扩展到由现有智能体、工具和类型化工件构建的开放世界工作流中。