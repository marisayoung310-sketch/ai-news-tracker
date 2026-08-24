---
title: "From Weights to Words: Expressing and Editing Preference Model Inferences in Natural Language"
originalUrl: "https://arxiv.org/abs/2607.16232"
date: "2026-07-21T22:23:08.472Z"
---

# From Weights to Words: Expressing and Editing Preference Model Inferences in Natural Language
# 从权重到语言：用自然语言表达和编辑偏好模型推理

**Abstract:** The growing use of statistical learning algorithms to infer human preferences from high-dimensional choice data runs up against a fundamental challenge: choice alternatives typically differ in many ways simultaneously, so it is generally unclear which factors actually drove an observed decision and should be credited as preferences. 

**摘要：** 统计学习算法在从高维选择数据中推断人类偏好方面的应用日益广泛，但面临着一个根本性的挑战：选择项通常在多个方面同时存在差异，因此通常不清楚哪些因素真正驱动了观察到的决策，并应被视为偏好。

Compounding this problem, the opacity of these methods leaves human operators unable to inspect, contest, or correct models when they err. We introduce *weights to words*, a method that takes a dataset of choice problems as input and automatically discovers a collection of domain-relevant preference dimensions, each described in natural language and paired with a vector in the model's representational space. 

雪上加霜的是，这些方法的不透明性使得人类操作员在模型出错时无法检查、质疑或纠正模型。我们引入了“从权重到语言”（weights to words）方法，该方法以选择问题的数据集作为输入，自动发现一系列与领域相关的偏好维度，每个维度都用自然语言描述，并与模型表示空间中的向量配对。

These dimensions address both under-determination and opacity: they can be applied to concentrate attribution on a small set of meaningful factors, and they can externalize the model's inferences in natural language so that users can inspect and edit them in real time. 

这些维度同时解决了“欠定性”（under-determination）和“不透明性”问题：它们可以被应用于将归因集中在一组少数有意义的因素上，并能以自然语言将模型的推理外化，以便用户能够实时检查和编辑这些推理。

We first qualitatively illustrate the method's versatility on four diverse domains: moral dilemmas, movies, wines, and free-form LLM responses. We then report two pre-registered human-subjects experiments, on moral dilemmas ($N=450$) and movie selection ($N=449$), that demonstrate its benefits for learning preference models: (1) regularizing a preference model toward the learned basis increases prediction accuracy on held-out choices, and (2) incorporating participants' structured edits further improves accuracy. 

我们首先在四个不同的领域定性地展示了该方法的通用性：道德困境、电影、葡萄酒和自由形式的 LLM 回答。随后，我们报告了两项预注册的人类受试者实验，分别针对道德困境 ($N=450$) 和电影选择 ($N=449$)，证明了其在学习偏好模型方面的优势：(1) 将偏好模型正则化至学习到的基准上，提高了对留出选择的预测准确性；(2) 结合参与者的结构化编辑进一步提高了准确性。

In head-to-head comparisons, participants prefer the method's inferred preference profiles and endorse its predictions as more accurate.

在直接对比中，参与者更倾向于该方法推断出的偏好配置，并认可其预测更为准确。