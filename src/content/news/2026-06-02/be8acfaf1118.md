---
title: "pbakaus / impeccable"
originalUrl: "https://github.com/pbakaus/impeccable"
date: "2026-06-01T23:16:56.416Z"
---

# pbakaus / impeccable

Impeccable: The vocabulary you didn't know you needed. 1 skill, 23 commands, and curated anti-patterns for impeccable frontend design. Quick start: Visit impeccable.style to download ready-to-use bundles.
Impeccable：一套你意想不到但确实需要的词汇表。它包含 1 项技能、23 条指令以及精心策划的反模式指南，旨在实现完美的各种前端设计。快速开始：访问 impeccable.style 下载即用型安装包。

Why Impeccable? Anthropic's frontend-design was the first widely-used design skill for Claude. Impeccable started from there. Every model trained on the same SaaS templates. Skip the guidance and you get the same handful of tells on every project: Inter for everything, purple-to-blue gradients, cards nested in cards, gray text on colored backgrounds, the rounded-square icon tile above every heading.
为什么选择 Impeccable？Anthropic 的 frontend-design 是 Claude 首个被广泛使用的设计技能，Impeccable 正是基于此发展而来。目前每个 AI 模型都基于相同的 SaaS 模板进行训练，如果跳过设计指导，你会在每个项目中看到同样的“AI 味”：通篇使用 Inter 字体、紫到蓝的渐变色、卡片套卡片、彩色背景上的灰色文字，以及每个标题上方圆角正方形的图标块。

Impeccable adds: 7 domain reference files (view source). Typography, color, motion, spatial, interaction, responsive, UX writing. Load on every command, alongside a brand-vs-product register that adjusts the defaults.
Impeccable 增加了 7 个领域参考文件（查看源码）：排版、色彩、动效、空间、交互、响应式和 UX 文案。这些文件会在执行每条指令时加载，并配合品牌与产品的注册表来调整默认设置。

23 commands. A shared design vocabulary with your AI: polish, audit, critique, distill, animate, bolder, quieter, and more. 27 deterministic anti-pattern rules plus a 12-rule LLM critique pass. CLI and browser extension run the deterministic ones with no LLM and no API key. Each is tied to specific design guidance the skill teaches against.
23 条指令，为你与 AI 之间建立了一套共享的设计词汇：润色（polish）、审计（audit）、评估（critique）、提炼（distill）、动画（animate）、加粗（bolder）、减弱（quieter）等。包含 27 条确定性反模式规则，以及 12 条 LLM 评估准则。CLI 和浏览器扩展可以在无需 LLM 和 API Key 的情况下运行这些确定性规则，每一条都对应着该技能所针对的具体设计指导。

### What's Included (包含内容)

**The Skill: impeccable**
A comprehensive design skill with 7 domain-specific references (view skill):
**技能：impeccable**
一套全面的设计技能，包含 7 个领域特定的参考资料（查看技能）：

*   **Reference Covers:**
    *   **typography:** Type systems, font pairing, modular scales, OpenType
    *   **color-and-contrast:** OKLCH, tinted neutrals, dark mode, accessibility
    *   **spatial-design:** Spacing systems, grids, visual hierarchy
    *   **motion-design:** Easing curves, staggering, reduced motion
    *   **interaction-design:** Forms, focus states, loading patterns
    *   **responsive-design:** Mobile-first, fluid design, container queries
    *   **ux-writing:** Button labels, error messages, empty states
*   **参考涵盖：**
    *   **排版：** 字体系统、字体搭配、模块化比例、OpenType
    *   **色彩与对比度：** OKLCH、带色调的中性色、深色模式、可访问性
    *   **空间设计：** 间距系统、网格、视觉层级
    *   **动效设计：** 缓动曲线、交错动画、减少运动
    *   **交互设计：** 表单、焦点状态、加载模式
    *   **响应式设计：** 移动优先、流式设计、容器查询
    *   **UX 文案：** 按钮标签、错误信息、空状态

### 23 Commands (23 条指令)
All commands are accessed through `/impeccable`:
所有指令均通过 `/impeccable` 调用：

| Command | What it does | 指令 | 功能描述 |
| :--- | :--- | :--- | :--- |
| `/impeccable craft` | Full shape-then-build flow | `/impeccable craft` | 完整的“先塑形后构建”流程 |
| `/impeccable init` | One-time setup | `/impeccable init` | 一次性设置 |
| `/impeccable document` | Generate root DESIGN.md | `/impeccable document` | 生成根目录 DESIGN.md |
| `/impeccable extract` | Pull reusable components | `/impeccable extract` | 提取可复用组件 |
| `/impeccable shape` | Plan UX/UI before code | `/impeccable shape` | 编码前规划 UX/UI |
| `/impeccable critique` | UX design review | `/impeccable critique` | UX 设计评审 |
| `/impeccable audit` | Technical quality checks | `/impeccable audit` | 技术质量检查 |
| `/impeccable polish` | Final pass | `/impeccable polish` | 最终润色 |
| `/impeccable bolder` | Amplify boring designs | `/impeccable bolder` | 加强平庸设计 |
| `/impeccable quieter` | Tone down designs | `/impeccable quieter` | 弱化过度设计 |
| `/impeccable distill` | Strip to essence | `/impeccable distill` | 提炼核心 |
| `/impeccable harden` | Error handling, i18n | `/impeccable harden` | 错误处理、国际化 |
| `/impeccable onboard` | First-run flows | `/impeccable onboard` | 首次运行流程 |
| `/impeccable animate` | Add purposeful motion | `/impeccable animate` | 添加有意义的动效 |
| `/impeccable colorize` | Introduce strategic color | `/impeccable colorize` | 引入策略性色彩 |
| `/impeccable typeset` | Fix font/hierarchy | `/impeccable typeset` | 修复字体与层级 |
| `/impeccable layout` | Fix layout/spacing | `/impeccable layout` | 修复布局与间距 |
| `/impeccable delight` | Add moments of joy | `/impeccable delight` | 添加愉悦感 |
| `/impeccable overdrive` | Extraordinary effects | `/impeccable overdrive` | 添加超凡效果 |
| `/impeccable clarify` | Improve UX copy | `/impeccable clarify` | 优化 UX 文案 |
| `/impeccable adapt` | Adapt for devices | `/impeccable adapt` | 适配不同设备 |
| `/impeccable optimize` | Performance improvements | `/impeccable optimize` | 性能优化 |
| `/impeccable live` | Visual variant mode | `/impeccable live` | 视觉变体模式 |

Use `/impeccable pin <command>` to create standalone shortcuts (e.g., `pin audit` creates `/audit`).
使用 `/impeccable pin <command>` 创建独立快捷方式（例如，`pin audit` 会创建 `/audit` 指令）。

### Anti-Patterns (反模式)
The skill includes explicit guidance on what to avoid:
该技能包含明确的避坑指南：
*   Don't use overused fonts (Arial, Inter, system defaults)
*   Don't use gray text on colored backgrounds
*   Don't use pure black/gray (always tint)
*   Don't wrap everything in cards or nest cards inside cards
*   Don't use bounce/elastic easing (feels dated)
*   不要使用过度使用的字体（Arial、Inter、系统默认字体）
*   不要在彩色背景上使用灰色文字
*   不要使用纯黑/纯灰（始终带点色调）
*   不要把所有东西都包在卡片里，或进行卡片嵌套
*   不要使用弹跳/弹性缓动（显得过时）

### Installation (安装)
**Option 1: CLI installer (Recommended)**
From the root of your project, run: `npx impeccable skills install`
This auto-detects your harness and writes the build to the right location. Works with Cursor, Claude Code, Gemini CLI, Codex CLI, etc.
**选项 1：CLI 安装程序（推荐）**
在项目根目录下运行：`npx impeccable skills install`
它会自动检测你的开发环境并将构建文件写入正确位置。适用于 Cursor、Claude Code、Gemini CLI、Codex CLI 等。

**Option 2: Download from Website**
Visit impeccable.style, download the ZIP for your tool, and extract to your project.
**选项 2：从官网下载**
访问 impeccable.style，下载对应工具的 ZIP 包并解压到你的项目中。

**Option 3: Copy from Repository**
Manual copy instructions are provided for Cursor, Claude Code, OpenCode, Pi, Gemini CLI, Codex CLI, GitHub Copilot, and Trae.
**选项 3：从仓库复制**
提供了针对 Cursor、Claude Code、OpenCode、Pi、Gemini CLI、Codex CLI、GitHub Copilot 和 Trae 的手动复制说明。