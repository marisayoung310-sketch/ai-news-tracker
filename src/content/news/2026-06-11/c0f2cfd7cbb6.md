---
title: "Claude Desktop spawns 1.8 GB Hyper-V VM on every launch, even for chat-only use"
originalUrl: "https://github.com/anthropics/claude-code/issues/29045"
date: "2026-06-10T23:00:48.251Z"
---

### Claude Desktop spawns 1.8 GB Hyper-V VM on every launch, even for chat-only use
### Claude Desktop 每次启动都会生成 1.8 GB 的 Hyper-V 虚拟机，即使仅用于聊天

**Summary**
The Claude Desktop app launches a Hyper-V virtual machine (Vmmem) consuming approximately 1.8 GB of RAM every time it starts — even when the user only needs chat functionality and has no intention of using Cowork or agent mode. On a 16 GB laptop, this represents over 11% of total memory consumed by infrastructure that isn't being used.

**摘要**
Claude Desktop 应用程序每次启动时都会运行一个占用约 1.8 GB 内存的 Hyper-V 虚拟机（Vmmem），即使在用户仅需要聊天功能、且无意使用 Cowork 或代理模式的情况下也是如此。对于一台 16 GB 内存的笔记本电脑而言，这意味着超过 11% 的总内存被闲置的基础设施所占用。

**What Happens**
On every launch, the Claude Desktop app triggers the Hyper-V Host Compute Service (vmcompute) via an RPC interface event, which spawns a vmwp.exe process hosting a full virtual machine. This VM appears as "Vmmem" in Task Manager at approximately 1,796–1,846 MB. The Hyper-V Compute Admin event log shows repeated errors: "The specified property query is invalid: The virtual machine or container JSON document is invalid. (0xC037010D, 'Invalid JSON document '$'')" These errors have been occurring since at least 2/19/2026, triggered on every boot and app launch.

**发生了什么**
每次启动时，Claude Desktop 应用程序都会通过 RPC 接口事件触发 Hyper-V 主机计算服务（vmcompute），从而生成一个托管完整虚拟机的 vmwp.exe 进程。该虚拟机在任务管理器中显示为“Vmmem”，占用约 1,796–1,846 MB 内存。Hyper-V 计算管理事件日志中反复出现错误：“指定的属性查询无效：虚拟机或容器 JSON 文档无效。(0xC037010D, 'Invalid JSON document '$'')”。这些错误至少从 2026 年 2 月 19 日起就开始出现，且在每次开机和应用启动时都会触发。

**Root Cause Investigation**
Through extensive PowerShell diagnostics, we confirmed that the only enabled virtualization feature is VirtualMachinePlatform. The vmcompute service is set to Manual start but is triggered at boot by an RPC interface event. We found 2,689 stale session files in `%APPDATA%\Claude\local-agent-mode-sessions\` — all from previous Cowork sessions that were never cleaned up. Even after deleting all 2,689 files and killing vmcompute/vmwp, simply reopening the Claude Desktop app immediately respawned the VM and the 1.8 GB Vmmem process.

**根本原因调查**
通过详尽的 PowerShell 诊断，我们确认唯一启用的虚拟化功能是 VirtualMachinePlatform。vmcompute 服务被设置为手动启动，但会在开机时通过 RPC 接口事件触发。我们在 `%APPDATA%\Claude\local-agent-mode-sessions\` 目录下发现了 2,689 个陈旧的会话文件，这些文件均来自之前未清理的 Cowork 会话。即使在删除了所有 2,689 个文件并终止了 vmcompute/vmwp 进程后，重新打开 Claude Desktop 应用程序仍会立即重新生成该虚拟机及 1.8 GB 的 Vmmem 进程。

**Impact**
On a 16 GB system, this bug causes memory usage to jump from ~50% to ~62% at idle before the user does anything. Combined with normal application load, this pushes total usage to 70–75%, causing system sluggishness and forcing the user to manually kill VM processes after every launch.

**影响**
在 16 GB 内存的系统上，此漏洞会导致系统在空闲状态下、用户进行任何操作前，内存占用率从约 50% 跳升至 62%。加上正常的应用程序负载，总内存占用会达到 70–75%，导致系统运行缓慢，并迫使用户在每次启动后手动终止虚拟机进程。

**Expected Behavior**
The Claude Desktop app should not spawn a VM for chat-only sessions. If Cowork infrastructure is needed, it should initialize on demand — only when the user actually starts a Cowork/agent session. Stale session files from previous Cowork sessions should be cleaned up automatically, not accumulate indefinitely. The app should fall back to chat-only mode if VM initialization fails or is unnecessary, rather than unconditionally starting VM infrastructure.

**预期行为**
Claude Desktop 应用程序不应在仅进行聊天会话时生成虚拟机。如果需要 Cowork 基础设施，应按需初始化——即仅在用户实际启动 Cowork/代理会话时才启动。来自之前 Cowork 会话的陈旧文件应自动清理，而不是无限期堆积。如果虚拟机初始化失败或非必要，应用程序应回退到纯聊天模式，而不是无条件启动虚拟机基础设施。

**Current Workaround**
The only reliable workaround is to disable VirtualMachinePlatform entirely:
`Disable-WindowsOptionalFeature -Online -FeatureName "VirtualMachinePlatform" -NoRestart`
Alternatively, the user can kill the VM processes after every launch:
`Stop-Process -Name vmwp -Force`
`Stop-Process -Name vmcompute -Force`
Chat functionality continues to work normally after killing these processes.

**当前临时解决方案**
唯一可靠的临时方案是完全禁用 VirtualMachinePlatform：
`Disable-WindowsOptionalFeature -Online -FeatureName "VirtualMachinePlatform" -NoRestart`
或者，用户可以在每次启动后手动终止虚拟机进程：
`Stop-Process -Name vmwp -Force`
`Stop-Process -Name vmcompute -Force`
在终止这些进程后，聊天功能仍可正常使用。