---
title: "Dr-DCI: Scaling Direct Corpus Interaction via Dynamic Workspace Expansion"
originalUrl: "https://arxiv.org/abs/2606.14885"
date: "2026-06-16T23:03:38.044Z"
---

# Dr-DCI: Scaling Direct Corpus Interaction via Dynamic Workspace Expansion
# Dr-DCI：通过动态工作区扩展实现大规模直接语料库交互

**Abstract:** Agentic search over large corpora relies on retriever-mediated interfaces (e.g., BM25 or ColBERT) for scalable candidate discovery. While effective at ranking relevant documents, these interfaces expose evidence only as ranked results or bounded document views, limiting agents' ability to reorganize material and verify constraints across documents.

**摘要：** 在大型语料库上的智能体搜索通常依赖于检索器中介接口（如 BM25 或 ColBERT）来实现可扩展的候选文档发现。虽然这些接口在对相关文档进行排序方面非常有效，但它们仅以排序结果或有限的文档视图形式呈现证据，这限制了智能体重新组织材料以及跨文档验证约束的能力。

Direct Corpus Interaction (DCI) addresses this limitation by exposing shell-executable corpus operations for flexible search, filtering, comparison, and verification. However, full-corpus terminal commands become slow and unstable as the corpus grows, degrading performance and efficiency.

直接语料库交互（DCI）通过提供可执行的 Shell 语料库操作来解决这一局限性，从而实现灵活的搜索、过滤、比较和验证。然而，随着语料库规模的扩大，针对全库的终端命令会变得缓慢且不稳定，从而降低了性能和效率。

We introduce DR-DCI, a retriever-steered DCI framework that treats retrieval as an agent-callable action for expanding a local workspace. Rather than operating directly over the full corpus, the agent dynamically pulls relevant documents into an evolving workspace and conducts DCI operations within it. This design combines retriever-level recall with DCI-style precision: retrieval keeps exploration scalable, while DCI preserves the local operations needed for effective evidence resolution.

我们引入了 DR-DCI，这是一个由检索器引导的 DCI 框架，它将检索视为智能体可调用的动作，用于扩展本地工作区。智能体不再直接对整个语料库进行操作，而是动态地将相关文档拉入一个不断演进的工作区，并在其中执行 DCI 操作。这种设计结合了检索级的召回率和 DCI 级的精确度：检索保持了探索的可扩展性，而 DCI 则保留了有效证据解析所需的本地操作能力。

Experiments show that DR-DCI is both effective and efficient across scales. On Browsecomp-Plus, DR-DCI reaches 71.2% accuracy, improving over raw DCI and ablated variants by up to 8.3 points while reducing tool usage, wall time, and estimated cost. With workspace-preserving context reset, accuracy further improves to 73.3%.

实验表明，DR-DCI 在不同规模下均表现出高效性。在 Browsecomp-Plus 基准测试中，DR-DCI 的准确率达到了 71.2%，较原始 DCI 及其消融变体提升了高达 8.3 个百分点，同时减少了工具使用量、运行时间和预估成本。通过保留工作区的上下文重置机制，准确率进一步提升至 73.3%。

In corpus-scaling experiments, DR-DCI remains effective from 100K to 10M documents, whereas raw DCI becomes unstable and BM25 performs substantially worse. DR-DCI also scales to a 20M-scale file-per-document Wiki-18 QA setting, achieving an average score of 63.0 across six benchmarks and outperforming retrieval-based and trained search-agent baselines. Ablation analysis further shows that ranked previews and inter-document DCI are key to performance.

在语料库扩展实验中，DR-DCI 在 10 万到 1000 万篇文档的规模下依然保持有效，而原始 DCI 变得不稳定，BM25 的表现则大幅下降。DR-DCI 还能扩展到 2000 万规模的“每文档一文件” Wiki-18 问答场景，在六项基准测试中取得了 63.0 的平均分，优于基于检索和经过训练的搜索智能体基线。消融分析进一步表明，排序预览和跨文档 DCI 是实现高性能的关键。