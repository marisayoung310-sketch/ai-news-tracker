---
title: "ViPO: Visual Preference Optimization at Scale"
originalUrl: "https://arxiv.org/abs/2604.24953"
date: "2026-04-29T07:12:10.921Z"
---

# ViPO: Visual Preference Optimization at Scale

**Abstract:** While preference optimization is crucial for improving visual generative models, how to effectively scale this paradigm remains largely unexplored. Current open-source preference datasets contain conflicting preference patterns, where winners excel in some dimensions but underperform in others. Naively optimizing on such noisy datasets fails to learn preferences, hindering effective scaling.

**摘要：** 尽管偏好优化对于改进视觉生成模型至关重要，但如何有效地扩展这一范式在很大程度上仍未被探索。当前的开源偏好数据集包含相互冲突的偏好模式，即“胜出者”在某些维度上表现出色，但在其他维度上却表现不佳。在这些嘈杂的数据集上进行简单的优化无法有效学习偏好，从而阻碍了有效的扩展。

To enhance robustness against noise, we propose Poly-DPO, which extends the DPO objective with an additional polynomial term that dynamically adjusts model confidence based on dataset characteristics, enabling effective learning across diverse data distributions. Beyond biased patterns, existing datasets suffer from low resolution, limited prompt diversity, and imbalanced distributions.

为了增强对噪声的鲁棒性，我们提出了 Poly-DPO。它通过一个额外的多项式项扩展了 DPO 目标函数，该项能够根据数据集特征动态调整模型置信度，从而实现跨不同数据分布的有效学习。除了存在偏差的模式外，现有数据集还存在分辨率低、提示词（prompt）多样性有限以及分布不平衡等问题。

To facilitate large-scale visual preference optimization by tackling data bottlenecks, we construct ViPO, a massive-scale preference dataset with 1M image pairs at 1024px across five categories and 300K video pairs at 720p+ across three categories. State-of-the-art generative models and diverse prompts ensure reliable preference signals with balanced distributions.

为了通过解决数据瓶颈来促进大规模视觉偏好优化，我们构建了 ViPO。这是一个大规模偏好数据集，包含 100 万对 1024px 分辨率的图像对（涵盖五个类别）以及 30 万对 720p+ 分辨率的视频对（涵盖三个类别）。最先进的生成模型和多样化的提示词确保了具有平衡分布的可靠偏好信号。

Remarkably, when applying Poly-DPO to our high-quality dataset, the optimal configuration converges to standard DPO. This convergence validates dataset quality and Poly-DPO's adaptive nature: sophisticated optimization becomes unnecessary with sufficient data quality, yet remains valuable for imperfect datasets.

值得注意的是，当将 Poly-DPO 应用于我们的高质量数据集时，其最优配置会收敛到标准的 DPO。这种收敛性验证了数据集的质量以及 Poly-DPO 的自适应特性：在数据质量足够高时，复杂的优化变得不再必要，但对于不完美的数据集，它仍然具有重要价值。

We validate our approach across visual generation models. On noisy datasets like Pick-a-Pic V2, Poly-DPO achieves 6.87 and 2.32 gains over Diffusion-DPO on GenEval for SD1.5 and SDXL, respectively. For ViPO, models achieve performance far exceeding those trained on existing open-source preference datasets. These results confirm that addressing both algorithmic adaptability and data quality is essential for scaling visual preference optimization.

我们在多个视觉生成模型上验证了我们的方法。在像 Pick-a-Pic V2 这样的嘈杂数据集上，Poly-DPO 在 GenEval 评测中，相较于 Diffusion-DPO，在 SD1.5 和 SDXL 上分别取得了 6.87 和 2.32 的提升。对于 ViPO 数据集，模型表现远超在现有开源偏好数据集上训练的模型。这些结果证实，同时解决算法适应性和数据质量问题对于扩展视觉偏好优化至关重要。