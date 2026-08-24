---
title: "Automatically Assign a Category to Uncategorized Rows in Power Query and DAX"
originalUrl: "https://towardsdatascience.com/automatically-assign-a-category-to-uncategorised-rows-in-power-query-and-dax/"
date: "2026-07-20T22:25:59.369Z"
---

# Automatically Assign a Category to Uncategorized Rows in Power Query and DAX
# 在 Power Query 和 DAX 中自动为未分类行分配类别

Data Engineering: Sometimes we must assign a category to uncategorized data according to certain rules.
数据工程：有时我们需要根据特定规则为未分类的数据分配类别。

### The Scenario
### 场景描述

One of my clients wanted to report on seat ownership. Each seat in the office building must be assigned to an organisational unit (OU). There is a list of all seats, and the owning OU should be set for each seat. But some seats don’t have an owning OU set. Therefore, they decided to assign all unassigned seats to the OU that owns the most seats. This must be done by room and by floor.
我的一位客户希望对座位归属进行报告。办公楼内的每个座位都必须分配给一个组织单元（OU）。现有一份所有座位的列表，每个座位都应设置其所属的 OU。但有些座位没有设置所属 OU。因此，他们决定将所有未分配的座位归入拥有座位数最多的 OU。这需要按房间和楼层分别进行。

Look at the marked seats in room B. As you can notice, “OU 3” owns the most seats in that room. Therefore, these seats must be assigned to that OU. But when looking at the entire floor, “OU 5” own the most seats across all rooms. If there is a room on that floor where all seats aren’t assigned, they must be assigned to “OU 5”. These are the business rules for assigning unassigned seats.
观察 B 房间中标注的座位。你会发现，“OU 3”在该房间拥有的座位最多。因此，这些座位必须分配给该 OU。但从整个楼层来看，“OU 5”在所有房间中拥有的座位最多。如果该楼层中某个房间的所有座位都未分配，则必须将它们分配给“OU 5”。这就是分配未分配座位的业务规则。

### The data source
### 数据源

All the data is stored in Excel files. Each file has a date at the start of the filename. For example: 20260331_Seatlist.xlsx, 20260430_Seatlist.xlsx, 20260531_Seatlist.xlsx. There is one file per month that contains all existing seats in the building, along with their assignments for that month. This is because the assignments change over time and the user must be able to see the differences. But only the latest dataset (Excel file) should be used to assign the unassigned seats.
所有数据都存储在 Excel 文件中。每个文件名的开头都有一个日期，例如：20260331_Seatlist.xlsx 等。每月有一个文件，包含大楼内所有现有的座位及其当月的分配情况。这是因为分配情况会随时间变化，用户需要能够查看差异。但只有最新的数据集（Excel 文件）应被用于分配未分配的座位。

### Do it in Power Query
### 在 Power Query 中实现

As you might know from my previous articles, I aim to perform data transformations as early as possible in the load chain. Therefore, it was natural to start doing the work in Power Query. What I needed to do was the following steps for each row without an assigned OU:
正如你可能从我之前的文章中所知，我的目标是在加载链中尽可能早地执行数据转换。因此，在 Power Query 中开始这项工作是很自然的选择。对于每一行没有分配 OU 的数据，我需要执行以下步骤：

1. Find the latest file among all files loaded.
2. Read this file.
3. Search for the rows for the current room (The room in the current row).
4. Count the number of seats per OU in that room.
5. Sort descending by the number of seats.
6. Keep only the first row – the one with the OU that has the highest number of seats.
7. Assign that OU to the current row.
1. 在所有加载的文件中找到最新的文件。
2. 读取该文件。
3. 搜索当前房间的行（即当前行所在的房间）。
4. 计算该房间内每个 OU 的座位数。
5. 按座位数降序排列。
6. 只保留第一行——即拥有座位数最多的 OU。
7. 将该 OU 分配给当前行。

For this, I created an M-function [CheckMax_ForSeat]. The code for this function is comprised of the following segments:
为此，我创建了一个 M 函数 [CheckMax_ForSeat]。该函数的代码包含以下部分：

**1. Find the latest file:**
**1. 查找最新文件：**
```powerquery
Source = Folder.Files(SourceFolder & "\Seatlists\"),
#"Filtered Rows" = Table.SelectRows(Source, each Text.StartsWith([Name], "20")),
#"Sorted Rows" = Table.Sort(#"Filtered Rows",{{"Name", Order.Descending}}),
#"Kept First Rows" = Table.FirstN(#"Sorted Rows",1)
```

**2. Read the file:**
**2. 读取文件：**
```powerquery
#"Added Custom" = Table.AddColumn(#"Kept First Rows", "FullFilePath", each [Folder Path] & [Name], type text),
#"Invoked Custom Function" = Table.AddColumn(#"Added Custom", "ReadSingleFile_Seatlist", each ReadSingleFile_Seatlist_ForSeat([FullFilePath])),
#"Removed Other Columns" = Table.SelectColumns(#"Invoked Custom Function",{"Name", "Date modified", "ReadSingleFile_Seatlist"}),
#"Expanded ReadSingleFile_Seatlist" = Table.ExpandTableColumn(#"Removed Other Columns", "ReadSingleFile_Seatlist", {"OU-No.", "Room-No."}, {"OU-No.", "Room-No."}),
#"Changed Type" = Table.TransformColumnTypes(#"Expanded ReadSingleFile_Seatlist",{{"OU-No.", type text}, {"Room-No.", type text}})
```

**3. Keep only the rows for the current room and get the OU with the highest number of seats:**
**3. 只保留当前房间的行并获取座位数最多的 OU：**
```powerquery
#"Filter out Empty OE" = Table.SelectRows(#"Changed Type", each ([#"Room-No."] = RoomNo) and ([#"OU-No."] <> null)),
#"Grouped Rows" = Table.Group(#"Filter out Empty OU", {"OU-No.", "Assigned_OU"}, {{"Seat_Count", each Table.RowCount(_), Int64.Type}}),
#"Sorted Seat_Count" = Table.Sort(#"Grouped Rows",{{"Seat_Count", Order.Descending}, {"Assigned_OU", Order.Ascending}}),
#"Kept highest Seat Count" = Table.FirstN(#"Sorted Seat_Count",1)
```

I must perform these operations twice: Once for the seats in the same room, once for the rooms on the same floor. The result is two columns, containing the OU to assign according to the same room or the floor. If the room has no assigned seats, set the OU to the OU with the highest number of seats on the entire floor. Otherwise, take the OU with the most assigned seats in the same room. It worked very well on my laptop. But then…
我必须执行这些操作两次：一次针对同一房间内的座位，一次针对同一楼层内的房间。结果是产生两列，包含根据同一房间或楼层分配的 OU。如果房间没有已分配的座位，则将 OU 设置为整个楼层中座位数最多的 OU。否则，取同一房间内分配座位数最多的 OU。这在我的笔记本电脑上运行得非常好。但后来……

### This is not practical
### 这并不实用

I encountered two major issues: As soon as I switched the source to a network-based folder, performance dropped drastically. A SharePoint folder was the worst, followed by a shared folder on a file server. The problem was that the M-functions mentioned above must be executed once for each row in the dataset. This resulted in around 1 GB of data being read, while the total across the three available files is 300 KB. The cause of the drop in performance wasn’t the amount of data read, as it worked well on my laptop. The reason was network traffic latency. Each round trip cost time, which resulted in a large amount of time needed to load the data.
我遇到了两个主要问题：一旦我将数据源切换到基于网络的文件夹，性能就会急剧下降。SharePoint 文件夹最慢，其次是文件服务器上的共享文件夹。问题在于上述 M 函数必须为数据集中的每一行执行一次。这导致读取了大约 1 GB 的数据，而三个可用文件的总大小仅为 300 KB。性能下降的原因不是读取的数据量，因为在我的笔记本电脑上运行良好。原因是网络流量延迟。每次往返都需要时间，导致加载数据需要大量时间。

The other issue was even more severe. While it worked in Power BI Desktop, it didn’t work after publishing it to the Service. The reason is that dynamic data sources are not allowed in Power Query.
另一个问题更为严重。虽然它在 Power BI Desktop 中可以运行，但在发布到服务后却无法运行。原因是 Power Query 不允许使用动态数据源。