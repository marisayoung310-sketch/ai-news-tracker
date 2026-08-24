---
title: "DeepSeek V4 Flash on a Single AMD MI300X"
originalUrl: "https://github.com/ryanzhou/deepseek-v4-flash-mi300x"
date: "2026-08-04T22:32:11.355Z"
---

# DeepSeek V4 Flash on a Single AMD MI300X

DeepSeek V4 Flash on a single AMD MI300X. This repository contains the configuration and patches I use to run `deepseek-ai/DeepSeek-V4-Flash-0731` on one AMD MI300X in production. It includes the Docker Compose stack, SHA-256-pinned file overlays, reference diffs against upstream, and tuning tables. The checkpoint runs as shipped, without additional weight quantization or offload.
在单张 AMD MI300X 上运行 DeepSeek V4 Flash。本仓库包含了我在生产环境中将 `deepseek-ai/DeepSeek-V4-Flash-0731` 部署于单张 AMD MI300X 上所使用的配置与补丁。其中包括 Docker Compose 堆栈、SHA-256 校验固定的文件覆盖、针对上游代码的参考差异（diffs）以及调优表。该检查点（checkpoint）按原样运行，无需额外的权重量化或卸载（offload）。

Results from the pinned stack (vLLM ROCm nightly 0.26.1rc1.dev229+g124154a88.rocm723, AITER 0.1.19):
来自固定堆栈的测试结果（vLLM ROCm nightly 0.26.1rc1.dev229+g124154a88.rocm723, AITER 0.1.19）：

| Metric | Result |
| :--- | :--- |
| Single-stream decode (median per-stream, DSpark-7) | 168.6 tok/s |
| Prefill with tuned kernels | ≈ 7.9–8.5K tok/s (6,988–7,019 tok/s on fresh prompts in the shipping profile) |
| 8 concurrent streams | 542 tok/s aggregate, 90.3 tok/s median per stream |
| 64-stream burst | 830 tok/s aggregate, no OOM, no engine errors |
| Context | 256K validated (the architecture supports 1M) |
| Weights in HBM | 156.67 GiB — no additional quantization or weight offload |

| 指标 | 结果 |
| :--- | :--- |
| 单流解码（每流中位数，DSpark-7） | 168.6 tok/s |
| 使用调优内核进行预填充（Prefill） | ≈ 7.9–8.5K tok/s（在生产配置下，新提示词为 6,988–7,019 tok/s） |
| 8 并发流 | 总计 542 tok/s，每流中位数 90.3 tok/s |
| 64 流突发 | 总计 830 tok/s，无 OOM（内存溢出），无引擎错误 |
| 上下文 | 已验证 256K（架构支持 1M） |
| HBM 中的权重 | 156.67 GiB — 无额外量化或权重卸载 |

The official vLLM recipe targets NVIDIA and newer AMD hardware. Running the model reliably on MI300X required fixes for its FP8 format, MoE routing at high concurrency, causal speculative verification, CPU-KV synchronization, and several untuned kernel shapes. This repository collects those fixes and pins the versions used in production.
官方的 vLLM 配方主要针对 NVIDIA 和较新的 AMD 硬件。要在 MI300X 上稳定运行该模型，需要针对其 FP8 格式、高并发下的 MoE 路由、因果推测验证、CPU-KV 同步以及若干未调优的内核形状进行修复。本仓库收集了这些修复方案，并锁定了生产环境中使用的版本。

### Why MI300X
### 为什么选择 MI300X
The MI300X has 192 GB of HBM3 and 5.3 TB/s of memory bandwidth, with 2.4× the HBM capacity of an H100 SXM5 (AMD). Doubleword's write-up estimates that it costs roughly half as much at list price. For this 304B-parameter checkpoint, the memory capacity allows a simple single-GPU deployment: The entire model fits in HBM without PCIe weight streaming or layer offload. There is room for a 20 GB GPU KV pool and a 96 GiB CPU tier for evicted prefix-cache entries. One card handles 2–8 typical concurrent streams and bursts of up to 64 streams.
MI300X 拥有 192 GB 的 HBM3 和 5.3 TB/s 的内存带宽，其 HBM 容量是 H100 SXM5 的 2.4 倍。Doubleword 的文章估计其标价约为后者的一半。对于这个 304B 参数的检查点，其内存容量允许进行简单的单 GPU 部署：整个模型可以放入 HBM 中，无需 PCIe 权重流式传输或层卸载。此外，还有空间预留 20 GB 的 GPU KV 池和 96 GiB 的 CPU 层，用于存放被淘汰的前缀缓存条目。单张显卡可处理 2–8 个典型的并发流，并支持高达 64 个流的突发请求。

MI300X (CDNA3) implements the AMD/Graphcore fnuz variant of E4M3, while MI325X and newer use OCP-standard FP8 (background). A kernel that assumes OCP semantics on MI300X can be wrong by a factor of two in the scale domain. Correctness on this FP8 implementation was the first priority; performance tuning came afterward.
MI300X (CDNA3) 实现了 AMD/Graphcore 的 E4M3 fnuz 变体，而 MI325X 及更新型号则使用 OCP 标准的 FP8（背景信息）。如果内核在 MI300X 上假设 OCP 语义，可能会导致缩放域（scale domain）出现两倍的误差。因此，确保 FP8 实现的正确性是首要任务，性能调优则在之后进行。

### Prior art, and what this repo adds
### 前人工作及本仓库的贡献
Fergus Finn's MI300X worklog and the accompanying Doubleword repository identified the FP8 incompatibility, missing AITER fast paths on gfx942, HIP-graph hazards in sparse MLA decode, and MoE routing bugs. The official vLLM recipe covers NVIDIA hardware and newer AMD GPUs (MI325X at 4K context and MI355X), but not a single-MI300X production configuration for the 0731 checkpoint. This repository adds:
Fergus Finn 的 MI300X 工作日志及配套的 Doubleword 仓库指出了 FP8 不兼容性、gfx942 上缺失的 AITER 快速路径、稀疏 MLA 解码中的 HIP-graph 风险以及 MoE 路由错误。官方 vLLM 配方涵盖了 NVIDIA 硬件和较新的 AMD GPU（如 4K 上下文下的 MI325X 和 MI355X），但并未提供针对 0731 检查点的单卡 MI300X 生产配置。本仓库补充了以下内容：

*   **Correctness overlays** for the pinned ROCm nightly, including fixes not yet in upstream vLLM.
    针对固定 ROCm nightly 版本的**正确性覆盖补丁**，包含尚未合并到 vLLM 上游的修复。
*   **A validated serving configuration** with probabilistic DSpark drafting, block rejection, and static K=7. It uses a 2,048-token scheduler budget and a 1,024-token long-prefill cap to prevent a cold prompt from stalling other streams.
    **经过验证的服务配置**，包含概率性 DSpark 草稿、块拒绝（block rejection）和静态 K=7。它使用 2,048 token 的调度预算和 1,024 token 的长预填充上限，以防止冷提示词阻塞其他流。
*   **AITER GEMM tuning tables** for the recurring gfx942 shapes the packaged tables were missing, plus a gfx942 OGS geometry override for the MXFP4 experts.
    针对 gfx942 常见形状的 **AITER GEMM 调优表**（补全了官方缺失的部分），以及针对 MXFP4 专家模型的 gfx942 OGS 几何覆盖。
*   **A hybrid KV strategy**: 20 GB of fp8_ds_mla GPU cache + 96 GiB native CPU offload, with a load-path fencing fix that upstream issue #47282 documents but PR #47291 never merged.
    **混合 KV 策略**：20 GB 的 fp8_ds_mla GPU 缓存 + 96 GiB 原生 CPU 卸载，并包含一个加载路径围栏（load-path fencing）修复，该问题在上游 issue #47282 中有记录，但 PR #47291 未能合并。

### Repository layout
### 仓库结构
```text
.
├── compose.yaml              # The production stack (vLLM ROCm + Caddy), digest-pinned
├── Caddyfile.example         # Copy to Caddyfile; set hostname, email, and source CIDR
├── vllm-entrypoint.sh        # Removes stale CPU-KV mmaps from /dev/shm before start
├── SHA256SUMS                # SHA-256 pins for every runtime artifact
├── patches/
│   ├── *.py                  # Byte-for-byte production overlays (mounted read-only)
│   ├── diffs/*.patch         # Unified diffs vs. the upstream base revision
│   └── README.md             # Provenance and regeneration instructions
└── tuning/
    └── *.csv                 # AITER A8W8 blockscale tuning tables for gfx942
```

### Runtime configuration
### 运行时配置
The stack uses a digest-pinned official vLLM ROCm nightly with:
该堆栈使用摘要固定的官方 vLLM ROCm nightly 版本，并包含：

*   `--trust-remote-code` and the DeepSeek V4 tokenizer, reasoning, and tool parsers.
    `--trust-remote-code` 以及 DeepSeek V4 分词器、推理和工具解析器。
*   `fp8_ds_mla` KV cache (UE8M0 block-scaled FP8, not generic unscaled FP8) with 256-token blocks.
    `fp8_ds_mla` KV 缓存（UE8M0 块缩放 FP8，而非通用的未缩放 FP8），块大小为 256 token。
*   `VLLM_ROCM_USE_AITER=1` and `--moe-backend triton`; Triton OGS handles the grouped MXFP4 experts, while AITER handles attention and dense linear layers.
    `VLLM_ROCM_USE_AITER=1` 和 `--moe-backend triton`；Triton OGS 处理分组的 MXFP4 专家模型，而 AITER 处理注意力机制和稠密线性层。
*   DSpark-7 speculative decoding with probabilistic drafting and block rejection.
    带有概率草稿和块拒绝的 DSpark-7 推测解码。
*   Full/breakable CUDA graph capture, giving one graph launch per token during steady decode.
    完整/可中断的 CUDA 图捕获，在稳定解码期间实现每个 token 一次图启动。
*   Caddy as an IP-allowlisted HTTPS proxy.
    作为 IP 白名单 HTTPS 代理的 Caddy。

### Deploying it
### 部署步骤

1. **Host prerequisites**: One MI300X (gfx942, 304 CUs, ~192 GiB HBM), a working AMD kernel driver, recent Docker Compose, ~235 GiB RAM for the CPU KV tier, and ~500 GB disk (the model cache alone is ~156 GB).
   **主机先决条件**：一张 MI300X（gfx942, 304 CUs, ~192 GiB HBM），可用的 AMD 内核驱动，较新的 Docker Compose，约 235 GiB 的 CPU KV 层内存，以及约 500 GB 的磁盘空间（仅模型缓存就约 156 GB）。

2. **Pull the pinned runtime and model**:
   **拉取固定的运行时和模型**：
   ```bash
   VLLM_IMAGE='vllm/vllm-openai-rocm@sha256:e68d18b2ba50298661bfc49baf01158fbf036645c2362cccf3e8a7a79fe6c69a'
   MODEL='deepseek-ai/DeepSeek-V4-Flash-0731'
   REVISION='7872f01b1d1fe23eabc4c98b48bffcef5a386062'
   docker pull "$VLLM_IMAGE"
   docker run --rm --entrypoint hf \
       -v /root/.cache/huggingface:/root/.cache/huggingface \
       "$VLLM_IMAGE" download "$MODEL" --revision "$REVISION"
   ```

3. **Prepare the files**:
   **准备文件**：
   ```bash
   cp Caddyfile.example Caddyfile # then set your hostname, email, and remote_ip CIDR
   mkdir -p aiter-cache crash-dumps
   chmod +x vllm-entrypoint.sh
   sha256sum -c SHA256SUMS # verify the overlays before first start
   ```

4. **Start**:
   **启动**：
   ```bash
   docker compose config -q
   docker compose up -d
   docker compose logs -f inference
   ```
   A healthy start takes ~5 minutes and must show all of:
   启动成功大约需要 5 分钟，且必须显示以下所有信息：
   ```text
   Model loading took 156.67 GiB
   DSpark draft model loaded: 96 params
   GPU KV cache size: 1,927,444 tokens
   Maximum concurrency for 262,144 tokens per request: 7.35x
   Created mmap file /dev/shm/vllm_offload_...mmap (103.08 GB)
   Capturing CUDA graphs (FULL)
   Application startup complete
   ```
   After graph capture, run `rocm-smi --showmeminfo vram`. The warmed high-water mark is ~204.5 GB of 205.8 GB. If only a few hundred MB remain, the server may start but fail on the first request.
   图捕获完成后，运行 `rocm-smi --showmeminfo vram`。预热后的高水位线约为 205.8 GB 中的 204.5 GB。如果仅剩几百 MB，服务器可能会启动，但在处理第一个请求时失败。

5. **Smoke-test**:
   **冒烟测试**：
   ```bash
   HOST='your-host.example.com'
   curl -fsS "https://$HOST/v1/models"
   curl -sS "https://$HOST/..."
   ```