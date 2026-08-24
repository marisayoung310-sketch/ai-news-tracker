---
title: "Deontic Policies for Runtime Governance of Agentic AI Systems"
originalUrl: "https://arxiv.org/abs/2606.19464"
date: "2026-06-19T22:19:31.349Z"
---

# Deontic Policies for Runtime Governance of Agentic AI Systems
# 代理式 AI 系统的运行时治理：道义策略研究

**Abstract:** Autonomous agentic AI systems driven by Large Language Models (LLMs) introduce a new class of security, privacy, and compliance challenges: an agent that can invoke tools, manipulate data, install software, and coordinate with peer agents across organizational boundaries must be constrained not just by authentication and access control, but by the full structure of enterprise governance.

**摘要：** 由大语言模型（LLM）驱动的自主代理式 AI 系统引入了一类全新的安全、隐私和合规性挑战：一个能够调用工具、操作数据、安装软件并跨组织边界与对等代理进行协作的代理，不仅需要通过身份验证和访问控制来约束，还必须受到企业治理全体系的制约。

This includes specifying what agents are permitted and prohibited from doing, what they are obliged to do after certain actions (e.g., notify the CISO), under what conditions a standing obligation may be waived, and which rules take precedence when policies conflict. This governance problem exceeds what current policy engines provide.

这包括明确代理被允许和禁止执行的操作、在特定操作后必须履行的义务（例如通知首席信息安全官 CISO）、在何种条件下可以豁免既定义务，以及当策略发生冲突时哪些规则具有优先权。这一治理难题超出了当前策略引擎所能提供的范畴。

Systems such as XACML, Rego, and Cedar address only the permit/prohibit subset of this governance structure. They do not provide obligation lifecycle management, meta-policy conflict resolution, dispensations that waive obligations in specific circumstances, and ontological reasoning over domain class hierarchies commonly found in applications such as healthcare, cybersecurity, or data privacy.

诸如 XACML、Rego 和 Cedar 等系统仅涵盖了该治理结构中“允许/禁止”的子集。它们无法提供义务生命周期管理、元策略冲突解决机制、特定情况下的义务豁免，以及在医疗保健、网络安全或数据隐私等应用中常见的领域类层次结构的本体推理能力。

We propose AgenticRei, which realizes key governance requirements such as obligations, dispensations, policy conflict resolutions, and reasoning over policies, as well as the basic permit/prohibit constraints. We use a deontic policy language built on the Rei framework, expressed as OWL (Web Ontology Language) and evaluated at runtime by a high-performance logic engine entirely outside the LLM.

我们提出了 AgenticRei，它实现了包括义务、豁免、策略冲突解决、策略推理以及基础的“允许/禁止”约束在内的关键治理需求。我们使用基于 Rei 框架构建的道义策略语言，将其表示为 OWL（网络本体语言），并由完全独立于 LLM 之外的高性能逻辑引擎在运行时进行评估。

The same pipeline governs both tool invocations by the agent and agent-to-agent messages. We show through examples that deontic policies capture governance constraints around security and privacy that mostly cannot be expressed in current production engines. Our approach composes naturally with industry-standard frameworks like A2AS.

同一流水线既管理代理的工具调用，也管理代理间的消息传递。我们通过示例证明，道义策略能够捕捉到当前生产环境引擎大多无法表达的关于安全和隐私的治理约束。我们的方法可以与 A2AS 等行业标准框架自然地结合使用。