---
title: "DeepSeek makes the V4 Pro price discount permanent"
originalUrl: "https://api-docs.deepseek.com/quick_start/pricing"
date: "2026-05-22T22:19:34.603Z"
---

# DeepSeek makes the V4 Pro price discount permanent

**DeepSeek 将 V4 Pro 的价格折扣转为永久优惠**

On this page, the prices listed below are in units of per 1M tokens. A token, the smallest unit of text that the model recognizes, can be a word, a number, or even a punctuation mark. We will bill based on the total number of input and output tokens by the model.

在本页面中，以下列出的价格单位均为每 100 万 (1M) tokens。Token 是模型识别的最小文本单位，可以是一个单词、一个数字，甚至是一个标点符号。我们将根据模型输入和输出的 token 总数进行计费。

### Model Details (模型详情)

| MODEL | deepseek-v4-flash | deepseek-v4-pro |
| :--- | :--- | :--- |
| **BASE URL (OpenAI Format)** | https://api.deepseek.com | https://api.deepseek.com |
| **BASE URL (Anthropic Format)** | https://api.deepseek.com/anthropic | https://api.deepseek.com/anthropic |
| **MODEL VERSION** | DeepSeek-V4-Flash | DeepSeek-V4-Pro |
| **THINKING MODE** | Supports both non-thinking and thinking (default) modes | Supports both non-thinking and thinking (default) modes |
| **CONTEXT LENGTH** | 1M | 1M |
| **MAX OUTPUT** | 384K | 384K |
| **Json Output** | ✓ | ✓ |
| **Tool Calls** | ✓ | ✓ |
| **Chat Prefix Completion (Beta)** | ✓ | ✓ |
| **FIM Completion (Beta)** | Non-thinking mode only | Non-thinking mode only |

### PRICING (价格表)

| | deepseek-v4-flash | deepseek-v4-pro |
| :--- | :--- | :--- |
| **1M INPUT TOKENS (CACHE HIT)** | $0.0028 | $0.003625 (75% off) |
| **1M INPUT TOKENS (CACHE MISS)** | $0.14 | $0.435 (75% off) |
| **1M OUTPUT TOKENS** | $0.28 | $0.87 (75% off) |
| **Concurrency Limit** | 2500 | 500 |

*(1) The model names deepseek-chat and deepseek-reasoner will be deprecated in the future. For compatibility, they correspond to the non-thinking mode and thinking mode of deepseek-v4-flash, respectively.*

(1) 模型名称 deepseek-chat 和 deepseek-reasoner 将在未来弃用。为保持兼容性，它们分别对应 deepseek-v4-flash 的非思考模式和思考模式。

*(2) For all models, the input cache hit price has been reduced to 1/10 of the launch price. This price adjustment takes effect from 2026/4/26 12:15 UTC.*

(2) 对于所有模型，输入缓存命中价格已降至发布价格的 1/10。此价格调整于 2026 年 4 月 26 日 12:15 (UTC) 起生效。

*(3) The deepseek-v4-pro model API pricing will be officially adjusted to 1/4 of the original price after the 75% discount promotion ends on 2026/05/31 15:59 UTC.*

(3) deepseek-v4-pro 模型 API 价格在 2026 年 5 月 31 日 15:59 (UTC) 的 75% 折扣促销结束后，将正式调整为原价的 1/4。

*(4) For more details on concurrency limits, please refer to Rate Limit & Isolation Deduction Rules.*

(4) 关于并发限制的更多详情，请参考“速率限制与隔离扣费规则”。

The expense = number of tokens × price. The corresponding fees will be directly deducted from your topped-up balance or granted balance, with a preference for using the granted balance first when both balances are available. Product prices may vary and DeepSeek reserves the right to adjust them. We recommend topping up based on your actual usage and regularly checking this page for the most recent pricing information.

费用 = token 数量 × 单价。相应费用将直接从您的充值余额或赠送余额中扣除；当两者同时存在时，优先使用赠送余额。产品价格可能会有所变动，DeepSeek 保留调整价格的权利。建议您根据实际使用情况进行充值，并定期查看本页面以获取最新的价格信息。