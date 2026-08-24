---
title: "Tokenomics: Quantifying Where Tokens Are Used in Agentic Software Engineering"
originalUrl: "https://arxiv.org/abs/2601.14470"
date: "2026-06-07T22:34:42.770Z"
---

# Tokenomics: Quantifying Where Tokens Are Used in Agentic Software Engineering
# Tokenomics：量化智能体软件工程中的 Token 使用分布

**Abstract:** LLM-based Multi-Agent (LLM-MA) systems are increasingly applied to automate complex software engineering tasks such as requirements engineering, code generation, and testing. However, their operational efficiency and resource consumption remain poorly understood, hindering practical adoption due to unpredictable costs and environmental impact.

**摘要：** 基于大语言模型的多智能体（LLM-MA）系统正越来越多地被应用于自动化复杂的软件工程任务，例如需求工程、代码生成和测试。然而，人们对其运行效率和资源消耗的了解仍然不足，这导致成本不可预测且对环境产生影响，从而阻碍了其实际应用。

To address this, we conduct an analysis of token consumption patterns in an LLM-MA system within the Software Development Life Cycle (SDLC), aiming to understand where tokens are consumed across distinct software engineering activities. We analyze execution traces from 30 software development tasks performed by the ChatDev framework using a GPT-5 reasoning model, mapping its internal phases to distinct development stages (Design, Coding, Code Completion, Code Review, Testing, and Documentation) to create a standardized evaluation framework.

为了解决这一问题，我们对软件开发生命周期（SDLC）中 LLM-MA 系统的 Token 消耗模式进行了分析，旨在了解 Token 在不同软件工程活动中的消耗情况。我们分析了使用 GPT-5 推理模型通过 ChatDev 框架执行的 30 项软件开发任务的执行轨迹，将其内部阶段映射到不同的开发阶段（设计、编码、代码补全、代码审查、测试和文档），从而建立了一个标准化的评估框架。

We then quantify and compare token distribution (input, output, reasoning) across these stages. Our preliminary findings show that the iterative Code Review stage accounts for the majority of token consumption for an average of 59.4% of tokens. Furthermore, we observe that input tokens consistently constitute the largest share of consumption for an average of 53.9%, providing empirical evidence for potentially significant inefficiencies in agentic collaboration.

随后，我们量化并比较了这些阶段中的 Token 分布（输入、输出、推理）。初步研究结果表明，迭代式的代码审查阶段占据了 Token 消耗的大部分，平均占比为 59.4%。此外，我们观察到输入 Token 始终占据消耗的最大份额，平均占比为 53.9%，这为智能体协作中可能存在的显著低效问题提供了实证依据。

Our results suggest that the primary cost of agentic software engineering lies not in initial code generation but in automated refinement and verification. Our novel methodology can help practitioners predict expenses and optimize workflows, and it directs future research toward developing more token-efficient agent collaboration protocols.

我们的研究结果表明，智能体软件工程的主要成本不在于最初的代码生成，而在于自动化的优化和验证过程。我们提出的新方法可以帮助从业者预测费用并优化工作流程，同时也为未来开发更具 Token 效率的智能体协作协议指明了研究方向。