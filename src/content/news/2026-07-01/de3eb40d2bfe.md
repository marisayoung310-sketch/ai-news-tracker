---
title: "On the Necessity of a Liquid Substrate for Mesh Intelligence"
originalUrl: "https://arxiv.org/abs/2606.28413"
date: "2026-06-30T22:52:11.310Z"
---

# On the Necessity of a Liquid Substrate for Mesh Intelligence
# 关于网格智能中“液体基质”必要性的研究

**Abstract:** A mesh of sovereign agents has no center: no shared clock, no shared model, and no coordinator to gather data or retrain. Its competence rests on each agent folding the projections its peers emit into a single internal state, online, from observations that arrive at irregular, unscheduled times, on a substrate whose weights it cannot retrain. Any one of these constraints is tractable on its own; folding optimally under all three at once is not.

**摘要：** 一个由自主智能体组成的网格没有中心：没有共享时钟、没有共享模型，也没有用于收集数据或重新训练的协调器。其能力取决于每个智能体能否在无法重新训练权重的情况下，根据在不规则、非预定时间到达的观测数据，在线地将其同伴发出的投影整合为一个单一的内部状态。上述任何一个约束条件单独来看都是可处理的，但要同时满足这三个约束条件并实现最优整合则不然。

We ask what such a substrate must be, and prove two necessary conditions from one model of a self-evolving latent observed at irregular, exogenous times. Because the latent changes, its optimal estimator is time-varying: an adaptive timescale is necessary, and every fixed-gain filter is strictly suboptimal. And because arrivals are clock-free, the optimal estimate depends on the elapsed gap between them, which no gap-blind network recovers at any width or depth. This second condition is capacity-independent: scale cannot substitute for the missing dependence.

我们探讨了这种基质必须具备的条件，并基于一个在不规则外源时间下观测到的自演化潜变量模型，证明了两个必要条件。由于潜变量在不断变化，其最优估计器必须是随时间变化的：自适应时间尺度是必要的，而任何固定增益滤波器在严格意义上都是次优的。此外，由于数据到达时间没有时钟同步，最优估计取决于数据到达之间的时间间隔，而任何对间隔不敏感的网络无论宽度或深度如何都无法恢复这一信息。这第二个条件与模型容量无关：单纯增加规模无法弥补这种缺失的依赖性。

The two conditions intersect in the continuous-time liquid class. An LSTM satisfies the first, a fixed continuous-time filter the second, and a multi-timescale liquid network both. Synthetic experiments confirm each: the network attains the timescale, and the separation is computed exactly. The characterization is necessary, not sufficient, and binds fixed-weight substrates: a network free to retrain reaches the class by other means. Proved per agent, the necessity binds every agent of a mesh, a structural condition on mesh intelligence.

这两个条件在连续时间“液体（liquid）”类别中交汇。LSTM 满足第一个条件，固定连续时间滤波器满足第二个条件，而多时间尺度液体网络则同时满足两者。合成实验证实了这一点：网络能够获得相应的时间尺度，且分离过程被精确计算。该表征是必要而非充分条件，且约束了固定权重的基质：一个可以自由重新训练的网络可以通过其他方式达到这一类别。该结论针对单个智能体证明，因此约束了网格中的每一个智能体，构成了网格智能的一种结构性条件。