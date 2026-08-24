---
title: "Terabytes of credentials leaked in massive supply-chain attack"
originalUrl: "https://arstechnica.com/security/2026/08/terabytes-of-credentials-leaked-in-massive-supply-chain-attack/"
date: "2026-08-12T22:15:30.733Z"
---

# Terabytes of credentials leaked in massive supply-chain attack
# 数TB凭据在大型供应链攻击中泄露

Terabytes worth of credentials, many belonging to the world’s biggest and most sensitive organizations, have been exposed in a supply-chain attack on LiteLLM, an open source tool that streamlines AI-driven software development. Microsoft, Amazon, Cisco, Samsung, and Salesforce are only a handful of the entities whose access secrets were exposed.
在一场针对 LiteLLM（一款简化 AI 驱动软件开发的开源工具）的供应链攻击中，数 TB 的凭据遭到泄露，其中许多属于全球规模最大、最敏感的组织。微软、亚马逊、思科、三星和 Salesforce 等仅仅是其访问密钥被曝光的众多实体中的一小部分。

The revelation was posted on Tuesday and Wednesday by security firms CloudSEK and Hudson Rock. CloudSEK said it found cloud keys, repository tokens, SSH keys, Kubernetes secrets, package publishing credentials, environment variables, and AI provider keys that could allow attackers to gain access to more than 2,500 organizations.
安全公司 CloudSEK 和 Hudson Rock 于周二和周三披露了这一消息。CloudSEK 表示，他们发现了云密钥、存储库令牌、SSH 密钥、Kubernetes 机密、包发布凭据、环境变量以及 AI 提供商密钥，这些信息可能使攻击者能够访问超过 2,500 个组织。

40 minutes is all it takes. The credentials were extracted during a 40-minute window in March while the victims used compromised versions of LiteLLM downloaded from the package’s official location in the Python Package Index repository. Hudson Rock said it made the discovery after analyzing a 195TB file that it obtained. Neither firm identified the source of the information.
只需 40 分钟。这些凭据是在 3 月份的一个 40 分钟窗口期内被提取的，当时受害者使用了从 Python 包索引（PyPI）官方仓库下载的受感染 LiteLLM 版本。Hudson Rock 表示，他们在分析了一个获取到的 195TB 文件后发现了这一情况。两家公司均未透露该信息来源。

The LiteLLM compromise was the result of a previous supply-chain attack that infected the widely used vulnerability scanner Trivy. Other software infected in the campaign includes KICS and the Telnyx Python SDK. TeamPCP, a ramshackle but extremely capable gang largely made up of teenagers, took credit for the attack, and researchers have largely corroborated the claim.
LiteLLM 的受损是此前针对广泛使用的漏洞扫描器 Trivy 的供应链攻击所导致的结果。在此次攻击活动中受感染的其他软件还包括 KICS 和 Telnyx Python SDK。一个主要由青少年组成、组织松散但能力极强的黑客组织 TeamPCP 宣称对此次攻击负责，研究人员在很大程度上证实了这一说法。

“I’ve confirmed the data is legit by the way, multiple victim orgs,” independent security researcher Kevin Beaumont said. “It contains a significant volume of sensitive content at orgs. It’s a massive supply chain breach due to poor AI security—not because AI is the threat, but teens can run circles around orgs obsessed with rushing out AI and poor DevOps security.”
独立安全研究员 Kevin Beaumont 表示：“顺便说一下，我已经确认这些数据是真实的，涉及多个受害者组织。它包含了这些组织中大量的敏感内容。这是一次大规模的供应链泄露，原因在于糟糕的 AI 安全性——并不是因为 AI 本身是威胁，而是因为那些沉迷于匆忙推出 AI 功能且 DevOps 安全性薄弱的组织，被这群青少年玩弄于股掌之间。”

The compromised versions of all four software packages contained code that accessed the memory of infected machines, scraped its contents, and exfiltrated it through an attacker-controlled channel. The data is filled with an assortment of information. Interspersed in the wall of data are credentials to software pipelines maintained by the tens of thousands of organizations that ran LiteLLM during the 40-minute span that the supply-chain attack remained active.
所有四个受感染的软件包版本都包含一段代码，该代码会访问受感染机器的内存，抓取其内容，并通过攻击者控制的通道将其外泄。这些数据中充斥着各种信息。在海量数据中穿插着数万个组织在供应链攻击活跃的 40 分钟内运行 LiteLLM 时所维护的软件流水线凭据。

In all, both security firms said some 434,000 CI/CD (continuous integration/continuous delivery) software pipelines had credentials exposed after running the compromised LiteLLM versions. In many cases, researchers at CloudSEK and Hudson Rock had trouble identifying the organizations the credentials belonged to. For instance, an email address in the dump from the domain @siriusxm.com ultimately didn’t indicate a breach at the satellite broadcaster, but rather one within the infrastructure of SiriusXM subsidiary AdsWizz.
总而言之，两家安全公司表示，在运行了受感染的 LiteLLM 版本后，约有 434,000 个 CI/CD（持续集成/持续交付）软件流水线的凭据被泄露。在许多情况下，CloudSEK 和 Hudson Rock 的研究人员难以识别这些凭据所属的组织。例如，泄露数据中一个来自 @siriusxm.com 域名的电子邮件地址，最终显示的并非卫星广播公司的泄露，而是其子公司 AdsWizz 基础设施内的泄露。

The researchers had high confidence that these organizations had their credentials exposed: Nvidia Corporation, Amazon Web Services (AWS), Samsung Electronics, Salesforce, Inc., Cisco Systems, Inc., F. Hoffmann-La Roche AG, ServiceNow, Siemens AG, S&P Global, Airbus US Space & Defense, John Deere, Regeneron Pharmaceuticals, Inc., London Stock Exchange Group (LSEG), Thomson Reuters, FedEx, Munich Re, MediaTek Inc., Volkswagen AG, Deloitte, The Kroger Co., Siemens Energy, Thales Group, X Corp (Twitter), Zscaler, Inc., Epic Games, Orange S.A., HP Inc., Philips, Fortum Oyj, Vodafone Group Plc, Carl Zeiss AG, Deutsche Bahn AG, NGINX, Inc., BT Group, Liebherr, Krungthai Bank Public Company Limited, Roku, Inc.
研究人员高度确信以下组织的凭据已泄露：英伟达、亚马逊云科技 (AWS)、三星电子、Salesforce、思科、罗氏制药、ServiceNow、西门子、标普全球、空客美国防务与航天、约翰迪尔、再生元制药、伦敦证券交易所集团 (LSEG)、汤森路透、联邦快递、慕尼黑再保险、联发科、大众汽车、德勤、克罗格、西门子能源、泰雷兹集团、X Corp (Twitter)、Zscaler、Epic Games、Orange S.A.、惠普、飞利浦、Fortum Oyj、沃达丰集团、卡尔蔡司、德国铁路、NGINX、英国电信集团、利勃海尔、泰京银行、Roku 等。

“Many CI/CD pipelines are configured generically,” Hudson Rock said. “The dumped variables contain active database passwords, third-party API keys, and cloud credentials without any identifiable company email, custom domain string, or internal server name. This means countless organizations currently have active secrets sitting in this database, completely unaware of their exposure.”
Hudson Rock 表示：“许多 CI/CD 流水线的配置非常通用。泄露的变量中包含活动的数据库密码、第三方 API 密钥和云凭据，且没有任何可识别的公司电子邮件、自定义域名字符串或内部服务器名称。这意味着无数组织目前仍有活动的机密存放在这个数据库中，却完全不知道自己已经泄露。”

Welcome to the new world of supply-chain attacks. Both firms are urging all organizations that used the compromised versions of LiteLLM—particularly those listed in the high-confidence section of the list—to thoroughly rotate all credentials in their pipelines.
欢迎来到供应链攻击的新世界。两家公司都敦促所有使用过受感染 LiteLLM 版本的组织——特别是名单中高置信度部分的组织——彻底轮换其流水线中的所有凭据。

Hudson Rock instructed any organization that uses any AI proxy infrastructure, third-party CI/CD vulnerability scanners, or downstream AI packages to immediately audit their environment for versions 1.82.7 and 1.82.8 of LiteLLM, the two compromised versions of the software. The firm advised all those affected to perform “aggressive credential revocation,” assume any secret accessible to the LiteLLM environment is compromised, invalidate and rotate all cloud keys, Kubernetes service account tokens, and GitLab/GitHub PATs, and audit logging and egress filtering.
Hudson Rock 指示任何使用 AI 代理基础设施、第三方 CI/CD 漏洞扫描器或下游 AI 包的组织，立即审计其环境中是否存在 LiteLLM 的 1.82.7 和 1.82.8 版本（这两个受感染的软件版本）。该公司建议所有受影响者执行“激进的凭据撤销”，假设任何 LiteLLM 环境可访问的机密均已泄露，作废并轮换所有云密钥、Kubernetes 服务账户令牌以及 GitLab/GitHub 个人访问令牌 (PAT)，并进行日志审计和出口过滤。

As a cautionary tale, CloudSEK said that Trivy developers rotated, but failed to fully revoke an automation token over a 20-day window. The lapse gave the attackers a nearly three-week period to force-push malicious code to third-party builds that used the vulnerability scanner. As Beaumont observed, organizations’ rush to integrate AI into their software delivery systems has also greatly contributed to the scale of the damage. Ultimately, the new revelations concerning the LiteLLM supply-chain attack underscore the growing threat of such campaigns and hence the importance of maintaining vigilance around the use of open source software that, when infected, can spread rapidly across the industry.
作为一个警示案例，CloudSEK 指出，Trivy 的开发人员在 20 天的时间窗口内轮换了自动化令牌，但未能完全撤销。这一疏忽给了攻击者近三周的时间，将恶意代码强制推送到使用该漏洞扫描器的第三方构建中。正如 Beaumont 所观察到的，组织急于将 AI 集成到其软件交付系统中，也极大地加剧了损害规模。最终，关于 LiteLLM 供应链攻击的新披露凸显了此类攻击日益增长的威胁，因此，在使用开源软件时保持警惕至关重要，因为一旦感染，它们可能会在整个行业内迅速蔓延。