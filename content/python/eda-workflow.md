---
title: EDA Workflow
tags:
  - python
  - eda
  - exploratory-data-analysis
---

# Exploratory Data Analysis (EDA) Workflow

EDA is about **understanding your data before modeling or reporting**. It's the most underrated skill in data analysis.

> "Exploratory data analysis can never be the whole story, but nothing else can serve as the foundation stone." — John Tukey

---

## 🗺️ My EDA Template

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

plt.style.use('seaborn-v0_8')
pd.set_option('display.max_columns', None)

def eda_report(df):
    """Quick EDA on any DataFrame."""
    print("=" * 60)
    print("SHAPE:", df.shape)
    print("\nDATA TYPES:\n", df.dtypes)
    print("\nMISSING VALUES:\n", df.isnull().sum()[df.isnull().sum() > 0])
    print("\nDUPLICATES:", df.duplicated().sum())
    print("\nNUMERIC SUMMARY:\n", df.describe())
    print("\nUNIQUE COUNTS (categorical):\n", 
          df.select_dtypes('object').nunique())
    print("=" * 60)
```

---

## Step 1: Understand the Data

```python
df = pd.read_csv('data.csv')

# Basic info
print(df.shape)         # Rows × Columns
print(df.dtypes)        # Data types
print(df.head(10))      # First rows
print(df.info())        # Types + null counts

# What does each column mean?
# - Read the data dictionary if available
# - Check unique values for categoricals
for col in df.select_dtypes('object').columns:
    print(f"{col}: {df[col].nunique()} unique values")
    print(df[col].value_counts().head(10))
    print()
```

---

## Step 2: Handle Missing Values

```python
# Find missing values
missing = df.isnull().sum()
missing_pct = (missing / len(df) * 100).round(2)
missing_df = pd.DataFrame({'Missing': missing, 'Pct': missing_pct})
print(missing_df[missing_df['Missing'] > 0].sort_values('Pct', ascending=False))

# Visualize
plt.figure(figsize=(10, 6))
sns.heatmap(df.isnull(), yticklabels=False, cbar=False, cmap='viridis')
plt.title('Missing Values Heatmap')
plt.show()

# Decisions:
# < 5% missing → drop rows or impute with mean/median/mode
# 5-20% missing → impute carefully based on business logic
# > 20% missing → consider dropping the column

# Imputation options
df['age'].fillna(df['age'].median(), inplace=True)  # Numeric: use median
df['city'].fillna(df['city'].mode()[0], inplace=True)  # Categorical: use mode
df['salary'].fillna(df.groupby('job_title')['salary'].transform('median'), inplace=True)  # Group-wise
```

---

## Step 3: Univariate Analysis

```python
numeric_cols = df.select_dtypes(include=['number']).columns
categorical_cols = df.select_dtypes(include=['object']).columns

# Numeric distributions
fig, axes = plt.subplots(2, len(numeric_cols), figsize=(5*len(numeric_cols), 10))
for i, col in enumerate(numeric_cols):
    # Histogram
    df[col].hist(bins=30, ax=axes[0, i])
    axes[0, i].set_title(f'{col} Distribution')
    
    # Box plot (shows outliers)
    df.boxplot(column=col, ax=axes[1, i])
    axes[1, i].set_title(f'{col} Boxplot')

plt.tight_layout()
plt.show()

# Statistical summary for each numeric column
for col in numeric_cols:
    skew = df[col].skew()
    kurt = df[col].kurtosis()
    print(f"{col}: Mean={df[col].mean():.2f}, Median={df[col].median():.2f}, "
          f"Skew={skew:.2f}, Kurt={kurt:.2f}")
```

---

## Step 4: Bivariate Analysis

```python
# Correlation matrix
corr_matrix = df[numeric_cols].corr()
plt.figure(figsize=(12, 8))
sns.heatmap(corr_matrix, annot=True, fmt='.2f', cmap='coolwarm', 
            center=0, square=True)
plt.title('Correlation Matrix')
plt.show()

# Strong correlations
threshold = 0.7
high_corr = []
for i in range(len(corr_matrix.columns)):
    for j in range(i):
        if abs(corr_matrix.iloc[i, j]) > threshold:
            high_corr.append({
                'col1': corr_matrix.columns[i],
                'col2': corr_matrix.columns[j],
                'correlation': corr_matrix.iloc[i, j]
            })
print(pd.DataFrame(high_corr).sort_values('correlation', ascending=False))

# Scatter plots for important pairs
sns.scatterplot(data=df, x='feature1', y='target', hue='category')
plt.show()

# Categorical vs Numeric
for cat_col in categorical_cols:
    plt.figure(figsize=(12, 5))
    sns.boxplot(data=df, x=cat_col, y='target')
    plt.xticks(rotation=45)
    plt.title(f'{cat_col} vs Target')
    plt.tight_layout()
    plt.show()
```

---

## Step 5: Outlier Detection

```python
# IQR Method
def detect_outliers_iqr(df, col):
    Q1 = df[col].quantile(0.25)
    Q3 = df[col].quantile(0.75)
    IQR = Q3 - Q1
    lower = Q1 - 1.5 * IQR
    upper = Q3 + 1.5 * IQR
    outliers = df[(df[col] < lower) | (df[col] > upper)]
    print(f"{col}: {len(outliers)} outliers ({len(outliers)/len(df)*100:.1f}%)")
    return outliers

for col in numeric_cols:
    detect_outliers_iqr(df, col)

# Z-Score Method
from scipy import stats
z_scores = np.abs(stats.zscore(df[numeric_cols]))
outlier_rows = (z_scores > 3).any(axis=1)
print(f"Rows with outliers (z > 3): {outlier_rows.sum()}")
```

---

## Step 6: Document Findings

After EDA, write down:

1. **Data quality issues found** — missing values, duplicates, wrong types
2. **Key distributions** — skewed columns, unusual patterns
3. **Strong correlations** — what predicts the target?
4. **Business anomalies** — anything that doesn't make sense
5. **Features to engineer** — new columns worth creating

---

## 🔗 Related
- [[python/pandas-essentials|Pandas]] — The tool for EDA
- [[python/data-cleaning|Data Cleaning]] — Fix issues found in EDA
- [[statistics/descriptive-stats|Descriptive Statistics]] — The math behind EDA
- [[python/matplotlib-seaborn|Visualization]] — Charts for EDA
