---
title: "OpenAI says hackers stole some data after latest code security issue"
originalUrl: "https://techcrunch.com/2026/05/14/openai-says-hackers-stole-some-data-after-latest-code-security-issue/"
date: "2026-05-14T22:38:53.324Z"
---

# OpenAI says hackers stole some data after latest code security issue
# OpenAI 表示在最新的代码安全事件后，黑客窃取了部分数据

Earlier this week, hackers hijacked several open source projects used by dozens of companies and pushed updates designed to spread malware. This is the latest in a string of recent supply-chain attacks targeting software developers and their projects.
本周早些时候，黑客劫持了数十家公司使用的多个开源项目，并推送了旨在传播恶意软件的更新。这是近期针对软件开发者及其项目的一系列供应链攻击中的最新一起。

On Wednesday, OpenAI confirmed that two employees had their devices “impacted by this attack.” But, after an investigation, the company said in a blog post that it found “no evidence that OpenAI user data was accessed, that our production systems or intellectual property were compromised, or that our software was altered.”
周三，OpenAI 证实有两名员工的设备“受到了此次攻击的影响”。但在调查后，该公司在一篇博文中表示，没有发现“OpenAI 用户数据被访问、生产系统或知识产权受损，或软件被篡改的证据”。

OpenAI said that employees’ devices were compromised by an earlier attack on TanStack, a popular open source library that helps developers build web apps. On Monday, TanStack disclosed the attack and published a postmortem, saying hackers published 84 malicious versions of its software during a six-minute window. The project said a researcher detected the attack within 20 minutes.
OpenAI 表示，员工设备是由于此前针对 TanStack 的攻击而受到波及的，TanStack 是一个帮助开发者构建 Web 应用的流行开源库。周一，TanStack 披露了此次攻击并发布了事后分析报告，称黑客在六分钟内发布了 84 个恶意版本的软件。该项目组表示，一名研究人员在 20 分钟内就发现了此次攻击。

The malicious TanStack versions included malware that was designed to steal credentials from computers that the software was installed on and to self-propagate to spread to other systems.
这些恶意的 TanStack 版本包含恶意软件，旨在从安装了该软件的计算机中窃取凭据，并进行自我复制以传播到其他系统。

On its part, OpenAI said that it saw unauthorized access and theft of credentials “in a limited subset of internal source code repositories to which the two impacted employees had access.” According to the AI giant, “only limited credential material” was taken from the affected code repositories.
OpenAI 方面表示，他们发现“两名受影响员工有权访问的有限内部源代码存储库”中存在未经授权的访问和凭据窃取行为。据这家人工智能巨头称，从受影响的代码存储库中仅获取了“有限的凭据材料”。

As a precaution, given that the affected repositories contained digital certificates used to sign OpenAI’s products, the company said it’s rotating the certificates “as a precaution,” which will require macOS users to update the app. “We have found no evidence of compromise or risk to existing software installations,” the company wrote.
作为预防措施，鉴于受影响的存储库中包含用于签署 OpenAI 产品的数字证书，该公司表示正在“出于预防目的”轮换这些证书，这将要求 macOS 用户更新应用程序。该公司写道：“我们没有发现现有软件安装受到损害或存在风险的证据。”

It's not clear who is behind the TanStack attack. Some of the past supply-chain hacks have been attributed to a hacking gang known as TeamPCP, a group that was itself a target of hackers. But there have been other groups that have employed the same tactics against other projects.
目前尚不清楚谁是 TanStack 攻击的幕后黑手。过去的一些供应链黑客攻击被归咎于一个名为 TeamPCP 的黑客组织，该组织本身也曾是黑客的目标。但也有其他组织对其他项目采用了同样的策略。

In March, North Korean hackers hijacked Axios, a popular open source development tool, and pushed malware that could have infected millions of developers. And in May, Chinese hackers were accused of a similar attack targeting thousands of Windows computers running disc-imaging software Daemon Tools.
今年 3 月，朝鲜黑客劫持了流行的开源开发工具 Axios，并推送了可能感染数百万开发者的恶意软件。5 月，中国黑客被指控对运行磁盘映像软件 Daemon Tools 的数千台 Windows 计算机进行了类似的攻击。

In these attacks, instead of targeting specific companies, hackers take over open source projects and push out malware disguised as innocuous regular updates. This allows them to potentially compromise dozens of targets with just one hack, spreading the damage across the internet.
在这些攻击中，黑客不再针对特定公司，而是接管开源项目，并推送伪装成无害常规更新的恶意软件。这使他们能够通过一次黑客攻击就有可能破坏数十个目标，从而在互联网上造成广泛损害。