---
title: "SKG-Eval: Stateful Evaluation of Multi-Turn Dialogue via Incremental Semantic Knowledge Graphs"
originalUrl: "https://arxiv.org/abs/2605.16650"
date: "2026-05-19T22:49:04.692Z"
---

# SKG-Eval: Stateful Evaluation of Multi-Turn Dialogue via Incremental Semantic Knowledge Graphs
# SKG-Eval：通过增量语义知识图谱进行多轮对话的状态化评估

**Abstract:** Evaluating multi-turn dialogue systems remains challenging because response quality depends not only on the current prompt, but also on previously established entities, claims, and conversational commitments.
**摘要：** 评估多轮对话系统仍然是一项挑战，因为回复质量不仅取决于当前的提示词，还取决于先前确立的实体、主张和对话承诺。

Existing automatic evaluators, including LLM-as-a-judge frameworks and embedding-based metrics, largely rely on flat or turn-isolated representations, making them less effective at detecting long-range issues such as contradiction, topic drift, and entity inconsistency.
现有的自动评估器（包括“大模型作为裁判”框架和基于嵌入的指标）主要依赖于扁平化或轮次隔离的表示，这使得它们在检测矛盾、话题漂移和实体不一致等长程问题时效果不佳。

To address this, we propose SKG-Eval, a quasi-deterministic and interpretable framework that models dialogue as an evolving Semantic Knowledge Graph (SKG) of entities, relations, and commitments across turns.
为了解决这一问题，我们提出了 SKG-Eval，这是一个准确定且可解释的框架，它将对话建模为跨轮次的实体、关系和承诺的演进式语义知识图谱（SKG）。

The framework incrementally updates the graph through structured triple extraction and computes three complementary signals: (i) local relevance, measuring alignment with the current prompt and optional reference; (ii) historical consistency, evaluating how newly introduced information connects to prior conversational context using graph-based and embedding-driven signals; and (iii) logical coherence, assessed by a geometric contradiction engine that detects cross-turn conflicts without relying on NLI models or LLM judges.
该框架通过结构化三元组提取增量更新图谱，并计算三个互补信号：(i) 局部相关性，衡量与当前提示词及可选参考内容的对齐程度；(ii) 历史一致性，利用基于图和嵌入驱动的信号，评估新引入的信息如何与先前的对话上下文相连接；以及 (iii) 逻辑连贯性，通过几何矛盾引擎进行评估，该引擎无需依赖自然语言推理（NLI）模型或大模型裁判即可检测跨轮次冲突。

These signals are adaptively fused and aggregated into a length-invariant session score via recency-weighted trend analysis.
这些信号通过近因加权趋势分析进行自适应融合，并聚合为与长度无关的会话得分。

Across multiple benchmarks, SKG-Eval achieves higher correlation with human judgments and substantially improves detection of long-range inconsistencies in extended conversations.
在多个基准测试中，SKG-Eval 与人类判断的相关性更高，并显著提升了对长对话中长程不一致性的检测能力。

In addition, the framework produces explicit contradiction certificates and deterministic scores for fixed inputs, enabling reproducible and auditable evaluation.
此外，该框架能为固定输入生成明确的矛盾证明和确定性评分，从而实现可复现且可审计的评估。

Overall, our results suggest that structured externalized state tracking through semantic knowledge graphs provides a scalable alternative to implicit reasoning in LLM-based dialogue evaluators.
总的来说，我们的研究结果表明，通过语义知识图谱进行结构化的外部状态追踪，为基于大模型的对话评估器中的隐式推理提供了一种可扩展的替代方案。