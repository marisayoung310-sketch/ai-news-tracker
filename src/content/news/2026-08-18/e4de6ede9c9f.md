---
title: "The Agent Left the IDE"
originalUrl: "https://dev.to/prpatel05/the-agent-left-the-ide-39fo"
date: "2026-08-17T21:55:02.809Z"
---

# The Agent Left the IDE
# 智能体离开了 IDE

The most interesting thing about AI coding agents right now is not that they can write code. It is that they are starting to operate computers. That sounds like a small distinction until you feel it in the workflow. A code generator lives inside a text box. It waits for a prompt, returns a patch, and leaves the rest of the job to you. A software operator can inspect the app, click through the broken flow, read the console, run the server, reproduce the issue, change the code, and check whether the thing actually works. That is a different kind of tool.
目前 AI 编程智能体最有趣的地方不在于它们能写代码，而在于它们开始能够操作计算机了。这听起来只是一个细微的区别，但当你亲身体验到工作流的变化时，就会明白其意义所在。代码生成器只存在于文本框中：它等待提示词，返回一段补丁代码，然后把剩下的工作留给你。而软件操作员可以检查应用程序、点击排查故障流程、读取控制台、运行服务器、复现问题、修改代码，并验证功能是否真正生效。这是一种完全不同的工具。

OpenAI's May 29 Codex update points in that direction. Codex now supports computer use on Windows in the Codex app for eligible users, so it can see, click, and type in Windows applications while testing and refining software. The same release also expands remote control, letting a user steer work from ChatGPT on mobile or Codex on Mac while the Windows machine remains the host for the project files, shell, app server, and local context. I do not think the important part is Windows support by itself. The important part is the new shape of work.
OpenAI 在 5 月 29 日发布的 Codex 更新正指向这一方向。符合条件的用户现在可以在 Windows 上的 Codex 应用中使用“计算机操作”功能，这意味着它可以在测试和优化软件时查看、点击并输入 Windows 应用程序。此次更新还扩展了远程控制功能，允许用户通过手机端的 ChatGPT 或 Mac 端的 Codex 来指挥工作，而 Windows 机器则作为项目文件、Shell、应用服务器和本地环境的宿主。我认为重点不在于 Windows 支持本身，而在于工作形态的重塑。

### Coding Was Never Just Typing
### 编程从来不只是打字

For a while, the AI coding story was mostly about generation. Could the model write a component? Could it scaffold an API route? Could it refactor a file without losing the plot? Useful, but narrow. Real software work has always been messier than text generation. You open the app. You notice the layout is wrong. You click a button. Nothing happens. You check the terminal. The dev server crashed. You restart it. The page loads, but the empty state is off. You resize the browser. The mobile nav breaks. You skim the network tab. The request is fine, but the UI state is stale. None of that is "write code" in the pure sense. It is operating the system around the code. That is why computer use matters. It gives the agent access to the loop that human engineers actually live in: observe, diagnose, change, verify. The text editor is only one stop in that loop.
曾几何时，AI 编程的故事主要围绕着“生成”。模型能写一个组件吗？能搭建一个 API 路由吗？能重构一个文件而不出错吗？这些很有用，但范围太窄。真正的软件开发工作远比文本生成要混乱得多。你打开应用，发现布局不对；点击按钮，没反应；检查终端，开发服务器崩溃了；重启它，页面加载了，但空状态显示异常；调整浏览器大小，移动端导航栏坏了；浏览网络请求标签页，请求没问题，但 UI 状态已过期。这些都不是纯粹意义上的“写代码”，而是围绕代码操作整个系统。这就是“计算机操作”功能的重要性所在——它让智能体能够进入人类工程师真正身处的循环：观察、诊断、修改、验证。而文本编辑器只是这个循环中的一站。

### The IDE Is Too Small
### IDE 太狭隘了

The IDE was a natural starting point for AI coding tools because code is text. Put the model near the text and it can help. But the product surface of software is not the IDE. It is the browser, the terminal, the database, the logs, the design tool, the cloud dashboard, the test runner, the email preview, the mobile simulator, and sometimes a random desktop app that only exists because some enterprise workflow depends on it. If the agent can only see the repository, it is always working from a partial truth. It can infer what should happen. It can read tests. It can inspect types. It can even run commands if the environment allows it. But it cannot fully understand the gap between the code and the experience unless it can look at the experience.
IDE 是 AI 编程工具的天然起点，因为代码就是文本。把模型放在文本旁边，它就能提供帮助。但软件的产品面不仅仅是 IDE，还包括浏览器、终端、数据库、日志、设计工具、云仪表盘、测试运行器、邮件预览、移动模拟器，有时甚至是一些仅因企业工作流需求而存在的随机桌面应用。如果智能体只能看到代码仓库，它永远是在“局部真相”的基础上工作。它可以推断应该发生什么，可以阅读测试，可以检查类型，甚至在环境允许的情况下运行命令。但除非它能观察到实际的体验，否则它无法完全理解代码与用户体验之间的鸿沟。

This is why frontend work has been such a revealing test. A model can produce valid React and still ship an interface that feels wrong. It can pass tests and still overlap text on mobile. It can implement the requested behavior and miss that the loading state jumps the layout. The browser catches what the diff cannot. An agent that can look, click, and iterate has a better shot at closing that gap.
这就是为什么前端工作是一个极具启发性的测试。模型可以写出有效的 React 代码，但交付的界面却感觉不对劲。它可以通过测试，但在移动端上文字依然会重叠。它实现了要求的功能，却没发现加载状态会导致布局跳动。浏览器能捕捉到代码差异（diff）无法发现的问题。一个能够观察、点击并迭代的智能体，更有机会弥合这一鸿沟。

### Remote Control Changes the Cadence
### 远程控制改变了节奏

The remote-control part may end up being just as important as computer use. When an agent can keep working on the host machine while you check in from somewhere else, the job starts to feel less like a chat session and more like delegated work. You do not need to sit there watching every command. You can let the agent run until it hits a decision point, then answer the question, redirect it, or approve the next step. That changes the cadence of engineering.
远程控制部分的重要性可能最终不亚于计算机操作本身。当智能体可以在宿主机上持续工作，而你从别处进行检查时，这项工作感觉就不再像是一次聊天，而更像是“委派工作”。你不需要坐在那里盯着每一个命令，你可以让智能体运行到决策点，然后回答问题、重定向任务或批准下一步。这改变了工程的节奏。

The old cadence was synchronous. You were either coding or you were not. If you stepped away, the work stopped. The new cadence is supervisory. You define the goal, give the agent enough context, and let it move through the loop. Your job is to keep the judgment layer alive. Is this still the right approach? Did it choose the right tradeoff? Is the patch too broad? Did it verify the thing that matters? That is closer to managing a capable junior engineer than using autocomplete. And like managing a junior engineer, the value depends on the quality of your delegation.
旧的节奏是同步的：你要么在写代码，要么不在。如果你离开，工作就停止了。新的节奏是监督式的：你定义目标，提供足够的上下文，让智能体在循环中运行。你的工作是保持判断力：这仍然是正确的方法吗？它选择了正确的权衡吗？补丁范围是否太广？它验证了关键点吗？这更像是管理一名能干的初级工程师，而不是使用自动补全。和管理初级工程师一样，其价值取决于你委派工作的质量。

### The Risk Moves Too
### 风险也随之转移

There is a tempting version of this story where more agent autonomy simply means more productivity. That is not the full picture. An agent with computer use has a wider action surface. It can click the wrong thing. It can misunderstand a modal. It can test against the wrong environment. It can mistake a locally cached state for a real fix. It can spend time polishing the visible symptom while missing the deeper bug. More access is only useful when the workflow has boundaries. That means you still need clear permissions, disposable environments, human approval for risky actions, and a review process that treats agent work like real work. Especially when the agent is touching systems outside the editor.
这个故事有一个诱人的版本，即智能体自主性越高，生产力就越高。但这并不全面。拥有计算机操作能力的智能体拥有更广的行动面：它可能点错东西，可能误解弹窗，可能在错误的环境中测试，可能把本地缓存状态误认为真正的修复，也可能花时间修饰表面症状而忽略了更深层的 Bug。只有当工作流有边界时，更多的访问权限才有意义。这意味着你仍然需要明确的权限、可丢弃的环境、对高风险操作的人工审批，以及将智能体工作视为正式工作的审查流程。尤其是当智能体触及编辑器之外的系统时。

The mistake is assuming that because the agent can operate more of the computer, it should be allowed to operate everything. Good delegation is scoped. Give the agent a sandbox. Give it the app server, the browser, the test suite, and enough project context to make progress. Keep production credentials, irreversible actions, billing changes, and sensitive user data behind a stronger gate. The point is not to make the agent fearless. The point is to make it useful without making it dangerous.
错误的假设是：因为智能体能操作更多的计算机功能，所以就应该允许它操作一切。好的委派是有范围的。给智能体一个沙盒，给它应用服务器、浏览器、测试套件和足够的项目上下文来推进工作。但要将生产环境凭证、不可逆操作、账单变更和敏感用户数据置于更严格的门禁之后。重点不是让智能体变得无所畏惧，而是让它在不造成危险的前提下变得有用。

### The Best Workflows Will Be Visible
### 最好的工作流将是“可见的”

As agents become more operational, the winning workflows will be the ones that make the agent's work easy to inspect. I want to see what it tried. I want screenshots when the UI changes. I want terminal output when a test fails. I want a short explanation of why it chose one fix over another. I want the final diff to be boring and the verification trail to be clear. This is the difference between autonomy and trust. Autonomy means the agent can move. Trust means I can understand.
随着智能体变得越来越具操作性，胜出的工作流将是那些易于检查智能体工作的工作流。我想看到它尝试了什么，UI 变化时我想看到截图，测试失败时我想看到终端输出，我想看到它为何选择某种修复方案的简短解释。我希望最终的代码差异是平淡无奇的，而验证过程是清晰可见的。这就是自主与信任的区别：自主意味着智能体可以行动，而信任意味着我可以理解。