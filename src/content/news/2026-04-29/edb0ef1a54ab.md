---
title: "Start with the sensors, then design the rest: How Zoox built its robotaxi"
originalUrl: "https://arstechnica.com/cars/2026/04/start-with-the-sensors-then-design-the-rest-how-zoox-built-its-robotaxi/"
date: "2026-04-29T05:52:38.716Z"
---

# Start with the sensors, then design the rest: How Zoox built its robotaxi
# 先从传感器入手，再进行其余设计：Zoox 是如何打造其自动驾驶出租车的

These days, the hype is all about AI and robots, but almost a decade ago, the tech du jour was self-driving. You couldn’t swing a lanyard at CES for the latter half of the last decade without hitting a robotaxi; post-COVID, the number of startups has shrunk, but the technology has definitely matured. Go to the right cities—San Francisco and Austin, Texas, spring to mind—and you might see dozens of sensor-festooned vehicles among the downtown traffic.

如今，人工智能和机器人是科技圈的热门话题，但大约十年前，当时的科技宠儿是自动驾驶。在过去十年的后半段，在国际消费类电子产品展览会（CES）上，你随处可见自动驾驶出租车；疫情过后，虽然初创公司的数量有所减少，但这项技术无疑已经成熟。去往合适的城市——比如旧金山和德克萨斯州的奥斯汀——你可能会在市中心的交通流中看到数十辆装满传感器的车辆。

The pod-like robotaxis belonging to Zoox stand out. Other robotaxi developers are retrofitting existing vehicles like Hyundai Ioniq 5s with sensors and the computing power necessary for self-driving. Zoox, which was bought by Amazon in 2020, did that with its test fleet, but as it starts to offer ride-hailing services—currently in Las Vegas and San Francisco—it’s doing so with a purpose-built design that looks like it just drove off the set of a big-budget sci-fi production.

Zoox 的豆荚状自动驾驶出租车显得格外引人注目。其他自动驾驶出租车开发商通常是在现代 Ioniq 5 等现有车型上加装传感器和自动驾驶所需的计算能力。2020 年被亚马逊收购的 Zoox 在其测试车队中也曾这样做过，但随着它开始提供网约车服务（目前在拉斯维加斯和旧金山），它采用了一种专门设计的车型，看起来就像刚从大制作科幻电影的片场开出来一样。

“A robotaxi is not a car; it’s not a human-driven vehicle, and the requirements are wildly different, although it has to live in that world,” explained Chris Stoffel, director of robot industrial design and studio engineering at Zoox. It all starts with the sensors, each perched on a little ledge projecting from the top four corners of the robotaxi’s body. From up there, each has an unobstructed, high-level view, giving the Zoox robotaxi good situational awareness, particularly straight ahead.

“自动驾驶出租车不是普通的汽车，它不是由人类驾驶的车辆，其需求截然不同，尽管它必须融入现有的交通环境，”Zoox 机器人工业设计与工作室工程总监 Chris Stoffel 解释道。一切都始于传感器，每个传感器都安装在车身顶部四个角落延伸出的小平台上。从那个高度，每个传感器都能获得无遮挡的高位视野，从而使 Zoox 的自动驾驶出租车具备良好的态势感知能力，尤其是在正前方。

“Because we don’t have a traditional hood, we’ve optimized our frontal coverage in a way that would be nearly impossible on a retrofitted vehicle,” said Zoox director of sensor engineering Ryan McMichaels.

“因为我们没有传统的引擎盖，所以我们优化了前方覆盖范围，这在改装车辆上几乎是不可能实现的，”Zoox 传感器工程总监 Ryan McMichaels 说道。

Then there’s the fact that the robotaxi doesn’t care whether it’s coming or going, thanks to its symmetrical, bidirectional design. The advantages are tantalizing, particularly for a vehicle that’s going to be summoned on demand. There’s no more need for a three-point turn, and with its symmetrical steering axles, it should have unparalleled agility. For example, since both axles have the same degrees of steering, the Zoox robotaxi can crab walk far more effectively than the GM Hummer EV performing its party trick.

此外，得益于其对称的双向设计，这辆自动驾驶出租车无需区分车头和车尾。这种设计的优势非常诱人，特别是对于一辆需要随叫随到的车辆而言。它不再需要进行三点掉头，而且凭借其对称的转向轴，它应该具备无与伦比的灵活性。例如，由于两个车轴具有相同的转向角度，Zoox 自动驾驶出租车可以比通用悍马 EV 的“蟹行”模式更有效地进行横向移动。

“Not only do we do that for the maneuverability, but also the redundancy of the vehicle,” said Stoffel. “The hardware inside of the vehicle, it’s the same rack, it’s the same EDU on both ends, same battery pack—kind of split in both ends—two HVAC units. There’s a lot of redundancy built in there. It kind of got the kitchen sink of redundancy as we wanted to make sure this first product really could complete the mission,” Stoffel told me.

“我们这样做不仅是为了机动性，也是为了车辆的冗余性，”Stoffel 说。“车内的硬件，两端使用的是相同的转向架、相同的电驱动单元（EDU）、相同的电池组（分布在两端），以及两套暖通空调（HVAC）系统。内置了大量的冗余设计。我们几乎把所有能想到的冗余方案都用上了，因为我们想确保这款首发产品确实能够完成任务，”Stoffel 告诉我。

“We’re picking people up and we’re dropping them off. How do we do that better than anyone else? The idea is to get into a spot that no one can or down a street or maneuverability that no one can, because we are really focused primarily on dense urban areas at the moment,” Stoffel said.

“我们负责接送乘客。如何比其他人做得更好？我们的想法是进入别人进不去的地方，或者在街道上展现出别人无法企及的机动性，因为我们目前确实主要专注于人口稠密的城市地区，”Stoffel 说。

I haven’t had a chance to try out the rider experience yet, but I’m curious to see how it compares to the black cabs I grew up with in London. Those aren’t symmetrical, but they do have extremely tight turning radii, and an interior for riders that seats five with a pair of rear-facing jump seats—the best seat in the house for some. Zoox’s interior is a little more stylish than the passenger compartment of a London taxi, though, with cup holders and wireless charging pads on both benches.

我还没有机会体验过乘客感受，但我很好奇它与我伦敦成长过程中熟悉的黑色出租车相比如何。那些出租车虽然不对称，但转弯半径极小，车内可容纳五人，还有一对背向的折叠座椅——对某些人来说，那是车里最好的位置。不过，Zoox 的内饰比伦敦出租车的乘客舱更时尚，两个长椅上都配有杯架和无线充电板。

“When you get into the vehicle… designing for calm is what we’ve wanted to go for. And the way we do that is nothing demands your attention. When you get into this thing, it’s very simple, it’s very clean, very continuous. Nothing is demanding your attention, allowing you to settle in. As simple as just doing your seatbelt and hitting go, you’re on your way,” Stoffel told me.

“当你进入车内时……我们追求的是一种宁静的设计。我们实现这一点的方式是让没有任何东西需要你特别关注。当你进入车内，一切都非常简洁、干净、连贯。没有任何东西会分散你的注意力，让你能够安心坐下。就像系好安全带并按下出发键一样简单，你就上路了，”Stoffel 告诉我。

Zoox’s robotaxis are currently deployed in Las Vegas, San Francisco, and Austin, with Miami next in the works.

Zoox 的自动驾驶出租车目前已在拉斯维加斯、旧金山和奥斯汀投入运营，迈阿密将是下一个部署城市。