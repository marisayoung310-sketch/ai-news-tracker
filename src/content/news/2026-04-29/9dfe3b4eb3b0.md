---
title: "Modernizing the Facebook Groups Search to Unlock the Power of Community Knowledge"
originalUrl: "https://engineering.fb.com/2026/04/21/ml-applications/modernizing-the-facebook-groups-search-to-unlock-the-power-of-community-knowledge/"
date: "2026-04-29T06:54:45.635Z"
---

# Modernizing the Facebook Groups Search to Unlock the Power of Community Knowledge
# 现代化 Facebook 群组搜索，释放社区知识的力量

By Shubhojeet Sarkar, Shengbo Guo, Guohao Zhang, Woon Jo, Laura Vig
作者：Shubhojeet Sarkar, Shengbo Guo, Guohao Zhang, Woon Jo, Laura Vig

We’ve fundamentally transformed Facebook Groups Search to help people more reliably discover, sort through, and validate community content that’s most relevant to them. We’ve adopted a new hybrid retrieval architecture and implemented automated model-based evaluation to address the major friction points people experience when searching community content. Under this new framework, we’ve made tangible improvements in search engagement and relevance, with no increase in error rates.
我们从根本上改造了 Facebook 群组搜索，旨在帮助用户更可靠地发现、筛选并验证与他们最相关的社区内容。我们采用了全新的混合检索架构，并实施了基于模型的自动化评估，以解决用户在搜索社区内容时遇到的主要痛点。在这一新框架下，我们在搜索参与度和相关性方面取得了显著提升，且错误率并未增加。

People around the world rely on Facebook Groups every day to discover valuable information. The user journey is not always easy due to the amount of information available. As we help connect people across shared interests, it’s also important to engineer a path through the vast array of conversations to surface as precisely as possible the content a person is looking for. We published a paper that discusses how we address this by re-architecting Facebook Group Scoped Search. By moving beyond traditional keyword matching to a hybrid retrieval architecture and implementing automated model-based evaluation, we are fundamentally innovating how people discover, consume, and validate community content.
世界各地的用户每天都依赖 Facebook 群组来获取有价值的信息。由于信息量巨大，用户的搜索过程并不总是顺畅的。在帮助人们基于共同兴趣建立联系的同时，设计一条能够穿透海量对话、尽可能精准地呈现用户所需内容的路径也至关重要。我们发表了一篇论文，探讨了如何通过重构 Facebook 群组范围搜索（Group Scoped Search）来解决这一问题。通过从传统的关键词匹配转向混合检索架构，并实施基于模型的自动化评估，我们正在从根本上革新人们发现、消费和验证社区内容的方式。

### Addressing the Friction Points in Community Knowledge
### 解决社区知识获取中的痛点

People struggle with three friction points when searching for answers in community content – discovery, consumption, and validation.
在社区内容中搜索答案时，人们通常会遇到三个痛点：发现、消费和验证。

**Discovery: Lost in Translation**
**发现：语言转换的障碍**

Historically, discovery has relied on keyword-based (lexical) systems. These systems look for exact words, creating a gap between a person’s natural language intent and the available content. For example, consider a person searching for “small individual cakes with frosting.” A traditional keyword system might return zero results if the community uses the word “cupcakes” instead. As the specific phrasing doesn’t match, that person misses out on highly relevant advice. We needed a system where searching for an “Italian coffee drink” effectively matches a post about “cappuccino,” even if the word “coffee” is never explicitly stated.
从历史上看，发现功能一直依赖于基于关键词（词汇）的系统。这些系统寻找精确匹配的词汇，导致用户的自然语言意图与现有内容之间存在鸿沟。例如，假设有人搜索“带糖霜的小蛋糕（small individual cakes with frosting）”。如果社区使用的是“纸杯蛋糕（cupcakes）”一词，传统的关键词系统可能返回零结果。由于具体措辞不匹配，用户会错过高度相关的建议。我们需要一个系统，使得搜索“意大利咖啡饮品”时，即使文中从未明确提到“咖啡”一词，也能有效地匹配到关于“卡布奇诺”的帖子。

**Consumption: The Effort Tax**
**消费：努力成本（Effort Tax）**

Even when people find the right content, they face an “effort tax.” They often have to scroll and sort through many comments before finding consensus. Imagine someone searching for “tips for taking care of snake plants.” To get a clear answer, they have to read dozens of comments to piece together a watering schedule.
即使人们找到了正确的内容，他们仍面临“努力成本”。他们往往需要滚动并筛选大量评论才能找到共识。想象一下有人搜索“虎皮兰养护技巧”。为了得到明确的答案，他们必须阅读数十条评论，才能拼凑出浇水时间表。

**Validation: Decision Making with Community Knowledge**
**验证：利用社区知识进行决策**

People often need to verify a decision or validate a potential purchase using trusted community expertise. For instance, consider a shopper on Facebook Marketplace viewing a listing for a high-value item, such as a vintage Corvette. They want authentic opinions and advice about the product before purchasing, but that wisdom is typically trapped in scattered group discussions. The person needs to unlock the collective wisdom of specialized groups to evaluate the product effectively, but digging for these validation signals manually is not easy.
人们经常需要利用值得信赖的社区专业知识来核实决策或验证潜在的购买行为。例如，考虑一位在 Facebook Marketplace 上查看高价值商品（如复古科尔维特跑车）的买家。他们在购买前希望获得关于产品的真实意见和建议，但这些智慧通常被困在分散的群组讨论中。用户需要解锁专业群组的集体智慧来有效评估产品，但手动挖掘这些验证信号并不容易。

A person searches for “tips for taking care of snake plants,” needing trusted instructional advice. A discussion in the Groups module powered by the modernized hybrid retrieval architecture highlights key tips and community favorites.
用户搜索“虎皮兰养护技巧”，需要可信的指导建议。由现代化混合检索架构驱动的群组模块中的讨论，会突出显示关键技巧和社区推荐内容。

### The Solution: A Modernized Hybrid Retrieval Architecture
### 解决方案：现代化的混合检索架构

We engineered a hybrid retrieval architecture that powers a discussions module on Facebook Search. This system runs parallel pipelines to blend the precision of inverted indices with the conceptual understanding of dense vector representations. We addressed the limitations of legacy search by restructuring three important components of our infrastructure. The following workflow illustrates how we modernize the stack to process natural language intent:
我们设计了一种混合检索架构，为 Facebook 搜索中的讨论模块提供支持。该系统运行并行流水线，将倒排索引的精确性与密集向量表示的概念理解能力相结合。我们通过重构基础设施的三个重要组件，解决了传统搜索的局限性。以下工作流程展示了我们如何通过现代化技术栈来处理自然语言意图：

**Parallel Retrieval Strategy**
**并行检索策略**

We modernized the retrieval stage by decoupling the query processing into two parallel pathways, ensuring we capture both exact terms and broad concepts:
我们通过将查询处理解耦为两条并行路径，实现了检索阶段的现代化，确保既能捕捉精确术语，又能捕捉广泛概念：

*   **Query Preprocessing:** Before retrieval, user queries undergo tokenization, normalization, and rewriting. This is important for ensuring clean inputs for both the inverted index and the embedding model.
    **查询预处理：** 在检索之前，用户查询会经过分词、归一化和重写。这对于确保倒排索引和嵌入模型获得干净的输入至关重要。
*   **The Lexical Path (Unicorn):** We utilize Facebook’s Unicorn inverted index to fetch posts containing exact or closely matched terms. This ensures high precision for queries involving proper nouns or specific quotes.
    **词汇路径（Unicorn）：** 我们利用 Facebook 的 Unicorn 倒排索引来获取包含精确或紧密匹配术语的帖子。这确保了涉及专有名词或特定引用的查询具有高精确度。
*   **Simultaneously, the query is passed to our search semantic retriever (SSR).** This is a 12-layer, 200-million-parameter model that encodes the user’s natural language input into a dense vector representation. We then perform an approximate nearest neighbor (ANN) search over a precomputed Faiss vector index of group posts. This enables the retrieval of content based on high-dimensional conceptual similarity, regardless of keyword overlap.
    **同时，查询会被传递给我们的搜索语义检索器（SSR）。** 这是一个拥有 12 层、2 亿参数的模型，它将用户的自然语言输入编码为密集向量表示。然后，我们对预先计算好的群组帖子 Faiss 向量索引执行近似最近邻（ANN）搜索。这使得系统能够基于高维概念相似度检索内容，而无需依赖关键词重叠。

**L2 Ranking With Multi-Task Multi-Label (MTML) Architecture**
**基于多任务多标签（MTML）架构的 L2 排序**

Merging results from two fundamentally different paradigms — sparse lexical features and dense semantic features — required a sophisticated ranking strategy. The candidates retrieved from both the keyword and embedding systems are merged in the ranking stage. Here, the model ingests lexical features (like TF-IDF and BM25 scores) alongside semantic features (cosine similarity scores). Next, we moved away from single-objective models to a MTML supermodel architecture. This allows the system to jointly optimize for multiple engagement objectives — specifically clicks, shares, and comments — while maintaining plug-and-play modularity. By weighting these signals, the model ensures that the results we surface are not just theoretically relevant, but also likely to generate meaningful community interaction.
合并来自两种截然不同范式（稀疏词汇特征和密集语义特征）的结果，需要复杂的排序策略。从关键词系统和嵌入系统检索到的候选结果在排序阶段进行合并。在此，模型不仅摄取词汇特征（如 TF-IDF 和 BM25 分数），还摄取语义特征（余弦相似度分数）。接下来，我们从单目标模型转向了 MTML 超模型架构。这使得系统能够在保持即插即用模块化的同时，联合优化多个参与度目标——特别是点击、分享和评论。通过对这些信号进行加权，模型确保了我们呈现的结果不仅在理论上相关，而且很可能产生有意义的社区互动。

**Automated Offline Evaluation**
**自动化离线评估**

Deploying semantic search introduces a validation challenge: Similarity scores are not always intuitive in high-dimensional vector space. To validate quality at scale without the bottleneck of human labeling, we integrated an automated evaluation...
部署语义搜索带来了一个验证挑战：在高维向量空间中，相似度分数并不总是直观的。为了在不依赖人工标注这一瓶颈的情况下大规模验证质量，我们集成了一套自动化评估……