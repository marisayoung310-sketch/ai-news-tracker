---
title: "Anatomy-Privileged Distillation with Token Routing for MRI-Based Prediction of Perineural Invasion"
originalUrl: "https://arxiv.org/abs/2607.11987"
date: "2026-07-15T22:26:09.551Z"
---

### Anatomy-Privileged Distillation with Token Routing for MRI-Based Prediction of Perineural Invasion
### 基于解剖学特权蒸馏与 Token 路由的 MRI 神经周围浸润预测研究

**Abstract:** Perineural invasion (PNI) is associated with poor postoperative outcomes in intrahepatic cholangiocarcinoma, but it is confirmed by surgical pathology. Existing preoperative imaging models often rely on radiologist-defined variables, contrast-enhanced imaging, or manual annotations. 

**摘要：** 神经周围浸润（PNI）与肝内胆管癌术后不良预后相关，但目前仅能通过手术病理确诊。现有的术前影像模型通常依赖于放射科医生定义的变量、对比增强成像或人工标注。

We propose an anatomy-privileged teacher--student framework for patient-level PNI prediction from T2-weighted MRI. During training, the teacher uses MRI with tumor and liver masks to learn dense token routing, and the student distills this guidance to retain and aggregate informative tokens under a fixed budget. 

我们提出了一种基于解剖学特权的教师-学生框架，用于从 T2 加权 MRI 中进行患者层面的 PNI 预测。在训练过程中，教师模型利用带有肿瘤和肝脏掩膜（Mask）的 MRI 来学习密集 Token 路由，而学生模型则通过蒸馏这种指导，在固定预算下保留并聚合信息量大的 Token。

Anatomical supervision is restricted to training, and the deployed model does not require masks at inference. In 155 patients, the proposed method achieved the highest mean AUROC of 0.750 among matched MRI-only baselines evaluated under the same protocol, with 1.43 GFLOPs and 8.02 ms per case on a Jetson Orin Nano Super Developer Kit.

解剖学监督仅限于训练阶段，部署后的模型在推理时无需掩膜。在 155 例患者的测试中，该方法在相同协议下评估的同类仅 MRI 基准模型中取得了最高的平均 AUROC（0.750），并在 Jetson Orin Nano Super 开发套件上实现了每例 1.43 GFLOPs 的计算量和 8.02 毫秒的推理速度。