---
title: "From Demonstrations to Rewards: Test-Time Prompt Optimization for VLM Reward Models"
originalUrl: "https://arxiv.org/abs/2606.00083"
date: "2026-06-02T23:22:06.377Z"
---

# From Demonstrations to Rewards: Test-Time Prompt Optimization for VLM Reward Models
# 从演示到奖励：视觉语言模型（VLM）奖励模型的测试时提示优化

**Abstract:** Reinforcement learning relies on accurate reward functions, which are often hand-crafted or even unavailable in real-world applications, such as robotics. Recent work has explored the zero-shot reasoning capabilities of pre-trained Vision-Language Models (VLMs) as reward models. However, without careful prompt engineering, these approaches tend to produce suboptimal rewards, where false positive predictions can severely degrade downstream policy learning.

**摘要：** 强化学习依赖于精确的奖励函数，但在机器人等现实应用中，这些函数往往需要人工设计，甚至根本无法获得。近期的研究探索了预训练视觉语言模型（VLM）作为奖励模型的零样本推理能力。然而，如果没有精细的提示工程（prompt engineering），这些方法往往会产生次优的奖励，其中假阳性预测会严重损害下游策略的学习效果。

In robotics, limited datasets comprising expert demonstrations are often collected to bootstrap policy learning. This scenario provides an opportunity to optimize a reward model prior to policy training. We propose Demo2Reward, a test-time adaptation technique to optimize the language instruction of a reward model based on a few demonstrations (3-10 trajectories) to reduce false positives while preserving true positives.

在机器人领域，通常会收集包含专家演示的有限数据集来引导策略学习。这种情况为在策略训练前优化奖励模型提供了机会。我们提出了 Demo2Reward，这是一种测试时自适应技术，旨在基于少量演示（3-10 条轨迹）优化奖励模型的语言指令，从而在保留真阳性的同时减少假阳性。

Crucially, this requires no additional model training or computation resources during policy learning. We show that Demo2Reward consistently outperforms existing zero- and few-shot VLM reward models across a range of simulated robotic tasks and policy backbones. Finally, we demonstrate that Demo2Reward effectively transfers to a real-world robotic learning scenario, enabling policy learning without manually engineering a reward function.

至关重要的是，该方法在策略学习过程中不需要额外的模型训练或计算资源。我们证明，在各种模拟机器人任务和策略骨干网络中，Demo2Reward 的表现始终优于现有的零样本和少样本 VLM 奖励模型。最后，我们证明了 Demo2Reward 可以有效地迁移到现实世界的机器人学习场景中，从而在无需手动设计奖励函数的情况下实现策略学习。