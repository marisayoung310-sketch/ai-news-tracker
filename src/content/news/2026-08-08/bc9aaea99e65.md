---
title: "From constraint models to playable puzzle games"
originalUrl: "https://zayenz.se/blog/post/constraint-generated-puzzle-games/"
date: "2026-08-07T22:06:30.471Z"
---

# From constraint models to playable puzzle games
# 从约束模型到可玩益智游戏

For my paper *Scaling Sudoku as a Constraint Problem*, I generated a repository of 434,201 Sudoku instances at five sizes between 6×6 and 36×36. I used them in constraint-programming experiments to ask which propagation scheme solves a puzzle without branching, how that changes with size, and how many clues move an instance from one hardness category to another. I also wanted to play a few of them. That small wish grew sideways.
为了撰写我的论文《将数独作为约束问题进行扩展》（Scaling Sudoku as a Constraint Problem），我生成了一个包含 434,201 个数独实例的存储库，涵盖了从 6×6 到 36×36 五种不同尺寸。我将它们用于约束编程实验，旨在探究哪种传播方案可以在无需分支的情况下解决谜题、这种方案如何随尺寸变化，以及需要多少线索才能使实例从一个难度类别跨越到另一个类别。此外，我还想亲自玩一玩这些谜题。这个小小的愿望最终演变成了一个更大的项目。

I now have playable versions of Sudoku, Nonogram, Queens, Zip, Loopy, Tents, Patches, Wend, and its Swedish sibling Swend. They are collected on a games page. Each game section below includes a small model written in MiniZinc, a constraint-modelling language, and explains one part of the corresponding generator. The models are explanatory sketches rather than the programs that build the packs. Most generation and solving code uses Gecode 6.4.0. Additional programs handle importing, rasterisation, exact cover, and pack assembly.
现在，我已经拥有了数独（Sudoku）、数织（Nonogram）、皇后问题（Queens）、Zip、Loopy、帐篷（Tents）、Patches、Wend 及其瑞典语版本 Swend 的可玩版本。它们被收集在一个游戏页面中。下方每个游戏部分都包含一个用约束建模语言 MiniZinc 编写的小型模型，并解释了相应生成器的一部分。这些模型是解释性的草图，而非构建这些游戏包的实际程序。大部分生成和求解代码使用了 Gecode 6.4.0。其他程序则负责处理导入、栅格化、精确覆盖（exact cover）和游戏包组装。

What all nine games have in common is that I start with a solution or source image. I then add, move, or remove information until the intended answer is unique, or discard a candidate that cannot be repaired cleanly. Some of the same deductions later classify difficulty and provide hints. Generation and uniqueness checking happen offline. The browser receives static puzzles and stored solutions; it does not run a solver.
这九款游戏的共同点在于，我都是从一个解或源图像开始的。然后，我通过添加、移动或删除信息，直到预期的答案变得唯一，或者丢弃无法被完美修复的候选方案。其中一些推导过程后来被用于难度分类和提供提示。生成和唯一性检查均在离线状态下完成。浏览器接收的是静态谜题和已存储的解，它本身并不运行求解器。

Difficulty labels come from propagation, search, or deterministic deduction measurements. They provide a relative, mechanically derived ordering within each pack; they do not estimate how difficult players will find the puzzles. The listings were checked with MiniZinc 2.10.0. To keep them focused, they leave out input validation, search annotations, and the outer loop that rejects a candidate when a second solution exists. Output is omitted except where it defines which decisions constitute a puzzle solution.
难度标签源自传播、搜索或确定性推导的测量结果。它们在每个游戏包内提供了一种相对的、机械导出的排序；它们并不评估玩家会觉得这些谜题有多难。这些列表已使用 MiniZinc 2.10.0 进行过检查。为了保持简洁，它们省略了输入验证、搜索注释以及在存在第二个解时拒绝候选方案的外层循环。输出部分也被省略，除非它定义了哪些决策构成了谜题的解。

## Sudoku: from corpus to game
## 数独：从语料库到游戏

The Scaling Sudoku corpus begins with 32,000 uniquely solvable base puzzles at sizes 6×6, 9×9, 16×16, 25×25, and 36×36. A generator first creates a complete grid, then removes clues while preserving uniqueness. Gecode classifies the resulting puzzles. The classification extends the setup in Helmut Simonis’s 2005 paper *Sudoku as a Constraint Problem*. It tries an ordered family of propagation configurations. Val, Bnd, and Dom refer to value, bounds, and domain propagation; BS and DS add bounds or domain shaving. The weakest successful configuration becomes the puzzle’s hardness tag. If none finishes without branching, the tag is Search.
“扩展数独”语料库始于 32,000 个具有唯一解的基础谜题，尺寸包括 6×6、9×9、16×16、25×25 和 36×36。生成器首先创建一个完整的网格，然后在保持唯一性的前提下移除线索。Gecode 对生成的谜题进行分类。该分类扩展了 Helmut Simonis 在 2005 年的论文《数独作为约束问题》中的设置。它尝试了一系列有序的传播配置。Val、Bnd 和 Dom 分别指值传播、边界传播和域传播；BS 和 DS 则增加了边界或域削减（shaving）。最弱的成功配置即成为该谜题的难度标签。如果没有任何配置能在不进行分支的情况下完成，则标签为“搜索”（Search）。

The basic Sudoku model is pleasantly short. The box dimensions are data, which lets the same model handle 6×6 boards with 2×3 boxes and the usual 9×9 boards with 3×3 boxes.
基础数独模型非常简洁。宫格尺寸作为数据输入，这使得同一个模型既能处理带有 2×3 宫格的 6×6 棋盘，也能处理常见的带有 3×3 宫格的 9×9 棋盘。

## Making Sudoku look more like Sudoku
## 让数独看起来更像数独

Generated puzzles do not automatically have the visual symmetry people tend to expect from a published Sudoku. I did not want to generate a separate collection merely for presentation, so I wrote an offline symmetrification pass for the selected puzzles. There are two useful freedoms. First, rows and columns can be permuted in ways that preserve the box structure: rows within a band, columns within a stack, and the bands and stacks themselves. Second, a missing rotational partner can be filled with the value from the known solution. The latter only adds information, so it cannot introduce a second solution, but it may make the puzzle easier according to the propagation classifier.
生成的谜题并不会自动具备人们在已出版数独中期望看到的视觉对称性。我不想仅仅为了展示而生成一个单独的集合，所以我为选定的谜题编写了一个离线对称化处理程序。这里有两种有用的自由度。首先，行和列可以在保持宫格结构的前提下进行置换：带内的行置换、栈内的列置换，以及带与带、栈与栈之间的置换。其次，缺失的旋转对称位置可以用已知解中的数值填充。后者只会增加信息，因此不会引入第二个解，但根据传播分类器的标准，它可能会使谜题变得更容易。

For each puzzle, the optimiser enumerates the distinct rotational pairings obtainable from box-preserving layouts and ranks them by how many clues would be needed for 180-degree rotational symmetry. It evaluates the three best-ranked layouts, first trying to complete the symmetry for each one. If that changes the hardness tag, it adds partner clues individually and keeps only additions for which Gecode reproduces the original tag. Finally, it chooses the resulting layout with the fewest asymmetric cells. The pass made 228 of the 500 puzzles exactly rotationally symmetric and reduced the total number of asymmetric cells from 6,172 to 1,928.
对于每个谜题，优化器会枚举所有通过保持宫格结构的布局所能获得的旋转配对，并根据实现 180 度旋转对称所需的线索数量进行排名。它会评估排名最好的三个布局，首先尝试为每个布局补全对称性。如果这改变了难度标签，它会逐个添加对称线索，并仅保留那些能让 Gecode 维持原始难度标签的添加方案。最后，它选择非对称单元格最少的布局。这一处理过程使 500 个谜题中的 228 个实现了完全的旋转对称，并将非对称单元格的总数从 6,172 个减少到了 1,928 个。