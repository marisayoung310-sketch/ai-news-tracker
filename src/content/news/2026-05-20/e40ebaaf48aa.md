---
title: "ANNEAL: Adapting LLM Agents via Governed Symbolic Patch Learning"
originalUrl: "https://arxiv.org/abs/2605.16309"
date: "2026-05-19T22:48:27.645Z"
---

# ANNEAL: Adapting LLM Agents via Governed Symbolic Patch Learning
# ANNEAL：通过受控符号补丁学习实现大模型智能体自适应

**Abstract:** LLM-based agents can recover from individual execution errors, yet they repeatedly fail on the same fault when the underlying process knowledge--operator schemas, preconditions, and constraints--remains unrepaired. Existing self-evolving approaches address this gap by updating prompts, memory, or model weights, but none directly repair the symbolic structures that encode how tasks are executed, and few provide the governance guarantees required for safe deployment.

**摘要：** 基于大模型（LLM）的智能体虽然能够从单次执行错误中恢复，但当底层的过程知识（如算子模式、前提条件和约束）未得到修复时，它们会在相同的故障上反复失败。现有的自进化方法通过更新提示词（Prompts）、记忆或模型权重来解决这一问题，但没有一种方法能直接修复编码任务执行方式的符号结构，且很少有方法能提供安全部署所需的治理保障。

We introduce ANNEAL, a neuro-symbolic agent that converts recurring failures into governed symbolic edits of a process knowledge graph without modifying foundation model weights. Its core mechanism, Failure-Driven Knowledge Acquisition (FDKA), localizes the responsible operator, synthesizes a typed patch through constrained LLM generation, and validates the proposal via multi-dimensional scoring, symbolic guardrails, and canary testing before commit. Every accepted edit carries full provenance and deterministic rollback capability.

我们引入了 ANNEAL，这是一个神经符号智能体，它能将反复出现的故障转化为过程知识图谱的受控符号编辑，且无需修改基础模型权重。其核心机制——故障驱动知识获取（FDKA）——能够定位负责的算子，通过受限的大模型生成合成类型化补丁，并在提交前通过多维评分、符号护栏和金丝雀测试来验证方案。每一次被采纳的编辑都具备完整的来源记录和确定性的回滚能力。

Across four domains and 27 multi-seed runs, ANNEAL is the only evaluated system that commits persistent structural repairs--strong baselines such as ReAct and Reflexion achieve high episodic recovery yet retain 72-100% holdout failure rates on recurring faults, whereas ANNEAL reduces these to 0% in the tested recurring-failure settings. Ablation confirms that removing FDKA eliminates all structural repairs and drops success rate by up to 26.7 percentage points. These results suggest that governed symbolic repair offers a complementary paradigm to weight-level and prompt-level adaptation for persistent fault elimination.

在四个领域和 27 次多种子运行测试中，ANNEAL 是唯一能够实现持久结构性修复的评估系统。相比之下，ReAct 和 Reflexion 等强基线模型虽然能实现较高的单次任务恢复率，但在处理重复故障时仍保留了 72%-100% 的留存失败率，而 ANNEAL 在测试的重复故障场景中将该比率降至 0%。消融实验证实，移除 FDKA 会导致所有结构性修复失效，并使成功率下降高达 26.7 个百分点。这些结果表明，受控符号修复为消除持久性故障提供了一种与权重级和提示词级自适应互补的新范式。