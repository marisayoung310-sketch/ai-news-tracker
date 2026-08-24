---
title: "We generated ~32,000 self-contained build prompts for Midnight (and learned the hard way)"
originalUrl: "https://dev.to/socialprescribing/we-generated-32000-self-contained-build-prompts-for-midnight-and-learned-the-hard-way-2koa"
date: "2026-08-09T21:59:15.978Z"
---

# We generated ~32,000 self-contained build prompts for Midnight (and learned the hard way)
# 我们为 Midnight 生成了约 32,000 个自包含构建提示词（并付出了惨痛的代价）

We generated ~32,000 self-contained build prompts for Midnight. Midnight is a zero-knowledge L1: private state stays on the user's device, public state lands on chain, and the bridge between them is a circuit you write in a language called Compact. It's genuinely interesting technology. It also has one of the harshest first hours I've met in web3. Not because the concepts are hard. Because the environment is. A hackathon dev sits down with a good idea and spends the next four hours on: a package set where @midnight-ntwrk/midnight-js-*, the proof server Docker tag, the ledger, and the wallet SDK all have to agree on a version, or nothing works; a local proof server that needs Docker, which on Windows needs WSL2, which needs virtualization enabled in BIOS; WASM + top-level await + a missing Buffer polyfill, which together turn any SSR framework into a wall of stack traces; a testnet wallet with no tDUST and no obvious way to get any. None of that is the idea. All of it is tax. So we built Creative Midnight — a site whose entire job is to collapse that first hour into a copy-paste. This post is about how the prompt generator works, what the numbers actually are, and the failure modes we hit in the reference builds, with the fix for each.

我们为 Midnight 生成了约 32,000 个自包含的构建提示词。Midnight 是一个零知识证明（ZK）L1 区块链：私有状态保留在用户设备上，公共状态上链，而两者之间的桥梁是你使用一种名为 Compact 的语言编写的电路。这确实是一项有趣的技术。但它也是我在 Web3 领域遇到过“上手门槛”最严苛的项目之一。这并非因为概念难懂，而是因为环境配置太复杂。一个参加黑客松的开发者带着好点子坐下来，接下来的四个小时却耗在了这些事情上：必须确保 @midnight-ntwrk/midnight-js-*、证明服务器 Docker 标签、账本和钱包 SDK 的版本完全匹配，否则一切都无法运行；本地证明服务器需要 Docker，而在 Windows 上需要 WSL2，这又要求在 BIOS 中开启虚拟化；WASM + top-level await + 缺失的 Buffer polyfill，这些组合在一起会让任何 SSR 框架变成一堵报错堆栈墙；测试网钱包里没有 tDUST，且没有明显的获取途径。这些都不是核心创意，全是“环境税”。因此，我们构建了 Creative Midnight——一个旨在将这最初的一小时缩减为“复制粘贴”的网站。本文将介绍提示词生成器的工作原理、具体数据，以及我们在参考构建中遇到的故障模式及其解决方案。

### What the site is
### 网站的功能

Three things, in order of usefulness: 1. 1,996 hackathon ideas. Ten creative disciplines — dance, music, visual art, video, photography, writing, film & animation, games, theater, fashion — each with a market anchor and a "quantum hook" (the private-state mechanic that makes ZK actually load-bearing rather than decorative). 996 of those are base ideas; the other 1,000 are agentic-commerce overlays (A2A/AP2 agent negotiation, UCP ZK-checkout, x402 paywalls with a mimic USDC), distributed across the same themes so you can filter within a discipline. 2. A build prompt per idea, per network. Not a stub — a multi-thousand-line, fully self-contained prompt that includes the pinned package set, the Compact toolchain commands, the Vite config, the wallet boot code, the deploy script, and a list of red flags. You pick an idea, pick a network target, pick your OS, copy, paste into an AI coding tool, and the environment tax is pre-paid. 3. The scar tissue. Guides for the wallet, the proof server, the local (Undeployed) stack, Fly.io hosting, Android via the Kuira SDK, and a Known Issues page that exists purely so nobody re-debugs what we already debugged.

按实用性排序，网站包含三部分：1. 1,996 个黑客松创意。涵盖舞蹈、音乐、视觉艺术、视频、摄影、写作、电影与动画、游戏、戏剧、时尚等十个创意领域，每个创意都有一个市场锚点和“量子钩子”（即让 ZK 真正发挥作用而非仅仅作为装饰的私有状态机制）。其中 996 个是基础创意，另外 1,000 个是智能体商业叠加方案（A2A/AP2 智能体协商、UCP ZK 结账、带有模拟 USDC 的 x402 付费墙），分布在相同的主题中，以便你在特定领域内进行筛选。2. 每个创意对应每个网络的构建提示词。这不是简单的存根，而是数千行、完全自包含的提示词，包含了锁定的包集合、Compact 工具链命令、Vite 配置、钱包启动代码、部署脚本以及风险提示列表。你只需选择一个创意、网络目标和操作系统，复制并粘贴到 AI 编程工具中，即可预付掉“环境税”。3. “伤疤”记录。包括钱包、证明服务器、本地（未部署）堆栈、Fly.io 托管、通过 Kuira SDK 进行 Android 开发的指南，以及一个专门记录已知问题的页面，确保没人需要重复我们已经踩过的坑。

### The interesting part: one idea, many prompts
### 有趣的部分：一个创意，多个提示词

The prompt is not stored. It is composed, by a single function: `export function buildVariant(idea: Idea, theme: Theme, network: NetworkVariant, os: OSTarget = "macos",): string`. `buildVariant` assembles shared blocks — PACKAGES, TOOLCHAIN_BY_OS, VITE_CONFIG, MIDNIGHTJS_BOOT, SIGNING_STRATEGY, WALLET_CLI_BLOCK, REDFLAGS, plus protocol blocks for the agentic overlays — around the idea's own text. That means a lesson learned once gets written once and appears in every prompt on the site. The multiplier is the network variant, because the network genuinely changes the architecture.

提示词并非预先存储，而是由一个单一函数动态组合而成：`export function buildVariant(idea: Idea, theme: Theme, network: NetworkVariant, os: OSTarget = "macos",): string`。`buildVariant` 会围绕创意的文本内容，组装共享的代码块——包括 PACKAGES、TOOLCHAIN_BY_OS、VITE_CONFIG、MIDNIGHTJS_BOOT、SIGNING_STRATEGY、WALLET_CLI_BLOCK、REDFLAGS 以及智能体叠加协议块。这意味着，任何学到的经验只需编写一次，就会出现在网站的所有提示词中。乘数效应来自于网络变体，因为不同的网络确实会改变架构。

### One file pins every version
### 单一文件锁定所有版本

Every prompt quotes the Midnight support matrix, which is the actual source of truth for compatible versions. Rather than sprinkling version strings through 2,000 lines of template, they live in one module. When the matrix moves, one edit propagates to ~10,000 prompts, the setup guides, and the downloadable bundles. Note `localStack.proofServer` is 8.0.3 while the public one is 8.1.0 — those are not interchangeable, and discovering that by trial and error costs an evening.

每个提示词都引用了 Midnight 支持矩阵，这是兼容版本的唯一事实来源。与其将版本字符串散布在 2,000 行模板中，不如将它们统一放在一个模块里。当矩阵更新时，只需修改一处，即可同步到约 10,000 个提示词、设置指南和可下载的包中。请注意，`localStack.proofServer` 是 8.0.3，而公共版本是 8.1.0——它们不可互换，通过试错发现这一点会浪费掉一整个晚上。

### Don't ship 2 GB through a Worker
### 不要通过 Worker 传输 2 GB 数据

First version of the download page imported the generated bundles as modules. The site is deployed on Cloudflare Workers and immediately returned Error 1102: Worker exceeded resource limits — the isolate has a hard memory ceiling and a multi-hundred-megabyte string blows straight through it. Fix: the bundles never enter the bundle. Each is uploaded to a CDN and the repo holds only a pointer.

下载页面的第一个版本将生成的包作为模块导入。该网站部署在 Cloudflare Workers 上，随即返回了 Error 1102：Worker 超出了资源限制——隔离环境有严格的内存上限，而几百兆字节的字符串会直接撑爆它。解决方案：这些包永远不会进入主构建包。每个包都被上传到 CDN，仓库中只保留一个指向它们的指针。