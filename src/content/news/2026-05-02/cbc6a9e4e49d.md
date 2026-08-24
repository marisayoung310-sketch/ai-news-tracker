---
title: "Automatic Causal Fairness Analysis with LLM-Generated Reporting"
originalUrl: "https://arxiv.org/abs/2604.27011"
date: "2026-05-01T22:48:10.586Z"
---

# Automatic Causal Fairness Analysis with LLM-Generated Reporting
# 基于大语言模型生成报告的自动因果公平性分析

**Abstract:** AutoML, intended as the process of automating the application of machine learning to real-world problems, is a key step for AI popularisation. Most AutoML frameworks are not accounting for the potential lack of fairness in the training data and in the corresponding predictions.

**摘要：** 自动机器学习（AutoML）旨在实现机器学习在现实世界问题中应用的自动化，是人工智能普及的关键一步。然而，大多数 AutoML 框架并未考虑训练数据及其相应预测中潜在的公平性缺失问题。

We introduce \textsc{FairMind}, a software prototype aiming to automatise fairness analysis at the dataset level. We achieve that by resorting to the assumptions of the \emph{standard fairness model}, recently proposed by Plečko and Bareinboim. This allows for a sound fairness evaluation in terms of causal effects, based on \emph{counterfactual} queries involving the target, possibly confounders and mediators, and the different values of an input feature we regard as \emph{protected}.

我们推出了 \textsc{FairMind}，这是一个旨在实现数据集层面公平性分析自动化的软件原型。我们通过采用 Plečko 和 Bareinboim 最近提出的“标准公平性模型”（standard fairness model）假设来实现这一目标。这使得我们能够基于因果效应进行可靠的公平性评估，其依据是涉及目标变量、潜在混杂因素和中介变量，以及我们视为“受保护”的输入特征的不同取值的“反事实”查询。

After the necessary data preprocessing, the tool implements a closed-form computation of the effects. LLMs are consequently exploited to generate accurate reports on the fairness levels detected in the training dataset. We achieve that in a zero-shot setup and show by examples the expected advantages with respect to a direct analysis performed by the LLM. To favour applications, extensions to ordinal protected variable and continuous targets and novel decomposition results are also discussed.

在完成必要的数据预处理后，该工具会对这些效应进行闭式计算。随后，利用大语言模型（LLM）针对训练数据集中检测到的公平性水平生成准确的报告。我们在零样本（zero-shot）设置下实现了这一目标，并通过示例展示了相较于直接由 LLM 进行分析所具备的预期优势。为了促进实际应用，文中还讨论了针对序数受保护变量和连续目标变量的扩展，以及新的分解结果。