---
title: "Spin up ephemeral test inboxes for email integration tests"
originalUrl: "https://dev.to/mqasimca/spin-up-ephemeral-test-inboxes-for-email-integration-tests-3bdg"
date: "2026-07-13T22:23:01.172Z"
---

# Spin up ephemeral test inboxes for email integration tests
# 为电子邮件集成测试创建临时测试收件箱

Most teams test email by not testing it. The send path gets a mock — `expect(transport.send).toHaveBeenCalledWith(...)` — and everyone agrees that's "good enough." The receive path gets skipped entirely, because there's no honest way to assert on a real inbox from a test runner. So the one part of your system that talks to the outside world over an unreliable, asynchronous, third-party channel is the part with the least coverage. That's backwards.

大多数团队测试电子邮件的方式其实就是“不测试”。发送路径通常会被 Mock 掉（例如 `expect(transport.send).toHaveBeenCalledWith(...)`），大家也都觉得这样“足够了”。而接收路径则被完全跳过，因为在测试运行器中，没有可靠的方法来验证真实的收件箱。因此，你系统中唯一通过不可靠、异步的第三方渠道与外部世界通信的部分，反而是覆盖率最低的部分。这显然是本末倒置。

The reason email is hard to test isn't the sending. It's the asserting. You can fire `POST /messages/send` all day, but to prove the message actually left, rendered correctly, and arrived with the body you expected, you need a real mailbox you control — one you can read programmatically and throw away when the run finishes. Shared Gmail test accounts almost get you there, but they bring OAuth on the runner, catch-all races between parallel workers, and a 90-day token that expires the night before a release.

电子邮件难以测试的原因不在于发送，而在于验证。你可以整天发送 `POST /messages/send` 请求，但要证明邮件确实已发出、渲染正确且收到的正文符合预期，你需要一个由你控制的真实邮箱——一个可以以编程方式读取，并在测试结束后销毁的邮箱。共享的 Gmail 测试账号勉强能用，但它们会带来运行器上的 OAuth 授权问题、并行工作流之间的竞争冲突，以及在发布前夜过期的 90 天令牌等麻烦。

This post is about a different fixture: a disposable Agent Account created at the start of a CI run and deleted at the end. You mint a real mailbox per run (or per test), point your application at it, send and receive real mail, assert on the actual message body, and tear the whole thing down. No OAuth. No shared inbox. No leftover state.

本文介绍一种不同的测试装置：一种在 CI 运行开始时创建、结束时删除的一次性“代理账号”（Agent Account）。你为每次运行（或每个测试）创建一个真实的邮箱，将应用程序指向它，发送并接收真实邮件，验证实际的邮件正文，然后销毁整个环境。无需 OAuth，没有共享收件箱，也不会留下任何残留状态。

### What an Agent Account gives you here
### 代理账号能为你带来什么

An Agent Account is just a Nylas grant with a `grant_id`. That's the whole trick, and it's worth saying plainly because it's what makes this pattern cheap: an Agent Account works with every grant-scoped endpoint you already know — Messages, Drafts, Threads, Folders, Attachments, Webhooks. There's nothing new to learn on the data plane. If you've ever called `GET /v3/grants/{grant_id}/messages`, you already know how to read a test inbox.

代理账号本质上就是一个带有 `grant_id` 的 Nylas 授权。这就是全部诀窍，值得明确指出的是，正是这一点使得这种模式成本低廉：代理账号适用于你已经熟悉的每一个基于授权范围的端点——消息、草稿、会话、文件夹、附件、Webhooks。在数据层面没有任何新东西需要学习。如果你曾经调用过 `GET /v3/grants/{grant_id}/messages`，你就已经知道如何读取测试收件箱了。

The difference from a normal grant is provisioning. A regular grant needs a real human to complete an OAuth flow. An Agent Account is created with a single API call — no OAuth screen, no refresh token, no human. It's a mailbox on a domain you control that exists because you asked for it and disappears when you delete it. That property — create on demand, destroy on teardown — is exactly the contract a test fixture wants.

它与普通授权的区别在于配置方式。普通授权需要真人完成 OAuth 流程，而代理账号只需一个 API 调用即可创建——没有 OAuth 屏幕，没有刷新令牌，无需人工干预。它是一个在你控制的域名下的邮箱，因你的需求而存在，并在你删除时消失。这种“按需创建、销毁时清理”的特性，正是测试装置所追求的契约。

Concretely, in a CI run you get:
具体来说，在 CI 运行中，你将获得：

*   A real, addressable mailbox (e.g. `ci-run-8842@agents.yourcompany.com`) that external mail can reach.
    一个真实的、可寻址的邮箱（例如 `ci-run-8842@agents.yourcompany.com`），外部邮件可以触达。
*   The ability to send real outbound mail as that address and assert it left.
    以该地址发送真实外发邮件并验证其已发出的能力。
*   The ability to read real inbound mail that your app-under-test sent, and assert on the actual rendered body — links, tokens, formatting.
    读取被测应用发送的真实入站邮件，并验证实际渲染正文（链接、令牌、格式）的能力。
*   A clean teardown that leaves no shared state for the next run to trip over.
    一个干净的销毁过程，不会为下一次运行留下任何可能导致冲突的共享状态。

This is distinct from the per-tenant Agent Account you'd run in production, and distinct from the signup/OTP-capture pattern. Here the mailbox is ephemeral test infrastructure — it lives and dies inside one CI job.

这与你在生产环境中运行的租户代理账号不同，也与注册/验证码捕获模式不同。在这里，邮箱是临时的测试基础设施——它在单个 CI 任务中创建并消亡。

### Why this beats the usual workarounds
### 为什么这种方法优于常见的替代方案

A few of the common alternatives, and where they hurt:
以下是一些常见的替代方案及其弊端：

*   **Mock the transport:** Fast, but proves nothing about whether mail actually sends or what it contains. Your template can render `{{user.name}}` literally and the mock stays green.
    **Mock 传输层：** 速度快，但无法证明邮件是否真的发送或包含什么内容。你的模板可能把 `{{user.name}}` 原样渲染出来，但 Mock 测试依然显示通过。
*   **One shared Gmail/Outlook test account:** Real mail, but every parallel CI worker reads the same inbox. You end up filtering by subject and praying two runs don't collide. Plus OAuth on the runner and a token that expires.
    **共享 Gmail/Outlook 测试账号：** 确实是真实邮件，但所有并行的 CI 工作流都会读取同一个收件箱。你最终不得不通过主题进行过滤，并祈祷两次运行不会发生冲突。此外，还需要在运行器上处理 OAuth 和过期的令牌。
*   **A catch-all on a wildcard domain:** Better — but it's a shared inbox with one retention window, and you're matching addresses by convention rather than provisioning real, isolated grants.
    **通配符域名的 Catch-all：** 更好一些——但它仍然是一个共享收件箱，且只有一个保留窗口。你是通过约定来匹配地址，而不是配置真实的、隔离的授权。

The Agent Account version gives each run its own grant. Isolation is structural, not a filter you remember to apply. And because the inbox is the same `grant_id`-scoped API as the rest of Nylas, the read side of your test uses the exact endpoints your production code uses.

代理账号版本为每次运行提供独立的授权。这种隔离是结构性的，而不是靠你记忆去应用的过滤器。而且，由于收件箱使用的是与 Nylas 其他部分相同的 `grant_id` 作用域 API，你的测试读取端使用的正是生产代码所使用的端点。

### Before you begin
### 开始之前

You need three things:
你需要准备三样东西：

1.  **A Nylas API key** for the application you're testing against. Use a non-production application if you can — these accounts will send and receive real mail.
    **一个 Nylas API 密钥**，用于你正在测试的应用程序。如果可以，请使用非生产环境的应用——因为这些账号会发送和接收真实邮件。
2.  **A registered domain.** A custom domain works, or a Nylas `*.nylas.email` trial subdomain for prototyping. New domains warm over roughly four weeks, so don't register one the morning of a release and expect clean deliverability.
    **一个已注册的域名。** 自定义域名可以，或者使用 Nylas 的 `*.nylas.email` 测试子域名进行原型设计。新域名通常需要大约四周的预热期，所以不要在发布当天才注册并指望它有良好的送达率。
3.  **The Nylas CLI** installed and authenticated (`nylas init`), if you want the terminal commands. I work on the CLI, so the `nylas ...` commands below are the exact ones I reach for; everything also has a plain curl equivalent so your CI script can stay dependency-light.
    **安装并认证过的 Nylas CLI** (`nylas init`)，如果你想使用终端命令的话。我负责 CLI 的开发，所以下面提到的 `nylas ...` 命令是我最常用的；所有命令也都有对应的 `curl` 等价形式，这样你的 CI 脚本可以保持轻量化，无需过多依赖。

A note on quotas before you scale this out: free-plan Agent Accounts are capped at 200 messages per account per day, with 3 GB of storage per org and a 30-day inbox retention window. A large test matrix that provisions one account per test can bump into the per-org storage and the account ceiling fast. Provision per run rather than per test unless you have a reason not to, and always tear down.

在扩展使用规模前，请注意配额：免费版代理账号每天限制 200 封邮件，每个组织有 3GB 存储空间，收件箱保留期为 30 天。如果测试矩阵很大，为每个测试配置一个账号，很快就会触及组织存储上限和账号数量上限。除非有特殊理由，否则建议按“运行”而非按“测试”进行配置，并务必在结束后销毁。

### Provision the inbox at the start of the run
### 在运行开始时配置收件箱

This is the setup half of your fixture. Create a uniquely-named Agent Account so parallel runs never collide. A timestamp or the CI run ID makes a good suffix.
这是你测试装置的设置部分。创建一个命名唯一的代理账号，以确保并行运行不会冲突。时间戳或 CI 运行 ID 是很好的后缀。

With the CLI:
使用 CLI：

```bash
nylas agent account create ci-run-8842@agents.yourcompany.com --json
```

The `--json` flag matters in CI: it prints the grant as machine-readable JSON so you can pull the `id` out with `jq` instead of scraping a table. You can also pass `--name` to set a display name and `--app-password` if a test needs IMAP/SMTP access, but for most integration tests you want neither.
`--json` 标志在 CI 中很重要：它以机器可读的 JSON 格式输出授权信息，这样你可以用 `jq` 提取 `id`，而无需解析表格。你也可以传入 `--name` 来设置显示名称，如果测试需要 IMAP/SMTP 访问，还可以传入 `--app-password`，但大多数集成测试并不需要这些。

The equivalent API call is `POST /v3/connect/custom` with `"provider": "nylas"`. No refresh token — just the email address on your registered domain:
等价的 API 调用是 `POST /v3/connect/custom`，并设置 `"provider": "nylas"`。无需刷新令牌——只需提供你注册域名下的电子邮件地址：

```bash
curl --request POST \
  --url "https://api.us.nylas.com/v3/connect/custom" \
  --header "Authorization: Bearer <NYLAS_API_KEY>" \
  --header "Content-Type: application/json" \
  --data '{
    "provider": "nylas",
    "settings": {
      "email": "ci-run-8842@agents.yourcompany.com"
    }
  }'
```

The response carries `data.id` — that's the `grant_id` you'll use for every read and send below. Export it for the rest of the job:
响应中包含 `data.id`——这就是你在后续所有读取和发送操作中要用到的 `grant_id`。将其导出供后续任务使用：

```bash
export AGENT_GRANT_ID=$...
```