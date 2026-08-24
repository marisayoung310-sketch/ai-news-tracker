---
title: "MLLP-VRAIN UPV system for the IWSLT 2026 Simultaneous Speech Translation task"
originalUrl: "https://arxiv.org/abs/2606.17255"
date: "2026-06-17T23:00:41.098Z"
---

# MLLP-VRAIN UPV system for the IWSLT 2026 Simultaneous Speech Translation task
# MLLP-VRAIN UPV 系统：IWSLT 2026 同声语音翻译任务

**Abstract:** This work describes the participation of the MLLP-VRAIN research group in the shared task of the IWSLT 2026 Simultaneous Speech Translation track. Our submission utilizes the recently released Parakeet and Qwen 3.5 models to create a robust, cascaded solution for long-form SimulST through the use of adaptive "black-box" policies. We explore relaxations of these policies to achieve better quality-latency trade-offs.

**摘要：** 本文介绍了 MLLP-VRAIN 研究小组参与 IWSLT 2026 同声语音翻译（SimulST）赛道的共享任务情况。我们的提交方案利用了近期发布的 Parakeet 和 Qwen 3.5 模型，通过采用自适应“黑盒”策略，为长文本 SimulST 构建了一个稳健的级联解决方案。我们探索了这些策略的放宽机制，以实现更好的质量与延迟权衡。

Compared to last year, we participate on all language directions. In addition to this, for the En$\rightarrow${De, It, Zh} directions we also participate in this year's new context track employing a combination of ASR word-boosting and a RAG mechanism of offline pre-translated exemplars to guide generation and enrich our system with domain-specific context. Finally, we provide a detailed latency analysis of our system.

与去年相比，我们参与了所有语言方向的任务。此外，针对 En$\rightarrow${De, It, Zh}（英译德、意、中）方向，我们还参加了今年新增的上下文赛道，采用了 ASR 词汇增强与离线预翻译示例 RAG（检索增强生成）机制相结合的方法，以引导生成过程并利用领域特定上下文丰富我们的系统。最后，我们对系统进行了详细的延迟分析。

Compared to last year, results on the MCIF En$\rightarrow$De test set shows a substantial quality improvement of +5.82 XCOMET-XL. Our context track processing further improves performance by +1.03.

与去年相比，MCIF En$\rightarrow$De 测试集的结果显示质量有显著提升，XCOMET-XL 指标提高了 +5.82。我们的上下文赛道处理流程使性能进一步提升了 +1.03。

***

**Authors:** Jorge Iranzo-Sánchez, Gerard Mas-Mollà, Adrià Giménez, Jorge Civera, Albert Sanchis, Alfons Juan
**作者：** Jorge Iranzo-Sánchez, Gerard Mas-Mollà, Adrià Giménez, Jorge Civera, Albert Sanchis, Alfons Juan

**Subjects:** Computation and Language (cs.CL); Artificial Intelligence (cs.AI)
**学科：** 计算与语言 (cs.CL)；人工智能 (cs.AI)

**Cite as:** arXiv:2606.17255 [cs.CL]
**引用格式：** arXiv:2606.17255 [cs.CL]