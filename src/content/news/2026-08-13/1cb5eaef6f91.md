---
title: "PERCEPT: A Corpus for POS Tagging and Analysis of Persian-English Code-Mixing"
originalUrl: "https://arxiv.org/abs/2608.10109"
date: "2026-08-12T22:19:26.678Z"
---

# PERCEPT: A Corpus for POS Tagging and Analysis of Persian-English Code-Mixing
# PERCEPT：用于波斯语-英语语码转换词性标注与分析的语料库

**Abstract:** Social media has become a major venue for multilingual communication, where users frequently mix multiple languages within a single utterance. Although code-mixed corpora have been developed for several language pairs, Persian-English code-mixing remains relatively underexplored. 

**摘要：** 社交媒体已成为多语言交流的主要场所，用户经常在单次表达中混合使用多种语言。尽管针对多种语言对的语码转换（code-mixed）语料库已经建立，但波斯语-英语的语码转换研究仍相对不足。

Existing Persian resources lack Universal Dependencies (UD) part-of-speech (POS) annotations for code-mixed words, limiting both linguistic analyses and the development of syntax-aware NLP models. To address this gap, we introduce PERCEPT, the first publicly available large-scale Persian-English code-mixed corpus annotated with Universal Dependencies POS tags for code-mixed words. 

现有的波斯语资源缺乏针对语码转换词汇的通用依存关系（UD）词性（POS）标注，这限制了语言学分析及语法感知自然语言处理（NLP）模型的发展。为了填补这一空白，我们推出了 PERCEPT，这是首个公开的大规模波斯语-英语语码转换语料库，并为其中的语码转换词汇提供了通用依存关系词性标注。

The dataset comprises 6,800 posts collected from X, Instagram, and Digikala. We further present an LLM-assisted annotation framework that automatically assigns POS tags and document-level topics. Human evaluation demonstrates high agreement between the automatically generated annotations and gold annotations, confirming the reliability of the annotations. 

该数据集包含从 X、Instagram 和 Digikala 收集的 6,800 条帖子。我们进一步提出了一种大语言模型（LLM）辅助的标注框架，可自动分配词性标签和文档级主题。人工评估表明，自动生成的标注与黄金标准标注之间具有高度一致性，证实了标注的可靠性。

Using PERCEPT, we conduct the first comprehensive linguistic analysis of Persian-English code-mixing across multiple social media platforms. Our analyses reveal that nouns are the predominant category for code-mixed words, while the distributions of other POS categories vary across platforms. We further find that the positional distribution of code-mixed words is remarkably consistent across platforms, whereas the triggering effect is substantially more pronounced in Digikala. 

利用 PERCEPT，我们对多个社交媒体平台上的波斯语-英语语码转换进行了首次全面的语言学分析。分析显示，名词是语码转换词汇中的主要类别，而其他词性类别的分布则因平台而异。我们还发现，语码转换词汇的位置分布在各平台间表现出惊人的一致性，而触发效应在 Digikala 平台上则显著更为明显。

PERCEPT is publicly available at this https URL. 

PERCEPT 现已通过此链接公开提供。