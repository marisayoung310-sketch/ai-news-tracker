---
title: "One TPU Chip, Eight Agents: Serving Small Agent Workloads with Raw JAX"
originalUrl: "https://dev.to/xbill/one-tpu-chip-eight-agents-serving-small-agent-workloads-with-raw-jax-2cc4"
date: "2026-07-29T22:24:07.347Z"
---

# One TPU Chip, Eight Agents: Serving Small Agent Workloads with Raw JAX
# 单个 TPU 芯片，八个智能体：使用原生 JAX 服务小型智能体工作负载

Cloud TPU v6e-1 (ct6e-standard-1t, one v6e chip, 32 GB HBM), GCE flex-start, europe-west4-a. vLLM baseline measured 2026-07-21. The workload nobody benchmarks Serving benchmarks optimize for the wrong shape. They report throughput at concurrency 100 with 1,024-token prompts, because that's what a public inference endpoint looks like.
Cloud TPU v6e-1（ct6e-standard-1t，单颗 v6e 芯片，32 GB HBM），GCE flex-start，区域 europe-west4-a。vLLM 基准测试于 2026 年 7 月 21 日测得。这是一个无人问津的工作负载：现有的服务基准测试在优化方向上存在偏差。它们通常报告并发数为 100、提示词长度为 1,024 token 时的吞吐量，因为这符合公共推理端点的典型形态。

A small agent workload looks nothing like that: Low concurrency, high value per stream. Two to eight agents, not two hundred. Each one is a person waiting, or a pipeline stage blocking. Latency compounds serially. An agent turn is think → call tool → read result → think again. Ten round trips at 400 ms of model time each is four seconds of wall clock the user feels.
小型智能体的工作负载完全不同：低并发，但每个流的价值极高。是两到八个智能体，而不是两百个。每一个智能体背后要么是等待中的用户，要么是阻塞的流水线阶段。延迟会串行累积。智能体的一个回合是：思考 → 调用工具 → 读取结果 → 再次思考。如果十次往返中每次模型耗时 400 毫秒，用户感受到的总耗时就是四秒。

Worth flagging that this premise is contested. Zimbres' measurement series argues the reverse for agent fleets: agents "exchange messages among themselves, multiplying token volume by an order of magnitude or more per user task, with no human waiting on any individual token. There, per-token latency loses most of its meaning and aggregate throughput becomes the binding constraint" (DOI 10.5281/zenodo.21212010). Both are right, for different topologies — a serial agent loop with a human at the end is latency-bound; a parallel machine-to-machine fleet is throughput-bound. The metric that covers both is goodput: throughput subject to a per-token latency objective. I use that framing below, but I do not claim a production goodput result from a kernel harness.
值得指出的是，这一前提存在争议。Zimbres 的系列测量研究针对智能体集群提出了相反的观点：智能体“在彼此之间交换消息，使每个用户任务的 token 量增加了十倍甚至更多，且没有人类在等待任何单个 token。在这种情况下，单 token 延迟失去了大部分意义，总吞吐量成为制约因素”（DOI 10.5281/zenodo.21212010）。两者在不同的拓扑结构下都是正确的——末端有人类参与的串行智能体循环受限于延迟；而并行的机器对机器集群则受限于吞吐量。涵盖两者的指标是“有效吞吐量”（goodput）：即满足单 token 延迟目标的吞吐量。我在下文中采用了这一框架，但我并不声称从内核测试工具中得出了生产环境的有效吞吐量结果。

Context grows monotonically. Every tool result is appended and resent. A 20-turn agent loop replays a context that started at 500 tokens and ended at 8,000. This costs more than the extra prefill: on a v5e chip, decode velocity for Gemma 2B falls from ~8,300 to ~2,900 tok/s as input length approaches the context limit, "governed almost entirely by input length and almost not at all by output length" (DOI 10.5281/zenodo.21227936). The generation rate itself sags as history accumulates.
上下文单调增长。每个工具的结果都会被追加并重新发送。一个 20 回合的智能体循环会重放一个从 500 token 开始、最终达到 8,000 token 的上下文。这比额外的预填充（prefill）成本更高：在 v5e 芯片上，随着输入长度接近上下文限制，Gemma 2B 的解码速度会从约 8,300 tok/s 下降到约 2,900 tok/s，这“几乎完全由输入长度决定，而与输出长度几乎无关”（DOI 10.5281/zenodo.21227936）。随着历史记录的积累，生成速率本身会不断下降。

Output is structured. Tool calls are JSON that has to parse. A malformed call isn't a quality regression, it's a crash. Greedy decoding can be a good fit for a narrowly fine-tuned tool model because its output distribution is sharper (DOI 10.5281/zenodo.21212010). That does not make greedy decoding lossless for this general-purpose Gemma checkpoint; it only makes deterministic, cacheable behaviour an attractive operating point to test. That workload fits on one chip — if you can serve the model at all. Which brings us to the problem.
输出是结构化的。工具调用是必须解析的 JSON。格式错误的调用不是质量下降，而是直接崩溃。贪婪解码（Greedy decoding）非常适合经过精细微调的工具模型，因为其输出分布更尖锐（DOI 10.5281/zenodo.21212010）。但这并不意味着贪婪解码对于这个通用 Gemma 检查点是无损的；它只是让确定性、可缓存的行为成为一个值得测试的理想切入点。如果能成功服务该模型，这个工作负载完全可以运行在单颗芯片上。这就引出了问题所在。

The forcing function: #3225 Quantization-aware-trained exports of Gemma 4 E2B do not load in vLLM on TPU:
强制因素：#3225 Gemma 4 E2B 的量化感知训练（QAT）导出版本无法在 TPU 上的 vLLM 中加载：

*   **Checkpoint Backend Failure Verdict**
    **检查点后端失败判定**
*   `-qat-w4a16-ct tpu-inference (JAX) int4 compressed-tensors scheme unimplemented for per_layer_model_projection ✕ no load`
    `-qat-w4a16-ct tpu-inference (JAX) int4 压缩张量方案未针对 per_layer_model_projection 实现 ✕ 无法加载`
*   `-qat-q4_0-unquantized tpu-inference (JAX) demands self_attn.k_norm.weight for layers 15–34 ✕ no load`
    `-qat-q4_0-unquantized tpu-inference (JAX) 要求第 15–34 层的 self_attn.k_norm.weight ✕ 无法加载`
*   `-qat-q4_0-unquantized torchax (MODEL_IMPL_TYPE=vllm) identical missing-weights error ✕ no load`
    `-qat-q4_0-unquantized torchax (MODEL_IMPL_TYPE=vllm) 出现相同的权重缺失错误 ✕ 无法加载`
*   `google/gemma-4-E2B-it (BF16) tpu-inference (JAX) — ✓ serves`
    `google/gemma-4-E2B-it (BF16) tpu-inference (JAX) — ✓ 服务正常`

The checkpoint is right and the loader is wrong. Comparing safetensors headers: the BF16 export ships self_attn.k_norm for all 35 layers; the QAT export ships it only for the 15 non-KV-shared layers. Both configs declare num_kv_shared_layers: 20. Layers 15–34 reuse K/V computed by lower layers. They hold no K-side parameters, so a k-norm for them is meaningless — the QAT export is the architecturally honest one, and the plain checkpoint only loads because it happens to carry the unused tensors along. Filed as tpu-inference #3225; the fix is to skip instantiating K/V-side parameters for shared layers rather than demanding them unconditionally.
检查点是正确的，而加载器是错误的。比较 safetensors 头文件：BF16 导出版本包含了所有 35 层的 self_attn.k_norm；而 QAT 导出版本仅包含 15 个非 KV 共享层。两种配置都声明了 num_kv_shared_layers: 20。第 15–34 层重用了由较低层计算出的 K/V。它们不持有 K 侧参数，因此对它们进行 k-norm 是毫无意义的——QAT 导出版本在架构上是诚实的，而普通检查点之所以能加载，仅仅是因为它恰好携带了这些未使用的张量。此问题已提交为 tpu-inference #3225；修复方法是跳过共享层的 K/V 侧参数实例化，而不是无条件要求它们。

So: serve BF16 and forgo QAT, or write the inference path yourself. I wrote it. The engine ports/gemma4/jax_e_model.py is a pure-JAX Gemma 4 E2B — no PyTorch, no torch_xla, nowhere in the path. That's not an aspiration: the checkpoint goes safetensors → JAX PyTree directly (via safetensors.flax, which handles bfloat16 natively), and tests/test_jax_engine.py asserts torch never even enters sys.modules during a load. If you're used to "JAX" inference that quietly loads weights through AutoModelForCausalLM and converts, this isn't that.
所以：要么服务 BF16 并放弃 QAT，要么自己编写推理路径。我写了。引擎 `ports/gemma4/jax_e_model.py` 是一个纯 JAX 的 Gemma 4 E2B 实现——没有 PyTorch，没有 torch_xla，路径中没有任何相关依赖。这不是愿景：检查点直接从 safetensors 转换为 JAX PyTree（通过原生处理 bfloat16 的 safetensors.flax），并且 `tests/test_jax_engine.py` 断言在加载过程中 torch 甚至从未进入过 `sys.modules`。如果你习惯了那种通过 AutoModelForCausalLM 静默加载权重并进行转换的“JAX”推理，这完全不同。

Sharing is encoded in the layer definition instead of patched at load time:
共享逻辑被编码在层定义中，而不是在加载时进行修补：

```python
@property
def first_kv_shared_layer_idx(self) -> int:
    return self.num_hidden_layers - self.num_kv_shared_layers # 35 - 20 = 15

def kv_share_map(self) -> List[int]:
    """Maps each layer index to the source layer index for KV state sharing."""
    first = self.first_kv_shared_layer_idx
    last_of_type = {}
    for i in range(first):
        last_of_type[self.layer_types[i]] = i
    return [
        i if i < first else last_of_type[self.layer_types[i]]
        for i in range(self.num_hidden_layers)
    ]
```

Sharing is per attention type — E2B interleaves sliding and full attention, and a shared layer inherits from the last non-shared layer of its own kind. Only range(first_kv_shared_layer_idx) ever allocates K/V. W4A16 weights (eight int4 values per int32, BF16 scale per 32-element group) are unpacked on chip, read straight from safetensors into a JAX PyTree. Decoding runs against a static KV cache written with dynamic_update_slice, so each step attends to the full prefix.
共享是按注意力类型进行的——E2B 交替使用滑动窗口注意力和全注意力，共享层继承自其同类中的最后一个非共享层。只有 `range(first_kv_shared_layer_idx)` 会分配 K/V。W4A16 权重（每个 int32 包含八个 int4 值，每 32 个元素一组 BF16 缩放因子）在芯片上解包，直接从 safetensors 读取到 JAX PyTree 中。解码针对使用 `dynamic_update_slice` 写入的静态 KV 缓存运行，因此每一步都关注完整的序列前缀。

The way you know a decoder is correct is to compare it against the slow thing that obviously is — tests/test_kv_cache_parity.py runs greedy generation both ways, cached decode versus re-running the full model over the growing sequence every step:
验证解码器是否正确的方法是将其与显然正确的慢速实现进行比较——`tests/test_kv_cache_parity.py` 以两种方式运行贪婪生成：缓存解码与每一步在增长的序列上重新运行完整模型：

| step | max|dlogit| | ref tok | cached tok | ref top-2 gap |
| :--- | :--- | :--- | :--- | :--- |
| 0 | 0.000000 | [62, 36] | [62, 36] | [0.009738, 0.118984] |
| ... | ... | ... | ... | ... |
| 7 | 0.000001 | [97, 95] | [97, 95] | [0.012065, 0.000438] |

Maximum divergence across every step: 1e-6, float32 roundoff. (The test asserts logit agreement within tolerance and token agreement only where the top-2 gap exceeds it — near a 0.0004 tie, an exact argmax assertion is flaky by construction.) A companion test proves padding a prompt to a 128-aligned bucket is invisible to the output: RoPE follows logi
每一步的最大偏差：1e-6，即 float32 的舍入误差。（测试断言 logit 在容差范围内一致，且仅在 top-2 差距超过容差时断言 token 一致——在 0.0004 左右的平局情况下，精确的 argmax 断言在设计上是不稳定的。）配套测试证明，将提示词填充到 128 对齐的桶中对输出是不可见的：RoPE 遵循 logi