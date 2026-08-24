---
title: "JPA: The Good, The Bad, and The Ugly"
originalUrl: "https://dev.to/stephenflavin/jpa-the-good-the-bad-and-the-ugly-5e9m"
date: "2026-05-06T22:52:42.139Z"
---

# JPA: The Good, The Bad, and The Ugly
# JPA：优点、缺点与丑陋之处

A walk through what Spring Data JPA actually does at runtime, why it gets uncomfortable during incidents, and what living without an ORM looks like in modern Spring Boot. Examples use Postgres, but the concepts and trade-offs apply to any relational database, the specific syntax for things like guarded upserts and set-based bulk operations will differ on MySQL, SQL Server, or Oracle, but the underlying ideas are the same.
本文将带你了解 Spring Data JPA 在运行时究竟做了什么，为什么它在处理故障时会让人感到棘手，以及在现代 Spring Boot 中脱离 ORM 的生活是什么样的。文中的示例基于 Postgres，但其中的概念和权衡适用于任何关系型数据库。虽然在处理受保护的 upsert（插入或更新）和基于集合的批量操作时，MySQL、SQL Server 或 Oracle 的具体语法会有所不同，但其核心思想是一致的。

TL;DR: Three things make a SQL-first approach worth considering. First, databases like Postgres can guard writes with IS DISTINCT FROM so no-op upserts skip the UPDATE entirely; no new tuple, no WAL, no replication traffic, which JPA can’t express without dropping to native SQL. Second, set-based bulk operations (e.g. via unnest) collapse 1,000-row batches into one round trip, sidestepping the per-row pre-SELECTs and IDENTITY-disabled batching that limit saveAll. Third, the cognitive load shifts from learning a framework’s flush planner to learning SQL and your database in more depth.
简而言之：有三点理由值得考虑“SQL 优先”的方法。首先，像 Postgres 这样的数据库可以使用 `IS DISTINCT FROM` 来保护写入，从而使无操作（no-op）的 upsert 完全跳过 `UPDATE`；这不会产生新的元组、WAL 日志或复制流量，而 JPA 除非使用原生 SQL，否则无法表达这种逻辑。其次，基于集合的批量操作（例如通过 `unnest`）可以将 1,000 行的批处理压缩为一次往返，从而避开了限制 `saveAll` 的逐行预查询（pre-SELECT）和禁用标识符（IDENTITY）的批处理问题。第三，认知负担从学习框架的刷新调度器（flush planner）转移到了深入学习 SQL 和数据库本身。

Disclosure: I used AI assistance throughout this article — for research, drafting, and review. The ideas, structure, and final editorial decisions are mine.
披露：我在撰写本文的过程中使用了 AI 辅助——用于研究、起草和审阅。但文章的观点、结构和最终编辑决定均由我本人负责。

### 1. The Good: Six lines of magic
### 1. 优点：六行代码的魔法

Here’s an upsert in Spring Data JPA.
以下是 Spring Data JPA 中的一个 upsert 示例。

```java
@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) { this.userRepository = userRepository; }

    @Transactional
    public User upsertUser(String email, String name) {
        User user = new User();
        user.setEmail(email);
        user.setName(name);
        return userRepository.save(user);
    }
}

@Entity
@Table(name = "users")
public static class User {
    @Id private String email;
    private String name;
    // getters / setters / no-arg ctor
}

@Repository
public interface UserRepository extends JpaRepository<User, String> {}
```

Look at that: No SQL. No connection management. No PreparedStatement. No row mappers. The repository is an interface, Spring Data generates the implementation at startup. Need findByEmail? Add the method signature; the framework parses the name and writes JPQL.
看看这段代码：没有 SQL，没有连接管理，没有 PreparedStatement，也没有行映射器（row mappers）。Repository 是一个接口，Spring Data 在启动时会自动生成实现。需要 `findByEmail`？只需添加方法签名；框架会自动解析名称并编写 JPQL。

A few more ergonomic wins worth naming:
还有一些值得一提的易用性优势：

*   **Schema validation at boot** (with `spring.jpa.hibernate.ddl-auto=validate`) catches missing columns and type mismatches before traffic hits. The default is none, so you opt in. Validation only checks columns and types, not nullability, defaults, or check constraints.
*   **启动时的模式验证**（通过 `spring.jpa.hibernate.ddl-auto=validate`）可以在流量进入前捕获缺失的列和类型不匹配问题。默认值为 none，因此需要手动开启。验证仅检查列和类型，不检查可空性、默认值或检查约束。
*   **Implicit persistence** — mutate a managed entity inside a transaction and the change is written at commit, no save call required.
*   **隐式持久化**——在事务中修改受管实体，更改会在提交时自动写入，无需调用 `save`。
*   **Database portability** - the same code runs on Postgres, MySQL, H2, and Oracle.
*   **数据库可移植性**——同一套代码可以在 Postgres、MySQL、H2 和 Oracle 上运行。
*   **Object graph traversal** - `@OneToMany` and `@ManyToOne` let you walk relationships in Java; save a parent and the children persist with it.
*   **对象图遍历**——`@OneToMany` 和 `@ManyToOne` 允许你在 Java 中遍历关系；保存父对象时，子对象也会随之持久化。

For a CRUD app over a clean domain model, this is genuinely hard to beat. The framework has been refined for two decades, and the developer ergonomics — the “Good” - are undeniably real. So what’s the problem?
对于基于清晰领域模型的 CRUD 应用来说，这确实很难被超越。该框架经过了二十年的打磨，其开发人员的易用性——即“优点”——是毋庸置疑的。那么，问题出在哪里呢？

### 2. The Bad: Hidden complexity and leaky abstractions
### 2. 缺点：隐藏的复杂性和泄漏的抽象

The bad part of JPA isn’t that it does a lot of work for you; it’s that it does this work silently. That six-line method hides a massive amount of architectural complexity.
JPA 的糟糕之处不在于它为你做了很多工作，而在于它是在“静默”中完成这些工作的。那六行代码隐藏了巨大的架构复杂性。

#### 2.1 The proxy, the transaction, and the held connection
#### 2.1 代理、事务与被占用的连接

UserService is not the class you wrote. Spring wraps it in a CGLIB proxy at startup. Every external call enters the proxy first, which then:
UserService 并不是你编写的那个类。Spring 在启动时将其包装在一个 CGLIB 代理中。每次外部调用都会先进入代理，代理随后会：

1.  Asks the PlatformTransactionManager for a transaction.
2.  Acquires a connection from HikariCP and sets `autoCommit = false`.
3.  Creates an EntityManager and binds it to the thread.
4.  Runs your method.
5.  Flushes the persistence context and commits.

1. 向 PlatformTransactionManager 请求事务。
2. 从 HikariCP 获取连接并设置 `autoCommit = false`。
3. 创建一个 EntityManager 并将其绑定到当前线程。
4. 运行你的方法。
5. 刷新持久化上下文并提交。

The connection is held for the entire method body, including any non-database work. Spring Boot also enables Open Session In View (OSIV) by default, which extends the persistence session to the end of the HTTP request.
连接在整个方法执行期间都被占用，包括任何非数据库操作。Spring Boot 默认还启用了 Open Session In View (OSIV)，它将持久化会话延长到 HTTP 请求结束。

Spring’s default JPA dialect doesn’t release the connection until the EntityManager closes, so with OSIV on, the connection is genuinely held for the entire request lifecycle — including template rendering, JSON serialisation walking lazy collections, and any outbound HTTP calls the controller still needs to make. The pool can be drained by slow downstream work long after the database work is done.
Spring 的默认 JPA 方言直到 EntityManager 关闭才会释放连接，因此在开启 OSIV 的情况下，连接在整个请求生命周期内都被占用——包括模板渲染、JSON 序列化遍历懒加载集合，以及控制器可能还需要进行的任何出站 HTTP 调用。即使数据库工作早已完成，缓慢的下游工作也可能耗尽连接池。

OSIV is the single biggest real-world cause of mysterious connection-pool exhaustion in Spring Boot apps. Spring Boot does log a warning at startup recommending you make a deliberate choice — most teams ignore it. You can disable OSIV with `spring.jpa.open-in-view=false`.
OSIV 是 Spring Boot 应用中导致连接池莫名耗尽的最大现实原因。Spring Boot 在启动时确实会记录一条警告，建议你做出慎重选择——但大多数团队都忽略了它。你可以通过 `spring.jpa.open-in-view=false` 禁用 OSIV。

Now `LazyInitializationExceptions` start firing in your serializers, because the session closes when the transaction does. The fixes are: `@EntityGraph` on repository methods, `JOIN FETCH` in JPQL, `@BatchSize` on collections, or DTO projections that don’t carry lazy associations at all. Each is its own annotation, its own failure mode, and its own thing to remember. Disabling OSIV is the right call for production, and it visibly multiplies the JPA surface area you have to learn.
现在，序列化器中开始抛出 `LazyInitializationExceptions`，因为会话在事务结束时就关闭了。解决方法包括：Repository 方法上的 `@EntityGraph`、JPQL 中的 `JOIN FETCH`、集合上的 `@BatchSize`，或者根本不携带懒加载关联的 DTO 投影。每一种方法都有其对应的注解、故障模式和需要记忆的细节。在生产环境中禁用 OSIV 是正确的做法，但这明显增加了你需要学习的 JPA 知识面。

A related fix worth knowing about for long-running transactions: by default, Hibernate acquires a JDBC connection at transaction start and holds it. To delay acquisition until the first statement, you need both:
对于长事务，有一个值得了解的相关修复：默认情况下，Hibernate 在事务开始时获取 JDBC 连接并一直持有。要将获取延迟到第一条语句执行时，你需要同时设置：

```properties
spring.datasource.hikari.auto-commit=false
spring.jpa.properties.hibernate.connection.provider_disables_autocommit=true
```

Miss either one and Hibernate falls back to eager acquisition.
如果漏掉其中任何一个，Hibernate 都会回退到预先获取（eager acquisition）模式。

#### 2.2 save(), merge(), and what actually runs
#### 2.2 save()、merge() 以及实际运行的内容

`save()` is not “INSERT”. It’s “persist if new, merge otherwise”, and “new” is decided by a heuristic: is the `@Id` null?
`save()` 并不等同于 `INSERT`。它是“如果是新的则持久化，否则合并”，而“新”的判断依据是一个启发式规则：`@Id` 是否为空？

| ID strategy | ID on a fresh entity | `save()` routes to |
| :--- | :--- | :--- |
| `@GeneratedValue` | null | persist (INSERT) |
| Assigned (email, UUID, idempotency token) | non-null | merge (SELECT then UPDATE) |

| ID 策略 | 新实体上的 ID | `save()` 路由至 |
| :--- | :--- | :--- |
| `@GeneratedValue` | null | persist (INSERT) |
| 指定值 (email, UUID, 幂等令牌) | 非空 | merge (SELECT 然后 UPDATE) |

`merge()` does a hidden SELECT. It looks up the row by ID, hydrates a managed copy, then overwrites it from your argument. That’s `SELECT * FROM users WHERE email = ?`, one round trip you didn’t write. (If the entity is already in the persistence context, the SELECT is skipped — but in stateless web request handlers, it almost...)
`merge()` 会执行一个隐藏的 `SELECT`。它通过 ID 查找行，填充一个受管副本，然后用你的参数覆盖它。这就是一条你并未编写的 `SELECT * FROM users WHERE email = ?` 往返请求。（如果实体已经在持久化上下文中，则会跳过 `SELECT`——但在无状态的 Web 请求处理器中，它几乎总是……）