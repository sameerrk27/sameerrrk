---
title: Machine Learning
tags:
  - machine-learning
  - scikit-learn
  - ml
---

# Machine Learning

Machine Learning is about building systems that **learn from data to make predictions or decisions**.

> As a data analyst, ML adds predictive power to your descriptive analysis.

---

## 📚 Topics in This Section

- [[machine-learning/regression|Regression]] — Predict continuous values (sales, prices, demand)
- [[machine-learning/classification|Classification]] — Predict categories (churn, fraud, sentiment)
- [[machine-learning/feature-engineering|Feature Engineering]] — Create better input variables
- [[machine-learning/model-evaluation|Model Evaluation]] — How to know if your model is good
- [[machine-learning/scikit-learn-guide|Scikit-learn Guide]] — Practical ML with Python

---

## 🗺️ ML Landscape

```
Machine Learning
│
├── Supervised Learning (labeled data)
│   ├── Regression → predict numbers
│   │   ├── Linear Regression
│   │   ├── Ridge / Lasso
│   │   ├── Random Forest Regressor
│   │   └── Gradient Boosting (XGBoost)
│   │
│   └── Classification → predict categories
│       ├── Logistic Regression
│       ├── Decision Tree
│       ├── Random Forest
│       ├── SVM
│       └── Gradient Boosting
│
├── Unsupervised Learning (no labels)
│   ├── Clustering (K-Means, DBSCAN)
│   └── Dimensionality Reduction (PCA)
│
└── Semi-supervised / Reinforcement Learning (advanced)
```

---

## 🔄 ML Workflow

1. **Define the problem** — What are you predicting? What's success?
2. **Collect & explore data** — EDA, understand patterns
3. **Clean & preprocess** — Handle missing values, encode categoricals
4. **Feature engineering** — Create better features
5. **Split data** — Train/validation/test split
6. **Train baseline model** — Simple model to beat
7. **Train & tune models** — Cross-validation, hyperparameter tuning
8. **Evaluate on test set** — Final unbiased evaluation
9. **Deploy or present** — Put the model to use

---

## 🔗 Related
- [[python/index|Python]] — Primary language for ML
- [[statistics/index|Statistics]] — Foundation of ML algorithms
- [[python/eda-workflow|EDA]] — Required before any ML work
