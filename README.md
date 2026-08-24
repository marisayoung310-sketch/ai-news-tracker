# AI News Daily

> Zero-cost AI-powered daily news aggregator. Fetches from 24+ sources, generates bilingual (EN/CN) summaries, and publishes automatically.

[中文文档](./README.zh-CN.md)

## Architecture

```
GitHub Actions (cron daily)
  → Fetch from 24 sources (RSS / API / Crawler)
  → Cross-source URL deduplication
  → AI summarize & translate (bilingual)
  → Generate Markdown
  → Git push
  → Cloudflare Pages auto-deploy
```

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Website | Astro (static site generation) |
| Hosting | Cloudflare Pages (free) |
| Scheduler | GitHub Actions cron |
| Fetching | Plugin-based (RSS, API, Crawler) with auto-retry |
| AI | Vercel AI SDK (OpenAI / Claude / Gemini / DeepSeek) |
| Language | TypeScript |

## Features

- **24 news sources** — Hacker News, TechCrunch, The Verge, Ars Technica, Product Hunt, MIT Tech Review, GitHub Trending, OpenAI, Anthropic, Google AI, DeepMind, Meta, Microsoft AI, Hugging Face, The Gradient, arXiv (AI/CL/LG/CV), WIRED, Lobsters, DEV Community, VentureBeat, Towards Data Science
- **Dark / Light theme** — follows system preference, manual toggle (auto / light / dark)
- **Reading experience** — progress bar, back-to-top, source TOC navigation, prev/next day navigation
- **Mobile-first** — responsive typography, sticky horizontal-scroll TOC, touch-friendly targets
- **Smart fetching** — proxy support with auto-retry, cross-source URL deduplication, global token budget
- **Bilingual output** — AI-generated Chinese summaries with original English titles

## Quick Start

### Prerequisites

- Node.js >= 20
- pnpm >= 9

### Install

```bash
pnpm install
```

### Configure Environment

Set environment variables for your preferred AI provider and optional features. You can also copy `.env.example` to `.env` to set these locally:

```bash
# Choose provider: openai | anthropic | google | deepseek
export AI_PROVIDER=openai
export AI_MODEL=gpt-4o

# Set the API key for your chosen provider
export OPENAI_API_KEY=sk-xxx
# or
export ANTHROPIC_API_KEY=sk-ant-xxx
# or
export GOOGLE_GENERATIVE_AI_API_KEY=xxx
# or
export DEEPSEEK_API_KEY=xxx

# (Optional) Google Analytics Measurement ID
export PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Run Locally

```bash
# Fetch news and generate daily report
pnpm run generate

# Force regenerate (overwrite existing report)
FORCE_REGEN=1 pnpm run generate

# Preview website
pnpm run dev

# Build for production
pnpm run build
```

## Source Configuration

Edit `config/sources.json` to add/remove news sources:

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

### Built-in Sources (24)

| Source | Type | Plugin |
|--------|------|--------|
| Hacker News | API | `hackernews` |
| Product Hunt | API | `producthunt` |
| GitHub Trending | Crawler | `github-trending` |
| TechCrunch | RSS | `rss` |
| The Verge | RSS | `rss` |
| Ars Technica | RSS | `rss` |
| MIT Technology Review | RSS | `rss` |
| OpenAI Blog | RSS | `rss` |
| Anthropic Blog | Crawler | `anthropic` |
| Google AI Blog | RSS | `rss` |
| DeepMind Blog | RSS | `rss` |
| Meta Engineering | RSS | `rss` |
| Microsoft AI Blog | RSS | `rss` |
| Hugging Face Blog | RSS | `rss` |
| The Gradient | RSS | `rss` |
| arXiv CS.AI | RSS | `rss` |
| arXiv CS.CL | RSS | `rss` |
| arXiv CS.LG | RSS | `rss` |
| arXiv CS.CV | RSS | `rss` |
| WIRED | RSS | `rss` |
| Lobsters | RSS | `rss` |
| DEV Community | RSS | `rss` |
| VentureBeat AI | RSS | `rss` |
| Towards Data Science | RSS | `rss` |

### Writing Custom Plugins

Create a new file in `scripts/fetch/plugins/` implementing the `SourcePlugin` interface:

```typescript
import type { SourcePlugin, SourceConfig, Article } from '../types.js';

const myPlugin: SourcePlugin = {
  name: 'my-plugin',
  type: 'api',
  async fetch(config: SourceConfig): Promise<Article[]> {
    // Your fetching logic here
    return articles;
  }
};

export default myPlugin;
```

Then register it in `scripts/fetch/index.ts`.

## Production Deployment

The project is designed to run entirely on serverless architecture. You need to configure GitHub Secrets for the automated data pipeline and Cloudflare Pages for website hosting.

### 1. Configure GitHub Secrets

The daily fetching and generating pipeline runs via GitHub Actions at **08:00 UTC** every day. Go to your GitHub repository **Settings > Secrets and variables > Actions** and add the following repository secrets:

#### Required Secrets

- `AI_PROVIDER` — AI provider name (e.g., `openai`, `anthropic`, `google`, `deepseek`)
- `AI_MODEL` — Model identifier (e.g., `gpt-4o`)
- `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` / `GOOGLE_GENERATIVE_AI_API_KEY` / `DEEPSEEK_API_KEY` — API key for your chosen provider

#### Optional Secrets

- `PRODUCTHUNT_CLIENT_ID` / `PRODUCTHUNT_CLIENT_SECRET` / `PRODUCTHUNT_API_TOKEN` — Product Hunt API (falls back to RSS if not configured)
- `WEBHOOK_URL` — Notification webhook endpoint
- `WEBHOOK_TYPE` — One of: `wecom` | `dingtalk` | `feishu` | `slack` | `generic`
- `SITE_URL` — Your deployed website URL (e.g., `https://your-site.com`), used for direct links in webhook notifications

### 2. Cloudflare Pages Setup

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) > Pages
2. Create a project > Connect to your GitHub repo
3. Build settings:
   - **Framework preset**: Astro (or None)
   - **Build command**: `pnpm run build`
   - **Build output directory**: `dist`
4. **Environment Variables (Optional)**: Add `PUBLIC_GA_ID` with your Google Analytics Measurement ID (e.g., `G-XXXXXXXXXX`) to enable traffic tracking.
5. Done! Every time GitHub Actions pushes a new daily report, Cloudflare will automatically trigger a deployment.

## Project Structure

```
ai-news/
├── .github/workflows/daily.yml  # Scheduled pipeline
├── config/
│   └── sources.json             # News source configuration (24 sources)
├── scripts/
│   ├── fetch/
│   │   ├── types.ts             # Core type definitions
│   │   ├── registry.ts          # Plugin registry
│   │   ├── plugins/
│   │   │   ├── rss.ts           # RSS/Atom plugin
│   │   │   ├── api/
│   │   │   │   ├── hackernews.ts
│   │   │   │   └── producthunt.ts
│   │   │   └── crawler/
│   │   │       ├── web-generic.ts
│   │   │       ├── github-trending.ts
│   │   │       └── anthropic.ts
│   │   └── index.ts             # Fetch orchestrator
│   ├── ai/
│   │   ├── provider.ts          # Multi-provider AI adapter
│   │   ├── prompts.ts           # Prompt templates (global token budget)
│   │   └── index.ts
│   ├── generate.ts              # Markdown generator (dedup + FORCE_REGEN)
│   ├── proxy.ts                 # Proxy + auto-retry
│   ├── notify.mjs               # Webhook notifications
│   └── main.ts                  # Entry point
├── src/                         # Astro website
│   ├── content/
│   │   ├── daily/               # Generated daily reports
│   │   └── news/                # Translated individual news details (grouped by date)
│   ├── layouts/
│   │   └── Layout.astro         # Dark/light theme, progress bar, back-to-top
│   └── pages/
│       ├── index.astro          # Home page
│       └── daily/[...slug].astro # Detail page (TOC, prev/next nav)
├── astro.config.mjs
└── package.json
```

## Cost

- **GitHub Actions**: Free tier — 2,000 min/month (daily run uses ~5 min)
- **Cloudflare Pages**: Free tier — 500 builds/month
- **AI API**: Pay-per-use — typically $1-5/month for daily summaries

## License

MIT
