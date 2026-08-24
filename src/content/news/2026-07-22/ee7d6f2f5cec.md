---
title: "ayghri / i-have-adhd"
originalUrl: "https://github.com/ayghri/i-have-adhd"
date: "2026-07-21T22:18:06.499Z"
---

# ayghri / i-have-adhd

ADHD-friendly outputs. No ADHD diagnosis needed!
专为 ADHD（注意力缺陷多动障碍）用户优化的输出格式。无需诊断证明即可使用！

Install Claude Code: `claude plugin marketplace add ayghri/i-have-adhd`, `claude plugin install i-have-adhd@i-have-adhd`. Then type `/i-have-adhd`. No local clone needed — Claude Code fetches the repo and keeps it updated.
安装 Claude Code：运行 `claude plugin marketplace add ayghri/i-have-adhd` 和 `claude plugin install i-have-adhd@i-have-adhd`，然后输入 `/i-have-adhd`。无需本地克隆仓库——Claude Code 会自动获取并保持更新。

Codex: `codex plugin marketplace add ayghri/i-have-adhd --ref main`, `codex plugin add i-have-adhd@i-have-adhd`. Then type `$i-have-adhd` to apply the output style explicitly. The skill can also be invoked implicitly when Codex sees a task that benefits from it. Install instructions for other coding agents live in `INSTALL.md`.
Codex：运行 `codex plugin marketplace add ayghri/i-have-adhd --ref main` 和 `codex plugin add i-have-adhd@i-have-adhd`，然后输入 `$i-have-adhd` 即可显式应用该输出风格。当 Codex 识别到适合此风格的任务时，该技能也会被隐式调用。其他编程代理的安装说明请参阅 `INSTALL.md`。

What it does: A skill for your coding assistant that stops it from burying the answer. Action first. Steps numbered. No "Hope this helps!"
它的功能：为你的编程助手提供一项技能，防止它把核心答案藏在长篇大论中。优先展示行动建议，步骤进行编号，且不再出现“希望这对你有帮助！”之类的废话。

What changes:
改变之处：

Before: "Great question! Let me think about this. Your auth flow has a few moving pieces: the middleware, the token verification, and the cookie handling. Looking at src/auth.ts, the verifyToken function (around lines 42-58) seems to be using an older jsonwebtoken API. One approach would be to update the package and rewrite that function. After making the change, you'd want to run the auth tests to confirm nothing breaks. By the way, you might also want to look at your dependency versions overall. Hope this helps! Let me know if you want to dig deeper."
修改前：“好问题！让我思考一下。你的身份验证流程涉及几个部分：中间件、令牌验证和 Cookie 处理。查看 src/auth.ts，verifyToken 函数（约 42-58 行）似乎使用了较旧的 jsonwebtoken API。一种方法是更新包并重写该函数。修改后，你需要运行身份验证测试以确保没有破坏任何功能。顺便说一句，你可能还需要检查一下整体的依赖版本。希望这对你有帮助！如果你想深入了解，请告诉我。”

After: "Run `npm install jsonwebtoken@latest`, then edit `src/auth.ts:42`. Open `src/auth.ts`. Replace `verifyToken` (lines 42–58) with the snippet below. Run `npm test -- auth.spec.ts`. Next: paste the first failing line if any test fails."
修改后：“运行 `npm install jsonwebtoken@latest`，然后编辑 `src/auth.ts:42`。打开 `src/auth.ts`。将 `verifyToken`（42-58 行）替换为下方的代码片段。运行 `npm test -- auth.spec.ts`。下一步：如果有测试失败，请粘贴第一行失败信息。”

The rules: 10 rules. Full text in `SKILL.md`. Lead with the next action. Number multi-step tasks. End with one concrete next step. Suppress tangents. Restate state every turn. Specific time estimates (minutes, not "a bit"). Make wins visible. Matter-of-fact errors. Cap lists at 5 items. No preamble. No recap. No closers.
规则：共 10 条规则，全文见 `SKILL.md`。以“下一步行动”开头；多步骤任务必须编号；以一个具体的后续步骤结尾；禁止跑题；每轮对话重述当前状态；提供具体的时间预估（以分钟计，而非“一会儿”）；让进展清晰可见；客观陈述错误；列表上限为 5 项；无前言；无总结；无结束语。

Tune it: Fork, edit `skills/i-have-adhd/SKILL.md`, install your fork: `claude plugin marketplace add <your-username>/i-have-adhd`. Re-invoke `/i-have-adhd`.
自定义：Fork 本仓库，编辑 `skills/i-have-adhd/SKILL.md`，然后安装你自己的分支：`claude plugin marketplace add <your-username>/i-have-adhd`。重新调用 `/i-have-adhd` 即可。

Credits: Loosely based on *The Adult ADHD Tool Kit* by J. Russell Ramsay and Anthony L. Rostain. Adapted for how an LLM should respond, not how a human should organize their day.
致谢：灵感源自 J. Russell Ramsay 和 Anthony L. Rostain 所著的《成人 ADHD 工具包》(The Adult ADHD Tool Kit)。针对 LLM 的响应方式进行了适配，而非人类的时间管理方式。

License: MIT. Star ⭐ if it saved you one scroll past one "Great question!"
许可证：MIT。如果它为你节省了滚动跳过“好问题！”的时间，请点个星 ⭐。