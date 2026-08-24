---
title: "HairPort: In-context 3D-aware Hair Import and Transfer for Images"
originalUrl: "https://arxiv.org/abs/2606.12562"
date: "2026-06-12T22:59:45.901Z"
---

# HairPort: In-context 3D-aware Hair Import and Transfer for Images
# HairPort：基于上下文的图像 3D 感知发型导入与迁移

**Abstract:** Transferring hairstyles between images is an important but challenging task in computer graphics, computer vision, and visual effects. It enables users to explore new looks without physically altering their hair, with applications in virtual try-on systems, augmented reality, and entertainment.
**摘要：** 在图像之间迁移发型是计算机图形学、计算机视觉和视觉特效领域中一项重要且具有挑战性的任务。它使用户无需实际改变头发即可尝试新造型，在虚拟试戴系统、增强现实和娱乐领域具有广泛的应用前景。

Most prior works operate best under small pose gaps, and they fall short under large viewpoint and scale differences, where missing hair content must be synthesized rather than transferred. We propose HairPort, a 3D-aware hairstyle transfer framework that attempts to solve these issues by explicitly separating hair removal from transfer and enforcing geometric consistency before synthesis.
大多数现有研究在姿态差异较小时表现良好，但在视角和尺度差异较大时往往效果不佳，因为此时缺失的头发内容必须通过合成而非简单的迁移来补全。我们提出了 HairPort，这是一个 3D 感知的发型迁移框架，旨在通过将“去发”与“迁移”过程显式分离，并在合成前强制执行几何一致性来解决这些问题。

We introduce a Bald Converter, which produces realistic bald versions of faces through LoRA-based in-context adaptation of FLUX.1 Kontext. To train our Bald Converter, we introduce a new dataset, Baldy, containing 6,000 paired bald and original images across diverse identities and conditions.
我们引入了一个“秃头转换器”（Bald Converter），通过基于 LoRA 的 FLUX.1 Kontext 上下文自适应技术，生成逼真的秃头人脸图像。为了训练该转换器，我们构建了一个名为 Baldy 的新数据集，其中包含 6,000 对涵盖不同身份和环境条件的秃头与原始图像。

We also use a 3D-Aware Transfer Pipeline that reconstructs and re-renders the reference hairstyle from the target viewpoint before compositing it onto the source image. Being 3D aware, our method supports large pose and scale discrepancies between the source and target.
我们还采用了一种 3D 感知迁移流水线，在将参考发型合成到源图像之前，先从目标视角对参考发型进行重建和重渲染。由于具备 3D 感知能力，我们的方法能够支持源图像与目标图像之间较大的姿态和尺度差异。

Finally, a conditional flow-matching generator synthesizes the transferred result from the bald source and geometry-aligned reference guidance. Together, our method enables accurate, pose-consistent, and identity-preserving hairstyle transfer, outperforming existing methods both qualitatively and quantitatively.
最后，一个条件流匹配生成器（conditional flow-matching generator）利用秃头源图像和经过几何对齐的参考引导信息，合成最终的迁移结果。综上所述，我们的方法实现了准确、姿态一致且保留身份特征的发型迁移，在定性和定量评估上均优于现有方法。