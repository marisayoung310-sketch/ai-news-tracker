---
title: "In stunning display of stupid, secret CISA credentials found in public GitHub repo"
originalUrl: "https://arstechnica.com/information-technology/2026/05/in-stunning-display-of-stupid-secret-cisa-credentials-found-in-public-github-repo/"
date: "2026-05-19T22:45:20.187Z"
---

# In stunning display of stupid, secret CISA credentials found in public GitHub repo
# 令人震惊的愚蠢：美国网络安全与基础设施安全局（CISA）的机密凭证被发现泄露在公开 GitHub 仓库中

Security researcher Brian Krebs brings us the news that America’s Cybersecurity & Infrastructure Agency (CISA) has had a large store of plaintext passwords, SSH private keys, tokens, and “other sensitive CISA assets” exposed in a public GitHub repo since at least November 2025.
安全研究员布莱恩·克雷布斯（Brian Krebs）报道称，美国网络安全与基础设施安全局（CISA）的大量明文密码、SSH 私钥、令牌以及“其他敏感 CISA 资产”自 2025 年 11 月起就已暴露在一个公开的 GitHub 仓库中。

The now-offline public repo—named, somewhat aspirationally, “Private-CISA”—was brought to Krebs’ attention by GitGuardian’s Guillaume Valadon, who was alerted to the repo’s presence by GitGuardian’s public code scans.
这个现已下线的公开仓库被命名为“Private-CISA”（颇具讽刺意味），是由 GitGuardian 的纪尧姆·瓦拉东（Guillaume Valadon）提请克雷布斯注意的。瓦拉东是通过 GitGuardian 的公开代码扫描功能发现该仓库存在的。

Krebs says that Valadon approached him after receiving no responses from the Private-CISA repo’s owner. In an email to Krebs, Valadon claimed that the repo’s commit logs show that GitHub’s default protections against committing secrets—protections designed to protect unwitting or unskilled developers against exactly this kind of stupidness—had been disabled by the repo’s administrator.
克雷布斯表示，瓦拉东在未能收到该仓库所有者的任何回复后联系了他。瓦拉东在给克雷布斯的邮件中称，仓库的提交日志显示，GitHub 针对提交机密信息的默认保护机制——旨在防止无意或缺乏经验的开发者犯下此类愚蠢错误的保护措施——已被该仓库的管理员手动禁用。

Testing by Seralys founder Philippe Caturegli showed that this was not a joke or hoax and that he was able to use the credentials in the Private-CISA repo to gain access to multiple Amazon Web Services GovCloud accounts “at a high privilege level.”
Seralys 创始人菲利普·卡图雷利（Philippe Caturegli）的测试表明，这并非玩笑或恶作剧；他能够利用“Private-CISA”仓库中的凭证，以“高权限级别”访问多个亚马逊云科技（AWS）GovCloud 账户。

Krebs notes that the repo appeared to be managed by Virginia-based Nightwing, a CISA contractor. Nightwing has so far not commented publicly, instead referring questions back to CISA.
克雷布斯指出，该仓库似乎是由总部位于弗吉尼亚州的 CISA 承包商 Nightwing 管理的。截至目前，Nightwing 尚未发表公开评论，而是将相关问题转回给 CISA 处理。

This isn’t the first time CISA has screwed up—in fact, it’s not even the first time this year. In January, polygraph-failing acting CISA Director Madhu Gottumukkala uploaded sensitive government documents to ChatGPT after demanding and receiving an exemption to the agency policy that prohibited ChatGPT’s use by CISA personnel. Gottumukkala was removed from his role in February.
这并非 CISA 第一次搞砸——事实上，这甚至不是今年第一次。今年 1 月，未能通过测谎的 CISA 代理局长马杜·戈图穆卡拉（Madhu Gottumukkala）在要求并获得豁免权（该豁免权允许其绕过禁止 CISA 人员使用 ChatGPT 的机构政策）后，将敏感政府文件上传到了 ChatGPT。戈图穆卡拉已于 2 月被免职。