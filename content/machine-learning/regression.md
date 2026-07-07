---
title: Regression — Predicting Numbers
tags:
  - machine-learning
  - regression
  - scikit-learn
---

# Regression — Predicting Numbers

Regression predicts a **continuous numerical value** — sales amount, price, temperature, demand.

---

## 🔢 Types of Regression

| Algorithm | When to Use |
|-----------|------------|
| Linear Regression | Baseline; when relationship is roughly linear |
| Ridge Regression | Linear + regularization to prevent overfitting |
| Lasso Regression | Linear + feature selection (zeros out unimportant features) |
| Random Forest | Non-linear relationships; handles mixed data well |
| Gradient Boosting | Best accuracy; slower to train |
| XGBoost | Industry standard; fast gradient boosting |

---

## 📐 Linear Regression

```python
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
import numpy as np

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train
model = LinearRegression()
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Evaluate
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
rmse = np.sqrt(np.mean((y_test - y_pred)**2))

print(f"MAE: {mae:.2f}")
print(f"RMSE: {rmse:.2f}")
print(f"R²: {r2:.4f}")

# Coefficients
for feature, coef in zip(X.columns, model.coef_):
    print(f"{feature}: {coef:.4f}")
```

---

## 🌲 Random Forest Regressor

```python
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score

model = RandomForestRegressor(
    n_estimators=100,     # Number of trees
    max_depth=10,         # Max depth per tree (prevents overfitting)
    min_samples_split=5,  # Min samples to split a node
    random_state=42,
    n_jobs=-1             # Use all CPU cores
)

model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Cross-validation (better evaluation)
cv_scores = cross_val_score(model, X, y, cv=5, scoring='r2')
print(f"CV R² scores: {cv_scores}")
print(f"Mean R²: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")

# Feature importance
import pandas as pd
importance = pd.DataFrame({
    'feature': X.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)
print(importance.head(10))
```

---

## ⚡ XGBoost

```python
from xgboost import XGBRegressor

model = XGBRegressor(
    n_estimators=300,
    learning_rate=0.05,
    max_depth=6,
    min_child_weight=1,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42,
    n_jobs=-1
)

model.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    verbose=False
)

y_pred = model.predict(X_test)
```

---

## 🎛️ Hyperparameter Tuning

```python
from sklearn.model_selection import GridSearchCV

param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [5, 10, 15, None],
    'min_samples_split': [2, 5, 10]
}

grid_search = GridSearchCV(
    RandomForestRegressor(random_state=42),
    param_grid,
    cv=5,
    scoring='r2',
    n_jobs=-1,
    verbose=1
)

grid_search.fit(X_train, y_train)
print("Best params:", grid_search.best_params_)
print("Best R²:", grid_search.best_score_)
```

---

## 🔗 Related
- [[machine-learning/model-evaluation|Model Evaluation]] — Metrics explained
- [[machine-learning/feature-engineering|Feature Engineering]] — Better features = better models
- [[machine-learning/scikit-learn-guide|Scikit-learn Guide]] — Full pipeline
