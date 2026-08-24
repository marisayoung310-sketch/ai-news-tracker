---
title: "Bringing Nunchaku 4-bit Diffusion Inference to Diffusers"
originalUrl: "https://huggingface.co/blog/nunchaku-diffusers"
date: "2026-07-23T22:31:41.429Z"
---

# Bringing Nunchaku 4-bit Diffusion Inference to Diffusers
# 将 Nunchaku 4-bit 扩散模型推理引入 Diffusers

Large diffusion transformers can create stunning images (or even videos, audio snippets, and now text), but loading a modern text-to-image model in BF16 precision often requires 20-30 GB of VRAM, which puts these models out of reach of most consumer GPUs.
大型扩散 Transformer 模型能够创作出令人惊叹的图像（甚至视频、音频片段，以及现在的文本），但以 BF16 精度加载现代文生图模型通常需要 20-30 GB 的显存，这使得大多数消费级 GPU 无法运行这些模型。

Quantization is a powerful solution to this problem, and Diffusers already integrates several quantization backends such as bitsandbytes, GGUF, torchao, and Quanto, which we covered in Exploring Quantization Backends in Diffusers.
量化是解决这一问题的有力方案。Diffusers 已经集成了多种量化后端，例如 bitsandbytes、GGUF、torchao 和 Quanto，我们曾在《探索 Diffusers 中的量化后端》一文中对此进行过介绍。

Most of these backends are weight-only. This means that they store the weights in low precision and dequantize them back to high precision at compute time. This reduces memory usage significantly, but it usually does not make inference faster, and can even add a small latency overhead.
这些后端大多是“仅权重”（weight-only）量化。这意味着它们以低精度存储权重，并在计算时将其反量化回高精度。这显著降低了内存占用，但通常不会提高推理速度，甚至可能增加少许延迟。

SVDQuant, the quantization method behind the popular Nunchaku inference engine, takes a different approach. It runs the main transformer layers with 4-bit weights and activations (W4A4), reducing memory while also speeding up the denoising loop.
SVDQuant 是热门推理引擎 Nunchaku 背后的量化方法，它采用了不同的路径。它在 4-bit 权重和激活值（W4A4）下运行主要的 Transformer 层，在减少内存占用的同时，还加速了去噪循环。

The details are covered below, but until now, using these checkpoints required a separate inference library. With current Diffusers, loading a Nunchaku checkpoint is as simple as calling `from_pretrained()`, with no local CUDA compilation required thanks to the `kernels` package.
具体细节将在下文介绍。在此之前，使用这些检查点（checkpoints）需要单独的推理库。而在当前的 Diffusers 中，加载 Nunchaku 检查点就像调用 `from_pretrained()` 一样简单，且得益于 `kernels` 包，无需进行本地 CUDA 编译。

In addition, the companion `diffuse-compressor` toolkit lets you quantize new architectures yourself and publish them as regular Diffusers repositories.
此外，配套的 `diffuse-compressor` 工具包允许你自行量化新的架构，并将其发布为常规的 Diffusers 仓库。

---

### Getting started with Nunchaku Lite
### Nunchaku Lite 入门

First, install the requirements. You need a recent version of Diffusers and the Hugging Face kernels package:
首先，安装所需依赖。你需要最新版本的 Diffusers 和 Hugging Face 的 `kernels` 包：

```bash
pip install -U diffusers transformers accelerate kernels bitsandbytes
```

Then load a pre-quantized pipeline like any other Diffusers model:
然后像加载其他 Diffusers 模型一样加载预量化的流水线：

```python
import torch
from diffusers import ErnieImagePipeline

pipe = ErnieImagePipeline.from_pretrained(
    "lite-infer/ERNIE-Image-Turbo-nunchaku-lite-nvfp4_r32-bnb4-text-encoder",
    torch_dtype=torch.bfloat16,
).to("cuda")

image = pipe(
    prompt="A cinematic portrait of a red fox in a misty forest at sunrise, "
           "detailed fur, volumetric light",
    height=1024, width=1024,
    num_inference_steps=8,
    guidance_scale=1.0,
    generator=torch.Generator("cuda").manual_seed(42),
).images[0]

image.save("output.png")
```

No custom pipeline class or separate inference engine is needed, and there is nothing to compile locally. The NVFP4 kernels are downloaded from the Hub through the `kernels` package the first time they are used.
无需自定义流水线类或单独的推理引擎，也无需在本地编译任何内容。NVFP4 内核会在首次使用时通过 `kernels` 包从 Hub 下载。

This checkpoint pairs a Nunchaku NVFP4 transformer with a bitsandbytes NF4 text encoder, and generates a 1024x1024 image in about 1.7 seconds on an RTX 5090 with a peak memory usage of about 12 GB, compared with about 24 GB for the BF16 pipeline.
该检查点将 Nunchaku NVFP4 Transformer 与 bitsandbytes NF4 文本编码器配对，在 RTX 5090 上生成 1024x1024 图像仅需约 1.7 秒，峰值显存占用约为 12 GB，而 BF16 流水线则需要约 24 GB。

---

### Background: SVDQuant and Nunchaku
### 背景：SVDQuant 与 Nunchaku

SVDQuant is the quantization method behind Nunchaku, its reference CUDA inference engine. Standard 4-bit quantization is difficult for diffusion transformers because both weights and activations contain large outliers.
SVDQuant 是 Nunchaku（其参考 CUDA 推理引擎）背后的量化方法。标准的 4-bit 量化对于扩散 Transformer 来说很困难，因为权重和激活值中都包含大量的离群值（outliers）。

SVDQuant handles this by moving activation outliers into the weights, representing the hardest part of each weight matrix with a small 16-bit low-rank branch, and quantizing the remaining residual to 4 bits.
SVDQuant 通过将激活值的离群值转移到权重中来处理这一问题，它用一个小的 16-bit 低秩分支来表示每个权重矩阵中最难处理的部分，并将剩余的残差量化为 4-bit。

Nunchaku makes this fast with fused kernels for the 4-bit path and the low-rank branch. Nunchaku fuses the low-rank down projection with the quantization kernel and the low-rank up projection with the 4-bit compute kernel, eliminating the memory access overhead of the 16-bit branch.
Nunchaku 通过为 4-bit 路径和低秩分支提供融合内核（fused kernels）来提升速度。Nunchaku 将低秩降维投影与量化内核融合，并将低秩升维投影与 4-bit 计算内核融合，消除了 16-bit 分支的内存访问开销。

---

### Introducing Nunchaku Lite
### 介绍 Nunchaku Lite

The original Nunchaku engine gets much of its speed from model-specific fused execution paths, such as fused QKV projections and fused GELU/MLP kernels. Those optimizations are tied to each architecture's module layout and checkpoint format, so supporting a new model family usually requires model-specific integration work.
原始的 Nunchaku 引擎之所以速度快，很大程度上得益于针对特定模型的融合执行路径，例如融合的 QKV 投影和融合的 GELU/MLP 内核。这些优化与每个架构的模块布局和检查点格式绑定，因此支持一个新的模型系列通常需要针对该模型进行集成工作。

Nunchaku Lite is the new integration path in Diffusers. With it, Diffusers can load Nunchaku-style checkpoints without a custom pipeline or a separate inference engine.
Nunchaku Lite 是 Diffusers 中的新集成路径。有了它，Diffusers 无需自定义流水线或单独的推理引擎即可加载 Nunchaku 风格的检查点。

Under the hood, Nunchaku Lite patches the relevant `nn.Linear` modules of a stock Diffusers model with runtime SVDQ/AWQ linear layers before the checkpoint is loaded. The CUDA kernels come from the Hub through the `kernels` package.
在底层，Nunchaku Lite 会在加载检查点之前，利用运行时 SVDQ/AWQ 线性层对标准 Diffusers 模型中相关的 `nn.Linear` 模块进行修补。CUDA 内核则通过 `kernels` 包从 Hub 获取。

Two kernel families are used:
使用了两个内核系列：

*   **svdq_w4a4**: 4-bit weights and activations with the SVDQuant low-rank correction. This layer is used for the transformer's attention and MLP projections, where nearly all of the compute is spent, and is available in INT4 and NVFP4 variants.
    **svdq_w4a4**：4-bit 权重和激活值，带有 SVDQuant 低秩校正。该层用于 Transformer 的注意力机制和 MLP 投影（这是计算量集中的地方），提供 INT4 和 NVFP4 变体。
*   **awq_w4a16**: 4-bit weights with 16-bit activations, used for adaptive normalization and modulation projections such as FLUX `adanorm_single` / `adanorm_zero` or Qwen-Image modulation layers. These layers are memory-bound and precision-sensitive, making AWQ a good fit to preserve precision while still saving memory and space.
    **awq_w4a16**：4-bit 权重和 16-bit 激活值，用于自适应归一化和调制投影，例如 FLUX 的 `adanorm_single` / `adanorm_zero` 或 Qwen-Image 的调制层。这些层受限于内存带宽且对精度敏感，因此 AWQ 非常适合在保持精度的同时节省内存和空间。

The trade-off is that, without architecture-specific fused kernels and modules, Nunchaku Lite cannot match the speedup of the original Nunchaku engine. However, the bare-bones implementation still delivers around 30% speedup while retaining the same level of VRAM reduction.
权衡之处在于，由于没有针对特定架构的融合内核和模块，Nunchaku Lite 无法达到原始 Nunchaku 引擎的加速水平。不过，这种精简实现依然能带来约 30% 的速度提升，同时保持了相同的显存节省效果。