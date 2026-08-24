---
title: "LiteVLA-H: Dual-Rate Vision-Language-Action Inference for Onboard Aerial Guidance and Semantic Perception"
originalUrl: "https://arxiv.org/abs/2605.00884"
date: "2026-05-05T22:26:53.015Z"
---

# LiteVLA-H: Dual-Rate Vision-Language-Action Inference for Onboard Aerial Guidance and Semantic Perception
# LiteVLA-H：用于机载飞行引导与语义感知的双速率视觉-语言-动作推理

Vision-language-action (VLA) models have shown strong semantic grounding and task generalization in manipulation, but aerial deployment remains difficult because drones require low-latency closed-loop guidance under strict onboard compute and communication constraints.
视觉-语言-动作（VLA）模型在操作任务中展现了强大的语义基础和任务泛化能力，但其在无人机上的部署仍然困难重重，因为无人机需要在严格的机载计算和通信限制下，实现低延迟的闭环引导。

We present LiteVLA-H, a compact 256M-parameter VLA system designed for dual-rate operation on an NVIDIA Jetson AGX Orin: a fast outer-loop guidance mode for short action-token outputs and a slower semantic mode for scene understanding, hazard description, and operator-facing narration.
我们提出了 LiteVLA-H，这是一个紧凑的 256M 参数 VLA 系统，专为 NVIDIA Jetson AGX Orin 平台上的双速率运行而设计：一种用于短动作标记输出的快速外环引导模式，以及一种用于场景理解、危险描述和面向操作员叙述的较慢语义模式。

The central empirical observation is that, in this compact edge regime, end-to-end latency is dominated by multimodal pre-fill rather than by the marginal cost of decoding a few extra tokens.
核心的实证观察是，在这种紧凑的边缘计算环境下，端到端延迟主要由多模态预填充（pre-fill）决定，而非解码额外几个标记的边际成本。

This motivates a scheduler that issues reactive action tokens at 50.65ms (19.74Hz) while still supporting sentence-level semantic outputs at 149.90--164.57ms (6.08--6.67Hz) on the same embedded platform.
这促使我们设计了一种调度器，能够在同一嵌入式平台上以 50.65 毫秒（19.74Hz）的频率发布响应式动作标记，同时仍能以 149.90--164.57 毫秒（6.08--6.67Hz）的频率支持句子级的语义输出。

To specialize the model without collapsing its descriptive competence, we use a knowledge-preserving fine-tuning recipe that mixes reactive flight data, aerial semantic data, and generic caption/VQA supervision.
为了在不丧失描述能力的前提下对模型进行专业化处理，我们采用了一种知识保留微调方案，该方案混合了响应式飞行数据、空中语义数据以及通用的标题/视觉问答（VQA）监督信息。

Beyond reporting current latency measurements, we position the system against recent state-of-the-art architectures, including AnywhereVLA, FutureVLA, and ReMem-VLA, showing that the measured action branch reaches a higher edge inference rate under our deployment conditions while retaining periodic semantic awareness.
除了报告当前的延迟测量结果外，我们将该系统与 AnywhereVLA、FutureVLA 和 ReMem-VLA 等近期最先进的架构进行了对比，结果表明，在我们的部署条件下，该系统的动作分支在保持周期性语义感知的同时，达到了更高的边缘推理速率。