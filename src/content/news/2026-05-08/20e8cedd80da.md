---
title: "Per-account task concurrency without a lock service"
originalUrl: "https://dev.to/codelluis/per-account-task-concurrency-without-a-lock-service-1b9k"
date: "2026-05-07T23:34:28.438Z"
---

# Per-account task concurrency without a lock service
# 无需锁服务的按账户任务并发控制

Many background jobs call an external system on behalf of separate accounts, tenants, or installations. The external system allows parallel calls across different accounts, but it does not allow two calls for the same account to run at the same time. That is not a global rate limit. It is concurrency by key: the key might be account_id, tenant_id, or another argument that identifies the shared quota or state boundary.
许多后台任务会代表不同的账户、租户或安装实例调用外部系统。外部系统允许跨不同账户进行并行调用，但不允许针对同一账户的两个调用同时运行。这并非全局速率限制，而是基于键（key）的并发控制：该键可能是 `account_id`、`tenant_id` 或其他标识共享配额或状态边界的参数。

You want the worker pool busy across many accounts, while each account stays serial. Without that guard, two workers eventually pick up work for the same account in parallel. The external system may throttle the account, reject the second call, or leave you with a partial update to reconcile. The usual fixes are external locks, one queue per account, or retry/backoff logic around every call. They can work, but they add another coordination layer to the job system.
你希望工作池（worker pool）在处理多个账户时保持忙碌，同时确保每个账户的任务串行执行。如果没有这种保护机制，两个工作进程最终会并行处理同一个账户的任务。外部系统可能会对该账户进行限流、拒绝第二次调用，或者留下需要协调的部分更新。常见的解决方法包括外部锁、为每个账户设置独立队列，或在每次调用周围添加重试/退避逻辑。这些方法虽然有效，但会给任务系统增加额外的协调层。

Pynenc's orchestrator already tracks running invocations and their arguments. With `running_concurrency=KEYS` and `key_arguments=("account_id",)`, it can enforce one in-flight invocation per account key while still running different accounts in parallel. `reroute_on_concurrency_control` decides whether blocked work waits or is dropped, and `registration_concurrency=KEYS` can collapse duplicate work before a worker sees it.
Pynenc 的编排器（orchestrator）已经能够跟踪正在运行的调用及其参数。通过设置 `running_concurrency=KEYS` 和 `key_arguments=("account_id",)`，它可以在确保每个账户键同一时间只有一个运行中调用的同时，依然并行处理不同账户的任务。`reroute_on_concurrency_control` 参数决定了被阻塞的任务是等待还是被丢弃，而 `registration_concurrency=KEYS` 则可以在任务被工作进程接收前合并重复的任务。

Full sample: `samples/concurrency_demo`. The demo Four tiny files, each doing one thing:
完整示例请见：`samples/concurrency_demo`。该演示包含四个微型文件，各司其职：

```text
concurrency_demo/
├── api_server.py # tiny HTTP app: pretends to be the external provider
├── tasks.py      # PynencBuilder app + 4 tasks (the whole story)
├── enqueue.py    # CLI: enqueue one scenario, print results
└── sample.py     # one-command demo: boots api+worker, runs all scenarios
```

```text
concurrency_demo/
├── api_server.py # 微型 HTTP 应用：模拟外部服务提供商
├── tasks.py      # PynencBuilder 应用 + 4 个任务（核心逻辑）
├── enqueue.py    # 命令行工具：入队一个场景并打印结果
└── sample.py     # 一键演示：启动 API 和 worker，运行所有场景
```

The "external provider" is a small HTTP app that holds an account in flight for 0.4 seconds per call and records a collision whenever a second request arrives while the first is still in flight. In a real integration, that collision could be a 429, a rejected write, or an inconsistent refresh:
这个“外部提供商”是一个小型 HTTP 应用，它会让每个账户的调用处理耗时 0.4 秒，并在第一个请求尚未完成时收到第二个请求时记录一次冲突。在实际集成中，这种冲突可能表现为 429 错误、写入被拒绝或数据刷新不一致：

```python
# api_server.py — the part that matters
@app.post("/call/{account_id}/{op}")
async def call(account_id: str, op: str, hold: float = HOLD_SECONDS) -> dict[str, str]:
    async with lock:
        acc = accounts[account_id]
        acc.calls += 1
        collided = acc.in_flight > 0
        acc.collisions += int(collided)
        acc.in_flight += 1
        print(f" [{'COLLISION' if collided else 'ok '}] {account_id:<8} {op}", flush=True)
    await asyncio.sleep(hold)
    async with lock:
        accounts[account_id].in_flight -= 1
    return {"outcome": "collision" if collided else "ok"}
```

The pynenc app and the four tasks fit on one screen. The whole pynenc configuration — SQLite backend, in-process thread runner, logging — sits fluently in tasks.py next to the tasks that use it:
Pynenc 应用和四个任务代码量极小，一屏即可显示。整个 Pynenc 配置（SQLite 后端、进程内线程运行器、日志记录）都简洁地放在 `tasks.py` 中，与使用它们的任务紧邻：

```python
# tasks.py
import os
import httpx
from pynenc import PynencBuilder
from pynenc.conf.config_task import ConcurrencyControlType as Mode

API_URL = "http://127.0.0.1:8765"
app = (
    PynencBuilder()
    .app_id("concurrency_demo")
    .sqlite("concurrency_demo.db")
    .thread_runner(min_threads=1, max_threads=8)
    .logging_stream("stdout")
    .logging_level(os.environ.get("DEMO_LOG_LEVEL", "info"))
    .max_pending_seconds(3.0)
    .build()
)

def _hit(account_id: str, op: str, hold: float | None = None) -> str:
    params = {"hold": hold} if hold is not None else None
    r = httpx.post(f"{API_URL}/call/{account_id}/{op}", params=params, timeout=10.0)
    r.raise_for_status()
    return r.json()["outcome"]

@app.task
def call_unsafe(account_id: str, op: str) -> str:
    return _hit(account_id, op)

@app.task(
    running_concurrency=Mode.KEYS,
    key_arguments=("account_id",),
    reroute_on_concurrency_control=True,
)
def call_keyed(account_id: str, op: str) -> str:
    return _hit(account_id, op)

@app.task(
    running_concurrency=Mode.KEYS,
    key_arguments=("account_id",),
    reroute_on_concurrency_control=False,
)
def call_keyed_drop(account_id: str, op: str) -> str:
    return _hit(account_id, op)

@app.task(
    running_concurrency=Mode.KEYS,
    registration_concurrency=Mode.KEYS,
    key_arguments=("account_id",),
    reroute_on_concurrency_control=True,
)
def refresh_once(account_id: str) -> str:
    return _hit(account_id, "refresh")
```

### How to run it
### 如何运行

You can launch the demo two ways. The four-terminal flow is useful when you want to watch the API, the worker, and the pynenc monitor at the same time. The one-command flow boots the API and worker for you and runs every scenario in sequence; it is the path used by CI.
你可以通过两种方式启动演示。如果你想同时观察 API、worker 和 Pynenc 监控器，可以使用四终端流程。一键式流程会自动为你启动 API 和 worker 并按顺序运行所有场景，这也是 CI 使用的方式。

```bash
# four terminals — recommended for exploring
uv run uvicorn api_server:app --port 8765           # 1. API
uv run pynenc --app tasks.app runner start         # 2. worker
uv run pynenc monitor                              # 3. monitor (optional) at http://127.0.0.1:8000
uv run python enqueue.py all                       # 4. enqueue scenarios

# one command — recommended for CI
uv run python sample.py
```

```bash
# 四终端模式 — 推荐用于探索
uv run uvicorn api_server:app --port 8765           # 1. API 服务
uv run pynenc --app tasks.app runner start         # 2. 工作进程
uv run pynenc monitor                              # 3. 监控器 (可选，访问 http://127.0.0.1:8000)
uv run python enqueue.py all                       # 4. 入队场景任务

# 一键模式 — 推荐用于 CI
uv run python sample.py
```

### What the API observes
### API 的观察结果

All four scenarios, end to end, on a single pynmon timeline. Read it left to right: scenario A starts with overlapping calls for the same accounts; B fans out into three account lanes that stay serial per account; C drops blocked work instead of rerouting it; D collapses duplicate refresh requests before a worker ever sees them.
所有四个场景在同一个 pynmon 时间轴上端到端呈现。从左向右阅读：场景 A 开始时对同一账户有重叠调用；场景 B 扩展为三个账户通道，每个账户保持串行；场景 C 丢弃被阻塞的任务而不是重新路由；场景 D 在工作进程接收前就合并了重复的刷新请求。

Two pynenc state names appear in the screenshots and logs. `REROUTED` means the worker tried to start an invocation, found the account key already busy, and put the invocation back on the queue. `CONCURRENCY_CONTROLLED_FINAL` means the invocation was blocked by the key rule and intentionally finished without running.
截图和日志中会出现两个 Pynenc 状态名称。`REROUTED` 表示工作进程尝试启动调用时发现账户键已被占用，并将调用放回队列。`CONCURRENCY_CONTROLLED_FINAL` 表示调用被键规则阻塞，并被有意终止而未执行。

Four scenarios, four stories. Each one below pairs the per-scenario summary, the API server's collision log, and the matching pynmon timeline.
四个场景，四个故事。下方每一项都配有场景摘要、API 服务器的冲突日志以及对应的 pynmon 时间轴。

**Scenario A — no concurrency control**
**场景 A — 无并发控制**

The baseline pain. Different provider operations, same account_id key. The runner can hold up to eight invocations in flight, and it does — most of the 12 invocations start essentially together. The first call per account reaches the provider cleanly; everything that overlaps the same account is recorded as `COLLISION` — the stand-in for a real 429, throttle, or inconsistent response.
这是基准痛点。不同的提供商操作，相同的 `account_id` 键。运行器最多可同时处理八个调用，事实也确实如此——12 个调用中的大多数几乎同时启动。每个账户的第一次调用能顺利到达提供商；所有与同一账户重叠的调用都被记录为 `COLLISION`——这代表了现实中的 429 错误、限流或不一致的响应。

`=== A. unsafe — no concurrency control ===`
`12 enqueued -> 12 calls, 9 collisions, 1.42s`