---
title: "Where Physics Meets Privacy: Federated PINNs for Privacy-Preserving Brain Tumor Biomechanical Modeling"
originalUrl: "https://arxiv.org/abs/2607.26207"
date: "2026-07-30T22:37:51.624Z"
---

# Where Physics Meets Privacy: Federated PINNs for Privacy-Preserving Brain Tumor Biomechanical Modeling
# 当物理学遇上隐私保护：用于脑肿瘤生物力学建模的联邦物理信息神经网络 (PINNs)

**Abstract:** Brain tumors such as glioma, meningioma, and pituitary adenoma alter the mechanical behavior of soft brain tissue, yet common diagnostic methods rely on static imaging that cannot capture tumor growth, tissue displacement, or changes in stiffness over time. 

**摘要：** 胶质瘤、脑膜瘤和垂体腺瘤等脑肿瘤会改变脑软组织的机械行为，然而常见的诊断方法依赖于静态成像，无法捕捉肿瘤生长、组织位移或随时间变化的硬度改变。

Deep learning models for this task typically require pooling patient data at one site, which conflicts with privacy rules such as GDPR and HIPAA and limits generalization across institutions, a challenge that is pronounced in neuro-oncology given patient diversity. 

用于此类任务的深度学习模型通常需要将患者数据汇集到一个中心，这与 GDPR 和 HIPAA 等隐私法规相冲突，并限制了跨机构的泛化能力；考虑到患者的多样性，这一挑战在神经肿瘤学领域尤为突出。

This study presents a federated physics-informed neural network combining federated learning with a physics-informed loss built on the equations of linear elasticity. 

本研究提出了一种联邦物理信息神经网络（Federated PINNs），将联邦学习与基于线性弹性方程构建的物理信息损失函数相结合。

Three simulated clinical sites each train a local network on patient-specific MRI data using a physics-informed loss, and only model weights are shared with a central server through the FedAvg protocol over one hundred rounds, keeping raw data at its site of origin. 

三个模拟临床站点分别使用物理信息损失函数，在患者特定的 MRI 数据上训练本地网络；通过 FedAvg 协议，仅模型权重在一百轮训练中与中央服务器共享，从而确保原始数据保留在源站点。

The federated model reached an overall accuracy of 91.4%, against 90.0% for a non-federated baseline trained on pooled data, an average AUC of 0.985 across tumor classes, and a rise in pituitary tumor accuracy from 85.6% to 94.5%. 

该联邦模型达到了 91.4% 的总体准确率，而基于汇集数据训练的非联邦基准模型准确率为 90.0%；其在各类肿瘤中的平均 AUC 为 0.985，垂体肿瘤的准确率从 85.6% 提升至 94.5%。

Training produced smooth, divergence-free displacement fields consistent with expected tissue deformation, showing that federated training can be paired with physics-based constraints without a meaningful loss in performance.

训练过程产生了平滑且无散度的位移场，这与预期的组织形变一致，表明联邦学习可以与基于物理的约束相结合，且不会造成明显的性能损失。