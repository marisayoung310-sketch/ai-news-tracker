---
title: "Parse Scanned PDFs for RAG with EasyOCR: Free OCR Gives You Words, Not a Document"
originalUrl: "https://towardsdatascience.com/parse-scanned-pdfs-for-rag-with-easyocr-free-ocr-gives-you-words-not-a-document/"
date: "2026-06-19T22:24:50.904Z"
---

# Parse Scanned PDFs for RAG with EasyOCR: Free OCR Gives You Words, Not a Document

**Large Language Models Parse Scanned PDFs for RAG with EasyOCR: Free OCR Gives You Words, Not a Document**
**企业文档智能 [Vol.1 #5quinquies] – 同一份 1974 年的扫描 PDF，两种引擎。EasyOCR 恢复了文本。Docling 恢复了文本 + 章节 + 图表。结构上的差距使得一种输出可用于下游任务，而另一种只是扁平的字符串。**
*Kezhan Shi | 2026年6月19日 | 15分钟阅读 | 图片来源：Aakash Chary, via Pexels*

This article is a parsing companion in Enterprise Document Intelligence, the series that builds an enterprise RAG system from four bricks. Article 5 (document parsing) built the parser with PyMuPDF (fitz), which returns empty on a scanned page with no text layer. This companion swaps the engine for EasyOCR, a free OCR package that recovers that text. It is the one case in this family where the new engine gives you less, not more: it recovers the text and nothing around it, and that gap is the lesson.

本文是《企业文档智能》系列中的一篇解析指南，该系列旨在通过四个模块构建企业级 RAG 系统。第 5 篇文章（文档解析）使用 PyMuPDF (fitz) 构建了解析器，但对于没有文本层的扫描页面，它会返回空值。本篇指南将引擎替换为 EasyOCR，这是一个可以恢复文本的免费 OCR 软件包。这是该系列中唯一一个新引擎提供的信息反而更少的情况：它只恢复文本，而不包含任何上下文信息，而这种差距正是本文要探讨的重点。

where this companion sits: it extends Article 5 (document parsing), inside Part II (the four bricks), with a different parsing engine – Image by author

本篇指南的位置：它扩展了第二部分（四个模块）中的第 5 篇文章（文档解析），并采用了不同的解析引擎 —— 图片由作者提供。

Scanned PDFs are not solved by “just throw OCR at it”. The OCR step recovers text; that’s necessary but not sufficient for an enterprise RAG pipeline. What the pipeline also needs is everything around the text: where the page boundaries are, which lines are section headings, what is a figure, what is a table row vs a free paragraph.

扫描版 PDF 的问题并非“直接扔给 OCR”就能解决。OCR 步骤可以恢复文本；这对于企业级 RAG 流水线来说是必要的，但还不够。流水线还需要文本周围的所有信息：页面边界在哪里，哪些行是章节标题，什么是图表，什么是表格行，什么是普通段落。

“Traditional OCR” (the term of art for text-detection + text-recognition engines like EasyOCR, Tesseract, PaddleOCR) gives you the text. It gives you nothing else. The rest is the layout problem, and the layout problem is the harder half. This article runs that distinction concretely.

“传统 OCR”（指代 EasyOCR、Tesseract、PaddleOCR 等文本检测与识别引擎的专业术语）只能给你文本。它不会提供其他任何信息。剩下的部分是布局问题，而布局问题是更难的一半。本文将具体阐述这一区别。

The traditional-OCR engine is EasyOCR: the simplest, fastest, free, JaidedAI’s text-detection + recognition library (Apache 2.0, declared in the project’s LICENSE file). The layout-aware engine is Docling (Article 5ter; MIT license, declared in the project’s LICENSE file). Both can OCR a scanned page. They differ on what they do with the result. The whole article is a setup for the head-to-head on a real public-domain 1974 scan in section 5.

传统 OCR 引擎是 EasyOCR：这是 JaidedAI 开发的最简单、最快、免费的文本检测与识别库（Apache 2.0 协议，在项目的 LICENSE 文件中声明）。具备布局感知能力的引擎是 Docling（第 5ter 篇文章；MIT 协议，在项目的 LICENSE 文件中声明）。两者都能对扫描页面进行 OCR 处理，但它们对结果的处理方式不同。整篇文章旨在为第 5 节中对一份 1974 年真实公共领域扫描件的对比测试做铺垫。

EasyOCR is the OCR floor: line_df only, no layout. The rest of the family adds structure – Image by author

EasyOCR 是 OCR 的基准：仅有 line_df，没有布局。该系列的其他工具则增加了结构信息 —— 图片由作者提供。

### 1. What “traditional OCR” does (and doesn’t)
### 1. “传统 OCR”能做什么（以及不能做什么）

Traditional OCR reads pixels and returns text rectangles. Everything else, sections, tables, figures, reading order, is a separate layout problem the engine refuses to look at. The two models behind it are text detection (find rectangular regions of the image that contain text) and text recognition (read each region’s pixels and return characters with a confidence score). The output is a flat list of (bbox, text, confidence) per detected region. That is everything EasyOCR (or Tesseract, or PaddleOCR) does.

传统 OCR 读取像素并返回文本矩形。其他所有内容，如章节、表格、图表、阅读顺序，都是引擎拒绝处理的独立布局问题。其背后的两个模型分别是文本检测（查找图像中包含文本的矩形区域）和文本识别（读取每个区域的像素并返回带有置信度的字符）。输出结果是每个检测区域的 (bbox, text, confidence) 扁平列表。这就是 EasyOCR（或 Tesseract、PaddleOCR）所做的一切。

The engine reads pixels and returns text rectangles. A two-column page comes back as a flat list of left-and-right text boxes intermixed by y-coordinate; the engine does not know there are two columns. A table comes back as a grid of disconnected cells the engine cannot tell apart from regular paragraphs. A figure caption is just another text box. The page header, page footer, marginalia all show up as boxes too.

引擎读取像素并返回文本矩形。双栏页面返回的是按 Y 坐标混合的左右文本框扁平列表；引擎并不知道存在两栏。表格返回的是网格状的离散单元格，引擎无法将其与普通段落区分开来。图注也只是另一个文本框。页眉、页脚、页边注也都显示为矩形框。任何需要“这段文字是章节标题”或“这四个框是一个表格行”的逻辑，都需要在 OCR 之上增加第二个模型，即布局模型。

Anything that needs “this text is a section heading” or “these four boxes are one table row” needs a second model on top, a layout model. The layout model reads the OCR output plus the page image and classifies each region (heading, paragraph, table cell, figure, caption, footer…) and groups them into a reading order. That is what Article 5bis (Azure DI), Article 5ter (Docling), and Article 5quater (vision LLM) all add over the OCR step. Without one, you have “OCR output”, not “a parsed document”.

任何需要识别“这段文字是章节标题”或“这四个框是一个表格行”的需求，都需要在 OCR 之上增加第二个模型，即布局模型。布局模型读取 OCR 输出和页面图像，对每个区域进行分类（标题、段落、表格单元格、图表、图注、页脚等），并将它们组合成阅读顺序。这正是第 5bis 篇（Azure DI）、第 5ter 篇（Docling）和第 5quater 篇（视觉 LLM）在 OCR 步骤之上所增加的内容。如果没有布局模型，你得到的只是“OCR 输出”，而不是“已解析的文档”。

### 2. EasyOCR: the canonical traditional OCR
### 2. EasyOCR：典型的传统 OCR

EasyOCR is the cleanest demonstration of “traditional OCR” as a class. The library is small (~150 MB of model weights cached on first call), free, CPU-only by default, local. The whole library API is two calls: build a Reader for the languages you need, then hand readtext an image. Each detection comes back as a triple: the polygon around the text, the recognised string, and the recogniser’s own confidence.

EasyOCR 是“传统 OCR”这一类别的最清晰演示。该库体积小（首次调用时缓存约 150 MB 模型权重）、免费、默认仅使用 CPU、且支持本地运行。整个库的 API 只有两个调用：为所需语言构建一个 Reader，然后将图像传给 readtext。每次检测都会返回一个三元组：文本周围的多边形、识别出的字符串以及识别器自身的置信度。

```python
import easyocr
import fitz
import numpy as np

reader = easyocr.Reader(["en"], gpu=False) # first call downloads ~150 MB

# render page 1 of a scanned PDF to a numpy array
page = fitz.open("data/contracts/scanned_amendment.pdf")[0]
pix = page.get_pixmap(matrix=fitz.Matrix(2.0, 2.0)) # 2x zoom = ~144 DPI
img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(
    pix.height, pix.width, pix.n,
)

# the recogniser: one image in, one triple per detected text region out
detections = reader.readtext(img)
for quad, text, conf in detections:
    # quad = [[x0,y0], [x1,y0], [x1,y1], [x0,y1]] in pixel coords
    print(round(conf, 2), text)
```

`parse_pdf_easyocr` wraps that loop. It walks every page of the PDF, renders each to a numpy array, calls readtext, converts the pixel-space polygons back to PDF coordinates, and packs the detections into the same dict-of-tables contract as the other parsers, same line_df, same parsing_summary, same downstream consumers, except that only those two keys carry data. Every other slot (page_df, image_df, toc_df, span_df, object_registry, cross_ref_df) comes back as an empty DataFrame. That isn’t a missing-feature bug; it’s exactly what “traditional OCR” means.

`parse_pdf_easyocr` 封装了上述循环。它遍历 PDF 的每一页，将每一页渲染为 numpy 数组，调用 readtext，将像素空间的多边形转换回 PDF 坐标，并将检测结果打包成与其他解析器相同的字典表契约（dict-of-tables contract），包括相同的 line_df、相同的 parsing_summary 和相同的下游消费者，只是只有这两个键包含数据。其他所有槽位（page_df, image_df, toc_df, span_df, object_registry, cross_ref_df）返回的都是空 DataFrame。这不是功能缺失的 Bug，这正是“传统 OCR”的定义。

```python
parsed = parse_pdf_easyocr(
    "data/contracts/scanned_amendment.pdf",
    languages=("en",), # add "fr", "de", ... for multilingual scans
    render_scale=2.0, # 2.0 = ~144 DPI ; raise for small fonts
    gpu=False, # CPU-only by default ; set True if CUDA available
    confidence_threshold=0.0, # filter low-confidence detections if needed
)

parsed["line_df"] # text + bbox + confidence per detection
parsed["parsing_summary"] # method, page count, line count, render scale
# Every other key (page_df, image_df, toc_df, span_df, object_registry,
# cross_ref_df) is an empty DataFrame ; EasyOCR has nothing to put there.
```