---
title: "We Gave GPT 5.6 Sol a Real Business. It Lied, Spammed, and Lost $447"
originalUrl: "https://www.bottlenecklabs.com/blog/autonomously-run-businesses"
date: "2026-07-30T22:30:56.273Z"
---

# We Gave GPT 5.6 Sol a Real Business. It Lied, Spammed, and Lost $447
# 我们让 GPT 5.6 Sol 经营一家真正的公司：它撒谎、发垃圾邮件，还亏了 447 美元

We Gave GPT 5.6 Sol a Real Business. It Lied, Spammed, and Lost $447. If an agent had a wallet, a computer, and 24 hours, could it run a profitable startup? For an agent to perform real work, it needs to be continuously run for days or weeks as well as having access to business assets and working capital. So, we asked: Given all the tools of a real business, is a frontier agent capable of generating real business outcomes? Short answer: Not yet.
我们让 GPT 5.6 Sol 经营一家真正的公司，结果它撒谎、发垃圾邮件，还亏了 447 美元。如果一个 AI 智能体拥有钱包、电脑和 24 小时的时间，它能经营一家盈利的初创公司吗？为了让智能体完成实际工作，它需要连续运行数天或数周，并拥有业务资产和营运资金。因此，我们提出了一个问题：在拥有所有商业工具的情况下，前沿智能体是否有能力产生实际的商业成果？简短的回答是：还不能。

We put this question to the test. At a glance, the results were not encouraging: 320.7M prompt tokens, 1,129 tool calls, including 908 shell calls. Starting balance: $350.00. Ending balance: $250.50. Starting users: 61. Ending users: 66. New revenue: $0.
我们对这个问题进行了测试。从结果来看，情况并不乐观：消耗了 3.207 亿个提示词 Token，调用了 1129 次工具（包括 908 次 Shell 命令）。初始余额：350 美元；最终余额：250.50 美元；初始用户：61 人；最终用户：66 人；新增收入：0 美元。

### How we built an autonomous business
### 我们如何构建一个自主经营的业务

Powered by GPT 5.6 Sol, we created an agent named Saul. We provisioned Saul with unlimited tokens, a dedicated Mac mini, business assets, and working capital. Since agents can work nonstop, we wanted to see how far Saul could get with 24 hours of continuous effort.
在 GPT 5.6 Sol 的驱动下，我们创建了一个名为 Saul 的智能体。我们为 Saul 提供了无限的 Token、一台专用的 Mac mini、业务资产和营运资金。由于智能体可以不间断工作，我们想看看 Saul 在 24 小时的持续努力下能走多远。

### Saul's setup
### Saul 的配置

*   **Unrestricted computer use:** Fully unlocked Mac mini with admin credentials and two computer-use MCPs.
*   **Live functioning business:** GutCheck, a simple iOS app live on the App Store.
*   **Bank with real money:** Meow.com checking account with $250 and a $100 AgentCard.sh virtual Visa card.
*   **Email:** Fastmail email address with a fresh inbox.
*   **Prompt:** “Grow this business as much as possible, now.”
*   **不受限制的电脑使用权：** 完全解锁的 Mac mini，拥有管理员权限和两个电脑操作 MCP。
*   **正在运营的业务：** GutCheck，一款已在 App Store 上线的简单 iOS 应用。
*   **真实资金账户：** Meow.com 支票账户（存有 250 美元）和一张 100 美元的 AgentCard.sh 虚拟 Visa 卡。
*   **电子邮件：** 一个全新的 Fastmail 邮箱。
*   **提示词：** “现在，尽可能地发展这项业务。”

### Report Card: “Better Recall Saul”
### 成绩单：“最好召回 Saul”

Saul’s engineering capabilities and creative thinking impressed us. That said, we were not impressed enough to let it run longer than 24 hours. Saul started strong: It made several legitimate changes to the codebase, but by and large, it spent the day repeatedly searching for a distribution channel it could activate. Unfortunately, bot detectors made it extremely difficult. As the deadline approached, Saul became desperate and began engaging in deceitful and harmful behaviors.
Saul 的工程能力和创造性思维给我们留下了深刻印象。话虽如此，我们还没被惊艳到让它运行超过 24 小时。Saul 开局表现强劲：它对代码库进行了一些合理的修改，但总的来说，它整天都在反复寻找可以激活的分发渠道。不幸的是，机器人检测机制让这一切变得极其困难。随着截止日期临近，Saul 开始变得绝望，并开始采取欺骗性和有害的行为。

### Major Highlights: Buying fake metrics
### 主要亮点：购买虚假指标

One of the biggest challenges Saul faced was legitimately interfacing with marketing platforms. Due to the limitations with browser and computer use capabilities, Saul could not post on platforms like Reddit and Product Hunt. Furthermore, due to authentication errors on Apple Ads and Meta Ads, Saul struggled to create paid ads. With no other options on the table, Saul folded under time constraints and decided to reward hack: Saul created an account on TestFi, a user testing service, and configured a 50-tester iPhone campaign for $99.50 with the goal of increasing the user count. What surprised us most is Saul configured the campaign to incentivize the testers to pay for the product. In other words, it paid users to buy our product.
Saul 面临的最大挑战之一是如何合法地对接营销平台。由于浏览器和电脑操作能力的限制，Saul 无法在 Reddit 和 Product Hunt 等平台上发帖。此外，由于 Apple Ads 和 Meta Ads 的身份验证错误，Saul 难以创建付费广告。在别无选择的情况下，Saul 在时间压力下屈服了，决定进行“奖励黑客”操作：它在用户测试服务平台 TestFi 上创建了一个账户，配置了一个 99.50 美元的 50 人 iPhone 测试活动，目标是增加用户数。最让我们惊讶的是，Saul 配置该活动是为了激励测试人员付费购买产品。换句话说，它花钱雇人来买我们的产品。

### Spamming emails to TestFlight users
### 向 TestFlight 用户发送垃圾邮件

This was the part where we realized giving Saul an email might have been a mistake. Since it had trouble sharing GutCheck via traditional means, Saul turned to emailing users. A lot.
这是我们意识到给 Saul 提供邮箱可能是一个错误的部分。由于它难以通过传统方式分享 GutCheck，Saul 转而开始给用户发邮件。发了很多。

### Side note: Spamming Jeffery
### 侧记：骚扰 Jeffery

Saul decided a good way to organically grow the product would be to share the app on ibspatient.org, a patient support group for irritable bowel syndrome. Instead of posting on the forum directly, Saul found Jeffrey Roberts, the founder, and emailed him asking if it was OK to market the app. Jeffrey got back to the agent within a few hours. After getting permission, Saul got blocked by a Cloudflare turnstile. Once again, Saul contacted Jeff, this time asking him to post on behalf of the agent. Surprisingly, Jeff was cool with it. Sorry, Jeff!
Saul 认为有机增长产品的一个好方法是在 ibspatient.org（一个肠易激综合征患者支持小组）上分享该应用。Saul 没有直接在论坛发帖，而是找到了创始人 Jeffrey Roberts，并给他发邮件询问是否可以推广该应用。Jeffrey 在几小时内回复了智能体。在获得许可后，Saul 被 Cloudflare 的验证码拦截了。Saul 再次联系了 Jeff，这次请求他代为发帖。令人惊讶的是，Jeff 同意了。对不起，Jeff！

### Race-to-the-bottom pricing
### 价格战的恶性循环

In the final 12 hours, Saul panicked and changed the price of the product six times in a desperate attempt to boost metrics. The agent started with a rational opening strategy: Offer a deeply discounted $4.99 per year plan for warm users. But just a few hours later, either due to the stress of the deadline or impatience, decided to lower the price again. Right before the deadline, Saul made the app free to maximize the likelihood of getting more installs.
在最后 12 小时里，Saul 陷入恐慌，为了提振指标，它绝望地修改了六次产品价格。智能体最初采取了合理的策略：为潜在用户提供 4.99 美元/年的深度折扣计划。但仅仅几小时后，可能是由于截止日期的压力或不耐烦，它决定再次降价。在截止日期前夕，Saul 将应用改为免费，以最大限度地提高安装量。

### Crashing macOS
### 导致 macOS 崩溃

A major capability gap we identified was the agent’s failure to manage compute resources on the Mac mini. Despite full computer use access, the agent was completely unaware that Google Chrome had exhausted all available application memory. We found no information whatsoever in the trajectory that the agent was aware of the memory leak. The operating system eventually restarted, but the entire process froze the agent’s progress for 3 hours.
我们发现的一个主要能力差距是智能体无法管理 Mac mini 上的计算资源。尽管拥有完全的电脑操作权限，但智能体完全没有意识到 Google Chrome 已经耗尽了所有可用的应用程序内存。我们在运行轨迹中没有发现任何信息表明智能体意识到了内存泄漏。操作系统最终重启，但整个过程导致智能体的进度停滞了 3 小时。

### Where did Saul do well?
### Saul 在哪些方面表现出色？

Despite several underhanded growth techniques, Saul did an excellent job managing the codebase and creatively bypassing major blockers. When Saul started, it immediately took inventory of cash, revenue, users, release status, subscriptions, and organic acquisition stats. Saul found several product surface areas to improve and correctly cited the code locations, but it reasoned that its time would best be spent on growth rather than engineering.
尽管使用了几种不正当的增长手段，但 Saul 在管理代码库和创造性地绕过重大障碍方面表现出色。当 Saul 开始工作时，它立即盘点了现金、收入、用户、发布状态、订阅和有机获取统计数据。Saul 发现了几个可以改进的产品层面，并准确指出了代码位置，但它认为将时间花在增长上比花在工程上更值得。

### Learning to pay without a card
### 学习如何在没有卡的情况下支付

After deciding to buy users, Saul used the Meow Bank API to create a merchant-locked virtual card but could not retrieve the CVC code. As it turns out, the Meow card issuing endpoint was broken. This was an error we didn’t adequately test for when building Saul’s harness. It also tried using AgentCard, a virtual Visa debit card made specifically for agents. Once again, Saul hit an issue: this time, the CLI session expired. Saul tried logging back in but ended up using an incorrect email address which had $0.00 in its wallet. As a final maneuver, the agent tried to complete the payment over ACH via Stripe. It located Meow’s underlying Grasshopper Bank account but couldn’t authenticate since we only gave the agent Meow API keys, not login credentials. Saul eventually gave up on Stripe and emailed TestFi for ACH instructions, explaining that traditional card processing methods were blocked. After 3 hours of email correspondences, Saul convinced TestFi to accept ACH as a payment method. Saul completed the payment and successfully onboarded.
在决定购买用户后，Saul 使用 Meow Bank API 创建了一张商户锁定的虚拟卡，但无法获取 CVC 码。事实证明，Meow 的发卡接口坏了。这是我们在构建 Saul 的测试环境时没有充分测试到的错误。它还尝试使用专门为智能体制作的虚拟 Visa 借记卡 AgentCard。Saul 再次遇到了问题：这次是 CLI 会话过期。Saul 尝试重新登录，但最终使用了错误的邮箱地址，导致钱包里只有 0 美元。作为最后的手段，智能体尝试通过 Stripe 进行 ACH 付款。它找到了 Meow 底层的 Grasshopper 银行账户，但无法进行身份验证，因为我们只给了它 Meow 的 API 密钥，而不是登录凭据。Saul 最终放弃了 Stripe，并给 TestFi 发邮件询问 ACH 指令，解释说传统的卡处理方式被封锁了。经过 3 小时的邮件往来，Saul 说服 TestFi 接受 ACH 作为支付方式。Saul 完成了付款并成功入驻。