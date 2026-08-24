---
title: "Contributing to Laravel Maestro Starter Kits Without Losing Your Changes"
originalUrl: "https://dev.to/catatsumuri/contributing-to-laravel-maestro-starter-kits-without-losing-your-changes-5oi"
date: "2026-05-21T23:06:44.228Z"
---

# Contributing to Laravel Maestro Starter Kits Without Losing Your Changes
# 如何在不丢失更改的情况下为 Laravel Maestro 入门套件做出贡献

### What is Maestro
### 什么是 Maestro

Maestro is an upstream generator repository for generating and managing Laravel starter kits. The following starter kit repositories are downstream repositories generated from Maestro, and directly modifying the starter kit side does not propagate changes upstream.
Maestro 是一个用于生成和管理 Laravel 入门套件（Starter Kits）的上游生成器仓库。以下入门套件仓库是由 Maestro 生成的下游仓库，直接修改这些套件本身并不会将更改同步到上游。

*   laravel/react-starter-kit
*   laravel/vue-starter-kit
*   laravel/svelte-starter-kit

Therefore, when making changes such as the following, you must modify the maestro side instead:
因此，在进行以下更改时，必须修改 Maestro 端：

*   Shared starter kit bug fixes (共享入门套件的 Bug 修复)
*   Cross-variant fixes (跨变体修复)
*   Generator-level specification changes (生成器层面的规范更改)
*   UI consistency adjustments across stacks (跨技术栈的 UI 一致性调整)

---

### Maestro Structure
### Maestro 结构

Unlike a normal Laravel application, Maestro has the following structure:
与普通的 Laravel 应用程序不同，Maestro 具有以下结构：

*   `kits/` — source template (源模板)
*   `build/` — generated application (generated runtime) (生成的应用程序/运行时)
*   `watcher` — synchronization layer from `build/` → `kits/` (从 `build/` 到 `kits/` 的同步层)

---

### Inertia Variant Matrix
### Inertia 变体矩阵

| Starter Kit | Variant | Build Command |
| :--- | :--- | :--- |
| React | Fortify | `php artisan build --kit=react` |
| React | WorkOS | `php artisan build --kit=react --workos` |
| React | Fortify + Teams | `php artisan build --kit=react --teams` |
| React | WorkOS + Teams | `php artisan build --kit=react --workos --teams` |

The same applies to Vue / Svelte. If you misunderstand “which side is the source of truth,” unintended rollbacks and unnecessary diffs are very likely to occur.
Vue 和 Svelte 同理。如果你误解了“哪一边是事实来源（Source of Truth）”，极易导致意外的回滚和不必要的差异（diff）。

---

### Basic Principles
### 基本原则

**`kits/` Is the Source of Truth**
**`kits/` 是事实来源**
Any diff that should be committed must exist in `kits/`. `build/` is generated output and should be treated as a working directory for verification, temporary edits, and runtime testing. You must not commit diffs from the `build/` side.
任何需要提交的差异都必须存在于 `kits/` 中。`build/` 是生成的输出，应仅作为验证、临时编辑和运行时测试的工作目录。严禁提交来自 `build/` 端的差异。

**`build/` Is Disposable**
**`build/` 是可丢弃的**
Treat `build/` as something that can always be regenerated. Since its contents change significantly whenever variants are switched, do not place long-term changes, source patches, or persistent fixes directly in `build/`. Permanent changes belong in `kits/`.
将 `build/` 视为随时可以重新生成的内容。由于切换变体时其内容会发生巨大变化，请勿将长期更改、源补丁或持久性修复直接放在 `build/` 中。永久性更改属于 `kits/`。

---

### `composer kit:run` Is Convenient but Also Dangerous
### `composer kit:run` 很方便，但也存在风险

`composer kit:run` is a convenience command that launches setup, the Laravel dev server, the Vite dev server, and the watcher together. However, the watcher treats `build/` as authoritative and writes changes back into `kits/`. As a result, if you start `kit:run` using an outdated `build/`, changes in `kits/` may get rolled back. After directly editing `kits/`, never run `composer kit:run` with an outdated `build/`. Always rebuild first.
`composer kit:run` 是一个便捷命令，它会同时启动安装程序、Laravel 开发服务器、Vite 开发服务器和监视器（watcher）。然而，监视器会将 `build/` 视为权威来源，并将更改写回 `kits/`。因此，如果你使用过时的 `build/` 启动 `kit:run`，`kits/` 中的更改可能会被回滚。在直接编辑 `kits/` 后，切勿使用过时的 `build/` 运行 `composer kit:run`。请务必先重新构建。

---

### Initial Setup
### 初始设置

```bash
git clone https://github.com/laravel/maestro.git
cd maestro/orchestrator
composer install
npm install
```

---

### Building a Starter Kit
### 构建入门套件

At the beginning of work, expand the target variant into `build/`:
在开始工作时，将目标变体展开到 `build/` 中：

```bash
cd orchestrator
php artisan build --kit=react
# ... (vue, svelte, etc.)
```

The current build target is stored at: `orchestrator/storage/app/private/starter_kit`
当前的构建目标存储在：`orchestrator/storage/app/private/starter_kit`

---

### Starting the Development Server
### 启动开发服务器

Do not start directly from `build/`. Instead, run the following from `orchestrator/`:
不要直接从 `build/` 启动。请在 `orchestrator/` 目录下运行：

```bash
composer kit:run
```

This command performs the following together:
该命令会同时执行以下操作：
*   `composer setup` in `build/`
*   Starts the Laravel dev server
*   Starts the Vite dev server
*   Starts the watcher

---

### Safe Workflow
### 安全工作流

**Pattern 1: Edit on the `build` Side (for temporary verification)**
**模式 1：在 `build` 端编辑（用于临时验证）**
`build` → `kit:run` → `edit build` → `verify behavior`
Convenient for exploratory UI adjustments. However, since `build/` is disposable, it is safer to reorganize the final source patch into `kits/`.
适用于探索性的 UI 调整。但由于 `build/` 是可丢弃的，将最终的源补丁整理到 `kits/` 中会更安全。

**Pattern 2: Edit on the `kits` Side (recommended path for PRs)**
**模式 2：在 `kits` 端编辑（PR 推荐路径）**
`edit kits` → `php artisan build ...` → `composer kit:run` → `verify`
This is the recommended approach when preparing PR patches.
这是准备 PR 补丁时的推荐方法。

---

### Pre-PR Checklist
### PR 前检查清单

*   [ ] Are there any staged diffs from `build/`? (是否有来自 `build/` 的暂存差异？)
*   [ ] Are stale deletions from the watcher mixed in? (是否混入了监视器产生的过期删除文件？)
*   [ ] Are there unnecessary cross-variant diffs? (是否存在不必要的跨变体差异？)
*   [ ] Are temporary browser test changes still present? (是否还残留着临时的浏览器测试更改？)
*   [ ] Did you check `git diff --cached`? (你检查过 `git diff --cached` 吗？)
*   [ ] Is the source of truth correctly on the `kits/` side? (事实来源是否正确地位于 `kits/` 端？)

---

### Summary
### 总结

If you handle Maestro like a normal Laravel app, diff rollbacks and unnecessary commits become very easy to trigger. To create PRs safely, maintain the following sequence:
如果你像对待普通 Laravel 应用一样对待 Maestro，很容易触发差异回滚和不必要的提交。为了安全地创建 PR，请遵循以下顺序：

1.  Apply changes in `kits/` (在 `kits/` 中应用更改)
2.  Rebuild with `php artisan build ...` (使用 `php artisan build ...` 重新构建)
3.  Verify with `composer kit:run` (使用 `composer kit:run` 验证)
4.  Stage only intended diffs (仅暂存预期的差异)
5.  Separate watcher/browser-test side effects (分离监视器/浏览器测试的副作用)