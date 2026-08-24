---
title: "Lo que aprendí diseñando un SaaS para clínicas: por qué la decisión más importante fue la más aburrida"
originalUrl: "https://dev.to/jose_confalonieri_3891172/lo-que-aprendi-disenando-un-saas-para-clinicas-por-que-la-decision-mas-importante-fue-la-mas-4iom"
date: "2026-06-19T22:23:25.335Z"
---

# Lo que aprendí diseñando un SaaS para clínicas: por qué la decisión más importante fue la más aburrida
# 我在设计诊所 SaaS 时学到的：为什么最重要的决定往往是最无聊的

Durante mucho tiempo pensé que ser mejor desarrollador era escribir mejor código. Después con el equipo nos pusimos a diseñar un MVP para una clínica que evoluciona en un futuro a un SaaS multi tenant para un cliente y en el futuro poder escalar para muchos más, y entendí que el código era la parte fácil. Lo difícil era decidir qué no construir todavía.
长期以来，我一直认为成为一名更好的开发者意味着写出更好的代码。后来，我和团队开始为一个诊所设计 MVP，目标是未来将其演进为一个多租户（multi-tenant）SaaS，以服务更多客户并实现扩展。这时我才明白，代码其实是最简单的部分，最难的是决定“现在不该构建什么”。

La decisión más importante fue la más aburrida. Cuando arranqué el diseño la tentación era obvia: microservicios, eventos y Kubernetes. Es lo que se lee, es lo que se suma en el CV. No digo que microservicios esté mal. El tema es que tiene un costo que solo tiene sentido pagar a partir de cierto tamaño, y al principio de un proyecto no estás ahí.
最重要的决定往往是最无聊的。当我开始设计时，诱惑显而易见：微服务、事件驱动和 Kubernetes。这些是书本上常读到的，也是简历上的加分项。我并不是说微服务不好，问题在于它有成本，只有达到一定规模后才值得支付，而项目初期根本没到那个阶段。

Si separás todo en servicios cada uno necesita su propio pipeline, hay que versionar cómo se hablan entre ellos, y cuando algo falla tenés que rastrear el error pasando por varios procesos en vez de uno. Con un equipo de tres personas y pocos usuarios eso es trabajo de más sin ningún beneficio real todavía. Si el equipo crece y cada parte del sistema empieza a cambiar a un ritmo distinto ahí sí empieza a valer la pena, pero hacerlo antes es resolver un problema que todavía no existe.
如果你把一切拆分成服务，每个服务都需要自己的流水线（pipeline），必须对它们之间的通信进行版本控制，而且当出现故障时，你必须跨越多个进程来追踪错误，而不是在一个进程内解决。对于一个三人团队和少量用户来说，这是多余的工作，且没有任何实际收益。如果团队壮大，系统的各个部分开始以不同的节奏演进，那时才值得这样做；但在那之前，这只是在解决一个尚未存在的问题。

Elegí una arquitectura en capas con .NET 8 y PostgreSQL corriendo en una plataforma de USD 20/30 por mes. Fue decisión, no resignación. Un equipo de 3 personas que adopta microservicios paga contratos entre servicios, versionado, debugging distribuido, observabilidad seria y una factura de cloud de cientos de dólares, para servir a una clínica con treinta usuarios concurrentes. Todo costo, ningún beneficio, y es lo que producís cuando partís un sistema antes de entender dónde están sus costuras reales.
我选择了一个基于 .NET 8 和 PostgreSQL 的分层架构，运行在每月 20-30 美元的平台上。这是深思熟虑的决定，而非妥协。一个三人团队如果采用微服务，就得承担服务契约、版本控制、分布式调试、专业的可观测性以及数百美元的云账单，而这一切仅仅是为了服务一家只有三十个并发用户的诊所。这全是成本，毫无收益，这就是在还没搞清楚系统真正的“接缝”在哪里之前就盲目拆分的结果。

Lo que sí hice fue tener criterio en las decisiones baratas de tomar y carísimas de revertir: una columna TenantId en todas las tablas cuando existía un solo tenant, Docker desde el primer commit, una interfaz delante del proveedor de WhatsApp. Ninguna me costó más de una tarde. Al escalar después, eso se convertiría de una migración dolorosa en un cambio de configuración. La del TenantId en particular la añadimos por planificación, para poder recibir más de un cliente.
我所做的是在那些“决策成本低但回滚成本极高”的事情上保持判断力：在只有一个租户时就在所有表中添加 TenantId 列，从第一次提交就开始使用 Docker，在 WhatsApp 提供商前封装接口。这些工作每一项都没花超过一个下午。当未来需要扩展时，这些工作将把痛苦的迁移变成简单的配置更改。特别是 TenantId，我们是为了规划未来能接入更多客户而提前添加的。

La arquitectura en capas queda chica para multi tenant, pero no porque fuera mala. El sistema, al evolucionar a SaaS, empezaría a sufrir. Los recordatorios de WhatsApp, si se llegaran a disparar todos en la misma franja horaria, no podrían escalar solo ese módulo. O peor: una degradación de la API de Meta podía arrastrar la reserva de turnos, y no hay forma de explicarle a una recepcionista que no puede dar un turno porque WhatsApp está lento.
分层架构对于多租户来说确实显得局促，但这并不是因为它不好。当系统演进为 SaaS 时，它开始出现瓶颈。例如，如果所有的 WhatsApp 提醒都在同一时间段触发，你无法单独扩展该模块。更糟糕的是：Meta API 的降级可能会拖累预约系统，你无法向接待员解释说“因为 WhatsApp 变慢了，所以无法预约”。

Esa frase fue mi argumento para los eventos. La reserva de un turno tiene una sola operación que debe ser síncrona y transaccional: validar disponibilidad y escribir el turno. Todo lo demás, el mensaje, la auditoría, son efectos que pueden ocurrir dos segundos después, con garantía de que ocurren (patrón Outbox) pero sin bloquear a nadie. Esto sigue corriendo todo en el mismo deploy, la cola no es otro servicio, es solo una forma de organizar el trabajo dentro del mismo sistema.
这句话成了我引入事件驱动的理由。预约操作中，只有“验证可用性并写入预约”这一步必须是同步且事务性的。其余的一切——发送消息、审计日志——都是可以在两秒后发生的副作用，通过 Outbox 模式保证其最终执行，且不会阻塞任何人。这一切仍然运行在同一个部署中，队列不是另一个服务，只是在同一个系统内组织工作的一种方式。

Cuando Meta falla, los mensajes esperan en una cola y reintentan con backoff; si agotan los reintentos van a una dead letter queue con alerta. El turno, mientras tanto, ya existe. El hecho de negocio nunca debió depender de su notificación.
当 Meta 出现故障时，消息会在队列中等待并进行指数退避重试；如果重试耗尽，它们会进入死信队列并触发警报。与此同时，预约已经成功创建。业务事实本身绝不应该依赖于其通知是否成功。

El dominio te corrige los patrones que traías de memoria. La lección que menos esperaba era que los patrones no se aplican, se negocian con el dominio. Consistencia eventual es una herramienta hermosa que tuve que sacar para la historia clínica, porque un diagnóstico eventualmente consistente es un riesgo legal, no una optimización. Lo mismo con el caché. Redis para disponibilidad de turnos, sí. Para contenido clínico, no, porque cada lectura de una historia clínica tiene que quedar auditada, y un cache hit silencioso rompe esa trazabilidad que la ley exige.
领域知识会修正你脑海中固有的模式。我最没预料到的教训是：模式不是直接套用的，而是需要与业务领域进行协商的。最终一致性是一个很棒的工具，但我不得不将其从病历模块中剔除，因为“最终一致”的诊断结果是法律风险，而不是优化。缓存也是如此：预约可用性可以用 Redis，但病历内容不行，因为每一次病历读取都必须被审计，而静默的缓存命中会破坏法律要求的可追溯性。

Diseñar para salud me obligó a leer la normativa, y ahí entendí que los requisitos legales son requisitos arquitectónicos disfrazados. "La historia clínica es inviolable" se traduce en código en append only, soft delete y un servicio de auditoría de primera clase.
为医疗行业设计系统迫使我阅读了相关法规，我意识到法律要求其实就是伪装成架构需求的指令。“病历不可篡改”在代码中转化为“仅追加（append-only）”、“软删除（soft delete）”以及一流的审计服务。

La parte de infraestructura me llevó más tiempo del que esperaba. Acá es donde más me equivoqué al principio. Mi primer borrador de la arquitectura de eventos no incluía presupuesto para tracing distribuido ni para alertas sobre las colas, y eso casi me lleva a repetir el mismo error que estaba criticando: diseñar algo elegante en el diagrama e inoperable en producción. Una arquitectura que no podés operar no es una arquitectura, es un dibujo.
基础设施部分花费的时间比我预期的要多。这是我最初犯错最多的地方。我最初的事件驱动架构草案没有包含分布式追踪或队列警报的预算，这差点让我重蹈覆辙：设计出图纸上优雅、但在生产环境中无法运维的东西。无法运维的架构不是架构，只是画图。

Terminé presupuestando pipelines con migraciones expand/contract, para poder hacer rollback del código sin hacer rollback de la base, y armando una tabla de costos que incluía el NAT Gateway, que en casi todos los presupuestos que vi antes aparece como una línea olvidada. Esa tabla me llevó a la conclusión más incómoda del proyecto: para el tamaño real de este SaaS, Fargate salía más barato y más simple que Kubernetes.
我最终为流水线规划了“扩展/收缩（expand/contract）”迁移方案，以便在不回滚数据库的情况下回滚代码，并编制了一份包含 NAT Gateway 的成本表——这在之前看到的几乎所有预算中都是被遗忘的一行。那张表让我得出了项目中最尴尬的结论：对于这个 SaaS 的实际规模，Fargate 比 Kubernetes 更便宜、更简单。

No es una diferencia menor, es bastante más de 150 dólares todos los meses solo por la decisión de infraestructura. Lo documenté igual, porque también es parte del trabajo poder decir "esto que estoy mostrando está sobredimensionado para hoy". Toda esta arquitectura en capas con eventos por encima tiene un techo, y lo sé porque lo dejé planificado para cuando llegue: si esto en algún momento pasa de unas pocas clínicas a unas cuarenta, ya no alcanza con un solo sistema mandando todo a una cola. Ahí sí entran los microservicios de verdad, separados por dominio.
这不仅仅是小钱，仅因基础设施决策的不同，每月就多出 150 多美元。我还是将其记录了下来，因为能够说出“我展示的这个方案对今天来说是过度设计的”也是工作的一部分。这种带有事件驱动的分层架构是有上限的，我知道这一点，因为我已经为未来做好了规划：如果未来从几家诊所扩展到四十家左右，单一系统处理所有队列就不够用了。到那时，才是真正引入按领域拆分的微服务的时候。