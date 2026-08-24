---
title: "Building the enterprise environment for agentic AI"
originalUrl: "https://www.technologyreview.com/2026/07/27/1140668/building-the-enterprise-environment-for-agentic-ai/"
date: "2026-07-27T22:34:15.314Z"
---

# Building the enterprise environment for agentic AI
# 构建代理式 AI 的企业环境

For the enterprise, the promise of agentic AI is much more than just a better chatbot. It is software agents that execute business tasks end-to-end across people, business workflows, data, and systems. The platform best-suited to run agents is built with proper CPU capacity, resilient data access, policy-aware tool use, observability, memory management, and the ability to predictably plan and scale agents.
对于企业而言，代理式 AI（Agentic AI）的愿景远不止于一个更好的聊天机器人。它是能够跨越人员、业务流程、数据和系统，端到端执行业务任务的软件代理。最适合运行这些代理的平台，必须具备充足的 CPU 容量、弹性的数据访问能力、符合策略的工具使用机制、可观测性、内存管理，以及可预测地规划和扩展代理的能力。

To better understand some of these dependencies, Intel performed thousands of agentic AI workload experiments. Our initial findings create and support five practical lessons for enterprise leaders: Agentic AI is a larger systems problem, not just one of inference. The majority of existing agentic AI harnesses are limited and do not measure overall system performance. Plan capacity is done using agents per virtual CPU (vCPU) density, not agent count. Monitor agent task latency, not just average CPU utilization. Default to scale-out for systems hosting agents. Reserve scale-up for workloads with heavier per-agent compute or architectural constraints.
为了更好地理解这些依赖关系，英特尔进行了数千次代理式 AI 工作负载实验。我们的初步发现为企业领导者总结并支持了五条实用经验：代理式 AI 是一个更大的系统性问题，而不仅仅是推理问题。目前大多数现有的代理式 AI 测试工具都很有限，无法衡量整体系统性能。容量规划应基于每个虚拟 CPU (vCPU) 的代理密度，而非代理总数。应监控代理任务延迟，而非仅仅监控平均 CPU 利用率。托管代理的系统应默认采用横向扩展（Scale-out），仅针对每个代理计算需求更高或存在架构限制的工作负载，才考虑纵向扩展（Scale-up）。

### Beyond inference: Agents as workflow automation
### 超越推理：作为工作流自动化的代理

Agentic AI is more than LLM inference. Its enterprise value depends on the full system, task orchestration, data access, tool execution, latency management, governance, and scalable infrastructure. An agent is a goal-driven automated enterprise workflow process: It plans a multi-step task, calls tools, reads results, and retries when something fails. Enterprise agents are therefore not just an inference problem; they are a systems problem.
代理式 AI 不仅仅是大型语言模型（LLM）的推理。其企业价值取决于整个系统、任务编排、数据访问、工具执行、延迟管理、治理和可扩展的基础设施。代理是一个目标驱动的自动化企业工作流过程：它规划多步骤任务、调用工具、读取结果，并在失败时进行重试。因此，企业级代理不仅是一个推理问题，更是一个系统性问题。

### Defining what good looks like
### 定义何为“良好”

Most agentic AI metrics focus on evaluating the LLM used. Platform teams also need to know how long the tasks take, how many agents a fleet can support, what users experience at the end of the execution process, and how costs change as more agents work simultaneously. A more useful enterprise view looks at six metrics: Task success rate, Cost per task, Time per task, Task throughput, Agent density (agents per vCPU), and Latency.
大多数代理式 AI 指标侧重于评估所使用的 LLM。平台团队还需要了解任务耗时、集群能支持多少代理、用户在执行过程结束时的体验，以及随着更多代理同时工作，成本如何变化。一个更有用的企业视角应关注六项指标：任务成功率、单任务成本、单任务耗时、任务吞吐量、代理密度（每个 vCPU 的代理数）以及延迟。

Together, these answer the questions enterprise AI operators care about: Is the system performing as expected? How many agents can the system sustain? How should it scale to support more agents?
这些指标共同回答了企业 AI 运营者关心的问题：系统表现是否符合预期？系统能支撑多少代理？应如何扩展以支持更多代理？

### Building on solid foundations
### 夯实基础

To gain a deeper insight into agentic AI workload performance, Intel extended Terminal-Bench, an open source benchmarking harness for evaluating AI agents with profiling, telemetry, and replay capabilities. This made it possible to understand where the agents spent time beyond LLM inference. The benchmark extension used a deterministic record-replay of LLM responses to separate agent performance from LLM variability. LLM responses were recorded once and replayed identically across runs, reducing run-to-run variance and creating a more reliable basis for comparison.
为了深入了解代理式 AI 的工作负载性能，英特尔扩展了 Terminal-Bench，这是一个用于评估 AI 代理的开源基准测试工具，具备性能分析、遥测和重放功能。这使得我们能够了解代理在 LLM 推理之外的时间消耗。该基准测试扩展使用了 LLM 响应的确定性记录-重放机制，将代理性能与 LLM 的波动性分离开来。LLM 响应被记录一次并在多次运行中完全相同地重放，从而减少了运行间的差异，并建立了更可靠的比较基础。

The Terminal-Bench task mix used was intentionally broad. It included compilation, testing, database operations, Boolean logic, interpretation, ray tracing, compression, linear algebra, video transcoding, and machine learning training. That wide variety made the findings more relevant to real enterprise environments.
Terminal-Bench 使用的任务组合经过精心设计，涵盖范围广泛，包括编译、测试、数据库操作、布尔逻辑、解释、光线追踪、压缩、线性代数、视频转码和机器学习训练。这种多样性使得研究结果与真实的企业环境更加相关。

### Agentic AI in three dimensions
### 代理式 AI 的三个维度

Deploying agentic AI should be approached in three phases:
部署代理式 AI 应分三个阶段进行：

**Plan in terms of agent density, not agent count:** The first sizing rule is to normalize agent count by available compute. Agent density, measured as agents per vCPU, is the leading signal for saturation. For example, 10 agents on an 8-vCPU system and 20 agents on an 16-vCPU system behave similarly if the density is the same. This gives architects a portable way to compare capacity across instance sizes and processor generations. The right density also depends on the business goal. Interactive copilots and user-facing assistants should favor lower density because response time matters. Batch workloads such as IT workflows can often run at higher density. This gives teams a practical way to tune fleets around service-level objectives and total cost of ownership.
**按代理密度而非代理数量进行规划：** 首要的规模化规则是根据可用计算资源对代理数量进行归一化。以“每个 vCPU 的代理数”衡量的代理密度是系统饱和度的主要信号。例如，如果密度相同，8 个 vCPU 系统上的 10 个代理与 16 个 vCPU 系统上的 20 个代理表现相似。这为架构师提供了一种跨实例规模和处理器代际比较容量的可移植方法。合适的密度也取决于业务目标。交互式 Copilot 和面向用户的助手应倾向于较低的密度，因为响应时间至关重要。而 IT 工作流等批处理工作负载通常可以在较高密度下运行。这为团队提供了一种围绕服务水平目标（SLO）和总拥有成本（TCO）来调整集群的实用方法。

**Agentic AI requires a new form of observability:** Average compute (CPU) utilization is a weak primary performance monitoring signal for agentic workloads. Agents often alternate between waiting for model responses and then doing short bursts of compute-intensive work. Because of that “bursty” pattern, average utilization can look acceptable even when those bursts are creating queues and slowing down the user experience. Task latency (P95) is a better leading metric. It shows when workflows are starting to wait, even before average task duration meaningfully degrades. A practical operating model is to alert on P95 latency first, then confirm the issue by looking at sustained task duration.
**代理式 AI 需要一种新的可观测性形式：** 对于代理式工作负载，平均计算（CPU）利用率是一个较弱的主要性能监控信号。代理通常在等待模型响应和执行短时间的计算密集型工作之间交替。由于这种“突发性”模式，即使这些突发任务正在造成排队并拖慢用户体验，平均利用率看起来可能依然正常。任务延迟（P95）是一个更好的先行指标。它能在平均任务持续时间显著恶化之前，显示出工作流何时开始出现等待。一种实用的运营模式是优先针对 P95 延迟发出警报，然后通过查看持续的任务耗时来确认问题。

**Scale out by default:** Scaling out adds more systems, increasing total agent capacity, while scaling up adds cores or memory to a single system for agents with heavier compute bursts. Our testing data showed that scale-out is usually the better default. That aligns with the fact that agents are typically semi-independent and have modest per-agent bursts, it improves overall performance, supports high availability, often lowers cost, and makes it easier to preserve the target agents-per-vCPU ratio as the platform grows. Scale up when agents require heavier parallel compute, shared state limits partitioning, memory locality matters, or licensing constraints apply.
**默认采用横向扩展：** 横向扩展（Scale-out）通过增加更多系统来提升总代理容量，而纵向扩展（Scale-up）则是为单个系统增加核心或内存，以应对计算突发需求更大的代理。我们的测试数据表明，横向扩展通常是更好的默认选择。这符合代理通常是半独立且每个代理的突发需求适中的事实；它能提高整体性能、支持高可用性、通常能降低成本，并使平台在增长时更容易保持目标“每个 vCPU 的代理数”比例。仅当代理需要更重的并行计算、共享状态限制了分区、内存局部性至关重要或存在许可限制时，才考虑纵向扩展。

**Consider business implications:** Where will agentic AI create business value first? The organizations getting production-grade results are wrapping an automation layer around workflows that already have codified rules and measurable service levels: code creation, regression test farms, ticket triaging, market analysis, and security review. The ideal enterprise persona for agentic AI is therefore not the experimental user chasing novelty; it is the accountable leader who must improve cycle time and productivity, protect service quality, enforce policy, and scale adoption with cost in mind.
**考虑业务影响：** 代理式 AI 将在何处率先创造业务价值？那些获得生产级成果的组织，正在为那些已有明确规则和可衡量服务水平的工作流包装自动化层：例如代码创建、回归测试集群、工单分类、市场分析和安全审查。因此，代理式 AI 的理想企业用户不是追求新奇的实验者，而是那些必须提高周期时间和生产力、保护服务质量、执行政策并在考虑成本的前提下扩展应用的负责任的领导者。