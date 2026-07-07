---
title: SQL Window Functions
tags:
  - sql
  - window-functions
  - advanced
---

# SQL Window Functions

Window functions perform calculations **across a set of rows related to the current row** — without collapsing rows like GROUP BY does.

> Window functions are what separate beginner SQL from advanced analytical SQL.

---

## 🪟 Syntax

```sql
function_name(column) OVER (
    [PARTITION BY column1, column2]
    [ORDER BY column3]
    [ROWS/RANGE BETWEEN ...]
)
```

---

## 📊 Ranking Functions

### ROW_NUMBER — Unique rank, no ties
```sql
SELECT 
    employee_name,
    department,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num
FROM employees;
```

### RANK — Ties get same rank, gaps after ties
```sql
SELECT 
    product_name,
    sales,
    RANK() OVER (ORDER BY sales DESC) AS sales_rank
FROM products;
-- If two products tie at rank 2, next rank is 4 (skips 3)
```

### DENSE_RANK — Ties get same rank, NO gaps
```sql
SELECT 
    product_name,
    sales,
    DENSE_RANK() OVER (ORDER BY sales DESC) AS dense_rank
FROM products;
-- If two products tie at rank 2, next rank is 3 (no skip)
```

### NTILE — Divide into N buckets
```sql
SELECT 
    customer_id,
    total_spend,
    NTILE(4) OVER (ORDER BY total_spend DESC) AS spend_quartile
    -- 1 = top 25%, 4 = bottom 25%
FROM customers;
```

---

## 📈 Aggregate Window Functions

### Running Total (Cumulative Sum)
```sql
SELECT 
    order_date,
    daily_revenue,
    SUM(daily_revenue) OVER (ORDER BY order_date) AS running_total
FROM daily_sales;
```

### Moving Average (7-day)
```sql
SELECT 
    order_date,
    revenue,
    AVG(revenue) OVER (
        ORDER BY order_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_avg_7day
FROM daily_sales;
```

### Percent of Total
```sql
SELECT 
    category,
    sales,
    sales / SUM(sales) OVER () * 100 AS pct_of_total
FROM category_sales;
```

### Percent of Group Total
```sql
SELECT 
    region,
    category,
    sales,
    sales / SUM(sales) OVER (PARTITION BY region) * 100 AS pct_of_region
FROM regional_sales;
```

---

## ⏮️⏭️ LAG and LEAD — Compare to Previous/Next Row

### Period-over-Period Growth
```sql
SELECT 
    month,
    revenue,
    LAG(revenue, 1) OVER (ORDER BY month) AS prev_month_revenue,
    revenue - LAG(revenue, 1) OVER (ORDER BY month) AS mom_change,
    (revenue - LAG(revenue, 1) OVER (ORDER BY month)) 
        / LAG(revenue, 1) OVER (ORDER BY month) * 100 AS mom_pct_change
FROM monthly_revenue;
```

### Year-over-Year
```sql
SELECT 
    month,
    revenue,
    LAG(revenue, 12) OVER (ORDER BY month) AS same_month_last_year,
    revenue / LAG(revenue, 12) OVER (ORDER BY month) - 1 AS yoy_growth
FROM monthly_revenue;
```

---

## 🏆 FIRST_VALUE and LAST_VALUE

```sql
SELECT 
    employee_name,
    department,
    salary,
    FIRST_VALUE(salary) OVER (PARTITION BY department ORDER BY salary DESC) AS max_salary_in_dept,
    LAST_VALUE(salary) OVER (
        PARTITION BY department 
        ORDER BY salary DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS min_salary_in_dept
FROM employees;
```

---

## 💡 Real-World Use Cases

| Use Case | Function |
|----------|----------|
| Top N per group | ROW_NUMBER() + WHERE row_num <= N |
| Running balance | SUM() OVER ORDER BY |
| Customer cohort rank | DENSE_RANK() PARTITION BY cohort |
| Detect outliers | compare to LAG/LEAD |
| Percentile analysis | NTILE(100) |
| MoM growth | LAG() |

---

## 🔗 Related
- [[sql/ctes|CTEs]] — Often combined with window functions
- [[sql/sql-for-analytics|Analytics Patterns]] — Real patterns using window functions
- [[statistics/descriptive-stats|Descriptive Stats]] — Statistical concepts behind aggregations
