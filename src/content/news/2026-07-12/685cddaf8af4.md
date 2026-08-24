---
title: "Prefer strict tables in SQLite"
originalUrl: "https://evanhahn.com/prefer-strict-tables-in-sqlite/"
date: "2026-07-11T22:10:34.749Z"
---

# Prefer strict tables in SQLite
# 在 SQLite 中优先使用严格表 (Strict Tables)

In short: I prefer strict tables in SQLite because they avoid some datatype problems, such as putting text in number columns. SQLite has a feature that I think is underrated: strict tables. Strict tables help enforce rigid typing, preventing mistakes like putting text into integer columns. I like them, and wrote this post to promote their use!

简而言之：我更倾向于在 SQLite 中使用严格表，因为它们可以避免一些数据类型问题，例如在数字列中存入文本。SQLite 有一个我认为被低估的功能：严格表。严格表有助于强制执行严格的类型检查，防止将文本存入整数列等错误。我很喜欢这个功能，并写了这篇文章来推广它！

To make a strict table, add `STRICT` to the end of its definition. Like this:
`-CREATE TABLE people (name TEXT);`
`+CREATE TABLE people (name TEXT) STRICT;`
That’s it! But what does it do?

要创建严格表，只需在定义末尾添加 `STRICT` 即可。如下所示：
`-CREATE TABLE people (name TEXT);`
`+CREATE TABLE people (name TEXT) STRICT;`
就是这样！但它到底有什么用呢？

### Advantages of strict tables
### 严格表的优势

Broadly, strict tables help enforce rigid types, like other SQL engines do.
从广义上讲，严格表有助于像其他 SQL 引擎一样强制执行严格的类型约束。

#### Prevents type mismatches on insert/update
#### 防止插入/更新时的类型不匹配

Most significantly, strict tables keep you from inserting the wrong type into a column. For example, SQLite normally lets you put text into an `INTEGER` column, but not with strict tables.
最重要的是，严格表可以防止你向列中插入错误类型的数据。例如，SQLite 通常允许你将文本放入 `INTEGER` 列，但在严格表中则不行。

```sql
-- Non-strict tables let you put anything anywhere.
CREATE TABLE people_nonstrict (age INTEGER);
INSERT INTO people_nonstrict (age) VALUES ('garbage'); -- => works fine

-- Strict tables don't allow that, which I prefer.
CREATE TABLE people_strict (age INTEGER) STRICT;
INSERT INTO people_strict (age) VALUES ('garbage'); -- => error: cannot store TEXT value in INTEGER column
```

Personally, I think it’s a mistake to try to put text in an integer column, or vice-versa. I don’t want SQLite to let me make this error! The same validation happens for `UPDATE`s, too.
个人认为，试图在整数列中放入文本（反之亦然）是一个错误。我不希望 SQLite 允许我犯这种错！同样的验证也适用于 `UPDATE` 操作。

Notably, if a value can be losslessly converted, it will still be accepted. For example, the string `'123'` can be perfectly converted to an integer, so it’s allowed. These two lines are equivalent, even for a strict table:
值得注意的是，如果一个值可以无损转换，它仍然会被接受。例如，字符串 `'123'` 可以完美转换为整数，因此是被允许的。即使在严格表中，下面两行也是等价的：

```sql
INSERT INTO people_strict (age) VALUES ('123');
INSERT INTO people_strict (age) VALUES (123);
```

#### Prevents bogus column types on table creation
#### 防止在创建表时使用虚假列类型

By default, you can create columns with bogus types. For example, all of these work even though they aren’t valid SQLite datatypes:
默认情况下，你可以创建带有虚假类型的列。例如，即使以下类型不是有效的 SQLite 数据类型，它们也都能正常工作：

```sql
-- SQLite doesn't support these types, but this is all accepted.
CREATE TABLE tbl (name GARBAGE);
CREATE TABLE tbl (name DATETIME);
CREATE TABLE tbl (name JSON);
CREATE TABLE tbl (name UUID);
CREATE TABLE tbl (name BLOBB);
```

I think these aren’t what the developer intended. Some of these are typos, some of them are misunderstandings of which datatypes SQLite supports, and some are egregious mistakes. Appending `STRICT` to any of these statements makes them error. In my opinion, that’s the correct behavior!
我认为这些并不是开发者的本意。其中一些是拼写错误，一些是对 SQLite 支持的数据类型的误解，还有一些是严重的失误。在这些语句末尾加上 `STRICT` 会导致报错。在我看来，这才是正确的行为！

```sql
-- All of these give errors, which I prefer.
CREATE TABLE tbl (name GARBAGE) STRICT;
CREATE TABLE tbl (name DATETIME) STRICT;
CREATE TABLE tbl (name JSON) STRICT;
CREATE TABLE tbl (name UUID) STRICT;
CREATE TABLE tbl (name BLOBB) STRICT;
```

Only `INT`, `INTEGER`, `REAL`, `TEXT`, `BLOB`, and `ANY` are allowed. Strict tables also require a column type, so you can’t do `CREATE TABLE tbl (name)`.
只有 `INT`、`INTEGER`、`REAL`、`TEXT`、`BLOB` 和 `ANY` 是允许的。严格表还要求必须指定列类型，因此你不能写成 `CREATE TABLE tbl (name)`。

#### Still allows flexibility with `ANY`
#### 使用 `ANY` 仍可保持灵活性

If you still need a column to be flexible, you can use the `ANY` datatype. As the name suggests, it allows anything—even in a strict table.
如果你仍然需要某个列保持灵活性，可以使用 `ANY` 数据类型。顾名思义，它允许任何类型——即使是在严格表中。

```sql
CREATE TABLE tbl (value ANY) STRICT;
-- All of these are valid because the column is ANY:
INSERT INTO tbl (value) VALUES (123);
INSERT INTO tbl (value) VALUES ('text');
INSERT INTO tbl (value) VALUES (12.34);
INSERT INTO tbl (value) VALUES (X'8647');
```

I haven’t found a use for this, but maybe you will!
我还没发现它的用处，但也许你会用到！

### Disadvantages of strict tables
### 严格表的缺点

I prefer strict tables but I must share a few cons. Not everything is better!
我更喜欢严格表，但我必须分享一些缺点。并非一切都变得更好了！

#### Can’t strict-ify an existing table
#### 无法将现有表直接转为严格表

I think it’s best to use strictness from the start, but that’s not always possible. Unfortunately, I don’t think there’s a way to `ALTER` a table to make it strict. I think you have to copy the data out of the non-strict table into the strict one.
我认为最好从一开始就使用严格模式，但这并不总是可行的。遗憾的是，目前似乎没有办法通过 `ALTER` 语句将现有表变为严格表。你必须将数据从非严格表复制到严格表中。

Something like this:
大致流程如下：

```sql
-- 1. Create a new strict table with the same schema
CREATE TABLE new_people (name TEXT) STRICT;
-- 2. Copy data (risky if types are wrong!)
INSERT INTO new_people SELECT * FROM people;
-- 3. Replace the old table
DROP TABLE people;
ALTER TABLE new_people RENAME TO people;
```

Note that this could be tricky if the non-strict table has invalid data! For example, if the old data accidentally contains text in an integer column, you’ll get errors when doing the migration. You’ll probably need to clean the data or cast it.
请注意，如果非严格表中存在无效数据，这可能会很棘手！例如，如果旧数据中意外地在整数列中包含了文本，那么在迁移时就会报错。你可能需要清理数据或进行类型转换。

You could make a rule for your codebase that all new tables are strict. That might be useful—at least some of your tables are valid! But it might also mean you have inconsistent validation across your tables, which might be more surprising than having weak validation on all tables. It’s up to you to decide whether this is a good fit for you.
你可以为代码库制定一条规则：所有新表都必须是严格表。这可能很有用——至少能保证部分表是规范的！但这也可能意味着你的表之间存在不一致的验证逻辑，这可能比所有表都采用弱验证更令人困惑。是否采用这种方式取决于你自己的判断。

### The SQLite developers disagree with me
### SQLite 开发者的不同意见

SQLite has a whole page called “The Advantages Of Flexible Typing”, where they argue that SQLite’s flexible behavior is good, actually.
SQLite 专门有一个页面叫“灵活类型的优势”，他们认为 SQLite 的灵活行为实际上是件好事。

I hesitate to wade into the controversy of static-versus-dynamic, but I disagree in most cases. I’ve personally encountered many bugs where an unexpected data type caused subtle headaches. I’d much rather these mistakes explode loudly. But it’s worth noting that SQLite’s developers seem not to share my preference for strict tables!
我不愿卷入静态类型与动态类型的争论，但在大多数情况下我持反对意见。我个人遇到过许多因意外数据类型导致隐蔽问题的 Bug。我宁愿这些错误能直接报错。但值得注意的是，SQLite 的开发者似乎并不认同我对严格表的偏好！

They point out a few good uses for flexible tables, such as “a pure key-value store” or “a place to store miscellaneous attributes” of different types. They also mention that you might want to keep the invalid data in some cases, like if you’re directly importing a messy CSV and don’t want to lose any data. I still prefer strict tables, but acknowledge there are some reasonable cases for non-strict ones.
他们指出了灵活表的一些良好用途，例如“纯键值存储”或“存储不同类型的杂项属性”。他们还提到，在某些情况下你可能希望保留无效数据，例如在直接导入混乱的 CSV 文件且不想丢失任何数据时。我仍然更喜欢严格表，但也承认非严格表在某些情况下是合理的。

### Only in SQLite 3.37.0+
### 仅适用于 SQLite 3.37.0 及以上版本

SQLite introduced strict tables in version 3.37.0, released November 2021. If you’re on an older version of SQLite, you can’t use strict tables.
SQLite 在 2021 年 11 月发布的 3.37.0 版本中引入了严格表。如果你使用的是旧版本的 SQLite，则无法使用此功能。

It’s worth noting that old versions of SQLite can’t read databases with strict tables. For example, if you create a strict table in the newest version of SQLite and then try to read that database in SQLite 3.36.0 (before strict tables were added).
值得注意的是，旧版本的 SQLite 无法读取包含严格表的数据库。例如，如果你在最新版本的 SQLite 中创建了一个严格表，然后尝试用 SQLite 3.36.0（在引入严格表之前）读取该数据库，是无法成功的。