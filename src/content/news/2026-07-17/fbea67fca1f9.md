---
title: "WhatsApp Automation for Small Businesses in 2026: AI Replies, Lead Capture & Tiered Commissions"
originalUrl: "https://dev.to/hayrullahkar/whatsapp-automation-for-small-businesses-in-2026-ai-replies-lead-capture-tiered-commissions-4b89"
date: "2026-07-16T22:33:29.443Z"
---

# WhatsApp Automation for Small Businesses in 2026: AI Replies, Lead Capture & Tiered Commissions
# 2026 年小型企业 WhatsApp 自动化：AI 回复、潜在客户获取与分级佣金

Your customers would rather message you on WhatsApp than fill in a contact form. That's fine at ten conversations a day. At a hundred, messages get missed, nobody knows which rep is on which deal, and at month-end somebody rebuilds the commission sheet by hand and gets it wrong. The usual answer is a $49–$499/month WhatsApp SaaS platform, priced per seat, with your customer data living in someone else's database. This post is the other answer: the same workflow on Google Sheets + Apps Script — and the one piece I see teams get wrong every single time, with the code to fix it.
比起填写联系表单，你的客户更愿意在 WhatsApp 上给你发消息。每天十次对话时这没问题，但当达到一百次时，消息就会被遗漏，没人知道哪个销售代表负责哪笔交易，月底时还得有人手动重构佣金表，而且还容易出错。通常的解决方案是每月 49 到 499 美元的 WhatsApp SaaS 平台，按席位收费，且你的客户数据存储在别人的数据库中。本文提供另一种方案：基于 Google Sheets + Apps Script 实现相同的工作流，并针对我发现团队总是出错的一个环节，提供修复代码。

Where DIY WhatsApp automation actually breaks
It isn't the messaging. Wiring a WhatsApp webhook into a sheet is a couple of hours of work, and I've written that build up separately — the webhook, the AI reply, and the lock that stops two reps chasing the same lead are all in Build a WhatsApp Sales Inbox in Google Sheets. I won't repeat it here. The part that breaks is the commission math. Someone writes `=IF(revenue>10000, revenue*0.08, revenue*0.05)` into a column, and three things kill it:
DIY WhatsApp 自动化真正容易出问题的地方
不在于消息传递。将 WhatsApp Webhook 连接到表格只需几个小时的工作，我已经单独写过构建指南——Webhook、AI 回复以及防止两名销售代表同时跟进同一潜在客户的锁定机制，都在《在 Google Sheets 中构建 WhatsApp 销售收件箱》一文中。这里不再赘述。真正容易出错的是佣金计算。有人在列中写入 `=IF(revenue>10000, revenue*0.08, revenue*0.05)`，但以下三点会导致它失效：

1. A single sale spans two tiers — the formula charges the whole amount at one rate.
2. The tiers change in July, and now every historical row recalculates at the new rate.
3. A customer refunds in August on a sale from June, and nobody can unwind it without breaking the audit trail.
So that's what this post builds: a tiered commission engine that survives rule changes and refunds.
1. 单笔销售跨越了两个层级——公式会按单一费率计算全部金额。
2. 7 月份层级发生变化，导致所有历史行都按新费率重新计算。
3. 客户在 8 月份对 6 月份的销售进行了退款，没人能在不破坏审计追踪的情况下撤销它。
因此，本文要构建的就是：一个能够应对规则变更和退款的分级佣金引擎。

### 1. Put the tiers in a table, never in a formula
This is the whole trick. Make a Commission Rules tab, one row per rule:
### 1. 将层级放入表格，永远不要写在公式里
这是整个技巧的核心。创建一个“佣金规则”标签页，每条规则占一行：

| rule_id | rep_id | effective_from | effective_to | tier_1_cap | tier_1_pct | tier_2_cap | tier_2_pct | tier_3_pct |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| R1 | ALL | 2026-01-01 | | 10000 | 0.05 | 50000 | 0.08 | 0.10 |
| R2 | rep_ayse | 2026-06-01 | | 10000 | 0.06 | 50000 | 0.09 | 0.12 |

`rep_id` is either a specific rep or ALL (the house default). Percentages are decimals — 0.05 is 5%. When the plan changes, you close the old rule with an `effective_to` date and add a new row. History keeps calculating at the rate that was live on the day of the sale.
`rep_id` 可以是特定的销售代表，也可以是 ALL（默认规则）。百分比以小数表示——0.05 即 5%。当计划变更时，通过 `effective_to` 日期关闭旧规则并添加新行。历史数据将始终按销售当日生效的费率进行计算。

```javascript
function findRule(rules, repId, saleDate) {
  const d = new Date(saleDate);
  const matches = rules.filter(r => (r.rep_id === repId || r.rep_id === 'ALL') && d >= new Date(r.effective_from) && (!r.effective_to || d <= new Date(r.effective_to)) );
  // A rule written for this rep always beats the "ALL" fallback.
  matches.sort((a, b) => (a.rep_id === 'ALL' ? 1 : 0) - (b.rep_id === 'ALL' ? 0 : 1));
  return matches[0] || null;
}
```

### 2. Split one sale across tiers
Here's the bug in every hand-written commission column. A rep has booked $45,000 this quarter and closes another $10,000. Tier 2 ends at $50,000. So $5,000 of that sale earns 8% and $5,000 earns 10% — not $10,000 at one rate.
### 2. 将单笔销售拆分到不同层级
这是每个手动编写的佣金列中都会出现的错误。一名销售代表本季度已完成 45,000 美元业绩，又成交了 10,000 美元。第 2 层级在 50,000 美元处截止。因此，这笔销售中 5,000 美元应按 8% 计算，另外 5,000 美元按 10% 计算——而不是 10,000 美元按单一费率计算。

```javascript
// Commission for ONE sale, given how much the rep already booked this period.
function commissionForSale(bookedBefore, amount, rule) {
  const bands = [
    { upTo: Number(rule.tier_1_cap), pct: Number(rule.tier_1_pct) },
    { upTo: Number(rule.tier_2_cap), pct: Number(rule.tier_2_pct) },
    { upTo: Infinity, pct: Number(rule.tier_3_pct) },
  ];
  let from = bookedBefore, left = amount, commission = 0;
  for (const band of bands) {
    if (left <= 0) break;
    const room = Math.max(band.upTo - from, 0);
    const take = Math.min(left, room);
    commission += take * band.pct;
    from += take;
    left -= take;
  }
  return commission;
}
```

With the R1 rule above: `commissionForSale(45000, 10000, R1)` returns 900 — $5,000 at 8% plus $5,000 at 10%. The naive formula returns either $800 or $1,000, and your rep notices.
使用上述 R1 规则：`commissionForSale(45000, 10000, R1)` 返回 900——即 5,000 美元按 8% 计算加上 5,000 美元按 10% 计算。而简单的公式要么返回 800 美元，要么返回 1,000 美元，你的销售代表一定会发现其中的差异。

### 3. Handle refunds without breaking the audit trail
Never edit or delete the original row. A refund is its own row with a negative amount and a `reverses_transaction_id` pointing back at the sale. Then the engine reverses exactly the commission that sale earned — not a recalculated guess.
### 3. 处理退款而不破坏审计追踪
永远不要编辑或删除原始行。退款应作为单独的一行，金额为负数，并包含一个指向原始销售的 `reverses_transaction_id`。这样引擎就能精确撤销该笔销售所赚取的佣金，而不是重新计算一个估算值。

```javascript
function runCommissions(transactions, rules) {
  const sorted = transactions.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  const booked = {}; // rep_id -> revenue booked so far
  const earned = {}; // transaction_id -> commission it earned
  const out = [];
  sorted.forEach(t => {
    if (t.reverses_transaction_id) { // refund row
      const original = earned[t.reverses_transaction_id] || 0;
      booked[t.rep_id] = (booked[t.rep_id] || 0) + Number(t.amount); // negative
      out.push({ id: t.transaction_id, rep: t.rep_id, commission: -original });
      return;
    }
    const rule = findRule(rules, t.rep_id, t.date);
    if (!rule) { out.push({ id: t.transaction_id, rep: t.rep_id, commission: 0, note: 'no rule' }); return; }
    const before = booked[t.rep_id] || 0;
    const c = commissionForSale(before, Number(t.amount), rule);
    booked[t.rep_id] = before + Number(t.amount);
    earned[t.transaction_id] = c;
    out.push({ id: t.transaction_id, rep: t.rep_id, commission: c });
  });
  return out;
}
```

Because it walks transactions in date order and keeps a running total per rep, the tier boundaries land where they actually landed in real life. I unit-tested this before shipping it — the cases that matter are a sale spanning all three tiers, a rule that isn't effective yet falling back to ALL, and a refund netting to exactly zero.
因为它按日期顺序遍历交易并为每位销售代表保留累计总额，所以层级边界能够准确落在实际发生的位置。我在发布前进行了单元测试——关键测试用例包括：一笔销售跨越所有三个层级、规则尚未生效时回退到 ALL 规则，以及退款后净额正好为零的情况。

### What the rest of the stack costs
At small-business volume, the running cost is LLM tokens plus Meta's conversation fees — roughly $0.005–$0.08 per conversation depending on category and country, which for most SMBs lands near $50/month all-in. Compare that to $49–$499/month per platform, plus per-seat fees. The bigger difference isn't the invoice, though: the sheet is yours, and so is the commission logic. WhatsApp's often-quoted ~98% open rate is a vendor benchmark rather than a controlled study — but you don't need the exact number to know the channel outperforms email for a reply-now conversation.
### 其余技术栈的成本
对于小型企业规模，运行成本是 LLM Token 费用加上 Meta 的对话费用——根据类别和国家/地区，每场对话大约在 0.005 到 0.08 美元之间，对于大多数中小企业来说，总成本每月约为 50 美元。相比之下，每个平台每月需要 49 到 499 美元，外加席位费。不过，更大的区别不在于账单：表格是你自己的，佣金逻辑也是你自己的。WhatsApp 常被引用的约 98% 的打开率更多是供应商的基准测试而非受控研究——但你不需要确切的数字也能知道，在需要即时回复的对话中，该渠道的表现远超电子邮件。

### Pitfalls
Don't hard-code tiers in formulas. Rules go in the rules table.
### 陷阱
不要在公式中硬编码层级。规则应放在规则表中。