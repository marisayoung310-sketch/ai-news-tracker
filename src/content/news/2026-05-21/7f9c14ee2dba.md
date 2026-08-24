---
title: "Incident Report: May 19, 2026 – GCP Account Suspension"
originalUrl: "https://blog.railway.com/p/incident-report-may-19-2026-gcp-account-outage"
date: "2026-05-20T22:49:42.992Z"
---

# Incident Report: May 19, 2026 – GCP Account Suspension
# 事件报告：2026年5月19日 – GCP 账户被暂停

Chandrika Khanduri & Cody De Arkland | May 20, 2026
Chandrika Khanduri 与 Cody De Arkland | 2026年5月20日

This report reflects what we know at time of publication and may be updated pending Google Cloud's internal review. Railway experienced a platform-wide service disruption due to Google Cloud incorrectly placing our account in a suspended status. This resulted in a temporary loss of service for all GCP hosted infrastructure. This infrastructure supports our dashboard, API, and pieces of our network infrastructure. As cached network routes expired, the outage extended beyond GCP to affect all Railway workloads. Below, we walk through what happened, how we responded, and what we're doing to prevent a similar incident in the future.
本报告反映了我们在发布时所掌握的情况，并可能根据 Google Cloud 的内部审查结果进行更新。由于 Google Cloud 错误地将我们的账户置于暂停状态，Railway 经历了全平台的服务中断。这导致所有托管在 GCP 上的基础设施暂时失去服务。这些基础设施支撑着我们的仪表板、API 以及部分网络基础设施。随着缓存的网络路由过期，中断范围超出了 GCP，影响了所有的 Railway 工作负载。以下我们将详细说明事件经过、我们的应对措施，以及我们为防止此类事件再次发生所采取的措施。

### Impact
### 影响范围

On May 19, 2026 between 22:20 UTC and approximately 06:14 UTC on May 20 (~8 hours), Railway experienced a platform-wide outage after Google Cloud suspended services on our production account. This took our API, control plane and databases offline, along with compute infrastructure hosted on Google Cloud.
2026年5月19日 22:20 UTC 至 5月20日约 06:14 UTC（约 8 小时）期间，在 Google Cloud 暂停我们的生产账户服务后，Railway 经历了全平台中断。这导致我们的 API、控制平面和数据库下线，同时托管在 Google Cloud 上的计算基础设施也随之瘫痪。

Users immediately experienced 503 errors on the dashboard and API, including "no healthy upstream" and "unconditional drop overload" messages, and were unable to log in. All workloads hosted on Google Cloud compute were taken offline.
用户在仪表板和 API 上立即遇到了 503 错误，包括“无健康上游 (no healthy upstream)”和“无条件丢弃过载 (unconditional drop overload)”消息，且无法登录。所有托管在 Google Cloud 计算资源上的工作负载均已下线。

While workloads on our own Railway Metal and AWS burst-cloud environments remained up, Railway's edge proxies rely on a Google Cloud-hosted control plane API to populate their routing tables, causing the outage to cascade beyond Google Cloud. As the route caches expired, these other workloads became unreachable, resulting in returning 404 errors as the network control plane could no longer resolve routes to active instances. At peak impact, all Railway workloads across all regions were rendered unreachable.
虽然我们自有的 Railway Metal 和 AWS 突发云环境上的工作负载保持运行，但 Railway 的边缘代理依赖于托管在 Google Cloud 上的控制平面 API 来填充路由表，这导致中断范围超出了 Google Cloud。随着路由缓存过期，这些其他工作负载变得无法访问，由于网络控制平面无法再解析到活动实例的路由，导致返回 404 错误。在影响高峰期，所有区域的所有 Railway 工作负载均无法访问。

As we recovered our Google Cloud environment, builds and deployments were blocked platform-wide while we restored the individual services. Once the entirety of our infrastructure was restored, a significant backlog of queued deploys was gradually drained to avoid overwhelming the platform. In parallel, GitHub began rate-limiting Railway's OAuth and webhook integrations, temporarily blocking logins and builds. The volume of these calls increased as a result of our caches being cleared from the Google Cloud outage. As a side effect, Terms-of-service acceptance records were also reset, prompting users to re-accept on their next visit to the dashboard.
在我们恢复 Google Cloud 环境时，全平台的构建和部署被阻塞，直到我们恢复了各个独立服务。一旦我们的基础设施全部恢复，大量积压的部署队列被逐步处理，以避免压垮平台。与此同时，GitHub 开始对 Railway 的 OAuth 和 Webhook 集成进行速率限制，暂时阻止了登录和构建。由于 Google Cloud 中断导致我们的缓存被清除，这些调用量激增。作为副作用，服务条款接受记录也被重置，提示用户在下次访问仪表板时重新接受。

We take full responsibility for the architectural decisions that allowed a single upstream provider action to cascade into a platform-wide outage, and detail below what happened, how we recovered, and the changes we are making to prevent this from happening again.
我们对导致单一上游供应商的操作演变成全平台中断的架构决策承担全部责任，并在下文详细说明了事件经过、我们的恢复过程，以及我们为防止此类事件再次发生而正在进行的改进。

### Incident Timeline
### 事件时间线

*   **May 19, 22:10 UTC** - Our automated monitoring detected API health check failures and paged our on-calls, who started investigating the issue.
    **5月19日 22:10 UTC** - 我们的自动监控检测到 API 健康检查失败，并呼叫了值班人员，他们开始调查该问题。
*   **May 19, 22:11 UTC** - Dashboard returning 503 errors. Users unable to log in.
    **5月19日 22:11 UTC** - 仪表板返回 503 错误。用户无法登录。
*   **May 19, 22:19 UTC** - Root cause identified: Google Cloud Platform has suspended Railway's production account.
    **5月19日 22:19 UTC** - 确定根本原因：Google Cloud Platform 暂停了 Railway 的生产账户。
*   **May 19, 22:22 UTC** - P0 ticket filed with Google Cloud. Railway's GCP account manager engaged directly.
    **5月19日 22:22 UTC** - 向 Google Cloud 提交 P0 工单。Railway 的 GCP 客户经理直接介入。
*   **May 19, 22:29 UTC** - Incident declared.
    **5月19日 22:29 UTC** - 宣布进入事故状态。
*   **May 19, 22:29 UTC** - GCP account access restored. All compute instances remained stopped and persistent disks inaccessible.
    **5月19日 22:29 UTC** - GCP 账户访问权限恢复。所有计算实例保持停止状态，持久化磁盘无法访问。
*   **May 19, 22:35 UTC** - Cached network routes began expiring; workloads on Railway Metal and AWS began returning 404 errors as the networking could no longer resolve routes.
    **5月19日 22:35 UTC** - 缓存的网络路由开始过期；由于网络无法再解析路由，Railway Metal 和 AWS 上的工作负载开始返回 404 错误。
*   **May 19, 23:09 UTC** - First persistent disk comes back online.
    **5月19日 23:09 UTC** - 第一个持久化磁盘恢复在线。
*   **May 19, 23:54 UTC** - All persistent disks restored to ready state. Network still down.
    **5月19日 23:54 UTC** - 所有持久化磁盘恢复至就绪状态。网络仍处于中断状态。
*   **May 20, 00:39 UTC** - Disks confirmed ready. Recovery blocked on Google Cloud networking restoration.
    **5月20日 00:39 UTC** - 磁盘确认就绪。恢复工作受阻于 Google Cloud 网络恢复。
*   **May 20, 01:30 UTC** - Compute instances began recovering.
    **5月20日 01:30 UTC** - 计算实例开始恢复。
*   **May 20, 01:38 UTC** - Edge traffic being served again. Networking restored.
    **5月20日 01:38 UTC** - 边缘流量恢复服务。网络已恢复。
*   **May 20, 01:57 UTC** - Orchestration and build infrastructure restored. Deploys temporarily paused to prevent overwhelming systems as queued work attempted to execute simultaneously.
    **5月20日 01:57 UTC** - 编排和构建基础设施恢复。部署暂时暂停，以防止积压的任务同时执行导致系统过载。
*   **May 20, 02:04 UTC** - Compute hosts being brought back online incrementally.
    **5月20日 02:04 UTC** - 计算主机逐步恢复在线。
*   **May 20, 02:47 UTC** - GitHub began rate-limiting Railway's OAuth and webhook integrations; some users unable to log in, builds blocked.
    **5月20日 02:47 UTC** - GitHub 开始对 Railway 的 OAuth 和 Webhook 集成进行速率限制；部分用户无法登录，构建被阻塞。
*   **May 20, 02:55 UTC** - Dashboard accessible again.
    **5月20日 02:55 UTC** - 仪表板恢复访问。
*   **May 20, 03:59 UTC** - Deployments beginning to process again across all tiers.
    **5月20日 03:59 UTC** - 所有层级的部署开始重新处理。
*   **May 20, 04:00 UTC** - API, dashboard, and OAuth endpoints confirmed operational. Remaining workloads continuing to restore.
    **5月20日 04:00 UTC** - API、仪表板和 OAuth 端点确认正常运行。剩余工作负载继续恢复中。
*   **May 20, 06:14 UTC** - Incident moved to monitoring.
    **5月20日 06:14 UTC** - 事故转入监控阶段。
*   **May 20, 07:58 UTC** - Incident is resolved.
    **5月20日 07:58 UTC** - 事故已解决。

### What Happened?
### 发生了什么？

At 22:20 UTC on May 19, Google Cloud placed Railway’s production account into a suspended status incorrectly, as part of an automated action. This action extended to many accounts within Google Cloud. As this was a platform-wide action, there was no proactive outreach to individual customers prior to the restriction.
5月19日 22:20 UTC，作为一项自动化操作的一部分，Google Cloud 错误地将 Railway 的生产账户置于暂停状态。此操作波及了 Google Cloud 内的许多账户。由于这是一项全平台操作，在限制生效前，没有针对个别客户的主动通知。

This suspended status disabled our GCP related infrastructure, which supports the Railway Dashboard, API and parts of our Network infrastructure, along with additional burst-compute infrastructure hosted on Google Cloud.
这种暂停状态禁用了我们与 GCP 相关的基础设施，这些基础设施支撑着 Railway 仪表板、API 和部分网络基础设施，以及托管在 Google Cloud 上的额外突发计算基础设施。

Railway's control plane is a set of a core dependencies that serves the dashboard, processes builds and deployments, and populates the routing tables used by our edge. The impact was immediate for all workloads on Google Cloud.
Railway 的控制平面是一组核心依赖项，用于服务仪表板、处理构建和部署，并填充我们边缘节点使用的路由表。这对 Google Cloud 上的所有工作负载产生了直接影响。

Railway's edge proxies maintain a cache of routing tables from the network control plane, which is hosted within Google Cloud. While that cache held, workloads on Railway Metal and AWS continued to serve traffic. Once the cache expired, the edge could no longer resolve routes to active instances, and workloads across all regions, including Metal and AWS, began returning 404 errors. This caused the network outage impact to cascade beyond Google Cloud, into these regions as well, even though the workloads themselves remained online.
Railway 的边缘代理维护着来自网络控制平面的路由表缓存，该控制平面托管在 Google Cloud 内。在缓存有效期间，Railway Metal 和 AWS 上的工作负载继续处理流量。一旦缓存过期，边缘节点无法再解析到活动实例的路由，包括 Metal 和 AWS 在内的所有区域的工作负载开始返回 404 错误。这导致网络中断的影响超出了 Google Cloud，蔓延到了这些区域，尽管工作负载本身仍然在线。

Railway's infrastructure is designed for high availability. Our databases run across multiple availability zones, and our network uses redundant connections...
Railway 的基础设施旨在实现高可用性。我们的数据库跨多个可用区运行，我们的网络使用冗余连接……