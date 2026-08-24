---
title: "Sequential Fitting: A Different Perspective on the Spectral Bias of Neural Networks"
originalUrl: "https://towardsdatascience.com/sequential-fitting-a-different-perspective-on-the-spectral-bias-of-neural-networks/"
date: "2026-06-08T23:13:14.283Z"
---

# Sequential Fitting: A Different Perspective on the Spectral Bias of Neural Networks
# 顺序拟合：神经网络谱偏差的另一种视角

**Introduction**
**引言**

Evidenced by their success with complex tasks such as image classification [1], autonomy [2], and language modeling [3], neural networks are spectacularly good at fitting high-dimensional, nonlinear functions from data.
神经网络在图像分类 [1]、自动驾驶 [2] 和语言建模 [3] 等复杂任务中取得的成功证明，它们在从数据中拟合高维非线性函数方面表现得极其出色。

In fact, neural networks have such robust representational capabilities that they can achieve zero training error on images with randomized class labels, meaning there is no structure in the training data which the network can exploit [4].
事实上，神经网络具有极其强大的表征能力，即使在类别标签被随机打乱的图像上也能实现零训练误差，这意味着网络无需利用训练数据中的任何结构即可完成拟合 [4]。

Despite this flexibility, the neural network model class appears to provide useful inductive bias for many real-world tasks, as neural networks often generalize to unseen test data better than other model types [5].
尽管具有这种灵活性，神经网络模型类似乎仍能为许多现实任务提供有用的归纳偏置，因为神经网络在未见过的测试数据上的泛化能力往往优于其他模型类型 [5]。

Yet, regression with neural networks suffers a serious drawback, which has become known as the “spectral bias” in the literature. Popularized in 2019, the spectral bias states that neural networks fit regression targets from low to high frequencies [6].
然而，使用神经网络进行回归分析存在一个严重的缺陷，即文献中所谓的“谱偏差”（spectral bias）。该概念在 2019 年被普及，指出神经网络倾向于从低频到高频来拟合回归目标 [6]。

As shown in Figure 1, the neural network first learns the low-frequency content of the function, before refining the fit to capture the higher frequencies. As is standard in this literature, we understand the “frequency content” of the regression target to be provided by its Fourier transform.
如图 1 所示，神经网络首先学习函数中的低频成分，然后再细化拟合以捕捉高频成分。按照该领域的惯例，我们将回归目标的“频率成分”理解为其傅里叶变换的结果。

Because networks fit the target function in order of increasing frequency, learning high-frequency functions is often quite slow, requiring a large number of training epochs. Subsequent works have corroborated the difficulties networks face in fitting high-frequency functions, and have offered explanations for this intriguing phenomenon.
由于网络是按照频率递增的顺序拟合目标函数的，因此学习高频函数通常非常缓慢，需要大量的训练轮次。后续研究证实了网络在拟合高频函数时面临的困难，并为这一有趣的现象提供了各种解释。

Some authors have explained the spectral bias by studying the Fourier spectrum of popular activation functions (e.g., ReLU, hyperbolic tangent, sigmoid, etc.), noting that their spectra decay rapidly at high frequencies, and thus the network is inherently biased toward learning low frequencies [7,8].
一些作者通过研究常用激活函数（如 ReLU、双曲正切、Sigmoid 等）的傅里叶谱来解释谱偏差，指出这些函数的频谱在高频处衰减迅速，因此网络天生倾向于学习低频成分 [7,8]。

An influential approach called the Neural Tangent Kernel (NTK) offers an elegant explanation of the spectral bias by showing that, in the limit of an infinite-width network, the network output evolves according to a linear dynamical system. Using the theory of linear dynamical systems to decompose the network output into orthogonal modes, the authors in [9] show that the convergence rate is inversely proportional to the frequency content of the mode. This work offered a compelling theoretical explanation for the spectral bias of neural networks.
一种被称为“神经正切核”（NTK）的有影响力的方法为谱偏差提供了一种优雅的解释：它表明在无限宽网络的极限下，网络输出的演化遵循线性动力系统。通过利用线性动力系统理论将网络输出分解为正交模态，[9] 中的作者证明了收敛速度与模态的频率成分成反比。这项工作为神经网络的谱偏差提供了令人信服的理论解释。

A number of other works have explored the spectral bias across different network architectures and optimization algorithms. For example, one work showed that for wide two-layer networks with ReLU activation, the training process can be interpreted as a constrained optimization problem in which high-frequency components of the solution are more heavily penalized [10]. In [11], noting that the original NTK analysis assumes training is carried out using gradient descent, the authors clarify that the spectral bias is observed with other optimizers as well.
其他许多研究探讨了不同网络架构和优化算法下的谱偏差。例如，一项研究表明，对于使用 ReLU 激活函数的宽双层网络，训练过程可以被解释为一个约束优化问题，其中解的高频分量会受到更严厉的惩罚 [10]。在 [11] 中，作者指出原始的 NTK 分析假设训练是使用梯度下降法进行的，并进一步阐明了在使用其他优化器时也能观察到谱偏差。

More recently, it was shown from both an empirical and theoretical perspective that second-order quasi-Newton optimization strategies—meaning strategies which rely on an approximation of the Hessian of the loss—can mitigate the spectral bias for neural networks used in scientific machine learning applications [12]. Here, building on the NTK analysis, it is shown that pre-conditioning with the Hessian matrix helps equalize the convergence rate of modes of different frequencies, thus expediting the training process.
最近，从实证和理论角度均已证明，二阶拟牛顿优化策略（即依赖于损失函数 Hessian 矩阵近似的策略）可以缓解科学机器学习应用中神经网络的谱偏差 [12]。在此基础上，基于 NTK 分析，研究表明使用 Hessian 矩阵进行预处理有助于平衡不同频率模态的收敛速度，从而加快训练过程。

While much attention has been paid to understanding the origins of the spectral bias, a number of researchers have proposed strategies to remedy it. While using second-order optimization is one such strategy, others involve modifications to the architecture of the network. Replacing standard activations with periodic functions like sinusoids is one architectural modification known as a SIREN network [13]. Another popular architecture is the Fourier feature network, which, instead of modifying the activation functions, lifts the input to a higher-dimensional space with periodic embeddings at random frequencies [14,15]. In the context of scientific machine learning, Fourier features have been shown to improve performance for multi-scale partial differential equations [16].
尽管人们已经投入大量精力去理解谱偏差的起源，但许多研究人员也提出了补救策略。使用二阶优化是其中一种策略，其他策略则涉及对网络架构的修改。将标准激活函数替换为正弦函数等周期函数是一种架构修改，被称为 SIREN 网络 [13]。另一种流行的架构是傅里叶特征网络，它不修改激活函数，而是通过随机频率的周期性嵌入将输入提升到更高维的空间 [14,15]。在科学机器学习的背景下，傅里叶特征已被证明能提高多尺度偏微分方程的求解性能 [16]。

The success of standard neural network architectures (multi-layer perceptrons, convolutional networks, etc.) in mainstream machine learning suggests that fitting high frequencies is not a bottleneck for many application areas. However, an inability to robustly or efficiently fit high-frequency functions can be a problem in scientific applications, where multi-scale and wave propagation problems rely heavily on oscillatory solution fields.
标准神经网络架构（多层感知机、卷积网络等）在主流机器学习中的成功表明，拟合高频成分对于许多应用领域而言并非瓶颈。然而，无法稳健或高效地拟合高频函数在科学应用中可能成为一个问题，因为在这些领域中，多尺度和波传播问题高度依赖于振荡解场。

While second-order optimization, SIREN networks, and Fourier features all represent successful remedies to the spectral bias, we believe the spectral bias to be an interesting problem in its own right. Though the Fourier spectrum of the activation function offers some insight into the origin of the spectral bias for general neural network training problems, and the NTK provides an explanation in the case of infinite-width networks, we believe a more intuitive understanding of the spectral bias is possible. In this article, we argue that, in many cases, the spectral bias of multilayer perceptron (MLP) networks with hyperbolic tangent activations can be understood from the perspective of what we call “sequential fitting.” We define sequential fitting to mean that neural networks fit their...
虽然二阶优化、SIREN 网络和傅里叶特征都代表了解决谱偏差的成功方案，但我们认为谱偏差本身就是一个值得研究的有趣问题。尽管激活函数的傅里叶谱为一般神经网络训练问题的谱偏差起源提供了一些见解，且 NTK 为无限宽网络的情况提供了解释，但我们相信对谱偏差可以有更直观的理解。在本文中，我们认为在许多情况下，具有双曲正切激活函数的多层感知机（MLP）网络的谱偏差可以从我们所谓的“顺序拟合”视角来理解。我们将顺序拟合定义为神经网络拟合其……