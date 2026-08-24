---
title: "Automated Mediator for Human Negotiation: Pre-Mediation via a Structured LLM Pipeline"
originalUrl: "https://arxiv.org/abs/2606.11379"
date: "2026-06-11T23:06:26.037Z"
---

# Automated Mediator for Human Negotiation: Pre-Mediation via a Structured LLM Pipeline
# 人机谈判的自动化调解员：基于结构化大模型流水线的预调解

**Abstract:** Pre-mediation, the preparatory phase preceding direct human negotiation, plays a critical role in achieving mutually beneficial agreements, yet is often omitted due to cost, time, and limited access to trained mediators. We introduce an automated mediator for human negotiation, implemented as a structured pipeline of LLM modules, that supports pre-mediation in integrative negotiation settings.

**摘要：** 预调解是直接人际谈判前的准备阶段，对于达成互利协议至关重要，但由于成本、时间和专业调解员资源有限，这一阶段往往被省略。我们引入了一种用于人际谈判的自动化调解员，它以结构化的大语言模型（LLM）模块流水线形式实现，旨在支持综合性谈判环境下的预调解工作。

The pipeline decomposes preparation into specialized modules for dialogue, preference prediction, response-level critique, and structured summarization, separating inference, generation, and evaluation to address limitations of monolithic single-prompt approaches. We use the term "agent" for each module following common LLM-systems terminology, but the components are not autonomous and do not interact peer-to-peer; outputs are passed forward in a fixed sequence.

该流水线将准备工作分解为对话、偏好预测、响应级评估和结构化摘要等专业模块，通过将推理、生成和评估过程分离，解决了单一提示词（single-prompt）方法在处理复杂任务时的局限性。遵循大模型系统的通用术语，我们将每个模块称为“智能体”（agent），但这些组件并非自主运行，也不进行点对点交互；输出结果按固定顺序向下传递。

We evaluate the system in two controlled human-subject experiments comparing AI-based pre-mediation with professional human mediators in a multi-issue negotiation scenario. On short-term self-reported measures, the automated mediator achieves preparation outcomes broadly comparable to human mediators, including trust in the mediator and confidence in reaching mutually beneficial agreements, while achieving substantially lower error on the preference-inference task under our scenario and prompts (36% lower RMSE).

我们在多议题谈判场景中进行了两项受控的人类受试者实验，对比了基于人工智能的预调解与专业人类调解员的效果。在短期自我报告指标上，自动化调解员达成的准备效果与人类调解员大致相当，包括对调解员的信任度以及对达成互利协议的信心；同时，在我们的场景和提示词设置下，该系统在偏好推理任务上的误差显著降低（均方根误差 RMSE 降低了 36%）。

A second study shows that targeted prompt refinements reduce excessive affirmation patterns from 36.6% to 16.8%, matching human mediator baselines. Our findings suggest that structured LLM pipelines can provide scalable, low-effort pre-mediation support broadly comparable to human mediators on short-term self-reported preparation outcomes. The pipeline's single-party design mirrors how human mediators run pre-mediation today and enables parallel deployment across all parties to a dispute, supporting scalability.

第二项研究表明，通过针对性的提示词优化，系统将过度的肯定性反馈模式从 36.6% 降低至 16.8%，达到了人类调解员的基准水平。我们的研究结果表明，结构化大模型流水线能够提供可扩展、低成本的预调解支持，其短期自我报告的准备效果与人类调解员相当。该流水线的单方设计模拟了当前人类调解员进行预调解的方式，并支持在争议各方之间进行并行部署，从而具备良好的可扩展性。