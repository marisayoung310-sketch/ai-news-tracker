---
title: "How Major Reasoning Models Converge to the Same “Brain” as They Model Reality Increasingly Better"
originalUrl: "https://towardsdatascience.com/how-major-reasoning-models-converge-to-the-same-brain-as-they-model-reality-increasingly-better/"
date: "2026-05-07T23:36:04.909Z"
---

# How Major Reasoning Models Converge to the Same “Brain” as They Model Reality Increasingly Better
# 主流推理模型如何随着对现实建模能力的提升，逐渐收敛于同一个“大脑”

**Because there's only one reality to model!**
**因为现实只有一个，可供建模的也只有一个！**

Different ways to a same destination: As models scale and improve to perform very well and look smart and knowledgeable, they converge to the same best possible representation of reality.
通往同一终点的不同路径：随着模型规模的扩大和性能的提升，它们表现得越来越聪明、知识渊博，并最终收敛于对现实的最佳表征。

I think this might be one of the most interesting discoveries (and topics) in artificial intelligence, leaving aside the debate about whether this is intelligence at all or not. We (I at least!) assume that if you trained one AI model purely on, say, images and another purely on text, they would develop entirely different ways of “thinking” — not entering the discussion about what this exactly means. Our notion would be that they use completely different architectures and process completely different data, so they should, by all logic, have completely different “brains”, even if they both are good at their tasks with images and text.
我认为这可能是人工智能领域最有趣的发现（及议题）之一，暂且不论这是否真的属于“智能”。我们（至少我是这样认为的！）曾假设，如果你分别用图像和文本训练两个 AI 模型，它们会发展出完全不同的“思维”方式——暂不讨论这具体意味着什么。我们的固有观念是，它们使用完全不同的架构，处理完全不同的数据，因此从逻辑上讲，它们应该拥有完全不同的“大脑”，即便它们在各自的图像或文本任务中表现都很出色。

But according to some exciting research from various groups, that isn’t the case at all! Already in 2024, MIT presented solid evidence that every major AI model is secretly converging to the same “thinking core” (or brain, or whatever you want to call it). As these models get bigger and more powerful, they are all arriving at the exact same conclusion about how the world is structured. Maybe this wasn’t obvious with the early models, because they were bad at reasoning; but it becomes more and more evident as they get better. And allegedly, I would say, the reason for that is that if they are all correct then they MUST be creating a very similar representation of reality.
但根据多个研究团队令人振奋的研究结果，事实并非如此！早在 2024 年，麻省理工学院（MIT）就提出了确凿证据，表明每一个主流 AI 模型都在悄然收敛于同一个“思维核心”（或大脑，随你怎么称呼它）。随着这些模型变得越来越庞大、越来越强大，它们在世界结构如何运作这一问题上，得出了完全相同的结论。在早期模型中，这一点或许并不明显，因为它们当时的推理能力较弱；但随着模型性能的提升，这种趋势变得愈发显著。我认为，其原因在于：如果它们都是正确的，那么它们必然是在构建一种极其相似的现实表征。

### The allegory of the (AI) cave
### （AI）洞穴寓言

To understand why this is happening, some researchers looked back 2,400 years to Plato’s “Allegory of the Cave” — resulting in some interesting preprint titles containing ideas such as the “Platonic Representation Hypothesis”. Essentially, Plato believed that we humans are like prisoners in a cave, watching shadows flicker on a wall. We think the shadows (our perceptions) are “reality”, but they are actually just projections of a deeper, hidden, more complex reality existing outside the cave.
为了理解这一现象，一些研究人员回顾了 2400 年前柏拉图的“洞穴寓言”，并由此产生了一些有趣的预印本论文标题，其中包含了“柏拉图表征假说”（Platonic Representation Hypothesis）等观点。本质上，柏拉图认为人类就像洞穴里的囚徒，看着墙上闪烁的影子。我们以为影子（我们的感知）就是“现实”，但它们实际上只是洞穴外更深层、更隐秘、更复杂现实的投影。

One of the many papers I read to prepare this (links at the end) argues that AI models are doing the exact same thing, and that in doing so they converge to the same model of how the world works in order to understand the input shadows. The billions of lines of text, the trillions of pixels in images, the endless audio files used for training of our modern AI models are just their perception (“shadows”) of our world. These powerful models are looking at these different shadows of human data and, completely independently, they are discovering the exact same underlying structure of the universe to make sense of it.
我在准备本文时阅读了许多论文（链接附在文末），其中一篇指出，AI 模型正在做完全相同的事情：为了理解输入的“影子”，它们收敛于同一个关于世界运作的模型。现代 AI 模型训练所用的数十亿行文本、数万亿像素的图像以及无尽的音频文件，仅仅是它们对我们世界的感知（“影子”）。这些强大的模型正在观察人类数据的不同侧面，并完全独立地发现了宇宙中相同的底层结构，从而理解这个世界。

### Different eyes, same vision
### 不同的眼睛，相同的视野

Here is the mind-blowing part, to me at least: A model that only “sees” images and a model that only “reads” text are measuring the distance between concepts in the exact same way (if they are both good enough). If you ask a vision model to map the “distance” between a picture of a “dog” and a “wolf”, and then ask a language model to map the distance between the word “dog” and the word “wolf”, the mathematical structures they build are becoming more and more similar as they can better distinguish the two animals.
对我而言，最令人震撼的部分在于：一个只“看”图像的模型和一个只“读”文本的模型，正在以完全相同的方式衡量概念之间的距离（前提是两者都足够优秀）。如果你让一个视觉模型映射“狗”和“狼”图片之间的“距离”，再让一个语言模型映射“狗”和“狼”这两个词之间的“距离”，你会发现，随着它们对这两种动物区分能力的提升，它们所构建的数学结构正变得越来越相似。

In other words, it seems like as these models scale up and become better, they stop being a mess of random connections. Research shows that they tend to align, and in particular that as vision models and language models get larger, the way they represent data becomes more and more alike. So amazing, don’t you think!
换句话说，随着这些模型规模扩大且性能提升，它们似乎不再是一堆随机连接的混乱集合。研究表明，它们倾向于对齐；特别是当视觉模型和语言模型变得更大时，它们表征数据的方式变得越来越趋同。这难道不令人惊叹吗！

### Why scale changes everything
### 为什么规模能改变一切

According to the research available, this all seems to be quite universal and happening with modern models from all companies and trained with different sources, as long as the model itself is capable enough. In fact, as a model gets larger, whatever it is, it undergoes a “phase change” in their internal thinking. Research seems to indicate that these models stop simply memorizing their specific tasks and rather start to build up a statistical model of reality itself.
根据现有研究，只要模型本身足够强大，这种现象似乎具有普遍性，且发生在所有公司、由不同数据源训练的现代模型中。事实上，无论模型是什么类型，随着规模的扩大，其内部思维都会经历一次“相变”。研究表明，这些模型不再仅仅是死记硬背特定任务，而是开始构建一个关于现实本身的统计模型。

And apparently, this happens because of some “selective pressure” acting on the models:
显然，这是由于作用于模型的一些“选择压力”所致：

*   **Task generality:** If you want an AI to be good at everything, there is only one “best” way to represent the world such that it doesn’t overfit yet can be predicted. Since there’s only ONE best way, they must all get to it!
    **任务通用性：** 如果你想让 AI 在各方面都表现出色，那么只有一种“最佳”方式来表征世界，既能避免过拟合，又能进行预测。既然只有一种“最佳”方式，它们必然都会殊途同归！
*   **Capacity:** Large models have the “room” to find the most elegant, simple solution. But having ample room in terms of architecture of number of parameters must be balanced with avoiding overfitting.
    **容量：** 大型模型有足够的“空间”去寻找最优雅、最简单的解决方案。但在架构参数数量方面拥有充足空间的同时，必须平衡好对过拟合的规避。
*   **Simplicity bias:** Deep networks actually prefer simple solutions over complex ones, again especially if overfitting is avoided.
    **简单性偏好：** 深度网络实际上更倾向于简单的解决方案而非复杂的，同样，这尤其是在避免过拟合的情况下。

One important thing is that the different AI models might adapt to these pieces of selective pressure at different speeds (or with different levels of efficiency); but they are certainly all heading toward the same final state of maximal understanding achieved through the same internal representation of how the world works.
重要的一点是，不同的 AI 模型可能以不同的速度（或不同的效率水平）适应这些选择压力；但它们无疑都在朝着同一个最终状态前进，即通过对世界运作方式的相同内部表征，实现最大程度的理解。

### The most modern research on “knowledge mechanisms”
### 关于“知识机制”的最新研究

If I were 25 years younger and had to choose a career now, I would probably choose something like computer sciences mixed with psychology. Because to me, here’s where the most exciting part of the AI world is. Read why!
如果我年轻 25 岁，现在要选择职业，我可能会选择计算机科学与心理学相结合的领域。因为对我来说，这是 AI 世界中最令人兴奋的部分。看看原因吧！

A recent survey on “knowledge mechanisms” in LLMs adds another layer to all this described above. It suggests that knowledge in these models isn’t just scattered randomly; rather, it evolves from simple memorization to complex “comprehension and application”. There would then be some kind of “dynamic intelligence” at play. The trend that knowledge and capability tend to converge into the same representation spaces seems to happen across the entire artificial neural model group, regardless of data.
最近一项关于大语言模型（LLM）中“知识机制”的调查，为上述所有内容增添了新的维度。它表明，这些模型中的知识并非随机散布，而是从简单的记忆演变为复杂的“理解与应用”。这其中似乎存在某种“动态智能”。知识和能力趋向于收敛到相同表征空间的趋势，似乎在整个神经网络模型群体中都在发生，而与数据无关。