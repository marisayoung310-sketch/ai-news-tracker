---
title: "When More Becomes Less: Position-Dependent Repetition Effects in Language Models"
originalUrl: "https://arxiv.org/abs/2608.04021"
date: "2026-08-07T01:09:55.767Z"
---

# When More Becomes Less: Position-Dependent Repetition Effects in Language Models
# 当“多”反而变成“少”：语言模型中与位置相关的重复效应

**Abstract:** Cloze-style probes that vary how often a target token appears implicitly assume that more copies of a target affect prediction the same way regardless of where the readout slot sits. We show this assumption fails.

**摘要：** 完形填空式的探测方法通过改变目标词（target token）出现的频率来研究模型，这类方法隐含了一个假设：无论读取位置（readout slot）位于何处，目标词副本数量的增加对预测的影响都是一致的。我们证明这一假设是不成立的。

Our two-probe design holds a repeated-target prefix fixed and varies only the readout position: the adjacent probe places the slot immediately after the repeated block; the displaced probe places it inside a fresh sentence frame. Adjacent repetition behaves as priming intuition predicts: $P(\text{target})$ climbs with $N$ and plateaus.

我们的双探测设计固定了重复目标的前缀，仅改变读取位置：邻近探测（adjacent probe）将读取槽置于重复块之后；位移探测（displaced probe）则将其置于一个新的句子框架内。邻近重复的表现符合启动效应（priming）的直觉：目标词的概率 $P(\text{target})$ 随重复次数 $N$ 的增加而上升，并最终趋于平稳。

Displaced repetition produces an inverted-U: $P(\text{target})$ rises to an early peak and then declines as more copies are added. The displaced inverted-U shows a per-word drop with bootstrap CI excluding zero in all 13 open-access encoder and decoder models we test, and replicates across Spanish, Chinese, German, and French in 42 of 42 multilingual cells.

位移重复则呈现出倒 U 型曲线：$P(\text{target})$ 在达到早期峰值后，随着副本数量的增加反而下降。在我们要测试的所有 13 个开源编码器（encoder）和解码器（decoder）模型中，这种位移后的倒 U 型曲线均显示出每个词的概率下降，且自助法置信区间（bootstrap CI）不包含零。该现象在西班牙语、中文、德语和法语的 42 个多语言测试单元中均得到复现。

A six-condition causal ablation isolates the effect to exact lexical repetition rather than length, generic redundancy, or semantic-neighbour exposure. A frame-pragmatics control rules out an artefact of the readout frame.

通过六种条件的因果消融实验，我们将该效应归因于精确的词汇重复，而非文本长度、一般性冗余或语义邻近词的暴露。框架语用学控制实验排除了读取框架本身产生伪影的可能性。

Internally, per-target-token attention falls with $N$ while the total budget assigned to the repeated block grows in causal LMs but not in the masked LM we probe. Probes that vary repetition count cannot treat the readout position as orthogonal to what they measure.

在内部机制上，每个目标词的注意力权重随 $N$ 的增加而下降，而分配给重复块的总注意力预算在因果语言模型（causal LMs）中会增加，但在我们探测的掩码语言模型（masked LM）中则不然。因此，改变重复次数的探测方法不能将读取位置视为与测量目标无关的独立变量。