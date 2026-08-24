---
title: "Efficient Punctuation Restoration via Weighted Lookahead Scoring Method for Streaming ASR Systems"
originalUrl: "https://arxiv.org/abs/2606.05179"
date: "2026-06-05T22:45:34.363Z"
---

# Efficient Punctuation Restoration via Weighted Lookahead Scoring Method for Streaming ASR Systems
# 基于加权前瞻评分法的流式语音识别系统高效标点恢复

**Abstract:** Punctuation restoration improves ASR (Automatic Speech Recognition) readability. However, streaming ASR requires online decisions with limited future context. In streaming ASR, the system predicts punctuation incrementally, which makes generation-based approaches prone to latency and alignment failures under boundary-wise evaluation.

**摘要：** 标点恢复能够提升自动语音识别（ASR）的可读性。然而，流式语音识别需要在有限的未来上下文条件下做出在线决策。在流式语音识别中，系统以增量方式预测标点符号，这使得基于生成的方法在边界评估中容易出现延迟和对齐失败的问题。

This paper proposes a non-autoregressive scoring method (no free-form generation) that preserves the input transcript and makes a decision at each word boundary. Our method compares punctuation insertion hypotheses against a no-insertion baseline under a bounded K-subword-token lookahead, and calibrates decisions using a weight $\alpha$ and a validation-calibrated threshold $\tau$ (no parameter updates during inference).

本文提出了一种非自回归评分方法（无需自由生成），该方法在保留输入文本的同时，在每个词边界处做出决策。我们的方法在有限的 K 个子词标记前瞻范围内，将标点插入假设与不插入的基准进行比较，并利用权重 $\alpha$ 和验证校准阈值 $\tau$ 来校准决策（推理过程中无需更新参数）。

On IWSLT 2017, our scoring method achieves a 4-class macro F1 of 0.893 in the no fine-tuning setting (validation-calibrated, K=2) and 0.937 after fine-tuning (K=2), outperforming the prompt-based baseline (0.566) and a fine-tuned ELECTRA baseline (0.913) under the same lookahead budget. We analyze the impact of the lookahead budget through ablation studies on K.

在 IWSLT 2017 数据集上，我们的评分方法在无需微调的情况下（验证校准，K=2）实现了 0.893 的 4 类宏平均 F1 分数，微调后（K=2）达到 0.937，在相同的前瞻预算下，表现优于基于提示的基准（0.566）和微调后的 ELECTRA 基准（0.913）。我们通过针对 K 的消融实验分析了前瞻预算的影响。