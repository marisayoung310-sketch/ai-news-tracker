---
title: "Predict and Reconstruct: Joint Objectives for Self-Supervised Language Representation Learning"
originalUrl: "https://arxiv.org/abs/2606.05173"
date: "2026-06-05T22:45:23.481Z"
---

# Predict and Reconstruct: Joint Objectives for Self-Supervised Language Representation Learning
# 预测与重构：自监督语言表征学习的联合目标

**Abstract:** Masked language modelling (MLM) has been the dominant pre-training objective for text encoders since BERT, yet it encourages representations that are strongly anchored to surface-form token identity rather than deeper semantic structure.
**摘要：** 自 BERT 问世以来，掩码语言模型（MLM）一直是文本编码器预训练的主流目标。然而，它所生成的表征往往过度依赖于表层的词元（token）标识，而非更深层的语义结构。

Inspired by the success of Joint Embedding Predictive Architectures (JEPA) (LeCun, 2022) in vision and audio, we propose a hybrid pre-training objective that combines a JEPA-style latent-space prediction loss with a standard MLM objective over a single shared encoder. A learnable scalar parameter continuously balances the two objectives during training.
受联合嵌入预测架构（JEPA）（LeCun, 2022）在视觉和音频领域取得成功的启发，我们提出了一种混合预训练目标，将 JEPA 风格的潜在空间预测损失与标准的 MLM 目标结合在同一个共享编码器中。在训练过程中，一个可学习的标量参数会持续平衡这两个目标。

We pre-train both a hybrid model and a pure-MLM baseline on English Wikipedia using identical architectures and compute budgets (NVIDIA H100). Extensive representation analysis across five GLUE benchmarks (SST-2, MRPC, MNLI, CoLA, STS-B) using four pooling strategies reveals that the hybrid encoder produces significantly more uniform embeddings (uniformity less than -0.16 vs -0.05 for MLM), exhibits richer spectral geometry under max pooling, encodes less surface-level lexical information, and achieves a better semantic-to-lexical balance.
我们使用相同的架构和计算资源（NVIDIA H100），在英文维基百科数据集上分别预训练了混合模型和纯 MLM 基准模型。通过在五个 GLUE 基准测试（SST-2、MRPC、MNLI、CoLA、STS-B）上使用四种池化策略进行的广泛表征分析表明，混合编码器生成的嵌入分布显著更均匀（均匀度小于 -0.16，而 MLM 为 -0.05），在最大池化下表现出更丰富的谱几何特性，编码了更少的表层词汇信息，并实现了更好的语义与词汇平衡。

Despite similar linear-probe downstream accuracy, the geometric differences are consistent and significant, suggesting that the JEPA predictive objective reshapes the latent space in ways that standard accuracy metrics alone cannot capture.
尽管在线性探测（linear-probe）的下游任务准确率上表现相似，但两者在几何结构上的差异是一致且显著的。这表明 JEPA 预测目标以一种标准准确率指标无法捕捉的方式重塑了潜在空间。