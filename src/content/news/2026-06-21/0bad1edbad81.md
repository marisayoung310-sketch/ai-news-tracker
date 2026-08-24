---
title: "tursodatabase / turso"
originalUrl: "https://github.com/tursodatabase/turso"
date: "2026-06-20T22:40:32.016Z"
---

# Turso Database / turso

### Turso Database
An in-process SQL database, compatible with SQLite.
**Turso Database** 是一个用 Rust 编写的进程内（in-process）SQL 数据库，兼容 SQLite。

**About Turso Database**
is an in-process SQL database written in Rust, compatible with SQLite. ⚠️ Warning: This software is in BETA. It may still contain bugs and unexpected behavior. Use caution with production data and ensure you have backups.
**关于 Turso Database**
这是一个用 Rust 编写的进程内 SQL 数据库，兼容 SQLite。⚠️ 警告：该软件目前处于 BETA 测试阶段。它可能仍包含错误或出现意外行为。在生产环境中使用时请务必谨慎，并确保已做好数据备份。

### Features and Roadmap
**功能与路线图**

*   SQLite compatibility for SQL dialect, file formats, and the C API [see document for details]
    在 SQL 方言、文件格式和 C API 方面兼容 SQLite [详情请参阅文档]
*   BEGIN CONCURRENT for improved write throughput using multi-version concurrency control (MVCC).
    支持 `BEGIN CONCURRENT`，通过多版本并发控制 (MVCC) 提高写入吞吐量。
*   Change data capture (CDC) for real-time tracking of database changes.
    支持变更数据捕获 (CDC)，用于实时追踪数据库变更。
*   Multi-language support for Go, JavaScript, Java, .NET, Python, Rust, WebAssembly.
    支持多种编程语言：Go、JavaScript、Java、.NET、Python、Rust 和 WebAssembly。
*   Asynchronous I/O support on Linux with io_uring.
    在 Linux 上通过 `io_uring` 支持异步 I/O。
*   Cross-platform support for Linux, macOS, Windows and browsers (through WebAssembly).
    支持跨平台（Linux、macOS、Windows）及浏览器（通过 WebAssembly）。
*   Vector support including exact search and vector manipulation.
    支持向量功能，包括精确搜索和向量操作。
*   Improved schema management including extended ALTER support and faster schema changes.
    改进了模式（Schema）管理，包括扩展的 `ALTER` 支持和更快的模式变更。

**The database has the following experimental features:**
**该数据库目前包含以下实验性功能：**

*   Encryption at rest for protecting the data locally.
    静态加密，用于保护本地数据。
*   Incremental computation using DBSP for incremental view maintenance and query subscriptions.
    使用 DBSP 进行增量计算，用于增量视图维护和查询订阅。
*   Full-Text-Search powered by the awesome tantivy library.
    由强大的 `tantivy` 库驱动的全文搜索功能。
*   Multi-process WAL coordination via the .tshm sidecar for cross-process WAL readers and writers.
    通过 `.tshm` 边车（sidecar）进行多进程 WAL 协调，支持跨进程的 WAL 读写。

**The following features are on our current roadmap:**
**以下功能已列入我们当前的路线图：**

*   Vector indexing for fast approximate vector search, similar to libSQL vector search.
    向量索引，用于快速近似向量搜索，类似于 libSQL 的向量搜索。

---

### Getting Started
**入门指南**

Please see the Turso Database Manual for more information.
请参阅 [Turso Database 手册](https://docs.turso.tech) 获取更多信息。

#### 💻 Command Line
**命令行工具**

You can install the latest `turso` release with:
你可以通过以下命令安装最新的 `turso` 版本：

```bash
curl --proto '=https' --tlsv1.2 -LsSf \
https://github.com/tursodatabase/turso/releases/latest/download/turso_cli-installer.sh | sh
```

Then launch the interactive shell:
然后启动交互式 Shell：

```bash
$ tursodb
```

This will start the Turso interactive shell where you can execute SQL statements:
这将启动 Turso 交互式 Shell，你可以在其中执行 SQL 语句：

```sql
Turso
Enter ".help" for usage hints.
Connected to a transient in-memory database.
Use ".open FILENAME" to reopen on a persistent database
turso> CREATE TABLE users (id INT, username TEXT);
turso> INSERT INTO users VALUES (1, 'alice');
turso> INSERT INTO users VALUES (2, 'bob');
turso> SELECT * FROM users;
1|alice
2|bob
```

You can also build and run the latest development version with:
你也可以通过以下命令构建并运行最新的开发版本：

```bash
cargo run
```

If you like docker, we got you covered. Simply run this in the root folder:
如果你喜欢 Docker，我们也提供了支持。只需在根目录下运行：

```bash
make docker-cli-build && \
make docker-cli-run
```

---

### 🦀 Rust
```rust
cargo add turso
```
**Example usage (示例用法):**
```rust
let db = Builder::new_local("sqlite.db").build().await?;
let conn = db.connect()?;
let res = conn.query("SELECT * FROM users", ()).await?;
```

### ✨ JavaScript
```bash
npm i @tursodatabase/database
```
**Example usage (示例用法):**
```javascript
import { connect } from '@tursodatabase/database';
const db = await connect('sqlite.db');
const stmt = db.prepare('SELECT * FROM users');
const users = stmt.all();
console.log(users);
```

### 🐍 Python
```bash
uv pip install pyturso
```
**Example usage (示例用法):**
```python
import turso
con = turso.connect("sqlite.db")
cur = con.cursor()
res = cur.execute("SELECT * FROM users")
print(res.fetchone())
```

### 🦫 Go
```bash
go get turso.tech/database/tursogo
go install turso.tech/database/tursogo
```
**Example usage (示例用法):**
```go
import (
    "database/sql"
    _ "turso.tech/database/tursogo"
)
conn, _ := sql.Open("turso", "sqlite.db")
defer conn.Close()
stmt, _ := conn.Prepare("select * from users")
defer stmt.Close()
rows, _ := stmt.Query()
for rows.Next() {
    var id int
    var username string
    _ := rows.Scan(&id, &username)
    fmt.Printf("User: ID: %d, Username: %s\n", id, username)
}
```

### ️#️⃣ .NET
**Example usage (示例用法):**
```csharp
using Turso;
using var connection = new TursoConnection("Data Source=:memory:");
connection.Open();
connection.ExecuteNonQuery("CREATE TABLE t(a, b)");
var rowsAffected = connection.ExecuteNonQuery("INSERT INTO t(a, b) VALUES (1, 2), (3, 4)");
Console.WriteLine($"RowsAffected: {rowsAffected}");
using var command = connection.CreateCommand();
command.CommandText = "SELECT * FROM t";
using var reader = command.ExecuteReader();
while (reader.Read()) {
    var a = reader.GetInt32(0);
    var b = reader.GetInt32(1);
    Console.WriteLine($"Value1: {a}, Value2: {b}");
}
```

### ☕️ Java
We integrated Turso Database into JDBC. For detailed instructions on how to use Turso Database with java, please refer to the README.md under bindings/java.
我们将 Turso Database 集成到了 JDBC 中。关于如何在 Java 中使用 Turso Database 的详细说明，请参考 `bindings/java` 目录下的 `README.md`。

---

### 🤖 MCP Server Mode
**MCP 服务器模式**

The Turso CLI includes a built-in Model Context Protocol (MCP) server that allows AI assistants to interact with your databases.
Turso CLI 内置了模型上下文协议 (MCP) 服务器，允许 AI 助手与你的数据库进行交互。

Start the MCP server with:
启动 MCP 服务器：
```bash
tursodb your_database.db --mcp
```

**Configuration (配置)**
Add Turso to your MCP client configuration:
将 Turso 添加到你的 MCP 客户端配置中：
```json
{
  "mcpServers": {
    "turso": {
      "command": "/path/to/.turso/tursodb",
      "args": ["/path/to/your/database.db", "--mcp"]
    }
  }
}
```

**Available Tools (可用工具)**
The MCP server provides nine tools for database interaction:
MCP 服务器提供了九种用于数据库交互的工具：
*   `open_database` - Open a new database (打开新数据库)
*   `current_database` - Describe the current database (描述当前数据库)
*   `list_tables` - List all tables in the database (列出所有表)
*   `describe_table` - Describe the structure of a specific table (描述特定表结构)
*   `execute_query` - Execute read-only SELECT queries (执行只读 SELECT 查询)
*   `insert_data` - Insert new data into tables (插入新数据)
*   `update_data` - Update existing data in tables (更新现有数据)
*   `delete_data` - Delete data from tables (删除数据)
*   `schema_change` - Execute schema modification statements (执行模式修改语句)

Once connected, you can ask your AI assistant:
连接后，你可以询问你的 AI 助手：
*   "Show me all tables in the database" (显示数据库中所有表)
*   "What's the schema for the users table?" (users 表的模式是什么？)
*   "Find all posts with more than 100 upvotes" (查找所有点赞数超过 100 的帖子)
*   "Insert a new user with name 'Alice' and email 'alice@example.com'" (插入一个名为 Alice 的新用户)

#### MCP Clients: Claude Code
If you're using Claude Code, you can easily connect to your Turso MCP server using the built-in MCP management commands:
如果你正在使用 Claude Code，可以通过内置的 MCP 管理命令轻松连接到 Turso MCP 服务器：

**Quick Setup (快速设置)**
Add the MCP server to Claude Code:
将 MCP 服务器添加到 Claude Code：
```bash
claude mcp add my-database -- tursodb ./path/to/your/database.db --mcp
```
Restart Claude Code to activate the connection. Start querying your database through natural language!
重启 Claude Code 以激活连接。现在你可以通过自然语言查询你的数据库了！