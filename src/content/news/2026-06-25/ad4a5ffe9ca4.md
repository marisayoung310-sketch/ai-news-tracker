---
title: "Breaking the Filter Bubble: A Semantic Pareto-DQN Framework for Multi-Objective Recommendation"
originalUrl: "https://arxiv.org/abs/2606.24042"
date: "2026-06-24T22:48:21.393Z"
---

# Breaking the Filter Bubble: A Semantic Pareto-DQN Framework for Multi-Objective Recommendation
# 打破信息茧房：用于多目标推荐的语义 Pareto-DQN 框架

**Abstract:** Recommender systems often induce filter bubbles and semantic homogenization by monolithically optimizing for immediate user engagement. Standard single-objective models, including traditional Deep Q-Networks, are ill-equipped to navigate the trade-offs between platform retention and critical societal values like information diversity and provider fairness.

**摘要：** 推荐系统往往通过单一地优化即时用户参与度，从而导致信息茧房（filter bubbles）和语义同质化。标准的单目标模型（包括传统的深度 Q 网络）难以在平台留存率与信息多样性、提供者公平性等关键社会价值之间取得平衡。

To address these limitations, we introduce a multi-objective reinforcement learning framework that formalizes recommendation as a semantic multi-objective Markov decision process. By integrating high-fidelity semantic embeddings with a Pareto-DQN agent, our architecture treats engagement, diversity, and fairness as distinct, non-aggregable reward signals, avoiding the pitfalls of static reward scalarization.

为了解决这些局限性，我们引入了一种多目标强化学习框架，将推荐过程形式化为语义多目标马尔可夫决策过程。通过将高保真语义嵌入与 Pareto-DQN 智能体相结合，我们的架构将参与度、多样性和公平性视为独立且不可聚合的奖励信号，从而避免了静态奖励标量化带来的缺陷。

Empirical evaluations on the MovieLens small dataset shows that our hypervolume based action selection disrupts the feedback loops responsible for semantic collapse. By sustaining high state-trajectory variance, the Pareto-DQN effectively maps the Pareto frontier, achieving gains in auxiliary societal objectives with only marginal impacts on engagement. This work provides a path toward intrinsically aligned, responsible recommender systems.

在 MovieLens 小型数据集上的实证评估表明，我们基于超体积（hypervolume）的动作选择机制打破了导致语义崩溃的反馈循环。通过维持高状态轨迹方差，Pareto-DQN 有效地映射了 Pareto 前沿，在仅对参与度产生微小影响的情况下，实现了辅助社会目标的提升。这项工作为构建内在对齐、负责任的推荐系统提供了一条路径。

***

**Paper Details:**
*   **Authors:** Cláudio Lúcio Do Val Lopes, Lucca Machado da Silva, André de Oliveira Brandão
*   **Subject:** Artificial Intelligence (cs.AI)
*   **Date:** 23 Jun 2026
*   **arXiv ID:** 2606.24042

**论文详情：**
*   **作者：** Cláudio Lúcio Do Val Lopes, Lucca Machado da Silva, André de Oliveira Brandão
*   **学科：** 人工智能 (cs.AI)
*   **日期：** 2026年6月23日
*   **arXiv ID：** 2606.24042