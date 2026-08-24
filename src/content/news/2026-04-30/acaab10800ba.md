---
title: "Compose Branded Graphics from Your AI Assistant — No Design Tools Required"
originalUrl: "https://dev.to/iterationlayer/compose-branded-graphics-from-your-ai-assistant-no-design-tools-required-1jag"
date: "2026-04-30T01:14:23.581Z"
---

# Compose Branded Graphics from Your AI Assistant — No Design Tools Required
# 通过 AI 助手合成品牌图形 — 无需设计工具

The Branded Image Tax Every developer who ships products pays the branded image tax. OG images for every blog post and landing page. Event banners for every launch. Email headers for every campaign. Social cards for every product update. None of these are hard to make. But collectively they eat hours — because every one of them means opening Figma, finding the template, updating the text, fixing the alignment, exporting, uploading. Fifteen minutes per image, multiplied by everything you ship.
**品牌图像税**：每一位发布产品的开发者都在支付“品牌图像税”。每篇博客文章和落地页都需要 OG 图像，每次发布都需要活动横幅，每场营销活动都需要邮件页眉，每个产品更新都需要社交媒体卡片。这些东西制作起来并不难，但加在一起却会消耗数小时的时间——因为每一项任务都意味着要打开 Figma、寻找模板、更新文本、调整对齐方式、导出并上传。每张图 15 分钟，乘以你发布的所有内容，时间成本相当可观。

Before you reach for an AI image generator: tools like DALL-E or Midjourney generate images from abstract prompts, but they don't produce branded graphics with specific fonts, hex colors, and precise layouts. What you actually need for the above use cases isn't generation — it's composition. The Iteration Layer's Image Generation API uses a layer-based model. You specify a canvas size and stack layers: backgrounds, rectangles, text, photos, overlays. The output is pixel-perfect and deterministic. Same layers, same result, every time.
在你求助于 AI 图像生成器之前，请注意：像 DALL-E 或 Midjourney 这样的工具是根据抽象提示生成图像的，但它们无法制作出带有特定字体、十六进制颜色和精确布局的品牌图形。对于上述用例，你真正需要的不是“生成”，而是“合成”。Iteration Layer 的图像生成 API 使用基于图层的模型。你只需指定画布大小并堆叠图层：背景、矩形、文本、照片、叠加层。输出结果是像素级完美且确定性的。相同的图层，每次都会得到相同的结果。

MCP connects this to your AI assistant. Describe the layout in plain language — "dark background, white title, red accent line, 1200x630" — and the assistant translates that into the layer structure, calls the API, and returns the image. No Figma, no Photoshop, no code.
MCP 将此功能连接到你的 AI 助手。用简单的语言描述布局——例如“深色背景、白色标题、红色强调线、1200x630”——助手就会将其转换为图层结构，调用 API，并返回图像。无需 Figma，无需 Photoshop，无需代码。

### What MCP Is
### 什么是 MCP
MCP is an open standard that lets AI assistants discover and call external tools. It's a plugin system — you connect a service, and the assistant can use it when relevant.
MCP 是一种开放标准，允许 AI 助手发现并调用外部工具。它是一个插件系统——你连接一个服务，助手就可以在需要时使用它。

### Setting Up in Claude Code
### 在 Claude Code 中设置
Claude Code supports MCP servers natively. Add the Iteration Layer server with a single command:
`claude mcp add iterationlayer --transport http https://api.iterationlayer.com/mcp`
Claude Code 原生支持 MCP 服务器。只需一条命令即可添加 Iteration Layer 服务器：
`claude mcp add iterationlayer --transport http https://api.iterationlayer.com/mcp`

The first time you use an Iteration Layer tool, a browser window opens for OAuth authentication. Log in, authorize access, and you're connected. No API keys to manage. To verify the server is available, start a conversation and ask Claude Code what MCP tools it has access to. You should see generate_image listed among the available tools.
首次使用 Iteration Layer 工具时，浏览器会打开进行 OAuth 认证。登录并授权访问后，连接即告完成，无需管理 API 密钥。要验证服务器是否可用，请开始对话并询问 Claude Code 它有哪些可用的 MCP 工具。你应该能在可用工具列表中看到 `generate_image`。

### Setting Up in Cursor
### 在 Cursor 中设置
Add to your .cursor/mcp.json:
```json
{
  "mcpServers": {
    "iterationlayer": {
      "type": "http",
      "url": "https://api.iterationlayer.com/mcp"
    }
  }
}
```
Save and restart. The Image Generation tool is now available in your Cursor AI conversations. Authentication works the same way — OAuth in the browser on first use.
将其添加到你的 `.cursor/mcp.json` 中：
（代码块同左）
保存并重启。图像生成工具现在即可在你的 Cursor AI 对话中使用。认证方式相同——首次使用时通过浏览器进行 OAuth 授权。

The MCP server exposes a tool that maps to POST https://api.iterationlayer.com/image-generation/v1/generate. When the assistant calls it, it sends a JSON body with fonts, dimensions, layers, and output_format. You never see the raw request unless you ask — the assistant handles the structure, and you describe what you want in plain language.
MCP 服务器提供了一个映射到 `POST https://api.iterationlayer.com/image-generation/v1/generate` 的工具。当助手调用它时，会发送包含字体、尺寸、图层和输出格式的 JSON 主体。除非你主动要求，否则你永远看不到原始请求——助手会处理结构，而你只需用简单的语言描述你的需求。

### A Real Conversation
### 实际对话示例
Here's what using it actually looks like. You type: "Generate an OG image for my blog post titled 'Why We Moved to Postgres'. Dark background, white text, red accent line at the top. 1200x630."
以下是实际使用时的样子。你输入：“为我题为‘为什么我们迁移到 Postgres’的博客文章生成一张 OG 图像。深色背景，白色文字，顶部有一条红色强调线。1200x630。”

The assistant builds a layer stack:
* A solid-color layer — dark navy (#1a1a2e)
* A rectangle layer — thin red bar (#e94560) across the top, 4px tall
* A text layer — your title in white, large font, positioned with breathing room
助手会构建一个图层堆栈：
* 一个纯色图层——深海军蓝 (#1a1a2e)
* 一个矩形图层——顶部的一条细红条 (#e94560)，高 4px
* 一个文本图层——你的白色标题，大字体，留有适当的呼吸空间

It calls the API with that structure and returns the generated image. The whole exchange takes seconds. You can iterate from there: "Make the title bigger. Add the site name 'acme.dev' in smaller text at the bottom right." The assistant adjusts the font size on the title layer, adds a second text layer for the site name, and regenerates. Same workflow a designer would follow in Figma — but through conversation.
它使用该结构调用 API 并返回生成的图像。整个过程只需几秒钟。你可以此为基础进行迭代：“把标题放大。在右下角添加网站名称‘acme.dev’，字体小一点。”助手会调整标题图层的字体大小，添加第二个文本图层用于显示网站名称，然后重新生成。这与设计师在 Figma 中遵循的工作流程相同，但现在是通过对话完成的。

### More Conversations, More Use Cases
### 更多对话与用例
The examples above cover OG images, but the same conversational pattern works for any composition. Here are a few more real interactions.
上述示例涵盖了 OG 图像，但同样的对话模式适用于任何合成任务。以下是更多实际交互示例。

**Adding a photo with smart cropping:** "Add the team photo from https://example.com/team.jpg on the right side. Make sure nobody's face gets cut off."
The assistant adds a static-image layer with should_use_smart_cropping enabled. The API detects the people in the photo and positions the crop so faces stay visible — even if the original photo has off-center framing.
**添加带有智能裁剪的照片：** “在右侧添加来自 https://example.com/team.jpg 的团队照片。确保没有人脸被裁掉。”
助手会添加一个启用了 `should_use_smart_cropping` 的静态图像图层。API 会检测照片中的人物并调整裁剪位置，确保人脸可见——即使原始照片构图偏离中心。

**Building an event banner:** "Create a 1200x600 banner for our meetup. Black background. 'TypeScript Berlin' in white at the top. 'March 12, 2026 — 7pm' in gray below it. Put a thin orange line between the two."
The assistant generates a five-layer composition: background, title text, divider rectangle, date text, all positioned with appropriate spacing. You see the result and decide: "Move the date closer to the line. Make the orange brighter." Two adjustments, one regeneration. The assistant updates the y coordinate of the date layer and changes the rectangle's hex_color. Iterating on a design through conversation is faster than clicking through Figma panels when you already know what you want.
**制作活动横幅：** “为我们的聚会创建一个 1200x600 的横幅。黑色背景。顶部用白色写上‘TypeScript Berlin’。下方用灰色写上‘2026 年 3 月 12 日 — 晚上 7 点’。在两者之间放一条细橙色线。”
助手生成了一个五层合成图：背景、标题文本、分隔矩形、日期文本，所有元素都以适当的间距定位。你看到结果后决定：“把日期往线那边移近一点。把橙色调亮一点。”两次调整，一次重新生成。助手更新了日期图层的 y 坐标并更改了矩形的十六进制颜色。当你已经知道自己想要什么时，通过对话迭代设计比在 Figma 面板中点击要快得多。

**Using an image overlay for texture:** "Take the OG image we just made and add a subtle paper texture over it. Use this URL for the texture: https://example.com/paper-grain.png. Keep it subtle — maybe 15% opacity."
The assistant adds an image-overlay layer at the top of the stack with opacity: 15. The texture blends over the entire canvas without obscuring the text or accent elements underneath.
**使用图像叠加层添加纹理：** “用我们刚才制作的 OG 图像，在上面添加一层微妙的纸张纹理。纹理 URL 使用：https://example.com/paper-grain.png。保持微妙一点——透明度设为 15% 左右。”
助手在堆栈顶部添加了一个 `image-overlay` 图层，透明度设为 15。纹理会混合在整个画布上，而不会遮挡下方的文本或强调元素。

### The Layer Model
### 图层模型
The Image Generation API composes images from layer types, stacked by index:
图像生成 API 通过按索引堆叠的图层类型来合成图像：

* **solid-color** — a full-canvas fill. Your base layer.
* **rectangle** — colored shapes for accents, borders, dividers, cards. Supports rotation and angled edges for diagonal designs.
* **text** — rendered text with custom fonts, alignment, and markdown support (bold and italic). Auto-wraps lines within a bounding box.
* **static-image** — photos, logos, icons. Placed at specific coordinates with specific dimensions. Supports AI-powered smart cropping that detects the subject and keeps it centered.
* **image-overlay** — a full-canvas image overlay with opacity control. Useful for textures, gradients, and watermarks.
* **layout** — arranges child layers horizontally or vertically with gap, alignment, padding, background color, and border.

* **solid-color（纯色）** — 全画布填充，作为你的基础图层。
* **rectangle（矩形）** — 用于强调、边框、分隔符、卡片的彩色形状。支持旋转和用于对角线设计的斜边。
* **text（文本）** — 带有自定义字体、对齐方式和 Markdown 支持（粗体和斜体）的渲染文本。可在边界框内自动换行。
* **static-image（静态图像）** — 照片、Logo、图标。放置在特定坐标并具有特定尺寸。支持 AI 驱动的智能裁剪，可检测主体并使其保持居中。
* **image-overlay（图像叠加）** — 带有透明度控制的全画布图像叠加。适用于纹理、渐变和水印。
* **layout（布局）** — 水平或垂直排列子图层，支持间距、对齐、内边距、背景颜色和边框。