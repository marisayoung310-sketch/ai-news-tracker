---
title: "DeepSeek-V4-Flash means LLM steering is interesting again"
originalUrl: "https://www.seangoedecke.com/steering-vectors/"
date: "2026-05-16T22:11:30.118Z"
---

# DeepSeek-V4-Flash means LLM steering is interesting again
# DeepSeek-V4-Flash 让大模型“转向”技术重回视野

Ever since Golden Gate Claude I’ve been fascinated with “steering”: the idea that you can guide LLM outputs by directly manipulating the activations of the model mid-flight. DeepSeek V4 Flash I was inspired to write this post by antirez’s recent project DwarfStar 4, which is a version of llama.cpp that’s been stripped down to run only DeepSeek-V4-Flash. What’s so special about this model? It might be what many engineers have been waiting for: a local model good enough to compete with at least the low end of frontier model agentic coding. Since steering requires a local model, it’s now practical for many engineers to try it out for the first time. And indeed, antirez has baked steering into DwarfStar 4 as a first-class citizen. Right now it’s very rudimentary (basically just the toy “verbosity” example you can replicate via prompting), but the initial release was only eight days ago. I plan to follow this project closely.

自从 Golden Gate Claude 发布以来，我就一直对“转向”（steering）技术着迷：即通过在模型运行过程中直接操纵其激活值（activations）来引导大模型输出的想法。我写这篇文章的灵感来源于 antirez 最近的项目 DwarfStar 4，这是一个经过精简的 llama.cpp 版本，专门用于运行 DeepSeek-V4-Flash。这个模型有什么特别之处？它可能正是许多工程师一直在等待的：一个足够强大、足以与入门级前沿智能体编程模型相媲美的本地模型。由于“转向”需要本地模型，现在许多工程师终于可以第一次尝试这项技术了。事实上，antirez 已经将“转向”作为一项核心功能集成到了 DwarfStar 4 中。虽然目前它还非常基础（基本上只是可以通过提示词复现的“冗长程度”玩具示例），但该项目发布仅八天，我计划密切关注它的进展。

### How steering works
### “转向”是如何工作的

The basic idea behind steering is extracting a concept (like “respond tersely”) from the model’s internal brain state, then reaching in during inference and boosting the numerical activations that form that concept. One way you might do this is to feed your model the same set of a hundred prompts twice, once with the normal prompts and once with the words “respond tersely” appended. Then measure the difference in the model’s activations for each prompt pair (by subtracting one activation matrix from the other). That’s your “steering vector”. In theory, you can go and add that to the same activation layer for any prompt and get the same effect (of the model responding tersely).

“转向”的基本原理是从模型的内部大脑状态中提取一个概念（例如“简洁回答”），然后在推理过程中介入，增强构成该概念的数值激活值。一种实现方法是：将同一组一百个提示词输入模型两次，一次使用普通提示词，另一次在提示词后附加“简洁回答”字样。然后测量每一对提示词在模型激活值上的差异（通过将两个激活矩阵相减）。这就是你的“转向向量”。理论上，你可以将该向量添加到任何提示词的相同激活层中，从而获得相同的效果（即模型会简洁地回答）。

Another, more sophisticated way you might do this is to train a second model to extract “features” from your model’s activations: patterns of behavior that seem to show up together. Then you can try to map those features back to individual concepts, and boost them in the same way. This is more or less what Anthropic is doing with sparse autoencoders. It’s the same principle as the naive approach, but it lets you capture deeper patterns (at the cost of being much more expensive in time, compute and expertise).

另一种更复杂的方法是训练第二个模型，从主模型的激活值中提取“特征”：即那些似乎总是同时出现的行为模式。然后，你可以尝试将这些特征映射回具体的概念，并以同样的方式增强它们。这大致就是 Anthropic 使用稀疏自动编码器（sparse autoencoders）所做的事情。其原理与上述简单方法相同，但它能捕捉到更深层的模式（代价是需要消耗更多的时间、算力和专业知识）。

### Why steering is interesting
### 为什么“转向”很有趣

Steering sounds like a cheat code. Instead of painstakingly assembling a training set that tries to push the model towards the “smart” end of the distribution in its training data, why not simply go uncover the “smart” dial in the model’s brain and turn it all the way to the right? It also seems like a more elegant way to adjust the way models talk. Instead of fiddling with the prompt (adding or removing qualifiers like “you MUST”), couldn’t we just have a control panel of sliders like “succinctness/verbosity” or “conscientiousness/speed” and move them around directly? Finally, it’s just cool. Watching Golden Gate Claude unwillingly drag every sentence back to the Golden Gate Bridge is as fascinating and unsettling as Oliver Sacks’ neurological anecdotes. What if your own mind was tweaked in a similar way? Would it still be you?

“转向”听起来像是一种作弊码。与其费尽心思整理训练集来引导模型向训练数据中“聪明”的一端靠拢，为什么不直接找到模型大脑中的“聪明”旋钮并把它调到最大呢？这似乎也是调整模型说话方式的一种更优雅的方法。与其反复修改提示词（添加或删除“你必须”之类的限定词），我们难道不能拥有一个包含“简洁/冗长”或“严谨/速度”等滑块的控制面板，直接进行调节吗？最后，这真的很酷。看着 Golden Gate Claude 不由自主地把每一句话都扯回到金门大桥上，这种感觉既迷人又令人不安，就像奥利弗·萨克斯（Oliver Sacks）的神经学轶事一样。如果你的大脑也被类似地调整了，那还是原来的你吗？

### Why steering hasn’t been used
### 为什么“转向”技术尚未普及

Why don’t we steer more, then? Why don’t ChatGPT and Claude Code already have a steering panel where you can adjust the model’s brain in real time? One reason is that steering is kind of an unfortunately “middle class” idea in AI research. It’s beneath the big AI labs, who can manipulate their models directly without having to do awkward brain surgery mid-inference. Anthropic is working on this stuff, but largely from an interpretability and safety perspective (as far as I know). When they want a model to behave in a certain way, they don’t mess around with steering, they just train the model.

那么，为什么我们没有更多地使用“转向”技术呢？为什么 ChatGPT 和 Claude Code 还没有一个可以实时调整模型大脑的控制面板？原因之一是，在 AI 研究领域，“转向”算是一个略显尴尬的“中产阶级”想法。对于大型 AI 实验室来说，他们可以直接操纵模型，无需在推理过程中进行笨拙的“脑部手术”。据我所知，Anthropic 确实在研究这些，但主要是从可解释性和安全性的角度出发。当他们希望模型以某种特定方式表现时，他们不会去折腾“转向”，而是直接训练模型。

Steering is also out of reach for regular AI users like you and me, who use LLMs via an API and thus don’t have access to the model weights or activations needed to steer the model. Only OpenAI can identify or expose steering vectors for GPT-5.5, for instance. We could do this for open-weights models, but until very recently (more on that later) there haven’t been any open models strong enough to be worth doing this for. On top of that, most basic applications of steering are outcompeted by just prompting the model. It sounds pretty impressive to be able to manipulate the model’s brain directly. But you know what else manipulates the model’s brain directly? Prompt tokens. You can exercise fairly fine-grained control over activations with steering, but you can already exercise extremely fine-grained control by tweaking the language of your prompt. In other words, there’s not much point going to the trouble to steer a model to be more verbose when you could simply ask.

“转向”对于像你我这样的普通 AI 用户来说也是遥不可及的，因为我们通过 API 使用大模型，无法访问进行“转向”所需的模型权重或激活值。例如，只有 OpenAI 能够识别或公开 GPT-5.5 的转向向量。我们可以在开源权重模型上尝试，但直到最近（稍后会详细说明），还没有足够强大的开源模型值得我们这样做。此外，大多数基础的“转向”应用在效果上往往不如直接提示模型。能够直接操纵模型的大脑听起来很厉害，但你知道还有什么能直接操纵模型大脑吗？提示词（Prompt tokens）。你可以通过“转向”对激活值进行相当精细的控制，但通过调整提示词的语言，你已经可以实现极其精细的控制了。换句话说，既然可以直接要求模型变得冗长，又何必费尽心思去进行“转向”呢？

### Steering the unpromptable
### 引导那些无法通过提示词控制的行为

One way for steering to be really useful is if we could identify a concept that can’t be prompted for. What about “intelligence”? You used to be able to prompt for intelligence - this is why 4o-era prompting always began with “you are an expert” - but current-generation models have that baked into their personalities, so prompting for it does nothing. Maybe steering for it would still work? Ultimately this is an empirical question, but I’m skeptical that we’ll be able to find an “intelligence” steering vector. Put another way, the steering vector that makes up a concept as difficult as “intelligence” might be almost coextensive with the entire set of weights of the model, and thus identifying it reduces to the problem of “training a smart model”. A sufficiently sophisticated steering approach ends up just replacing the actual model. If I take GPT-2, and at each layer I swap out the activations with the activations from a much stronger model with the same architecture, I will get a much better result. But at that point you’re not making GPT-2 more intelligent, you’re just talking to the stronger model instead. The intelligence is in the steering, not in the model.

“转向”真正有用的地方在于，如果我们能识别出那些无法通过提示词引导的概念。比如“智力”？过去你可以通过提示词要求模型表现得更聪明——这就是为什么 4o 时代的提示词总是以“你是一位专家”开头——但当前一代的模型已经将这种特质融入了它们的个性中，所以再通过提示词要求已经没用了。也许“转向”对此依然有效？归根结底，这是一个经验性问题，但我怀疑我们是否能找到一个“智力”转向向量。换句话说，构成“智力”这样复杂概念的转向向量，可能几乎与模型的全部权重重合，因此识别它最终会归结为“训练一个聪明模型”的问题。一种足够复杂的“转向”方法最终只会取代模型本身。如果我拿 GPT-2 做实验，在每一层都用一个架构相同但更强大的模型的激活值来替换，我会得到更好的结果。但到那时，你并没有让 GPT-2 变得更聪明，你只是在与那个更强大的模型对话。智力存在于“转向”中，而不是模型中。