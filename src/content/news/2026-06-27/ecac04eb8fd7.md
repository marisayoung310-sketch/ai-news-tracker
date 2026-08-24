---
title: "kunchenguid / no-mistakes"
originalUrl: "https://github.com/kunchenguid/no-mistakes"
date: "2026-06-26T22:43:17.756Z"
---

# kunchenguid / no-mistakes

**git push no-mistakes**
Kill all the slop. Raise clean PR.

**git push no-mistakes**
消除所有冗余，提交整洁的 PR。

---

no-mistakes puts a local git proxy in front of your real remote. Push to no-mistakes instead of origin, and it spins up a disposable worktree, runs an AI-driven validation pipeline, forwards the branch to the configured push target only after every check passes, and opens a clean PR automatically.

no-mistakes 在你的真实远程仓库前设置了一个本地 git 代理。将代码推送到 no-mistakes 而非 origin，它会启动一个一次性的工作树（worktree），运行 AI 驱动的验证流水线。只有在所有检查通过后，它才会将分支转发到配置的推送目标，并自动开启一个整洁的 PR。

---

Non-blocking - the pipeline runs in an isolated worktree without disrupting your work.

非阻塞式——流水线在隔离的工作树中运行，不会干扰你的正常工作。

---

Agent-agnostic - claude, codex, rovodev, opencode, pi, copilot, or acp:<target> via acpx.

代理无关性——支持 claude、codex、rovodev、opencode、pi、copilot，或通过 acpx 使用 acp:<target>。

---

Agent-native - /no-mistakes lets your coding agent do a task and gate it, or gate existing committed work: it runs the pipeline, has the pipeline apply safe fixes, and escalates the rest to you.

代理原生支持——通过 /no-mistakes，你可以让编码代理执行任务并进行门控，或者对已提交的工作进行门控：它会运行流水线，应用安全修复，并将剩余问题升级给你处理。

---

Human stays in charge - auto-fix or review findings, your call.

人类掌控全局——自动修复或审查发现的问题，由你决定。

---

Clean PRs by default - push, open PR, watch CI, and auto-fix failures in one shot.

默认生成整洁的 PR——推送、开启 PR、监控 CI，并一次性自动修复失败项。

---

Full documentation: https://kunchenguid.github.io/no-mistakes/

完整文档：https://kunchenguid.github.io/no-mistakes/

---

### How it works

### 工作原理

```text
your branch │ git push no-mistakes ▼ 
┌──────────────────────────────────────────────┐ 
│ disposable worktree — your work stays put    │ 
│ review → test → docs → lint → push → PR → CI │ 
└──────────────────────────────────────────────┘ 
│ every check green ▼ 
clean PR, opened for you
```

Each step either passes on its own or stops with a finding for you to act on. Safe, mechanical fixes are applied automatically; anything that touches your intent is escalated for you to approve, fix, or skip. Nothing reaches the configured push target until every check is green.

每一步要么自动通过，要么在发现问题时停止，等待你处理。安全、机械性的修复会自动应用；任何涉及你意图的改动都会升级给你，由你决定批准、修复或跳过。在所有检查通过之前，没有任何内容会到达配置的推送目标。

---

### Install

### 安装

```bash
curl -fsSL https://raw.githubusercontent.com/kunchenguid/no-mistakes/main/docs/install.sh | sh
```

Windows, Go install, and build-from-source instructions are in the installation guide.

Windows、Go 安装以及从源码构建的说明请参考安装指南。

---

### Quick Start

### 快速开始

```bash
$ no-mistakes init
✓ Gate initialized
repo /Users/you/src/my-repo
gate no-mistakes → /Users/you/.no-mistakes/repos/abc123def456.git
remote git@github.com:you/my-repo.git
skill /no-mistakes installed for agents at user level
```

Push through the gate with: `git push no-mistakes <branch>`

通过门控推送：`git push no-mistakes <branch>`

```bash
$ git checkout my-branch
# do some work in the branch...
$ git push no-mistakes
* Pipeline started
Run no-mistakes to review.
$ no-mistakes # opens the TUI for the active run
```

For GitHub fork contributions, keep origin pointed at the parent repository and initialize with `no-mistakes init --fork-url <your-fork-url>`.

对于 GitHub fork 贡献，请保持 origin 指向父仓库，并使用 `no-mistakes init --fork-url <your-fork-url>` 进行初始化。

---

From the TUI you act on each finding: auto-fix ones are applied for you (or approve to let them), ask-user ones are a judgement call you approve, fix, or skip. Once every check is green, the gate forwards your branch to the configured push target and opens the PR for you, so there is no manual git push origin and no hand-written PR body.

在 TUI 中，你可以处理每一项发现：自动修复项会为你应用（或由你批准后应用），用户确认项则由你判断是批准、修复还是跳过。一旦所有检查通过，门控会将你的分支转发到配置的推送目标并为你开启 PR，因此无需手动执行 `git push origin`，也无需手写 PR 正文。

---

Prefer to let your coding agent drive the same flow headlessly? Use `/no-mistakes` (see below).

更喜欢让你的编码代理以无头模式驱动相同的流程？请使用 `/no-mistakes`（见下文）。

---

### Three ways to trigger the gate

### 触发门控的三种方式

Every change runs through the same pipeline. Pick the entry point that fits how you're working when the change is ready:

所有变更都通过相同的流水线运行。根据你的工作习惯选择合适的入口点：

1. **git push no-mistakes** - the explicit Git path. Push a committed branch to the gate remote instead of origin.
2. **no-mistakes** - the TUI. Run it after making changes (no commit needed) and a wizard walks you through creating a branch, committing, and pushing through the gate, then attaches to the run. `no-mistakes -y` does all of that automatically.
3. **/no-mistakes** - the agent skill. Tell the coding agent to do a task and gate it with `/no-mistakes <task>`, or use bare `/no-mistakes` to gate existing committed work. It runs the pipeline, has the pipeline apply safe fixes, and stops to ask you about anything that needs a human call.

1. **git push no-mistakes** - 显式的 Git 路径。将已提交的分支推送到门控远程仓库而非 origin。
2. **no-mistakes** - TUI 界面。在进行更改后运行（无需提交），向导会引导你创建分支、提交并推送到门控，然后附加到运行中。`no-mistakes -y` 可自动完成所有步骤。
3. **/no-mistakes** - 代理技能。告诉编码代理执行任务并使用 `/no-mistakes <task>` 进行门控，或直接使用 `/no-mistakes` 对已提交的工作进行门控。它会运行流水线，应用安全修复，并在需要人工决策时停止询问。

---

`no-mistakes init` installs the `/no-mistakes` skill for Claude Code and other agents. Under the hood the skill drives `no-mistakes axi`, a non-interactive TOON interface to the same approval flow. See the quick start for the full first-run walkthrough.

`no-mistakes init` 为 Claude Code 和其他代理安装 `/no-mistakes` 技能。该技能底层驱动 `no-mistakes axi`，这是一个用于相同审批流程的非交互式 TOON 接口。请参阅快速开始以获取首次运行的完整演练。

---

### Development

### 开发

* `make build` # Build bin/no-mistakes with version info
* `make test` # Run go test -race ./... (excludes the e2e suite)
* `make e2e` # Run the tagged end-to-end agent journey suite
* `make e2e-record` # Re-record e2e fixtures when agent wire formats change
* `make lint` # Check generated skill drift and run go vet ./...
* `make skill` # Regenerate committed no-mistakes skill files
* `make fmt` # Run gofmt -w .
* `make demo` # Regenerate demo.gif and demo.mp4 (needs vhs and ffmpeg)
* `make docs` # Build the Astro docs site in docs/dist

See Makefile for the full target list. `make e2e-record` overwrites internal/e2e/fixtures/ from the real claude, codex, and opencode CLIs, spends real API quota, and should be reviewed before committing.

查看 Makefile 获取完整目标列表。`make e2e-record` 会从真实的 claude、codex 和 opencode CLI 覆盖 `internal/e2e/fixtures/`，这会消耗真实的 API 配额，提交前应进行审查。