---
title: "The UX Challenge of AI: Training Users to Build a Secure Facial Vault"
originalUrl: "https://dev.to/shtatskyi/the-ux-challenge-of-ai-training-users-to-build-a-secure-facial-vault-5cjm"
date: "2026-06-16T23:08:31.304Z"
---

# The UX Challenge of AI: Training Users to Build a Secure Facial Vault
# AI 的用户体验挑战：引导用户构建安全的“人脸保险库”

When you build an app, you know exactly how the backend works. But the moment real users hit the frontend, they will do the exact opposite of what you expect.
当你开发一款应用时，你对后端逻辑了如指掌。但一旦真实用户开始使用前端界面，他们往往会做出与你预期完全相反的操作。

I recently launched DopplGrid, a closed-loop facial recognition vault. The architecture is straightforward: users securely register their biometric vector, and then upload photos to a shared grid where the engine cross-references vectors to find matches.
我最近推出了 DopplGrid，这是一个闭环人脸识别保险库。其架构非常直观：用户安全地注册其生物特征向量，然后将照片上传到共享网格中，引擎会在该网格中交叉比对向量以寻找匹配项。

The problem? Users were treating it like Instagram. They would register, skip the biometric enrollment, and just post 10 selfies to their feed, expecting the app to magically find their doppelganger globally.
问题在于，用户把它当成了 Instagram。他们注册后跳过了生物特征录入环节，直接在动态中发布了 10 张自拍，并期望应用能神奇地在全球范围内找到他们的“双胞胎”。

Here is how I am shifting the UX to explain the actual pipeline: The Enrollment Vector vs. The Search Pipeline
以下是我如何调整用户体验（UX）以解释实际工作流程的方法：注册向量与搜索流程。

1. The Master Key: Users must first enroll a face. This generates the core mathematical embedding that gets locked into the vault. It is a one-time setup, not a social feed post.
1. 主密钥：用户必须首先录入人脸。这会生成核心的数学嵌入（embedding），并将其锁定在保险库中。这是一个一次性的设置过程，而不是发布社交动态。

2. The Crowd Uploads: The system requires volume to make matches. I have to train users that uploading 10 solo selfies does nothing for the network. The grid relies on group photos—crowds, events, and parties.
2. 群体上传：系统需要足够的数据量才能进行匹配。我必须引导用户意识到，上传 10 张个人自拍对网络毫无帮助。该网格依赖于集体照——如人群、活动和聚会照片。

When a user uploads a group photo, our backend triggers the matching engine to isolate every face in the crowd and run it against the enrolled vectors in the vault. If an unregistered face is in the background, it stays anonymous. If a registered user is in the crowd, they get a match.
当用户上传集体照时，我们的后端会触发匹配引擎，从人群中分离出每一张人脸，并将其与保险库中已注册的向量进行比对。如果背景中出现未注册的人脸，系统会保持其匿名状态；如果人群中有已注册用户，他们就会获得匹配结果。

It is a fascinating lesson in frontend design: you can build a flawless backend matching engine, but if you don't explicitly tell users how to feed the algorithm, the engine stalls.
这是一堂关于前端设计的生动课程：你可以构建一个完美的后端匹配引擎，但如果你不明确告诉用户如何“喂养”算法，引擎就会陷入停滞。

If you want to see how we handle this onboarding flow (and test the matching engine yourself), check out the live build at DopplGrid. Let me know what you think of the architecture!
如果你想看看我们是如何处理这一引导流程的（并亲自测试匹配引擎），请访问 DopplGrid 的实时版本。欢迎告诉我你对该架构的看法！