---
title: Model Evaluation
tags:
  - machine-learning
  - evaluation
  - metrics
---

# Model Evaluation

Choosing the wrong metric can make a bad model look good. This is one of the most important and misunderstood parts of ML.

---

## 📊 Regression Metrics

```python
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

y_true = [100, 200, 150, 300, 250]
y_pred = [110, 190, 160, 280, 240]

# MAE — average absolute error (in original units, easy to interpret)
mae = mean_absolute_error(y_true, y_pred)

# RMSE — penalizes large errors more than MAE
rmse = np.sqrt(mean_squared_error(y_true, y_pred))

# MAPE — percentage error (easy to communicate to business)
mape = np.mean(np.abs((np.array(y_true) - np.array(y_pred)) / np.array(y_true))) * 100

# R² — proportion of variance explained (1.0 = perfect, 0 = no better than mean)
r2 = r2_score(y_true, y_pred)

print(f"MAE:  {mae:.2f}")
print(f"RMSE: {rmse:.2f}")
print(f"MAPE: {mape:.1f}%")
print(f"R²:   {r2:.4f}")
```

### When to use which metric:
| Metric | Use When |
|--------|----------|
| MAE | Outliers should NOT be penalized heavily |
| RMSE | Large errors are especially bad (e.g., demand forecasting) |
| MAPE | Comparing across different scales |
| R² | Explaining model quality to stakeholders |

---

## 📊 Classification Metrics

```
                     Predicted
                  Positive  Negative
Actual  Positive    TP         FN
        Negative    FP         TN
```

```python
TP = true positives   # correctly predicted positive
TN = true negatives   # correctly predicted negative
FP = false positives  # predicted positive, actually negative (Type I error)
FN = false negatives  # predicted negative, actually positive (Type II error)

Accuracy  = (TP + TN) / (TP + TN + FP + FN)
Precision = TP / (TP + FP)   # Of all predicted positives, how many are correct?
Recall    = TP / (TP + FN)   # Of all actual positives, how many did we find?
F1 Score  = 2 * (Precision * Recall) / (Precision + Recall)
AUC-ROC   = area under the ROC curve (1.0 = perfect, 0.5 = random)
```

### When to prioritize which metric:
| Scenario | Prioritize |
|----------|-----------|
| Fraud detection | Recall (don't miss any fraud) |
| Email spam filter | Precision (don't mark good emails as spam) |
| Medical diagnosis | Recall (don't miss sick patients) |
| Recommendation system | Precision (don't recommend irrelevant items) |
| Balanced classes | F1 Score or Accuracy |
| Imbalanced classes | AUC-ROC or F1, not Accuracy |

---

## 🔄 Cross-Validation

Never evaluate on the same data you trained on.

```python
from sklearn.model_selection import cross_val_score, StratifiedKFold

# K-Fold Cross-Validation (regression)
cv_scores = cross_val_score(model, X, y, cv=5, scoring='r2')
print(f"CV Scores: {cv_scores}")
print(f"Mean: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")

# Stratified K-Fold (classification — preserves class ratio)
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
cv_scores = cross_val_score(model, X, y, cv=skf, scoring='roc_auc')
```

---

## 📉 Overfitting vs Underfitting

```python
from sklearn.model_selection import learning_curve
import numpy as np
import matplotlib.pyplot as plt

train_sizes, train_scores, val_scores = learning_curve(
    model, X, y, cv=5, n_jobs=-1,
    train_sizes=np.linspace(0.1, 1.0, 10),
    scoring='r2'
)

plt.figure(figsize=(10, 6))
plt.plot(train_sizes, train_scores.mean(axis=1), label='Training Score')
plt.plot(train_sizes, val_scores.mean(axis=1), label='Validation Score')
plt.fill_between(train_sizes, 
                  train_scores.mean(axis=1) - train_scores.std(axis=1),
                  train_scores.mean(axis=1) + train_scores.std(axis=1), alpha=0.1)
plt.xlabel('Training Size')
plt.ylabel('R² Score')
plt.title('Learning Curve')
plt.legend()
plt.show()

# Overfitting: training score >> validation score
# Underfitting: both scores are low
```

---

## 🔗 Related
- [[machine-learning/regression|Regression]] — Regression metrics in context
- [[machine-learning/classification|Classification]] — Classification metrics in context
- [[statistics/hypothesis-testing|Hypothesis Testing]] — Statistical validation of results
