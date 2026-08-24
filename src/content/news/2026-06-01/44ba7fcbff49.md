---
title: "The Website Specification"
originalUrl: "https://specification.website/"
date: "2026-05-31T22:18:37.645Z"
---

# The Website Specification / 网站规范

**What a good website does. A platform-agnostic specification of the technical features every decent website should have — from `<title>` to `/.well-known/security.txt`, from WCAG contrast to `llms.txt`. Written for humans and agents. Browse all 128 topics → Get the checklist ★ on GitHub**

一个优秀的网站应该具备什么？这是一份与平台无关的技术规范，涵盖了每个合格网站都应具备的功能——从 `<title>` 到 `/.well-known/security.txt`，从 WCAG 对比度到 `llms.txt`。专为人类和 AI 智能体编写。浏览全部 128 个主题 → 在 GitHub 上获取清单 ★

### Categories / 分类
**Ten areas, mapped to widely-accepted standards. All topics →**

十大领域，映射至广泛认可的标准。查看所有主题 →

*   **Foundations (14):** The HTML, head, and document basics every page needs.
    **基础 (14)：** 每个页面都需要的 HTML、head 和文档基础知识。
*   **SEO (13):** Search visibility — robots.txt, sitemaps, canonicals, structured data.
    **SEO (13)：** 搜索可见性——robots.txt、站点地图、规范链接、结构化数据。
*   **Accessibility (20):** WCAG-aligned rules so people of all abilities can use the site.
    **无障碍 (20)：** 符合 WCAG 的规则，确保所有能力的用户都能使用该网站。
*   **Security (12):** Headers, transport, and policies that keep visitors safe.
    **安全 (12)：** 保护访客安全的标头、传输协议和策略。
*   **Well-Known URIs (9):** Standard, agreed-upon paths under `/.well-known/`.
    **知名 URI (9)：** `/.well-known/` 下的标准约定路径。
*   **Agent Readiness (18):** Things that make a site legible to AI agents and crawlers.
    **智能体就绪 (18)：** 使网站易于被 AI 智能体和爬虫读取的要素。
*   **Performance (19):** Core Web Vitals, caching, images, fonts, network behaviour.
    **性能 (19)：** 核心网页指标 (Core Web Vitals)、缓存、图像、字体、网络行为。
*   **Privacy (6):** Consent, signals, and respecting visitor choice.
    **隐私 (6)：** 同意机制、信号以及尊重访客的选择。
*   **Resilience (5):** Graceful failure — error pages, offline, redirects.
    **韧性 (5)：** 优雅的故障处理——错误页面、离线状态、重定向。
*   **Internationalisation (12):** Language, locale, direction, and translated content.
    **国际化 (12)：** 语言、区域设置、书写方向和翻译内容。

**Standards, not opinions**
**基于标准，而非观点**
**Each topic links back to the source standard — WHATWG, W3C, IETF RFCs, WCAG, MDN, and the organisations defining the modern web.**

每个主题都链接回原始标准——WHATWG、W3C、IETF RFCs、WCAG、MDN 以及定义现代网络的各个组织。

**Platform agnostic**
**平台无关**
**Whether you ship WordPress, Drupal, TYPO3, Next.js, Astro, Hugo, a Django app, or plain HTML, the spec is the spec. Implementation hints follow it, not the other way round.**

无论你使用的是 WordPress、Drupal、TYPO3、Next.js、Astro、Hugo、Django 应用还是纯 HTML，规范就是规范。实现建议应遵循规范，而非反之。

**Built in the open**
**公开构建**
**Every page has an Edit on GitHub link. PRs welcome. Sources credited on every page.**

每个页面都有“在 GitHub 上编辑”的链接。欢迎提交 PR。每个页面都注明了来源。

**Let your agent query the spec.**
**让你的智能体查询本规范。**
**The whole spec is available as an open MCP server — read-only, no auth — plus a published Agent Skill that teaches any compatible agent when and how to use it. Per-page Markdown is available via `/llms.txt` and `Accept: text/markdown` on any spec URL.**

整个规范作为一个开放的 MCP 服务器提供（只读，无需验证），并附带一个已发布的“智能体技能”(Agent Skill)，教导任何兼容的智能体何时以及如何使用它。通过 `/llms.txt` 或在任何规范 URL 上使用 `Accept: text/markdown` 请求头，即可获取各页面的 Markdown 内容。

**How to use this site**
**如何使用本网站**

*   **01 Audit:** Run through the checklist. Each item is a “does the site do this — yes or no.”
    **01 审计：** 浏览清单。每一项都是一个“网站是否做到了这一点——是或否”的问题。
*   **02 Learn:** Click into any item for what it is, why it matters, and how to implement it.
    **02 学习：** 点击任何条目，了解它是什么、为什么重要以及如何实现。
*   **03 Improve:** Found a gap, a stale fact, or a missing topic? Open a PR. Sources required.
    **03 改进：** 发现漏洞、过时信息或缺失的主题？提交一个 PR。需提供来源。