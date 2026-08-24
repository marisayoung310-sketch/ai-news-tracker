---
title: "Can AI Evaluate AI Scientists? A Benchmarking Study of Autonomous Research Generation Systems Using Automated Multi-Model Review"
originalUrl: "https://arxiv.org/abs/2607.28631"
date: "2026-08-03T22:34:01.284Z"
---

# Can AI Evaluate AI Scientists? A Benchmarking Study of Autonomous Research Generation Systems Using Automated Multi-Model Review
# AI 能否评估 AI 科学家？一项利用自动化多模型评审对自主研究生成系统进行基准测试的研究

**Abstract:** AI Scientist systems capable of autonomous research have the potential to significantly accelerate scientific discovery. However, evaluating and comparing the quality of AI-generated papers remains an open challenge. We propose and implement a rigorous benchmarking protocol using an automated peer-review system that harnesses frontier large language models to assess scientific papers across four core dimensions: originality, scientific rigor, clarity, and significance.

**摘要：** 具备自主研究能力的“AI 科学家”系统有望显著加速科学发现。然而，评估和比较 AI 生成论文的质量仍然是一个尚未解决的挑战。我们提出并实施了一项严格的基准测试协议，利用自动化同行评审系统，借助前沿大语言模型从四个核心维度对科学论文进行评估：原创性、科学严谨性、清晰度和重要性。

We evaluate four leading AI Scientist frameworks: *Sakana AI (v1 & v2)*, *CycleResearcher*, and *Data-to-Paper*. Each framework was run on a consistent set of 15 research proposals published by a commercial autonomous AI scientist company (FARS), generating 60 papers that we evaluate alongside 15 FARS benchmark papers.

我们评估了四个领先的 AI 科学家框架：*Sakana AI (v1 & v2)*、*CycleResearcher* 和 *Data-to-Paper*。每个框架均针对一家商业自主 AI 科学家公司 (FARS) 发布的 15 份研究提案进行运行，共生成了 60 篇论文，并将其与 15 篇 FARS 基准论文一同进行评估。

Using three independent LLM reviewers (GPT-5.4, Gemini, and Claude), we find that FARS benchmark papers significantly outperform all competing frameworks, achieving mean scores of 2.14--2.47 on a 1--5 scale compared to 1.00--1.87 for other systems. Notably, FARS scores are more than 2$\times$ higher than the next-best systems on Gemini and Claude evaluations.

通过使用三个独立的 LLM 评审员（GPT-5.4、Gemini 和 Claude），我们发现 FARS 基准论文的表现显著优于所有竞争框架，在 1-5 分的评分量表中平均得分达到 2.14--2.47 分，而其他系统仅为 1.00--1.87 分。值得注意的是，在 Gemini 和 Claude 的评估中，FARS 的得分比排名第二的系统高出两倍以上。

We find strong agreement among Gemini and Claude ($\rho$ = 0.907, $p < 0.001$), and both correlate extremely strongly with the synthesis score ($\rho$ = 0.961, $p < 0.001$), validating the reliability of automated evaluation. However, GPT-5.4 exhibits weaker agreement ($\rho \approx 0.32$), suggesting it evaluates papers using different criteria.

我们发现 Gemini 和 Claude 之间存在高度一致性（$\rho$ = 0.907, $p < 0.001$），且两者与综合评分的相关性极强（$\rho$ = 0.961, $p < 0.001$），这验证了自动化评估的可靠性。然而，GPT-5.4 表现出较弱的一致性（$\rho \approx 0.32$），这表明它在评估论文时采用了不同的标准。

These results establish the first quantitative benchmark for AI Scientist systems and demonstrate that multi-model LLM evaluation provides a scalable, consistent framework for assessing autonomous research quality.

这些结果为 AI 科学家系统建立了首个定量基准，并证明了多模型 LLM 评估为评估自主研究质量提供了一个可扩展且一致的框架。