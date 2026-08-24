---
title: "PEFT of SLM for Telecommunications Customer Support: A Comparative Study of LoRA Configurations with Energy Consumption Analysis"
originalUrl: "https://arxiv.org/abs/2606.05176"
date: "2026-06-05T22:45:30.294Z"
---

# PEFT of SLM for Telecommunications Customer Support: A Comparative Study of LoRA Configurations with Energy Consumption Analysis
# 面向电信客户支持的小型语言模型（SLM）参数高效微调（PEFT）：LoRA配置与能耗分析的比较研究

**Abstract:** While large language models (LLMs) show strong performance in natural language understanding and generation, their evaluation and adaptation to domain-specific constraints in telecommunications customer support remain limited. In addition, data sovereignty, regulatory constraints, and the handling of sensitive customer and network information complicate the use of externally hosted foundation models in this domain.

**摘要：** 尽管大型语言模型（LLMs）在自然语言理解和生成方面表现出色，但它们在电信客户支持领域的特定约束下的评估与适配仍十分有限。此外，数据主权、监管限制以及对敏感客户和网络信息的处理，使得在该领域使用外部托管的基础模型变得复杂。

We present a systematic study of parameter-efficient fine-tuning (PEFT) using Low-Rank Adaptation (LoRA) applied to Qwen2.5-3B to build a domain-specific conversational assistant. We introduce a combinatorial synthetic data generation approach based on a glossary of 52 industry-specific terms, producing approximately 30,000 training examples across 1,560 distinct problem scenarios via a generative pipeline powered by Gemini 2.0 Flash.

我们针对 Qwen2.5-3B 模型进行了一项系统性研究，利用低秩自适应（LoRA）进行参数高效微调（PEFT），以构建特定领域的对话助手。我们引入了一种基于 52 个行业术语词汇表的组合式合成数据生成方法，通过由 Gemini 2.0 Flash 驱动的生成流水线，在 1,560 个不同的问题场景中产生了约 30,000 个训练样本。

We evaluate 16 LoRA configurations by varying hyperparameters and target modules. Our evaluation extends beyond standard metrics by incorporating energy consumption analysis and qualitative assessment using an LLM-as-a-judge framework with GPT-5.2 and Claude 4.5 Sonnet. Results show a clear divergence between quantitative and qualitative performance: models achieving the lowest validation loss do not necessarily obtain the best human-aligned rankings. The best validation loss (0.5024) ranks only 6th-7th in qualitative evaluation, while the worst loss (0.6807) ranks first according to both judges.

我们通过改变超参数和目标模块，评估了 16 种 LoRA 配置。我们的评估超越了标准指标，纳入了能耗分析，并使用 GPT-5.2 和 Claude 4.5 Sonnet 作为“LLM 裁判”框架进行了定性评估。结果显示，定量表现与定性表现之间存在明显差异：验证损失最低的模型并不一定能获得最佳的人类对齐排名。验证损失表现最好（0.5024）的模型在定性评估中仅排名第 6-7 位，而损失表现最差（0.6807）的模型在两位裁判的评估中均排名第一。

This work contributes (1) a combinatorial method for synthetic dataset construction, (2) insights into the impact of target module selection for LoRA injection, (3) evidence that validation loss alone is insufficient for selecting fine-tuning configurations in conversational AI, and (4) an energy-performance trade-off analysis for sustainable LLM deployment.

本研究的贡献包括：(1) 一种用于合成数据集构建的组合方法；(2) 关于 LoRA 注入目标模块选择影响的见解；(3) 证明了仅凭验证损失不足以选择对话式 AI 微调配置的证据；以及 (4) 一项针对可持续 LLM 部署的能效权衡分析。