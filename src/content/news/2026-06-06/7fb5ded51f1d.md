---
title: "Gemma 4 QAT models: Optimizing compression for mobile and laptop efficiency"
originalUrl: "https://blog.google/innovation-and-ai/technology/developers-tools/quantization-aware-training-gemma-4/"
date: "2026-06-05T22:40:10.274Z"
---

# Gemma 4 QAT models: Optimizing compression for mobile and laptop efficiency
# Gemma 4 QAT 模型：优化移动端与笔记本电脑的压缩效率

Gemma 4 QAT models: Optimizing model compression for mobile and laptop efficiency. Our new versions of the Gemma 4 family are optimized with Quantization-Aware Training (QAT) to dramatically reduce memory requirements and maximize on-device performance.
Gemma 4 QAT 模型：优化移动端与笔记本电脑的压缩效率。我们新推出的 Gemma 4 系列版本通过量化感知训练（QAT）进行了优化，旨在大幅降低内存需求并最大化端侧性能。

Since releasing Gemma 4 two months ago, we've been continuously working to expand its capabilities. First, we introduced Multi-Token Prediction (MTP) to accelerate inference, and just a couple of days ago, we released a 12B model to bridge the gap between our E4B and 26B MOE models. Today, we are releasing new checkpoints optimized with Quantization-Aware Training (QAT) to make Gemma 4 even more efficient, so you can run models locally on everyday edge devices and consumer GPUs.
自两个月前发布 Gemma 4 以来，我们一直在不断扩展其功能。首先，我们引入了多令牌预测（MTP）以加速推理；就在几天前，我们发布了 12B 模型，以填补 E4B 和 26B MOE 模型之间的空白。今天，我们发布了经过量化感知训练（QAT）优化的新检查点，使 Gemma 4 更加高效，让您能够在日常边缘设备和消费级 GPU 上本地运行模型。

By simulating quantization during training, QAT minimizes quality loss when the model is compressed. This release includes QAT checkpoints for the popular Q4_0 quantization format as well as a novel quantization format specialized for mobile use cases. Using this mobile format, we’ve reduced the memory footprint of Gemma 4 E2B to 1GB. Together, these dramatically reduce memory requirements while preserving the capabilities and quality you expect from Gemma 4.
通过在训练过程中模拟量化，QAT 将模型压缩时的质量损失降至最低。本次发布包含了针对主流 Q4_0 量化格式的 QAT 检查点，以及一种专为移动端使用场景设计的全新量化格式。使用这种移动端格式，我们将 Gemma 4 E2B 的内存占用降低到了 1GB。这些改进在大幅降低内存需求的同时，保留了您所期待的 Gemma 4 的功能与质量。

Keeping model quality while making them smaller: Quantization is a key technology to run models on consumer hardware by reducing their memory footprint while also accelerating decode speed. However, standard Post-Training Quantization (PTQ) often leads to performance degradation. Instead of simply quantizing the model after training, QAT integrates the quantization process directly into training. While PTQ is already effective at preserving quality, our QAT results yield even higher overall quality compared to standard PTQ baselines.
在缩小模型体积的同时保持质量：量化是一项关键技术，它通过减少内存占用并加速解码速度，使模型能够在消费级硬件上运行。然而，标准的训练后量化（PTQ）往往会导致性能下降。QAT 没有在训练后简单地对模型进行量化，而是将量化过程直接整合到训练中。虽然 PTQ 在保持质量方面已经很有效，但与标准的 PTQ 基准相比，我们的 QAT 结果能带来更高的整体质量。

We applied this QAT recipe to the popular Q4_0 format to maximize performance for all the models. For the edge models (E2B and E4B), we rethought how we approach quantization with a special mobile-specialized quantization schema.
我们将这一 QAT 配方应用于主流的 Q4_0 格式，以最大化所有模型的性能。对于边缘模型（E2B 和 E4B），我们通过一种特殊的移动端专用量化方案，重新思考了量化的实现方式。

Optimizing for mobile devices under the hood: Standard compression formats are often hard for mobile processors to run efficiently. To ensure Gemma 4 performs smoothly on mobile, we engineered a custom mobile-quantization schema designed for edge hardware:
针对移动设备的底层优化：标准的压缩格式往往难以在移动处理器上高效运行。为了确保 Gemma 4 在移动端流畅运行，我们为边缘硬件设计了一套定制的移动端量化方案：

*   **Static activations:** Normally, models waste processing power calculating how to scale data on the fly. We pre-calculate these settings during training, which reduces workload on mobile chips and makes responses faster.
*   **静态激活：** 通常情况下，模型会浪费处理能力来实时计算如何缩放数据。我们在训练期间预先计算了这些设置，从而减轻了移动芯片的工作负载，并加快了响应速度。

*   **Channel-wise quantization:** We structured the compressed data to fit the design of mobile accelerators. This allows the phone to run calculations natively without needing slow workarounds.
*   **通道级量化：** 我们对压缩数据进行了结构化处理，以适配移动加速器的设计。这使得手机能够原生运行计算，而无需依赖缓慢的变通方法。

*   **Targeted 2-bit quantization:** We heavily compressed (to 2-bit) the specific parts of the model that generate tokens, while keeping the core reasoning layers at higher precision. This saves storage without making the model less smart.
*   **针对性 2-bit 量化：** 我们对模型中生成令牌的特定部分进行了深度压缩（至 2-bit），同时保持核心推理层处于较高精度。这在节省存储空间的同时，不会降低模型的智能水平。

*   **Embedding and KV cache optimization:** We focused compression on the model’s vocabulary list and its short-term memory. This drastically reduces the active memory footprint, letting you have long chats without running out of space.
*   **嵌入与 KV 缓存优化：** 我们将压缩重点放在模型的词汇表及其短期记忆上。这大幅减少了活跃内存占用，让您在进行长对话时不会耗尽空间。

Because our audio and vision encoders are not needed in many use cases, you can optimize your memory footprint even further by deploying only the modalities you need. For example, the Gemma 4 E2B text-only model (without Per-Layer Embeddings) requires less than 1 GB of memory.
由于我们的音频和视觉编码器在许多使用场景中并不需要，您可以通过仅部署所需的模态来进一步优化内存占用。例如，Gemma 4 E2B 纯文本模型（不含逐层嵌入）所需的内存不到 1GB。

Get started today: To make those models easily usable with your preferred workflow, we’ve partnered with popular developer tools across the ecosystem to seamlessly support the Gemma 4 QAT checkpoints starting today.
立即开始使用：为了让这些模型能够轻松适配您偏好的工作流，我们已与生态系统中的主流开发者工具合作，从今天起无缝支持 Gemma 4 QAT 检查点。

*   **Download the weights:** Access the Q4_0 and mobile model weights right now on Hugging Face. We've tailored the formats to fit your workflow: GGUF formats are ready for use with llama.cpp, and compressed tensors are provided for vLLM. For everything else, we share unquantized checkpoints that can be converted and quantized into formats supporting Q4_0.
*   **下载权重：** 立即在 Hugging Face 上获取 Q4_0 和移动端模型权重。我们已根据您的工作流定制了格式：GGUF 格式可直接用于 llama.cpp，并为 vLLM 提供了压缩张量。对于其他需求，我们分享了未量化的检查点，可以转换并量化为支持 Q4_0 的格式。

*   **Integrate & learn:** Explore our documentation to learn how to best deploy the QAT checkpoints.
*   **集成与学习：** 浏览我们的文档，了解如何最佳地部署 QAT 检查点。

*   **Try on your desktop:** Easily download, manage, and run Gemma 4 QAT models locally on your desktop using user-friendly interfaces like llama.cpp, Ollama and LM Studio.
*   **在桌面端尝试：** 使用 llama.cpp、Ollama 和 LM Studio 等用户友好的界面，轻松在桌面端本地下载、管理和运行 Gemma 4 QAT 模型。

*   **Deploy on-device:** Use Google's lightweight LiteRT-LM runtime for optimized edge deployment or run the models directly on the web with Transformers.js.
*   **端侧部署：** 使用 Google 轻量级的 LiteRT-LM 运行时进行优化的边缘部署，或通过 Transformers.js 直接在 Web 上运行模型。

*   **Use your favorite development tools:** Serve larger models efficiently with SGLang and vLLM, optimize for Apple Silicon with MLX. Use the MTP QAT checkpoints to preserve the speedup of MTP while quantizing the models. Fine-tune weights directly using Hugging Face Transformers and Unsloth.
*   **使用您喜爱的开发工具：** 使用 SGLang 和 vLLM 高效服务大型模型，利用 MLX 为 Apple Silicon 进行优化。使用 MTP QAT 检查点，在量化模型的同时保留 MTP 的加速效果。使用 Hugging Face Transformers 和 Unsloth 直接微调权重。

We can't wait to see what you build with Gemma 4 running locally!
我们迫不及待地想看到您利用本地运行的 Gemma 4 构建出什么样的作品！