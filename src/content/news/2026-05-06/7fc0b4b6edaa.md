---
title: "iOS 27 is adding a 'Create a Pass' button to Apple Wallet"
originalUrl: "https://walletwallet.alen.ro/blog/ios-27-wallet-create-pass/"
date: "2026-05-05T22:17:02.751Z"
---

# iOS 27 is adding a 'Create a Pass' button to Apple Wallet
# iOS 27 将在 Apple Wallet 中新增“创建票证”（Create a Pass）按钮

Bloomberg's Mark Gurman reported on Monday that iOS 27 will add a "Create a Pass" feature to the Wallet app. Tap the "+" button you already use to add credit cards or pass emails, and Wallet will offer something it has never offered before on iPhone: a path to build your own pass. You can scan a QR code on a paper ticket or membership card with the camera, or build a pass from scratch in a layout editor. The whole flow runs without an Apple Developer account, a Pass Type ID, or any certificate signing. iOS 27 is expected to preview at WWDC on June 8, with a public release in September.

彭博社的马克·古尔曼（Mark Gurman）周一报道称，iOS 27 将在“钱包”（Wallet）应用中增加一项“创建票证”功能。点击你平时用于添加信用卡或票证邮件的“+”按钮，钱包应用将提供 iPhone 上前所未有的功能：一种构建自定义票证的途径。你可以通过摄像头扫描纸质票据或会员卡上的二维码，也可以在布局编辑器中从零开始制作票证。整个流程无需 Apple 开发者账号、Pass Type ID 或任何证书签名。iOS 27 预计将于 6 月 8 日在 WWDC 上预览，并于 9 月正式发布。

### How the new flow works
### 新功能的工作流程

Reporting from Bloomberg, MacRumors, 9to5Mac, and AppleInsider lines up on the same workflow. Inside the Wallet app, the existing "+" button gains a new option for creating a pass. From there you choose between two starting points: Scan a QR code from a paper card, ticket, or screen; or build a custom pass from scratch with no scan needed. Once you are in the editor, Wallet exposes adjustable styles, images, colors, and text fields. The reports describe a fairly conventional template-driven layout, closer in spirit to what Pass2U, WalletWallet, and other third-party generators have offered for years than to Apple's developer-only PassKit pipeline.

来自彭博社、MacRumors、9to5Mac 和 AppleInsider 的报道均指向了相同的操作流程。在钱包应用内，现有的“+”按钮将新增一个创建票证的选项。点击后，你可以选择两种起始方式：扫描纸质卡片、票据或屏幕上的二维码；或者无需扫描，直接从零开始构建自定义票证。进入编辑器后，钱包应用会提供可调整的样式、图像、颜色和文本字段。报道描述这是一种相当传统的模板驱动布局，其理念更接近 Pass2U、WalletWallet 等第三方生成器多年来提供的服务，而非苹果仅供开发者使用的 PassKit 管道。

### Three templates, color-coded
### 三种颜色编码的模板

Apple is testing three starting templates, each tied to a default color:
*   **Standard (orange):** the default for any general-purpose pass.
*   **Membership (blue):** geared toward gyms, clubs, libraries, and other recurring-access cards.
*   **Event (purple):** meant for tickets to games, movies, and one-off occasions.

苹果正在测试三种起始模板，每种模板都对应一种默认颜色：
*   **标准（橙色）：** 适用于任何通用票证的默认选项。
*   **会员（蓝色）：** 针对健身房、俱乐部、图书馆及其他需要重复访问的卡片。
*   **活动（紫色）：** 专为比赛、电影及一次性场合的门票设计。

The color choice is not just decoration. Wallet currently sorts passes visually in the stack, and the template hue is what sets each card apart at a glance, so a quick look is enough to pick out the orange punch card from the purple ticket without reading a word.

颜色选择不仅仅是为了装饰。钱包目前在堆叠视图中以视觉方式对票证进行排序，模板色调让用户一眼就能区分每张卡片。因此，无需阅读文字，只需扫视一眼，就能从紫色票据中挑出橙色的积分卡。

### Why now: 14 years of PassKit drought
### 为什么是现在：PassKit 14 年的“干旱期”

Apple shipped PassKit alongside iOS 6 back in 2012. The pitch was clean: businesses build .pkpass files, customers tap to add, everyone wins. In practice, the consistent adopters ended up being airlines, big-box retailers, ticketing platforms, and a handful of national chains. Most gyms, cafes, libraries, rec centers, and small loyalty programs never built one, because the path requires an Apple Developer account, signing certificates, and enough engineering work that "just print a paper card" almost always won the budget conversation.

苹果早在 2012 年随 iOS 6 发布了 PassKit。其初衷很明确：企业构建 .pkpass 文件，客户点击添加，实现双赢。但在实践中，持续采用该技术的主要是航空公司、大型零售商、票务平台和少数全国性连锁店。大多数健身房、咖啡馆、图书馆、娱乐中心和小微忠诚度计划从未开发过此类票证，因为该路径需要 Apple 开发者账号、签名证书，且工程量巨大，以至于“直接印纸质卡片”几乎总是在预算讨论中胜出。

The Next Web's framing is blunt: Apple is no longer waiting on developers. With Create a Pass, the supply-side problem is finally being solved from the demand side. If the business will not build a Wallet pass, the user does it themselves from the QR code that business already printed. That is a meaningful shift in posture. For more than a decade, Wallet has been a directory of what brands chose to ship. In iOS 27 it becomes a directory of what people choose to keep.

The Next Web 的评价很直接：苹果不再等待开发者了。通过“创建票证”功能，供给侧的问题终于从需求侧得到了解决。如果商家不制作钱包票证，用户可以利用商家已经印好的二维码自行制作。这是一种意义重大的姿态转变。十多年来，钱包一直是品牌方选择发布内容的目录；而在 iOS 27 中，它将成为人们选择保留内容的目录。

### What this means for WalletWallet
### 这对 WalletWallet 意味着什么

We will be honest. WalletWallet exists because of this exact gap. You take a barcode from any loyalty card, paste it into our web app, pick a color, and a free Apple Wallet pass lands on your phone in about a minute, all from the browser without an account or any developer setup. Once Create a Pass ships in September, a chunk of that workflow moves natively into the iPhone Wallet app. That is good for users. We started this project to make Wallet friendlier for the cafes-and-gyms long tail, and Apple agreeing with us at OS-level scope is a healthy outcome. The category needed it.

我们坦诚地说，WalletWallet 的存在正是为了填补这一空白。你只需获取任何会员卡的条形码，粘贴到我们的网页应用中，选择颜色，大约一分钟内，一张免费的 Apple Wallet 票证就会出现在你的手机上，全程无需账号或任何开发者设置，只需浏览器即可完成。一旦“创建票证”功能在 9 月发布，部分工作流程将原生集成到 iPhone 钱包应用中。这对用户来说是件好事。我们启动这个项目是为了让钱包对咖啡馆和健身房等长尾商户更友好，苹果在操作系统层面认同我们的理念是一个积极的结果。这个领域确实需要它。

A few places where we still help, even after iOS 27 ships:
*   **Google Wallet:** Create a Pass is iPhone-only. Roughly half of the wallet-using world is on Android, and our generator builds Google Wallet passes from the same form.
*   **Web, no OS upgrade:** iOS 27 needs a compatible iPhone and the September update. WalletWallet runs in any browser today. iOS 14, iPad, Mac, a friend's laptop, all fine.
*   **Tag passes with real integrations:** Our Bandcamp, SoundCloud, and Spotify pass builders pull artist art and links automatically into a tag pass. That is a different shape from the generic templated pass Apple is showing.
*   **Sharing:** A web-generated .pkpass is just a file. You can email it, post it, hand it to a friend on Android via QR. The Wallet-native flow is more locked to the device that built it.

即使在 iOS 27 发布后，我们仍能在以下方面提供帮助：
*   **Google Wallet：** “创建票证”仅限 iPhone 使用。全球约有一半的钱包用户使用 Android，而我们的生成器可以从相同的表单构建 Google Wallet 票证。
*   **网页端，无需系统升级：** iOS 27 需要兼容的 iPhone 和 9 月的更新。而 WalletWallet 目前可在任何浏览器中运行。iOS 14、iPad、Mac、朋友的笔记本电脑，统统没问题。
*   **带有真实集成的标签票证：** 我们的 Bandcamp、SoundCloud 和 Spotify 票证生成器会自动将艺术家的图片和链接提取到标签票证中。这与苹果展示的通用模板票证形式不同。
*   **分享：** 网页生成的 .pkpass 只是一个文件。你可以通过电子邮件发送、发布，或通过二维码传给 Android 上的朋友。而钱包原生的流程则更多地锁定在创建它的设备上。

We expect to lose volume on the simplest one-barcode-to-Wallet case once Create a Pass goes live. That is fine. The reason WalletWallet started was that Apple's bar for a Wallet pass was too high for normal people. If iOS 27 lowers that bar, the world we wanted is closer.

我们预计，一旦“创建票证”功能上线，最简单的“一码入钱包”案例的业务量会下降。这没关系。WalletWallet 创立的初衷就是因为苹果对钱包票证的门槛对普通人来说太高了。如果 iOS 27 降低了这个门槛，那么我们所期望的世界就更近了一步。

### What we still do not know
### 我们尚不清楚的问题

The current reports cover the UI, the templates, and the high-level workflow. They are silent on a lot of details that matter:
*   Whether iCloud will sync user-created passes across iPhone, iPad, and Mac
*   Whether passes can be exported as .pkpass files to share with non-iPhone users
*   Whether Wallet supports Code 128, PDF417, and Aztec barcodes, or only QR
*   Whether merchants can claim, co-sign, or update user-created passes after the fact
*   Whether passes have lock-screen behavior tied to time and location, the way developer-issued passes do today

目前的报道涵盖了 UI、模板和高层工作流程，但对许多关键细节只字未提：
*   iCloud 是否会在 iPhone、iPad 和 Mac 之间同步用户创建的票证。
*   票证是否可以导出为 .pkpass 文件以分享给非 iPhone 用户。
*   钱包是否支持 Code 128、PDF417 和 Aztec 条形码，还是仅支持二维码。
*   商家事后是否可以认领、共同签署或更新用户创建的票证。
*   票证是否具备像开发者发行的票证那样，与时间和地点挂钩的锁屏行为。

We will know more once Apple previews iOS 27 at WWDC on June 8, and again when the first developer betas land. We will update this post when there is something concrete to add.

一旦苹果在 6 月 8 日的 WWDC 上预览 iOS 27，以及首个开发者测试版发布时，我们将了解更多信息。如有确切内容，我们将更新此文。

### Quick recap
### 快速回顾

iOS 27 is adding a Create a Pass button to the Wallet app, with a QR-scan or build-from-scratch flow and three color-coded templates: Standard (orange), Membership (blue), and Event (purple). Bloomberg broke the story on May 4, and a public release is expected in September 2026. It will be the first time iPhone users do not need a third-party tool to put a barcode into Wallet, and for us that is a sign the category is maturing the right way.

iOS 27 将在钱包应用中增加“创建票证”按钮，提供二维码扫描或从零构建的流程，以及三种颜色编码的模板：标准（橙色）、会员（蓝色）和活动（紫色）。彭博社于 5 月 4 日率先报道了这一消息，预计将于 2026 年 9 月公开发布。这将是 iPhone 用户首次无需第三方工具即可将条形码放入钱包，对我们而言，这标志着该领域正朝着正确的方向成熟。