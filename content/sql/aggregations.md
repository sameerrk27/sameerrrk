---
title: SQL Aggregations & GROUP BY
tags:
  - sql
  - aggregations
  - groupby
---

# SQL Aggregations & GROUP BY

Aggregation = summarizing many rows into fewer rows using functions like `COUNT`, `SUM`, `AVG`.

---

## 🔢 Core Aggregate Functions

```sql
SELECT
    COUNT(*)              AS total_rows,
    COUNT(column)         AS non_null_count,
    COUNT(DISTINCT col)   AS unique_values,
    SUM(amount)           AS total_amount,
    AVG(amount)           AS average_amount,
    MIN(amount)           AS minimum,
    MAX(amount)           AS maximum,
    STDDEV(amount)        AS std_deviation,
    VARIANCE(amount)      AS variance
FROM orders;
```

---

## GROUP BY

```sql
-- Sales by category and month
SELECT 
    category,
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    COUNT(*) AS order_count,
    SUM(revenue) AS total_revenue,
    AVG(revenue) AS avg_order_value,
    MAX(revenue) AS largest_order
FROM orders
GROUP BY category, DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month, total_revenue DESC;
```

---

## HAVING — Filter After Grouping

```sql
-- Categories with more than 100 orders AND avg order > $50
SELECT 
    category,
    COUNT(*) AS order_count,
    AVG(order_amount) AS avg_amount
FROM orders
GROUP BY category
HAVING COUNT(*) > 100
   AND AVG(order_amount) > 50
ORDER BY order_count DESC;
```

> `WHERE` filters rows **before** grouping. `HAVING` filters **after** grouping.

---

## GROUP BY ROLLUP — Subtotals

```sql
SELECT 
    COALESCE(region, 'TOTAL') AS region,
    COALESCE(category, 'ALL CATEGORIES') AS category,
    SUM(sales) AS total_sales
FROM sales_data
GROUP BY ROLLUP(region, category)
ORDER BY region, category;
```

---

## Conditional Aggregation (CASE WHEN inside SUM)

```sql
-- Pivot-style aggregation
SELECT 
    product_category,
    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_orders,
    SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_orders,
    SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending_orders,
    SUM(CASE WHEN status = 'completed' THEN revenue ELSE 0 END) AS completed_revenue
FROM orders
GROUP BY product_category;
```

---

## STRING_AGG / GROUP_CONCAT

```sql
-- Combine multiple values into one string per group
SELECT 
    customer_id,
    GROUP_CONCAT(product_name ORDER BY order_date SEPARATOR ', ') AS products_purchased
FROM order_items
GROUP BY customer_id;

-- PostgreSQL equivalent
SELECT 
    customer_id,
    STRING_AGG(product_name, ', ' ORDER BY order_date) AS products_purchased
FROM order_items
GROUP BY customer_id;
```

---

## 🔗 Related
- [[sql/window-functions|Window Functions]] — Aggregations without GROUP BY collapsing
- [[statistics/descriptive-stats|Descriptive Statistics]] — Concepts behind AVG, STDDEV, etc.
