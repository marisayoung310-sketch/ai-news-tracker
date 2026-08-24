---
title: "CARE-LoRA: Compressed Activation REconstruction for Memory-Efficient LoRA"
originalUrl: "https://arxiv.org/abs/2607.11940"
date: "2026-07-15T22:25:54.125Z"
---

# CARE-LoRA: Compressed Activation REconstruction for Memory-Efficient LoRA
# CARE-LoRA：用于内存高效 LoRA 的压缩激活重构技术

**Abstract:** As the scale of large pre-trained models continues to grow, fine-tuning them under limited memory budgets has become increasingly challenging. Low-Rank Adaptation (LoRA), currently one of the most widely adopted parameter-efficient fine-tuning (PEFT) methods, mitigates this challenge by optimizing only low-rank adaptation matrices, thereby greatly reducing the number of trainable parameters.

**摘要：** 随着大型预训练模型规模的持续增长，在有限的内存预算下对其进行微调变得越来越具有挑战性。低秩自适应（LoRA）作为目前应用最广泛的参数高效微调（PEFT）方法之一，通过仅优化低秩自适应矩阵来缓解这一挑战，从而大幅减少了可训练参数的数量。

With the parameter overhead substantially reduced, the activations retained for backpropagation have emerged as the primary remaining memory bottleneck during LoRA fine-tuning. To address this, we propose CARE-LoRA, a data-aware Compressed Activation REconstruction framework.

随着参数开销的大幅降低，为反向传播而保留的激活值已成为 LoRA 微调过程中主要的内存瓶颈。为了解决这一问题，我们提出了 CARE-LoRA，这是一个数据感知的压缩激活重构框架。

By exploiting the inherent projection structure of LoRA, CARE-LoRA replaces the full input activation with the low-rank compressed activation naturally produced by the LoRA branch. It further computes a lightweight reconstruction matrix during the forward pass with negligible additional computation cost, which is used during backpropagation to reconstruct the gradient signal, thereby keeping LoRA matrices fully trainable.

通过利用 LoRA 固有的投影结构，CARE-LoRA 使用 LoRA 分支自然产生的低秩压缩激活来替代完整的输入激活。此外，它在正向传播过程中计算一个轻量级的重构矩阵，且仅产生可忽略不计的额外计算成本；该矩阵在反向传播时用于重构梯度信号，从而确保 LoRA 矩阵保持完全可训练。

Extensive experiments across diverse models and downstream tasks demonstrate that, while substantially reducing the overall memory footprint, CARE-LoRA achieves competitive or even superior performance compared with standard LoRA and representative LoRA variants. Our code is publicly available at this https URL.

在多种模型和下游任务上的广泛实验表明，CARE-LoRA 在大幅降低整体内存占用的同时，与标准 LoRA 及代表性的 LoRA 变体相比，实现了具有竞争力甚至更优的性能。我们的代码已在链接中公开。