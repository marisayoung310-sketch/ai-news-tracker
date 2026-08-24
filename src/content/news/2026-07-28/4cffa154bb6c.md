---
title: "Adversarial Style Optimization: Enhancing VLM Jailbreaks by GRPO-based Stylistic Triggers Optimization"
originalUrl: "https://arxiv.org/abs/2607.21619"
date: "2026-07-27T22:34:53.728Z"
---

# Adversarial Style Optimization: Enhancing VLM Jailbreaks by GRPO-based Stylistic Triggers Optimization

**Title:** Adversarial Style Optimization: Enhancing VLM Jailbreaks by GRPO-based Stylistic Triggers Optimization
**标题：** 对抗性风格优化：通过基于 GRPO 的风格触发器优化增强 VLM 越狱

**Abstract:** Multimodal Large Language Models (MLLMs) have achieved impressive performance, but their safety alignment remains vulnerable to jailbreak attacks. Existing content-based jailbreaks are often inconsistent and show unsatisfying performance against the rapidly evolving MLLMs, failing to exploit non-content-based vulnerabilities.
**摘要：** 多模态大语言模型（MLLMs）已经取得了令人瞩目的表现，但其安全对齐机制在面对越狱攻击时仍然脆弱。现有的基于内容的越狱方法往往表现不稳定，在面对快速演进的 MLLM 时效果不尽如人意，且未能利用非内容相关的漏洞。

Unlike previous research, we empirically find that MLLMs exhibit a Stylistic Inconsistency between their comprehension ability and safety ability: MLLMs can robustly understand content regardless of visual style, yet their defense mechanisms can be easily bypassed by specific stylistic triggers.
与以往研究不同，我们通过实证发现 MLLM 在理解能力和安全能力之间存在“风格不一致性”：MLLM 无论视觉风格如何都能稳健地理解内容，但其防御机制却容易被特定的风格触发器所绕过。

Based on this finding, we propose Adversarial Style Optimization (ASO), a plug-and-play enhancement module to amplify existing visual jailbreaks. ASO fine-tunes an image-editing model to superimpose an optimized stylistic modification onto a given adversarial image, using a Group Relative Policy Optimization (GRPO) agent guided by a Structurally-Tiered Reward Function that combines a logit-based signal for detecting explicit refusals with a high-fidelity semantic evaluation from a powerful judge model.
基于这一发现，我们提出了对抗性风格优化（ASO），这是一个即插即用的增强模块，旨在放大现有的视觉越狱效果。ASO 通过微调图像编辑模型，将优化后的风格修改叠加到给定的对抗性图像上；该过程使用由“结构化分层奖励函数”引导的组相对策略优化（GRPO）智能体，该函数结合了用于检测显式拒绝的 Logit 信号以及来自强大判别模型的高保真语义评估。

Extensive experiments show that ASO significantly enhances the ASR of SOTA attacks, demonstrating that stylistic biases are a scalable vector for red-teaming MLLMs. Our code is available at this https URL.
大量实验表明，ASO 显著提高了当前最先进（SOTA）攻击的攻击成功率（ASR），证明了风格偏差是针对 MLLM 进行红队测试的一种可扩展向量。我们的代码已在链接中提供。