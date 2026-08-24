---
title: "Generic Triple-Latent Compression with Gated Associative Retrieval"
originalUrl: "https://arxiv.org/abs/2606.05175"
date: "2026-06-05T22:45:27.312Z"
---

# Generic Triple-Latent Compression with Gated Associative Retrieval
# 通用三重潜在压缩与门控关联检索

**Abstract:** We study generic triple-latent sequence models that maintain a running token state and compressed pair-memory pathway to capture higher-order token interactions without benchmark-specific parsing.

**摘要：** 我们研究了通用三重潜在（triple-latent）序列模型，该模型通过维护一个运行中的标记状态（token state）和压缩的成对记忆路径（pair-memory pathway），在无需针对特定基准进行解析的情况下，捕捉高阶标记交互。

**Abstract (continued):** The triple-latent family improves a small Transformer baseline on byte-level WikiText-2 and on a tokenizer-based MiniMind language-model benchmark, while a recall-focused gated key-value retrieval extension improves associative recall but remains seed-sensitive and much slower in the current reference implementation.

**摘要（续）：** 三重潜在模型系列在字节级 WikiText-2 和基于分词器的 MiniMind 语言模型基准测试中，均优于小型 Transformer 基准模型；同时，一种侧重于召回的门控键值（key-value）检索扩展虽然提升了关联召回能力，但在当前的参考实现中仍存在对随机种子敏感且运行速度较慢的问题。