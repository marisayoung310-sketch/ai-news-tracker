---
title: "Government of Alberta uses Claude to find and fix cybersecurity vulnerabilities across government systems"
originalUrl: "https://www.anthropic.com/news/alberta-government-claude-cybersecurity"
date: "2026-07-06T22:45:30.441Z"
---

# Government of Alberta uses Claude to find and fix cybersecurity vulnerabilities across government systems
# 阿尔伯塔省政府利用 Claude 发现并修复政府系统中的网络安全漏洞

Since 2025, the Government of Alberta has been using Claude Code with both Opus and Sonnet models to review its systems, find vulnerabilities, and fix them. A team inside Alberta’s Ministry of Technology and Innovation scanned 466 million lines of code in 20 hours, remediated security gaps across its systems, and built new tools to make those systems safer.
自 2025 年以来，阿尔伯塔省政府一直使用搭载 Opus 和 Sonnet 模型的 Claude Code 来审查其系统、发现漏洞并进行修复。阿尔伯塔省技术与创新部的一个团队在 20 小时内扫描了 4.66 亿行代码，修复了系统中的安全漏洞，并构建了新工具以提升系统安全性。

We’re sharing details of their experience as an example of how government agencies can use Claude and Claude Code to secure their systems at a large scale. This is a critical challenge, as governments rely on these systems to deliver benefits and keep services running—yet the code is often old, insecure, and incompletely documented. Alberta has also published a collection of technical white papers documenting its efforts for other governments to learn from; you can read them here.
我们分享他们的经验细节，旨在为政府机构如何利用 Claude 和 Claude Code 大规模保障系统安全提供范例。这是一个严峻的挑战，因为政府依赖这些系统来发放福利并维持服务运行，但这些代码往往陈旧、不安全且文档不全。阿尔伯塔省还发布了一系列技术白皮书，记录了他们的工作成果，供其他政府参考；您可以点击此处阅读。

“Albertans trust their government with some of the most sensitive information in their lives, and it is our responsibility to protect it,” said Nate Glubish, Alberta’s Minister of Technology and Innovation. “By using AI to find and fix vulnerabilities across our systems, we accomplished in hours what would have taken a traditional approach years to complete. This is what responsible government looks like in the AI era, and the best is still ahead of us.”
“阿尔伯塔省民众将他们生活中最敏感的信息托付给政府，保护这些信息是我们的责任，”阿尔伯塔省技术与创新部长 Nate Glubish 表示。“通过利用人工智能发现并修复系统漏洞，我们仅用数小时就完成了传统方法需要数年才能完成的工作。这就是人工智能时代负责任政府的样子，而最好的成果还在后头。”

### Alberta’s approach
### 阿尔伯塔省的方法

Alberta’s Ministry of Technology and Innovation maintains the systems of all 27 provincial ministries, from social services to public safety to wildfire response. That includes roughly 1,280 applications and 3,400 code repositories. Most of it has never undergone a systematic security review, and the accumulated technical debt—insecure code, unaddressed bugs, outdated software—runs into the billions of dollars.
阿尔伯塔省技术与创新部负责维护全省 27 个政府部门的系统，涵盖从社会服务、公共安全到野火应对等各个领域。这包括约 1,280 个应用程序和 3,400 个代码库。其中大部分系统从未经过系统的安全审查，积累的技术债务（如不安全的代码、未解决的漏洞、过时的软件）价值高达数十亿美元。

The Ministry’s systems hold highly sensitive information, including tax records, government procurement data, and social services case files. So in 2025, the Ministry set up an internal team with a mandate to make these systems more secure and easier to maintain over time, working with Claude to do so.
该部的系统存储着高度敏感的信息，包括税务记录、政府采购数据和社会服务案例档案。因此，该部在 2025 年成立了一个内部团队，旨在使这些系统更加安全且更易于长期维护，并为此与 Claude 展开合作。

Already, the Ministry has used Claude to:
目前，该部已经利用 Claude 完成了以下工作：

**Assess 466 million lines of government code in 20 hours.** The team put Claude to work on the codebases it maintains, using Claude Code with Claude Opus and Sonnet models. Around 50 agents worked autonomously and in parallel to scan the systems for security vulnerabilities, weaknesses in underlying infrastructure and deployment processes, and gaps in technical documentation. Claude Code ran a two-stage routine, first scanning each repository with a rules engine to flag known patterns, then reviewing those flags and citing the exact file and line for each finding so developers could verify them. The scan covered every repository Alberta owns and identified issues that traditional automated scanning tools had missed. It took about 20 hours for Alberta’s implementation; the team estimates that that kind of review could otherwise have taken around 6.5 years.
**在 20 小时内评估了 4.66 亿行政府代码。** 该团队利用搭载 Claude Opus 和 Sonnet 模型的 Claude Code 对其维护的代码库进行了处理。约 50 个智能体自主并行工作，扫描系统中的安全漏洞、底层基础设施和部署流程中的弱点，以及技术文档中的缺失。Claude Code 执行了两阶段程序：首先使用规则引擎扫描每个代码库以标记已知模式，然后审查这些标记并指出每个发现的具体文件和行号，以便开发人员进行验证。此次扫描覆盖了阿尔伯塔省拥有的所有代码库，并识别出了传统自动化扫描工具遗漏的问题。阿尔伯塔省的实施过程耗时约 20 小时；团队估计，如果采用传统方式，此类审查可能需要约 6.5 年。

**Fix the vulnerabilities the scan found.** Where the scan identified a vulnerability, Claude Code could often generate a fix, test it, and build it. In cases where a system lacked the automated tests needed to confirm that a patch was safe, Claude wrote the tests first. Where the code was too outdated or too complex to patch efficiently in its existing form, Claude rebuilt it in a more modern and maintainable language. In some scenarios, these systems could be rebuilt in as little as four to five days, including a subsidy program portal that was originally hand-coded in Java roughly 25 years ago and took five months to build the first time. All of this was done in partnership with the Ministry’s engineers: before any patch shipped, it was reviewed and approved by the team.
**修复扫描发现的漏洞。** 当扫描识别出漏洞时，Claude Code 通常能够生成修复程序、进行测试并完成构建。在系统缺乏确认补丁安全性所需的自动化测试的情况下，Claude 会先编写测试。如果代码过于陈旧或复杂，无法以现有形式高效修补，Claude 会使用更现代、更易于维护的语言对其进行重构。在某些情况下，这些系统仅需四到五天即可完成重构，其中包括一个最初由人工使用 Java 编写、耗时五个月才建成的补贴项目门户网站（距今约 25 年）。所有这些工作都是与该部的工程师合作完成的：在任何补丁发布之前，都会经过团队的审查和批准。

**Run continuous security review.** Alberta’s cybersecurity team also built a set of specialized Claude review agents that run throughout the development process. A “red team” agent probes an application from the outside, the way an attacker might, and maps how a vulnerability might be exploited. A “blue team” agent then assesses the application’s defenses against an international security standard, and writes a remediation plan that points to the exact files to fix. Additional agents check code quality and the clarity of the writing the public sees. Every application is checked against roughly 95 security controls on each pass. These agents are built on top of the Claude Agent SDK and run a robust series of checks and analysis for every application.
**进行持续的安全审查。** 阿尔伯塔省的网络安全团队还构建了一套专门的 Claude 审查智能体，贯穿整个开发过程。“红队”智能体像攻击者一样从外部探测应用程序，并绘制出漏洞可能被利用的方式。“蓝队”智能体则根据国际安全标准评估应用程序的防御能力，并编写一份指出具体修复文件的补救计划。其他智能体则负责检查代码质量以及公众所见内容的清晰度。每次检查都会对照约 95 项安全控制措施对每个应用程序进行评估。这些智能体基于 Claude Agent SDK 构建，为每个应用程序运行一系列稳健的检查和分析。

In addition to scanning, securing, and modernizing its own systems, Alberta is training both government workers and the public in the use of AI through the Alberta AI Academy. Thousands of government employees and more than 10,000 members of the public have used the platform to learn the essentials of effective AI use, from prompting through enterprise application delivery. Through the Academy, the Ministry of Technology and Innovation aims to extend its approach beyond a single team or project to every ministry that needs it.
除了扫描、保护和现代化其自身系统外，阿尔伯塔省还通过“阿尔伯塔人工智能学院”（Alberta AI Academy）培训政府工作人员和公众使用人工智能。数千名政府雇员和超过 10,000 名公众利用该平台学习有效使用人工智能的要点，内容涵盖从提示词工程到企业级应用交付。通过该学院，技术与创新部旨在将其方法推广到每一个有需要的部门，而不仅仅局限于单一团队或项目。

### Looking ahead
### 展望未来

Today, Claude helps the Ministry write, review, and deploy code that aids in its modernization efforts. Next, it plans to expand that work with AI agents that can build entirely new software and tools alongside engineers.
如今，Claude 正在帮助该部编写、审查和部署代码，助力其现代化进程。接下来，该部计划通过能够与工程师并肩构建全新软件和工具的人工智能智能体来扩展这项工作。

The Government of Alberta also plans to continue its modernization work. One ministry, for example, has 185 legacy applications running in production, which are expensive to maintain and difficult to update. The Government plans to use Claude Code to analyze these systems, understand what they do, and consolidate them into 16 reusable applications built on modern coding languages and conventions. The goal is to reduce complexity, lower maintenance costs, and speed up modernization work that would otherwise take years to complete.
阿尔伯塔省政府还计划继续推进其现代化工作。例如，某部门目前有 185 个遗留应用程序在生产环境中运行，这些程序维护成本高昂且难以更新。政府计划利用 Claude Code 分析这些系统，了解其功能，并将它们整合为 16 个基于现代编程语言和规范构建的可重用应用程序。其目标是降低复杂性、减少维护成本，并加速那些原本需要数年才能完成的现代化工作。