---
title: "Dependency cooldowns are unfair; we should use phased rollouts instead"
originalUrl: "https://illegalcode.net/rfcs/phased_rollouts.html"
date: "2026-05-21T23:06:15.667Z"
---

# Dependency cooldowns are unfair; we should use phased rollouts instead
# 依赖冷却期是不公平的；我们应该改用分阶段发布

Dependency cooldowns are unfair; we should use phased rollouts instead. Note: I’m bad at writing and implicitly make the bold assumption of correlations at 00:00 UTC. I’ve made minor changes from the original draft to emphasise that point.
依赖冷却期（Dependency cooldowns）是不公平的；我们应该改用分阶段发布（phased rollouts）。注：我不擅长写作，且在文中隐含了一个大胆的假设，即相关性发生在协调世界时（UTC）00:00。我对初稿做了微调，以强调这一点。

It was a sunny morning in Melbourne on March 31st. Developers starting their workday were sipping their flat whites as they waited for `npm install` to finish. You know the rest of this story. The Axios supply chain compromise was live from 00:21 to 03:15 UTC and disproportionately hit the eastern hemisphere. In the aftermath, the quiet calls for dependency cooldowns almost overnight became industry best practice.
3月31日，墨尔本的一个阳光明媚的早晨。开发者们开始了一天的工作，一边喝着平白咖啡（flat white），一边等待 `npm install` 完成。故事的后续你们都知道了。Axios 供应链攻击事件发生在 UTC 时间 00:21 到 03:15，对东半球造成了不成比例的影响。事后，关于设置依赖冷却期的呼声几乎在一夜之间成为了行业最佳实践。

Cooldowns work against fast-acting supply-chain attacks. But they have an awkward property: they implicitly rely on someone else installing first. In common (mal)practice, that “someone else” means Asia-Pacific: 00:00 UTC is 08:00 in China, 09:00 in Tokyo, 11:00 in Sydney.
冷却期确实能抵御快速爆发的供应链攻击，但它有一个尴尬的特性：它隐含地依赖于“其他人”先进行安装。在常见的（不良）实践中，这个“其他人”往往指代亚太地区：UTC 00:00 对应中国时间 08:00、东京时间 09:00、悉尼时间 11:00。

I propose that instead of “everyone waits N days,” package managers should deterministically map projects into a rollout window based on stable inputs: a project-specific identifier, package name, version, and artifact digest. The result is a globally distributed adoption curve rather than timezone-based canaries. If you prefer code to words, here’s a gist that demonstrates the idea.
我建议，与其让“所有人等待 N 天”，包管理器不如根据稳定的输入（项目特定标识符、包名、版本和制品摘要）将项目确定性地映射到发布窗口中。这样产生的结果是一条全球分布的采用曲线，而不是基于时区的“金丝雀”测试。如果你更喜欢代码而非文字，这里有一个展示该想法的 Gist。

First, let’s consider three other communities that do things differently:
首先，让我们看看其他三个处理方式不同的领域：

**Antivirus:** In April 2010, McAfee 5958 bricked a whole lot of Windows XP installs. The response was phased rollouts, not “everyone wait 24 hours before updating antivirus definitions.” They were in a similar situation; the vendors are smart but most of their customers are unsophisticated. Vendors invest in testing and monitoring. And when something goes wrong, vendors are usually the first to find out.
**杀毒软件：** 2010 年 4 月，McAfee 5958 导致大量 Windows XP 系统变砖。当时的应对措施是分阶段发布，而不是“所有人等待 24 小时后再更新病毒库”。他们的情况类似：供应商很聪明，但大多数客户缺乏专业知识。供应商投入资源进行测试和监控，当出现问题时，供应商通常是第一批发现的人。

**OS and firmware:** CrowdStrike Falcon crashed 8.5 million computers in one day. Biggest crash in history, front page New York Times, July 20 2024. That update went out at 04:09 UTC, the middle of the business day in Oceania and Asia. One of the biggest lessons learned was to “release gradually across increasing rings of deployment.” Of course, many of us just felt bad that big enterprises were struck by big enterprise problems. But consider that in 2018, Windows 1809 was the first update that used a ML-targeted phased rollout after widespread data loss.
**操作系统与固件：** CrowdStrike Falcon 在一天内导致 850 万台计算机崩溃。这是历史上最大的崩溃事件，登上了 2024 年 7 月 20 日《纽约时报》头版。那次更新发布于 UTC 04:09，正是大洋洲和亚洲的工作时间。最大的教训之一是“通过不断扩大的部署环进行渐进式发布”。当然，许多人只是为大企业遭遇大企业问题而感到遗憾。但请注意，2018 年的 Windows 1809 是在发生大规模数据丢失后，首次使用机器学习驱动的分阶段发布更新。

**Feature flags:** The weirdest part for me as I read all the cooldown buzz was that we don’t use cooldowns for our own applications. We deploy to small cohorts, monitor, and then gradually ramp up traffic. The Continuous Delivery community boiled it down to a catchy phrase: decoupling deployment from release.
**功能开关（Feature flags）：** 当我阅读所有关于冷却期的讨论时，最让我感到奇怪的是，我们并没有在自己的应用程序中使用冷却期。我们通常部署到一小部分群体，进行监控，然后逐渐增加流量。持续交付（Continuous Delivery）社区将其总结为一个朗朗上口的短语：将部署与发布解耦。

### The Proposal
### 提案

Package registries do have fundamental differences from the above examples: OS updates work because the vendor controls publication and distribution. Package registries are pull-based; they don’t directly decide who gets what artifact. Therefore: any phased rollout logic must live on the project-side.
包注册中心与上述例子有本质区别：操作系统更新之所以有效，是因为供应商控制了发布和分发。而包注册中心是基于“拉取”模式的；它们无法直接决定谁获取什么制品。因此，任何分阶段发布的逻辑都必须存在于项目端。

The mechanism is simple, each project independently derives a hash from stable inputs:
该机制很简单，每个项目根据稳定的输入独立导出一个哈希值：
* A unique `project_id` (唯一的项目 ID)
* The fully qualified package name (完整的包名)
* The semver package version (语义化版本号)
* The artifact digest (制品摘要)

The hash is then mapped onto a rollout window; my example code uses `(14 days) * sqrt(h)` so that the release curve is biased toward earlier adoption while still leaving a long tail for detection. This results in globally distributed and effectively random adoption without any registry coordination.
然后将该哈希值映射到发布窗口中；我的示例代码使用了 `(14 days) * sqrt(h)`，这样发布曲线会偏向于早期采用，同时仍留有较长的尾部以便进行检测。这实现了全球分布且有效的随机采用，无需任何注册中心的协调。

As a worked example, suppose two applications both depend on `axios@1.14.1`. One installs it after 4 hours, another after 5 days, and everyone has it after 14 days. The malicious release spreads through a random global subset first instead of following the sun.
举个例子，假设两个应用程序都依赖 `axios@1.14.1`。一个在 4 小时后安装，另一个在 5 天后安装，所有人都在 14 天后完成安装。恶意版本会先在随机的全球子集中传播，而不是遵循“随太阳升起”的地理顺序。

The tradeoff is slower convergence on newly published versions, especially for low-download packages. But cooldowns have the same tradeoff; phased rollouts just distribute it more fairly. It’s also important to note that this proposal deliberately changes when projects adopt artifacts, not which artifacts they resolve. Existing lockfile and reproducibility guarantees remain once a version is selected. And security fixes still warrant different rollout policies.
这种权衡带来的代价是新发布版本的收敛速度变慢，尤其是对于下载量较低的包。但冷却期也存在同样的权衡；分阶段发布只是让这种权衡更加公平。同样需要注意的是，该提案有意改变的是项目采用制品的时间，而不是它们解析的制品本身。一旦版本被选中，现有的锁文件（lockfile）和可重复性保证依然有效。此外，安全修复程序仍然可以采用不同的发布策略。

### What comes next
### 未来展望

I thought of ways to overcomplicate this idea. Public attestation logs for canary reports? Cohort-aware tooling? Cross-ecosystem hash conventions? All cool, but I don’t want to takeaway from the heroic efforts spent on even better mitigations like:
我曾想过如何让这个想法变得过于复杂。比如金丝雀报告的公共证明日志？感知群体的工具？跨生态系统的哈希约定？这些都很棒，但我不想削弱那些在更好缓解措施上所做的英勇努力，例如：
* Capability sandboxing (能力沙箱)
* SBOMs (软件物料清单)
* Runtime monitoring (运行时监控)
* Reading diffs (阅读代码差异)

In summary, cooldowns reduce risk, but they don’t remove the fact that someone still has to go first. Other parts of the industry learned to use phased rollouts. Package ecosystems should learn the same lesson.
总之，冷却期降低了风险，但无法改变“总有人必须先安装”的事实。行业中的其他领域已经学会了使用分阶段发布，包生态系统也应该吸取同样的教训。