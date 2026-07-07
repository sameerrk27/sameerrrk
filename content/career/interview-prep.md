---
title: Data Analyst Interview Prep
tags:
  - career
  - interview
  - sql-interview
  - python-interview
---

# Data Analyst Interview Prep

Data analyst interviews typically have 4 components: SQL, Python/Excel, Case Study, and Behavioral.

---

## 🗄️ SQL Interview Questions

### Commonly Asked

```sql
-- 1. Nth highest salary
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET (N-1);  -- For Nth highest

-- Or using window functions:
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) t WHERE rnk = N;

-- 2. Find duplicate records
SELECT email, COUNT(*) AS count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

-- 3. Employees who earn more than their manager
SELECT e.name AS employee, m.name AS manager, e.salary
FROM employees e
JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary;

-- 4. Running total
SELECT 
    order_date,
    amount,
    SUM(amount) OVER (ORDER BY order_date) AS running_total
FROM orders;

-- 5. Month-over-month growth
SELECT 
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) AS prev_month,
    (revenue - LAG(revenue) OVER (ORDER BY month)) / LAG(revenue) OVER (ORDER BY month) * 100 AS growth_pct
FROM monthly_revenue;

-- 6. Customers with no orders
SELECT c.customer_id, c.name
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;

-- 7. Top 3 products per category
WITH ranked AS (
    SELECT category, product, sales,
           ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) AS rn
    FROM product_sales
)
SELECT * FROM ranked WHERE rn <= 3;
```

---

## 🐍 Python Interview Questions

```python
# 1. Find duplicates in a DataFrame
duplicates = df[df.duplicated(keep=False)]
df.drop_duplicates(inplace=True)

# 2. Merge two DataFrames on a common key
merged = pd.merge(df1, df2, on='customer_id', how='left')

# 3. Calculate rolling average
df['rolling_7day'] = df['sales'].rolling(window=7).mean()

# 4. Pivot a DataFrame (wide format)
pivot = df.pivot_table(index='date', columns='category', values='sales', aggfunc='sum')

# 5. Find outliers using IQR
Q1 = df['salary'].quantile(0.25)
Q3 = df['salary'].quantile(0.75)
IQR = Q3 - Q1
outliers = df[(df['salary'] < Q1 - 1.5 * IQR) | (df['salary'] > Q3 + 1.5 * IQR)]

# 6. Group by and aggregate
result = df.groupby('region').agg(
    total_revenue=('revenue', 'sum'),
    avg_order=('order_amount', 'mean'),
    order_count=('order_id', 'count')
).reset_index()
```

---

## 📊 Case Study Framework

When given a business case study:

1. **Clarify the question** — "What does success look like? What time period?"
2. **Structure your approach** — "I'll start with X, then Y, then Z"
3. **Identify data needs** — "I'd need data on A, B, C"
4. **State assumptions** — "I'm assuming retention means active in last 30 days"
5. **Analyze systematically** — Don't jump to conclusions
6. **Communicate findings** — Lead with the insight, then the evidence

### Common Case Types:
- Product metrics drop → identify cause
- A/B test design and analysis
- Customer churn analysis
- Retention funnel breakdown
- Recommendation for business decision

---

## 🗣️ Behavioral Questions (STAR Method)

**STAR = Situation, Task, Action, Result**

Common questions:
1. "Tell me about a time you found an insight that surprised stakeholders"
2. "Describe a difficult analysis you worked through"
3. "How do you handle conflicting data from different sources?"
4. "Tell me about a project where your analysis drove a business decision"
5. "How do you explain technical findings to non-technical stakeholders?"

---

## 🔗 Related
- [[career/portfolio-building|Portfolio Building]] — Prepare before interviewing
- [[career/resume-tips|Resume Tips]] — Get the interview first
- [[resources/index|Resources]] — Practice platforms
