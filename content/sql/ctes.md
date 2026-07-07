---
title: CTEs & Subqueries
tags:
  - sql
  - cte
  - subqueries
---

# CTEs & Subqueries

## Common Table Expressions (CTEs)

A CTE is a **named temporary result set** defined using `WITH`. Think of it as a named query you can reference later in the same statement.

```sql
WITH cte_name AS (
    SELECT ...
    FROM ...
    WHERE ...
)
SELECT * FROM cte_name;
```

---

## 🆚 CTE vs Subquery vs Temp Table

| Feature | CTE | Subquery | Temp Table |
|---------|-----|----------|------------|
| Readability | ✅ High | ⚠️ Medium | ✅ High |
| Reusable in same query | ✅ Yes | ❌ No | ✅ Yes |
| Persists after query | ❌ No | ❌ No | ✅ Yes |
| Recursive | ✅ Yes | ❌ No | ❌ No |
| Indexable | ❌ No | ❌ No | ✅ Yes |

---

## 📝 Multiple CTEs

```sql
WITH 
high_value_customers AS (
    SELECT customer_id, SUM(order_total) AS lifetime_value
    FROM orders
    GROUP BY customer_id
    HAVING SUM(order_total) > 10000
),
recent_orders AS (
    SELECT customer_id, COUNT(*) AS recent_order_count
    FROM orders
    WHERE order_date >= DATE_SUB(NOW(), INTERVAL 90 DAY)
    GROUP BY customer_id
)
SELECT 
    hvc.customer_id,
    hvc.lifetime_value,
    COALESCE(ro.recent_order_count, 0) AS recent_orders
FROM high_value_customers hvc
LEFT JOIN recent_orders ro ON hvc.customer_id = ro.customer_id
ORDER BY hvc.lifetime_value DESC;
```

---

## 🔄 Recursive CTEs

Recursive CTEs can reference themselves — great for hierarchical data.

```sql
-- Employee hierarchy (manager → subordinates)
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: top-level managers (no manager)
    SELECT employee_id, name, manager_id, 0 AS level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive case: employees with a manager
    SELECT e.employee_id, e.name, e.manager_id, eh.level + 1
    FROM employees e
    INNER JOIN employee_hierarchy eh ON e.manager_id = eh.employee_id
)
SELECT * FROM employee_hierarchy ORDER BY level;
```

---

## 🎯 Subqueries

### In WHERE clause
```sql
-- Customers who spent more than average
SELECT customer_id, total_spend
FROM customers
WHERE total_spend > (SELECT AVG(total_spend) FROM customers);
```

### Correlated Subquery (slow but powerful)
```sql
-- Latest order per customer
SELECT order_id, customer_id, order_date, amount
FROM orders o1
WHERE order_date = (
    SELECT MAX(order_date)
    FROM orders o2
    WHERE o2.customer_id = o1.customer_id
);
-- Better done with ROW_NUMBER() window function!
```

### IN / NOT IN
```sql
-- Products never ordered
SELECT product_id, product_name
FROM products
WHERE product_id NOT IN (
    SELECT DISTINCT product_id FROM order_items
);
```

### EXISTS / NOT EXISTS (faster than IN for large sets)
```sql
SELECT customer_id, customer_name
FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o
    WHERE o.customer_id = c.customer_id
      AND o.order_date >= '2024-01-01'
);
```

---

## 💡 Best Practices

1. **Prefer CTEs over nested subqueries** — much easier to read and debug
2. **Name CTEs descriptively** — `high_value_customers` not `cte1`
3. **Use EXISTS instead of IN** for large tables
4. **Avoid correlated subqueries** in performance-sensitive queries — use window functions instead
5. **Test CTEs independently** by running just the WITH block

---

## 🔗 Related
- [[sql/window-functions|Window Functions]] — Often used inside CTEs
- [[sql/joins|Joins]] — CTEs often join to other tables
