---
title: "DuplexGen: Adaptive Synthesis of Human-AI Turn-Taking Dialogues"
originalUrl: "https://arxiv.org/abs/2607.26178"
date: "2026-07-30T22:34:07.926Z"
---

# DuplexGen: Adaptive Synthesis of Human-AI Turn-Taking Dialogues
# DuplexGen：人机轮流对话的自适应合成

**Abstract:** Turn-taking is a central component of full-duplex interaction. Which turn-taking behaviors are appropriate varies with the scenario, yet current models apply a single norm regardless of context. This limitation originates in their training data: human-human speech corpora capture natural timing phenomena but provide little role grounding or scenario-specific norms, while heuristic or prompted synthesis methods inject turn-taking behaviors without basing them on human preferences.

**摘要：** 轮流对话（Turn-taking）是全双工交互的核心组成部分。什么样的轮流行为是合适的，取决于具体场景，然而目前的模型无论语境如何，都采用单一的规范。这一局限性源于它们的训练数据：人与人之间的语音语料库虽然捕捉到了自然的计时现象，但缺乏角色基础或特定场景的规范；而启发式或提示词合成方法在注入轮流行为时，并未基于人类的偏好。

We introduce DuplexGen, a framework for generating dialogues with scenario-adaptive turn-taking by calibrating LLM predictions against a small set of slot-level human preference annotations. In six cooperative and competitive tasks, human turn-taking preferences differ systematically, and DuplexGen aligns substantially more closely with those preferences than uncalibrated prompting or training solely on generic human-human data; a full-duplex model trained on DuplexGen-generated data exhibits distinctive, human-preferred turn-preferred behaviors.

我们引入了 DuplexGen，这是一个通过针对少量槽位级人类偏好标注来校准大语言模型（LLM）预测，从而生成具有场景自适应轮流对话的框架。在六项合作与竞争任务中，人类的轮流偏好存在系统性差异，而 DuplexGen 与这些偏好的契合度远高于未经校准的提示词或仅在通用人机语料上训练的模型；使用 DuplexGen 生成的数据训练出的全双工模型，展现出了独特且符合人类偏好的轮流行为。

These results show that human calibration, not corpus scale or prompt design alone, is what allows turn-taking synthesis to be scenario-specific.

这些结果表明，是人类校准而非单纯的语料库规模或提示词设计，使得轮流对话的合成能够实现场景化。