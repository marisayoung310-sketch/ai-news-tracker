---
title: "How We’re Building Scam Alert on WhatsApp With End-to-End Encryption and Verifiability Guarantees"
originalUrl: "https://engineering.fb.com/2026/08/12/security/how-were-building-scam-alert-whatsapp/"
date: "2026-08-12T22:26:26.868Z"
---

# How We’re Building Scam Alert on WhatsApp With End-to-End Encryption and Verifiability Guarantees
# 我们如何通过端到端加密和可验证性保障在 WhatsApp 上构建“诈骗警报”功能

WhatsApp is committed to helping people stay safe while protecting the privacy of their messages. As scam tactics evolve — from impersonation to social engineering to AI-generated lures — we’re always evolving as well, so that our protections stay ahead of scammers while protecting people’s personal messages with end-to-end encryption.
WhatsApp 致力于在保护用户消息隐私的同时，帮助人们保持安全。随着诈骗手段的不断演变——从冒充身份到社会工程学，再到人工智能生成的诱饵——我们也在不断进步，以确保我们的保护措施领先于诈骗者，同时通过端到端加密保护用户的个人消息。

Today, we’re sharing an early look at Scam Alert, a new, optional feature that runs an on-device machine learning model to alert a user about potential scam messages. No message content leaves the device for classification or is auto-reported to WhatsApp, Meta, or anyone else. The feature complements end-to-end encryption while enabling a user-controlled, optional scam alert when the model believes there’s a likely scam.
今天，我们提前预览了“诈骗警报”（Scam Alert），这是一项新的可选功能，它在设备端运行机器学习模型，以提醒用户注意潜在的诈骗消息。没有任何消息内容会离开设备进行分类，也不会自动上报给 WhatsApp、Meta 或任何其他人。该功能是对端到端加密的补充，当模型认为存在诈骗可能时，它会提供用户可控的、可选的诈骗警报。

Before we make this feature available to all WhatsApp users, we are publishing this early technical overview alongside the feature’s limited rollout in Beta, and will continue working with our Bug Bounty community to stress-test this system. To help validate our implementation, we welcome feedback from the broader security research community.
在向所有 WhatsApp 用户推出此功能之前，我们发布了这份早期技术概述，并同步在 Beta 版中进行有限范围的测试。我们将继续与漏洞赏金社区合作，对该系统进行压力测试。为了帮助验证我们的实现方案，我们欢迎广大安全研究社区提供反馈。

### Design Principles
### 设计原则

Recent advances in on-device machine learning models make it possible to run accurate text classification entirely on mobile hardware without the performance, battery, or model-size tradeoffs that previously made on-device classification less practical. Scam Alert is well-suited to this approach: The model is small enough to run on-device, simple enough to publish for independent review, and effective without server-side components.
设备端机器学习模型的最新进展使得在移动硬件上完全运行精确的文本分类成为可能，且无需面对以往因性能、电池消耗或模型大小限制而导致设备端分类难以实现的问题。“诈骗警报”非常适合这种方法：模型足够小，可以在设备上运行；足够简单，可以发布以供独立审查；并且无需服务器端组件即可有效工作。

The architecture we chose reflects a set of deliberate choices about what this system can and cannot do. To that end, we designed Scam Alert to meet the following principles that adhere to the core guarantees of end-to-end encryption:
我们选择的架构反映了一系列深思熟虑的选择，明确了该系统能做什么和不能做什么。为此，我们设计“诈骗警报”时遵循了以下原则，以确保符合端到端加密的核心保障：

*   **On-device only:** The model and the message data it processes all remain on the device.
    **仅限设备端：** 模型及其处理的消息数据全部保留在设备上。
*   **No automatic reporting:** WhatsApp is unable to initiate sharing of any user data without the user’s action. The only way message content, or even the fact a scam was detected, reaches our servers is if the user explicitly chooses to report it, which is consistent with how user reporting works on WhatsApp.
    **无自动上报：** 未经用户操作，WhatsApp 无法主动共享任何用户数据。消息内容甚至“检测到诈骗”这一事实，只有在用户明确选择举报时才会发送到我们的服务器，这与 WhatsApp 现有的用户举报机制一致。
*   **User control:** Scam Alert is a user-controlled tool that provides additional information to the user, and the user can turn it off or on at any time.
    **用户控制：** “诈骗警报”是一个由用户控制的工具，为用户提供额外信息，用户可以随时开启或关闭。

### How Scam Alert Works
### “诈骗警报”的工作原理

Scam Alert is optional. Once the user turns it on, Scam Alert downloads a machine learning model to the device, where it runs inferences to classify whether incoming messages from non-contacts match known scam patterns. The model is trained on patterns observed in scam conversations from reports that users have sent to us. It performs probabilistic classification based on conversational structure and linguistic signals.
“诈骗警报”是可选的。一旦用户开启，该功能会将机器学习模型下载到设备上，并在设备上运行推理，以分类来自非联系人的传入消息是否符合已知的诈骗模式。该模型基于用户发送给我们的诈骗对话报告中所观察到的模式进行训练。它根据对话结构和语言信号进行概率分类。

No content is automatically reported to WhatsApp, Meta, or any third party. If the model identifies a message as a likely scam attempt, the user sees a warning in the chat, which is not visible to the other person. From there, the user can decide what to do: block, report, or continue the conversation. If they decide that a warning is incorrectly flagged, the user can mark the chat as trusted, in which case the warning is removed and Scam Alert will not flag that chat again. If a user marks that they trust a chat, they can also opt in to share the last 5 messages received with WhatsApp to help improve the feature’s accuracy.
没有任何内容会自动上报给 WhatsApp、Meta 或任何第三方。如果模型识别出某条消息可能是诈骗企图，用户会在聊天中看到警告，而对方无法看到该警告。此后，用户可以决定采取什么行动：阻止、举报或继续对话。如果用户认为警告标记有误，可以将该聊天标记为“受信任”，此时警告将被移除，“诈骗警报”将不再标记该聊天。如果用户标记信任某个聊天，他们还可以选择与 WhatsApp 分享最后收到的 5 条消息，以帮助提高该功能的准确性。

### Foundational Safeguards
### 基础保障措施

To uphold the principles above, we designed Scam Alert with the following foundational requirements and safeguards, with each architecturally enforced and independently verifiable by security researchers through an expanded bug bounty program and by users themselves through in-app logs.
为了坚持上述原则，我们在设计“诈骗警报”时采用了以下基础要求和保障措施。每一项都在架构上进行了强制执行，并可通过扩展的漏洞赏金计划由安全研究人员进行独立验证，用户也可以通过应用内日志自行验证。

*   **On-Device Processing and Privacy-Preserving Analytics:** All inference happens on-device and no message content leaves the user device for classification. The minimal telemetry needed to measure whether the feature is working (i.e., aggregate and anonymous warning counts and user action counts) is processed within a confidential computing environment and sent to WhatsApp as differentially private aggregates. The confidential federated analytics pipeline is built on top of confidential virtual machines (CVMs), a type of Trusted Execution Environment (TEE). We chose this approach so its behavior can be independently verified.
    **设备端处理与隐私保护分析：** 所有推理均在设备端进行，没有任何消息内容会离开用户设备进行分类。衡量该功能是否有效所需的最小化遥测数据（即汇总且匿名的警告计数和用户操作计数）会在机密计算环境中处理，并以差分隐私聚合数据的形式发送给 WhatsApp。机密联邦分析管道构建在机密虚拟机（CVM，一种可信执行环境 TEE）之上。我们选择这种方法是为了使其行为可以被独立验证。
*   **No Targeted Model Delivery:** Neither Meta nor WhatsApp can deliver a specific model to a specific user. Every model version, including experimental variants, is published on a public transparency ledger before it is deployed.
    **无针对性模型分发：** Meta 和 WhatsApp 都无法向特定用户分发特定模型。每个模型版本（包括实验性变体）在部署前都会发布在公共透明度账本上。
*   **Verifiable Model Behavior:** We publish model weights so that independent security researchers can verify that we’ve purpose built this for scams only.
    **可验证的模型行为：** 我们发布模型权重，以便独立安全研究人员可以验证我们仅将其专门用于诈骗检测。

### On-Device Processing and Privacy-Preserving Analytics
### 设备端处理与隐私保护分析

As referenced above, all inference happens on-device. But we need to know that the feature itself is working – i.e., it is indeed catching real scams – and know if we need to update it to stay ahead of constantly evolving scams and improve the model over time. To that end, our approach follows a set of data minimization principles.
如上所述，所有推理均在设备端进行。但我们需要知道该功能本身是否有效——即它是否确实捕获了真实的诈骗——并了解是否需要更新它以应对不断演变的诈骗，并随着时间的推移改进模型。为此，我们的方法遵循了一套数据最小化原则。

Message content does not leave the device, and logging is limited by design to only the signals that are needed to measure whether the feature is working as intended. Even those signals are processed within a confidential computing environment built on TEEs, which ensures that processing occurs in a secure environment that no one, including Meta and WhatsApp, can access. Our experience building and securing systems like Private Processing has informed the design of this system. Only anonymous, differentially private aggregates are made available to Meta and WhatsApp. Differential privacy works by adding carefully calibrated noise to provide a mathematical guarantee that adding or removing any single person’s data has a negligible effect on the anonymous, aggregated numbers.
消息内容不会离开设备，日志记录在设计上仅限于衡量该功能是否按预期工作所需的信号。即使是这些信号，也会在基于 TEE 构建的机密计算环境中进行处理，这确保了处理过程发生在任何人都（包括 Meta 和 WhatsApp）无法访问的安全环境中。我们在构建和保护“私密处理”（Private Processing）等系统方面的经验为该系统的设计提供了参考。只有匿名的、经过差分隐私处理的聚合数据才会提供给 Meta 和 WhatsApp。差分隐私通过添加经过精心校准的噪声来工作，从而提供数学保证：添加或删除任何个人的数据对匿名聚合数字的影响微乎其微。