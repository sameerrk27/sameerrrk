---
title: Scikit-learn Guide
tags:
  - machine-learning
  - scikit-learn
  - python
  - pipeline
---

# Scikit-learn Guide

Scikit-learn is the standard ML library for Python. Learn the Pipeline pattern — it makes ML reproducible and prevents data leakage.

---

## 🔄 The Scikit-learn Pattern

All estimators follow the same API:
```python
model.fit(X_train, y_train)    # Train
model.predict(X_test)          # Predict
model.score(X_test, y_test)    # Evaluate
model.transform(X)             # For transformers (scalers, encoders)
model.fit_transform(X)         # Fit and transform in one step
```

---

## 🏗️ Pipeline — The Right Way to Build ML

A Pipeline chains preprocessing + model into one object. This prevents data leakage (fitting scaler on test data).

```python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier

# Define column types
numeric_features = ['age', 'salary', 'years_experience']
categorical_features = ['department', 'city', 'education']

# Preprocessing pipeline for numeric features
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

# Preprocessing pipeline for categorical features
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
])

# Combine both preprocessing pipelines
preprocessor = ColumnTransformer(transformers=[
    ('num', numeric_transformer, numeric_features),
    ('cat', categorical_transformer, categorical_features)
])

# Full pipeline: preprocessing + model
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('model', RandomForestClassifier(n_estimators=100, random_state=42))
])

# Train and evaluate
pipeline.fit(X_train, y_train)
print(f"Accuracy: {pipeline.score(X_test, y_test):.4f}")

# Make predictions on new data (preprocessing applied automatically)
predictions = pipeline.predict(new_data)
```

---

## 🎛️ Hyperparameter Tuning with Pipeline

```python
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV

# Note the double underscore to access nested parameters
param_grid = {
    'model__n_estimators': [50, 100, 200],
    'model__max_depth': [5, 10, None],
    'model__min_samples_split': [2, 5],
    'preprocessor__num__imputer__strategy': ['mean', 'median']
}

# Grid search
grid_search = GridSearchCV(
    pipeline, param_grid, 
    cv=5, scoring='roc_auc', 
    n_jobs=-1, verbose=1
)
grid_search.fit(X_train, y_train)

print("Best params:", grid_search.best_params_)
print("Best AUC:", grid_search.best_score_)

# Best pipeline (includes all preprocessing)
best_pipeline = grid_search.best_estimator_
```

---

## 💾 Saving and Loading Models

```python
import joblib

# Save the full pipeline (includes preprocessing)
joblib.dump(pipeline, 'model_pipeline.joblib')

# Load later
loaded_pipeline = joblib.load('model_pipeline.joblib')
predictions = loaded_pipeline.predict(new_data)
```

---

## 🔍 Quick Reference: Common Algorithms

```python
# Regression
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from xgboost import XGBRegressor

# Classification  
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from xgboost import XGBClassifier

# Clustering
from sklearn.cluster import KMeans, DBSCAN, AgglomerativeClustering

# Dimensionality Reduction
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE

# Preprocessing
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, OrdinalEncoder
from sklearn.impute import SimpleImputer, KNNImputer

# Model Selection
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV
from sklearn.model_selection import StratifiedKFold
```

---

## 🔗 Related
- [[machine-learning/regression|Regression]] — Full regression examples
- [[machine-learning/classification|Classification]] — Full classification examples
- [[machine-learning/feature-engineering|Feature Engineering]] — Input to pipelines
- [[machine-learning/model-evaluation|Model Evaluation]] — Metrics to use in GridSearchCV
