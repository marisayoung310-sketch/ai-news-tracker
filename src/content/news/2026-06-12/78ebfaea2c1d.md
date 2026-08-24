---
title: "LatticeBridge: Rare-Event Sequential Inference for Faithful Structured Sequence Synthesis"
originalUrl: "https://arxiv.org/abs/2606.11203"
date: "2026-06-11T23:06:48.305Z"
---

# LatticeBridge: Rare-Event Sequential Inference for Faithful Structured Sequence Synthesis
# LatticeBridge：用于忠实结构化序列生成的稀有事件顺序推理

Structured sequence generation often requires a model to satisfy several input-derived constraints in a single output. Standard decoding methods may assign high probability to fluent continuations while placing low mass on continuations that realize all required anchors jointly. We study this regime as a rare-event sequential inference problem.

结构化序列生成通常要求模型在单个输出中满足多个源自输入的约束。标准的解码方法可能会为流畅的续写分配高概率，但却为能够同时实现所有必要锚点（anchors）的续写分配极低的权重。我们将这种情形视为一个稀有事件顺序推理问题进行研究。

LatticeBridge combines a compact prefix language model, instance-compiled surface automata, and a twisted sequential Monte Carlo (SMC) decoder with resampling, multilevel splitting, and a source-support proposal term derived from instance-provided phrases. The constraint representation is compiled from each input instance and does not rely on manually curated lexical classes.

LatticeBridge 结合了紧凑的前缀语言模型、实例编译的表面自动机，以及带有重采样、多级分裂和源自实例短语的源支持建议项（source-support proposal term）的扭曲顺序蒙特卡洛（SMC）解码器。约束表示是从每个输入实例中编译而成的，不依赖于人工整理的词汇类。

On 2,610 attainable validation tasks spanning CommonGen, E2E NLG, and WikiBio, the particle decoder improves exact anchor satisfaction and mean anchor coverage over greedy, beam-filtered, and best-of-k ancestral baselines under a shared proposal model. Since exact anchor satisfaction alone does not rule out unsupported attribute substitutions, the evaluation reports required-anchor coverage, source coverage, source-intrusion diagnostics, overlap, runtime, and particle statistics jointly. The benchmark characterizes the faithfulness-overlap-latency frontier under a fixed proposal model.

在涵盖 CommonGen、E2E NLG 和 WikiBio 的 2,610 个可实现验证任务上，在共享建议模型下，该粒子解码器在精确锚点满足度和平均锚点覆盖率方面，均优于贪婪搜索、束搜索过滤和 best-of-k 祖先采样基线。由于仅靠精确的锚点满足并不能排除不受支持的属性替换，评估报告还综合了必要锚点覆盖率、源覆盖率、源入侵诊断、重叠度、运行时间和粒子统计数据。该基准测试刻画了在固定建议模型下的忠实度-重叠度-延迟边界。