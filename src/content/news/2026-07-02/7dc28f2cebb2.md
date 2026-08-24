---
title: "allenai / olmocr"
originalUrl: "https://github.com/allenai/olmocr"
date: "2026-07-01T22:46:21.757Z"
---

# allenai / olmocr

A toolkit for converting PDFs and other image-based document formats into clean, readable, plain text format. Try the online demo: https://olmocr.allenai.org/
这是一个用于将 PDF 和其他基于图像的文档格式转换为整洁、可读的纯文本格式的工具包。请尝试在线演示：https://olmocr.allenai.org/

### Features:
### 功能特点：
* Convert PDF, PNG, and JPEG based documents into clean Markdown
* 将基于 PDF、PNG 和 JPEG 的文档转换为整洁的 Markdown
* Support for equations, tables, handwriting, and complex formatting
* 支持公式、表格、手写内容和复杂格式
* Automatically removes headers and footers
* 自动移除页眉和页脚
* Convert into text with a natural reading order, even in the presence of figures, multi-column layouts, and insets
* 即使在存在图表、多栏布局和插图的情况下，也能以自然的阅读顺序转换为文本
* Efficient, less than $200 USD per million pages converted (Based on a 7B parameter VLM, so it requires a GPU)
* 高效，每百万页转换成本低于 200 美元（基于 7B 参数的视觉语言模型 VLM，因此需要 GPU）

### News
### 新闻动态
* **October 21, 2025 - v0.4.0** - New model release, boosts olmOCR-bench score by ~4 points using synthetic data and introduces RL training.
* **2025年10月21日 - v0.4.0** - 发布新模型，利用合成数据将 olmOCR-bench 分数提高了约 4 分，并引入了强化学习（RL）训练。
* **August 13, 2025 - v0.3.0** - New model release, fixes auto-rotation detection, and hallucinations on blank documents.
* **2025年8月13日 - v0.3.0** - 发布新模型，修复了自动旋转检测以及在空白文档上的幻觉问题。
* **July 24, 2025 - v0.2.1** - New model release, scores 3 points higher on olmOCR-Bench, also runs significantly faster because it's default FP8, and needs much fewer retries per document.
* **2025年7月24日 - v0.2.1** - 发布新模型，在 olmOCR-Bench 上得分提高了 3 分，且由于默认使用 FP8，运行速度显著加快，每个文档所需的重试次数也大幅减少。
* **July 23, 2025 - v0.2.0** - New cleaned up trainer code, makes it much simpler to train olmOCR models yourself.
* **2025年7月23日 - v0.2.0** - 清理了训练器代码，使您可以更简单地自行训练 olmOCR 模型。
* **June 17, 2025 - v0.1.75** - Switch from sglang to vllm based inference pipeline, updated docker image to CUDA 12.8.
* **2025年6月17日 - v0.1.75** - 推理流水线从 sglang 切换至 vllm，并将 Docker 镜像更新至 CUDA 12.8。
* **May 23, 2025 - v0.1.70** - Official docker support and images are now available! See Docker usage
* **2025年5月23日 - v0.1.70** - 正式支持 Docker，镜像现已可用！请参阅 Docker 使用说明。
* **May 19, 2025 - v0.1.68** - olmOCR-Bench launch, scoring 77.4. Launch includes 2 point performance boost in olmOCR pipeline due to bug fixes with prompts.
* **2025年5月19日 - v0.1.68** - 推出 olmOCR-Bench，得分为 77.4。此次发布通过修复提示词（prompts）中的 Bug，使 olmOCR 流水线的性能提升了 2 分。
* **Mar 17, 2025 - v0.1.60** - Performance improvements due to better temperature selection in sampling.
* **2025年3月17日 - v0.1.60** - 通过优化采样中的温度选择，提升了性能。
* **Feb 25, 2025 - v0.1.58** - Initial public launch and demo.
* **2025年2月25日 - v0.1.58** - 首次公开发布及演示。

### Benchmark olmOCR-Bench:
### 基准测试 olmOCR-Bench：
We also ship a comprehensive benchmark suite covering over 7,000 test cases across 1,400 documents to help measure performance of OCR systems.
我们还提供了一套全面的基准测试套件，涵盖了 1,400 份文档中的 7,000 多个测试用例，以帮助衡量 OCR 系统的性能。

*(Table omitted for brevity)*

### Installation
### 安装指南

#### System Dependencies
#### 系统依赖
You will need to install poppler-utils and additional fonts for rendering PDF images. Install dependencies (Ubuntu/Debian):
您需要安装 poppler-utils 和额外的字体以渲染 PDF 图像。安装依赖（Ubuntu/Debian）：
```bash
sudo apt-get update
sudo apt-get install poppler-utils ttf-mscorefonts-installer msttcorefonts fonts-crosextra-caladea fonts-crosextra-carlito gsfonts lcdf-typetools
```

#### Python Installation
#### Python 安装
Set up a conda environment and install olmocr. The requirements for running olmOCR are difficult to install in an existing python environment, so please do make a clean python environment to install into.
设置一个 conda 环境并安装 olmocr。运行 olmOCR 的依赖项很难在现有的 Python 环境中安装，因此请务必创建一个干净的 Python 环境进行安装。
```bash
conda create -n olmocr python=3.11
conda activate olmocr
```

Choose the installation option that matches your use case:
选择符合您使用场景的安装选项：

**Option 1: Remote Inference (Lightweight)**
**选项 1：远程推理（轻量级）**
If you plan to use a remote vLLM server with the --server flag, install the base package:
如果您计划使用带有 --server 标志的远程 vLLM 服务器，请安装基础包：
```bash
pip install olmocr
```
This avoids installing heavy GPU dependencies like PyTorch (~2GB+).
这避免了安装像 PyTorch 这样沉重的 GPU 依赖（约 2GB+）。

**Option 2: Local GPU Inference**
**选项 2：本地 GPU 推理**
Requirements: Recent NVIDIA GPU (tested on RTX 4090, L40S, A100, H100) with at least 12 GB of GPU RAM, 30GB of free disk space.
要求：较新的 NVIDIA GPU（已在 RTX 4090、L40S、A100、H100 上测试），至少 12 GB GPU 显存，30GB 可用磁盘空间。
```bash
pip install olmocr[gpu] --extra-index-url https://download.pytorch.org/whl/cu128
# Recommended: Install flash infer for faster inference on GPU
# 推荐：安装 flash infer 以在 GPU 上实现更快的推理
pip install https://download.pytorch.org/whl/cu128/flashinfer/flashinfer_python-0.2.5%2Bcu128torch2.7-cp38-abi3-linux_x86_64.whl
```

**Option 3: Beaker Cluster Execution**
**选项 3：Beaker 集群执行**
For submitting jobs to Beaker clusters with the --beaker flag:
用于通过 --beaker 标志向 Beaker 集群提交作业：
```bash
pip install olmocr[beaker]
```

**Option 4: Benchmark Suite**
**选项 4：基准测试套件**
For running the olmOCR benchmark suite:
用于运行 olmOCR 基准测试套件：
```bash
pip install olmocr[bench]
```

**Combined Installation**
**组合安装**
You can combine multiple options:
您可以组合多个选项：
```bash
# GPU + Beaker support
pip install olmocr[gpu,beaker] --extra-index-url https://download.pytorch.org/whl/cu128
# GPU + Benchmark support
pip install olmocr[gpu,bench] --extra-index-url https://download.pytorch.org/whl/cu128
```

### Troubleshooting
### 故障排除
If you run into errors about too many open files, update your ulimit:
如果您遇到“打开文件过多”的错误，请更新您的 ulimit：
```bash
ulimit -n 65536
```

### Usage Examples
### 使用示例
For quick testing, try the web demo.
如需快速测试，请尝试网页演示。

**Convert a Single PDF (Local GPU):**
**转换单个 PDF（本地 GPU）：**
```bash
# Download a sample PDF
curl -o olmocr-sample.pdf https://olmocr.allenai.org/papers/olmocr_3pg_sample.pdf
# Convert it to markdown
olmocr ./localworkspace --markdown --pdfs olmocr-sample.pdf
```

**Convert an Image file:**
**转换图像文件：**
```bash
olmocr ./localworkspace --markdown --pdfs random_page.png
```

**Convert Multiple PDFs:**
**转换多个 PDF：**
```bash
olmocr ./localworkspace --markdown --pdfs tests/gnarly_pdfs/*.pdf
```

**Use Remote Inference Server:**
**使用远程推理服务器：**
```bash
olmocr ./localworkspace --server http://remote-server:8000/v1 --model allenai/olmOCR-2-7B-1025-FP8 --markdown --pdfs *.pdf
```
With the --markdown flag, results will be stored as markdown files inside of ./localworkspace/markdown/.
使用 --markdown 标志，结果将存储在 ./localworkspace/markdown/ 目录下的 markdown 文件中。
*Note: You can also use python -m olmocr.pipeline instead of olmocr if you prefer.*
*注意：如果您愿意，也可以使用 python -m olmocr.pipeline 代替 olmocr。*

### Viewing Results
### 查看结果
The ./localworkspace/ workspace folder will then have both Dolma and markdown files (if using --markdown).
./localworkspace/ 工作文件夹中将包含 Dolma 和 markdown 文件（如果使用了 --markdown）。
```bash
cat localworkspace/markdown/olmocr-sample.md
```

### Using an Inference Provider or External Server
### 使用推理提供商或外部服务器
If you have a vLLM server already running elsewhere (or any inference platform implementing the OpenAI API), you can point olmOCR to use it instead of spawning a local instance.
如果您已经在其他地方运行了 vLLM 服务器（或任何实现了 OpenAI API 的推理平台），您可以指定 olmOCR 使用它，而不是启动本地实例。

**Installation for Remote Inference:**
**远程推理安装：**
```bash
# Lightweight installation - no GPU dependencies needed
# 轻量级安装 - 无需 GPU 依赖
pip install olmocr
```

**Using an External Server:**
**使用外部服务器：**
```bash
# Use external vLLM server instead of local one
# 使用外部 vLLM 服务器代替本地服务器
olmocr ./localworkspace --server http://remote-server:8000/v1 --model allenai/olmOCR-2-7B-1025-FP8 --markdown --pdfs tests/gnarly_pdfs/*.pdf
```