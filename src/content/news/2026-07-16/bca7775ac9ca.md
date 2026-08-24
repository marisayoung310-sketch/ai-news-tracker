---
title: "HKUDS / DeepTutor"
originalUrl: "https://github.com/HKUDS/DeepTutor"
date: "2026-07-15T22:21:14.177Z"
---

# HKUDS / DeepTutor

**DeepTutor: Lifelong Personalized Tutoring**
**DeepTutor：终身个性化辅导**

Features · Get Started · Explore · CLI · Ecosystem · Community 🤝 We welcome any kinds of contributing! Vote on roadmap items or propose new ones at Roadmap, and see our Contributing Guide for branching strategy, coding standards, and how to get started.
功能 · 入门 · 探索 · 命令行工具 (CLI) · 生态系统 · 社区 🤝 我们欢迎任何形式的贡献！您可以在“路线图 (Roadmap)”中对项目进行投票或提出新建议，并查阅我们的“贡献指南 (Contributing Guide)”以了解分支策略、编码规范以及如何开始。

### 📦 Releases / 版本发布

**[2026.7.9] v1.5.1**
— Remove a single failed document from a knowledge base — even one stuck in an error state — instead of deleting and rebuilding the whole base.
— 支持从知识库中移除单个失败的文档（即使是处于错误状态的文档），无需删除并重建整个知识库。

**[2026.7.4] v1.5.0**
— LlamaIndex ingestion now honors your Document Parsing engine with multimodal image extraction, Partner & Soul ids stay URL-safe for non-Latin names, and optional RAG extras install cleanly on Python 3.14+.
— LlamaIndex 数据摄取现已支持通过文档解析引擎进行多模态图像提取；Partner 和 Soul ID 在处理非拉丁语名称时保持 URL 安全性；可选的 RAG 扩展包可在 Python 3.14+ 环境下顺利安装。

**Past releases (more than 1 week ago) / 往期版本（一周前）**

**[2026.6.30] v1.4.15**
— A native Mattermost channel for Partners, plus fixes so Guided Learning multiple-choice questions grade correctly and a configured zero chunk overlap is honored.
— 为 Partners 新增原生 Mattermost 频道；修复了引导式学习 (Guided Learning) 中多选题评分不准确的问题，并确保配置的零分块重叠 (zero chunk overlap) 设置生效。

**[2026.6.29] v1.4.14**
— Click an assigned partner to chat in one step, Deep Research flags partial reports, LightRAG indexes without MinerU, FAISS handles non-ASCII paths, and PocketBase sessions are isolated per user.
— 点击已分配的 Partner 可一键发起聊天；Deep Research 现可标记部分报告；LightRAG 无需 MinerU 即可索引；FAISS 支持非 ASCII 路径；PocketBase 会话实现用户级隔离。

**[2026.6.27] v1.4.13**
— Partners support non-Latin names and become assignable to users, logos render after login (#599), tiny knowledge bases retrieve reliably, and containers start cleanly under rootless Podman.
— Partners 支持非拉丁语名称并可分配给用户；修复了登录后 Logo 显示问题 (#599)；提升了小型知识库的检索可靠性；容器可在无根 (rootless) Podman 环境下顺利启动。

**[2026.6.24] v1.4.12**
— A new LightRAG Server retrieval engine, a lightweight PyMuPDF4LLM parsing engine, and a FAISS vector backend that makes large knowledge-base retrieval dramatically faster.
— 新增 LightRAG 服务器检索引擎、轻量级 PyMuPDF4LLM 解析引擎，以及使大型知识库检索速度大幅提升的 FAISS 向量后端。

**[2026.6.23] v1.4.11**
— Native tool calling on every cloud OpenAI-compatible provider, a redesigned admin Users page, LaTeX in quiz options, an honest session-loading spinner, and configurable container host binding.
— 支持所有云端兼容 OpenAI 的提供商进行原生工具调用；重新设计了管理员用户页面；测验选项支持 LaTeX；优化了会话加载动画；支持可配置的容器主机绑定。

**[2026.6.21] v1.4.10**
— A self-service Profile page with avatars, a rootless-ready container guide with a single-port request-time proxy, and deny-by-default MCP tools for non-admin users.
— 新增支持头像的自助个人资料页面；提供支持无根容器的指南（含单端口请求时代理）；非管理员用户的 MCP 工具默认设为拒绝访问。

**[2026.6.19] v1.4.9**
— Settings polish: Search shows only the fields your provider needs, connection profiles can be renamed and auto-named by provider, and graded Mastery Path questions flow into your Question Bank.
— 设置优化：搜索仅显示提供商所需的字段；连接配置文件支持重命名及按提供商自动命名；已评分的“掌握路径 (Mastery Path)”问题可自动存入题库。

**[2026.6.18] v1.4.8**
— Connect your own Partners under My Agents and consult them live in chat — answering through their own persona, library and skills — and each Partner gains its own private memory.
— 在“我的智能体 (My Agents)”下连接您自己的 Partner，并在聊天中实时咨询——它们将通过各自的人设、知识库和技能进行回答，且每个 Partner 都拥有独立的私有记忆。

**[2026.6.18] v1.4.7**
— Connect your local Claude Code / Codex and consult it live mid-turn, My Agents graduates to a top-level /agents, and Partner conversations gain branch / resume / delete with a replayable trace.
— 连接本地 Claude Code / Codex 并可在对话中实时咨询；“我的智能体”升级为顶级目录 `/agents`；Partner 对话新增分支、恢复、删除功能，并支持可重放的追踪记录。

**[2026.6.17] v1.4.6**
— Four-surface consolidation: a Space learning dashboard with importable My Agents and top-level Memory, a Knowledge Center with GraphRAG / PageIndex / LightRAG / linked-KB / Obsidian, opened-up Settings, and per-model capability gating.
— 四大界面整合：包含可导入的“我的智能体”和顶级记忆功能的 Space 学习仪表板；集成 GraphRAG / PageIndex / LightRAG / 链接知识库 / Obsidian 的知识中心；开放式设置；以及基于模型的权限控制。

**[2026.6.14] v1.4.5**
— Guided Learning rebuilt on the chat agent loop with a hard per-type mastery gate and a /learning dashboard, a new loop-plugin framework, plus Markdown export / save-to-notebook for Partner conversations.
— 基于聊天智能体循环重建引导式学习，设置了严格的类型掌握门槛及 `/learning` 仪表板；新增循环插件框架；Partner 对话支持 Markdown 导出及保存至笔记本。

**[2026.6.13] v1.4.4**
— Install community skills from ClawHub with deeptutor skill install behind a security gate, plus real in-browser DOCX/XLSX previews for knowledge-base files.
— 支持通过 `deeptutor skill install` 从 ClawHub 安装社区技能（受安全门控保护）；支持在浏览器内直接预览知识库中的 DOCX/XLSX 文件。

**[2026.6.12] v1.4.3**
— TutorBot becomes Partners on a production-grade IM pipeline (15 channels, live streaming), Chat moves to a single agent loop, real per-user isolation, and a rebuilt Visualize.
— TutorBot 升级为基于生产级即时通讯管道（15 个频道，支持实时流）的 Partners；聊天功能迁移至单一智能体循环；实现真正的用户隔离；重建了可视化 (Visualize) 功能。

**[2026.5.28] v1.4.2**
— Stability + polish: Gemini 2.5+ unblocked across Visualize and Chat, auth-routing fix (#485), smooth-streaming chat UX, a Recents sidebar, and Lemonade local-provider support.
— 稳定性与优化：解除 Gemini 2.5+ 在可视化和聊天中的限制；修复认证路由问题 (#485)；优化聊天流式传输体验；新增“最近使用”侧边栏；支持 Lemonade 本地提供商。

**[2026.5.27] v1.4.1**
— Security + stability: TutorBot tool sandbox locked down, per-user resource isolation, multimodal image fallback, an HTTP/SSE API for TutorBots, and a v1.4.0 chat regression fix.
— 安全与稳定性：锁定 TutorBot 工具沙箱；实现用户级资源隔离；支持多模态图像回退；为 TutorBots 提供 HTTP/SSE API；修复 v1.4.0 聊天回归问题。

**[2026.5.22] v1.4.0**
— GA cut of v1.4: Auto Mode, three-layer Memory, agentic Deep Research / Solve / Question, LlamaIndex RAG refactor, Visualize/Animator merge, and restart-safe turn runtime.
— v1.4 正式版发布：自动模式、三层记忆、智能体驱动的深度研究/求解/提问、LlamaIndex RAG 重构、可视化与动画合并，以及支持重启的对话运行时。

**[2026.5.21] v1.4.0-beta**
— Three-layer Memory workbench (L1/L2/L3), every chat capability rebuilt on a single agentic engine, LlamaIndex-only RAG, and a unified Settings + Capabilities surface.
— 三层记忆工作台 (L1/L2/L3)；所有聊天功能基于单一智能体引擎重建；仅使用 LlamaIndex 的 RAG；统一的设置与功能界面。

**[2026.5.10] v1.3.10**
— Remote Docker CORS recovery, DISABLE_SSL_VERIFY across SDK providers, safer code-block citations, and optional Matrix E2EE add-on.
— 远程 Docker CORS 恢复；在 SDK 提供商中支持 DISABLE_SSL_VERIFY；更安全的代码块引用；可选的 Matrix 端到端加密 (E2EE) 插件。

**[2026.5.9] v1.3.9**
— TutorBot Zulip and NVIDIA NIM support, safer thinking-model routing, deeptutor start, sidebar tooltips, and session-store parity.
— 支持 TutorBot Zulip 和 NVIDIA NIM；更安全的思维模型路由；优化 `deeptutor start`；新增侧边栏工具提示；会话存储一致性优化。

**[2026.5.8] v1.3.8**
— Optional multi-user deployments with isolated user workspaces, admin grants, auth routes, and scoped runtime access.
— 可选的多用户部署，支持隔离的用户工作区、管理员授权、认证路由及作用域运行时访问。

**[2026.5.4] v1.3.7**
— Thinking-model/provider fixes, visible Knowledge index history, and safer Co-Writer clear/template editing.
— 修复思维模型/提供商问题；支持查看知识索引历史；更安全的 Co-Writer 清除/模板编辑功能。

**[2026.5.3] v1.3.6**
— Catalog-based model selection for chat and TutorBot, safer RAG re-indexing, OpenAI Responses token-limit fixes, and Skills editor validation.
— 聊天和 TutorBot 支持基于目录的模型选择；更安全的 RAG 重建索引；修复 OpenAI 响应 Token 限制问题；增强技能编辑器验证。

**[2026.5.2] v1.3.5**
— Smoother local launch settings, safer RAG queries, cleaner local embedding auth, and Settings dark-mode polish.
— 更流畅的本地启动设置；更安全的 RAG 查询；更简洁的本地嵌入认证；优化设置界面的深色模式。

**[2026.5.1] v1.3.4**
— Book page chat persistence and rebuild flows, chat-to-book references, stronger language/reasoning handling, RAG document extraction hardening.
— 书籍页面聊天持久化及重建流程；支持聊天到书籍的引用；增强语言/推理处理能力；强化 RAG 文档提取功能。

**[2026.4.30] v1.3.3**
— NVIDIA NIM + Gemini embedding support, unified Space context for chat history/skills/memory, session snapshots, RAG re-index resilience.
— 支持 NVIDIA NIM + Gemini 嵌入；统一聊天历史/技能/记忆的 Space 上下文；支持会话快照；提升 RAG 重建索引的鲁棒性。

**[2026.4.29] v1.3.2**
— Transparent embedding endpoint URLs, RAG re-index resilience for invalid persisted vectors, memory cleanup for thinking-model output, Deep Solve runtime fix.
— 透明的嵌入端点 URL；针对无效持久化向量的 RAG 重建索引鲁棒性；思维模型输出的内存清理；修复 Deep Solve 运行时问题。

**[2026.4.28] v1.3.1**
— Stability: safer RAG routing & embedding validation, Docker persistence, IME-safe input, Windows/GBK robustness.
— 稳定性：更安全的 RAG 路由与嵌入验证；Docker 持久化；输入法 (IME) 兼容性优化；增强 Windows/GBK 编码鲁棒性。

**[2026.4.27] v1.3.0**
— Versioned KB indexes with re-index workflow, rebuilt Knowledge workspace, embedding auto-discovery with new adapters, Space hub.
— 带重索引工作流的版本化知识库索引；重建知识工作区；支持新适配器的嵌入自动发现；新增 Space 中心。

**[2026.4.25] v1.2.5**
— Persistent chat attachments with file-preview drawer, attachment-aware capability pipelines, TutorBot Markdown export.
— 持久化聊天附件及文件预览抽屉；支持附件感知的功能管道；TutorBot 支持 Markdown 导出。