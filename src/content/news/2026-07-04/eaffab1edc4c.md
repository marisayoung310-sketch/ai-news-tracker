---
title: "Prompt Framing Distorts Count-Based Evaluation of LLM Error Detection: Evidence from Numeric Anchoring"
originalUrl: "https://arxiv.org/abs/2607.01240"
date: "2026-07-03T22:32:58.115Z"
---

# Prompt Framing Distorts Count-Based Evaluation of LLM Error Detection: Evidence from Numeric Anchoring
# 提示词框架扭曲了基于计数的LLM错误检测评估：来自数字锚定效应的证据

**Abstract:** Count-based F1 is widely used as a proxy for LLM error-detection quality, but this paper shows that it can rise dramatically without a corresponding improvement in span localization, a gap termed F1 Inflation.
**摘要：** 基于计数的 F1 分数常被用作衡量大语言模型（LLM）错误检测质量的指标，但本文研究表明，该指标可能会在跨度定位（span localization）没有相应提升的情况下大幅上升，这种现象被称为“F1 通胀”（F1 Inflation）。

The paper introduces ErrorBench, a controlled stress-test protocol for prompt-induced count distortion. ErrorBench evaluates six contemporary LLMs under five prompt conditions over 4,290 responses from 143 CoNLL-2014 passages.
本文引入了 ErrorBench，这是一个用于测试提示词诱导计数失真的受控压力测试协议。ErrorBench 在五种提示词条件下，对六种当代大语言模型进行了评估，共分析了来自 143 篇 CoNLL-2014 文章的 4,290 条响应。

Under CoNLL-2014 M2-style scoring, anchored prompts produce up to 0.79 points of F1 Inflation, and up to 0.96 under strict matching. A 100-passage replication using the official ERRANT 3.0.0 pipeline and multi-reference scoring reproduces the pattern: averaged over six models, the Blind-to-Anchored prompt shift raises Count-F1 by +0.21 while raising multi-reference ERRANT F0.5 by only +0.04.
在 CoNLL-2014 M2 风格的评分标准下，锚定提示词（anchored prompts）会导致高达 0.79 点的 F1 通胀，而在严格匹配下则高达 0.96 点。使用官方 ERRANT 3.0.0 流水线和多参考评分进行的 100 篇文章复现实验重现了这一模式：在六个模型的平均值中，从“盲测”到“锚定”提示词的转变使 Count-F1 提高了 +0.21，而多参考 ERRANT F0.5 仅提高了 +0.04。

The study finds larger count responses in highly instruction-compliant GPT/Claude systems and smaller responses in the Gemini family under this stress-test protocol. The findings suggest that LLM proofreading and document-review evaluations should avoid pre-populated error counts and should report span-aware metrics alongside count-based metrics.
研究发现，在该压力测试协议下，指令遵循度极高的 GPT/Claude 系统倾向于给出更大的计数响应，而 Gemini 系列模型则倾向于给出较小的响应。研究结果表明，在进行大语言模型校对和文档审查评估时，应避免预设错误计数，并应在报告基于计数的指标的同时，提供具备跨度感知（span-aware）能力的评估指标。