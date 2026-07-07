---
title: Correlation & Regression
tags:
  - statistics
  - correlation
  - regression
  - linear-regression
---

# Correlation & Regression

Understanding **relationships between variables** is one of the most fundamental tasks in data analysis.

---

## 📊 Correlation

Correlation measures the **strength and direction** of a linear relationship between two variables.

```python
import numpy as np
import pandas as pd
from scipy import stats
import seaborn as sns
import matplotlib.pyplot as plt

# Pearson correlation (linear relationship, continuous data)
r, p_value = stats.pearsonr(df['marketing_spend'], df['revenue'])
print(f"Pearson r: {r:.4f}, p-value: {p_value:.4f}")

# Spearman correlation (ranked; works for non-linear, ordinal data)
rho, p_value = stats.spearmanr(df['rank'], df['score'])
print(f"Spearman rho: {rho:.4f}")

# Correlation matrix
corr_matrix = df[['col1', 'col2', 'col3']].corr()
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', center=0)
plt.show()
```

### Interpreting Correlation

| r value | Strength |
|---------|---------|
| 0.9 to 1.0 | Very strong positive |
| 0.7 to 0.9 | Strong positive |
| 0.5 to 0.7 | Moderate positive |
| 0.3 to 0.5 | Weak positive |
| 0.0 to 0.3 | Very weak / none |

> ⚠️ **Correlation ≠ Causation!** Two variables can be correlated without one causing the other.
> Classic example: Ice cream sales and drowning deaths are correlated — both increase in summer!

---

## 📈 Simple Linear Regression

```python
from sklearn.linear_model import LinearRegression
import numpy as np

# Fit model
X = df[['marketing_spend']].values
y = df['revenue'].values

model = LinearRegression()
model.fit(X, y)

slope = model.coef_[0]
intercept = model.intercept_
r_squared = model.score(X, y)

print(f"Equation: Revenue = {slope:.2f} × Marketing_Spend + {intercept:.2f}")
print(f"R² = {r_squared:.4f}")
print(f"Interpretation: For every ₹1 increase in marketing spend, revenue increases by ₹{slope:.2f}")

# Using scipy for more stats
slope, intercept, r_value, p_value, std_err = stats.linregress(
    df['marketing_spend'], df['revenue']
)
print(f"\nslope: {slope:.4f}")
print(f"p-value: {p_value:.6f}")
print(f"95% CI for slope: [{slope - 1.96*std_err:.4f}, {slope + 1.96*std_err:.4f}]")
```

---

## 🔗 Related
- [[statistics/hypothesis-testing|Hypothesis Testing]] — Testing if correlation is significant
- [[machine-learning/regression|ML Regression]] — Extend to multiple features
- [[sql/sql-for-analytics|SQL Analytics]] — Correlation analysis in SQL
