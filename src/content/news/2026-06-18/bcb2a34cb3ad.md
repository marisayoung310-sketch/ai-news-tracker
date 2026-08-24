---
title: "DeusData / codebase-memory-mcp"
originalUrl: "https://github.com/DeusData/codebase-memory-mcp"
date: "2026-06-17T22:58:34.608Z"
---

# DeusData / codebase-memory-mcp

**codebase-memory-mcp** is the fastest and most efficient code intelligence engine for AI coding agents. It can fully index an average repository in milliseconds, and the Linux kernel (28M LOC, 75K files) in just 3 minutes. It answers structural queries in under 1ms. It ships as a single static binary for macOS, Linux, and Windows—simply download, run the install script, and you're done. It provides high-quality parsing through tree-sitter AST analysis across all 158 supported languages, enhanced with Hybrid LSP semantic type resolution for Python, TypeScript / JavaScript / JSX / TSX, PHP, C#, Go, C, C++, Java, Kotlin, and Rust—producing a persistent knowledge graph of functions, classes, call chains, HTTP routes, and cross-service links. It includes 14 MCP tools, has zero dependencies, and is plug-and-play across 11 different coding agents.

**codebase-memory-mcp** 是专为 AI 编程代理打造的最快、最高效的代码智能引擎。它能在毫秒级完成普通代码库的完整索引，处理 Linux 内核（2800 万行代码，7.5 万个文件）仅需 3 分钟。结构化查询响应时间低于 1 毫秒。该工具以单一静态二进制文件形式发布，支持 macOS、Linux 和 Windows——下载并运行安装脚本即可完成。通过对 158 种语言进行 Tree-sitter AST 分析，并结合 Python、TypeScript/JavaScript/JSX/TSX、PHP、C#、Go、C、C++、Java、Kotlin 和 Rust 的混合 LSP 语义类型解析，它能生成包含函数、类、调用链、HTTP 路由和跨服务链接的持久化知识图谱。它内置 14 个 MCP 工具，零依赖，且可即插即用适配 11 种主流编程代理。

### Research
The design and benchmarks behind this project are described in the preprint *Codebase-Memory: Tree-Sitter-Based Knowledge Graphs for LLM Code Exploration via MCP* (arXiv:2603.27277). Evaluated across 31 real-world repositories, it achieved 83% answer quality, 10× fewer tokens, and 2.1× fewer tool calls compared to file-by-file exploration.

### 研究
该项目背后的设计理念与基准测试详见预印本论文《Codebase-Memory: Tree-Sitter-Based Knowledge Graphs for LLM Code Exploration via MCP》(arXiv:2603.27277)。在 31 个真实代码库的评估中，与逐文件探索方式相比，该工具实现了 83% 的回答准确率，Token 消耗减少了 10 倍，工具调用次数减少了 2.1 倍。

### Security & Trust
This tool reads your codebase and writes to your agent configuration files. That is what it is designed to do. If you prefer to audit before running, the full source is here—every release binary is signed, checksummed, and scanned by 70+ antivirus engines. All processing happens 100% locally; your code never leaves your machine. Found a security issue? We want to know—see SECURITY.md. Security is Priority #1 for us.

### 安全与信任
该工具会读取您的代码库并写入代理配置文件，这是其核心设计功能。如果您希望在运行前进行审计，完整源代码已公开。每个发布的二进制文件均经过签名、校验，并由 70 多款杀毒引擎扫描。所有处理过程 100% 在本地完成，您的代码绝不会离开您的机器。发现安全问题？请务必告知我们——请参阅 SECURITY.md。安全是我们首要关注的重点。

### Why codebase-memory-mcp
*   **Extreme indexing speed:** Linux kernel (28M LOC, 75K files) in 3 minutes. RAM-first pipeline: LZ4 compression, in-memory SQLite, fused Aho-Corasick pattern matching. Memory released after indexing.
*   **Plug and play:** Single static binary for macOS (arm64/amd64), Linux (arm64/amd64), and Windows (amd64). No Docker, no runtime dependencies, no API keys. Download → install → restart agent → done.
*   **158 languages:** Vendored tree-sitter grammars compiled into the binary. Nothing to install, nothing that breaks.
*   **120x fewer tokens:** 5 structural queries: ~3,400 tokens vs ~412,000 via file-by-file search. One graph query replaces dozens of grep/read cycles.
*   **11 agents, one command:** Install auto-detects Claude Code, Codex CLI, Gemini CLI, Zed, OpenCode, Antigravity, Aider, KiloCode, VS Code, OpenClaw, and Kiro—configures MCP entries, instruction files, and pre-tool hooks for each.
*   **Built-in graph visualization:** 3D interactive UI at localhost:9749 (optional UI binary variant).
*   **Infrastructure-as-code indexing:** Dockerfiles, Kubernetes manifests, and Kustomize overlays indexed as graph nodes with cross-references. Resource nodes for K8s kinds, Module nodes for Kustomize overlays with IMPORTS edges to referenced resources.
*   **14 MCP tools:** Search, trace, architecture, impact analysis, Cypher queries, dead code detection, cross-service HTTP linking, ADR management, and more.

### 为什么选择 codebase-memory-mcp
*   **极致索引速度：** 处理 Linux 内核（2800 万行代码，7.5 万个文件）仅需 3 分钟。采用内存优先流水线：LZ4 压缩、内存 SQLite、融合 Aho-Corasick 模式匹配。索引完成后释放内存。
*   **即插即用：** 提供 macOS (arm64/amd64)、Linux (arm64/amd64) 和 Windows (amd64) 的单一静态二进制文件。无需 Docker，无需运行时依赖，无需 API Key。下载 → 安装 → 重启代理 → 完成。
*   **158 种语言：** 内置编译好的 Tree-sitter 语法库。无需安装额外组件，运行稳定。
*   **Token 消耗减少 120 倍：** 5 次结构化查询仅需约 3,400 个 Token，而逐文件搜索则需约 412,000 个。一次图查询即可替代数十次 grep/读取循环。
*   **11 种代理，一条命令：** 安装程序可自动检测 Claude Code、Codex CLI、Gemini CLI、Zed、OpenCode、Antigravity、Aider、KiloCode、VS Code、OpenClaw 和 Kiro，并为每个代理配置 MCP 条目、指令文件和预工具钩子。
*   **内置图可视化：** 提供 localhost:9749 的 3D 交互式 UI（可选 UI 二进制版本）。
*   **基础设施即代码 (IaC) 索引：** Dockerfile、Kubernetes 清单和 Kustomize 覆盖层被索引为带有交叉引用的图节点。支持 K8s 资源节点和 Kustomize 模块节点，并带有指向引用资源的 IMPORTS 边。
*   **14 个 MCP 工具：** 支持搜索、追踪、架构分析、影响分析、Cypher 查询、死代码检测、跨服务 HTTP 链接、ADR 管理等。

---

### Quick Start / 快速开始

**One-line install (macOS / Linux):**
```bash
curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash
```

**With graph visualization UI:**
```bash
curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash -s -- --ui
```

**Windows (PowerShell):**
```powershell
# 1. Download the installer
Invoke-WebRequest -Uri https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.ps1 -OutFile install.ps1
# 2. (Optional but recommended) Inspect the script
notepad install.ps1
# 3. Run it
.\install.ps1
```

*Options: `--ui` (graph visualization), `--skip-config` (binary only, no agent setup), `--dir=<path>` (custom location).*

*选项：`--ui`（图可视化），`--skip-config`（仅二进制，不配置代理），`--dir=<path>`（自定义安装路径）。*

---

### Features / 功能特性

*   **Architecture overview:** `get_architecture` returns languages, packages, entry points, routes, hotspots, boundaries, layers, and clusters in a single call.
*   **Architecture Decision Records:** `manage_adr` persists architectural decisions across sessions.
*   **Louvain community detection:** Discovers functional modules by clustering call edges.
*   **Git diff impact mapping:** `detect_changes` maps uncommitted changes to affected symbols with risk classification.
*   **Call graph:** Resolves function calls across files and packages (import-aware, type-inferred).

*   **架构概览：** `get_architecture` 可一次性返回语言、包、入口点、路由、热点、边界、层级和集群信息。
*   **架构决策记录 (ADR)：** `manage_adr` 可在不同会话间持久化保存架构决策。
*   **Louvain 社区检测：** 通过聚类调用边来发现功能模块。
*   **Git Diff 影响映射：** `detect_changes` 可将未提交的更改映射到受影响的符号，并进行风险分类。
*   **调用图：** 解析跨文件和跨包的函数调用（支持导入感知和类型推断）。