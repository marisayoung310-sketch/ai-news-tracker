---
title: "DAStatFormer: A Hybrid Multibranch Transformer with Statistical Feature Integration for DAS-Based Pattern Recognitions"
originalUrl: "https://arxiv.org/abs/2606.00081"
date: "2026-06-02T23:22:02.657Z"
---

# DAStatFormer: A Hybrid Multibranch Transformer with Statistical Feature Integration for DAS-Based Pattern Recognitions
# DAStatFormer：一种用于基于 DAS 模式识别的统计特征集成混合多分支 Transformer

**Abstract:** Distributed Acoustic Sensing (DAS) enables large-scale monitoring through optical fibers, but its high dimensionality and complex spatio-temporal patterns make event classification demanding. Existing deep learning approaches—CNNs, recurrent models, and Transformer variants—either fail to capture long-range dependencies or require processing raw DAS matrices at prohibitive cost.

**摘要：** 分布式光纤声传感（DAS）通过光纤实现大规模监测，但其高维特性和复杂的时空模式使得事件分类极具挑战性。现有的深度学习方法（如 CNN、循环模型和 Transformer 变体）要么无法捕捉长距离依赖关系，要么需要以极高的成本处理原始 DAS 矩阵。

We propose DAStatFormer, a hybrid multibranch Transformer that combines compact multidomain statistical features with Gated Transformer Networks. Instead of raw signals, we extract 24 ANOVA-selected attributes per channel from the temporal, waveform, and spectral domains, reducing data size by orders of magnitude while preserving discriminative information.

我们提出了 DAStatFormer，这是一种将紧凑的多域统计特征与门控 Transformer 网络相结合的混合多分支 Transformer。我们不再直接使用原始信号，而是从时间、波形和频谱域中为每个通道提取 24 个经 ANOVA（方差分析）筛选的属性，在保留判别信息的同时，将数据规模降低了几个数量级。

Each domain is processed via dedicated step-wise and channel-wise attention branches, fused by an adaptive gating mechanism. Experiments on the open $\Phi$-OTDR benchmark and a real-scenario DAS dataset show that DAStatFormer achieves up to 99.4% accuracy and near-perfect real-world performance, while using significantly fewer parameters and lower inference cost than models such as DASFormer and DeepViT.

每个域都通过专门的步进式（step-wise）和通道式（channel-wise）注意力分支进行处理，并通过自适应门控机制进行融合。在开放的 $\Phi$-OTDR 基准测试和真实场景 DAS 数据集上的实验表明，DAStatFormer 的准确率高达 99.4%，并实现了近乎完美的实际应用性能，同时相比 DASFormer 和 DeepViT 等模型，其参数量更少，推理成本更低。

These results demonstrate its suitability for scalable, real-time DAS-based monitoring. We release our code at this https URL.

这些结果证明了该模型适用于可扩展的实时 DAS 监测。我们已在以下链接发布了代码：[链接地址]。