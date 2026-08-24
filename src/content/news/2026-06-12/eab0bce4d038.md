---
title: "NVIDIA / SkillSpector"
originalUrl: "https://github.com/NVIDIA/SkillSpector"
date: "2026-06-11T23:05:32.339Z"
---

# NVIDIA / SkillSpector

**SkillSpector Security scanner for AI agent skills. Detect vulnerabilities, malicious patterns, and security risks before installing agent skills.**
SkillSpector 是一个用于 AI 智能体技能（AI agent skills）的安全扫描器。它能在安装智能体技能之前，检测其中的漏洞、恶意模式及安全风险。

**Overview: AI agent skills (used by Claude Code, Codex CLI, Gemini CLI, etc.) execute with implicit trust and minimal vetting. Research shows that 26.1% of skills contain vulnerabilities and 5.2% show likely malicious intent. SkillSpector helps you answer: "Is this skill safe to install?"**
概述：AI 智能体技能（如 Claude Code、Codex CLI、Gemini CLI 等所使用的技能）在执行时通常被赋予隐式信任，且缺乏充分审查。研究表明，26.1% 的技能包含漏洞，5.2% 表现出潜在的恶意意图。SkillSpector 旨在帮助你回答：“这个技能安装安全吗？”

**Documentation: Development guide — Architecture, package layout, and how to extend the analyzer pipeline.**
文档：开发指南——涵盖架构、包布局以及如何扩展分析器流水线。

**Features:**
**- Multi-format input: Scan Git repos, URLs, zip files, directories, or single files**
**- 64 vulnerability patterns across 16 categories: prompt injection, data exfiltration, privilege escalation, supply chain, excessive agency, output handling, system prompt leakage, memory poisoning, tool misuse, rogue agent, trigger abuse, dangerous code (AST), taint tracking, YARA signatures, MCP least privilege, and MCP tool poisoning**
**- Two-stage analysis: Fast static analysis + optional LLM semantic evaluation**
**- Live vulnerability lookups: SC4 queries OSV.dev for real-time CVE data with automatic offline fallback**
**- Multiple output formats: Terminal, JSON, Markdown, and SARIF reports**
**- Risk scoring: 0-100 score with severity labels and clear recommendations**
功能：
- 多格式输入：支持扫描 Git 仓库、URL、zip 文件、目录或单个文件。
- 涵盖 16 个类别的 64 种漏洞模式：包括提示词注入、数据外泄、权限提升、供应链攻击、过度代理、输出处理、系统提示词泄露、内存中毒、工具滥用、恶意智能体、触发器滥用、危险代码（AST）、污点追踪、YARA 签名、MCP 最小权限原则以及 MCP 工具中毒。
- 两阶段分析：快速静态分析 + 可选的 LLM 语义评估。
- 实时漏洞查询：SC4 会查询 OSV.dev 获取实时 CVE 数据，并具备自动离线回退功能。
- 多种输出格式：终端、JSON、Markdown 和 SARIF 报告。
- 风险评分：提供 0-100 分的评分，附带严重性标签和明确的建议。

---

### Quick Start (快速开始)

**Installation: Create and activate a virtual environment first (all make targets assume the venv is active). Use uv or pip; the Makefile uses uv if available, otherwise pip.**
安装：首先创建并激活虚拟环境（所有 make 目标均假设 venv 已激活）。使用 uv 或 pip；Makefile 会优先使用 uv，否则使用 pip。

```bash
# Clone the repository
git clone https://github.com/NVIDIA/skillspector.git
cd skillspector

# Create and activate virtual environment
uv venv .venv && source .venv/bin/activate
# or: python3 -m venv .venv && source .venv/bin/activate

# Install for production use
make install

# Or install with development dependencies
make install-dev
```

**Basic Usage:**
基本用法：

```bash
# Scan a local skill directory
skillspector scan ./my-skill/

# Scan a single SKILL.md file
skillspector scan ./SKILL.md

# Scan a Git repository
skillspector scan https://github.com/user/my-skill

# Scan a zip file
skillspector scan ./my-skill.zip
```

**Output Formats:**
输出格式：

```bash
# Terminal output (default) - pretty formatted
skillspector scan ./my-skill/

# JSON output - machine readable
skillspector scan ./my-skill/ --format json --output report.json

# Markdown output - for documentation
skillspector scan ./my-skill/ --format markdown --output report.md

# SARIF output - for CI/CD integration and IDE tooling
skillspector scan ./my-skill/ --format sarif --output report.sarif
```

---

### LLM Analysis (LLM 分析)

**For the best results, configure an OpenAI-compatible LLM endpoint for semantic analysis. Pick a provider with SKILLSPECTOR_PROVIDER; each ships its own bundled default model. SkillSpector also works against local OpenAI-compatible servers (Ollama, vLLM, llama.cpp) and managed inference gateways.**
为了获得最佳效果，请配置一个兼容 OpenAI 的 LLM 端点以进行语义分析。通过 `SKILLSPECTOR_PROVIDER` 选择提供商；每个提供商都自带默认模型。SkillSpector 也适用于本地兼容 OpenAI 的服务器（Ollama、vLLM、llama.cpp）以及托管推理网关。

*(Table omitted for brevity, please refer to original documentation for specific provider keys)*

**Examples:**
示例：

```bash
# Stock OpenAI
export SKILLSPECTOR_PROVIDER=openai
export OPENAI_API_KEY=sk-...
skillspector scan ./my-skill/

# Local Ollama or any OpenAI-compatible endpoint
export SKILLSPECTOR_PROVIDER=openai
export OPENAI_API_KEY=ollama
export OPENAI_BASE_URL=http://localhost:11434/v1
export SKILLSPECTOR_MODEL=llama3.1:8b
skillspector scan ./my-skill/

# Skip LLM analysis (faster, static analysis only)
skillspector scan ./my-skill/ --no-llm
```

---

### Vulnerability Patterns (漏洞模式)

**SkillSpector detects 64 vulnerability patterns across 16 categories:**
SkillSpector 检测 16 个类别中的 64 种漏洞模式：

*(Note: Due to length, the following is a summary of the provided categories)*

1.  **Prompt Injection (5 patterns):** Instruction overrides, hidden instructions, etc. (提示词注入：指令覆盖、隐藏指令等)
2.  **Data Exfiltration (4 patterns):** External transmission, env variable harvesting, etc. (数据外泄：外部传输、环境变量窃取等)
3.  **Privilege Escalation (3 patterns):** Excessive permissions, sudo/root execution, etc. (权限提升：过度权限、sudo/root 执行等)
4.  **Supply Chain (6 patterns):** Unpinned dependencies, obfuscated code, typosquatting, etc. (供应链：未锁定依赖、混淆代码、拼写劫持等)
5.  **Excessive Agency (4 patterns):** Unrestricted tool access, autonomous decision making, etc. (过度代理：无限制工具访问、自主决策等)
6.  **Output Handling (3 patterns):** Unvalidated output injection, etc. (输出处理：未经验证的输出注入等)