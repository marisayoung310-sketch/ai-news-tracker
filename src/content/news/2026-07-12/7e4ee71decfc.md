---
title: "We scaled PgBouncer to 4x throughput"
originalUrl: "https://clickhouse.com/blog/pgbouncer-clickhouse-managed-postgres"
date: "2026-07-11T22:10:42.665Z"
---

# We scaled PgBouncer to 4x throughput
# 我们将 PgBouncer 的吞吐量提升了 4 倍

PgBouncer is single-threaded. A single process uses one CPU core, no matter how many the machine has. On a 16-vCPU box that means one core does all the connection pooling while the other fifteen sit idle, and the pooler starts capping throughput long before Postgres runs out of room.
PgBouncer 是单线程的。无论机器有多少个 CPU 核心，单个进程只会使用其中一个。在一台 16 vCPU 的机器上，这意味着一个核心在处理所有的连接池，而其他 15 个核心则处于闲置状态。因此，在 Postgres 达到性能瓶颈之前，连接池本身就会先限制住吞吐量。

In ClickHouse Managed Postgres we run a fleet of PgBouncer processes, sized proportional to the available cores. Every process in the fleet binds the same port with `so_reuseport` enabled. The kernel load-balances incoming connections across the processes, so clients still connect to a single endpoint and never know there is more than one PgBouncer behind it. This is the mechanism PgBouncer's own docs point to for using more than one core: it is single-threaded per process, and `so_reuseport` is how you put every core to work.
在 ClickHouse Managed Postgres 中，我们运行了一组 PgBouncer 进程，其数量与可用核心数成比例。集群中的每个进程都通过启用 `so_reuseport` 绑定到同一个端口。内核会在这些进程之间对传入的连接进行负载均衡，因此客户端仍然连接到单一端点，完全感知不到后端存在多个 PgBouncer。这就是 PgBouncer 官方文档中提到的利用多核的机制：每个进程虽然是单线程的，但通过 `so_reuseport` 可以让每个核心都发挥作用。

The catch: query cancellation. A Postgres cancel request arrives on a brand-new connection carrying a cancel key, separate from the connection running the query. With `so_reuseport`, the kernel is free to hand that new connection to a different process than the one holding the session. The cancel lands on a process that has never heard of the query, and nothing happens. Peering fixes this. The processes are aware of one another, so a cancel that lands on the wrong process is forwarded to the one that actually owns the session. Cancellation works across the whole fleet, even though any given request can arrive anywhere.
问题在于：查询取消。Postgres 的取消请求是通过一个携带取消密钥的全新连接发送的，这与运行查询的连接是分开的。使用 `so_reuseport` 时，内核可能会将这个新连接分配给与持有会话的进程不同的另一个进程。这样，取消请求就会落到一个从未处理过该查询的进程上，从而导致请求失效。通过“对等互联”（Peering）可以解决这个问题。各个进程之间相互感知，因此如果取消请求落到了错误的进程上，它会被转发给真正持有该会话的进程。这样，即使请求可能到达任何地方，取消操作也能在整个集群中正常工作。

Pooling runs in transaction mode, so a server connection is returned to the pool the moment a transaction commits. And the connection budget is split across the fleet: `max_client_conn` and `max_db_connections` are divided by the number of processes, so the fleet as a whole never oversubscribes Postgres.
连接池以事务模式运行，因此一旦事务提交，服务器连接就会立即返回到池中。此外，连接配额会在集群中进行分配：`max_client_conn` 和 `max_db_connections` 会除以进程数量，确保整个集群永远不会导致 Postgres 连接超额。

### Seeing it on real hardware
### 在真实硬件上的表现

We ran both configurations on identical AWS EC2 instances: a 16-vCPU c7i.4xlarge for the pooler, a separate box for Postgres, and a third driving load with `pgbench` in select-only, transaction-pooled mode. One pooler box ran a single PgBouncer process; the other ran a fleet of 16. Same instance type, same Postgres, same workload. The only variable is one process versus sixteen.
我们在相同的 AWS EC2 实例上运行了两种配置：一台 16-vCPU 的 c7i.4xlarge 作为连接池服务器，一台独立的机器运行 Postgres，第三台机器使用 `pgbench` 在只读、事务池模式下施加负载。其中一台连接池服务器运行单个 PgBouncer 进程，另一台运行 16 个进程的集群。实例类型相同、Postgres 相同、工作负载相同。唯一的变量就是单进程与 16 进程的区别。

We ramped client connections from 8 to 256 and measured throughput and how much of the 16-core box each pooler actually used. The single process peaks around 87k transactions/sec and then gets worse under more load, sliding to 77k at 256 clients as everything contends for one core. The fleet keeps climbing to roughly 336k transactions/sec, about 4x, because it has more cores to climb into.
我们将客户端连接数从 8 增加到 256，并测量了吞吐量以及每个连接池实际占用的 16 核机器资源。单进程模式在 8.7 万次事务/秒左右达到峰值，随后在高负载下性能下降，在 256 个客户端时降至 7.7 万次，因为所有任务都在争抢同一个核心。而集群模式的吞吐量持续攀升至约 33.6 万次事务/秒，约为前者的 4 倍，因为它有更多的核心可以利用。

The single process never gets past about one core of work: under load, `pidstat` shows the PgBouncer process pinned at ~97% CPU, a full core, while the 16-vCPU box as a whole stays under 10% utilized. The fleet spreads across the machine, reaching roughly 8 cores busy, and it still had headroom when Postgres and the load generator became the limit.
单进程模式永远无法突破单核的限制：在高负载下，`pidstat` 显示 PgBouncer 进程的 CPU 占用率锁定在 97% 左右（即占满一个核心），而整台 16 vCPU 机器的利用率保持在 10% 以下。集群模式则将负载分散到整台机器上，大约有 8 个核心处于繁忙状态，并且在 Postgres 和负载生成器成为瓶颈时，它仍有余力。

Hold 256 clients steady against each box: the single-process box runs near 9% CPU for the entire run while the fleet holds around 52%. Same instance type, same Postgres, same workload. One configuration leaves the machine idle, the other puts it to work.
在 256 个客户端的稳定负载下：单进程机器在整个运行期间 CPU 利用率接近 9%，而集群模式保持在 52% 左右。同样的实例类型、同样的 Postgres、同样的工作负载。一种配置让机器闲置，另一种则让它充分发挥效能。

EC2's own CloudWatch metric says the same thing from outside the guest: during the load the single-process instance averages about 16% CPUUtilization, the fleet about 60%. CloudWatch reads a little higher than the in-guest number, but the same gap holds: on a box you're paying 16 vCPUs for, a single PgBouncer leaves almost all of it on the floor.
从外部观察，EC2 的 CloudWatch 指标也印证了这一点：在负载期间，单进程实例的平均 CPU 利用率约为 16%，而集群模式约为 60%。CloudWatch 的读数比虚拟机内部的数值略高，但差距是一致的：在你为 16 个 vCPU 付费的情况下，单个 PgBouncer 几乎浪费了所有的计算资源。

The connection ceiling behaves the same way. A single process enforces `max_client_conn` on its own, and once you cross it, new clients are turned away:
连接上限的表现也是如此。单个进程会自行强制执行 `max_client_conn`，一旦超过该限制，新客户端就会被拒绝：
`FATAL: no more connections allowed (max_client_conn)`

Splitting the budget across the fleet is what lets you raise the aggregate ceiling while keeping each process, and Postgres, within safe limits.
将配额分配到整个集群中，使你能够在提高总连接上限的同时，确保每个进程以及 Postgres 本身都处于安全范围内。

| Clients | Single TPS | Single box CPU | Fleet TPS | Fleet box CPU |
| :--- | :--- | :--- | :--- | :--- |
| 8 | 8,910 | 0.8% | 6,450 | 2.9% |
| 32 | 54,203 | 5.2% | 64,244 | 12.3% |
| 64 | 86,570 | 8.3% | 219,439 | 31.9% |
| 128 | 83,463 | 8.1% | 320,547 | 45.9% |
| 256 | 76,893 | 7.7% | 336,469 | 48.9% |

At a handful of connections the single process is actually fine, even a hair faster, since there's nothing to parallelize and the fleet's connections are spread thin. The gap opens exactly where it matters: under real concurrency, where one core becomes the wall.
在连接数较少时，单进程模式表现良好，甚至稍微快一点，因为此时没有并行化的必要，而集群模式的连接被分散了。差距出现在真正关键的地方：在高并发环境下，单核性能成为了瓶颈。

### The takeaway
### 总结

A single PgBouncer is a fine default until the pooler, not Postgres, is what caps your throughput. Sizing a fleet to the cores, sharing one port with `so_reuseport`, and wiring the processes together with peering turns the pooler back into plumbing instead of a bottleneck. Every ClickHouse Managed Postgres server ships with this setup by default.
在连接池（而非 Postgres）成为吞吐量瓶颈之前，单个 PgBouncer 是一个不错的默认选择。通过根据核心数调整集群规模、使用 `so_reuseport` 共享端口，并通过对等互联将进程连接起来，可以将连接池从瓶颈变回高效的管道。每个 ClickHouse Managed Postgres 服务器默认都采用这种配置。

[Try Postgres managed by ClickHouse](https://clickhouse.com/cloud)
[尝试 ClickHouse 管理的 Postgres](https://clickhouse.com/cloud)

ClickHouse + Postgres has become the unified data stack for applications that scale. With Managed Postgres now available in ClickHouse Cloud, this stack is a day-1 decision.
ClickHouse + Postgres 已成为可扩展应用的标准统一数据栈。随着 Managed Postgres 在 ClickHouse Cloud 中的推出，这一架构已成为项目启动时的首选方案。