---
title: "Multi-AUV Ad-hoc network-based Target Tracking: A Value Gradient Guidance Multi-Agent Diffusion Reinforcement Learning Approach"
originalUrl: "https://arxiv.org/abs/2608.12436"
date: "2026-08-14T22:04:16.239Z"
---

# Multi-AUV Ad-hoc network-based Target Tracking: A Value Gradient Guidance Multi-Agent Diffusion Reinforcement Learning Approach

**基于多自主水下航行器（AUV）自组网的目标跟踪：一种价值梯度引导的多智能体扩散强化学习方法**

---

**Abstract:** Multi-AUV ad-hoc network-based target tracking requires networked autonomous underwater vehicles (AUVs) to cooperatively track maneuvering targets under constrained acoustic communication, dynamic topology, and uncertain ocean disturbances. 

**摘要：** 基于多自主水下航行器（AUV）自组网的目标跟踪，要求联网的AUV在受限的水声通信、动态拓扑结构以及不确定的海洋扰动环境下，协同跟踪机动目标。

Although multi-agent reinforcement learning (MARL) enables decentralized coordination through centralized training, existing methods suffer from high-dimensional joint state-action modeling, noise-sensitive policy generation, leading to unstable training and degraded tracking. 

尽管多智能体强化学习（MARL）可以通过集中式训练实现去中心化的协同，但现有方法在处理高维联合状态-动作建模以及对噪声敏感的策略生成方面存在不足，导致训练不稳定且跟踪性能下降。

To address these issues, we propose VGG-MADiffRL, a value-gradient-guided multi-agent diffusion RL algorithm, and MDCA, a diffusion-based hierarchical control architecture. Leveraging underwater mission characteristics, we model sonar detection mechanisms and ocean current disturbances, formulating cooperative tracking for multi-AUV ad-hoc networks as an MDP. 

为了解决这些问题，我们提出了 VGG-MADiffRL（一种价值梯度引导的多智能体扩散强化学习算法）以及 MDCA（一种基于扩散的分层控制架构）。利用水下任务的特性，我们对声纳探测机制和洋流扰动进行了建模，并将多AUV自组网的协同跟踪问题表述为马尔可夫决策过程（MDP）。

The proposed MDCA constitutes a three-tier closed-loop control framework: a global intelligent control layer, a local online training layer, and a physical action execution layer. This structure enables synergistic optimization across task allocation, local decision processes, and execution feedback. 

所提出的 MDCA 构建了一个三层闭环控制框架：全局智能控制层、局部在线训练层和物理动作执行层。这种结构实现了任务分配、局部决策过程和执行反馈之间的协同优化。

Within MDCA, the local online training layer is the policy learning framework; VGG-MADiffRL builds on diffusion policies and incorporates value gradients to guide action generation in the reverse denoising process, steering the generated actions towards higher expected returns. 

在 MDCA 中，局部在线训练层是策略学习框架；VGG-MADiffRL 基于扩散策略，并在反向去噪过程中引入价值梯度来引导动作生成，从而使生成的动作趋向于更高的预期回报。

It employs twin value networks with joint optimization and soft target updates to mitigate overestimation and training oscillations, promoting more stable convergence. 

该算法采用具有联合优化和软目标更新的双价值网络，以减轻过高估计和训练震荡，从而促进更稳定的收敛。

Experimental results show that VGG-MADiffRL consistently achieves faster convergence, higher tracking accuracy, and smoother training dynamics in cooperative tracking scenarios, validating its effectiveness and practical engineering value in dynamic underwater settings.

实验结果表明，VGG-MADiffRL 在协同跟踪场景中始终能够实现更快的收敛速度、更高的跟踪精度以及更平滑的训练动态，验证了其在动态水下环境中的有效性和实际工程价值。