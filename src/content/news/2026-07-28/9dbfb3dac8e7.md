---
title: "What Uncle Bob's \"I Don't Read Code Anymore\" Taught Me About Testing"
originalUrl: "https://dev.to/sleyn/what-uncle-bobs-i-dont-read-code-anymore-taught-me-about-testing-38c2"
date: "2026-07-27T22:38:32.428Z"
---

# What Uncle Bob's "I Don't Read Code Anymore" Taught Me About Testing
# “鲍勃大叔”的“我不再阅读代码”教会了我什么关于测试的道理

I've come across a post by Uncle Bob on X (link) (the author of *Clean Code*) that has a couple thousand reposts. It states that he does not read code anymore. Yep, the same person who wrote a book saying your code should be easy to read because developers read code much more frequently than they write it.
我在 X 上看到了一篇“鲍勃大叔”（Uncle Bob，《代码整洁之道》的作者）发布的帖子，它获得了数千次转发。文中提到他不再阅读代码了。没错，就是那个写书说“代码应该易于阅读，因为开发者阅读代码的频率远高于编写代码”的同一个人。

So what is Uncle Bob's method? Instead of reading the code written by AI agents, he asks the agents to make tons of tests around this code. Of course some people agree and some do not agree. If you don't read the code, the meaning of your ownership becomes somewhat blurred. But if you read all the code, you lose most of the productivity.
那么鲍勃大叔的方法是什么呢？他不再阅读 AI 智能体编写的代码，而是要求智能体围绕这些代码编写大量的测试。当然，有人赞同，也有人反对。如果你不阅读代码，你对代码的“所有权”意义就会变得模糊；但如果你阅读所有代码，你又会失去大部分生产力。

I can't judge here or provide my "valuable" opinion. I decided to write this post (and I don't write much) because of a recurring topic that comes up here and there. A lot of discussion now is about validating AI. Of course, validation in biology and bioinformatics is not the same as validation in software engineering, but I feel there is some valuable overlap.
我无法在此做出评判，也无法提供什么“高见”。我决定写这篇文章（我平时很少写东西），是因为一个反复出现的话题。现在很多讨论都集中在如何验证 AI 上。当然，生物学和生物信息学中的验证与软件工程中的验证并不完全相同，但我认为两者之间存在一些有价值的重叠。

The thread and reposts mention different tests that programmers, including Uncle Bob, use to curb their agents. Diving in opened up a world of testing that turned out to be much bigger than I expected, as a bioinformatician.
该帖子及其转发内容提到了包括鲍勃大叔在内的程序员们用来约束 AI 智能体的各种测试方法。深入研究后，我发现测试的世界比我作为一名生物信息学家所预想的要广阔得多。

### Correctness
### 正确性

*   **Unit tests** – Check individual functions or small units of code in isolation. They check logic, error handling, and edge cases. The most well-known type of software test.
    **单元测试** – 在隔离状态下检查单个函数或小的代码单元。它们检查逻辑、错误处理和边界情况，是软件测试中最广为人知的一种。
*   **Integration tests** – Check that separate modules work correctly together (e.g., your API talking to the database).
    **集成测试** – 检查独立的模块是否能协同工作（例如，你的 API 与数据库的交互）。
*   **Functional tests** – Verify the software does what it's supposed to do from a black-box, requirements standpoint. You give the software input data and look at the output. For example, if you write a new SNV-calling pipeline, you input sequencing data against a reference and check whether the pipeline outputs known SNVs with the required sensitivity and specificity.
    **功能测试** – 从黑盒和需求的角度验证软件是否实现了预定功能。你向软件输入数据并观察输出。例如，如果你编写了一个新的 SNV（单核苷酸变异）调用流程，你会输入参考序列的测序数据，并检查该流程是否能以所需的灵敏度和特异性输出已知的 SNV。

Functional tests also have some common subtypes worth knowing:
功能测试还有一些值得了解的常见子类型：

*   **Smoke tests** – A quick check that the basic features work, e.g., running your software with default parameters.
    **冒烟测试** – 对基本功能进行快速检查，例如使用默认参数运行软件。
*   **Regression tests** – Check that a recent update did not break existing features.
    **回归测试** – 检查最近的更新是否破坏了现有功能。
*   **User Acceptance Testing (UAT)** – Checks whether real users confirm their needs are met. "Real users" can be community scientists downloading your tool from GitHub, or selected partners in an early-access or co-development program. Like the other categories here, UAT has its own sub-world: alpha testing, beta testing, validation of business value, validation that software meets contract criteria, and validation that regulatory requirements are met (GDPR, HIPAA, FDA). Note: despite the similar name, acceptance tests (below) are run by developers/QA, while UAT is run by real users in real-world use cases.
    **用户验收测试 (UAT)** – 检查真实用户是否确认其需求得到了满足。“真实用户”可以是下载你 GitHub 工具的社区科学家，也可以是早期访问或共同开发计划中的特定合作伙伴。与其他类别一样，UAT 也有自己的子领域：Alpha 测试、Beta 测试、业务价值验证、合同标准验证以及合规性验证（如 GDPR、HIPAA、FDA）。注意：尽管名称相似，但验收测试（见下文）由开发人员/QA 执行，而 UAT 则由真实用户在实际场景中执行。
*   **Acceptance tests / Gherkin tests** – Confirm a full feature satisfies the business requirement it was built for. Gherkin tests are written in a structured, human-readable format (Given/When/Then) so non-engineers can review intended behavior without reading code: Given describes the context, When describes the specific user action or event captured by the software, Then describes the expected outcome.
    **验收测试 / Gherkin 测试** – 确认完整功能是否满足其构建时的业务需求。Gherkin 测试以结构化、人类可读的格式（Given/When/Then）编写，因此非工程师无需阅读代码即可审查预期行为：Given 描述上下文，When 描述软件捕获的特定用户操作或事件，Then 描述预期结果。

### Truth-set / golden-dataset testing
### 真值集 / 黄金数据集测试

Not from Uncle Bob, but from my bioinformatics experience. In bioinformatics, and especially in clinical bioinformatics, it is hard to generate synthetic tests, for multiple reasons mostly related to what's happening in the wet lab. So, biology relies a lot on ground-truth samples. It's worth a separate post, but for NGS (my primary expertise) a good overview resource is the MDIC SRS Report: Somatic Variant Reference Samples for NGS. It's from 2019 and maybe a little outdated — it definitely has a lot of dead links — but I've worked with the described samples pretty recently. It describes several classes of reference material:
这并非来自鲍勃大叔，而是源于我的生物信息学经验。在生物信息学，尤其是临床生物信息学中，由于湿实验室的复杂性，很难生成合成测试数据。因此，生物学非常依赖“真值样本”。这值得单独写一篇文章，但对于 NGS（我的主要专业领域），MDIC SRS 报告《NGS 体细胞变异参考样本》是一个很好的概览资源。虽然它是 2019 年的，可能有点过时（确实有很多死链），但我最近还使用过其中描述的样本。它描述了几类参考材料：

*   **Synthetic DNA** – Synthetic DNA sequences with predefined genetic variants are added to highly characterized DNA.
    **合成 DNA** – 将具有预定义遗传变异的合成 DNA 序列添加到高度表征的 DNA 中。
*   **Genomic DNA** – DNA material with characterized variants.
    **基因组 DNA** – 具有已表征变异的 DNA 材料。
*   **Cell-free DNA** – DNA material extracted from blood samples.
    **无细胞 DNA** – 从血液样本中提取的 DNA 材料。
*   **Human cell lines** – Immortalized cell lines that have been extensively studied. Genome In A Bottle (GIAB) is probably the most famous, and can be used to assess your system on high-quality DNA.
    **人类细胞系** – 经过广泛研究的永生化细胞系。“瓶中基因组”（GIAB）可能是最著名的，可用于评估你的系统在高质量 DNA 上的表现。
*   **Tissue / Formalin-fixed paraffin-embedded (FFPE)** – A lot of clinical samples are preserved as FFPE, mainly for histological reasons. However, for NGS, the FFPE sample preparation process is highly deleterious, resulting in highly fragmented, damaged DNA. But due to the clinical importance of FFPE, a lot of bioinformatics NGS workflows should be tested on FFPE samples.
    **组织 / 福尔马林固定石蜡包埋 (FFPE)** – 出于组织学原因，许多临床样本以 FFPE 形式保存。然而，对于 NGS 而言，FFPE 样本制备过程具有高度破坏性，会导致 DNA 高度片段化和受损。但由于 FFPE 的临床重要性，许多生物信息学 NGS 工作流必须在 FFPE 样本上进行测试。

*   **Orthogonal validation tests** – One more of my bioinformatics inputs. When you don't have a good, commercially available characterized sample, another way to validate is to check your output against two or more independent methods. For example: NGS, Sanger sequencing, long-read technologies, optical mapping, cytogenetics, etc.
    **正交验证测试** – 这是我提供的另一个生物信息学建议。当你没有好的、商业化的表征样本时，另一种验证方法是将你的输出结果与两种或多种独立的方法进行比对。例如：NGS、Sanger 测序、长读长技术、光学图谱、细胞遗传学等。

### Robustness Under Stress
### 压力下的鲁棒性

*   **Performance tests** – Measure response times, throughput, and resource usage under expected or peak load, to catch regressions. This matters especially in cloud computing, where overestimating computing resources leads to overpayment and underestimating them can lead to a system crash.
    **性能测试** – 测量预期负载或峰值负载下的响应时间、吞吐量和资源使用情况，以捕捉回归问题。这在云计算中尤为重要，因为高估计算资源会导致多付钱，而低估则可能导致系统崩溃。

The subtypes I find most relevant as a bioinformatician:
作为一名生物信息学家，我认为以下子类型最为相关：

*   **Load testing** – The simplest form of performance testing: how does the system (a bioinformatics pipeline, in my case) behave under normal load? For example, you expect your company to process 100 NGS samples a day, at around 10M read pairs per sample.
    **负载测试** – 最简单的性能测试形式：系统（在我的案例中是生物信息学流程）在正常负载下表现如何？例如，你预计公司每天处理 100 个 NGS 样本，每个样本约 1000 万个读段对。
*   **Stress testing** – How would the system behave beyond normal load? What if one day you need to process 10,000 samples, or samples with 100M reads each?
    **压力测试** – 系统在超出正常负载时表现如何？如果有一天你需要处理 10,000 个样本，或者每个样本有 1 亿个读段，会发生什么？
*   **Torture tests** – Push the system to extreme, high-load, or edge-case conditions to find where it actually breaks. Would your pipeline break on a 100M-read sample? A 200M-read sample?
    **极限测试 (Torture tests)** – 将系统推向极端、高负载或边界条件，以找出它真正崩溃的临界点。你的流程会在 1 亿个读段的样本上崩溃吗？2 亿个呢？

A word of caution on the cost of these tests (FinOps — one of the new terms I've picked up recently).
关于这些测试的成本，需要提醒一句（FinOps——这是我最近学到的新术语之一）。