---
title: "Elmes*: Automated Construction of Fine-Grained Evaluation Rubrics for Large Language Models in Long-Tail Educational Scenarios"
originalUrl: "https://arxiv.org/abs/2606.06546"
date: "2026-06-08T23:10:18.095Z"
---

# Elmes*: Automated Construction of Fine-Grained Evaluation Rubrics for Large Language Models in Long-Tail Educational Scenarios

**Elmes*: 面向长尾教育场景的大语言模型细粒度评估准则自动构建框架**

---

Evaluating large language models (LLMs) for education requires measuring how models teach, not only what they know. Existing benchmarks emphasize domain-general correctness or depend on manually designed rubrics that scale poorly to long-tail pedagogical scenarios.

在教育领域评估大语言模型（LLM）时，不仅需要衡量模型“知道什么”，更需要衡量模型“如何教学”。现有的基准测试大多强调领域通用的正确性，或者依赖于人工设计的评估准则，这些准则在面对长尾教学场景时难以扩展。

We introduce Elmes*, an end-to-end framework for constructing, refining, and applying fine-grained scenario-specific rubrics. Elmes* combines a declarative multi-agent engine for teacher--student--judge interactions with SceneGen, a self-evolving module that co-optimizes evaluation criteria and test data from expert-defined pedagogical dimensions.

我们引入了 Elmes*，这是一个用于构建、优化和应用细粒度场景化评估准则的端到端框架。Elmes* 结合了一个用于教师-学生-评判者交互的声明式多智能体引擎，以及一个名为 SceneGen 的自进化模块；该模块能够基于专家定义的教学维度，对评估标准和测试数据进行协同优化。

Using Elmes*, we build Edu-330, covering 330 scenarios across 11 subjects, 3 grade bands, and 10 task types, with over 1,000 second-level indicators. Experiments on Edu-330 and four expert-authored gold-standard scenarios show that educational capability is multidimensional: top-tier LLMs differ mainly in creativity and values integration, knowledge-strong models may fail at Socratic scaffolding, and the education-specialized InnoSpark achieves the best human-evaluated average score.

利用 Elmes*，我们构建了 Edu-330 数据集，涵盖了 11 个学科、3 个年级段和 10 种任务类型的 330 个场景，包含超过 1,000 个二级指标。在 Edu-330 和四个由专家编写的黄金标准场景上的实验表明，教育能力是多维度的：顶级 LLM 之间的差异主要体现在创造力和价值观整合上；知识储备强的模型可能在苏格拉底式教学引导方面表现不佳；而专注于教育领域的 InnoSpark 模型则获得了最佳的人工评估平均分。

LLM judges preserve human-comparable rankings with much lower scoring variance, but exhibit judge-specific biases such as self-preference. Ablations show that expert-scored few-shot anchoring improves human--LLM alignment, while reasoning enforcement and greedy decoding are model-dependent. Elmes* thus provides scalable diagnostic infrastructure for pedagogically grounded LLM evaluation.

LLM 评判者在保持与人类评估相当的排名表现的同时，评分方差更低，但也表现出了一些特定的评判偏见，例如“自我偏好”。消融实验表明，专家评分的少样本锚定（few-shot anchoring）可以提高人类与 LLM 评估的一致性，而推理强制（reasoning enforcement）和贪婪解码（greedy decoding）的效果则取决于具体模型。因此，Elmes* 为基于教学法的 LLM 评估提供了一种可扩展的诊断基础设施。