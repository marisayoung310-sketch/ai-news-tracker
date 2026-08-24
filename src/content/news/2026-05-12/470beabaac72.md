---
title: "AI-Powered Zero-Days Bypass 2FA; Passkey & Git Supply Chain Attacks Explored"
originalUrl: "https://dev.to/soytuber/ai-powered-zero-days-bypass-2fa-passkey-git-supply-chain-attacks-explored-5cnc"
date: "2026-05-11T23:13:55.729Z"
---

# AI-Powered Zero-Days Bypass 2FA; Passkey & Git Supply Chain Attacks Explored
# AI 驱动的零日漏洞绕过双重身份验证 (2FA)；Passkey 与 Git 供应链攻击深度解析

### Today's Highlights
### 今日要点

Today's highlights cover groundbreaking AI-developed zero-day 2FA bypasses and critical insights into defeating passkeys in phishing assessments. We also delve into the growing threat of malware spread via Git repositories, offering practical hardening guidance for software supply chains.
今日要点涵盖了 AI 开发的突破性零日 2FA 绕过技术，以及在钓鱼测试中破解 Passkey 的关键见解。我们还将深入探讨通过 Git 存储库传播恶意软件这一日益严重的威胁，并为软件供应链提供实用的加固指南。

---

### Hackers Used AI to Develop First Known Zero-Day 2FA Bypass for Mass Exploitation (r/cybersecurity)
### 黑客利用 AI 开发出首个已知用于大规模利用的零日 2FA 绕过漏洞 (r/cybersecurity)

**Source:** [Reddit Link](https://reddit.com/r/cybersecurity/comments/1ta77wc/hackers_used_ai_to_develop_first_known_zeroday_2fa_bypass_for_mass_exploitation/)

This groundbreaking report indicates that cybercriminals have leveraged Artificial Intelligence to engineer the first known zero-day vulnerability capable of bypassing two-factor authentication (2FA) for mass exploitation. The attack method, while not yet fully detailed publicly, represents a significant escalation in the AI arms race within cybersecurity.
这份突破性的报告指出，网络犯罪分子已利用人工智能设计出首个已知的零日漏洞，能够绕过双重身份验证 (2FA) 并进行大规模利用。尽管该攻击方法的细节尚未完全公开，但这标志着网络安全领域的 AI 军备竞赛显著升级。

This vulnerability targets the fundamental mechanisms of 2FA, traditionally considered a robust layer of defense against unauthorized access. The use of AI in discovering and developing such an exploit allows for rapid analysis of complex authentication protocols and the identification of subtle weaknesses that human researchers might overlook or take longer to find.
该漏洞针对的是 2FA 的基本机制，而 2FA 传统上被认为是防御未经授权访问的强大防线。利用 AI 来发现和开发此类漏洞，可以快速分析复杂的身份验证协议，并识别出人类研究人员可能忽略或需要更长时间才能发现的细微弱点。

The implications for enterprise security are profound, as the ability to bypass 2FA at scale could undermine numerous existing security postures that rely heavily on this control. Organizations must accelerate their research into AI-driven defensive strategies and consider advanced adaptive authentication mechanisms that can detect and mitigate novel bypass techniques.
这对企业安全的影响是深远的，因为大规模绕过 2FA 的能力可能会破坏许多严重依赖此控制措施的现有安全态势。组织必须加快对 AI 驱动防御策略的研究，并考虑采用先进的自适应身份验证机制，以检测并缓解新型绕过技术。

This development underscores the urgent need for continuous vigilance, proactive threat hunting, and investment in AI-powered security solutions to counteract the increasingly sophisticated attacks being mounted by adversaries using similar technologies. It pushes the boundaries of "newly disclosed CVEs & zero-days" into a new era where the discovery mechanism itself is automated and advanced.
这一进展强调了持续警惕、主动威胁搜寻以及投资 AI 驱动的安全解决方案的紧迫性，以对抗对手利用类似技术发起的日益复杂的攻击。它将“新披露的 CVE 和零日漏洞”的界限推向了一个新时代，即发现机制本身已实现自动化和高级化。

**Comment:** This is a terrifying development. If AI can craft zero-day 2FA bypasses, every authentication system needs immediate re-evaluation, and relying solely on traditional 2FA is no longer enough. Defenders need to pivot fast.
**评论：** 这是一个可怕的发展。如果 AI 能够制造零日 2FA 绕过漏洞，那么每一个身份验证系统都需要立即重新评估，仅依赖传统的 2FA 已不再足够。防御者必须迅速转型。

---

### How I Defeat Passkeys Nearly Every Time in Phishing Assessments (r/netsec)
### 我如何在钓鱼测试中几乎每次都能破解 Passkey (r/netsec)

**Source:** [Reddit Link](https://reddit.com/r/netsec/comments/1ta90iv/how_i_defeat_passkeys_nearly_every_time_in_phishing_assessments/)

This article provides a critical, practical guide on exploiting vulnerabilities in passkey implementations during phishing assessments. Contrary to popular belief that passkeys are inherently phishing-resistant, the author demonstrates repeatable methods to bypass them.
本文提供了一份关键且实用的指南，介绍了如何在钓鱼测试中利用 Passkey 实现中的漏洞。与人们普遍认为 Passkey 天生具有防钓鱼能力的观点相反，作者演示了绕过它们的重复性方法。

The core of the technique often revolves around social engineering users into granting unintended permissions or interacting with malicious prompts, leveraging gaps in user understanding or specific design choices in passkey workflows rather than breaking the cryptographic underpinnings.
该技术的核心通常围绕社会工程学展开，诱导用户授予非预期的权限或与恶意提示进行交互，利用用户理解上的差距或 Passkey 工作流程中的特定设计选择，而不是破解其加密基础。

While passkeys significantly enhance security by eliminating shared secrets and relying on device-bound credentials, their effectiveness can be undermined by flawed implementation or user interaction design. The insights offered are invaluable for security professionals aiming to improve their organization's authentication posture and develop more robust defenses.
虽然 Passkey 通过消除共享密钥并依赖设备绑定凭据显著增强了安全性，但其有效性可能会因实现缺陷或用户交互设计不当而受损。对于旨在改善组织身份验证态势并建立更强大防御的安全专业人员来说，这些见解极具价值。

By understanding the common pitfalls and exploitation vectors, teams can refine their passkey deployment strategies, enhance user education programs, and implement additional layers of protection. This includes focusing on user experience that clearly differentiates legitimate requests from malicious ones, as well as integrating stronger fraud detection mechanisms.
通过了解常见的陷阱和利用向量，团队可以优化其 Passkey 部署策略，加强用户教育计划，并实施额外的保护层。这包括专注于能够清晰区分合法请求与恶意请求的用户体验，以及集成更强大的欺诈检测机制。

The practical demonstrations serve as a compelling argument for a defense-in-depth approach, emphasizing that even the most advanced authentication technologies require careful deployment and continuous assessment to truly deliver their promised security benefits, aligning with practical hardening guides.
这些实际演示有力地证明了纵深防御方法的必要性，强调即使是最先进的身份验证技术，也需要谨慎部署和持续评估，才能真正实现其承诺的安全效益，这与实用的加固指南不谋而合。

**Comment:** Passkeys are a huge step forward, but this article highlights that the human element and implementation details are still weak links. We need better UX and training to make them truly phish-proof.
**评论：** Passkey 是巨大的进步，但本文强调了人为因素和实现细节仍然是薄弱环节。我们需要更好的用户体验和培训，才能使它们真正实现防钓鱼。

---

### Be careful with your Git: Investigating malware spreading through Git repositories (r/cybersecurity)
### 小心你的 Git：调查通过 Git 存储库传播的恶意软件 (r/cybersecurity)

**Source:** [Reddit Link](https://reddit.com/r/cybersecurity/comments/1ta7v8z/be_careful_with_your_git_investigating_malware_spreading_through_git_repositories/)

This investigation sheds light on an increasingly prevalent supply chain attack vector: the distribution of malware through compromised or maliciously crafted Git repositories. Attackers are exploiting the trust developers place in version control systems and code sharing platforms to inject malicious code directly into development workflows.
这项调查揭示了一种日益普遍的供应链攻击向量：通过受损或恶意构建的 Git 存储库分发恶意软件。攻击者正在利用开发人员对版本控制系统和代码共享平台的信任，将恶意代码直接注入开发工作流程中。

This can take various forms, including tainted open-source dependencies, malicious scripts embedded in .git hooks, or even legitimate-looking repositories designed to deliver payloads upon cloning or execution of build processes. The danger is particularly acute because developers frequently clone and integrate code from diverse sources without always conducting thorough security audits.
这可能采取多种形式，包括受污染的开源依赖项、嵌入在 .git hooks 中的恶意脚本，甚至是看起来合法但旨在在克隆或执行构建过程时交付有效载荷的存储库。这种危险尤为严重，因为开发人员经常从不同来源克隆和集成代码，而并不总是进行彻底的安全审计。

The article likely details specific attack patterns, indicators of compromise (IoCs), and practical recommendations for mitigating these risks. To defend against such supply chain attacks, organizations must implement stringent policies for third-party code review, utilize dependency scanning tools, and enforce least privilege principles for development environments.
本文详细介绍了具体的攻击模式、入侵指标 (IoCs) 以及缓解这些风险的实用建议。为了防御此类供应链攻击，组织必须实施严格的第三方代码审查政策，利用依赖项扫描工具，并对开发环境强制执行最小权限原则。

Regular security training for developers on identifying suspicious repository activity and maintaining clean development machines is also crucial. This reinforces the importance of "supply chain attacks" as a primary concern and provides actionable "practical hardening guides" for any team relying on modern development tools.
对开发人员进行识别可疑存储库活动和维护干净开发机器的定期安全培训也至关重要。这强化了“供应链攻击”作为首要关注点的重要性，并为任何依赖现代开发工具的团队提供了可操作的“实用加固指南”。