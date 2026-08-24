---
title: "Reducing the Safety Tax in LLM Safety Alignment with On-Policy Self-Distillation"
originalUrl: "https://arxiv.org/abs/2605.15239"
date: "2026-05-18T22:41:13.173Z"
---

### Reducing the Safety Tax in LLM Safety Alignment with On-Policy Self-Distillation
### 通过在线策略自蒸馏降低大语言模型安全对齐中的“安全税”

**Abstract:** Safety alignment often improves robustness to harmful queries at the cost of reasoning ability, a tradeoff known as the safety tax. A common cause is distributional mismatch: supervised fine-tuning trains the target model on safety demonstrations produced by humans, external models, or fixed self-generated traces, rather than on trajectories sampled from its own policy.

**摘要：** 安全对齐通常以牺牲推理能力为代价来提高对有害查询的鲁棒性，这种权衡被称为“安全税”（safety tax）。其常见原因是分布不匹配：监督微调（SFT）是在人类、外部模型或固定的自生成轨迹所产生的安全演示上训练目标模型，而非在模型自身策略采样出的轨迹上进行训练。

We identify off-policy training mismatch as a second source of this tax and study on-policy self-distillation for safety alignment, which we call OPSA. The model generates its own rollouts and receives dense per-token KL supervision from a frozen teacher copy of itself conditioned on a privileged safety context.

我们确定了离线策略（off-policy）训练的不匹配是导致这种税收的第二个来源，并研究了用于安全对齐的在线策略自蒸馏方法，我们将其称为 OPSA。该模型生成自己的输出轨迹，并从一个冻结的、以特权安全上下文为条件的自身副本（教师模型）那里接收密集的逐标记（per-token）KL 散度监督。

Because this teacher must be safer than the sampled student trajectory, we introduce \emph{teacher flip rate}: a criterion that measures how often a privileged context converts unsafe responses into safe ones. We use this signal to search for contexts that activate latent safety reasoning rather than merely elicit safe-looking demonstrations.

由于该教师模型必须比采样出的学生轨迹更安全，我们引入了“教师翻转率”（teacher flip rate）：这是一种衡量特权上下文将不安全响应转化为安全响应频率的准则。我们利用这一信号来搜索那些能够激活潜在安全推理能力，而非仅仅诱导产生“看起来安全”的演示的上下文。

Across two reasoning-model families and five model scales, OPSA achieves a stronger safety--reasoning tradeoff than off-policy self-distillation and external-teacher distillation under matched data and full-parameter fine-tuning, with the largest gains on smaller models (+8.85 points on R1-Distill-1.5B and +5.49 points on Qwen3-0.6B). The gains persist across training-set sizes and adaptive jailbreak evaluations.

在两个推理模型系列和五个模型规模的测试中，在匹配数据和全参数微调的条件下，OPSA 实现了比离线策略自蒸馏和外部教师蒸馏更优的安全与推理权衡，其中在较小模型上的增益最为显著（R1-Distill-1.5B 提升 8.85 个点，Qwen3-0.6B 提升 5.49 个点）。这些增益在不同的训练集规模和自适应越狱评估中均保持稳定。

Token-level analyses further show that OPSA concentrates updates near early compliance-decision tokens, providing a mechanism for improving safety while preserving general reasoning.

标记级（Token-level）分析进一步表明，OPSA 将更新集中在早期的合规决策标记附近，这提供了一种在提高安全性的同时保留通用推理能力的机制。