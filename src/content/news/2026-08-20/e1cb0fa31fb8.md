---
title: "Inference-Time Attention Steering for Vision-Language-Action Driving Models"
originalUrl: "https://arxiv.org/abs/2608.17095"
date: "2026-08-19T21:57:19.785Z"
---

# Inference-Time Attention Steering for Vision-Language-Action Driving Models
# 视觉-语言-动作（VLA）驾驶模型的推理时注意力引导

Vision-language-action (VLA) driving models couple a reasoning stage with a diffusion-based trajectory decoder, but do not give a direct way to redirect attention toward safety-critical actors at inference time without retraining.
视觉-语言-动作（VLA）驾驶模型将推理阶段与基于扩散的轨迹解码器相结合，但在不进行重新训练的情况下，无法在推理时直接将注意力重定向到安全关键的交通参与者身上。

We studied a bounded additive pre-softmax attention bias on the visual tokens of detector localized traffic actors on Alpamayo-R1's Qwen3-VL backbone. It is applied as a fail open forward pre-hook with no weight changes.
我们研究了一种在 Alpamayo-R1 的 Qwen3-VL 主干网络上，针对检测器定位的交通参与者视觉标记所施加的有界加性预 Softmax 注意力偏差。该方法作为一种“故障开放（fail open）”的前向预钩子（pre-hook）应用，且无需更改任何权重。

On 50 lane-change scenarios from the Physical AI World Model Synthetic dataset. The trajectory decoder shows a monotonic dose response in the bias magnitude, separate from a paired zero bias control at every tested magnitude. It reaches $\approx 17$\,cm mean displacement with lateral shifts up to $\sim 140$\ cm at the clamp.
在来自“物理人工智能世界模型合成数据集（Physical AI World Model Synthetic dataset）”的 50 个变道场景中，轨迹解码器在偏差幅度上表现出单调的剂量反应，且在每个测试幅度下均与配对的零偏差对照组区分开来。其平均位移达到约 17 厘米，在限制条件下横向偏移最高可达约 140 厘米。

A layer ablation places the action-relevant signal in late layers, where the effect increases with the number of hooked layers (2.0cm for the first 8 layers; 67.6cm for all 36). A per call injection audit explains why the Chain-of-Causation text never changes.
通过层消融实验，我们将动作相关信号定位在靠后的层中，其效果随钩子层数的增加而增强（前 8 层为 2.0 厘米；全部 36 层为 67.6 厘米）。针对每次调用的注入审计解释了为什么“因果链（Chain-of-Causation）”文本从未改变。

The mask based bias never reaches the reasoning pathway in this serving stack, so the invariance is verified exposure, not robustness. Steered trajectories tend to shift toward the attended actor, suggesting the bias governs where the model looks rather than encoding a target behavior.
基于掩码的偏差在此服务堆栈中从未触及推理路径，因此这种不变性是经过验证的暴露（exposure），而非鲁棒性。被引导的轨迹倾向于向受关注的参与者偏移，这表明该偏差控制的是模型的“注视点”，而非编码某种目标行为。