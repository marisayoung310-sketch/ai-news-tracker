---
title: "GRPO, Dr. GRPO, and DAPO Are Three Operations on One Number: The Group-Standard-Deviation Identity"
originalUrl: "https://arxiv.org/abs/2607.00152"
date: "2026-07-02T22:39:51.352Z"
---

# GRPO, Dr. GRPO, and DAPO Are Three Operations on One Number: The Group-Standard-Deviation Identity
# GRPO、Dr. GRPO 和 DAPO 是针对同一数值的三种操作：组标准差恒等式

**Abstract:** Three of the most popular methods for training language models to reason look like three different tricks. They are not. All three adjust a single number: standard deviation, reflecting how much a prompt's sampled answers disagree.
**摘要：** 目前用于训练语言模型进行推理的三种最流行的方法，看起来像是三种不同的技巧。但事实并非如此。这三种方法实际上都在调整同一个数值：标准差，它反映了针对同一提示词（prompt）所采样出的答案之间存在多大的分歧。

When such a model is trained, it answers each problem many times, and an automatic checker marks every answer right or wrong. The standard deviation of those marks measures the disagreement: largest when the answers split evenly between right and wrong, and zero when they all agree.
当模型进行训练时，它会对每个问题回答多次，并由自动检查器对每个答案进行对错标记。这些标记的标准差衡量了分歧程度：当答案在对与错之间平分时，分歧最大；而当所有答案一致时，分歧为零。

Group Relative Policy Optimization (GRPO) divides by this number, GRPO Done Right (Dr. GRPO) drops the division, and Decoupled Clip and Dynamic Sampling Policy Optimization (DAPO) discards the groups where it is zero. Each is presented as its own fix, yet this paper proves they are three settings of one dial.
组相对策略优化（GRPO）除以这个数值，正确做法的 GRPO（Dr. GRPO）去掉了除法，而解耦裁剪与动态采样策略优化（DAPO）则丢弃了该数值为零的组。每种方法都被当作独立的解决方案提出，但本文证明了它们其实只是同一个调节旋钮的三种不同设置。

That dial is not cosmetic: for right-or-wrong rewards, the disagreement is exactly the size of the training update, the group-standard-deviation identity. A split group teaches the most, while a unanimous group teaches nothing and falls silent. The same result says which problems deserve the most weight and how many tries each one needs.
这个旋钮并非仅仅是装饰性的：对于对错奖励而言，分歧程度恰好等于训练更新的幅度，这就是“组标准差恒等式”。分歧较大的组能提供最多的学习信息，而意见一致的组则无法提供任何信息，从而保持沉默。同样的结论也指出了哪些问题值得赋予最高权重，以及每个问题需要多少次尝试。

This paper confirms the intuition on a large real difficulty dataset (Big-Math) and in a controlled training run. What looks like a harmless normalization step is the dial that decides where learning happens and how strongly.
本文通过一个大型真实难度数据集（Big-Math）和受控训练运行证实了这一直觉。看起来无害的归一化步骤，实际上正是决定学习发生位置及其强度的关键旋钮。