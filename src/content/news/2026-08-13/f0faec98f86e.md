---
title: "cathrynlavery / diagram-design"
originalUrl: "https://github.com/cathrynlavery/diagram-design"
date: "2026-08-12T22:17:41.767Z"
---

# cathrynlavery / diagram-design

**Diagram Design: Editorial diagrams your designer won't hate.**
**Diagram Design：让你的设计师不再反感的编辑级图表。**

New in 2.0 — the Loop: flywheels with a shared-memory hub. The dashed lines are the write-backs. 27 types. One agent skill for Claude Code, Codex, and Pi.
2.0 版本新特性 —— Loop（循环）：带有共享内存枢纽的飞轮。虚线表示回写路径。包含 27 种图表类型。为 Claude Code、Codex 和 Pi 提供统一的智能体技能（Agent Skill）。

Your brand in 60 seconds — the skill reads your website and maps colors + fonts to every diagram. Already have diagrams in draw.io or Mermaid? Point it at the source and it redraws them at the format, size, and level of detail your audience needs. No Figma. No generic rounded boxes. No 30-minute color-picking sessions.
60 秒内植入你的品牌 —— 该技能可读取你的网站，并将配色和字体映射到每一张图表中。已经有了 draw.io 或 Mermaid 格式的图表？只需指向源文件，它就能根据受众所需的格式、尺寸和细节级别进行重绘。无需 Figma，没有通用的圆角矩形，也不需要 30 分钟的配色调整。

**Why I built it**
**我为何开发它**

I write at littlemight.com (and run BestSelf.co on the side). Every time I needed a diagram — an architecture sketch, a flowchart, a pyramid of what matters most — I'd ask Claude and get back a generic rounded-box thing that looked nothing like the rest of the site. I'd either fight with Figma for 30 minutes or just skip the diagram. So I built a Claude Code skill for it. Twenty-seven types, editorial quality, matches your brand in 60 seconds by reading your website.
我在 littlemight.com 写作（同时也经营 BestSelf.co）。每当我需要图表时——无论是架构草图、流程图，还是重要性金字塔——我问 Claude 得到的总是那种平庸的圆角矩形，与网站整体风格格格不入。我要么得在 Figma 里折腾 30 分钟，要么干脆放弃画图。所以我为它开发了一个 Claude Code 技能。它包含 27 种类型，具备编辑级质量，且能在 60 秒内通过读取你的网站来匹配你的品牌风格。

The highest-quality move is usually deletion. Every node earns its place. The accent color is reserved for the 1–2 things the reader should look at first. Target density: 4/10.
最高质量的操作通常是“删除”。每一个节点都必须有其存在的意义。强调色仅保留给读者最先需要关注的 1-2 个重点。目标密度：4/10。

**What it makes**
**它能生成什么**

All 27 diagrams ship in three variants: minimal light, minimal dark, and full-editorial. Open any of them directly in a browser — no build step, no JS, no external images.
所有 27 种图表均提供三种变体：极简亮色、极简暗色和完整编辑版。直接在浏览器中打开即可——无需构建步骤，无需 JS，无需外部图片。

*   **Architecture**: Components + connections
*   **Flowchart**: Decision logic
*   **Sequence**: Messages over time
*   **State machine**: States + transitions
*   **ER / data model**: Entities + fields
*   **Timeline**: Events on an axis
*   **Swimlane**: Cross-functional flow
*   **Quadrant**: Two-axis positioning
*   **Nested**: Hierarchy by containment
*   **Tree**: Parent → children
*   **Org chart**: Ownership + routing
*   **Venn**: Set overlap
*   **Layer stack**: Stacked abstractions
*   **Pyramid / funnel**: Ranked hierarchy or drop-off
*   **Consultant 2×2**: Scenario matrix · named cells
*   **Radar / Spider**: Multi-axis comparison
*   **Loop**: Flywheel · stations around a hub
*   **IT current-state**: Legacy landscape · modernization
*   **High-Level**: End-to-end stack on a cluster
*   **Bar chart**: Categorical comparison
*   **Line chart**: Trends over time
*   **Gantt**: Tasks and phases on a timeline
*   **Scatter plot**: Distribution and correlation
*   **Process**: Multi-actor sequential workflow
*   **Medallion**: Multi-tier data storage
*   **Data flow**: Role-scoped pipeline steps
*   **DP integration**: Sources → core → consumers
*   **DP security matrix**: Per-role access permissions

*   **架构 (Architecture)**：组件 + 连接
*   **流程图 (Flowchart)**：决策逻辑
*   **时序图 (Sequence)**：随时间传递的消息
*   **状态机 (State machine)**：状态 + 转换
*   **ER / 数据模型 (ER / data model)**：实体 + 字段
*   **时间轴 (Timeline)**：轴上的事件
*   **泳道图 (Swimlane)**：跨职能流程
*   **象限图 (Quadrant)**：双轴定位
*   **嵌套图 (Nested)**：包含关系层级
*   **树状图 (Tree)**：父级 → 子级
*   **组织架构图 (Org chart)**：归属权 + 路由
*   **韦恩图 (Venn)**：集合重叠
*   **层叠图 (Layer stack)**：堆叠的抽象
*   **金字塔 / 漏斗图 (Pyramid / funnel)**：分级层级或流失率
*   **咨询 2×2 矩阵 (Consultant 2×2)**：场景矩阵 · 命名单元格
*   **雷达 / 蜘蛛图 (Radar / Spider)**：多轴比较
*   **循环图 (Loop)**：飞轮 · 枢纽周围的站点
*   **IT 现状 (IT current-state)**：遗留景观 · 现代化
*   **高层级图 (High-Level)**：集群上的端到端堆栈
*   **柱状图 (Bar chart)**：分类比较
*   **折线图 (Line chart)**：随时间变化的趋势
*   **甘特图 (Gantt)**：时间轴上的任务和阶段
*   **散点图 (Scatter plot)**：分布与相关性
*   **流程 (Process)**：多参与者顺序工作流
*   **奖章图 (Medallion)**：多层数据存储
*   **数据流 (Data flow)**：角色范围内的管道步骤
*   **DP 集成 (DP integration)**：源 → 核心 → 消费者
*   **DP 安全矩阵 (DP security matrix)**：按角色的访问权限

**Browse the live gallery:** cathrynlavery.github.io/diagram-design — or open `skills/diagram-design/assets/index.html` locally to flip through all 27 diagrams with light / dark / full-editorial tabs.
**浏览在线图库：** cathrynlavery.github.io/diagram-design —— 或者在本地打开 `skills/diagram-design/assets/index.html`，通过亮色/暗色/完整编辑版标签页查看所有 27 种图表。

**Install**
**安装**

*   **Pi**: `pi install https://github.com/cathrynlavery/diagram-design`
    Run `/reload` in an open Pi session. Pi makes the skill available for matching diagram requests; use `/skill:diagram-design` to invoke it explicitly. Pi also loads the `/export-diagram` prompt template.
    在打开的 Pi 会话中运行 `/reload`。Pi 会使该技能可用于匹配图表请求；使用 `/skill:diagram-design` 可显式调用它。Pi 还会加载 `/export-diagram` 提示词模板。

*   **Claude Code**: `/plugin marketplace add cathrynlavery/diagram-design` then `/plugin install diagram-design@diagram-design`

*   **Claude Cowork**: Customize → Directory → Plugins → + → paste `cathrynlavery/diagram-design` → Sync, then install from the Personal list.

*   **Codex**: `npx skills add https://github.com/cathrynlavery/diagram-design --skill diagram-design`

**Editable install**
**可编辑安装**

Managed installs are convenient, but changes to `references/style-guide.md` may be replaced by package updates. Clone the repo and install the local path if you plan to customize the style guide:
托管安装很方便，但对 `references/style-guide.md` 的修改可能会被包更新覆盖。如果你计划自定义样式指南，请克隆仓库并安装本地路径：

```bash
git clone git@github.com:cathrynlavery/diagram-design.git ~/code/diagram-design
# Pi: register the checkout as a local package
pi install ~/code/diagram-design
# Claude Code: symlink the inner skill
ln -s ~/code/diagram-design/skills/diagram-design ~/.claude/skills/diagram-design
```

The shared skill lives at `skills/diagram-design/`. Pi discovers it through the repo's standard `skills/` package directory; Claude Code, Codex, and other Agent Skills-compatible tools use the same files.
共享技能位于 `skills/diagram-design/`。Pi 通过仓库标准的 `skills/` 包目录发现它；Claude Code、Codex 和其他兼容 Agent Skills 的工具使用相同的文件。

**Onboarding — make it look like your brand**
**入职引导 —— 让它看起来像你的品牌**

The whole point: ship editorial-quality diagrams in your colors and typography, not a generic template. Out of the box, diagrams render in a clean jet-black + atomic-tangerine palette (white-smoke paper, jet-black ink, atomic-tangerine accent, blue-slate muted, silver hairlines). Good enough to screenshot straight away. But 60 seconds of onboarding is better — the skill will pull your brand from your website and apply it across every diagram.
核心目的：交付具备编辑质量、符合你品牌配色和字体的图表，而不是通用的模板。开箱即用，图表以干净的“喷气黑 + 原子橘”配色呈现（白烟色纸张、喷气黑墨水、原子橘强调色、蓝板岩静音色、银色细线）。直接截图即可使用。但 60 秒的入职引导效果更好——该技能会从你的网站提取品牌风格，并将其应用到每一张图表中。

**The flow**
**流程**

*   **You**: "onboard diagram-design to https://yoursite.com"
*   **Agent**:
    *   fetches the homepage
    *   extracts the dominant palette + font stack
    *   maps detected values to semantic roles: paper, ink, muted, accent, link
    *   shows a proposed diff
    *   writes your tokens to `references/style-guide.md`
*   **You**: "yes, apply it"

*   **你**：“onboard diagram-design to https://yoursite.com”
*   **智能体**：
    *   抓取主页
    *   提取主色调 + 字体栈
    *   将检测到的值映射到语义角色：纸张、墨水、静音色、强调色、链接
    *   展示建议的差异对比
    *   将你的 Token 写入 `references/style-guide.md`
*   **你**：“yes, apply it”

Every new diagram now uses your colors. Your website's paper color becomes the diagram background. Your CTA color becomes the focal accent. Your body font stack becomes the node label family.
现在，每一张新图表都会使用你的配色。你网站的背景色将成为图表的背景色。你的 CTA（行动号召）颜色将成为焦点强调色。你的正文字体栈将成为节点标签字体。

**What gets extracted**
**提取内容**

| Detected from your site | Becomes |
| :--- | :--- |
| `<body>` background | paper token |
| Primary text color | ink token |
| Secondary / caption text | muted token |
| Cards or containers | paper-2 token |
| Most-used brand color (CTA, link, heading) | accent token |
| `<h1>` font family | title font |
| `<body>` font family | node-name font |
| `<code>` / `<pre>` font | sublabel font |

| 从你的网站检测到 | 变为 |
| :--- | :--- |
| `<body>` 背景 | 纸张 Token |
| 主要文本颜色 | 墨水 Token |
| 次要/标题文本 | 静音色 Token |
| 卡片或容器 | 纸张-2 Token |
| 最常用的品牌色 (CTA, 链接, 标题) | 强调色 Token |
| `<h1>` 字体族 | 标题字体 |
| `<body>` 字体族 | 节点名称字体 |
| `<code>` / `<pre>` 字体 | 子标签字体 |

**Contrast checks happen automatically**
**自动进行对比度检查**

Before writing tokens, the skill verifies WCAG AA contrast on ink over paper. If your site has a color that fails contrast at diagram sizes (9–12px), it proposes an adjusted value and explains why.
在写入 Token 之前，该技能会验证墨水在纸张上的 WCAG AA 对比度。如果你的网站颜色在图表尺寸（9–12px）下对比度不达标，它会建议一个调整后的值并说明原因。

**Accessible by default**
**默认可访问**

Every diagram template gives the inline SVG an accessible name and description: `role="img"`, a resolving `aria-labelledby`, and first-child `<title>` / `<desc>` slots. IDs are prefixed per diagram and variant, so multiple SVG exports can be safely inlined on one page without duplicate accessible-name IDs. Decorative specimen icons are hidden from assistive technology instead.
每个图表模板都为内联 SVG 提供了可访问的名称和描述：`role="img"`、解析后的 `aria-labelledby` 以及首个子元素 `<title>` / `<desc>` 插槽。ID 会根据图表和变体添加前缀，因此多个 SVG 导出可以安全地内联在同一页面上，而不会出现重复的可访问名称 ID。装饰性的样本图标则会被辅助技术隐藏。

**Manual override**
**手动覆盖**

Prefer to set tokens by hand? Open `skills/diagram-design/references/style-guide.md` and edit the table. Everything downstream reads from there — all 27 diagrams, the annotation primitive, and the gallery.
更喜欢手动设置 Token？打开 `skills/diagram-design/references/style-guide.md` 并编辑表格即可。下游的所有内容——包括全部 27 种图表、标注原语和图库——都会从那里读取数据。