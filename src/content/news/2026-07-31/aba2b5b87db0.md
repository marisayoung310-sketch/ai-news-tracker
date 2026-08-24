---
title: "Steering Instruction Hierarchies at Inference Time"
originalUrl: "https://arxiv.org/abs/2607.26228"
date: "2026-07-30T22:34:17.930Z"
---

### Steering Instruction Hierarchies at Inference Time
### 推理阶段的指令层级引导 (Steering Instruction Hierarchies at Inference Time)

**Abstract:** Instruction hierarchies are a core safety assumption of language model deployment: higher priority inputs, such as system prompts, should override conflicting lower priority inputs from users or tools. Yet frontier LLMs often violate this hierarchy. 

**摘要：** 指令层级是语言模型部署中的核心安全假设：高优先级输入（如系统提示词）应覆盖来自用户或工具的冲突性低优先级输入。然而，前沿大语言模型（LLM）往往会违反这一层级。

We introduce V-Steer, a training-free inference time method that restores privileged influence by editing cached value vectors at prompt positions. Using direct logit attribution on the first next token prediction, V-Steer identifies heads where lower priority spans dominate privileged ones, then boosts privileged spans and suppresses conflicting lower priority spans through in-place multiplicative edits to cached V tensors. 

我们引入了 V-Steer，这是一种无需训练的推理阶段方法，通过编辑提示词位置的缓存值向量（cached value vectors）来恢复特权指令的影响力。V-Steer 利用对第一个预测 Token 的直接 Logit 归因（direct logit attribution），识别出低优先级片段主导了特权片段的注意力头，随后通过对缓存的 V 张量进行原地乘法编辑，增强特权片段并抑制冲突的低优先级片段。

Since the method acts only on cached values, it remains compatible with fused attention backends and adds only a one time prefill overhead. Across models from 7B to 70B, this attribution-guided intervention raises primary constraint accuracy from under 18% up to 92% on controlled role conflict benchmarks, and on broader instruction hierarchy evaluations substantially outperforms prompt-only baselines while matching or exceeding SoTA training-based methods on 3 of 4 scales of LLMs, with negligible decoding-speed overhead. 

由于该方法仅作用于缓存值，它与融合注意力（fused attention）后端保持兼容，且仅增加一次性的预填充（prefill）开销。在从 7B 到 70B 的模型规模测试中，这种基于归因的干预手段在受控的角色冲突基准测试中，将主要约束准确率从不足 18% 提升至 92%。在更广泛的指令层级评估中，该方法显著优于仅使用提示词的基准方案，并在 4 种 LLM 规模中的 3 种上达到或超过了当前最先进（SoTA）的基于训练的方法，且解码速度开销可忽略不计。

The code is available at this [URL](https://github.com/siqizeng/V-Steer).

代码已在 [此链接](https://github.com/siqizeng/V-Steer) 公开。