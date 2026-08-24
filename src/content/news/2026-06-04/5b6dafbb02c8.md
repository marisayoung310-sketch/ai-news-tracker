---
title: "ChatHealthAI: Aligning Electronic Health Record Representations with Large Language Models for Grounded Clinical Reasoning"
originalUrl: "https://arxiv.org/abs/2606.02802"
date: "2026-06-03T23:20:03.287Z"
---

# ChatHealthAI: Aligning Electronic Health Record Representations with Large Language Models for Grounded Clinical Reasoning
# ChatHealthAI：将电子健康记录表征与大型语言模型对齐以实现扎实的临床推理

Large language models (LLMs) exhibit strong natural-language reasoning abilities for clinical decision support, but struggle to effectively model structured longitudinal electronic health records (EHRs). In contrast, EHR foundation models can learn predictive patient representations, yet lack interpretable language-based reasoning.
大型语言模型（LLM）在临床决策支持方面展现出强大的自然语言推理能力，但在有效建模结构化纵向电子健康记录（EHR）方面仍面临挑战。相比之下，EHR 基础模型能够学习预测性的患者表征，却缺乏基于语言的可解释性推理能力。

To bridge this gap, we propose ChatHealthAI, a multimodal reasoning framework that aligns structured EHR representations from a pretrained EHR foundation model with the semantic space of a frozen LLM through a task-aware resampler. By integrating longitudinal patient representations with refined clinical event descriptions, ChatHealthAI enables clinically grounded natural-language reasoning while maintaining accurate patient prediction.
为了弥补这一差距，我们提出了 ChatHealthAI，这是一个多模态推理框架。它通过任务感知重采样器（task-aware resampler），将预训练 EHR 基础模型中的结构化 EHR 表征与冻结 LLM 的语义空间进行对齐。通过将纵向患者表征与精炼的临床事件描述相结合，ChatHealthAI 在保持准确患者预测的同时，实现了基于临床事实的自然语言推理。

We evaluated ChatHealthAI on three clinical predictive tasks from the EHRSHOT benchmark. Results show that ChatHealthAI improves reasoning quality and interpretability while preserving competitive predictive performance. These findings highlight the potential of integrating EHR foundation models with pretrained LLMs for interpretable clinical prediction.
我们在 EHRSHOT 基准测试的三个临床预测任务上对 ChatHealthAI 进行了评估。结果表明，ChatHealthAI 在保持竞争性预测性能的同时，提升了推理质量和可解释性。这些发现凸显了将 EHR 基础模型与预训练 LLM 相结合，以实现可解释临床预测的巨大潜力。