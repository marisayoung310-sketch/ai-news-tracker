---
title: "StereoSplat+: Feed-Forward Stereo Gaussian Splatting with Diffusion-Assisted Progressive Inference"
originalUrl: "https://arxiv.org/abs/2607.08808"
date: "2026-07-13T22:23:49.960Z"
---

# StereoSplat+: Feed-Forward Stereo Gaussian Splatting with Diffusion-Assisted Progressive Inference
# StereoSplat+：基于扩散辅助渐进式推理的前馈立体高斯溅射

**Abstract:** Recent advances in 3D Gaussian Splatting (3DGS) have enabled high-quality, render-ready scene representations for novel-view synthesis. However, most existing 3DGS pipelines rely on multi-view observations (or non-causal access to future frames) to achieve sufficient coverage, which is often unavailable in on-device robotics and AR settings where sensing is restricted to a single stereo rig.
**摘要：** 3D 高斯溅射（3DGS）的最新进展为新视角合成提供了高质量、可渲染的场景表示。然而，大多数现有的 3DGS 流水线依赖于多视角观测（或对未来帧的非因果访问）来实现足够的覆盖范围，这在设备端机器人和增强现实（AR）场景中往往难以实现，因为这些场景的传感通常仅限于单个立体相机装置。

Recovering a high-quality 3DGS scene from one stereo observation, therefore, remains challenging due to occlusions, limited field of view, and missing geometry. We present StereoSplat+, a diffusion-enhanced feed-forward framework that enables causal reconstruction from a single stereo pair.
因此，由于遮挡、有限的视场以及几何信息的缺失，从单次立体观测中恢复高质量的 3DGS 场景仍然具有挑战性。我们提出了 StereoSplat+，这是一个扩散增强的前馈框架，能够实现从单个立体图像对进行因果重建。

Our method builds on two key components. First, we propose StereoSplat, an input-invariant feed-forward 3D Gaussian estimator that takes a variable number of posed stereo pairs as input and predicts high-quality 3D Gaussians. StereoSplat fuses complementary geometry cues via a cost-volume branch and a triplane-based 3D volume branch and leverages continuous pose encoding to generalize across view counts and camera configurations.
我们的方法基于两个关键组件。首先，我们提出了 StereoSplat，这是一种输入不变的前馈 3D 高斯估计器，它以可变数量的带位姿立体图像对作为输入，并预测高质量的 3D 高斯点。StereoSplat 通过代价体分支和基于三平面（triplane）的 3D 体分支融合互补的几何线索，并利用连续位姿编码来实现跨视角数量和相机配置的泛化。

Second, since multiple posed stereo pairs are typically unavailable at inference time, we introduce a diffusion-enhanced one-shot progressive inference scheme called StereoSplat+: starting from one stereo pair, we render novel stereo views from the predicted 3DGS, refine them with a one-step diffusion enhancer, and feed them back as additional inputs to update the 3DGS.
其次，由于在推理时通常无法获得多个带位姿的立体图像对，我们引入了一种名为 StereoSplat+ 的扩散增强型单次渐进式推理方案：从一个立体图像对开始，我们从预测的 3DGS 中渲染出新的立体视角，利用一步扩散增强器对其进行优化，并将它们作为额外的输入反馈回去以更新 3DGS。

Experiments on the KITTI-360 dataset show that StereoSplat+ improves novel-view rendering quality and geometry accuracy, especially in occluded regions and under strong view extrapolation, outperforming recent feed-forward 3DGS baselines.
在 KITTI-360 数据集上的实验表明，StereoSplat+ 提高了新视角渲染质量和几何精度，特别是在遮挡区域和强视角外推的情况下，其性能优于近期前馈 3DGS 基准模型。