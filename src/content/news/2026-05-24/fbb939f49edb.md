---
title: "FBI director's Based Apparel site has been spotted hosting a 'ClickFix' attack"
originalUrl: "https://www.pcmag.com/news/kash-patels-apparel-site-is-trying-to-trick-visitors-into-installing-malware"
date: "2026-05-23T22:52:26.152Z"
---

# FBI director's Based Apparel site has been spotted hosting a 'ClickFix' attack
# FBI 局长旗下的 Based Apparel 网站被发现遭“ClickFix”攻击植入

An apparel site from FBI director Kash Patel has been spotted trying to trick macOS users into installing malware. The site, BasedApparel.com, is part of a merchandise brand that Patel co-created with Andrew Ollis prior to becoming FBI director under the Trump administration.
FBI 局长 Kash Patel 旗下的服装网站被发现试图诱骗 macOS 用户安装恶意软件。该网站 BasedApparel.com 是 Patel 在特朗普政府任职 FBI 局长之前与 Andrew Ollis 共同创立的商品品牌的一部分。

On Thursday, a user based in Portugal spotted the online shop hosting a “ClickFix”-style attack that tries to dupe unsuspecting users into running a malicious command on their Mac computers. The attack seems to work as the user visits BasedApparel.com; a victim will encounter the site showing a page pretending to come from Cloudflare, which powers “Verify you are human” CAPTCHA tests and offers DDoS protection.
周四，一位身处葡萄牙的用户发现该网店正在进行“ClickFix”式攻击，试图诱骗毫无戒心的用户在 Mac 电脑上运行恶意命令。攻击过程是当用户访问 BasedApparel.com 时，受害者会看到一个伪装成 Cloudflare 的页面，该页面通常用于提供“验证您是否为人类”的验证码测试及 DDoS 防护。

The fake Cloudflare page will show a warning saying “Unusual Web Traffic Detected,” while also requiring the user to verify that they’re human. But to do so, the page posts some unusual instructions that call for the user to open Terminal, a built-in utility in macOS that can execute programs.
这个虚假的 Cloudflare 页面会显示“检测到异常网络流量”的警告，并要求用户进行人类验证。为了完成验证，页面会给出一些异常指令，要求用户打开 macOS 内置的程序执行工具——终端（Terminal）。

The user is then told to click the “Copy" button on the page to copy the command “I am not a robot: Cloudflare Verification ID: 801470." But in reality, clicking the button will actually copy a much longer obfuscated text that looks like gibberish, although it's actually a hidden command.
用户随后被告知点击页面上的“复制”按钮，以复制“I am not a robot: Cloudflare Verification ID: 801470”这条命令。但实际上，点击该按钮会复制一段看起来像乱码的长串混淆文本，而这其实是一条隐藏的恶意命令。

The user is then told to paste and run the command in Terminal, thus executing the instructions without realizing the danger. The hidden command will decode, and fetch a shell script containing a list of commands from the hacker-controlled web domain.
用户随后被要求将该命令粘贴并运行在终端中，从而在未察觉危险的情况下执行了指令。这段隐藏命令会进行解码，并从黑客控制的域名中获取一个包含一系列指令的 Shell 脚本。

PCMag encountered the attack while navigating BasedApparel.com on a MacBook, although we were only able to trigger the fake Cloudflare page once over the Chrome browser.
PCMag 在使用 MacBook 浏览 BasedApparel.com 时遭遇了此次攻击，尽管我们仅在 Chrome 浏览器中成功触发了一次该虚假 Cloudflare 页面。

The user on X who flagged the threat, “debbie," told PCMag she encountered the attack after reading an article in The Atlantic about Patel that linked to the Based Apparel site. “The ClickFix attack just kinda popped up when I was browsing it,” Debbie said in an email. “I took a quick look and it's just a classic infostealer, wrapped twice in base64 (binary-to-text encoding). It's interesting that it's written in Applescript though.”
在 X 平台上举报该威胁的用户“debbie”告诉 PCMag，她在阅读《大西洋月刊》关于 Patel 的文章并点击其中指向 Based Apparel 网站的链接后，遭遇了此次攻击。“当我浏览该网站时，ClickFix 攻击就弹出来了，”Debbie 在邮件中说道。“我简单看了一下，这只是一个经典的窃密软件，经过了两次 base64 编码。有趣的是，它是用 Applescript 编写的。”

debbie, who described herself as a “big nerd,” managed to retrieve the malicious shell script payload, which we ran through VirusTotal. The payload was flagged by 27 antivirus engines as malicious, classifying it as Trojan and infostealer.
自称是“超级极客”的 debbie 成功获取了该恶意 Shell 脚本载荷，我们将其上传至 VirusTotal 进行检测。该载荷被 27 款杀毒引擎标记为恶意软件，并被归类为木马和窃密软件。

The attack seems to work by spanning various instructions that if run through macOS’s Terminal utility could steal stored credentials from Chromium-based browsers along with data from cryptocurrency wallets, placing them into a zip archive then sent to a hacker-controlled domain.
该攻击通过一系列指令运作，如果通过 macOS 的终端工具运行，这些指令可以窃取基于 Chromium 的浏览器中存储的凭据以及加密货币钱包中的数据，并将它们打包成压缩文件发送到黑客控制的域名。

The attack suggests a hacker compromised some portion of BasedApparel.com when the ClickFix threat has remained pervasive in recent years, fooling less tech-savvy users. Security researchers have warned that the hackers behind ClickFix schemes have been circulating their attacks by stealing the login credentials for legitimate websites, tampering with exposed admin panels, or hitting vulnerable plugins.
此次攻击表明黑客入侵了 BasedApparel.com 的部分内容。近年来，ClickFix 威胁一直很普遍，专门欺骗技术水平较低的用户。安全研究人员警告称，ClickFix 攻击背后的黑客通常通过窃取合法网站的登录凭据、篡改暴露的管理面板或攻击易受攻击的插件来传播其攻击。

Based Apparel didn’t immediately respond to a request for comment. But the attack is a reminder to be vigilant around pop-ups and other scareware tactics. Apple recently introduced a safeguard in macOS Sequoia (Tahoe) that can stop and warn users against running copied-and-pasted commands into the Terminal utility, citing the potential of malware.
Based Apparel 未立即回应置评请求。但此次攻击提醒用户，应对弹窗和其他恐吓软件策略保持警惕。苹果公司最近在 macOS Sequoia (Tahoe) 中引入了一项安全保护措施，可以阻止并警告用户不要在终端工具中运行复制粘贴的命令，以防范潜在的恶意软件。