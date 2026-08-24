---
title: "Can AI Write Your Code?"
originalUrl: "https://towardsdatascience.com/can-ai-write-your-code/"
date: "2026-05-27T00:33:50.203Z"
---

# Can AI Write Your Code?
# AI 能帮你写代码吗？

**Artificial Intelligence: Can AI Write Your Code? What a recent study on ChatGPT, Python, R, and Stata tells us about AI-assisted coding for causal inference.**
**人工智能：AI 能帮你写代码吗？一项关于 ChatGPT、Python、R 和 Stata 的最新研究，揭示了 AI 辅助因果推断编程的现状。**

What if the real question is no longer whether AI can write code, but whether we can trust the code it writes? Over the past few years, ChatGPT and other large language models have become increasingly common in the daily workflow of students, analysts, researchers, and data scientists. Many of us have already used AI tools to generate a Python function, debug an error message, automate a repetitive task, or quickly translate code from one language to another.
如果真正的问题不再是“AI 是否能写代码”，而是“我们能否信任它写出的代码”，那会怎样？在过去几年里，ChatGPT 和其他大语言模型已逐渐成为学生、分析师、研究人员和数据科学家日常工作流程中的常客。我们许多人已经使用过 AI 工具来生成 Python 函数、调试错误信息、自动化重复性任务，或快速将代码从一种语言翻译成另一种语言。

But there is a major difference between asking ChatGPT to write a small helper function and asking it to implement a complex econometric method. Can ChatGPT correctly code a Difference-in-Differences model? Can it implement Inverse Probability Treatment Weighting? Can it reproduce a Regression Discontinuity analysis? Can it do this not only in Python, but also in R and Stata?
但要求 ChatGPT 编写一个小型辅助函数，与要求它实现复杂的计量经济学方法之间，存在着巨大的差异。ChatGPT 能正确编写“双重差分法”（Difference-in-Differences）模型吗？它能实现“逆概率加权”（IPTW）吗？它能复现“断点回归”（Regression Discontinuity）分析吗？而且，它不仅能在 Python 中做到，还能在 R 和 Stata 中做到吗？

That is why the article “Can AI write your code? A case study of ChatGPT’s statistical coding capabilities for quantitative research” by Winberg et al. immediately caught my attention. The paper was published online on January 22, 2026, in *Health Economics Review*. The authors evaluate ChatGPT-4.0 Pro’s ability to generate code for causal inference tasks in Python, R, and Stata, using benchmark solutions from *Causal Inference: The Mixtape* by Scott Cunningham.
正因如此，Winberg 等人撰写的文章《AI 能帮你写代码吗？ChatGPT 定量研究统计编程能力的案例研究》立刻引起了我的注意。该论文于 2026 年 1 月 22 日在线发表在《卫生经济学评论》（*Health Economics Review*）上。作者使用 Scott Cunningham 所著《因果推断：混音带》（*Causal Inference: The Mixtape*）中的基准解决方案，评估了 ChatGPT-4.0 Pro 在 Python、R 和 Stata 中生成因果推断任务代码的能力。

Most articles I had previously read on this topic focused on relatively simple programming tasks: small automations, descriptive statistics, data cleaning, basic data analysis, or code generation in languages such as Python, R, and SAS. This study goes further. It asks whether ChatGPT can support quantitative research in more demanding settings, where the code is not just technical but also methodological.
我之前读过的大多数关于该主题的文章，都集中在相对简单的编程任务上：小型自动化、描述性统计、数据清洗、基础数据分析，或是在 Python、R 和 SAS 等语言中生成代码。而这项研究更进一步。它探讨了 ChatGPT 是否能在要求更高的环境下支持定量研究，即代码不仅涉及技术实现，还涉及方法论层面。

The authors focus on three widely used causal inference methods: Difference-in-Differences, also called Diff-in-Diff; Inverse Probability Treatment Weighting, or IPTW; Regression Discontinuity, or RD. In this article, I will walk through the study in a structured way. First, we will present what makes this study different for quantitative researchers. Second, we will review the methodology used by the authors. Third, we will look at how ChatGPT’s performance was evaluated. Finally, we will discuss how the Rise of LLMs Has Changed in My Own Way of Working.
作者重点关注了三种广泛使用的因果推断方法：双重差分法（Diff-in-Diff）、逆概率加权（IPTW）以及断点回归（RD）。在本文中，我将以结构化的方式带大家深入了解这项研究。首先，我们将介绍这项研究对定量研究人员而言有何不同之处；其次，我们将回顾作者所采用的方法论；第三，我们将探讨 ChatGPT 的表现是如何被评估的；最后，我们将讨论大语言模型的兴起如何改变了我个人的工作方式。

### What Makes This Study Different?
### 这项研究有何不同？

Many previous studies have evaluated ChatGPT’s coding ability using subjective assessment. In other words, researchers looked at the generated code and judged whether it seemed correct. That approach is useful, but it has a limitation: it depends heavily on the evaluator’s judgment. Winberg et al. take a more structured approach. They compare ChatGPT-generated code against standardized reference code and benchmark outputs from *Causal Inference: The Mixtape*. This allows them to evaluate the code not only based on appearance, but also based on whether it reproduces expected results.
以往许多研究通过主观评估来评价 ChatGPT 的编程能力。换句话说，研究人员查看生成的代码并判断其看起来是否正确。这种方法虽然有用，但存在局限性：它在很大程度上依赖于评估者的主观判断。Winberg 等人采取了一种更结构化的方法。他们将 ChatGPT 生成的代码与《因果推断：混音带》中的标准化参考代码和基准输出进行了对比。这使得他们不仅能从外观上评估代码，还能根据其是否能复现预期结果来进行评估。

Another important contribution is that the study includes Stata. This matters because many empirical researchers, especially in economics, public policy, and health economics, still use Stata extensively. However, discussions about AI coding assistants often focus mainly on Python and R. By including Stata, the authors evaluate ChatGPT in a language that is highly relevant for applied econometric research but less frequently analyzed in AI coding studies.
另一个重要的贡献是该研究纳入了 Stata。这一点很重要，因为许多实证研究人员，特别是在经济学、公共政策和卫生经济学领域，仍然广泛使用 Stata。然而，关于 AI 编程助手的讨论往往主要集中在 Python 和 R 上。通过纳入 Stata，作者评估了 ChatGPT 在一种对应用计量经济学研究高度相关、但在 AI 编程研究中却较少被分析的语言中的表现。

### The Methodology Used in the Study
### 研究中使用的方法论

The authors evaluate ChatGPT-4.0 Pro, the paid version of ChatGPT available at the time of the study. Their goal is to measure how well it performs when asked to code causal inference analyses in Python, R, and Stata. They use publicly available data and problem sets from *Causal Inference: The Mixtape*. This textbook is widely known in applied econometrics and provides examples with code in R, Stata, and Python. According to the study, the reference environments were R 3.6.0, Stata 18, and Python 3.13.
作者评估的是研究时可用的付费版本 ChatGPT-4.0 Pro。他们的目标是衡量当被要求用 Python、R 和 Stata 编写因果推断分析代码时，它的表现如何。他们使用了《因果推断：混音带》中公开的数据和习题集。这本教科书在应用计量经济学领域广为人知，并提供了 R、Stata 和 Python 的代码示例。根据研究，参考环境分别为 R 3.6.0、Stata 18 和 Python 3.13。

The authors focus on three causal inference methods: Difference-in-Differences; Inverse Probability Treatment Weighting; Regression Discontinuity. These methods were chosen because they are commonly used in empirical research and require more than simple syntax generation. They require proper data preparation, model specification, and interpretation of outputs. The study follows a three-step process.
作者重点关注了三种因果推断方法：双重差分法、逆概率加权和断点回归。选择这些方法是因为它们在实证研究中很常用，且不仅仅需要简单的语法生成，还需要正确的数据准备、模型设定以及对输出结果的解读。该研究遵循一个三步走的过程。

### Prompting ChatGPT With Econometric Problem Sets
### 用计量经济学习题集提示 ChatGPT

The first step is to give ChatGPT problem sets and ask it to generate code for the relevant econometric analyses. For example, one of the problem sets focuses on Difference-in-Differences. The context is the legalization of abortion in five U.S. states before the nationwide legalization following Roe v. Wade in 1973. The task is to estimate whether early abortion legalization affected gonorrhea incidence among adolescent females aged 15–19. Instead of using only a simple post-treatment indicator, the prompt asks ChatGPT to use year-by-treatment interactions to capture dynamic treatment effects over time. This type of prompt is more complex than asking for a basic regression. It requires the model to understand the policy context, identify the treatment indicator, structure the interaction terms, and generate appropriate code. The authors define similar problem sets for IPTW and RD.
第一步是向 ChatGPT 提供习题集，并要求它为相关的计量经济学分析生成代码。例如，其中一个习题集关注的是双重差分法。背景是 1973 年“罗诉韦德案”全国合法化之前，美国五个州堕胎合法化的情况。任务是评估早期堕胎合法化是否影响了 15-19 岁女性青少年的淋病发病率。提示词没有仅使用简单的处理后指标，而是要求 ChatGPT 使用“年份与处理”的交互项来捕捉随时间变化的动态处理效应。这种类型的提示词比要求进行基础回归要复杂得多。它要求模型理解政策背景、识别处理指标、构建交互项并生成适当的代码。作者为 IPTW 和 RD 定义了类似的习题集。

### Asking for Complete Coding Workflows
### 要求完整的编程工作流

In the second step, the authors provide more comprehensive prompts. These prompts ask ChatGPT to reproduce fuller coding tasks from *The Mixtape*, including data management, econometric analysis, and figure generation. This is important because real research workflows are rarely limited to one model command. A researcher usually has to import data, clean variables, create indicators, estimate models, generate tables, produce plots, and compare results. By testing complete workflows,
在第二步中，作者提供了更全面的提示词。这些提示词要求 ChatGPT 复现《混音带》中更完整的工作任务，包括数据管理、计量经济学分析和图表生成。这一点很重要，因为真实的研究工作流很少局限于某一个模型命令。研究人员通常需要导入数据、清洗变量、创建指标、估计模型、生成表格、制作图表并比较结果。通过测试完整的工作流，