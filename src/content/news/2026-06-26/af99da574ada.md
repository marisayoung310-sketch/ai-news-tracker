---
title: "Beyond Shapley: Efficient Computation of Asymmetric Shapley Values"
originalUrl: "https://arxiv.org/abs/2606.25103"
date: "2026-06-25T22:58:02.753Z"
---

# Beyond Shapley: Efficient Computation of Asymmetric Shapley Values
# 超越 Shapley：非对称 Shapley 值的有效计算

**Abstract:** We address the problem of explainability in machine learning models through feature attribution methods. In particular, we consider a variant of Shapley values known as Asymmetric Shapley Values (ASV), which enables the incorporation of causal knowledge into model-agnostic explanations through the use of a causal graph.

**摘要：** 我们通过特征归因方法探讨了机器学习模型的可解释性问题。具体而言，我们研究了 Shapley 值的一种变体，即非对称 Shapley 值（ASV）。该方法通过利用因果图，能够将因果知识纳入模型无关（model-agnostic）的解释中。

We show that in certain contexts in which the computation of SHAP is $\#P$-hard, the exact computation of ASV can be done in polynomial time. To extend this algorithmic result, we introduce a notion of equivalence classes over the topological orderings of the underlying causal graph, which is useful to reduce the time to compute ASV.

我们证明，在某些 SHAP 计算属于 $\#P$-hard 的场景下，ASV 的精确计算可以在多项式时间内完成。为了扩展这一算法成果，我们引入了底层因果图拓扑排序上的等价类概念，这有助于减少计算 ASV 所需的时间。

In particular, we present a polynomial-time algorithm (in the number of equivalence classes) to compute it whenever the causal graph is a rooted directed tree. Finally, we develop an algorithm for approximating ASV in arbitrary causal DAGs which relies on a procedure to sample topological orderings uniformly at random.

特别地，当因果图为有根有向树时，我们提出了一种多项式时间算法（复杂度取决于等价类的数量）来计算 ASV。最后，我们开发了一种用于在任意因果有向无环图（DAG）中近似计算 ASV 的算法，该算法依赖于一种均匀随机采样拓扑排序的过程。

To implement this sampling mechanism we leverage known algorithms as well as simpler alternatives. Our experimental results demonstrate the practical viability of the proposed approach in realistic causal structures.

为了实现这种采样机制，我们利用了已知算法以及更简单的替代方案。实验结果证明了该方法在现实因果结构中的实际可行性。