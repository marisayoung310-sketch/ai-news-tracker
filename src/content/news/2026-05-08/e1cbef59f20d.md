---
title: "z-lab / dflash"
originalUrl: "https://github.com/z-lab/dflash"
date: "2026-05-07T23:10:07.149Z"
---

# z-lab / dflash

### DFlash: Block Diffusion for Flash Speculative Decoding
**Paper | Blog | Models**

DFlash 是一种专为投机采样（Speculative Decoding）设计的轻量级块扩散模型（Block Diffusion Model），它能够实现高效且高质量的并行草稿生成。

---

### Supported Models (支持的模型)

| Model (模型) | Draft (草稿模型) |
| :--- | :--- |
| gemma-4-26B-A4B-it | z-lab/gemma-4-26B-A4B-it-DFlash |
| gemma-4-31B-it | z-lab/gemma-4-31B-it-DFlash |
| Qwen3.6-27B | z-lab/Qwen3.6-27B-DFlash |
| Qwen3.6-35B-A3B | z-lab/Qwen3.6-35B-A3B-DFlash |
| MiniMax-M2.5 (Preview) | z-lab/MiniMax-M2.5-DFlash |
| Kimi-K2.5 | z-lab/Kimi-K2.5-DFlash |
| Qwen3.5-4B | z-lab/Qwen3.5-4B-DFlash |
| Qwen3.5-9B | z-lab/Qwen3.5-9B-DFlash |
| Qwen3.5-27B | z-lab/Qwen3.5-27B-DFlash |
| Qwen3.5-35B-A3B | z-lab/Qwen3.5-35B-A3B-DFlash |
| Qwen3.5-122B-A10B | z-lab/Qwen3.5-122B-A10B-DFlash |
| Qwen3-Coder-Next | z-lab/Qwen3-Coder-Next-DFlash |
| Qwen3-Coder-30B-A3B | z-lab/Qwen3-Coder-30B-A3B-DFlash |
| gpt-oss-20b | z-lab/gpt-oss-20b-DFlash |
| gpt-oss-120b | z-lab/gpt-oss-120b-DFlash |
| Qwen3-4B (non-thinking) | z-lab/Qwen3-4B-DFlash-b16 |
| Qwen3-8B (non-thinking) | z-lab/Qwen3-8B-DFlash-b16 |
| Llama-3.1-8B-Instruct | z-lab/LLaMA3.1-8B-Instruct-DFlash-UltraChat |

*DeepSeek-V4-Flash, DeepSeek-V4-Pro, MiniMax-M2.7, GLM-5.1: Coming soon.*
*(DeepSeek-V4-Flash, DeepSeek-V4-Pro, MiniMax-M2.7, GLM-5.1：即将推出。)*

Feel free to open a GitHub issue to request support for additional models. We will also open-source the training recipe soon, so you can train your own DFlash draft model to accelerate any LLM.
欢迎在 GitHub 提交 Issue 请求支持更多模型。我们很快也会开源训练配方，以便您可以训练自己的 DFlash 草稿模型来加速任何大语言模型（LLM）。

---

### 📦 Installation (安装)

Use a separate virtual environment for each to avoid conflict.
请为每个后端使用独立的虚拟环境以避免冲突。

| Backend (后端) | Install command (安装命令) |
| :--- | :--- |
| Transformers | `uv pip install -e ".[transformers]"` |
| SGLang | `uv pip install -e ".[sglang]"` |
| vLLM | See below (见下文) |
| MLX (Apple Silicon) | `pip install -e ".[mlx]"` |

**vLLM:**
vLLM v0.20.1+ includes core DFlash support. Use the standard install for most models:
vLLM v0.20.1+ 已包含核心 DFlash 支持。对于大多数模型，请使用标准安装：
`uv pip install -e ".[vllm]"`

Gemma4 DFlash currently needs our temporary vLLM Gemma4 build. Docker is recommended:
Gemma4 DFlash 目前需要我们临时的 vLLM Gemma4 构建版本。推荐使用 Docker：
`docker pull ghcr.io/z-lab/vllm-openai:gemma4-dflash-cu130`

Source fallback for Gemma4:
Gemma4 源码回退安装：
`uv pip install -U --torch-backend=auto "vllm @ git+https://github.com/vllm-project/vllm.git@refs/pull/41703/head"`

Newer non-Gemma4 SWA draft models use the SWA support branch:
较新的非 Gemma4 SWA 草稿模型请使用 SWA 支持分支：
`uv pip install -U --torch-backend=auto "vllm @ git+https://github.com/vllm-project/vllm.git@refs/pull/40898/head"`

---

### 🚀 Quick Start (快速开始)

**vLLM Gemma4 with Docker:**
```bash
docker run --rm -it \
  --gpus all \
  --ipc=host \
  --shm-size=16g \
  -p 8000:8000 \
  -v ~/.cache/huggingface:/root/.cache/huggingface \
  ghcr.io/z-lab/vllm-openai:gemma4-dflash-cu130 \
  google/gemma-4-26B-A4B-it \
  --host 0.0.0.0 \
  --port 8000 \
  --speculative-config '{"method": "dflash", "model": "z-lab/gemma-4-26B-A4B-it-DFlash", "num_speculative_tokens": 15, "attention_backend": "flash_attn"}' \
  --attention-backend triton_attn \
  --max-num-batched-tokens 32768 \
  --trust-remote-code
```

**Non-Gemma4 models (非 Gemma4 模型):**
```bash
vllm serve Qwen/Qwen3.5-27B \
  --speculative-config '{"method": "dflash", "model": "z-lab/Qwen3.5-27B-DFlash", "num_speculative_tokens": 15}' \
  --attention-backend flash_attn \
  --max-num-batched-tokens 32768
```

**SGLang:**
```bash
export SGLANG_ALLOW_OVERWRITE_LONGER_CONTEXT_LEN=1
python -m sglang.launch_server \
  --model-path Qwen/Qwen3.5-35B-A3B \
  --speculative-algorithm DFLASH \
  --speculative-draft-model-path z-lab/Qwen3.5-35B-A3B-DFlash \
  --speculative-num-draft-tokens 16 \
  --tp-size 1 \
  --attention-backend trtllm_mha \
  --speculative-draft-attention-backend fa4 \
  --mem-fraction-static 0.75 \
  --mamba-scheduler-strategy extra_buffer \
  --trust-remote-code
```

**Transformers:**
Only Qwen3 and LLaMA-3.1 models support the Transformers backend.
仅 Qwen3 和 LLaMA-3.1 模型支持 Transformers 后端。

```python
from transformers import AutoModel, AutoModelForCausalLM, AutoTokenizer
draft = AutoModel.from_pretrained("z-lab/Qwen3-8B-DFlash-b16", trust_remote_code=True, dtype="auto", device_map="cuda:0").eval()
target = AutoModelForCausalLM.from_pretrained("Qwen/Qwen3-8B", dtype="auto", device_map="cuda:0").eval()
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen3-8B")
messages = [{"role": "user", "content": "How many positive whole-number divisors does 196 have?"}]
input_ids = tokenizer.apply_chat_template(messages, return_tensors="pt", add_generation_prompt=True, enable_thinking=False).to(draft.device)
output = draft.spec_generate(input_ids=input_ids, max_new_tokens=2048, temperature=0.0, target=target, stop_token_ids=[tokenizer.eos_token_id])
print(tokenizer.decode(output[0], skip_special_tokens=False))
```

**MLX (Apple Silicon):**
There have been many great community DFlash implementations on MLX; we provide a simple and efficient one here, tested on an Apple M5 Pro with Qwen3, Qwen3.5 and Gemma-4 models.
社区在 MLX 上已经有了许多优秀的 DFlash 实现；我们在此提供了一个简单高效的版本，并在搭载 M5 Pro 的 Apple 设备上针对 Qwen3、Qwen3.5 和 Gemma-4 模型进行了测试。

```python
from dflash.model_mlx import load, load_draft, stream_generate
model, tokenizer = load("Qwen/Qwen3.5-4B")
draft = load_draft("z-lab/Qwen3.5-4B-DFlash")
messages = [{"role": "user", "content": "How many positive whole-number divisors does 196 have?"}]
prompt = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True, enable_thinking=True)
tps = 0.0
for r in stream_generate(model, draft, tokenizer, prompt, block_size=16, max_tokens=2048, temperature=0.6):
    print(r.text, end="", flush=True)
    tps = r.generation_tps
print(f"\nThroughput: {tps:.2f} tok/s")
```

---

### 📊 Evaluation (评估)

All benchmarks share the same datasets (gsm8k, math500, humaneval, mbpp, mt-bench). Datasets are automatically downloaded and cached as JSONL in `cache/` on first run.
所有基准测试均使用相同的数据集（gsm8k, math500, humaneval, mbpp, mt-bench）。数据集在首次运行时会自动下载并以 JSONL 格式缓存在 `cache/` 目录中。

**vLLM:**
`python -m dflash.benchmark --backend vllm --base-url http://127.0.0.1:8000 --model Qwen/Qwen3.5-27B --dataset gsm8k --num-prompts 128 --concurrency 1 --enable-thinking`

**SGLang:**
`python -m dflash.benchmark --backend sglang --base-url http://127.0.0.1:30000 --model Qwen/Qwen3.5-35B-A3B --dataset gsm8k --num-prompts 128 --concurrency 1 --enable-thinking`

**Transformers (Qwen3 and LLaMA only):**
`torchrun --nproc_per_node=8 -m dflash.benchmark --backend transformers --model Qwen/Qwen3-8B --draft-model z-lab/Qwen3-8B-DFlash-b16 --dataset gsm8k --max-samples 128`