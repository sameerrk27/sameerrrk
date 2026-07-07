---
title: Data Visualization with Matplotlib & Seaborn
tags:
  - python
  - visualization
  - matplotlib
  - seaborn
---

# Data Visualization with Matplotlib & Seaborn

Good visualization tells a story. Bad visualization confuses everyone.

---

## 🎨 Setup

```python
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

# Style settings
plt.style.use('seaborn-v0_8-whitegrid')
sns.set_palette('husl')
plt.rcParams['figure.figsize'] = (12, 6)
plt.rcParams['font.size'] = 12
```

---

## 📊 Chart Type Guide

| Question You're Answering | Chart Type |
|--------------------------|------------|
| Distribution of one variable | Histogram, Box plot, Violin |
| Compare categories | Bar chart |
| Relationship between two numerics | Scatter plot |
| Trend over time | Line chart |
| Part-to-whole | Pie chart, Stacked bar |
| Correlation matrix | Heatmap |
| Distribution by category | Box plot, Violin |

---

## Bar Charts

```python
# Simple bar chart
fig, ax = plt.subplots(figsize=(10, 6))
ax.bar(df['category'], df['sales'], color='steelblue', edgecolor='white')
ax.set_title('Sales by Category', fontsize=16, fontweight='bold')
ax.set_xlabel('Category')
ax.set_ylabel('Total Sales (₹)')
ax.tick_params(axis='x', rotation=45)
plt.tight_layout()
plt.show()

# Seaborn barplot (with confidence intervals)
plt.figure(figsize=(12, 6))
sns.barplot(data=df, x='category', y='sales', hue='region', 
            palette='muted', errorbar=None)
plt.title('Sales by Category and Region')
plt.xticks(rotation=45)
plt.legend(title='Region', bbox_to_anchor=(1.05, 1))
plt.tight_layout()
plt.show()
```

---

## Line Charts (Time Series)

```python
fig, axes = plt.subplots(2, 1, figsize=(14, 10))

# Simple line
axes[0].plot(df['date'], df['revenue'], color='#0ea5e9', linewidth=2)
axes[0].fill_between(df['date'], df['revenue'], alpha=0.1, color='#0ea5e9')
axes[0].set_title('Monthly Revenue Trend', fontsize=14, fontweight='bold')
axes[0].xaxis.set_major_formatter(plt.matplotlib.dates.DateFormatter('%b %Y'))

# Multiple lines
for region in df['region'].unique():
    data = df[df['region'] == region]
    axes[1].plot(data['date'], data['revenue'], label=region, linewidth=2)

axes[1].set_title('Revenue by Region', fontsize=14)
axes[1].legend()

plt.tight_layout()
plt.show()
```

---

## Histograms & KDE

```python
fig, axes = plt.subplots(1, 2, figsize=(14, 6))

# Matplotlib histogram
axes[0].hist(df['salary'], bins=30, color='steelblue', edgecolor='white', alpha=0.7)
axes[0].set_title('Salary Distribution')
axes[0].axvline(df['salary'].mean(), color='red', linestyle='--', label=f"Mean: {df['salary'].mean():.0f}")
axes[0].axvline(df['salary'].median(), color='green', linestyle='--', label=f"Median: {df['salary'].median():.0f}")
axes[0].legend()

# Seaborn KDE plot
sns.histplot(data=df, x='salary', hue='department', kde=True, 
             multiple='stack', palette='husl', ax=axes[1])
axes[1].set_title('Salary by Department')

plt.tight_layout()
plt.show()
```

---

## Scatter Plots

```python
plt.figure(figsize=(10, 7))
scatter = plt.scatter(
    df['marketing_spend'],
    df['revenue'],
    c=df['profit_margin'],     # Color by a 3rd variable
    s=df['order_count'] / 10, # Size by a 4th variable
    cmap='viridis',
    alpha=0.7,
    edgecolors='white',
    linewidth=0.5
)
plt.colorbar(scatter, label='Profit Margin (%)')
plt.xlabel('Marketing Spend (₹)')
plt.ylabel('Revenue (₹)')
plt.title('Revenue vs. Marketing Spend')

# Add trend line
z = np.polyfit(df['marketing_spend'], df['revenue'], 1)
p = np.poly1d(z)
plt.plot(sorted(df['marketing_spend']), p(sorted(df['marketing_spend'])), 
         "r--", alpha=0.8, label='Trend')
plt.legend()
plt.show()
```

---

## Correlation Heatmap

```python
corr = df[numeric_cols].corr()

# Mask upper triangle
mask = np.triu(np.ones_like(corr, dtype=bool))

plt.figure(figsize=(12, 10))
sns.heatmap(
    corr,
    mask=mask,
    annot=True,
    fmt='.2f',
    cmap='RdYlGn',
    center=0,
    square=True,
    linewidths=0.5,
    cbar_kws={"shrink": .8}
)
plt.title('Correlation Matrix', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.show()
```

---

## Dashboard Layout

```python
fig = plt.figure(figsize=(20, 12))
fig.suptitle('Sales Dashboard — Q1 2024', fontsize=20, fontweight='bold', y=1.02)

# Create grid layout
gs = fig.add_gridspec(2, 3, hspace=0.4, wspace=0.3)

ax1 = fig.add_subplot(gs[0, :2])   # Wide top-left
ax2 = fig.add_subplot(gs[0, 2])    # Top-right
ax3 = fig.add_subplot(gs[1, 0])    # Bottom-left
ax4 = fig.add_subplot(gs[1, 1])    # Bottom-middle
ax5 = fig.add_subplot(gs[1, 2])    # Bottom-right

# Plot in each subplot...
# ax1: Revenue trend
# ax2: Category breakdown
# etc.

plt.savefig('dashboard.png', dpi=150, bbox_inches='tight')
plt.show()
```

---

## 🔗 Related
- [[python/eda-workflow|EDA Workflow]] — When to use which charts
- [[power-bi/index|Power BI]] — Interactive dashboards for business users
