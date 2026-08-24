---
title: "How to Test Email Verification Flows in Python with pytest"
originalUrl: "https://dev.to/zerodrop/how-to-test-email-verification-flows-in-python-with-pytest-ce4"
date: "2026-06-26T22:47:52.804Z"
---

# How to Test Email Verification Flows in Python with pytest
# 如何使用 pytest 在 Python 中测试电子邮件验证流程

Testing email verification in Python is one of those problems that looks simple until you actually try it. Your app sends a verification email. Your pytest test needs to read that email, extract the OTP or magic link, and continue the test. But the email lands in an inbox your test can't reach.
在 Python 中测试电子邮件验证是那种看起来很简单，但实际操作起来却很棘手的问题。你的应用会发送一封验证邮件，而你的 pytest 测试需要读取该邮件，提取其中的 OTP（一次性密码）或魔法链接，然后继续执行测试。但问题在于，邮件会进入一个测试脚本无法触及的收件箱。

The common workarounds:
* Mock the email layer — your tests pass while production email could be broken
* Use a shared Gmail inbox — race conditions everywhere in parallel runs
* Use MailHog — requires Docker, doesn't test your real email provider
* Write regex against the email body — breaks every time the template changes

常见的变通方法包括：
* 模拟（Mock）邮件层 —— 这样测试虽然通过了，但生产环境的邮件功能可能早已损坏。
* 使用共享的 Gmail 收件箱 —— 在并行运行时会导致严重的竞态条件。
* 使用 MailHog —— 需要 Docker，且无法测试你真实的邮件服务商。
* 针对邮件正文编写正则表达式 —— 每次模板变更时测试都会失效。

There's a cleaner way. The ZeroDrop Approach. ZeroDrop gives you real disposable email inboxes caught at Cloudflare's edge. No Docker. No shared inbox. No regex. When an email arrives, OTP codes and magic links are auto-extracted before the email is stored. By the time your test calls `wait_for_latest()`, `email.otp` and `email.magic_link` are already there.
现在有一种更简洁的方法：ZeroDrop。ZeroDrop 在 Cloudflare 的边缘节点为你提供真实的临时电子邮件收件箱。无需 Docker，无需共享收件箱，也无需正则表达式。当邮件到达时，OTP 代码和魔法链接会在邮件存储前被自动提取。当你调用 `wait_for_latest()` 时，`email.otp` 和 `email.magic_link` 已经准备就绪。

```python
email = mail.wait_for_latest(inbox)
email.otp # "847291" — auto-extracted, no regex
email.magic_link # "https://..." — auto-extracted, no HTML parsing
```

Setup: `pip install zerodrop`. No dependencies. No API key. No signup. Python 3.8+.
安装：`pip install zerodrop`。无依赖，无需 API 密钥，无需注册。支持 Python 3.8+。

### Basic pytest Example
### pytest 基础示例

```python
import pytest
from zerodrop import ZeroDrop

mail = ZeroDrop()

def test_signup_email_verification(page):
    # Generate a unique inbox for this test — no network request
    inbox = mail.generate_inbox()
    
    # Sign up with the ZeroDrop inbox
    page.goto("/signup")
    page.fill('[name="email"]', inbox)
    page.fill('[name="password"]', "TestPassword123!")
    page.click('[type="submit"]')
    
    # Wait for the verification email
    email = mail.wait_for_latest(inbox, timeout=15000)
    
    # OTP is auto-extracted — no regex needed
    assert email.otp is not None
    page.fill('[name="otp"]', email.otp)
    page.click('[type="submit"]')
    assert page.url.endswith("/dashboard")
```

No helper functions. No regex. No HTML parsing.
无需辅助函数，无需正则表达式，无需 HTML 解析。

### pytest Fixtures
### pytest Fixtures（测试夹具）

For cleaner tests, wrap ZeroDrop in a pytest fixture:
为了使测试更简洁，可以将 ZeroDrop 封装在 pytest fixture 中：

```python
# conftest.py
import pytest
from zerodrop import ZeroDrop

@pytest.fixture(scope="session")
def mail():
    return ZeroDrop()

@pytest.fixture
def inbox(mail):
    """Fresh inbox per test — no shared state."""
    return mail.generate_inbox()
```

Then use them in tests:
然后在测试中使用它们：

```python
# test_auth.py
def test_signup_verification(page, mail, inbox):
    page.goto("/signup")
    page.fill('[name="email"]', inbox)
    page.fill('[name="password"]', "TestPassword123!")
    page.click('[type="submit"]')
    
    email = mail.wait_for_latest(inbox, timeout=15000)
    assert email.otp is not None
    page.fill('[name="otp"]', email.otp)
    page.click('[type="submit"]')
    assert page.url.endswith("/dashboard")
```

### Email Filtering
### 邮件过滤

When your signup flow sends multiple emails — welcome email, verification email — filter to target the right one:
当你的注册流程发送多封邮件（如欢迎邮件、验证邮件）时，可以使用过滤器来定位目标邮件：

```python
from zerodrop import ZeroDrop, ZeroDropFilter

mail = ZeroDrop()

def test_signup_otp_only(page, inbox):
    page.goto("/signup")
    page.fill('[name="email"]', inbox)
    page.click('[type="submit"]')
    
    # Only catch the verification email
    email = mail.wait_for_latest(
        inbox, 
        timeout=15000, 
        filter_=ZeroDropFilter(
            from_="noreply@yourapp.com", 
            has_otp=True, 
        )
    )
    assert email.otp is not None
    page.fill('[name="otp"]', email.otp)
    page.click('[type="submit"]')
```

All string filters are case-insensitive partial matches.
所有字符串过滤器均为不区分大小写的模糊匹配。

### Parallel Test Runs — No Collisions
### 并行测试运行 — 无冲突

`generate_inbox()` runs locally with no network request. Each worker gets a unique inbox automatically.
`generate_inbox()` 在本地运行，无需网络请求。每个测试进程（worker）都会自动获得一个唯一的收件箱。

```python
# pytest.ini or pyproject.toml
# [tool.pytest.ini_options]
# addopts = "-n auto" # pytest-xdist parallel execution

def test_user_a(page, mail):
    inbox = mail.generate_inbox() # unique per test
    # ...

def test_user_b(page, mail):
    inbox = mail.generate_inbox() # different inbox, zero collision
    # ...
```

50 parallel workers. 50 isolated inboxes. Zero race conditions.
50 个并行进程，50 个隔离的收件箱，零竞态条件。

### GitHub Actions CI
### GitHub Actions CI 配置

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r requirements.txt
      - run: playwright install --with-deps chromium
      - run: pytest tests/e2e/ -v
```

No Docker. No SMTP service. No API keys in CI secrets. ZeroDrop works out of the box.
无需 Docker，无需 SMTP 服务，无需在 CI 密钥中配置 API 密钥。ZeroDrop 开箱即用。

### Why Not Use MailHog?
### 为什么不使用 MailHog？

MailHog is a local SMTP server that catches emails in development. It works fine locally — but in CI it requires:
MailHog 是一个在开发环境中捕获邮件的本地 SMTP 服务器。它在本地运行良好，但在 CI 环境中需要：
* A Docker service block in your GitHub Actions YAML
* Running against a local app instance, not your real staging environment
* Manual OTP extraction via regex on the raw email body

* 在 GitHub Actions YAML 中配置 Docker 服务块。
* 必须针对本地应用实例运行，而不是真实的预发布（Staging）环境。
* 需要通过正则表达式手动从原始邮件正文中提取 OTP。

ZeroDrop works against your real staging environment, in real CI, with no infrastructure overhead. `email.otp` is just there.
ZeroDrop 可以针对你真实的预发布环境在真实的 CI 中运行，且没有任何基础设施开销。`email.otp` 直接可用。

| Feature | MailHog | ZeroDrop |
| :--- | :--- | :--- |
| Docker required | ✓ | ✗ |
| Tests real email provider | ✗ | ✓ |
| OTP auto-extraction | ✗ | ✓ |
| Magic link extraction | ✗ | ✓ |
| Parallel-safe | ✗ | ✓ |
| CI setup | Complex | None |

### ZeroDrop Email Fields
### ZeroDrop 邮件字段

* `email.otp`: "123456" — 4-8 digit code, or None
* `email.magic_link`: "https://app.com/verify?token=abc" — or None
* `email.subject`: "Verify your email"
* `email.body`: Full plain-text body
* `email.from_`: Sender address
* `email.received_at`: datetime

Both `otp` and `magic_link` are `None` if not detected. Always assert before using: `assert email.otp is not None`.
如果未检测到，`otp` 和 `magic_link` 均为 `None`。使用前请务必断言：`assert email.otp is not None`。

### Conclusion
### 总结

Testing email verification in Python doesn't require Docker, regex, or a shared inbox. ZeroDrop gives each pytest test a clean, isolated environment for email verification.
在 Python 中测试电子邮件验证并不需要 Docker、正则表达式或共享收件箱。ZeroDrop 为每个 pytest 测试提供了一个干净、隔离的电子邮件验证环境。