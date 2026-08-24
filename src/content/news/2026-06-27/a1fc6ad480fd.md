---
title: "Helpfulness Hurts: Domain-Dependent Degradation of Mid-Trained Compassion Values Under Post-Training"
originalUrl: "https://arxiv.org/abs/2606.26102"
date: "2026-06-26T22:44:28.394Z"
---

# Helpfulness Hurts: Domain-Dependent Degradation of Mid-Trained Compassion Values Under Post-Training
# 助人为乐的代价：后训练过程中中途训练的同情心价值观在特定领域下的退化

Standard post-training pipelines apply supervised fine-tuning (SFT) and reinforcement learning (RL) to make language models helpful, but these processes may inadvertently degrade values instilled during pre-training.
标准的后训练流程通常应用监督微调（SFT）和强化学习（RL）来使语言模型变得“乐于助人”，但这些过程可能会无意中削弱预训练期间所灌输的价值观。

We investigate whether the domain of post-training data differentially affects the retention of animal compassion values in a Llama 3.1 8B model mid-trained on compassion-oriented synthetic data, using both SFT (helpfulness via Dolly-15k vs. coding via Magicoder-110K) and GRPO (helpfulness via RLHFlow vs. coding via Magicoder), evaluated on the Animal Harm Benchmark (AHB 2.2) and MORU benchmark (Moral Reasoning Under Uncertainty).
我们研究了后训练数据的领域是否会差异化地影响模型对动物同情心价值观的保留。研究对象为一个在同情心导向的合成数据上进行过“中途训练”（mid-trained）的 Llama 3.1 8B 模型。我们使用了 SFT（通过 Dolly-15k 进行助人训练 vs. 通过 Magicoder-110K 进行编程训练）和 GRPO（通过 RLHFlow 进行助人训练 vs. 通过 Magicoder 进行编程训练）两种方法，并在动物伤害基准（AHB 2.2）和不确定性下的道德推理基准（MORU）上进行了评估。

Helpfulness training significantly degrades animal compassion relative to coding training on AHB (SFT: 35.7% vs. 65.2%; GRPO: 18.7% vs. 32.0%), replicating across two independent helpfulness datasets and two training paradigms.
在 AHB 测试中，助人训练相比编程训练显著降低了模型对动物的同情心（SFT：35.7% vs. 65.2%；GRPO：18.7% vs. 32.0%），这一结果在两个独立的助人数据集和两种训练范式中均得到了复现。

On English MORU items, helpfulness training degrades general moral reasoning by 25.5 percentage points (46.4% vs. 71.9%), a striking gap that rivals the compassion effect in magnitude.
在英语 MORU 测试项中，助人训练使通用道德推理能力下降了 25.5 个百分点（46.4% vs. 71.9%），这一显著差距在量级上与同情心效应相当。

However, this effect does not transfer cross-lingually: on the multilingual MORU benchmark, the domain effect disappears (SFT: 52.3% vs. 51.2%).
然而，这种效应并不会跨语言迁移：在多语言 MORU 基准测试中，这种领域效应消失了（SFT：52.3% vs. 51.2%）。

In contrast, the animal compassion effect transfers consistently across languages, with Magicoder's AHB percentage-point gain over the base model 4.5 times larger on non-English items than English items.
相比之下，动物同情心效应在不同语言间表现出一致的迁移性，Magicoder 在非英语测试项上相对于基础模型的 AHB 百分点提升，是英语测试项的 4.5 倍。

This divergence suggests that values instilled through mid-training are encoded more deeply and cross-lingually than reasoning improvements from domain-specific post-training.
这种差异表明，通过中途训练灌输的价值观比特定领域后训练带来的推理能力提升，在模型中编码得更深，且具有更强的跨语言特性。

These results suggest that, for labs building on value-laden mid-training, coding-domain post-training may better preserve mid-trained values than helpfulness post-training without harming general reasoning capabilities.
这些结果表明，对于那些基于带有价值观的中途训练进行开发的实验室而言，采用编程领域的后训练可能比助人领域的后训练更能保留中途训练的价值观，且不会损害模型的通用推理能力。