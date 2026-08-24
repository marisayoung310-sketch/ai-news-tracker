---
title: "Google Cloud Fraud Defence is just WEI repackaged"
originalUrl: "https://privatecaptcha.com/blog/google-cloud-fraud-defence-wei/"
date: "2026-05-08T22:15:43.346Z"
---

# Google Cloud Fraud Defence is just WEI repackaged
# Google Cloud Fraud Defence 不过是 WEI 的改头换面

In May 2026, Google announced “Google Cloud Fraud Defense - the next evolution of reCAPTCHA.” The announcement described a QR code challenge where users scan a code with their phone to prove human presence. Google killed Web Environment Integrity in 2023 after standards bodies objected. Today, three years later, the same device attestation mechanism launched as a commercial product. The open web survived because no single company could decide which hardware was legitimate enough to use it. Google is determined to end that status quo - now through a reCAPTCHA update.

2026 年 5 月，谷歌宣布推出“Google Cloud Fraud Defense”（谷歌云欺诈防御），称其为“reCAPTCHA 的下一次进化”。该公告描述了一种二维码挑战机制，用户需用手机扫描代码以证明其为人类。2023 年，在遭到标准机构反对后，谷歌曾终止了“网络环境完整性”（Web Environment Integrity, WEI）项目。三年后的今天，同样的设备认证机制却以商业产品的形式卷土重来。开放网络之所以能存续，是因为没有任何一家公司能单方面决定哪些硬件才算“合法”。但谷歌决心打破这一现状——这次是通过 reCAPTCHA 的更新来实现。

### Google already tried this in 2023
### 谷歌曾在 2023 年尝试过此事

In June 2023, a Google engineer named Yoav Weiss posted a proposal to the Chromium project called “Web Environment Integrity.” The mechanism was direct: browsers would ask device hardware to sign a cryptographic attestation proving the browser was unmodified and running on Google-certified hardware. Websites could verify the signature and decide whether to serve content without friction or add a challenge. Of course, the proposal framed this as protecting web integrity against bots and automated scraping.

2023 年 6 月，谷歌工程师 Yoav Weiss 向 Chromium 项目提交了一项名为“网络环境完整性”（WEI）的提案。其机制非常直接：浏览器会要求设备硬件进行加密签名认证，以证明浏览器未被篡改且运行在谷歌认证的硬件上。网站可以验证该签名，并决定是直接提供内容还是增加挑战。当然，该提案将其包装为“保护网络完整性，抵御机器人和自动抓取”。

Mozilla published a formal position within days. The proposal “works against users’ interests” and “creates a gated internet controlled by OS and device vendors.” The Electronic Frontier Foundation called it “Chrome’s Plan to DRM the Web,” noting that by design, only Chrome running on Android or other certified hardware would easily pass attestation, routing traffic toward Google’s ecosystem as a structural consequence, not a side effect. Google withdrew WEI three weeks after publication. The Chromium GitHub thread closed. Publicly, it was dead.

Mozilla 在几天内就发表了正式立场，称该提案“违背用户利益”，并“创造了一个由操作系统和设备供应商控制的封闭互联网”。电子前沿基金会（EFF）将其称为“Chrome 的网络数字版权管理（DRM）计划”，并指出其设计初衷决定了只有运行在 Android 或其他认证硬件上的 Chrome 才能轻松通过认证，这将导致流量被迫流向谷歌生态系统，这是一种结构性后果，而非副作用。三周后，谷歌撤回了 WEI 提案，Chromium 的 GitHub 讨论帖被关闭。在公众视野中，它已宣告死亡。

### The QR code will be bypassed
### 二维码终将被绕过

Here is how the challenge works: a user encounters a Fraud Defense prompt and is asked to scan a QR code with their phone camera. The phone, authenticated against Google’s Play Integrity API, confirms the device is certified hardware. That confirmation returns to the originating site as proof of human presence. The defeat is mechanical. Bot operators point a camera at a screen, a trivial automation with off-the-shelf hardware. For operations that need Play Integrity attestation specifically, a compliant Android device costs approximately $30 ($29.88 in Wallmart to be precise) - for a professional bot farm, which purchases devices in bulk, this is the fixed cost without material disruption to operations.

该挑战的工作原理如下：用户遇到 Fraud Defense 提示时，需用手机摄像头扫描二维码。手机通过 Google Play Integrity API 进行验证，确认设备为认证硬件。该确认信息返回至源网站，作为人类存在的证明。这种防御在机械层面是可以被击败的。机器人运营者只需将摄像头对准屏幕，利用现成的硬件即可轻松实现自动化。对于专门需要 Play Integrity 认证的操作，一台合规的 Android 设备仅需约 30 美元（准确地说是沃尔玛售价 29.88 美元）——对于批量采购设备的专业机器人农场而言，这只是固定成本，不会对运营造成实质性干扰。

### Device attestation bars the users who need privacy most
### 设备认证将最需要隐私的用户拒之门外

Google Play Integrity attestation requires Google Play Services. GrapheneOS, the security-hardened Android fork recommended by the EFF and used by journalists, lawyers, and activists in high-risk environments, does not ship Play Services by default. It supports a sandboxed compatibility layer that runs some Play Services functionality, but this does not satisfy Play Integrity at the MEETS_DEVICE_INTEGRITY level that Fraud Defense requires.

Google Play Integrity 认证需要 Google Play 服务。GrapheneOS 是一款由 EFF 推荐、供高风险环境下的记者、律师和活动人士使用的安全加固版 Android 分支，它默认不预装 Play 服务。虽然它支持一个沙盒兼容层来运行部分 Play 服务功能，但这无法满足 Fraud Defense 所要求的 MEETS_DEVICE_INTEGRITY 级别的认证。