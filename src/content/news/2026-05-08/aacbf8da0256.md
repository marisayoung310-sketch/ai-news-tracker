---
title: "DuckLake 1.0: el formato de data lake que mueve el catálogo de archivos a SQL y promete 926 más velocidad que Iceberg"
originalUrl: "https://dev.to/lu1tr0n/ducklake-10-el-formato-de-data-lake-que-mueve-el-catalogo-de-archivos-a-sql-y-promete-926x-mas-28h2"
date: "2026-05-07T23:33:55.425Z"
---

# DuckLake 1.0: The Data Lake Format That Moves File Catalogs to SQL, Promising 926x Faster Performance Than Iceberg

On April 13, 2026, DuckDB Labs released version 1.0 of DuckLake, a data lake format with guaranteed backward compatibility that breaks the convention established over the last five years in lakehouses. Instead of storing the metadata catalog as a stack of scattered JSON files in object storage—the pattern used by Apache Iceberg, Delta Lake, and Apache Hudi—DuckLake stores it in a relational database.
2026年4月13日，DuckDB Labs 发布了 DuckLake 1.0 版本。这是一种具有向后兼容性保证的数据湖格式，打破了过去五年湖仓架构（lakehouses）的惯例：它不再像 Apache Iceberg、Delta Lake 和 Apache Hudi 那样，将元数据目录存储为对象存储中分散的 JSON 文件堆，而是将其保存在关系型数据库中。

The technical consequence is direct, and the benchmarks reported by the team are compelling: 926x faster in queries and 105x faster in ingestion compared to Iceberg for workloads with many small writes, according to statements by Pedro Holanda, principal engineer at DuckDB Labs, as reported by *The Register*. InfoQ covered the launch on May 2, authored by Renato Losio.
其技术影响非常直接，团队公布的基准测试结果也极具说服力：据 DuckDB Labs 首席工程师 Pedro Holanda 向《The Register》透露，在包含大量小规模写入的工作负载中，其查询速度比 Iceberg 快 926 倍，摄入速度快 105 倍。InfoQ 已于 5 月 2 日由 Renato Losio 对此次发布进行了报道。

The official announcement on ducklake.select lists the five main features: data inlining, sorted tables, bucket partitioning, full support for GEOMETRY and VARIANT types, and deletion vectors compatible with Iceberg v3. The public GitHub repository is now available under an open-source license, and clients for Apache DataFusion, Apache Spark, Trino, and Pandas are operational as of the release date. MotherDuck offers a hosted version that manages the catalog database and the underlying storage.
ducklake.select 上的官方公告列出了五大核心功能：数据内联（data inlining）、排序表（sorted tables）、桶分区（bucket partitioning）、对 GEOMETRY 和 VARIANT 类型的全面支持，以及兼容 Iceberg v3 的删除向量（deletion vectors）。目前，GitHub 公共仓库已在开源协议下开放，且 Apache DataFusion、Apache Spark、Trino 和 Pandas 的客户端在发布当日即可使用。MotherDuck 则提供了一个托管版本，用于管理目录数据库和底层存储。

This article explains, in terms accessible to data engineers and developers evaluating lakehouses for 2026, what DuckLake exactly is, what concrete problem it solves, how it integrates with the current stack, and when it is worth preferring over Iceberg or Delta Lake. This coverage is a natural continuation of the blog's dev editorial line—recent posts on Bun→Rust, pnpm 11, and Cloudflare Agents Week—in a piece that touches on a data-side topic that was previously under-covered.
本文旨在以数据工程师和开发者易于理解的方式，探讨 2026 年湖仓架构选型中的关键问题：DuckLake 究竟是什么？它解决了什么具体问题？如何与现有技术栈集成？以及在什么情况下应该优先选择它而非 Iceberg 或 Delta Lake。本文是本博客开发者系列内容的自然延续（此前已发布关于 Bun→Rust、pnpm 11 和 Cloudflare Agents Week 的文章），旨在填补数据领域此前被忽视的报道空白。

### The Problem It Attacks: The "Small File Problem" in Lakehouses
### 它所解决的问题：湖仓架构中的“小文件问题”

Modern lakehouses—Iceberg since Netflix in 2017, Delta Lake since Databricks in 2019—solved a real problem: they provided ACID transactions on data lakes that were previously just "folders of unordered Parquet files." To do this, they added a metadata layer that records which files make up a table at any given moment, which snapshots exist, what columns are present, and which partitions apply. That metadata—JSON, Avro files, or format-specific manifests—is stored alongside the data in object storage like S3, R2, or GCS.
现代湖仓架构（2017 年 Netflix 的 Iceberg 和 2019 年 Databricks 的 Delta Lake）解决了一个实际问题：它们为原本只是“无序 Parquet 文件文件夹”的数据湖提供了 ACID 事务支持。为了实现这一点，它们增加了一个元数据层，用于记录表在任何时刻由哪些文件组成、存在哪些快照、包含哪些列以及应用了哪些分区。这些元数据（JSON、Avro 文件或特定格式的清单）与数据一起存储在 S3、R2 或 GCS 等对象存储中。

The problem appears when the usage pattern is not "large batch ingestion every hour." If a workload includes frequent small writes—inserting a row, updating ten records, deleting a tuple—the result is that each operation generates at least one new Parquet file (Parquet is optimized for millions of rows, not for a single one) plus one or more metadata files to record the change.
当使用模式不是“每小时进行一次大规模批量摄入”时，问题就出现了。如果工作负载包含频繁的小规模写入（例如插入一行、更新十条记录或删除一个元组），结果就是每次操作都会至少生成一个新的 Parquet 文件（Parquet 针对数百万行进行了优化，而非单行），外加一个或多个用于记录变更的元数据文件。

Hannes Mühleisen, co-founder and CEO of DuckDB Labs, described it to *The Register* with this quote: "You make a small change to your table, adding a single row, and it affects data lake performance because... a new file has to be written... and then a bunch of metadata."
DuckDB Labs 的联合创始人兼 CEO Hannes Mühleisen 在接受《The Register》采访时这样描述道：“你对表做了一个小改动，比如增加了一行，这就会影响数据湖的性能，因为……必须写入一个新文件……然后还要写入一堆元数据。”

The cost accumulates. After a few thousand small writes, a user ends up with tens of thousands of tiny files and queries that have to list and read all that noise to answer a simple question. "Compaction jobs" that run periodically to merge small files into large ones help, but they introduce their own operational maintenance. And object stores charge for requests: 100,000 small files cost more than 1,000 large files with the same total volume of data.
成本随之累积。在进行几千次小规模写入后，用户最终会得到数万个微小文件，而查询为了回答一个简单的问题，必须列出并读取所有这些冗余信息。虽然定期运行的“压缩任务”（compaction jobs）可以将小文件合并为大文件，但这又引入了额外的运维负担。此外，对象存储是按请求收费的：在总数据量相同的情况下，10 万个小文件的存储成本远高于 1,000 个大文件。

### The DuckLake Solution: Catalog in SQL, Data in Parquet
### DuckLake 的解决方案：SQL 目录，Parquet 数据

DuckLake reverses the division. Data is still stored as Parquet in object storage—full compatibility with the existing ecosystem—but the catalog, snapshots, schema metadata, and file list are stored in a standard relational database. The officially supported backends as of the 1.0 release are three: DuckDB (yes, DuckDB can be its own catalog), PostgreSQL, and SQLite.
DuckLake 颠覆了这种划分。数据依然以 Parquet 格式存储在对象存储中（与现有生态系统完全兼容），但目录、快照、模式元数据和文件列表则存储在标准的关系型数据库中。截至 1.0 版本发布，官方支持的后端有三个：DuckDB（没错，DuckDB 可以作为自己的目录）、PostgreSQL 和 SQLite。

This solves the small file problem at the root. When a write of 10 rows arrives, DuckLake does not write a new Parquet file. It accumulates that write within the catalog database—which is optimized precisely for many small operations with ACID and real transactions—and only when the accumulation crosses a threshold (default: 10 rows, configurable) does it flush the rows to Parquet in object storage. The feature is called "data inlining" and is one of the five pieces of the 1.0 release.
这从根本上解决了小文件问题。当 10 行数据的写入请求到达时，DuckLake 不会立即写入新的 Parquet 文件。它会将这些写入累积在目录数据库中（该数据库针对 ACID 和真实事务的大量小规模操作进行了优化），只有当累积量超过阈值（默认 10 行，可配置）时，才会将这些行刷入对象存储中的 Parquet 文件。该功能被称为“数据内联”（data inlining），是 1.0 版本的五大核心功能之一。

```sql
-- Create a DuckLake table using PostgreSQL as a catalog
-- 使用 PostgreSQL 作为目录创建 DuckLake 表
ATTACH 'postgres://user:pwd@host/dbname' AS catalog (TYPE POSTGRES);
USE catalog;
CREATE TABLE events (
    id BIGINT,
    ts TIMESTAMP,
    user_id VARCHAR,
    payload VARIANT
);

-- Small inserts are inlined in the catalog
-- 小规模插入被内联在目录中
INSERT INTO events VALUES (1, NOW(), 'user-42', '{"action": "click"}');
INSERT INTO events VALUES (2, NOW(), 'user-17', '{"action": "view"}');

-- When the accumulation exceeds the threshold, it flushes to Parquet
-- 当累积量超过阈值时，自动刷入 Parquet
-- Without the user having to think about it
-- 用户无需手动干预
```

The operational difference for the user is nil: the SQL is standard, the data lives in S3/R2/GCS as always, and queries are answered with Parquet when the data is already flushed or from the catalog when it is not. The performance difference, in workloads with many small writes, is on the order of two orders of magnitude.
对于用户而言，操作上的差异为零：SQL 是标准的，数据依然存储在 S3/R2/GCS 中，查询时，如果数据已刷入则从 Parquet 读取，否则直接从目录中读取。在包含大量小规模写入的工作负载中，性能差异高达两个数量级。

### The Five Features of 1.0 in Detail
### 1.0 版本五大功能详解

**Data inlining:** The default threshold is 10 rows. Below that, rows live in the catalog table. Above that, they are flushed to Parquet. The user can configure the threshold to raise or lower the boundary according to the load pattern: workloads with many small writes benefit from a high threshold (say, 1,000), while workloads with very few small writes do not need inlining at all.
**数据内联（Data inlining）：** 默认阈值为 10 行。低于此阈值时，行数据保留在目录表中；超过此阈值时，数据被刷入 Parquet。用户可以根据负载模式调整阈值：对于包含大量小规模写入的工作负载，较高的阈值（例如 1,000）更有利；而对于几乎没有小规模写入的工作负载，则完全不需要内联。

**Sorted tables:** DuckLake allows declaring the...
**排序表（Sorted tables）：** DuckLake 允许声明……