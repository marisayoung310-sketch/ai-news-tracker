---
title: "Here’s How AI Agents Can Protect EV Chargers"
originalUrl: "https://www.wired.com/story/researchers-in-spain-show-how-ai-agents-can-protect-ev-chargers/"
date: "2026-06-13T22:40:45.821Z"
---

# Here’s How AI Agents Can Protect EV Chargers
# 人工智能代理如何保护电动汽车充电桩

The number of electric vehicles on roads around the world continues to grow. The boom in EV adoption has driven the development of accessible, fast, and efficient charging infrastructure.
全球道路上的电动汽车数量持续增长。电动汽车普及带来的热潮，推动了便捷、快速且高效的充电基础设施的发展。

However, this expansion also brings with it new cybersecurity risks that have been not been widely studied, and for which there are still few viable solutions.
然而，这种扩张也带来了尚未被广泛研究的新型网络安全风险，且目前针对这些风险的有效解决方案寥寥无几。

Cristina Alcaraz, an infrastructure-security researcher at Spain’s University of Malaga, explains that the liability of electric-vehicle charging stations is due to the fact that they integrate multiple physical and digital components. She says this complex architecture not only keeps the chargers working efficiently but also presents a host of new and far-reaching security vulnerabilities. Chargers’ exposure to attacks compromises both the continued adoption of EVs as well as the stability of the electrical grids in the countries where chargers operate.
西班牙马拉加大学的基础设施安全研究员克里斯蒂娜·阿尔卡拉斯（Cristina Alcaraz）解释说，电动汽车充电站的脆弱性源于它们集成了多种物理和数字组件。她表示，这种复杂的架构不仅能保持充电桩的高效运行，同时也带来了一系列深远的新型安全漏洞。充电桩遭受攻击不仅会影响电动汽车的持续普及，还会威胁到充电桩所在国家的电网稳定性。

With the aim of tackling this threat, researchers from the NICS lab at the University of Malaga have developed an innovative proposal to deploy AI agents to protect the infrastructure. These agents are designed to prevent cyberattacks from different vectors, ranging from fraud or energy theft by malicious actors using the charging stations to larger attacks that could damage critical-energy networks.
为了应对这一威胁，马拉加大学 NICS 实验室的研究人员提出了一项创新方案，即部署人工智能（AI）代理来保护基础设施。这些代理旨在防止来自不同途径的网络攻击，范围涵盖恶意行为者利用充电站进行的欺诈或窃电行为，以及可能破坏关键能源网络的更大规模攻击。

The team’s proposal aims to ensure the early and reliable detection of anomalies and attacks to charging networks using the Open Charge Point Protocol. The OCCP standard is one of the most widely used for the operation and management of electric-vehicle chargers. The protocol allows a network of charging stations to communicate with a centralized system that can manage, monitor, and coordinate all energy transactions carried out by the end users.
该团队的方案旨在利用开放充电协议（OCPP）确保对充电网络异常和攻击的早期、可靠检测。OCPP 标准是目前电动汽车充电桩运营和管理中最广泛使用的标准之一。该协议允许充电站网络与中央系统进行通信，从而管理、监控和协调终端用户进行的所有能源交易。

The central system handles a bunch of things remotely, including user authentication, management of the electrical load at each station, monitoring of overall electricity consumption, and technical diagnostics. These capabilities allow for real-time infrastructure control and enable operators to spot and rapidly respond to any anomalous behavior.
中央系统可以远程处理多项任务，包括用户身份验证、各站点电力负荷管理、整体用电量监控以及技术诊断。这些功能实现了对基础设施的实时控制，使运营商能够发现并迅速响应任何异常行为。

However, the authors of the new study point out that current monitoring mechanisms based on this protocol typically just focus on network traffic or local events, so they can only offer a limited view of what is happening across an entire region of infrastructure. The researchers say this limitation makes it difficult to identify where in the system an anomaly is occurring, which network components are compromised, the extent of any vulnerabilities, and the ways in which a potential attack might spread.
然而，这项新研究的作者指出，目前基于该协议的监控机制通常仅关注网络流量或本地事件，因此只能提供对整个基础设施区域内情况的有限视角。研究人员表示，这种局限性使得系统难以识别异常发生的具体位置、哪些网络组件受到损害、漏洞的严重程度，以及潜在攻击可能扩散的方式。

### Call in the AI
### 引入人工智能

The researchers propose a system that uses multiple AI agents. Each station or relevant component of the charging network incorporates AI agents that are capable of analyzing their environment, collecting information, and collaborating with other agents in order to build a comprehensive view of the infrastructure’s present state.
研究人员提出了一种使用多个 AI 代理的系统。充电网络的每个站点或相关组件都集成了 AI 代理，这些代理能够分析其环境、收集信息并与其他代理协作，从而构建出基础设施当前状态的全面视图。

“Each agent assesses the status of chargers, communications, and connected devices to detect anomalies, operational failures, or potential security incidents,” says Alcaraz. “These agents, which are connected to a central-monitoring system, compare the information obtained locally with that of nearby stations, providing a more complete, accurate, and contextualized collaborative view of the situation,” she says. Alcaraz is also the lead author of the report.
“每个代理都会评估充电桩、通信和连接设备的状态，以检测异常、运行故障或潜在的安全事件，”阿尔卡拉斯说。“这些连接到中央监控系统的代理会将本地获取的信息与附近站点的信息进行比较，从而提供一个更完整、准确且具有情境关联的协作视图。”阿尔卡拉斯也是该报告的主要作者。

The work, published in the International Journal of Critical Infrastructure Protection, explains that one of the most novel features of the system is its use of a consensus mechanism based on a mathematical framework known as opinion dynamics.
这项发表在《国际关键基础设施保护杂志》（International Journal of Critical Infrastructure Protection）上的研究解释说，该系统最独特的特征之一是使用了一种基于“意见动力学”（opinion dynamics）数学框架的共识机制。

This approach mimics the processes by which humans exchange information within their own social networks to reach agreements. When applied to computer models, it allows AI agents to share observations with each other and gradually adjust their assessments to build a collective understanding of the overall situation.
这种方法模仿了人类在社交网络中交换信息以达成共识的过程。当应用于计算机模型时，它允许 AI 代理相互分享观察结果，并逐步调整各自的评估，从而对整体情况形成集体认知。

According to the authors, this procedure reduces the risk of the AI agents generating false positives. It also lets the system detect anomalies that might go unnoticed if they were only analyzed locally.
据作者称，这一程序降低了 AI 代理产生误报的风险。它还使系统能够检测到如果仅在本地分析可能会被忽略的异常情况。

The proposed architecture also uses blockchain tech as a trust and validation mechanism. All transactions performed by the agents are recorded in a distributed ledger that cannot be altered afterward, guaranteeing the system’s integrity and traceability.
该架构还利用区块链技术作为信任和验证机制。代理执行的所有交易都记录在分布式账本中，且事后无法篡改，从而保证了系统的完整性和可追溯性。

### Stress Test
### 压力测试

A multi-agent system was tested by researchers in a simulated OCPP-compliant charging environment. During the experiments, the agents were exposed to various anomaly scenarios within the charging network: component failures, communication link errors, and situations that required a coordinated response from multiple parts of the system. In all cases, the AI agents had to identify each local disturbance, share their observations with each other, and collaborate to build a shared understanding of the incident.
研究人员在一个模拟的符合 OCPP 标准的充电环境中对多代理系统进行了测试。在实验过程中，代理们面临了充电网络内的各种异常场景：组件故障、通信链路错误，以及需要系统多个部分协同响应的情况。在所有情况下，AI 代理都必须识别出每个局部干扰，相互分享观察结果，并协作建立对事件的共同理解。

The results showed that the combination of the AI agents, the distributed-consensus mechanism, and blockchain technology provided a global view of the network. The system detected both specific anomalies in individual devices and some behavioral patterns that were affecting multiple-charging stations. Furthermore, the consensus mechanism improved the accuracy of the diagnoses by comparing observations from different agents, increasing the reliability of the reports.
结果表明，AI 代理、分布式共识机制和区块链技术的结合提供了网络的全局视图。该系统不仅检测到了单个设备的特定异常，还识别出了一些影响多个充电站的行为模式。此外，共识机制通过比较不同代理的观察结果，提高了诊断的准确性，增强了报告的可靠性。

The university lab is pleased with the results. “This system provides a new way to guarantee the protection of electric-vehicle charging infrastructure,” it said in a press statement.
该大学实验室对结果感到满意。他们在新闻声明中表示：“该系统为保障电动汽车充电基础设施的安全提供了一种新途径。”

This story was originally published by WIRED en Español and has been translated from Spanish.
本文最初由《连线》西班牙语版（WIRED en Español）发布，并由西班牙语翻译而来。