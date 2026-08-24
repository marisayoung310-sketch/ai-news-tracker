---
title: "🤗 Kernels: Major Updates"
originalUrl: "https://huggingface.co/blog/revamped-kernels"
date: "2026-07-06T22:45:50.372Z"
---

# 🤗 Kernels: Major Updates

In our previous post (From Zero to GPU), we introduced the 🤗 Kernels project, which aims at standardizing how custom kernels are packaged, distributed, and consumed. We want the project to be frictionless and secure, while making it as Hub-friendly as possible. Over the past few months, we have worked towards this goal. In the process, we also almost completely redesigned the project. This post will summarize the major updates we have shipped and what’s coming.

在之前的文章（从零到 GPU）中，我们介绍了 🤗 Kernels 项目，旨在标准化自定义内核（kernels）的打包、分发和使用方式。我们希望该项目能够实现无缝且安全，同时尽可能地与 Hugging Face Hub 兼容。在过去的几个月里，我们一直致力于实现这一目标。在此过程中，我们几乎彻底重构了该项目。本文将总结我们已经发布的主要更新以及未来的规划。

### Kernels – a new repository type
### Kernels – 一种新的仓库类型

We have introduced a new repository type on the Hub called "kernel". This enables us to cater to users with compute-related specificities. For example, a user can get a sense of which accelerators, operating systems, and backend versions are supported for a given kernel.

我们在 Hub 上引入了一种名为“kernel”的新仓库类型。这使我们能够满足用户在计算方面的特定需求。例如，用户可以直观地了解某个特定内核支持哪些加速器、操作系统和后端版本。

Making these kernels first-class citizens of the Hub also benefits the AI ecosystem. Users can now see trends across kernels, models, and the applications that use them. The kernels become more discoverable to users.

将这些内核作为 Hub 的一等公民，也有利于整个 AI 生态系统。用户现在可以查看内核、模型以及使用它们的应用之间的趋势。内核对用户来说变得更易于发现。

### Improved security
### 改进的安全性

Kernels run native code with the same privileges as the Python process that loads them, so a malicious kernel can do real harm. Therefore, security has always been of utmost importance to the Kernels project. This is why we focused early on reproducibility: you should be able to recompile a kernel yourself and verify that it matches the publicly available source. We use Nix to make this possible, since it keeps builds pure through hermetic evaluation of the build recipe and a strongly isolated sandbox. We further improve provenance by embedding the source Git SHA1 into the kernel itself. In recent months, we have added additional layers of defense: trusted kernel publishers and code signing.

内核运行原生代码时，拥有与加载它们的 Python 进程相同的权限，因此恶意内核可能会造成严重损害。因此，安全性一直是 Kernels 项目的重中之重。这就是我们早期专注于可复现性的原因：你应该能够自行重新编译内核，并验证其是否与公开的源代码一致。我们使用 Nix 来实现这一点，因为它通过对构建配方进行封闭式评估和强隔离的沙箱环境，保持了构建的纯净性。我们还通过将源代码的 Git SHA1 嵌入到内核本身，进一步提高了来源的可追溯性。近几个月来，我们增加了额外的防御层：受信任的内核发布者和代码签名。

### Trusted kernel publishers
### 受信任的内核发布者

With the new repo type, we also introduced “trusted publishers”. Since kernels execute code on a machine with the same privileges as the Python process they are used in, an attacker could compromise machines by uploading a malicious kernel and coaxing you to use that kernel. To help you avoid such malicious kernels, the kernels package will now only load kernels by trusted publishers by default. A trusted publisher is an organization that is trusted by the community to act in good faith.

随着新仓库类型的推出，我们还引入了“受信任的发布者”。由于内核在机器上执行代码时拥有与所使用的 Python 进程相同的权限，攻击者可能会通过上传恶意内核并诱导你使用它来破坏机器。为了帮助你避免此类恶意内核，`kernels` 包现在默认仅加载来自受信任发布者的内核。受信任的发布者是指被社区信任、能够诚信行事的组织。

### Kernel signing
### 内核签名

An additional layer of security that we are adding is code signing. Code signing protects against the scenario where an attacker uploads a malicious kernel to a kernel repo from a trusted publisher whose Hub credentials were compromised. In code signing, a kernel is signed with a private key known only to the kernel developer and validated with a public key that is generally available. In the Hub compromise scenario, an attacker cannot sign the malicious kernel since they do not own the private key needed for signing.

我们增加的另一个安全层是代码签名。代码签名可以防止攻击者在受信任发布者的 Hub 凭据被泄露时，向其仓库上传恶意内核的情况。在代码签名中，内核使用仅内核开发者知晓的私钥进行签名，并使用公开的公钥进行验证。在 Hub 被入侵的情况下，攻击者无法对恶意内核进行签名，因为他们没有签名所需的私钥。

### Revamped CLIs
### 改进的 CLI

Previously, a bunch of utilities were intertwined between `kernels` and `kernel-builder`. We have established a better separation of concern between the CLI of `kernels` and `kernel-builder`. The mental model here is that `kernels` is a library for loading and preparing kernels for use. Therefore, it should not include anything related to “building” kernels. As a result of this, both `kernels` and `kernel-builder` are now much leaner and more specific.

此前，许多实用工具在 `kernels` 和 `kernel-builder` 之间相互交织。我们现在在 `kernels` 和 `kernel-builder` 的 CLI 之间建立了更好的关注点分离。这里的核心逻辑是：`kernels` 是一个用于加载和准备内核以供使用的库，因此它不应包含任何与“构建”内核相关的内容。结果是，`kernels` 和 `kernel-builder` 现在都变得更加精简且职责明确。

### More coverage of frameworks and backends
### 更广泛的框架和后端支持

We have extended support for frameworks, the most visible changes are: We added support for the Torch Stable ABI to `kernels` and `kernel-builder`. The Torch Stable ABI allows kernel developers to target a particular Torch version or any version that is released after it for roughly two years. Apache TVM FFI is the first framework to be supported besides Torch. TVM FFI is a standardized ABI for kernels that interoperates with other frameworks such as PyTorch, Jax, and CuPy.

我们扩展了对框架的支持，最显著的变化包括：我们为 `kernels` 和 `kernel-builder` 增加了对 Torch Stable ABI 的支持。Torch Stable ABI 允许内核开发者针对特定的 Torch 版本，或在该版本发布后约两年内发布的任何版本进行开发。Apache TVM FFI 是除 Torch 之外首个被支持的框架。TVM FFI 是一种标准化的内核 ABI，可与 PyTorch、Jax 和 CuPy 等其他框架互操作。