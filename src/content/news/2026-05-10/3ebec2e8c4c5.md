---
title: "Filling a maintainer's \"Help needed\": shipping a Next.js 16 Redis cache handler"
originalUrl: "https://dev.to/_a9b502091e5f4cba28f13/filling-a-maintainers-help-needed-shipping-a-nextjs-16-redis-cache-handler-1dbe"
date: "2026-05-09T22:20:16.990Z"
---

# Filling a maintainer's "Help needed": shipping a Next.js 16 Redis cache handler

### 填补维护者的“急需帮助”：发布 Next.js 16 Redis 缓存处理器

Next.js 16 split caching into two distinct handler interfaces:
*   `cacheHandler` (singular) — Pages Router ISR, on-demand revalidation
*   `cacheHandlers` (plural) — the new 'use cache' directive, `cacheComponents: true`

Next.js 16 将缓存拆分为两个不同的处理器接口：
*   `cacheHandler`（单数）—— 用于 Pages Router 的 ISR 和按需重新验证 (on-demand revalidation)
*   `cacheHandlers`（复数）—— 用于新的 `use cache` 指令以及 `cacheComponents: true`

The most popular OSS Redis handler today is `@fortedigital/nextjs-cache-handler@3.2.0`. It declares `peerDependencies.next: ">=16.1.5"`. But its README marks the entire plural-API column as ❌:
*   `cacheHandlers` config (plural) ❌ Not yet supported - Help needed
*   `'use cache'` directive ❌ Not yet supported - Help needed
*   `'use cache: remote'` directive ❌ Not yet supported - Help needed
*   `'use cache: private'` directive ❌ Not yet supported - Help needed
*   `cacheComponents` ❌ Not yet supported - Help needed

目前最流行的开源 Redis 处理器是 `@fortedigital/nextjs-cache-handler@3.2.0`。它声明了 `peerDependencies.next: ">=16.1.5"`，但其 README 将整个复数 API 列标记为 ❌：
*   `cacheHandlers` 配置（复数）❌ 尚未支持 - 急需帮助
*   `'use cache'` 指令 ❌ 尚未支持 - 急需帮助
*   `'use cache: remote'` 指令 ❌ 尚未支持 - 急需帮助
*   `'use cache: private'` 指令 ❌ 尚未支持 - 急需帮助
*   `cacheComponents` ❌ 尚未支持 - 急需帮助

The community attempt to fix this — PR #207 — has been stalled for three months on a `PHASE_PRODUCTION_BUILD` regression that the maintainer rejected. The maintainer also said in Issue #152: "Next.js does not care about any other cloud or cluster environment than Vercel" — a candid acknowledgement that fortedigital's roadmap may not include this any time soon.

社区尝试修复此问题的 PR #207 已停滞三个月，原因是一个被维护者拒绝的 `PHASE_PRODUCTION_BUILD` 回归问题。维护者还在 Issue #152 中表示：“Next.js 不关心 Vercel 以外的任何云或集群环境”——这坦率地承认了 fortedigital 的路线图短期内可能不会包含这些功能。

I had a multi-instance Next.js 16 deployment running on AWS ECS Fargate that needed all of this working today. So I built a separate small package focused on filling those gaps: 📦 `@leejpsd/nextjs-cache-handler` — currently 0.2.0, MIT licensed. This post is the technical writeup — what it does, why it exists, the trap that almost shipped silently, and what live-traffic dogfood actually verified.

我有一个运行在 AWS ECS Fargate 上的多实例 Next.js 16 部署，急需这些功能正常工作。因此，我构建了一个专注于填补这些空白的小型独立包：📦 `@leejpsd/nextjs-cache-handler`（目前版本 0.2.0，采用 MIT 协议）。本文是技术总结——包括它的功能、存在原因、差点悄悄上线的陷阱，以及真实流量测试验证的结果。

### What it actually does
### 它到底做了什么

If you have a Next.js 16 app deployed across multiple containers (ECS task / Kubernetes pod / Fly.io machine), the default in-memory cache fragments per-instance. Two tasks behind one ALB will independently evaluate 'use cache' functions, write into their own local LRU, and never see each other's writes. `revalidateTag('posts')` only invalidates the task that received the call.

如果你的 Next.js 16 应用部署在多个容器（ECS 任务 / Kubernetes Pod / Fly.io 机器）中，默认的内存缓存会在每个实例中碎片化。位于同一个 ALB 后端的两个任务会独立评估 `use cache` 函数，写入各自的本地 LRU，且永远无法看到对方的写入。`revalidateTag('posts')` 也只会使接收到调用的那个任务失效。

The fix Next.js documents is "register a custom cache handler that writes to a shared store". The interface is well-defined; the actual implementation has more landmines than the docs imply. This package implements both interfaces in one wrapper, with a few production-driven defaults that the upstream OSS landscape currently doesn't cover.

Next.js 文档提供的解决方案是“注册一个写入共享存储的自定义缓存处理器”。接口定义很明确，但实际实现中的“地雷”比文档暗示的要多。该包在一个包装器中实现了两个接口，并提供了一些目前上游开源生态尚未涵盖的、面向生产环境的默认配置。

```typescript
// next.config.ts
const nextConfig = {
  cacheComponents: true,
  cacheHandler: require.resolve("./cache-incremental.cjs"),
  cacheHandlers: {
    default: require.resolve("./cache-components.cjs")
  },
};

// cache-components.cjs
const { createCacheComponentsHandler } = require("@leejpsd/nextjs-cache-handler/cache-components");

module.exports = createCacheComponentsHandler({
  client: { type: "redis", url: process.env.REDIS_URL },
  buildNamespace: process.env.DEPLOYMENT_VERSION, // auto deploy isolation
  abortTimeoutMs: 1500,
  staleWhileRevalidate: true,
  singleFlight: true, // optional, opt-in stampede protection (v0.2)
});
```

That's it. `'use cache'`, `revalidateTag`, `updateTag`, `cacheLife` all work. The library handles the build-time vs runtime split, the Lua-atomic tag updates, and the deploy-boundary key namespacing.

就是这样。`'use cache'`、`revalidateTag`、`updateTag` 和 `cacheLife` 都能正常工作。该库处理了构建时与运行时的拆分、Lua 原子标签更新以及部署边界的键命名空间隔离。

### The trap that almost shipped silently
### 差点悄悄上线的陷阱

The most useful artifact in this whole exercise wasn't the handler implementation — it was a single landmine I tripped during dogfood deployment. Setup: an env-var toggle in `next.config.ts` that flips between the in-tree handler (existing implementation) and the new library, so I could ship the library to staging behind a one-flag rollback.

在整个过程中，最有价值的发现并非处理器实现本身，而是我在内部测试部署时踩到的一个“地雷”。设置如下：在 `next.config.ts` 中使用环境变量开关，在内置处理器（现有实现）和新库之间切换，这样我就可以通过一个标志位将库发布到预发布环境，并随时回滚。

```typescript
// next.config.ts (the buggy version)
const useLibrary = process.env.USE_LIBRARY_HANDLER === "true";
const path = useLibrary ? "./lib-cache-components.cjs" : "./redis-handler.cjs";

const nextConfig = {
  cacheHandlers: {
    default: require.resolve(path)
  },
  // ...
};
```

Looks fine, right? Toggle flag, swap path, done. I deployed this. CloudWatch confirmed `USE_LIBRARY_HANDLER=true` was set on the ECS task. Cache state inspection showed entries being written. But the cache key shapes were wrong — they had no `BUILD_NAMESPACE` prefix, which is the library's signature feature.

看起来没问题，对吧？切换标志，替换路径，搞定。我部署了它。CloudWatch 确认 ECS 任务上已设置 `USE_LIBRARY_HANDLER=true`。缓存状态检查显示有条目被写入。但缓存键的格式不对——它们没有 `BUILD_NAMESPACE` 前缀，而这正是该库的标志性功能。

I added `console.log("loaded")` to the library wrapper. Re-deployed. Searched CloudWatch. 0 results. The library wrapper was never being required at runtime. Despite:
*   `USE_LIBRARY_HANDLER=true` correctly set
*   The deploy commit hash showing the latest code
*   The library being installed in `node_modules`
*   The `next.config.ts` toggle logic being correct

我在库的包装器中添加了 `console.log("loaded")`。重新部署。搜索 CloudWatch。0 结果。库包装器在运行时根本没有被加载。尽管：
*   `USE_LIBRARY_HANDLER=true` 已正确设置
*   部署的提交哈希显示是最新代码
*   库已安装在 `node_modules` 中
*   `next.config.ts` 的切换逻辑是正确的

**What actually happened:** `next.config.ts` is evaluated at build time. Specifically, `require.resolve(...)` resolves the absolute file path once during the Docker build, then bakes that resolved path into the standalone server bundle. In the Docker build environment, `USE_LIBRARY_HANDLER` was not set.

**实际发生了什么：** `next.config.ts` 是在构建时评估的。具体来说，`require.resolve(...)` 在 Docker 构建期间解析一次绝对文件路径，然后将该解析后的路径硬编码到独立服务器包中。在 Docker 构建环境中，`USE_LIBRARY_HANDLER` 并未设置。

So:
*   **build time:** `process.env.USE_LIBRARY_HANDLER === undefined` → `useLibrary === false` → `path = "./redis-handler.cjs"` → `require.resolve("./redis-handler.cjs") = "/abs/path/redis-handler.cjs"` → that absolute path is what Next.js bakes into the server bundle
*   **runtime:** `process.env.USE_LIBRARY_HANDLER === "true"` // (irrelevant — already baked) → Next.js loads `/abs/path/redis-handler.cjs` → the library is NEVER required

所以：
*   **构建时：** `process.env.USE_LIBRARY_HANDLER === undefined` → `useLibrary === false` → `path = "./redis-handler.cjs"` → `require.resolve("./redis-handler.cjs") = "/abs/path/redis-handler.cjs"` → 该绝对路径被 Next.js 硬编码进服务器包中。
*   **运行时：** `process.env.USE_LIBRARY_HANDLER === "true"` //（无关紧要——路径已被硬编码）→ Next.js 加载 `/abs/path/redis-handler.cjs` → 该库永远不会被加载。

The runtime env var was completely ignored.
运行时环境变量被完全忽略了。