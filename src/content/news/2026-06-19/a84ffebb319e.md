---
title: "Beyond LoRA: Can you beat the most popular fine-tuning technique?"
originalUrl: "https://huggingface.co/blog/peft-beyond-lora"
date: "2026-06-18T23:15:50.169Z"
---

# Beyond LoRA: Can you beat the most popular fine-tuning technique?
# 超越 LoRA：你能打败最流行的微调技术吗？

When you plan to fine-tune a model in a parameter-efficient way, think beyond LoRA. If you want to fine-tune an open model on your own data, you are probably interested in so-called parameter-efficient fine-tuning, in short PEFT. This term describes techniques that significantly reduce the memory requirement to fine-tune a model. Although there are dozens of these techniques, almost everyone chooses one called “LoRA”. In this blog post, we explore whether LoRA is really the best choice, what tools are available to make an informed decision, and how you can benefit from extending your horizon beyond LoRA.

当你计划以参数高效的方式微调模型时，请跳出 LoRA 的思维定式。如果你想在自己的数据上微调一个开源模型，你可能对所谓的“参数高效微调”（Parameter-Efficient Fine-Tuning，简称 PEFT）感兴趣。该术语描述的是那些能显著降低模型微调内存需求的技术。尽管这类技术有数十种，但几乎每个人都选择了名为“LoRA”的技术。在这篇博文中，我们将探讨 LoRA 是否真的是最佳选择，有哪些工具可以帮助你做出明智的决策，以及如何通过拓宽视野超越 LoRA 来获益。

### What is PEFT and when do you need it
### 什么是 PEFT，你何时需要它？

There are countless open models available, but they often aren't quite good enough for your use case. Prompting may help, but it usually isn't enough. Rather than training a new model from scratch, you should consider fine-tuning an existing one. Fine-tuning, however, is memory-hungry: you generally need enough memory to fit the whole model several times over. Quantization reduces a model's memory footprint, but quantized models can't be fine-tuned directly. So a set of techniques emerged to cut the memory needed for fine-tuning, called "parameter-efficient fine-tuning", or PEFT.

市面上有无数的开源模型，但它们往往无法完全满足你的特定需求。提示词工程（Prompting）或许有帮助，但通常是不够的。与其从头开始训练一个新模型，不如考虑微调现有的模型。然而，微调非常消耗内存：你通常需要足够的内存来容纳整个模型的好几倍。量化可以减少模型的内存占用，但量化后的模型无法直接进行微调。因此，一套旨在减少微调所需内存的技术应运而生，即“参数高效微调”（PEFT）。

With PEFT, you can fine-tune a model using only a fraction of that memory and even fine-tune quantized models. It offers other advantages, such as tiny checkpoint sizes, greater resistance to catastrophic forgetting, and the ability to serve multiple fine-tunes from the same base model. At Hugging Face, we develop the PEFT library, which implements many PEFT techniques behind a unified API and integrates well with the ecosystem, for example Transformers and Diffusers. It also supports multiple quantization methods, enabling further accessibility in parameter-efficient fine-tuning. PEFT provides a good starting point, whether you want to fine-tune on your own data or you're researching a new PEFT method.

通过 PEFT，你只需使用一小部分内存即可微调模型，甚至可以微调量化模型。它还提供了其他优势，例如极小的检查点（checkpoint）体积、更强的抗灾难性遗忘能力，以及能够基于同一个基础模型提供多个微调版本的服务。在 Hugging Face，我们开发了 PEFT 库，它在统一的 API 下实现了许多 PEFT 技术，并与生态系统（如 Transformers 和 Diffusers）良好集成。它还支持多种量化方法，进一步降低了参数高效微调的门槛。无论你是想在自己的数据上进行微调，还是正在研究一种新的 PEFT 方法，PEFT 都是一个很好的起点。

### LoRA: The queen of fine-tuning techniques 👑
### LoRA：微调技术中的女王 👑

One parameter-efficient fine-tuning technique that emerged early and proved to be quite effective is called “Low Rank Adaptation”, or short “LoRA”. It works by adding a handful of parameters on top of the base model, freezing the base model weights, and only training those few parameters. Among all PEFT techniques, LoRA is by far the most popular. Here are a few estimates: Of a sample of 20,834 model cards on Hugging Face Hub that mention exactly one PEFT technique, 20,509 mention LoRA (98.4%). We checked which PEFT techniques are popular for image generation on an external site, too. Using a sample of 10,000 checkpoints, we found 7,111 to be LoRAs. The other identified PEFT techniques are LoCon (363) and DoRA (11, arguably a LoRA variant). That means 95.0% of PEFT checkpoints are LoRAs.

一种早期出现并被证明非常有效的参数高效微调技术被称为“低秩自适应”（Low Rank Adaptation），简称“LoRA”。它的工作原理是在基础模型之上添加少量参数，冻结基础模型的权重，并仅训练这些少量参数。在所有 PEFT 技术中，LoRA 无疑是最受欢迎的。以下是一些估算数据：在 Hugging Face Hub 上抽样的 20,834 个仅提及一种 PEFT 技术的模型卡中，有 20,509 个提到了 LoRA（占比 98.4%）。我们还在外部网站上检查了图像生成领域流行的 PEFT 技术。通过对 10,000 个检查点的抽样，我们发现其中 7,111 个是 LoRA。其他识别出的 PEFT 技术包括 LoCon（363 个）和 DoRA（11 个，可以说是 LoRA 的变体）。这意味着 95.0% 的 PEFT 检查点都是 LoRA。

Searching for the code snippet from peft import <PEFT CONFIG> on GitHub (example GH query), 71.3% of results are for LoRA. The runners-up are LoHa (3.7%) and AdaLoRA (3.5%). Although these estimates are not perfect, the conclusion is nonetheless that LoRA is almost certainly by far the most common PEFT technique. This could just mean that LoRA works best for everyone, and this fact is reflected in its usage statistics. There is, however, another possibility: LoRA was one of the earlier, popular PEFT techniques. So maybe its usage became self-reinforcing: LoRA has the highest visibility, the highest number of tutorials/examples, and it has the best support in downstream packages. Thus LoRA's popularity feeds on itself.

在 GitHub 上搜索代码片段 `from peft import <PEFT CONFIG>`（示例 GH 查询），71.3% 的结果指向 LoRA。紧随其后的是 LoHa（3.7%）和 AdaLoRA（3.5%）。尽管这些估算并不完美，但结论依然是：LoRA 几乎肯定是目前最常用的 PEFT 技术。这可能仅仅意味着 LoRA 对每个人来说效果最好，而这一事实反映在了使用统计数据中。然而，还有另一种可能性：LoRA 是较早流行的 PEFT 技术之一。因此，它的使用可能形成了一种自我强化：LoRA 拥有最高的可见度、最多的教程/示例，并且在下游软件包中拥有最好的支持。因此，LoRA 的流行度在不断自我滋养。

This all leads to the question: Are we all leaving performance on the table by shunning better techniques? After all, there are countless researchers whose papers claim their technique beats LoRA. Isn't that sufficient proof that we should go beyond LoRA in favor of newer techniques?

这一切引出了一个问题：我们是否因为排斥更好的技术而放弃了潜在的性能提升？毕竟，有无数研究人员在论文中声称他们的技术优于 LoRA。这难道不足以证明我们应该超越 LoRA，转而采用更新的技术吗？

### Choosing the right PEFT technique based on paper results is problematic
### 基于论文结果选择 PEFT 技术存在问题

There are dozens of papers that investigate fine-tuning techniques other than LoRA. Just in the PEFT library, there are more than 40 distinct PEFT techniques at the time of writing (and numerous more when counting variations of PEFT techniques). For almost all of them, you will find researchers claiming that their technique beats LoRA according to their benchmarks. The trouble with these claims is that researchers are under pressure to provide results that beat the existing benchmark. Even without ill intent, this can bias the results, e.g. by spending less time tuning the alternative techniques compared to the one proposed by the researchers.

有数十篇论文研究了除 LoRA 之外的微调技术。仅在 PEFT 库中，截至撰写本文时就有超过 40 种不同的 PEFT 技术（如果算上变体则更多）。对于几乎所有这些技术，你都会发现研究人员声称根据他们的基准测试，其技术优于 LoRA。这些声明的问题在于，研究人员面临着必须提供优于现有基准结果的压力。即使没有恶意，这也可能导致结果产生偏差，例如在调整替代技术时花费的时间比调整研究人员提出的技术时要少。

One study found, for instance, that LoRA can match supposedly better PEFT techniques by tuning the learning rate (https://arxiv.org/abs/2602.04998). Another complication is that each paper chooses a different set of PEFT techniques to compare to, and a different set of benchmarks to run. And even if the same technique is compared on the same benchmark, the code is often not available or not easy to run yourself, which makes results hard to reproduce. Overall, it's difficult to figure out the PEFT technique that works best for you by only checking paper results. Therefore, you might be tempted to just go with the default, LoRA.

例如，一项研究发现，通过调整学习率，LoRA 可以达到那些所谓的“更好”的 PEFT 技术的水平（https://arxiv.org/abs/2602.04998）。另一个复杂之处在于，每篇论文选择进行比较的 PEFT 技术组合不同，运行的基准测试也不同。即使在相同的基准测试中比较相同的技术，代码往往也无法获取或难以自行运行，这使得结果难以复现。总的来说，仅通过查看论文结果很难确定哪种 PEFT 技术最适合你。因此，你可能倾向于直接使用默认的 LoRA。

### How we approach benchmarking in PEFT
### 我们在 PEFT 中如何进行基准测试

At Hugging Face, we thought about how we can help users make informed decisions about which PEFT technique to use. With the PEFT library, we already provide a package that implements many PEFT techniques and exposes them with the same API. The next step is to provide benchmarks that can shed more light on the discussed issue. We already had a benchmark that checks fine-tuning of LLMs on a math dataset for some time. This benchmark takes an LLM and fine-tunes it on chain-of-thought reasoning to produce the result to a mathematical question using a...

在 Hugging Face，我们思考了如何帮助用户就使用哪种 PEFT 技术做出明智的决策。通过 PEFT 库，我们已经提供了一个实现了多种 PEFT 技术并以相同 API 暴露出来的软件包。下一步是提供能够进一步阐明上述问题的基准测试。我们已经有了一个针对大语言模型（LLM）在数学数据集上进行微调的基准测试。该基准测试采用一个 LLM，并对其进行思维链（chain-of-thought）推理微调，以得出数学问题的结果……