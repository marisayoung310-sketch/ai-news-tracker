---
title: "lmfaoooo at SemEval-2026 Task 1: Humor Is an Audience. Preference Modeling for Constrained Humor Generation"
originalUrl: "https://arxiv.org/abs/2606.00022"
date: "2026-06-02T23:18:25.598Z"
---

# lmfaoooo at SemEval-2026 Task 1: Humor Is an Audience. Preference Modeling for Constrained Humor Generation
# lmfaoooo at SemEval-2026 任务 1：幽默即受众——受限幽默生成的偏好建模

**Abstract:** Humor generation remains difficult not only because producing fluent, novel jokes is hard, but because "funny" is audience-dependent and supervision is noisy -- preferences vary with audience, context, and culture, and annotator agreement is often low. 

**摘要：** 幽默生成之所以困难，不仅是因为创作流畅且新颖的笑话本身很难，还因为“好笑”与否取决于受众，且监督信号往往带有噪声——偏好会随受众、语境和文化而变化，且标注者之间的一致性通常较低。

In this paper, we describe our system for the SemEval-2026 Task-1 (MWAHAHA), which focuses on humor generation under explicit constraints. The task evaluates submitted systems via human preference judgments in 1-on-1 arena-style comparisons. 

在本文中，我们介绍了针对 SemEval-2026 任务 1 (MWAHAHA) 开发的系统，该任务专注于在明确约束条件下的幽默生成。该任务通过“竞技场”风格的 1 对 1 对比，利用人类偏好判断来评估提交的系统。

We adopt a "generate-many -> select-best" strategy. First, we generate a diverse pool of candidates per instance using multi-step prompting, model ensembling, and diversity-oriented decoding. Second, we select outputs using a preference model that approximates a "reader" by learning from human comparisons rather than absolute funniness scores. 

我们采用了“多生成 -> 精筛选”的策略。首先，通过多步提示（multi-step prompting）、模型集成和面向多样性的解码，为每个实例生成一个多样化的候选池。其次，我们使用一个偏好模型来筛选输出，该模型通过学习人类的对比结果而非绝对的“好笑程度”评分，来模拟真实的“读者”。

To support this approach, we release 2.5K human pairwise judgments collected through the Humor Arena prototype. We further propose an interpretable pipeline that converts labeled comparisons into a preference model. Across three preference datasets, our models consistently outperform baselines and show stronger cross-domain transfer. 

为了支持这一方法，我们发布了通过“幽默竞技场”（Humor Arena）原型收集的 2500 条人类成对判断数据。此外，我们提出了一种可解释的流水线，将标注的对比结果转化为偏好模型。在三个偏好数据集上的测试表明，我们的模型始终优于基准模型，并展现出更强的跨领域迁移能力。

Finally, we apply the learned preference model to rank candidates for the MWAHAHA setting and release intermediate artifacts (candidate pools and rankings) to facilitate follow-up work. Our system ranked 1st in the English and Chinese subtasks of MWAHAHA and 2nd in the Spanish subtask.

最后，我们将训练好的偏好模型应用于 MWAHAHA 场景下的候选排序，并发布了中间产物（候选池和排名），以促进后续研究。我们的系统在 MWAHAHA 的英语和中文子任务中排名第一，在西班牙语子任务中排名第二。