---
title: "Learning to Resolve Neutron Resonances with Fully Convolutional Neural Networks"
originalUrl: "https://arxiv.org/abs/2608.04027"
date: "2026-08-07T01:15:00.858Z"
---

# Learning to Resolve Neutron Resonances with Fully Convolutional Neural Networks
# 利用全卷积神经网络解析中子共振

**Abstract:** This work investigates the feasibility of augmenting traditional R-Matrix codes with a robust machine learning framework for automatically detecting neutron resonances in transmission spectra. Neutron transmission data are often complex and noisy, making them difficult to analyze using traditional peak-identification methods. The state-of-the-art R-Matrix codes currently used by physicists to fit these data often depend on prior evaluations and require substantial manual effort.

**摘要：** 本研究探讨了利用稳健的机器学习框架增强传统 R-矩阵（R-Matrix）代码，以自动检测透射光谱中中子共振的可行性。中子透射数据通常复杂且充满噪声，使得使用传统的峰值识别方法进行分析变得困难。目前物理学家用于拟合这些数据的最先进 R-矩阵代码，往往依赖于先验评估，并需要大量的人工投入。

This preliminary study demonstrates a method for accelerating the post-experimental processing of neutron transmission data and reducing bias associated with dependence on prior evaluations. We employ a fully convolutional neural network to classify individual points as belonging to resonance or non-resonance regions in seven transmission spectra---two evaluated and five experimental. Although the model achieves classification accuracies in the range of 93%, further analysis shows that this metric overstates its ability to generalize.

这项初步研究展示了一种加速中子透射数据实验后处理，并减少因依赖先验评估而产生偏差的方法。我们采用全卷积神经网络，对七个透射光谱（两个评估光谱和五个实验光谱）中的各个点进行分类，判断其属于共振区域还是非共振区域。尽管该模型在分类准确率上达到了 93% 左右，但进一步分析表明，这一指标夸大了其泛化能力。

Building on our prior analysis in PHYSOR 2026, we find that, despite the inclusion of additional training data, the method does not generalize reliably to previously unseen isotopes. To address these limitations, future work should evaluate whether a larger and more diverse training dataset can produce a generalizable model and should incorporate known physical characteristics of neutron resonances to improve model performance.

基于我们在 PHYSOR 2026 中的前期分析，我们发现尽管加入了额外的训练数据，该方法在面对此前未见过的同位素时，仍无法实现可靠的泛化。为了解决这些局限性，未来的工作应评估更大、更多样化的训练数据集是否能产生具有泛化能力的模型，并应结合中子共振的已知物理特性来提升模型性能。