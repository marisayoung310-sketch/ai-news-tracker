---
title: "TrustLDM: Benchmarking Trustworthiness in Language Diffusion Models"
originalUrl: "https://arxiv.org/abs/2606.00023"
date: "2026-06-02T23:18:27.386Z"
---

# TrustLDM: Benchmarking Trustworthiness in Language Diffusion Models
# TrustLDM：语言扩散模型可信度基准测试

The rapid development of Language Diffusion Models (LDMs) challenges the dominant position of auto-regressive competitors in language processing. However, their flexible, any-order decoding strategies not only enable fast decoding speed but also potentially bring new trustworthiness challenges.

语言扩散模型（LDMs）的快速发展挑战了自回归模型在语言处理领域的主导地位。然而，它们灵活的任意顺序解码策略不仅实现了快速的解码速度，也可能带来新的可信度挑战。

To better understand the risks behind their pipelines, we introduce a comprehensive trustworthiness benchmark tailored to LDMs (TrustLDM), evaluating safety, privacy, and fairness across different LDM architectures with multiple categories of static post contexts.

为了更好地理解其流程背后的风险，我们引入了一个专为 LDM 量身定制的综合可信度基准测试（TrustLDM），通过多种类别的静态后置上下文，评估不同 LDM 架构在安全性、隐私性和公平性方面的表现。

Our empirical results show that although LDMs generally exhibit strong trustworthiness with only the user prompts, their alignment behavior degrades noticeably when the malicious post contexts are attached to the masked responses. We further observe that longer contexts do not necessarily induce stronger effects, and both decoding order and generation length affect the evaluation outcomes.

我们的实证结果表明，尽管 LDM 在仅有用户提示词的情况下通常表现出较强的可信度，但当恶意后置上下文附加到掩码响应中时，其对齐行为会显著下降。我们进一步观察到，更长的上下文并不一定会产生更强的影响，且解码顺序和生成长度都会影响评估结果。

Finally, we propose TrustLDM-Auto, an automatic evaluation framework that leverages LDM decoding flexibility to systematically identify vulnerable configurations, revealing substantial trustworthiness weaknesses across all evaluated models and dimensions. Our work may potentially help the community build more trustworthy LDMs. Our code is available at this https URL.

最后，我们提出了 TrustLDM-Auto，这是一个利用 LDM 解码灵活性来系统性识别脆弱配置的自动化评估框架，揭示了所有被评估模型和维度中存在的大量可信度缺陷。我们的工作有望帮助社区构建更可信的 LDM。代码已在链接中提供。