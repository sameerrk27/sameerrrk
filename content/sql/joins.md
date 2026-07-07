---
title: SQL Joins Deep Dive
tags:
  - sql
  - joins
---

# SQL Joins Deep Dive

Joins combine rows from two or more tables based on a related column.

---

## 📊 Visual Guide

```
Table A          Table B
┌──────┐         ┌──────┐
│ 1    │         │ 1    │
│ 2    │    ∩    │ 2    │
│ 3    │         │ 4    │
└──────┘         └──────┘

INNER JOIN → {1, 2}        (only matching)
LEFT JOIN  → {1, 2, 3}     (all of A + matches from B)
RIGHT JOIN → {1, 2, 4}     (matches from A + all of B)
FULL JOIN  → {1, 2, 3, 4}  (everything from both)
```

---

## INNER JOIN

Returns only rows where there's a match in **both** tables.

```sql
SELECT o.order_id, c.customer_name, o.amount
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id;
```

---

## LEFT JOIN (LEFT OUTER JOIN)

Returns **all rows from left table** + matching rows from right. NULL where no match.

```sql
-- All customers, even those with no orders
SELECT c.customer_name, COUNT(o.order_id) AS order_count
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_name;
```

### Find rows with NO match (anti-join pattern)
```sql
-- Customers who have NEVER ordered
SELECT c.customer_id, c.customer_name
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;
```

---

## RIGHT JOIN

Returns **all rows from right table** + matching from left. Less common — usually prefer LEFT JOIN.

```sql
SELECT c.customer_name, o.order_id
FROM orders o
RIGHT JOIN customers c ON o.customer_id = c.customer_id;
-- Same result as: SELECT c.customer_name, o.order_id FROM customers c LEFT JOIN orders o ...
```

---

## FULL OUTER JOIN

Returns all rows from **both tables**, with NULLs where no match.

```sql
SELECT 
    COALESCE(a.id, b.id) AS id,
    a.value AS a_value,
    b.value AS b_value
FROM table_a a
FULL OUTER JOIN table_b b ON a.id = b.id;
```

---

## CROSS JOIN

Returns the **Cartesian product** — every combination of rows.

```sql
-- Generate all size × color combinations
SELECT sizes.size_name, colors.color_name
FROM sizes
CROSS JOIN colors;
-- If sizes has 3 rows and colors has 4 rows → 12 rows
```

---

## SELF JOIN

Join a table to itself — useful for hierarchical or comparison data.

```sql
-- Find employees and their manager names (same table)
SELECT 
    e.employee_name,
    m.employee_name AS manager_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id;
```

---

## 🔢 Multiple Joins

```sql
SELECT 
    o.order_id,
    c.customer_name,
    p.product_name,
    oi.quantity,
    oi.unit_price,
    oi.quantity * oi.unit_price AS line_total
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
WHERE o.order_date >= '2024-01-01'
ORDER BY o.order_date DESC;
```

---

## ⚡ Performance Tips

1. **Join on indexed columns** (usually primary/foreign keys)
2. **Filter before joining** when possible using subqueries or CTEs
3. **Avoid joining on functions** — `ON YEAR(a.date) = YEAR(b.date)` kills performance
4. **Check for duplicates** before joining — accidental fan-out multiplies rows
5. **EXPLAIN your queries** to see join order chosen by the optimizer

---

## 🔗 Related
- [[sql/ctes|CTEs]] — Use CTEs to pre-filter before complex joins
- [[sql/window-functions|Window Functions]] — Alternative to self-joins for rankings
