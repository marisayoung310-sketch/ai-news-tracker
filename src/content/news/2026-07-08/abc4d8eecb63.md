---
title: "Identifying Microbes in Space"
originalUrl: "https://towardsdatascience.com/space-mould/"
date: "2026-07-07T22:41:49.858Z"
---

# Identifying Microbes in Space
# 太空中的微生物鉴定

**What's living on the International Space Station?**
**国际空间站里住着什么？**

Astronauts have been living in the International Space Station for over a quarter of a century. As the old tomato at the back of your fridge will tell you, that’s plenty of time to start growing mould. What microbes are tough enough to survive on the International Space Station with stellar radiation and no gravity? We can find the answer using metagenomics.
宇航员在国际空间站生活已经超过四分之一个世纪了。正如你冰箱角落里那颗放久了的番茄所揭示的那样，这足够让霉菌生长了。在恒星辐射和失重环境下，有哪些微生物足够强韧，能在国际空间站生存下来？我们可以利用宏基因组学找到答案。

Let’s walk through how to find out what’s living on the International Space Station. You take your unlabelled DNA sequence and try to find a very similar sequence from a known species, which is very similar to searching for similar documents or web pages. As such biologists have built on the ideas of locality sensitive hashing to identify species. Here I’ll go through the code, discuss the results (including a surprisingly tasty find), and describe the algorithm used to identify species. Once you understand these techniques you can go and find out what mould is living anywhere in the solar system!
让我们来看看如何找出国际空间站里住着什么。你获取一段未标记的 DNA 序列，并尝试从已知物种中找到非常相似的序列，这与搜索相似文档或网页非常相似。因此，生物学家借鉴了局部敏感哈希（Locality Sensitive Hashing）的思想来鉴定物种。在这里，我将演示代码，讨论结果（包括一个令人惊喜的美味发现），并描述用于鉴定物种的算法。一旦你掌握了这些技术，你就可以去找出太阳系任何地方生长的霉菌了！

In metagenomics, rather than studying the DNA of just one organism, you look at the DNA of all the different species in one place. This paper by Urbaniak et al. used metagenomics to study all the bacteria and fungi from 8 different locations around the International Space Station. We’ll focus on just one of their samples; they took a piece of cloth (sterile, scientific cloth) and wiped it on the dining table, extracted all the DNA from that cloth, and sequenced it. Because this was a metagenomic study, the sampling method captures DNA from anything that might be living on the table. Crucially, in metagenomics you do not need to know what’s there before you can look at its DNA.
在宏基因组学中，我们研究的不是单一生物的 DNA，而是同一地点所有不同物种的 DNA。Urbaniak 等人的这篇论文利用宏基因组学研究了国际空间站周围 8 个不同地点的所有细菌和真菌。我们将重点关注其中一个样本：他们用一块布（无菌的科学实验布）擦拭了餐桌，提取了布上的所有 DNA 并进行了测序。由于这是一项宏基因组研究，这种采样方法可以捕获桌面上可能生存的任何生物的 DNA。至关重要的是，在宏基因组学中，你不需要预先知道那里有什么，就可以直接观察其 DNA。

### Analysing the DNA
### 分析 DNA

Urbaniak et al. made their sequencing data available from the Sequence Read Archive under a creative commons zero licence. I downloaded sample F4_S5_P from the European Nucleotide Archive because it’s easier to work with. If you’d like to choose a different sample you can see all the details on where they’re from around the station on NASA’s website.
Urbaniak 等人根据知识共享零协议（CC0）在序列读取存档（Sequence Read Archive）中公开了他们的测序数据。我从欧洲核苷酸档案库（European Nucleotide Archive）下载了 F4_S5_P 样本，因为它更容易处理。如果你想选择其他样本，可以在 NASA 网站上查看它们在空间站周围来源的所有详细信息。

In raw reads, some sequences may be full of errors, have adapter sequences, or be too short to be useful. So before we analyse them we can trim and filter the reads to get rid of any low quality reads or sections of reads. I’m using fastp because it’s quick and automatically detects adapters.
在原始读取数据中，有些序列可能充满错误、包含接头序列，或者太短而没有用处。因此，在分析之前，我们可以对读取数据进行修剪和过滤，以去除任何低质量的读取或片段。我使用的是 fastp，因为它速度快且能自动检测接头。

Now that we have high quality DNA sequences from a dinner table in space, it’s time to find out what was living up there. kraken2 is a very fast and widely used metagenomics tool for identifying what species a DNA sequence is from. kraken2 is much faster than BLAST, another tool you may have heard of. BLAST is very good if you have 10s or even 100s of sequences to identify, but just for our one sample we have >75,000 pairs of reads! And this is a small read set, it’s not uncommon for modern sequencing runs to have millions of reads. With all these reads we need something very fast, like kraken2.
现在我们有了来自太空餐桌的高质量 DNA 序列，是时候找出上面住着什么了。kraken2 是一款非常快速且广泛使用的宏基因组工具，用于鉴定 DNA 序列所属的物种。kraken2 比你可能听说过的另一种工具 BLAST 快得多。如果你只有几十甚至几百条序列需要鉴定，BLAST 非常好用，但仅我们这一个样本就有超过 75,000 对读取数据！而且这还是一个很小的读取集，现代测序运行中拥有数百万条读取数据并不罕见。面对如此多的数据，我们需要像 kraken2 这样非常快速的工具。

Why is kraken2 so much faster than BLAST? BLAST is doing alignment, lining up your sequence against possible matches and accounting for differences between them. That way, even if your sequence doesn’t exactly match another similar sequence, BLAST still knows exactly how they’re similar and how they’re different. This can be very useful information, but it is quite slow.
为什么 kraken2 比 BLAST 快这么多？BLAST 进行的是比对（alignment），将你的序列与可能的匹配项对齐，并计算它们之间的差异。这样，即使你的序列与另一个相似序列不完全匹配，BLAST 仍然能准确知道它们在哪些方面相似，在哪些方面不同。这虽然是非常有用的信息，但速度相当慢。

In kraken2 we get a big speed boost by only looking for exact matches. We don’t try and match the whole sequence all at once, instead we break it up into shorter pieces of length k called k-mers. k-mers don’t count as matching unless they are exactly the same, but if sequences are similar some of the multiple k-mers do match exactly and we get a hit.
在 kraken2 中，我们通过只寻找精确匹配来获得巨大的速度提升。我们不会试图一次性匹配整个序列，而是将其分解为长度为 k 的较短片段，称为 k-mers。除非完全相同，否则 k-mers 不会被视为匹配，但如果序列相似，多个 k-mers 中的一部分会精确匹配，从而产生命中结果。

An important point to keep in mind is that kraken2 is comparing your sequences to a database. This means you can only identify the correct species, if it is in your database. If the species your DNA comes from is not in the database, you may get no answer or a false match against another closely related species. Ben Langmead, one of the developers of kraken2, makes several databases available on this website. I selected a database with fungi as well as bacteria, and to make things faster I chose one capped at 8GB, the PlusPF-8 database. Once I had downloaded and extracted the database I ran kraken2 for paired reads, with the --memory-mapping setting to make it easier on my laptop.
需要记住的一点是，kraken2 是将你的序列与数据库进行比较。这意味着只有当物种存在于你的数据库中时，你才能鉴定出正确的物种。如果你的 DNA 所属物种不在数据库中，你可能得不到答案，或者会错误地匹配到另一个亲缘关系相近的物种。kraken2 的开发者之一 Ben Langmead 在这个网站上提供了几个数据库。我选择了一个包含真菌和细菌的数据库，为了加快速度，我选择了上限为 8GB 的 PlusPF-8 数据库。下载并解压数据库后，我运行了 kraken2 进行配对读取分析，并使用了 --memory-mapping 设置，以便在我的笔记本电脑上运行得更顺畅。