---
title: "Gemini Robotics 2 Brings Google's AI Into the Physical World"
originalUrl: "https://www.wired.com/story/google-gemini-can-control-humanoid-robots/"
date: "2026-07-30T22:35:11.668Z"
---

# Gemini Robotics 2 Brings Google's AI Into the Physical World
# Gemini Robotics 2 将谷歌 AI 带入物理世界

Google DeepMind just released a new version of its artificial intelligence model Gemini, and it can control a range of different robots—including humanoids capable of dextrous tasks like screwing in lightbulbs and tying trash bags.

Google DeepMind 刚刚发布了其人工智能模型 Gemini 的新版本，该版本能够控制多种不同的机器人，包括能够执行拧灯泡和系垃圾袋等灵巧任务的人形机器人。

Gemini Robotics 2 combines several different AI models into a single system. Taken together, they allow a robot to make sense of its surroundings and how to act in it. A vision language model (VLM), which understands images and video, can communicate with humans and reason how to perform different tasks. Two vision language action (VLA) models, trained to understand how to move in physical space, control the robot’s full-body movement as well as the movements of grippers or hands.

Gemini Robotics 2 将多个不同的 AI 模型整合为一个系统。它们共同作用，使机器人能够理解周围环境并决定如何采取行动。其中，视觉语言模型 (VLM) 负责理解图像和视频，能够与人类交流并推理如何执行不同任务；两个视觉语言动作 (VLA) 模型则经过训练，能够理解如何在物理空间中移动，从而控制机器人的全身运动以及抓取器或手的动作。

In video demonstrations shared ahead of the release, the company showed several different robots performing complex tasks autonomously using the amalgamated model. In one demo, Apptronik’s Apollo 2 robot used hands from a company called Sharpa to tidy shelves. Google DeepMind trained the model to perform these tasks using a mix of human teleoperation, video examples, and simulations—it’s not yet possible for AI models to perform a wide range of complex tasks without specific training.

在发布前分享的视频演示中，该公司展示了多种不同的机器人利用这一整合模型自主执行复杂任务。在其中一个演示中，Apptronik 的 Apollo 2 机器人使用了一家名为 Sharpa 的公司提供的机械手来整理货架。Google DeepMind 通过结合人类远程操作、视频示例和模拟训练来让模型执行这些任务——目前 AI 模型还无法在没有特定训练的情况下执行广泛的复杂任务。

Although Anthropic and OpenAI have taken a lead with chatbots and AI coding tools, Google has a stronger track record in robotics research, and has published important work on using AI to train robots to do useful things. The release is another sign that the search giant is betting AI will need to break free from the digital realm to realize its full potential. (It previously partnered with Boston Dynamics, a leader in legged robots, to provide the brains for those machines.)

尽管 Anthropic 和 OpenAI 在聊天机器人和 AI 编程工具方面处于领先地位，但谷歌在机器人研究方面拥有更深厚的积累，并发表了许多关于利用 AI 训练机器人执行实用任务的重要成果。此次发布再次表明，这家搜索巨头押注 AI 必须摆脱数字领域的束缚，才能充分发挥其潜力。（此前，谷歌曾与足式机器人领域的领导者波士顿动力公司合作，为其机器提供“大脑”。）

“It's another milestone in our path towards really getting towards what we call like physical AGI, which means we get a robot to do anything that a human can,” Carolina Parada, head of robotics at Google DeepMind, tells WIRED.

“这是我们迈向所谓‘物理通用人工智能’（Physical AGI）道路上的又一个里程碑，这意味着我们要让机器人能够完成人类所能做的一切，”Google DeepMind 机器人技术负责人 Carolina Parada 对《连线》（WIRED）杂志表示。

Giving frontier AI models access to robots so that they can wander around workplaces or homes and manipulate objects does, however, come with risks. Previous research has shown that using frontier AI to control robots can produce unexpected and sometimes dangerous behavior. And the idea that these models can take sudden or unwanted actions in the digital realm became apparent recently, when an unreleased AI agent developed by OpenAI hacked several systems.

然而，让前沿 AI 模型接入机器人，使其能够在工作场所或家中自由移动并操纵物体，确实伴随着风险。此前的研究表明，使用前沿 AI 控制机器人可能会产生不可预见甚至危险的行为。此外，这些模型在数字领域可能采取突然或不当行动的担忧在近期变得愈发明显，当时 OpenAI 开发的一款未发布 AI 智能体曾入侵了多个系统。

“The safety question is even more pressing because you're putting them in a lot of other situations,” Parada says. “There's a lot of uncertainty that will show up, and so you want to be able to understand the safety question more deeply.”

“安全问题变得更加紧迫，因为你将它们置于许多其他复杂情境中，”Parada 说，“会有很多不确定性出现，因此你需要能够更深入地理解安全问题。”

Parada says Google takes a multi-layered approach to safety, with guardrails applied on each model layer. It’s also introducing ASIMOV-Agentic, a new benchmark for measuring the safety of various AI systems collaborating to control a robot. The benchmark detects whether a command will result in harmful or uncertain outcome.

Parada 表示，谷歌采取了多层安全防护措施，在每个模型层都设置了护栏。公司还推出了 ASIMOV-Agentic，这是一个用于衡量多个 AI 系统协作控制机器人时安全性的新基准。该基准可以检测指令是否会导致有害或不确定的结果。

The company’s CEO, Demis Hassabis, previously told WIRED that he hopes to develop an AI operating system for many different robots similar to the Android operating system for smartphones.

该公司首席执行官 Demis Hassabis 此前曾告诉《连线》，他希望为多种不同的机器人开发一种 AI 操作系统，类似于智能手机的 Android 操作系统。