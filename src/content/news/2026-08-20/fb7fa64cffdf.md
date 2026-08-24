---
title: "A 3D fruit fly on macOS desktop powered by the real FlyWire connectome"
originalUrl: "https://github.com/DenisSergeevitch/desktop-fly"
date: "2026-08-19T21:46:07.067Z"
---

# A 3D fruit fly on macOS desktop powered by the real FlyWire connectome
# macOS 桌面上的 3D 果蝇：由真实的 FlyWire 连接组驱动

DesktopFly 🪰 A 3D fruit fly that lives on your macOS desktop — driven by a live spiking simulation of the real FlyWire connectome. It walks across your windows, grooms, sleeps, and decides to flee your cursor with the same neurons a real fly uses.
DesktopFly 🪰 是一款生活在 macOS 桌面上的 3D 果蝇，它由真实的 FlyWire 连接组（connectome）的实时脉冲模拟驱动。它会在你的窗口上行走、梳理羽翼、睡觉，并像真正的果蝇一样，利用相同的神经元决定是否躲避你的光标。

The fly's brain window: 23,210 real neuron soma positions from FlyWire v783, with live spikes flashing at real neuron locations. The two glowing yellow markers are the Giant Fibers — the escape command neurons. Click any region to stimulate it.
果蝇的大脑窗口：展示了来自 FlyWire v783 的 23,210 个真实神经元胞体位置，实时脉冲会在真实的神经元位置闪烁。两个发光的黄色标记是“巨大纤维”（Giant Fibers）——即逃跑指令神经元。点击任何区域即可对其进行刺激。

What's real: 23,210 neuron soma positions (of 139,255 in FlyWire v783) render the rotating brain window, colored by super-class (FlyWire's coarse cell-type grouping). A 668-neuron circuit with ~19,000 real synaptic connections (synapse counts, signed by neurotransmitter prediction) runs as a 1 kHz leaky-integrate-and-fire (LIF) simulation:
真实的部分：23,210 个神经元胞体位置（FlyWire v783 总数 139,255 个中的一部分）构成了旋转的大脑窗口，并按超类（FlyWire 的粗略细胞类型分组）进行着色。一个包含 668 个神经元的电路，拥有约 19,000 个真实的突触连接（突触计数，由神经递质预测标记），以 1 kHz 的“漏电积分发放”（LIF）模型进行模拟：

*   LC4 (104) + LPLC2 (210) looming-detector visual neurons
*   DNp01 / Giant Fiber (GF) (2) — the escape command neuron
*   DNa01 + DNa02 (4) steering neurons
*   DNp09 (2) forward walking
*   DNg11 (6) grooming
*   MDN (4) backward walking ("moonwalker")
*   DNp02/DNp04/DNp11 (6) escape-maneuver (wing) neurons
*   their 330 strongest partners, including ascending (proprioceptive) and sensory (wind) neurons

*   LC4 (104) + LPLC2 (210) 视觉膨胀检测神经元
*   DNp01 / 巨大纤维 (GF) (2) —— 逃跑指令神经元
*   DNa01 + DNa02 (4) 转向神经元
*   DNp09 (2) 前进神经元
*   DNg11 (6) 梳理神经元
*   MDN (4) 后退神经元（“太空步”）
*   DNp02/DNp04/DNp11 (6) 逃跑机动（翅膀）神经元
*   以及它们 330 个最强的伙伴，包括上行（本体感觉）和感官（风力）神经元

Escape is not scripted. Your cursor's approach becomes looming input to the real LC4/LPLC2 cells; the fly takes off only when the Giant Fiber actually spikes through its real synapses — ~1,200 synapses of feedforward inhibition push back, which is why slow approaches are tolerated and fast lunges trigger escape in ~4 ms, just like the real animal.
逃跑并非预设脚本。你光标的靠近会成为 LC4/LPLC2 真实细胞的“膨胀”输入；只有当巨大纤维通过其真实突触产生脉冲时，果蝇才会起飞——约 1,200 个前馈抑制突触会产生阻力，这就是为什么缓慢靠近会被容忍，而快速突袭会在约 4 毫秒内触发逃跑，正如真实的动物一样。

The body itself is procedural (FlyWire is a brain connectome — no body geometry exists), with a tripod gait, visible wing-beat, altitude-scaled flight, grooming, and sleep postures.
身体本身是程序生成的（FlyWire 只是大脑连接组，不存在身体几何结构），具有三足步态、可见的拍翅动作、高度缩放的飞行、梳理和睡眠姿势。

### Installation Requirements
### 安装要求

macOS 13+, Xcode Command Line Tools (Swift 5.9+). No permissions or entitlements needed — everything it senses (cursor, window frames, clicks-as-taps, thermal state) is permission-free.
macOS 13+，Xcode 命令行工具 (Swift 5.9+)。无需任何权限或授权——它感知的一切（光标、窗口框架、点击动作、热状态）都是无需权限的。

```bash
git clone https://github.com/DenisSergeevitch/desktop-fly.git
cd desktop-fly
./build.sh
./DesktopFly
```

A 🪰 item appears in the menu bar; quit from there. The fly wanders your desktop on a transparent, click-through overlay — it never intercepts your mouse or keyboard.
菜单栏会出现一个 🪰 图标；从那里可以退出程序。果蝇在一个透明的、可穿透点击的覆盖层上在你的桌面上游荡——它绝不会拦截你的鼠标或键盘操作。

### Controls (menu bar 🪰)
### 控制（菜单栏 🪰）

*   **Pause / Resume**: freeze the world
*   **Show/Hide Brain**: toggle the live brain window
*   **Escape Test (loom)**: inject a looming stimulus, watch the GF fire
*   **Move to Next Display**: hop the fly across monitors (shown when >1 display)
*   **Add / Remove Fly**: extra flies (only fly #1 carries the brain)
*   **Scare Flies**: startle everyone

*   **暂停 / 恢复**：冻结世界
*   **显示/隐藏大脑**：切换实时大脑窗口
*   **逃跑测试 (loom)**：注入膨胀刺激，观察 GF 发放
*   **移动到下一个显示器**：让果蝇在显示器间跳跃（当有多个显示器时显示）
*   **添加 / 移除果蝇**：增加额外的果蝇（只有 1 号果蝇携带大脑）
*   **惊吓果蝇**：吓跑所有果蝇

The brain window is interactive: hovering pauses the rotation; clicking a region "optogenetically" stimulates the ~60 nearest circuit neurons for 400 ms. The fly's reaction is whatever the real network does downstream — click the Giant Fiber and it escapes; click DNg11 and it grooms; click one side's DNa01/02 and it turns.
大脑窗口是交互式的：悬停会暂停旋转；点击某个区域会“光遗传学”式地刺激附近约 60 个电路神经元 400 毫秒。果蝇的反应取决于真实网络下游的运作——点击巨大纤维它就会逃跑；点击 DNg11 它就会梳理；点击一侧的 DNa01/02 它就会转向。

### How real neurons drive the body
### 真实神经元如何驱动身体

*   **body behavior** driven by **escape takeoff** (DNp01 giant fiber spike)
*   **walk vs. rest, walking speed** (DNp09 rate)
*   **steering** (DNa01+DNa02 left−right rate difference)
*   **grooming** (DNg11 rate)
*   **backward scoot** (MDN burst)
*   **nervous darting** (LC4/LPLC2 population rate)
*   **wing-beat effort, threat** (wing-raise DNp02/04/11 rate)
*   **spontaneous takeoff** (whole-population arousal)

*   **身体行为**由**逃跑起飞**驱动（DNp01 巨大纤维脉冲）
*   **行走与休息、行走速度**（DNp09 频率）
*   **转向**（DNa01+DNa02 左右频率差）
*   **梳理**（DNg11 频率）
*   **后退**（MDN 爆发）
*   **神经质的冲刺**（LC4/LPLC2 种群频率）
*   **拍翅力度、威胁**（翅膀抬起 DNp02/04/11 频率）
*   **自发起飞**（全种群唤醒）

The loop also closes body→brain: the gait rhythm feeds the circuit's real ascending (proprioceptive) neurons in phase with the legs, and fast cursor motion stimulates its sensory (wind) partners.
这个循环还闭合了“身体→大脑”的路径：步态节奏会与腿部同步，反馈给电路中真实的上升（本体感觉）神经元，而快速的光标移动会刺激其感官（风力）伙伴。

### Desktop ecology (all permission-free macOS senses)
### 桌面生态（所有无需权限的 macOS 感知）

*   **Window terrain**: window top edges are ledges — the fly lands on them, walks along them, rides a window you drag, and startles when one closes under its feet.
*   **Window looms**: a window appearing near the fly feeds the looming pathway; the circuit decides whether to flee your dialogs.
*   **Clicks are substrate taps**: clicking next to the fly startles it through the wind→GF pathway.
*   **Typing is vibration**: (idle-time API — knows when keys were pressed, never which).
*   **Circadian rhythm**: dawn/dusk activity peaks, midday siesta, night quiescence.
*   **Sleep**: idle at night → it sleeps, breathing slowly, with raised arousal threshold; it grooms after waking.
*   **Temperature**: flies are ectotherms — a hot Mac is a faster fly.

*   **窗口地形**：窗口顶部边缘是壁架——果蝇会降落在上面，沿着它们行走，随你拖动的窗口移动，当窗口在它脚下关闭时会受惊。
*   **窗口膨胀**：出现在果蝇附近的窗口会进入膨胀路径；电路会决定是否要逃离你的对话框。
*   **点击即敲击**：在果蝇旁边点击会通过“风力→GF”路径惊吓到它。
*   **打字即振动**：（利用空闲时间 API——知道何时按键，但从不知道按了什么键）。
*   **昼夜节律**：黎明/黄昏活动高峰，午间午睡，夜晚静息。
*   **睡眠**：夜晚空闲时→它会睡觉，呼吸缓慢，唤醒阈值提高；醒后会梳理羽翼。
*   **温度**：果蝇是变温动物——Mac 越热，果蝇动作越快。

### Regenerating the data
### 数据再生

`data/` ships with compact derived files. To rebuild them from the raw FlyWire Codex dumps (~60 MB download):
`data/` 文件夹中附带了紧凑的派生文件。若要从原始 FlyWire Codex 转储文件（约 60 MB 下载）中重建它们：

```bash
mkdir -p /tmp/flywire && cd /tmp/flywire
B=https://storage.googleapis.com/flywire-data/codex/data/fafb/783
curl -O "$B/classification.csv.gz" -O "$B/coordinates.csv.gz" \
     -O "$B/connections.csv.gz" -O "$B/consolidated_cell_types.csv.gz"
cd - && python3 etl.py /tmp/flywire
```

### Diagnostics
### 诊断

```bash
./DesktopFly --simtest # circuit invariants: GF silent at rest, 4 ms loom latency, ...
./DesktopFly --behaviortest # 17 end-to-end checks: stimulate neurons -> body reacts
./DesktopFly --snapshot f.png # offscreen fly render
./DesktopFly --brainshot b.png # offscreen brain render
```

### What's modeled vs. measured
### 模型与测量对比

**Honesty section**: the connectome gives wiring, not physiology. The LIF dynamics, neurotransmitter signs (ACh+, GABA−, Glu−), the gap-junction boost on LC→GF and wind→GF (documented electrical coupling), synaptic delays, and the sensory transduction (cursor → looming value) are standard modeling choices layered on the real graph. Everything downstream of the sensory neurons — who connects to whom, and how strongly — is FlyWire data.
**诚实说明**：连接组提供的是布线，而非生理学。LIF 动力学、神经递质符号（ACh+、GABA-、Glu-）、LC→GF 和风力→GF 上的间隙连接增强（有记录的电耦合）、突触延迟以及感官转导（光标→膨胀值），都是在真实图谱上叠加的标准建模选择。感官神经元下游的一切——谁与谁连接，以及连接强度——均来自 FlyWire 数据。

### License & citation
### 许可与引用

Code is MIT. The files in `data/` are derived from FlyWire (FAFB v783) and are CC BY-NC 4.0 — see `data/DATA_LICENSE.md`. If you use this, cite:
代码采用 MIT 协议。`data/` 中的文件源自 FlyWire (FAFB v783)，采用 CC BY-NC 4.0 协议——详见 `data/DATA_LICENSE.md`。如果您使用此项目，请引用：

Dorkenwald, S. et al. Neuronal wiring diagram of an adult brain. Nature 634, 124–138 (2024). https://doi.org/10.1038/s41586-024-07558-y
Schlegel, P. et al. Whole-brain annotation and multi-connectome cell typing of Drosophila. Nature 634, 139–152 (2024). https://doi.org/10.1038/s41586-024-07686-5