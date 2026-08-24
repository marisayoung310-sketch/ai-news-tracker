---
title: "Understanding Emergent Misalignment via Feature Superposition Geometry"
originalUrl: "https://arxiv.org/abs/2605.00842"
date: "2026-05-06T22:35:18.033Z"
---

# Understanding Emergent Misalignment via Feature Superposition Geometry
# 通过特征叠加几何理解涌现性对齐失效

**Abstract:** Emergent misalignment, where fine-tuning on narrow, non-harmful tasks induces harmful behaviors, poses a key challenge for AI safety in LLMs. Despite growing empirical evidence, its underlying mechanism remains unclear. To uncover the reason behind this phenomenon, we propose a geometric account based on the geometry of feature superposition. Because features are encoded in overlapping representations, fine-tuning that amplifies a target feature also unintentionally strengthens nearby harmful features in accordance with their similarity.

**摘要：** 涌现性对齐失效（Emergent misalignment）是指在针对狭窄、无害任务进行微调时，模型反而诱发出有害行为，这对大语言模型（LLM）的AI安全性构成了重大挑战。尽管相关的实证证据日益增多，但其潜在机制尚不明确。为了揭示这一现象背后的原因，我们提出了一种基于特征叠加（feature superposition）几何结构的几何解释。由于特征是以重叠的表征形式进行编码的，因此放大目标特征的微调过程，会根据特征间的相似度，无意中同时增强了附近存在的有害特征。

We give a simple gradient-level derivation of this effect and empirically test it in multiple LLMs (Gemma-2 2B/9B/27B, LLaMA-3.1 8B, GPT-OSS 20B). Using sparse autoencoders (SAEs), we identify features tied to misalignment-inducing data and to harmful behaviors, and show that they are geometrically closer to each other than features derived from non-inducing data. This trend generalizes across domains (e.g., health, career, legal advice).

我们给出了这一效应的简单梯度级推导，并在多个大语言模型（Gemma-2 2B/9B/27B、LLaMA-3.1 8B、GPT-OSS 20B）中进行了实证测试。通过使用稀疏自编码器（SAE），我们识别出了与诱导对齐失效的数据以及有害行为相关的特征，并证明了它们在几何空间上比从非诱导数据中提取的特征更为接近。这种趋势在不同领域（如健康、职业、法律建议）中均具有普适性。

Finally, we show that a geometry-aware approach, filtering training samples closest to toxic features, reduces misalignment by 34.5%, substantially outperforming random removal and achieving comparable or slightly lower misalignment than LLM-as-a-judge-based filtering. Our study links emergent misalignment to feature superposition, providing a basis for understanding and mitigating this phenomenon.

最后，我们展示了一种感知几何结构的方法——即过滤掉与有害特征最接近的训练样本——可以将对齐失效降低 34.5%。该方法显著优于随机剔除，并达到了与基于“LLM作为裁判”（LLM-as-a-judge）的过滤方法相当甚至更低的失效水平。我们的研究将涌现性对齐失效与特征叠加联系起来，为理解和缓解这一现象提供了理论基础。