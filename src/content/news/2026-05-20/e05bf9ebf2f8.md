---
title: "Introducing the Ettin Reranker Family"
originalUrl: "https://huggingface.co/blog/ettin-reranker"
date: "2026-05-19T22:48:18.353Z"
---

# Introducing the Ettin Reranker Family
# 介绍 Ettin 重排序模型家族

TL;DR: Today I'm releasing six new Sentence Transformers CrossEncoder rerankers, state-of-the-art at their respective sizes, built on top of the Ettin ModernBERT encoders, together with the data and full training recipe that produced them:
简而言之：今天我发布了六款全新的 Sentence Transformers CrossEncoder 重排序模型。它们基于 Ettin ModernBERT 编码器构建，在各自的尺寸级别上均达到了顶尖水平。同时，我一并公开了用于训练这些模型的数据及完整的训练方案：

* cross-encoder/ettin-reranker-17m-v1
* cross-encoder/ettin-reranker-32m-v1
* cross-encoder/ettin-reranker-68m-v1
* cross-encoder/ettin-reranker-150m-v1
* cross-encoder/ettin-reranker-400m-v1
* cross-encoder/ettin-reranker-1b-v1

The models were trained with a distillation recipe: pointwise MSE on mixedbread-ai/mxbai-rerank-large-v2 scores over cross-encoder/ettin-reranker-v1-data, which is a subset of lightonai/embeddings-pre-training mixed with a reranked subset of lightonai/embeddings-fine-tuning.
这些模型采用了蒸馏训练方案：在 `cross-encoder/ettin-reranker-v1-data` 数据集上，针对 `mixedbread-ai/mxbai-rerank-large-v2` 的分数进行逐点（pointwise）MSE 损失训练。该数据集由 `lightonai/embeddings-pre-training` 的子集与经过重排序的 `lightonai/embeddings-fine-tuning` 子集混合而成。

Our six rerankers paired with google/embeddinggemma-300m on MTEB(eng, v2) Retrieval. See Results for five more embedder pairings. If you're new to rerankers and want the "why" first, jump to What is a reranker, and why pair one with an embedder?. If you just want to plug a model in, jump to Usage. If you want to train your own, jump to Training.
我们的六款重排序模型与 `google/embeddinggemma-300m` 搭配，在 MTEB(eng, v2) 检索任务上进行了测试。更多嵌入模型搭配的测试结果请参阅“结果”部分。如果你是重排序模型的新手，想先了解“为什么”，请跳转至“什么是重排序模型，以及为什么要将其与嵌入模型搭配使用？”。如果你只想直接使用模型，请跳转至“用法”。如果你想训练自己的模型，请跳转至“训练”。

I bootstrapped the training recipe below with the new train-sentence-transformers Agent Skill shipped in Sentence Transformers v5.5.0. Install it with `hf skills add train-sentence-transformers [--global] [--claude]` and ask your AI coding agent (Claude Code, Codex, Cursor, Gemini CLI, ...) to fine-tune a SentenceTransformer, CrossEncoder, or SparseEncoder model on your data.
我利用 Sentence Transformers v5.5.0 中新推出的 `train-sentence-transformers` Agent Skill 引导了下方的训练方案。你可以通过 `hf skills add train-sentence-transformers [--global] [--claude]` 进行安装，并让你的 AI 编程助手（如 Claude Code、Codex、Cursor、Gemini CLI 等）在你的数据上微调 SentenceTransformer、CrossEncoder 或 SparseEncoder 模型。

---

### What is a reranker, and why pair one with an embedder?
### 什么是重排序模型，以及为什么要将其与嵌入模型搭配使用？

A reranker (a.k.a. pointwise cross-encoder) is a neural model that takes a (query, document) pair and outputs a single relevance score. Unlike an embedding model, which encodes the query and document separately and computes their similarity from the two embedding vectors, a reranker lets the two texts attend to each other through every transformer layer.
重排序模型（又称逐点交叉编码器）是一种神经网络模型，它接收一对（查询，文档）并输出一个相关性分数。与嵌入模型不同——嵌入模型分别对查询和文档进行编码，并根据两个嵌入向量计算相似度——重排序模型允许两段文本在每一层 Transformer 中进行相互注意力（attention）计算。

That joint encoding is more accurate but also more expensive: the model has to be run once per (query, document) pair rather than once per text. Because cross-encoders are too expensive to run over a full corpus, the common production pattern is retrieve-then-rerank: a fast embedding model retrieves the top-K candidates (cheap), then a cross-encoder re-orders just those K with high accuracy.
这种联合编码方式更准确，但计算成本也更高：模型必须为每一对（查询，文档）运行一次，而不是为每段文本运行一次。由于交叉编码器在整个语料库上运行的成本过高，常见的生产模式是“先检索后重排序”：先由快速的嵌入模型检索出 Top-K 个候选结果（成本低），然后由交叉编码器对这 K 个结果进行高精度的重新排序。

The total cost stays bounded while the final ranking is much closer to what an exhaustive cross-encoder pass would produce. Throughout this blogpost I'll use "reranker" and "cross-encoder" interchangeably.
这样既能控制总成本，又能使最终排序结果非常接近穷举式交叉编码器的效果。在本文中，我将交替使用“重排序模型”和“交叉编码器”这两个术语。

---

### Usage
### 用法

The released models are normal Sentence Transformers CrossEncoder models, so you can use them with just 3 lines of code:
本次发布的模型是标准的 Sentence Transformers CrossEncoder 模型，因此你只需 3 行代码即可使用：

```python
from sentence_transformers import CrossEncoder
model = CrossEncoder("cross-encoder/ettin-reranker-32m-v1")
scores = model.predict([
    ("Where was Apple founded?", "Apple Inc. was founded in Cupertino, California in 1976 by Steve Jobs, Steve Wozniak, and Ronald Wayne."),
    ("Where was Apple founded?", "The Fuji apple is an apple cultivar developed in the late 1930s and brought to market in 1962."),
])
print(scores) # [11.393298 2.968891] <- larger means more relevant
```

For a query and a list of candidates, you can also use `rank` to get back sorted indices and scores:
对于一个查询和一组候选文档，你也可以使用 `rank` 方法来获取排序后的索引和分数：

```python
ranked = model.rank(
    query="Which planet is known as the Red Planet?",
    documents=[
        "Venus is often called Earth's twin because of its similar size and proximity.",
        "Mars, known for its reddish appearance, is often referred to as the Red Planet.",
        "Jupiter, the largest planet in our solar system, has a prominent red spot.",
        "Saturn, famous for its rings, is sometimes mistaken for the Red Planet.",
    ],
    top_k=4,
    return_documents=True,
)

for r in ranked:
    print(f"({r['score']:.2f}): {r['text']}")
```

You can swap `cross-encoder/ettin-reranker-32m-v1` for any other size to trade quality for speed. All six accept up to 8K tokens of context (useful for long-document reranking) thanks to ModernBERT's long-context pre-training.
你可以将 `cross-encoder/ettin-reranker-32m-v1` 替换为其他尺寸的模型，以在质量和速度之间进行权衡。得益于 ModernBERT 的长上下文预训练，所有六款模型均支持高达 8K token 的上下文（这对长文档重排序非常有用）。

It is recommended to install kernels and set `model_kwargs={"dtype": "bfloat16", "attn_implementation": "flash_attention_2"}` for the highest throughput. See the Speed section below for more details, but in general you can expect a 1.7x-8.3x speedup over default loading depending on model size and sequence length.
建议安装相关内核并设置 `model_kwargs={"dtype": "bfloat16", "attn_implementation": "flash_attention_2"}` 以获得最高吞吐量。更多详情请参阅下方的“速度”部分，但通常情况下，根据模型大小和序列长度的不同，你可以预期比默认加载方式快 1.7 到 8.3 倍。

```python
from sentence_transformers import CrossEncoder
model = CrossEncoder(
    "cross-encoder/ettin-reranker-32m-v1",
    model_kwargs={"dtype": "bfloat16", "attn_implementation": "flash_attention_2"},
)
```

---

### End-to-end retrieve-then-rerank pipeline
### 端到端“先检索后重排序”流水线

A complete example with a fast embedder for retrieval and the reranker for the final ordering:
以下是一个完整的示例，结合了用于检索的快速嵌入模型和用于最终排序的重排序模型：

```python
from sentence_transformers import SentenceTransformer, CrossEncoder

# Fast retrieval with a static embedder (sub-millisecond on CPU per query)
# 使用静态嵌入模型进行快速检索（CPU 上每查询耗时不到 1 毫秒）
embedder = SentenceTransformer("sentence-transformers/static-retrieval-mrl-en-v1")
reranker = CrossEncoder("cross-encoder/ettin-reranker-68m-v1")

corpus = [
    "Apple Inc. was founded in Cupertino, California in 1976 by Steve Jobs, Steve Wozniak, and Ronald Wayne.",
    "The Fuji apple is an apple cultivar developed in the late 1930s.",
    "Steve Jobs introduced the iPhone in 2007 at Macworld.",
    "Macintosh computers were sold by Apple from 1984 onward.",
    # ... thousands or millions more in production
]

query = "Where was Apple founded?"
# Step 1: encode + ...
# 第一步：编码 + ...
```