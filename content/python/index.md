---
title: Python for Data Analysis
tags:
  - python
  - data-analysis
---

# Python for Data Analysis

Python is the **lingua franca of data science**. With libraries like Pandas and NumPy, it rivals SQL for data wrangling and surpasses it for analysis and modeling.

---

## 📚 Topics in This Section

- [[python/pandas-essentials|Pandas Essentials]] — DataFrames, filtering, groupby, merging
- [[python/numpy-basics|NumPy Basics]] — Arrays, vectorized operations, math functions
- [[python/eda-workflow|EDA Workflow]] — Systematic approach to exploratory data analysis
- [[python/data-cleaning|Data Cleaning]] — Handling missing values, duplicates, outliers
- [[python/matplotlib-seaborn|Visualization]] — Matplotlib & Seaborn charts

---

## 🚀 Quick Setup

```python
# Essential imports for data analysis
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler

# Display settings
pd.set_option('display.max_columns', None)
pd.set_option('display.float_format', lambda x: f'{x:.2f}')
plt.style.use('seaborn-v0_8')
```

---

## 🔗 Related
- [[sql/index|SQL]] — SQL and Pandas solve similar problems, know both
- [[machine-learning/index|Machine Learning]] — Python is the primary ML language
- [[statistics/index|Statistics]] — The math behind your Python analysis
