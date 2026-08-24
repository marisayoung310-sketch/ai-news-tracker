---
title: "Show HN: Files.md – Open-source alternative to Obsidian"
originalUrl: "https://github.com/zakirullin/files.md"
date: "2026-05-18T22:17:09.972Z"
---

# Show HN: Files.md – Obsidian 的开源替代品

Files.md is a simple application for your .md files. Private, no data is sent to server. You can store whole your life: 📌 Notes 📝 Documents, Projects 💚 Journal, Habits ✅ Checklists, Tasks. All in plain .md files, local-first. LLM-friendly. Try it out: app.files.md (Beta). Main site: files.md.
Files.md 是一个针对 .md 文件设计的简洁应用。它注重隐私，不会向服务器发送任何数据。你可以用它记录生活的方方面面：📌 笔记、📝 文档与项目、💚 日记与习惯、✅ 清单与任务。所有内容均以纯 .md 文件存储，遵循“本地优先”原则，且对大语言模型（LLM）友好。欢迎试用：app.files.md (Beta)。主站：files.md。

You should own your files, and the software that opens them. You grow your knowledge with your brain. You grow software around it with an LLM. Both can last through the ages. I have been building this project for 5 years. Sponsor it on GitHub 💚.
你应该拥有自己的文件，以及打开这些文件的软件。你用大脑增长知识，用 LLM 构建围绕知识的软件。两者都可以历久弥新。这个项目我已经开发了 5 年。欢迎在 GitHub 上赞助支持 💚。

Another note taking app? Maybe. But this time: Only necessary features, restrictions foster creativity. No need to install anything, all you need is a browser. Works offline. Local-first, files don't leave your device. Free and open source. Extremely simple code. One person or an LLM can fit the whole project in head. The codebase is ready for your LLM to extend to your needs. Portable, no build systems, just open web/index.html. Optional out of the box synchronization. The server is just one binary (or use iCloud/Dropbox/Google Drive for sync). Telegram chatbot for on-the-go access to your files.
又一个笔记应用？也许吧。但这次不同的是：只提供必要功能，限制反而能激发创造力。无需安装，只需浏览器即可使用。支持离线工作。本地优先，文件不出设备。免费且开源。代码极其简洁，一个人或一个 LLM 就能完全理解整个项目。代码库已准备好让你的 LLM 根据需求进行扩展。便携，无需构建系统，直接打开 web/index.html 即可。提供可选的开箱即用同步功能。服务器仅为一个二进制文件（或者你可以使用 iCloud/Dropbox/Google Drive 进行同步）。支持 Telegram 聊天机器人，方便随时随地访问你的文件。

### Ways to use it (使用方式)

| Setup (设置) | Where your files live (文件位置) | Sync across devices (跨设备同步) | Server needed (是否需要服务器) | Best for (适用场景) |
| :--- | :--- | :--- | :--- | :--- |
| Local-first (default) | A folder on your device | No | None | Maximum privacy, your data doesn't leave your device |
| 本地优先 (默认) | 设备上的文件夹 | 否 | 无 | 极致隐私，数据不出设备 |
| Cloud-folder sync | Your existing cloud folder | Yes | None (cloud provider) | Sync across devices without running a server |
| 云文件夹同步 | 你现有的云文件夹 | 是 | 无 (云服务商) | 无需运行服务器即可跨设备同步 |
| Self-hosted server | Your own (or local) server | Yes | One Go binary | Full control, sync between devices, optional Telegram bot integration |
| 自托管服务器 | 你自己的 (或本地) 服务器 | 是 | 一个 Go 二进制文件 | 完全掌控，设备间同步，可选 Telegram 机器人集成 |
| Hosted (app.files.md) | Our managed server | Yes | api.files.md | Try it instantly, no setup |
| 托管版 (app.files.md) | 我们的托管服务器 | 是 | api.files.md | 即刻试用，无需设置 |

### How to use (如何使用)

Open app.files.md in Chrome browser. Click "Install files.md" on the right side of the address bar. Open a local folder to persist changes. Occasionally hit force-refresh (Cmd+Shift+R) to get new updates.
在 Chrome 浏览器中打开 app.files.md。点击地址栏右侧的“安装 files.md”。打开一个本地文件夹以保存更改。偶尔执行强制刷新 (Cmd+Shift+R) 以获取最新更新。

Dump your thoughts: You can use chat to quickly dump your thoughts. It will be synchronized across all devices. Open the chat and send a message: Choose where to save (can do later). With this flow you can quickly save notes, tasks, journal records and checklists. Save things in the chatbot. Open the chat, write something and press Enter: That's it. Telegram Bot. Other messengers will follow.
倾倒你的想法：你可以使用聊天功能快速记录想法，它会在所有设备间同步。打开聊天窗口并发送消息：选择保存位置（以后再选也可以）。通过这种流程，你可以快速保存笔记、任务、日记记录和清单。在聊天机器人中保存内容：打开聊天，写下内容并按回车：搞定。Telegram 机器人支持已上线，其他通讯软件后续跟进。

### How to think deeply (如何深度思考)

Connect ideas. Let them compound. Think through. I used app.files.md to grow my knowledge about brain and software development. I added new notes to either brain or dev folders. One idea per note. I made connections between the relevant notes in the web app (type `[`). Everything is connected, just as in our brain. I spent time travelling through the notes and thinking it through. At one point, some brain and dev notes appeared very related. This connection between two different domains produced an insight. I wrote an article based on that insight: Cognitive Load in Software Development.
连接想法。让它们产生复利。深入思考。我使用 app.files.md 来增长关于大脑和软件开发的知识。我将新笔记添加到 brain 或 dev 文件夹中。一则笔记只写一个想法。我在 Web 应用中建立了相关笔记之间的连接（输入 `[`）。一切都是互联的，就像我们的大脑一样。我花时间浏览笔记并进行深度思考。在某个时刻，一些关于大脑和开发的笔记显得非常相关。这两个不同领域之间的连接产生了一个洞察。我基于这个洞察写了一篇文章：《软件开发中的认知负荷》。

All this activity helped me to: Think deeply (which is very important in the AI-age). Think systematically and see the bigger picture. Write insightful texts. To achieve all that, you'll have to use your brain, not advanced templates or AI workflows. Start with no structure at all, 0 folders. One idea per note. Every note should be understood without context. Apply new knowledge immediately, don't save it for future self. Link related notes. Revisit your notes and think through. My friends and I have been using this simple setup for five years, and it works well.
所有这些活动帮助我：深度思考（这在 AI 时代非常重要）。系统性思考并看到全局。写出有见地的文章。要实现这一切，你必须使用你的大脑，而不是高级模板或 AI 工作流。从零结构开始，0 文件夹。一则笔记一个想法。每则笔记都应脱离上下文即可被理解。立即应用新知识，不要留给未来的自己。链接相关笔记。重温笔记并深入思考。我和朋友们使用这种简单的设置已经五年了，效果很好。

### Second Brain? (第二大脑？)

I'll quote "I Deleted My Second Brain": Obsidian is a brilliant piece of software. I love it, dearly. But like anything, without restraint, it can also be a trap. Markdown files in nested folders. Plugins that track your productivity. Graph views that suggest omniscience. There’s an illusion of mastery in watching your notes web into constellations. But constellations are projections. They tell stories. They do not guarantee understanding.
引用《我删除了我的第二大脑》中的话：Obsidian 是一款出色的软件。我非常喜欢它。但像任何事物一样，如果没有节制，它也可能成为一个陷阱。嵌套文件夹中的 Markdown 文件。追踪生产力的插件。暗示全知的图谱视图。看着笔记织成星座图会产生一种掌控感的错觉。但星座只是投影。它们讲述故事，却不能保证理解。

When I first started using PKM tools, I believed I was solving a problem of forgetting. Later, I believed I was solving a problem of integration. Eventually, I realized I had created a new problem: deferral. The more my system grew, the more I deferred the work of thought to some future self who would sort, tag, distill, and extract the gold. That self never arrived.
当我刚开始使用个人知识管理（PKM）工具时，我以为我在解决遗忘问题。后来，我以为我在解决整合问题。最终，我意识到我制造了一个新问题：拖延。系统增长得越多，我就越把思考的工作推迟给未来的自己，指望未来的自己去分类、打标签、提炼和提取精华。但那个“未来的自己”从未出现。

The Second Brain is thrilling. Advanced guru templates, plugins and AI workflows... One wants to scrape the wisdom of the whole internet. There's some beauty in this neat system. Every new note brings dopamine. Second Brain gets better and better. However, the first brain never actually gets smarter. And that's an issue - in the AI age, your first brain is as valuable as ever. Use your brain to think through the notes. The tool is not important, your thinking is.
“第二大脑”令人兴奋。高级的大师模板、插件和 AI 工作流……人们想要抓取整个互联网的智慧。这种整洁的系统确实有其美感。每一则新笔记都能带来多巴胺。第二大脑变得越来越好。然而，第一大脑（你自己的大脑）并没有真正变得更聪明。这是一个问题——在 AI 时代，你的第一大脑依然价值连城。用你的大脑去思考笔记。工具不重要，你的思考才重要。

Before adding a new note, try to answer these questions: How this new knowledge can sharpen my judgment or expand my taxonomy? How can I see the world differently, given this new knowledge?
在添加新笔记之前，试着回答这些问题：这些新知识如何能磨练我的判断力或扩展我的分类体系？有了这些新知识，我该如何以不同的方式看待世界？

Notes can prevent experience. Reading and taking notes can easily fool us into believing that we understand a text. We think we understand, but in reality we just know. At some point our "knowing" is so good, that we start feeling that we actually do it (or at least tried). The worst thing is that we don’t let new experiences emerge because we already have knowledge. It's a knowledge barrier. Life gives us opportunities to live through new experiences, but we refuse, because "we already know".
笔记可能会阻碍体验。阅读和做笔记很容易让我们产生一种错觉，以为自己理解了文本。我们以为自己理解了，但实际上我们只是“知道”了。在某个阶段，我们的“知道”变得如此熟练，以至于我们开始感觉自己真的做到了（或者至少尝试过）。最糟糕的是，因为我们已经有了知识，所以不再让新的体验发生。这是一种知识壁垒。生活给了我们体验新事物的机会，但我们拒绝了，因为“我们已经知道了”。

Self-help through reading and taking notes? 🧘‍ Harm caused at the emotional level must be healed at the emotional level. Not through intellectual work and taking notes. Reading without action is entertainment. A form of procrastination. No amount of self-help books can heal emotional wounds. What can help is psychotherapy, rescripting and chair work. Meditation. Healing happens by feeling.
通过阅读和做笔记来寻求自我帮助？🧘‍ 情感层面的伤害必须在情感层面治愈，而不是通过智力工作和做笔记。没有行动的阅读只是娱乐，是一种拖延。再多的自助书籍也无法治愈情感创伤。真正有帮助的是心理治疗、重写剧本和空椅技术。冥想。治愈源于感受。

When to take notes: If your goal is to: Develop a deeper, more structured understanding of something; Do research; Write an article or a book; Then taking notes is perfect.
何时做笔记：如果你的目标是：对某事形成更深入、更结构化的理解；进行研究；撰写文章或书籍；那么做笔记是完美的。