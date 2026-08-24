---
title: "A Few Good Clauses: Comparing LLMs vs Domain-Trained Small Language Models on Structured Contract Extraction"
originalUrl: "https://arxiv.org/abs/2605.05532"
date: "2026-05-08T22:34:34.294Z"
---

# A Few Good Clauses: Comparing LLMs vs Domain-Trained Small Language Models on Structured Contract Extraction
# 几条好条款：对比大语言模型与领域训练小语言模型在结构化合同提取中的表现

**Abstract:** This paper evaluates whether a domain trained Small Language Model (SLM) can outperform frontier Large Language Models on structured contract extraction at radically lower cost. 
**摘要：** 本文旨在评估经过领域训练的小语言模型（SLM）是否能在结构化合同提取任务中，以极低的成本超越前沿大语言模型（LLM）。

We test Olava Extract, a self-hosted legal domain Mixture of Experts model, against five frontier models. Olava Extract achieved the strongest aggregate performance in the study, with a macro F1 of 0.812 and a micro F1 of 0.842, while reducing inference cost by 78% to 97% compared with the frontier models tested. 
我们测试了 Olava Extract——一种自托管的法律领域专家混合模型（Mixture of Experts），并将其与五种前沿模型进行了对比。研究显示，Olava Extract 取得了最强的综合表现，其宏观 F1 分数为 0.812，微观 F1 分数为 0.842，同时将推理成本较所测试的前沿模型降低了 78% 至 97%。

It also achieved the highest precision scores, producing fewer hallucinated and unsupported extractions, an important distinction in legal workflows where hallucinations create operational risk and downstream review burden. 
它还获得了最高的精确度得分，产生的幻觉和无依据提取内容更少。在法律工作流程中，这一点至关重要，因为幻觉会带来运营风险并增加后续审查的负担。

The findings show that high-performing, human-comparable legal AI no longer requires the largest externally hosted models. More broadly, they challenge the assumption that commercially valuable enterprise AI capability must remain tied to ever larger models, massive infrastructure expenditure, and centrally hosted providers.
研究结果表明，高性能且可媲美人类水平的法律 AI 不再依赖于规模最大的外部托管模型。从更广泛的意义上讲，这些发现挑战了一种假设，即具有商业价值的企业级 AI 能力必须绑定在不断扩大的模型、巨额的基础设施支出以及中心化的托管服务商之上。