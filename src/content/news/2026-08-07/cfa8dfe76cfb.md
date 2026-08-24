---
title: "The LLM Proposes, the Executive Disposes: A Self-Verifying Agent Instrument that Dissociates Commitment Drift from Binding Drift in Long-Horizon Agents"
originalUrl: "https://arxiv.org/abs/2608.04066"
date: "2026-08-07T01:09:16.920Z"
---

# The LLM Proposes, the Executive Disposes: A Self-Verifying Agent Instrument that Dissociates Commitment Drift from Binding Drift in Long-Horizon Agents
# 大模型提议，执行器处置：一种在长程智能体中区分“承诺漂移”与“绑定漂移”的自验证智能体工具

**Abstract:** How do you verify a long-horizon agent when its own state and self-reports are exactly what you cannot trust? We present an agent instrument built so that verification is structural rather than post-hoc. A deterministic Executive owns all belief; a language model may only file typed proposals, and a claim is admitted only when a prediction pre-registered before acting is matched against observation by code.

**摘要：** 当长程智能体（long-horizon agent）自身的状态和自我报告完全不可信时，你该如何对其进行验证？我们提出了一种智能体工具，其构建方式使得验证过程是结构性的，而非事后的。一个确定性的“执行器”（Executive）掌握所有信念；语言模型仅能提交类型化的提议，且只有当行动前预注册的预测与代码观察结果相符时，该主张才会被采纳。

Two properties make the instrument a verifier of its own science, not just of the agent: every run invalidates itself when per-organ write-error, render-size, or salted-canary-echo floors are breached (four of the first eight architecture runs were invalidated, each localizing a real defect); and a render-invisible shadow reference compiles the plan the full system would have committed in every ablation cell, so drift metrics are defined even where the mechanism under test has been removed.

该工具有两个特性，使其不仅能验证智能体，还能验证其自身的科学性：每当出现器官级写入错误、渲染尺寸异常或加盐金丝雀回声（salted-canary-echo）阈值被突破时，运行会自动失效（最初八次架构运行中有四次失效，每次都定位到了真实的缺陷）；此外，一个渲染不可见的影子参考（shadow reference）会编译完整系统在每个消融单元中本应提交的计划，因此即使在移除了被测机制的情况下，漂移指标依然有定义。

Using this instrument we report a clean, single-variable result on a failure every long-horizon agent suffers: ablating the commitment mechanism flips goal-abandonment from 0.00 to 1.00 while binding error stays flat at 0.00 (three seeds per cell, up to 394 reference beats per run, every run gated valid). The binding channel, by contrast, does not reappear as per-beat drift when its repair is ablated -- because binding is code-owned, the failure class is structurally absorbed, its only residue appearing one layer upstream as a collapse in hypothesis formation.

利用该工具，我们针对所有长程智能体都会遭遇的一种故障报告了一个清晰的单变量结果：消融承诺机制会将目标放弃率从 0.00 翻转至 1.00，而绑定错误保持在 0.00 不变（每个单元三个种子，每次运行最多 394 个参考节拍，且每次运行均通过有效性门控）。相比之下，当绑定机制的修复被消融时，绑定通道并不会表现为逐节拍的漂移——由于绑定是由代码控制的，该故障类别在结构上被吸收了，其唯一的残留表现为上一层假设形成过程的崩溃。

We report these under full disclosure that task efficacy is null (zero level completions across 52 gated runs on ARC-AGI-3), pre-registered as a structural defeater. The contribution is a verification methodology for agent development and the drift decomposition it makes measurable.

我们在此完全披露任务有效性为零（在 ARC-AGI-3 上进行的 52 次门控运行中，关卡完成数为零），并将其预注册为结构性失败。本文的贡献在于提供了一种用于智能体开发的验证方法论，以及由此实现可测量的漂移分解。