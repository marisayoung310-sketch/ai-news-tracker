---
title: "Buying a phone number is a distributed transaction"
originalUrl: "https://dev.to/ivanindiv/buying-a-phone-number-is-a-distributed-transaction-2i0h"
date: "2026-08-20T22:03:58.813Z"
---

# Buying a phone number is a distributed transaction
# 购买电话号码是一项分布式事务

The API makes it look trivial. `const number = await carrier.numbers.buy({ phone_number: "+1..." }); await db.insert("rented_numbers", { user_id, e164: number.phone_number }); await stripe.subscriptions.create({ customer, price });` Three lines, one number, done. Ship it.
API 让这一切看起来微不足道。`const number = await carrier.numbers.buy({ phone_number: "+1..." }); await db.insert("rented_numbers", { user_id, e164: number.phone_number }); await stripe.subscriptions.create({ customer, price });` 三行代码，一个号码，搞定。发布上线。

What you actually wrote is a distributed transaction across three systems. They share no transaction log, they have no two-phase commit, and none of them can roll back the others. The carrier will keep charging you for a number your database has never heard of. Stripe will stop charging for a number your database still thinks is paid up. Neither one is going to mention it.
你实际上编写的是跨越三个系统的分布式事务。它们不共享事务日志，没有两阶段提交，且任何一方都无法回滚其他系统。运营商会继续为你数据库中从未记录的号码收费；Stripe 会停止为一个你数据库认为仍处于付费状态的号码收费。而这两者都不会主动提醒你。

I run a virtual phone number product. Below are the failure modes that actually cost us money, roughly in order of how much.
我运营着一款虚拟电话号码产品。以下是实际导致我们损失金钱的故障模式，大致按损失金额排序。

### The orphan taxonomy
### 孤儿数据分类学

Write down the states first, because the interesting ones are the states nobody designs for. Three systems, each holding an opinion about a single number: Your DB, Carrier, Stripe.
首先写下各种状态，因为最值得关注的往往是那些没人设计过的状态。三个系统，每一个都对同一个号码持有自己的“观点”：你的数据库、运营商、Stripe。

| What is actually happening | Your DB | Carrier | Stripe |
| :--- | :--- | :--- | :--- |
| 实际情况 | 你的数据库 | 运营商 | Stripe |
| The happy path. Rare in the tail. | active | owns it | active |
| 正常路径。在长尾场景中很少见。 | active | owns it | active |
| You pay monthly rent on a number nobody can see or use. | no row | owns it | nothing |
| 你在为一个没人能看到或使用的号码支付月租。 | 无记录 | 持有 | 无 |
| You bill a customer for a number you no longer own. | active | released | active |
| 你向客户收取一个你已不再拥有的号码的费用。 | active | 已释放 | active |
| Customer stopped paying. You are still paying the carrier. | pending_cancellation | owns it | canceled |
| 客户停止付费。你仍在向运营商付费。 | 等待取消 | 持有 | 已取消 |
| You provide service for free, indefinitely. | active | owns it | canceled |
| 你无限期地免费提供服务。 | active | 持有 | 已取消 |
| Release failed at teardown. Silent monthly bleed. | cancelled | owns it | canceled |
| 销户时释放失败。每月悄无声息地亏损。 | 已取消 | 持有 | 已取消 |

Every row under the first one is reachable from a plain network timeout at a bad moment. The first orphan class is the worst, because you cannot see it from inside your own product. No row, no user, no support ticket. The number sits in the carrier's inventory producing an invoice line every month until somebody actually reads the invoice. The second class is the one that generates a complaint. The rest leak money in one direction or the other, quietly.
第一行之后的所有情况，都可能因为在糟糕的时机发生一次简单的网络超时而触发。第一类“孤儿”数据是最糟糕的，因为你无法从自己的产品内部发现它。没有数据库记录，没有用户，没有工单。这个号码静静地躺在运营商的库存里，每个月产生一行账单，直到有人真正去核对发票。第二类情况则会引发投诉。其余的情况则在悄无声息地向某一方流失资金。

### Reconcile, don't prevent
### 对账，而非预防

The instinct is to armour the write path. Sagas, compensating transactions, idempotency keys on everything. Use idempotency keys, they cost nothing and they do help. But the gap does not close there, because "carrier says yes, then the process dies before the insert" is always reachable. No ordering removes it. Orderings only change which orphan you end up with. So the real answer is a scheduled reconciler, and how you design that matters more than the write path does.
人的本能是加固写入路径。Sagas、补偿事务、给所有东西加上幂等键。使用幂等键吧，它们成本为零且确实有帮助。但差距并不会因此消除，因为“运营商响应成功，但在插入数据库前进程崩溃”的情况永远可能发生。无论怎么排序都无法消除它，排序只会改变你最终会产生哪种“孤儿”数据。所以真正的答案是定时对账程序，而如何设计对账程序比设计写入路径更重要。

Ours runs daily. Three properties I would keep in any rebuild:
我们的程序每天运行一次。在任何重构中，我都会保留以下三个特性：

1. **Diagnosis is read-only and lives apart from action.** One function reads all three systems and returns a delta. Separate code decides what to do with it. The point is being able to run the diagnosis from a script, against production, on a Sunday, with zero chance of it changing anything.
1. **诊断是只读的，且与执行逻辑分离。** 一个函数读取所有三个系统并返回差异（delta）。由单独的代码决定如何处理这些差异。关键在于能够通过脚本在周日对生产环境运行诊断，且绝对不会改变任何数据。

2. **It acts only when the situation is unambiguous.** DB says `pending_cancellation`, Stripe says `canceled`? A `customer.subscription.deleted` webhook got dropped, the intent is not in question, finalize locally. DB says `cancelled` but the carrier still holds the number? Log an anomaly and let a person look. That case is rare, it means a release call failed, and the obvious automated fix is destructive if the diagnosis was wrong. Anything stranger goes into a `deltas[]` array for admin review instead of into a clever branch nobody will ever read again.
2. **仅在情况明确时采取行动。** 数据库显示 `pending_cancellation`，Stripe 显示 `canceled`？说明 `customer.subscription.deleted` 的 Webhook 丢失了，意图很明确，直接在本地完成销户。数据库显示 `cancelled` 但运营商仍持有号码？记录异常并让人工介入。这种情况很少见，意味着释放调用失败，如果诊断错误，自动修复可能会造成破坏。任何更奇怪的情况都应进入 `deltas[]` 数组供管理员审查，而不是写进一段没人会再看的“聪明”分支代码里。

3. **It searches every provider account you own.** We keep more than one account per carrier. Our first orphan scan walked the primary account only, and orphan inventory sat undiscovered in account two for weeks. If your provider registry can list accounts, iterate the list rather than the default.
3. **搜索你拥有的每一个供应商账户。** 我们每个运营商都有多个账户。我们最初的孤儿扫描只遍历了主账户，导致第二个账户里的孤儿库存几周都没被发现。如果你的供应商注册表可以列出账户，请遍历整个列表，而不是只用默认账户。

Two smaller things that paid for themselves:
两件小事，但非常值得：

* **Give the reconciler a real timeout budget.** Ours makes four passes with per-row calls out to a carrier, Stripe and an app store. On serverless, the default function timeout will cut the run partway through, and the passes at the end are the money backstops. A truncated reconciliation looks exactly like a clean one in your logs.
* **给对账程序充足的超时预算。** 我们的程序会进行四轮遍历，每行数据都要调用运营商、Stripe 和应用商店。在 Serverless 环境下，默认的函数超时会中途截断运行，而最后的几轮遍历往往是挽回损失的关键。在日志中，被截断的对账看起来和完全成功的对账一模一样。

* **Alert on deltas, not on fixes.** Nobody reads "reconciled 3 rows" every morning for a year. What you want is a ping when the reconciler finds something it refused to touch.
* **对差异发出警报，而不是对修复发出警报。** 没人会一年里每天早上都去读“已对账 3 行”的日志。你真正需要的是当对账程序发现它无法处理的情况时，给你发个通知。

### A number is not a number
### 号码并非只是号码

The second category of pain: "phone number" is not a type. It is a family of products with very different behaviour, and the search API flattens them into rows that look interchangeable.
第二类痛苦： “电话号码”不是一种单一类型。它是一系列行为迥异的产品，而搜索 API 将它们扁平化为看起来可以互换的行。

Capability flags describe the number, not your setup. A search result carrying `sms: true` means the number is technically SMS-capable. Whether a message actually lands depends on your account configuration, the messaging profile it sits on, and in some regions on a registration you have not filed. We shipped numbers that could not receive a text, sold as numbers that could. The flag was not wrong. It answered a different question than the one our UI was asking.
能力标志描述的是号码本身，而不是你的配置。搜索结果中带有 `sms: true` 意味着该号码在技术上具备短信功能。但消息能否真正送达，取决于你的账户配置、它所处的短信配置方案，以及在某些地区，还取决于你尚未提交的注册信息。我们曾售出过无法接收短信的号码，却将其作为可以接收短信的号码销售。标志本身没错，它回答的问题与我们 UI 询问的问题不同。

The same product name behaves differently per carrier. Toll-free is the clearest case. Identical label, materially different rules depending on who sold it to you, particularly around permitted use and how it interacts with caller ID verification. If you run more than one carrier, toll-free cannot be a single branch in your code.
同一个产品名称在不同运营商处表现不同。免费电话（Toll-free）是最明显的例子。标签相同，但根据销售方的不同，规则有本质区别，特别是在允许用途以及如何与来电显示验证交互方面。如果你对接了多家运营商，代码中的免费电话逻辑绝不能只写成一个分支。

Listed is not the same as in stock. Our provider lists over a hundred countries. When we enumerated actual purchasable inventory, fewer than half had any. A country picker built from the provider's country list advertises numbers you cannot sell, and every empty result reads to a user as a broken product.
“列出”不等于“有库存”。我们的供应商列出了 100 多个国家。当我们枚举实际可购买的库存时，不到一半的国家有货。如果直接根据供应商的国家列表构建国家选择器，就会展示你根本无法销售的号码，而每一个空结果在用户看来都是产品故障。

Some countries need a regulatory bundle. Proof of address, identity documents, sometimes a local presence, filed with the carrier and reviewed by a human over several days. This is not a deferred edge case, it is a second product surface: document upload, a submission state machine, a review queue, rejection handling. Two notes for my past self: Persist the identifiers a bundle submission hands back before you send anything else, because losing a `requirement_group_id` mid-flight strands a live submission you can neither finish nor cancel.
有些国家需要监管合规包。地址证明、身份证明，有时还需要本地存在证明，提交给运营商并由人工审核数天。这不是一个可以延后的边缘情况，它是产品的第二个维度：文档上传、提交状态机、审核队列、拒绝处理。给过去的自己提两点建议：在发送任何其他内容之前，先持久化保存合规包提交后返回的标识符，因为在传输过程中丢失 `requirement_group_id` 会导致一个无法完成也无法取消的实时提交任务挂起。