---
title: "We stopped sharing one staging server — here's what we built instead"
originalUrl: "https://dev.to/cristian_iridon_286794874/we-stopped-sharing-one-staging-server-heres-what-we-built-instead-529m"
date: "2026-05-03T22:21:44.192Z"
---

# We stopped sharing one staging server — here's what we built instead
# 我们不再共用同一个测试服务器了——看看我们构建了什么替代方案

Every team I've been on has had the same problem. You have 4 engineers. You have one staging server. Every morning there's a Slack message: "who's on staging right now?" Someone has to wait. Someone always merges before QA finishes. Someone's PR sits in review for 3 days because the environment is occupied.
我待过的每一个团队都遇到过同样的问题。你有 4 名工程师，却只有一个测试（Staging）服务器。每天早上都会有 Slack 消息问：“现在谁在用测试环境？”总有人得排队等待，总有人在 QA 完成测试前就合并了代码，也总有人的 PR 因为环境被占用而搁置了 3 天。

The frontend teams solved this years ago. Vercel gives you a preview URL for every branch automatically. It's genuinely great — if your stack is Next.js. But if you're running Django, Rails, Laravel, FastAPI, Spring Boot, or anything else that needs a real backend process? You're stuck with the shared staging server. Or you spend two weeks wiring up Kubernetes preview environments. We got tired of it and built PreviewDrop.
前端团队多年前就解决了这个问题。Vercel 可以自动为每个分支提供预览 URL。如果你的技术栈是 Next.js，这确实非常棒。但如果你运行的是 Django、Rails、Laravel、FastAPI、Spring Boot 或任何其他需要真实后端进程的服务呢？你就只能困在共用的测试服务器里，或者花两周时间去配置 Kubernetes 预览环境。我们对此感到厌倦，于是构建了 PreviewDrop。

### How it works
### 工作原理

PreviewDrop spins up an isolated Docker environment for every GitHub branch or pull request. Each environment gets its own URL. When the PR closes, the environment is automatically cleaned up. Setup is one command: `npx previewdrop init`. That writes a GitHub Actions workflow file to your repo. After that, every PR gets a preview URL automatically — no manual steps, no shared state, no "who's on staging" Slack messages.
PreviewDrop 会为每个 GitHub 分支或 Pull Request 启动一个隔离的 Docker 环境。每个环境都有自己的 URL。当 PR 关闭时，环境会自动清理。设置只需一条命令：`npx previewdrop init`。这会在你的仓库中写入一个 GitHub Actions 工作流文件。此后，每个 PR 都会自动获得一个预览 URL——无需手动操作，没有共享状态，也不再需要发送“谁在用测试环境”的 Slack 消息。

### What it supports
### 支持范围

If it runs in Docker, PreviewDrop can preview it. That includes: Django (the one Vercel explicitly can't do), Rails, Laravel, FastAPI, Spring Boot, Node/Express, and any custom Dockerfile.
只要能在 Docker 中运行，PreviewDrop 就能预览它。这包括：Django（Vercel 明确无法支持的框架）、Rails、Laravel、FastAPI、Spring Boot、Node/Express 以及任何自定义的 Dockerfile。

### What it costs
### 费用说明

$19/mo flat for the Starter plan — 5 concurrent previews, 3 team members. No per-second billing, no per-seat fees, no surprises at month end. Compare that to Railway's pay-per-second model, which gets unpredictable fast when you're spinning up preview environments 20 times a day.
入门套餐每月固定 19 美元，包含 5 个并发预览和 3 个团队成员名额。没有按秒计费，没有按席位收费，月底也不会有意外账单。相比之下，Railway 的按秒计费模式在每天启动 20 次预览环境时，费用会迅速变得不可控。

### Who it's for
### 适用人群

Three use cases where it genuinely solves a real problem:
以下三种场景能真正解决实际问题：

1. **Agency developers sending clients preview links:** You're building a Django or Rails site for a client. They need to review the new feature. Right now you either keep a staging server running 24/7 (costs money, needs maintenance) or you send a Loom video. With PreviewDrop, you send a URL.
1. **为客户发送预览链接的代理开发人员：** 你正在为客户构建 Django 或 Rails 网站，他们需要审查新功能。目前，你要么让测试服务器 24/7 运行（既花钱又需要维护），要么发送 Loom 视频。使用 PreviewDrop，你只需发送一个 URL。

2. **Small product teams with a QA bottleneck:** One staging environment + multiple engineers = a queue. PreviewDrop gives every PR its own environment. QA can test 5 PRs in parallel.
2. **存在 QA 瓶颈的小型产品团队：** 一个测试环境 + 多名工程师 = 排队。PreviewDrop 为每个 PR 提供独立环境，QA 可以并行测试 5 个 PR。

3. **Teams that evaluated Kubernetes-based solutions and gave up:** Bunnyshell is powerful but the onboarding assumes you have a platform engineer with Kubernetes experience. PreviewDrop is Docker — if you can write a Dockerfile, you're done in under 10 minutes.
3. **评估过 Kubernetes 方案但最终放弃的团队：** Bunnyshell 很强大，但其上手门槛要求你有具备 Kubernetes 经验的平台工程师。PreviewDrop 基于 Docker——只要你会写 Dockerfile，不到 10 分钟就能搞定。

### What we're not
### 我们不是什么

To be clear: PreviewDrop is not production hosting. The environments are ephemeral. If you need Vercel-style CDN and ISR for a Next.js frontend, use Vercel — it's genuinely better for that use case. PreviewDrop is for the backends that Vercel can't run.
明确一点：PreviewDrop 不是生产环境托管。这些环境是临时的。如果你需要 Next.js 前端所需的 Vercel 式 CDN 和 ISR，请使用 Vercel——它在那种场景下确实更好。PreviewDrop 是为 Vercel 无法运行的后端而生的。

### Try it
### 立即尝试

We're in public beta. Free tier available, no credit card required. → [previewdrop.dev](https://previewdrop.dev)
我们目前处于公测阶段。提供免费层级，无需信用卡。→ [previewdrop.dev](https://previewdrop.dev)

The GitHub App install takes about 90 seconds. If you have a Dockerfile, you'll have your first preview URL before your next coffee. Feedback welcome — what's missing? What would make you actually switch?
安装 GitHub App 大约需要 90 秒。如果你已经有 Dockerfile，在喝下一杯咖啡之前，你就能拿到第一个预览 URL。欢迎反馈——我们还缺少什么？什么功能会让你真正决定切换过来？