---
title: "Neural Networks, Explained for Beginners: Start Here If They’ve Confused You"
originalUrl: "https://towardsdatascience.com/neural-networks-explained-for-beginners-start-here-if-theyve-confused-you/"
date: "2026-06-22T23:04:57.104Z"
---

# Neural Networks, Explained for Beginners: Start Here If They’ve Confused You
# 神经网络初学者指南：如果你感到困惑，请从这里开始

Deep Learning Neural Networks, Explained for Beginners: Start Here If They’ve Confused You. The intuition behind neural networks and why they need activation functions.
深度学习神经网络初学者指南：如果你感到困惑，请从这里开始。本文将带你了解神经网络背后的直觉，以及为什么它们需要激活函数。

Nowadays, everyone’s talking about the latest technologies like large language models, Agentic AI, multimodal systems, and techniques like RAG. What are these technologies actually? How are they built? I learned that large language models (LLMs) are advanced artificial intelligence systems built on heavily trained neural networks. I also wanted to learn about these technologies.
如今，每个人都在谈论大语言模型、智能体 AI（Agentic AI）、多模态系统以及 RAG 等最新技术。这些技术究竟是什么？它们是如何构建的？我了解到，大语言模型（LLMs）是建立在经过大量训练的神经网络之上的高级人工智能系统。我也想深入了解这些技术。

As neural networks form the foundation of these latest technologies, I wanted to start by understanding what a neural network actually is. But when I came across terms like hidden layers, activation functions, image data, and text data, it felt overwhelming to me. It became difficult to continue learning about neural networks.
由于神经网络是这些最新技术的基石，我想从理解什么是神经网络开始。但当我遇到隐藏层、激活函数、图像数据和文本数据等术语时，我感到不知所措，继续学习神经网络变得非常困难。

I understood that we use deep learning and neural networks mainly when dealing with complex data such as images and text. However, I felt that using such complex data could make it difficult to understand the basics of neural networks. I wondered how I could make it simpler. So, instead of starting with complex data, I decided to use simple data to first get a detailed understanding of what’s actually happening inside a neural network.
我明白我们主要在处理图像和文本等复杂数据时使用深度学习和神经网络。然而，我觉得使用如此复杂的数据可能会增加理解神经网络基础知识的难度。我思考如何能让它变得更简单。因此，我决定不从复杂数据入手，而是先使用简单数据，以便详细了解神经网络内部到底发生了什么。

So, the main aim of this article is to understand what neural networks actually are and how they learn from data by using a simple dataset. In this article, we will build a simple neural network from scratch and understand how it works. We will see what happens inside a neuron, how different layers work together, why adding more linear neurons is still not enough, and how activation functions help neural networks model complex patterns in the data.
因此，本文的主要目的是通过一个简单的数据集来理解神经网络的本质，以及它们是如何从数据中学习的。在本文中，我们将从零开始构建一个简单的神经网络，并理解其工作原理。我们将观察神经元内部发生了什么、不同层是如何协同工作的、为什么仅仅增加线性神经元是不够的，以及激活函数如何帮助神经网络对数据中的复杂模式进行建模。

### When a Straight Line Is Not Enough
### 当直线不再足够时

You might have come across similar diagrams like this showing the basic structure of neural networks. Let’s understand this layer by layer. But before we can understand how it works, we need some data. Let’s consider this simple dataset showing the exam scores of students and the hours they studied.
你可能见过类似这样的图表，展示了神经网络的基本结构。让我们一层一层地来理解它。但在理解其工作原理之前，我们需要一些数据。让我们考虑这个展示学生考试成绩与学习时长关系的简单数据集。

Now, we need to predict the exam score based on the hours studied. Let’s apply simple linear regression to this data. We can observe from the above plot that simple linear regression is not enough to model this data well because the relationship in the dataset appears to be non-linear. In other words, we can say that a single straight line is not able to capture the underlying pattern in the data. What can we do now?
现在，我们需要根据学习时长来预测考试成绩。让我们对这些数据应用简单的线性回归。从上面的图表中我们可以观察到，简单的线性回归不足以很好地对这些数据进行建模，因为数据集中的关系似乎是非线性的。换句话说，单条直线无法捕捉数据中潜在的模式。我们现在该怎么办？

### Why Simplicity Matters
### 为什么简单很重要

Let’s build a neural network to solve this problem. At this point, you might ask, why build a neural network at all? Can’t we solve this problem using decision trees or random forests? You are absolutely right. In fact, tree-based algorithms are often preferred for problems involving non-linear tabular data like this one. But our goal here is to understand how a neural network is built and how it works.
让我们构建一个神经网络来解决这个问题。此时你可能会问，为什么要构建神经网络？难道不能用决策树或随机森林来解决吗？你说得完全正确。事实上，对于像这样涉及非线性表格数据的问题，通常更倾向于使用基于树的算法。但我们这里的目标是理解神经网络是如何构建及其工作原理的。

Think of it this way, if you wanted to learn how to drive, would you choose a basic car or a highly powerful adventure car? Most of us would choose a basic car. If we started with a powerful car, we might become overwhelmed by its power and unable to control it. We might end up thinking driving is too difficult, causing us to give up before learning the fundamentals.
换个角度想，如果你想学开车，你会选择一辆基础款汽车还是一辆动力强劲的越野车？我们大多数人会选择基础款。如果我们从动力强劲的车开始，可能会被它的动力所震慑而无法驾驭。最终我们可能会觉得开车太难，在掌握基础知识之前就放弃了。

In the same way, if we start with an image dataset containing hundreds of inputs, we might get overwhelmed and find it difficult to understand the fundamentals of neural networks. So, here we are using this simple dataset not because neural networks are meant only to solve problems like this, but to build an understanding for how they work. Later, we can build on our learnings to understand more complex neural networks that learn highly complex patterns from data.
同样地，如果我们从包含数百个输入特征的图像数据集开始，我们可能会感到不知所措，难以理解神经网络的基础知识。因此，我们在这里使用这个简单的数据集，并不是因为神经网络只能解决这类问题，而是为了建立对它们工作原理的理解。之后，我们可以在此基础上，去理解那些能从数据中学习高度复杂模式的更复杂的神经网络。

### Time for Neural Networks
### 神经网络时间

Let’s once again look at the scatter plot of our dataset. We already know that a single line is not enough to capture the patterns in this data. So, we need a more flexible function that can model these patterns. One way to model such patterns is by using neural networks. First let’s look at one neuron. What does it do, actually?
让我们再次观察数据集的散点图。我们已经知道，单条直线不足以捕捉这些数据中的模式。因此，我们需要一个更灵活的函数来对这些模式进行建模。使用神经网络就是对这类模式进行建模的一种方法。首先，让我们看看一个神经元。它实际上做了什么？

You will be surprised to know that a neuron does something we already know. It takes the input from the data, multiplies it by a weight and adds bias. We can write it in equation form as:
\[ z = wx + b \]
你会惊讶地发现，神经元所做的事情其实我们早就知道了。它接收数据输入，将其乘以权重并加上偏置。我们可以将其写成方程形式：
\[ z = wx + b \]

We have seen this before, right? This is nothing but the equation of a straight line and if we compare it to simple linear regression, we can think of (w) as the slope and (b) as the intercept. Here, we’ve considered only one input feature, where a neuron computes:
\[ z = wx + b \]
我们以前见过这个，对吧？这不就是直线的方程吗？如果我们将其与简单线性回归进行比较，我们可以将 (w) 看作斜率，将 (b) 看作截距。在这里，我们只考虑了一个输入特征，此时神经元的计算公式为：
\[ z = wx + b \]

However, in real-world problems, we often have multiple input features. In that case, the neuron computes:
\[ z = w_1x_1 + w_2x_2 + \cdots + w_nx_n + b \]
然而，在现实世界的问题中，我们通常有多个输入特征。在这种情况下，神经元的计算公式为：
\[ z = w_1x_1 + w_2x_2 + \cdots + w_nx_n + b \]

In matrix form, we can write the same equation as:
\[ z = \mathbf{w}^{T}\mathbf{x} + b \]
where \(\mathbf{w}\) is the vector of weights, \(\mathbf{x}\) is the vector of input features, and \(b\) is the bias term. Here, \(z\) represents the linear output produced by the neuron. Ultimately, we can say that a neuron computes a linear function of its inputs. Now that we have an idea of what a single neuron actually does, let’s once again have a look at this basic diagram.
用矩阵形式，我们可以将同一个方程写为：
\[ z = \mathbf{w}^{T}\mathbf{x} + b \]
其中 \(\mathbf{w}\) 是权重向量，\(\mathbf{x}\) 是输入特征向量，\(b\) 是偏置项。这里，\(z\) 代表神经元产生的线性输出。归根结底，我们可以说神经元计算的是其输入的线性函数。现在我们已经了解了单个神经元的作用，让我们再次看看这个基本图表。