---
title: "ChartProbe: A Diagnostic Study on Visual Reasoning through Perception, Grounding, and Simple Reasoning"
originalUrl: "https://arxiv.org/abs/2608.13766"
date: "2026-08-17T21:56:23.694Z"
---

# ChartProbe: A Diagnostic Study on Visual Reasoning through Perception, Grounding, and Simple Reasoning
# ChartProbe：一项关于通过感知、定位和简单推理进行视觉推理的诊断研究

**Abstract:** Vision-language models (VLMs) remain unreliable on chart questions that require reasoning over visual quantities, and this weakness is usually attributed to a reasoning deficit and addressed with more reasoning supervision. We ask whether the difficulty lies in reasoning itself, or in the simpler skills that reasoning operates on: reading the plotted elements (\emph{perception}), locating them and binding them to their labels (\emph{grounding}), and performing single-step computations such as ranking, totals, and differences (\emph{simple reasoning}).

**摘要：** 视觉语言模型（VLM）在处理需要对视觉数量进行推理的图表问题时仍然不可靠，这种弱点通常被归因于推理能力的不足，并试图通过更多的推理监督来解决。我们探讨了问题的难点究竟在于推理本身，还是在于推理所依赖的更基础的技能：读取绘图元素（“感知”）、定位元素并将其与标签绑定（“定位”），以及执行诸如排序、求和和求差等单步计算（“简单推理”）。

We introduce \textbf{ChartProbe}, a diagnostic framework whose probes are generated directly from the code that renders each chart, so every gold answer is exact by construction, needs no human annotation, and attributes each failure to a single skill. ChartProbe enables an intervention prior work does not attempt: instead of synthesizing complex-reasoning data, we withhold complex questions and reasoning traces entirely, fine-tune on one simple skill at a time, and measure transfer to held-out complex-reasoning questions.

我们引入了 **ChartProbe**，这是一个诊断框架，其探测任务直接从渲染每个图表的代码中生成。因此，每一个标准答案在构建时都是精确的，无需人工标注，并将每一次失败归因于单一技能。ChartProbe 实现了一种先前研究未曾尝试的干预手段：我们不再合成复杂的推理数据，而是完全剔除复杂问题和推理轨迹，每次仅针对一项简单技能进行微调，并测量其向未见过的复杂推理问题的迁移效果。

Across three open-weight VLMs, supervising the simpler skills alone produces large gains on complex-reasoning questions the model never trained on: where these skills are weak and the model can be taught to read the image, training them recovers much of complex reasoning at no reasoning-data cost. The gains hold across three out-of-distribution settings: an unseen chart type (pie charts), a human-written benchmark disjoint from our images and templates (ChartQA), and a non-chart visual domain (CLEVR). Complex visual reasoning can therefore improve without complex-reasoning supervision.

在三个开源权重 VLM 上的实验表明，仅对简单技能进行监督，就能在模型从未训练过的复杂推理问题上产生显著提升：在这些技能较弱且模型可以通过学习来读取图像的情况下，训练这些技能可以在无需推理数据成本的情况下恢复大部分复杂推理能力。这些增益在三种分布外（OOD）设置中均成立：一种未见过的图表类型（饼图）、一个与我们的图像和模板不重叠的人工编写基准（ChartQA），以及一个非图表视觉领域（CLEVR）。因此，复杂的视觉推理能力可以在没有复杂推理监督的情况下得到提升。