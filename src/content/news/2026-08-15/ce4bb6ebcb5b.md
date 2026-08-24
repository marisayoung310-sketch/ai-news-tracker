---
title: "Reliability-Aware Sexism Detection: Combining DPO with Annotator Agreement and Token-Level Confidence Scoring"
originalUrl: "https://arxiv.org/abs/2608.12330"
date: "2026-08-14T21:56:22.617Z"
---

# Reliability-Aware Sexism Detection: Combining DPO with Annotator Agreement and Token-Level Confidence Scoring
# 可靠性感知性别歧视检测：结合 DPO、标注者一致性与 Token 级置信度评分

**Abstract:** The detection of online sexism remains an open problem. Sexism detection is inherently subjective, yet most existing systems reduce multi-annotator labels to a single majority decision and treat all instances uniformly. This ignores two informative signals: annotator agreement and model uncertainty.

**摘要：** 在线性别歧视检测仍然是一个悬而未决的问题。性别歧视检测本质上具有主观性，然而大多数现有系统将多标注者的标签简化为单一的多数投票决策，并对所有实例一视同仁。这忽略了两个信息量巨大的信号：标注者一致性和模型不确定性。

We propose RA-DPO (Reliability-Aware Direct Preference Optimization), which integrates annotator agreement, model confidence, and a token-level uncertainty signal into a single reliability score. RA-DPO uses this score to select high-value preference pairs during training and to support inference-time abstention, which allows the model to trade coverage for accuracy.

我们提出了 RA-DPO（可靠性感知直接偏好优化），它将标注者一致性、模型置信度和 Token 级不确定性信号整合为一个单一的可靠性评分。RA-DPO 利用该评分在训练过程中筛选高价值的偏好对，并支持推理阶段的弃权机制，从而允许模型以覆盖率换取准确性。

We evaluate RA-DPO on 6,920 multilingual posts from EXIST 2023, fine-tune OpenAI gpt-4o base via DPO, and validate on two open-weight 3B models (Llama, Qwen). Results show that training on the top 30% most reliable pairs matches full-data DPO, which indicates that reliability-aware selection can reduce training cost without sacrificing performance.

我们在来自 EXIST 2023 的 6,920 条多语言帖子上评估了 RA-DPO，通过 DPO 对 OpenAI gpt-4o 基础模型进行了微调，并在两个开源权重 3B 模型（Llama 和 Qwen）上进行了验证。结果表明，仅使用最可靠的前 30% 偏好对进行训练，其效果与使用全量数据进行 DPO 训练相当，这表明可靠性感知筛选可以在不牺牲性能的情况下降低训练成本。

At inference, selective prediction reaches 96.2% accuracy at 50% coverage in the true-agreement setting and 88.7% in the deployable predicted-agreement setting, both exceeding the 85.3% no-agreement baseline. These results suggest that accounting for annotation uncertainty is beneficial for both efficient training and reliable deployment in subjective classification.

在推理阶段，选择性预测在真实一致性设置下，以 50% 的覆盖率达到了 96.2% 的准确率；在可部署的预测一致性设置下达到了 88.7% 的准确率，两者均超过了 85.3% 的无一致性基准。这些结果表明，在主观分类任务中，考虑标注不确定性对于高效训练和可靠部署均具有积极意义。