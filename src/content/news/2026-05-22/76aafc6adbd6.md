---
title: "Git Advanced: The Commands I Wish I Knew Earlier (2026)"
originalUrl: "https://dev.to/armorbreak/git-advanced-the-commands-i-wish-i-knew-earlier-2026-4om9"
date: "2026-05-21T23:06:53.259Z"
---

# Git Advanced: The Commands I Wish I Knew Earlier (2026)
# Git 进阶：我希望早点知道的那些命令（2026版）

Beyond add, commit, push. These are the Git commands that actually save time.
除了 add、commit 和 push，这些 Git 命令才是真正能为你节省时间的利器。

### The Basics (Quick Refresher)
### 基础知识（快速回顾）

```bash
git status          # What changed? / 查看变动
git diff            # What exactly changed? / 查看具体修改内容
git log --oneline   # Recent commits / 查看近期提交记录
git add -A          # Stage everything / 暂存所有变动
git commit -m "msg" # Commit staged changes / 提交暂存区的变动
git push origin main # Send to remote / 推送到远程仓库
```

You know these. Let's go further.
这些你都已经很熟悉了，让我们深入探讨一下。

---

### Undo Everything (Safely)
### 安全撤销一切

```bash
# Unstage a file (keep changes) / 取消暂存（保留修改）
git reset HEAD path/to/file

# Discard all unstaged changes in a file / 丢弃文件中所有未暂存的修改
git checkout -- path/to/file
# Or newer syntax: / 或者使用较新的语法：
git restore path/to/file

# Discard ALL unstaged changes / 丢弃所有未暂存的修改
git checkout -- .
git restore .

# Uncommit (keep changes, remove commit) / 撤销提交（保留修改，移除提交记录）
git reset --soft HEAD~1  # Changes stay staged / 修改保留在暂存区
git reset HEAD~1         # Changes stay unstaged / 修改变为未暂存状态
git reset --hard HEAD~1  # Changes GONE forever ⚠️ / 修改永久消失 ⚠️

# Amend last commit (fix message or add forgotten file) / 修改上一次提交（修正信息或添加遗漏文件）
git commit --amend -m "Better message"
git add forgotten-file.txt
git commit --amend       # Add file to previous commit / 将文件添加到上一次提交中
```

---

### Interactive Rebase: Clean Up History
### 交互式变基：清理提交历史

```bash
# Edit/reorder/squash last 5 commits / 编辑、重排或压缩最近 5 次提交
git rebase -i HEAD~5

# Opens editor with: / 打开编辑器，内容如下：
pick abc1234 First commit
pick def5678 Second commit
# Change 'pick' to: / 将 'pick' 修改为：
# reword = edit commit message / 修改提交信息
# edit = pause to amend files / 暂停以修改文件
# squash = merge into previous commit / 合并到上一个提交
# fixup = merge into previous (discard this message) / 合并到上一个（丢弃当前提交信息）
# drop = remove commit entirely / 完全删除提交
# exec = run shell command / 执行 shell 命令

# Example: Squash the last 2 commits into one / 示例：将最后两次提交合并为一次
pick abc1234 First commit
squash def5678 Second commit
# → Creates single commit with combined changes / → 创建一个包含合并后修改的单一提交
```

---

### Stashing: Save Work Without Committing
### 储藏（Stashing）：无需提交即可保存工作进度

```bash
# Save current work temporarily / 临时保存当前工作
git stash
git stash push -m "WIP: feature X"

# List all stashes / 列出所有储藏
git stash list

# Restore most recent stash / 恢复最近一次储藏
git stash pop      # Apply + remove from list / 应用并从列表中移除
git stash apply    # Apply + keep in list / 应用并保留在列表中

# Restore specific stash / 恢复特定储藏
git stash apply stash@{1}

# Drop a stash / 删除储藏
git stash drop stash@{0}

# Clear all stashes / 清除所有储藏
git stash clear

# Stash only some files (not everything) / 仅储藏部分文件（而非全部）
git stash push -m "partial" src/utils.js src/config.js

# Stash with untracked files included / 包含未追踪的文件进行储藏
git stash push -u -m "include new files"
```

---

### Searching Through History
### 搜索提交历史

```bash
# Search commit messages / 搜索提交信息
git log --grep="bug fix" --oneline
git log --grep="auth" --since="2026-01-01"

# Search code content across all history / 在整个历史中搜索代码内容
git log -S "functionName" --oneline # Added/removed this string / 搜索添加/删除了该字符串的提交
git log -G "pattern" --oneline      # Changed matching this regex / 搜索匹配该正则的修改
git log -p -S "TODO"                # Show actual diffs too / 同时显示具体的差异

# Find which commit introduced a bug / 查找引入 Bug 的提交
git bisect start
git bisect bad      # Current version has bug / 当前版本有 Bug
git bisect good v1.0.0 # This version was fine / 该版本正常
# Git will check out middle commit → you test → mark good/bad
# Git 会检出中间的提交 → 你进行测试 → 标记 good 或 bad
# Repeat until it finds the exact bad commit / 重复此过程直到找到确切的坏提交
git bisect reset    # When done / 完成后重置

# Search current working tree / 搜索当前工作区
git grep "search term" # In tracked files / 在已追踪文件中
git grep "search term" $(git rev-list --all) # Across ALL history! / 在所有历史中搜索！
```

---

### Branching Strategies That Work
### 高效的分支策略

#### Feature Branch Workflow / 功能分支工作流
```bash
# Start a new feature / 开始一个新功能
git checkout -b feature/user-auth
# Or: / 或者：
git switch -c feature/user-auth

# Make commits... / 进行提交...
git add -A && git commit -m "Add login page"

# Update your branch with latest main / 用最新的 main 分支更新你的分支
git fetch origin
git rebase origin/main # Cleaner than merge for PRs / 比 merge 更适合 PR

# Push branch (first time needs -u) / 推送分支（首次需要 -u）
git push -u origin feature/user-auth

# After PR is merged, clean up / PR 合并后进行清理
git branch -d feature/user-auth # Delete local / 删除本地分支
git push origin --delete feature/user-auth # Delete remote / 删除远程分支
```

#### Quick Branch Management / 快速分支管理
```bash
git branch -a # See all branches (local + remote) / 查看所有分支（本地+远程）
git branch -m old-name new-name # Rename current branch / 重命名当前分支
git push origin :old-name new-name # Rename remote branch / 重命名远程分支
git checkout - # Switch to previous branch / 切换回上一个分支
git log main..feature-branch --oneline # Commits in feature but not main / 查看 feature 有但 main 没有的提交
```

---

### Cherry-Picking: Grab Specific Commits
### 拣选（Cherry-Picking）：抓取特定的提交

```bash
# Apply one commit from another branch / 从另一个分支应用一个提交
git cherry-pick abc1234

# Apply multiple commits / 应用多个提交
git cherry-pick abc1234 def5678 ghi9012

# Cherry-pick without committing (edit first) / 拣选但不提交（先进行编辑）
git cherry-pick -n abc1234
# Make changes, then: / 修改后执行：
git commit -m "Modified cherry-pick"
```

---

### Understanding .gitignore
### 理解 .gitignore

```bash
node_modules/    # Directory / 目录
*.log            # All .log files / 所有 .log 文件
!.important.log  # Except this one / 除了这个文件
build/           # Build output / 构建输出
.env             # Secrets (NEVER commit!) / 密钥（千万不要提交！）
.DS_Store        # macOS junk / macOS 垃圾文件
.vscode/         # Editor config (optional) / 编辑器配置（可选）

# Global ignore (for all repos) / 全局忽略（适用于所有仓库）
git config --global core.excludesfile ~/.gitignore_global
```