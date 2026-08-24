---
title: "Apps Marketed to US Troops Are Shipping Chinese and Russian Code"
originalUrl: "https://www.wired.com/story/apps-marketed-to-us-troops-are-shipping-chinese-and-russian-code/"
date: "2026-07-20T22:22:57.207Z"
---

# Apps Marketed to US Troops Are Shipping Chinese and Russian Code
# 针对美军推销的应用程序中被发现含有中俄代码

A recent examination of hundreds of mobile apps marketed toward US military personnel found more than one in eight contained software built by companies in China, Russia, or other foreign nations, raising fresh concerns that adversary governments could harvest data revealing where service members live, work, and deploy.

最近一项针对数百款面向美军人员推销的移动应用程序的调查发现，超过八分之一的应用程序包含由中国、俄罗斯或其他外国公司开发的软件。这引发了新的担忧，即敌对国家政府可能借此收集数据，从而暴露军人的居住地、工作地点及部署情况。

According to researchers at Purdue University, the US Military Academy at West Point, and Florida International University, one popular app used by service members to rate living conditions on their own bases include code from Huawei, the Chinese telecom that US regulators flagged as a national security threat in 2020. Two others were built by Russian companies and incorporate the Russian ad service Yandex.

据普渡大学、西点军校和佛罗里达国际大学的研究人员称，一款深受军人欢迎、用于评估基地生活条件的应用程序中，包含了中国电信巨头华为的代码。美国监管机构曾在2020年将华为列为国家安全威胁。另外两款应用程序由俄罗斯公司开发，并集成了俄罗斯广告服务商Yandex的服务。

The largely unregulated advertising industry that tracks Americans online treats civilians and service members mostly the same—unless there is profit in telling them apart—despite evidence that exposure can reveal troop deployments, unit movements, and the routines of personnel within intelligence facilities and hardened shelters where nuclear weapons are believed to be stored.

尽管有证据表明，数据泄露可能暴露部队部署、单位调动以及情报设施和据信存放核武器的加固掩体中人员的日常行踪，但目前监管松散的在线追踪广告行业对平民和军人的处理方式几乎没有区别——除非区分他们能带来更多利润。

WIRED investigations have previously shown location data harvested from ordinary apps tracing US service members to their homes, their children's schools, and off-base establishments where troops are prohibited from being seen. Experts have warned the same data could aid foreign spies in identifying personnel with access to sensitive sites, map when a facility is least guarded, or surface other compromising details.

《连线》（WIRED）此前的调查显示，从普通应用程序中收集的位置数据可以追踪到美军人员的住所、子女学校以及禁止军人出入的基地外场所。专家警告称，同样的数据可能帮助外国间谍识别能够进入敏感地点的人员，绘制设施防卫最薄弱的时间点，或挖掘其他可能造成损害的细节。

The stakes are no longer hypothetical. In April, US Central Command acknowledged in a letter to Senator Ron Wyden that it had received multiple threat reports of adversaries exploiting commercial location data to target or surveil American personnel in the Middle East, where US forces remain locked in a standoff with the Iranian military over the Strait of Hormuz. Lawmakers called it the first official confirmation that troops in an active war zone were being hunted through the data-broker economy—a threat the Pentagon's own contractors and researchers had warned about for nearly a decade.

风险已不再是假设。今年4月，美国中央司令部在致参议员罗恩·怀登（Ron Wyden）的一封信中承认，已收到多份威胁报告，称敌对势力利用商业位置数据在中东地区锁定或监视美军人员，而美军目前正因霍尔木兹海峡问题与伊朗军队处于对峙状态。立法者称，这是官方首次证实处于活跃战区的部队正通过数据经纪人经济被“猎杀”——五角大楼自己的承包商和研究人员对此威胁已发出近十年的警告。

The new study takes a first look at one piece of that exposure: what actually sits inside the apps built and marketed specifically for the military.

这项新研究首次审视了这种风险的一个侧面：那些专门为军队开发和推销的应用程序内部究竟隐藏着什么。

"We are grateful for the opportunity to bring greater attention to these issues,” says Joshua Shinkle, a Purdue University PhD researcher and the study’s lead author. “We hope the research helps military-affiliated personnel, developers, and platforms make more informed privacy decisions and encourages continued discussion with developers, platforms, and policymakers about how to address these gaps.”

“我们很感激有机会让人们更加关注这些问题，”普渡大学博士研究员、该研究的主要作者约书亚·辛克尔（Joshua Shinkle）表示，“我们希望这项研究能帮助军方相关人员、开发者和平台做出更明智的隐私决策，并鼓励各方与开发者、平台及政策制定者持续探讨如何弥补这些漏洞。”

The researchers examined more than 220 such apps—from uniform guides and promotion-exam prep to banking and dating apps—pulled from the Google Play store and military subreddits. Nearly two-thirds—or 64 percent—contained third-party code, known as SDKs: prebuilt software components, typically used for analytics and advertising, that can also track user behavior, including their locations, and share that information with outside companies.

研究人员从谷歌应用商店（Google Play）和军事相关的Reddit论坛上收集了220多款此类应用程序，涵盖了制服指南、晋升考试准备、银行和约会软件等。近三分之二（即64%）的应用程序包含第三方代码，即SDK（软件开发工具包）：这些预构建的软件组件通常用于分析和广告，但也能够追踪用户行为（包括位置信息），并将这些信息共享给外部公司。

Forty percent of the apps collected or shared more data than they disclosed in their Google or Apple store listings, the researchers found.

研究人员发现，40%的应用程序收集或共享的数据超出了它们在谷歌或苹果应用商店中披露的范围。

The most common SDKs came from Google and Facebook, the two companies that dominate US digital advertising. But 76 turned up in all, including code traced back to China, Russia, Israel, India, Germany, and others. Roughly 7 percent of the apps carried third-party code from a nation considered adversarial by the Pentagon.

最常见的SDK来自谷歌和Facebook这两家主导美国数字广告的公司。但研究总共发现了76种SDK，其中包括可追溯至中国、俄罗斯、以色列、印度、德国等地的代码。约7%的应用程序携带了来自五角大楼所认为的敌对国家的第三方代码。

Twelve of the apps contained HMS Core, a Huawei software kit that advertises the ability to map user locations, deliver ads, and store images and video. Several were built for state National Guard organizations.

其中12款应用程序包含华为的HMS Core，这是一个宣称具备定位用户、投放广告以及存储图像和视频能力的软件套件。其中几款应用是为州国民警卫队开发的。

The researchers observed no data actually going to Huawei servers. But an SDK can be updated remotely at any time. Code that is dormant today can still be spyware tomorrow. In at least one case, noted by the study, the Huawei code arrived without the app’s developer’s knowledge, smuggled in as a dependency in a commercial notification tool.

研究人员并未观察到数据实际流向华为服务器。但SDK可以随时远程更新。今天处于休眠状态的代码明天可能就会变成间谍软件。研究指出，至少有一个案例显示，华为代码是在应用开发者不知情的情况下，作为商业通知工具的依赖项被“偷运”进来的。

The researchers also surveyed 103 military-affiliated Americans—active-duty service members, reservists, veterans, DoD civilians, and their families—about the data practices they encountered on their own phones. More than 83 percent used at least one app engaging in data practices they said made them uncomfortable. On average, those participants used more than three such apps.

研究人员还调查了103名与军队相关的人员（包括现役军人、预备役人员、退伍军人、国防部文职人员及其家属），了解他们在手机上遇到的数据处理行为。超过83%的受访者表示，他们至少使用过一款令其感到不安的应用程序。平均而言，这些参与者使用了超过三款此类应用。

Between 76 and 83 percent of participants said they were extremely uncomfortable with apps containing code from China, Russia, Iran, or North Korea—the four nations the Pentagon designates as cyber adversaries. But no user has a straightforward way to know which apps carry such code. Neither Google's Play Store Data Safety section nor Apple's App Store Privacy Labels disclose the country of origin of the software running inside an app.

76%到83%的参与者表示，对于包含来自中国、俄罗斯、伊朗或朝鲜（五角大楼指定的四个网络敌对国家）代码的应用程序感到极度不安。但用户没有直接的方法来识别哪些应用携带此类代码。无论是谷歌应用商店的“数据安全”部分，还是苹果应用商店的“隐私标签”，都不会披露应用内部运行软件的来源国。

Participants reported being more comfortable with data collection when an app was branded for military use.

参与者表示，如果应用程序带有“军事用途”的品牌标识，他们对数据收集的抵触心理会稍弱一些。

Meanwhile, nearly two-thirds said they had received little or no institutional guidance on personal app use. Of those who had received some, nearly three-quarters called it inadequate.

与此同时，近三分之二的受访者表示，他们几乎没有收到过关于个人使用应用程序的机构指导。在收到过指导的人中，近四分之三的人认为这些指导是不充分的。

The Pentagon declined to comment.

五角大楼拒绝置评。

Asked to weigh potential mitigations, participants ranked in-phone warnings—alerts when foreign or unknown third-party code is present in an installed app—as both the most effective and the most likely for them to support.

当被问及如何权衡潜在的缓解措施时，参与者将“手机内置警告”（即当已安装的应用程序中存在外国或未知的第三方代码时发出提醒）评为最有效且最愿意支持的方案。

A federal law restricting data brokers from buying or selling data on military-affiliated personnel, independent audits of app privacy disclosures, and stricter bans on foreign code in military-marketed apps drew nearly identical support.

限制数据经纪人买卖军方相关人员数据的联邦法律、对应用隐私披露进行独立审计，以及对军事类应用中外国代码的更严格禁令，也获得了几乎同等程度的支持。