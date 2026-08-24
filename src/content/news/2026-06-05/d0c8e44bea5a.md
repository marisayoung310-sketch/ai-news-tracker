---
title: "Pinpoint: Grounded Worldwide Image Geolocation via Cross-Source Retrieval and Reranking"
originalUrl: "https://arxiv.org/abs/2606.04133"
date: "2026-06-04T22:58:25.986Z"
---

# Pinpoint: Grounded Worldwide Image Geolocation via Cross-Source Retrieval and Reranking
# Pinpoint：通过跨源检索与重排序实现全球图像地理定位

**Abstract:** Image geolocation aims to estimate where a photograph was taken from its visual content. At worldwide scale, this remains challenging because visual evidence is often ambiguous, diverse, and unevenly distributed. Prior work has typically treated geolocation of ordinary internet photos and street-view imagery as separate tasks, despite their complementary strengths: internet photos better match the appearance distribution of user-captured queries, while street-view imagery provides denser, geographically grounded coverage.

**摘要：** 图像地理定位旨在根据照片的视觉内容估算其拍摄地点。在全球范围内，这仍然是一项挑战，因为视觉证据往往具有模糊性、多样性且分布不均。以往的研究通常将普通互联网照片和街景图像的地理定位视为独立任务，尽管它们具有互补优势：互联网照片能更好地匹配用户拍摄查询的视觉分布，而街景图像则提供了更密集、具有地理基础的覆盖范围。

We present Pinpoint, a retrieve-and-rerank architecture that combines both sources in a coarse-to-fine pipeline. A contrastive image-GPS embedder is trained on both user-uploaded Flickr photos and street-view imagery, learning a shared image-GPS embedding space that is used to retrieve candidate locations. An attention-based reranker then rescores retrieved candidates by combining candidate-level visual and GPS features with cross-source evidence from nearby locations to ground the prediction.

我们提出了 Pinpoint，这是一种结合了两种数据源的“检索-重排序”（retrieve-and-rerank）架构，采用从粗到细的流水线处理。通过在用户上传的 Flickr 照片和街景图像上训练对比式图像-GPS 嵌入器，模型学习到了一个共享的图像-GPS 嵌入空间，用于检索候选位置。随后，一个基于注意力机制的重排序器通过结合候选位置的视觉和 GPS 特征，以及来自邻近地点的跨源证据，对检索到的候选结果进行重新评分，从而实现更精准的定位。

Unlike recent prior work, Pinpoint does not rely on multimodal large-language models, making inference faster and more reproducible. Pinpoint achieves state-of-the-art results across all metrics on standard benchmarks for internet photos (IM2GPS3k and YFCC4k) and street-view imagery (OSV-5M).

与近期研究不同，Pinpoint 不依赖多模态大语言模型，这使得推理过程更快且更具可复现性。Pinpoint 在互联网照片（IM2GPS3k 和 YFCC4k）及街景图像（OSV-5M）的标准基准测试中，各项指标均达到了行业领先水平（State-of-the-art）。