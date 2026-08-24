---
title: "dotnet / skills"
originalUrl: "https://github.com/dotnet/skills"
date: "2026-05-21T22:59:06.252Z"
---

# .NET Agent Skills

.NET Agent Skills
此存储库包含 .NET 团队为编码智能体（coding agents）精心策划的核心技能集和自定义智能体。有关 Agent Skills 标准的信息，请参阅 agentskills.io。

📊 Dashboard - Accuracy and efficiency scoring trends for contained plugins (https://dotnet.github.io/skills/)
📊 仪表板 - 包含插件的准确性和效率评分趋势 (https://dotnet.github.io/skills/)

### What's Included
### 包含内容

| Plugin | Description |
| :--- | :--- |
| **dotnet** | Collection of core .NET skills for handling common .NET coding tasks. |
| **dotnet** | 用于处理常见 .NET 编码任务的核心 .NET 技能集合。 |
| **dotnet-data** | Skills for .NET data access and Entity Framework related tasks. |
| **dotnet-data** | 用于 .NET 数据访问和 Entity Framework 相关任务的技能。 |
| **dotnet-diag** | Skills for .NET performance investigations, debugging, and incident analysis. |
| **dotnet-diag** | 用于 .NET 性能调查、调试和事故分析的技能。 |
| **dotnet-msbuild** | Comprehensive MSBuild and .NET build skills: failure diagnosis, performance optimization, code quality, and modernization. |
| **dotnet-msbuild** | 全面的 MSBuild 和 .NET 构建技能：故障诊断、性能优化、代码质量和现代化改造。 |
| **dotnet-nuget** | NuGet and .NET package management: dependency management and modernization. |
| **dotnet-nuget** | NuGet 和 .NET 包管理：依赖项管理和现代化改造。 |
| **dotnet-upgrade** | Skills for migrating and upgrading .NET projects across framework versions, language features, and compatibility targets. |
| **dotnet-upgrade** | 用于跨框架版本、语言特性和兼容性目标迁移及升级 .NET 项目的技能。 |
| **dotnet-maui** | Skills for .NET MAUI development: environment setup, diagnostics, and troubleshooting. |
| **dotnet-maui** | 用于 .NET MAUI 开发的技能：环境设置、诊断和故障排除。 |
| **dotnet-ai** | AI and ML skills for .NET: technology selection, LLM integration, agentic workflows, RAG pipelines, MCP, and classic ML with ML.NET. |
| **dotnet-ai** | 用于 .NET 的 AI 和 ML 技能：技术选型、LLM 集成、智能体工作流、RAG 管道、MCP 以及使用 ML.NET 进行的经典机器学习。 |
| **dotnet-template-engine** | .NET Template Engine skills: template discovery, project scaffolding, and template authoring. |
| **dotnet-template-engine** | .NET 模板引擎技能：模板发现、项目脚手架和模板创作。 |
| **dotnet-test** | Skills for running, diagnosing, and migrating .NET tests: test execution, filtering, platform detection, and MSTest workflows. |
| **dotnet-test** | 用于运行、诊断和迁移 .NET 测试的技能：测试执行、过滤、平台检测和 MSTest 工作流。 |
| **dotnet-aspnet** | ASP.NET Core web development skills including middleware, endpoints, real-time communication, and API patterns. |
| **dotnet-aspnet** | ASP.NET Core Web 开发技能，包括中间件、端点、实时通信和 API 模式。 |
| **dotnet11** | Skills for new .NET 11 APIs and language features. |
| **dotnet11** | 针对新 .NET 11 API 和语言特性的技能。 |

### Installation
### 安装

#### 🚀 Plugins - Copilot CLI / Claude Code
#### 🚀 插件 - Copilot CLI / Claude Code

*   Launch Copilot CLI or Claude Code
*   启动 Copilot CLI 或 Claude Code
*   Add the marketplace: `/plugin marketplace add dotnet/skills`
*   添加市场：`/plugin marketplace add dotnet/skills`
*   Install a plugin: `/plugin install <plugin>@dotnet-agent-skills`
*   安装插件：`/plugin install <plugin>@dotnet-agent-skills`
*   Restart to load the new plugins
*   重启以加载新插件
*   View available skills: `/skills`
*   查看可用技能：`/skills`
*   View available agents: `/agents`
*   查看可用智能体：`/agents`
*   Update plugin (on demand): `/plugin update <plugin>@dotnet-agent-skills`
*   更新插件（按需）：`/plugin update <plugin>@dotnet-agent-skills`

#### VS Code / VS Code Insiders (Preview)
#### VS Code / VS Code Insiders（预览版）

**Important:** VS Code plugin support is a preview feature and subject to change. You may need to enable it first.
**重要提示：** VS Code 插件支持是一项预览功能，可能会发生变化。您可能需要先启用它。

```json
// settings.json
{
  "chat.plugins.enabled": true,
  "chat.plugins.marketplaces": ["dotnet/skills"]
}
```

Once configured, type `/plugins` in Copilot Chat or use the `@agentPlugins` filter in Extensions to browse and install plugins from the marketplace.
配置完成后，在 Copilot Chat 中输入 `/plugins`，或在扩展中使用 `@agentPlugins` 过滤器来浏览并安装来自市场的插件。

#### Cursor
#### Cursor

This repository is a Cursor plugin marketplace. You can discover and install published plugins directly in Cursor:
此存储库是一个 Cursor 插件市场。您可以直接在 Cursor 中发现并安装已发布的插件：

1.  Open the marketplace panel in Cursor
2.  在 Cursor 中打开市场面板
3.  Search for .NET or browse `cursor.com/marketplace`
4.  搜索 .NET 或浏览 `cursor.com/marketplace`
5.  Install the desired plugins
6.  安装所需的插件

For local development or unpublished changes, import plugins from a local checkout:
对于本地开发或未发布的更改，请从本地检出（checkout）导入插件：

*   Copy or symlink your local checkout to `~/.cursor/plugins/local/dotnet-agent-skills`
*   将您的本地检出目录复制或软链接到 `~/.cursor/plugins/local/dotnet-agent-skills`
*   Restart Cursor or run `Developer: Reload Window`
*   重启 Cursor 或运行 `Developer: Reload Window`

#### Codex CLI
#### Codex CLI

Skills in this repository follow the `agentskills.io` open standard and are compatible with OpenAI Codex.
此存储库中的技能遵循 `agentskills.io` 开放标准，并与 OpenAI Codex 兼容。

Install individual skills using the `skill-installer` CLI with the GitHub URL:
使用 `skill-installer` CLI 并配合 GitHub URL 安装单个技能：

`$ skill-installer install https://github.com/dotnet/skills/tree/main/plugins/<plugin>/skills/<skill-name>`

### Contributing
### 贡献

See `CONTRIBUTING.md` for contribution guidelines and how to add a new plugin.
请参阅 `CONTRIBUTING.md` 获取贡献指南以及如何添加新插件。

### License
### 许可证

See `LICENSE` for details.
详情请参阅 `LICENSE`。