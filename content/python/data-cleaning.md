---
title: Data Cleaning in Python
tags:
  - python
  - data-cleaning
  - pandas
---

# Data Cleaning in Python

> "Data scientists spend 80% of their time cleaning data and 20% complaining about cleaning data." 

Data cleaning is the most important (and most tedious) step in any data project.

---

## 🧹 Data Cleaning Checklist

- [ ] Handle missing values
- [ ] Remove or fix duplicates
- [ ] Fix data types
- [ ] Standardize formats (dates, phone numbers, names)
- [ ] Handle outliers
- [ ] Fix inconsistent categories
- [ ] Deal with special characters
- [ ] Validate business rules

---

## Missing Values

```python
# Check
df.isnull().sum()
df.isnull().sum() / len(df) * 100   # As percentage

# Drop
df.dropna()                                    # Drop any row with null
df.dropna(subset=['critical_column'])          # Drop only if key col is null
df.dropna(thresh=5)                            # Keep rows with at least 5 non-nulls

# Fill
df['col'].fillna(0)                            # Fill with constant
df['col'].fillna(df['col'].mean())             # Fill with mean
df['col'].fillna(df['col'].median())           # Fill with median (better for skewed data)
df['col'].fillna(df['col'].mode()[0])          # Fill with mode (categoricals)
df['col'].fillna(method='ffill')               # Forward fill (time series)
df['col'].fillna(method='bfill')               # Backward fill (time series)

# Group-wise imputation (fill with group mean)
df['salary'] = df.groupby('department')['salary'].transform(
    lambda x: x.fillna(x.median())
)
```

---

## Duplicates

```python
# Check for duplicates
df.duplicated().sum()
df.duplicated(subset=['customer_id', 'order_date']).sum()  # Key duplicates

# View duplicates
df[df.duplicated(keep=False)]           # All duplicate rows
df[df.duplicated(keep='first')]         # Show only the later duplicates

# Remove duplicates
df.drop_duplicates(inplace=True)
df.drop_duplicates(subset=['email'], keep='first', inplace=True)  # Keep first occurrence
```

---

## Data Type Fixes

```python
# Convert types
df['date'] = pd.to_datetime(df['date'])
df['price'] = pd.to_numeric(df['price'], errors='coerce')  # 'coerce' turns errors to NaN
df['age'] = df['age'].astype(int)
df['category'] = df['category'].astype('category')

# Remove commas and convert to numeric
df['revenue'] = df['revenue'].str.replace(',', '').str.replace('$', '').astype(float)

# Boolean conversion
df['is_active'] = df['is_active'].map({'Yes': True, 'No': False, 'yes': True, 'no': False})
```

---

## Standardizing Strings

```python
# Casing
df['name'] = df['name'].str.strip()           # Remove whitespace
df['name'] = df['name'].str.lower()           # Lowercase
df['name'] = df['name'].str.title()           # Title Case
df['email'] = df['email'].str.upper()         # UPPERCASE

# Remove special characters
import re
df['phone'] = df['phone'].str.replace(r'[^0-9]', '', regex=True)
df['name'] = df['name'].str.replace(r'[^a-zA-Z\s]', '', regex=True)

# Standardize categories
df['gender'].replace({
    'male': 'Male', 'M': 'Male', 'm': 'Male',
    'female': 'Female', 'F': 'Female', 'f': 'Female'
}, inplace=True)

# Fix common typos with fuzzy matching
# pip install fuzzywuzzy
from fuzzywuzzy import process
cities = ['Mumbai', 'Delhi', 'Pune', 'Bangalore']
df['city'] = df['city'].apply(lambda x: process.extractOne(x, cities)[0])
```

---

## Handling Outliers

```python
# IQR capping (Winsorization)
def cap_outliers_iqr(series, factor=1.5):
    Q1 = series.quantile(0.25)
    Q3 = series.quantile(0.75)
    IQR = Q3 - Q1
    lower = Q1 - factor * IQR
    upper = Q3 + factor * IQR
    return series.clip(lower=lower, upper=upper)

df['salary'] = cap_outliers_iqr(df['salary'])

# Percentile capping
df['revenue'] = df['revenue'].clip(
    lower=df['revenue'].quantile(0.01),
    upper=df['revenue'].quantile(0.99)
)
```

---

## Validating Business Rules

```python
# Age should be positive and reasonable
invalid_age = df[(df['age'] < 0) | (df['age'] > 120)]
print(f"Invalid ages: {len(invalid_age)} rows")

# Price should be positive
df = df[df['price'] > 0]

# Date should be in valid range
df = df[df['order_date'] >= '2020-01-01']

# Email format validation
email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
invalid_emails = df[~df['email'].str.match(email_pattern)]
```

---

## 🔗 Related
- [[python/eda-workflow|EDA Workflow]] — Identify what needs cleaning
- [[python/pandas-essentials|Pandas]] — The tools for cleaning
- [[statistics/descriptive-stats|Descriptive Stats]] — Understand distributions before cleaning
