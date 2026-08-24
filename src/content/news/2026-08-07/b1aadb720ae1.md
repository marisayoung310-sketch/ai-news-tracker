---
title: "Teaching Foundation Models to Read mmWave: Pose-Guided Kinematic Representation for Human Behavior Understanding"
originalUrl: "https://arxiv.org/abs/2608.04127"
date: "2026-08-07T01:15:26.338Z"
---

# Teaching Foundation Models to Read mmWave: Pose-Guided Kinematic Representation for Human Behavior Understanding
# 教会基础模型“阅读”毫米波：用于人类行为理解的姿态引导运动学表征

**Abstract:** Large language model agents need to perceive human behavior in physical environments. Millimeter-wave (mmWave) radar provides a privacy-friendly and contactless sensing modality, but radar observations are difficult to align with language. Existing radar-language methods often rely on synthetic data or lack explicit supervision for human body structure and motion. 

**摘要：** 大型语言模型智能体需要在物理环境中感知人类行为。毫米波（mmWave）雷达提供了一种保护隐私且非接触式的感知方式，但雷达观测数据很难与语言进行对齐。现有的雷达-语言方法通常依赖于合成数据，或者缺乏对人体结构和运动的显式监督。

We present mmMind, a radar-language model that uses synchronized 3D pose as training-only supervision. A spatio-temporal radar encoder is pretrained to capture body configuration and motion dynamics, after which the pose head is removed so that inference requires radar alone. The learned radar representations are then aligned with an LLM for behavior captioning and spatio-temporal question answering. 

我们提出了 mmMind，这是一种仅在训练阶段使用同步 3D 姿态作为监督信息的雷达-语言模型。通过预训练一个时空雷达编码器来捕捉身体结构和运动动态，随后移除姿态头（pose head），使得推理过程仅需雷达数据即可完成。学习到的雷达表征随后与大语言模型（LLM）对齐，用于行为描述和时空问答任务。

We also introduce mmMind-Bench, a real-world mmWave-language benchmark containing 17.9 hours of recordings from 23 participants across seven indoor environments. Experiments on captioning, question answering, and unseen-action generalization show that mmMind consistently outperforms existing radar-language baselines, while ablations confirm the importance of pose-guided pretraining.

我们还推出了 mmMind-Bench，这是一个真实的毫米波-语言基准测试集，包含来自 7 个室内环境中 23 名参与者共 17.9 小时的录制数据。在行为描述、问答和未见动作泛化方面的实验表明，mmMind 的表现始终优于现有的雷达-语言基准模型，消融实验也证实了姿态引导预训练的重要性。