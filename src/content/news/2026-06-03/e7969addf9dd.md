---
title: "jamwithai / production-agentic-rag-course"
originalUrl: "https://github.com/jamwithai/production-agentic-rag-course"
date: "2026-06-02T23:17:32.721Z"
---

# jamwithai / production-agentic-rag-course

### The Mother of AI Project Phase 1 RAG Systems: arXiv Paper Curator
### AI 之母项目第一阶段 RAG 系统：arXiv 论文策展人

A Learner-Focused Journey into Production RAG Systems. Learn to build modern AI systems from the ground up through hands-on implementation. Master the most in-demand AI engineering skills: RAG (Retrieval-Augmented Generation).
这是一段以学习者为中心的生产级 RAG 系统探索之旅。通过动手实践，从零开始构建现代 AI 系统，掌握当前最热门的 AI 工程技能：RAG（检索增强生成）。

### 📖 About This Course
### 📖 关于本课程

This is a learner-focused project where you'll build a complete research assistant system that automatically fetches academic papers, understands their content, and answers your research questions using advanced RAG techniques. The arXiv Paper Curator will teach you to build a production-grade RAG system using industry best practices. Unlike tutorials that jump straight to vector search, we follow the professional path: master keyword search foundations first, then enhance with vectors for hybrid retrieval.
这是一个以学习者为导向的项目，你将构建一个完整的科研助手系统，它能自动抓取学术论文、理解内容，并利用先进的 RAG 技术回答你的研究问题。arXiv 论文策展人项目将教你如何使用行业最佳实践构建生产级的 RAG 系统。与那些直接跳到向量搜索的教程不同，我们遵循专业路径：先掌握关键词搜索基础，再通过向量技术增强，实现混合检索。

### 🎯 The Professional Difference:
### 🎯 专业之处：

We build RAG systems the way successful companies do - solid search foundations enhanced with AI, not AI-first approaches that ignore search fundamentals. By the end of this course, you'll have your own AI research assistant and the deep technical skills to build production RAG systems for any domain.
我们以成功企业的方式构建 RAG 系统——以扎实的搜索基础为核心，辅以 AI 增强，而不是忽视搜索基本功的“AI 至上”方法。课程结束时，你将拥有自己的 AI 科研助手，并具备为任何领域构建生产级 RAG 系统的深厚技术能力。

### 🎓 What You'll Build
### 🎓 你将构建的内容

*   **Week 1:** Complete infrastructure with Docker, FastAPI, PostgreSQL, OpenSearch, and Airflow
*   **Week 2:** Automated data pipeline fetching and parsing academic papers from arXiv
*   **Week 3:** Production BM25 keyword search with filtering and relevance scoring
*   **Week 4:** Intelligent chunking + hybrid search combining keywords with semantic understanding
*   **Week 5:** Complete RAG pipeline with local LLM, streaming responses, and Gradio interface
*   **Week 6:** Production monitoring with Langfuse tracing and Redis caching for optimized performance
*   **Week 7:** Agentic RAG with LangGraph and Telegram Bot for mobile access

*   **第 1 周：** 包含 Docker、FastAPI、PostgreSQL、OpenSearch 和 Airflow 的完整基础设施
*   **第 2 周：** 从 arXiv 自动抓取并解析学术论文的数据流水线
*   **第 3 周：** 具备过滤和相关性评分功能的生产级 BM25 关键词搜索
*   **第 4 周：** 智能分块 + 结合关键词与语义理解的混合搜索
*   **第 5 周：** 包含本地 LLM、流式响应和 Gradio 界面的完整 RAG 流水线
*   **第 6 周：** 带有 Langfuse 追踪和 Redis 缓存的生产监控，以优化性能
*   **第 7 周：** 基于 LangGraph 的 Agentic RAG（智能体 RAG）及用于移动端访问的 Telegram 机器人

---

### 🏗️ System Architecture Evolution
### 🏗️ 系统架构演进

**Week 7: Agentic RAG & Telegram Bot Integration**
**第 7 周：Agentic RAG 与 Telegram 机器人集成**

Complete Week 7 architecture showing Telegram bot integration with the agentic RAG system.
展示了 Telegram 机器人与 Agentic RAG 系统集成的完整第 7 周架构。

**LangGraph Agentic RAG Workflow**
**LangGraph 智能体 RAG 工作流**

Detailed LangGraph workflow showing decision nodes, document grading, and adaptive retrieval.
详细的 LangGraph 工作流，展示了决策节点、文档评分和自适应检索过程。

**Key Innovations in Week 7:**
**第 7 周的关键创新：**

*   **Intelligent Decision-Making:** Agents evaluate and adapt retrieval strategies
*   **Document Grading:** Automatic relevance assessment with semantic evaluation
*   **Query Rewriting:** Adaptive query refinement when results are insufficient
*   **Guardrails:** Out-of-domain detection prevents hallucination
*   **Mobile Access:** Telegram bot for conversational AI on any device
*   **Transparency:** Full reasoning step tracking for debugging and trust

*   **智能决策：** 智能体评估并调整检索策略
*   **文档评分：** 通过语义评估进行自动相关性判定
*   **查询重写：** 当结果不足时进行自适应查询优化
*   **护栏机制：** 领域外检测以防止幻觉
*   **移动访问：** 用于在任何设备上进行对话式 AI 的 Telegram 机器人
*   **透明度：** 完整的推理步骤追踪，便于调试和建立信任

---

### 🚀 Quick Start
### 🚀 快速开始

#### 📋 Prerequisites
#### 📋 前置要求

*   Docker Desktop (with Docker Compose)
*   Python 3.12+
*   UV Package Manager ([Install Guide](https://github.com/astral-sh/uv))
*   8GB+ RAM and 20GB+ free disk space

*   Docker Desktop (需包含 Docker Compose)
*   Python 3.12+
*   UV 包管理器（[安装指南](https://github.com/astral-sh/uv)）
*   8GB 以上内存及 20GB 以上可用磁盘空间

#### ⚡ Get Started
#### ⚡ 开始使用

```bash
# 1. Clone and setup
git clone <repository-url>
cd arxiv-paper-curator

# 2. Configure environment (IMPORTANT!)
cp .env.example .env
# The .env file contains all necessary configuration for OpenSearch,
# arXiv API, and service connections. Defaults work out of the box.
# You need to add Jina embeddings free api key and langfuse keys (check the blogs)

# 3. Install dependencies
uv sync

# 4. Start all services
docker compose up --build -d

# 5. Verify everything works
curl http://localhost:8000/api/v1/health
```

```bash
# 1. 克隆并设置
git clone <repository-url>
cd arxiv-paper-curator

# 2. 配置环境（重要！）
cp .env.example .env
# .env 文件包含了 OpenSearch、arXiv API 和服务连接所需的所有配置。
# 默认配置即可直接运行。
# 你需要添加 Jina embeddings 的免费 API Key 和 Langfuse Key（请查看博客）。

# 3. 安装依赖
uv sync

# 4. 启动所有服务
docker compose up --build -d

# 5. 验证是否正常工作
curl http://localhost:8000/api/v1/health
```

---

### 📚 Weekly Learning Path
### 📚 每周学习路径

| Week | Topic | Blog Post | Code Release |
| :--- | :--- | :--- | :--- |
| 0 | The Mother of AI project - 6 phases | - | - |
| 1 | Infrastructure Foundation | The Infrastructure That Powers RAG Systems | week1.0 |
| 2 | Data Ingestion Pipeline | Building Data Ingestion Pipelines for RAG | week2.0 |
| 3 | OpenSearch ingestion & BM25 retrieval | The Search Foundation Every RAG System Needs | week3.0 |
| 4 | Chunking & Hybrid Search | The Chunking Strategy That Makes Hybrid Search Work | week4.0 |
| 5 | Complete RAG system | The Complete RAG System | week5.0 |
| 6 | Production monitoring & caching | Production-ready RAG: Monitoring & Caching | week6.0 |
| 7 | Agentic RAG & Telegram Bot | Agentic RAG with LangGraph and Telegram | week7.0 |

| 周次 | 主题 | 博客文章 | 代码发布 |
| :--- | :--- | :--- | :--- |
| 0 | AI 之母项目 - 6 个阶段 | - | - |
| 1 | 基础设施基础 | 驱动 RAG 系统的基础设施 | week1.0 |
| 2 | 数据摄取流水线 | 构建 RAG 的数据摄取流水线 | week2.0 |
| 3 | OpenSearch 摄取与 BM25 检索 | 每个 RAG 系统都需要的搜索基础 | week3.0 |
| 4 | 分块与混合搜索 | 让混合搜索生效的分块策略 | week4.0 |
| 5 | 完整的 RAG 系统 | 完整的 RAG 系统 | week5.0 |
| 6 | 生产监控与缓存 | 生产就绪的 RAG：监控与缓存 | week6.0 |
| 7 | 智能体 RAG 与 Telegram 机器人 | 基于 LangGraph 和 Telegram 的智能体 RAG | week7.0 |

---

### 📥 Clone a specific week's release:
### 📥 克隆特定周的版本：

```bash
# Clone a specific week's code
git clone --branch <WEEK_TAG> https://github.com/jamwithai/arxiv-paper-curator
cd arxiv-paper-curator
uv sync
docker compose down -v
docker compose up --build -d
# Replace <WEEK_TAG> with: week1.0, week2.0, etc.
```

```bash
# 克隆特定周的代码
git clone --branch <WEEK_TAG> https://github.com/jamwithai/arxiv-paper-curator
cd arxiv-paper-curator
uv sync
docker compose down -v
docker compose up --build -d
# 将 <WEEK_TAG> 替换为：week1.0, week2.0 等。
```

---

### 📊 Access Your Services
### 📊 访问你的服务

| Service | URL | Purpose |
| :--- | :--- | :--- |
| API Documentation | http://localhost:8000/docs | Interactive API testing |
| Gradio RAG Interface | http://localhost:7861 | User-friendly chat interface |
| Langfuse Dashboard | http://localhost:3000 | RAG pipeline monitoring & tracing |
| Airflow Dashboard | http://localhost:8080 | Workflow management |
| OpenSearch Dashboards | http://localhost:5601 | Hybrid search engine UI |

| 服务 | URL | 用途 |
| :--- | :--- | :--- |
| API 文档 | http://localhost:8000/docs | 交互式 API 测试 |
| Gradio RAG 界面 | http://localhost:7861 | 用户友好的聊天界面 |
| Langfuse 面板 | http://localhost:3000 | RAG 流水线监控与追踪 |
| Airflow 面板 | http://localhost:8080 | 工作流管理 |
| OpenSearch 面板 | http://localhost:5601 | 混合搜索引擎 UI |

*NOTE: Check `airflow/simple_auth_manager_passwords.json.generated` for Airflow username and password.*
*注意：请查看 `airflow/simple_auth_manager_passwords.json.generated` 获取 Airflow 的用户名和密码。*