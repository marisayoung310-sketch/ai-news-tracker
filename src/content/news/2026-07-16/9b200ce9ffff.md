---
title: "SymbOmni: Evolving Agentic Omni Models via Symbolic Concept Learning"
originalUrl: "https://arxiv.org/abs/2607.12042"
date: "2026-07-15T22:26:14.075Z"
---

# SymbOmni: Evolving Agentic Omni Models via Symbolic Concept Learning
# SymbOmni：通过符号概念学习演进智能全能模型

Visual generation is increasingly ubiquitous in diverse domains, from text-to-image/video synthesis to multimodal interactive creation. Yet prevailing monolithic models remain fundamentally constrained by their inability to learn cumulatively and evolve autonomously, which is a limitation we term the "perpetual novice" problem. They lack mechanisms for structuring experience into reusable knowledge and therefore rely on brittle, "from-scratch" reasoning for each task, resulting in poor compositional generalization and inefficient knowledge retention.

视觉生成在从文本到图像/视频合成，再到多模态交互式创作等各个领域中正变得日益普及。然而，当前主流的单体模型在根本上受到其无法累积学习和自主演进能力的限制，我们将这种局限性称为“永久新手”问题。它们缺乏将经验结构化为可重用知识的机制，因此在处理每项任务时都依赖于脆弱的“从零开始”推理，导致组合泛化能力差且知识留存效率低下。

Motivated by these limitations, we propose SymbOmni, an agentic omni-model designed for cumulative evolution through Symbolic Concept Learning. At its core is the Symbolic Concept Box, an optimizable memory module that abstracts low-level operations into reusable Symbolic Workflow Instructions. SymbOmni operates through an induction-transduction cycle: experiences are abstracted into symbolic concepts (induction), which are then adaptively composed to solve novel tasks (transduction). The training is done by verbalized backpropagation with language-based feedback to enable continuous self-improvement without gradient-based model fine-tuning.

受这些局限性的启发，我们提出了 SymbOmni，这是一种旨在通过符号概念学习实现累积演进的智能全能模型。其核心是“符号概念盒”（Symbolic Concept Box），这是一个可优化的记忆模块，能够将底层操作抽象为可重用的“符号工作流指令”。SymbOmni 通过归纳-演绎循环运行：将经验抽象为符号概念（归纳），然后自适应地组合这些概念以解决新任务（演绎）。训练过程通过基于语言反馈的“口语化反向传播”完成，从而在无需基于梯度的模型微调的情况下实现持续的自我改进。

Comprehensive experiments validate that (I) SymbOmni significantly outperforms existing agent-based systems for iterative creation and also surpasses closed-source models (e.g., Nano Banana, GPT-Image-1) in both image quality and task success rates; (II) SymbOmni effectively reduces token consumption by over 40% while maintaining competitive generation quality; and (III) SymbOmni enables effective continual learning by achieving cumulative gains across multiple online-learning benchmarks and setting a new state of the art.

综合实验验证了：(I) SymbOmni 在迭代创作方面显著优于现有的基于智能体的系统，并在图像质量和任务成功率上均超越了闭源模型（如 Nano Banana、GPT-Image-1）；(II) SymbOmni 在保持具有竞争力的生成质量的同时，有效地将 Token 消耗降低了 40% 以上；(III) SymbOmni 通过在多个在线学习基准测试中实现累积收益并设定了新的行业最高水平（SOTA），从而实现了有效的持续学习。