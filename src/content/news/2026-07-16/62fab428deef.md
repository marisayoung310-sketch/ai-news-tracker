---
title: "Transforming LLMs into Efficient Cross-Encoders via Knowledge Distillation for RAG Reranking"
originalUrl: "https://arxiv.org/abs/2607.11933"
date: "2026-07-15T22:22:27.829Z"
---

# Transforming LLMs into Efficient Cross-Encoders via Knowledge Distillation for RAG Reranking
# 通过知识蒸馏将大语言模型转化为高效的 RAG 重排序交叉编码器

**Abstract:** Cross-encoders achieve high reranking accuracy in Retrieval-Augmented Generation (RAG) pipelines but impose quadratic inference costs that limit real-time deployment. We address this by fine-tuning LLaMA 3 (8B) as a drop-in reranker using a two-stage pipeline: supervised fine-tuning on a custom query-document relevance dataset via the Unsloth framework with LoRA adapters, followed by 4-bit quantization for efficient inference.

**摘要：** 交叉编码器（Cross-encoders）在检索增强生成（RAG）流程中能实现极高的重排序准确率，但其带来的二次方推理成本限制了实时部署。为了解决这一问题，我们通过两阶段流程将 LLaMA 3 (8B) 微调为即插即用的重排序器：首先利用 Unsloth 框架结合 LoRA 适配器，在自定义的查询-文档相关性数据集上进行监督微调；随后通过 4-bit 量化实现高效推理。

The resulting model replaces the cross-encoder in a dual-retriever RAG pipeline combining BM25 and dense vector search. Evaluated on a domain-specific question-answering benchmark using the RAGAS framework, our fine-tuned LLaMA 3 reranker achieves gains of 14% in answer relevancy, 16% in context precision, 19% in answer similarity, and 21% in answer correctness over the cross-encoder baseline, while reducing inference overhead through 4-bit quantization.

该模型在结合了 BM25 和稠密向量搜索的双检索器 RAG 流程中替代了原有的交叉编码器。在基于 RAGAS 框架的特定领域问答基准测试中，我们微调后的 LLaMA 3 重排序器表现优异：与交叉编码器基准相比，答案相关性提升了 14%，上下文精确度提升了 16%，答案相似度提升了 19%，答案正确性提升了 21%，同时通过 4-bit 量化显著降低了推理开销。

These results demonstrate that instruction-tuned LLMs can be adapted into accurate, efficient rerankers without the quadratic complexity of traditional cross-encoders.

这些结果表明，经过指令微调的大语言模型可以被改造为准确且高效的重排序器，且无需承担传统交叉编码器所带来的二次方复杂度。

***

**Paper Details:**
*   **Authors:** Shreeya Dasa Lakshminath, Shubhan S
*   **arXiv ID:** 2607.11933
*   **Subjects:** Computation and Language (cs.CL); Information Retrieval (cs.IR); Machine Learning (cs.LG)

**论文详情：**
*   **作者：** Shreeya Dasa Lakshminath, Shubhan S
*   **arXiv ID:** 2607.11933
*   **学科分类：** 计算与语言 (cs.CL)；信息检索 (cs.IR)；机器学习 (cs.LG)