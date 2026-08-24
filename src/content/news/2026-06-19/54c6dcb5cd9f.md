---
title: "DRIFT: Refining Instruction Data via On-Policy Data Attribution"
originalUrl: "https://arxiv.org/abs/2606.18307"
date: "2026-06-18T23:20:17.399Z"
---

# DRIFT: Refining Instruction Data via On-Policy Data Attribution
# DRIFT：通过策略内数据归因优化指令数据

Optimizing the training data distribution for Supervised Fine-Tuning (SFT) dictates the capability of Large Language Models (LLMs). While existing data curation methods excel at accelerating training under constrained budgets, they are less suited to elevating the capability upper bound. The challenge here is no longer to identify a smaller subset that preserves performance, but to refine the data distribution toward instances most capable of improving the final model.

优化监督微调（SFT）的训练数据分布决定了大语言模型（LLM）的能力上限。虽然现有的数据筛选方法在有限预算下加速训练方面表现出色，但它们并不适合提升模型的能力上限。当前面临的挑战不再是识别出能够保持性能的较小子集，而是将数据分布优化为最能提升最终模型能力的样本。

To address this problem, we explore instance-level data attribution using Influence Functions (IF). We identify that standard IF formulations struggle in this setting due to two structural limitations: a proximity gap caused by off-policy validation targets, and a severe bias towards gradient norm.

为了解决这一问题，我们探索了使用影响函数（Influence Functions, IF）进行实例级数据归因。我们发现，标准的 IF 公式在此场景下存在局限性，主要源于两个结构性缺陷：由离策略（off-policy）验证目标引起的邻近性差距，以及对梯度范数的严重偏差。

We propose DRIFT (Data Refinement via On-Policy Influence Functions for Supervised Fine-Tuning). Instead of relying on external reference data, DRIFT utilizes the model's on-policy rollouts as validation targets, which empirically minimizes the parameter proximity gap and better aligns with the local neighborhood assumption of IF.

我们提出了 DRIFT（用于监督微调的策略内影响函数数据优化）。DRIFT 不再依赖外部参考数据，而是利用模型自身的策略内（on-policy）输出作为验证目标。实验证明，这种方法最小化了参数邻近性差距，并更好地符合了 IF 的局部邻域假设。

It further applies signed weighting based on trajectory correctness and debiases influence scores against the gradient hacking issue, allowing a small set of validation queries to act as reliable anchors for attributing the full dataset. Experiments on 7B-parameter instruction and reasoning models show that DRIFT consistently raises the performance ceiling on both, outperforming existing data curation baselines.

此外，该方法根据轨迹正确性应用了符号加权，并消除了影响分数中针对“梯度黑客”（gradient hacking）问题的偏差，使得少量验证查询能够作为可靠的锚点，对整个数据集进行归因。在 7B 参数指令和推理模型上的实验表明，DRIFT 持续提升了这两类模型的性能上限，表现优于现有的数据筛选基准方法。