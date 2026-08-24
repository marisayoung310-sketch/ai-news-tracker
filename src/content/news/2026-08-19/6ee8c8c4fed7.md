---
title: "Characterizing Rhetorical Misalignment in Decision-Making with Language Models"
originalUrl: "https://arxiv.org/abs/2608.14630"
date: "2026-08-18T21:50:33.175Z"
---

### Characterizing Rhetorical Misalignment in Decision-Making with Language Models
### 刻画语言模型在决策过程中的修辞失调现象

**Abstract:** Human decision-making is often shaped by a range of well-documented cognitive biases. As large language models (LLMs) become increasingly integrated into high-stakes human-AI decision-making, it is important to understand whether their outputs can amplify potential biases, how this influences human decisions, and crucially, whether it can lead to harmful consequences.

**摘要：** 人类的决策过程往往受到一系列已证实的认知偏差的影响。随着大型语言模型（LLMs）日益融入高风险的人机协作决策中，理解它们的输出是否会放大潜在偏差、这种偏差如何影响人类决策，以及至关重要的是，它是否会导致有害后果，显得尤为重要。

In this work, we develop a decision-theoretic framework to study rhetorical misalignment, a failure mode where an LLM uses rhetorically inappropriate forms of presentation for a given decision context, thereby inducing suboptimal human decisions.

在这项工作中，我们开发了一个决策理论框架来研究“修辞失调”（rhetorical misalignment）。这是一种失效模式，即语言模型在特定的决策情境下使用了不恰当的修辞表达方式，从而诱导人类做出次优决策。

We empirically investigate this phenomenon through a human-subject experiment in realistic clinical decision-making using a dataset curated from the United States Medical Licensing Examination. By measuring how LLM-generated information affects decisions, we observe that LLMs induce an average 2.81% rate of harmful decision flips across different models, where clinician participants change from a correct to an incorrect answer.

我们通过一项基于真实临床决策的人类受试者实验，对这一现象进行了实证研究，所用数据集选自美国医师执照考试（USMLE）。通过衡量语言模型生成的信息如何影响决策，我们观察到，在不同模型中，语言模型平均导致了 2.81% 的有害决策翻转率，即临床医生参与者从正确的答案改为了错误的答案。

Rationales reported by participants provide evidence that these revisions are closely related to the language used by LLMs that may induce different types of cognitive biases, including anchoring, authority bias, and loss aversion.

参与者报告的理由证明，这些修改与语言模型所使用的语言密切相关，这些语言可能会诱发不同类型的认知偏差，包括锚定效应、权威偏差和损失厌恶。

To enable scalable evaluation, we instantiate our theoretical framework using decision-makers simulated by LLMs to computationally measure rhetorical misalignment. Our findings reveal a safety concern previously unrecognized in high-stakes domains: a model can be factually aligned yet still induce harm through its rhetorical presentation.

为了实现可扩展的评估，我们利用由语言模型模拟的决策者来实例化我们的理论框架，从而对修辞失调进行计算测量。我们的研究结果揭示了一个在高风险领域中此前未被认识到的安全问题：一个模型在事实层面可能是对齐的，但仍可能通过其修辞表达方式诱发危害。