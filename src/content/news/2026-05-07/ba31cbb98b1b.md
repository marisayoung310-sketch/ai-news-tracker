---
title: "Google's Gemma 4 AI models get 3x speed boost by predicting future tokens"
originalUrl: "https://arstechnica.com/ai/2026/05/googles-gemma-4-open-ai-models-use-speculative-decoding-to-get-up-to-3x-faster/"
date: "2026-05-06T22:27:12.902Z"
---

# Google's Gemma 4 AI models get 3x speed boost by predicting future tokens
# 谷歌 Gemma 4 AI 模型通过预测未来 Token 实现 3 倍速度提升

Google launched its Gemma 4 open models this spring, promising a new level of power and performance for local AI. Google’s take on edge AI could be getting even faster already with the release of Multi-Token Prediction (MTP) drafters for Gemma.
谷歌于今年春季发布了 Gemma 4 开源模型，承诺为本地 AI 带来更高水平的算力和性能。随着 Gemma 多 Token 预测（MTP）草稿模型的发布，谷歌在边缘 AI 领域的布局有望进一步提速。

Google says these experimental models leverage a form of speculative decoding to take a guess at future tokens, which can speed up generation compared to the way models generate tokens on their own. The latest Gemma models are built on the same underlying technology that powers Google’s frontier Gemini AI, but they’re tuned to run locally.
谷歌表示，这些实验性模型利用了一种推测解码技术来预测未来的 Token，与模型独立生成 Token 的方式相比，这可以加快生成速度。最新的 Gemma 模型基于驱动谷歌前沿 Gemini AI 的底层技术构建，但经过了本地化运行的优化。

Gemini is optimized to run on Google’s custom TPU chips, which operate in enormous clusters with super-fast interconnects and memory. A single high-power AI accelerator can run the largest Gemma 4 model at full precision, and quantizing will let it run on a consumer GPU. Gemma allows users to tinker with AI on their hardware rather than sharing all their data with a cloud AI system from Google or someone else.
Gemini 经过优化，可在谷歌定制的 TPU 芯片上运行，这些芯片在拥有超高速互连和内存的庞大集群中工作。单个高性能 AI 加速器可以全精度运行最大的 Gemma 4 模型，而通过量化技术，它也能在消费级 GPU 上运行。Gemma 允许用户在自己的硬件上调试 AI，而不必将所有数据共享给谷歌或其他公司的云端 AI 系统。

Google also changed the license for Gemma 4 to Apache 2.0, which is much more permissive than the custom Gemma license Google employed for previous releases. However, there are inherent limitations in the hardware most people have to run local AI models. That’s where MTP comes in.
谷歌还将 Gemma 4 的许可协议更改为 Apache 2.0，这比谷歌之前版本使用的定制化 Gemma 许可协议要宽松得多。然而，大多数人用于运行本地 AI 模型的硬件存在固有的局限性，而这正是 MTP 发挥作用的地方。

LLMs like Gemma (or Gemini) generate tokens autoregressively—that is, they produce one token at a time based on the previous token. Each one takes just as much computing work as the last one, regardless of whether the token is just a filler word in an output or a key piece of information in a complex logical problem. The problem with rolling your own AI is that your system memory probably isn’t very fast compared to the high bandwidth memory (HBM) used in enterprise hardware. As a result, the processor spends a lot of time moving parameters from VRAM to compute units for each token, and compute cycles are going unused during this process.
像 Gemma（或 Gemini）这样的 LLM 是以自回归方式生成 Token 的，即它们根据前一个 Token 逐个生成下一个 Token。无论该 Token 只是输出中的填充词，还是复杂逻辑问题中的关键信息，每一个 Token 的生成都需要相同的计算量。自行运行 AI 的问题在于，与企业级硬件中使用的高带宽内存（HBM）相比，你的系统内存可能不够快。因此，处理器在生成每个 Token 时，需要花费大量时间将参数从显存（VRAM）移动到计算单元，而在此过程中，计算周期被浪费了。

MTP uses that time to bypass the heavy model and generate speculative tokens with the lightweight drafter. While the draft models are smaller (just 74 million parameters in Gemma 4 E2B), they’re also optimized in several ways to speed up speculative token generation. For example, the drafter shares the key value cache (essentially the LLM’s active memory) so it doesn’t need to recalculate context the main model has already worked out. The E2B and E4B drafters also use a sparse decoding technique to narrow down clusters of likely tokens.
MTP 利用这段时间绕过庞大的主模型，通过轻量级的草稿模型生成推测性 Token。虽然这些草稿模型体积更小（Gemma 4 E2B 仅有 7400 万参数），但它们在多个方面进行了优化，以加速推测性 Token 的生成。例如，草稿模型共享键值缓存（本质上是 LLM 的活动内存），因此无需重新计算主模型已经处理过的上下文。E2B 和 E4B 草稿模型还使用稀疏解码技术来缩小可能出现的 Token 范围。

The draft tokens are not necessarily good predictions, of course. They are verified by the target model (Gemma in this case) in parallel. If the model agrees, the entire sequence is accepted in one forward pass. Along with this process, the larger model also generates an additional token normally. So the system can produce tokens from the draft sequence and a newly generated token in parallel in the time it used to take to generate a single new token.
当然，这些草稿 Token 不一定都是准确的预测。它们会由目标模型（本例中为 Gemma）并行验证。如果模型认可，整个序列将在一次前向传递中被接受。在此过程中，较大的模型也会正常生成一个额外的 Token。因此，系统可以在过去生成单个新 Token 的时间内，并行产生草稿序列中的 Token 和一个新生成的 Token。

Faster local inference right now: Google has released new versions of Gemma 4 models with MTP that you can try today. Google says the MTP drafter can make Gemma models up to three times faster, but the actual gain varies based on the hardware you use. In Google’s testing, the smaller E2B and E4B Gemma models on Pixel phones can run 2.8x and 3.1 times faster, respectively. The much larger Gemma 4 31B on Apple’s M4 silicon gets a 2.5x speed boost with MTP.
更快的本地推理现已实现：谷歌发布了带有 MTP 的新版 Gemma 4 模型，你今天就可以尝试。谷歌表示，MTP 草稿模型可以将 Gemma 模型的速度提升至原来的三倍，但实际增益取决于你使用的硬件。在谷歌的测试中，Pixel 手机上较小的 E2B 和 E4B Gemma 模型运行速度分别提升了 2.8 倍和 3.1 倍。而在苹果 M4 芯片上，更大的 Gemma 4 31B 模型通过 MTP 获得了 2.5 倍的速度提升。

The company suggests users will find it easier to run the 26B MoE and 31B Dense models on consumer hardware, and mobile devices will enjoy improved battery life when running E2B and E4B models. Because the core Gemma model verifies all the draft tokens, MTP should also result in “zero quality degradation.” That’s not to say every output will be perfect, but the errors common in generative AI systems shouldn’t get any worse with MTP.
该公司表示，用户将发现 26B MoE 和 31B Dense 模型在消费级硬件上运行变得更加容易，而移动设备在运行 E2B 和 E4B 模型时也将获得更好的电池续航表现。由于核心 Gemma 模型会验证所有草稿 Token，因此 MTP 应该能实现“零质量下降”。这并不是说每一次输出都是完美的，但生成式 AI 系统中常见的错误不会因为 MTP 而变得更糟。

You can try speculative decoding in Gemma without too much additional work. The drafters are available under the same Apache 2.0 license as the core Gemma models. The faster transformers are available via MLX, VLLM, SGLang, and Ollama frameworks.
你无需进行太多额外工作即可在 Gemma 中尝试推测解码。这些草稿模型与核心 Gemma 模型一样，均采用 Apache 2.0 许可协议。这些更快的 Transformer 模型现已通过 MLX、VLLM、SGLang 和 Ollama 框架提供支持。