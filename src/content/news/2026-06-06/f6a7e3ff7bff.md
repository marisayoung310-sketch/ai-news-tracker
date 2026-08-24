---
title: "The Fundamental Choice in Reinforcement Learning: On‑Policy vs. Off‑Policy"
originalUrl: "https://towardsdatascience.com/the-fundamental-choice-in-reinforcement-learning-on-policy-vs-off-policy/"
date: "2026-06-05T22:49:57.274Z"
---

# The Fundamental Choice in Reinforcement Learning: On‑Policy vs. Off‑Policy
# 强化学习中的根本选择：同策略（On-Policy）与异策略（Off-Policy）

Reinforcement learning is often introduced through a long list of algorithms. SARSA, Q-learning, PPO, DQN, SAC etc. Each name seems to point to a different method, a different trick, or a different mathematical formulation. But many of these algorithms are built around a much simpler question: Should an agent learn only from the behavior it is currently using, or can it also learn from behavior generated in some other way? That is the central difference between on-policy and off-policy learning.

强化学习通常是通过一长串算法来介绍的，例如 SARSA、Q-learning、PPO、DQN、SAC 等。每一个名称似乎都指向一种不同的方法、一种不同的技巧或一种不同的数学公式。但许多算法其实都是围绕一个更简单的问题构建的：智能体（Agent）应该只从它当前正在使用的行为中学习，还是也可以从以其他方式生成的行为中学习？这就是同策略（On-policy）学习与异策略（Off-policy）学习之间的核心区别。

To make that distinction intuitive, we need one basic definition. In reinforcement learning, a policy is the rule or strategy an agent uses to decide what action to take in each situation. Once that idea is clear, the contrast becomes easier to see. An on-policy method learns from the same strategy the agent is currently following. An off-policy method separates the two. The agent may behave according to one strategy while learning about another.

为了直观地理解这种区别，我们需要一个基本定义。在强化学习中，“策略”（Policy）是智能体在每种情况下决定采取何种行动所遵循的规则或策略。一旦这个概念明确了，对比就变得容易理解了：同策略方法从智能体当前正在遵循的同一策略中学习；而异策略方法则将两者分开——智能体可能按照一种策略行事，同时却在学习另一种策略。

This is more than just terminology. It affects some of the most important properties of a learning algorithm: how it explores, how much data it needs, whether it can learn from old experience, and how stable training is likely to be. In settings where data is cheap, this may seem like a technical choice. In settings where data is costly, slow, or risky to collect, it becomes a practical necessity.

这不仅仅是术语问题，它影响着学习算法的一些最重要属性：它如何探索、需要多少数据、是否能从旧经验中学习，以及训练的稳定性如何。在数据获取成本低廉的环境中，这可能看起来只是一个技术选择；但在数据获取昂贵、缓慢或具有风险的环境中，这便成了实际操作中的必然要求。

Consider a robot learning to move through a busy warehouse. For safety reasons, its behavior during training may need to remain conservative. An on-policy method improves that conservative behavior directly. An off-policy method allows something more flexible e.g., the robot can continue acting cautiously while learning, from collected experience, about a different strategy that might eventually perform better.

以一个在繁忙仓库中学习移动的机器人为例。出于安全考虑，它在训练期间的行为可能需要保持保守。同策略方法会直接改进这种保守行为；而异策略方法则允许更灵活的操作，例如：机器人可以在保持谨慎行动的同时，利用收集到的经验去学习另一种最终可能表现更好的策略。

That separation between how an agent behaves and what it learns about is the key idea behind off-policy learning. This single distinction helps organize a large part of reinforcement learning. It explains the classical contrast between SARSA and Q-learning, and it continues to shape many modern deep RL methods. In this article, we will unpack that idea carefully, starting from the tabular setting where every update is transparent, and then use that foundation to build intuition for the broader RL landscape.

智能体“如何行动”与“学习什么”之间的这种分离，是异策略学习背后的核心思想。这一单一的区别有助于梳理强化学习的大部分内容。它解释了 SARSA 和 Q-learning 之间的经典对比，并持续影响着许多现代深度强化学习方法。在本文中，我们将仔细剖析这一概念，从每个更新都透明可见的表格设置（Tabular setting）开始，并以此为基础，为更广泛的强化学习领域建立直观理解。

### What You’ll Take Away:
### 你将学到：

*   **On-policy methods** learn from the same strategy the agent is currently using to interact with the environment. They are often more stable and easier to reason about, but they usually cannot make as much use of old data. SARSA is the standard tabular example of on-policy learning.
*   **同策略方法**从智能体当前与环境交互所使用的同一策略中学习。它们通常更稳定且更容易推理，但通常无法充分利用旧数据。SARSA 是同策略学习的典型表格示例。

*   **Off-policy methods** learn about a target strategy using data collected from a different behavior strategy. This makes them more data-efficient and allows them to learn from replay buffers, logged data, or another agent’s experience, but training can be less stable. Q-learning is the standard tabular example of off-policy learning.
*   **异策略方法**使用从不同行为策略中收集的数据来学习目标策略。这使得它们的数据效率更高，并允许它们从经验回放池（Replay buffers）、日志数据或另一个智能体的经验中学习，但训练过程可能不够稳定。Q-learning 是异策略学习的典型表格示例。

*   **Expected SARSA** sits between them by taking an expectation over next actions, it often reduces variance and can be used in either an on-policy or off-policy setting.
*   **期望 SARSA（Expected SARSA）**介于两者之间，通过对下一个动作取期望，它通常能降低方差，并且既可用于同策略也可用于异策略设置。

*   This distinction influences some of the most important properties of an RL system, including exploration, sample efficiency, stability, and safety during learning.
*   这种区别影响着强化学习系统的一些最重要属性，包括探索、样本效率、稳定性和学习过程中的安全性。

*   Tabular methods are not just historical stepping stones—they provide the clearest way to build intuition for the same ideas that reappear in modern deep RL.
*   表格方法不仅仅是历史的垫脚石——它们为理解现代深度强化学习中重现的相同思想提供了最清晰的直观路径。

To make this distinction precise, we need to step back and ask a more basic question: what is an RL agent actually trying to learn? Before comparing algorithms like SARSA and Q-learning, it helps to understand the object they are updating. In most tabular RL methods, the agent is not learning actions directly; it is learning estimates of how good different actions are in different situations. Once that idea is clear, the difference between on-policy and off-policy learning becomes much easier to see.
为了精确界定这种区别，我们需要退后一步，问一个更基本的问题：强化学习智能体到底在试图学习什么？在比较 SARSA 和 Q-learning 等算法之前，理解它们正在更新的对象很有帮助。在大多数表格强化学习方法中，智能体并不是直接学习动作，而是在学习对“不同情况下不同动作有多好”的估计。一旦这个概念明确了，同策略和异策略学习之间的区别就变得容易理解多了。

### 1. What’s the Agent Trying to Learn?
### 1. 智能体在试图学习什么？

Imagine an agent wandering around a world. At each step, it’s in some state s, picks an action a, gets a reward r, and lands in a new state s’. Its goal: maximize the total reward it collects over time. But to do that, the agent needs a way to evaluate its choices. It has to answer questions like: Is taking action (a) in state (s) a good idea? Will that choice lead to better rewards later on? How much does the answer depend on what the agent does next?
想象一个在世界中游荡的智能体。在每一步，它处于某种状态 s，选择一个动作 a，获得奖励 r，并进入一个新的状态 s’。它的目标是：最大化随时间推移收集到的总奖励。但为了做到这一点，智能体需要一种评估其选择的方法。它必须回答诸如以下的问题：在状态 s 下采取动作 a 是个好主意吗？这个选择会导致以后获得更好的奖励吗？答案在多大程度上取决于智能体接下来做什么？

A central concept in reinforcement learning is the action-value function, usually written as (Q(s, a)). In plain language, this function measures how good it is to take action (a) in state (s), taking into account not just the immediate reward, but also the future rewards that may follow.
强化学习中的一个核心概念是“动作价值函数”（Action-value function），通常写作 Q(s, a)。用通俗的话说，该函数衡量的是在状态 s 下采取动作 a 有多好，它不仅考虑了即时奖励，还考虑了随后可能产生的未来奖励。