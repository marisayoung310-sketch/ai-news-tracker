---
title: "Building Fast, Evaluating Slow: Pipeline Choices Dominate Autointerpretability Score Variance"
originalUrl: "https://arxiv.org/abs/2607.19386"
date: "2026-07-23T22:35:44.164Z"
---

# Building Fast, Evaluating Slow: Pipeline Choices Dominate Autointerpretability Score Variance
# 构建快，评估慢：流水线选择主导了自动可解释性评分的方差

**Abstract:** Cross-paper comparison of sparse autoencoder (SAE) interpretability often relies on autointerpretability scores. In this evaluation pipeline, a language model (LM) explains each feature, and another LM scores the explanation. For these comparisons to be meaningful, scores must reflect stable properties of the features rather than confounding aspects of the evaluation pipeline.

**摘要：** 跨论文对比稀疏自编码器（SAE）的可解释性时，通常依赖于自动可解释性评分。在这种评估流水线中，一个语言模型（LM）负责解释每个特征，而另一个语言模型则对该解释进行评分。为了使这些对比具有意义，评分必须反映特征的稳定属性，而不是评估流水线中存在的混淆因素。

Through systematic experiments across four metrics (simulation, detection, fuzzing, purity), two models (Pythia-160M, Apertus-8B), and four axes of methodological variation, we show that this assumption does not hold. Specifically, we find that R1) methodological variance collectively exceeds architectural variance across all metrics and tested models; R2) each metric exhibits a distinct instability profile, with detection being the most stable and fuzzing unreliable across all conditions; R3) top-k feature rankings do not stay consistent across corpus and draw conditions, masking per-feature instability behind stable mean scores; a failure that cannot be detected by monitoring explanation similarity alone.

通过对四种指标（模拟、检测、模糊测试、纯度）、两种模型（Pythia-160M、Apertus-8B）以及四个方法论变体维度进行系统性实验，我们证明了上述假设并不成立。具体而言，我们发现：R1）在所有指标和测试模型中，方法论带来的方差总和超过了架构带来的方差；R2）每种指标都表现出独特的失稳特征，其中“检测”最为稳定，而“模糊测试”在所有条件下均不可靠；R3）Top-k 特征排名在不同的语料库和抽取条件下无法保持一致，这使得特征层面的不稳定性被稳定的平均分所掩盖；仅通过监控解释相似度无法发现这一缺陷。

These findings suggest that cross-paper comparisons based on autointerpretability scores may reflect pipeline differences rather than architectural differences, with implications for the ongoing debate on SAE utility. More broadly, unreliable evaluation slows progress in interpretability research at a time when reliable tools for understanding AI systems are needed. To support evaluation, we contribute a variance decomposition approach, a Stability Check, and a Minimum Reporting Checklist.

这些发现表明，基于自动可解释性评分的跨论文对比可能反映的是流水线差异，而非架构差异，这对当前关于 SAE 效用的争论具有重要意义。更广泛地说，在我们需要可靠工具来理解人工智能系统的当下，不可靠的评估正在拖慢可解释性研究的进展。为了支持评估工作，我们贡献了一种方差分解方法、一套稳定性检查机制以及一份最低报告清单。