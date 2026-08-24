---
title: "webpack / webpack"
originalUrl: "https://github.com/webpack/webpack"
date: "2026-08-04T22:35:41.017Z"
---

# webpack / webpack

Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.
Webpack 是一个模块打包器。它的主要目的是将 JavaScript 文件打包以供浏览器使用，但它同时也能够转换、打包或封装几乎任何资源或资产。

### TL;DR
### 简而言之
Bundles ES Modules, CommonJS, and AMD modules (even combined). Can create a single bundle or multiple chunks that are asynchronously loaded at runtime (to reduce initial loading time). Dependencies are resolved during compilation, reducing the runtime size. Loaders can preprocess files while compiling, e.g. TypeScript to JavaScript, Handlebars strings to compiled functions, images to Base64, etc. Highly modular plugin system to do whatever else your application requires.
支持打包 ES Modules、CommonJS 和 AMD 模块（甚至可以混合使用）。可以创建一个单一的包，或者多个在运行时异步加载的块（以减少初始加载时间）。依赖关系在编译期间解析，从而减小运行时体积。Loader 可以在编译时预处理文件，例如将 TypeScript 转换为 JavaScript，将 Handlebars 字符串编译为函数，将图像转换为 Base64 等。高度模块化的插件系统可以满足你应用程序的其他任何需求。

### Concepts
### 核心概念

**Plugins**
Webpack has a rich plugin interface. Most of the features within webpack itself use this plugin interface. This makes webpack very flexible.
**插件**
Webpack 拥有丰富的插件接口。Webpack 自身的大多数功能都使用了这个插件接口，这使得 Webpack 非常灵活。

**Loaders**
Webpack enables the use of loaders to preprocess files. This allows you to bundle any static resource way beyond JavaScript. You can easily write your own loaders using Node.js. Loaders are activated by using `loadername!` prefixes in `require()` statements, or are automatically applied via regex from your webpack configuration.
**加载器 (Loaders)**
Webpack 允许使用 loader 来预处理文件。这使你能够打包 JavaScript 之外的任何静态资源。你可以使用 Node.js 轻松编写自己的 loader。Loader 可以通过在 `require()` 语句中使用 `loadername!` 前缀来激活，或者通过 webpack 配置中的正则表达式自动应用。

### Performance
### 性能
Webpack uses async I/O and has multiple caching levels. This makes webpack fast and incredibly fast on incremental compilations.
Webpack 使用异步 I/O 并具有多级缓存。这使得 Webpack 运行迅速，并且在增量编译时速度极快。

### Module Formats
### 模块格式
Webpack supports ES2015+, CommonJS and AMD modules out of the box. It performs clever static analysis on the AST of your code. It even has an evaluation engine to evaluate simple expressions. This allows you to support most existing libraries out of the box.
Webpack 开箱即用地支持 ES2015+、CommonJS 和 AMD 模块。它会对代码的 AST（抽象语法树）进行智能静态分析，甚至内置了一个评估引擎来计算简单的表达式。这使得它能够直接支持大多数现有的库。

### Code Splitting
### 代码分割
Webpack allows you to split your codebase into multiple chunks. Chunks are loaded asynchronously at runtime. This reduces the initial loading time.
Webpack 允许你将代码库拆分为多个块（chunks）。这些块在运行时异步加载，从而减少了初始加载时间。

### Optimizations
### 优化
Webpack can do many optimizations to reduce the output size of your JavaScript by deduplicating frequently used modules, minifying, and giving you full control of what is loaded initially and what is loaded at runtime through code splitting. It can also make your code chunks cache friendly by using hashes.
Webpack 可以通过去重常用模块、压缩代码以及通过代码分割让你完全控制哪些内容在初始时加载、哪些在运行时加载，从而显著减小 JavaScript 的输出体积。它还可以通过使用哈希值（hashes）使你的代码块更利于缓存。

### Contributing
### 参与贡献
We want contributing to webpack to be fun, enjoyable, and educational for anyone, and everyone. We have a vibrant ecosystem that spans beyond this single repo. We welcome you to check out any of the repositories in our organization or webpack-contrib organization which houses all of our loaders and plugins.
我们希望为 Webpack 做出贡献对每个人来说都是有趣、愉快且具有教育意义的。我们拥有一个超越单一仓库的活跃生态系统。欢迎查看我们组织或 `webpack-contrib` 组织下的任何仓库，那里存放着我们所有的 loader 和插件。