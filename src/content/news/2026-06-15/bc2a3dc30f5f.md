---
title: "Generate Professional AI Images Locally with ComfyUI and FLUX"
originalUrl: "https://dev.to/everylocalai/generate-professional-ai-images-locally-with-comfyui-and-flux-3m7h"
date: "2026-06-14T22:45:00.557Z"
---

# Generate Professional AI Images Locally with ComfyUI and FLUX
# 使用 ComfyUI 和 FLUX 在本地生成专业级 AI 图像

Professional-grade image generation that runs entirely on your own GPU. ComfyUI + FLUX.1 Dev gives you Midjourney-quality output with full creative control and zero data leaving your machine.
完全在您自己的 GPU 上运行的专业级图像生成。ComfyUI + FLUX.1 Dev 为您提供媲美 Midjourney 的输出质量，同时拥有完全的创作控制权，且数据无需离开您的设备。

### What You Need
### 所需配置
*   A GPU with 12GB+ VRAM (24GB recommended)
*   12GB 以上显存的 GPU（推荐 24GB）
*   Python 3.10+ or the ComfyUI desktop app
*   Python 3.10+ 或 ComfyUI 桌面应用程序
*   About 20 minutes
*   约 20 分钟

### Setup
### 安装设置
**Option A: Desktop App (Easiest)**
**选项 A：桌面应用程序（最简单）**
Download from comfy.org, install, and use the built-in model manager to download FLUX.1 Dev.
从 comfy.org 下载并安装，然后使用内置的模型管理器下载 FLUX.1 Dev。

**Option B: Manual Install**
**选项 B：手动安装**
```bash
git clone https://github.com/Comfy-Org/ComfyUI.git
cd ComfyUI
pip install -r requirements.txt
python main.py
```
Open http://localhost:8188.
打开 http://localhost:8188。

### Basic FLUX Workflow
### FLUX 基础工作流
1. Add a Checkpoint Loader node - load flux1-dev.safetensors
1. 添加 Checkpoint Loader 节点 - 加载 flux1-dev.safetensors
2. Add CLIP Text Encoder - enter your prompt
2. 添加 CLIP Text Encoder - 输入您的提示词
3. Add KSampler - connect model, CLIP, and empty latent
3. 添加 KSampler - 连接模型、CLIP 和空潜空间 (empty latent)
4. Add VAE Decode - decode to image
4. 添加 VAE Decode - 解码为图像
5. Add Save Image - save result
5. 添加 Save Image - 保存结果
6. Click Queue Prompt
6. 点击 Queue Prompt（执行提示词）

**Prompt example:** "a photorealistic cat sitting on a vintage leather chair, warm lighting, depth of field"
**提示词示例：** “一只照片级真实的猫坐在复古皮椅上，暖色调灯光，景深效果”

### Advanced Features
### 高级功能
*   **LoRA** - add a LoRA Loader node for style control
*   **LoRA** - 添加 LoRA Loader 节点以控制风格
*   **ControlNet** - pose/edge guidance with extra nodes
*   **ControlNet** - 通过额外节点实现姿势/边缘引导
*   **Image-to-Image** - feed an existing image through VAE Encode
*   **图生图 (Image-to-Image)** - 通过 VAE Encode 输入现有图像
*   **API mode** - integrate with n8n or custom apps
*   **API 模式** - 与 n8n 或自定义应用程序集成
*   **Batch generation** - queue multiple prompts at once
*   **批量生成** - 同时排队多个提示词

### Cost vs Cloud
### 本地与云端成本对比

| | Local | Midjourney |
| :--- | :--- | :--- |
| **Monthly** | $0 | $10-60 |
| **Per image** | $0 | $0.04-0.12 |
| **Privacy** | Stays on your GPU | Sent to cloud |
| **Control** | Full node-level | Limited |

| | 本地 (Local) | Midjourney |
| :--- | :--- | :--- |
| **月费** | $0 | $10-60 |
| **单张图像成本** | $0 | $0.04-0.12 |
| **隐私** | 保留在您的 GPU 上 | 发送到云端 |
| **控制权** | 完全的节点级控制 | 有限 |

Full guide with troubleshooting and hardware tips: https://everylocalai.com/stack/comfyui-flux-local-image
包含故障排除和硬件建议的完整指南：https://everylocalai.com/stack/comfyui-flux-local-image