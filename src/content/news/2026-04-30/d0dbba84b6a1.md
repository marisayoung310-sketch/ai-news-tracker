---
title: "warpdotdev / warp"
originalUrl: "https://github.com/warpdotdev/warp"
date: "2026-04-30T01:04:21.857Z"
---

# warpdotdev / warp

**Website · Code · Agents · Terminal · Drive · Docs · How Warp Works**
网站 · 代码 · 智能体 · 终端 · 云端存储 · 文档 · Warp 工作原理

**Note:** OpenAI is the founding sponsor of the new, open-source Warp repository, and the new agentic management workflows are powered by GPT models.
**注意：** OpenAI 是全新开源 Warp 仓库的创始赞助商，其全新的智能体管理工作流由 GPT 模型驱动。

**About:** Warp is an agentic development environment, born out of the terminal. Use Warp's built-in coding agent, or bring your own CLI agent (Claude Code, Codex, Gemini CLI, and others).
**关于：** Warp 是一个源于终端的智能体开发环境。你可以使用 Warp 内置的编码智能体，也可以接入你自己的 CLI 智能体（如 Claude Code、Codex、Gemini CLI 等）。

**Installation:** You can download Warp and read our docs for platform-specific instructions.
**安装：** 你可以下载 Warp 并阅读我们的文档，获取针对不同平台的安装说明。

**Warp Contributions Overview Dashboard:** Explore build.warp.dev to:
* Watch thousands of Oz agents triage issues, write specs, implement changes, and review PRs
* View top contributors and in-flight features
* Track your own issues with GitHub sign-in
* Click into active agent sessions in a web-compiled Warp terminal
**Warp 贡献概览仪表板：** 访问 build.warp.dev 以：
* 观察数以千计的 Oz 智能体如何分类问题、编写规范、实施变更并审查 PR；
* 查看顶级贡献者和正在开发的功能；
* 通过 GitHub 登录追踪你自己的问题；
* 在网页版编译的 Warp 终端中点击进入活跃的智能体会话。

**Licensing:** Warp's UI framework (the warpui_core and warpui crates) are licensed under the MIT license. The rest of the code in this repository is licensed under the AGPL v3.
**许可协议：** Warp 的 UI 框架（warpui_core 和 warpui crates）采用 MIT 许可协议。本仓库中的其余代码均采用 AGPL v3 许可协议。

**Open Source & Contributing:** Warp's client codebase is open source and lives in this repository. We welcome community contributions and have designed a lightweight workflow to help new contributors get started. For the full contribution flow, read our CONTRIBUTING.md guide.
**开源与贡献：** Warp 的客户端代码库是开源的，并托管在此仓库中。我们欢迎社区贡献，并设计了一套轻量级的工作流来帮助新贡献者上手。有关完整的贡献流程，请阅读我们的 CONTRIBUTING.md 指南。

**Issue to PR:** Before filing, search existing issues for your bug or feature request. If nothing exists, file an issue using our templates. Security vulnerabilities should be reported privately as described in CONTRIBUTING.md. Once filed, a Warp maintainer reviews the issue and may apply a readiness label: `ready-to-spec` signals the design is open for contributors to spec out, and `ready-to-implement` signals the design is settled and code PRs are welcome. Anyone can pick up a labeled issue — mention @oss-maintainers on an issue if you'd like it considered for a readiness label.
**从 Issue 到 PR：** 在提交之前，请先搜索现有的 Issue，查看是否已有相关的 Bug 或功能请求。如果没有，请使用我们的模板提交 Issue。安全漏洞应按照 CONTRIBUTING.md 中的说明私下报告。提交后，Warp 维护者会审查该 Issue，并可能添加就绪标签：`ready-to-spec` 表示设计方案开放，欢迎贡献者编写规范；`ready-to-implement` 表示设计已定稿，欢迎提交代码 PR。任何人都可以认领带有标签的 Issue——如果你希望某个 Issue 被评估是否可以添加就绪标签，请在 Issue 中 @oss-maintainers。

**Building the Repo Locally:** To build and run Warp from source:
```bash
./script/bootstrap # platform-specific setup
./script/run       # build and run Warp
./script/presubmit # fmt, clippy, and tests
```
See WARP.md for the full engineering guide, including coding style, testing, and platform-specific notes.
**本地构建仓库：** 若要从源码构建并运行 Warp：
（代码块同左）
请参阅 WARP.md 获取完整的工程指南，包括编码风格、测试和特定平台的注意事项。

**Joining the Team:** Interested in joining the team? See our open roles.
**加入团队：** 有兴趣加入我们吗？请查看我们的招聘职位。

**Support and Questions:** See our docs for a comprehensive guide to Warp's features. Join our Slack Community to connect with other users and get help from the Warp team. Try our Preview build to test the latest experimental features. Mention @oss-maintainers on any issue to escalate to the team — for example, if you encounter problems with the automated agents.
**支持与问题：** 请参阅我们的文档以获取 Warp 功能的全面指南。加入我们的 Slack 社区与其他用户交流，并从 Warp 团队获得帮助。尝试我们的预览版（Preview build）以测试最新的实验性功能。在任何 Issue 中 @oss-maintainers 即可将问题升级给团队处理——例如，如果你在使用自动化智能体时遇到问题。

**Code of Conduct:** We ask everyone to be respectful and empathetic. Warp follows the Code of Conduct. To report violations, email warp-coc at warp.dev.
**行为准则：** 我们要求每个人都保持尊重和同理心。Warp 遵循行为准则。如需举报违规行为，请发送电子邮件至 warp-coc@warp.dev。

**Open Source Dependencies:** We'd like to call out a few of the open source dependencies that have helped Warp to get off the ground: Tokio, NuShell, Fig Completion Specs, Warp Server Framework, Alacritty, Hyper HTTP library, FontKit, Core-foundation, Smol.
**开源依赖：** 我们要特别感谢一些帮助 Warp 起步的开源依赖项：Tokio、NuShell、Fig Completion Specs、Warp Server Framework、Alacritty、Hyper HTTP library、FontKit、Core-foundation、Smol。