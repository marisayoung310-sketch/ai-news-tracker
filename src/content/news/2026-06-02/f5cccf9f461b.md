---
title: "When English Rewrites Local Knowledge: Global Narrative Dominance in Large Language Models"
originalUrl: "https://arxiv.org/abs/2605.30481"
date: "2026-06-01T23:18:10.053Z"
---

# When English Rewrites Local Knowledge: Global Narrative Dominance in Large Language Models
# 当英语重写本土知识：大型语言模型中的全球叙事主导地位

**Abstract:** Large language models (LLMs) are widely used as cross-lingual knowledge interfaces. However, culturally grounded questions often reflect globally dominant narratives rather than local contexts. We study this failure mode as *global narrative dominance* in Bangla, a low-resource cultural context.

**摘要：** 大型语言模型（LLMs）被广泛用作跨语言知识接口。然而，基于文化背景的问题往往反映的是全球主导的叙事，而非本土语境。我们以孟加拉语（Bangla）这一低资源文化背景为例，研究了这种被称为“全球叙事主导”（global narrative dominance）的失效模式。

We introduce `CulturalNB`, a dataset of 717 manually curated Bengali cultural instances with parallel Bangla--English question--answer pairs and supporting evidence, metadata, and sociocultural annotations. Using question-only and evidence-based prompting, we evaluate nine state-of-the-art LLMs with human and two independent LLM judges across metrics for cross-lingual consistency, language anchoring, global substitution, institutional bias, and epistemic perspective coverage.

我们引入了 `CulturalNB` 数据集，其中包含 717 个经过人工整理的孟加拉文化实例，并配有平行的孟加拉语-英语问答对，以及支持性证据、元数据和社会文化注释。通过仅使用问题提示和基于证据的提示，我们评估了九种最先进的 LLM，并由人类和两个独立的 LLM 评审员在跨语言一致性、语言锚定、全球替代、制度偏见和认知视角覆盖率等指标上进行了评测。

Results show that questions asked in English systematically increase global substitution and institutional framing while reducing local perspective coverage. Local evidence improves factual consistency and perspective coverage, but does not eliminate language-induced epistemic shifts. These findings suggest that cultural failures in LLMs are not only missing-knowledge errors but also failures of grounding and narrative prioritization.

结果表明，用英语提出的问题会系统性地增加“全球替代”和“制度化框架”的倾向，同时降低对本土视角的覆盖。提供本土证据可以提高事实一致性和视角覆盖率，但无法消除由语言引起的认知偏差。这些发现表明，LLM 在文化层面的失效不仅是知识缺失的问题，更是基础语境（grounding）和叙事优先级排序上的失败。