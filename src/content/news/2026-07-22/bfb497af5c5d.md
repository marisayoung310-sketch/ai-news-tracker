---
title: "Are Your ML Experiments a Mess? Here’s the Fix"
originalUrl: "https://towardsdatascience.com/your-ml-experiments-are-a-mess-heres-the-fix/"
date: "2026-07-21T22:23:53.760Z"
---

# Are Your ML Experiments a Mess? Here’s the Fix
# 你的机器学习实验一团糟吗？解决方案来了

A hands-on guide to tracking experiments, logging models, and reproducing results with ML Flow.
这是一份使用 ML Flow 跟踪实验、记录模型并复现结果的实操指南。

***

Imagine you are building a new model. You get decent baseline results with a simple model, but try to improve performance with more advanced models. During development, your PM acquires some additional data that could prove useful, and can now revert to a simpler model. After extensive hyperparameter tuning, you consult your team and they advise you to optimize for a different performance metric. After you finally deliver a model, your stakeholder changes the direction of the project, requiring a complete overhaul.
想象一下，你正在构建一个新模型。你用一个简单的模型得到了不错的基准结果，但为了提升性能，你尝试了更高级的模型。在开发过程中，你的产品经理（PM）获取了一些可能有用的额外数据，于是你又回退到了更简单的模型。经过大量的超参数调优后，你咨询了团队，他们建议你针对不同的性能指标进行优化。在你最终交付模型后，利益相关者改变了项目方向，要求进行彻底的重构。

This is a common situation for data scientists, especially those with cross-collaborative teams, stakeholders, and changing priorities. Model development can quickly become a wild goose chase of figuring out requirements, data sources, performance metrics, etc. Through all of this chaos, it is critical that teams are able to not only keep track of all phases of model development, but are also able to reproduce results quickly. You need model governance.
对于数据科学家来说，这是一种常见的情况，尤其是那些涉及跨团队协作、利益相关者众多且优先级不断变化的项目。模型开发很快就会变成一场为了搞清楚需求、数据源、性能指标等而进行的“盲目追逐”。在所有这些混乱中，团队不仅要能够跟踪模型开发的所有阶段，还要能够快速复现结果，这一点至关重要。你需要的是模型治理（Model Governance）。

### Model Governance
### 模型治理

Model governance refers to the framework by which a team maintains controls around its use of models, including experiment tracking, version control, reproducibility, etc. It is a critical capability that many teams do not consider until their models are already in production. It is important to have a process to effectively track development efforts, models in production, and data leveraged so that organizations can ensure quality, compliance, and monitor machine learning integration.
模型治理是指团队用来维护模型使用控制的框架，包括实验跟踪、版本控制、可复现性等。这是一项关键能力，但许多团队直到模型已经投入生产时才开始考虑。拥有一套流程来有效跟踪开发工作、生产中的模型以及所利用的数据非常重要，这样组织才能确保质量、合规性并监控机器学习的集成情况。

To ensure that the right models are in production, we need a way to manage various models and versions, track performance metrics, and reproduce results. This is where ML Flow comes in. ML Flow is an open-source ML Ops platform that allows flexible model development, deployment, and management by streamlining logging and tracking of models, metrics, and more. This article will give an introduction into how to install ML Flow, create experiments, log models and more.
为了确保生产环境中使用的是正确的模型，我们需要一种方法来管理各种模型和版本、跟踪性能指标并复现结果。这就是 ML Flow 的用武之地。ML Flow 是一个开源的 MLOps 平台，它通过简化模型、指标等的记录和跟踪，实现了灵活的模型开发、部署和管理。本文将介绍如何安装 ML Flow、创建实验、记录模型等。

### ML Flow Tutorial: Model Development
### ML Flow 教程：模型开发

For our model, we will construct a basic linear regression model. This is a model to predict the annual salary of data professionals using inputs that include job title, company size, etc. Please note that this is a very poor model. We are using it only to demonstrate ML Flow.
对于我们的模型，我们将构建一个基础的线性回归模型。该模型用于预测数据专业人员的年薪，输入包括职位、公司规模等。请注意，这是一个非常简陋的模型，我们仅用它来演示 ML Flow。

```python
# define independent and dependent features
X = salary_data.drop(columns = 'salary_in_usd')
y = salary_data['salary_in_usd']

# split between training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, random_state = 104, test_size = 0.2, shuffle = True)

# define parameters separately to log
params = {"fit_intercept": True, "positive": False}

# fit linear regression model
regr = linear_model.LinearRegression(**params)
regr.fit(X_train, y_train)

# make predictions
y_pred = regr.predict(X_test)
```

Note that we define the model parameters separately. This will be important when we incorporate ML Flow.
请注意，我们是单独定义模型参数的。这在我们集成 ML Flow 时非常重要。

### Logging Model with ML Flow
### 使用 ML Flow 记录模型

To start using ML Flow, you can navigate to the terminal and pip install it as a module. Next, run the server command to host a local server on your machine and leverage the ML Flow user interface.
要开始使用 ML Flow，你可以进入终端并使用 pip 将其作为模块安装。接下来，运行服务器命令在你的机器上托管一个本地服务器，并利用 ML Flow 用户界面。

```bash
pip install mlflow
mlflow server --host 127.0.0.1 --port 8080
```

Now that we have ML Flow installed and our local server running, we can log our model. Before logging a model, we need to start a new ‘experiment’. Think of this as a project, a bin where we will log and store all related models, metrics, data, etc. In the code below, we start a new experiment titled “Logging Example”. An experiment consists of runs, which contain the model used, its parameters, metrics, artifacts, and anything else that you choose to log.
现在我们已经安装了 ML Flow 并运行了本地服务器，我们可以记录模型了。在记录模型之前，我们需要启动一个新的“实验”。可以将其视为一个项目，一个我们将记录和存储所有相关模型、指标、数据等的容器。在下面的代码中，我们启动了一个名为“Logging Example”的新实验。一个实验由多次“运行”（runs）组成，其中包含所使用的模型、参数、指标、工件以及你选择记录的任何其他内容。

```python
import mlflow
from mlflow.models import infer_signature

# set tracking uri
mlflow.set_tracking_uri(uri = "http://127.0.0.1:8080")

# create a new MLflow Experiment
mlflow.set_experiment("Logging Example")

# start an MLflow run
with mlflow.start_run(run_name = "salary_baseline_regression") as run:
    # Log the loss metric
    mlflow.log_metric("Adjusted R2", r2_score(y_test, y_pred))
    
    # log the hyperparameters
    mlflow.log_params(params)
    
    # set a tag that we can use to remind ourselves what this run was for
    mlflow.set_tag("Model Type", "Baseline")
    
    # log the model
    model_info = mlflow.sklearn.log_model(
        sk_model = regr,
        artifact_path = 'model',
        signature = infer_signature(X_train, regr.predict(X_train)),
        input_example = X_train,
        registered_model_name = "salary_baseline_regression")
```

After running, you can navigate to the ML Flow UI using the following link: http://localhost:8080/
运行代码后，你可以通过以下链接访问 ML Flow UI：http://localhost:8080/

### Navigating ML Flow UI
### 浏览 ML Flow UI

The ML Flow UI will open on the ‘Experiments’ tab. Here, we can see the experiment we created, the run for our baseline model, the model used, as well as metrics and parameters we logged. Note that the metrics and parameters may not be displayed at first. You can add them to the table using the ‘Columns’ drop down.
ML Flow UI 将在“Experiments”（实验）选项卡上打开。在这里，我们可以看到我们创建的实验、基准模型的运行记录、所使用的模型，以及我们记录的指标和参数。请注意，指标和参数可能不会立即显示，你可以使用“Columns”（列）下拉菜单将它们添加到表格中。

Next, click on the run name to navigate to the run view. This brings us to the overview tab where we can clearly see everything we have logged (model, R2 metric, model parameters).
接下来，点击运行名称以进入运行视图。这将带我们进入概览选项卡，在那里我们可以清楚地看到我们记录的所有内容（模型、R2 指标、模型参数）。

Next, click on the model name or navigate to the model view. Here we can view our model, add descriptions and/or tags, and keep track of its versions. The version number will increase.
接下来，点击模型名称或导航到模型视图。在这里，我们可以查看模型、添加描述和/或标签，并跟踪其版本。版本号将会自动增加。