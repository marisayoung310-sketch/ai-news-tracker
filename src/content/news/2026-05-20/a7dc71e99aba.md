---
title: "TTE-Flash: Accelerating Reasoning-based Multimodal Representations via Think-Then-Embed Tokens"
originalUrl: "https://arxiv.org/abs/2605.16638"
date: "2026-05-19T22:48:46.061Z"
---

# TTE-Flash: Accelerating Reasoning-based Multimodal Representations via Think-Then-Embed Tokens

**TTE-Flash：通过“先思考后嵌入”标记加速基于推理的多模态表征**

---

**Abstract:** Recent research has demonstrated that Universal Multimodal Embedding (UME) benefits significantly from Chain-of-Thought (CoT) reasoning. In this paradigm, a generative model produces explicit reasoning traces for a multimodal query, with the final representation extracted from an `<eos>` embedding token attending to both the query and the reasoning. Despite its effectiveness, the computational overhead of generating explicit CoT traces is often prohibitive.

**摘要：** 近期研究表明，通用多模态嵌入（UME）能从思维链（CoT）推理中显著获益。在这种范式下，生成模型会针对多模态查询产生显式的推理轨迹，最终的表征则通过关注查询内容和推理过程的 `<eos>` 嵌入标记提取。尽管这种方法效果显著，但生成显式 CoT 轨迹所带来的计算开销往往令人望而却步。

In this work, we propose replacing explicit CoT with latent think tokens, which are interpreted as latent variables that can produce explicit CoT traces as observed variables. By optimizing think tokens using CoT generation loss and subsequent embedding tokens using contrastive loss, we produce high-performance, reasoning-aware representations at a constant inference cost.

在这项工作中，我们提出用潜在的“思考标记”（think tokens）取代显式 CoT。这些标记被解释为潜在变量，能够生成作为观测变量的显式 CoT 轨迹。通过利用 CoT 生成损失优化思考标记，并利用对比损失优化后续的嵌入标记，我们在保持恒定推理成本的同时，实现了高性能且具备推理意识的表征。

Our study investigates two key architectural designs: 1) how think and embeddings tokens should be extracted from the same LLM backbone. 2) how the tokens should be trained as two dependent tasks. We introduce TTE-Flash-2B, a reasoning-aware multimodal representation model that outperforms its explicit-CoT counterpart on the MMEB-v2 benchmark, while producing latent think tokens that are interpretable both textually and visually.

我们的研究探讨了两个关键的架构设计：1）如何从同一个大语言模型（LLM）主干中提取思考标记和嵌入标记；2）如何将这些标记作为两个相关联的任务进行训练。我们推出了 TTE-Flash-2B，这是一种具备推理意识的多模态表征模型。在 MMEB-v2 基准测试中，该模型的表现优于其显式 CoT 对标模型，同时其产生的潜在思考标记在文本和视觉上均具有可解释性。

Furthermore, zero-shot evaluation across 15 video datasets reveals scaling behavior as the number of think tokens increases, and motivating a pilot study of adaptive think budget allocation based on task requirements.

此外，在 15 个视频数据集上的零样本评估显示，随着思考标记数量的增加，模型表现出良好的扩展性，这也促使我们开展了一项基于任务需求进行自适应思考预算分配的初步研究。