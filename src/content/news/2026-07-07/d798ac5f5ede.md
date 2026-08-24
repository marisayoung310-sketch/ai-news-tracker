---
title: "LeRobot v0.6.0: Imagine, Evaluate, Improve"
originalUrl: "https://huggingface.co/blog/lerobot-release-v060"
date: "2026-07-06T22:45:35.687Z"
---

# LeRobot v0.6.0: Imagine, Evaluate, Improve

This new release is about closing the robot learning loop: policies that imagine the future before acting, reward models that tell you when your robot succeeds, a deployment CLI that turns failures into training data, and six new simulation benchmarks to measure it all. It also brings depth sensing, VLM-powered dataset annotation, custom video encoding, cloud training on HF Jobs, and a much leaner install.

本次新版本旨在闭环机器人学习：通过在行动前预想未来的策略、判断机器人是否成功的奖励模型、将失败转化为训练数据的部署 CLI，以及用于全面评估的六个全新仿真基准测试。此外，新版本还引入了深度感知、基于 VLM 的数据集标注、自定义视频编码、基于 HF Jobs 的云端训练，并大幅精简了安装流程。

### TL;DR
LeRobot v0.6.0 introduces world model policies (VLA-JEPA, FastWAM, LingBot-VA) that learn to imagine the future, a wave of new VLAs (GR00T N1.7, MolmoAct2, EO-1, EVO1, Multitask DiT), and a new reward models API (Robometer, TOPReward). It ships six new simulation benchmarks unified under lerobot-eval, the lerobot-rollout CLI with DAgger-style human-in-the-loop corrections, FSDP training, and cloud training on HF Jobs. Datasets get depth support, an automatic language annotation pipeline, custom video encoding, and up to 2x faster data loading, all on top of a leaner installation.

**简而言之：** LeRobot v0.6.0 引入了学习预想未来的世界模型策略（VLA-JEPA, FastWAM, LingBot-VA），新增了一系列 VLA 模型（GR00T N1.7, MolmoAct2, EO-1, EVO1, Multitask DiT），以及全新的奖励模型 API（Robometer, TOPReward）。新版本集成了统一在 `lerobot-eval` 下的六个仿真基准测试、支持 DAgger 式人机协同修正的 `lerobot-rollout` CLI、FSDP 训练以及 HF Jobs 云端训练。数据集方面，增加了深度支持、自动语言标注流水线、自定义视频编码，数据加载速度提升高达 2 倍，同时安装包更加轻量化。

---

### World models: policies that imagine
The robotics world is asking a big question: do world models actually help robot policies? v0.6.0 brings three policies to LeRobot to help answer that question. Each one learns to imagine the future as part of its training, and each takes a different path to keep that imagination affordable.

**世界模型：会“想象”的策略**
机器人领域目前面临一个重大课题：世界模型真的能辅助机器人策略吗？v0.6.0 在 LeRobot 中引入了三种策略来解答这一问题。每种策略都在训练过程中学习预想未来，并采取了不同的路径来确保这种“想象”的计算成本在可控范围内。

#### VLA-JEPA
VLA-JEPA teaches a compact VLA (built on Qwen3-VL-2B) to predict the future in latent space while it learns to act: during training, a JEPA world model has to anticipate upcoming frames from the model's own actions. The trick is that the world model then disappears at inference, so you get world-model supervision at zero extra inference cost.

**VLA-JEPA**
VLA-JEPA 教导一个紧凑型 VLA（基于 Qwen3-VL-2B 构建）在学习行动的同时，在潜在空间中预测未来：在训练期间，JEPA 世界模型必须根据模型自身的动作来预判后续帧。其巧妙之处在于，世界模型在推理阶段会消失，因此你可以在零额外推理成本的情况下获得世界模型的监督效果。

#### LingBot-VA
LingBot-VA goes one step further: an autoregressive video-action model that predicts future video and actions together, chunk by chunk, and feeds real observations back in to keep its imagination grounded. You can even save what the robot imagined (--policy.save_predicted_video=true) and compare it with what actually happened.

**LingBot-VA**
LingBot-VA 更进一步：它是一个自回归视频-动作模型，能够逐块（chunk）同时预测未来的视频和动作，并将真实观测结果反馈回模型，以确保其“想象”基于现实。你甚至可以保存机器人预想的内容（--policy.save_predicted_video=true），并将其与实际发生的情况进行对比。

#### FastWAM
FastWAM asks the question in its paper title: do world action models need test-time future imagination? It pairs a ~5B video-generation expert with a compact action expert in a single network, so the model literally learns to dream its own rollouts. At inference it skips the dreaming entirely and directly denoises action chunks.

**FastWAM**
FastWAM 在其论文标题中提出了一个问题：世界动作模型在测试时真的需要预想未来吗？它将一个约 5B 参数的视频生成专家与一个紧凑型动作专家结合在同一个网络中，使模型能够真正学习“梦见”自己的执行过程。在推理时，它完全跳过了“做梦”环节，直接对动作块进行去噪。

---

### VLAs: the model zoo keeps growing
#### GR00T N1.7
We upgraded our NVIDIA GR00T integration to GR00T N1.7, the newest open generation of NVIDIA's cross-embodiment foundation model. N1.7 swaps the previous VLM for Cosmos-Reason2-2B (built on Qwen3-VL) feeding a flow-matching action head.

**VLA：模型库持续扩充**
**GR00T N1.7**
我们将 NVIDIA GR00T 的集成升级到了 GR00T N1.7，这是 NVIDIA 跨具身基础模型的最新开源版本。N1.7 将之前的 VLM 替换为 Cosmos-Reason2-2B（基于 Qwen3-VL 构建），并接入了流匹配（flow-matching）动作头。

#### MolmoAct2
MolmoAct2, the Allen Institute for AI's vision-language-action model, is now ported into LeRobot with the full lifecycle covered: fine-tuning (full or LoRA), evaluation, and real-robot deployment.

**MolmoAct2**
艾伦人工智能研究所（AI2）的视觉-语言-动作模型 MolmoAct2 现已移植到 LeRobot 中，涵盖了完整的生命周期：微调（全量或 LoRA）、评估以及真实机器人部署。