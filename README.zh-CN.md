# AI News Daily - AI 新闻日报

> 零成本 AI 驱动的每日新闻聚合器。从 24+ 个源采集，生成中英双语摘要，自动发布。

[English](./README.md)

## 架构

```
GitHub Actions (每日定时)
  → 从 24 个源采集 (RSS / API / 爬虫)
  → 跨源 URL 去重
  → AI 摘要 & 翻译 (中英双语)
  → 生成 Markdown
  → Git 推送
  → Cloudflare Pages 自动部署
```

## 技术栈

| 组件 | 技术 |
|------|------|
| 网站 | Astro (静态站点生成) |
| 托管 | Cloudflare Pages (免费) |
| 调度 | GitHub Actions 定时任务 |
| 采集 | 插件化架构 (RSS、API、爬虫) + 自动重试 |
| AI | Vercel AI SDK (OpenAI / Claude / Gemini / DeepSeek) |
| 语言 | TypeScript |

## 特性

- **24 个新闻源** — Hacker News、TechCrunch、The Verge、Ars Technica、Product Hunt、MIT 科技评论、GitHub Trending、OpenAI 博客、Anthropic 博客、Google AI 博客、DeepMind 博客、Meta 官方博客、Microsoft AI、Hugging Face、The Gradient、arXiv (AI/CL/LG/CV)、WIRED、Lobsters、DEV Community、VentureBeat、Towards Data Science
- **明暗主题** — 跟随系统偏好，支持手动切换（自动 / 明亮 / 暗色）
- **阅读体验** — 进度条、回到顶部、源目录导航、前一天/后一天切换
- **移动端优先** — 响应式字体、吸顶横滑目录、触控友好
- **智能采集** — 代理支持 + 自动重试、跨源 URL 去重、全局 Token 预算控制
- **双语输出** — AI 生成中文摘要，保留英文原标题

## 快速开始

### 前置条件

- Node.js >= 24
- pnpm >= 9

### 安装

```bash
pnpm install
```

### 配置环境变量

设置您偏好的 AI 服务商及其他可选功能的配置。您也可以复制 `.env.example` 为 `.env` 来在本地配置：

```bash
# 选择服务商: openai | anthropic | google | deepseek
export AI_PROVIDER=openai
export AI_MODEL=gpt-4o

# 设置对应的 API Key
export OPENAI_API_KEY=sk-xxx
# 或
export ANTHROPIC_API_KEY=sk-ant-xxx
# 或
export GOOGLE_GENERATIVE_AI_API_KEY=xxx
# 或
export DEEPSEEK_API_KEY=xxx

# （可选）配置 Google Analytics 衡量 ID
export PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 本地运行

```bash
# 采集新闻并生成日报
pnpm run generate

# 强制重新生成（覆盖已有日报）
FORCE_REGEN=1 pnpm run generate

# 预览网站
pnpm run dev

# 构建生产版本
pnpm run build
```

## 数据源配置

编辑 `config/sources.json` 添加或移除新闻源：

```json
{
  "sources": [
    {
      "name": "Hacker News",
      "type": "api",
      "plugin": "hackernews",
      "maxItems": 15,
      "enabled": true
    },
    {
      "name": "TechCrunch",
      "type": "rss",
      "plugin": "rss",
      "url": "https://techcrunch.com/feed/",
      "maxItems": 10,
      "enabled": true
    }
  ]
}
```

### 内置数据源 (24 个)

| 数据源 | 类型 | 插件 | 说明 |
|--------|------|------|------|
| Hacker News | API | `hackernews` | 技术社区热门 |
| Product Hunt | API | `producthunt` | 每日新产品 |
| GitHub Trending | 爬虫 | `github-trending` | 热门开源项目 |
| TechCrunch | RSS | `rss` | 科技创业新闻 |
| The Verge | RSS | `rss` | 消费科技 |
| Ars Technica | RSS | `rss` | 深度技术报道 |
| MIT Technology Review | RSS | `rss` | MIT 科技评论 |
| OpenAI Blog | RSS | `rss` | OpenAI 官方博客 |
| Anthropic Blog | 爬虫 | `anthropic` | Anthropic 官方博客 |
| Google AI Blog | RSS | `rss` | Google AI 研究 |
| DeepMind Blog | RSS | `rss` | DeepMind 研究 |
| Meta Engineering | RSS | `rss` | Meta 工程博客 |
| Microsoft AI Blog | RSS | `rss` | 微软 AI 博客 |
| Hugging Face Blog | RSS | `rss` | 开源 AI 社区 |
| The Gradient | RSS | `rss` | AI 深度分析 |
| arXiv CS.AI | RSS | `rss` | AI 最新论文 |
| arXiv CS.CL | RSS | `rss` | NLP 最新论文 |
| arXiv CS.LG | RSS | `rss` | 机器学习论文 |
| arXiv CS.CV | RSS | `rss` | 计算机视觉论文 |
| WIRED | RSS | `rss` | 科技文化 |
| Lobsters | RSS | `rss` | 高质量技术讨论 |
| DEV Community | RSS | `rss` | 开发者社区 |
| VentureBeat AI | RSS | `rss` | 创投 AI 资讯 |
| Towards Data Science | RSS | `rss` | 数据科学前沿 |

### 自定义插件

在 `scripts/fetch/plugins/` 下创建新文件，实现 `SourcePlugin` 接口：

```typescript
import type { SourcePlugin, SourceConfig, Article } from '../types.js';

const myPlugin: SourcePlugin = {
  name: 'my-plugin',
  type: 'api',
  async fetch(config: SourceConfig): Promise<Article[]> {
    // 你的采集逻辑
    return articles;
  }
};

export default myPlugin;
```

然后在 `scripts/fetch/index.ts` 中注册。

## 生产环境部署

本项目设计为完全托管在免服务器架构上，您需要完成 GitHub Secrets 配置以运行自动采集流水线，并配置 Cloudflare Pages 来托管前端网页。

### 1. 配置 GitHub Secrets

每日的新闻采集与生成由 GitHub Actions 自动运行。前往您的 GitHub 仓库 **Settings > Secrets and variables > Actions**，配置以下变量：

#### 必需的 Secrets
- `AI_PROVIDER` — AI 服务商名称（如 `openai`, `anthropic`, `google`, `deepseek`）
- `AI_MODEL` — 模型标识（如 `gpt-4o`）
- `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` / `GOOGLE_GENERATIVE_AI_API_KEY` / `DEEPSEEK_API_KEY` — 对应服务商的 API Key

#### 可选 Secrets
- `PRODUCTHUNT_CLIENT_ID` / `PRODUCTHUNT_CLIENT_SECRET` / `PRODUCTHUNT_API_TOKEN` — Product Hunt API（无配置时回退到 RSS）
- `WEBHOOK_URL` — 通知 Webhook 地址
- `WEBHOOK_TYPE` — 类型：`wecom`(企业微信) | `dingtalk`(钉钉) | `feishu`(飞书) | `slack` | `generic`
- `SITE_URL` — 你的网站访问地址（如 `https://your-site.com`），用于在通知消息中拼接日报的直达链接

### 2. 配置 Cloudflare Pages 

前端网站通过 Cloudflare Pages 自动部署：

1. 前往 [Cloudflare 控制台](https://dash.cloudflare.com/) > Pages
2. 创建项目 > 连接你的 GitHub 仓库
3. 构建设置：
   - **框架预设**: Astro (或保留 None)
   - **构建命令**: `pnpm run build`
   - **输出目录**: `dist`
4. **环境变量（可选）**：如果需要统计网站流量，请添加环境变量 `PUBLIC_GA_ID`，值为你的 Google Analytics 衡量 ID（如 `G-XXXXXXXXXX`）。
5. 完成！每次 GitHub Actions 推送新的新闻数据时，Cloudflare 都会自动触发前端站点的重新构建与发布。

## 项目结构

```
ai-news/
├── .github/workflows/daily.yml  # 定时流水线
├── config/
│   └── sources.json             # 数据源配置 (24 个源)
├── scripts/
│   ├── fetch/
│   │   ├── types.ts             # 核心类型定义
│   │   ├── registry.ts          # 插件注册表
│   │   ├── plugins/
│   │   │   ├── rss.ts           # RSS/Atom 插件
│   │   │   ├── api/
│   │   │   │   ├── hackernews.ts
│   │   │   │   └── producthunt.ts
│   │   │   └── crawler/
│   │   │       ├── web-generic.ts
│   │   │       ├── github-trending.ts
│   │   │       └── anthropic.ts
│   │   └── index.ts             # 采集调度器
│   ├── ai/
│   │   ├── provider.ts          # 多服务商 AI 适配器
│   │   ├── prompts.ts           # 提示词模板 (全局 Token 预算)
│   │   └── index.ts
│   ├── generate.ts              # Markdown 生成器 (去重 + FORCE_REGEN)
│   ├── proxy.ts                 # 代理 + 自动重试
│   ├── notify.mjs               # Webhook 通知
│   └── main.ts                  # 入口
├── src/                         # Astro 网站
│   ├── content/
│   │   ├── daily/               # 生成的日报
│   │   └── news/                # 翻译后的新闻详情 (按日期归档)
│   ├── layouts/
│   │   └── Layout.astro         # 明暗主题、进度条、回到顶部
│   └── pages/
│       ├── index.astro          # 首页
│       └── daily/[...slug].astro # 详情页 (目录导航、前后切换)
├── astro.config.mjs
└── package.json
```

## 费用

- **GitHub Actions**: 免费额度 — 2,000 分钟/月（每日运行约 5 分钟）
- **Cloudflare Pages**: 免费额度 — 500 次构建/月
- **AI API**: 按量付费 — 每月约 $1-5

## 许可证

MIT
