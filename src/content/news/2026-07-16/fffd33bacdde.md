---
title: "GenDiff: A Dose and Anatomy Aware Diffusion Model with Structural Prior Refinement for Low-Dose CT Reconstruction and Generalization"
originalUrl: "https://arxiv.org/abs/2607.11941"
date: "2026-07-15T22:26:01.437Z"
---

# GenDiff: A Dose and Anatomy Aware Diffusion Model with Structural Prior Refinement for Low-Dose CT Reconstruction and Generalization

**GenDiff：一种用于低剂量 CT 重建与泛化的结构先验细化剂量与解剖感知扩散模型**

***

Computed tomography (CT) is a critical imaging modality for clinical diagnosis, but reducing radiation dose inevitably introduces severe noise and structured artifacts that degrade image quality. 

计算机断层扫描（CT）是临床诊断中至关重要的成像方式，但降低辐射剂量不可避免地会引入严重的噪声和结构性伪影，从而降低图像质量。

Existing deep learning-based low-dose CT (LDCT) reconstruction methods are typically optimized for fixed dose levels or specific anatomical regions, limiting their robustness and generalization in realistic clinical settings. 

现有的基于深度学习的低剂量 CT（LDCT）重建方法通常针对固定的剂量水平或特定的解剖区域进行优化，这限制了它们在实际临床环境中的鲁棒性和泛化能力。

We propose GenDiff, a generalizable diffusion-based framework for LDCT reconstruction that jointly models continuous radiation dose and anatomical information within a unified reconstruction network. 

我们提出了 GenDiff，这是一个用于 LDCT 重建的可泛化扩散框架，它在一个统一的重建网络中联合建模了连续辐射剂量和解剖信息。

The proposed framework integrates a Dose-Anatomy Encoder to learn acquisition-aware embeddings, a dose- and anatomy-conditioned cold diffusion backbone for iterative refinement, a physics-consistency update to enforce fidelity to the CT forward model, and a Structural Prior Refinement Module (SPRM) that preserves anatomical structures while suppressing dose-dependent artifacts. 

该框架集成了剂量-解剖编码器以学习采集感知嵌入，一个用于迭代细化的剂量与解剖条件冷扩散主干，一个用于强制执行 CT 正向模型保真度的物理一致性更新模块，以及一个在抑制剂量相关伪影的同时保留解剖结构的结构先验细化模块（SPRM）。

Extensive experiments on multi-anatomy clinical datasets, including unseen ultra-low-dose conditions as well as out-of-distribution phantom and animal datasets, demonstrate that GenDiff consistently outperforms state-of-the-art convolutional neural network and diffusion-based reconstruction methods. 

在多解剖临床数据集（包括未见过的超低剂量条件以及分布外模体和动物数据集）上进行的广泛实验表明，GenDiff 的表现始终优于最先进的卷积神经网络和基于扩散的重建方法。

The proposed approach achieves superior reconstruction quality while maintaining strong robustness across different dose levels, anatomical regions, and acquisition domains, making it a promising solution for practical low-dose CT imaging.

该方法在实现卓越重建质量的同时，在不同剂量水平、解剖区域和采集域之间保持了强大的鲁棒性，使其成为实际低剂量 CT 成像的一种极具前景的解决方案。