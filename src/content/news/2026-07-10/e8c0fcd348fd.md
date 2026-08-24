---
title: "(Spanish) Dash: Monitoreo del Fenómeno El Niño"
originalUrl: "https://dev.to/ckomiya/dash-monitoreo-del-fenomeno-el-nino-2fd6"
date: "2026-07-09T22:54:10.916Z"
---

# Dash: Monitoreo del Fenómeno El Niño

Dash: Monitoreo del Fenómeno El Niño
Dash：厄尔尼诺现象监测

Hace unas semanas quería construir un dashboard rápido para visualizar datos, y en vez de ir directo a mis herramientas de siempre (Streamlit, o armar un frontend con React), decidí probar Dash. El resultado terminó siendo un proyecto que combina dos cosas que me interesan bastante: la simplicidad de construir dashboards en Python, y un tema que como peruano me toca de cerca — el Fenómeno El Niño.
几周前，我想快速构建一个数据可视化仪表板。与其直接使用我常用的工具（如 Streamlit 或用 React 搭建前端），我决定尝试一下 Dash。最终，这个项目结合了我非常感兴趣的两件事：用 Python 构建仪表板的简洁性，以及作为一个秘鲁人对我影响深远的主题——厄尔尼诺现象。

¿Qué es Dash? Dash es un framework de Python (de la gente de Plotly) para construir aplicaciones web de datos sin escribir una sola línea de JavaScript. Bajo el capó corre sobre Flask, React y Plotly.js, pero todo eso queda oculto: tú escribes Python, defines un layout con componentes HTML y gráficos, y conectas la interactividad con callbacks (funciones normales de Python decoradas con @app.callback).
什么是 Dash？Dash 是一个 Python 框架（由 Plotly 团队开发），用于构建数据 Web 应用，且无需编写任何 JavaScript 代码。其底层运行在 Flask、React 和 Plotly.js 之上，但这一切都被隐藏了：你只需编写 Python 代码，通过 HTML 组件和图表定义布局，并使用回调函数（用 @app.callback 装饰的普通 Python 函数）来连接交互功能。

Lo que más me sorprendió: Es sorprendentemente sencillo de aplicar. Si ya sabes armar un gráfico con Plotly, ya sabes el 70% de Dash. Se ve increíble desde el día uno. Los gráficos de Plotly ya traen zoom, pan, range sliders y tooltips interactivos gratis — sin escribir CSS ni JS. Todo vive en un solo lenguaje. No hay que saltar entre Python para el backend y JavaScript para la interactividad del frontend. Con esa primera impresión, busqué un dataset con el que valiera la pena practicar. Y ahí es donde entra el segundo interés.
最让我惊讶的是：它应用起来出奇地简单。如果你已经会用 Plotly 制作图表，那么你就已经掌握了 Dash 70% 的内容。它从第一天起看起来就很棒。Plotly 图表自带缩放、平移、范围滑块和交互式工具提示，无需编写任何 CSS 或 JS。一切都在同一种语言中完成，无需在后端 Python 和前端交互 JavaScript 之间来回切换。带着这种第一印象，我寻找了一个值得练习的数据集，这便引出了我的第二个兴趣点。

Por qué El Niño: Como peruano, El Fenómeno El Niño no es un tema abstracto de oceanografía: es lluvias e inundaciones en el norte del país, sequías en otras zonas, impacto directo en la pesca (nuestra anchoveta se mueve o desaparece), y en los casos más fuertes, desastres naturales que golpean carreteras, cultivos y ciudades enteras. Cada cierto tiempo el país entero está pendiente de si "viene El Niño" o no, y de qué tan fuerte va a ser. Quería entender mejor cómo se mide esto oficialmente, y construir algo que me permitiera ver la evolución del fenómeno en el tiempo, no solo el titular de la noticia del día.
为什么关注厄尔尼诺：作为秘鲁人，厄尔尼诺现象并非海洋学上的抽象概念：它意味着该国北部的降雨和洪水、其他地区的干旱、对渔业的直接影响（我们的鳀鱼会迁徙或消失），而在最严重的情况下，它还会引发自然灾害，摧毁道路、农作物和整个城市。每隔一段时间，全国上下都在关注“厄尔尼诺是否会来”以及它的强度如何。我想更好地了解官方是如何衡量这一现象的，并构建一个能让我观察其随时间演变的工具，而不仅仅是看当天的头条新闻。

ICEN y RONI: dos formas de medir el mismo fenómeno. Investigando, encontré que no existe un solo índice para "El Niño" — hay al menos dos que se complementan: ICEN (Índice Costero El Niño): mide la anomalía de temperatura superficial del mar frente a la costa peruana (región Niño 1+2). Lo calcula el IGP (Instituto Geofísico del Perú), y refleja las condiciones oceánicas locales que afectan directamente el clima y la pesca en el país. RONI (Relative Oceanic Niño Index): mide la anomalía en el Pacífico central-oriental (región Niño 3.4). Lo calcula NOAA CPC (el organismo climático de EE.UU.) y es el estándar internacional para monitorear el ENOS (El Niño-Oscilación del Sur) a escala global.
ICEN 和 RONI：衡量同一现象的两种方式。研究发现，衡量“厄尔尼诺”的指标不止一个，至少有两个互补的指标：ICEN（沿海厄尔尼诺指数）：衡量秘鲁海岸（Niño 1+2 区域）的海面温度异常。它由秘鲁地球物理研究所 (IGP) 计算，反映了直接影响该国气候和渔业的局部海洋状况。RONI（相对海洋厄尔尼诺指数）：衡量中东太平洋（Niño 3.4 区域）的异常情况。它由美国国家海洋和大气管理局气候预测中心 (NOAA CPC) 计算，是全球监测 ENSO（厄尔尼诺-南方涛动）的国际标准。

¿Por qué existen ambos si miden "lo mismo"? Porque el fenómeno puede manifestarse distinto según la zona: un evento puede verse fuerte en RONI (a nivel global) pero débil en ICEN (en la costa peruana), o viceversa. Perú necesita su propio índice porque las condiciones costeras locales no siempre siguen el patrón del Pacífico central al pie de la letra. Con ambos índices en un mismo gráfico, se puede comparar la "foto global" del ENOS con la "foto local" que de verdad le importa al país.
既然衡量的是“同一件事”，为什么两者都存在？因为该现象在不同区域的表现可能不同：一个事件在 RONI（全球层面）上可能表现强烈，但在 ICEN（秘鲁沿海）上可能较弱，反之亦然。秘鲁需要自己的指数，因为当地的沿海状况并不总是完全遵循中太平洋的模式。将两个指数放在同一张图表中，可以对比 ENSO 的“全球快照”与该国真正关心的“局部快照”。

El proyecto: Vigía ENOS. La estructura del proyecto es deliberadamente simple: la idea fue separar completamente la obtención de datos (ETL) de la presentación (Dash). El pipeline ETL son tres scripts que se corren en secuencia. fetch_icen.py y fetch_roni.py descargan los datos crudos directamente de las fuentes oficiales y los guardan como snapshots. transform.py toma ambas series, las une por fecha, calcula la categorización y detecta eventos por persistencia. El resultado es un único merged.csv que alimenta todo el dashboard.
项目：Vigía ENOS。项目结构被刻意简化：其核心理念是将数据获取 (ETL) 与展示 (Dash) 完全分离。ETL 流水线由三个按顺序运行的脚本组成。fetch_icen.py 和 fetch_roni.py 直接从官方来源下载原始数据并保存为快照。transform.py 获取两个序列，按日期合并，计算分类并检测持续性事件。最终生成一个 merged.csv 文件，为整个仪表板提供数据支持。

El gráfico principal: serie temporal con umbrales. El corazón visual del dashboard es un gráfico de líneas con Plotly que muestra ICEN y RONI en el tiempo, más las líneas de umbral que definen cada categoría. Cada línea de umbral se agrega con fig.add_hline() — una sola llamada te da la línea punteada, el color, y la anotación con el texto flotando encima. Esto es lo que quiero decir con "se ve increíble sin esfuerzo": no hace falta calcular posiciones de texto ni dibujar nada a mano, Plotly lo resuelve.
核心图表：带阈值的时间序列。仪表板的视觉核心是一个 Plotly 折线图，展示了 ICEN 和 RONI 随时间的变化，以及定义每个类别的阈值线。每条阈值线都通过 fig.add_hline() 添加——只需一次调用即可获得虚线、颜色以及悬浮在顶部的文本注释。这就是我所说的“毫不费力地看起来很棒”：无需计算文本位置或手动绘制任何内容，Plotly 都能自动解决。