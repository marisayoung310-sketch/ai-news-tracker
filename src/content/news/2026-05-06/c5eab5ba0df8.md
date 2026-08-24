---
title: "Google Chrome silently installs a 4 GB AI model on your device without consent"
originalUrl: "https://www.thatprivacyguy.com/blog/chrome-silent-nano-install/"
date: "2026-05-05T22:16:16.965Z"
---

# Google Chrome silently installs a 4 GB AI model on your device without consent
# Google Chrome 在未经用户同意的情况下，静默在您的设备上安装了 4 GB 的 AI 模型

Two weeks ago I wrote about Anthropic silently registering a Native Messaging bridge in seven Chromium-based browsers on every machine where Claude Desktop was installed [1]. The pattern was: install on user launch of product A, write configuration into the user's installs of products B, C, D, E, F, G, H without asking. Reach across vendor trust boundaries. No consent dialog. No opt-out UI. Re-installs itself if the user removes it manually, every time Claude Desktop is launched.

两周前，我曾撰写过关于 Anthropic 在安装了 Claude Desktop 的每台机器上，向七款基于 Chromium 的浏览器静默注册 Native Messaging 桥接程序的情况 [1]。其模式是：在用户启动产品 A 时进行安装，并在未经询问的情况下将配置写入用户安装的产品 B、C、D、E、F、G、H 中。这种行为跨越了供应商的信任边界，没有征求同意的对话框，也没有退出的用户界面。如果用户手动删除，它会在每次启动 Claude Desktop 时自动重新安装。

This week I discovered the same pattern, executed by Google. Google Chrome is reaching into users' machines and writing a 4 GB on-device AI model file to disk without asking. The file is named weights.bin. It lives in OptGuideOnDeviceModel. It is the weights for Gemini Nano, Google's on-device LLM. Chrome did not ask. Chrome does not surface it. If the user deletes it, Chrome re-downloads it.

本周，我发现了 Google 执行了同样的模式。Google Chrome 正在未经询问的情况下，侵入用户的机器并将一个 4 GB 的端侧 AI 模型文件写入磁盘。该文件名为 `weights.bin`，位于 `OptGuideOnDeviceModel` 文件夹中。它是 Google 端侧大模型 Gemini Nano 的权重文件。Chrome 没有征求许可，也没有向用户展示相关信息。如果用户将其删除，Chrome 会自动重新下载。

The legal analysis is the same one I gave for the Anthropic case. The environmental analysis is new. At Chrome's scale, the climate bill for one model push, paid in atmospheric CO2 by the entire planet, is between six thousand and sixty thousand tonnes of CO2-equivalent emissions, depending on how many devices receive the push. That is the environmental cost of one company unilaterally deciding that two billion peoples' default browser will mass-distribute a 4 GB binary they did not request.

法律分析与我针对 Anthropic 案例所做的分析相同，但环境影响分析则是新的。以 Chrome 的规模来看，单次模型推送所带来的气候代价（由全球共同承担的二氧化碳排放）在 6,000 到 60,000 吨二氧化碳当量之间，具体取决于接收推送的设备数量。这就是一家公司单方面决定让 20 亿人的默认浏览器大规模分发他们并未请求的 4 GB 二进制文件所带来的环境成本。

This is, in my professional opinion, a direct breach of Article 5(3) of Directive 2002/58/EC (the ePrivacy Directive) [2], a breach of the Article 5(1) GDPR principles of lawfulness, fairness, and transparency [3], a breach of Article 25 GDPR's data-protection-by-design obligation [3], and an environmental harm of a magnitude that would be a notifiable event under the Corporate Sustainability Reporting Directive (CSRD) for any in-scope undertaking [4].

以我的专业观点来看，这直接违反了 2002/58/EC 指令（电子隐私指令）第 5(3) 条 [2]，违反了 GDPR 第 5(1) 条关于合法性、公平性和透明度的原则 [3]，违反了 GDPR 第 25 条关于“默认数据保护”的义务 [3]，并且其造成的环境损害规模足以让任何受监管的企业根据《企业可持续发展报告指令》(CSRD) 将其列为需报告的事件 [4]。

### What is on the disk and how it got there
### 磁盘上有什么以及它是如何到达那里的

On any machine that has Chrome installed, in the user profile, sits a directory whose name is OptGuideOnDeviceModel. Inside it is a file called weights.bin. The file is approximately 4 GB. It is the weights file for Gemini Nano. Chrome uses it to power features Google has marketed under names like "Help me write", on-device scam detection, and other AI-assisted browser functions.

在任何安装了 Chrome 的机器上，用户配置文件中都有一个名为 `OptGuideOnDeviceModel` 的目录。里面有一个名为 `weights.bin` 的文件，大小约为 4 GB。这是 Gemini Nano 的权重文件。Chrome 使用它来驱动 Google 营销的诸如“帮我写 (Help me write)”、端侧诈骗检测以及其他 AI 辅助浏览器功能。

The file appeared with no consent prompt. There is no checkbox in Chrome Settings labelled "download a 4 GB AI model". The download triggers when Chrome's AI features are active, and those features are active by default in recent Chrome versions. On any machine that meets the hardware requirements, Chrome treats the user's hardware as a delivery target and writes the model.

该文件的出现没有任何征求同意的提示。在 Chrome 设置中，没有标有“下载 4 GB AI 模型”的复选框。当 Chrome 的 AI 功能处于活动状态时，下载就会触发，而这些功能在近期的 Chrome 版本中是默认开启的。在任何满足硬件要求的机器上，Chrome 都会将用户的硬件视为交付目标并写入该模型。

The cycle of deletion and re-download has been documented across multiple independent reports on Windows installations [5][6][7][8] - the user deletes, Chrome re-downloads, the user deletes again, Chrome re-downloads again. The only ways to make the deletion stick are to disable Chrome's AI features through chrome://flags or enterprise policy tooling that home users do not generally have, or to uninstall Chrome entirely [5].

删除与重新下载的循环已在多份关于 Windows 安装的独立报告中得到证实 [5][6][7][8] —— 用户删除，Chrome 重新下载；用户再次删除，Chrome 再次重新下载。要使删除生效，唯一的方法是通过 `chrome://flags` 禁用 Chrome 的 AI 功能，或者使用普通家庭用户通常没有的企业策略工具，亦或是彻底卸载 Chrome [5]。

On macOS the file lands as mode 600 owned by the user (so it is deletable in principle) but Chrome holds the install state in Local State after the bytes are written, and as soon as the variations server next tells Chrome the profile is eligible, the download fires again - the architecture is the same, only the file permissions differ.

在 macOS 上，该文件以 600 模式落地并由用户所有（因此原则上是可以删除的），但 Chrome 在写入字节后会在 `Local State` 中保留安装状态。一旦变体服务器 (variations server) 下次告知 Chrome 该配置文件符合条件，下载就会再次触发 —— 其架构是相同的，只是文件权限有所不同。

### How I verified this on a freshly created Apple Silicon profile
### 我是如何在全新的 Apple Silicon 配置文件上验证这一点的

Most of the existing reporting on this behaviour is from Windows users who noticed their disk filling up - useful, but Google could (and probably will) try to characterise those reports as anecdotes from non-representative configurations. So I went looking for a clean witness on a different platform. The witness I found is macOS itself.

目前关于此行为的大多数报告都来自注意到磁盘空间被占满的 Windows 用户 —— 这些报告很有用，但 Google 可以（而且很可能会）试图将这些报告描述为来自非代表性配置的轶事。因此，我在另一个平台上寻找了一个客观的证据。我找到的证据就是 macOS 系统本身。

The kernel keeps a filesystem event log called .fseventsd - it records every file create, modify and delete at the OS level, independent of any application logging. Chrome cannot edit it, Google cannot remotely reach it, and the page files that record the events survive the deletion of the files they reference.

内核维护着一个名为 `.fseventsd` 的文件系统事件日志 —— 它在操作系统层面记录每一个文件的创建、修改和删除，独立于任何应用程序的日志记录。Chrome 无法编辑它，Google 无法远程访问它，且记录这些事件的页面文件在它们所引用的文件被删除后依然存在。

I created a Chrome user-data directory on 23 April 2026 to run an automated audit (one of the WebSentinel 100-site privacy sweeps). The audit driver is fully Chrome DevTools Protocol - it loads a page, dwells for five minutes with no input, captures events, closes Chrome between sites - and the profile had received zero keyboard or mouse input from a human at any point in its existence. Every "AI mode" surface in Chrome was untouched - in fact every UI surface in Chrome was untouched, the audit driver only interacts with the document via CDP and the omnibox is never reached. By 29 April the pr...

我在 2026 年 4 月 23 日创建了一个 Chrome 用户数据目录，用于运行自动化审计（WebSentinel 100 站点隐私扫描的一部分）。审计驱动程序完全基于 Chrome DevTools 协议 —— 它加载页面，在无输入的情况下停留五分钟，捕获事件，并在站点之间关闭 Chrome —— 且该配置文件在其存在期间从未接收过任何人类的键盘或鼠标输入。Chrome 中的每一个“AI 模式”界面都未被触及 —— 事实上，Chrome 中的每一个 UI 界面都未被触及，审计驱动程序仅通过 CDP 与文档交互，且从未触及地址栏。到 4 月 29 日，pr...