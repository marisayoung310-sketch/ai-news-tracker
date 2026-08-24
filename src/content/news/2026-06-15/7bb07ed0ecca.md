---
title: "AR4 Mark 5: This Open-Source 6-Axis Robot Arm Is Finally Done"
originalUrl: "https://dev.to/circuitrocks/ar4-mark-5-this-open-source-6-axis-robot-arm-is-finally-done-44jm"
date: "2026-06-14T22:44:29.924Z"
---

# AR4 Mark 5: This Open-Source 6-Axis Robot Arm Is Finally Done
# AR4 Mark 5：这款开源六轴机械臂终于大功告成

A six-axis robot arm sitting on your desk used to mean five figures and a service contract. Chris Annin's AR4 quietly tore that idea up — and with the brand-new Mark 5 revision, he's calling the hardware officially finished. 

过去，想要在桌面上摆放一台六轴机械臂，往往意味着五位数的开销和繁琐的服务合同。Chris Annin 设计的 AR4 悄然打破了这一固有观念——随着全新的 Mark 5 版本发布，他宣布该硬件项目已正式完工。

The AR4 is an open-source, six-degrees-of-freedom robot arm you build yourself from CNC-cut aluminum, 3D-printed parts, and off-the-shelf motors and electronics. It's the latest in a lineage that started with the AR2 and has been refined release after release. The Mark 5 isn't a dramatic redesign so much as a final polish: Annin says it's the last item on his hardware to-do list, with future effort going into software and tutorials instead.

AR4 是一款开源的六自由度机械臂，你可以利用 CNC 切割的铝材、3D 打印件以及市售的电机和电子元件自行组装。它是继 AR2 之后该系列的最新迭代，经过了一次又一次的优化。Mark 5 并非大刀阔斧的重新设计，而更像是一次最终的打磨：Annin 表示这是他硬件待办事项清单上的最后一项，未来的精力将转向软件开发和教程制作。

### What changed in the Mark 5
### Mark 5 有哪些变化？

The headline tweak is sensing. Joints one, two, and three now use Hall effect sensors for their calibration limit switches instead of mechanical microswitches, which meant reworking a few mounting points on the aluminum parts. Joints four, five, and six keep the small microswitches. Annin has also shipped a fresh build manual and published the arm's modified Denavit-Hartenberg parameters — the math that describes how each joint moves — as fully worked-out spreadsheets, so the kinematics aren't a mystery you have to reverse-engineer.

最显著的改进在于传感系统。第一、二、三轴现在使用霍尔效应传感器作为校准限位开关，取代了原先的机械微动开关，这意味着需要对铝制部件上的几个安装点进行重新设计。第四、五、六轴则保留了小型微动开关。此外，Annin 还发布了全新的组装手册，并将该机械臂修改后的 Denavit-Hartenberg 参数（描述各关节运动的数学模型）以完整的电子表格形式公开，因此运动学原理不再需要你费力去逆向工程。

Under the hood, the AR4 runs on a Teensy 4.1 with motors that have integrated encoders for closed-loop control, a setup carried over and tightened across earlier revisions. The control electronics live inside the base of the arm, and a larger base enclosure makes room for the terminal board and the gripper control board.

在核心配置方面，AR4 搭载 Teensy 4.1 控制器，电机集成了用于闭环控制的编码器，这一方案在之前的版本中已得到应用并不断优化。控制电子元件被安置在机械臂底座内，更大的底座外壳为接线板和夹爪控制板提供了充足的空间。

### Build it yourself
### 自行组装

This is a genuine DIY kit, not a toy. You'll want a 3D printer for the printed components, the CNC metal parts and motors (kits and downloads are on the Annin Robotics site), and a Teensy 4.1 to act as the brain. The new build manual and DH parameter spreadsheets make it one of the more approachable paths into real industrial-style robotics — and there's even a course aimed at schools, shaped by feedback from professors already using the AR4 in their classrooms. If you've got a Mark 4 already, there are upgrade instructions to bring it up to Mark 5 spec.

这是一款真正的 DIY 套件，而非玩具。你需要一台 3D 打印机来制作打印件，购买 CNC 金属件和电机（套件和下载资料可在 Annin Robotics 官网获取），并准备一块 Teensy 4.1 作为“大脑”。全新的组装手册和 DH 参数表使其成为进入工业级机器人领域最容易上手的途径之一——甚至还有专门针对学校的课程，这些课程是根据已经在课堂上使用 AR4 的教授们的反馈而制定的。如果你已经拥有 Mark 4，官方也提供了升级指南，助你将其升级至 Mark 5 规格。