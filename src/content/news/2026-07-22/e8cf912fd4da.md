---
title: "OpenLanguageModel: Readable and Composable Small-Language-Model Pretraining for Education and Research"
originalUrl: "https://arxiv.org/abs/2607.16669"
date: "2026-07-21T22:19:20.409Z"
---

# OpenLanguageModel: Readable and Composable Small-Language-Model Pretraining for Education and Research
# OpenLanguageModel：面向教育与研究的可读且可组合的小型语言模型预训练框架

**Abstract:** OpenLanguageModel (OLM) is an open-source PyTorch library for building and pretraining small language models while keeping their machinery visible. In OLM, model code reads like the architecture: components are ordinary modules, while Block, Residual, Repeat, and Parallel describe how they are wired. The resulting model can move unchanged from a teaching notebook to a complete pretraining run or a research ablation.

**摘要：** OpenLanguageModel (OLM) 是一个开源的 PyTorch 库，旨在构建和预训练小型语言模型，同时保持其内部机制的透明度。在 OLM 中，模型代码的阅读体验与架构设计高度一致：组件即普通的模块，而 Block（块）、Residual（残差）、Repeat（重复）和 Parallel（并行）等结构则清晰地描述了它们的连接方式。由此构建的模型可以无缝地从教学笔记本环境迁移到完整的预训练任务或研究消融实验中。

OLM connects this readable model layer to tokenizers, local and streaming datasets, optimization, mixed precision, callbacks, checkpoints, and hardware-aware CPU, single-GPU, and single-node multi-GPU execution. We demonstrate the full path by tracing GPT-2 from diagram to code, launching a FineWeb-Edu training script, replacing one attention component, and letting AutoTrainer configure the available machine.

OLM 将这一可读的模型层与分词器、本地及流式数据集、优化器、混合精度训练、回调函数、检查点保存，以及支持 CPU、单 GPU 和单节点多 GPU 的硬件感知执行环境连接起来。我们通过将 GPT-2 从架构图转化为代码、启动 FineWeb-Edu 训练脚本、替换注意力组件以及利用 AutoTrainer 自动配置可用机器资源，展示了该框架的全流程应用。

The package includes 27 presets across nine familiar model families and documentation that progresses from LM fundamentals to architecture research. Validation shows close agreement with independent reference implementations, 90.6% four-GPU weak-scaling efficiency for a 348M-parameter workload, compact architecture edits, and positive early usability results. OLM is MIT-licensed and available through PyPI, GitHub, and its documentation site.

该软件包包含了涵盖九个主流模型系列的 27 种预设，并提供了从语言模型基础知识到架构研究的进阶文档。验证结果显示，该框架与独立的参考实现高度一致，在 3.48 亿参数规模的任务中，四 GPU 的弱扩展效率达到了 90.6%，且支持简洁的架构编辑，初步可用性测试反馈良好。OLM 采用 MIT 许可证开源，可通过 PyPI、GitHub 及官方文档网站获取。