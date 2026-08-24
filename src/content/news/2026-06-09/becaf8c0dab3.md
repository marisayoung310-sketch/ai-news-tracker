---
title: "Meta Deletes Face-Recognition System From Its Smart Glasses App After WIRED Report"
originalUrl: "https://www.wired.com/story/meta-removes-face-recognition-code-meta-ai-app-smart-glasses/"
date: "2026-06-08T23:04:47.601Z"
---

# Meta Deletes Face-Recognition System From Its Smart Glasses App After WIRED Report
# 在《连线》杂志报道后，Meta 从其智能眼镜应用中删除了人脸识别系统

One day after WIRED revealed that Meta had quietly embedded an unreleased face-recognition system into an app installed on more than 50 million phones, the company removed it, according to a WIRED analysis of the latest version’s code.
在《连线》（WIRED）杂志披露 Meta 已将一套尚未发布的人脸识别系统悄悄植入一款安装量超过 5000 万次的应用程序一天后，根据《连线》对最新版本代码的分析，该公司已将其移除。

The most recent version of Meta AI, a companion app for its line of smart glasses, strips out the unactivated software components that powered the system Meta internally called NameTag. The version published the day of WIRED’s report included several code libraries explicitly named for face recognition. Friday’s release includes none of them.
Meta AI 是 Meta 智能眼镜系列的配套应用，其最新版本剔除了驱动该系统（Meta 内部称之为 NameTag）的未激活软件组件。《连线》报道当天发布的版本中还包含几个明确命名为人脸识别的代码库，而周五发布的版本中已不再包含这些内容。

Andy Stone, Meta's vice president of communications, told WIRED on Monday that the feature is purely exploratory, adding: “No final decision has been made on what to do here, if anything.”
Meta 通讯副总裁安迪·斯通（Andy Stone）周一告诉《连线》，该功能纯属探索性质，并补充道：“关于是否要采取行动，目前尚未做出任何最终决定。”

On Thursday, WIRED reported that Meta had quietly integrated substantial portions of the NameTag system into the Meta AI app. Though never publicly enabled, the feature was designed to convert faces captured by the glasses into unique biometric signatures, commonly known as faceprints, and compare them against a database of faceprints stored on the user's device. WIRED also found that faces the system failed to recognize were cropped, indexed, and stored locally for future processing.
周四，《连线》报道称 Meta 已将 NameTag 系统的大部分内容悄悄整合到 Meta AI 应用中。尽管该功能从未公开启用，但其设计初衷是将眼镜捕捉到的人脸转换为独特的生物识别特征（通常称为“人脸指纹”），并将其与存储在用户设备上的数据库进行比对。《连线》还发现，系统未能识别的人脸会被裁剪、索引并存储在本地，以备日后处理。

NameTag first surfaced in February, when The New York Times, citing internal Meta documents, reported that the company was developing face recognition for its smart glasses and weighing a launch as soon as this week. One memo reportedly described releasing it during a “dynamic political environment,” when privacy and civil liberties advocates would be distracted. Last week, WIRED reported that much of NameTag’s machinery was already built into the Meta AI app, downloaded by millions of users, as early as January, even as Meta publicly said it had made no final decision about face recognition.
NameTag 最早于 2 月浮出水面，当时《纽约时报》援引 Meta 内部文件报道称，该公司正在为其智能眼镜开发人脸识别功能，并考虑最早于今年推出。据报道，一份备忘录描述了在“动态政治环境”下发布该功能的计划，届时隐私和公民自由倡导者将会分心。上周，《连线》报道称，早在 1 月份，NameTag 的大部分机制就已经内置于数百万用户下载的 Meta AI 应用中，尽管当时 Meta 公开声称尚未就人脸识别做出最终决定。

After WIRED’s report, Stone dismissed the findings, writing that the company couldn’t answer questions about how the system would work because “the feature does not exist.” Andrew Bosworth, Meta’s chief technology officer, called the reporting “incredibly misleading” and “absolutely dishonest.”
在《连线》报道发布后，斯通驳斥了这些发现，称公司无法回答有关该系统如何工作的问题，因为“该功能并不存在”。Meta 首席技术官安德鲁·博斯沃思（Andrew Bosworth）称该报道“极具误导性”且“绝对不诚实”。

Meta declined to answer 10 questions WIRED posed before publishing on Thursday, including whether it had already created the database of face profiles NameTag uses, how long the app retains photographs and biometric data of unrecognized people stored on a user's device, and whether that data would ever be sent back to Meta's servers.
在周四报道发布前，Meta 拒绝回答《连线》提出的 10 个问题，包括其是否已经创建了 NameTag 使用的人脸档案数据库、应用在用户设备上保留未识别人员照片和生物识别数据的时间长度，以及这些数据是否会被传回 Meta 的服务器。

Additionally, Meta did not respond to a question about whether it was building NameTag specifically for blind or low-vision users, and did not respond to criticism from privacy advocates who have warned the system could let stalkers and abusers identify strangers in public. It did not respond when asked whether it planned to let users opt in or opt out of the system.
此外，Meta 没有回应关于其是否专门为盲人或低视力用户开发 NameTag 的问题，也没有回应隐私倡导者的批评——他们警告称该系统可能让跟踪者和施暴者在公共场合识别陌生人。当被问及是否计划让用户选择加入或退出该系统时，Meta 也没有做出回应。

The newly released version of Meta AI removes nearly all traces of the feature Meta said did not yet exist. Gone is the face-recognition software itself, along with the code that ran the NameTag recognition process and the “Person recognized” alert the app would have shown if someone were identified. The update also strips out a folder where the app would have stored the cropped images and biometric signatures of faces it captured but could not identify.
新发布的 Meta AI 版本几乎删除了所有 Meta 声称“尚不存在”的功能痕迹。人脸识别软件本身、运行 NameTag 识别过程的代码，以及如果识别出某人后应用会显示的“已识别人员”提醒均已消失。此次更新还删除了一个文件夹，该文件夹本用于存储应用捕捉到但无法识别的人脸裁剪图像和生物识别特征。

Meta did not answer WIRED's questions about why the code was removed or whether the changes were planned before WIRED's story was published.
Meta 没有回答《连线》关于为何删除这些代码，或者这些更改是否在《连线》报道发布前就已计划好的问题。

A few fragments of the NameTag system remain in the version of latest Meta AI, including an internal debug menu label and a dormant link meant to open a recognized person’s profile. The leftover code points to parts of the system that are no longer there.
最新版 Meta AI 中仍残留着 NameTag 系统的一些碎片，包括一个内部调试菜单标签和一个旨在打开已识别人员个人资料的休眠链接。这些残留代码指向了系统中已不存在的部分。

Kade Crockford, director of the technology for liberty program at the American Civil Liberties Union of Massachusetts, says the removal didn’t undo the original decision to ship the code, and pointed to it as evidence that consumer privacy needs stronger legal protection than Congress has been willing to provide. Crockford notes that the Massachusetts House of Representatives last week unanimously passed a consumer privacy bill that, if enacted as written, would impose strong enforcement provisions, and urged other states to follow, especially with a private right of action that lets aggrieved users sue. “State lawmakers need to do their job and step up to protect consumer privacy,” they say.
美国公民自由联盟马萨诸塞州分部技术自由项目主任凯德·克罗克福德（Kade Crockford）表示，此次删除行为并不能抵消最初发布该代码的决定，并指出这证明了消费者隐私需要比国会目前愿意提供的更强有力的法律保护。克罗克福德指出，马萨诸塞州众议院上周一致通过了一项消费者隐私法案，如果按原样颁布，该法案将实施强有力的执法条款。他们敦促其他州效仿，特别是引入允许受害用户提起诉讼的私人诉权。“州立法者需要履行职责，加强对消费者隐私的保护，”他们说道。

“Meta’s sneaky tactics in slipping the face-recognition code into its smart glasses show exactly why data privacy bills need the teeth of strong enforcement,” Crockford says. “Companies like Meta prioritize their bottom line, so lawmakers need to speak in the only language its C-suite understands.”
“Meta 将人脸识别代码悄悄植入智能眼镜的卑劣手段，恰恰说明了数据隐私法案为何需要强有力的执法手段，”克罗克福德说。“像 Meta 这样的公司优先考虑的是利润，因此立法者需要用其高管层唯一能听懂的语言进行沟通。”