---
title: "Chat With Your Documents Locally Using AnythingLLM and Ollama"
originalUrl: "https://dev.to/everylocalai/chat-with-your-documents-locally-using-anythingllm-and-ollama-j6b"
date: "2026-06-14T22:45:11.315Z"
---

# Chat With Your Documents Locally Using AnythingLLM and Ollama
# 使用 AnythingLLM 和 Ollama 在本地与你的文档进行对话

A private RAG system where you drop in PDFs, Word docs, and code files and ask questions. Runs on any machine, no cloud dependency.
这是一个私有的 RAG（检索增强生成）系统，你可以将 PDF、Word 文档和代码文件拖入其中并进行提问。它可以在任何机器上运行，无需依赖云端。

### What You Need
### 所需准备
* Any computer (GPU optional - CPU works fine)
* Ollama installed
* About 10 minutes
* 任何电脑（GPU 可选，CPU 即可运行）
* 已安装 Ollama
* 大约 10 分钟时间

### Architecture
### 系统架构
| Component | Role |
| :--- | :--- |
| AnythingLLM | Desktop/server app with RAG, agents, built-in vector DB |
| Ollama | Serves local LLM for chat + embeddings |
| Qwen3 14B | Default model for answering questions |

| 组件 | 角色 |
| :--- | :--- |
| AnythingLLM | 带有 RAG、智能体和内置向量数据库的桌面/服务器应用 |
| Ollama | 提供用于对话和嵌入（Embedding）的本地大模型服务 |
| Qwen3 14B | 用于回答问题的默认模型 |

### Setup
### 设置步骤

**1. Install Ollama**
**1. 安装 Ollama**

```bash
# Install from ollama.com, or run with Docker:
docker run -d --gpus all -p 11434:11434 --name ollama \
  -v ollama:/root/.ollama ollama/ollama

# Pull a model:
ollama pull qwen3:14b

# Pull an embedder:
ollama pull nomic-embed-text
```
（从 ollama.com 安装，或使用 Docker 运行：... 拉取模型：... 拉取嵌入模型：...）

**2. Install AnythingLLM**
**2. 安装 AnythingLLM**

Desktop app (easiest): Download from anythingllm.com
Docker:
```bash
docker run -d -p 3001:3001 --name anythingllm \
  --add-host host.docker.internal:host-gateway \
  -v anythingllm:/app/server/storage \
  mintplexlabs/anythingllm
```
桌面应用（最简单）：从 anythingllm.com 下载
Docker：...

**3. Connect & Use**
**3. 连接与使用**

* Open AnythingLLM (http://localhost:3001 or desktop app)
* Settings > LLM Provider > Select Ollama, model qwen3:14b
* Settings > Embedder > Select Ollama, model nomic-embed-text
* Create a workspace, drop in documents, start asking questions
* 打开 AnythingLLM（访问 http://localhost:3001 或打开桌面应用）
* 设置 > LLM 提供商 > 选择 Ollama，模型选择 qwen3:14b
* 设置 > 嵌入器 > 选择 Ollama，模型选择 nomic-embed-text
* 创建一个工作区，拖入文档，开始提问

### What You Can Do
### 你可以做什么
* Chat with PDFs, Word docs, code files, web pages
* Create isolated workspaces per project
* Use built-in agent skills (web search, summarization)
* Works on CPU-only machines like a mini PC
* 与 PDF、Word 文档、代码文件、网页进行对话
* 为每个项目创建独立的工作区
* 使用内置的智能体技能（网页搜索、摘要总结）
* 可在仅有 CPU 的机器（如迷你主机）上运行

### Cost vs Cloud
### 成本对比（本地 vs 云端）

| | Local | ChatGPT + GPTs |
| :--- | :--- | :--- |
| Monthly | $0 | $20-200 |
| Hardware | $0-300 | $0 |
| Privacy | Stays on your machine | Sent to cloud |
| Documents | Unlimited | Token-limited |

| | 本地 | ChatGPT + GPTs |
| :--- | :--- | :--- |
| 每月费用 | $0 | $20-200 |
| 硬件成本 | $0-300 | $0 |
| 隐私 | 保留在你的机器上 | 发送到云端 |
| 文档数量 | 无限制 | Token 限制 |

Full guide with troubleshooting: https://everylocalai.com/stack/anythingllm-ollama-rag
完整指南及故障排除：https://everylocalai.com/stack/anythingllm-ollama-rag