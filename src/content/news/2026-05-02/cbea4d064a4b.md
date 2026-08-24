---
title: "Binary Spiking Neural Networks as Causal Models"
originalUrl: "https://arxiv.org/abs/2604.27007"
date: "2026-05-01T22:27:28.360Z"
---

# Binary Spiking Neural Networks as Causal Models
# 二进制脉冲神经网络作为因果模型

**Abstract:** We provide a causal analysis of Binary Spiking Neural Networks (BSNNs) to explain their behavior. We formally define a BSNN and represent its spiking activity as a binary causal model. Thanks to this causal representation, we are able to explain the output of the network by leveraging logic-based methods.
**摘要：** 我们对二进制脉冲神经网络（BSNNs）进行了因果分析，以解释其行为。我们正式定义了 BSNN，并将其脉冲活动表示为二进制因果模型。得益于这种因果表示，我们能够利用基于逻辑的方法来解释网络的输出。

In particular, we show that we can successfully use a SAT as well as a SMT solver to compute abductive explanations from this binary causal model. To illustrate our approach, we trained the BSNN on the standard MNIST dataset and applied our SAT-based and SMT-based methods to finding abductive explanations of the network's classifications based on pixel-level features.
特别地，我们展示了可以成功使用 SAT 和 SMT 求解器从该二进制因果模型中计算出溯因解释（abductive explanations）。为了说明我们的方法，我们在标准 MNIST 数据集上训练了 BSNN，并应用基于 SAT 和 SMT 的方法，根据像素级特征寻找网络分类的溯因解释。

We also compared the found explanations against SHAP, a popular method used in the area of explainable AI. We show that, unlike SHAP, our approach guarantees that a found explanation does not contain completely irrelevant features.
我们还将所得出的解释与可解释人工智能（XAI）领域中常用的 SHAP 方法进行了比较。结果表明，与 SHAP 不同，我们的方法能够保证所找到的解释不包含完全无关的特征。

***

**Paper Details:**
*   **Authors:** Aditya Kar (CNRS, IRIT), Emiliano Lorini (CNRS, IRIT), Timothée Masquelier (CNRS, CERCO UMR5549)
*   **Submission Date:** 29 Apr 2026
*   **Subject:** Artificial Intelligence (cs.AI)
*   **Journal Reference:** Logics for New-Generation AI 2025 Fifth International Workshop, Dec 2025, Luxembourg City, Luxembourg. pp.51-68

**论文详情：**
*   **作者：** Aditya Kar (CNRS, IRIT), Emiliano Lorini (CNRS, IRIT), Timothée Masquelier (CNRS, CERCO UMR5549)
*   **提交日期：** 2026年4月29日
*   **学科：** 人工智能 (cs.AI)
*   **期刊参考：** 2025年新一代人工智能逻辑第五届国际研讨会，2025年12月，卢森堡市，卢森堡。第51-68页。