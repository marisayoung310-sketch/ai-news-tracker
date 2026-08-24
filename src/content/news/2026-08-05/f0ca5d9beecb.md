---
title: "Progressive$^2$: A Teacher-Student Progressive Co-Evolving Knowledge Distillation Method for Substantial Model Compression"
originalUrl: "https://arxiv.org/abs/2608.00129"
date: "2026-08-04T22:39:55.851Z"
---

# Progressive$^2$: A Teacher-Student Progressive Co-Evolving Knowledge Distillation Method for Substantial Model Compression
# Progressive$^2$：一种用于大幅模型压缩的师生渐进式协同进化知识蒸馏方法

**Abstract:** Knowledge distillation (KD) is a widely utilized technique for transferring knowledge from a large model (the teacher) to a smaller model (the student). Owing to its flexibility and broad applicability, KD has been extensively applied in the compression of server-side models to meet the Quality of Service (QoS) requirements of client users.

**摘要：** 知识蒸馏（KD）是一种广泛使用的技术，用于将知识从大模型（教师模型）迁移到较小的模型（学生模型）。由于其灵活性和广泛的适用性，KD 已被广泛应用于服务端模型的压缩，以满足客户端用户的服务质量（QoS）需求。

Despite significant advancements, the performance of distillation is substantially compromised when a large disparity exists between the capabilities of the server and the requirements of the client. To alleviate this problem, we propose a novel distillation approach, named Progressive$^2$, which operates through the combination of a progressively stronger teacher and a progressively smaller student.

尽管取得了显著进展，但当服务器的能力与客户端的需求之间存在巨大差距时，蒸馏的性能会受到严重影响。为了缓解这一问题，我们提出了一种名为 Progressive$^2$ 的新型蒸馏方法，该方法通过结合“渐进增强的教师模型”和“渐进缩小的学生模型”来运作。

On the side of the teacher, rather than involving all layers simultaneously, we progressively select additional layers for distillation following a raw-to-rich semantic progression, establishing a systematic learning curriculum. Furthermore, we design a teacher-side multi-feature fusion adapter for the teacher to improve training stability, which is theoretically supported by the framework of Lipschitz continuity.

在教师端，我们不再同时涉及所有层，而是遵循从原始语义到丰富语义的渐进过程，逐步选择额外的层进行蒸馏，从而建立了一套系统的学习课程。此外，我们为教师模型设计了一个教师端多特征融合适配器以提高训练稳定性，该设计在理论上得到了 Lipschitz 连续性框架的支持。

On the side of the student, rather than directly training a tiny model, we gradually reduce the size of the network to facilitate an iterative co-evolution with the teacher. Progressive$^2$ serves as a flexible framework; the progressive strategy of the teacher can be deployed independently to achieve an optimal balance between accuracy and training efficiency, while the joint integration of the teacher and the student yields further improvements in overall performance.

在学生端，我们不再直接训练一个微型模型，而是逐渐减小网络规模，以促进其与教师模型的迭代协同进化。Progressive$^2$ 作为一个灵活的框架；教师的渐进策略可以独立部署，以在准确性和训练效率之间实现最佳平衡，而教师与学生的联合集成则能进一步提升整体性能。