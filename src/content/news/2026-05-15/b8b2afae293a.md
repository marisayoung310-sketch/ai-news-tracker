---
title: "roboflow / supervision"
originalUrl: "https://github.com/roboflow/supervision"
date: "2026-05-14T22:45:37.756Z"
---

# Roboflow / Supervision

notebooks | inference | autodistill | maestro 👋 hello We are your essential toolkit for computer vision. From data loading to real-time zone counting, we provide the building blocks so you can focus on building applications around your models.

notebooks | inference | autodistill | maestro 👋 你好！我们是你计算机视觉领域不可或缺的工具包。从数据加载到实时区域计数，我们提供基础构建模块，让你能够专注于围绕模型开发应用程序。

🤝 💻 install Pip install the supervision package in a Python>=3.9 environment. pip install supervision Read more about conda, mamba, and installing from source in our guide.

🤝 💻 安装：在 Python>=3.9 的环境中通过 pip 安装 supervision 包。`pip install supervision`。请查阅我们的指南，了解更多关于 conda、mamba 以及从源码安装的信息。

🔥 quickstart models Supervision was designed to be model agnostic. Just plug in any classification, detection, or segmentation model. For your convenience, we have created connectors for the most popular libraries like Ultralytics, Transformers, MMDetection, or Inference. Other integrations, like rfdetr, already return sv.Detections directly. Install the optional dependencies for this example with pip install pillow rfdetr.

🔥 快速入门模型：Supervision 的设计初衷是模型无关的。你可以接入任何分类、检测或分割模型。为了方便起见，我们为 Ultralytics、Transformers、MMDetection 或 Inference 等最流行的库创建了连接器。其他集成（如 rfdetr）已经可以直接返回 `sv.Detections`。通过 `pip install pillow rfdetr` 安装此示例的可选依赖项。

```python
import supervision as sv
from PIL import Image
from rfdetr import RFDETRSmall
image = Image.open(...)
model = RFDETRSmall()
detections = model.predict(image, threshold=0.5)
len(detections) # 5
```

👉 more model connectors inference Running with Inference requires a Roboflow API KEY.

👉 更多模型连接器：运行 Inference 需要 Roboflow API KEY。

```python
import supervision as sv
from PIL import Image
from inference import get_model
image = Image.open(...)
model = get_model(model_id="rfdetr-small", api_key="ROBOFLOW_API_KEY")
result = model.infer(image)[0]
detections = sv.Detections.from_inference(result)
len(detections) # 5
```

annotators Supervision offers a wide range of highly customizable annotators, allowing you to compose the perfect visualization for your use case.

标注器：Supervision 提供了多种高度可定制的标注器，让你能够为你的用例组合出完美的视觉效果。

```python
import cv2
import supervision as sv
image = cv2.imread(...)
detections = sv.Detections(...)
box_annotator = sv.BoxAnnotator()
annotated_frame = box_annotator.annotate(scene=image.copy(), detections=detections)
```

datasets Supervision provides a set of utils that allow you to load, split, merge, and save datasets in one of the supported formats.

数据集：Supervision 提供了一套工具，允许你以支持的格式加载、拆分、合并和保存数据集。

```python
import supervision as sv
from roboflow import Roboflow
project = Roboflow().workspace("WORKSPACE_ID").project("PROJECT_ID")
dataset = project.version("PROJECT_VERSION").download("coco")
ds = sv.DetectionDataset.from_coco(
    images_directory_path=f"{dataset.location}/train",
    annotations_path=f"{dataset.location}/train/_annotations.coco.json",
)
path, image, annotation = ds[0] # 按需加载图像
for path, image, annotation in ds: # 按需加载图像
    pass
```

👉 more dataset utils: load, split, merge, save, convert (YOLO, Pascal VOC, COCO).

👉 更多数据集工具：加载、拆分、合并、保存、转换（支持 YOLO、Pascal VOC、COCO 格式）。

🎬 tutorials Want to learn how to use Supervision? Explore our how-to guides, end-to-end examples, cheatsheet, and cookbooks!

🎬 教程：想学习如何使用 Supervision 吗？探索我们的操作指南、端到端示例、速查表和实战手册吧！

Dwell Time Analysis with Computer Vision | Real-Time Stream Processing Created: 5 Apr 2024 Learn how to use computer vision to analyze wait times and optimize processes. This tutorial covers object detection, tracking, and calculating time spent in designated zones. Use these techniques to improve customer experience in retail, traffic management, or other scenarios.

基于计算机视觉的停留时间分析 | 实时流处理（创建于 2024 年 4 月 5 日）：学习如何利用计算机视觉分析等待时间并优化流程。本教程涵盖了目标检测、跟踪以及计算在指定区域内停留的时间。利用这些技术可以改善零售、交通管理或其他场景中的客户体验。

Speed Estimation & Vehicle Tracking | Computer Vision | Open Source Created: 11 Jan 2024 Learn how to track and estimate the speed of vehicles using YOLO, ByteTrack, and Roboflow Inference. This comprehensive tutorial covers object detection, multi-object tracking, filtering detections, perspective transformation, speed estimation, visualization improvements, and more.

速度估计与车辆跟踪 | 计算机视觉 | 开源（创建于 2024 年 1 月 11 日）：学习如何使用 YOLO、ByteTrack 和 Roboflow Inference 来跟踪和估计车辆速度。本综合教程涵盖了目标检测、多目标跟踪、检测过滤、透视变换、速度估计、可视化改进等内容。

💜 built with supervision Did you build something cool using supervision? Let us know!

💜 使用 Supervision 构建：你是否使用 Supervision 构建了很酷的项目？请告诉我们！

📚 documentation Visit our documentation page to learn how supervision can help you build computer vision applications faster and more reliably.

📚 文档：访问我们的文档页面，了解 Supervision 如何帮助你更快、更可靠地构建计算机视觉应用程序。

🏆 contribution We love your input! Please see our contributing guide to get started. Thank you 🙏 to all our contributors!

🏆 贡献：我们欢迎你的参与！请查看我们的贡献指南以开始。感谢 🙏 所有贡献者！