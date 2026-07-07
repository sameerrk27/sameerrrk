---
title: SQL for Data Analysis
tags:
  - sql
  - data-analysis
---

# SQL for Data Analysis

SQL (Structured Query Language) is the **most essential skill** for any data analyst. It's the language of data — every major database system uses it.

> As a data analyst, you'll use SQL every single day. Master it.

---

## 📚 Topics in This Section

- [[sql/window-functions|Window Functions]] — RANK, ROW_NUMBER, LEAD, LAG, running totals
- [[sql/ctes|CTEs & Subqueries]] — Common Table Expressions, nested queries
- [[sql/joins|Joins Deep Dive]] — INNER, LEFT, RIGHT, FULL, CROSS, SELF joins
- [[sql/aggregations|Aggregations & GROUP BY]] — COUNT, SUM, AVG, HAVING
- [[sql/sql-for-analytics|SQL for Analytics]] — Real analytical patterns and techniques

---

## 🚀 Quick Reference

```sql
-- Basic SELECT structure
SELECT 
    column1,
    column2,
    COUNT(*) AS total,
    AVG(column3) AS average
FROM table_name
WHERE condition
GROUP BY column1, column2
HAVING COUNT(*) > 10
ORDER BY total DESC
LIMIT 100;
```

---

## 🧠 Core Concepts

### Execution Order (Critical!)
SQL runs in this order — not how you write it:
1. `FROM` (and `JOIN`)
2. `WHERE`
3. `GROUP BY`
4. `HAVING`
5. `SELECT`
6. `ORDER BY`
7. `LIMIT`

### Key Data Types
| Type | Examples |
|------|---------|
| Numeric | INT, BIGINT, DECIMAL, FLOAT |
| String | VARCHAR, TEXT, CHAR |
| Date/Time | DATE, DATETIME, TIMESTAMP |
| Boolean | BOOLEAN, BIT |

---

## 🔗 Related Notes
- [[python/pandas-essentials|Pandas]] — Python equivalent of SQL for DataFrames
- [[excel/index|Excel]] — Another tool for data querying
- [[statistics/index|Statistics]] — What to do after you pull the data
