---
title: "Interpretable machine learning predicts Parkinson's disease severity using motion-corrected QSM MRI and multiband multiecho fMRI features"
originalUrl: "https://arxiv.org/abs/2607.02553"
date: "2026-07-07T22:41:09.621Z"
---

# Interpretable machine learning predicts Parkinson's disease severity using motion-corrected QSM MRI and multiband multiecho fMRI features
# 可解释机器学习利用运动校正 QSM MRI 和多频带多回波 fMRI 特征预测帕金森病严重程度

**Abstract:**
**摘要：**

**Introduction:** Objective neuroimaging biomarkers may improve Parkinson's disease motor assessment by capturing brain variation not directly observable from clinical examination. We used interpretable machine learning to predict current motor severity, measured by MDS-UPDRS Part III, from QSM and multiband multi-echo resting-state fMRI-derived ReHo features.
**引言：** 客观的神经影像生物标志物可以通过捕捉临床检查中无法直接观察到的脑部变化，从而改善帕金森病的运动评估。我们利用可解释机器学习，通过 QSM（定量磁敏感成像）和基于多频带多回波静息态 fMRI 导出的 ReHo（局部一致性）特征，预测由 MDS-UPDRS 第三部分衡量的当前运动严重程度。

**Methods:** Regional QSM and ReHo features were extracted from 28 participants, including 24 individuals with Parkinson's disease and 4 controls. Thirteen feature-set experiments evaluated imaging-only, clinical-only, imaging-plus-clinical, full, reduced, and multimodal inputs. Support vector regression, Elastic Net, Random Forest, and XGBoost models were trained using nested cross-validation. Performance was assessed using pooled held-out R^2, RMSE, MAE, Pearson correlation, permutation testing, and the proportion of participants predicted within +/-5 MDS-UPDRS Part III points.
**方法：** 从 28 名参与者（包括 24 名帕金森病患者和 4 名对照组）中提取了区域性 QSM 和 ReHo 特征。通过 13 组特征集实验，评估了仅影像、仅临床、影像加临床、全特征、精简特征及多模态输入的效果。使用嵌套交叉验证训练了支持向量回归（SVR）、弹性网络（Elastic Net）、随机森林（Random Forest）和 XGBoost 模型。性能评估指标包括汇总的留出 R^2、RMSE、MAE、皮尔逊相关系数、置换检验，以及预测值在 MDS-UPDRS 第三部分评分 +/-5 分以内的参与者比例。

**Results:** Imaging-only models carried meaningful predictive signal, whereas the clinical-only model performed weakly. Full fMRI, full QSM, and clinical variables provided the strongest global fit, explaining 45.4% of variance in motor severity. Selected QSM plus clinical variables produced the most clinically close predictions, with 75.0% of participants predicted within +/-5 points and the lowest MAE among top-performing models. SHAP highlighted cerebellar, thalamic, striatal, insular, and motor cortical features.
**结果：** 仅影像模型携带了有意义的预测信号，而仅临床模型表现较弱。全 fMRI、全 QSM 和临床变量提供了最强的全局拟合度，解释了运动严重程度 45.4% 的方差。精选的 QSM 加临床变量产生了最接近临床的预测结果，75.0% 的参与者预测误差在 +/-5 分以内，且在表现最好的模型中 MAE 最低。SHAP 分析突出了小脑、丘脑、纹状体、岛叶和运动皮层特征的重要性。

**Conclusion:** QSM and multiband multi-echo fMRI-derived ReHo capture distinct, interpretable dimensions of Parkinson's disease motor severity. These findings show that structural and functional imaging contribute differently depending on the clinical prediction goal.
**结论：** QSM 和基于多频带多回波 fMRI 导出的 ReHo 捕捉到了帕金森病运动严重程度中不同且可解释的维度。这些发现表明，结构影像和功能影像在不同的临床预测目标下具有不同的贡献。