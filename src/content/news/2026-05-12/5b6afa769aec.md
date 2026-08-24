---
title: "Google stopped a zero-day hack that it says was developed with AI"
originalUrl: "https://www.theverge.com/tech/928007/google-ai-zero-day-exploit-stopped"
date: "2026-05-11T22:43:19.260Z"
---

# Google stopped a zero-day hack that it says was developed with AI
# 谷歌拦截了一起据称由人工智能开发的零日漏洞攻击

For the first time, Google says it has spotted and stopped a zero-day exploit developed with AI. According to a report from Google Threat Intelligence Group (GTIG), “prominent cyber crime threat actors” were planning to use the vulnerability for a “mass exploitation event” that would have allowed them to bypass two-factor authentication on an unnamed “open-source, web-based system administration tool.”

谷歌表示，这是其首次发现并拦截了一起由人工智能开发的零日漏洞攻击。根据谷歌威胁情报小组（GTIG）的一份报告，“知名的网络犯罪威胁行为者”原计划利用该漏洞进行“大规模利用事件”，这将使他们能够绕过某款未具名的“开源、基于 Web 的系统管理工具”的双重身份验证。

Google’s researchers found hints in the Python script used for the exploit that indicated help from AI, like a “hallucinated CVSS score” and “structured, textbook” formatting consistent with LLM training data. The exploit takes advantage of “a high-level semantic logic flaw where the developer hardcoded a trust assumption” in the platform’s 2FA system. This follows weeks of hand-wringing over the capabilities of cybersecurity-focused AI models like Anthropic’s Mythos and a recently disclosed Linux vulnerability that was discovered with AI assistance.

谷歌研究人员在用于该漏洞的 Python 脚本中发现了人工智能辅助的迹象，例如“虚构的 CVSS 评分”以及与大语言模型（LLM）训练数据一致的“结构化、教科书式”格式。该漏洞利用了平台双重身份验证系统中“开发人员硬编码信任假设的高级语义逻辑缺陷”。此前，人们对 Anthropic 的 Mythos 等专注于网络安全的人工智能模型的能力，以及最近披露的在人工智能辅助下发现的 Linux 漏洞感到担忧，这种担忧已持续数周。

It’s the first time Google has found evidence that AI was involved in an attack like this, although Google’s researchers note that they “do not believe Gemini was used.” Google says it was able to “disrupt” this particular exploit, but also says hackers are increasingly using AI to find and take advantage of security vulnerabilities. The report also mentions AI as a target for attackers, saying “GTIG has observed adversaries increasingly target the integrated components that grant AI systems their utility, such as autonomous skills and third-party data connectors.”

这是谷歌首次发现人工智能参与此类攻击的证据，尽管谷歌研究人员指出他们“不认为该攻击使用了 Gemini”。谷歌表示，它已经能够“破坏”这一特定漏洞，但也指出黑客正越来越多地利用人工智能来发现和利用安全漏洞。报告还提到人工智能本身也成为了攻击者的目标，称“GTIG 观察到对手越来越多地针对赋予人工智能系统效用的集成组件，例如自主技能和第三方数据连接器。”

Google’s report also details how hackers are using “persona-driven jailbreaking” to get AI to find security vulnerabilities for them, like an example prompt that instructs the AI to pretend it’s a security expert. Hackers are also feeding AI models whole repositories of vulnerability data and using OpenClaw in ways that suggest “an interest in refining AI-generated payloads within controlled settings to increase exploit reliability prior to deployment.”

谷歌的报告还详细介绍了黑客如何使用“角色驱动的越狱”来诱导人工智能为他们寻找安全漏洞，例如通过提示词指令让 AI 假装成一名安全专家。黑客还将整个漏洞数据库输入人工智能模型，并以某种方式使用 OpenClaw，这表明他们“有兴趣在受控环境中优化人工智能生成的有效载荷，以在部署前提高攻击的可靠性。”