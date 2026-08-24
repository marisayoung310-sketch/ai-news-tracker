---
title: "Google's Open Knowledge Format is just Markdown in folders (and that's the point)"
originalUrl: "https://dev.to/hjarni/googles-open-knowledge-format-is-just-markdown-in-folders-and-thats-the-point-4gnc"
date: "2026-06-15T23:27:14.660Z"
---

# Google's Open Knowledge Format is just Markdown in folders (and that's the point)
# Google 的开放知识格式（OKF）本质上就是文件夹里的 Markdown（这正是其核心所在）

Last week Google Cloud published the Open Knowledge Format (OKF). It is a way to write down what a team knows so that AI agents can read it. Strip the announcement and it is refreshingly small: a folder of Markdown files, with a little YAML frontmatter, that link to each other. No database. No SDK. No runtime. The core idea fits on a page.

上周，Google Cloud 发布了开放知识格式（Open Knowledge Format，简称 OKF）。这是一种记录团队知识的方法，旨在让 AI 智能体（Agent）能够读取这些信息。剥离掉公告的包装，你会发现它简洁得令人耳目一新：它就是一个包含 Markdown 文件的文件夹，辅以少量的 YAML 元数据（frontmatter），文件之间相互链接。没有数据库，没有 SDK，也没有运行时环境。其核心理念一页纸就能讲清楚。

The whole format on one screen: A knowledge base is a folder tree. Each note or resource is one Markdown file.
整个格式一屏可见：知识库就是一个文件夹树。每个笔记或资源都是一个 Markdown 文件。

```text
my-brain/
├── index.md # a map of this folder
├── log.md # change history
├── projects/
│   ├── index.md
│   ├── architecture-decisions.md
│   └── deploy-runbook.md
└── customers/
    ├── index.md
    └── acme-interview.md
```

Each document carries frontmatter. The only required field is type. Everything else is optional.
每个文档都带有元数据（frontmatter）。唯一必填的字段是 `type`，其他所有字段都是可选的。

```yaml
---
type: Note
title: "Deploy runbook"
timestamp: 2026-05-12T09:30:00Z
description: "How we ship to production, including the rollback path."
tags: [ops, runbook]
---

# Deploy runbook
Promote from staging once CI is green. See [architecture decisions](architecture-decisions.md) for why.
```

Two things make it more than a pile of files: `index.md` per folder is a `type: Collection` document, so an agent can discover context gradually instead of loading everything. Links are plain Markdown links between files. Follow them and the folder becomes a graph an agent can walk.
有两点让它不仅仅是一堆文件：每个文件夹下的 `index.md` 是一个 `type: Collection` 文档，因此智能体可以逐步发现上下文，而不是一次性加载所有内容。链接则是文件之间普通的 Markdown 链接。顺着这些链接，文件夹就变成了一个智能体可以遍历的图谱。

```yaml
---
type: Collection
title: Projects
---

# Projects
## Notes
- [Architecture decisions](architecture-decisions.md)
- [Deploy runbook](deploy-runbook.md)
```

That is the entire idea. Files, frontmatter, folders, links, plus a `log.md` for history.
这就是全部构想。文件、元数据、文件夹、链接，再加上一个用于记录历史的 `log.md`。

### Why a format, and why now
### 为什么需要这种格式，为什么是现在？

The problem OKF targets is the one you hit the moment you point an agent at your own knowledge. The context it needs is scattered across a metadata catalog, a wiki, code comments, and a few people's heads. Every agent builder reassembles it from scratch, and the knowledge stays locked in whatever tool held it.
OKF 旨在解决的问题，正是当你让智能体处理你自己的知识库时所遇到的痛点。智能体所需的上下文分散在元数据目录、Wiki、代码注释以及某些人的脑海中。每个智能体构建者都必须从零开始重新整合这些信息，而知识则被锁定在各自的工具中。

OKF's answer is boring in the best way: stop inventing proprietary formats. Write the knowledge as files an agent can read, in a shape everyone agrees on. The format is the contract. The tool that produces it and the tool that consumes it can change independently.
OKF 给出的答案以一种最好的方式显得“平淡无奇”：停止发明专有格式。将知识写成智能体可读的文件，并采用一种大家都能达成共识的结构。这种格式就是契约。生产该格式的工具和消费该格式的工具可以独立演进。

For developers the payoff is familiar: it is just files. You can diff it, put it in a Git repo, grep it, render it on GitHub, and feed it to any agent that reads Markdown. Knowledge that lives in one vendor's database is only as useful as that vendor's AI. Knowledge written as plain, linked files travels.
对于开发者来说，其好处显而易见：它们只是文件。你可以进行差异对比（diff）、放入 Git 仓库、使用 grep 搜索、在 GitHub 上渲染，并将其喂给任何支持 Markdown 的智能体。存储在某个供应商数据库中的知识，其价值仅限于该供应商的 AI 能力；而以纯文本、链接文件形式编写的知识，则具有极强的可移植性。

### How it maps to a real tool
### 它如何映射到实际工具中

Disclosure: I build Hjarni, a Markdown knowledge base with a built-in MCP server, so Claude and ChatGPT can read and write your notes. When I read the OKF spec, it felt familiar. Hjarni's model already had the same bones: Markdown notes, nested folders, tags, and links between notes. So we added OKF export and import.
披露：我开发了 Hjarni，这是一个内置 MCP 服务器的 Markdown 知识库，可以让 Claude 和 ChatGPT 读取并编写你的笔记。当我阅读 OKF 规范时，感到非常亲切。Hjarni 的模型已经具备了相同的骨架：Markdown 笔记、嵌套文件夹、标签以及笔记间的链接。因此，我们增加了 OKF 的导出和导入功能。

Export writes one Markdown file per note with type frontmatter, an index.md per folder, a root index.md, a log.md, and relative Markdown links rewritten from wiki-links. Import reads that structure back in. That round trip matters. A format is not very portable if it only works as an escape hatch. OKF is more useful when tools can both produce it and consume it.
导出功能会将每个笔记写入一个带有 `type` 元数据的 Markdown 文件，每个文件夹生成一个 `index.md`，根目录生成一个 `index.md` 和 `log.md`，并将 Wiki 链接重写为相对 Markdown 链接。导入功能则能将该结构读回。这种往返能力至关重要。如果一种格式只能作为“逃生舱”使用，那它就不具备真正的可移植性。当工具既能生产又能消费 OKF 时，它才更有价值。

Most days you do not export at all. Through the MCP server, Claude and ChatGPT read your notes live, so the knowledge is current. OKF is for the day you want the files to leave with you.
大多数时候你根本不需要导出。通过 MCP 服务器，Claude 和 ChatGPT 可以实时读取你的笔记，因此知识始终是最新的。OKF 的意义在于，当你某天想要带走这些文件时，它们随时可用。

### Try it
### 尝试一下

*   The spec and reference tools: [GoogleCloudPlatform/knowledge-catalog/okf](https://github.com/GoogleCloudPlatform/knowledge-catalog/okf)
*   A longer write-up on the ownership angle: [hjarni.com/blog/open-knowledge-format](https://hjarni.com/blog/open-knowledge-format)
*   Hjarni exports and imports OKF bundles from real notes, folders, tags, and wiki-links.
*   Google Cloud choosing Markdown, folders, and links is the interesting signal. Agent-readable knowledge does not need to start with a database.

*   规范与参考工具：[GoogleCloudPlatform/knowledge-catalog/okf](https://github.com/GoogleCloudPlatform/knowledge-catalog/okf)
*   关于所有权角度的深度文章：[hjarni.com/blog/open-knowledge-format](https://hjarni.com/blog/open-knowledge-format)
*   Hjarni 支持从真实的笔记、文件夹、标签和 Wiki 链接中导出和导入 OKF 包。
*   Google Cloud 选择 Markdown、文件夹和链接是一个有趣的信号。智能体可读的知识库并不一定非要从数据库开始。