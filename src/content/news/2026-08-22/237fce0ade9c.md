---
title: "DeepSeek-v4-flash-vision-exp"
originalUrl: "https://api-docs.deepseek.com/guides/vision/"
date: "2026-08-21T21:43:48.719Z"
---

# DeepSeek-v4-flash-vision-exp

The `deepseek-v4-flash-vision-exp` model accepts images alongside text, so you can ask the model to describe pictures, read text from screenshots, analyze charts, and more. Supported image formats: JPEG, PNG, GIF, and WebP. The format is detected from the actual file content, not from the file name or the declared MIME type.
`deepseek-v4-flash-vision-exp` 模型支持同时输入图像和文本，因此您可以要求模型描述图片、读取截图中的文字、分析图表等。支持的图像格式包括：JPEG、PNG、GIF 和 WebP。格式通过实际文件内容检测，而非文件名或声明的 MIME 类型。

### Sending Images
### 发送图像

There are three ways to provide an image to the model. All of them use the standard OpenAI-compatible Chat Completions format, where content is an array of blocks instead of a plain string. The same three methods are also available in the Responses API, where images are carried in `input_image` content parts. The `base_url` for the examples below is `https://api.deepseek.com`.
向模型提供图像有三种方式。所有方式均使用标准的 OpenAI 兼容 Chat Completions 格式，其中 `content` 是一个块数组，而非纯字符串。这三种方法同样适用于 Responses API，其中图像包含在 `input_image` 内容部分中。以下示例的 `base_url` 为 `https://api.deepseek.com`。

#### 1. Base64-encoded image (inline)
#### 1. Base64 编码图像（内联）

Encode the image and embed it directly in the request as a `data:` URL. This is the simplest option for local files. The encoded data counts toward the 48 MiB request body limit (see Limits).
将图像编码并直接作为 `data:` URL 嵌入请求中。这是处理本地文件最简单的方法。编码后的数据计入 48 MiB 的请求体限制（详见“限制”部分）。

```python
import base64
from openai import OpenAI

client = OpenAI(api_key="<DeepSeek API Key>", base_url="https://api.deepseek.com")

with open("image.jpg", "rb") as f:
    b64 = base64.b64encode(f.read()).decode("utf-8")

response = client.chat.completions.create(
    model="deepseek-v4-flash-vision-exp",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "What is in this image?"},
                {
                    "type": "image_url",
                    "image_url": {"url": f"data:image/jpeg;base64,{b64}"},
                },
            ],
        }
    ],
)
print(response.choices[0].message.content)
```

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <DeepSeek API Key>" \
  -d '{
    "model": "deepseek-v4-flash-vision-exp",
    "messages": [
      {
        "role": "user",
        "content": [
          {"type": "text", "text": "What is in this image?"},
          {"type": "image_url", "image_url": {"url": "data:image/jpeg;base64,<BASE64_DATA>"}}
        ]
      }
    ]
  }'
```

#### 2. External image URL
#### 2. 外部图像 URL

Pass a publicly accessible http(s) link and the model downloads the image for you. The URL must be at most 8192 characters, the image file may be at most 32 MiB, and the download must complete within 60 seconds. If your link is longer, use a base64 data URL or the Files API instead.
传入一个可公开访问的 http(s) 链接，模型将为您下载图像。URL 长度不得超过 8192 个字符，图像文件不得超过 32 MiB，且下载必须在 60 秒内完成。如果您的链接更长，请改用 base64 数据 URL 或 Files API。

```python
response = client.chat.completions.create(
    model="deepseek-v4-flash-vision-exp",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Describe this image."},
                {
                    "type": "image_url",
                    "image_url": {"url": "https://example.com/image.jpg"},
                },
            ],
        }
    ],
)
print(response.choices[0].message.content)
```

#### 3. Reference a file uploaded via the Files API
#### 3. 引用通过 Files API 上传的文件

Upload an image once with the Files API, then reference its `file_id` in your requests. This is the best option when you reuse the same image across multiple requests, or when the image pushes the request body over the 48 MiB inline limit. Unlike inline images, images referenced via Files API `file_id` may be up to 64 MiB and are not subject to the 32 MiB per-image check. Use a file content block with the returned `file_id` (which has the form `file-api-...`):
使用 Files API 上传一次图像，然后在请求中引用其 `file_id`。当您在多个请求中重复使用同一图像，或者图像导致请求体超过 48 MiB 的内联限制时，这是最佳选择。与内联图像不同，通过 Files API `file_id` 引用的图像最大可达 64 MiB，且不受单张图像 32 MiB 的限制。使用包含返回的 `file_id`（格式为 `file-api-...`）的文件内容块：

```python
response = client.chat.completions.create(
    model="deepseek-v4-flash-vision-exp",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "What is in this image?"},
                {"type": "file", "file_id": "file-api-xxxxxxxxxxxxxxxx"},
            ],
        }
    ],
)
print(response.choices[0].message.content)
```

Alternatively, a file block can carry the image inline as base64 via `file_data` instead of `file_id` (the two are mutually exclusive):
或者，文件块可以通过 `file_data` 以 base64 格式内联携带图像，而不是使用 `file_id`（两者互斥）：

```json
{
  "type": "file",
  "file_data": "data:image/jpeg;base64,<BASE64_DATA>",
  "filename": "image.jpg"
}
```

### Detail Level
### 细节级别

For `image_url` inputs you can optionally set a `detail` field to control how the image is processed:
对于 `image_url` 输入，您可以选择设置 `detail` 字段来控制图像的处理方式：

| Value | Behavior |
| :--- | :--- |
| **low** | The image is downscaled to 512×512 before inference. Faster and cheaper when fine visual detail is not important. |
| **high** | Keeps the original image. (Provided for compatibility; equivalent to original.) |
| **original** | Keeps the original image. |
| **auto** | Automatic selection. Currently equivalent to original. |

| 值 | 行为 |
| :--- | :--- |
| **low** | 推理前将图像缩小至 512×512。在不需要精细视觉细节时，速度更快且成本更低。 |
| **high** | 保留原始图像。（为兼容性提供；等同于 original。） |
| **original** | 保留原始图像。 |
| **auto** | 自动选择。目前等同于 original。 |

```json
{
  "type": "image_url",
  "image_url": {"url": "https://example.com/image.jpg", "detail": "low"}
}
```

### When to Use the Files API
### 何时使用 Files API

Inline images (base64 or `file_data`) count toward the request body size limit of 48 MiB. Consider the Files API when:
内联图像（base64 或 `file_data`）计入 48 MiB 的请求体大小限制。在以下情况请考虑使用 Files API：

* A single request would exceed the body size limit.
* 单个请求将超过请求体大小限制。
* The image is larger than 32 MiB, which is only possible through the Files API.
* 图像大于 32 MiB（只能通过 Files API 实现）。
* You reference the same image in multiple requests and want to avoid re-uploading it each time.
* 您在多个请求中引用同一图像，并希望避免每次都重新上传。

### Token Usage
### Token 使用量

Images are converted into tokens based on their dimensions, and these tokens are billed together with your text tokens. Before inference, every image is automatically resized:
图像根据其尺寸转换为 token，这些 token 与您的文本 token 一起计费。推理前，每张图像都会自动调整大小：

* Images with a total pixel count below roughly 384×384 are scaled up while preserving their aspect ratio.
* 总像素数低于约 384×384 的图像会在保持纵横比的同时放大。
* Larger images are scaled down while preserving their aspect ratio, so that the total pixel count after resizing is roughly that of an 800×800 image.
* 较大的图像会在保持纵横比的同时缩小，使得调整大小后的总像素数大致相当于 800×800 的图像。

As a result, there is an upper bound of 384 tokens per image: for example, a 2000×2000 image and a 5000×5000 image consume the same number of tokens after resizing. When a request contains multiple images, each image is counted independently under the same rule — there is no separate calculation for multi-image requests. To estimate the token cost of an image of a specific size, use the image token calculator on the Token & Token Usage page.
因此，每张图像的上限为 384 个 token：例如，2000×2000 的图像和 5000×5000 的图像在调整大小后消耗的 token 数量相同。当请求包含多张图像时，每张图像都按照相同的规则独立计算——多图像请求没有单独的计算方式。要估算特定尺寸图像的 token 成本，请使用“Token & Token Usage”页面上的图像 token 计算器。

### Limits
### 限制

| Limit | Value |
| :--- | :--- |
| Supported formats | JPEG, PNG, GIF, WebP |
| External URL length | 8192 characters |
| Request body size | 48 MiB |
| Max single image size (base64 / external URL) | 32 MiB |
| Max single image size (Files API file_id) | 64 MiB |
| Max images per request | 600 |
| Max total image size per request | 64 MiB without file_id images; up to 200 MiB including file_id images |
| Max image dimension | 8192 px per side; drops to 4096 px per side when a request contains 15 or more images |

| 限制 | 数值 |
| :--- | :--- |
| 支持的格式 | JPEG, PNG, GIF, WebP |
| 外部 URL 长度 | 8192 个字符 |
| 请求体大小 | 48 MiB |
| 单张图像最大尺寸 (base64 / 外部 URL) | 32 MiB |
| 单张图像最大尺寸 (Files API file_id) | 64 MiB |
| 每个请求的最大图像数 | 600 |
| 每个请求的最大图像总大小 | 不含 file_id 图像时为 64 MiB；包含 file_id 图像时最高 200 MiB |
| 最大图像尺寸 | 每边 8192 像素；当请求包含 15 张或更多图像时降至每边 4096 像素 |

For storage and upload quotas of files uploaded via the Files API, see Files API: Limits.
有关通过 Files API 上传文件的存储和上传配额，请参阅“Files API: Limits”。

### Restrictions
### 限制说明

Images are supported in user messages only: images in system or assistant messages return a 400 error. Only vision models (`deepseek-v4-flash-vision-exp`) accept images; other models return a 400 error.
图像仅在用户消息中受支持：系统消息或助手消息中的图像将返回 400 错误。只有视觉模型 (`deepseek-v4-flash-vision-exp`) 接受图像；其他模型将返回 400 错误。