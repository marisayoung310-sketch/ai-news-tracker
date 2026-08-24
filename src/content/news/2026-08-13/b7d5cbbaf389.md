---
title: "Building a Graph From Tabular Relationship Data"
originalUrl: "https://dev.to/multigrid/building-a-graph-from-tabular-relationship-data-4i82"
date: "2026-08-12T22:24:19.426Z"
---

# Building a Graph From Tabular Relationship Data
# 从表格关系数据构建图

Almost every graph starts life as relational tables. The conversion is mechanical once three decisions are made, and one of the three — id remapping — is a silent correctness bug rather than a matter of taste.
几乎所有的图最初都是以关系表的形式存在的。一旦做出三个决定，转换过程就是机械化的；而其中一个决定——ID 重映射（id remapping）——往往是一个隐蔽的正确性错误，而非个人偏好问题。

### Deciding what is a node
### 决定什么是节点

Start with three tables: customers (customer_id, region, signup_date, tenure_days), products (product_id, category, price), and orders (order_id, customer_id, product_id, amount, ordered_at). The rule that resolves nearly every case: A table with a primary key that other tables point at is a node type. A table whose whole job is to link two keys is an edge type. So customers and products are nodes, and orders are edges — even though orders has its own primary key. The order id is not an entity you want to reason about; it is an identifier for a relationship.
从三张表开始：customers（客户）、products（产品）和 orders（订单）。解决几乎所有情况的规则是：拥有被其他表引用的主键的表是节点类型；其全部作用是连接两个键的表是边类型。因此，customers 和 products 是节点，而 orders 是边——即使 orders 有自己的主键。订单 ID 并不是你需要推理的实体，它只是关系的标识符。

The harder case is a repeated categorical column such as region. It can stay a customer feature, or it can become a node type with a customer–region edge. The test is behavioural, not aesthetic: do you want information to flow between rows that share this value? As a feature, region is a tag on each customer and nothing more. As a node, it creates a two-hop path between every pair of customers in the same region, so their representations start blending. If a region contains 400,000 customers, that node is a hub through which everything mixes, which is usually a way of turning four hundred thousand distinct customers into one regional average. Keep high-cardinality-of-membership categoricals as features; promote a category to a node when its membership is small and meaningful. If you end up with more than one node type, the model has to change too — see heterogeneous graph neural networks.
更棘手的情况是重复的分类列，例如“地区”（region）。它可以保留为客户特征，也可以成为带有“客户-地区”边的节点类型。判断标准是行为上的，而非美学上的：你是否希望信息在共享此值的行之间流动？作为特征，地区只是每个客户的一个标签；作为节点，它会在同一地区的所有客户对之间创建一条两跳路径，从而使它们的表示开始融合。如果一个地区包含 40 万名客户，该节点就会成为一个混合所有信息的枢纽，这通常会将 40 万个不同的客户变成一个区域平均值。对于高基数的分类数据，请保留为特征；当类别成员较少且具有实际意义时，再将其提升为节点。如果你最终拥有多种节点类型，模型也必须随之改变——请参考异构图神经网络（Heterogeneous Graph Neural Networks）。

### The id remapping nobody warns you about
### 没人提醒你的 ID 重映射问题

Graph libraries do not store your ids. They store a node feature matrix and an edge index of integer positions into it, because a message-passing layer is a gather over rows of a dense array. So node ids must be contiguous integers from 0 to n−1, per node type. Real keys never are. A UUID is not an integer. An auto-increment integer key with deletions has gaps — and if you pass ids up to 9,000,000 for 40,000 customers, you have either allocated a feature matrix with 8,960,000 zero rows or produced an index-out-of-range error, depending on the library. Both are silent in the sense that neither tells you what the actual mistake was. Build the mapping explicitly, keep it, and save it. Without the reverse mapping you cannot interpret a single prediction: the model returns node 3,317, and only the mapping says who that is.
图库不会存储你的原始 ID。它们存储的是节点特征矩阵和指向该矩阵的整数索引（Edge Index），因为消息传递层本质上是对稠密数组行的聚合操作。因此，每个节点类型的 ID 必须是 0 到 n-1 的连续整数。而现实中的键从不如此：UUID 不是整数；带有删除操作的自增整数键存在间隙——如果你为 4 万名客户传入高达 900 万的 ID，根据库的不同，你要么分配了一个包含 896 万个零行的特征矩阵，要么会触发索引越界错误。两者都是“静默”的，因为它们都不会告诉你实际的错误是什么。请显式构建映射、保留并保存它。没有反向映射，你无法解释任何预测结果：模型返回节点 3317，只有通过映射你才知道它是谁。

### Build it
### 构建过程

Load the tables and fix the join keys. Drop order rows whose customer or product does not exist — a dangling foreign key becomes either a phantom node or a crash, and pruning it first is the only way to know how many there were.
加载表格并修复连接键。删除那些客户或产品不存在的订单行——悬空的外部键要么变成幻影节点，要么导致程序崩溃，预先清理是了解数据缺失情况的唯一方法。

```python
import pandas as pd
import numpy as np

customers = pd.read_csv("customers.csv")
products = pd.read_csv("products.csv")
orders = pd.read_csv("orders.csv", parse_dates=["ordered_at"])

before = len(orders)
orders = orders[
    orders.customer_id.isin(customers.customer_id) & 
    orders.product_id.isin(products.product_id)
]
print("dropped", before - len(orders), "orders with dangling keys")
```

Build a contiguous index per node type. Sort first so the mapping is deterministic across runs — otherwise a re-run produces a different node 3,317 and every saved artefact silently disagrees with every other.
为每种节点类型构建连续索引。先进行排序，以确保映射在多次运行中是确定性的——否则，重新运行会产生不同的节点 3317，导致所有保存的产物之间出现静默的不一致。

```python
customers = customers.sort_values("customer_id").reset_index(drop=True)
products = products.sort_values("product_id").reset_index(drop=True)

cust_index = pd.Series(customers.index.values, index=customers.customer_id)
prod_index = pd.Series(products.index.values, index=products.product_id)

src = cust_index.loc[orders.customer_id].to_numpy()
dst = prod_index.loc[orders.product_id].to_numpy()
edge_index = np.vstack([src, dst]) # shape (2, num_edges)
print(edge_index.shape, "edges over", len(customers), "customers and", len(products), "products")
```

Build the feature matrices, one per node type, in that same row order. The row order is the contract: row i of the feature matrix must be the node the mapping calls i.
构建特征矩阵（每种节点类型一个），并保持相同的行顺序。行顺序是契约：特征矩阵的第 i 行必须对应映射中 ID 为 i 的节点。

```python
cust_x = pd.concat([
    customers[["tenure_days"]].astype("float32"),
    pd.get_dummies(customers.region, prefix="reg").astype("float32"),
], axis=1).to_numpy()

prod_x = pd.concat([
    products[["price"]].astype("float32"),
    pd.get_dummies(products.category, prefix="cat").astype("float32"),
], axis=1).to_numpy()

assert cust_x.shape[0] == len(customers)
assert prod_x.shape[0] == len(products)
```

Add reverse edges and edge attributes. Messages flow along stored edges only; without the reverse direction products never hear from their buyers.
添加反向边和边属性。消息仅沿存储的边流动；如果没有反向路径，产品将无法从购买者那里获取信息。

```python
rev_index = edge_index[::-1].copy() # product -> customer
edge_attr = orders[["amount"]].astype("float32").to_numpy()
edge_time = orders.ordered_at.astype("int64").to_numpy() // 10**9 # unix secs
```

Save the graph and the mapping together. They are one artefact. A saved edge index whose mapping was regenerated later is worse than no graph, because it still loads.
将图和映射一起保存。它们是一个整体。如果保存的边索引对应的映射后来被重新生成，那么这比没有图更糟糕，因为它仍然可以加载（但数据已错乱）。

```python
np.savez_compressed(
    "graph.npz",
    edge_index=edge_index,
    rev_index=rev_index,
    edge_attr=edge_attr,
    edge_time=edge_time,
    cust_x=cust_x,
    prod_x=prod_x,
)
cust_index.to_frame("row").to_parquet("customer_id_to_row.parquet")
prod_index.to_frame("row").to_parquet("product_id_to_row.parquet")
```

That is a loadable heterogeneous graph. Feeding it to a specific library is then a matter of assigning these arrays to that library’s container type; the arrays themselves are the portable part, and keeping the pipeline framework-agnostic up to this point is worth the small amount of extra code.
这就是一个可加载的异构图。将其输入到特定库中，只需将这些数组分配给该库的容器类型即可；数组本身是可移植的部分，在这一步之前保持流水线与框架无关，是非常值得投入少量额外代码的。

### Direction, weights and time
### 方向、权重和时间

Direction. Store edges directed and materialise the reverse explicitly, as above, rather than storing undirected edges and hoping the library symmetrises. Two directions with separate weights can learn two different functions; one symmetric edge cannot.
方向：存储有向边并显式实现反向边（如上所述），而不是存储无向边并寄希望于库会自动对称化。具有独立权重的两个方向可以学习两种不同的函数；而对称边则无法做到。

Weights. A customer who ordered a product forty times is forty rows. Collapsing them into one edge with a count preserve...
权重：一个客户订购某产品 40 次就是 40 行数据。将它们合并为一条带有计数的边可以保留……