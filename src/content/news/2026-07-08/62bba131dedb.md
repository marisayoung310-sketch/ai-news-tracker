---
title: "QuantFlow: A Federated Mamba-Based Post-Transformer Foundation Model for Time-Series Forecasting"
originalUrl: "https://arxiv.org/abs/2607.02632"
date: "2026-07-07T22:40:50.031Z"
---

# QuantFlow: A Federated Mamba-Based Post-Transformer Foundation Model for Time-Series Forecasting
# QuantFlow：一种基于联邦 Mamba 的后 Transformer 时间序列预测基础模型

**Abstract:** Time-series forecasting supports decisions in finance, energy, transportation, public health, and industrial monitoring. Recent foundation models improve transfer across forecasting tasks, but many depend on centralized data and Transformer attention, which restricts their use for long, high-dimensional, and privacy-sensitive signals. 

**摘要：** 时间序列预测为金融、能源、交通、公共卫生和工业监控领域的决策提供支持。近期出现的基础模型改善了跨预测任务的迁移能力，但许多模型依赖于集中式数据和 Transformer 注意力机制，这限制了它们在长序列、高维及隐私敏感信号场景下的应用。

This paper presents QuantFlow, a probabilistic forecasting framework that combines inverted sequence embedding, bidirectional Mamba state-space decoders, quantile regression, and federated learning. Each variable is embedded over the complete observation window, processed in forward and reverse directions, and projected to five conditional quantiles. TSMixup expands temporal diversity through Dirichlet-weighted interpolation while preserving sequence structure. 

本文提出了 QuantFlow，这是一个结合了反向序列嵌入、双向 Mamba 状态空间解码器、分位数回归和联邦学习的概率预测框架。每个变量都在完整的观测窗口上进行嵌入，通过正向和反向处理，并投影到五个条件分位数上。TSMixup 通过狄利克雷加权插值（Dirichlet-weighted interpolation）在保持序列结构的同时，扩展了时间维度的多样性。

Experiments cover cryptocurrency, traffic, electricity, Electricity Transformer Temperature, influenza, and weather data. QuantFlow obtains mean squared errors of 0.2834 on ETTm1 and 0.2218 on Weather, and a 20-client non-IID deployment retains useful accuracy after three communication rounds without centralizing raw records. 

实验涵盖了加密货币、交通、电力、电力变压器温度（ETT）、流感和天气数据。QuantFlow 在 ETTm1 数据集上获得了 0.2834 的均方误差，在天气数据集上获得了 0.2218 的均方误差；在 20 个客户端的非独立同分布（non-IID）部署中，经过三轮通信后，该模型在无需集中原始记录的情况下仍保持了有效的预测精度。

The results indicate that selective state-space modelling is a promising basis for scalable, uncertainty-aware, and privacy-conscious time-series prediction, while also revealing limitations on irregular epidemiological signals and long-horizon generalization.

研究结果表明，选择性状态空间建模是实现可扩展、具备不确定性感知且注重隐私的时间序列预测的有前景的基础，同时也揭示了其在不规则流行病学信号和长周期泛化方面的局限性。

***

**Paper Details:**
*   **Authors:** Shah Nawaz Haider, Steve Austin, Arnab Barua, Sarowar Morshed Shawon, Hadaate Ullah
*   **arXiv ID:** 2607.02632
*   **Subjects:** Machine Learning (cs.LG); Artificial Intelligence (cs.AI)

**论文详情：**
*   **作者：** Shah Nawaz Haider, Steve Austin, Arnab Barua, Sarowar Morshed Shawon, Hadaate Ullah
*   **arXiv ID:** 2607.02632
*   **学科分类：** 机器学习 (cs.LG)；人工智能 (cs.AI)