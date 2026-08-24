---
title: "We shipped an MCP server for WhatsApp link generation — no API key required"
originalUrl: "https://dev.to/inside_dc_pulse/we-shipped-an-mcp-server-for-whatsapp-link-generation-no-api-key-required-g8a"
date: "2026-08-11T22:23:12.922Z"
---

# We shipped an MCP server for WhatsApp link generation — no API key required
# 我们发布了一个用于生成 WhatsApp 链接的 MCP 服务器 —— 无需 API 密钥

We shipped an MCP server for WhatsApp link generation — no API key required. If you've ever needed an AI agent to validate a WhatsApp number, build a wa.me link, or generate a QR code on the fly, you've probably hand-rolled it: scrape a regex off Stack Overflow, write your own phone-format validator, maybe hit some undocumented endpoint. We got tired of watching that happen and shipped a small, open MCP server that does it directly.

我们发布了一个用于生成 WhatsApp 链接的 MCP 服务器，且无需 API 密钥。如果你曾需要 AI 智能体来验证 WhatsApp 号码、构建 wa.me 链接或即时生成二维码，你可能都是自己动手实现的：从 Stack Overflow 上复制正则表达式、编写自己的电话格式验证器，或者调用某些未公开的接口。我们厌倦了这种重复劳动，因此发布了一个小巧、开放的 MCP 服务器，可以直接完成这些任务。

### What it is
### 它是什么

WhatsUsernames.link 已经运行了一个免费的公共 REST API，用于验证 WhatsApp 用户名/电话号码并生成 wa.me 链接及二维码。我们刚刚通过模型上下文协议（Model Context Protocol, MCP）公开了相同的逻辑，因此 Claude 以及任何其他 MCP 客户端都可以将其作为原生工具调用，而无需你再编写 fetch 包装器。

Endpoint: https://whatsusernames.link/api/mcp
No API key. No account. No signup form. Same open, IP-rate-limited model as the REST API (60 req/min for JSON tools, 20 req/min for QR generation, sliding window via Upstash Redis).

接口地址：https://whatsusernames.link/api/mcp
无需 API 密钥，无需账户，无需注册。采用与 REST API 相同的开放式 IP 限流模式（JSON 工具每分钟 60 次请求，二维码生成每分钟 20 次请求，通过 Upstash Redis 实现滑动窗口限流）。

### The five tools
### 五大工具

| Tool | What it does |
| :--- | :--- |
| `validate_username` | Checks WhatsApp username (@username) format |
| `validate_phone` | Checks phone number format (8–15 digits, international) |
| `username_link` | Builds a wa.me link (+ short link) from a username, optional prefilled text |
| `phone_link` | Builds a wa.me link from a phone number, optional prefilled text |
| `qr_code` | Renders a QR code (PNG or SVG) for a wa.me link, custom size/colors |

| 工具名称 | 功能描述 |
| :--- | :--- |
| `validate_username` | 检查 WhatsApp 用户名 (@username) 格式 |
| `validate_phone` | 检查电话号码格式（8-15 位数字，国际格式） |
| `username_link` | 根据用户名构建 wa.me 链接（含短链接），可选预填文本 |
| `phone_link` | 根据电话号码构建 wa.me 链接，可选预填文本 |
| `qr_code` | 为 wa.me 链接渲染二维码（PNG 或 SVG），支持自定义尺寸/颜色 |

Every tool wraps the exact same services/ and validate-* functions the REST API uses — there's no separate business logic to drift out of sync. If the REST endpoint says a number is valid, the MCP tool agrees, because it's the same code path.

每个工具都封装了与 REST API 使用的完全相同的服务和 `validate-*` 函数——不存在会导致不同步的独立业务逻辑。如果 REST 接口认为号码有效，MCP 工具也会得出相同结论，因为它们走的是同一套代码路径。

### Connect it
### 如何连接

Drop this into your MCP client config:
将以下内容放入你的 MCP 客户端配置中：

```json
{
  "mcpServers": {
    "whatsusernames": {
      "url": "https://whatsusernames.link/api/mcp"
    }
  }
}
```

That's it. No stdio process to spawn, no local install — it's a stateless Streamable HTTP transport running on Vercel, same domain as the site.

就是这样。无需启动 stdio 进程，无需本地安装——它是一个运行在 Vercel 上的无状态可流式传输 HTTP 服务，与网站使用同一域名。

### Why build this
### 为什么要构建它

Two reasons. Practical: every agent that needs to hand a user a "message me on WhatsApp" link ends up reimplementing username/phone validation and QR generation, badly, from scratch. That's a solved problem now — call the tool instead. Strategic: we think a lot of AI-agent traffic is going to route through MCP servers the same way search traffic routes through APIs today. Being an early, documented, zero-friction MCP endpoint in the WhatsApp-tooling space is a cheap way to be the thing an agent reaches for, rather than something it reinvents.

有两个原因。实用层面：每个需要向用户提供“在 WhatsApp 上联系我”链接的智能体，最终都不得不从零开始重新实现用户名/电话验证和二维码生成功能，且往往做得不够好。现在这个问题已经解决了——直接调用工具即可。战略层面：我们认为未来大量的 AI 智能体流量将通过 MCP 服务器进行路由，就像今天的搜索流量通过 API 路由一样。作为 WhatsApp 工具领域中早期、文档齐全且零摩擦的 MCP 接口，这是一种低成本的方式，让智能体优先选择调用我们的服务，而不是重新造轮子。

### What's not in v0
### v0 版本未包含的内容

Deliberately scoped down: No API keys, accounts, or paid tiers — same open rate-limited model as REST. No stdio/local package distribution — remote HTTP only, for now. No business-tier tools (bsuid parsing, webhook normalization) — those are more niche and will only get built if there's real demand for the current five.

刻意精简了范围：没有 API 密钥、账户或付费层级——采用与 REST 相同的开放限流模式。没有 stdio/本地包分发——目前仅支持远程 HTTP。没有商业级工具（如 bsuid 解析、webhook 规范化）——这些属于更细分的领域，只有在当前五个工具出现实际需求时才会考虑开发。

If you build something with it — or find an edge case it doesn't handle — we'd like to hear about it. WhatsUsernames.link is a free tool for validating WhatsApp usernames/numbers and generating wa.me links and QR codes. REST API and MCP server are both public and free to use.

如果你用它构建了什么，或者发现了它无法处理的边缘情况，欢迎告诉我们。WhatsUsernames.link 是一个用于验证 WhatsApp 用户名/号码并生成 wa.me 链接和二维码的免费工具。REST API 和 MCP 服务器均公开且免费使用。