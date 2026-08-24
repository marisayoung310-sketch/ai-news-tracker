---
title: "NanmiCoder / MediaCrawler"
originalUrl: "https://github.com/NanmiCoder/MediaCrawler"
date: "2026-07-27T22:34:28.583Z"
---

# NanmiCoder / MediaCrawler

🔥 **MediaCrawler - Self-Media Platform Crawler 🕷️**

🤝 **Special thanks to Platinum Sponsor BrowserAct** for supporting data extraction from any website. Simply describe the data you need, and BrowserAct will explore and test the webpage in a real browser, generate a reliable, reusable data collection bot, and return structured results. It features built-in stealth browsing, CAPTCHA handling, and high-quality residential proxies. No code required—try it for free today.

🤝 **特别感谢白金赞助商 BrowserAct** 支持从任意网站提取数据。只需描述所需数据，BrowserAct 就会在真实浏览器中探索并测试网页，生成可靠、可复用的数据采集 Bot，并返回结构化结果。内置隐身浏览和验证码处理，并提供高质量住宅代理。无需代码，立即免费试用。

---

### ⚠️ Disclaimer / 免责声明

**Disclaimer:** Please use this repository for learning purposes only ⚠️⚠️⚠️⚠️. All content in this repository is for study and reference only and is prohibited for commercial use. No individual or organization may use the content of this repository for illegal purposes or to infringe upon the legal rights of others. The crawler technology involved is solely for research; it must not be used for large-scale crawling or other illegal activities against other platforms. This repository assumes no legal liability for any consequences arising from the use of its content. By using this content, you agree to all terms and conditions of this disclaimer. Click to view the detailed disclaimer.

**免责声明：** 大家请以学习为目的使用本仓库⚠️⚠️⚠️⚠️，爬虫违法违规的案件 本仓库的所有内容仅供学习和参考之用，禁止用于商业用途。任何人或组织不得将本仓库的内容用于非法用途或侵犯他人合法权益。本仓库所涉及的爬虫技术仅用于学习和研究，不得用于对其他平台进行大规模爬虫或其他非法行为。对于因使用本仓库内容而引起的任何法律责任，本仓库不承担任何责任。使用本仓库的内容即表示您同意本免责声明的所有条款和条件。 点击查看更为详细的免责声明。

---

### 📖 Project Introduction / 项目简介

A powerful multi-platform self-media data collection tool that supports public information scraping from mainstream platforms such as Xiaohongshu (Little Red Book), Douyin, Kuaishou, Bilibili, Weibo, Tieba, and Zhihu.

一个功能强大的多平台自媒体数据采集工具，支持小红书、抖音、快手、B站、微博、贴吧、知乎等主流平台的公开信息抓取。

---

### 🔧 Technical Principles / 技术原理

*   **Core Technology:** Based on the Playwright browser automation framework to log in and save session states.
*   **No JS Reverse Engineering Required:** Utilizes the browser context with preserved login states to obtain signature parameters via JS expressions.
*   **Advantages:** Eliminates the need to reverse-engineer complex encryption algorithms, significantly lowering the technical barrier.

**核心技术：** 基于 Playwright 浏览器自动化框架登录保存登录态。
**无需JS逆向：** 利用保留登录态的浏览器上下文环境，通过 JS 表达式获取签名参数。
**优势特点：** 无需逆向复杂的加密算法，大幅降低技术门槛。

---

### ✨ Features / 功能特性

| Platform | Keyword Search | Post ID Scraping | Comments | Creator Profile | Login Cache | IP Proxy Pool | Word Cloud |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Xiaohongshu | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Douyin | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Kuaishou | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Bilibili | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Weibo | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Tieba | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Zhihu | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

### 🚀 MediaCrawlerPro Released! / MediaCrawlerPro 重磅发布！

Open source is not easy; subscriptions are welcome to support the project. Focus on learning the architectural design of mature projects—not just crawler technology, the Pro version's design patterns are also worth deep study!

开源不易，欢迎订阅支持。专注于学习成熟项目的架构设计，不仅仅是爬虫技术，Pro 版本的代码设计思路同样值得深入学习！

**Core Advantages of MediaCrawlerPro:**
**MediaCrawlerPro 相较于开源版本的核心优势：**

*   **🎯 Core Function Upgrades:** Self-media content decomposition Agent, breakpoint resume, multi-account + IP proxy pool support, removal of Playwright dependency (simpler usage), and full Linux environment support.
    **🎯 核心功能升级：** 自媒体内容拆解Agent（新增功能）、断点续爬功能（重点特性）、多账号 + IP代理池支持（重点特性）、去除 Playwright 依赖，使用更简单、完整 Linux 环境支持。
*   **🏗️ Architectural Optimization:** Refactored code for better readability and maintainability (decoupled JS signature logic), enterprise-grade code quality, and high extensibility.
    **🏗️ 架构设计优化：** 代码重构优化，更易读易维护（解耦 JS 签名逻辑）、企业级代码质量，适合构建大型爬虫项目、完美架构设计，高扩展性，源码学习价值更大。
*   **🎁 Extra Features:** Desktop video downloader, multi-platform home feed recommendations, and AI Agent Skill support (OpenClaw / Claude Code / Cursor one-click installation).
    **🎁 额外功能：** 自媒体视频下载器桌面端（适合学习全栈开发）、多平台首页信息流推荐（HomeFeed）、AI Agent Skill 支持（OpenClaw 🦞 / Claude Code / Cursor 一键安装，让 Agent 自动爬取数据）。

---

### 🚀 Quick Start / 快速开始

**Prerequisites:**
*   **uv (Recommended):** The fastest Python package manager.
*   **Node.js:** Version >= 16.0.0.

**前置依赖：**
*   **uv 安装（推荐）：** 目前最强的 Python 包管理工具，速度快、依赖解析准确。
*   **Node.js 安装：** 项目依赖 Node.js，版本要求 >= 16.0.0。

**Installation:**
```bash
# Enter project directory
cd MediaCrawler
# Use uv to sync dependencies
uv sync
```

**运行爬虫程序：**
```bash
# Search for posts and scrape info/comments
uv run main.py --platform xhs --lt qrcode --type search
# Scrape specific post by ID
uv run main.py --platform xhs --lt qrcode --type detail
```

---

### 💬 Community & Support / 交流与支持

*   **WeChat Group:** Click to join.
*   **Bilibili:** Follow for AI and crawler tech knowledge.
*   **Sponsorship:** Become a sponsor to showcase your product here.

**微信交流群：** 点击加入。
**B站账号：** 关注我，分享AI与爬虫技术知识。
**赞助商展示：** 成为赞助者，可以将您的产品展示在这里，每天获得大量曝光！