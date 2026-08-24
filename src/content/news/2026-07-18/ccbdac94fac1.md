---
title: "Interpretable Language Model for Closed-Loop Type 1 Diabetes Control"
originalUrl: "https://arxiv.org/abs/2607.14126"
date: "2026-07-17T22:18:45.169Z"
---

# Interpretable Language Model for Closed-Loop Type 1 Diabetes Control
# 用于闭环 1 型糖尿病控制的可解释语言模型

**Abstract:** Type 1 Diabetes (T1D) is a chronic, life-threatening autoimmune condition characterized by the complete destruction of insulin-producing pancreatic beta cells. While Artificial Pancreas Systems (APS) powered by Reinforcement Learning (RL) have shown promise in automating insulin delivery, their ``black-box'' nature makes it hard for patients and doctors to trust them fully.

**摘要：** 1 型糖尿病 (T1D) 是一种慢性的、危及生命的自身免疫性疾病，其特征是产生胰岛素的胰腺 β 细胞完全被破坏。虽然由强化学习 (RL) 驱动的人工胰腺系统 (APS) 在胰岛素自动输送方面展现出了前景，但其“黑箱”特性使得患者和医生难以完全信任它们。

This paper presents LLM-T1D, a promising approach that combines the precision of RL with the clear, human-like reasoning of Large Language Models (LLMs) to create a more transparent and reliable insulin pump controller. By training an expert RL system and distilling its knowledge into fine-tuned LLaMA 3.1 8B and Qwen3 8B models, we developed a controller that not only surpasses the RL system's performance but also explains its decisions in plain, understandable language.

本文提出了 LLM-T1D，这是一种结合了强化学习的精确性与大语言模型 (LLM) 清晰、类人推理能力的前沿方法，旨在打造更透明、更可靠的胰岛素泵控制器。通过训练专家强化学习系统，并将其知识蒸馏到经过微调的 LLaMA 3.1 8B 和 Qwen3 8B 模型中，我们开发出了一种控制器，它不仅超越了原强化学习系统的性能，还能用通俗易懂的语言解释其决策过程。

Tested on the FDA-approved UVA/Padova T1D simulator, the LLM controllers deliver excellent blood sugar control (73.5% Time in Range) while maintaining strict formal safety verification against hallucinations.

在经 FDA 批准的 UVA/Padova T1D 模拟器上进行测试后，该 LLM 控制器实现了出色的血糖控制（目标范围内时间占比达 73.5%），同时保持了严格的形式化安全验证，有效防止了幻觉现象。