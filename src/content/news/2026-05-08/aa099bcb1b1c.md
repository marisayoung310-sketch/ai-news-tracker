---
title: "Are Multimodal LLMs Ready for Clinical Dermatology? A Real-World Evaluation in Dermatology"
originalUrl: "https://arxiv.org/abs/2605.04098"
date: "2026-05-07T23:35:11.581Z"
---

# Are Multimodal LLMs Ready for Clinical Dermatology? A Real-World Evaluation in Dermatology
# 多模态大语言模型准备好应用于临床皮肤科了吗？一项皮肤科真实世界评估

Multimodal large language models (MLLMs) have demonstrated promise on publicly available dermatology benchmarks. However, benchmark performance may not generalize to real-world dermatologic decision-making. To quantify this benchmark-to-bedside gap, we evaluated four open-weight MLLMs (InternVL-Chat v1.5, LLaVA-Med v1.5, SkinGPT4 and MedGemma-4B-Instruct) and one commercial MLLM (GPT-4.1) across three publicly available dermatology datasets and a retrospective multi-site hospital-based dermatology consultation cohort comprising 5,811 cases and 46,405 clinical images.

多模态大语言模型（MLLMs）在公开的皮肤科基准测试中展现出了潜力。然而，基准测试的表现未必能推广到真实的皮肤科临床决策中。为了量化这种从“基准测试”到“临床应用”的差距，我们评估了四种开源权重 MLLM（InternVL-Chat v1.5、LLaVA-Med v1.5、SkinGPT4 和 MedGemma-4B-Instruct）以及一种商业 MLLM（GPT-4.1）。评估涵盖了三个公开的皮肤科数据集，以及一个包含 5,811 个病例和 46,405 张临床图像的回顾性多中心医院皮肤科会诊队列。

Models were evaluated on two clinically relevant tasks: differential diagnosis generation and severity-based triage. Diagnostic performance was modest on public datasets and declined substantially in the real-world cohort. On public benchmarks, top-3 diagnostic accuracy reached 26.55% for the best open-weight model and 42.25% for GPT-4.1. On real-world consultation cases using images alone, top-3 diagnostic accuracy fell to 1.50%-13.35% among open-weight models and 24.65% for GPT-4.1.

模型在两项临床相关任务上进行了评估：鉴别诊断生成和基于严重程度的分诊。在公开数据集上，诊断表现尚可，但在真实世界队列中显著下降。在公开基准测试中，表现最好的开源模型的前三名（top-3）诊断准确率达到 26.55%，GPT-4.1 为 42.25%。在仅使用图像的真实世界会诊病例中，开源模型的前三名诊断准确率降至 1.50%-13.35%，GPT-4.1 为 24.65%。

Incorporating clinical context improved performance across all models, increasing top-3 diagnostic accuracy up to 28.75% among open-weight models and 38.93% for GPT-4.1. However, model outputs were highly sensitive to incomplete or erroneous consultation context. For severity-based triage, models achieved moderate sensitivity (above 60%), suggesting potential utility for screening but insufficient reliability for clinical deployment. These findings demonstrate that benchmark performance substantially overestimates the real-world clinical capability of current dermatology MLLMs.

引入临床背景信息后，所有模型的表现均有所提升，开源模型的前三名诊断准确率最高提升至 28.75%，GPT-4.1 提升至 38.93%。然而，模型输出对不完整或错误的会诊背景信息高度敏感。在基于严重程度的分诊任务中，模型达到了中等水平的敏感性（超过 60%），这表明其在筛查方面具有潜在用途，但对于临床部署而言，其可靠性尚显不足。这些研究结果表明，目前的基准测试表现大大高估了当前皮肤科 MLLM 在真实临床环境中的能力。