---
title: "Motion Artifact-Aware Self-Supervised Representation Learning for 3D Brain MRI Motion Artifact Reduction"
originalUrl: "https://arxiv.org/abs/2608.10170"
date: "2026-08-12T22:30:16.611Z"
---

# Motion Artifact-Aware Self-Supervised Representation Learning for 3D Brain MRI Motion Artifact Reduction
### 用于三维脑部核磁共振成像运动伪影校正的运动伪影感知自监督表征学习

**Abstract:** Patient motion remains a source of image degradation in brain MRI, leading to signal loss, blurring, and geometric distortion that compromise quantitative analysis. Existing deep learning methods for motion correction typically rely on paired clean-corrupted data or k-space acquisitions, which are rarely available in clinical settings.

**摘要：** 患者的运动仍然是脑部核磁共振成像（MRI）图像质量下降的主要来源，会导致信号丢失、模糊和几何畸变，从而影响定量分析。现有的用于运动校正的深度学习方法通常依赖于成对的“清晰-受损”数据或 k 空间采集数据，而这些数据在临床环境中很难获得。

We propose SSRL-MAR, a motion artifact-aware unpaired representation learning framework for motion artifact reduction that requires neither paired training data nor explicit motion labels. SSRL-MAR employed a three-stage training strategy: (1) contrastive learning on 3D patches to extract motion representations by contrasting clean and synthetically corrupted images, (2) a motion artifact-aware synthesis network to generate motion artifacts from clean scans, and (3) a motion artifact-aware generator to restore clean volumes using the learned degrader for self-supervised supervision.

我们提出了 SSRL-MAR，这是一个用于运动伪影校正的运动伪影感知非成对表征学习框架，它既不需要成对的训练数据，也不需要明确的运动标签。SSRL-MAR 采用了三阶段训练策略：（1）在 3D 图像块上进行对比学习，通过对比清晰图像和合成受损图像来提取运动表征；（2）利用运动伪影感知合成网络从清晰扫描中生成运动伪影；（3）利用运动伪影感知生成器，结合所学的退化模型进行自监督学习，从而恢复清晰的图像体积。

On in-silico dataset, SSRL-MAR achieved PSNR 23.81dB, SSIM 91.55%, and NMSE 0.79%. On in-vivo MR-ART dataset, the pretrained model reduced motion distortion, and unsupervised domain adaptation further improved anatomical fidelity. Against a source-only supervised model trained on the same simulated pairs, SSRL-MAR improved PSNR by up to 2.0 dB on MR-ART after unsupervised domain adaptation, and remained within 0.25-0.47 dB of an oracle supervised model that requires real paired data unavailable in practice.

在计算机模拟（in-silico）数据集上，SSRL-MAR 达到了 23.81dB 的峰值信噪比（PSNR）、91.55% 的结构相似性（SSIM）和 0.79% 的归一化均方误差（NMSE）。在体内（in-vivo）MR-ART 数据集上，预训练模型有效减少了运动畸变，且无监督域适应进一步提高了解剖结构的保真度。与在相同模拟配对数据上训练的纯源监督模型相比，SSRL-MAR 在经过无监督域适应后，MR-ART 数据集上的 PSNR 提升了高达 2.0 dB，并且与需要实际配对数据（在实践中难以获得）的“预言机”监督模型相比，差距仅在 0.25-0.47 dB 以内。

At the milder motion level, volumetric error in structures such as the corpus callosum and ventricular system decreased by more than 50%, confirming improved neuroanatomical consistency. These results indicate that SSRL-MAR provides a robust and scalable image-domain solution for 3D brain MRI motion correction, enabling reliable structural quantification in large-scale neuroimaging studies without requiring prospectively acquired pairs or acquisition-specific calibration.

在较轻微的运动水平下，胼胝体和脑室系统等结构的体积误差减少了超过 50%，证实了神经解剖一致性的提升。这些结果表明，SSRL-MAR 为 3D 脑部 MRI 运动校正提供了一种稳健且可扩展的图像域解决方案，能够在无需前瞻性采集配对数据或特定采集校准的情况下，实现大规模神经影像研究中可靠的结构定量分析。