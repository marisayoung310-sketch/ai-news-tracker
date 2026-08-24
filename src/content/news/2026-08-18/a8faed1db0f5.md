---
title: "Don't Claim Benchmark-Oriented Optimization Improves General Coding Capability -- Diverse Evaluation Is Required"
originalUrl: "https://arxiv.org/abs/2608.13566"
date: "2026-08-17T21:55:42.123Z"
---

# Don't Claim Benchmark-Oriented Optimization Improves General Coding Capability -- Diverse Evaluation Is Required
# 不要声称面向基准测试的优化能提升通用编程能力——多样化评估势在必行

Post-training papers, model cards, and blog posts often treat scores on a small set of coding benchmarks (e.g., SWE-bench and LiveCodeBench) as evidence of broad coding capability, both for research artifacts and user-facing systems.
在针对研究成果和面向用户的系统时，后训练（post-training）论文、模型卡片和博客文章往往将少数几个编程基准测试（如 SWE-bench 和 LiveCodeBench）的得分视为其具备广泛编程能力的证据。

We argue that optimization for these benchmarks leads to measuring task-specific performance, creating a meaning gap between measured scores and claims of general coding ability.
我们认为，针对这些基准测试进行优化，实际上是在衡量特定任务的性能，这导致了测量得分与“通用编程能力”这一主张之间存在严重的语义鸿沟。

We examine this gap with a Django-based case study benchmark suite we create. Evaluating foundation models and checkpoints post-trained on SWE-bench trajectories, we find that benchmark rankings frequently fail to generalize.
我们通过创建一个基于 Django 的案例研究基准测试套件来审视这一鸿沟。在评估基础模型以及在 SWE-bench 轨迹上进行后训练的检查点（checkpoints）时，我们发现基准测试的排名往往无法推广到其他场景。

Post-trained checkpoints show little cross-task transfer, and SWE-bench optimization yields limited or no gains on our tasks or on LiveCodeBench. Similarly, fine-tuning on individual Django modalities fails to transfer.
后训练的检查点几乎没有表现出跨任务的迁移能力，且 SWE-bench 的优化在我们的任务或 LiveCodeBench 上几乎没有带来任何提升。同样，针对单个 Django 模态进行微调也无法实现有效迁移。

We conclude that a small number of benchmarks is insufficient for evaluating diverse models under benchmark optimization pressure. We encourage the community to use differentiated evaluation - holistic assessment for frontier models, multi-task suites for research, and human-in-the-loop studies for narrow task applications.
我们得出结论：在基准测试优化压力下，仅靠少量基准测试不足以评估多样化的模型。我们鼓励社区采用差异化的评估方式——即针对前沿模型进行整体评估，针对研究采用多任务套件，并针对特定任务应用引入“人在回路”（human-in-the-loop）的研究。

Finally, we argue for creating a capability taxonomy and sustained benchmark maintenance, rather than one-off benchmark releases. Without reliable evaluation standards, engineers and researchers using LLMs and agents have to rely on insufficient evidence to make research, development, and deployment decisions.
最后，我们主张建立能力分类体系并进行持续的基准测试维护，而不是发布一次性的基准测试。如果没有可靠的评估标准，使用大语言模型（LLM）和智能体的工程师与研究人员将不得不依赖不充分的证据来做出研究、开发和部署决策。