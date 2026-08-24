---
title: "Copy Fail – CVE-2026-31431"
originalUrl: "https://copy.fail/"
date: "2026-04-30T00:50:20.617Z"
---

# Copy Fail – CVE-2026-31431

### The demo
Same script, four distributions, four root shells — in one take. The same exploit binary works unmodified on every Linux distribution.
### 演示
同一个脚本，四个发行版，四个 root shell —— 一次搞定。同一个漏洞利用二进制文件可以在所有 Linux 发行版上直接运行，无需修改。

tmux — copy fail demo live poc(exp) | sha256: a567d09b15f6e4440e70c9f2aa8edec8ed59f53301952df05c719aa3911687f9 | first revealed by this tweet ↗
tmux — copy fail 演示实时 poc(exp) | sha256: a567d09b15f6e4440e70c9f2aa8edec8ed59f53301952df05c719aa3911687f9 | 最早由这条推文披露 ↗

### Who is affected
If your kernel was built between 2017 and the patch — which covers essentially every mainstream Linux distribution — you're in scope. Copy Fail requires only an unprivileged local user account — no network access, no kernel debugging features, no pre-installed primitives. The kernel crypto API (AF_ALG) ships enabled in essentially every mainstream distro's default config, so the entire 2017 → patch window is in play out of the box.
### 受影响范围
如果你的内核是在 2017 年到补丁发布期间构建的（这涵盖了几乎所有主流 Linux 发行版），那么你就在受影响范围内。Copy Fail 仅需要一个无特权的本地用户账户——无需网络访问、无需内核调试功能、无需预装原语。内核加密 API (AF_ALG) 在几乎所有主流发行版的默认配置中都是启用的，因此整个 2017 年至补丁发布期间的内核版本均可直接利用。

Distributions we directly verified:
我们直接验证过的发行版：

| Distribution | Kernel |
| :--- | :--- |
| Ubuntu 24.04 LTS | 6.17.0-1007-aws |
| Amazon Linux 2023 | 6.18.8-9.213.amzn2023 |
| RHEL 14.3 | 6.12.0-124.45.1.el10_1 |
| SUSE 16 | 6.12.0-160000.9-default |

These are what we tested directly. Other distributions running affected kernels — Debian, Arch, Fedora, Rocky, Alma, Oracle, the embedded crowd — behave the same. Tested it elsewhere? Open an issue to add to the list.
以上是我们直接测试过的版本。其他运行受影响内核的发行版——如 Debian、Arch、Fedora、Rocky、Alma、Oracle 以及嵌入式系统——表现相同。如果你在其他地方测试过，请提交 Issue 将其加入列表。

### Should you patch first?
### 是否应优先打补丁？

*   **High: Multi-tenant Linux hosts** (Shared dev boxes, shell-as-a-service, jump hosts, build servers — anywhere multiple users share a kernel. any user becomes root)
    **高危：多租户 Linux 主机**（共享开发机、shell-as-a-service、跳板机、构建服务器——任何多个用户共享内核的环境。任何用户均可提权为 root）
*   **High: Kubernetes / container clusters** (The page cache is shared across the host. A pod with the right primitives compromises the node and crosses tenant boundaries. cross-container, cross-tenant)
    **高危：Kubernetes / 容器集群**（页缓存是跨主机共享的。拥有正确原语的 Pod 可以攻破节点并跨越租户边界。实现跨容器、跨租户攻击）
*   **High: CI runners & build farms** (GitHub Actions self-hosted runners, GitLab runners, Jenkins agents — anything that executes untrusted PR code as a regular user, on a shared kernel. a PR becomes root on the runner)
    **高危：CI Runner 和构建农场**（GitHub Actions 自托管 Runner、GitLab Runner、Jenkins Agent——任何以普通用户身份在共享内核上执行不可信 PR 代码的环境。PR 可在 Runner 上获得 root 权限）
*   **High: Cloud SaaS running user code** (Notebook hosts, agent sandboxes, serverless functions, any tenant-supplied container or script. tenant becomes host root)
    **高危：运行用户代码的云 SaaS**（Notebook 主机、Agent 沙箱、无服务器函数、任何租户提供的容器或脚本。租户可获得主机 root 权限）
*   **Medium: Standard Linux servers** (Single-tenant production where only your team has shell access. internal LPE; chains with web RCE or stolen creds)
    **中危：标准 Linux 服务器**（仅有你的团队拥有 shell 访问权限的单租户生产环境。属于内部 LPE；可与 Web RCE 或被盗凭据结合使用）
*   **Lower: Single-user laptops & workstations** (You're already the only user. The bug doesn't grant remote attackers access by itself, but any local code execution becomes root. post-exploitation step-up)
    **低危：单用户笔记本电脑和工作站**（你已经是唯一用户。该漏洞本身不会授予远程攻击者访问权限，但任何本地代码执行都将变为 root。属于后渗透阶段的提权）

### Exploit
The PoC is published so defenders can verify their own systems and validate vendor patches. Use responsibly. Run only on systems you own or have written authorization to test. The script edits the page cache of a setuid binary; the change is not persistent across reboot, but the resulting root shell is real. Don't run it on production.
### 漏洞利用
发布 PoC 是为了让防御者能够验证自己的系统并确认厂商补丁的有效性。请负责任地使用。仅在你自己拥有或获得书面授权测试的系统上运行。该脚本会编辑 setuid 二进制文件的页缓存；更改在重启后不会持久化，但由此获得的 root shell 是真实的。请勿在生产环境中运行。

### Mitigation
Patch first. Update your distribution's kernel package to one that includes mainline commit a664bf3d603d — it reverts the 2017 algif_aead in-place optimization, so page-cache pages can no longer end up in the writable destination scatterlist. Most major distributions are shipping the fix now.
### 缓解措施
优先打补丁。将你的发行版内核包更新到包含主线提交 a664bf3d603d 的版本——它撤销了 2017 年的 algif_aead 原地优化，因此页缓存页面将不再进入可写的目标散列表（scatterlist）。大多数主流发行版现在都已发布修复程序。

Before you can patch: disable the algif_aead module.
在打补丁之前：禁用 algif_aead 模块。

```bash
# echo "install algif_aead /bin/false" > /etc/modprobe.d/disable-algif.conf
# rmmod algif_aead 2>/dev/null || true
```

### Disclosure timeline
### 披露时间线
*   2026-03-23: Reported to Linux kernel security team (报告给 Linux 内核安全团队)
*   2026-03-24: Initial acknowledgment (初步确认)
*   2026-03-25: Patches proposed and reviewed (补丁提出并审核)
*   2026-04-01: Patch committed to mainline (补丁提交至主线)
*   2026-04-22: CVE-2026-31431 assigned (分配 CVE-2026-31431)
*   2026-04-29: Public disclosure (公开披露)