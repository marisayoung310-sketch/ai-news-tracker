---
title: "PRISM: Perception Reasoning Interleaved for Sequential Decision Making"
originalUrl: "https://arxiv.org/abs/2605.05407"
date: "2026-05-08T22:32:30.263Z"
---

# PRISM: Perception Reasoning Interleaved for Sequential Decision Making
# PRISM：用于序列决策的感知与推理交织框架

**Abstract:** Scaling LLM-based embodied agents from text-only environments to complex multimodal settings remains a major challenge. Recent work identifies a perception-reasoning-decision gap in standalone Vision-Language Models (VLMs), which often overlook task-critical information. 

**摘要：** 将基于大语言模型（LLM）的具身智能体从纯文本环境扩展到复杂的多模态场景，仍然是一项重大挑战。近期的研究指出，独立的视觉-语言模型（VLM）在感知、推理和决策之间存在脱节，往往会忽略对任务至关重要的信息。

In this paper, we introduce PRISM, a framework that tightly couples perception (VLM) and decision (LLM) through a dynamic question-answer (DQA) pipeline. Instead of passively accepting the VLM's description, the LLM critiques it, probes the VLM with goal-oriented questions, and synthesizes a compact image description. This closed-loop interaction yields a sharp, task-driven understanding of the scene. 

在本文中，我们引入了 PRISM，这是一个通过动态问答（DQA）流水线将感知（VLM）与决策（LLM）紧密耦合的框架。LLM 不再被动接受 VLM 的描述，而是对其进行评估，通过目标导向的问题向 VLM 进行探究，并合成简洁的图像描述。这种闭环交互实现了对场景敏锐且以任务为导向的理解。

We evaluate PRISM on the ALFWorld and Room-to-Room (R2R) benchmarks. We show that: (1) PRISM significantly outperforms state-of-the-art image-based models, (2) our Interactive goal-oriented perception pipeline yields systematic and substantial gains, and (3) PRISM is fully automatic, eliminating the need for handcrafted questions or answers.

我们在 ALFWorld 和 Room-to-Room (R2R) 基准测试中对 PRISM 进行了评估。结果表明：(1) PRISM 的表现显著优于当前最先进的基于图像的模型；(2) 我们交互式的目标导向感知流水线带来了系统性且实质性的性能提升；(3) PRISM 是全自动的，无需人工编写问题或答案。

***

**Paper Details:**
*   **Authors:** Mohamed Salim Aissi, Clemence Grislain, Clement Romac, Laure Soulier, Mohamed Chetouani, Olivier Sigaud, Nicolas Thome
*   **Submission Date:** 6 May 2026
*   **Subject:** Artificial Intelligence (cs.AI)
*   **DOI:** 10.48550/arXiv.2605.05407

**论文详情：**
*   **作者：** Mohamed Salim Aissi, Clemence Grislain, Clement Romac, Laure Soulier, Mohamed Chetouani, Olivier Sigaud, Nicolas Thome
*   **提交日期：** 2026 年 5 月 6 日
*   **学科：** 人工智能 (cs.AI)
*   **DOI：** 10.48550/arXiv.2605.05407