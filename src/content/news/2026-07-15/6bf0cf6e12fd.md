---
title: "A Gentle Introduction to Autoencoders & Latent Space"
originalUrl: "https://towardsdatascience.com/gentle-introduction-to-autoencoders-latent-space/"
date: "2026-07-14T22:26:21.588Z"
---

# A Gentle Introduction to Autoencoders & Latent Space
# 自编码器与潜在空间入门指南

**Machine Learning: A Gentle Introduction to Autoencoders & Latent Space**
**机器学习：自编码器与潜在空间入门指南**

Learning how to transform high-dimensional input into compact representations.
学习如何将高维输入转换为紧凑的表示形式。

Vyacheslav Efimov | Jul 14, 2026 | 6 min read
Vyacheslav Efimov | 2026年7月14日 | 6分钟阅读

### Introduction
### 引言

Heavy computation is a well-known problem in various ML algorithms today, especially when generative AI is applied to text, images, and other unstructured data. One of the principal approaches to mitigate this problem is to compress input data into a lower-dimensional representation while preserving the main context. There are various methods that achieve this goal, including autoencoders, which we will discuss in this article. For simplicity, in this article, we will focus on image-based autoencoders, but remember, they can be applied to other data types as well.
在当今的各类机器学习算法中，繁重的计算是一个众所周知的问题，尤其是在生成式人工智能应用于文本、图像和其他非结构化数据时。缓解这一问题的主要方法之一是将输入数据压缩为低维表示，同时保留其核心语境。实现这一目标的方法有很多，其中包括我们将在本文中讨论的自编码器（Autoencoders）。为简便起见，本文将重点讨论基于图像的自编码器，但请记住，它们同样适用于其他类型的数据。

### Idea
### 核心理念

Autoencoders are a type of neural network used for unsupervised learning. Their architecture consists of three main components:
自编码器是一种用于无监督学习的神经网络。其架构由三个主要部分组成：

*   **Encoder:** The first part of the neural network that takes input data and gradually reduces its dimensionality through its layers, ultimately reaching the bottleneck.
    **编码器（Encoder）：** 神经网络的第一部分，接收输入数据并通过层级结构逐渐降低其维度，最终到达瓶颈层。
*   **Bottleneck:** The network layer with the smallest dimensionality that contains the latent representation of the input data.
    **瓶颈层（Bottleneck）：** 网络中维度最小的层，包含输入数据的潜在表示（Latent Representation）。
*   **Decoder:** The part of the network connected to the bottleneck output that gradually expands the data’s dimensionality. As a result, at its last layer, it returns data of the same size as was initially passed to the encoder.
    **解码器（Decoder）：** 连接到瓶颈层输出的网络部分，负责逐渐扩展数据的维度。最终，在最后一层，它会返回与最初输入到编码器时相同大小的数据。

For images, the encoder and decoder are usually presented as convolutional neural networks. In autoencoders, our ultimate goal during training is to make the network transform the input data into a more compressed representation in the bottleneck without losing too much information. During inference, we can pass the data to the encoder, extract the resulting embedding from the bottleneck, and then use it for our own purposes. Let’s understand how training works in autoencoders.
对于图像而言，编码器和解码器通常表现为卷积神经网络。在自编码器中，我们训练的最终目标是让网络将输入数据转换为瓶颈层中更紧凑的表示，且不丢失过多信息。在推理阶段，我们可以将数据输入编码器，从瓶颈层提取生成的嵌入（Embedding），并将其用于特定目的。接下来，让我们了解自编码器的训练原理。

### Training
### 训练过程

A great thing about autoencoders is that they don’t require any labeled data! Let’s see how they work. As mentioned before, an input image is passed to the network, where it is compressed to a smaller size and then reconstructed to the original dimension. The question we should ask ourselves is what we want the decoder to output. As you could have guessed, the decoder can simply try to reconstruct the original image from the compressed representation in the bottleneck.
自编码器的一大优点是它们不需要任何标注数据！让我们看看它们是如何工作的。如前所述，输入图像被传递到网络中，压缩为较小的尺寸，然后再重构回原始维度。我们需要思考的问题是：我们希望解码器输出什么？正如你所猜到的，解码器只需尝试从瓶颈层的压缩表示中重构原始图像即可。

Why do so? The idea behind this is simple: If the bottleneck’s compressed representation captures the main features of the encoder’s input well, then it should be relatively easy for the decoder to use that information to reconstruct the original image. If the bottleneck fails to capture the main features, the decoder won’t be able to reliably reconstruct the original image. Thus, the model will be penalized for a poor compressed representation. This way, by asking the decoder to reconstruct the original image, we implicitly force the encoder to produce a rich yet compressed latent representation, helping the decoder efficiently achieve its task. The space to which the input data is projected in the bottleneck is called the latent space.
为什么要这样做？其背后的逻辑很简单：如果瓶颈层的压缩表示能很好地捕捉到编码器输入的主要特征，那么解码器利用这些信息重构原始图像应该相对容易。如果瓶颈层未能捕捉到主要特征，解码器将无法可靠地重构原始图像。因此，模型会因压缩表示质量不佳而受到惩罚。通过要求解码器重构原始图像，我们隐式地迫使编码器生成既丰富又紧凑的潜在表示，从而帮助解码器高效地完成任务。输入数据在瓶颈层所投影的空间被称为“潜在空间”（Latent Space）。

### Reconstruction loss
### 重构损失

Given the original image and the reconstructed image from the decoder, what is the simplest way to compare the generated quality? The obvious answer is to compare the two images pixel-wise using the MSE loss, which, in the context of autoencoders, is called the reconstruction loss.
给定原始图像和解码器生成的重构图像，比较生成质量最简单的方法是什么？显而易见的答案是使用均方误差（MSE）损失逐像素比较两张图像，在自编码器的语境下，这被称为“重构损失”。

Reconstruction loss: the MSE is calculated with respect to the input image and the image produced by the decoder. The calculated loss value is then used to perform backpropagation to update the model’s weights.
重构损失：计算输入图像与解码器生成图像之间的MSE。计算出的损失值随后用于执行反向传播，以更新模型的权重。

### Latent space dimension
### 潜在空间维度

The latent space dimension is an important hyperparameter that directly affects the decoder’s performance. On the one hand, the latent space dimension should be sufficient to efficiently encode the key input features. On the other hand, it should not be too large to maintain a high compression rate. One well-known example is Stable Diffusion. It uses an autoencoder to transform the input image, 512 x 512 x 3, containing 786,432 values, into a 64 x 64 x 4 image with 16,384 values, resulting in a compression ratio of 48x.
潜在空间维度是一个重要的超参数，直接影响解码器的性能。一方面，潜在空间维度必须足够大，以有效地编码关键输入特征；另一方面，它不能太大，以保持较高的压缩率。一个著名的例子是 Stable Diffusion。它使用自编码器将 512 x 512 x 3（包含 786,432 个数值）的输入图像转换为 64 x 64 x 4（包含 16,384 个数值）的图像，实现了 48 倍的压缩比。

### Other autoencoder applications
### 自编码器的其他应用

One trick for training autoencoders is to have them learn to remove noise from images. The idea is simple: since autoencoders are good at reconstructing original images, we could add slight noise to the input images and then ask them to reconstruct the original images. A great thing about this method is that for training, it is sufficient to have only the original images, to which you would then apply noise. The idea of denoising autoencoders consists of applying random noise to an input image, passing it to the model, and then asking it to reconstruct the original image.
训练自编码器的一个技巧是让它们学习去除图像中的噪声。思路很简单：既然自编码器擅长重构原始图像，我们可以给输入图像添加轻微噪声，然后要求它们重构出原始图像。这种方法的一大优点是，训练时只需原始图像，然后对其施加噪声即可。去噪自编码器（Denoising Autoencoders）的理念在于：对输入图像施加随机噪声，将其传入模型，然后要求模型重构出原始图像。

Another cool application of autoencoders is image inpainting, which involves passing images with masked patches to a model so it can unmask and fill in the missing image parts. Similarly, autoencoders can be trained to remove specific objects from images. This is particularly useful for removing watermarks. Image inpainting and object removal from images are additional examples of autoencoder applications.
自编码器的另一个酷炫应用是图像修复（Image Inpainting），即将带有遮盖区域的图像传入模型，使其能够去除遮盖并填充缺失的图像部分。同样，自编码器也可以通过训练来移除图像中的特定物体。这对于去除水印特别有用。图像修复和物体移除是自编码器应用的另外两个例子。

### Blueriness problem
### 模糊问题

In reality, despite its simplicity, the MSE loss is not perfect for autoencoders. One common problem with using it is a tendency for the decoder to generate images with blurry pixels. For example, we could imagine an image of size 512 x 512 with two vertical, non-overlapping black-and-white regions. We then take a horizontal row of that image whose pixels look like this: `[… 0 0 255 255 255 …]`
实际上，尽管 MSE 损失很简单，但它对自编码器而言并不完美。使用它时的一个常见问题是解码器倾向于生成像素模糊的图像。例如，想象一张 512 x 512 的图像，其中有两个垂直且不重叠的黑白区域。我们取该图像的一行像素，看起来像这样：`[… 0 0 255 255 255 …]`

The model doesn’t have any knowledge of the image structure; it only tries to minimize the MSE loss. Even if, for that image, a model made a prediction like `[… 0 0 0 255 255 …]`, which is still very good because the region is shifted by only one pixel, the MSE loss in this case would be higher than in the case below, which a model might prefer...
模型并不了解图像结构，它只是试图最小化 MSE 损失。即使模型对该图像做出了类似 `[… 0 0 0 255 255 …]` 的预测（这其实已经很不错了，因为区域仅偏移了一个像素），在这种情况下，MSE 损失仍会高于下面这种情况，而模型可能会更倾向于后者……