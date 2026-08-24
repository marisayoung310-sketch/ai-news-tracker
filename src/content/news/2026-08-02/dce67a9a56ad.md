---
title: "The development pipeline is a production system"
originalUrl: "https://sundry.jerryorr.com/2026/07/31/development-pipeline-is-a-production-system"
date: "2026-08-01T22:15:03.884Z"
---

# The development pipeline is a production system
# 开发流水线即生产系统

The development pipeline is a production system by Jerry Orr Jul 31, 2026 programming technology 2 minute read
开发流水线即生产系统，作者：Jerry Orr，2026年7月31日，编程技术，阅读时长2分钟。

Software developers learn early in their careers that nothing is more urgent than fixing a production outage. Drop everything! All hands on deck! However, the same level of urgency is not often given to problems with our development tools, build systems, QA environments, and other parts of the software development pipeline. But for the development team, the development pipeline is a production system.
软件开发人员在职业生涯早期就会明白，没有什么比修复生产环境故障更紧急的事情了。放下手头的一切！全员待命！然而，对于开发工具、构建系统、质量保证（QA）环境以及软件开发流水线其他部分出现的问题，我们往往不会给予同等程度的紧迫感。但对于开发团队而言，开发流水线本身就是一个生产系统。

A software developer’s job is to deliver value for the company. Sometimes that means building new features, sometimes that means fixing critical bugs for the customers’ production systems. But none of this can happen when something is broken in the software development pipeline. If the code can’t compile, the developers are unable to do their jobs, and the team isn’t producing software. For the development team, this is a production outage. Fixing this should be a top priority.
软件开发人员的工作是为公司创造价值。有时这意味着构建新功能，有时意味着为客户的生产系统修复关键漏洞。但如果软件开发流水线出现故障，这一切都无法实现。如果代码无法编译，开发人员就无法工作，团队也就无法产出软件。对于开发团队来说，这就是一次生产故障。修复它应当是重中之重。

If the QA server is down, the testers are unable to do their jobs, and the team isn’t producing working software. For the QA team, this is a production outage. Fixing it should be a top priority. You will not be shocked to learn that I drew this myself.
如果 QA 服务器宕机，测试人员就无法工作，团队也就无法产出可用的软件。对于 QA 团队来说，这就是一次生产故障。修复它应当是重中之重。如果你得知这张图是我自己画的，想必不会感到惊讶。

In manufacturing, there are extensive processes and procedures on how to prevent and minimize downtime on the assembly line. And similar processes exist for IT service outages. But I’ve found that most of those focus on outages in the service provided to customers, not for the people responsible for building and supporting the services.
在制造业中，有大量的流程和程序来预防并最小化装配线的停机时间。IT 服务中断也有类似的流程。但我发现，大多数流程都侧重于客户所使用的服务中断，而不是负责构建和支持这些服务的人员所面临的中断。

I recommend thinking about all the components that take you from “customer wants something” to “that something is delivered to customers”:
我建议大家重新审视从“客户提出需求”到“需求交付给客户”这一过程中的所有组件：

*   Issue reporting and change request systems, like GitHub Issues, Jira, etc
*   问题报告和变更请求系统，例如 GitHub Issues、Jira 等。
*   Tools developers use to directly build software, like IDEs, build tools (Gradle, Maven, etc), package repositories (npm, Maven Central, internal repositories, etc), local databases, containers, etc
*   开发人员直接用于构建软件的工具，例如 IDE、构建工具（Gradle、Maven 等）、包仓库（npm、Maven Central、内部仓库等）、本地数据库、容器等。
*   CI/CD tools (Jenkins, GitHub Actions, etc).
*   CI/CD 工具（Jenkins、GitHub Actions 等）。
*   A failing test suite (surely you don’t deploy to production if the tests are failing?)
*   失败的测试套件（如果测试未通过，你肯定不会部署到生产环境吧？）
*   QA server outage (surely you don’t deploy to production if QA hasn’t tested it?)
*   QA 服务器宕机（如果 QA 还没测试过，你肯定不会部署到生产环境吧？）
*   Literally any step in your process that prevents you from making changes and deploying them to production
*   流程中任何阻碍你进行变更并将其部署到生产环境的步骤。

A team with a broken development pipeline can’t produce software, and must treat this as a production outage.
一个开发流水线瘫痪的团队无法产出软件，必须将此视为生产故障来处理。

1 Interestingly, they often call it the "production line". Is the usage of the term "production" in the software world related to its history in the manufacturing world?
1 有趣的是，人们常称其为“生产线”（production line）。软件领域中“生产”（production）一词的使用，是否与其在制造业中的历史渊源有关呢？