---
title: "libwce: the entropy layer of a wavelet codec, on its own"
originalUrl: "https://yogthos.net/posts/2026-05-24-libwce.html"
date: "2026-05-24T22:23:01.831Z"
---

# libwce: the entropy layer of a wavelet codec, on its own

May 24, 2026

Most image codecs you know about such as JPEG, JPEG 2000, JPEG XS, WebP are like layer cakes. You have transform sitting on top, entropy coding at the bottom, and rate control floats somewhere in the middle. And then there's a metadata layer wrapping it all up. The interesting bits are hidden under tons of framing code, profile parsers, and standards plumbing. If you just want to see how wavelet coefficients become bits, you have to dig deep into the guts of the codec.

2026年5月24日

你所熟知的绝大多数图像编解码器，如 JPEG、JPEG 2000、JPEG XS 和 WebP，都像层层堆叠的蛋糕。最上层是变换（Transform），最底层是熵编码（Entropy coding），而码率控制则悬浮在中间。此外，还有一层元数据包裹着这一切。那些真正有趣的部分被隐藏在海量的框架代码、配置解析器和标准化的繁琐逻辑之下。如果你只想了解小波系数是如何转化为比特流的，就必须深入到编解码器的核心内部去挖掘。

I wrote libwce as a bare-bones implementation, consisting of only a single lib.rs file, weighing in at 500 lines. It just implements a patent-clean Bit-Plane Count (BPC)-style entropy layer in the spirit of JPEG XS, and nothing else. There is no boilerplate or dependencies with the library relying solely on stdlib.

我编写了 libwce 作为一种极简实现，它仅包含一个 `lib.rs` 文件，代码量仅 500 行。它仅仅实现了一个符合 JPEG XS 精神且无专利问题的位平面计数（BPC）风格熵层，除此之外别无他物。该库没有任何样板代码或外部依赖，仅依赖于标准库（stdlib）。

### A two-minute primer on BPC coding

### BPC 编码两分钟入门

A raw video stream is basically a grid of pixels, most of which share very similar color and brightness values with their immediate neighbors. Storing every pixel individually wastes a ton of bandwidth since there is a lot of repeated data in the stream. Codecs are used to compress this information by transforming the image from the spatial domain into the frequency domain. Rather than tracking individual pixels, a codec uses mathematical frequencies to describe color changes across the image. Older formats like standard JPEG end up chopping the image into squares and applying a discrete cosine transform, leading to the blocky artifacts we all know and love.

原始视频流本质上是一个像素网格，其中大多数像素与其相邻像素的颜色和亮度值非常相似。单独存储每个像素会浪费大量带宽，因为流中存在大量重复数据。编解码器通过将图像从空间域变换到频率域来压缩这些信息。编解码器不再追踪单个像素，而是使用数学频率来描述图像中的颜色变化。像标准 JPEG 这样的旧格式会将图像切成方块并应用离散余弦变换，从而导致我们都“熟悉且喜爱”的块状伪影。

A wavelet is a newer approach that solves the problem by applying the transform process to the whole image at once, splitting the signal into low-frequency structural data and high-frequency detail data across multiple scales. After the wavelet transform, you end up with a 2D array of signed integer coefficients, most of which are near zero, with a long Laplacian tail. The purpose of the entropy layer is to compress this array down to a small number of significant bits.

小波变换是一种更新的方法，它通过一次性对整张图像进行变换处理来解决上述问题，将信号分解为跨多个尺度的低频结构数据和高频细节数据。经过小波变换后，你会得到一个由有符号整数系数组成的二维数组，其中大多数系数接近于零，并呈现出长拉普拉斯分布尾部。熵层的目的就是将这个数组压缩成少量的有效比特。

BPC coding is done using groups of four coefficients at a time. For each group, you have to determine the smallest bpc such that every coefficient can be held. This is the bit-plane count representing the index above which all coefficient bits in the group are zero. In libwce, all the bpc values are written first into a single bitstream, then for each group the four coefficients are emitted coeff-major. These are the magnitude bits of each coefficient followed immediately by a single sign bit when that coefficient is nonzero. That takes care of all the data processing you need to do. Then, you get to the actual compression when you go to encode these bpc values. Neighboring groups tend to have similar sizes, so instead of writing each bpc as a raw 6-bit number, you can estimate it from its neighbors and, instead, write a small residual which tends to be tiny.

BPC 编码每次处理一组四个系数。对于每一组，你必须确定一个最小的 bpc 值，使得该组中的每个系数都能被容纳。这个位平面计数代表了一个索引，高于该索引的所有系数位在该组中均为零。在 libwce 中，所有的 bpc 值首先被写入一个单一的比特流，然后对于每一组，四个系数按“系数优先”（coeff-major）顺序输出。这些是每个系数的幅值位，如果系数非零，紧随其后的是一个符号位。这就完成了你需要做的所有数据处理。接下来，当你对这些 bpc 值进行编码时，才真正进入压缩阶段。相邻组的 bpc 值往往相似，因此与其将每个 bpc 写为原始的 6 位数字，不如根据其邻居进行估算，并写入一个通常很小的残差值。

Here, libwce uses RUNNING (DPCM delta vs the previous group's bpc, zigzag-mapped and Rice-coded) and ZERO (unsigned residual against lossy_bits) predictors which can be optionally combined with a 1-bit-per-8-group sparse-block flag that short-circuits all-deadzone blocks. That leaves you with four predictor × flag combinations, and the encoder sweeps Rice-k across seven values inside each, picking the best per band via a single-pass cost search. All combinations give the same decoded result, but they produce different types of bitstreams. Each one works best for different pixel distribution such as textured regions, flat parts, or sub-bands which are mostly zeros.

在这里，libwce 使用了 RUNNING（相对于前一组 bpc 的 DPCM 增量，经过之字形映射和 Rice 编码）和 ZERO（相对于 lossy_bits 的无符号残差）预测器，并可选择性地结合每 8 组 1 位的稀疏块标志（sparse-block flag），以跳过全零块。这产生了四种“预测器 × 标志”组合，编码器会在每种组合内对 Rice-k 的七个值进行扫描，通过单次成本搜索为每个频带选择最佳方案。所有组合都能得到相同的解码结果，但产生的比特流类型不同。每种组合在处理不同的像素分布（如纹理区域、平坦区域或大部分为零的子带）时表现各异。

### What it looks like to use

### 如何使用

Here's a complete decoder for one sub-band:
```rust
let mut coeffs = vec![0i32; N];
let lossy_bits = decode(buf, &mut coeffs).unwrap();
dequantize_optimal(&mut coeffs, lossy_bits, scale_b);
```
The library itself is stateless, and only works with whatever buffers you provide. It doesn't use I/O or hidden globals, and works purely through caller-owned buffers (a small BPC scratch buffer is allocated internally).

这是一个针对单个子带的完整解码器：
（代码见上文）
该库本身是无状态的，仅处理你提供的缓冲区。它不使用 I/O 或隐藏的全局变量，完全通过调用者拥有的缓冲区进行工作（内部会分配一个小的 BPC 暂存缓冲区）。

### Compressing an image end-to-end

### 端到端压缩图像

The repo has 3 demos. The most fun one is `image_compress`, which is a full codec built on top of libwce. It uses Haar wavelet in, libwce in the middle, and inverse Haar on the way out which run across four quality presets.

该仓库包含 3 个演示程序。最有趣的是 `image_compress`，这是一个构建在 libwce 之上的完整编解码器。它输入端使用 Haar 小波，中间使用 libwce，输出端使用逆 Haar 小波，并运行在四种质量预设下。

*(Table omitted for brevity)*

整个过程包括 DWT（离散小波变换）、子带编码、量化和写入容器，代码量不到 500 行。如果你将四个重建后的 PGM 文件并排打开，你会看到随着压缩率的增加，质量逐渐下降。在 q1 档，图像与原始图像几乎无法区分；q2 档在平坦区域有轻微平滑；q3 档开始在边缘出现明显的小波振铃效应；而 q4 档则呈现出典型的小波块状伪影，看起来有些诡异但仍可辨认。

The second demo, `mode_shootout`, runs a synthetic Laplacian sub-band through every predictor × flag combination and displays the winner.

第二个演示 `mode_shootout` 将一个合成的拉普拉斯子带通过每种“预测器 × 标志”组合进行测试，并显示胜出者。

*(Table omitted for brevity)*

`auto-pick` 击败了最佳强制模式，节省了 40 字节（得益于更好的 rice_k）。这正是那种在完整编解码器框架内难以完成的操作，因为你必须费力地去插桩内部逻辑、禁用码率控制，然后模拟框架层。有了 libwce，模式比较就成了 API 的原生功能。你只需通过 `encode_with_options` 对每个“预测器 × 标志”组合运行同一个子带，然后计算字节数并选出胜者，这正是 `encode` 函数在内部所做的事情。

The third demo, `stream_surgery`, does 256 random bitflips and 256 random byte scrambles across the encoded bitstream...

第三个演示 `stream_surgery` 对编码后的比特流进行了 256 次随机位翻转和 256 次随机字节打乱……