---
title: "Before GitHub"
originalUrl: "https://lucumr.pocoo.org/2026/4/28/before-github/"
date: "2026-04-29T05:32:51.388Z"
---

# Before GitHub

Armin Ronacher's Thoughts and Writings blog archive projects travel talks about Before GitHub written on April 28, 2026.
Armin Ronacher 的 Thoughts and Writings 博客存档项目，关于“GitHub 之前”的谈话，写于 2026 年 4 月 28 日。

GitHub was not the first home of my Open Source software. SourceForge was. Before GitHub, I had my own Trac installation. I had Subversion repositories, tickets, tarballs, and documentation on infrastructure I controlled. Later I moved projects to Bitbucket, back when Bitbucket still felt like a serious alternative place for Open Source projects, especially for people who were not all-in on Git yet. And then, eventually, GitHub became the place, and I moved all of it there.
GitHub 并不是我开源软件的第一个家，SourceForge 才是。在 GitHub 之前，我有自己的 Trac 安装实例。我拥有 Subversion 仓库、工单系统、压缩包以及我所掌控的基础设施上的文档。后来，我将项目迁移到了 Bitbucket，那时 Bitbucket 感觉还是开源项目的一个严肃替代方案，尤其是对于那些尚未完全转向 Git 的人来说。最终，GitHub 成为了主流，我把所有东西都搬到了那里。

It is hard for me to overstate how important GitHub became in my life. A large part of my Open Source identity formed there. Projects I worked on found users there. People found me there, and I found other people there. Many professional relationships and many friendships started because some repository, issue, pull request, or comment thread made two people aware of each other. That is why I find what is happening to GitHub today so sad and so disappointing.
我很难夸大 GitHub 在我生命中变得有多重要。我很大一部分的开源身份是在那里形成的。我参与的项目在那里找到了用户。人们在那里找到了我，我也在那里找到了其他人。许多职业关系和友谊的建立，都是因为某个仓库、Issue、Pull Request 或评论区让两个人互相认识。这就是为什么我觉得 GitHub 今天发生的一切如此令人悲伤和失望。

I do not look at it as just the folks at Microsoft making product decisions I dislike. GitHub was part of the social infrastructure of Open Source for a very long time. For many of us, it was not merely where the code lived; it was where a large part of the community lived. So when I think about GitHub’s decline, I also think about what came before it, and what might come after it.
我并不只是将其看作微软的人做出了我不喜欢的决策。长期以来，GitHub 一直是开源社交基础设施的一部分。对于我们许多人来说，它不仅仅是代码存放的地方，更是社区很大一部分人生活的地方。因此，当我思考 GitHub 的衰落时，我也会思考它之前是什么，以及它之后可能会是什么。

I have written a few times over the years about dependencies, and in particular about the problem of micro dependencies. In my mind, GitHub gave life to that phenomenon. It was something I definitely did not completely support, but it also made Open Source more inclusive. GitHub changed how Open Source feels, and later npm and other systems changed how dependencies feel. Put them together and you get a world in which publishing code is almost frictionless, consuming code is almost frictionless, and the number of projects in the world explodes. That has many upsides. But it is worth remembering that Open Source did not always work this way.
多年来，我曾几次写过关于依赖项的文章，特别是关于微依赖（micro dependencies）的问题。在我看来，GitHub 催生了这一现象。虽然我并不完全支持这一点，但它确实让开源变得更加包容。GitHub 改变了开源的体验，后来 npm 和其他系统改变了依赖项的体验。将它们结合起来，你就会得到一个发布代码几乎零摩擦、使用代码几乎零摩擦的世界，全球的项目数量也因此呈爆炸式增长。这有很多好处，但值得记住的是，开源并不总是这样运作的。

### A Smaller World
### 一个更小的世界

Before GitHub, Open Source was a much smaller world. Not necessarily in the number of people who cared about it, but in the number of projects most of us could realistically depend on. There were well-known projects, maintained over long periods of time by a comparatively small number of people. You knew the names. You knew the mailing lists. You knew who had been around for years and who had earned trust. That trust was not perfect, and the old world had plenty of gatekeeping, but reputation mattered in a very direct way.
在 GitHub 之前，开源是一个小得多的世界。这不一定是指关心开源的人数，而是指我们大多数人能够真正依赖的项目数量。当时有一些知名项目，由相对较少的人长期维护。你知道这些名字，知道这些邮件列表，知道谁已经在圈子里待了很多年，谁赢得了信任。这种信任并不完美，旧世界也有很多门槛，但声誉在当时以一种非常直接的方式发挥着作用。

We took pride (and got frustrated) when the Debian folks came and told us our licensing stuff was murky or the copyright headers were not up to snuff, because they packaged things up. A dependency was not just a package name. It was a project with a history, a website, a maintainer, a release process, a lot of friction, and often a place in a larger community. You did not add dependencies casually, because the act of depending on something usually meant you had to understand where it came from.
当 Debian 的伙伴们跑来告诉我们，我们的许可协议模糊不清或者版权声明不规范时，我们既感到自豪又感到沮丧，因为他们确实在打包这些东西。一个依赖项不仅仅是一个包名，它是一个拥有历史、网站、维护者、发布流程、大量摩擦成本，并且通常在更大社区中占有一席之地的项目。你不会随意添加依赖项，因为依赖某样东西通常意味着你必须了解它的来源。

Not all of this was necessarily intentional, but because these projects were comparatively large, they also needed to bring their own infrastructure. Small projects might run on a university server, and many of them were on SourceForge, but the larger ones ran their own show. They grouped together into larger collectives to make it work.
这并非全是刻意为之，但由于这些项目相对较大，它们也需要自带基础设施。小型项目可能运行在大学服务器上，许多项目托管在 SourceForge 上，但大型项目则自成一体。它们聚集成更大的集体来维持运作。

### We Ran Our Own Infrastructure
### 我们运行自己的基础设施

My first Open Source projects lived on infrastructure I ran myself. There was a Trac installation, Subversion repositories, tarballs, documentation, and release files served from my own machines or from servers under my control. That was normal. If you wanted to publish software, you often also became a small-time system administrator.
我的第一个开源项目运行在我自己维护的基础设施上。那里有 Trac 安装实例、Subversion 仓库、压缩包、文档，以及从我自己的机器或我控制的服务器上提供的发布文件。这在当时很正常。如果你想发布软件，你往往还得成为一名小型系统管理员。

Georg and I ran our own collective for our Open Source projects: Pocoo. We shared server costs and the burden of maintaining Subversion and Trac, mailing lists and more. Subversion in particular made this “running your own forge” natural. It was centralized: you needed a server, and somebody had to operate it. The project had a home, and that home was usually quite literal: a hostname, a directory, a Trac instance, a mailing list archive.
Georg 和我为我们的开源项目运营了一个集体：Pocoo。我们分摊服务器成本，共同承担维护 Subversion、Trac、邮件列表等的负担。特别是 Subversion 让这种“运行自己的代码托管平台”变得非常自然。它是中心化的：你需要一台服务器，并且必须有人来操作它。项目有一个家，这个家通常非常具体：一个主机名、一个目录、一个 Trac 实例、一个邮件列表存档。

When Mercurial and Git arrived, they were philosophically the opposite. Both were distributed. Everybody could have the full repository. Everybody could have their own copy, their own branches, their own history. In principle, those distributed version control systems should have reduced the need for a single center. But despite all of this, GitHub became the center. That is one of the great ironies of modern Open Source. The distributed version control system won, and then the world standardized on one enormous centralized service for hosting it.
当 Mercurial 和 Git 出现时，它们的哲学理念恰恰相反。两者都是分布式的。每个人都可以拥有完整的仓库，每个人都可以拥有自己的副本、自己的分支、自己的历史。原则上，这些分布式版本控制系统应该减少对单一中心的需求。但尽管如此，GitHub 还是成为了中心。这是现代开源的一大讽刺：分布式版本控制系统赢了，但全世界却统一使用了一个巨大的中心化服务来托管它。

### What GitHub Gave Us
### GitHub 带给了我们什么

It is easy now to talk only about GitHub’s failures, of which there are currently many, but that would be unfair: GitHub was, and continues to be, a tremendous gift to Open Source. It made creating a project easy and it made discovering projects easy. It made contributing understandable to people who had never subscribed to a development mailing list in their life.
现在只谈论 GitHub 的失败（目前确实有很多）很容易，但这不公平：GitHub 过去是，现在仍然是开源界的一份巨大礼物。它让创建项目变得简单，让发现项目变得容易。它让那些从未订阅过开发邮件列表的人也能理解如何做出贡献。

It gave projects issue trackers, pull requests, release pages, wikis, organization pages, API access, webhooks, and later CI. It normalized the idea that Open Source happens in the open, with visible history and visible collaboration. And it was an excellent and reasonable default choice for a decade.
它为项目提供了 Issue 追踪器、Pull Request、发布页面、Wiki、组织页面、API 访问、Webhooks 以及后来的 CI。它使“开源是在公开环境下进行的，拥有可见的历史和可见的协作”这一理念常态化。在过去十年里，它一直是一个出色且合理的默认选择。

But maybe the most underappreciated thing GitHub did was archival work: GitHub became a library. It became an index of a huge part of the software commons because even abandoned projects remained findable. You could find forks, and old issues and discussions all stayed online. For all the complaints one can make about centralization, that centralization also created discoverable memory. The leaders there once cared a lot about keeping GitHub available even in...
但 GitHub 最被低估的贡献或许是归档工作：GitHub 变成了一座图书馆。它成为了软件公共资源中很大一部分的索引，因为即使是被废弃的项目也依然可以被找到。你可以找到分支（forks），旧的 Issue 和讨论也都保留在网上。尽管人们对中心化有很多抱怨，但这种中心化也创造了可被发现的记忆。那里的领导者曾经非常关心如何保持 GitHub 的可用性，即使在……