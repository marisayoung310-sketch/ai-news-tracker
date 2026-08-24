---
title: "Accelerating Gemma 4: faster inference with multi-token prediction drafters"
originalUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/multi-token-prediction-gemma-4/"
date: "2026-05-05T22:16:46.478Z"
---

# Accelerating Gemma 4: faster inference with multi-token prediction drafters
# 加速 Gemma 4：利用多标记预测草稿模型实现更快的推理

By using Multi-Token Prediction (MTP) drafters, Gemma 4 models reduce latency bottlenecks and achieve improved responsiveness for developers.
通过使用多标记预测（Multi-Token Prediction, MTP）草稿模型，Gemma 4 模型减少了延迟瓶颈，并为开发者带来了更出色的响应速度。

Just a few weeks ago, we introduced Gemma 4, our most capable open models to date. With over 60 million downloads in just the first few weeks, Gemma 4 is delivering unprecedented intelligence-per-parameter to developer workstations, mobile devices and the cloud. Today, we are pushing efficiency even further.
就在几周前，我们推出了迄今为止能力最强的开源模型 Gemma 4。在发布后的短短几周内，下载量已超过 6000 万次，Gemma 4 正在为开发者工作站、移动设备和云端提供前所未有的单位参数智能水平。今天，我们进一步提升了其效率。

We’re releasing Multi-Token Prediction (MTP) drafters for the Gemma 4 family. By using a specialized speculative decoding architecture, these drafters deliver up to a 3x speedup without any degradation in output quality or reasoning logic. Tokens-per-second speed increases, tested on hardware using LiteRT-LM, MLX, Hugging Face Transformers, and vLLM.
我们现已为 Gemma 4 系列发布了多标记预测（MTP）草稿模型。通过采用专门的投机采样（speculative decoding）架构，这些草稿模型在不降低输出质量或推理逻辑的前提下，实现了高达 3 倍的速度提升。在 LiteRT-LM、MLX、Hugging Face Transformers 和 vLLM 等硬件测试中，每秒生成的标记数（Tokens-per-second）均有显著增加。

Why speculative decoding? The technical reality is that standard LLM inference is memory-bandwidth bound, creating a significant latency bottleneck. The processor spends the majority of its time moving billions of parameters from VRAM to the compute units just to generate a single token. This leads to under-utilized compute and high latency, especially on consumer-grade hardware.
为什么要使用投机采样？从技术层面来看，标准的大语言模型（LLM）推理受限于内存带宽，这造成了严重的延迟瓶颈。处理器大部分时间都在将数十亿个参数从显存（VRAM）移动到计算单元，仅仅是为了生成一个标记。这导致了计算资源的利用率不足和高延迟，尤其是在消费级硬件上表现更为明显。

Speculative decoding decouples token generation from verification. By pairing a heavy target model (e.g., Gemma 4 31B) with a lightweight drafter (the MTP model), we can utilize idle compute to “predict” several future tokens at once with the drafter in less time than it takes for the target model to process just one token. The target model then verifies all of these suggested tokens in parallel.
投机采样将标记生成与验证过程解耦。通过将大型目标模型（例如 Gemma 4 31B）与轻量级草稿模型（MTP 模型）配对，我们可以利用空闲的计算资源，让草稿模型在比目标模型处理单个标记更短的时间内，“预测”出多个后续标记。随后，目标模型会并行验证所有这些建议的标记。

How speculative decoding works: Standard large language models generate text autoregressively, producing exactly one token at a time. While effective, this process dedicates the same amount of computation to predicting an obvious continuation (like predicting “words” after “Actions speak louder than…”) as it does to solving a complex logic puzzle.
投机采样的工作原理：标准的大语言模型以自回归方式生成文本，每次仅产生一个标记。虽然这种方法有效，但它在预测显而易见的续写内容（例如在“Actions speak louder than…”之后预测“words”）时，所消耗的计算量与解决复杂逻辑难题时完全相同。

MTP mitigates this inefficiency through speculative decoding, a technique introduced by Google researchers in *Fast Inference from Transformers via Speculative Decoding*. If the target model agrees with the draft, it accepts the entire sequence in a single forward pass — and even generates an additional token of its own in the process. This means your application can output the full drafted sequence plus one token in the time it usually takes to generate a single one.
MTP 通过投机采样缓解了这种低效问题，该技术由谷歌研究人员在《通过投机采样实现 Transformer 的快速推理》一文中提出。如果目标模型认可草稿内容，它会在单次前向传播中接受整个序列，甚至在此过程中额外生成一个标记。这意味着你的应用程序可以在通常生成一个标记的时间内，输出完整的草稿序列外加一个标记。

Unlocking faster AI from the edge to the workstation: For developers, inference speed is often the primary bottleneck for production deployment. Whether you are building coding assistants, autonomous agents that require rapid multi-step planning, or responsive mobile applications running entirely on-device, every millisecond matters.
从边缘设备到工作站，解锁更快的 AI：对于开发者而言，推理速度往往是生产部署的主要瓶颈。无论你是在构建编程助手、需要快速多步规划的自主智能体，还是完全在设备端运行的响应式移动应用，每一毫秒都至关重要。

By pairing a Gemma 4 model with its corresponding drafter, developers can achieve:
通过将 Gemma 4 模型与其对应的草稿模型配对，开发者可以实现：

*   **Improved responsiveness:** Drastically reduce latency for near real-time chat, immersive voice applications and agentic workflows.
    **提升响应速度：** 大幅降低近实时聊天、沉浸式语音应用和智能体工作流的延迟。
*   **Supercharged local development:** Run our 26B MoE and 31B Dense models on personal computers and consumer GPUs with unprecedented speed, powering seamless, complex offline coding and agentic workflows.
    **强化本地开发：** 在个人电脑和消费级 GPU 上以空前的速度运行我们的 26B MoE 和 31B Dense 模型，支持流畅、复杂的离线编程和智能体工作流。
*   **Enhanced on-device performance:** Maximize the utility of our E2B and E4B models on edge devices by generating outputs faster, which in turn preserves valuable battery life.
    **增强设备端性能：** 通过更快的输出生成速度，最大化我们的 E2B 和 E4B 模型在边缘设备上的效用，从而节省宝贵的电池寿命。
*   **Zero quality degradation:** Because the primary Gemma 4 model retains the final verification, you get identical frontier-class reasoning and accuracy, just delivered significantly faster.
    **零质量损失：** 由于主要的 Gemma 4 模型保留了最终验证权，你将获得完全相同的前沿级推理能力和准确性，只是交付速度显著加快。

Where you can dive deeper into MTP drafters: To make these MTP drafters exceptionally fast and accurate, we introduced several architectural enhancements under the hood. The draft models seamlessly utilize the target model's activations and share its KV cache, meaning they don't have to waste time recalculating context the larger model has already figured out. For our E2B and E4B edge models, where the final logit calculation becomes a big bottleneck, we even implemented an efficient clustering technique in the embedder to further accelerate generation.
深入了解 MTP 草稿模型：为了使这些 MTP 草稿模型具备极高的速度和准确性，我们在底层引入了多项架构增强。草稿模型可以无缝利用目标模型的激活值并共享其 KV 缓存，这意味着它们无需浪费时间重新计算大型模型已经处理过的上下文。对于我们的 E2B 和 E4B 边缘模型，由于最终的 Logit 计算成为了主要瓶颈，我们甚至在嵌入器（embedder）中实现了一种高效的聚类技术，以进一步加速生成。

We've also been closely analyzing hardware-specific optimizations. For example, while the 26B mixture-of-experts model presents unique routing challenges at a batch size of 1 on Apple Silicon, processing multiple requests simultaneously (e.g., batch sizes of 4 to 8) unlocks up to a ~2.2x speedup locally. We see similar gains with Nvidia A100 when increasing batch size.
我们还密切分析了针对特定硬件的优化。例如，虽然 26B 混合专家模型（MoE）在 Apple Silicon 上以批处理大小（batch size）为 1 时存在独特的路由挑战，但同时处理多个请求（例如批处理大小为 4 到 8）可以在本地实现高达约 2.2 倍的速度提升。在使用 Nvidia A100 时，增加批处理大小也能看到类似的增益。

Want to see the exact mechanics of how this works? We’ve published an in-depth technical explainer that unpacks the visual architecture, KV cache sharing and efficient embedders powering these drafters.
想了解其具体工作机制吗？我们发布了一份深入的技术说明，详细解析了驱动这些草稿模型的视觉架构、KV 缓存共享以及高效嵌入器。

How to get started: The MTP drafters for the Gemma 4 family are available today under the same open-source Apache 2.0 license as Gemma 4. Read the documentation to learn how to use MTP with Gemma 4. You can download the model weights right now on Hugging Face, Kaggle, and start experimenting with faster inference with transformers, MLX, VLLM, SGLang, and Ollama or try them directly on Google AI Edge Gallery for Android or iOS.
如何开始：Gemma 4 系列的 MTP 草稿模型现已发布，采用与 Gemma 4 相同的开源 Apache 2.0 许可证。请阅读文档以了解如何将 MTP 与 Gemma 4 结合使用。你现在就可以在 Hugging Face 和 Kaggle 上下载模型权重，并开始使用 transformers、MLX、VLLM、SGLang 和 Ollama 体验更快的推理，或者直接在 Android 或 iOS 的 Google AI Edge Gallery 中进行尝试。

We can't wait to see how this newfound speed accelerates what you build next in the Gemmaverse.
我们迫不及待地想看到这种新获得的速度如何加速你在 Gemma 生态中构建的下一个项目。