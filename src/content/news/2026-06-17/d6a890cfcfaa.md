---
title: "QPILOTS: Efficient Test-Time Q-Steering for Flow Policies"
originalUrl: "https://arxiv.org/abs/2606.14801"
date: "2026-06-16T23:08:56.049Z"
---

### QPILOTS: Efficient Test-Time Q-Steering for Flow Policies
### QPILOTS：面向流策略的高效测试时 Q-引导方法

**Abstract:** Flow-matching and diffusion policies are expressive action generators, but optimizing them with temporal-difference reinforcement learning (RL) remains difficult. Effective policy extraction requires exploiting the critic's action gradient, yet directly backpropagating this signal through a multi-step denoising process can be numerically unstable.

**摘要：** 流匹配（Flow-matching）和扩散策略（Diffusion policies）是极具表现力的动作生成器，但利用时序差分强化学习（RL）对其进行优化仍然十分困难。有效的策略提取需要利用评论家（Critic）的动作梯度，然而，通过多步去噪过程直接反向传播该信号可能会导致数值不稳定。

Existing methods work around this either by discarding gradient information, distilling the policy into a simpler one-step actor, or repeatedly fine-tuning the denoising policy as the critic improves. We propose QPILOTS, a method that leaves the original policy unmodified and steers the denoising process at inference time.

现有方法通常通过以下方式解决这一问题：丢弃梯度信息、将策略蒸馏为更简单的单步执行器，或者随着评论家的改进反复微调去噪策略。我们提出了 QPILOTS，这是一种在保持原始策略不变的情况下，在推理阶段引导去噪过程的方法。

At each denoising step, instead of evaluating the critic on the noisy intermediate action where critic predictions are unreliable, we first project that intermediate state to an estimate of the final clean action and compute the critic gradient there. We introduce two variants: QPILOTS-U uses a fast single-point approximation, while QPILOTS-M draws differentiable posterior samples via a learned auxiliary network.

在每个去噪步骤中，我们不再对不可靠的噪声中间动作进行评论家评估，而是首先将该中间状态投影为最终清晰动作的估计值，并在该处计算评论家梯度。我们引入了两个变体：QPILOTS-U 使用快速单点近似，而 QPILOTS-M 则通过学习到的辅助网络提取可微后验样本。

On a standard offline-to-online RL benchmark, QPILOTS achieves the best aggregate performance, reaching an average success rate of 90% across 50 tasks. We also apply QPILOTS to steer a large, frozen, pretrained Vision-Language Action (VLA) foundation model, outperforming or matching prior inference-time approaches across six manipulation tasks in simulation.

在标准的离线到在线强化学习基准测试中，QPILOTS 实现了最佳的综合性能，在 50 项任务中达到了 90% 的平均成功率。我们还将 QPILOTS 应用于引导一个大型、冻结的预训练视觉-语言动作（VLA）基础模型，在六项模拟操作任务中，其表现优于或持平于现有的推理时方法。