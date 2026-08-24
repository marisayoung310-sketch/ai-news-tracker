---
title: "POLARIS: Guiding Small Models to Write Long Stories"
originalUrl: "https://arxiv.org/abs/2606.04095"
date: "2026-06-04T22:54:34.637Z"
---

# POLARIS: Guiding Small Models to Write Long Stories
# POLARIS：引导小型模型进行长篇故事创作

Small open-weight models struggle at long-form creative writing: their generated stories either fall far short of the requested length, or their quality significantly degrades as length increases, especially when compared to frontier models.
小型开源权重模型在长篇创意写作方面表现不佳：它们生成的故事要么远未达到要求的长度，要么随着长度的增加，质量会显著下降，尤其是在与前沿模型相比时。

We present POLARIS (Policy Optimization with LLM-as-a-judge rewards and Anchored-Reference Injection for Storywriting), a lower-compute GRPO recipe with two key ingredients: a frontier LLM judge with a structured Story Quality rubric as the online reward, and human-reference injection (HRI), where a teacher-forced human-written story serves as a high-reward anchor within each GRPO group.
我们提出了 POLARIS（基于 LLM 判别奖励的策略优化与故事写作锚定参考注入），这是一种低算力需求的 GRPO（组相对策略优化）方案，包含两个关键要素：一是使用具有结构化“故事质量评分标准”的前沿 LLM 作为在线奖励判别器；二是引入人类参考注入（HRI），即在每个 GRPO 组中，将人类编写的故事作为高奖励锚点进行教师强制（teacher-forced）训练。

By applying our training recipe to Qwen3.5-9B, using a dataset of approximately 1.4K prompt-story pairs derived from 100 short-story anthologies and 4 A100 GPUs, we obtain POLARIS-9B.
通过将我们的训练方案应用于 Qwen3.5-9B 模型，并使用从 100 部短篇小说集中提取的约 1,400 个“提示词-故事”对作为数据集，在 4 张 A100 GPU 上进行训练，我们得到了 POLARIS-9B 模型。

Across five benchmarks spanning in-distribution and out-of-distribution prompts and rubrics, POLARIS-9B is competitive with much larger open-weight models while following length instructions more closely.
在涵盖分布内和分布外提示词及评分标准的五个基准测试中，POLARIS-9B 不仅能与规模大得多的开源模型竞争，而且在遵循长度指令方面表现得更为精准。

A blinded human evaluation confirms that POLARIS-9B is preferred to the base Qwen3.5-9B and on par with Qwen3.5-27B.
盲测评估证实，用户更倾向于使用 POLARIS-9B 而非基础版 Qwen3.5-9B，且其表现与 Qwen3.5-27B 持平。

Despite training only on stories up to 4k words, POLARIS-9B preserves quality on prompts requesting stories up to 3 times the training length, a regime where most open-weight models degrade substantially in quality, length adherence, or both.
尽管训练时仅使用了不超过 4,000 字的故事，但 POLARIS-9B 在面对要求长度达到训练长度 3 倍的提示词时，依然保持了高质量。在这一区间内，大多数开源模型通常会在质量、长度遵循度或两者兼有的方面出现大幅下降。

More broadly, our results suggest that length generalization is a meaningful stress test for creative-writing models and a useful lens for distinguishing otherwise close models.
从更广泛的角度来看，我们的研究结果表明，长度泛化能力是衡量创意写作模型的一项重要压力测试，也是区分性能相近模型的一种有效视角。