---
title: "AirLLM Runs a 70B Model on a 4GB GPU. It's True, and That's Not the Interesting Part"
originalUrl: "https://dev.to/arshtechpro/airllm-runs-a-70b-model-on-a-4gb-gpu-its-true-and-thats-not-the-interesting-part-hha"
date: "2026-08-03T22:36:52.065Z"
---

# AirLLM Runs a 70B Model on a 4GB GPU. It's True, and That's Not the Interesting Part
# AirLLM 可以在 4GB 显存的 GPU 上运行 70B 模型。这是真的，但这并不是最有趣的部分

AirLLM's README opens with a line that sounds like it can't be true: AirLLM dramatically reduces inference memory usage, letting 70B large language models run on a single 4GB GPU card — without quantization, distillation, or pruning. So let's actually check it. Is the claim real? How do you set it up? And — the question nobody asks loudly enough — should you?
AirLLM 的 README 开篇就抛出了一句听起来难以置信的话：AirLLM 极大地降低了推理时的内存占用，使得 70B 参数的大语言模型可以在单张 4GB 显存的 GPU 上运行——而且无需量化、蒸馏或剪枝。那么，让我们来一探究竟。这个说法是真的吗？该如何配置？以及——一个没人足够大声提问的问题——你真的应该这么做吗？

TL;DR: The claim is technically true and the engineering is legitimate.
简而言之：这个说法在技术上是真实的，其工程实现也是合法的。

The trick, in one paragraph: Here's the thing about a transformer: it's a stack of layers, and it runs them in order. Input → Layer 1 → Layer 2 → Layer 3 → ... → Layer 80 → Output. When Layer 1 is computing, layers 2 through 80 are just... sitting in your VRAM. Doing nothing. Taking up space. Normal inference loads all 80 layers into GPU memory because keeping them there is fast. AirLLM asks the obvious follow-up question: what if we didn't? Load Layer 1, run it, throw it away, load Layer 2, run it, throw it away. Now your VRAM requirement isn't "the size of the model." It's "the size of the single largest layer." For a 70B model at full FP16 precision, that's roughly 1.75GB per layer. Which fits in 4GB with room to spare. The model is still 140GB — it just lives on your disk instead of your GPU, streaming through one slice at a time. That's it. That's the whole idea. And it genuinely works.
其诀窍用一段话概括：Transformer 的本质是一层层的堆叠，并按顺序运行。输入 → 第 1 层 → 第 2 层 → 第 3 层 → ... → 第 80 层 → 输出。当第 1 层在计算时，第 2 到第 80 层只是……静静地待在显存里。什么也不做，却占用了空间。正常的推理会将所有 80 层加载到 GPU 内存中，因为这样速度快。AirLLM 提出了一个显而易见的后续问题：如果我们不这样做呢？加载第 1 层，运行，丢弃；加载第 2 层，运行，丢弃。现在，你的显存需求不再是“整个模型的大小”，而是“单层最大的大小”。对于 FP16 全精度的 70B 模型，每层大约 1.75GB，这完全可以塞进 4GB 显存且绰绰有余。模型依然是 140GB——它只是存放在你的硬盘而不是 GPU 上，每次只流式传输一个切片。就是这样。这就是全部核心思想。而且它确实有效。

Fact-check: is the claim real? Yes — with an asterisk the size of the model itself. Let's take the claims one at a time. "70B on a single 4GB GPU" Real. The math checks out (~1.75GB per layer at FP16), and it's been independently reproduced by enough people that this isn't in dispute. "Without quantization, distillation, or pruning" Real, and this is the genuinely interesting part. Most "run big models on small hardware" tricks work by making the model worse — squashing weights from 16 bits to 4, which costs you some accuracy. AirLLM doesn't have to. You get the actual, unmodified, full-precision model. (Quantization is optional here — you can pass compression='4bit' to make it faster. But you don't have to, and that's the distinction they're drawing.)
事实核查：这个说法是真的吗？是真的——但带有一个和模型本身一样大的星号。让我们逐一分析这些说法。“在 4GB GPU 上运行 70B”：是真的。数学计算成立（FP16 下每层约 1.75GB），并且已经被足够多的人独立复现，这一点毋庸置疑。“无需量化、蒸馏或剪枝”：是真的，这才是真正有趣的部分。大多数“在小硬件上运行大模型”的技巧都是通过牺牲模型性能来实现的——将权重从 16 位压缩到 4 位，这会损失一定的精度。AirLLM 不需要这样做。你得到的是真实、未经修改的全精度模型。（这里量化是可选的——你可以传入 `compression='4bit'` 来加速。但你不是必须这样做，这就是他们所强调的区别。）

The bigger numbers, too: The README's scaling table looks absurd but follows from the same logic:
更大的数字也是如此：README 中的扩展表格看起来很荒谬，但遵循同样的逻辑：

| Model Size | Claimed VRAM |
| :--- | :--- |
| Llama 3.x 70B | ~4 GB |
| Llama 3.1 405B | ~8 GB |
| DeepSeek-V3 671B | ~12 GB |
| Qwen3-235B (MoE) | ~3 GB |
| Kimi K3 (MoE) | ~3.7 GB |

Notice something weird? The 2.8-trillion-parameter model needs less VRAM than the 671B one. That's not an error. Those are Mixture-of-Experts models. An MoE layer contains hundreds of "expert" sub-networks, but each token only routes to a handful of them. Per the v3.1.0 release notes, Kimi K3 holds 896 experts per layer and routes each token to just 16 — so while a full layer's experts expand to ~55GB, a single token only actually needs ~1GB of them. AirLLM streams just those experts instead of the whole layer. Sparser model → smaller working set → less VRAM. Counterintuitive, correct.
注意到奇怪的地方了吗？这个 2.8 万亿参数的模型所需的显存比 671B 的还要少。这不是错误。这些是混合专家模型（MoE）。一个 MoE 层包含数百个“专家”子网络，但每个 token 只会路由到其中少数几个。根据 v3.1.0 的发布说明，Kimi K3 每层拥有 896 个专家，每个 token 只路由到其中的 16 个——因此，虽然完整一层的专家总计约 55GB，但单个 token 实际上只需要其中的约 1GB。AirLLM 只流式传输这些专家，而不是整个层。模型越稀疏 → 工作集越小 → 显存占用越少。反直觉，但确实如此。

What the headline leaves out: Here's the part that isn't in the big bold text. From AirLLM's own v3.1.0 release notes, measured on an RTX 6000 Ada:
标题中遗漏的内容：这是大标题中没有提到的部分。根据 AirLLM 自己的 v3.1.0 发布说明，在 RTX 6000 Ada 上测得的数据：

*   **Peak VRAM during generation:** 3.72 GB
*   **One-time init:** 900 seconds
*   **Generation speed:** 292 s/token, disk-bound
*   **生成期间峰值显存：** 3.72 GB
*   **一次性初始化：** 900 秒
*   **生成速度：** 292 秒/token，受限于磁盘速度

To be clear about what that means: a 100-token response would take just over 8 hours. Credit where it's due — the maintainer publishes this honestly in the release notes. It's just not the number on the marketing line. For more typical setups, community reports land in the range of: 70B on a decent NVMe: roughly 5–35 seconds per token; 70B on a MacBook: reports as low as ~0.07 tokens/sec (~14 s/token). For comparison, llama.cpp with a quantized 70B on an RTX 4090: 8–15 tokens per second. So the honest version of the claim is: AirLLM doesn't make 70B fast on a 4GB GPU. It makes 70B possible on a 4GB GPU.
明确一下这意味着什么：生成 100 个 token 的回复需要 8 个多小时。必须给予肯定的是，维护者在发布说明中诚实地公布了这一点。只是它没有出现在营销文案中。对于更典型的配置，社区报告的范围是：在不错的 NVMe 硬盘上运行 70B：大约每 token 5–35 秒；在 MacBook 上运行 70B：报告低至约 0.07 token/秒（约 14 秒/token）。作为对比，使用 llama.cpp 在 RTX 4090 上运行量化版 70B：每秒 8–15 个 token。所以，诚实的说法是：AirLLM 并没有让 70B 在 4GB GPU 上变快，它只是让 70B 在 4GB GPU 上变得“可行”。

Why it's slow (do this math once and you'll never be confused again): This is worth internalizing, because it explains everything and it's not complicated. To generate one token, the model must run every single layer. Which means AirLLM must read the entire model off disk — for every token. So: seconds per token ≈ model size on disk ÷ disk read speed.
为什么它很慢（算一次这个数学题，你就再也不会困惑了）：这值得深入理解，因为它解释了一切，而且并不复杂。为了生成一个 token，模型必须运行每一层。这意味着 AirLLM 必须从磁盘读取整个模型——针对每一个 token。所以：每 token 秒数 ≈ 磁盘上的模型大小 ÷ 磁盘读取速度。

Let's plug in a 70B model at FP16 (~140GB):
让我们代入一个 FP16 的 70B 模型（约 140GB）：

*   **Gen4 NVMe SSD (~7 GB/s):** ~20 s
*   **Gen3 NVMe SSD (~3.5 GB/s):** ~40 s
*   **SATA SSD (~0.5 GB/s):** ~280 s
*   **Spinning HDD (~0.15 GB/s):** ~900+ s

Your disk is your inference engine. The GPU is barely working — it's sitting idle waiting for data. This is why AirLLM users report their fans screaming and their laptop becoming unusable: the bottleneck is I/O and CPU, not compute. Two consequences that fall right out of this formula:
你的硬盘就是你的推理引擎。GPU 几乎没在工作——它只是闲置着等待数据。这就是为什么 AirLLM 用户报告风扇狂转、电脑变得无法使用：瓶颈在于 I/O 和 CPU，而不是计算能力。从这个公式中可以得出两个结论：

1.  **Use compression='4bit'.** It shrinks the bytes you have to read by ~4x. The README advertises up to 3x speedup, and now you know exactly why — this isn't about faster math, it's about moving less data.
    **使用 `compression='4bit'`。** 它将你需要读取的字节数减少了约 4 倍。README 声称有高达 3 倍的加速，现在你知道原因了——这与更快的数学运算无关，而是关于减少数据传输量。
2.  **RAM is secretly your best upgrade.** If your system RAM can hold a big chunk of the model, the OS page cache serves layers from memory instead of disk. This is why people with 128GB machines report dramatically better numbers than the raw disk math predicts.
    **内存（RAM）实际上是你最好的升级。** 如果你的系统内存能容纳模型的一大部分，操作系统页面缓存就会从内存而不是磁盘中提供层数据。这就是为什么拥有 128GB 内存机器的用户报告的数据远好于原始磁盘数学计算的预测。

Setup Requirements — read this part before you start: Disk space is the #1 thing that will bite you. AirLLM downloads the model, then decomposes it into per-layer shards. For a 70B FP16 model, budget: ~140GB (original download) + ~140GB (layer shards) = ~280GB free space. The single most common error in the repo's FAQ — `safetensors_rust.SafetensorError: Error while deserializing header: MetadataIncompleteBuffer` — is, per the maintainers, almost always just you ran out of disk. You'll also want: An NVMe SSD (not SATA, definitely not HDD); As much system RAM as you can get; A Hugging Face token for gated models like Llama; Patience. Real, genuine patience.
配置要求——开始前请阅读此部分：磁盘空间是第一个会让你栽跟头的地方。AirLLM 会下载模型，然后将其分解为逐层的分片。对于 70B FP16 模型，请预留：约 140GB（原始下载）+ 约 140GB（层分片）= 约 280GB 的可用空间。仓库 FAQ 中最常见的错误——`safetensors_rust.SafetensorError: Error while deserializing header: MetadataIncompleteBuffer`——据维护者称，几乎总是因为你的磁盘空间不足。你还需要：NVMe SSD（不要用 SATA，绝对不要用 HDD）；尽可能大的系统内存；用于像 Llama 这样受限模型的 Hugging Face token；耐心。真正的、实实在在的耐心。

1. Install: `pip install airllm`. For the 4-bit compression speedup (recommended — see the math above): `pip install -U bitsandbytes`
1. 安装：`pip install airllm`。为了获得 4-bit 压缩加速（推荐——参见上面的数学计算）：`pip install -U bitsandbytes`

2. Run it:
2. 运行它：
```python
from airllm import AutoModel
model = AutoModel.from_pretrained("Qwen/...")
```