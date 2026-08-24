---
title: "How LLMs Distort Our Written Language"
originalUrl: "https://sites.google.com/view/llmwritingdistortion/home"
date: "2026-05-04T22:37:09.485Z"
---

# How LLMs Distort Our Written Language
# 大语言模型如何扭曲我们的书面语言

**Marwa Abdulhai, Isadora White, Yanming Wan, Ibrahim Qureshi, Joel Z. Leibo, Max Kleiman-Weiner, Natasha Jaques**
**UC Berkeley, UC San Diego, University of Washington, Zaytuna College, Google DeepMind**

### Executive Summary
### 执行摘要

LLMs are used by over a billion people globally, and the most frequent use case is to assist with writing. LLMs can provide a huge efficiency boost, but are they actually writing what we want? Many users recognize the "feel" of LLM prose, but few people realize the extent to which LLMs distort the meaning of writing. We find this across three datasets: a human user study, a dataset of human argumentative essays, and reviews from a top machine learning conference.
全球有超过十亿人在使用大语言模型（LLMs），其中最常见的用途是辅助写作。LLMs 可以极大地提高效率，但它们写出的内容真的是我们想要的吗？许多用户能感受到 LLM 生成文本的“那种味道”，但很少有人意识到 LLMs 在多大程度上扭曲了写作的本意。我们在三个数据集上发现了这一现象：一项人类用户研究、一个人类议论文数据集，以及来自顶级机器学习会议的同行评审。

### Main Findings
### 主要发现

*   **LLMs change the conclusions of writing, changing the stance as well as the argument type.**
    LLMs 会改变写作的结论，同时改变立场和论证类型。
*   **Human users report a paradox of preferences, being satisfied while reporting a statistically significant loss of voice and creativity.**
    人类用户报告了一种偏好悖论：他们对结果感到满意，但同时也报告了在个人风格（voice）和创造力方面存在统计学意义上的显著损失。
*   **LLMs introduce larger semantic shifts than human edits do, even when prompted only to introduce grammar edits.**
    即使仅被要求进行语法修改，LLMs 引入的语义偏移也比人类编辑更大。
*   **These shifts apply even to our institutions:** LLM reviews gave significantly different reasons for acceptance and rejection at the International Conference of Learning Representations (2026), a top AI conference; the 21% of peer reviews that were found to be AI-generated focused on significantly different scientific criteria.
    这些偏移甚至影响到了我们的学术机构：在顶级人工智能会议 ICLR 2026 上，LLM 生成的评审意见给出的录用或拒稿理由与人类评审显著不同；研究发现，21% 的 AI 生成的同行评审所关注的科学标准存在显著差异。

### Why should we care?
### 我们为什么要关注？

As LLMs are integrated into society, these subtle changes in meaning could fundamentally alter politics, culture, science, and even the way we communicate with our friends and family. Our study focuses on argumentative writing, but our findings may generalize to many other forms of writing and communication as well. When LLMs revise human writing, they induce large homogenizing changes very unlike how people would have edited the same essay.
随着 LLMs 融入社会，这些细微的意义变化可能会从根本上改变政治、文化、科学，甚至是我们与亲友沟通的方式。我们的研究侧重于议论文写作，但我们的发现可能同样适用于许多其他形式的写作和交流。当 LLMs 修改人类文章时，它们会引发大规模的同质化改变，这与人类编辑同一篇文章的方式截然不同。

### Methodology & Datasets
### 方法论与数据集

We study how LLMs distort meaning in our written language in three datasets.
我们通过三个数据集研究了 LLMs 如何扭曲书面语言的意义。

**Human User Study:** To understand how humans use LLMs while writing, we conduct a human user study, with 55 users enabled to use the LLM and 45 without access to the LLM. Since many human users chose to abstain from LLM use during their session, we condition our results on this choice and split into two groups: LLM-Influenced, for those who chose not to use or use only for information seeking, and LLM, the group of extensive users.
**人类用户研究：** 为了了解人类在写作时如何使用 LLMs，我们进行了一项用户研究，其中 55 名用户可以使用 LLM，45 名用户无法使用。由于许多用户在实验过程中选择不使用 LLM，我们根据这一选择将结果分为两组：“LLM 影响组”（选择不使用或仅用于信息检索的用户）和“LLM 深度使用组”（大量使用 LLMs 的用户）。

**ArgRewrite-v2:** Using a dataset of 86 human-written essays collected in 2021 — before the widespread release of LLMs — we prompted three production LLMs (gpt-5-mini, gemini-2.5-flash, claude-haiku) to edit essays across five revision types: general revision, minimal edits, grammar edits, completion, and expansion. We compare LLM-generated drafts to human-written revisions along dimensions of semantics, lexical usage, part-of-speech distributions, emotional tone, and stylistic features.
**ArgRewrite-v2：** 我们使用 2021 年（LLMs 广泛发布前）收集的 86 篇人类撰写的议论文数据集，提示三款主流 LLMs（gpt-5-mini, gemini-2.5-flash, claude-haiku）进行五种类型的修改：通用修改、最小化编辑、语法修改、补全和扩写。我们将 LLM 生成的草稿与人类修改的版本在语义、词汇使用、词性分布、情感基调和文体特征等维度上进行了比较。

**ICLR 2026 Review Analysis:** We analyze 18k peer reviews from ICLR 2026, selecting papers with one entirely human-written review and one entirely LLM-generated review. We use an LLM-as-a-Judge classifier to identify the strengths and weaknesses cited in each review and compare scores assigned by humans vs. LLMs.
**ICLR 2026 评审分析：** 我们分析了 ICLR 2026 的 1.8 万份同行评审，筛选出包含一份完全由人类撰写和一份完全由 LLM 生成的评审的论文。我们使用“LLM 作为裁判”的分类器来识别每份评审中提到的优缺点，并比较人类与 LLM 给出的评分。

### Key Insights
### 核心洞察

*   **Heavy LLM users report that their essays do not reflect their own voice.** This presents a paradox of preferences where the user reports satisfaction, but report a significant loss in creativity and voice. RLHF optimizes for preferences, but this is not sufficient for maintaining creativity and semantics.
    **深度 LLM 用户反映，他们的文章无法反映出他们自己的个人风格。** 这呈现出一种偏好悖论：用户虽然表示满意，但同时也报告了创造力和个人风格的显著丧失。基于人类反馈的强化学习（RLHF）虽然优化了用户偏好，但这不足以维持创造力和语义的完整性。

*   **LLMs distort writing by shifting essays in a common semantic direction.** Essays written by humans in the control group are widely spread out throughout the embedding space, occupying a broad region that reflects the diversity of individual perspectives, writing styles, and argumentation. Essays written by LLMs form a tight cluster in a region that is not occupied by any of the human-written essays.
    **LLMs 通过将文章向共同的语义方向偏移来扭曲写作。** 对照组中人类撰写的文章在嵌入空间中分布广泛，占据了一个反映个人观点、写作风格和论证多样性的广阔区域。而 LLMs 撰写的文章则形成了一个紧密的簇，位于人类文章从未触及的区域。

*   **LLMs Alter the Conclusions of Written Language.** LLM users wrote essays that were significantly more neutral and avoided taking a definitive stance on the question "Does money lead to happiness?". This represents a fundamental shift in argument stance.
    **LLMs 改变了书面语言的结论。** LLM 用户撰写的文章明显更加中立，在回答“金钱是否带来幸福？”这一问题时，避免采取明确的立场。这代表了论证立场上的根本性转变。

*   **LLMs make substantially larger lexical changes than humans.** LLM edits substantially alter the words used in an essay compared to human edits. The unique lexical fingerprint of each writer is overwritten by the LLM's preferred vocabulary.
    **LLMs 比人类进行了大幅度的词汇修改。** 与人类编辑相比，LLM 的修改实质性地改变了文章中的用词。每位作者独特的词汇指纹都被 LLM 偏好的词汇所覆盖。

*   **LLMs Systematically Restructure Grammar Toward a Less Personal, Formal Style.** LLMs adopt a more formal style of writing, increasing the use of nouns and adjectives, and decreasing the use of pronouns.
    **LLMs 系统性地将语法重构为一种去个人化、正式的风格。** LLMs 倾向于采用更正式的写作风格，增加了名词和形容词的使用，并减少了代词的使用。