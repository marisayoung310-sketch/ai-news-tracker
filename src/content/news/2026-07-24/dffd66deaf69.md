---
title: "On the Computational Complexity of Structural Generalization"
originalUrl: "https://arxiv.org/abs/2607.19573"
date: "2026-07-23T22:32:07.126Z"
---

# On the Computational Complexity of Structural Generalization
# 关于结构化泛化的计算复杂度

**Abstract:** Structural generalization has been measured repeatedly by several benchmarks, yet it has never been formally defined. We give a definition that translates the two premises (compositional structure and unbounded generalization) into mathematical language. The definition itself is neutral: a compiler that hard-codes the rules satisfies it just as well. But structural generalization becomes a scientific question only insofar as the capacity can autonomously emerge from finite data.

**摘要：** 结构化泛化（Structural generalization）已在多个基准测试中被反复衡量，但至今尚未有正式定义。我们提供了一个定义，将两个前提（组合结构和无界泛化）转化为数学语言。该定义本身是中立的：一个硬编码了规则的编译器同样满足该定义。然而，结构化泛化只有在这一能力能够从有限数据中自主涌现时，才成为一个科学问题。

This question pits the computational lower bound $\mathrm{NC}^1$ against the learnable ceiling $\mathrm{TC}^0$ of pure Transformers. Under a Montagovian instantiation, each compositional rule splits into two projections: a syntactic face ($F_\gamma$) and a semantic face ($G_\gamma$). Tree evaluation on the $G_\gamma$ side is an instantiation of BFVP, which is $\mathrm{NC}^1$-complete (Buss, 1987). A pure Transformer must learn both faces at once, but Kraus et al. (2026) prove that its learnable class $\subseteq \mathrm{TC}^0$. Under the standard assumption $\mathrm{TC}^0 \neq \mathrm{NC}^1$, a pure Transformer cannot learn structural generalization.

这一问题将计算下界 $\mathrm{NC}^1$ 与纯 Transformer 的可学习上限 $\mathrm{TC}^0$ 对立起来。在蒙塔古语义学（Montagovian）的实例化下，每个组合规则被拆分为两个投影：句法面（$F_\gamma$）和语义面（$G_\gamma$）。$G_\gamma$ 侧的树评估是 BFVP 的一个实例化，而 BFVP 是 $\mathrm{NC}^1$-完全的（Buss, 1987）。纯 Transformer 必须同时学习这两个面，但 Kraus 等人（2026）证明了其可学习类 $\subseteq \mathrm{TC}^0$。在 $\mathrm{TC}^0 \neq \mathrm{NC}^1$ 的标准假设下，纯 Transformer 无法学习结构化泛化。

Neuro-symbolic systems achieve the best benchmark scores precisely because they inject $G_\gamma$, sidestepping the genuinely hard half. Benchmark scores cannot distinguish "learned" from "given." This is what this paper sets out to make clear.

神经符号系统之所以能取得最好的基准测试分数，正是因为它们注入了 $G_\gamma$，从而避开了真正困难的那一半。基准测试分数无法区分“学习所得”与“预设给定”。这正是本文旨在阐明的问题。