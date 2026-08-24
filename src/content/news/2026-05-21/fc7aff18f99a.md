---
title: "Position: Uncertainty Quantification in LLMs is Just Unsupervised Clustering"
originalUrl: "https://arxiv.org/abs/2605.19220"
date: "2026-05-20T23:05:38.593Z"
---

# Position: Uncertainty Quantification in LLMs is Just Unsupervised Clustering
# 观点：大语言模型中的不确定性量化本质上只是无监督聚类

**Abstract:** Uncertainty Quantification (UQ) is widely regarded as the primary safeguard for deploying Large Language Models (LLMs) in high-stakes domains. However, we argue that the field suffers from a category error: mainstream UQ methods for LLMs are just unsupervised clustering algorithms.

**摘要：** 不确定性量化（UQ）被广泛认为是将大语言模型（LLM）部署在高风险领域的主要保障。然而，我们认为该领域存在一种范畴错误：目前主流的大模型不确定性量化方法本质上只是无监督聚类算法。

We demonstrate that most current approaches inherently quantify the internal consistency of the model's generations rather than their external correctness. Consequently, current methods are fundamentally blind to factual reality and fail to detect ``confident hallucinations,'' where models exhibit high confidence in stable but incorrect answers. Therefore, the current UQ methods may create a deceptive sense of safety when deploying the models with uncertainty.

我们证明，大多数现有方法本质上是在量化模型生成内容的内部一致性，而非其外部正确性。因此，这些方法从根本上无法感知事实真相，也无法检测出“自信的幻觉”——即模型对稳定但错误的答案表现出极高置信度的情况。因此，在部署具有不确定性的模型时，现有的不确定性量化方法可能会营造出一种虚假的安全感。

In detail, we identify three critical pathologies resulting from this dependence on internal state: a hyperparameter sensitivity crisis that renders deployment unsafe, an internal evaluation cycle that conflates stability with truth, and a fundamental lack of ground truth that forces reliance on unstable proxy metrics to evaluate uncertainty.

具体而言，我们指出了这种对内部状态依赖所导致的三个关键病理问题：一是超参数敏感性危机，这使得部署变得不安全；二是内部评估循环，它将稳定性与真实性混为一谈；三是缺乏客观事实依据，迫使研究者依赖不稳定的代理指标来评估不确定性。

To resolve this impasse, we advocate for a paradigm shift to UQ and outline a roadmap for the research community to adopt better evaluation metrics and settings, implement mechanism changes for native uncertainty, and anchor verification in objective truth, ensuring that model confidence serves as a reliable proxy for reality.

为了解决这一僵局，我们主张对不确定性量化进行范式转移，并为研究界规划了一条路线图：采用更好的评估指标和设置，实施针对原生不确定性的机制变革，并将验证锚定在客观事实之上，从而确保模型的置信度能够成为现实情况的可靠代理。