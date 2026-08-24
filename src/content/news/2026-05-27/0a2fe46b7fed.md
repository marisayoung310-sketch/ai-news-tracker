---
title: "Towards Verifiable Transformers: Solver-Checkable Circuit Explanations"
originalUrl: "https://arxiv.org/abs/2605.24033"
date: "2026-05-27T00:31:42.537Z"
---

# Towards Verifiable Transformers: Solver-Checkable Circuit Explanations
# 迈向可验证的 Transformer：基于求解器可检查的电路解释

**Abstract:** Mechanistic interpretability often identifies circuits inside Transformer models, but explanations of those circuits are usually validated through examples, ablations, and manual reasoning. This leaves a gap between finding a plausible circuit and proving what the circuit does.

**摘要：** 机械可解释性研究通常能识别出 Transformer 模型内部的电路，但这些电路的解释通常仅通过示例、消融实验和人工推理来验证。这导致在发现一个看似合理的电路与证明该电路的实际功能之间存在差距。

We introduce Verifiable Transformers, a framework for converting task-localized Transformer circuits into bounded, solver-checkable claims. Given a behavior, a finite task domain, and a candidate-token projection, we extract a task circuit and verify properties such as projected functional equivalence, edge necessity, task-relevant invariance, and final-residual robustness.

我们引入了“可验证 Transformer”（Verifiable Transformers），这是一个将任务局部化的 Transformer 电路转换为有界、可由求解器检查的命题的框架。给定一种行为、一个有限的任务域以及候选标记投影，我们提取任务电路并验证诸如投影功能等价性、边必要性、任务相关不变性以及最终残差鲁棒性等属性。

Direct verification encodes the extracted circuit itself into an SMT solver. When a circuit contains operators that are not exactly or tractably encodable, surrogate-mediated verification fits an SMT-encodable surrogate, validates it against the extracted circuit over the bounded domain, and verifies symbolic explanations against the surrogate.

直接验证将提取出的电路本身编码到 SMT 求解器中。当电路包含无法精确或难以编码的算子时，代理中介验证（surrogate-mediated verification）会拟合一个可 SMT 编码的代理模型，在有界域内针对提取的电路对其进行验证，并针对该代理模型验证符号解释。

We instantiate direct verification with a GPT-style architecture using Signed L1 BandNorm, sparsemax attention, and LeakyReLU. On small symbolic sequence tasks, we train an SMT-representable Transformer, extract sparse circuits for quote closing and bracket type tracking, and exhaustively verify projected functional equivalence, content invariance, edge necessity, and final-residual robustness.

我们使用带有 Signed L1 BandNorm、sparsemax 注意力和 LeakyReLU 的 GPT 风格架构实例化了直接验证。在小型符号序列任务上，我们训练了一个可 SMT 表示的 Transformer，提取了用于引号闭合和括号类型跟踪的稀疏电路，并详尽验证了投影功能等价性、内容不变性、边必要性以及最终残差鲁棒性。

At GPT-2 scale, the same operator stack trains stably on OpenWebText, although naive direct SMT verification remains intractable. We also demonstrate surrogate-mediated verification on task-localized circuits with hard-to-encode attention, showing both verified symbolic explanations and solver-generated counterexamples.

在 GPT-2 规模下，相同的算子堆栈在 OpenWebText 上训练稳定，尽管朴素的直接 SMT 验证仍然难以实现。我们还演示了针对具有难以编码的注意力机制的任务局部化电路的代理中介验证，展示了已验证的符号解释以及由求解器生成的反例。

The goal is not full-model verification, but a concrete path for turning mechanistic circuit explanations into formal propositions that can be proven or refuted.

我们的目标并非实现全模型验证，而是为将机械电路解释转化为可证明或可反驳的形式化命题提供一条具体的路径。