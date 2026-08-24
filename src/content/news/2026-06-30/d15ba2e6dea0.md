---
title: "ReWorld: Learning Better Representations for World Action Models"
originalUrl: "https://arxiv.org/abs/2606.27504"
date: "2026-06-29T22:42:37.372Z"
---

# ReWorld: Learning Better Representations for World Action Models

**Abstract:** World Action Models (WAMs) model future environment evolution under action conditioning, offering a scalable paradigm for autonomous driving. However, existing approaches focus largely on model architecture design, and how a WAM can efficiently learn better world representations for planning remains underexplored.

**摘要：** 世界动作模型（WAMs）通过动作条件建模未来环境的演变，为自动驾驶提供了一种可扩展的范式。然而，现有的方法主要集中在模型架构设计上，而 WAM 如何高效地学习更好的世界表征以用于规划，目前仍未得到充分探索。

To address this gap, we propose ReWorld, the first representation learning framework specifically designed for autonomous-driving world action models. In WAMs, standard training supervises only the output ends of the generation and planning modules, leaving the intermediate representations that carry world knowledge to be shaped only indirectly, as byproducts of fitting these outputs.

为了填补这一空白，我们提出了 ReWorld，这是首个专门为自动驾驶世界动作模型设计的表征学习框架。在 WAMs 中，标准训练仅监督生成和规划模块的输出端，使得承载世界知识的中间表征只能作为拟合这些输出的副产品被间接塑造。

The core idea of ReWorld is to treat intermediate representations as direct targets of optimization, shaping them along three complementary dimensions. On the Video DiT responsible for generation, we impose future-predictive supervision on its intermediate representations. On the Action DiT responsible for planning, we first align its intermediate representations cross-modally with the video world representation, then further shape them to be discriminative around safety-critical boundaries via hard-negative supervision.

ReWorld 的核心思想是将中间表征视为直接的优化目标，并从三个互补的维度对其进行塑造。对于负责生成的视频 DiT，我们对其中间表征施加未来预测监督。对于负责规划的动作 DiT，我们首先将其中间表征与视频世界表征进行跨模态对齐，然后通过困难负样本监督，进一步将其塑造为在安全关键边界处具有判别力的表征。

In addition, we systematically analyze the effectiveness of existing representation learning methods in video generation world models, and discuss why their performance is limited on this task.

此外，我们系统地分析了现有表征学习方法在视频生成世界模型中的有效性，并讨论了为何它们在此任务上的表现受到限制。

Experiments on nuScenes and NAVSIM show that ReWorld improves fine-tuned video generation by 23.9% in FVD (81.3 to 61.9), raises closed-loop PDMS from 89.1 to 90.4 without any post-training such as RL or post-processing, and accelerates from-scratch convergence by approximately 2x.

在 nuScenes 和 NAVSIM 上的实验表明，ReWorld 将微调后的视频生成 FVD 指标提升了 23.9%（从 81.3 降至 61.9），在无需任何强化学习（RL）或后处理的情况下，将闭环 PDMS 从 89.1 提高到 90.4，并将从零开始的收敛速度加快了约 2 倍。