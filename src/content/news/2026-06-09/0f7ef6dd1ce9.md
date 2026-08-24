---
title: "Forgejo monthly report - May 2026"
originalUrl: "https://forgejo.org/2026-05-monthly-report/"
date: "2026-06-08T23:07:08.182Z"
---

# Forgejo 月度报告 - 2026 年 5 月

The monthly report is meant to provide a good overview of what has changed in Forgejo in the past month. Additionally, this report covers the previous month, April 2026, as well. If you would like to help, please get in touch in the chatroom or participate in the ongoing discussions.
本月度报告旨在概述过去一个月 Forgejo 的变化。此外，本报告还涵盖了 2026 年 4 月的情况。如果您希望提供帮助，请通过聊天室与我们联系，或参与正在进行的讨论。

### Releases
### 版本发布

Forgejo v15 was released on April 16. As a long-term-support release, it will be supported with bug and security fixes until 15 July 2027. Two security releases have been completed since v15’s initial release: v15.0.1 and v15.0.2. The next security release v15.0.3 is scheduled for June 10. Report any regressions you find in the issue tracker. If the issues you’re facing are related to security, please report them to the security team according to the security policy.
Forgejo v15 于 4 月 16 日发布。作为长期支持（LTS）版本，它将获得错误修复和安全更新支持，直至 2027 年 7 月 15 日。自 v15 首次发布以来，已完成了两个安全版本更新：v15.0.1 和 v15.0.2。下一个安全版本 v15.0.3 计划于 6 月 10 日发布。如果您发现任何回归问题，请在问题追踪器中报告。如果您遇到的问题与安全相关，请按照安全策略向安全团队报告。

### Security releases: Forgejo v11 and v14
### 安全版本：Forgejo v11 和 v14

Three security releases occurred in April and May for previous v11 LTS, and the last stable release v14.
针对之前的 v11 LTS 版本和最后一个稳定版本 v14，在 4 月和 5 月期间共进行了三次安全发布。

*   April 10: Forgejo v11.0.12 & v14.0.3
*   April 29: Forgejo v11.0.13 & v14.0.4
*   May 12: Forgejo v11.0.14
*   4 月 10 日：Forgejo v11.0.12 & v14.0.3
*   4 月 29 日：Forgejo v11.0.13 & v14.0.4
*   5 月 12 日：Forgejo v11.0.14

Support for Forgejo v14 ended on April 30, and no future releases will be provided. All v14 installations should upgrade to v15 immediately. Support for Forgejo v11 will end soon, on July 16, and no future releases will be provided after that date. All v11 installations should upgrade to v15 before the end of support.
Forgejo v14 的支持已于 4 月 30 日结束，未来将不再提供任何版本更新。所有 v14 安装实例应立即升级至 v15。Forgejo v11 的支持也将于 7 月 16 日结束，此后不再提供更新。所有 v11 安装实例应在支持结束前升级至 v15。

As a reminder, Forgejo publishes advance warning of security releases, similar to what is done when a Go release contains a security fix. They do not reveal the details of the vulnerability but will allow admins to plan ahead and better secure their instance. Anyone can watch the dedicated tracker or subscribe to the RSS feed.
提醒一下，Forgejo 会提前发布安全更新预警，类似于 Go 语言发布包含安全修复的版本时的做法。这些预警不会透露漏洞细节，但允许管理员提前规划并更好地保护其实例。任何人都可以关注专门的追踪器或订阅 RSS 源。

### Forgejo Runner
### Forgejo Runner

Forgejo Runner has received multiple releases since the last monthly report and is currently v12.10.2. With the introduction of the new runner registration process in Forgejo 15, all commands supporting the old process around the runner registration token and the .runner file have been deprecated (register, create-runner-file). However, support for .runner will be kept around for the foreseeable future. If your use cases aren’t supported well by the new tooling, please let us know.
自上次月度报告以来，Forgejo Runner 已多次更新，目前版本为 v12.10.2。随着 Forgejo 15 引入新的 Runner 注册流程，所有支持旧流程中关于 Runner 注册令牌和 `.runner` 文件的命令（register, create-runner-file）已被弃用。不过，在可预见的未来，对 `.runner` 的支持仍将保留。如果您的使用场景在新工具中支持不佳，请告知我们。

Apart from numerous bug fixes, the first features slated for Forgejo 16 have landed, too: entrypoint customization for job containers and services. As every month, the users of Forgejo Actions have been busy filing feature requests. One that has seen a lot of interest and discussion is Pluggable Backend Architecture. The aim is enabling the development of third-party plug-ins that can run jobs in alternative back-ends like virtual machines or Kubernetes. There is already a working prototype that runs jobs in Kubernetes. forgejo-runner one-job is now capable of requesting a specific job from Forgejo, allowing for precise execution of targeted jobs in managed runner scaling configurations (PR 1443 requires Forgejo 15). A fix was merged to prevent containers from being left over by jobs in some error conditions (PR 1523).
除了大量的错误修复外，计划用于 Forgejo 16 的首批功能也已落地：作业容器和服务入口点（entrypoint）的自定义。和往常一样，Forgejo Actions 的用户们积极提交了功能请求。其中备受关注和讨论的是“可插拔后端架构”（Pluggable Backend Architecture）。其目标是支持开发第三方插件，以便在虚拟机或 Kubernetes 等替代后端中运行作业。目前已经有一个在 Kubernetes 中运行作业的工作原型。`forgejo-runner one-job` 现在能够从 Forgejo 请求特定作业，从而允许在托管的 Runner 扩展配置中精确执行目标作业（PR 1443 需要 Forgejo 15）。此外，合并了一项修复程序，以防止在某些错误条件下作业遗留容器（PR 1523）。

### Forgejo Helm chart v17
### Forgejo Helm chart v17

Following the release of Forgejo v15, the Forgejo Helm chart received a new major release to update the default Forgejo version. One patch and one minor release followed for the corresponding v15 patch releases: v17.0.1 and v17.1.0. The minor release brought the values.schema.json file for easier values validation.
随着 Forgejo v15 的发布，Forgejo Helm chart 也发布了一个新的主要版本，以更新默认的 Forgejo 版本。随后针对相应的 v15 补丁版本发布了一个补丁版本和一个次要版本：v17.0.1 和 v17.1.0。次要版本引入了 `values.schema.json` 文件，以便更轻松地进行值验证。

### Security Announcements: 'Carrot Disclosure'
### 安全公告：“胡萝卜披露”（Carrot Disclosure）

Forgejo was the subject of a blog post entitled “Carrot disclosure: Forgejo” on April 28th, which made remarks about Forgejo’s security posture, and made claims that it was vulnerable to one-or-more remote code execution (RCE) security vulnerabilities that the author chose not to disclose to Forgejo. Forgejo’s security team initially chose to make no public response to this blog post. We internally discussed the situation, and decided there were no actions to take — we have no capability to perform the work requested in the blog post of “perform[ing] a holistic audit of its software, fixing as many issues as possible in the hope of fixing the showcased vulnerability”. As a volunteer team this is outside of the scope of what we can do. We planned to address the opened pull requests, and continue to rely on responsible security researchers to disclose vulnerabilities per the security policy.
4 月 28 日，一篇题为“胡萝卜披露：Forgejo”的博客文章对 Forgejo 的安全态势发表了评论，并声称其存在一个或多个远程代码执行（RCE）安全漏洞，但作者选择不向 Forgejo 披露。Forgejo 安全团队最初选择不对该博客文章做出公开回应。我们在内部讨论了这种情况，并决定无需采取任何行动——我们没有能力执行博客文章中要求的“对其软件进行全面审计，并尽可能修复更多问题，以期修复所展示的漏洞”。作为一个志愿者团队，这超出了我们的能力范围。我们计划处理已提交的拉取请求（PR），并继续依靠负责任的安全研究人员按照安全策略披露漏洞。

The blog’s author decided to change their position on April 30th, and disclosed their proof-of-concept vulnerability scripts to us. We appreciated the change towards an approach of responsible disclosure. Generally, we collaborate together within the security team to create patches for issues privately when we believe that public disclosure of a Forgejo flaw would put Forgejo users at a great risk while the flaw was exploitable, public, and unpatched. For example, during this same time window, we released Forgejo 15.0.1, 14.0.5, and 11.0.13, which contain a fix for an authorization bypass which allows any authenticated user to write to public repositories that they don’t own. Developing this fix in public would have made more people aware of the issue for a longer period of time, and so it was developed in private and published in coordination with the release team for an immediate new release.
博客作者于 4 月 30 日改变了立场，并向我们披露了他们的漏洞概念验证脚本。我们赞赏这种转向负责任披露的做法。通常，当我们认为公开披露 Forgejo 的缺陷会使 Forgejo 用户面临巨大风险（即该缺陷可被利用、已公开且未修复）时，我们会在安全团队内部协作私下创建补丁。例如，在同一时间窗口内，我们发布了 Forgejo 15.0.1、14.0.5 和 11.0.13，其中包含对授权绕过漏洞的修复，该漏洞允许任何已认证用户向其不拥有的公共仓库写入内容。如果公开开发此修复程序，会让更多人在更长时间内意识到该问题，因此我们选择私下开发，并与发布团队协调，立即发布新版本。

We completed a review of the vulnerability scripts provided by the blog author, and determined that all of the issues raised could be addressed in-public as knowledge about the issues do not indicate any significant risk to Forgejo installations. Describing any of the reported vulnerabilities as an RCE is inaccurate, as the most severe of them require access to internal server or administrator credentials, and no vulnerability has been demonstrated to us to breach those credentials remotely. Accordingly, all of the issues have had public issues filed, in order for design discussions, workarounds, and contributor developer support to be available to help bring them to a resolution.
我们完成了对博客作者提供的漏洞脚本的审查，并确定所有提出的问题都可以在公开场合解决，因为关于这些问题的知识并不表明对 Forgejo 安装实例构成任何重大风险。将任何报告的漏洞描述为 RCE 是不准确的，因为其中最严重的漏洞也需要访问内部服务器或管理员凭据，且目前没有任何漏洞被证明可以远程窃取这些凭据。因此，所有问题都已在公开渠道提交，以便进行设计讨论、寻找变通方案，并获得贡献者开发人员的支持，从而帮助解决这些问题。