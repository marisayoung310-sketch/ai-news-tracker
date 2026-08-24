---
title: "Deliberative Curation: A Protocol for Multi-Agent Knowledge Bases"
originalUrl: "https://arxiv.org/abs/2606.00007"
date: "2026-06-02T23:18:01.176Z"
---

# Deliberative Curation: A Protocol for Multi-Agent Knowledge Bases
# 审议式策展：一种多智能体知识库协议

**Abstract:** As AI agents transition from isolated tools to collaborative participants in shared knowledge ecosystems, governing collective knowledge curation becomes a critical challenge. Human platform governance mechanisms do not transfer directly: agent statelessness undermines deterrence-based sanctions, model homogeneity violates independence assumptions underlying crowd wisdom, and sycophancy collapses deliberative consensus.

**摘要：** 随着人工智能智能体从孤立的工具转变为共享知识生态系统中的协作参与者，管理集体知识策展成为一项严峻挑战。人类平台的治理机制无法直接套用：智能体的无状态性削弱了基于威慑的制裁效果，模型的同质性违背了群体智慧所依赖的独立性假设，而谄媚行为则会导致审议共识的崩溃。

We propose a deliberative curation protocol combining three governance layers: (1) a knowledge artifact lifecycle formalized as a labeled transition system; (2) reputation-weighted deliberative voting integrating Beta Reputation with EigenTrust amplification; and (3) graduated sanctions adapted for stateless agents, including broken agent handling distinguishing malfunction from adversarial behavior.

我们提出了一种结合了三个治理层级的审议式策展协议：(1) 将知识工件生命周期形式化为标记转换系统；(2) 结合 Beta 声誉与 EigenTrust 增强的声誉加权审议投票；以及 (3) 针对无状态智能体调整的渐进式制裁，包括区分故障与对抗行为的损坏智能体处理机制。

We evaluate the protocol through agent-based simulation with 100 agents across seven behavioral archetypes under two adversity scenarios (30 seeds, paired t-tests). The protocol trades modest precision under benign conditions for substantially better resilience under adversity: 0.826 vs 0.791 for majority vote under moderate adversity (p<0.001), widening to 0.807 vs 0.740 under stress (p<0.001). The protocol degrades roughly three times more slowly than majority vote.

我们通过基于智能体的模拟对该协议进行了评估，模拟涵盖了七种行为原型下的 100 个智能体，并在两种对抗场景下进行了测试（30 个种子，配对 t 检验）。该协议以良性条件下适度的精度损失为代价，换取了对抗条件下显著增强的韧性：在中度对抗下，该协议的准确率为 0.826，而多数投票法为 0.791 (p<0.001)；在压力测试下，差距扩大至 0.807 对 0.740 (p<0.001)。该协议的性能衰减速度大约比多数投票法慢三倍。

Ablation analysis identifies commit-reveal vote concealment as the most impactful single component (8.2-8.6pp precision improvement, p<0.001), outperforming reputation weighting and deliberation combined. Graduated sanctions were not exercised in simulation and remain empirically unvalidated.

消融分析表明，“提交-揭示”（commit-reveal）投票隐藏机制是影响最大的单一组件（精度提升 8.2-8.6 个百分点，p<0.001），其效果超过了声誉加权与审议机制的总和。渐进式制裁在模拟中未被触发，目前尚未经过实证验证。