---
title: "He made your free video player run smoothly. Now he’s doing that for robots."
originalUrl: "https://techcrunch.com/2026/06/19/he-made-your-free-video-player-run-smoothly-now-hes-doing-that-for-robots/"
date: "2026-06-20T22:38:20.458Z"
---

# He made your free video player run smoothly. Now he’s doing that for robots.
# 他曾让你的免费视频播放器运行流畅，现在他正为机器人做同样的事。

You’ve probably used VLC Media Player, the free video player with the orange traffic-cone icon — it’s been downloaded more than 6 billion times. But according to its lead developer, Jean-Baptiste Kempf, robots will soon be almost as ubiquitous as his open source video software.
你可能用过 VLC Media Player，那个带有橙色交通锥图标的免费视频播放器——它的下载量已超过 60 亿次。但据其首席开发者 Jean-Baptiste Kempf 称，机器人很快就会像他的开源视频软件一样普及。

Convinced that “hundreds of millions of robots and drones” will be roaming the streets in a few years, this French serial entrepreneur and open-source legend has been building Kyber, an infrastructure layer for controlling remote devices in real time. Its core software is an SDK that synchronizes video, audio, sensor data, and control inputs with minimal latency.
这位法国连续创业者兼开源传奇人物坚信，几年内将有“数以亿计的机器人和无人机”在街头穿梭。为此，他一直在构建 Kyber，这是一个用于实时控制远程设备的基础设施层。其核心软件是一个 SDK，能够以极低的延迟同步视频、音频、传感器数据和控制输入。

This lines up well with the rise of physical AI, and it’s part of why the Paris-based startup was able to raise a $5 million round led by Lightspeed, which has also backed Anthropic and Mistral AI. “Physical AI is only as good as the underlying systems running it,” the American VC firm wrote in a LinkedIn post announcing its investment.
这与物理人工智能（Physical AI）的兴起不谋而合，这也是这家总部位于巴黎的初创公司能够获得由 Lightspeed 领投的 500 万美元融资的原因之一，Lightspeed 此前还投资过 Anthropic 和 Mistral AI。“物理人工智能的好坏取决于运行它的底层系统，”这家美国风投公司在宣布投资的 LinkedIn 帖子中写道。

Kyber’s potential applications go well beyond AI, though. Kempf told TechCrunch the platform is built for “all the use cases where the person who’s operating is not in the same place as the compute, which is not in the same place as the action.”
不过，Kyber 的潜在应用远不止于人工智能。Kempf 告诉 TechCrunch，该平台旨在服务于“所有操作人员与计算设备不在同一地点，而计算设备又与执行动作地点不在同一地点的使用场景”。

Remote control is one half of the equation; speed is the other — and it’s what inspired the startup’s name, a nod to the lightsaber crystals in Star Wars. “If you control things in the real world, every millisecond matters,” Kempf said.
远程控制是等式的一半，速度是另一半——这也正是这家初创公司名称的灵感来源，意指《星球大战》中的光剑水晶。“如果你在现实世界中控制事物，每一毫秒都至关重要，”Kempf 说道。

Kyber’s approach to eliminating lag is rooted firmly in video-streaming technology. The company started as a side project Kempf built while CTO at cloud gaming startup Shadow, and its early focus on streaming makes the VLC connection an easy one to draw. But IoT expertise matters just as much for optimization — tuning performance to a device’s available compute, at scale — the other core piece of what Kyber does.
Kyber 消除延迟的方法深深植根于视频流技术。该公司最初是 Kempf 在云游戏初创公司 Shadow 担任首席技术官时的一个副项目，其早期对流媒体的关注使得人们很容易将其与 VLC 联系起来。但物联网（IoT）专业知识对于优化同样重要——即根据设备的可用计算能力进行大规模性能调优——这是 Kyber 业务的另一个核心部分。

Kempf says other companies with the resources and the need have already built similar software for their own use cases, like remote driving. “But the largest fleets today have maybe 2,000 or 3,000 vehicles. Imagine you need to manage millions of them; that’s not the same thing.”
Kempf 表示，其他有资源和需求的公司已经为自己的用例（如远程驾驶）构建了类似的软件。“但目前最大的车队可能只有 2,000 或 3,000 辆车。想象一下，如果你需要管理数百万辆车，那完全是另一回事。”

That jump in scale also raises the stakes on observability — knowing systems are actually working will matter even more when AI agents, not people, are managing entire fleets and networks. Even at much smaller scale, though, there’s a real benefit: not needing to physically reach every device just to push a software update, for example.
规模的跨越也提高了对可观测性的要求——当由人工智能代理而非人类来管理整个车队和网络时，确保系统确实在正常运行将变得更加重要。即便在规模小得多的情况下，也有实际的好处：例如，无需亲自接触每台设备即可推送软件更新。

That range — from a handful of devices to millions — means Kyber’s user base will likely span far more companies than will ever become paying customers. True to Kempf’s roots, the core project is open source, while the company sells a productized version to enterprise customers.
这种从少数设备到数百万台设备的跨度意味着，Kyber 的用户群可能远超其付费客户的数量。秉承 Kempf 的开源背景，该项目的核心部分是开源的，而公司则向企业客户销售产品化版本。

And it’s not just software: like Palantir and others, Kyber also offers hands-on, custom deployment through forward-deployed engineers, or FDEs. FDEs make up a large part of Kyber’s team, which currently numbers 25 full-time staffers. The startup is headquartered in Paris but has offices in San Francisco and Singapore to support what it expects will be a global client base across a variety of industries.
这不仅仅是软件：像 Palantir 等公司一样，Kyber 还通过前线部署工程师（FDE）提供亲力亲为的定制化部署服务。FDE 在 Kyber 团队中占据很大比例，目前公司共有 25 名全职员工。该初创公司总部位于巴黎，但在旧金山和新加坡设有办事处，以支持其预期的跨行业全球客户群。

The company says it is already in commercial deployment with customers in defense, telco, robotics, and AI. To focus its efforts, Kyber has been prioritizing three segments: robotics, drones of every kind, and remote IT access, where demand has been particularly strong.
该公司表示，目前已在国防、电信、机器人和人工智能领域的客户中进行了商业部署。为了集中精力，Kyber 一直优先考虑三个领域：机器人、各类无人机以及需求特别强劲的远程 IT 访问。

In that last segment, Kempf says Kyber aspires to be more than just a Citrix challenger — but even that comparison alone points to a sizable total addressable market. Remote IT access isn’t exactly glamorous, but Kempf seems energized by the problem — and Kyber’s careers page hints at why: “The companies that tried to solve it spent years and tens of millions building custom solutions they’ll never share. We’re building the version everyone else can use.”
在最后一个领域，Kempf 表示 Kyber 的目标不仅仅是成为 Citrix 的挑战者——但仅凭这一比较就足以说明其潜在市场规模巨大。远程 IT 访问并不算光鲜亮丽，但 Kempf 似乎对解决这个问题充满热情——Kyber 的招聘页面暗示了原因：“那些试图解决这个问题的公司花费了数年时间和数千万美元构建了永远不会共享的定制解决方案。而我们正在构建一个每个人都能使用的版本。”