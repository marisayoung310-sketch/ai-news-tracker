---
title: "github / gh-stack"
originalUrl: "https://github.com/github/gh-stack"
date: "2026-08-01T22:18:13.398Z"
---

# GitHub Stacked PRs

GitHub Stacked PRs is a GitHub CLI extension for managing stacked branches and pull requests. Stacked PRs break large changes into a chain of small, reviewable pull requests that build on each other. `gh stack` automates the tedious parts — creating branches, keeping them rebased, setting correct PR base branches, and navigating between layers.

GitHub Stacked PRs 是一个用于管理堆叠分支（Stacked Branches）和拉取请求（Pull Requests）的 GitHub CLI 扩展。堆叠 PR 将大型变更拆分为一系列相互依赖的小型、可审查的拉取请求。`gh stack` 自动化了繁琐的工作，包括创建分支、保持变基（rebase）、设置正确的 PR 基础分支以及在各层之间导航。

### Installation
`gh extension install github/gh-stack`
Requires the GitHub CLI (gh) v2.0+.

### 安装
`gh extension install github/gh-stack`
需要 GitHub CLI (gh) v2.0 或更高版本。

### AI agent integration
Install the `gh-stack` skill so your AI coding agent knows how to work with stacked PRs and the `gh stack` CLI:
`gh skill install github/gh-stack`

### AI 智能体集成
安装 `gh-stack` 技能，以便你的 AI 编程助手能够处理堆叠 PR 和 `gh stack` CLI：
`gh skill install github/gh-stack`

### Quick start
```bash
# Start a new stack (creates and checks out the first branch)
gh stack init
# ... make commits on the first branch ...
# Add another branch on top
gh stack add api-endpoints
# ... make commits ...
# Push all branches
gh stack push
# View the stack
gh stack view
# Open a stack of PRs
gh stack submit
```

### 快速入门
```bash
# 启动一个新的堆叠（创建并检出第一个分支）
gh stack init
# ... 在第一个分支上提交代码 ...
# 在顶部添加另一个分支
gh stack add api-endpoints
# ... 提交代码 ...
# 推送所有分支
gh stack push
# 查看堆叠
gh stack view
# 打开一组堆叠的 PR
gh stack submit
```

### How it works
A stack is an ordered list of branches where each branch builds on the one below it. The bottom of the stack is based on a trunk branch (typically `main`).

### 工作原理
堆叠是一个有序的分支列表，其中每个分支都构建在其下方的分支之上。堆叠的底部基于主干分支（通常为 `main`）。

```text
frontend → PR #3 (base: api-endpoints) ← top
api-endpoints → PR #2 (base: auth-layer)
auth-layer → PR #1 (base: main) ← bottom
───────────── main (trunk)
```

The bottom of the stack is the branch closest to the trunk, and the top is the branch furthest from it. Each branch inherits from the one below it. Navigation commands (`up`, `down`, `top`, `bottom`) follow this model: `up` moves away from trunk, `down` moves toward it.

堆叠的底部是离主干最近的分支，顶部是离主干最远的分支。每个分支都继承自其下方的分支。导航命令（`up`、`down`、`top`、`bottom`）遵循此模型：`up` 表示远离主干，`down` 表示靠近主干。

When you submit, `gh stack` creates one PR per branch and links them together as a Stack on GitHub. Each PR's base is set to the branch below it in the stack, so reviewers see only the diff for that layer.

当你提交时，`gh stack` 会为每个分支创建一个 PR，并将它们在 GitHub 上链接为一个堆叠（Stack）。每个 PR 的基础分支被设置为堆叠中其下方的分支，因此审查者只会看到该层的差异（diff）。

### Local tracking
Stack metadata is stored in `.git/gh-stack` (a JSON file, not committed to the repo). This tracks which branches belong to which stack and their ordering. Rebase state during interrupted rebases is stored separately in `.git/gh-stack-rebase-state`.

### 本地追踪
堆叠元数据存储在 `.git/gh-stack` 中（这是一个 JSON 文件，不会提交到仓库）。它用于追踪哪些分支属于哪个堆叠及其顺序。在变基中断期间的变基状态会单独存储在 `.git/gh-stack-rebase-state` 中。

---

### Commands

#### `gh stack init`
Initialize a new stack in the current repository.
`gh stack init [flags] [branches...]`

#### 命令

#### `gh stack init`
在当前仓库中初始化一个新的堆叠。
`gh stack init [flags] [branches...]`

Initializes a new stack locally. In interactive mode (no arguments), prompts for a branch name and offers to use the current branch as the first layer. When explicit branch names are given, existing branches are adopted automatically and any missing branches are created. The trunk defaults to the repository's default branch unless overridden with `--base`. Enables `git rerere` automatically so that conflict resolutions are remembered across rebases.

在本地初始化一个新的堆叠。在交互模式下（无参数），系统会提示输入分支名称，并建议将当前分支作为第一层。当提供明确的分支名称时，现有分支会被自动采用，缺失的分支会被创建。主干默认为仓库的默认分支，除非使用 `--base` 覆盖。自动启用 `git rerere`，以便在变基过程中记住冲突解决方案。

| Flag | Description |
| :--- | :--- |
| `-b, --base <branch>` | Trunk branch for the stack (defaults to the repository's default branch) |

| 标志 | 描述 |
| :--- | :--- |
| `-b, --base <branch>` | 堆叠的主干分支（默认为仓库的默认分支） |

---

#### `gh stack add`
Add a new branch on top of the current stack.
`gh stack add [flags] [branch]`

#### `gh stack add`
在当前堆叠的顶部添加一个新分支。
`gh stack add [flags] [branch]`

Creates a new branch at the current HEAD, adds it to the top of the stack, and checks it out. Must be run while on the topmost branch of a stack. If no branch name is given, prompts for one. You can optionally stage changes and create a commit as part of the add flow. When `-m` is provided without an explicit branch name, the branch name is auto-generated in `date+slug` format (e.g., `03-24-add_login`).

在当前 HEAD 创建一个新分支，将其添加到堆叠顶部，并检出该分支。必须在堆叠的最顶层分支上运行。如果没有提供分支名称，系统会提示输入。你可以在添加流程中选择暂存更改并创建提交。当提供 `-m` 但未指定分支名称时，分支名称将以 `date+slug` 格式自动生成（例如 `03-24-add_login`）。

| Flag | Description |
| :--- | :--- |
| `-A, --all` | Stage all changes (including untracked files); requires `-m` |
| `-u, --update` | Stage changes to tracked files only; requires `-m` |
| `-m, --message <string>` | Create a commit with this message before creating the branch |

| 标志 | 描述 |
| :--- | :--- |
| `-A, --all` | 暂存所有更改（包括未追踪的文件）；需要 `-m` |
| `-u, --update` | 仅暂存已追踪文件的更改；需要 `-m` |
| `-m, --message <string>` | 在创建分支前使用此消息创建提交 |

---

#### `gh stack checkout`
Check out a stack by its stack number, a pull request number, a PR URL, or a branch name.
`gh stack checkout [<stack-number> | <pr-number> | <pr-url> | <branch>]`

#### `gh stack checkout`
通过堆叠编号、拉取请求编号、PR URL 或分支名称检出堆叠。
`gh stack checkout [<stack-number> | <pr-number> | <pr-url> | <branch>]`

A bare number is interpreted first as a stack or PR number (repo-scoped identifiers shown in the GitHub UI). If nothing matches the number, it is tried as a branch name. When a remote stack is referenced, the command fetches the stack on GitHub, pulls the branches, and sets up the stack locally. If the stack already exists locally and matches, it switches to the branch. If the local and remote stacks have different compositions, you'll be prompted to resolve the conflict.

纯数字首先被解释为堆叠或 PR 编号（GitHub UI 中显示的仓库范围标识符）。如果数字没有匹配项，则尝试将其作为分支名称。当引用远程堆叠时，该命令会从 GitHub 获取堆叠、拉取分支并在本地设置堆叠。如果堆叠已在本地存在且匹配，它将切换到该分支。如果本地和远程堆叠的组成不同，系统会提示你解决冲突。