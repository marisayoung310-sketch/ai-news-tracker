---
title: "Grounding Spatial Relations in a Compact World Model: Instruction Leakage and a Goal-Free Dynamics Fix"
originalUrl: "https://arxiv.org/abs/2607.06925"
date: "2026-07-09T22:50:37.556Z"
---

### Grounding Spatial Relations in a Compact World Model: Instruction Leakage and a Goal-Free Dynamics Fix
### 在紧凑世界模型中实现空间关系接地：指令泄露与无目标动态修正

**Abstract:** Compact world models that condition on a language goal promise to ground relations such as ``put the red block left of the blue block'' using a sparse set of explicit \emph{reference anchors}. We ask when such references actually ground a relation, and identify a trap: a goal-conditioned predictor reaches a striking $0.90$ relation-readout accuracy, yet this is \emph{instruction transcription}, not perception. Withholding the goal collapses it to chance ($0.90\!\to\!0.27$, three seeds) and a counterfactual instruction makes the predicted anchors follow the \emph{false} instruction $94.5\%$ of the time (true scene $2.3\%$; $N{=}256$).

**摘要：** 基于语言目标条件的紧凑世界模型有望通过一组稀疏的显式“参考锚点”来实现诸如“将红色方块放在蓝色方块左侧”之类的空间关系接地。我们探讨了这些参考点在何时真正实现了关系接地，并发现了一个陷阱：目标条件预测器达到了惊人的 0.90 关系读取准确率，但这实际上是“指令转录”而非感知。当隐去目标时，准确率会骤降至随机水平（从 0.90 降至 0.27，基于三个种子），而使用反事实指令时，预测的锚点有 94.5% 的时间会遵循“错误”指令（仅 2.3% 遵循真实场景；N=256）。

Tested across three settings and a within-task ablation, our central claim characterizes the confound: \textbf{instruction leakage occurs when the scored quantity is transcribable from the instruction (when the instruction names the answer) and is essentially independent of how predictive the non-instruction inputs are.} Our tabletop and the external BabyAI benchmark leak, whereas a Language-Table forward-dynamics world model whose instruction names \emph{referents} does not, until the instruction is augmented to name the direction; and degrading the action never increases leakage, the opposite of what predictor-competition predicts.

通过在三种设置和任务内消融实验中的测试，我们的核心观点揭示了这种混淆现象：**当评分量可以从指令中转录（即指令直接指出了答案）时，就会发生指令泄露，且这与非指令输入的预测能力基本无关。** 我们的桌面环境和外部 BabyAI 基准测试均存在泄露，而 Language-Table 前向动态世界模型（其指令仅命名“指代对象”）则不会，除非指令被扩充以包含方向信息；此外，降低动作质量从未增加泄露，这与预测器竞争理论的预期恰恰相反。

The diagnosis prescribes the fix: keep the goal out of the dynamics (it belongs to the planner's cost) and supervise the \emph{read} path, recovering genuine, instruction-independent grounding ($0.88$, identical with and without the goal). The detection protocol and remedy apply to any goal-conditioned world model whose instruction names the scored quantity.

该诊断结果给出了修正方案：将目标从动态模型中剥离（它应属于规划器的成本函数），并对“读取”路径进行监督，从而恢复真正的、与指令无关的接地能力（准确率为 0.88，无论是否有目标，结果均一致）。该检测协议和补救措施适用于任何指令中包含评分量的目标条件世界模型。