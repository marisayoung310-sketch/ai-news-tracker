---
title: "Show HN: Bor – Open-source policy management for Linux desktops"
originalUrl: "https://getbor.dev/blog/2026-08-02-bor-v080-release/"
date: "2026-08-02T22:14:07.666Z"
---

# Show HN: Bor – Open-source policy management for Linux desktops

**Bor v0.8.0 released**
Bor v0.8.0 发布了。

Bor v0.8.0 is out. This release adds three new policy types — Thunderbird, Microsoft Edge for Business, and Firewalld zones — alongside a full web UI overhaul, finer-grained RBAC, and a dedicated security hardening pass. The complete changelog is on the GitHub release page.
Bor v0.8.0 现已发布。此版本增加了三种新的策略类型——Thunderbird、Microsoft Edge for Business 和 Firewalld 区域——同时对 Web UI 进行了全面升级，引入了更细粒度的 RBAC（基于角色的访问控制），并进行了专门的安全加固。完整的更新日志可在 GitHub 发布页面查看。

**Thunderbird policy type**
**Thunderbird 策略类型**

Mozilla Thunderbird can now be managed on enrolled desktops with the same mechanism used for Firefox ESR. The agent writes the managed policies.json that Thunderbird expects, merged from all bound policies, and removing the last policy restores the original file. Flatpak installations are detected and enforced alongside RPM/DEB installations, and the managed file is protected by the tamper watcher — external edits are detected and immediately restored. The web UI ships a full policy editor with the complete Thunderbird policy catalogue.
现在，可以通过与 Firefox ESR 相同的机制来管理已注册桌面上的 Mozilla Thunderbird。代理程序会写入 Thunderbird 所需的 `policies.json` 管理文件，该文件由所有绑定的策略合并而成；当移除最后一条策略时，系统会恢复原始文件。该功能支持检测并强制执行 Flatpak 安装以及 RPM/DEB 安装，且管理文件受防篡改监控保护——外部编辑会被立即检测并恢复。Web UI 提供了一个完整的策略编辑器，包含完整的 Thunderbird 策略目录。

**Microsoft Edge for Business policy type**
**Microsoft Edge for Business 策略类型**

For fleets running Edge on Linux, the agent writes bor_managed.json into each Edge managed-policy directory and cleans it up from every directory when the last bound policy is removed. The web UI provides a tree-based editor with the Edge policy catalogue, JSON validation, and a setting preview before enabling.
对于在 Linux 上运行 Edge 的设备集群，代理程序会将 `bor_managed.json` 写入每个 Edge 管理策略目录，并在移除最后一条绑定策略时从所有目录中清理该文件。Web UI 提供了一个基于树状结构的编辑器，包含 Edge 策略目录、JSON 验证以及启用前的设置预览功能。

**Firewalld zone policy type**
**Firewalld 区域策略类型**

The new Firewalld policy type manages firewalld zones on enrolled nodes: services, ports, forward ports, rich rules, masquerade, interfaces, sources, and the zone target. The agent writes zone XML to /etc/firewalld/zones/, validates it with firewall-cmd --check-config, and reloads firewalld. Like all other managed files, the zone files are tamper-protected.
新的 Firewalld 策略类型用于管理已注册节点上的 firewalld 区域：包括服务、端口、转发端口、富规则（rich rules）、伪装（masquerade）、接口、源以及区域目标。代理程序将区域 XML 写入 `/etc/firewalld/zones/`，使用 `firewall-cmd --check-config` 进行验证，并重新加载 firewalld。与其他所有受管文件一样，区域文件也受到防篡改保护。

**Polkit: variable conditions**
**Polkit：变量条件**

Polkit rules now support variable conditions via action.lookup(), so a rule can match on action variables — for example allowing mounts only for removable drives. Also fixed: multiple action IDs in one rule are now correctly joined with ||.
Polkit 规则现在通过 `action.lookup()` 支持变量条件，因此规则可以匹配操作变量——例如，仅允许挂载可移动驱动器。此外，修复了一个问题：现在同一规则中的多个操作 ID 可以正确地通过 `||` 进行连接。

**Per-action RBAC**
**基于操作的 RBAC**

User and role administration is now guarded by per-action permissions instead of a single blanket permission, allowing finer-grained delegation of admin duties.
用户和角色管理现在由针对具体操作的权限进行保护，而不是单一的笼统权限，从而实现了更细粒度的管理职责委派。

**Web UI overhaul**
**Web UI 全面升级**

A full modernization pass over the PatternFly 6 interface, spanning several UX sprints. The dashboard shows the new look — grouped sidebar navigation, a single left-aligned page title, and stat tiles that drill down to pre-filtered lists: click Offline and you land on the Nodes page already filtered to offline nodes.
对 PatternFly 6 界面进行了全面的现代化改造，历经数个 UX 开发周期。仪表板呈现了全新的外观：分组的侧边栏导航、左对齐的页面标题，以及可深入查看预过滤列表的统计磁贴：例如点击“离线”，你将直接进入已过滤出离线节点的“节点”页面。

The highlights:
亮点包括：

*   **URL routing** — every page has a real URL with working browser back/forward and deep links; expired sessions redirect to login; a global error boundary prevents white-screen crashes.
    **URL 路由** — 每个页面都有真实的 URL，支持浏览器前进/后退和深度链接；过期会话会自动重定向到登录页面；全局错误边界防止了白屏崩溃。
*   **Full-page policy editor** — the policy editor is now a routed page (/policies/:id/edit) instead of nested modals.
    **全页策略编辑器** — 策略编辑器现在是一个独立的路由页面（`/policies/:id/edit`），不再使用嵌套的模态框。
*   **Policy safety rails** — unsaved-changes guard, confirmation for destructive type changes, JSON validation for Chrome/Edge values, a read-only Configuration view for released policies, and setting previews in the tree editors.
    **策略安全防护** — 包括未保存更改的保护、破坏性类型更改的确认、Chrome/Edge 值的 JSON 验证、已发布策略的只读配置视图，以及树状编辑器中的设置预览。
*   **Scalable lists** — server-side pagination, filtering, and sorting for Nodes and Compliance; search, sorting, and empty states across all list pages.
    **可扩展列表** — 为“节点”和“合规性”提供服务器端分页、过滤和排序功能；所有列表页面均支持搜索、排序和空状态显示。
*   **Destructive-action protection** — type-to-confirm dialogs for all resource deletes, plus server-side guards that prevent deleting, disabling, or demoting the last Super Admin.
    **破坏性操作保护** — 所有资源删除操作均需输入确认，并设有服务器端防护，防止删除、禁用或降级最后一名超级管理员。
*   **Accessibility (WCAG 2.2 AA)** — accessible tree roles in the policy editors, aria-live status messages, focus-ring and dark-mode/high-contrast correctness via PatternFly 6 design tokens, and an accessibility lint gate in CI.
    **无障碍访问 (WCAG 2.2 AA)** — 策略编辑器中可访问的树状角色、aria-live 状态消息、通过 PatternFly 6 设计令牌实现的焦点环和深色模式/高对比度正确性，以及 CI 中的无障碍检查门禁。

**Proto-driven policy catalogues**
**基于 Proto 的策略目录**

The Firefox, Thunderbird, Chrome, and Edge policy catalogues shown in the web UI are now generated from protobuf annotations — one source of truth shared by the server, agent, and frontend.
Web UI 中显示的 Firefox、Thunderbird、Chrome 和 Edge 策略目录现在由 protobuf 注解生成——这是服务器、代理和前端共享的唯一事实来源。

**Security hardening**
**安全加固**

This release includes a dedicated hardening pass:
此版本包含专门的安全加固：

*   Agent identity is now strictly bound to the mTLS client certificate, and MFA/RBAC enforcement paths were hardened on the server.
    代理身份现在严格绑定到 mTLS 客户端证书，服务器上的 MFA/RBAC 执行路径也得到了加固。
*   Legacy SHA-256-encrypted TOTP secrets are transparently migrated to HKDF-derived encryption on first read.
    旧版 SHA-256 加密的 TOTP 密钥在首次读取时会透明地迁移到基于 HKDF 的加密方式。
*   The Ubuntu PPA and Fedora COPR repository import helpers now block redirect-based SSRF; only allowlisted redirect targets are followed.
    Ubuntu PPA 和 Fedora COPR 存储库导入助手现在会阻止基于重定向的 SSRF；仅允许跟随白名单中的重定向目标。
*   Audit log CSV export is guarded against spreadsheet formula injection.
    审计日志 CSV 导出功能增加了针对电子表格公式注入的防护。
*   The auto-generated initial admin password is no longer printed to the server log (where it would land in journald or centralized logging); it is written to a root-only file instead.
    自动生成的初始管理员密码不再打印到服务器日志（此前会进入 journald 或集中式日志系统）；现在它被写入一个仅 root 可读的文件中。
*   The server TLS certificate is automatically regenerated when its SANs no longer match the configured hostnames.
    当服务器 TLS 证书的 SAN 不再匹配配置的主机名时，证书会自动重新生成。
*   All open Dependabot alerts were resolved, including the react-router RSC CSRF advisory (GHSA-qwww-vcr4-c8h2).
    所有未解决的 Dependabot 警报均已修复，包括 react-router RSC CSRF 漏洞 (GHSA-qwww-vcr4-c8h2)。

**Platform updates**
**平台更新**

The frontend moved to React 19.2 and react-router 8.3, with TypeScript typecheck now enforced in CI. Server and agent dependencies were bumped, including gRPC 1.82.1 and golang.org/x/crypto 0.52.0.
前端已迁移至 React 19.2 和 react-router 8.3，并在 CI 中强制执行 TypeScript 类型检查。服务器和代理的依赖项也已升级，包括 gRPC 1.82.1 和 golang.org/x/crypto 0.52.0。

**Upgrade notes**
**升级说明**

*   Agents must be upgraded to v0.8.0 to enforce the new Thunderbird, Edge, and Firewalld policy types; older agents ignore policy types they do not understand.
    代理必须升级到 v0.8.0 才能强制执行新的 Thunderbird、Edge 和 Firewalld 策略类型；旧版本代理会忽略其无法识别的策略类型。
*   The protobuf policy schema gained thunderbird.proto and firewalld.proto and extends the polkit and edge messages — regenerate any external tooling built against proto/policy/.
    Protobuf 策略模式增加了 `thunderbird.proto` 和 `firewalld.proto`，并扩展了 polkit 和 edge 消息——请重新生成任何基于 `proto/policy/` 构建的外部工具。
*   Frontend development now requires Node.js 22.22+.
    前端开发现在需要 Node.js 22.22+。

**Download**
**下载**

Packages for Debian/Ubuntu, RHEL/Fedora/SUSE, Alpine Linux, and Arch Linux across x86_64, aarch64, and ppc64le are available on the Download page.
适用于 Debian/Ubuntu、RHEL/Fedora/SUSE、Alpine Linux 和 Arch Linux（支持 x86_64、aarch64 和 ppc64le 架构）的软件包可在下载页面获取。