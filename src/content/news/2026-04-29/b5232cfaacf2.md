---
title: "Introducing Claude Opus 4.7"
originalUrl: "https://www.anthropic.com/news/claude-opus-4-7"
date: "2026-04-29T06:11:37.946Z"
---

# Introducing Claude Opus 4.7
# Claude Opus 4.7 发布

Our latest model, Claude Opus 4.7, is now generally available.
我们最新的模型 Claude Opus 4.7 现已全面开放使用。

Opus 4.7 is a notable improvement on Opus 4.6 in advanced software engineering, with particular gains on the most difficult tasks. Users report being able to hand off their hardest coding work—the kind that previously needed close supervision—to Opus 4.7 with confidence. Opus 4.7 handles complex, long-running tasks with rigor and consistency, pays precise attention to instructions, and devises ways to verify its own outputs before reporting back.
Opus 4.7 在高级软件工程方面较 Opus 4.6 有了显著提升，尤其是在处理最困难的任务时表现更为突出。用户反馈称，他们现在可以放心地将最艰巨的编码工作——即那些以往需要密切监督的任务——交给 Opus 4.7 处理。Opus 4.7 能够严谨且持续地处理复杂、长周期的任务，精准遵循指令，并在反馈前构思出验证自身输出的方法。

The model also has substantially better vision: it can see images in greater resolution. It’s more tasteful and creative when completing professional tasks, producing higher-quality interfaces, slides, and docs. And—although it is less broadly capable than our most powerful model, Claude Mythos Preview—it shows better results than Opus 4.6 across a range of benchmarks.
该模型的视觉能力也得到了大幅增强：它能够识别更高分辨率的图像。在完成专业任务时，它更具品味和创造力，能够产出更高质量的界面、幻灯片和文档。尽管其综合能力不及我们最强大的模型 Claude Mythos Preview，但在多项基准测试中，它的表现均优于 Opus 4.6。

Last week we announced Project Glasswing, highlighting the risks—and benefits—of AI models for cybersecurity. We stated that we would keep Claude Mythos Preview’s release limited and test new cyber safeguards on less capable models first. Opus 4.7 is the first such model: its cyber capabilities are not as advanced as those of Mythos Preview (indeed, during its training we experimented with efforts to differentially reduce these capabilities). We are releasing Opus 4.7 with safeguards that automatically detect and block requests that indicate prohibited or high-risk cybersecurity uses. What we learn from the real-world deployment of these safeguards will help us work towards our eventual goal of a broad release of Mythos-class models.
上周我们发布了“Project Glasswing”项目，强调了人工智能模型在网络安全方面的风险与收益。我们曾声明，将限制 Claude Mythos Preview 的发布，并优先在能力较弱的模型上测试新的网络安全防护措施。Opus 4.7 是首个此类模型：其网络安全能力并不像 Mythos Preview 那样先进（事实上，在训练过程中，我们尝试通过差异化手段降低了这些能力）。我们在发布 Opus 4.7 时配备了防护机制，能够自动检测并拦截涉及违规或高风险网络安全用途的请求。从这些防护措施的实际部署中获得的经验，将帮助我们实现最终全面发布 Mythos 级模型的目标。

Security professionals who wish to use Opus 4.7 for legitimate cybersecurity purposes (such as vulnerability research, penetration testing, and red-teaming) are invited to join our new Cyber Verification Program.
我们诚邀希望将 Opus 4.7 用于合法网络安全目的（如漏洞研究、渗透测试和红队演练）的安全专业人员加入我们新的“网络验证计划”（Cyber Verification Program）。

Opus 4.7 is available today across all Claude products and our API, Amazon Bedrock, Google Cloud’s Vertex AI, and Microsoft Foundry. Pricing remains the same as Opus 4.6: $5 per million input tokens and $25 per million output tokens. Developers can use claude-opus-4-7 via the Claude API.
Opus 4.7 即日起在所有 Claude 产品、API、Amazon Bedrock、Google Cloud Vertex AI 以及 Microsoft Foundry 上线。定价与 Opus 4.6 保持一致：输入 Token 每百万个 5 美元，输出 Token 每百万个 25 美元。开发者可通过 Claude API 使用 `claude-opus-4-7`。

***

### Testing Claude Opus 4.7
### Claude Opus 4.7 测试反馈

Claude Opus 4.7 has garnered strong feedback from our early-access testers:
Claude Opus 4.7 收到了早期测试人员的高度评价：

"In early testing, we’re seeing the potential for a significant leap for our developers with Claude Opus 4.7. It catches its own logical faults during the planning phase and accelerates execution, far beyond previous Claude models. As a financial technology platform serving millions of consumers and businesses at significant scale, this combination of speed and precision could be game-changing: accelerating development velocity for faster delivery of the trusted financial solutions our customers rely on every day."
“在早期测试中，我们看到了 Claude Opus 4.7 为开发者带来重大飞跃的潜力。它能在规划阶段发现自身的逻辑错误并加速执行，远超之前的 Claude 模型。作为一家服务于数百万消费者和企业的金融科技平台，这种速度与精度的结合可能会改变游戏规则：它加快了开发速度，从而能更快地交付客户每天依赖的可靠金融解决方案。”

"Anthropic has already set the standard for coding models, and Claude Opus 4.7 pushes that further in a meaningful way as the state-of-the-art model on the market. In our internal evals, it stands out not just for raw capability, but for how well it handles real-world async workflows—automations, CI/CD, and long-running tasks. It also thinks more deeply about problems and brings a more opinionated perspective, rather than simply agreeing with the user."
“Anthropic 已经为编码模型树立了标杆，而 Claude Opus 4.7 作为市场上最先进的模型，进一步提升了这一标准。在我们的内部评估中，它不仅因其原始能力脱颖而出，更在于它处理现实世界异步工作流（如自动化、CI/CD 和长周期任务）的出色表现。它对问题思考得更深，并能提供更有见地的观点，而不是仅仅附和用户。”

"Claude Opus 4.7 is the strongest model Hex has evaluated. It correctly reports when data is missing instead of providing plausible-but-incorrect fallbacks, and it resists dissonant-data traps that even Opus 4.6 falls for. It’s a more intelligent, more efficient Opus 4.6: low-effort Opus 4.7 is roughly equivalent to medium-effort Opus 4.6."
“Claude Opus 4.7 是 Hex 评估过的最强模型。当数据缺失时，它能准确报告，而不是提供看似合理但错误的备选方案；它还能抵御连 Opus 4.6 都会陷入的不一致数据陷阱。它是一个更智能、更高效的 Opus 4.6：低功耗模式下的 Opus 4.7 大致相当于中等功耗下的 Opus 4.6。”

"On our 93-task coding benchmark, Claude Opus 4.7 lifted resolution by 13% over Opus 4.6, including four tasks neither Opus 4.6 nor Sonnet 4.6 could solve. Combined with faster median latency and strict instruction following, it’s particularly meaningful for complex, long-running coding workflows. It cuts the friction from those multi-step tasks so developers can stay in the flow and focus on building."
“在我们包含 93 项任务的编码基准测试中，Claude Opus 4.7 的解决率比 Opus 4.6 提升了 13%，其中包括四项 Opus 4.6 和 Sonnet 4.6 都无法解决的任务。结合更快的平均延迟和严格的指令遵循能力，这对复杂、长周期的编码工作流尤为重要。它减少了多步骤任务中的摩擦，让开发者能够保持心流状态，专注于构建。”

"Based on our internal research-agent benchmark, Claude Opus 4.7 has the strongest efficiency baseline we’ve seen for multi-step work. It tied for the top overall score across our six modules at 0.715 and delivered the most consistent long-context performance of any model we tested. On General Finance—our largest module—it improved meaningfully on Opus 4.6, scoring 0.813 versus 0.767, while also showing the best disclosure and data discipline in the group. And on deductive logic, an area where Opus 4.6 struggled, Opus 4.7 is solid."
“基于我们的内部研究智能体基准测试，Claude Opus 4.7 是我们见过的多步骤工作效率基准中最强的。它在我们的六个模块中以 0.715 的成绩并列总分第一，并展现了我们测试过的所有模型中最稳定的长上下文性能。在最大的模块‘通用金融’中，它较 Opus 4.6 有了显著提升，得分从 0.767 提高到 0.813，同时展现了该组中最好的披露和数据规范性。在 Opus 4.6 表现吃力的演绎逻辑领域，Opus 4.7 也表现稳健。”

"Claude Opus 4.7 extends the limit of what models can do to investigate and get tasks done. Anthropic has clearly optimized for sustained reasoning over long runs, and it shows with market-leading performance. As engineers shift from working 1:1 with agents to managing them in parallel, this is exactly the kind of frontier capability that unlocks new workflows."
“Claude Opus 4.7 扩展了模型在调查和完成任务方面的能力极限。Anthropic 显然针对长周期的持续推理进行了优化，这体现在其市场领先的性能上。随着工程师从与智能体一对一协作转向并行管理多个智能体，这正是那种能够解锁全新工作流的前沿能力。”

"We’re seeing major improvements in Claude Opus 4.7’s multimodal understanding, from reading chemical structures to interpreting complex technical diagrams. The higher resolution support is helping Solve Intelligence build best-in-class tools for life sciences patent workflows, from drafting and prosecution to infringement detection and invalidity charting."
“我们看到 Claude Opus 4.7 在多模态理解方面有了重大改进，从读取化学结构到解读复杂的技术图表。更高分辨率的支持正在帮助 Solve Intelligence 构建生命科学专利工作流的一流工具，涵盖从起草、申请到侵权检测和无效性图表分析的各个环节。”

"Claude Opus 4.7 takes long-horizon autonomy to a new level in Devin. It works coherently for hours, pushes through hard problems rather than giving up, and unlocks a class of deep investigation work we couldn't reliably run before."
“Claude Opus 4.7 将 Devin 的长周期自主性提升到了一个新高度。它能连续数小时连贯工作，在遇到难题时坚持不懈而非轻易放弃，并解锁了我们以前无法可靠运行的一类深度调查工作。”

"For Replit, Claude Opus 4.7 was an easy upgrade decision. For the work our users do every day, we observed it achieving the same quality at lower cost—more efficient and precise at tasks like analyzing logs and traces, finding bugs, and proposing fixes. Personally, I love how it pushes back during technical discussions to help me make better decisions. It really feels like a better coworker."
“对于 Replit 来说，升级到 Claude Opus 4.7 是一个轻松的决定。对于我们用户每天的工作，我们观察到它能以更低的成本实现同样的质量——在分析日志和追踪、查找 Bug 以及提出修复方案等任务上更加高效和精准。我个人非常喜欢它在技术讨论中提出异议，这能帮助我做出更好的决策。它真的感觉像是一个更好的同事。”

"Claude Opus 4.7 demonstrates strong substantive accuracy on BigLaw Bench for Harvey, scoring 90.9% at high effort with..."
“Claude Opus 4.7 在 Harvey 的 BigLaw Bench 测试中展现了强大的实质准确性，在高强度任务下得分 90.9%……”