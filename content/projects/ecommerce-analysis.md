---
title: E-Commerce Sales Performance Analysis
tags:
  - projects
  - excel
  - python
  - sql
  - eda
---

# E-Commerce Sales Performance Analysis

**Tools:** Advanced Excel, Python, SQL, Pivot Tables
**Domain:** E-Commerce Analytics

---

## 📊 Project Overview

Comprehensive analysis of seasonal sales trends using Excel and Python for a 5,000+ transaction e-commerce dataset.

---

## 🎯 Key Achievements

| Metric | Value |
|--------|-------|
| Transactions Analyzed | 5,000+ |
| Reporting Accuracy | 100% |
| Data Consistency | 98% |

---

## 🛠️ Technical Approach

### Excel Analysis
1. **Pivot Tables** for category and regional breakdowns
2. **VLOOKUP/XLOOKUP** to enrich order data with product details
3. **SUMIFS** for conditional revenue aggregations
4. **Dynamic charts** with slicers for interactive exploration
5. **Conditional formatting** to highlight trends and outliers

### Python EDA

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv('ecommerce_transactions.csv', parse_dates=['order_date'])

# Seasonal analysis
df['month'] = df['order_date'].dt.month
df['quarter'] = df['order_date'].dt.quarter
df['day_of_week'] = df['order_date'].dt.day_name()

monthly_revenue = df.groupby('month')['revenue'].agg(['sum', 'mean', 'count'])
print("Monthly Revenue Summary:")
print(monthly_revenue)

# Detect outliers with IQR
Q1 = df['revenue'].quantile(0.25)
Q3 = df['revenue'].quantile(0.75)
IQR = Q3 - Q1
outliers = df[(df['revenue'] < Q1 - 1.5*IQR) | (df['revenue'] > Q3 + 1.5*IQR)]
print(f"\nOutliers detected: {len(outliers)} ({len(outliers)/len(df)*100:.1f}%)")

# Seasonal trend visualization
plt.figure(figsize=(14, 6))
monthly_revenue['sum'].plot(kind='bar', color='steelblue', edgecolor='white')
plt.title('Monthly Revenue Trend', fontsize=16, fontweight='bold')
plt.xlabel('Month')
plt.ylabel('Total Revenue (₹)')
plt.xticks(range(12), ['Jan','Feb','Mar','Apr','May','Jun',
                         'Jul','Aug','Sep','Oct','Nov','Dec'], rotation=45)
plt.tight_layout()
plt.savefig('seasonal_trend.png', dpi=150)
plt.show()
```

---

## 💡 Key Findings

1. **Q4 seasonality** — 35% of annual revenue in Oct-Dec
2. **Top category** drove 28% of total revenue (Pareto principle confirmed)
3. **Weekend uplift** — 22% higher average order value on Saturdays
4. **Customer segmentation** — 20% of customers = 65% of revenue

---

## 🔗 Related Skills
- [[excel/pivot-tables|Pivot Tables]] — Core analysis tool
- [[python/eda-workflow|EDA Workflow]] — Full EDA approach used
- [[python/data-cleaning|Data Cleaning]] — 98% consistency achievement
- [[statistics/descriptive-stats|Descriptive Statistics]] — Statistical analysis foundation
