---
title: "huggingface / speech-to-speech"
originalUrl: "https://github.com/huggingface/speech-to-speech"
date: "2026-07-28T22:31:46.530Z"
---

# Hugging Face / speech-to-speech

**Speech To Speech: Build voice agents with open-source models**
**语音转语音 (Speech To Speech)：使用开源模型构建语音智能体**

A low-latency, fully modular voice-agent pipeline: VAD -> STT -> LLM -> TTS, exposed through an OpenAI Realtime-compatible WebSocket API. Every component is swappable. The LLM slot speaks OpenAI-compatible protocols, so you can point it at a hosted provider, at HF Inference Providers, or at a vLLM or llama.cpp server on your own hardware for a fully local, fully open stack. This pipeline runs in production as the conversation backend for thousands of Reachy Mini robots.
这是一个低延迟、完全模块化的语音智能体流水线：VAD（语音活动检测）-> STT（语音转文字）-> LLM（大语言模型）-> TTS（文字转语音），并通过兼容 OpenAI Realtime 的 WebSocket API 对外提供服务。每个组件均可替换。LLM 插槽支持 OpenAI 兼容协议，因此你可以将其指向托管服务提供商、Hugging Face 推理提供商，或者运行在你自有硬件上的 vLLM 或 llama.cpp 服务器，从而实现完全本地化、完全开源的架构。该流水线目前已在数千台 Reachy Mini 机器人中作为对话后端投入生产使用。

**Quickstart**
**快速开始**

```bash
pip install speech-to-speech
export OPENAI_API_KEY=...
speech-to-speech
```

This starts an OpenAI Realtime-compatible server at `ws://localhost:8765/v1/realtime` using Parakeet TDT for local STT, an OpenAI-compatible LLM, and Qwen3-TTS for local speech output. From a source checkout, talk to it from a second terminal:
这将启动一个兼容 OpenAI Realtime 的服务器（地址为 `ws://localhost:8765/v1/realtime`），使用 Parakeet TDT 进行本地 STT，使用兼容 OpenAI 的 LLM，并使用 Qwen3-TTS 进行本地语音输出。在源码目录下，你可以通过第二个终端与它对话：

```bash
python scripts/listen_and_play_realtime.py --host 127.0.0.1 --port 8765
```

Prefer to keep the LLM on your own machine? Serve Gemma 4 with llama.cpp:
想把 LLM 留在自己的机器上运行？使用 llama.cpp 部署 Gemma 4：

```bash
llama-server -hf ggml-org/gemma-4-E4B-it-GGUF -np 2 -c 65536 -fa on --swa-full
```

Then point the OpenAI-compatible LLM backend at it:
然后将兼容 OpenAI 的 LLM 后端指向它：

```bash
speech-to-speech \
  --model_name "ggml-org/gemma-4-E4B-it-GGUF" \
  --responses_api_base_url "http://127.0.0.1:8080/v1" \
  --responses_api_api_key ""
```

Any OpenAI Realtime-compatible client can connect. See Realtime API for the protocol and LLM backends for provider and local-server options.
任何兼容 OpenAI Realtime 的客户端均可连接。有关协议详情，请参阅 Realtime API；有关提供商和本地服务器选项，请参阅 LLM 后端说明。

---

### How it works
### 工作原理

The pipeline is a cascade of four components, each running in its own thread and connected by queues:
该流水线由四个级联组件组成，每个组件在各自的线程中运行，并通过队列连接：

*   **Voice Activity Detection (VAD):** Silero VAD v5 detects speech boundaries and turn-taking.
    **语音活动检测 (VAD)：** 使用 Silero VAD v5 检测语音边界和对话轮次。
*   **Speech to Text (STT):** transcribes the user's turn, with optional live partial transcripts.
    **语音转文字 (STT)：** 转录用户的发言，并支持可选的实时部分转录。
*   **Language Model (LLM):** generates the response, streaming text and tool calls.
    **大语言模型 (LLM)：** 生成回复，并以流式传输文本和工具调用。
*   **Text to Speech (TTS):** synthesizes audio and streams it back to the client.
    **文字转语音 (TTS)：** 合成音频并将其流式传输回客户端。

Every stage has multiple interchangeable backends, selected via CLI flags. The code is designed for easy modification, with a focus on models available through Transformers and the Hugging Face Hub.
每个阶段都有多个可互换的后端，可通过命令行参数进行选择。代码设计旨在方便修改，重点关注可通过 Transformers 和 Hugging Face Hub 获取的模型。

---

### Installation
### 安装

Requires Python 3.10+.
需要 Python 3.10+。

```bash
pip install speech-to-speech
```

The default install covers the standard realtime path:
默认安装涵盖了标准的实时路径：
*   Parakeet TDT for STT
    用于 STT 的 Parakeet TDT
*   OpenAI-compatible API for the language model
    用于语言模型的 OpenAI 兼容 API
*   Qwen3-TTS for speech output, using the GGML backend by default on non-macOS platforms and mlx-audio on Apple Silicon
    用于语音输出的 Qwen3-TTS（非 macOS 平台默认使用 GGML 后端，Apple Silicon 平台使用 mlx-audio）

Local audio and realtime server modes macOS and non-macOS dependencies are resolved automatically via platform markers in `pyproject.toml`.
本地音频和实时服务器模式下，macOS 和非 macOS 的依赖项会通过 `pyproject.toml` 中的平台标记自动解析。

---

### CUDA Note for Qwen3-TTS
### 关于 Qwen3-TTS 的 CUDA 说明

On Linux, the Qwen3-TTS GGML backend comes from `faster-qwen3-tts[ggml]`. Its default `qwentts-cpp-python` wheel on PyPI targets CUDA 12.8. If your machine does not have the CUDA 12 runtime that wheel expects, install the matching wheel from the Hugging Face wheelhouse before installing speech-to-speech:
在 Linux 上，Qwen3-TTS 的 GGML 后端来自 `faster-qwen3-tts[ggml]`。其在 PyPI 上的默认 `qwentts-cpp-python` wheel 包针对 CUDA 12.8。如果你的机器没有该 wheel 包所预期的 CUDA 12 运行时，请在安装 `speech-to-speech` 之前从 Hugging Face wheelhouse 安装匹配的 wheel 包：

```bash
# CUDA 13.x
pip install "qwentts-cpp-python==0.3.1+cu130" \
  -f https://huggingface.co/datasets/andito/qwentts-cpp-python-wheels/tree/main/whl/cu130

# CUDA 12.4
pip install "qwentts-cpp-python==0.3.1+cu124" \
  -f https://huggingface.co/datasets/andito/qwentts-cpp-python-wheels/tree/main/whl/cu124

# CPU-only fallback
pip install "qwentts-cpp-python==0.3.1+cpu" \
  -f https://huggingface.co/datasets/andito/qwentts-cpp-python-wheels/tree/main/whl/cpu

pip install speech-to-speech
```

To use the previous CUDA-graphs implementation instead of GGML, pass `--qwen3_tts_backend torch`.
若要使用之前的 CUDA-graphs 实现而非 GGML，请传入 `--qwen3_tts_backend torch`。

---

### Optional Backends
### 可选后端

Extra backends are installed with pip extras:
可通过 pip extras 安装额外的后端：

```bash
pip install "speech-to-speech[kokoro]" # Kokoro-82M TTS on non-macOS
pip install "speech-to-speech[pocket]" # Pocket TTS
pip install "speech-to-speech[chattts]" # ChatTTS
pip install "speech-to-speech[facebook-mms]" # MMS TTS
pip install "speech-to-speech[faster-whisper]" # Faster Whisper STT
pip install "speech-to-speech[whisper-mlx]" # Lightning Whisper MLX STT on macOS
pip install "speech-to-speech[paraformer]" # Paraformer STT through FunASR
pip install "speech-to-speech[mlx-lm]" # mlx-vlm support for vision models on macOS
```

Deprecated implementations, including MeloTTS, live in `archive/` and are no longer wired into the CLI.
包括 MeloTTS 在内的已弃用实现现位于 `archive/` 目录中，不再集成到 CLI 中。

**Note on DeepFilterNet:** DeepFilterNet, used for optional audio enhancement in VAD, requires `numpy<2` and conflicts with Pocket TTS, which requires `numpy>=2`. Install it manually only in environments where you are not using Pocket TTS.
**关于 DeepFilterNet 的说明：** DeepFilterNet 用于 VAD 中的可选音频增强，它需要 `numpy<2`，这与需要 `numpy>=2` 的 Pocket TTS 冲突。仅在不使用 Pocket TTS 的环境中手动安装它。

---

### From Source
### 从源码安装

```bash
git clone https://github.com/huggingface/speech-to-speech.git
cd speech-to-speech
uv sync
```

This installs the package in editable mode and makes the `speech-to-speech` CLI available.
这将以可编辑模式安装该包，并使 `speech-to-speech` 命令行工具可用。