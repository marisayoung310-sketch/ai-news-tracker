---
title: "Beyond Routing Weights: Faithful Response-Level Interpretation of Mixture-of-Experts Reward Models via Contribution Contrast"
originalUrl: "https://arxiv.org/abs/2608.06400"
date: "2026-08-10T22:06:40.527Z"
---

# Beyond Routing Weights: Faithful Response-Level Interpretation of Mixture-of-Experts Reward Models via Contribution Contrast
# 超越路由权重：通过贡献对比实现混合专家奖励模型的响应级忠实解释

**Abstract:** Reward models are central to learning from human preferences, yet identifying what drives their predictions remains challenging. Recent sparse Mixture-of-Experts (MoE) reward models seek to improve interpretability by routing prompts to specialized experts and characterizing experts through examples with high routing weights.
**摘要：** 奖励模型是人类偏好学习的核心，但识别其预测背后的驱动因素仍然具有挑战性。近期的稀疏混合专家（MoE）奖励模型试图通过将提示（prompts）路由至专业专家，并利用具有高路由权重的示例来表征专家，从而提高可解释性。

However, routing weights only reveal which prompts an expert $\textit{receives}$, not how it $\textit{judges}$ responses, providing only a partial account of expert behavior. We therefore propose $\textbf{Co}$ntribution-$\textbf{Co}$ntrast ($\textbf{CoCo}$) response-level interpretation, which faithfully characterizes experts' roles using chosen-rejected response pairs with the largest contribution contrasts, jointly capturing routing and preference behavior.
然而，路由权重仅揭示了专家“接收”了哪些提示，而无法揭示其如何“判断”响应，因此只能提供专家行为的部分描述。为此，我们提出了“贡献对比”（Contribution-Contrast, CoCo）响应级解释方法。该方法利用具有最大贡献对比的“优选-拒绝”响应对，忠实地刻画了专家的角色，并同时捕捉了路由行为和偏好行为。

Across automatic and human evaluations, CoCo yields more coherent, faithful, and specialized interpretations than router-based, score-based, and sparse autoencoder-based alternatives while maintaining competitive reward modeling accuracy. To the best of our knowledge, this is the first systematic study of interpretation methods for MoE reward models.
在自动评估和人工评估中，与基于路由、基于分数以及基于稀疏自动编码器的替代方案相比，CoCo 产生了更连贯、更忠实且更具专业性的解释，同时保持了具有竞争力的奖励建模准确性。据我们所知，这是首个针对 MoE 奖励模型解释方法的系统性研究。