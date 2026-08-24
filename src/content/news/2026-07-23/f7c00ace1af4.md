---
title: "SAAG: Structured Agent Assessment and Grounding"
originalUrl: "https://arxiv.org/abs/2607.18245"
date: "2026-07-22T22:33:21.048Z"
---

# SAAG: Structured Agent Assessment and Grounding

**Title: SAAG: Structured Agent Assessment and Grounding**
**标题：SAAG：结构化智能体评估与基础验证**

**Abstract:** Exact-match evaluation of agent-calling obscures qualitatively different failure modes: a model may select the right function yet hallucinate argument values, or satisfy a schema while choosing an agent for the wrong reason. Existing benchmarks collapse these distinctions into a single binary score, leaving practitioners unable to diagnose where agent calls fail.
**摘要：** 对智能体调用（agent-calling）进行精确匹配评估掩盖了本质上不同的失败模式：模型可能选择了正确的函数，却在参数值上产生幻觉；或者虽然满足了模式要求，但选择智能体的理由却是错误的。现有的基准测试将这些差异合并为一个单一的二元分数，导致从业者无法诊断智能体调用在何处失败。

We propose SAAG, a cascaded diagnostic framework that decomposes agent-calling evaluation into three sequential stages: registry conformance, structural completeness, and argument grounding, each producing interpretable stage-specific diagnostics. These diagnostics additionally enable iterative self-repair: on prediction failure, the stage-specific signal guides targeted correction without leaking ground-truth values.
我们提出了 SAAG，这是一个级联诊断框架，将智能体调用评估分解为三个连续阶段：注册表一致性（registry conformance）、结构完整性（structural completeness）和参数基础验证（argument grounding），每个阶段都会产生可解释的特定诊断结果。这些诊断结果还支持迭代式自我修复：当预测失败时，特定阶段的信号可以指导针对性的修正，而无需泄露真实值（ground-truth values）。

We evaluate this framework on a controlled benchmark derived from Glaive's function-calling dataset across registry sizes of 5, 10, and 15 agents using three local sub-4B-parameter models. Structured feedback consistently improves argument precision and reduces value hallucination relative to single-pass inference and uninformative binary feedback, while end-to-end F1 gains are modest and model-dependent.
我们在基于 Glaive 函数调用数据集构建的受控基准上评估了该框架，测试了 5、10 和 15 个智能体的注册表规模，并使用了三个参数量小于 4B 的本地模型。结果表明，与单次推理和无信息的二元反馈相比，结构化反馈持续提高了参数精度并减少了数值幻觉，尽管端到端的 F1 分数提升较为温和且取决于模型本身。

These results suggest that stage-decomposed diagnostic evaluation is a necessary lens for understanding and improving agent-calling reliability across model families and registry scales.
这些结果表明，分阶段的诊断评估是理解和提高不同模型系列及注册表规模下智能体调用可靠性的必要视角。

***

**Authors:** Ritvik Garimella, Vedant Khandelwal, Anvi Kohli, Amit Sheth
**作者：** Ritvik Garimella, Vedant Khandelwal, Anvi Kohli, Amit Sheth

**Subjects:** Artificial Intelligence (cs.AI)
**学科：** 人工智能 (cs.AI)

**Cite as:** arXiv:2607.18245 [cs.AI]
**引用格式：** arXiv:2607.18245 [cs.AI]