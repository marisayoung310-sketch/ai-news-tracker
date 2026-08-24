---
title: "Library Oriented Architecture: The Most Interesting Architecture Pattern You've Probably Never Heard About"
originalUrl: "https://dev.to/jairojr-software-engineer/library-oriented-architecture-the-most-interesting-architecture-pattern-youve-probably-never-4e7i"
date: "2026-06-07T22:44:41.616Z"
---

# Library Oriented Architecture: The Most Interesting Architecture Pattern You've Probably Never Heard About
# 面向库的架构 (LOA)：你可能从未听说过的最有趣的架构模式

Hello! I'm Jairo Jr, your favorite Dev.to writter, or something like this 😄. Over the last few years, I've spent a lot of time studying software architecture. Like most backend engineers, I've gone through the usual journey: Layered Architecture, Clean Architecture, Hexagonal Architecture, Event-Driven Architecture, and Microservices. While exploring different concepts, I found an architecture style that immediately caught my attention: Library Oriented Architecture (LOA). I first discovered the term while reading an article by Krystian Kościelniak, and it completely changed how I think about domains and code organization. The funny thing is that the idea sounds almost too simple. And if you're a software engineer, you already know that's usually when things get dangerous 😄.

你好！我是 Jairo Jr，你们最喜欢的 Dev.to 作者，或者类似的角色 😄。在过去的几年里，我花了很多时间研究软件架构。像大多数后端工程师一样，我经历过常规的演进路径：分层架构、整洁架构 (Clean Architecture)、六边形架构、事件驱动架构以及微服务。在探索各种概念的过程中，我发现了一种立刻吸引我注意的架构风格：面向库的架构 (Library Oriented Architecture, LOA)。我最初是在阅读 Krystian Kościelniak 的一篇文章时发现这个术语的，它彻底改变了我对领域和代码组织的思考方式。有趣的是，这个想法听起来简单得有些过分。如果你是一名软件工程师，你一定知道，这通常就是事情变得危险的信号 😄。

### 🤔 The Problem Every Growing Application Faces
### 🤔 每个成长型应用都会面临的问题

Have you ever opened a codebase and asked yourself: Where does one domain end and another begin? At first, everything seems organized. Then the project grows, new features arrive, more business rules appear, and suddenly billing knows about users, users know about notifications, notifications know about payments, and nobody knows who owns what anymore. The code still works, but the boundaries become blurry. And blurry boundaries usually create expensive problems. The problem looks something like this: As applications grow, ownership becomes harder to understand. A feature that originally belonged to one domain slowly starts leaking into others, creating dependencies that nobody planned and everyone eventually has to maintain.

你是否曾打开一个代码库并问自己：一个领域在哪里结束，另一个领域又从哪里开始？起初，一切看起来井井有条。随着项目增长、新功能加入、业务规则增多，突然间，计费模块开始了解用户，用户模块了解通知，通知模块了解支付，没人再清楚谁负责什么。代码依然能运行，但边界变得模糊。而模糊的边界通常会带来昂贵的代价。问题大致如下：随着应用增长，所有权变得难以界定。一个原本属于某个领域的功能，慢慢开始渗透到其他领域，产生了没人计划过、但每个人最终都不得不维护的依赖关系。

### 🧠 Before LOA, We Need to Talk About Ontologies
### 🧠 在谈论 LOA 之前，我们需要先聊聊本体论 (Ontology)

To understand Library Oriented Architecture, we first need to understand a concept called Ontology. The word ontology sounds much more complicated than it actually is. Honestly, the first time I read the word, I thought I was accidentally reading a philosophy book instead of a software architecture article 📖. In software terms, an ontology is simply a way to describe concepts, relationships, and business rules inside a specific domain. Think about an e-commerce platform. You have Customers, Orders, Products, and Payments. More importantly, you have rules that connect those concepts together. For example: Customers create Orders, Orders contain Products, Payments settle Orders. An ontology defines that language and those relationships. In other words: An ontology describes the language of a domain. Visually, it looks something like this: Once you start thinking about systems as collections of concepts and relationships, LOA begins to make a lot more sense.

要理解面向库的架构，我们首先需要理解一个叫“本体论”的概念。这个词听起来比它实际含义复杂得多。老实说，我第一次读到这个词时，还以为自己不小心在读哲学书，而不是软件架构文章 📖。在软件术语中，本体论仅仅是一种描述特定领域内概念、关系和业务规则的方法。以电商平台为例，你有客户、订单、产品和支付。更重要的是，你有一套连接这些概念的规则。例如：客户创建订单，订单包含产品，支付结算订单。本体论定义了这种语言和这些关系。换句话说：本体论描述了一个领域的语言。从视觉上看，它大致是这样的：一旦你开始将系统视为概念和关系的集合，LOA 就变得非常有意义了。

### 📚 The Core Idea Behind LOA
### 📚 LOA 的核心思想

The central idea of Library Oriented Architecture is surprisingly simple: Each domain becomes a library. That's it. No secret framework. No new runtime. No AI-powered blockchain-driven microservice mesh 🚀✨😅. Not a package. Not a folder. Not a module hidden inside a monolith. A real library. Each library contains everything related to that specific business capability: Domain concepts, Domain rules, Domain behavior, Domain use cases. For example: customer-library, payment-library, inventory-library, notification-library. Each one owns its knowledge. Each one owns its rules. Each one owns its evolution. Instead of having a giant application where domains are mixed together, you have independent units with explicit ownership. The domain stops being a section of the application and becomes a first-class citizen.

面向库的架构的核心思想出奇地简单：每个领域都成为一个库。就是这样。没有秘密框架，没有新的运行时，没有 AI 驱动的区块链微服务网格 🚀✨😅。不是一个包，不是一个文件夹，也不是隐藏在单体应用中的一个模块。而是一个真正的库。每个库都包含与该特定业务能力相关的一切：领域概念、领域规则、领域行为、领域用例。例如：客户库、支付库、库存库、通知库。每一个库都拥有自己的知识，拥有自己的规则，拥有自己的演进路径。你不再拥有一个领域混杂在一起的庞大应用，而是拥有了具有明确所有权的独立单元。领域不再是应用的一部分，而是成为了“一等公民”。

### 🏗️ The Structure
### 🏗️ 架构结构

A simplified LOA application usually looks like this: The architecture can be divided into three major parts: the Application, the Middleware, and the Domain Libraries. **Application**: The application is the entry point of the system. It contains framework integrations, dependency injection, controllers, API endpoints, and infrastructure configuration. Its responsibility is orchestration. The application knows how to connect things together, but it does not own domain knowledge. **Middleware**: The middleware acts as a bridge between the application and the libraries. Its responsibility is providing common services such as: HTTP communication, Caching, Persistence abstractions, Messaging, Shared utilities. The goal is avoiding direct infrastructure coupling inside domain libraries. **Libraries**: This is where the business actually lives. Each library contains: Business entities, Business rules, Use cases, Domain logic. Ideally, it contains no framework dependencies, no infrastructure concerns, and no knowledge about the application itself. The library only knows its domain. And that's powerful.

一个简化的 LOA 应用通常看起来是这样的：该架构可以分为三个主要部分：应用层 (Application)、中间件层 (Middleware) 和领域库 (Domain Libraries)。**应用层**：应用是系统的入口点。它包含框架集成、依赖注入、控制器、API 端点和基础设施配置。它的职责是编排。应用知道如何将事物连接在一起，但它不拥有领域知识。**中间件层**：中间件充当应用和库之间的桥梁。它的职责是提供通用服务，例如：HTTP 通信、缓存、持久化抽象、消息传递、共享工具。其目标是避免在领域库内部产生直接的基础设施耦合。**领域库**：这是业务真正存在的地方。每个库包含：业务实体、业务规则、用例、领域逻辑。理想情况下，它不包含任何框架依赖、基础设施关注点，也不了解应用本身。库只了解它自己的领域。这非常强大。

### 💡 Why I Like This Idea
### 💡 为什么我喜欢这个想法

The biggest thing that attracted me to LOA is clarity. When a domain becomes a library, ownership becomes explicit. You immediately know where business rules belong, where changes should happen, and who owns a particular piece of functionality. After working with large codebases for years, I've noticed that many architecture problems aren't technical problems at all. They're ownership problems. LOA addresses that challenge directly by making domain boundaries visible and enforceable. The architecture encourages engineers to think in terms of business capabilities instead of technical layers, which tends to produce cleaner and more maintainable systems over time.

LOA 最吸引我的地方在于清晰度。当一个领域成为一个库时，所有权就变得明确了。你可以立即知道业务规则属于哪里、变更应该在哪里发生，以及谁拥有特定的功能。在处理大型代码库多年后，我注意到许多架构问题根本不是技术问题，而是所有权问题。LOA 通过使领域边界可见且可强制执行，直接解决了这一挑战。这种架构鼓励工程师从业务能力而非技术分层的角度进行思考，这往往能随着时间的推移产生更整洁、更易于维护的系统。

### 🔍 Isn't This Just a Modular Monolith?
### 🔍 这不就是模块化单体吗？

At first glance, it looks very similar. And honestly, there is some overlap. If you're thinking: This sounds suspiciously like a modular monolith. You're not alone. I had exactly the same reaction 😅. Both approaches aim to create strong boundaries and reduce coupling. The difference is that LOA pushes modularity one step further. Instead of thinking: This folder belongs to the payment module. You start thinking: This library IS the payment domain. That subtle difference changes how teams design software. The domain stops being a folder inside the application and becomes an independent unit with its own lifecycle and ownership.

乍一看，它看起来非常相似。老实说，确实存在一些重叠。如果你在想：“这听起来很像模块化单体。”你并不孤单，我当时也是这种反应 😅。这两种方法都旨在建立强大的边界并减少耦合。不同之处在于，LOA 将模块化更推进一步。你不再思考：“这个文件夹属于支付模块。”而是开始思考：“这个库就是支付领域。”这种微妙的差异改变了团队设计软件的方式。领域不再是应用内的一个文件夹，而是一个拥有自己生命周期和所有权的独立单元。