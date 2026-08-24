---
title: "FirstResearch: Auditable Question Formation for LLM Scientific Discovery Agents"
originalUrl: "https://arxiv.org/abs/2607.05682"
date: "2026-07-08T22:30:48.016Z"
---

### FirstResearch: Auditable Question Formation for LLM Scientific Discovery Agents
### FirstResearch：面向大模型科学发现智能体的可审计问题构建框架

**Abstract:** LLM systems for scientific discovery increasingly assist with ideation, literature synthesis, experiment planning, and report generation, but the first research question they propose can remain difficult to audit: it may sound plausible without exposing the mechanism, falsifier, or assumption that a scientist should inspect. 

**摘要：** 用于科学发现的大模型（LLM）系统正越来越多地辅助构思、文献综述、实验规划和报告生成。然而，这些系统最初提出的研究问题往往难以审计：它们听起来可能言之有理，却未能揭示科学家应当审查的机制、证伪条件或潜在假设。

We introduce FirstResearch, a first-principles research-question formation framework for scientific LLM agents whose core artifact is a structured Research Question Certificate. The certificate records primitive definitions, assumptions, a mechanism model, a tension or contradiction, a falsifiable hypothesis, a minimal decisive test, and a failure update rule, making the proposed question inspectable before downstream execution. 

我们引入了 FirstResearch，这是一个面向科学大模型智能体的“第一性原理”研究问题构建框架，其核心产物是一个结构化的“研究问题证书”（Research Question Certificate）。该证书记录了原始定义、假设、机制模型、张力或矛盾点、可证伪假设、最小判定测试以及失败更新规则，从而使得所提出的问题在进入下游执行前即可被审查。

On ten LLM-agent research topics, FirstResearch outperforms controlled prompt-level baselines inspired by AI co-scientist, Agent Laboratory, and AI Scientist-v2 under a primary DeepSeek-blind-judge protocol. A Gemini-2.5-Flash independent-judge rescore of the same 40 baseline packages preserves the system-level ranking, with FirstResearch scoring 4.86/5 versus 4.38/5 for the strongest baseline and Pearson agreement of 0.865 on average score. 

在十个大模型智能体研究课题上，基于 DeepSeek 盲审协议的测试显示，FirstResearch 的表现优于受 AI Co-scientist、Agent Laboratory 和 AI Scientist-v2 启发的受控提示词基准模型。通过 Gemini-2.5-Flash 对相同 40 个基准包进行的独立重审，验证了系统层级的排名一致性：FirstResearch 得分为 4.86/5，而最强基准模型得分为 4.38/5，平均得分的皮尔逊相关系数（Pearson agreement）达到 0.865。

A one-repeat ablation checkpoint further suggests that the certificate-centered core is the strongest component: certificate-only scoring reaches 4.90/5 under DeepSeek and 4.88/5 under Gemini, while removing certificates drops below 1/5 under both judges. 

单次重复消融检查点进一步表明，以证书为核心的架构是该系统最强的组件：仅保留证书的评分在 DeepSeek 下达到 4.90/5，在 Gemini 下达到 4.88/5；而移除证书后，两者的评分均降至 1/5 以下。

These results are preliminary and use LLM judges rather than human domain experts, but they support a narrow scientific-discovery claim: explicit derivation constraints are a promising mechanism for making LLM-generated scientific questions more auditable. 

尽管这些结果尚属初步，且使用的是大模型评审而非人类领域专家，但它们支持了一个关于科学发现的特定论点：显式的推导约束是提升大模型生成科学问题可审计性的一种有效机制。

Code, prompts, saved outputs, and reproduction scripts are available at this [URL](https://doi.org/10.48550/arXiv.2607.05682).

代码、提示词、保存的输出结果及复现脚本均可在[此链接](https://doi.org/10.48550/arXiv.2607.05682)获取。