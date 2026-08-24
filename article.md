# 我做了一个零成本 AI 新闻聚合器，每天自动从 16 个源抓取新闻并生成中英双语日报

> 从 Hacker News 到 arXiv 论文，GitHub Actions 定时采集 → AI 生成摘要 → 自动部署，全程零人工干预，月均成本不到 5 美元。

---

## 🤔 为什么做这个项目？

作为一个科技爱好者，我每天需要浏览大量的英文科技资讯——Hacker News 的热帖、TechCrunch 的创业新闻、arXiv 上的最新论文、GitHub 的 Trending 项目……

**痛点很明显：**

- 信息源太分散，每天要打开十几个网站
- 大部分内容是英文，快速浏览效率低
- 没有时间逐篇阅读，容易错过重要信息

于是我做了 **AI News Daily** —— 一个完全自动化的 AI 新闻聚合器。它每天从 16 个高质量信息源自动抓取内容，通过 AI 生成中英双语的每日新闻简报，然后自动发布到网站上。

**最关键的是：部署后完全无需人工维护，运行成本几乎为零。**

---

## 🏗️ 架构一览

整个系统的工作流程非常简洁：

```
GitHub Actions (每日定时触发)
    ↓
  从 16 个数据源采集 (RSS / API / 爬虫)
    ↓
  跨源 URL 去重
    ↓
  AI 摘要 & 翻译 (中英双语)
    ↓
  生成 Markdown 格式日报
    ↓
  Git 自动提交推送
    ↓
  Cloudflare Pages 自动部署上线
```

从触发到上线，全程自动化，通常只需 **3-5 分钟**。

---

## 📰 16 个内置新闻源

项目内置了覆盖 AI、科技、开源、学术等多个维度的 **16 个高质量新闻源**：

| 数据源 | 类型 | 说明 |
|--------|------|------|
| **Hacker News** | API | 全球最大技术社区热帖 |
| **Product Hunt** | API | 每日最新产品发现 |
| **GitHub Trending** | 爬虫 | 热门开源项目趋势 |
| **TechCrunch** | RSS | 硅谷创业与科技新闻 |
| **The Verge** | RSS | 消费科技前沿 |
| **Ars Technica** | RSS | 深度技术分析报道 |
| **MIT Technology Review** | RSS | MIT 权威科技评论 |
| **OpenAI Blog** | RSS | OpenAI 官方最新动态 |
| **Google AI Blog** | RSS | Google AI 研究进展 |
| **Hugging Face Blog** | RSS | 开源 AI 社区动态 |
| **The Gradient** | RSS | AI 领域深度分析 |
| **arXiv CS.AI** | RSS | 人工智能最新论文 |
| **arXiv CS.CL** | RSS | 自然语言处理最新论文 |
| **WIRED** | RSS | 全球科技与文化 |
| **Lobsters** | RSS | 高质量技术讨论社区 |
| **DEV Community** | RSS | 开发者社区精选 |

而且，数据源的增减只需修改一个 JSON 配置文件，完全不用动代码。

---

## 🧠 AI 能力：多模型适配

项目基于 **Vercel AI SDK** 构建了一个统一的多服务商适配层，你可以自由选择 AI 模型：

- **OpenAI** — GPT-4o 等
- **Anthropic** — Claude Sonnet 等
- **Google** — Gemini 2.0 Flash 等
- **DeepSeek** — DeepSeek Chat（OpenAI 兼容协议）

切换模型只需修改两个环境变量：

```bash
AI_PROVIDER=deepseek
AI_MODEL=deepseek-chat
```

AI 做了什么？
1. **智能摘要** — 将每篇文章的核心内容压缩为 1-2 段详实的中文摘要
2. **双语保留** — 保留英文原标题，同时生成中文翻译标题
3. **今日要点** — 自动提炼 3-5 条当天最重要的科技动态
4. **Token 预算控制** — 全局 Token 预算分配，确保不超出模型限制

---

## 🔌 插件化架构：轻松扩展

整个采集系统采用插件化设计，目前支持三种类型的插件：

- **RSS 插件** — 通用 RSS/Atom 解析，大部分新闻源用这个就够了
- **API 插件** — 针对有公开 API 的平台（如 Hacker News、Product Hunt）
- **爬虫插件** — 针对没有 RSS/API 的网站（如 GitHub Trending）

想添加一个新的数据源？只需两步：

**第一步**，实现接口：

```typescript
const myPlugin: SourcePlugin = {
  name: 'my-plugin',
  type: 'api',
  async fetch(config: SourceConfig): Promise<Article[]> {
    // 你的采集逻辑
    return articles;
  }
};
```

**第二步**，在配置文件中启用：

```json
{
  "name": "My Source",
  "type": "api",
  "plugin": "my-plugin",
  "maxItems": 10,
  "enabled": true
}
```

就这么简单。

---

## 🌐 网站端：简洁而不简单

网站基于 **Astro** 构建，以静态站点生成的方式输出，性能极佳。虽然界面克制，但细节拉满：

- **🌙 明暗主题** — 跟随系统偏好，也支持手动切换（自动 / 明亮 / 暗色三档）
- **📊 阅读进度条** — 页面顶部实时显示阅读进度
- **⬆️ 回到顶部** — 滑动 400px 后自动出现浮动按钮
- **📱 移动端优先** — 响应式字体、触控友好的交互区域
- **🔗 外链新标签** — 所有外部链接自动在新标签页打开
- **📅 前后日导航** — 支持在不同日期的日报之间快速切换
- **💬 微信分享与收藏** — 页面底部提供二维码，支持一键分享到微信或保存至微信收藏夹

---

## 🔔 通知集成：支持主流 IM

每天日报生成后，可以自动推送通知到你的团队 IM：

| 平台 | Webhook 类型 |
|------|-------------|
| 企业微信 | `wecom` |
| 钉钉 | `dingtalk` |
| 飞书 | `feishu` |
| Slack | `slack` |
| 自定义 | `generic` |

生成成功或失败都会通知，失败时还会附上 GitHub Actions 的运行日志链接，方便排查。

---

## 🚀 五分钟部署指南

### 1. Fork 仓库

直接 Fork 项目到你的 GitHub 账号。

### 2. 配置 Secrets

在 GitHub 仓库的 **Settings → Secrets and variables → Actions** 中添加：

```
AI_PROVIDER=deepseek        # 推荐 DeepSeek，性价比高
AI_MODEL=deepseek-chat
DEEPSEEK_API_KEY=sk-xxx     # 你的 API Key
```

### 3. 连接 Cloudflare Pages

- 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
- Pages → 创建项目 → 连接你的 GitHub 仓库
- 构建命令填 `pnpm run build`，输出目录填 `dist`
- 搞定！

### 4. 等待自动运行

GitHub Actions 会在每天早上 6:24（北京时间）自动触发。你也可以在 Actions 页面手动触发一次试试效果。

---

## 💰 运行成本分析

这可能是最让人惊喜的部分——**几乎零成本**：

| 服务 | 费用 | 说明 |
|------|------|------|
| GitHub Actions | **免费** | 每月 2,000 分钟免费额度，每日运行约 5 分钟 |
| Cloudflare Pages | **免费** | 每月 500 次构建免费，每天只用 1 次 |
| AI API | **$1-5/月** | 按量付费，DeepSeek 更便宜 |

**每月总成本：约 $1-5 美元**，主要是 AI API 的费用。如果使用 DeepSeek，甚至可以压到 $1 以内。

---

## 🛠️ 技术栈总结

| 组件 | 技术选型 | 理由 |
|------|---------|------|
| 网站框架 | Astro | 静态生成，零 JS 运行时，SEO 友好 |
| 托管 | Cloudflare Pages | 全球 CDN，免费，自动部署 |
| 调度 | GitHub Actions | 免费，可靠，与 Git 天然集成 |
| AI SDK | Vercel AI SDK | 统一接口，多服务商适配 |
| 采集框架 | 插件化自研 | RSS + API + 爬虫三种方式 |
| 语言 | TypeScript | 类型安全，开发体验好 |
| 网络层 | 代理 + 自动重试 | 应对网络不稳定和限流 |

---

## 📝 写在最后

AI News Daily 解决的是一个很实际的问题：**用最低的成本，自动化地获取和整理每天最值得关注的科技资讯。**

项目完全开源，MIT 协议，欢迎 Fork 和 Star ⭐

如果你也每天在多个英文科技网站之间疲于奔命，不妨试试这个方案。五分钟部署，之后就是每天早上打开网页，一杯咖啡的时间看完全球科技要闻。

---

**GitHub 仓库**：`github.com/tianyaxiang/ai-news`

如果这篇文章对你有帮助，欢迎点赞、转发、在看 👇
