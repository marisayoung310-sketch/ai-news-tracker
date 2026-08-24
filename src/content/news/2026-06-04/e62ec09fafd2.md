---
title: "Fixing FOLIO and MALLS: Verified Annotations and an LLM-assisted Framework to Focus Human Relabeling"
originalUrl: "https://arxiv.org/abs/2606.02837"
date: "2026-06-03T23:20:28.157Z"
---

# Fixing FOLIO and MALLS: Verified Annotations and an LLM-assisted Framework to Focus Human Relabeling
# 修复 FOLIO 和 MALLS：通过验证标注与大模型辅助框架优化人工重标注

Accurate translation from Natural Language to First-Order Logic (NL-to-FOL) underpins neurosymbolic AI systems and Natural Language Inference (NLI), making the quality of NL-to-FOL benchmarks essential -- yet these datasets have never been rigorously audited.
将自然语言准确转换为一阶逻辑（NL-to-FOL）是神经符号人工智能系统和自然语言推理（NLI）的基础，因此 NL-to-FOL 基准测试的质量至关重要——然而，这些数据集此前从未经过严格的审计。

Our first contribution is to present a systematic human inspection of the validation split of FOLIO and a subset of MALLS test instances, finding that approximately 39% and 36% of entries, respectively, contain incorrect FOL formalizations (i.e., ground truth labels), with additional rates of ambiguous NL sentences (16.4% and 48%) and incorrect NLI labels in FOLIO (8.4%).
我们的首要贡献是对 FOLIO 的验证集和 MALLS 测试集的一个子集进行了系统性的人工检查。结果发现，分别有约 39% 和 36% 的条目包含错误的一阶逻辑形式化（即基准真值标签），此外还存在自然语言句子歧义（分别为 16.4% 和 48%）以及 FOLIO 中不正确的 NLI 标签（8.4%）。

Our second contribution is to develop and release corrected ground truths for such datasets, showing that annotation errors distort model evaluation on a reference benchmark task: testing three state-of-the-art LLMs (Gemma 4 31B-it, Qwen3-30B-A3B, and GPT-4o-mini) with the corrected ground truths yields accuracy gains from +9 to +22 percentage points.
我们的第二个贡献是开发并发布了这些数据集的修正版基准真值。研究表明，标注错误会扭曲模型在参考基准任务上的评估结果：使用修正后的真值对三个最先进的大语言模型（Gemma 4 31B-it、Qwen3-30B-A3B 和 GPT-4o-mini）进行测试，准确率提升了 9 到 22 个百分点。

Motivated by these findings, we propose an LLM-based framework to support humans in manual reviewing NL-to-FOL datasets. By directing reviewers toward the most error-prone instances, we empirically show that it is possible to achieve 90% dataset accuracy after reviewing fewer than 24% of instances, compared to over 70% required by unguided review. We release all human-verified annotations and the code for our framework.
受此发现启发，我们提出了一个基于大模型的框架，以支持人工对 NL-to-FOL 数据集进行审核。通过引导审核人员优先处理最容易出错的实例，我们通过实证表明，在审核少于 24% 的实例后即可达到 90% 的数据集准确率，而无引导的审核则需要超过 70% 的工作量。我们已公开所有经人工验证的标注以及该框架的代码。