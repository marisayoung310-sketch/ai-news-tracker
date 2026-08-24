---
title: "How to Configure a Custom LLM Proxy in OpenOPC (and Debug LiteLLM)"
originalUrl: "https://dev.to/fanioz/how-to-configure-a-custom-llm-proxy-in-openopc-and-debug-litellm-5m6"
date: "2026-08-04T22:39:38.009Z"
---

# How to Configure a Custom LLM Proxy in OpenOPC (and Debug LiteLLM)
# 如何在 OpenOPC 中配置自定义 LLM 代理（及调试 LiteLLM）

(If you missed it, check out my previous post on Getting Started with OpenOPC to see why I'm using this agent framework in the first place!) I recently started setting up OpenOPC to run my AI agents. To save on API costs, I decided to hook it up to a custom, OpenAI-compatible proxy at https://api.freetheai.xyz/v1. I expected it to be a simple drop-in replacement. In other platforms, you just set your model to something like `glm/glm-5.2` and it works perfectly. So, I updated my `.opc/config/llm_config.yaml`:

（如果你错过了，请查看我之前关于“OpenOPC 入门”的文章，了解我为什么要使用这个智能体框架！）最近我开始配置 OpenOPC 来运行我的 AI 智能体。为了节省 API 成本，我决定将其连接到一个位于 https://api.freetheai.xyz/v1 的自定义 OpenAI 兼容代理。我原以为这只是一个简单的直接替换。在其他平台上，你只需将模型设置为 `glm/glm-5.2` 之类的名称，它就能完美运行。因此，我更新了我的 `.opc/config/llm_config.yaml`：

```yaml
llm:
  default_model: "glm/glm-5.2"
  api_base: "https://api.freetheai.xyz/v1"
  api_key: "my_api_key"
```

OpenOPC uses LiteLLM under the hood to handle model routing. Instead of my agents spinning up, LiteLLM crashed out with this error: `litellm.BadRequestError: LLM Provider NOT provided. Pass in the LLM provider you are trying to call. You passed model=glm/glm-5.2`

OpenOPC 在底层使用 LiteLLM 来处理模型路由。但我的智能体没能启动，LiteLLM 反而抛出了这个错误：`litellm.BadRequestError: LLM Provider NOT provided. Pass in the LLM provider you are trying to call. You passed model=glm/glm-5.2`

### The openai/ Prefix Trick
### openai/ 前缀技巧

Because I was pointing to a custom `api_base`, LiteLLM didn't natively know how to route the `glm/` provider prefix. It needs to know exactly which API format to use to talk to the endpoint. For almost all custom endpoints, the format is OpenAI-compatible. To force LiteLLM to use the standard OpenAI request format, you have to prefix your model with `openai/`. I updated my config:

由于我指向的是自定义的 `api_base`，LiteLLM 无法原生识别如何路由 `glm/` 提供商前缀。它需要确切知道使用哪种 API 格式来与端点通信。对于几乎所有的自定义端点，其格式都是 OpenAI 兼容的。为了强制 LiteLLM 使用标准的 OpenAI 请求格式，你必须在模型名称前加上 `openai/` 前缀。我更新了配置：

```yaml
llm:
  default_model: "openai/glm-5.2"
```

### The "Unknown Aliased Model" Trap
### “未知别名模型”陷阱

I restarted OpenOPC. LiteLLM knew how to format the request this time, but I hit a new error. This time, it was rejected by the proxy itself: `OpenAIException - unknown aliased model`. When you use the `openai/` prefix, LiteLLM strips it off before sending the request. That means it passed exactly `glm-5.2` to the proxy. The proxy had no idea what that was. To see what the proxy actually expected, I queried its models endpoint directly using curl:

我重启了 OpenOPC。这次 LiteLLM 知道如何格式化请求了，但我遇到了一个新的错误。这一次，请求被代理本身拒绝了：`OpenAIException - unknown aliased model`。当你使用 `openai/` 前缀时，LiteLLM 会在发送请求前将其剥离。这意味着它向代理发送的正是 `glm-5.2`。而代理根本不知道那是什么。为了查看代理实际期望的名称，我使用 curl 直接查询了它的模型端点：

`curl -s https://api.freetheai.xyz/v1/models -H "Authorization: Bearer my_api_key"`

Buried in the massive JSON response, I found the literal ID registered on the server for that model: `glm/glm-5.2`.

在庞大的 JSON 响应中，我找到了该模型在服务器上注册的字面 ID：`glm/glm-5.2`。

### The Final Working Config
### 最终可用的配置

To make this work, I needed LiteLLM to use the OpenAI API format, but I needed it to pass `glm/glm-5.2` as the actual model name in the JSON payload. The fix was stacking them:

为了解决这个问题，我需要 LiteLLM 使用 OpenAI API 格式，但同时需要在 JSON 负载中将 `glm/glm-5.2` 作为实际的模型名称传递。解决方法是将它们堆叠起来：

```yaml
llm:
  default_model: "openai/glm/glm-5.2"
```

Once I restarted OpenOPC with this stacked config, the routing worked perfectly. I did hit a `ServiceUnavailableError - provider capacity temporarily unavailable` immediately after, but that's just the reality of using busy proxy servers—the actual connection and routing were finally correct. If you're hooking OpenOPC up to a custom proxy, always hit their `/v1/models` endpoint first to get the literal string they expect, and slap `openai/` on the front.

当我使用这个堆叠配置重启 OpenOPC 后，路由工作完美。虽然之后我确实遇到了 `ServiceUnavailableError - provider capacity temporarily unavailable`，但这只是使用繁忙代理服务器的常态——实际的连接和路由终于正确了。如果你要将 OpenOPC 连接到自定义代理，请务必先访问它们的 `/v1/models` 端点以获取它们期望的字面字符串，然后在前面加上 `openai/`。

**Discussion:** How are you handling custom API proxies and model routing for your agent stacks? Do you prefer configuring prefixes like this in LiteLLM, or do you rewrite the requests at a proxy level before they even hit your models? Let me know below!

**讨论：** 你是如何处理智能体栈中的自定义 API 代理和模型路由的？你更喜欢在 LiteLLM 中像这样配置前缀，还是在请求到达模型之前就在代理层重写它们？请在下方告诉我！