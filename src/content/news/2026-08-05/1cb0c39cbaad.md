---
title: "Leak It: A Probabilistic Approach to Training-Data Extraction from Black-Box Language Models"
originalUrl: "https://arxiv.org/abs/2608.00144"
date: "2026-08-04T22:40:01.310Z"
---

# Leak It: A Probabilistic Approach to Training-Data Extraction from Black-Box Language Models

**Leak It：一种从黑盒语言模型中提取训练数据的概率方法**

***

**Abstract:** Membership inference (MIA) on language models is usually summarised by an aggregate ROC-AUC, but such evaluations are confounded: model-free blind baselines separate members from non-members from surface text alone. We study black-box, sampling-based training-data leakage through a probabilistic lens, treating N samples from p(.|x) as an estimate of the output distribution and casting leakage signals as functionals of it.

**摘要：** 针对语言模型的成员推理攻击（MIA）通常使用汇总的 ROC-AUC 指标进行总结，但此类评估存在混淆因素：无需模型的盲基准测试仅凭表面文本即可区分成员与非成员。我们通过概率视角研究了基于采样的黑盒训练数据泄露问题，将从 p(.|x) 中获取的 N 个样本视为对输出分布的估计，并将泄露信号视为该分布的泛函。

***

We extend the blind-baseline critique into the sampling regime: on WikiMIA a blind bag-of-words classifier reaches AUC 0.97 (TPR 0.90 at 5% FPR) and sampling adds nothing, while on an IID Pile split (MIMIR) neither self-concentration nor gold-continuation recovery significantly beats a blind baseline (incremental AUC 95% CI includes zero). Aggregate metrics hide the real harm.

我们将对盲基准的批判扩展到了采样领域：在 WikiMIA 数据集上，一个盲词袋分类器达到了 0.97 的 AUC（在 5% FPR 下 TPR 为 0.90），而采样方法并未带来任何提升；同时，在 IID Pile 数据集划分（MIMIR）上，无论是自集中度（self-concentration）还是黄金续写恢复（gold-continuation recovery），其表现均未显著优于盲基准（增量 AUC 的 95% 置信区间包含零）。汇总指标掩盖了真正的危害。

***

The same sampling verbatim-extracts training data for a tail of documents no blind attack can reach. On Pythia-6.9B, 83 of 500 Pile documents bearing a real identifier (16.6%; 21.3% of those bearing an email address) have that exact identifier reproduced AND not reproduced under a mismatched-prefix control, so each leak is attributable to that document, not to a globally common string. This per-document disclosure is invisible to aggregate AUC and grows with capacity (5.6% to 16.6% from 410M to 6.9B).

同样的采样方法能够逐字提取出任何盲攻击都无法触及的“长尾”文档训练数据。在 Pythia-6.9B 模型上，500 份带有真实标识符的 Pile 文档中，有 83 份（16.6%；若仅计算带有电子邮件地址的文档则为 21.3%）能够精确复现该标识符，且在不匹配前缀的对照组中不会复现，因此每次泄露都可归因于该特定文档，而非全局通用字符串。这种针对单篇文档的泄露在汇总 AUC 中是不可见的，且随着模型容量的增加而增长（从 410M 到 6.9B，泄露比例从 5.6% 上升至 16.6%）。

***

The risk is uneven: identifier leakage is ~3x stronger in code than prose, though prose stays clearly positive and also grows with capacity (4.0% to 12.1%), while recovery of arbitrary held-out continuations is confined to code (+0.44 member gap on GitHub vs at most +0.014 on prose). Temperature and nucleus sampling matter little, a 16-token prefix suffices, and we detect no reduction from corpus deduplication. Privacy audits should report per-document extraction, decomposed by domain, not a single AUC. We release leakit, a black-box extraction-audit tool.

风险分布并不均匀：代码中的标识符泄露强度约为散文的 3 倍，尽管散文中的泄露风险依然明显且随容量增加（从 4.0% 增长至 12.1%），但对任意留出续写内容的恢复仅限于代码领域（GitHub 上的成员差距为 +0.44，而散文最多仅为 +0.014）。温度采样和核采样（nucleus sampling）的影响微乎其微，16 个 token 的前缀就已足够，且我们未发现语料库去重能降低泄露风险。隐私审计应报告按领域分解的单篇文档提取情况，而非单一的 AUC 指标。我们发布了 leakit，这是一款黑盒提取审计工具。