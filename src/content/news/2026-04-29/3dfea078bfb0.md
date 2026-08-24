---
title: "A Brief Overview of Gender Bias in AI"
originalUrl: "https://thegradient.pub/gender-bias-in-ai/"
date: "2026-04-29T06:27:32.203Z"
---

# A Brief Overview of Gender Bias in AI
# AI 中的性别偏见简述

AI models reflect, and often exaggerate, existing gender biases from the real world. It is important to quantify such biases present in models in order to properly address and mitigate them. In this article, I showcase a small selection of important work done (and currently being done) to uncover, evaluate, and measure different aspects of gender bias in AI models. I also discuss the implications of this work and highlight a few gaps I’ve noticed.

AI 模型反映并往往会放大现实世界中现有的性别偏见。为了妥善解决和减轻这些偏见，量化模型中存在的此类偏见至关重要。在本文中，我将展示一小部分重要的研究工作（包括已完成和正在进行的工作），这些工作旨在揭示、评估和衡量 AI 模型中不同层面的性别偏见。我还将讨论这些研究的意义，并指出我所观察到的一些不足之处。

### But What Even Is Bias?
### 究竟什么是偏见？

All of these terms (“AI”, “gender”, and “bias”) can be somewhat overused and ambiguous. “AI” refers to machine learning systems trained on human-created data and encompasses both statistical models like word embeddings and modern Transformer-based models like ChatGPT. “Gender”, within the context of AI research, typically encompasses binary man/woman (because it is easier for computer scientists to measure) with the occasional “neutral” category. Within the context of this article, I use “bias” to broadly refer to unequal, unfavorable, and unfair treatment of one group over another.

“AI”、“性别”和“偏见”这些术语有时被过度使用且含义模糊。“AI”指的是基于人类创造的数据进行训练的机器学习系统，涵盖了词嵌入（word embeddings）等统计模型以及像 ChatGPT 这样基于 Transformer 的现代模型。在 AI 研究的语境下，“性别”通常包含二元的男/女（因为这对于计算机科学家来说更容易衡量），偶尔也会包含“中性”类别。在本文的语境中，我将“偏见”广义地定义为对某一群体相对于另一群体的不平等、不利和不公正的对待。

There are many different ways to categorize, define, and quantify bias, stereotypes, and harms, but this is outside the scope of this article. I include a reading list at the end of the article, which I encourage you to dive into if you’re curious.

对偏见、刻板印象和伤害进行分类、定义和量化的方法有很多，但这超出了本文的讨论范围。我在文末附上了一份阅读清单，如果你感兴趣，欢迎深入阅读。

### A Short History of Studying Gender Bias in AI
### AI 性别偏见研究简史

Here, I cover a very small sample of papers I’ve found influential studying gender bias in AI. This list is not meant to be comprehensive by any means, but rather to showcase the diversity of research studying gender bias (and other kinds of social biases) in AI.

在这里，我将介绍一小部分我认为在 AI 性别偏见研究中具有影响力的论文。这份清单绝非详尽无遗，而是旨在展示 AI 性别偏见（以及其他社会偏见）研究的多样性。

#### Man is to Computer Programmer as Woman is to Homemaker? Debiasing Word Embeddings (Bolukbasi et al., 2016)
#### “男人之于程序员，正如女人之于家庭主妇？”——词嵌入的去偏见化 (Bolukbasi 等人，2016)

**Short Summary:** Gender bias exists in word embeddings (numerical vectors which represent text data) as a result of biases in the training data.

**简要总结：** 由于训练数据中存在偏见，词嵌入（代表文本数据的数值向量）中也存在性别偏见。

**Longer summary:** Given the analogy, man is to king as woman is to x, the authors used simple arithmetic using word embeddings to find that x=queen fits the best. Subtracting the vector representations for “man” from “woman” results in a similar value as subtracting the vector representations for “king” and “queen”. However, the authors found sexist analogies to exist in the embeddings, such as:
* He is to carpentry as she is to sewing
* Father is to doctor as mother is to nurse
* Man is to computer programmer as woman is to homemaker

**详细总结：** 给定类比“男人之于国王，正如女人之于 x”，作者利用词嵌入进行简单的算术运算，发现 x=女王是最合适的。从“女人”的向量表示中减去“男人”的向量表示，其结果与从“女王”中减去“国王”的向量表示所得的值相似。然而，作者发现嵌入中存在性别歧视的类比，例如：
* 他之于木工，正如她之于缝纫
* 父亲之于医生，正如母亲之于护士
* 男人之于程序员，正如女人之于家庭主妇

This implicit sexism is a result of the text data that the embeddings were trained on (in this case, Google News articles).

这种隐性的性别歧视源于词嵌入所训练的文本数据（在本例中为谷歌新闻文章）。

**Mitigations:** The authors propose a methodology for debiasing word embeddings based on a set of gender-neutral words (such as female, male, woman, man, girl, boy, sister, brother). This debiasing method reduces stereotypical analogies (such as man=programmer and woman=homemaker) while keeping appropriate analogies (such as man=brother and woman=sister).

**缓解措施：** 作者提出了一种基于一组性别中性词（如女性、男性、女人、男人、女孩、男孩、姐妹、兄弟）来消除词嵌入偏见的方法。这种去偏见方法减少了刻板印象类比（如男人=程序员，女人=家庭主妇），同时保留了合理的类比（如男人=兄弟，女人=姐妹）。

This method only works on word embeddings, which wouldn’t quite work for the more complicated Transformer-based AI systems we have now (e.g. LLMs like ChatGPT). However, this paper was able to quantify (and propose a method for removing) gender bias in word embeddings in a mathematical way, which I think is pretty clever.

这种方法仅适用于词嵌入，对于我们现在拥有的更复杂的基于 Transformer 的 AI 系统（例如 ChatGPT 等大语言模型）并不完全适用。然而，这篇论文能够以数学方式量化（并提出消除）词嵌入中的性别偏见，我认为这非常巧妙。

**Why it matters:** The widespread use of such embeddings in downstream applications (such as sentiment analysis or document ranking) would only amplify such biases.

**重要性：** 此类嵌入在下游应用（如情感分析或文档排序）中的广泛使用，只会放大这些偏见。

#### Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification [Buolamwini and Gebru, 2018]
#### “性别阴影”：商业性别分类中的交叉准确度差异 [Buolamwini 和 Gebru，2018]

**Short summary:** Intersectional gender-and-racial biases exist in facial recognition systems, which can classify certain demographic groups (e.g. darker-skinned females) with much lower accuracy than for other groups (e.g. lighter-skinned males).

**简要总结：** 面部识别系统中存在交叉性的性别和种族偏见，导致其对某些人口群体（如深肤色女性）的分类准确度远低于其他群体（如浅肤色男性）。

**Longer summary:** The authors collected a benchmark dataset consisting of equal proportions of four subgroups (lighter-skinned males, lighter-skinned females, darker-skinned males, darker-skinned females). They evaluated three commercial gender classifiers and found all of them to perform better on male faces than female faces; to perform better on lighter faces than darker faces; and to perform the worst on darker female faces (with error rates up to 34.7%). In contrast, the maximum error rate for lighter-skinned male faces was 0.8%.

**详细总结：** 作者收集了一个基准数据集，其中包含四个比例相等的子群体（浅肤色男性、浅肤色女性、深肤色男性、深肤色女性）。他们评估了三个商业性别分类器，发现它们在男性面部上的表现均优于女性面部；在浅色面部上的表现优于深色面部；而在深肤色女性面部上的表现最差（错误率高达 34.7%）。相比之下，浅肤色男性面部的最高错误率仅为 0.8%。

**Mitigation:** In direct response to this paper, Microsoft and IBM (two of the companies in the study whose classifiers were analyzed and critiqued) hastened to address these inequalities by fixing biases and releasing blog posts unreservedly engaging with the theme of algorithmic bias. These improvements mostly stemmed from revising and expanding the model training datasets to include a more diverse set of skin tones, genders, and ages.

**缓解措施：** 作为对这篇论文的直接回应，微软和 IBM（研究中被分析和批评的两家公司）迅速采取行动，通过修复偏见并发布博客文章，毫无保留地探讨算法偏见这一主题，以解决这些不平等问题。这些改进主要源于修订和扩展模型训练数据集，使其包含更多样化的肤色、性别和年龄群体。

**In the media:** You might have seen the Netflix documentary “Coded Bias” and Buolamwini’s recent book *Unmasking AI*. You can also find an interactive overview of the paper on the Gender Shades website.

**媒体报道：** 你可能看过 Netflix 的纪录片《监视资本主义：智能陷阱》（Coded Bias）以及 Buolamwini 最近出版的著作《揭开 AI 的面纱》（Unmasking AI）。你也可以在“性别阴影”（Gender Shades）网站上找到该论文的交互式概述。

**Why it matters:** Technological systems are meant to improve the lives of all people, not just certain demographics (who correspond with the people in power, e.g. white men). It is important, also, to consider bias not just along a single axis (e.g. gender) but the intersection of multiple axes (e.g. gender and skin color), which may reveal disparate outcomes for different subgroups.

**重要性：** 技术系统的初衷是改善所有人的生活，而不仅仅是改善某些特定群体（通常是掌握权力的人，如白人男性）的生活。同样重要的是，不仅要考虑单一维度（如性别）上的偏见，还要考虑多个维度的交叉（如性别和肤色），这可能会揭示不同子群体所面临的截然不同的结果。