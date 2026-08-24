---
title: "CSTutorBench: Benchmarking Small Language Models as Tutors for Block-Based Programming"
originalUrl: "https://arxiv.org/abs/2607.05571"
date: "2026-07-08T22:30:39.254Z"
---

# CSTutorBench: Benchmarking Small Language Models as Tutors for Block-Based Programming
# CSTutorBench：评估小型语言模型作为积木式编程导师的基准测试

**Abstract:** Large language models are increasingly explored as AI tutors, yet deploying them in K-12 settings raises concerns around privacy, cost, and reliance on proprietary models. Small language models (SLMs) offer a promising alternative, but selecting the right model for a specific educational context remains difficult, particularly when the target domain, such as block-based programming, is largely absent from model training data.

**摘要：** 大型语言模型正越来越多地被探索作为人工智能导师，但在 K-12（基础教育）环境中部署它们引发了对隐私、成本以及对专有模型依赖的担忧。小型语言模型（SLMs）提供了一种有前景的替代方案，但在特定的教育背景下选择合适的模型仍然很困难，尤其是当目标领域（如积木式编程）在模型训练数据中基本缺失时。

We introduce CSTutorBench, a benchmark for evaluating language models as CS tutors in VEX VR, a block-based robotics environment. The benchmark comprises 17 scenario-based questions scored against a pedagogical rubric grounded in established tutoring and feedback research, with a human-in-the-loop LLM-as-judge pipeline for evaluation.

我们推出了 CSTutorBench，这是一个用于评估语言模型在 VEX VR（一种积木式机器人环境）中担任计算机科学导师能力的基准测试。该基准测试包含 17 个基于场景的问题，并根据基于既定辅导和反馈研究的教学准则进行评分，同时采用“人在回路”的 LLM-as-judge（大模型作为裁判）流程进行评估。

Preliminary findings across 11 models (4B-120B parameters) reveal that models perform well on surface-level criteria such as vocabulary and tone but struggle with deeper pedagogical behaviors, particularly avoiding answer leakage and engaging with student debugging histories. In our sample, model family and instruction-tuning approach appear to be better predictors of tutoring quality than parameter count alone, though the small number of models limits the strength of this conclusion.

对 11 个模型（40 亿至 1200 亿参数）的初步研究结果显示，模型在词汇和语气等表面标准上表现良好，但在更深层次的教学行为上表现吃力，特别是在避免直接给出答案（答案泄露）以及结合学生调试历史进行引导方面。在我们的样本中，模型系列和指令微调方法似乎比单纯的参数量更能预测辅导质量，尽管模型数量较少限制了这一结论的确定性。

A targeted prompt revision grounded in recent educational prompt engineering research improved scores for 10 of 11 models. These results underscore the value of context-specific, pedagogically grounded benchmarks for SLM selection in educational deployment.

基于近期教育提示工程研究的针对性提示词修订，使 11 个模型中的 10 个得分有所提高。这些结果强调了在教育部署中，针对特定情境且基于教学法的基准测试对于选择小型语言模型（SLM）的价值。