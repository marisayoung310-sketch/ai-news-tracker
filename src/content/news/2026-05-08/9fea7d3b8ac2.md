---
title: "VectifyAI / PageIndex"
originalUrl: "https://github.com/VectifyAI/PageIndex"
date: "2026-05-07T23:10:25.900Z"
---

# VectifyAI / PageIndex

**PageIndex: Vectorless, Reasoning-based RAG**
**PageIndex：基于推理的无向量 RAG**

◦ No Vector DB or Chunking ◦ Context-Aware ◦ Human-like Retrieval
◦ 无向量数据库或分块 ◦ 上下文感知 ◦ 类人检索

🌐 Homepage • 🖥️ Chat Platform • 🔌 MCP & API • 📖 Docs • 💬 Discord • ✉️ Contact
🌐 主页 • 🖥️ 聊天平台 • 🔌 MCP 与 API • 📖 文档 • 💬 Discord • ✉️ 联系方式

📢 Updates
📢 更新

🔥 Agentic Vectorless RAG — A simple agentic, vectorless RAG example with self-hosted PageIndex, using OpenAI Agents SDK.
🔥 智能体无向量 RAG — 一个使用 OpenAI Agents SDK 和自托管 PageIndex 的简单智能体无向量 RAG 示例。

Scale PageIndex to Millions of Documents — PageIndex File System is a file-level tree layer that lets PageIndex reason over an entire corpus, not just a single document, enabling massive-scale document search.
将 PageIndex 扩展至数百万份文档 — PageIndex 文件系统是一个文件级树状层，允许 PageIndex 对整个语料库（而非单一文档）进行推理，从而实现大规模文档搜索。

PageIndex Chat — Human-like document analysis agent platform for professional long documents. Also available via MCP or API.
PageIndex Chat — 针对专业长文档的类人文档分析智能体平台。也可通过 MCP 或 API 使用。

PageIndex Framework — Deep dive into PageIndex: an agentic, in-context tree index that enables LLMs to perform reasoning-based, context-aware retrieval over long documents.
PageIndex 框架 — 深入了解 PageIndex：一种智能体、上下文内树状索引，使大语言模型（LLM）能够对长文档进行基于推理的、上下文感知的检索。

📑 Introduction to PageIndex
📑 PageIndex 简介

Are you frustrated with vector database retrieval accuracy for long professional documents? Traditional vector-based RAG relies on semantic similarity rather than true relevance. But similarity ≠ relevance — what we truly need in retrieval is relevance, and that requires reasoning.
你是否对长篇专业文档的向量数据库检索准确性感到沮丧？传统的基于向量的 RAG 依赖于语义相似度而非真正的相关性。但相似度并不等于相关性——我们在检索中真正需要的是相关性，而这需要推理。

When working with professional documents that demand domain expertise and multi-step reasoning, similarity search often falls short. Inspired by AlphaGo, we propose PageIndex — a vectorless, reasoning-based RAG system that builds a hierarchical tree index from long documents and uses LLMs to reason over that index for agentic, context-aware retrieval. It simulates how human experts navigate and extract knowledge from complex documents through tree search, enabling LLMs to think and reason their way to the most relevant document sections.
在处理需要领域专业知识和多步推理的专业文档时，相似度搜索往往力不从心。受 AlphaGo 启发，我们提出了 PageIndex——一个基于推理的无向量 RAG 系统。它通过长文档构建分层树状索引，并利用 LLM 对该索引进行推理，从而实现智能体式的、上下文感知的检索。它模拟了人类专家如何通过树状搜索在复杂文档中导航并提取知识，使 LLM 能够通过思考和推理找到最相关的文档部分。

PageIndex performs retrieval in two steps:
PageIndex 通过两个步骤执行检索：

1. Generate a “Table-of-Contents” tree structure index of documents
1. 生成文档的“目录”树状结构索引

2. Perform reasoning-based retrieval through tree search
2. 通过树状搜索执行基于推理的检索

🎯 Core Features
🎯 核心功能

Compared to traditional vector-based RAG, PageIndex features:
与传统的基于向量的 RAG 相比，PageIndex 具有以下特点：

*   No Vector DB: Uses document structure and LLM reasoning for retrieval, instead of vector similarity search.
*   无向量数据库：使用文档结构和 LLM 推理进行检索，而非向量相似度搜索。

*   No Chunking: Documents are organized into natural sections, not artificial chunks.
*   无分块：文档被组织成自然的章节，而非人为切分的数据块。

*   Better Explainability and Traceability: Retrieval is based on reasoning, traceable and interpretable, with page and section references. No more opaque, approximate vector search (“vibe retrieval”).
*   更好的可解释性和可追溯性：检索基于推理，具有可追溯性和可解释性，并提供页面和章节引用。告别不透明、近似的向量搜索（即“凭感觉检索”）。

*   Context-Aware Retrieval: Retrieval depends on your full context (e.g., conversation history and domain knowledge), and easily incorporates new context.
*   上下文感知检索：检索依赖于你的完整上下文（例如对话历史和领域知识），并能轻松整合新的上下文。

*   Human-like Retrieval: Simulates how human experts navigate and extract knowledge from complex documents.
*   类人检索：模拟人类专家如何从复杂文档中导航并提取知识。

PageIndex powers a reasoning-based RAG system that achieved state-of-the-art 98.7% accuracy on FinanceBench, demonstrating superior performance over vector-based RAG solutions in professional document analysis. See our blog post for details.
PageIndex 驱动的基于推理的 RAG 系统在 FinanceBench 上达到了 98.7% 的业界领先准确率，证明了其在专业文档分析中优于基于向量的 RAG 解决方案。详情请参阅我们的博客文章。

📍 Explore PageIndex
📍 探索 PageIndex

To learn more, please see a detailed introduction to the PageIndex framework. Check out this GitHub repo for open-source code, and the cookbooks, tutorials, and blog for additional usage guides and examples. The PageIndex service is available as a ChatGPT-style chat platform, or can be integrated via MCP or API.
欲了解更多信息，请查看 PageIndex 框架的详细介绍。查看此 GitHub 仓库获取开源代码，并参考 Cookbook、教程和博客以获取更多使用指南和示例。PageIndex 服务既可作为 ChatGPT 风格的聊天平台使用，也可通过 MCP 或 API 进行集成。

🛠️ Deployment Options
🛠️ 部署选项

*   Self-host — run locally with this open-source repo (using standard PDF parsing).
*   自托管 — 使用此开源仓库在本地运行（使用标准 PDF 解析）。

*   Cloud Service — production-grade pipeline with enhanced OCR, tree building, and retrieval for best results. Try instantly with our Chat Platform, or integrate via MCP or API.
*   云服务 — 生产级流水线，具备增强的 OCR、树构建和检索功能，以获得最佳效果。可通过我们的聊天平台立即试用，或通过 MCP/API 集成。

*   Enterprise — private or on-prem deployment. Contact us or book a demo for more details.
*   企业版 — 私有化或本地部署。联系我们或预约演示以获取更多详情。

🧪 Quick Hands-on
🧪 快速上手

*   🔥 Agentic Vectorless RAG (latest) — a simple but complete agentic vectorless RAG example with self-hosted PageIndex, using OpenAI Agents SDK.
*   🔥 智能体无向量 RAG（最新）— 一个使用 OpenAI Agents SDK 和自托管 PageIndex 的简单且完整的智能体无向量 RAG 示例。

*   Try the Vectorless RAG notebook — a minimal, hands-on example of reasoning-based RAG using PageIndex.
*   尝试 Vectorless RAG notebook — 一个使用 PageIndex 进行基于推理的 RAG 的极简动手示例。

*   Check out Vision-based Vectorless RAG — no OCR; a minimal, vision-based & reasoning-native RAG pipeline that works directly over page images.
*   查看基于视觉的无向量 RAG — 无需 OCR；一个极简的、基于视觉且原生支持推理的 RAG 流水线，可直接处理页面图像。

🌲 PageIndex Tree Structure
🌲 PageIndex 树状结构

PageIndex can transform lengthy PDF documents into a semantic tree structure, similar to a “table of contents” but optimized for use with Large Language Models (LLMs). It's ideal for: financial reports, regulatory filings, academic textbooks, legal or technical manuals, and any document that exceeds LLM context limits.
PageIndex 可以将冗长的 PDF 文档转换为语义树结构，类似于“目录”，但针对大语言模型（LLM）进行了优化。它非常适合：财务报告、监管备案、学术教材、法律或技术手册，以及任何超出 LLM 上下文限制的文档。

Below is an example PageIndex tree structure. Also see more example documents and generated tree structures.
以下是 PageIndex 树状结构的示例。同时查看更多示例文档和生成的树状结构。

*(JSON structure omitted for brevity)*

You can generate the PageIndex tree structure with this open-source repo; or use our API for higher-quality results powered by our enhanced OCR and tree building pipeline.
你可以使用此开源仓库生成 PageIndex 树状结构；或者使用我们的 API，通过我们增强的 OCR 和树构建流水线获得更高质量的结果。

⚙️ Package Usage
⚙️ 软件包使用

Note: This package uses standard PDF parsing. For use cases with complex PDFs, our Cloud Service (via MCP and API) offers enhanced OCR, tree building, and retrieval.
注意：此软件包使用标准 PDF 解析。对于涉及复杂 PDF 的用例，我们的云服务（通过 MCP 和 API）提供增强的 OCR、树构建和检索功能。

You can follow these steps to generate a PageIndex tree from a PDF document.
你可以按照以下步骤从 PDF 文档生成 PageIndex 树。

1. Install dependencies
1. 安装依赖
`pip3 install --upgrade -r requirements.txt`

2. Set your LLM API key
2. 设置你的 LLM API 密钥
Create a .env file in the root directory with your LLM API key. Multi-LLM is supported via LiteLLM:
在根目录下创建一个 .env 文件并填入你的 LLM API 密钥。通过 LiteLLM 支持多 LLM：
`OPENAI_API_KEY=your_openai_key_here`

3. Generate PageIndex structure for your PDF
3. 为你的 PDF 生成 PageIndex 结构
`python3 run_pageindex.py --pdf_path /path/to/your/document.pdf`

Optional parameters
可选参数
You can customize the processing with additional optional arguments:
你可以通过额外的可选参数自定义处理过程：
`--model` LLM model to use (default: gpt-4o-2024-11-20)
`--model` 使用的 LLM 模型（默认：gpt-4o-2024-11-20）
`--toc-check-pages` Pages to check for table of contents (default: 20)
`--toc-check-pages` 检查目录的页面范围（默认：20）
`--max-pages-per-node` Max pages per node (default: 10)
`--max-pages-per-node` 每个节点的最大页数（默认：10）
`--max-tokens-per-node` Max tokens per node (default: 20000)
`--max-tokens-per-node` 每个节点的最大 Token 数（默认：20000）