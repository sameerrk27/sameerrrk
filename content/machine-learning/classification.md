---
title: Classification — Predicting Categories
tags:
  - machine-learning
  - classification
  - scikit-learn
---

# Classification — Predicting Categories

Classification predicts **which category** something belongs to — spam/not spam, churn/not churn, fraud/legitimate.

---

## 🏷️ Types of Classification

| Type | Description | Example |
|------|-------------|---------|
| Binary | 2 classes | Churn (Yes/No), Fraud (Yes/No) |
| Multiclass | 3+ classes | Product category (A/B/C/D) |
| Multilabel | Multiple labels at once | Tags on an article |

---

## 🔒 Logistic Regression (Baseline)

Despite the name, Logistic Regression is a **classification** algorithm.

```python
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

# Logistic Regression needs scaled features
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', LogisticRegression(random_state=42, max_iter=1000))
])

pipeline.fit(X_train, y_train)
y_pred = pipeline.predict(X_test)
y_proba = pipeline.predict_proba(X_test)[:, 1]  # Probability of class 1

# Threshold tuning
threshold = 0.3  # Lower threshold = more positives (higher recall)
y_pred_custom = (y_proba >= threshold).astype(int)
```

---

## 🌲 Random Forest Classifier

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    class_weight='balanced',  # Handle imbalanced classes
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)
y_pred = model.predict(X_test)
y_proba = model.predict_proba(X_test)[:, 1]
```

---

## 📊 Evaluation Metrics

```python
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report, roc_auc_score
)
import matplotlib.pyplot as plt
import seaborn as sns

print(classification_report(y_test, y_pred))

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=['Predicted Negative', 'Predicted Positive'],
            yticklabels=['Actual Negative', 'Actual Positive'])
plt.title('Confusion Matrix')
plt.show()

# ROC-AUC
auc = roc_auc_score(y_test, y_proba)
print(f"AUC-ROC: {auc:.4f}")
```

---

## ⚖️ Handling Imbalanced Data

Real-world classification often has imbalanced classes (e.g., 97% not fraud, 3% fraud).

```python
# Option 1: class_weight='balanced'
model = RandomForestClassifier(class_weight='balanced')

# Option 2: SMOTE (oversampling minority class)
from imblearn.over_sampling import SMOTE
sm = SMOTE(random_state=42)
X_resampled, y_resampled = sm.fit_resample(X_train, y_train)

# Option 3: Tune the threshold
# Instead of 0.5, use 0.3 to catch more positives (higher recall)
```

---

## 🔗 Related
- [[machine-learning/model-evaluation|Model Evaluation]] — Which metrics to use when
- [[machine-learning/feature-engineering|Feature Engineering]] — Preprocessing for classification
- [[sql/sql-for-analytics|SQL Analytics]] — Funnel analysis complements classification
