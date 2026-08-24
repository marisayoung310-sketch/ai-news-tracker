---
title: "How to Disable Google's Gemini in Chrome"
originalUrl: "https://www.wired.com/story/you-can-disable-gemini-in-chrome-if-its-freaking-you-out/"
date: "2026-05-07T23:24:39.831Z"
---

# How to Disable Google's Gemini in Chrome
# 如何在 Chrome 中禁用 Google Gemini

If you use Google's Chrome browser for desktop, there's probably a Gemini Nano AI model running on your computer right now and taking up about 4 GB of space. That's not necessarily a bad thing, but if you didn't know about it and don't want it, there's a way to turn it off.
如果你正在使用桌面版 Google Chrome 浏览器，你的电脑上很可能正在运行一个 Gemini Nano AI 模型，并占用了约 4 GB 的空间。这未必是件坏事，但如果你对此并不知情且不想要它，是有办法将其关闭的。

The file started auto-downloading for Chrome users in 2024 after Google built Gemini Nano into the browser. But a report by That Privacy Guy this week and the ensuing reception it received highlighted how unaware many users were—perhaps a result of a flood of AI services and features across the tech industry that have been difficult for users to keep up with.
自 Google 将 Gemini Nano 内置于浏览器后，该文件于 2024 年开始自动下载到 Chrome 用户的电脑中。然而，本周“That Privacy Guy”发布的一份报告及其引发的后续反响凸显了许多用户对此毫不知情——这或许是因为科技行业涌现了海量的 AI 服务与功能，导致用户难以跟上更新节奏。

To uninstall the Gemini Nano file, open Chrome on your computer, in the top right corner click the “More” menu represented by three vertical dots, then go to Settings, System, and then toggle “On-device AI” to be off. The Privacy Guy article noted that if you directly uninstall the Gemini Nano file in the directory, Chrome will silently, automatically redownload it the next time the browser reboots.
要卸载 Gemini Nano 文件，请在电脑上打开 Chrome，点击右上角由三个垂直点组成的“更多”菜单，进入“设置” (Settings)，选择“系统” (System)，然后将“设备端 AI” (On-device AI) 开关关闭。That Privacy Guy 的文章指出，如果你直接在目录中删除 Gemini Nano 文件，Chrome 会在下次重启浏览器时静默自动重新下载它。

A Google spokesperson tells WIRED that the company started rolling out the On-device AI toggle in February so users can turn off the features if they choose and remove the model. “Once disabled, the model will no longer download or update,” the spokesperson says in a statement. The company added, too, that the system is designed so Gemini Nano “will automatically uninstall if the device is low on resources.”
Google 发言人告诉《连线》(WIRED)，公司从 2 月份开始推出“设备端 AI”开关，以便用户可以根据需要关闭这些功能并移除模型。发言人在声明中表示：“一旦禁用，该模型将不再下载或更新。”该公司还补充说，该系统经过设计，如果设备资源不足，Gemini Nano “将自动卸载”。

Google built the model into Chrome to enable on-device AI scam-detection features. It was also aimed at providing a way for developers to integrate AI-related application programming interfaces while keeping data on users' devices when possible and out of the cloud. These features are separate from Chrome's AI Mode, which does not use the local Gemini Nano model.
Google 将该模型内置于 Chrome 中，旨在实现设备端的 AI 诈骗检测功能。此举还旨在为开发者提供一种集成 AI 相关应用程序接口 (API) 的方式，同时尽可能将数据保留在用户设备上，避免上传至云端。这些功能与 Chrome 的“AI 模式”是分开的，后者并不使用本地的 Gemini Nano 模型。

Parisa Tabriz, Chrome's general manager, emphasized in a post on X on Wednesday that integrating Gemini Nano “powers important security capabilities like on-device scam detection and developer APIs without sending your data to the cloud.”
Chrome 总经理 Parisa Tabriz 周三在 X 上发文强调，集成 Gemini Nano “支持了诸如设备端诈骗检测和开发者 API 等重要的安全功能，且无需将你的数据发送到云端。”

Google certainly did announce the Gemini Nano integration into Chrome and discussed it publicly, but for users who simply use Chrome because it is the world's biggest, most recognizable browser and don't necessarily follow every granular update, the lack of an in-your-face notification about a large AI model file sitting and running on your computer may be upsetting.
Google 确实宣布了 Gemini Nano 集成到 Chrome 中的消息并进行了公开讨论，但对于那些仅仅因为 Chrome 是全球最大、最知名的浏览器而使用它，且未必会关注每一项细微更新的用户来说，电脑上运行着一个大型 AI 模型文件却缺乏显眼的通知，这可能会让人感到不安。

Longtime security and compliance consultant Davi Ottenheimer says that he follows Chrome updates closely but could have easily missed the Gemini Nano integration. “An on-device model could be a hidden minefield,” he says. And the fact that Google launched the integration in 2024 but didn't start rolling out a settings control for users to turn it off until February shows that, at least initially, the feature wasn't conceived as something that users would interact with.
资深安全与合规顾问 Davi Ottenheimer 表示，他一直密切关注 Chrome 的更新，但也很容易错过 Gemini Nano 的集成。他说：“一个设备端模型可能是一个隐藏的雷区。”事实上，Google 在 2024 年推出了该集成，直到 2 月份才开始提供让用户关闭它的设置选项，这表明该功能在最初设计时，并未将其视为用户需要主动交互的对象。

Just because you can remove Gemini Nano from Chrome doesn't mean you necessarily should—or that doing so is better for your privacy.
仅仅因为你可以从 Chrome 中移除 Gemini Nano，并不意味着你一定应该这样做，也不意味着这样做对你的隐私更有利。

Local processing is a more private way to utilize AI capabilities. If you remove the model, the features Google uses it for—including the AI-enabled scam detection—will cease to function. But since Gemini Nano is also used by Chrome to enable local AI processing for third-party developers, blocking this route could have a range of outcomes when interacting with non-Google web services in the browser. A Google spokesperson tells WIRED that if you turn off On-device AI, “certain security features will not be available, and sites that use the on device APIs will behave differently.”
本地处理是一种更具隐私性的 AI 能力利用方式。如果你移除了该模型，Google 使用它实现的功能（包括 AI 驱动的诈骗检测）将停止工作。但由于 Chrome 也使用 Gemini Nano 为第三方开发者提供本地 AI 处理能力，阻断这一路径可能会在与浏览器中的非 Google 网络服务交互时产生一系列后果。Google 发言人告诉《连线》，如果你关闭“设备端 AI”，“某些安全功能将无法使用，且使用设备端 API 的网站表现也会有所不同。”

Of course, if neither option seems right, there's always an alternative: Use a different browser.
当然，如果这两个选项都不适合你，还有一个选择：使用其他浏览器。