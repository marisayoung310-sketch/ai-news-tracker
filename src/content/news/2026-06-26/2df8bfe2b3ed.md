---
title: "On-Device Neural Architecture Search"
originalUrl: "https://arxiv.org/abs/2606.24900"
date: "2026-06-25T23:02:54.811Z"
---

# On-Device Neural Architecture Search
# 设备端神经架构搜索

**Abstract:** This paper proposes a new approach to near-sensor computing, in which a lightweight Neural Architecture Search (NAS) is performed directly on the deployment device to find the best tiny neural architecture for analyzing the real-time data acquired through sensors.

**摘要：** 本文提出了一种近传感器计算的新方法，即直接在部署设备上执行轻量级神经架构搜索（NAS），以寻找用于分析传感器实时采集数据的最佳微型神经架构。

This new adaptation capability can be particularly useful in the case of human-machine interfaces for which the neural network analyzing the biometrical data can be re-designed each time the user changes, after a guided data collection procedure, fighting the typical data variations between individuals on a new level.

这种新的适应能力在人机交互界面中尤为有用。通过引导式数据采集程序，系统可以在每次更换用户时重新设计用于分析生物特征数据的神经网络，从而在新的层面上克服个体之间典型的数据差异。

To implement the proposed approach a new NAS has been designed and then validated on the Italian Sign Language dataset (ISL), a collection of surface electromyography (sEMG) signals of the signs of the Italian alphabet, using several embedded systems.

为了实现所提出的方法，研究团队设计了一种新的 NAS，并使用多种嵌入式系统在意大利手语数据集（ISL）上进行了验证。该数据集收集了意大利字母手势的表面肌电图（sEMG）信号。

Moreover, further validation on the Case Western Reserve University dataset (CWRU), a benchmark for intelligent fault diagnosis, is presented to suggest another possible application of the proposed approach.

此外，本文还在凯斯西储大学（CWRU）数据集（一个智能故障诊断基准）上进行了进一步验证，以展示该方法在其他领域的潜在应用。

When run on a Raspberry Pi 4, the proposed NAS performs beyond the state of the art proposing a tiny neural architecture having 0.63 times less RAM occupancy and 5.96 percentage points of more accuracy in the case of the ISL dataset; and 0.44 times less RAM occupancy and 0.2 percentage points of more accuracy in the case of the CWRU dataset.

在 Raspberry Pi 4 上运行时，该 NAS 的表现超越了现有技术水平：在 ISL 数据集上，它提出的微型神经架构内存占用减少了 0.63 倍，准确率提高了 5.96 个百分点；在 CWRU 数据集上，内存占用减少了 0.44 倍，准确率提高了 0.2 个百分点。