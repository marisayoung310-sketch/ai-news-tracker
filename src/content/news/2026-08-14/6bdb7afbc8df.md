---
title: "Gloss-Free Representation Learning for Cross-Dataset Sign Spotting"
originalUrl: "https://arxiv.org/abs/2608.11332"
date: "2026-08-13T22:35:00.745Z"
---

# Gloss-Free Representation Learning for Cross-Dataset Sign Spotting
# 面向跨数据集手语定位的无词汇表征学习

**Abstract:** Sign-language research for resource-constrained languages is often limited by the cost of dense linguistic labels such as glosses, temporal boundaries, and sign order. Broadcast news offers a practical alternative by pairing continuous signing with spoken-language transcripts, but this supervision is weak since text and signing are loosely aligned.

**摘要：** 针对资源受限语言的手语研究，往往受限于密集语言标注（如词汇表征、时间边界和手语顺序）的高昂成本。广播新闻通过将连续手语与口语转录文本配对，提供了一种实用的替代方案，但由于文本与手语之间的对齐较为松散，这种监督信号较为微弱。

Morphologically rich languages such as Turkish add further difficulty, as the same lexical meaning can appear in many inflected forms while some derived forms should remain distinct. We study whether weak transcript-based supervision can pretrain a reusable sign encoder in this setting, where poor text normalization can fragment pseudo-gloss targets and weaken representation learning.

土耳其语等形态丰富的语言增加了研究难度，因为相同的词汇含义可能以多种屈折形式出现，而某些派生形式又必须保持区分。我们研究了在这种环境下，基于转录的弱监督信号是否能够预训练一个可复用的手语编码器，因为较差的文本归一化可能会导致伪词汇目标碎片化，从而削弱表征学习的效果。

Unlike prior pseudo-gloss pipelines designed mainly to improve translation, we test whether the pretrained encoder transfers as a reusable representation for cross-dataset sign spotting. We pretrain on TSL-News, a new Turkish broadcast corpus, using pseudo-gloss labels derived from transcripts rather than manual annotation, comparing rule-based morphological lemmatization with constrained LLM-assisted normalization over a fixed vocabulary.

与以往主要旨在提升翻译质量的伪词汇流水线不同，我们测试了预训练编码器是否可以作为一种可复用的表征，迁移到跨数据集的手语定位任务中。我们在新的土耳其语广播语料库 TSL-News 上进行预训练，使用从转录文本中导出的伪词汇标签而非人工标注，并对比了基于规则的形态词形还原与基于固定词汇表的受限大语言模型（LLM）辅助归一化方法。

We evaluate the learned representations via cross-dataset sign spotting on a new TSL Spotting Benchmark built from the TSL Dictionary corpus. The LLM-assisted encoder raises top-5 temporal localization mean IoU from 0.235 to 0.465, with 56.2% of examples reaching an IoU of at least 0.50; a frequency analysis suggests this gain is not mainly driven by memorizing frequent pseudo-gloss labels.

我们通过在基于 TSL 字典语料库构建的全新 TSL 定位基准（TSL Spotting Benchmark）上进行跨数据集手语定位，评估了所学到的表征。LLM 辅助编码器将 Top-5 时间定位的平均交并比（mean IoU）从 0.235 提升至 0.465，其中 56.2% 的样本 IoU 达到 0.50 以上；频率分析表明，这种提升并非主要源于对高频伪词汇标签的记忆。

In a downstream translation check, the same pretraining improves BLEU-4 from 9.60 to 11.04 and ROUGE from 23.48 to 27.43. These results show that loosely aligned broadcast data can provide effective weak supervision for learning sign representations that capture both lexical content and temporal structure.

在下游翻译检查中，同样的预训练方法使 BLEU-4 分数从 9.60 提升至 11.04，ROUGE 分数从 23.48 提升至 27.43。这些结果表明，松散对齐的广播数据可以为学习同时捕捉词汇内容和时间结构的手语表征提供有效的弱监督信号。