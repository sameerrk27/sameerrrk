---
title: Pandas Essentials
tags:
  - python
  - pandas
  - dataframes
---

# Pandas Essentials

Pandas is the **most important library for data analysis in Python**. It's essentially SQL meets Excel in Python.

---

## 📥 Loading Data

```python
import pandas as pd

# CSV
df = pd.read_csv('data.csv')
df = pd.read_csv('data.csv', parse_dates=['date_col'], index_col='id')

# Excel
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# SQL
import sqlalchemy
engine = sqlalchemy.create_engine('mysql://user:pass@host/db')
df = pd.read_sql('SELECT * FROM orders', engine)

# JSON
df = pd.read_json('data.json')
```

---

## 🔍 First Look at Data

```python
df.shape           # (rows, columns)
df.head(10)        # First 10 rows
df.tail(5)         # Last 5 rows
df.info()          # Data types, null counts
df.describe()      # Statistical summary
df.dtypes          # Column data types
df.columns.tolist() # List of column names
df.nunique()       # Unique values per column
df.isnull().sum()  # Missing values per column
```

---

## 🎯 Selecting Data

```python
# Single column (Series)
df['column_name']
df.column_name

# Multiple columns (DataFrame)
df[['col1', 'col2', 'col3']]

# Rows by position
df.iloc[0]          # First row
df.iloc[0:5]        # First 5 rows
df.iloc[0:5, 0:3]   # First 5 rows, first 3 columns

# Rows by label
df.loc[0]                          # Row with index label 0
df.loc[df['col'] > 100]            # Rows where condition is True
df.loc[0:5, ['col1', 'col2']]     # Rows 0-5, specific columns
```

---

## 🔎 Filtering

```python
# Single condition
df[df['age'] > 25]
df[df['city'] == 'Mumbai']

# Multiple conditions
df[(df['age'] > 25) & (df['city'] == 'Mumbai')]      # AND
df[(df['age'] > 60) | (df['age'] < 18)]               # OR
df[~(df['status'] == 'inactive')]                      # NOT

# String filtering
df[df['name'].str.contains('Khan', case=False)]
df[df['email'].str.endswith('@gmail.com')]
df[df['name'].str.startswith('S')]

# isin — filter by list of values
df[df['city'].isin(['Mumbai', 'Delhi', 'Pune'])]

# between — numeric range
df[df['salary'].between(30000, 80000)]

# query — SQL-like syntax
df.query("age > 25 and city == 'Mumbai'")
df.query("salary between 30000 and 80000")
```

---

## 🔄 Transformations

```python
# New column
df['full_name'] = df['first_name'] + ' ' + df['last_name']
df['age_group'] = pd.cut(df['age'], bins=[0, 18, 35, 60, 100], 
                          labels=['Child', 'Young Adult', 'Adult', 'Senior'])

# Apply function
df['name_upper'] = df['name'].apply(str.upper)
df['discounted_price'] = df['price'].apply(lambda x: x * 0.9 if x > 100 else x)

# Map — replace values
df['gender'] = df['gender'].map({'M': 'Male', 'F': 'Female'})

# Replace
df['status'].replace({'active': 'Active', 'inactive': 'Inactive'}, inplace=True)
```

---

## 📊 GroupBy — The SQL GROUP BY Equivalent

```python
# Basic groupby
df.groupby('category')['sales'].sum()
df.groupby('category')['sales'].agg(['sum', 'mean', 'count', 'max'])

# Multiple groupby columns
df.groupby(['region', 'category'])['revenue'].sum().reset_index()

# Named aggregations (pandas 0.25+)
result = df.groupby('category').agg(
    total_sales=('sales', 'sum'),
    avg_price=('price', 'mean'),
    order_count=('order_id', 'count'),
    max_sale=('sales', 'max')
).reset_index()

# Custom aggregation
df.groupby('store').agg(
    total=('revenue', 'sum'),
    top_product=('product', lambda x: x.value_counts().index[0])
)
```

---

## 🔗 Merging DataFrames (Joins)

```python
# INNER JOIN
merged = pd.merge(df1, df2, on='customer_id', how='inner')

# LEFT JOIN
merged = pd.merge(df1, df2, on='customer_id', how='left')

# Different column names
merged = pd.merge(df1, df2, left_on='cust_id', right_on='customer_id', how='left')

# Multiple keys
merged = pd.merge(df1, df2, on=['customer_id', 'product_id'], how='inner')

# Stack DataFrames vertically (UNION)
combined = pd.concat([df1, df2], ignore_index=True)
combined = pd.concat([df1, df2], ignore_index=True, sort=False)
```

---

## ⏰ Working with Dates

```python
# Convert to datetime
df['date'] = pd.to_datetime(df['date'])
df['date'] = pd.to_datetime(df['date'], format='%d/%m/%Y')

# Extract components
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day'] = df['date'].dt.day
df['day_of_week'] = df['date'].dt.day_name()
df['quarter'] = df['date'].dt.quarter

# Date arithmetic
df['days_since_purchase'] = (pd.Timestamp.now() - df['purchase_date']).dt.days
df['30_days_later'] = df['date'] + pd.Timedelta(days=30)

# Resample time series
monthly = df.set_index('date').resample('ME')['revenue'].sum()
weekly = df.set_index('date').resample('W')['visits'].mean()
```

---

## 💡 Performance Tips

```python
# Use vectorized operations — NEVER loop over rows
# BAD:
for i, row in df.iterrows():
    df.loc[i, 'discount'] = row['price'] * 0.1

# GOOD:
df['discount'] = df['price'] * 0.1

# Use categorical for string columns with few unique values
df['category'] = df['category'].astype('category')

# Read only needed columns from CSV
df = pd.read_csv('large_file.csv', usecols=['col1', 'col2', 'col3'])

# Use chunking for very large files
for chunk in pd.read_csv('huge_file.csv', chunksize=10000):
    process(chunk)
```

---

## 🔗 Related
- [[sql/index|SQL]] — Many Pandas operations mirror SQL
- [[python/data-cleaning|Data Cleaning]] — Using Pandas to handle messy data
- [[python/eda-workflow|EDA Workflow]] — Full analysis workflow using Pandas
