---
title: Feature Engineering
tags:
  - machine-learning
  - feature-engineering
  - preprocessing
---

# Feature Engineering

> "Coming up with features is difficult, time-consuming, and requires expert knowledge. Applied machine learning is basically feature engineering." — Andrew Ng

Feature engineering is the process of **creating or transforming input variables** to improve model performance.

---

## 🔢 Encoding Categorical Variables

```python
import pandas as pd
from sklearn.preprocessing import LabelEncoder, OrdinalEncoder
from sklearn.preprocessing import OneHotEncoder

# ONE-HOT ENCODING (for nominal categories, no order)
# Use when: <10 unique values, no ordinal relationship
dummies = pd.get_dummies(df['city'], prefix='city', drop_first=True)
df = pd.concat([df, dummies], axis=1)

# Or with sklearn (better for pipelines)
from sklearn.preprocessing import OneHotEncoder
ohe = OneHotEncoder(drop='first', sparse_output=False)
encoded = ohe.fit_transform(df[['city', 'category']])

# LABEL ENCODING (for binary or ordinal categories)
# Use when: binary (0/1) or when there's a clear order
le = LabelEncoder()
df['gender_encoded'] = le.fit_transform(df['gender'])

# ORDINAL ENCODING (ordered categories)
oe = OrdinalEncoder(categories=[['Low', 'Medium', 'High']])
df['priority_encoded'] = oe.fit_transform(df[['priority']])

# TARGET ENCODING (replace category with mean of target)
# Careful: can cause data leakage if not done properly
target_mean = df.groupby('city')['target'].mean()
df['city_encoded'] = df['city'].map(target_mean)
```

---

## 📐 Scaling Numerical Features

```python
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler

# STANDARDIZATION — zero mean, unit variance
# Use for: linear models, SVM, neural networks, PCA
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_train)   # Fit on train, transform both
X_test_scaled = scaler.transform(X_test)   # NOT fit_transform on test!

# MIN-MAX SCALING — scales to [0, 1]
# Use for: neural networks, image data
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X_train)

# ROBUST SCALING — uses median and IQR (good for outliers)
# Use when: data has significant outliers
scaler = RobustScaler()
X_scaled = scaler.fit_transform(X_train)

# Note: Tree-based models (Random Forest, XGBoost) DON'T need scaling!
```

---

## 📅 Date/Time Features

```python
df['date'] = pd.to_datetime(df['date'])

# Extract components
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day'] = df['date'].dt.day
df['day_of_week'] = df['date'].dt.dayofweek    # 0=Monday, 6=Sunday
df['is_weekend'] = df['day_of_week'].isin([5, 6]).astype(int)
df['quarter'] = df['date'].dt.quarter
df['week_of_year'] = df['date'].dt.isocalendar().week

# Cyclical encoding (so Jan and Dec are close to each other)
import numpy as np
df['month_sin'] = np.sin(2 * np.pi * df['month'] / 12)
df['month_cos'] = np.cos(2 * np.pi * df['month'] / 12)
df['dow_sin'] = np.sin(2 * np.pi * df['day_of_week'] / 7)
df['dow_cos'] = np.cos(2 * np.pi * df['day_of_week'] / 7)

# Days since a reference date
df['days_since_first_purchase'] = (df['date'] - df['first_purchase_date']).dt.days
```

---

## 🎨 Interaction Features

```python
# Multiplication interaction
df['revenue_per_customer'] = df['total_revenue'] / df['num_customers']
df['profit_margin'] = (df['revenue'] - df['cost']) / df['revenue']

# Polynomial features (for linear models)
from sklearn.preprocessing import PolynomialFeatures
poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X[['age', 'salary']])
# Creates: age, salary, age², salary², age×salary
```

---

## 🗑️ Feature Selection

```python
from sklearn.feature_selection import SelectKBest, f_regression, RFE
from sklearn.ensemble import RandomForestClassifier

# CORRELATION-BASED (remove highly correlated features)
corr_matrix = X.corr().abs()
upper = corr_matrix.where(np.triu(np.ones(corr_matrix.shape), k=1).astype(bool))
to_drop = [col for col in upper.columns if any(upper[col] > 0.95)]
X_reduced = X.drop(columns=to_drop)

# FEATURE IMPORTANCE (from tree models)
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

importance = pd.Series(rf.feature_importances_, index=X.columns)
top_features = importance.nlargest(20).index
X_important = X[top_features]
```

---

## 🔗 Related
- [[machine-learning/regression|Regression]] — Apply engineered features
- [[machine-learning/classification|Classification]] — Encoding is crucial for classification
- [[python/data-cleaning|Data Cleaning]] — Clean before engineering
