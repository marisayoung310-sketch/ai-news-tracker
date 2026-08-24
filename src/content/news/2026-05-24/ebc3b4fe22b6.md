---
title: "mukul975 / Anthropic-Cybersecurity-Skills"
originalUrl: "https://github.com/mukul975/Anthropic-Cybersecurity-Skills"
date: "2026-05-23T22:59:15.561Z"
---

# Anthropic-Cybersecurity-Skills

**Anthropic Cybersecurity Skills: The largest open-source cybersecurity skills library for AI agents.**
Anthropic Cybersecurity Skills：面向 AI 智能体的最大开源网络安全技能库。

754 production-grade cybersecurity skills · 26 security domains · 5 framework mappings · 26+ AI platforms
754 项生产级网络安全技能 · 26 个安全领域 · 5 种框架映射 · 26+ 个 AI 平台

Get Started · What's Inside · Frameworks · Platforms · Contributing
快速开始 · 内容概览 · 框架支持 · 平台支持 · 参与贡献

⚠️ **Community Project** — This is an independent, community-created project. Not affiliated with Anthropic PBC.
⚠️ **社区项目** — 这是一个由社区创建的独立项目，与 Anthropic PBC 无关。

### Give any AI agent the security skills of a senior analyst
### 为任何 AI 智能体赋予资深分析师的安全技能

A junior analyst knows which Volatility3 plugin to run on a suspicious memory dump, which Sigma rules catch Kerberoasting, and how to scope a cloud breach across three providers. Your AI agent doesn't — unless you give it these skills.
初级分析师知道在可疑内存转储中运行哪个 Volatility3 插件，知道哪些 Sigma 规则可以捕获 Kerberoasting 攻击，也知道如何界定跨三个云服务商的云泄露范围。而你的 AI 智能体却不知道——除非你赋予它这些技能。

This repo contains 754 structured cybersecurity skills spanning 26 security domains, each following the agentskills.io open standard. Every skill is mapped to five industry frameworks — MITRE ATT&CK, NIST CSF 2.0, MITRE ATLAS, MITRE D3FEND, and NIST AI RMF — making this the only open-source skills library with unified cross-framework coverage.
本仓库包含 754 项结构化网络安全技能，涵盖 26 个安全领域，每一项都遵循 agentskills.io 开放标准。每项技能都映射到五大行业框架（MITRE ATT&CK、NIST CSF 2.0、MITRE ATLAS、MITRE D3FEND 和 NIST AI RMF），使其成为唯一具备统一跨框架覆盖能力的开源技能库。

Clone it, point your agent at it, and your next security investigation gets expert-level guidance in seconds.
克隆该仓库，将其指向你的智能体，你的下一次安全调查即可在几秒钟内获得专家级的指导。

---

### Five frameworks, one skill library
### 五大框架，一个技能库

No other open-source skills library maps every skill to all five frameworks. One skill, five compliance checkboxes.
没有其他开源技能库能将每项技能映射到全部五大框架。一项技能，满足五项合规要求。

| Framework | Version | Scope in this repo | What it maps |
| :--- | :--- | :--- | :--- |
| **框架** | **版本** | **本库范围** | **映射内容** |
| MITRE ATT&CK | v18 | 14 tactics · 200+ techniques | Adversary behaviors and TTPs (攻击者行为与 TTP) |
| NIST CSF 2.0 | 2.0 | 6 functions · 22 categories | Organizational security posture (组织安全态势) |
| MITRE ATLAS | v5.4 | 16 tactics · 84 techniques | AI/ML adversarial threats (AI/ML 对抗性威胁) |
| MITRE D3FEND | v1.3 | 7 categories · 267 techniques | Defensive countermeasures (防御性对策) |
| NIST AI RMF | 1.0 | 4 functions · 72 subcategories | AI risk management (AI 风险管理) |

---

### Quick start
### 快速开始

**# Option 1: npx (recommended)**
**# 选项 1：npx (推荐)**
`npx skills add mukul975/Anthropic-Cybersecurity-Skills`

**# Option 2: Git clone**
**# 选项 2：Git 克隆**
`git clone https://github.com/mukul975/Anthropic-Cybersecurity-Skills.git`
`cd Anthropic-Cybersecurity-Skills`

Works immediately with Claude Code, GitHub Copilot, OpenAI Codex CLI, Cursor, Gemini CLI, and any agentskills.io-compatible platform.
可立即与 Claude Code、GitHub Copilot、OpenAI Codex CLI、Cursor、Gemini CLI 以及任何兼容 agentskills.io 的平台配合使用。

---

### 🌍 GARS-2026 — Global Agentic AI Readiness Survey
### 🌍 GARS-2026 — 全球智能体 AI 就绪度调查

I'm running a global academic study measuring how ready security professionals, developers, and enterprise teams actually are for agentic AI — MCP servers, tool calling, governance, and human-in-the-loop workflows. If you use this repo, your response would be a genuinely valuable data point.
我正在进行一项全球学术研究，旨在衡量安全专业人员、开发人员和企业团队对智能体 AI（MCP 服务器、工具调用、治理和人机协作工作流）的实际就绪程度。如果你使用了本仓库，你的反馈将成为非常有价值的数据点。

📋 **Take the survey (10 min):** [Survey Link]
📋 **参与调查 (10 分钟)：** [调查链接]

---

### Why this exists
### 为什么存在这个项目

The cybersecurity workforce gap hit 4.8 million unfilled roles globally in 2024 (ISC2). AI agents can help close that gap — but only if they have structured domain knowledge to work from.
2024 年，全球网络安全人才缺口已达 480 万个职位 (ISC2)。AI 智能体可以帮助填补这一缺口，但前提是它们必须具备结构化的领域知识。

Today's agents can write code and search the web, but they lack the practitioner playbooks that turn a generic LLM into a capable security analyst. Existing security tool repos give you wordlists, payloads, or exploit code. None of them give an AI agent the structured decision-making workflow a senior analyst follows: when to use each technique, what prerequisites to check, how to execute step-by-step, and how to verify results. That is the gap this project fills.
当前的智能体可以编写代码和搜索网络，但它们缺乏将通用大模型转化为合格安全分析师的实践手册。现有的安全工具库只提供词表、Payload 或漏洞利用代码，没有一个能为 AI 智能体提供资深分析师所遵循的结构化决策工作流：何时使用某种技术、需要检查哪些先决条件、如何分步执行以及如何验证结果。这正是本项目旨在填补的空白。

Anthropic Cybersecurity Skills is not a collection of scripts or checklists. It is an AI-native knowledge base built from the ground up for the agentskills.io standard — YAML frontmatter for sub-second discovery, structured Markdown for step-by-step execution, and reference files for deep technical context. Every skill encodes real practitioner workflows, not generated summaries.
Anthropic Cybersecurity Skills 并非脚本或清单的集合。它是一个专为 agentskills.io 标准从零构建的 AI 原生知识库——利用 YAML 前置元数据实现亚秒级发现，利用结构化 Markdown 实现分步执行，并提供参考文件以获取深层技术背景。每一项技能都编码了真实的从业者工作流，而非生成的摘要。

---

### What's inside — 26 security domains
### 内容概览 — 26 个安全领域

*(Partial list of domains)*
*(部分领域列表)*

*   **Cloud Security (60):** AWS, Azure, GCP hardening · CSPM · cloud forensics
    **云安全 (60)：** AWS、Azure、GCP 加固 · CSPM · 云取证
*   **Threat Hunting (55):** Hypothesis-driven hunts · LOTL detection · behavioral analytics
    **威胁狩猎 (55)：** 基于假设的狩猎 · LOTL 检测 · 行为分析
*   **Threat Intelligence (50):** STIX/TAXII · MISP · feed integration · actor profiling
    **威胁情报 (50)：** STIX/TAXII · MISP · 馈送集成 · 攻击者画像
*   **Web Application Security (42):** OWASP Top 10 · SQLi · XSS · SSRF · deserialization
    **Web 应用安全 (42)：** OWASP Top 10 · SQL 注入 · XSS · SSRF · 反序列化
*   **Malware Analysis (39):** Static/dynamic analysis · reverse engineering · sandboxing
    **恶意软件分析 (39)：** 静态/动态分析 · 逆向工程 · 沙箱技术
*   **Digital Forensics (37):** Disk imaging · memory forensics · timeline reconstruction
    **数字取证 (37)：** 磁盘镜像 · 内存取证 · 时间线重构
*   **Security Operations (36):** SIEM correlation · log analysis · alert triage
    **安全运营 (36)：** SIEM 关联 · 日志分析 · 告警分诊
*   **Identity & Access Management (35):** IAM policies · PAM · zero trust identity · Okta · SailPoint
    **身份与访问管理 (35)：** IAM 策略 · PAM · 零信任身份 · Okta · SailPoint
*   **SOC Operations (33):** Playbooks · escalation workflows · metrics · tabletop exercises
    **SOC 运营 (33)：** 手册 · 升级工作流 · 指标 · 桌面演练
*   **Container Security (30):** K8s RBAC · image scanning · Falco · container forensics
    **容器安全 (30)：** K8s RBAC · 镜像扫描 · Falco · 容器取证
*   **OT/ICS Security (28):** Modbus · DNP3 · IEC 62443 · historian defense · SCADA
    **OT/ICS 安全 (28)：** Modbus · DNP3 · IEC 62443 · 历史数据库防御 · SCADA
*   **API Security (28):** GraphQL · REST · OWASP API Top 10 · WAF bypass
    **API 安全 (28)：** GraphQL · REST · OWASP API Top 10 · WAF 绕过
*   **Vulnerability Management (25):** Nessus · scanning workflows · patch prioritization · CVSS
    **漏洞管理 (25)：** Nessus · 扫描工作流 · 补丁优先级 · CVSS
*   **Incident Response (25):** Breach containment · ransomware response · IR playbooks
    **事件响应 (25)：** 泄露遏制 · 勒索软件响应 · IR 手册
*   **Red Teaming (24):** Full-scope engagements · AD attacks · phishing simulation
    **红队测试 (24)：** 全范围参与 · AD 攻击 · 钓鱼模拟
*   **Penetration Testing (23):** Network · web · cloud · mobile · wireless pentesting
    **渗透测试 (23)：** 网络 · Web · 云 · 移动端 · 无线渗透测试
*   **Endpoint Security (17):** EDR · LOTL detection · fileless malware · persistence hunting
    **终端安全 (17)：** EDR · LOTL 检测 · 无文件恶意软件 · 持久化狩猎
*   **DevSecOps (17):** CI/CD security · code signing · Terraform auditing
    **DevSecOps (17)：** CI/CD 安全 · 代码签名 · Terraform 审计
*   **Phishing Defense (16):** Email authentication · BEC detection · phishing IR
    **钓鱼防御 (16)：** 电子邮件认证 · BEC 检测 · 钓鱼 IR
*   **Cryptography (14):** TLS · Ed25519 · certificate transparency · key management
    **密码学 (14)：** TLS · Ed25519 · 证书透明度 · 密钥管理
*   **Zero Trust Architecture (13):** BeyondCorp · CISA maturity model · microsegmentation
    **零信任架构 (13)：** BeyondCorp · CISA 成熟度模型 · 微分段
*   **Mobile Security (12):** Android/iOS hardening · mobile app pentesting
    **移动安全 (12)：** Android/iOS 加固 · 移动应用渗透测试