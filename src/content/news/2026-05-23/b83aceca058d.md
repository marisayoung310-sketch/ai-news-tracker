---
title: "RankJudge: A Multi-Turn LLM-as-a-Judge Synthetic Benchmark Generator"
originalUrl: "https://arxiv.org/abs/2605.21748"
date: "2026-05-22T22:27:46.725Z"
---

# RankJudge: A Multi-Turn LLM-as-a-Judge Synthetic Benchmark Generator
# RankJudge：一个用于多轮“大模型作为裁判”的合成基准生成器

**Abstract:** As interactive LLM-based applications are created and refined, model developers need to evaluate the quality of generated text along many possible axes. For simpler systems, human evaluation may be practical, but in complicated systems like conversational chatbots, the amount of generated text can overwhelm human annotation resources. Model developers have begun to rely heavily on auto-evaluation, where LLMs are also used to judge generation quality.

**摘要：** 随着基于大模型（LLM）的交互式应用不断被创建和优化，模型开发者需要在多个维度上评估生成文本的质量。对于简单的系统，人工评估或许可行；但在对话机器人等复杂系统中，生成文本的数量往往会超出人工标注资源的承受能力。因此，模型开发者已开始高度依赖自动评估，即利用大模型来评判生成内容的质量。

However, existing LLM-as-a-judge benchmarks largely focus on simple Q&A tasks that do not match the complexity of multi-turn conversations. We introduce RankJudge, a benchmark generator for evaluating LLM-as-a-judge on multi-turn conversations grounded in reference documents. RankJudge creates pairs of conversations where one conversation has a single flaw injected into one turn. This construction allows paired conversations to be labeled unambiguously as better or worse, and precisely isolates failure categories to individual turns, enabling a strict joint correctness criterion for judging.

然而，现有的“大模型作为裁判”（LLM-as-a-judge）基准测试大多集中在简单的问答任务上，无法匹配多轮对话的复杂性。我们推出了 RankJudge，这是一个用于评估多轮对话场景下“大模型作为裁判”能力的基准生成器，该基准基于参考文档进行构建。RankJudge 通过创建对话对来实现评估，其中一个对话在某一轮次中被注入了单一缺陷。这种结构使得对话对可以被明确地标注为“优”或“劣”，并能将失败类别精确隔离到单个轮次中，从而为评判提供了一套严格的联合正确性标准。

We implement RankJudge across the domains of machine learning, biomedicine, and finance, evaluate 21 frontier LLM judges, and rank those judges via the Bradley-Terry model. Our formulation also allows ranking each conversation pair with difficulty ratings, which we use to dynamically curate the evaluation slice to reduce label noise, as confirmed via human annotation. We find that judge rankings are stable under partial observability, coarser correctness criteria, and an alternative random-walk rating algorithm.

我们在机器学习、生物医学和金融领域实现了 RankJudge，评估了 21 个前沿大模型裁判，并通过 Bradley-Terry 模型对这些裁判进行了排名。我们的方案还允许根据难度等级对每个对话对进行排序，我们利用这一点动态筛选评估切片，以减少标签噪声，这一点已通过人工标注得到证实。研究发现，在部分可观测性、更粗略的正确性标准以及替代的随机游走评分算法下，裁判的排名结果依然保持稳定。