---
title: "harvard-edge / cs249r_book"
originalUrl: "https://github.com/harvard-edge/cs249r_book"
date: "2026-07-03T22:32:10.158Z"
---

# harvard-edge / cs249r_book

### Machine Learning Systems: Principles and Practices of Engineering Artificially Intelligent Systems
### 机器学习系统：人工智能系统工程的原理与实践

English • 中文 • 日本語 • 한국어 📘 Textbook • 📗 Vol I + 📘 Vol II • 🔥 TinyTorch • 🔬 Labs • 🔮 MLSys·im • 💼 StaffML 📚 Hardcopy edition coming 2026 with MIT Press.
英语 • 中文 • 日本語 • 한국어 📘 教科书 • 📗 第一卷 + 📘 第二卷 • 🔥 TinyTorch • 🔬 实验 • 🔮 MLSys·im • 💼 StaffML 📚 纸质版将于 2026 年由麻省理工学院出版社 (MIT Press) 出版。

### Mission
### 使命

The world is rushing to build AI systems. It is not engineering them. That gap is what we mean by AI engineering. AI engineering is the discipline of building efficient, reliable, safe, and robust intelligent systems that operate in the real world, not just models in isolation. Our mission is to establish AI engineering as a foundational discipline alongside software engineering and computer engineering, by teaching how to design, build, and evaluate end-to-end intelligent systems. Our goal: Help 100,000 learners master ML Systems this year, and reach 1 million by 2030.
世界正竞相构建人工智能系统，但并未对其进行“工程化”。这种差距正是我们所指的“AI 工程”。AI 工程是一门构建高效、可靠、安全且稳健的智能系统的学科，这些系统需要在现实世界中运行，而不仅仅是孤立的模型。我们的使命是通过教授如何设计、构建和评估端到端的智能系统，将 AI 工程确立为与软件工程和计算机工程并列的基础学科。我们的目标是：今年帮助 10 万名学习者掌握机器学习系统，到 2030 年达到 100 万人。

### Why One Repository
### 为什么采用单一仓库

I designed this as a single integrated curriculum, not a collection of independent projects. The textbook teaches the theory. TinyTorch makes you build the internals. The hardware kits force you to confront real constraints. The simulator lets you reason about infrastructure you can't afford to rent. Each piece exists because I found that students who only read don't internalize, and students who only code don't generalize. The repository is the curriculum. A growing community of contributors helps improve every part of it: fixing errors, sharpening explanations, testing on new hardware. Their work makes this better for everyone, and I'm grateful for every pull request.
我将其设计为一个单一的集成课程，而不是一系列独立项目的集合。教科书教授理论；TinyTorch 让你构建内部机制；硬件套件迫使你面对真实的约束；模拟器让你能够推演那些你租不起的基础设施。每一个组件的存在都是因为我发现：只阅读的学生无法内化知识，而只写代码的学生无法总结规律。这个仓库就是课程本身。一个不断壮大的贡献者社区正在帮助改进它的每一个部分：修复错误、优化解释、在新型硬件上进行测试。他们的工作让这个项目变得更好，我感谢每一个 Pull Request。

### The Curriculum
### 课程体系

Every component connects. The textbook gives you the mental models. The labs let you reason through trade-offs interactively, powered by MLSys·im — a modeling engine for infrastructure you can't physically access, and a standalone tool in its own right. TinyTorch makes you build the machinery yourself. The hardware kits put you face-to-face with real deployment constraints. StaffML tests whether you actually understand it. Socratiq adds AI-guided reading, contextual quizzes, and spaced repetition inside the learning experience. And the instructor hub, slides, and newsletter give educators everything they need to bring this into a classroom.
每一个组件都是相互关联的。教科书提供思维模型；实验课让你通过交互方式推演权衡取舍，其核心由 MLSys·im 驱动——这是一个用于模拟你无法物理接触的基础设施的建模引擎，同时也是一个独立的工具；TinyTorch 让你亲手构建底层机制；硬件套件让你直面真实的部署约束；StaffML 用于测试你是否真正理解；Socratiq 在学习体验中加入了 AI 引导阅读、情境测验和间隔重复；此外，教师中心、幻灯片和通讯为教育工作者提供了将此课程引入课堂所需的一切资源。

---

### For Students / 面向学生

| Component | Role in the Curriculum | Link |
| :--- | :--- | :--- |
| 📖 Textbook | Two-volume MIT Press textbook. The theory, the mental models, and the quantitative reasoning that everything else builds on. | Vol I · Vol II |
| 📖 教科书 | 麻省理工学院出版社出版的两卷本教材。涵盖了其他所有内容所依赖的理论、思维模型和定量推理。 | 第一卷 · 第二卷 |

| 🔬 Labs | Interactive Marimo notebooks where you explore trade-offs from the textbook: change a parameter, see what breaks, build intuition. Powered by MLSys·im under the hood. | Launch labs · Repo guide |
| 🔬 实验 | 交互式 Marimo 笔记本，用于探索教科书中的权衡取舍：修改参数、观察故障、建立直觉。底层由 MLSys·im 驱动。 | 启动实验 · 仓库指南 |

| 🔥 TinyTorch | Build your own ML framework from scratch across 20 progressive modules. You don't understand a system until you've built one. | Get started |
| 🔥 TinyTorch | 通过 20 个循序渐进的模块从零构建你自己的机器学习框架。不亲手构建，就无法真正理解系统。 | 开始学习 |

| 🛠️ Hardware Kits | Deploy ML to Arduino, Seeed, Grove, and Raspberry Pi devices. Real memory limits, real power budgets, real latency. | Browse labs |
| 🛠️ 硬件套件 | 将机器学习部署到 Arduino、Seeed、Grove 和树莓派设备上。体验真实的内存限制、功耗预算和延迟。 | 浏览实验 |

| 🔮 MLSys·im | Calculate memory bottlenecks, network saturation, and scheduling limits at infrastructure scales you can't physically access. | Use simulator · Repo guide |
| 🔮 MLSys·im | 在你无法物理接触的基础设施规模下，计算内存瓶颈、网络饱和度和调度限制。 | 使用模拟器 · 仓库指南 |

| 💼 StaffML | Physics-grounded interview questions for ML systems roles. Vault, practice drills, mock interviews, and progress tracking. | Practice · Repo guide |
| 💼 StaffML | 针对机器学习系统岗位的物理基础面试题。包含题库、练习、模拟面试和进度跟踪。 | 练习 · 仓库指南 |

---

### For Educators / 面向教育者

| Component | What It Provides | Link |
| :--- | :--- | :--- |
| 🎓 Instructor Hub | The AI Engineering Blueprint: two 16-week syllabi, pedagogy guide, assessment rubrics, and a TA handbook. | View hub · Repo guide |
| 🎓 教师中心 | AI 工程蓝图：包含两份 16 周的教学大纲、教学法指南、评估标准和助教手册。 | 查看中心 · 仓库指南 |

| 🎬 Lecture Slides | Beamer slide decks for every chapter, with four theme variants. Drop into your course and teach. | Browse decks · Repo guide |
| 🎬 讲座幻灯片 | 每一章的 Beamer 幻灯片，提供四种主题变体。可直接用于你的课程教学。 | 浏览幻灯片 · 仓库指南 |

| 📬 Newsletter | Updates on the curriculum, new chapters, and what the community is building. | Subscribe |
| 📬 通讯 | 关于课程更新、新章节以及社区建设动态的推送。 | 订阅 |

---

### Choose Your Path / 选择你的路径

The pieces are designed to work together, but you do not need to adopt everything at once.
这些组件旨在协同工作，但你无需一次性采用所有内容。

| If you are... | Start here | Then go deeper |
| :--- | :--- | :--- |
| A student or self-learner | Read Volume I and try Lab 00 | Build TinyTorch, use MLSys·im, and practice with StaffML |
| 如果你是... | 从这里开始 | 然后深入学习 |
| 学生或自学者 | 阅读第一卷并尝试实验 00 | 构建 TinyTorch，使用 MLSys·im，并使用 StaffML 练习 |

| An instructor | Open The AI Engineering Blueprint | Use the course map, slides, rubrics, and TA guide |
| 教育者 | 打开 AI 工程蓝图 | 使用课程地图、幻灯片、评估标准和助教指南 |

| A contributor | Pick the component you use most | Improve chapters, labs, tests, examples, hardware notes, simulator models, or assessment content |
| 贡献者 | 选择你最常用的组件 | 改进章节、实验、测试、示例、硬件说明、模拟器模型或评估内容 |

The learning loop is: Read → Explore → Build → Model → Deploy → Practice → Teach.
学习循环是：阅读 → 探索 → 构建 → 建模 → 部署 → 练习 → 教学。

### What You Will Learn / 你将学到什么

This textbook teaches you to think at the intersection of machine learning and systems engineering. Each chapter bridges algorithmic concepts with the infrastructure that makes them work in practice.
本教材教你如何在机器学习与系统工程的交叉点进行思考。每一章都将算法概念与使其在实践中发挥作用的基础设施联系起来。

| You know... | You will learn... |
| :--- | :--- |
| How to train a model | How training scales across GPU clusters |
| 你知道... | 你将学到... |
| 如何训练模型 | 训练如何在 GPU 集群上扩展 |

| That quantization shrinks models | How INT8 math maps to silicon |
| 量化可以压缩模型 | INT8 数学运算如何映射到硅片（硬件） |

| What a transformer is | Why KV-cache dominates memory at inference |
| 什么是 Transformer | 为什么 KV-cache 在推理时占据内存主导地位 |

| Models run on GPUs | How schedulers balance latency vs throughput |
| 模型在 GPU 上运行 | 调度器如何平衡延迟与吞吐量 |

| Edge devices have limits | How to co-design models and hardware |
| 边缘设备有局限性 | 如何进行模型与硬件的协同设计 |

### Book Structure / 书籍结构

The textbook follows the Hennessy & Patterson pedagogical model across two volumes:
本教材遵循 Hennessy & Patterson 的教学模型，分为两卷：

| Volume | Theme | Scope |
| :--- | :--- | :--- |
| 📗 Volume I | Build, Optimize, Deploy | Single-machine ML systems (1–8 GPUs). Foundations, optimization, and deployment on one node. |
| 📗 第一卷 | 构建、优化、部署 | 单机机器学习系统（1-8 个 GPU）。单节点上的基础知识、优化和部署。 |

| 📘 Volume II | Scale, Distribute, Govern | Distributed systems at production scale. Multi-machine infrastructure, fault tolerance, and governance. |
| 📘 第二卷 | 扩展、分发、治理 | 生产规模的分布式系统。多机基础设施、容错和治理。 |