---
title: "Deno 2.8"
originalUrl: "https://deno.com/blog/v2.8"
date: "2026-05-22T22:18:55.486Z"
---

# Deno 2.8

Deno 2.8 is here. This is our biggest minor release to date and we’re excited to share it with you. To upgrade to Deno 2.8, run the following in your terminal: `deno upgrade`. If Deno is not yet installed, run one of the following commands to install or learn how to install it [here](https://deno.com/install).

Deno 2.8 现已发布。这是我们迄今为止规模最大的次要版本更新，我们很高兴与大家分享。要升级到 Deno 2.8，请在终端运行：`deno upgrade`。如果尚未安装 Deno，请运行以下命令之一进行安装，或[点击此处](https://deno.com/install)了解安装方法。

# Using Shell (macOS and Linux):
`curl -fsSL https://deno.land/install.sh | sh`

# 使用 Shell (macOS 和 Linux):
`curl -fsSL https://deno.land/install.sh | sh`

# Using PowerShell (Windows):
`iwr https://deno.land/install.ps1 -useb | iex`

# 使用 PowerShell (Windows):
`iwr https://deno.land/install.ps1 -useb | iex`

## New subcommands

### deno audit fix
`deno audit` (shipped in 2.6) reports vulnerabilities in npm packages in your dependency tree. The new `deno audit fix` subcommand goes one step further and automatically upgrades affected packages to the nearest patched version that still satisfies your version constraints (#32909, #34273). The same behavior is also available as a `--fix` flag on `deno audit`.

## 新增子命令

### deno audit fix
`deno audit`（于 2.6 版本发布）用于报告依赖树中 npm 包的漏洞。全新的 `deno audit fix` 子命令更进一步，它会自动将受影响的包升级到满足版本约束的最近补丁版本（#32909, #34273）。同样的功能也可以通过 `deno audit` 的 `--fix` 标志来实现。

```bash
$ deno audit fix
╭ body-parser vulnerable to denial of service when url encoding is enabled
│ Severity: high
│ Package: body-parser
│ Vulnerable: <1.20.3
╰ Info: https://github.com/advisories/GHSA-qwcr-r2fm-qrc7
╭ Express.js Open Redirect in malformed URLs
│ Severity: moderate
│ Package: express
│ Vulnerable: <4.19.2
╰ Info: https://github.com/advisories/GHSA-rv95-896h-c2vc
Found 2 vulnerabilities
Severity: 0 low, 1 moderate, 1 high, 0 critical
Fixed 1 vulnerability: body-parser 1.19.0 -> 1.20.3
1 vulnerability could not be fixed automatically: express (major upgrade to 5.0.0)
```

Anything that needs a major-version bump is listed separately, so you can decide whether to relax the constraint. Learn more about [deno audit fix](https://docs.deno.com/runtime/manual/tools/audit/).

任何需要主版本号升级的情况都会被单独列出，以便你决定是否放宽约束。了解更多关于 [deno audit fix](https://docs.deno.com/runtime/manual/tools/audit/) 的信息。

### deno bump-version
`deno bump-version` updates the version field in your `deno.json` or `package.json` (#30562):

### deno bump-version
`deno bump-version` 用于更新 `deno.json` 或 `package.json` 中的版本字段（#30562）：

```bash
$ deno bump-version patch # 1.4.6 -> 1.4.7
$ deno bump-version minor # 1.4.6 -> 1.5.0
$ deno bump-version major # 1.4.6 -> 2.0.0
$ deno bump-version prerelease # 1.4.7-0 -> 1.4.7-1
```

In a workspace it does more. Run it at the workspace root and the same increment is applied to every member package, with matching `jsr:` version constraints in the root config and import map rewritten in place so cross-package references stay in sync (#33689):

在工作区（workspace）中，它的功能更强大。在工作区根目录运行该命令，相同的增量将应用于每个成员包，同时根配置和导入映射（import map）中的 `jsr:` 版本约束也会被同步重写，确保跨包引用保持一致（#33689）：

```bash
$ deno bump-version patch # bumps every workspace member
```

Without an increment argument, workspace mode switches to deriving per-package bumps from Conventional Commits between a base ref and the current branch. It honors scoped commits, wildcard `*` scopes, `BREAKING / !` for major bumps, prerelease increments, and 0.x.y semver semantics, and treats any manual version edits since the base ref as authoritative.

如果不带增量参数，工作区模式将切换为根据基础引用（base ref）与当前分支之间的“约定式提交”（Conventional Commits）来推导每个包的版本升级。它支持作用域提交、通配符 `*` 作用域、用于主版本升级的 `BREAKING / !` 标记、预发布增量以及 0.x.y 语义化版本规范，并将基础引用之后的所有手动版本编辑视为权威版本。

```bash
$ deno bump-version --base=main --dry-run
```

`--dry-run` prints the planned changes without writing anything, and `--start` / `--base` let you pin the comparison range when the default “current branch since the latest tag” isn’t what you want. Learn more about [deno bump-version](https://docs.deno.com/runtime/manual/tools/bump_version/).

`--dry-run` 会打印计划的更改而不进行实际写入，而 `--start` / `--base` 允许你在默认的“自最新标签以来的当前分支”不符合需求时，固定比较范围。了解更多关于 [deno bump-version](https://docs.deno.com/runtime/manual/tools/bump_version/) 的信息。

### deno ci
CI scripts and Dockerfiles want one thing from an install: “give me exactly what the lockfile says, and fail loudly if anything is off.” Until now that meant remembering the right combination of flags on `deno install`. Deno 2.8 adds a dedicated `deno ci` subcommand (#34235):

### deno ci
CI 脚本和 Dockerfile 对安装的需求很简单：“完全按照锁文件（lockfile）的内容执行，如果有任何偏差就报错。”在此之前，这意味着必须记住 `deno install` 的正确标志组合。Deno 2.8 新增了专门的 `deno ci` 子命令（#34235）：

```bash
$ deno ci
```

It errors if `deno.lock` is missing, removes any existing `node_modules` directory, and then runs the install with `--frozen` so the lockfile must match the config file exactly. Drop it into your CI step or Dockerfile and you get an obvious, greppable signal of “reproducible install” without having to think about flags. `--prod` and `--skip-types` work the same way they do on `deno install`.

如果缺少 `deno.lock`，它会报错；它会删除现有的 `node_modules` 目录，然后使用 `--frozen` 运行安装，确保锁文件与配置文件完全匹配。将其放入 CI 步骤或 Dockerfile 中，你就能获得一个清晰、可检索的“可复现安装”信号，而无需考虑各种标志。`--prod` 和 `--skip-types` 的工作方式与 `deno install` 相同。

### deno pack
`deno pack` is closer to `tsc` + `npm pack` combined than to `npm pack` alone: it builds a Deno or JSR project into an npm-publishable tarball in one shot (#32139).

### deno pack
`deno pack` 更像是 `tsc` 和 `npm pack` 的结合体，而不仅仅是 `npm pack`：它能一次性将 Deno 或 JSR 项目构建为可发布到 npm 的 tarball 压缩包（#32139）。

Given a `deno.json` like:
假设有一个如下的 `deno.json`：

```json
{
  "name": "@scope/my-lib",
  "version": "1.0.0",
  "exports": "./mod.ts"
}
```

…running `deno pack` produces a `scope-my-lib-1.0.0.tgz` that’s ready for npm publish. The tarball contains:

……运行 `deno pack` 会生成一个可直接用于 npm 发布的 `scope-my-lib-1.0.0.tgz`。该压缩包包含：

* A generated `package.json` with `type: "module"`, conditional exports (types/import/default), and the extracted runtime dependencies.
* 生成的 `package.json`，包含 `type: "module"`、条件导出（types/import/default）以及提取出的运行时依赖。
* Your TypeScript transpiled to JavaScript.
* 编译为 JavaScript 的 TypeScript 代码。
* `.d.ts` declaration files extracted via the same fast-check pipeline `deno publish` uses (pass `--allow-slow-types` to skip).
* 通过与 `deno publish` 相同的 fast-check 流水线提取的 `.d.ts` 声明文件（传入 `--allow-slow-types` 可跳过）。
* README and LICENSE files if present in the project root.
* 项目根目录下的 README 和 LICENSE 文件（如果存在）。

Along the way `deno pack` rewrites specifiers so the published package works inside the npm ecosystem: `jsr:@std/path` becomes `@jsr/std__path`, `npm:express@4` becomes `express`, relative `./utils.ts` imports become `./utils.js`, and `node:` builtins are left alone. If your code calls `Deno.*` APIs, the package automatically picks up `@deno/shim-deno` as a dependency so it runs on Node too (opt out with `--no-deno-shim`).

在此过程中，`deno pack` 会重写说明符，以便发布的包能在 npm 生态系统中正常工作：`jsr:@std/path` 变为 `@jsr/std__path`，`npm:express@4` 变为 `express`，相对路径 `./utils.ts` 导入变为 `./utils.js`，而 `node:` 内置模块保持不变。如果你的代码调用了 `Deno.*` API，该包会自动添加 `@deno/shim-deno` 作为依赖，以便在 Node.js 中也能运行（可通过 `--no-deno-shim` 禁用）。

File selection is graph-based: only modules reachable from your declared exports are bundled, not whatever sits in the directory. Tarballs are deterministic (sorted entries, fixed timestamps and permissions), which matters for reproducible builds and content-addressed registries.

文件选择基于依赖图：只有从声明的导出项可访问的模块才会被打包，而不是目录中的所有文件。压缩包是确定性的（条目已排序，时间戳和权限固定），这对可复现构建和内容寻址注册表非常重要。

```bash
$ deno pack # build the tarball
$ deno pack --dry-run # preview the file list
$ deno pack --set-version 2.0.0 # override version without editing deno.json
$ deno pack --output my-package.tgz # write to a specific path
$ deno pack --ignore=tests/ # exclude test files
$ deno pack --allow-dirty # pack with uncommitted changes
```

Learn more about [deno pack](https://docs.deno.com/runtime/manual/tools/pack/).

了解更多关于 [deno pack](https://docs.deno.com/runtime/manual/tools/pack/) 的信息。

### deno transpile
A new subcommand strips types from TypeScript, JSX, and TSX and writes plain JavaScript to disk. No bundling, no module rewriting, no config. Just the emit step.

### deno transpile
这是一个新的子命令，用于从 TypeScript、JSX 和 TSX 中剥离类型，并将纯 JavaScript 写入磁盘。没有打包，没有模块重写，没有配置，仅执行编译步骤。

```typescript
// greeter.ts
interface User { name: string; balance: number; }
export function greet(user: User): string {
  return `Hello ${user.name}, you have $${user.balance.toFixed(2)}`;
}
```

```bash
$ deno transpile greeter.ts -o greeter.js
```

```javascript
// greeter.js
export function greet(user) {
  return `Hello ${user.name}, you have $${user.balance.toFixed(2)}`;
}
```

`deno transpile` accepts multiple files, `--outdir` for batch output, `--source-map separate|inline`, and `--declaration` to emit `.d.ts` alongside the JS. Useful when you need to publish a JS-only artifact or pre-build TS for a runtime that doesn’t speak it natively. Learn more about [deno transpile](https://docs.deno.com/runtime/manual/tools/transpile/).

`deno transpile` 支持多个文件，使用 `--outdir` 进行批量输出，使用 `--source-map separate|inline`，以及使用 `--declaration` 在 JS 旁边生成 `.d.ts` 文件。当你需要发布仅包含 JS 的制品，或为不支持原生 TS 的运行时预构建 TS 时，此功能非常有用。了解更多关于 [deno transpile](https://docs.deno.com/runtime/manual/tools/transpile/) 的信息。