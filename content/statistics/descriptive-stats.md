---
title: Descriptive Statistics
tags:
  - statistics
  - descriptive-stats
  - distributions
---

# Descriptive Statistics

Descriptive statistics **summarize and describe** a dataset. Before any analysis, you must understand your data.

---

## 📏 Measures of Center

| Measure | Formula | When to Use |
|---------|---------|-------------|
| Mean | Σx / n | Symmetric distributions, no outliers |
| Median | Middle value | Skewed data, has outliers |
| Mode | Most frequent value | Categorical data |

```python
import numpy as np
from scipy import stats

data = [23, 45, 12, 67, 34, 89, 21, 56, 78, 43, 1000]  # Note the outlier

mean = np.mean(data)             # Pulled by outlier → 133.5
median = np.median(data)         # Robust to outlier → 45.0
mode = stats.mode(data).mode    # Most frequent value

print(f"Mean: {mean:.1f}")
print(f"Median: {median:.1f}")
print(f"Mean vs Median difference indicates skew!")
```

> **Rule of thumb:** If mean >> median, the distribution is **right-skewed** (positive skew). If mean << median, it's **left-skewed** (negative skew).

---

## 📐 Measures of Spread

```python
data = np.array([23, 45, 12, 67, 34, 89, 21, 56, 78, 43])

# Range
data_range = data.max() - data.min()   # 89 - 12 = 77

# Variance — average squared deviation from mean
variance = np.var(data)            # Population variance
variance_s = np.var(data, ddof=1)  # Sample variance (use ddof=1 for samples!)

# Standard Deviation — sqrt of variance; in original units
std = np.std(data, ddof=1)

# IQR — Interquartile Range — spread of middle 50%
Q1 = np.percentile(data, 25)
Q3 = np.percentile(data, 75)
IQR = Q3 - Q1

# Summary
print(f"Range: {data_range}")
print(f"Std Dev: {std:.2f}")
print(f"IQR: {IQR:.2f}")
```

### When to use:
- **Std Dev** — when data is roughly normal (symmetric)
- **IQR** — when data has outliers or is skewed

---

## 📊 Shape of Distributions

### Skewness
```python
from scipy.stats import skew, kurtosis

sk = skew(data)
# sk > 0: right-skewed (long right tail) — income, house prices
# sk < 0: left-skewed (long left tail) — test scores near max
# sk ≈ 0: symmetric

# Interpreting:
# |skew| < 0.5: fairly symmetric
# 0.5 ≤ |skew| < 1: moderately skewed
# |skew| ≥ 1: highly skewed
```

### Kurtosis
```python
kurt = kurtosis(data)
# kurt > 0: heavy tails (leptokurtic) — more outliers than normal
# kurt < 0: light tails (platykurtic) — fewer outliers
# kurt ≈ 0: normal distribution (mesokurtic)
```

### Visualizing Distributions
```python
import matplotlib.pyplot as plt
import seaborn as sns

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# Histogram
axes[0].hist(data, bins=20, edgecolor='white')
axes[0].axvline(np.mean(data), color='red', label=f'Mean={np.mean(data):.1f}')
axes[0].axvline(np.median(data), color='blue', label=f'Median={np.median(data):.1f}')
axes[0].legend()
axes[0].set_title('Histogram')

# Box plot
axes[1].boxplot(data)
axes[1].set_title('Box Plot')

# QQ plot (checks if normal)
from scipy.stats import probplot
probplot(data, plot=axes[2])
axes[2].set_title('Q-Q Plot (Normal Check)')

plt.tight_layout()
plt.show()
```

---

## 📦 Five-Number Summary

```python
summary = {
    'Min': np.min(data),
    'Q1 (25th pct)': np.percentile(data, 25),
    'Median (50th pct)': np.median(data),
    'Q3 (75th pct)': np.percentile(data, 75),
    'Max': np.max(data)
}
for k, v in summary.items():
    print(f"{k}: {v:.2f}")
```

---

## 🔗 Related
- [[statistics/hypothesis-testing|Hypothesis Testing]] — Going beyond description to inference
- [[python/eda-workflow|EDA Workflow]] — Descriptive stats in practice
- [[sql/aggregations|SQL Aggregations]] — Descriptive stats with SQL
