---
title: "HKJudge: A Legal Discourse-Annotated Corpus for Interpreting What Courts Find, How They Reason, and What They Rule"
originalUrl: "https://arxiv.org/abs/2606.06679"
date: "2026-06-08T23:02:57.644Z"
---

# HKJudge: A Legal Discourse-Annotated Corpus for Interpreting What Courts Find, How They Reason, and What They Rule
# HKJudge：一个用于解读法院事实认定、推理过程及裁决结果的法律语篇标注语料库

Court judgments are central to legal practice and jurisprudence, yet discourse analysis of Hong Kong judgments has received limited attention, owing largely to the absence of expert-annotated corpora.
法院判决书是法律实践和法理学的核心，然而，由于缺乏专家标注的语料库，针对香港判决书的语篇分析一直未得到足够的重视。

We introduce the Hong Kong Judgment Discourse Dataset (HKJudge), the first sentence-level expert-annotated legal discourse corpus. HKJudge includes criminal judgments across all five levels of HK's court hierarchy, comprising ~290k sentences and ~6.5 million tokens, fully annotated by legal linguistics experts.
我们推出了“香港判决语篇数据集”（HKJudge），这是首个经专家标注的句子级法律语篇语料库。HKJudge 涵盖了香港五级法院体系中的刑事判决书，包含约 29 万个句子和约 650 万个词元，并由法律语言学专家进行了全面标注。

We design a two-tier discourse schema that captures what facts a court finds, how it reasons, and what it rules. At the sentence level, each sentence is assigned one of 26 rhetorical roles. At the span level, sentences are further annotated with three sentencing elements (charge, imprisonment term, fine).
我们设计了一套双层语篇架构，旨在捕捉法院认定的事实、推理过程以及裁决结果。在句子层面，每个句子被分配 26 种修辞角色之一；在片段层面，句子还被进一步标注了三项量刑要素（控罪、刑期、罚款）。

Ten legal linguistics annotators produced the annotations with an inter-annotator agreement of κ = 0.8. We formulate two tasks on HKJudge, termed rhetorical role classification and legal element extraction, and provide the first benchmark evaluation of four BERT-based models, two open-source LLMs under zero-shot and fine-tuning settings, and four commercial LLMs on both tasks.
十位法律语言学标注员完成了标注工作，标注者间一致性系数（κ）达到 0.8。我们基于 HKJudge 定义了两项任务，即“修辞角色分类”和“法律要素提取”，并针对这两项任务提供了首个基准评估，涵盖了四种基于 BERT 的模型、两种在零样本及微调设置下的开源大语言模型（LLM），以及四种商业大语言模型。

Our work demonstrates the value of sentence-level discourse annotation for modeling the structure of HK judgments and provides a rich data foundation for future work on legal judgment prediction. The HKJudge dataset and code are available at this https URL.
我们的研究证明了句子级语篇标注在建模香港判决书结构方面的价值，并为未来法律判决预测的相关研究提供了丰富的数据基础。HKJudge 数据集和代码可通过此链接获取。