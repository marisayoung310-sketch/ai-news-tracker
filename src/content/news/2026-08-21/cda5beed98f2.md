---
title: "Why I Built a Zero-Knowledge, Client-Side Encrypted Burning Note App Over the Weekend"
originalUrl: "https://dev.to/specialagentbreadwinner/why-i-built-a-zero-knowledge-client-side-encrypted-burning-note-app-over-the-weekend-bal"
date: "2026-08-20T22:03:48.911Z"
---

# Why I Built a Zero-Knowledge, Client-Side Encrypted Burning Note App Over the Weekend
# 为什么我利用周末开发了一款零知识、客户端加密的“阅后即焚”笔记应用

Hey everyone! 👋 Like many developers and sysadmins, I constantly find myself needing to share temporary credentials, API keys, or sensitive text with clients and coworkers. Dropping these straight into Slack, Discord, or standard email always feels like a massive security headache because those chat platforms store everything in plain text in their databases.
大家好！👋 和许多开发者及系统管理员一样，我经常需要与客户和同事分享临时凭证、API 密钥或敏感文本。直接将这些信息发送到 Slack、Discord 或普通电子邮件中总是让我感到巨大的安全隐患，因为这些聊天平台会将所有内容以明文形式存储在它们的数据库中。

I looked into popular "one-time secret" web utilities, but I noticed a major flaw: almost all of them handle the encryption and decryption on their servers. That means you have to blindly trust their backend configurations, logging policies, and database security. I wanted something truly zero-knowledge where the server owner physically couldn't read the notes even if they wanted to. So, I built ScorchNote: https://scorchnote.com
我研究了一些流行的“一次性秘密”网页工具，但发现了一个重大缺陷：几乎所有工具都在服务器端进行加密和解密。这意味着你必须盲目信任它们的后端配置、日志记录策略和数据库安全性。我想要的是一种真正的零知识方案，即使服务器所有者想看，也无法读取这些笔记。因此，我开发了 ScorchNote：https://scorchnote.com

### How it Works (Under the Hood)
### 工作原理（底层逻辑）

To achieve absolute zero-knowledge, ScorchNote relies on strict client-side mechanics:
为了实现绝对的零知识，ScorchNote 依赖于严格的客户端机制：

*   **Browser-Side Encryption:** When you type a secret, the data is encrypted directly in your browser before it ever leaves your network interface.
    **浏览器端加密：** 当你输入秘密时，数据会在离开你的网络接口之前直接在浏览器中完成加密。

*   **The URL Hash Advantage:** The decryption key is generated and stored inside the URL's hash fragment (everything after the #).
    **URL 哈希优势：** 解密密钥生成并存储在 URL 的哈希片段中（即 # 之后的所有内容）。

*   **Zero Server Footprint:** Web browsers never send the hash fragment to the host server during HTTP requests. This means my database only receives a completely scrambled, encrypted payload. The server has no concept of what the key is.
    **服务器零痕迹：** 在 HTTP 请求期间，Web 浏览器永远不会将哈希片段发送给主机服务器。这意味着我的数据库收到的只是完全乱码的加密载荷，服务器根本不知道密钥是什么。

*   **Millisecond Burn-on-Read:** The moment the recipient visits the link, the encrypted payload is fetched and instantly purged from the server database.
    **毫秒级阅后即焚：** 当接收者访问链接的瞬间，加密载荷会被提取并立即从服务器数据库中彻底删除。

### 🚀 Try It Out
### 🚀 试用一下

I kept the page entirely lightweight, minimalist, and completely free of bloated tracking scripts. It’s built to do exactly one job, safely and instantly. I would love to hear your thoughts on the architecture, the user experience, or what features you think I should cook up next! Check it out here: [ScorchNote](https://scorchnote.com)
我保持了页面完全轻量化、极简，并且没有任何臃肿的追踪脚本。它的设计初衷就是为了安全、即时地完成这一项任务。我很乐意听听你对架构、用户体验的看法，或者你认为我接下来应该开发什么功能！点击这里查看：[ScorchNote](https://scorchnote.com)