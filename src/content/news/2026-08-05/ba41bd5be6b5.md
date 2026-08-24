---
title: "Rethinking Pretraining for Specialized Design Data: Evidence from the JONES-19 Cultural Design Dataset"
originalUrl: "https://arxiv.org/abs/2608.00135"
date: "2026-08-04T22:39:57.690Z"
---

# Rethinking Pretraining for Specialized Design Data: Evidence from the JONES-19 Cultural Design Dataset
# 重新思考针对专业设计数据的预训练：来自 JONES-19 文化设计数据集的证据

Design and architectural archives encode expert human knowledge in graphical formats, providing a critical testbed for design-inspired Machine Learning (ML) challenges absent with typical computer vision benchmarks. 

设计和建筑档案以图形格式编码了人类专家的知识，为受设计启发的人工智能（ML）挑战提供了一个关键的测试平台，而这是典型的计算机视觉基准测试所不具备的。

Building on JONES-19, a small-size image dataset based on The Grammar of Ornament (London, 1857), we evaluate the discriminative performance of Convolutional Neural Networks (CNNs) in two model training strategies: (a) ImageNet pretraining for domain-general "visual common sense," and (b) learning from scratch on the design data in JONES-19. 

基于 JONES-19（一个基于《装饰语法》（伦敦，1857年）的小型图像数据集），我们评估了卷积神经网络（CNN）在两种模型训练策略下的判别性能：(a) 用于领域通用“视觉常识”的 ImageNet 预训练，以及 (b) 在 JONES-19 设计数据上从零开始学习。

We find that while domain-general priors improve discriminative performance, learning from scratch augmented with repeated local sampling (multi-crop) effectively recovers these gains. 

我们发现，虽然领域通用先验可以提高判别性能，但通过重复局部采样（多重裁剪）增强的从零开始学习，可以有效地弥补这些增益差距。

For highly structured design data, local design-driven representations provide sufficient foundation for learning, challenging a reliance on massive general-purpose pretraining. 

对于高度结构化的设计数据，基于局部设计的表征为学习提供了足够的基础，这挑战了对大规模通用预训练的依赖。

These findings suggest that in specialized design domains, careful curation of smaller high-quality datasets that capture empirical and formal design principles may prove more effective and informative on the nature of a particular design domain than prioritizing large-scale data collection.

这些发现表明，在专业设计领域，精心策划能够捕捉经验和形式设计原则的小型高质量数据集，可能比优先进行大规模数据收集在揭示特定设计领域的本质方面更有效、更具信息量。