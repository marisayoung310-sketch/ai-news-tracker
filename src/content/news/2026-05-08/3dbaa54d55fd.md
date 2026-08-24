---
title: "Computing Thiele Rules on Interval Elections and their Generalizations"
originalUrl: "https://arxiv.org/abs/2605.03067"
date: "2026-05-07T23:12:27.258Z"
---

# Computing Thiele Rules on Interval Elections and their Generalizations
# 区间选举中 Thiele 规则的计算及其推广

**Abstract:** Approval-based committee voting has received significant attention in the social choice community. Among the studied rules, Thiele rules, and especially Proportional Approval Voting (PAV), stand out for desirable properties such as proportional representation, Pareto optimality, and support monotonicity. Their main drawback is that computing a Thiele outcome is NP-hard in general.

**摘要：** 基于认可的委员会投票（Approval-based committee voting）在社会选择领域受到了广泛关注。在所研究的规则中，Thiele 规则，尤其是比例认可投票（PAV），因其具备比例代表性、帕累托最优性和支持单调性等理想属性而脱颖而出。它们的主要缺点在于，在一般情况下计算 Thiele 结果是 NP-hard 问题。

A glimpse of hope comes from the fact that Thiele rules are better behaved under structured preferences. On the candidate interval (CI) domain, they are computable in polynomial time via a linear program (LP) that has a totally unimodular constraint matrix. Surprisingly, this approach fails for the related voter interval (VI) domain, and the complexity of the problem has repeatedly been posed as an open question.

一线希望在于，Thiele 规则在结构化偏好下表现更好。在候选人区间（CI）域上，它们可以通过具有全幺模约束矩阵的线性规划（LP）在多项式时间内计算得出。令人惊讶的是，这种方法在相关的选民区间（VI）域上失效，且该问题的复杂性多次被提出作为一个悬而未决的问题。

Our main result resolves this question: although the relevant matrix is not totally unimodular, the ``standard'' LP still admits at least one optimal integral solution, and we provide a fast algorithm for finding it. Our technique naturally extends to the voter-candidate interval (VCI) domain, also known as the 1-dimensional voter-candidate range (1D-VCR) domain, and to the linearly consistent (LC) domain, both of which generalize the candidate and voter interval domains.

我们的主要结果解决了这个问题：尽管相关的矩阵不是全幺模的，“标准”线性规划仍然至少存在一个最优整数解，并且我们提供了一种寻找该解的快速算法。我们的技术自然地扩展到了选民-候选人区间（VCI）域（也称为一维选民-候选人范围（1D-VCR）域）以及线性一致（LC）域，这两个域都推广了候选人和选民区间域。

Although both the VCI and LC domains have been studied in social choice, their relationship was unknown. We show, through connections to graph theory, that LC strictly contains VCI. We also provide an alternative definition of LC that is closer in spirit to VCI and has a natural interpretation in approval elections; this equivalence may be of independent interest.

尽管 VCI 和 LC 域在社会选择中都已被研究，但它们之间的关系此前尚不明确。我们通过与图论的联系证明，LC 严格包含 VCI。我们还提供了一种 LC 的替代定义，其精神更接近 VCI，并在认可投票中具有自然的解释；这种等价性可能具有独立的学术价值。

Finally, we study an alternative tree-based generalization of VCI and show that Thiele rules become NP-hard to compute on this domain.

最后，我们研究了 VCI 的一种基于树的替代推广，并证明了 Thiele 规则在该域上的计算变得 NP-hard。