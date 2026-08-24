---
title: "CreativityNeuro: Steering Language Model Weights to Improve Divergent Thinking and Reduce Mode Collapse"
originalUrl: "https://arxiv.org/abs/2607.01433"
date: "2026-07-03T22:32:38.073Z"
---

# CreativityNeuro: Steering Language Model Weights to Improve Divergent Thinking and Reduce Mode Collapse
# CreativityNeuro：通过引导语言模型权重提升发散性思维并减少模式坍缩

Divergent thinking is a crucial aspect of creativity, yet large language models (LLMs) tend to consistently generate similar responses to open-ended questions, in what has been termed the artificial hivemind effect.
发散性思维是创造力的一个关键方面，然而大型语言模型（LLMs）在面对开放式问题时，往往倾向于生成相似的回答，这种现象被称为“人工智能蜂群思维效应”（artificial hivemind effect）。

Here, we introduce CreativityNeuro, a data-free method for enhancing divergent thinking in LLMs via contrastive weight steering. We evaluate our method across multiple creativity assessments and report several main findings.
在此，我们引入了 CreativityNeuro，这是一种无需数据的方法，通过对比权重引导（contrastive weight steering）来增强 LLMs 的发散性思维。我们在多项创造力评估中对该方法进行了测试，并报告了几个主要发现。

On the Divergent Association Task (DAT), a vocabulary-space creativity test, CreativityNeuro improves performance by up to 14 human percentile points.
在词汇空间创造力测试——发散联想任务（DAT）中，CreativityNeuro 将性能提升了高达 14 个百分点（人类百分位）。

Next, in a large-scale human evaluation (N=720) on the Alternative Uses Test (AUT) and the Task Task, CreativityNeuro achieves significant improvements in originality, surprise, and creativity, transferring to longer-form and more open-ended tasks.
接下来，在针对“替代用途测试”（AUT）和“任务任务”（Task Task）进行的大规模人类评估（N=720）中，CreativityNeuro 在原创性、惊喜感和创造力方面取得了显著提升，并能迁移到更长篇幅和更开放的任务中。

Importantly, we find that across all three tasks, CreativityNeuro demonstrably reduces measures of mode collapse.
重要的是，我们发现这三项任务中，CreativityNeuro 均能显著降低模式坍缩（mode collapse）的指标。

Moreover, activation steering achieves comparable performance to CreativityNeuro on the DAT, but it does not transfer to the AUT and Task Task, demonstrating the effectiveness of weight-space steering in generalizing to unseen tasks.
此外，激活引导（activation steering）在 DAT 上能达到与 CreativityNeuro 相当的性能，但无法迁移到 AUT 和 Task Task 中，这证明了权重空间引导在泛化到未见任务方面的有效性。

In conclusion, CreativityNeuro improves divergent thinking and reduces mode collapse without requiring behavioral data, re-training, or gradient-based fine-tuning, providing a straightforward way to enhance LLM performance in creative domains.
总之，CreativityNeuro 在无需行为数据、重新训练或基于梯度的微调的情况下，提升了发散性思维并减少了模式坍缩，为增强 LLM 在创意领域的表现提供了一种直接有效的方法。