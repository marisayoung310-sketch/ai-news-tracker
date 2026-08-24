---
title: "Texas AG sues Meta over claims that WhatsApp doesn't provide end-to-end encryption"
originalUrl: "https://arstechnica.com/security/2026/05/texas-ag-sues-meta-over-claims-that-whatsapp-doesnt-provide-end-to-end-encryption/"
date: "2026-05-22T22:24:07.204Z"
---

# Texas AG sues Meta over claims that WhatsApp doesn't provide end-to-end encryption
# 德克萨斯州总检察长起诉 Meta，指控 WhatsApp 未提供其承诺的端到端加密

The Texas Attorney General has sued Meta over allegations that the company’s WhatsApp messenger, used by more than 3 billion people, doesn’t provide the end-to-end encryption (E2EE) it has long claimed.
德克萨斯州总检察长已对 Meta 提起诉讼，指控该公司旗下的 WhatsApp 通讯软件（拥有超过 30 亿用户）并未提供其长期以来所宣称的端到端加密（E2EE）保护。

Since at least 2016, Meta (then named Facebook) has said WhatsApp provides robust end-to-end encryption, meaning that messages are encrypted on a sender’s device with keys that are available only to the receiver’s. By definition, E2EE means that no one else—including the platform itself—can read the plaintext messages.
至少从 2016 年起，Meta（当时名为 Facebook）就声称 WhatsApp 提供强大的端到端加密，这意味着消息在发送者的设备上加密，且只有接收者拥有解密密钥。根据定义，端到端加密意味着包括平台本身在内的任何第三方都无法读取明文消息。

In sworn testimony before two US Senate committees in 2018, CEO Mark Zuckerberg said Meta does “not see any of the content in WhatsApp; it is fully encrypted” and that “Facebook systems do not see the content of messages being transferred over WhatsApp.” The engine for this E2EE is the Signal protocol, an open source code base that multiple third-party experts have said lives up to its promises.
在 2018 年向美国参议院两个委员会提交的宣誓证词中，首席执行官马克·扎克伯格表示，Meta “看不到 WhatsApp 中的任何内容；它是完全加密的”，并且“Facebook 的系统无法看到通过 WhatsApp 传输的消息内容”。这种端到端加密的核心引擎是 Signal 协议，这是一个开源代码库，多位第三方专家均表示该协议名副其实。

In a complaint filed Thursday, Texas AG attorneys said Meta’s claims are false and that the company can and does read the unencrypted contents of WhatsApp messages. They said they are filing the action to “prevent WhatsApp and Meta from continuing to willfully deceive [Texans] by misrepresenting that their private communications were just that—private and inaccessible even to WhatsApp and Meta—when, in fact, WhatsApp and Meta have access to all WhatsApp users’ communications in their entirety.”
在周四提交的诉状中，德克萨斯州总检察长办公室的律师表示，Meta 的说法是虚假的，该公司实际上能够且确实在读取 WhatsApp 消息的未加密内容。他们表示提起此诉讼是为了“防止 WhatsApp 和 Meta 继续蓄意欺骗[德克萨斯州民众]，谎称他们的私人通讯是私密的，甚至连 WhatsApp 和 Meta 自己都无法访问，而事实上，WhatsApp 和 Meta 可以完全访问所有 WhatsApp 用户的通讯内容。”

“The gravity of Meta’s and WhatsApp’s violation of users’ privacy and trust cannot be overstated,” the attorneys wrote. “All users were entitled to believe their communications were private when WhatsApp and Meta unequivocally and repeatedly promised that no one—not even WhatsApp and Meta—can access their messages.” In an email, Meta called the allegations “baseless” and vowed to fight the lawsuit in court.
“Meta 和 WhatsApp 对用户隐私和信任的侵犯程度极其严重，”律师们写道，“当 WhatsApp 和 Meta 明确且反复承诺没有人（甚至包括 WhatsApp 和 Meta 自己）可以访问他们的消息时，所有用户都有权相信他们的通讯是私密的。”在一封电子邮件中，Meta 称这些指控“毫无根据”，并誓言将在法庭上抗辩。

### He said, she said
### 各执一词

The sole factual evidence cited for the claims is an article published last month by Bloomberg. It reported that the US Commerce Department’s Bureau of Industry and Security had abruptly closed an investigation into allegations that Meta could access encrypted WhatsApp messages shortly after one of the department’s agents sent an email outlining the probe’s preliminary findings.
该指控所引用的唯一事实证据是彭博社上个月发表的一篇文章。报道称，美国商务部工业与安全局在一名探员发送了一封概述调查初步结果的电子邮件后，突然终止了对“Meta 可以访问加密 WhatsApp 消息”这一指控的调查。

According to Bloomberg, the January 16 email, sent to more than a dozen officials at other agencies, stated, “There is no limit to the type of WhatsApp message that can be viewed by Meta. The misconduct of Meta and its officers, including current and former high-level executives, involve civil and criminal violations that span several federal jurisdictions.”
据彭博社报道，这封 1 月 16 日发送给其他机构十几位官员的电子邮件中写道：“Meta 可以查看的 WhatsApp 消息类型没有限制。Meta 及其管理人员（包括现任和前任高管）的不当行为涉及跨越多个联邦司法管辖区的民事和刑事违规行为。”

Thursday’s lawsuit doesn’t indicate that the AG’s office has obtained the email itself or gathered any information from the investigators involved. Instead, it cites only the Bloomberg report for support. The complaint also noted that Meta employees receive plaintext WhatsApp messages that are reported to the company by fellow WhatsApp users. Those messages, however, are taken from the reporting party’s device only after they have been decrypted using the decryption keys available only to the reporting party.
周四的诉讼并未表明总检察长办公室已获得该电子邮件本身，也未从相关调查人员处收集到任何信息。相反，它仅引用了彭博社的报道作为支持。诉状还指出，Meta 员工会收到由其他 WhatsApp 用户举报的明文消息。然而，这些消息只有在举报人使用其独有的解密密钥解密后，才会从举报人的设备中提取出来。

The scarcity of factual support for the claims hasn’t been lost on technologists and encryption experts. They note that a thorough reverse engineering of WhatsApp would almost certainly reveal if it was somehow bypassing the protection provided by the Signal protocol.
技术人员和加密专家们也注意到了这些指控缺乏事实支持。他们指出，对 WhatsApp 进行彻底的逆向工程几乎肯定能揭示它是否以某种方式绕过了 Signal 协议提供的保护。

### A clean bill of health as of 2023
### 2023 年的“健康证明”

A team of researchers that performed a detailed technical analysis of WhatsApp last year gave the messenger a clean bill of health, finding that it generally works securely and as described by WhatsApp. They found one design flaw that made it possible for a Meta employee with access to the company’s infrastructure to add new members to a group chat without permission or any interaction from existing members. But even in that case, such an addition is fully visible to all other members.
去年，一个研究团队对 WhatsApp 进行了详细的技术分析，并给出了“健康证明”，认为该软件总体上运行安全，且符合 WhatsApp 的描述。他们发现了一个设计缺陷，即拥有公司基础设施访问权限的 Meta 员工可以在未经许可或现有成员未参与的情况下，将新成员添加到群聊中。但即便在这种情况下，这种添加操作对所有其他成员来说也是完全可见的。

Benjamin Dowling, a senior lecturer in cryptography at King’s College in London and a co-author of the study, said in an email that his team reverse-engineered the WhatsApp cryptographic protocol, meaning the code that makes it work. They found no indication that it was behaving differently from what Meta described.
伦敦国王学院密码学高级讲师、该研究的合著者本杰明·道林（Benjamin Dowling）在电子邮件中表示，他的团队对 WhatsApp 的加密协议（即使其运行的代码）进行了逆向工程。他们没有发现任何迹象表明其行为与 Meta 的描述不符。

Dowling, however, stressed that the analysis applied only to the WhatsApp client as available in May 2023. Their findings wouldn’t necessarily apply to versions updated since then. He said the closed source status of WhatsApp makes a definitive assessment of the code impossible. He went on to say that except for the resulting lack of code transparency and the weakness uncovered in group messaging, the Meta messenger nonetheless appeared to provide the same confidentiality promised by the Signal protocol.
然而，道林强调，该分析仅适用于 2023 年 5 月时的 WhatsApp 客户端。他们的发现不一定适用于此后更新的版本。他表示，WhatsApp 的闭源状态使得对代码进行最终评估成为不可能。他进一步指出，除了由此导致的代码透明度缺失以及在群聊中发现的弱点外，Meta 的这款通讯软件似乎确实提供了 Signal 协议所承诺的同等机密性。

Dowling wrote: Our reverse-engineering of WhatsApp and all the evidence we are aware of points towards WhatsApp providing users with end-to-end encryption for their message contents. While our analysis did find design weaknesses in the protocol, such as a lack of user control over things like group membership, these weaknesses are unlikely to be the basis of the complaint as they would not allow global stealth reading of messages. As it stands, we are not aware of any concrete evidence that WhatsApp has broken their promise of end-to-end encryption. The contents of the complaint do not provide any evidence otherwise.
道林写道：“我们对 WhatsApp 的逆向工程以及我们所知的所有证据都表明，WhatsApp 为用户的消息内容提供了端到端加密。虽然我们的分析确实发现了协议中的设计弱点，例如用户对群组成员身份等事项缺乏控制，但这些弱点不太可能是诉讼的基础，因为它们不允许对消息进行全局性的秘密读取。就目前而言，我们没有发现任何确凿证据表明 WhatsApp 违背了其端到端加密的承诺。诉状的内容也没有提供任何相反的证据。”

Three other cryptography experts I interviewed echoed similar doubts. “The vast majority of this Texas AG lawsuit looks like general dung-throwing in Meta’s direction,” said Kenny Paterson, a researcher at ETH Zurich. “I’m no fan of Meta’s data harvesting practices, but that’s all egregious misdirection on a case that seems to me to be built on a very thin evidence base: essentially, one news article is referenced to support the actual accusation.”
我采访的其他三位密码学专家也表达了类似的怀疑。“德克萨斯州总检察长的这起诉讼，绝大部分看起来就像是在向 Meta 泼脏水，”苏黎世联邦理工学院的研究员肯尼·帕特森（Kenny Paterson）说。“我并不喜欢 Meta 的数据收集行为，但这起案件完全是严重的误导，在我看来，它的证据基础非常薄弱：本质上，它只是引用了一篇新闻报道来支持其核心指控。”