---
title: "OpenAI Expands Zero Data Retention Options for Frontier Model Enterprise Workloads"
originalUrl: "https://dev.to/alifar/openai-expands-zero-data-retention-options-for-frontier-model-enterprise-workloads-bjb"
date: "2026-08-19T21:55:41.695Z"
---

# OpenAI Expands Zero Data Retention Options for Frontier Model Enterprise Workloads
# OpenAI 扩展前沿模型企业工作负载的“零数据留存”选项

OpenAI is positioning Zero Data Retention (ZDR) as a scalable privacy control for eligible frontier-model API and enterprise workloads. The policy matters as businesses use more capable models for longer-running and increasingly autonomous work, where prompts, outputs, and related interactions can contain sensitive operational, customer, or proprietary information.
OpenAI 正在将“零数据留存”（Zero Data Retention, ZDR）定位为针对符合条件的前沿模型 API 和企业工作负载的可扩展隐私控制手段。随着企业越来越多地使用能力更强的模型来处理长期运行且日益自主的任务，提示词、输出内容及相关交互可能包含敏感的运营、客户或专有信息，因此该政策显得尤为重要。

On its official API platform page, OpenAI lists "Zero data retention policy by request" alongside access to frontier models and APIs. The company’s enterprise privacy materials and GPT-5.4 release information add important context: ZDR is a configurable option for eligible organizations and endpoints, rather than a universal default across all OpenAI services or customer configurations. The shift is less about a newly invented privacy principle than about applying retention controls more explicitly to frontier-capable deployments.
在其官方 API 平台页面上，OpenAI 将“按需提供的零数据留存政策”与前沿模型及 API 的访问权限并列。该公司的企业隐私资料和 GPT-5.4 发布信息补充了重要背景：ZDR 是针对符合条件的组织和端点提供的可配置选项，而非所有 OpenAI 服务或客户配置中的通用默认设置。这一转变并非发明了某种全新的隐私原则，而是将留存控制更明确地应用于具备前沿能力的应用部署中。

OpenAI’s GPT-5.4 materials describe Zero Data Retention surfaces and safety controls designed for higher-sensitivity contexts. That framing acknowledges a practical tension for enterprise AI: more autonomous systems can create more valuable workflows, but they also require safety systems that assess risks across related interactions.
OpenAI 的 GPT-5.4 资料描述了专为高敏感场景设计的“零数据留存”界面和安全控制措施。这种框架承认了企业级 AI 面临的现实矛盾：更自主的系统可以创造更有价值的工作流，但也需要能够评估相关交互风险的安全系统。

### What Zero Data Retention changes for enterprise AI
### “零数据留存”为企业级 AI 带来了哪些改变

Under ZDR, OpenAI disables logging of customer content for abuse monitoring and model-training purposes. The setting also affects API behavior. For example, the store parameter for chat completions and responses is forced to false in ZDR contexts. That is a meaningful control for teams that need to minimize the persistence of prompt and response content.
在 ZDR 模式下，OpenAI 会禁用出于滥用监控和模型训练目的的客户内容日志记录。该设置也会影响 API 行为。例如，在 ZDR 环境中，聊天补全和响应的 `store` 参数会被强制设为 `false`。对于需要最大限度减少提示词和响应内容留存的团队来说，这是一项有意义的控制措施。

It should not, however, be interpreted as a blanket statement that no information can ever be retained anywhere in the service. OpenAI documents that some endpoints may retain application state or metadata for operational reasons. It also describes exceptional safety and retention mechanisms, including Eyes Off and Safety Retention, that may apply in specific circumstances. The central distinction is between routine logging of customer content and the limited operational or safety handling that may still be necessary. For procurement, security, and legal teams, that distinction needs to be evaluated endpoint by endpoint rather than assumed from the ZDR label alone.
然而，这不应被解读为“服务中任何地方都不会留存任何信息”的绝对声明。OpenAI 的文档指出，某些端点可能会出于运营原因保留应用程序状态或元数据。它还描述了在特定情况下可能适用的例外安全和留存机制，包括“Eyes Off”（无人工查看）和“安全留存”。核心区别在于：常规的客户内容日志记录与可能仍需进行的有限运营或安全处理。对于采购、安全和法律团队而言，这种区别需要针对每个端点进行评估，而不能仅凭 ZDR 标签就做出假设。

| Area | Zero Data Retention | Other retention configurations |
| :--- | :--- | :--- |
| **领域** | **零数据留存 (ZDR)** | **其他留存配置** |
| Availability | Available by request for eligible organizations and endpoints. | Retention policy can differ by organization, project, and endpoint. |
| **可用性** | 针对符合条件的组织和端点按需提供。 | 留存政策因组织、项目和端点而异。 |
| Customer-content logging | Disabled for abuse monitoring and model-training purposes. | Modified Abuse Monitoring is a separate configurable option for eligible organizations. |
| **客户内容日志记录** | 禁用滥用监控和模型训练用途的日志。 | “改进版滥用监控”是针对符合条件组织的独立可配置选项。 |
| API storage behavior | The store parameter is forced to false for chat completions and responses. | Behavior depends on the endpoint and applicable retention policy. |
| **API 存储行为** | 聊天补全和响应的 `store` 参数被强制设为 `false`。 | 行为取决于端点和适用的留存政策。 |
| Operational exceptions | Some application state or metadata may still be retained, and exceptional safety mechanisms can apply. | Endpoints that are not ZDR-eligible may have different requirements or approval conditions. |
| **运营例外** | 仍可能保留部分应用状态或元数据，并可能适用例外安全机制。 | 不符合 ZDR 条件的端点可能有不同的要求或审批条件。 |

OpenAI says data-retention controls can be configured at both the organization and project levels. Eligible organizations can choose between ZDR and Modified Abuse Monitoring, but not every endpoint is necessarily eligible for ZDR. Some services may require specific approval or follow different retention rules. For architects, this makes retention policy an implementation decision, not simply a vendor-level checkbox. A team using several API endpoints should identify which calls process sensitive content, which generate persistent application state, and which retention option applies to each workflow. This is especially important when a single product combines model inference, retrieval, agentic processes, or other stateful functions.
OpenAI 表示，数据留存控制可以在组织和项目两个层面进行配置。符合条件的组织可以在 ZDR 和“改进版滥用监控”之间进行选择，但并非每个端点都一定符合 ZDR 条件。某些服务可能需要特定审批或遵循不同的留存规则。对于架构师而言，这意味着留存政策是一项实施决策，而不仅仅是供应商层面的勾选项。使用多个 API 端点的团队应识别哪些调用处理敏感内容、哪些生成持久的应用状态，以及每个工作流适用哪种留存选项。当单个产品结合了模型推理、检索、代理流程或其他有状态功能时，这一点尤为重要。

OpenAI’s enterprise privacy documentation also states that customers own their inputs and outputs, and that they can control retention durations. The company offers Data Processing Addenda and Business Associate Agreements, while data-residency options provide selected regions for storage and processing under service-specific constraints. Those controls can support an organization’s GDPR, CCPA, and industry compliance efforts, but they do not independently establish compliance. Businesses still need to determine their lawful basis for processing, set appropriate internal retention rules, assess cross-border data requirements, and validate how each deployed endpoint handles data.
OpenAI 的企业隐私文档还声明，客户拥有其输入和输出内容，并可以控制留存时长。该公司提供《数据处理附录》和《商业伙伴协议》，而数据驻留选项则在特定服务约束下提供选定的存储和处理区域。这些控制措施可以支持组织的 GDPR、CCPA 和行业合规工作，但它们本身并不能直接确立合规性。企业仍需确定其处理数据的合法依据，制定适当的内部留存规则，评估跨境数据要求，并验证每个已部署端点如何处理数据。

OpenAI is also previewing Private Safety Processing, a model that aims to address safety risks associated with longer and more autonomous AI interactions without relying on wholesale data logging. The combination of ZDR surfaces and safety-focused processing is strategically important: enterprise customers increasingly want strong limits on data persistence without abandoning the safeguards expected for frontier-model use.
OpenAI 还在预览“私有安全处理”（Private Safety Processing），这是一种旨在解决长期且更自主的 AI 交互所带来的安全风险，同时无需依赖全面数据日志记录的模型。ZDR 界面与安全导向处理的结合具有重要的战略意义：企业客户越来越希望在不放弃前沿模型使用所需安全保障的前提下，对数据留存进行严格限制。

Important questions remain. OpenAI has not provided a single, universal public matrix showing which frontier-model surfaces receive ZDR by default versus by request in every region. It is also worth watching for more granular guidance on the boundary between application state and customer content, and on how exceptional retention paths interact with regional data-residency requirements.
目前仍有一些重要问题悬而未决。OpenAI 尚未提供一份统一的、公开的矩阵，以说明在每个地区中，哪些前沿模型界面是默认开启 ZDR，哪些是按需开启。此外，值得关注的是关于“应用状态”与“客户内容”之间界限的更细致指导，以及例外留存路径如何与区域数据驻留要求相互作用。

Frontier-model privacy controls only create value when they are mapped to real data flows, endpoint choices, contracts, and regional obligations. Scalevise helps teams turn platform settings into practical AI governance, from retention assessments to deployment guardrails and vendor due diligence. An AI governance consultation with Scalevise can clarify where ZDR fits in your architecture and where further controls are needed. Request a consultation to assess your AI data posture.
只有当隐私控制措施与实际数据流、端点选择、合同和区域义务相匹配时，前沿模型的隐私控制才能创造价值。Scalevise 帮助团队将平台设置转化为实用的 AI 治理，涵盖从留存评估到部署护栏及供应商尽职调查的各个环节。通过 Scalevise 进行 AI 治理咨询，可以明确 ZDR 在您的架构中的位置以及在何处需要进一步的控制。申请咨询以评估您的 AI 数据状况。

### Frequently Asked Questions
### 常见问题解答

**What is OpenAI Zero Data Retention?**
**什么是 OpenAI 零数据留存？**

Zero Data Retention is a configurable OpenAI policy for eligible organizations and endpoints that disables logging of customer...
“零数据留存”是 OpenAI 为符合条件的组织和端点提供的一项可配置政策，它禁用了客户内容的日志记录……