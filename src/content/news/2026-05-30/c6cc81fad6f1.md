---
title: "Aryabhata 2: Scaling Reinforcement Learning for Advanced STEM Reasoning"
originalUrl: "https://arxiv.org/abs/2605.28829"
date: "2026-05-29T23:05:42.540Z"
---

# Aryabhata 2: Scaling Reinforcement Learning for Advanced STEM Reasoning
# Aryabhata 2：扩展强化学习以实现高级 STEM 推理

Competitive STEM examinations such as JEE and NEET require multi-step symbolic reasoning, precise numerical computation, and deep conceptual understanding across physics, chemistry, and mathematics.
诸如 JEE 和 NEET 等竞争性 STEM 考试，要求考生在物理、化学和数学领域具备多步符号推理、精确数值计算以及深厚的概念理解能力。

Recent large language models perform strongly on common reasoning benchmarks, yet they remain difficult to deploy at scale, where millions of student doubts demand domain-specific, consistently structured problem solving.
尽管近期的大型语言模型在通用推理基准测试中表现强劲，但它们在大规模部署时仍面临挑战，因为数以百万计的学生疑问需要特定领域且结构一致的问题解决方案。

We introduce Aryabhata 2, a reasoning-focused language model for competitive STEM examinations, trained via reinforcement-learning post-training.
我们推出了 Aryabhata 2，这是一款专为竞争性 STEM 考试设计的推理型语言模型，通过强化学习后训练（post-training）进行训练。

Using PhysicsWallah's internal question banks, we construct a high-quality training curriculum and post-train GPT-OSS-20B through reinforcement learning with verifiable rewards.
我们利用 PhysicsWallah 的内部题库构建了高质量的训练课程，并通过带有可验证奖励的强化学习对 GPT-OSS-20B 模型进行了后训练。

Training combines prolonged reinforcement learning with broadened exploration via progressively larger rollout group sizes.
该训练过程结合了长期的强化学习与通过逐步扩大展开组（rollout group）规模实现的更广泛探索。

We evaluate Aryabhata 2 on competitive examination benchmarks, including JEE Main, JEE Advanced, and NEET, as well as out-of-distribution reasoning datasets such as AIME, HMMT, MMLU-Pro, MMLU-Redux 2.0, and GPQA.
我们在 JEE Main、JEE Advanced 和 NEET 等竞争性考试基准，以及 AIME、HMMT、MMLU-Pro、MMLU-Redux 2.0 和 GPQA 等分布外（out-of-distribution）推理数据集上对 Aryabhata 2 进行了评估。

Results show that Aryabhata 2 outperforms its base model GPT-OSS-20B on competitive STEM reasoning while requiring substantially fewer output tokens (up to 64% fewer).
结果表明，Aryabhata 2 在竞争性 STEM 推理任务中优于其基础模型 GPT-OSS-20B，同时所需的输出 token 数量显著减少（最高可减少 64%）。