---
title: "HarmProfile: Characterizing Harmful Distributions in Frontier LLMs"
originalUrl: "https://arxiv.org/abs/2608.14577"
date: "2026-08-18T21:50:13.645Z"
---

# HarmProfile: Characterizing Harmful Distributions in Frontier LLMs
# HarmProfile：表征前沿大语言模型中的有害分布

Frontier large language models (LLMs) safety evaluation has largely treated harmful generation as an attack outcome rather than as an object of analysis. Consequently, little is known about the harmful outputs produced during model misbehavior, partly because large-scale, high-quality collections of frontier-LLM misbehavior are difficult to obtain.
目前，前沿大语言模型（LLM）的安全评估大多将有害生成视为一种攻击结果，而非分析对象。因此，人们对模型在违规行为中产生的有害输出知之甚少，部分原因是难以获取大规模、高质量的前沿 LLM 违规行为数据集。

To address this gap, we introduce HarmProfile, a content-centric benchmark dataset that collects model misbehavior across diverse harm categories and model families, and defines the resulting harmful-output distribution as a model-level risk profile. The premise is that, just as linguistic behavior can be characterized from an utterance corpus, model risk can be characterized from the content, severity, and variation of its safety failures.
为了填补这一空白，我们推出了 HarmProfile，这是一个以内容为中心的基准数据集。它收集了跨越多种危害类别和模型系列的模型违规行为，并将由此产生的有害输出分布定义为模型层面的风险概况（Risk Profile）。其前提是：正如可以通过语料库来表征语言行为一样，也可以通过模型安全故障的内容、严重程度和变化来表征模型风险。

HarmProfile contains over 80,000 validated artifacts from 23 frontier LLMs across 13 model families, organized into 15 harm categories and 57 subcategories. Using this corpus, we find that frontier LLMs reliably produce harmful content at scale, yet exhibit distinct risk profiles; both harmfulness and diversity grow with model capability, suggesting that frontier LLMs may appear safe yet harbor increasingly dangerous knowledge beneath the alignment surface.
HarmProfile 包含来自 13 个模型系列、23 个前沿 LLM 的超过 80,000 个经过验证的样本，分为 15 个危害类别和 57 个子类别。利用该语料库，我们发现前沿 LLM 确实能够大规模地产生有害内容，且表现出截然不同的风险概况；有害性和多样性均随模型能力的增强而增长，这表明前沿 LLM 虽然表面上看起来安全，但在对齐表象之下可能隐藏着日益危险的知识。

Our source code is available at this https URL.
我们的源代码可在该链接获取。