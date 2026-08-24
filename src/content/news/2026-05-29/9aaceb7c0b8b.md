---
title: "Comparative Analysis of Liquid Neural Networks and LSTM for Sequential Pattern Recognition: Robustness, Efficiency, and Clinical Utility"
originalUrl: "https://arxiv.org/abs/2605.27467"
date: "2026-05-28T23:07:11.745Z"
---

# Comparative Analysis of Liquid Neural Networks and LSTM for Sequential Pattern Recognition: Robustness, Efficiency, and Clinical Utility

**液体神经网络与长短期记忆网络在序列模式识别中的对比分析：鲁棒性、效率与临床应用价值**

***

**Abstract:** Traditional Recurrent Neural Networks (RNNs) and Long Short-Term Memory (LSTM) units operate on discrete time steps, often failing to capture the fluid temporal dynamics of real-world physical processes. Liquid Neural Networks (LNNs), specifically Closed-form Continuous-time (CfC) networks, address this by modeling the hidden state evolution as a continuous differential equation.

**摘要：** 传统的循环神经网络（RNN）和长短期记忆网络（LSTM）单元基于离散时间步长运行，往往难以捕捉现实世界物理过程中流动的时序动态。液体神经网络（LNN），特别是闭式连续时间（CfC）网络，通过将隐藏状态的演变建模为连续微分方程，解决了这一问题。

***

In this paper, we conduct a comprehensive benchmarking study across four distinct sequential modalities: neuromorphic event-based data (N-MNIST), stroke-based drawing (QuickDraw), visual handwriting (IAM), and physiological time-series (PhysioNet Sepsis-3). Furthermore, we perform a rigorous stress test using temporal dropout to evaluate model robustness against missing data.

在本文中，我们针对四种不同的序列模态进行了全面的基准测试研究：神经形态事件数据（N-MNIST）、基于笔画的绘图（QuickDraw）、视觉手写体（IAM）以及生理时间序列（PhysioNet Sepsis-3）。此外，我们还通过时间丢弃（temporal dropout）进行了严格的压力测试，以评估模型在面对数据缺失时的鲁棒性。

***

Our findings reveal that LNNs consistently provide superior parameter efficiency and significantly higher robustness in natively temporal domains and clinical environments where data sparsity is prevalent. This extended preprint provides additional background on related datasets and the LNN theoretical lineage, supplemented with a detailed appendix documenting our full implementation and experimental settings.

研究结果表明，在原生时序领域以及数据稀疏性普遍存在的临床环境中，LNN 始终表现出更优的参数效率和显著更高的鲁棒性。这份扩展预印本提供了关于相关数据集和 LNN 理论渊源的额外背景信息，并附有详细的附录，记录了我们的完整实现过程和实验设置。