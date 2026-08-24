---
title: "The session you cannot take with you"
originalUrl: "https://earendil.com/posts/session-portability/"
date: "2026-07-31T22:17:43.607Z"
---

# The session you cannot take with you
# 你无法带走的会话

The original promise of an inference API was wonderfully simple: send some input, receive some output. If you kept both, you had the conversation. You could inspect it, archive it, replay it, or give it to a different model. That abstraction was never completely true. For instance prompt caches live on somebody else's GPUs, tokenization differs between models, and sampling is not reproducible (and quite intentionally so). But the semantic record of a session in the form of a transcript could still belong to the user. A transcript should contain the instructions, messages, tool calls and tool results. Another sufficiently capable model might not continue identically, but it could understand what happened and take over.

推理 API 最初的承诺非常简单：发送输入，接收输出。如果你保留了这两者，你就拥有了整个对话。你可以检查、归档、重放它，或者将其交给另一个模型。这种抽象从未完全实现。例如，提示词缓存（prompt caches）存在于别人的 GPU 上，不同模型之间的分词方式不同，且采样过程不可复现（这是刻意为之的）。但作为会话语义记录的“转录本”（transcript）本应属于用户。转录本应包含指令、消息、工具调用和工具结果。另一个能力相当的模型可能无法完全一致地继续对话，但它至少能理解发生了什么并接手工作。

Inference APIs are frustratingly moving away from that property, at least somewhat. They increasingly return a mixture of text and provider-bound state that is very intentionally non-portable. reasoning tokens that are billed to the user but returned only as opaque, encrypted blobs, with useless summaries at best; web searches where the model sees source material the client never sees; compacted context that only the original provider can decrypt; subagent instructions and messages hidden from the application running the agents in the form of encrypted payloads; file, vector-store, container, and cache references that cannot be resolved anywhere else; response and conversation state that is entirely keyed by IDs that are stored fully on the provider's servers.

令人沮丧的是，推理 API 正在逐渐背离这一特性。它们越来越多地返回文本与“服务商绑定状态”的混合体，而这种状态被刻意设计为不可移植。例如：向用户收费但仅以不透明加密数据块形式返回的推理 Token（最多只附带无用的摘要）；模型能看到源材料但客户端却无法获取的网络搜索结果；只有原始服务商能解密的压缩上下文；以加密载荷形式存在、对运行代理的应用程序隐藏的子代理指令和消息；无法在其他任何地方解析的文件、向量存储、容器和缓存引用；以及完全由存储在服务商服务器上的 ID 索引的响应和会话状态。

Each feature comes with a basic justification that's trivial for a provider to come up with, along with good arguments for why this is good for the user. Together all of these things change the ownership reality of an AI session: the transcript on your machine is no longer your session but a partial view of a session whose operational state belongs to an inference provider and not you. We are not fans of this direction, and we want to talk a bit about what it means to you, as a user, and what it means to us, as people developing tools in this space.

每一项功能都有服务商随手给出的基本理由，以及关于这对用户有何好处的冠冕堂皇的论点。但综合来看，这些因素改变了 AI 会话的所有权现实：你机器上的转录本不再是完整的会话，而只是一个会话的局部视图，其核心运行状态属于推理服务商，而非你本人。我们并不支持这种趋势，因此想谈谈这对作为用户的你，以及作为该领域工具开发者的我们意味着什么。

### A Practical Test for Session Ownership
### 会话所有权的实践测试

By a portable session we do not mean that switching from one model to another must produce the same next token. That's a given because models have different capabilities, trained personalities, context windows, and ways of working with tools. And well, it's all quite nondeterministic anyway. Portability means something more modest:
`const transcript = session.export(); revokeCredentials(oldProvider); session = newProvider.continueFrom(transcript);`
The archive should contain enough intelligible information for another model to continue the work. It should not require the old provider to dereference an ID, decrypt a blob, remember a search result, or reconstruct a summary.

所谓“可移植会话”，并不是指从一个模型切换到另一个模型必须产生相同的下一个 Token。这是显而易见的，因为模型具有不同的能力、训练人格、上下文窗口和工具使用方式。况且，这一切本身就具有高度的非确定性。可移植性意味着更务实的目标：
`const transcript = session.export(); revokeCredentials(oldProvider); session = newProvider.continueFrom(transcript);`
归档文件应包含足够的可理解信息，以便另一个模型能够继续工作。它不应要求旧服务商去解析 ID、解密数据块、记忆搜索结果或重构摘要。

This gives us five useful tests:
1. **Inspection**: Can the user see what the model saw, what tools did, and what agents told each other?
2. **Export**: Is the session self-contained, apart from ordinary artifacts that can also be downloaded?
3. **Replay**: Can another implementation reconstruct a semantically equivalent context?
4. **Audit**: Can a human explain why the system took an action after the fact?
5. **Deletion**: Can the user identify and remove every server-side copy on which the session depends?

这为我们提供了五个有用的测试标准：
1. **检查 (Inspection)**：用户能否看到模型看到了什么、工具做了什么，以及代理之间交流了什么？
2. **导出 (Export)**：除了可以下载的普通制品外，会话本身是否是自包含的？
3. **重放 (Replay)**：另一个实现能否重构出语义等价的上下文？
4. **审计 (Audit)**：人类能否在事后解释系统为何采取某项行动？
5. **删除 (Deletion)**：用户能否识别并删除会话所依赖的每一个服务器端副本？

A response ID is not a transcript (as the data is stored on the server), a ciphertext is not user-controlled state (as the user cannot decrypt it), a list of citations is not the evidence that was placed in the model's context by a search result (as you cannot typically fetch the same data as the model did).

响应 ID 不是转录本（因为数据存储在服务器上），密文不是用户可控的状态（因为用户无法解密它），引用列表也不是搜索结果放入模型上下文中的证据（因为你通常无法获取模型所获取的相同数据）。

### Encryption for Whom?
### 为谁加密？

The naming and marketing around these features can be misleading. `encrypted_content` sounds like a privacy feature under the user's control. Usually it is a capsule that the client cannot read and only the provider can open. The provider chooses the keys, decrypts the content for its own models, and defines where the data can be replayed. A better term is **provider-sealed state**.

围绕这些功能的命名和营销可能会产生误导。`encrypted_content`（加密内容）听起来像是一个由用户控制的隐私功能。但通常，它是一个客户端无法读取、只有服务商能打开的胶囊。服务商选择密钥，为自己的模型解密内容，并定义数据可以在何处重放。一个更准确的术语是**“服务商密封状态”（provider-sealed state）**。

Provider sealing can have a real privacy benefit. OpenAI, for example, can return encrypted reasoning to a client using `store: false`, then decrypt it in memory on the next request without persisting the intermediate state. That is better than requiring server-side conversation storage, particularly for Zero Data Retention customers. But, remember, there is not really anything that needs encryption to begin with! This encryption does not hide the data from the inference provider but it hides it from you.

服务商密封确实能带来真正的隐私益处。例如，OpenAI 可以通过 `store: false` 向客户端返回加密的推理过程，然后在下一次请求时在内存中解密，而无需持久化中间状态。这比要求服务器端存储对话要好，特别是对于“零数据保留”（Zero Data Retention）客户而言。但请记住，本来就没什么东西是需要加密的！这种加密并没有对推理服务商隐藏数据，而是对你隐藏了数据。

### Stored Conversations Turn a Transcript into a Pointer
### 存储的对话将转录本变成了指针

OpenAI's Responses API stores responses by default. Its documentation says response objects are retained for at least 30 days by default. `store: false` is available and should be used, as it makes it work more like completions: the data is not stored on OpenAI's servers. The new Gemini Interactions API has made a similar choice. It defaults to `store: true`. On the paid tier interactions are retained for 55 days, and on the free tier for one day.

OpenAI 的 Responses API 默认存储响应。其文档显示，响应对象默认至少保留 30 天。`store: false` 是可用的且应该被使用，因为它使工作方式更像补全（completions）：数据不会存储在 OpenAI 的服务器上。新的 Gemini Interactions API 也做出了类似的选择。它默认 `store: true`。在付费层级，交互记录保留 55 天，免费层级保留 1 天。

And obviously, the idea of storing state on the server is quite attractive:
`const first = responses.create({ model: "frontier-model", input: "Investigate this production failure", store: true, });`
`const second = responses.create({ model: "frontier-model", previousResponseId: first.id, input: "Now implement the fix", store: true, });`
The application sends less data, the provider can preserve hidden reasoning and tool state, and cache routing becomes easier. But if the local application only records the user messages and final text, `first.id` is now a foreign key into a database it does not control.

显然，在服务器上存储状态的想法非常有吸引力：
`const first = responses.create({ model: "frontier-model", input: "Investigate this production failure", store: true, });`
`const second = responses.create({ model: "frontier-model", previousResponseId: first.id, input: "Now implement the fix", store: true, });`
应用程序发送的数据更少，服务商可以保留隐藏的推理和工具状态，缓存路由也变得更容易。但如果本地应用程序只记录用户消息和最终文本，那么 `first.id` 现在就成了一个指向其无法控制的数据库的外键。

### No Reasoning For You
### 不再向你展示推理过程

All major labs claim to have legitimate reasons not to expose raw chain of thought. As a result, on non-open-weights models we typically do not see these tokens. Raw reasoning is not visible via the API. With stored responses, prior reasoning can b...

所有主流实验室都声称有正当理由不公开原始的思维链（chain of thought）。因此，在非开放权重的模型上，我们通常看不到这些 Token。原始推理过程无法通过 API 查看。而在存储响应的情况下，先前的推理过程可以……