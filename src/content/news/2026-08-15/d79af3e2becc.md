---
title: "LoRA-Diffusion: Parameter-Efficient Fine-Tuning via Low-Rank Trajectory Decomposition"
originalUrl: "https://arxiv.org/abs/2608.12328"
date: "2026-08-14T21:55:59.186Z"
---

# LoRA-Diffusion: Parameter-Efficient Fine-Tuning via Low-Rank Trajectory Decomposition
# LoRA-Diffusion：通过低秩轨迹分解实现参数高效微调

**Abstract:** Parameter-efficient fine-tuning methods such as LoRA have transformed the adaptation of large autoregressive language models, enabling task-specific customization with substantially fewer trainable parameters. However, these methods have not been successfully extended to diffusion-based language models, which generate text through iterative denoising rather than sequential token prediction.

**摘要：** 诸如 LoRA 之类的参数高效微调方法已经改变了大型自回归语言模型的适配方式，使得在大幅减少可训练参数的情况下实现特定任务的定制成为可能。然而，这些方法尚未成功扩展到基于扩散（diffusion-based）的语言模型中，因为这类模型是通过迭代去噪而非顺序标记预测来生成文本的。

We propose LoRA-Diffusion, a parameter-efficient fine-tuning approach that applies low-rank decomposition to the denoising trajectory instead of model weights. Unlike weight-based LoRA, which modifies individual transformation matrices, our method learns low-rank perturbations to the entire diffusion path from noise to output.

我们提出了 LoRA-Diffusion，这是一种参数高效的微调方法，它将低秩分解应用于去噪轨迹而非模型权重。与修改单个变换矩阵的基于权重的 LoRA 不同，我们的方法学习的是从噪声到输出的整个扩散路径的低秩扰动。

We introduce trajectory-level low-rank adapters that modify each denoising step, step-adaptive rank allocation across diffusion phases, and compositional multi-task learning that allows merging task-specific modules at inference without retraining.

我们引入了轨迹级低秩适配器来修改每个去噪步骤，实现了跨扩散阶段的步长自适应秩分配，以及组合式多任务学习，允许在推理时合并特定任务模块而无需重新训练。

On SST-2, QNLI, and MRPC, we report token-level denoising validation accuracy over five random seeds. LoRA-Diffusion achieves the highest mean performance on SST-2 and strong performance on QNLI and MRPC. Joint multi-task training further shows that LoRA-Diffusion achieves the highest token-level accuracy among the evaluated methods.

在 SST-2、QNLI 和 MRPC 数据集上，我们报告了基于五个随机种子的标记级去噪验证准确率。LoRA-Diffusion 在 SST-2 上取得了最高的平均性能，并在 QNLI 和 MRPC 上表现强劲。联合多任务训练进一步表明，LoRA-Diffusion 在所有评估方法中达到了最高的标记级准确率。

The approach reduces per-task storage compared with full fine-tuning and establishes a parameter-efficient fine-tuning framework for diffusion language models.

与全参数微调相比，该方法减少了每个任务的存储需求，并为扩散语言模型建立了一个参数高效的微调框架。