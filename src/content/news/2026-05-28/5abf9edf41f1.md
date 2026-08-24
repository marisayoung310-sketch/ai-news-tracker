---
title: "In-Context Optimization for Retrieval-Augmented Generation: A Gradient-Descent Perspective"
originalUrl: "https://arxiv.org/abs/2605.26356"
date: "2026-05-27T23:00:03.393Z"
---

# In-Context Optimization for Retrieval-Augmented Generation: A Gradient-Descent Perspective
# 检索增强生成的上下文内优化：梯度下降视角

**Abstract:** In-context learning has recently been linked to implicit gradient descent in linear self-attention models, suggesting that context can induce a forward-pass update. Retrieval-augmented generation (RAG) also relies on context, but retrieved documents are usually treated as static evidence rather than signals for adaptation. 

**摘要：** 近期研究将上下文学习（In-context learning）与线性自注意力模型中的隐式梯度下降联系起来，表明上下文可以诱导前向传递更新。检索增强生成（RAG）同样依赖于上下文，但检索到的文档通常被视为静态证据，而非用于适应的信号。

We study RAG as an in-context optimization process. First, we show that one linear self-attention layer can implement one gradient-descent step on a unified linearized RAG objective covering both projection-based and dot-product retrieval interfaces. This gives an exact regime where retrieval-augmented prediction and in-context optimization coincide. 

我们研究了作为上下文内优化过程的 RAG。首先，我们证明了一个线性自注意力层可以在一个统一的线性化 RAG 目标上实现一步梯度下降，该目标涵盖了基于投影和点积的检索接口。这提供了一个检索增强预测与上下文内优化相吻合的精确机制。

We use this result not as a literal model of LLM computation, but as a guide for adapting the interaction between queries and retrieved evidence. We then test the boundary of this correspondence: it remains stable under controlled linear extensions, but becomes feature-distribution dependent under nonlinear architectures. 

我们使用这一结果并非将其作为大语言模型（LLM）计算的字面模型，而是作为调整查询与检索证据之间交互的指南。随后，我们测试了这种对应关系的边界：它在受控的线性扩展下保持稳定，但在非线性架构下则变得依赖于特征分布。

Finally, we turn this view into a lightweight method for frozen RAG LLMs. The method keeps the retriever and backbone fixed, and predicts a context-conditioned update to a generator-side evidence-use interface. Across seven QA benchmarks, two retrievers, and two frozen LLM backbones, this forward-only update improves a shared-interface baseline, transfers to held-out tasks, and approaches test-time gradient adaptation at much lower per-query cost.

最后，我们将这一视角转化为一种针对冻结 RAG LLM 的轻量级方法。该方法保持检索器和主干模型不变，并预测生成器端证据使用接口的上下文条件更新。在七个问答基准、两个检索器和两个冻结 LLM 主干模型的测试中，这种仅前向的更新改进了共享接口基线，能够迁移到未见过的任务，并以极低的单次查询成本接近测试时梯度适应的效果。