---
title: "PE-CSNet: An equivariant network architecture with learnable patch-based sparse representation"
originalUrl: "https://arxiv.org/abs/2608.14708"
date: "2026-08-18T21:55:52.552Z"
---

# PE-CSNet: An equivariant network architecture with learnable patch-based sparse representation
# PE-CSNet：一种具有可学习分块稀疏表示的等变网络架构

**Abstract:** Compressive sensing (CS) enables accurate signal reconstruction from sparse measurements and is widely applied in medical imaging, remote sensing, and image compression. However, designing an effective, task-specific sparse transform and the corresponding optimization procedure for high-quality CS remains challenging. This process typically requires expert domain knowledge and laborious parameter tuning.

**摘要：** 压缩感知（CS）能够从稀疏测量中实现精确的信号重建，并广泛应用于医学成像、遥感和图像压缩领域。然而，为高质量压缩感知设计一种有效的、特定任务的稀疏变换及相应的优化过程仍然具有挑战性。这一过程通常需要专业的领域知识和繁琐的参数调整。

To address this issue, we present a Patch-based Equivariant deep unrolling architecture, termed PE-CSNet, for accurate CS recovery. While traditional CS methods generally use predefined patch-based transform sparsity, we generalize this idea by incorporating learnable transform sparsity that adapts to the specific CS task through an optimization-driven process.

为了解决这一问题，我们提出了一种基于分块的等变深度展开架构，称为 PE-CSNet，用于精确的压缩感知恢复。传统的压缩感知方法通常使用预定义的分块稀疏变换，而我们通过引入可学习的稀疏变换推广了这一思想，使其能够通过优化驱动的过程适应特定的压缩感知任务。

Specifically, we first establish a generalized patch-based CS model, which we solve via a block coordinate descent (BCD) algorithm. The BCD solver is then unrolled into a deep neural network, where all parameters of both the CS model and solver are learned through end-to-end training. To improve data efficiency, we introduce a stochastic equivariant training strategy that exploits the patch-wise structure of the network, enabling PE-CSNet to learn effectively even from limited data.

具体而言，我们首先建立了一个广义的分块压缩感知模型，并通过块坐标下降（BCD）算法进行求解。随后，我们将 BCD 求解器展开为深度神经网络，其中压缩感知模型和求解器的所有参数均通过端到端训练进行学习。为了提高数据效率，我们引入了一种随机等变训练策略，利用网络的块状结构，使 PE-CSNet 即使在数据有限的情况下也能有效学习。

We further provide a simpler, parameter-shared version of PE-CSNet and briefly discuss its convergence as an iterative solver. For practical applications, the network uses stage-specific (non-shared) parameters to enhance its expressive power and thereby improve its performance. On the tasks of CS magnetic resonance imaging (CS-MRI) and CS coded diffraction patterns (CS-CDP), PE-CSNet achieves state-of-the-art accuracy with fast computational speed, outperforming traditional methods and existing deep unrolling methods.

我们进一步提供了一个更简单的参数共享版 PE-CSNet，并简要讨论了其作为迭代求解器的收敛性。在实际应用中，该网络使用阶段特定（非共享）参数来增强其表达能力，从而提升性能。在压缩感知磁共振成像（CS-MRI）和压缩感知编码衍射图案（CS-CDP）任务中，PE-CSNet 以极快的计算速度实现了最先进的精度，优于传统方法和现有的深度展开方法。