---
title: "Unsupervised Keypoints for Real-Time Fall Detection: Comparative Analysis Under Real-world Conditions with Predictive Bandwidth Reduction"
originalUrl: "https://arxiv.org/abs/2607.15400"
date: "2026-07-20T22:25:32.297Z"
---

# Unsupervised Keypoints for Real-Time Fall Detection: Comparative Analysis Under Real-world Conditions with Predictive Bandwidth Reduction
# 用于实时跌倒检测的无监督关键点：基于预测带宽缩减的真实环境对比分析

**Abstract:** Falls among older adults are a major safety challenge, but continuous monitoring is difficult to sustain. Video captures fall-related posture and motion, yet deployment is limited by privacy, computation, and bandwidth. Supervised pose estimation is anatomically interpretable but vulnerable to occlusion and partial body visibility. 

**摘要：** 老年人跌倒是一个重大的安全挑战，但持续的监控难以维持。视频可以捕捉与跌倒相关的姿势和动作，但其部署受到隐私、计算资源和带宽的限制。监督式姿态估计虽然具有解剖学上的可解释性，但容易受到遮挡和身体部分可见性的影响。

We propose a privacy-preserving framework that replaces RGB transmission with compact motion representations based on unsupervised keypoints and predictive temporal modeling. Local processing performs segmentation and keypoint extraction; variational recurrent prediction and sequence classification then detect falls from observed and forecasted motion. 

我们提出了一种保护隐私的框架，该框架用基于无监督关键点和预测性时间建模的紧凑运动表示取代了 RGB 传输。本地处理执行分割和关键点提取；随后，变分循环预测和序列分类通过观察到的和预测的运动来检测跌倒。

We evaluate the framework on the UR Fall Detection and Human Fall datasets using random, subject-disjoint, and occlusion-based splits. Under random splits, neither representation consistently dominates, suggesting that standard protocols may hide meaningful differences. 

我们在 UR Fall Detection 和 Human Fall 数据集上，使用随机划分、受试者不重叠划分和基于遮挡的划分对该框架进行了评估。在随机划分下，没有哪种表示方法能始终占据优势，这表明标准协议可能掩盖了有意义的差异。

Under subject-disjoint evaluation, supervised keypoints show a statistically significant advantage, but performance varies by subject: they perform better when anatomical landmarks are visible, whereas unsupervised keypoints are more robust to occlusion and partial visibility, though they produce more false positives for complex activities. 

在受试者不重叠的评估中，监督式关键点显示出统计学上的显著优势，但性能因受试者而异：当解剖标志可见时，它们的表现更好；而无监督关键点对遮挡和部分可见性更具鲁棒性，尽管它们在处理复杂活动时会产生更多的误报。

Under occlusion-based evaluation, supervised keypoints miss nearly half of all falls, while unsupervised keypoints retain strong sensitivity and substantially outperform them. Their anatomical independence allows spatial anchors to adapt to visible body structure rather than fail on absent landmarks. 

在基于遮挡的评估中，监督式关键点漏掉了近一半的跌倒事件，而无监督关键点保持了很强的灵敏度，表现明显优于前者。它们的解剖学独立性使得空间锚点能够适应可见的身体结构，而不是在缺失标志点时失效。

The gap widens under bandwidth constraints, where supervised localization errors compound through the temporal model. These findings show that representation choice should reflect expected visual conditions and that unsupervised keypoints offer an advantage when body visibility is compromised.

在带宽受限的情况下，这种差距进一步扩大，因为监督式定位误差会通过时间模型累积。这些研究结果表明，表示方法的选择应反映预期的视觉条件，并且在身体可见性受损时，无监督关键点具有明显的优势。