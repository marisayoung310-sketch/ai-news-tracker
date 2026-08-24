---
title: "Microsoft patches bug in video game Age of Empires II"
originalUrl: "https://techcrunch.com/2026/07/15/microsoft-patches-bug-in-video-game-age-of-empires-ii/"
date: "2026-07-15T22:17:53.635Z"
---

# Microsoft patches bug in video game Age of Empires II
# 微软修复《帝国时代 II》视频游戏漏洞

On Tuesday, Microsoft patched a historic record number of security bugs across its product lines, in large part due to the use of AI to help the company and external researchers discover bugs.
周二，微软修复了其产品线中创纪录数量的安全漏洞，这在很大程度上归功于人工智能的运用，它帮助公司及外部研究人员发现了这些漏洞。

Among the fixed vulnerabilities was one for the remastered version of the classic 25-year-old war strategy video game Age of Empires II. The flaw allowed hackers to take over a victim’s computer by sending a custom malicious game invite, according to security researchers.
在修复的漏洞中，包括一个针对拥有 25 年历史的经典战争策略游戏《帝国时代 II》重制版的漏洞。据安全研究人员称，该漏洞允许黑客通过发送自定义的恶意游戏邀请来接管受害者的计算机。

A video posted on X shows how the flaw could be exploited by hackers. Here’s the Age of Empires RCE from yesterday’s Patch Tuesday: CVE-2026-50663. Join an attacker’s lobby, (auto-)accept UCG, and you get remote code execution.
发布在 X（原推特）上的一段视频展示了黑客如何利用这一漏洞。以下是昨天“补丁星期二”中关于《帝国时代》远程代码执行（RCE）漏洞的说明：CVE-2026-50663。加入攻击者的大厅，（自动）接受用户生成内容（UCG），即可触发远程代码执行。

According to cybersecurity firm Rapid7, a successful attack would have allowed hackers to place malicious files on the victim’s computer, opening the door for the hacker to achieve the ability to run malicious code on the victim’s machine. That means, effectively, the hacker could have taken over control of the hacked computer.
据网络安全公司 Rapid7 称，一次成功的攻击将允许黑客在受害者的计算机上放置恶意文件，从而使黑客能够在受害者的机器上运行恶意代码。这意味着，实际上黑客可以完全控制被入侵的计算机。

There is no evidence that this bug was successfully exploited in the wild by hackers. But targeting video gamers can be an effective way to install malware on a high number of victims’ computers and steal their passwords, for example.
目前没有证据表明该漏洞已被黑客在野外成功利用。但针对游戏玩家进行攻击，往往是向大量受害者计算机植入恶意软件并窃取其密码等信息的有效途径。