---
title: "Seeing What Shouldn't Be There: Counterfactual GANs for Medical Image Attribution"
originalUrl: "https://arxiv.org/abs/2605.05283"
date: "2026-05-08T22:46:01.118Z"
---

# Seeing What Shouldn't Be There: Counterfactual GANs for Medical Image Attribution
# 洞察不应存在之物：用于医学图像归因的反事实生成对抗网络 (GANs)

**Abstract:** Ascription of an image gives insights into the objects that influence the classification of the whole image or its pixels towards a specific category. These insights help radiologists to visualize deformities in medical imaging. Most of the existing visualization techniques are based on discriminative models and highlight regions of the input image participating in the decision-making of a classifier. However, these approaches do not take all noticeable objects into account as their objective is to classify the input by using a minimal set of discriminative features.

**摘要：** 图像归因（Ascription）能够揭示影响整幅图像或其像素被分类为特定类别的关键对象。这些洞察有助于放射科医生可视化医学影像中的畸变。目前大多数可视化技术基于判别模型，旨在突出输入图像中参与分类器决策的区域。然而，这些方法并未考虑所有显著的对象，因为它们的目标仅是通过最少量的判别特征来对输入进行分类。

To overcome the issue, a counterfactual explanation (CX) based class-oriented feature attribution method is proposed. A counterfactual explanation (CX) explicates a causal reasoning process of the form: "if X had not happened, then Y would not have happened". The method is built on generative adversarial networks (GANs) with a cyclical-consistent loss function. We evaluate our method on three datasets: synthetic, tuberculosis and BraTS. All experiments confirm the efficacy of the proposed method.

为了克服这一问题，本文提出了一种基于反事实解释（CX）的面向类别的特征归因方法。反事实解释（CX）阐述了一种因果推理过程，其形式为：“如果 X 没有发生，那么 Y 就不会发生”。该方法构建于具有循环一致性损失函数的生成对抗网络（GANs）之上。我们在合成数据集、结核病数据集和 BraTS 数据集上对该方法进行了评估。所有实验均证实了所提方法的有效性。

This study also highlighted the limitations of existing counterfactual explanation techniques in producing plausible counterfactual instances (CIs). Accompanying CXs with believable CIs thus provides self-explanatory analogy-based explanations. To this end, a CI generation method is proposed. Also, a novel technique is used to evaluate the quality of CI. The baseline results are produced on the BraTS dataset.

本研究还强调了现有反事实解释技术在生成合理反事实实例（CIs）方面的局限性。因此，将 CX 与可信的 CI 相结合，可以提供一种具有自解释性的类比式说明。为此，本文提出了一种 CI 生成方法，并采用了一种评估 CI 质量的新技术。基准测试结果是在 BraTS 数据集上得出的。