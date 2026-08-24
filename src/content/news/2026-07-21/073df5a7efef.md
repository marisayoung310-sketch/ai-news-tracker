---
title: "LG’s monitors come with an unwanted addition for Windows: McAfee pop-up ads"
originalUrl: "https://www.theverge.com/tech/967983/lg-monitors-mcafee-adware-gamers-nexus"
date: "2026-07-20T22:18:59.557Z"
---

# LG’s monitors come with an unwanted addition for Windows: McAfee pop-up ads
# LG 显示器为 Windows 用户带来了一项“不速之客”：McAfee 弹窗广告

A video from Gamers Nexus explains how, after connecting a new LG UltraGear monitor to a PC running Windows 11 for the first time, Windows Update is silently installing LG driver updates and the LG Monitor App Installer, without so much as a permission pop-up or notification. The app doesn’t appear to include special controls of its own, instead simply pointing users to LG’s other apps, as well as McAfee antivirus.

Gamers Nexus 的一段视频揭示了这样一个现象：当用户首次将新款 LG UltraGear 显示器连接到运行 Windows 11 的电脑时，Windows Update 会在没有任何弹窗提示或通知的情况下，静默安装 LG 驱动程序更新以及“LG Monitor App Installer”。该应用本身似乎并不包含任何特殊控制功能，仅仅是将用户引导至 LG 的其他应用程序以及 McAfee 杀毒软件。

There are reports about LG’s app auto-installing as far back as 2024, but Gamers Nexus’s test follows recent user complaints on Reddit about large pop-up ads for McAfee and LG’s own apps suddenly appearing in the bottom right corner of the homescreen, which popped up for GN on 31 out of 32 bootups.

关于 LG 应用自动安装的报告最早可追溯至 2024 年，但 Gamers Nexus 的测试是针对近期 Reddit 上用户的投诉进行的。用户反映，屏幕右下角会突然弹出关于 McAfee 和 LG 自家应用的大型广告。在 Gamers Nexus 的测试中，32 次开机里有 31 次都出现了此类弹窗。

Microsoft allows developers to pair a Hardware Support App in the Windows Store that automatically installs based on the device’s metadata, but even its description here includes a warning: The automatic installation feature does not provide a notification to the user when the app is installed. Some users may find this experience confusing and frustrating, and give your app a bad rating.

微软允许开发者在 Windows 应用商店中关联一个“硬件支持应用”（Hardware Support App），该应用会根据设备的元数据自动安装。然而，即便是微软自己的说明文档中也包含了一项警告：“自动安装功能在应用安装时不会向用户提供通知。一些用户可能会觉得这种体验令人困惑和沮丧，并给您的应用打出差评。”

As The Verge’s Tom Warren has pointed out in the past, Dell similarly auto-installs its Alienware Command Center app on Windows when you connect an Alienware monitor, but the notification spam is an extra twist.

正如 The Verge 的 Tom Warren 过去所指出的，戴尔在连接 Alienware 显示器时，也会在 Windows 上自动安装 Alienware Command Center 应用，但像这样频繁的广告弹窗骚扰则属于额外的问题。

Users have reported ways to block LG’s app from auto-installing by applying a group policy setting on Pro versions of Windows, while users of Home editions might be able to turn off the installation by selecting “No” on an option to automatically download manufacturers’ apps and custom icons that is inside the Advanced system settings section.

有用户反馈，可以通过在 Windows 专业版中应用组策略设置来阻止 LG 应用自动安装；而家庭版用户或许可以通过在“高级系统设置”中，将“自动下载制造商的应用和自定义图标”选项选为“否”来关闭该安装功能。

As Gamers Nexus mentions, according to its Windows Store page, the LG Monitor App Installer requires permission to “use all system resources” and “access your Internet connection,” and the linked LG privacy policy mentions automatically collecting device data, internet activity, and geolocation information — all for a program that’s installing without the user’s explicit permission or consent.

正如 Gamers Nexus 所提到的，根据其 Windows 应用商店页面显示，LG Monitor App Installer 需要“使用所有系统资源”和“访问互联网连接”的权限。此外，其关联的 LG 隐私政策还提到会自动收集设备数据、互联网活动和地理位置信息——而这一切，仅仅是为了一个在未经用户明确许可或同意的情况下就自动安装的程序。