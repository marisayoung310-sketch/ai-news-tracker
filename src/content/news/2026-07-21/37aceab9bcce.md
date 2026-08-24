---
title: "Do Coding Agents Need Executable World Models, Simplification, and Verification to Solve ARC-AGI-3?"
originalUrl: "https://arxiv.org/abs/2607.15439"
date: "2026-07-20T22:21:24.658Z"
---

# Do Coding Agents Need Executable World Models, Simplification, and Verification to Solve ARC-AGI-3?
# 编程智能体解决 ARC-AGI-3 是否需要可执行世界模型、简化和验证？

**Abstract:** Our previous ARC-AGI-3 agent bundled executable world modeling, scheduled simplification, and exact replay verification, leaving unclear which idea accounted for its performance. We address this attribution question with four nested Codex-based agents: a textual baseline; a flexible-interface executable world model without replay verification; the same executable model with scheduled simplification; and a fixed-interface verification treatment that retains simplification and requires exact reproduction of recorded observations.

**摘要：** 我们之前的 ARC-AGI-3 智能体集成了可执行世界建模、计划简化和精确重放验证，这使得我们不清楚究竟哪种理念对其性能贡献最大。我们通过四个嵌套的基于 Codex 的智能体来解决这一归因问题：一个文本基准；一个没有重放验证的灵活接口可执行世界模型；一个带有计划简化的相同可执行模型；以及一个保留了简化并要求精确复现记录观察结果的固定接口验证处理方案。

The main study evaluates all four agents with gpt-5.4 and gpt-5.5 at high and xhigh reasoning effort on the public ARC-AGI-3 games. Exploratory follow-ups evaluate the textual and verification variants with gpt-5.6-sol at xhigh and max. The most robust result is that every agent variant improves with a stronger model and with greater reasoning effort. Within each model-effort setting, differences among variants are smaller than anticipated, while the effects of individual components vary across settings.

主要研究在公开的 ARC-AGI-3 游戏上，使用 gpt-5.4 和 gpt-5.5 模型，在“高”和“超高”推理强度下对所有四个智能体进行了评估。探索性后续研究则使用 gpt-5.6-sol 模型，在“超高”和“最大”推理强度下评估了文本变体和验证变体。最稳健的结果是，每个智能体变体都会随着模型能力的增强和推理强度的增加而提升性能。在每种模型-推理强度的设置下，各变体之间的差异比预期的要小，而各个组件的效果在不同设置下各不相同。

Requiring a persistent executable deliverable is not universally beneficial: the textual variant outperforms the flexible-interface executable variant in both gpt-5.5 settings. Simplification improves performance in three of the four model-effort settings, with the weakest setting as the only exception. The complete verification treatment ranks first in all four settings, although it uses substantially more resources.

要求提供持久的可执行交付物并非在所有情况下都有益：在两种 gpt-5.5 设置中，文本变体的表现均优于灵活接口的可执行变体。简化在四种模型-推理强度设置中的三种里提升了性能，只有最弱的设置除外。完整的验证处理方案在所有四种设置中均排名第一，尽管它消耗了大量的资源。

In the gpt-5.6-sol follow-up, the verification variant fully solves every public game at both reasoning efforts, achieves about 99% RHAE, and uses fewer than half the total actions of the human baseline. Because the model postdates these games and held-out performance remains untested, this result should be interpreted as saturation of the public set only.

在 gpt-5.6-sol 的后续研究中，验证变体在两种推理强度下均完全解决了所有公开游戏，达到了约 99% 的 RHAE（相对人类平均得分），且使用的总动作数不到人类基准的一半。由于该模型发布时间晚于这些游戏，且尚未测试其在留出集（held-out）上的表现，因此该结果仅应被解读为对公开数据集的饱和。