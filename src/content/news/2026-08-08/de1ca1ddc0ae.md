---
title: "My Fall-Detection Model Scored 94%, and It Was Lying to Me"
originalUrl: "https://towardsdatascience.com/my-fall-detection-model-scored-94-and-it-was-lying-to-me/"
date: "2026-08-07T22:09:18.643Z"
---

# My Fall-Detection Model Scored 94%, and It Was Lying to Me
# 我的跌倒检测模型准确率高达 94%，但它在欺骗我

My fall-detection model scored 94.3% accuracy. I went back over the terminal output and the confusion matrix more than once. They agreed every time. The number went into my README and onto my CV. It was also wrong. Not by a rounding error, either. The honest figure was 69%.
我的跌倒检测模型准确率达到了 94.3%。我反复检查了终端输出和混淆矩阵，结果每次都一致。我把这个数字写进了 README 文件，也放到了简历上。但它是错的，而且不是因为舍入误差。真实的准确率只有 69%。

No one caught this for me. It only came to light because I decided to build tools that could verify my own results. Fixing it taught me more about production machine learning than building the original system did. Plenty of articles explain data leakage in the abstract. This one is about what it looks like from the inside, with the numbers from before and after.
没有人帮我发现这个问题。直到我决定构建工具来验证自己的结果时，真相才浮出水面。修复这个问题的过程，让我对生产环境中的机器学习的理解，远超构建原始系统本身。有很多文章从抽象层面解释了“数据泄露”，而这篇文章将展示它在内部看起来是什么样子，并附带了前后的数据对比。

If you evaluate models on sequential data of any kind (video, audio, wearable sensors, time series), there’s a decent chance the same bug is sitting in your pipeline right now.
如果你正在对任何类型的序列数据（视频、音频、可穿戴传感器、时间序列）进行模型评估，那么你的流水线中很有可能也存在同样的漏洞。

### The system
### 系统架构

The project is a real-time fall detector for assistive monitoring. A webcam runs through MediaPipe Pose to get skeletal landmarks. From the landmarks I compute a few simple biomechanical features: torso angle, normalised hip and shoulder heights, and the geometry of the bounding box. A Random Forest classifies every frame, and a smoothing window over the last few predictions decides whether to raise the alarm. It all runs on CPU in real time. No video ever leaves the device. The only thing that leaves is the skeleton maths.
该项目是一个用于辅助监控的实时跌倒检测器。网络摄像头通过 MediaPipe Pose 获取骨骼关键点。我根据这些关键点计算出几个简单的生物力学特征：躯干角度、归一化的髋部和肩部高度，以及边界框的几何形状。随机森林（Random Forest）对每一帧进行分类，并通过一个针对最近几次预测的平滑窗口来决定是否触发警报。整个过程在 CPU 上实时运行。没有任何视频会离开设备，唯一传输的数据是骨骼计算结果。

I trained it on the Le2i fall detection dataset (Charfi et al., 2013), which contains staged falls and daily activities recorded in home-like rooms. I extracted features per frame, labelled per frame, ran a standard `train_test_split`, and got 94.3% accuracy. As far as I was concerned, the project was done.
我使用 Le2i 跌倒检测数据集（Charfi et al., 2013）对其进行了训练，该数据集包含在模拟家庭环境中录制的模拟跌倒和日常活动。我按帧提取特征、按帧标注，运行了标准的 `train_test_split`，得到了 94.3% 的准确率。当时我认为，项目已经完成了。

### The leak
### 数据泄露

Here’s the line that lied to me: `X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y)`
这就是欺骗我的那行代码：`X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y)`

The problem is that this split is random over individual frames, and frames from the same video are not independent. Two frames captured 80 milliseconds apart look almost the same: same person, same pose, same lighting, almost the same feature vector. When you shuffle all the frames together and hold out 20% for testing, nearly every test frame has a close twin in the training set.
问题在于，这种划分方式是在单个帧上随机进行的，而来自同一视频的帧并不是独立的。相隔 80 毫秒捕获的两帧看起来几乎一模一样：同一个人、同样的姿势、同样的灯光，特征向量也几乎相同。当你把所有帧打乱并留出 20% 用于测试时，几乎每一个测试帧在训练集中都有一个“孪生兄弟”。

So the test doesn’t measure whether the model generalises to people and rooms it hasn’t seen. It measures whether the model can remember, and a Random Forest can remember almost everything. This is data leakage in its most ordinary form: the samples aren’t independent, so the random split hands the test set the answers in advance.
因此，这个测试并没有衡量模型是否能推广到未见过的人和房间，它衡量的是模型是否能“记住”数据。而随机森林几乎可以记住一切。这是最常见的数据泄露形式：样本不是独立的，所以随机划分提前把答案交给了测试集。

### The fix
### 修复方案

The fix is simple to state: split by the thing that makes your samples dependent. For video, that means splitting by video. I re-ran the same features and the same model with `GroupKFold`, grouping by video, so no recording could appear on both sides of a fold.
修复方法说起来很简单：根据导致样本依赖的因素进行划分。对于视频而言，这意味着按视频进行划分。我使用 `GroupKFold` 重新运行了相同的特征和模型，按视频进行分组，这样就不会有任何一段录像同时出现在训练集和测试集中。

The grouped score came back at 69.1%. One fold, the same code split honestly, landed at 31%. What stung wasn’t the 25-point drop. It was that 94.3% had felt completely earned: a good number sitting next to a reasonable-looking pipeline, and nobody thinks to look twice. I didn’t.
分组后的准确率回落到了 69.1%。其中一个折叠（fold）在诚实的划分下，准确率甚至只有 31%。让我感到刺痛的不是那 25 个百分点的下降，而是 94.3% 这个数字曾让我觉得是“实至名归”的：一个漂亮的数字，配合看起来合理的流水线，没人会想到去二次检查。我当时也没想到。

### The labels
### 标签问题

Once I had audited the split, I started auditing everything else. The labels turned out to be worse. My training labels came from folder names. If a video sat in the `falls/` folder, every frame of it was labelled `fall`. But a staged fall only lasts one to two seconds, and the rest of the clip is ordinary activity: walking around, sitting down, standing up.
在审计完划分方式后，我开始审计其他所有内容。结果发现标签的问题更严重。我的训练标签来自文件夹名称。如果视频位于 `falls/` 文件夹中，它的每一帧都被标记为“跌倒”。但模拟跌倒通常只持续一到两秒，视频其余部分是日常活动：走动、坐下、站起。

The dataset actually provides frame-level annotations that mark the exact start and end of every fall, so I cross-referenced my labels against them. The result was embarrassing. In 76% of the frames carrying a fall label, the person was just walking around normally. Only 6% captured an actual fall, and the remaining 18% showed someone already lying on the floor afterwards.
该数据集实际上提供了帧级别的标注，标记了每次跌倒的确切开始和结束时间，所以我将我的标签与它们进行了交叉比对。结果令人尴尬：在 76% 被标记为“跌倒”的帧中，人只是在正常走动。只有 6% 捕捉到了真正的跌倒，剩下的 18% 显示的是人跌倒后躺在地上的画面。

My labels had changed the task without me realising. The model solved the easier problem they described, not the one I meant to set. That’s exactly the kind of failure leakage hides. A leaky evaluation can’t tell you that your labels are wrong, because it only measures memorisation, and a model can memorise wrong labels just as easily as right ones.
我的标签在我不经意间改变了任务目标。模型解决的是标签所描述的那个简单问题，而不是我原本想设定的问题。这正是数据泄露所掩盖的那种失败。有泄露的评估无法告诉你标签是错的，因为它只衡量记忆能力，而模型记忆错误标签和记忆正确标签一样容易。

So I rebuilt the training set, starting from the ground truth this time. A frame now counts as positive if it sits inside the annotated fall window or in the two seconds of lying that follow it. Everything before the fall is negative. The ambiguous frames late after a fall, where the person might still be lying down or might be getting up and there is no ground truth either way, I excluded completely instead of guessing.
于是我重新构建了训练集，这次从真实标注（ground truth）开始。现在，如果一帧位于标注的跌倒时间窗口内，或者在跌倒后两秒的躺卧时间内，它才被计为正样本。跌倒前的一切都是负样本。对于跌倒后很久的模糊帧（此时人可能还在躺着，也可能正在起身，且没有明确的真实标注），我直接将其剔除，而不是进行猜测。