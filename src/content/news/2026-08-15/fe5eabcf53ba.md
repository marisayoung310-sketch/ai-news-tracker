---
title: "Multi-Agent Scheduling with LLM-Assisted Contract Net Negotiation for Stream Processing in Mobile Edge Computing"
originalUrl: "https://arxiv.org/abs/2608.12371"
date: "2026-08-14T21:55:01.536Z"
---

# Multi-Agent Scheduling with LLM-Assisted Contract Net Negotiation for Stream Processing in Mobile Edge Computing
# 面向移动边缘计算流处理的 LLM 辅助合同网协商多智能体调度

**Abstract:** Stream-processing systems increasingly operate across heterogeneous mobile edge-cloud infrastructures, where workload volatility, resource contention, and stringent quality-of-service (QoS) requirements complicate decentralized scheduling. 

**摘要：** 流处理系统越来越多地运行在异构的移动边缘-云基础设施之上，其中工作负载的波动性、资源竞争以及严格的服务质量（QoS）要求使得去中心化调度变得复杂。

This paper proposes *MAS-DecStream*, whose main contribution is *LLM-MR-CNP*: an extension of the classical Contract Net Protocol with semantic CFP formulation, progressive context disclosure, multi-round proposal revision, negotiation memory, and deterministic validation. 

本文提出了 *MAS-DecStream*，其主要贡献是 *LLM-MR-CNP*：这是对经典合同网协议（Contract Net Protocol）的一种扩展，引入了语义化 CFP（呼叫提议）制定、渐进式上下文披露、多轮提议修订、协商记忆以及确定性验证机制。

Edge-cluster agents refine natural-language offloading proposals from local observations, predicted resource states, and qualitative runtime context, while hard resource and QoS constraints remain deterministic. 

边缘集群智能体根据本地观测、预测的资源状态以及定性的运行时上下文来优化自然语言卸载提议，同时确保硬资源和 QoS 约束保持确定性。

Experiments derived from the Alibaba ASI Trace evaluate the extension at three levels: single- versus multi-round CNP, rule-based versus LLM-assisted refinement, and fixed-model single- versus multi-round negotiation. 

基于阿里巴巴 ASI Trace 的实验从三个层面评估了该扩展：单轮与多轮 CNP 的对比、基于规则与 LLM 辅助的优化对比，以及固定模型下单轮与多轮协商的对比。

Under the evaluated configurations, MAS-DecStream reduces latency violations to 3%, eliminates resource overcommitment, reaches a conflict-resolution rate of 0.91 with 20 agents, and improves utility by up to 22% over the multi-round rule-based baseline. 

在评估配置下，MAS-DecStream 将延迟违规率降低至 3%，消除了资源过度承诺，在 20 个智能体的情况下达到了 0.91 的冲突解决率，并将效用比基于规则的多轮基准方案提高了 22%。

A separate 25-case evaluation shows model- and prompt-dependent accuracy-cost trade-offs. The results provide initial evidence that multi-round CNP refinement is the principal protocol-level gain, with LLM assistance adding value for qualitative and uncertain runtime context.

一项独立的 25 例评估显示了模型和提示词依赖下的准确性与成本权衡。研究结果初步证明，多轮 CNP 优化是协议层面的主要收益来源，而 LLM 辅助则为定性和不确定的运行时上下文提供了额外价值。