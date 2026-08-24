---
title: "Prompt-to-Paper: Agentic AI System for Bioinformatics"
originalUrl: "https://arxiv.org/abs/2607.05456"
date: "2026-07-08T22:30:34.248Z"
---

# Prompt-to-Paper: Agentic AI System for Bioinformatics
# Prompt-to-Paper：用于生物信息学的智能体 AI 系统

**Abstract:** While recent advances in large language models have enabled end-to-end automated manuscript generation, existing systems suffer from three critical deficiencies: (i) generated claims are not deterministically grounded in verifiable literature, (ii) experimental results are frequently fabricated rather than executed, and (iii) there exists no standardized, multi-dimensional framework to assess whether AI-generated manuscripts meet the quality and rigor required for real-world publication.

**摘要：** 尽管大型语言模型的最新进展已经实现了端到端的自动化论文生成，但现有系统仍存在三个关键缺陷：(i) 生成的论点缺乏可验证文献的确定性支撑；(ii) 实验结果往往是伪造的而非实际执行的；(iii) 缺乏标准化的多维框架来评估 AI 生成的论文是否达到现实世界发表所需的质量和严谨性。

We present Prompt-to-Paper, a multi-agent framework that directly addresses this evaluation gap through three integrated innovations. First, a deterministic retrieval-augmented generation pipeline with section-aware relevance scoring and snowball citation expansion grounds every claim in a verifiable corpus of 60--100 papers. Second, an autonomous coding agent executes real computational biology experiments replacing synthetic outputs with genuine numerical results. Third, an eight-dimensional automated quality scorer, benchmarked with approximate reference statistics from published papers and augmented with explicit hallucination penalties, provides standardized, reproducible quality assessments.

我们提出了 Prompt-to-Paper，这是一个通过三项集成创新直接解决上述评估差距的多智能体框架。首先，一个具备章节感知相关性评分和滚雪球式引文扩展的确定性检索增强生成（RAG）流水线，将每一个论点建立在 60 到 100 篇可验证论文的语料库之上。其次，一个自主编码智能体通过执行真实的计算生物学实验，用真实的数值结果取代了合成输出。第三，一个八维自动化质量评分器，通过已发表论文的参考统计数据进行基准测试，并增加了明确的幻觉惩罚，从而提供标准化、可复现的质量评估。

The quality-driven improvement loop uses a context-rich reviser that routes each iteration to one of three researcher actions and fires a deep research cycle every ten iterations to re-run experiments and re-manuscript from stronger outputs. We validate the system on five bioinformatics case studies; all five cases compiled submission-formatted PDFs with zero out-of-range citations. The improvement loop raises manuscript quality by an average of +17.96 points on a 0--100 scale (maximum +26.04). As partial external checks, a human reviewer scored the five manuscripts at an average of 7.0 out of 10. Complete manuscripts are produced at approximately 0.31 USD per paper.

质量驱动的改进循环使用了一个富含上下文的修订器，将每次迭代引导至三种研究员操作之一，并每十次迭代触发一次深度研究周期，以重新运行实验并基于更强的输出重新撰写论文。我们在五个生物信息学案例研究中验证了该系统；所有五个案例都编译出了符合投稿格式的 PDF，且引文零错误。该改进循环使论文质量在 0-100 分的量表上平均提高了 17.96 分（最高提升 26.04 分）。作为部分外部检查，人类评审员对这五篇论文给出的平均分为 7.0 分（满分 10 分）。每篇完整论文的生成成本约为 0.31 美元。