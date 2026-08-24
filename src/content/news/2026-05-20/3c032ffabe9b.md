---
title: "When Actions Disappear: Adversarial Action Removal in Self-Play Reinforcement Learning"
originalUrl: "https://arxiv.org/abs/2605.16312"
date: "2026-05-19T22:55:02.088Z"
---

# When Actions Disappear: Adversarial Action Removal in Self-Play Reinforcement Learning
# 当动作消失时：自博弈强化学习中的对抗性动作移除

**Abstract:** We study adversarial action masking in self-play reinforcement learning: an attacker selectively removes legal actions from a victim's action set. Unlike observation or action perturbations, removal eliminates decision options before the agent acts.
**摘要：** 我们研究了自博弈强化学习中的对抗性动作掩码（adversarial action masking）：攻击者有选择地从受害者的动作集中移除合法动作。与观察扰动或动作扰动不同，移除操作会在智能体采取行动之前消除其决策选项。

Across poker games scaling from 6 to 5,531 information states and two non-poker domains, learned masking causes substantially more damage than random masking and learned perturbation baselines. The attack persists across Q-learning, PPO, NFSP, neural NFSP, and DQN victims; transfers across agents; is amplified by self-play; and shows no recovery under extended masked training.
在从 6 个信息状态扩展到 5,531 个信息状态的扑克游戏以及两个非扑克领域中，学习型掩码造成的破坏远大于随机掩码和学习型扰动基准。这种攻击在 Q-learning、PPO、NFSP、神经 NFSP 和 DQN 等受害者模型中持续存在；可在不同智能体间迁移；通过自博弈得到放大；并且在长时间的掩码训练下也未表现出恢复迹象。

Mechanistically, the adversary targets high-value decision points, captured by reach-weighted contingent action capacity (CAC$_w$) and a value-weighted refinement CAC$_v$. These results identify action availability as a distinct robustness surface in self-play RL.
从机制上讲，攻击者瞄准的是高价值决策点，这些点由可达性加权条件动作容量（CAC$_w$）和价值加权细化容量（CAC$_v$）来捕捉。这些结果表明，动作可用性是自博弈强化学习中一个独特的鲁棒性维度。