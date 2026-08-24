---
title: "CANDI: Contextual Alignment for Niche Domains Question Answering"
originalUrl: "https://arxiv.org/abs/2607.11891"
date: "2026-07-15T22:22:17.315Z"
---

# CANDI: Contextual Alignment for Niche Domains Question Answering
# CANDI：利基领域问答的上下文对齐

**Abstract:** The deployment of large language models (LLMs) in specialized domains like medical diagnostics and financial advisory necessitates evaluating capabilities beyond general knowledge. Traditional question-answering benchmarks often fail to capture the nuanced contextual grounding, user awareness, and domain understanding these fields require.

**摘要：** 在医疗诊断和金融咨询等专业领域部署大型语言模型（LLM）时，必须评估其超越通用知识的能力。传统的问答基准测试往往无法捕捉这些领域所需的细微上下文基础、用户意识和领域理解。

To address this, we introduce CANDI-QA (Contextual Alignment for Niche Domains Question Answering), a novel dataset evaluating LLMs on delivering accurate, context-sensitive, and user-aligned answers in specialized settings. CANDI-QA features expert-curated question-answer pairs structured into two categories: (1) Information Assistance Questions, which are direct, factual queries requiring precise extraction, and (2) Applied Inference Questions, which are multi-hop reasoning tasks needing situational inference to generate actionable insights.

为了解决这一问题，我们推出了 CANDI-QA（利基领域问答的上下文对齐），这是一个全新的数据集，旨在评估大模型在专业场景下提供准确、上下文敏感且符合用户需求答案的能力。CANDI-QA 包含由专家策划的问答对，分为两类：（1）信息辅助问题，即需要精确提取的直接事实查询；（2）应用推理问题，即需要情境推理以生成可操作见解的多跳推理任务。

We evaluate over ten diverse language models, from compact open-source to state-of-the-art proprietary systems. As a robust baseline, we present MTSS-Net, a lightweight neuro-symbolic framework combining neural retrieval with rule-based reasoning. Our findings highlight the profound challenges of achieving contextual alignment in niche domains, revealing the limitations of current LLMs without enhanced contextual or symbolic integration.

我们评估了十多种不同的语言模型，涵盖了从紧凑型开源模型到最先进的专有系统。作为稳健的基准，我们提出了 MTSS-Net，这是一个结合了神经检索与基于规则推理的轻量级神经符号框架。我们的研究结果强调了在利基领域实现上下文对齐所面临的巨大挑战，揭示了当前大模型在缺乏增强型上下文或符号集成时的局限性。

Ultimately, CANDI-QA serves as a critical benchmark for advancing research in context-aware language models, stimulating the development of robust, trustworthy AI for high-stakes domains.

最终，CANDI-QA 将作为推进上下文感知语言模型研究的关键基准，促进为高风险领域开发稳健、可信的 AI。