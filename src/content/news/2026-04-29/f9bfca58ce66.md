---
title: "Learning Illumination Control in Diffusion Models"
originalUrl: "https://arxiv.org/abs/2604.24877"
date: "2026-04-29T07:10:15.487Z"
---

# Learning Illumination Control in Diffusion Models
# 学习扩散模型中的光照控制

**Abstract:** Controlling illumination in images is essential for photography and visual content creation. While closed-source models have demonstrated impressive illumination control, open-source alternatives either require heavy control inputs like depth maps or do not release their data and code. 

**摘要：** 在图像中控制光照对于摄影和视觉内容创作至关重要。虽然闭源模型已经展示了令人印象深刻的光照控制能力，但开源替代方案要么需要深度图等繁重的控制输入，要么不公开其数据和代码。

We present a fully open-source and reproducible pipeline for learning illumination control in diffusion models. Our approach builds a data engine that transforms well-lit images into supervised training triplets consisting of a poorly-illuminated input image, a natural language lighting instruction, and a well-illuminated output image. 

我们提出了一种完全开源且可复现的流程，用于学习扩散模型中的光照控制。我们的方法构建了一个数据引擎，将光照良好的图像转换为监督训练三元组，其中包括一张光照不佳的输入图像、一条自然语言光照指令，以及一张光照良好的输出图像。

We finetune a diffusion model on this data and demonstrate significant improvements over baseline SD 1.5, SDXL, and FLUX.1-dev models in perceptual similarity, structural similarity, and identity preservation. Our work provides a reproducible solution built entirely with open-source tools and publicly available data. We release all our code, data, and model weights publicly.

我们在这些数据上对扩散模型进行了微调，并证明在感知相似度、结构相似度和身份保持方面，相比基准模型 SD 1.5、SDXL 和 FLUX.1-dev 有显著提升。我们的工作提供了一种完全由开源工具和公开数据构建的可复现解决方案。我们已将所有代码、数据和模型权重公开。

***

**Paper Details:**
*   **Authors:** Nishit Anand, Manan Suri, Christopher Metzler, Dinesh Manocha, Ramani Duraiswami
*   **Subjects:** Computer Vision and Pattern Recognition (cs.CV); Artificial Intelligence (cs.AI); Machine Learning (cs.LG); Image and Video Processing (eess.IV)
*   **arXiv ID:** 2604.24877

**论文详情：**
*   **作者：** Nishit Anand, Manan Suri, Christopher Metzler, Dinesh Manocha, Ramani Duraiswami
*   **学科分类：** 计算机视觉与模式识别 (cs.CV)；人工智能 (cs.AI)；机器学习 (cs.LG)；图像与视频处理 (eess.IV)
*   **arXiv ID:** 2604.24877