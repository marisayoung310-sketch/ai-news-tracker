---
title: "An independent verifier audited my compliance API's hash chain byte-by-byte — in public, same day, both sides shipped fixes"
originalUrl: "https://dev.to/trustboost/an-independent-verifier-audited-my-compliance-apis-hash-chain-byte-by-byte-in-public-same-day-k12"
date: "2026-07-01T22:53:18.527Z"
---

# An independent verifier audited my compliance API's hash chain byte-by-byte — in public, same day, both sides shipped fixes

**独立验证者逐字节审计了我的合规 API 哈希链——全程公开，当天双方均完成修复**

I'm a solo developer in Bogotá, Colombia. This week something happened on a GitHub issue that I think is worth documenting, because it shows what "trustless verification" actually looks like in practice — not the whitepaper version, the real one with bugs found and fixed in public.

我是一名居住在哥伦比亚波哥大的独立开发者。本周在 GitHub 的一个 Issue 中发生的事情我认为值得记录，因为它展示了“去信任验证”（trustless verification）在实践中究竟是什么样子——不是白皮书里的理论版本，而是那种在公开场合发现并修复 Bug 的真实版本。

The setup: I build VeraData — a LATAM compliance data API for autonomous agents. Sanctions screening (OFAC + UN + EU + UK, 59,000+ entries), KYB against official registries (RUES Colombia, CNPJ Brazil, RFC Mexico), central bank rates. Everything pay-per-call via x402: an agent hits the endpoint, gets a 402, signs a USDC micropayment on Base or Solana, gets the data. No API key, no account. Every screening response includes an AAT block — a SHA-256 hash chain (query_hash → event_hash → chain_hash) designed as EU AI Act Art.12 audit evidence. I opened an issue on x402-foundation/x402 positioning it as a compliance use case. What happened next was better than a listing.

项目背景：我开发了 VeraData，这是一个为自主智能体（autonomous agents）提供的拉美合规数据 API。它涵盖制裁筛查（OFAC、联合国、欧盟、英国，共 59,000 多条记录）、针对官方注册机构（哥伦比亚 RUES、巴西 CNPJ、墨西哥 RFC）的 KYB 验证以及央行汇率。所有服务均通过 x402 实现按次付费：智能体访问端点，收到 402 状态码，在 Base 或 Solana 上签署 USDC 微支付，随后获取数据。无需 API 密钥，无需账户。每条筛查响应都包含一个 AAT 区块——这是一个 SHA-256 哈希链（查询哈希 → 事件哈希 → 链哈希），旨在作为欧盟《人工智能法案》第 12 条的审计证据。我在 x402-foundation/x402 上提交了一个 Issue，将其定位为合规用例。接下来发生的事情比单纯的列表展示更有意义。

The audit: An independent verifier (babyblueviper1, who builds the ERC-8299/WYRIWE reference implementation) didn't just read my docs. They ran a live call against /sanctions, took the AAT block apart, and recomputed every hash independently. What they found, in public: A silent ambiguity in my spec. My recomputation instructions said SHA256(query_hash + "|" + ...) — but didn't state that hash values carry their own sha256: prefix as input to the next hash. They tried the bare hex first, got a mismatch, and only matched with the prefix. Any third recomputer would have silently failed the same way. It's now documented as a load-bearing detail in a public conformance fixture.

审计过程：一位独立验证者（babyblueviper1，ERC-8299/WYRIWE 参考实现的构建者）不仅阅读了我的文档，还对 /sanctions 端点进行了实时调用，拆解了 AAT 区块，并独立重新计算了每一个哈希值。他们在公开场合发现：我的规范中存在一个隐晦的歧义。我的重算说明写的是 SHA256(query_hash + "|" + ...)，但没有说明哈希值在作为下一个哈希的输入时，是否携带自身的 `sha256:` 前缀。他们最初尝试使用纯十六进制，结果不匹配，只有加上前缀后才匹配成功。任何第三方重算者都会以同样的方式静默失败。现在，这已被记录为公共一致性测试中的一个关键细节。

The honest gap: `chain_stored: true` proves the entry exists in my database — it does not prove when it was written. That's exactly the question an auditor asks first: "could this record have been generated after the fact?" A hash chain regenerates wholesale by whoever holds the data. The fix (independent signatures + Bitcoin OTS temporal anchoring) is real but not built yet — so we named it publicly instead of papering over it. A missing `matches: []` field: On CLEAN results I omitted the matches array. Their deterministic check flagged it: "checked and found nothing" is structurally different from "field not populated". Fixed same day, commit linked in the thread.

诚实的差距：`chain_stored: true` 证明了条目存在于我的数据库中，但它不能证明它是何时写入的。这正是审计员首先会问的问题：“这条记录是否是事后生成的？”哈希链可以由持有数据的人全盘重新生成。修复方案（独立签名 + 比特币 OTS 时间锚定）虽然可行但尚未构建——所以我们公开指出了这一点，而不是掩盖它。关于缺失的 `matches: []` 字段：在结果为“清洁”（CLEAN）时，我省略了 matches 数组。他们的确定性检查指出了这一点：“检查后未发现”与“字段未填充”在结构上是不同的。当天修复，提交记录已链接在讨论串中。

What I found on my side, because the audit forced honesty: My marketing said sanctions screening covered SARLAFT (Colombia), CNBV (Mexico), COAF (Brazil) regional lists. When the live call returned `lists_checked: ["OFAC_SDN", "UN_CONSOLIDATED"]`, I had to face it: those regional lists are not publicly downloadable — they're restricted to regulated financial entities. My copy overstated what was running. So I said so, in the thread, before they found it. Then I replaced the phantom lists with real ones: EU Consolidated (29,759 entries) and UK HM Treasury (9,605 entries), seeded and live the same day. The stack is now honest: OFAC + UN + EU + UK.

我方发现的问题（审计迫使我保持诚实）：我的营销文案称制裁筛查涵盖了 SARLAFT（哥伦比亚）、CNBV（墨西哥）、COAF（巴西）等区域列表。当实时调用返回 `lists_checked: ["OFAC_SDN", "UN_CONSOLIDATED"]` 时，我不得不面对现实：这些区域列表并非公开可下载，仅限于受监管的金融机构使用。我的文案夸大了实际运行的内容。因此，在他们发现之前，我就在讨论串中承认了这一点。随后，我用真实的列表替换了虚构的列表：欧盟综合列表（29,759 条记录）和英国财政部列表（9,605 条记录），并在当天完成部署上线。现在的技术栈是诚实的：OFAC + 联合国 + 欧盟 + 英国。

The result: Two real /review calls against my live paid endpoint, two published `decision_ref` proofs: `verdict: approve`, `confidence: 0.95`, `decision_ref: sha256:3eeb2c6c6e0f5c90c8c9823e593791cfb56a2774611a1bca9c3a5eda1ced39b6`, `source_class: agent_reported`. `sanctions_screening` is now a first-class `artifact_type` in their ERC-8299 implementation — shipped because this exchange motivated it. My fixture is a test case in their conformance repo. Anyone can run `python3 check_chain.py` and verify the whole chain from declared inputs, zero dependencies. Their framing of the bar, which I'll steal forever: "Not that nothing was wrong, but that everything wrong got found, said out loud, and fixed in public, same day, by both sides."

结果：针对我的实时付费端点进行了两次真实的 /review 调用，发布了两个 `decision_ref` 证明：`verdict: approve`，`confidence: 0.95`，`decision_ref: sha256:3eeb2c6c6e0f5c90c8c9823e593791cfb56a2774611a1bca9c3a5eda1ced39b6`，`source_class: agent_reported`。`sanctions_screening` 现在已成为他们 ERC-8299 实现中的一等 `artifact_type`——这是因为这次交流促成了它的实现。我的测试用例现在是他们一致性仓库中的一部分。任何人都可以运行 `python3 check_chain.py`，仅凭声明的输入即可验证整个链条，无需任何依赖。他们对标准的定义，我将永远引用：“重要的不是没有问题，而是所有问题都被发现、被公开讨论，并在当天由双方共同修复。”

Why this matters beyond my API: The x402 ecosystem is at ~$1.1M volume / 3.7M transactions per month. The winning categories are machine-readable data and gateways. But there's a trust problem: how does an agent know a compliance verdict wasn't fabricated? "Trust me" doesn't survive a skeptical auditor. The answer that's emerging: recomputable evidence + independent attestation. Your endpoint produces a deterministic chain. An independent party signs over it. A third party who trusts neither of you can verify both. That's what we closed the loop on this week — as far as I know, the first documented instance for a compliance API on x402.

为什么这不仅仅对我的 API 重要：x402 生态系统的月交易额约为 110 万美元，月交易量为 370 万笔。胜出的类别是机器可读数据和网关。但存在一个信任问题：智能体如何知道合规结论不是伪造的？“相信我”在怀疑论的审计员面前站不住脚。目前出现的答案是：可重算证据 + 独立证明。你的端点生成一个确定性的链条，独立方对其进行签名，不信任你们双方的第三方可以验证两者。这就是我们本周完成的闭环——据我所知，这是 x402 上合规 API 的首个记录在案的实例。

Try it: Agents can screen an entity right now, free (5 trial calls/day per endpoint):
`curl -X POST https://api.veradata.dev/sanctions/quick \ -H "Content-Type: application/json" \ -H "X-TRIAL: true" \ -d '{"name": "ACME Corp", "country": "CO", "type": "company"}'`
Or install the skill in Claude Code / Codex / Cursor: `npx skills add teodorofodocrispin-cmyk/veradata-skills --skill veradata-latam-compliance`
Full thread with all the hashes, fixes, and proofs: [x402-foundation/x402#2749](https://github.com/x402-foundation/x402/issues/2749)

尝试一下：智能体现在就可以免费筛查实体（每个端点每天 5 次试用调用）：
`curl -X POST https://api.veradata.dev/sanctions/quick \ -H "Content-Type: application/json" \ -H "X-TRIAL: true" \ -d '{"name": "ACME Corp", "country": "CO", "type": "company"}'`
或者在 Claude Code / Codex / Cursor 中安装该技能：`npx skills add teodorofodocrispin-cmyk/veradata-skills --skill veradata-latam-compliance`
包含所有哈希、修复和证明的完整讨论串：[x402-foundation/x402#2749](https://github.com/x402-foundation/x402/issues/2749)