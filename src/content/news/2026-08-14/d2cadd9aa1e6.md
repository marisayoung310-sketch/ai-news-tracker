---
title: "Distribird: Literature-Informed Prior Distribution Design for Bayesian Model Calibration"
originalUrl: "https://arxiv.org/abs/2608.11210"
date: "2026-08-13T22:31:42.070Z"
---

# Distribird: Literature-Informed Prior Distribution Design for Bayesian Model Calibration
# Distribird：用于贝叶斯模型校准的文献驱动先验分布设计

**Abstract:** Bayesian calibration of process-based models requires a prior distribution for each model parameter. Despite decades of methodological work, researchers almost always fall back on uniform priors. The main reason is that building informative priors from scientific literature is slow and needs both domain and statistical expertise. 

**摘要：** 基于过程的模型进行贝叶斯校准时，需要为每个模型参数设定先验分布。尽管经过了几十年的方法论研究，研究人员几乎总是退而求其次选择均匀先验。主要原因是，从科学文献中构建信息丰富的先验分布既耗时，又需要领域知识和统计学专业技能。

We present **Distribird**, an agentic web application that automates this process. Given a parameter name, physical description, and domain context, Distribird deploys a multi-agent pipeline that searches the literature, extracts and weights reported values by domain relevance, and fits a probability distribution via AIC model selection. 

我们推出了 **Distribird**，这是一个能够自动化该过程的智能体（Agentic）Web 应用程序。给定参数名称、物理描述和领域背景，Distribird 会部署一个多智能体流水线，用于搜索文献、根据领域相关性提取并加权报告数值，并通过 AIC 模型选择拟合出概率分布。

When no literature is available, the system falls back to sensible uninformative alternatives, and clearly reports both the evidence behind and the confidence level of every prior it produces. It is designed for the problems where the models have physically interpretable parameters, where domain knowledge exists in the published literature. 

当没有可用文献时，系统会退回到合理的无信息先验替代方案，并清晰地报告其生成的每个先验背后的证据及其置信度。该系统专为具有物理可解释参数且已发表文献中存在领域知识的模型问题而设计。

We evaluate the tool on 24 parameters across 10 scientific domains comparing three open-weight models (Qwen3.6 27B, Gemma 4 31B, Mistral Small 4 119B) with a single-prompt LLM baseline. On prior quality the full pipeline *matches* this baseline. 

我们在 10 个科学领域的 24 个参数上评估了该工具，并将三种开源权重模型（Qwen3.6 27B、Gemma 4 31B、Mistral Small 4 119B）与单提示词（single-prompt）LLM 基准进行了比较。在先验质量方面，完整的流水线表现与该基准持平。

Every prior is traced to the specific papers and values from which it was constructed; a built-in validity layer declines to produce priors for out-of-scope requests, whereas the single-prompt baseline returns confident but unfounded priors for them in 11 of 30 model–parameter cases; and every language-model call runs locally, so no parameter description or unpublished modelling detail is transmitted to a third-party LLM provider (only generated search terms reach the public literature databases). For scientific use, we argue these properties matter more than a marginal improvement in point-estimate accuracy.

每个先验都可以追溯到其构建所依据的具体论文和数值；内置的有效性层会拒绝为超出范围的请求生成先验，而单提示词基准在 30 个模型-参数案例中有 11 个给出了自信但毫无根据的先验；此外，所有的语言模型调用均在本地运行，因此不会将参数描述或未发表的建模细节传输给第三方 LLM 提供商（只有生成的搜索词会到达公共文献数据库）。对于科学用途，我们认为这些特性比点估计精度的微小提升更为重要。