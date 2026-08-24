---
title: "MELD: Multi-Task Equilibrated Learning Detector for AI-Generated Text"
originalUrl: "https://arxiv.org/abs/2605.06903"
date: "2026-05-11T22:59:59.734Z"
---

# MELD: Multi-Task Equilibrated Learning Detector for AI-Generated Text
# MELD：用于 AI 生成文本的多任务均衡学习检测器

**Abstract:** Large language models are now embedded in everyday writing workflows, making reliable AI-generated text detection important for academic integrity, content moderation, and provenance tracking. In practice, however, a detector must do more than achieve high aggregate AUROC on clean, in-distribution human and AI text: it should remain robust to attacks and adversarial rewrites, transfer to unseen generators and domains, and operate at low false-positive rates (FPR).

**摘要：** 大型语言模型现已嵌入到日常写作工作流中，使得可靠的 AI 生成文本检测对于学术诚信、内容审核和来源追踪变得至关重要。然而在实践中，检测器不仅需要在干净的、分布内的人类和 AI 文本上实现高聚合 AUROC，还必须具备更多能力：它应在面对攻击和对抗性重写时保持稳健，能够迁移到未见过的生成器和领域，并能在低误报率（FPR）下运行。

Most existing detectors optimize a single AI/Human objective, giving the representation little incentive to learn generator, attack, or domain structure once the binary task saturates. We introduce MELD (Multi-Task Equilibrated Learning Detector), a deployable detector for AI-generated text that enriches binary detection with auxiliary supervision.

大多数现有的检测器仅优化单一的 AI/人类分类目标，一旦二分类任务达到饱和，模型表示层就缺乏学习生成器、攻击方式或领域结构的动力。我们引入了 MELD（多任务均衡学习检测器），这是一种可部署的 AI 生成文本检测器，通过辅助监督增强了二分类检测能力。

MELD attaches generator-family, attack-type, and source-domain heads to a shared encoder, and balances the four losses with learned homoscedastic uncertainty weights. To improve robustness, an EMA teacher predicts on clean inputs while an attack-augmented student is distilled toward the teacher. MELD further uses a hard-negative pairwise ranking loss to enlarge the score margin between AI-generated texts and the most confusable human texts. At inference, all auxiliary heads are discarded, giving MELD the same interface and cost as a standard detector.

MELD 在共享编码器上附加了生成器家族、攻击类型和源领域头部，并利用学习到的同方差不确定性权重来平衡这四种损失。为了提高稳健性，模型采用 EMA（指数移动平均）教师模型对干净输入进行预测，同时将经过攻击增强的学生模型向教师模型进行蒸馏。此外，MELD 使用硬负样本对排序损失（hard-negative pairwise ranking loss）来扩大 AI 生成文本与最易混淆的人类文本之间的分数差距。在推理阶段，所有辅助头部会被丢弃，使得 MELD 拥有与标准检测器相同的接口和计算成本。

On the public RAID leaderboard, MELD is the strongest open-source detector and is competitive with leading commercial models, especially under attack and at low FPR. Across standard held-out benchmarks, MELD matches or outperforms supervised baselines. We further introduce MELD-eval, a held-out evaluation pool built from recent chat models released by four major LLM providers. Without additional finetuning, MELD achieves 99.9% TPR at 1% FPR on MELD-eval, while many baselines degrade sharply.

在公开的 RAID 排行榜上，MELD 是目前最强的开源检测器，并与领先的商业模型具有竞争力，尤其是在面对攻击和低误报率场景下。在标准的留出基准测试中，MELD 的表现与监督学习基线持平或更优。我们还引入了 MELD-eval，这是一个由四家主要 LLM 提供商近期发布的聊天模型构建的留出评估池。在无需额外微调的情况下，MELD 在 MELD-eval 上实现了 1% 误报率下 99.9% 的召回率（TPR），而许多基线模型的效果则大幅下降。