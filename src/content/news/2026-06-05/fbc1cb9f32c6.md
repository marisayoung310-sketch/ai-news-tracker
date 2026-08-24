---
title: "Five Ways to Fine-Tune Chronos-2, the Time Series Foundation Model"
originalUrl: "https://towardsdatascience.com/five-ways-to-fine-tune-chronos-2-the-time-series-foundation-model/"
date: "2026-06-04T22:58:46.164Z"
---

# Five Ways to Fine-Tune Chronos-2, the Time Series Foundation Model
# 微调时间序列基础模型 Chronos-2 的五种方法

**Part 2: Practitioner's walkthrough on LoRA adaptation**
**第二部分：LoRA 适配的实践指南**

In Part 1 of this series, we introduced Chronos-2, a time-series foundation model. We got our hands dirty by walking through a real case study and saw what Chronos-2 can do straight out of the box, with no training. But as we noted at the end of Part 1, zero-shot isn’t always enough.
在本系列的第一部分中，我们介绍了时间序列基础模型 Chronos-2。我们通过一个真实的案例研究进行了实操，了解了 Chronos-2 在无需训练的情况下“开箱即用”的表现。但正如我们在第一部分结尾所指出的，零样本（zero-shot）预测并不总是足够的。

In cases when:
在以下情况下：
* Your data may look unlike anything in the pretraining mix.
* 您的数据可能与预训练集中的任何数据都不相似。
* The model keeps making systematic errors.
* 模型持续出现系统性误差。
* You do have rich historical data that can be leveraged.
* 您拥有可以利用的丰富历史数据。
* Your downstream objective may be misaligned with the objective that Chronos-2’s training optimizes for.
* 您的下游目标可能与 Chronos-2 训练所优化的目标不一致。

Fine-tuning is the natural next step. In this post, we’ll continue the same building electricity-demand case study from Part 1, and walk through five fine-tuning scenarios of Chronos-2:
微调是顺理成章的下一步。在本文中，我们将继续使用第一部分中关于建筑电力需求的案例研究，并详细介绍 Chronos-2 的五种微调场景：

1. Single-building adaptation: how to fine-tune on the one asset.
1. 单建筑适配：如何针对单一资产进行微调。
2. Portfolio fine-tuning: how to pool history across the fleet for a shared adapter.
2. 资产组合微调：如何汇总整个资产群的历史数据以训练共享适配器。
3. Covariate-informed fine-tuning: how to fine-tune with known-future signals.
3. 协变量感知微调：如何利用已知的未来信号进行微调。
4. Portfolio + covariates: how to leverage both covariate and fleet information.
4. 资产组合 + 协变量：如何同时利用协变量和资产群信息。
5. Held-out transfer: how to adapt once, then deploy on assets the model never saw during fine-tuning.
5. 留出法迁移：如何进行一次适配，然后部署到模型在微调期间从未见过的资产上。

By the end, you’ll have a working template for fine-tuning a TSFM that is ready to adapt to your own data.
读完本文，您将获得一个可运行的 TSFM（时间序列基础模型）微调模板，随时准备适配您自己的数据。

---

### 1. The case study, recapped
### 1. 案例研究回顾

Let’s quickly revisit the setup from Part 1. We have a synthetic dataset of eight commercial buildings that records hourly electricity demand. The task we aim to solve is to forecast the total electricity load one week ahead, i.e., 168 hours.
让我们快速回顾一下第一部分的设置。我们拥有一个包含八座商业建筑每小时电力需求记录的合成数据集。我们的目标是预测未来一周（即 168 小时）的总电力负荷。

Now, what’s new for Part 2 is that we simulate a longer time span so that we can have data for fine-tuning. And we keep a clean separation between fine-tuning data and inference data.
第二部分的新内容是，我们模拟了更长的时间跨度，以便获得用于微调的数据。同时，我们保持了微调数据和推理数据的清晰分离。

---

### 2. Brief on fine-tuning and LoRA
### 2. 微调与 LoRA 简介

Before our walk-through, let’s first briefly discuss the concept of fine-tuning and one of its specific technologies, i.e., LoRA.
在开始实操之前，我们先简要讨论一下微调的概念及其特定技术之一：LoRA。

#### 2.1 What is fine-tuning?
#### 2.1 什么是微调？

Fine-tuning means we continue training a pretrained model on our own data. Effectively, we are adapting the weights of the pretrained model such that it understands and follows the patterns specific to our problem.
微调意味着我们在自己的数据上继续训练预训练模型。实际上，我们是在调整预训练模型的权重，使其能够理解并遵循我们特定问题的模式。

#### 2.2 What is LoRA?
#### 2.2 什么是 LoRA？

LoRA stands for Low-Rank Adaptation [1]. Its core idea is simple: instead of updating the full weight matrices, we freeze the original pre-trained model and only learn a small set of additional parameters that slightly modify its behavior.
LoRA 代表低秩自适应（Low-Rank Adaptation）[1]。其核心思想很简单：我们不更新完整的权重矩阵，而是冻结原始的预训练模型，仅学习一小部分额外的参数来微小地修改其行为。

The trick that LoRA adopts is that ΔW is not learned as a full matrix. Instead, LoRA represents it as the product of two much smaller matrices: A and B. The reason why it’s called a low-rank method is that r (the rank) is usually quite small, such as 4, 8, 16, or 32.
LoRA 采用的技巧是，ΔW 并非作为一个完整矩阵来学习。相反，LoRA 将其表示为两个更小矩阵 A 和 B 的乘积。之所以称为低秩方法，是因为 r（秩）通常很小，例如 4、8、16 或 32。

In practice, this gives us several advantages:
在实践中，这为我们带来了几个优势：
* **Lower GPU memory usage:** Fewer trainable parameters mean lower gradients and optimizer states.
* **更低的 GPU 内存占用：** 更少的可训练参数意味着更少的梯度和优化器状态。
* **Smaller checkpoints:** We only save the adapter, not the full 120M-parameter model.
* **更小的检查点：** 我们只需保存适配器，而无需保存完整的 1.2 亿参数模型。
* **Reduced overfitting risk:** Especially useful when the downstream dataset is not large.
* **降低过拟合风险：** 在下游数据集规模不大时尤为有效。

---

### 3. How to do LoRA for Chronos-2?
### 3. 如何为 Chronos-2 实现 LoRA？

To do LoRA for the Chronos-2 model, the first thing we need to decide is which layers of Chronos-2 we want to adapt.
要为 Chronos-2 模型实现 LoRA，我们首先需要决定要适配 Chronos-2 的哪些层。