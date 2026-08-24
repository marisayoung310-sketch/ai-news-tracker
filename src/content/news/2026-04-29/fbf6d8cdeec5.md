---
title: "Training and Finetuning Multimodal Embedding & Reranker Models with Sentence Transformers"
originalUrl: "https://huggingface.co/blog/train-multimodal-sentence-transformers"
date: "2026-04-29T06:23:24.088Z"
---

# Training and Finetuning Multimodal Embedding & Reranker Models with Sentence Transformers
# 使用 Sentence Transformers 训练和微调多模态 Embedding 与 Reranker 模型

Sentence Transformers is a Python library for using and training embedding and reranker models for applications like retrieval augmented generation, semantic search, and more. In my previous blogpost, I introduced the new multimodal capabilities, showing how to use embedding and reranker models that handle text, images, audio, and video.
Sentence Transformers 是一个用于使用和训练 Embedding（嵌入）及 Reranker（重排序）模型的 Python 库，适用于检索增强生成（RAG）、语义搜索等应用。在我之前的博文中，我介绍了其全新的多模态功能，展示了如何使用能够处理文本、图像、音频和视频的 Embedding 和 Reranker 模型。

In this blogpost, I'll show you how to train or finetune these multimodal models on your own data. As a practical example, I'll walk through finetuning Qwen/Qwen3-VL-Embedding-2B for Visual Document Retrieval (VDR), the task of retrieving relevant document pages (as images, with charts, tables, and layout intact) for a given text query.
在本篇博文中，我将向你展示如何使用自己的数据来训练或微调这些多模态模型。作为一个实践案例，我将演示如何微调 `Qwen/Qwen3-VL-Embedding-2B` 模型以用于视觉文档检索（VDR），即针对给定的文本查询检索相关的文档页面（以图像形式，保留图表、表格和布局）。

The resulting `tomaarsen/Qwen3-VL-Embedding-2B-vdr` demonstrates how much performance you can gain by finetuning on your own domain. On my evaluation data, the finetuned model achieves an NDCG@10 of 0.947 compared to the base model's 0.888, and outperforms all existing VDR models I tested against, including models up to 4x its size.
最终得到的 `tomaarsen/Qwen3-VL-Embedding-2B-vdr` 模型展示了通过在特定领域进行微调所能获得的性能提升。在我的评估数据上，微调后的模型 NDCG@10 指标达到了 0.947，而基础模型仅为 0.888；它超越了我测试过的所有现有 VDR 模型，包括那些体积比它大 4 倍的模型。

### Why Finetune?
### 为什么要微调？

General-purpose multimodal embedding models like `Qwen/Qwen3-VL-Embedding-2B` are trained on diverse data to perform well across a wide range of languages and tasks: image-text matching, visual question answering, document understanding, and more. But this generality means the model is rarely the best choice for any specific task.
像 `Qwen/Qwen3-VL-Embedding-2B` 这样的通用多模态 Embedding 模型是在多样化的数据上训练的，旨在跨多种语言和任务表现良好，例如图像-文本匹配、视觉问答、文档理解等。但这种通用性意味着该模型在任何特定任务上往往都不是最优选择。

Consider Visual Document Retrieval: given a text query like "What was the company's Q3 revenue?", the model must find the most relevant document screenshot from a corpus of thousands. This requires understanding document layouts, charts, tables, and text, which is a very different skill from e.g. matching pictures of shoes with product descriptions. By finetuning on domain-specific data, the model can learn these specialized patterns.
以视觉文档检索为例：给定一个文本查询，如“公司第三季度的收入是多少？”，模型必须从数千个文档中找到最相关的截图。这需要理解文档布局、图表、表格和文本，这与将鞋子图片与产品描述进行匹配等任务所需的技能截然不同。通过在特定领域的数据上进行微调，模型可以学习到这些专业模式。

### Training Components
### 训练组件

Training multimodal Sentence Transformer models involves the same components as training text-only models:
训练多模态 Sentence Transformer 模型所涉及的组件与训练纯文本模型相同：

*   **Model**: The multimodal model to train or finetune.
*   **Dataset**: The data used for training and evaluation.
*   **Loss Function**: A function that quantifies the model's performance and guides the optimization process.
*   **Training Arguments (optional)**: Parameters that influence training performance and tracking/debugging.
*   **Evaluator (optional)**: A tool for evaluating the model before, during, or after training.
*   **Trainer**: Brings together the model, dataset, loss function, and other components for training.
*   **模型**：用于训练或微调的多模态模型。
*   **数据集**：用于训练和评估的数据。
*   **损失函数**：量化模型性能并指导优化过程的函数。
*   **训练参数（可选）**：影响训练性能以及跟踪/调试的参数。
*   **评估器（可选）**：用于在训练前、训练中或训练后评估模型的工具。
*   **训练器（Trainer）**：将模型、数据集、损失函数和其他组件整合在一起进行训练。

The multimodal training pipeline uses the same `SentenceTransformerTrainer` as text-only training. The key difference is that your datasets contain images (or other modalities) alongside text, and the model's processor handles the image preprocessing automatically.
多模态训练流水线使用与纯文本训练相同的 `SentenceTransformerTrainer`。关键区别在于，你的数据集除了文本外还包含图像（或其他模态），并且模型的处理器会自动处理图像预处理。

### Model
### 模型

The most common approach is to finetune an existing multimodal embedding model, or to start from a Vision-Language Model (VLM) checkpoint. The Transformer module automatically detects supported modalities from the model's processor.
最常见的方法是微调现有的多模态 Embedding 模型，或者从视觉语言模型（VLM）检查点开始。Transformer 模块会自动从模型的处理器中检测支持的模态。

To finetune an existing multimodal embedding model (e.g. one that already has a `modules.json` file), you can pass `processor_kwargs` and `model_kwargs` to control preprocessing and model loading respectively.
要微调现有的多模态 Embedding 模型（例如已经拥有 `modules.json` 文件的模型），你可以传递 `processor_kwargs` 和 `model_kwargs` 来分别控制预处理和模型加载。

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer(
    "Qwen/Qwen3-VL-Embedding-2B",
    model_kwargs={"attn_implementation": "flash_attention_2", "torch_dtype": "bfloat16"},
    processor_kwargs={"min_pixels": 28 * 28, "max_pixels": 600 * 600},
)
```

You can also start from a fresh VLM checkpoint that hasn't been trained for embeddings yet. Sentence Transformers will attempt to recognize the architecture, infer the supported modalities from the processor, and set up the appropriate forward method and pooling.
你也可以从尚未针对 Embedding 进行训练的全新 VLM 检查点开始。Sentence Transformers 将尝试识别架构，从处理器推断支持的模态，并设置适当的前向传播方法和池化（Pooling）。

In both cases, the Transformer module inspects the processor to determine which modalities are available, and Pooling is added automatically if needed. You can verify the supported modalities:
在这两种情况下，Transformer 模块都会检查处理器以确定哪些模态可用，并在需要时自动添加池化层。你可以验证支持的模态：

```python
print(model.modalities) # ['text', 'image', 'video', 'message']
print(model.supports("image")) # True
```

### Alternative: Building multimodal models with Router
### 替代方案：使用 Router 构建多模态模型

Instead of using a single VLM backbone, you can compose separate encoders for different modalities using the Router module. This lets you combine any existing encoders and route inputs to the appropriate one based on detected modality:
除了使用单一的 VLM 主干网络外，你还可以使用 Router 模块为不同模态组合独立的编码器。这使你可以结合任何现有的编码器，并根据检测到的模态将输入路由到相应的编码器：

```python
from sentence_transformers import ...
```