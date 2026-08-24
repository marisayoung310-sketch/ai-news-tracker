---
title: "When Do Corrective Features Help? An Agent for Corrective Feature Discovery on Black-Box Forecasters"
originalUrl: "https://arxiv.org/abs/2608.05207"
date: "2026-08-07T22:08:16.780Z"
---

# When Do Corrective Features Help? An Agent for Corrective Feature Discovery on Black-Box Forecasters
# 纠正性特征何时有效？一种针对黑盒预测器的纠正性特征发现智能体

Frozen pretrained forecasters often fail in structured, recurring ways that are costly to repair through fine-tuning. We study corrective feature discovery: mining interpretable features of a frozen forecaster's residual to drive a lightweight post-hoc corrector.
冻结的预训练预测器往往会以结构化、重复的方式出现故障，而通过微调来修复这些故障的成本很高。我们研究了纠正性特征发现：挖掘冻结预测器残差中的可解释特征，以驱动轻量级的事后纠正器。

Prior automated feature engineering models the data-generating process; corrective features instead model the model-failure process. We present CRAFTER (Corrective Residual Agent with Feature-based Temporal Exploration and Reasoning), which keeps the backbone frozen and mines its residual with two complementary generators: a compositional search over the raw input channels, and a large language model (LLM) that proposes named feature combinations, binary flags, and short executable code.
先前的自动化特征工程旨在建模数据生成过程；而纠正性特征则建模模型失效过程。我们提出了 CRAFTER（基于特征的时间探索与推理的纠正性残差智能体），它保持主干模型冻结，并利用两个互补的生成器挖掘其残差：一是对原始输入通道进行组合搜索，二是利用大语言模型（LLM）提出命名特征组合、二进制标志和简短的可执行代码。

A single validation-grounded gate accepts or rejects every candidate regardless of its origin, and a validation-selected corrector applies the accepted features or leaves the forecast unchanged. This source-agnostic pipeline also allows prior feature-engineering systems to be evaluated under identical conditions, making CRAFTER an instrument for attributing forecast improvements to the feature source alone.
一个基于验证的单一门控机制会接受或拒绝每个候选特征，无论其来源如何；随后，一个经验证选择的纠正器会应用被接受的特征，或者保持预测不变。这种与来源无关的流水线还允许在相同条件下评估先前的特征工程系统，使 CRAFTER 成为一种将预测改进归因于特定特征来源的工具。

Across six public datasets and six frozen backbones, CRAFTER surpasses every dedicated feature-engineering system at every feature budget, roughly doubling the improvement achieved by the corrector alone and reducing the error of the weakest backbones by up to 27%. These gains are robust across different LLM backends and persist even when applied on top of fine-tuned backbones.
在六个公共数据集和六个冻结主干模型上，CRAFTER 在各种特征预算下均超越了所有专门的特征工程系统，将仅使用纠正器所实现的改进提升了约一倍，并将最弱主干模型的误差降低了高达 27%。这些增益在不同的 LLM 后端中表现稳健，即使在微调后的主干模型上应用时依然有效。