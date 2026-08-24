---
title: "Does Marginal Coverage Guarantee Class-Conditional Safety for Zero-Shot VLMs Under Shift?"
originalUrl: "https://arxiv.org/abs/2608.19376"
date: "2026-08-21T21:53:45.036Z"
---

### Does Marginal Coverage Guarantee Class-Conditional Safety for Zero-Shot VLMs Under Shift?
### 边缘覆盖能否保证零样本视觉语言模型在分布偏移下的类条件安全性？

**Abstract:** Split-conformal prediction provides marginal coverage under exchangeability and is increasingly used as an abstention layer for zero-shot vision-language models (VLMs). We audit this practice under deployment shift for CLIP, OpenCLIP, and SigLIP across ImageNet and non-ImageNet settings.

**摘要：** 分割一致性预测（Split-conformal prediction）在可交换性条件下提供边缘覆盖，并日益被用作零样本视觉语言模型（VLM）的弃权层。我们在部署偏移的情况下，对 CLIP、OpenCLIP 和 SigLIP 在 ImageNet 及非 ImageNet 环境下的这一实践进行了审计。

Marginal coverage can remain relatively high while class-conditional tail coverage collapses: on ImageNet-Sketch, worst-class coverage falls to $\approx 0$ and 10-12% of classes lie below a finite-sample null floor, despite marginal coverage of about 0.86. The failure is aligned with target-domain class accuracy but is not predicted by the source-domain diagnostics we test.

尽管边缘覆盖率保持在约 0.86 左右，但类条件尾部覆盖率可能会崩溃：在 ImageNet-Sketch 数据集上，最差类别的覆盖率降至 $\approx 0$，且 10-12% 的类别低于有限样本的零底线。这种失效与目标域的类准确率一致，但无法通过我们测试的源域诊断指标进行预测。

Source-side Mondrian calibration improves the in-distribution tail but does not transfer, while clustered conformal and Conf-OT improve marginal or average metrics without recovering the worst-class tail. Target-side class calibration substantially lifts the tail, but requires labels for every class and remains set-size-intensive.

源侧 Mondrian 校准改善了分布内的尾部表现，但无法迁移；而聚类一致性（clustered conformal）和 Conf-OT 虽然改善了边缘或平均指标，却无法恢复最差类别的尾部表现。目标侧类校准虽然能显著提升尾部表现，但需要每个类别的标签，且会导致集合大小（set-size）过大。

We further identify a 2-3$\times$ cross-family efficiency gap and show that native SigLIP sigmoid scores remove APS's probability-mass interpretation. The findings persist across the tested model scale, pretraining corpus, prompt, miscoverage level $\alpha$, and shifted non-ImageNet settings. Marginal conformal coverage should therefore be treated as an average reliability statistic, not as a safety guarantee for the class tail.

我们进一步发现了 2-3 倍的跨模型族效率差距，并证明了原生 SigLIP 的 Sigmoid 分数消除了 APS（自适应预测集）的概率质量解释。这些发现贯穿于我们测试的模型规模、预训练语料库、提示词、误覆盖水平 $\alpha$ 以及偏移后的非 ImageNet 环境中。因此，边缘一致性覆盖应被视为一种平均可靠性统计指标，而非类尾部安全性的保证。