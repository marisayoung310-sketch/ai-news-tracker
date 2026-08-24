---
title: "BrickAnything: Geometry-Conditioned Buildable Brick Generation with Structure-Aware Tokenization"
originalUrl: "https://arxiv.org/abs/2605.26182"
date: "2026-05-27T22:59:21.832Z"
---

# BrickAnything: Geometry-Conditioned Buildable Brick Generation with Structure-Aware Tokenization
# BrickAnything：基于结构感知标记化的几何条件可构建积木生成

**Abstract:** Generating physically buildable brick structures from 3D shapes requires more than geometric reconstruction: the output must also satisfy discrete part constraints and structural stability. Existing brick generation methods either rely on heuristic optimization, which can break down when the target 3D shape does not admit a feasible structure under predefined constraints, or generate brick sequences without explicitly modeling the underlying 3D geometry and assembly relations.

**摘要：** 从 3D 形状生成物理上可构建的积木结构，不仅仅需要几何重建：输出结果还必须满足离散零件的约束和结构稳定性。现有的积木生成方法要么依赖启发式优化（当目标 3D 形状在预定义约束下无法形成可行结构时，这种方法往往会失效），要么在生成积木序列时没有显式地建模底层的 3D 几何结构和装配关系。

In this work, we present BrickAnything, a geometry-conditioned autoregressive framework for generating buildable brick structures from diverse 3D representations. BrickAnything uses point clouds as a unified geometric interface and predicts brick sequences that reconstruct the target shape under assembly constraints.

在这项工作中，我们提出了 BrickAnything，这是一个基于几何条件的自回归框架，用于从多种 3D 表示中生成可构建的积木结构。BrickAnything 使用点云作为统一的几何接口，并预测在装配约束下重建目标形状的积木序列。

To model structural dependencies among bricks, we introduce a structure-aware tree tokenization, which represents brick structures through local attachment relations. This formulation makes sequence generation more consistent with the physical construction process, and reduces invalid intermediate states.

为了建模积木之间的结构依赖关系，我们引入了一种结构感知树标记化（structure-aware tree tokenization）方法，通过局部连接关系来表示积木结构。这种表述方式使得序列生成过程与物理构建过程更加一致，并减少了无效的中间状态。

We further introduce preference-based alignment post-training, validity-constrained decoding and adaptive rollback to improve buildability objectives such as stability and geometric fidelity. Extensive experiments demonstrate that BrickAnything produces geometrically faithful and physically realizable brick structures, and that the proposed tokenization effectively reduces rollback and regeneration compared with conventional ordering strategies.

我们进一步引入了基于偏好的对齐后训练、有效性约束解码和自适应回滚机制，以提升稳定性与几何保真度等可构建性目标。大量实验表明，BrickAnything 能够生成几何精确且物理上可实现的积木结构，并且与传统的排序策略相比，所提出的标记化方法有效地减少了回滚和重新生成的次数。