---
title: SQL for Analytics — Real Patterns
tags:
  - sql
  - analytics
  - patterns
---

# SQL for Analytics — Real Patterns

These are the patterns I actually use in real data analysis work. Not textbook examples — real-world analytical SQL.

---

## 📊 Cohort Analysis

Track how a group of users (acquired in the same period) behaves over time.

```sql
WITH cohorts AS (
    SELECT 
        customer_id,
        MIN(DATE_FORMAT(order_date, '%Y-%m')) AS cohort_month
    FROM orders
    GROUP BY customer_id
),
order_periods AS (
    SELECT 
        o.customer_id,
        c.cohort_month,
        DATE_FORMAT(o.order_date, '%Y-%m') AS order_month,
        TIMESTAMPDIFF(MONTH, STR_TO_DATE(CONCAT(c.cohort_month, '-01'), '%Y-%m-%d'),
                            STR_TO_DATE(CONCAT(DATE_FORMAT(o.order_date, '%Y-%m'), '-01'), '%Y-%m-%d')) AS period_number
    FROM orders o
    JOIN cohorts c ON o.customer_id = c.customer_id
)
SELECT 
    cohort_month,
    period_number,
    COUNT(DISTINCT customer_id) AS retained_customers
FROM order_periods
GROUP BY cohort_month, period_number
ORDER BY cohort_month, period_number;
```

---

## 📈 Retention Rate

```sql
WITH monthly_active AS (
    SELECT 
        customer_id,
        DATE_FORMAT(activity_date, '%Y-%m') AS active_month
    FROM user_activity
    GROUP BY customer_id, DATE_FORMAT(activity_date, '%Y-%m')
)
SELECT 
    curr.active_month,
    COUNT(DISTINCT curr.customer_id) AS active_users,
    COUNT(DISTINCT prev.customer_id) AS retained_users,
    COUNT(DISTINCT prev.customer_id) / COUNT(DISTINCT curr.customer_id) * 100 AS retention_rate
FROM monthly_active curr
LEFT JOIN monthly_active prev 
    ON curr.customer_id = prev.customer_id
    AND curr.active_month = DATE_FORMAT(DATE_ADD(STR_TO_DATE(CONCAT(prev.active_month, '-01'), '%Y-%m-%d'), INTERVAL 1 MONTH), '%Y-%m')
GROUP BY curr.active_month
ORDER BY curr.active_month;
```

---

## 🏆 Top N Per Group

```sql
-- Top 3 products per category by revenue
WITH ranked_products AS (
    SELECT 
        category,
        product_name,
        SUM(revenue) AS total_revenue,
        ROW_NUMBER() OVER (PARTITION BY category ORDER BY SUM(revenue) DESC) AS rank_in_category
    FROM order_items
    GROUP BY category, product_name
)
SELECT category, product_name, total_revenue
FROM ranked_products
WHERE rank_in_category <= 3
ORDER BY category, rank_in_category;
```

---

## 🔄 Year-over-Year Comparison

```sql
SELECT 
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    SUM(revenue) AS current_revenue,
    LAG(SUM(revenue), 12) OVER (ORDER BY DATE_FORMAT(order_date, '%Y-%m')) AS prior_year_revenue,
    (SUM(revenue) - LAG(SUM(revenue), 12) OVER (ORDER BY DATE_FORMAT(order_date, '%Y-%m'))) 
        / LAG(SUM(revenue), 12) OVER (ORDER BY DATE_FORMAT(order_date, '%Y-%m')) * 100 AS yoy_growth_pct
FROM orders
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month;
```

---

## 👥 Customer Segmentation (RFM Analysis)

RFM = Recency, Frequency, Monetary — a classic customer segmentation framework.

```sql
WITH rfm_base AS (
    SELECT 
        customer_id,
        DATEDIFF(CURDATE(), MAX(order_date)) AS recency_days,
        COUNT(DISTINCT order_id) AS frequency,
        SUM(order_amount) AS monetary
    FROM orders
    GROUP BY customer_id
),
rfm_scores AS (
    SELECT 
        customer_id,
        recency_days,
        frequency,
        monetary,
        NTILE(5) OVER (ORDER BY recency_days ASC) AS r_score,    -- lower days = better
        NTILE(5) OVER (ORDER BY frequency DESC) AS f_score,       -- higher freq = better
        NTILE(5) OVER (ORDER BY monetary DESC) AS m_score         -- higher spend = better
    FROM rfm_base
)
SELECT 
    customer_id,
    recency_days,
    frequency,
    monetary,
    r_score, f_score, m_score,
    (r_score + f_score + m_score) / 3.0 AS rfm_avg,
    CASE 
        WHEN r_score >= 4 AND f_score >= 4 THEN 'Champions'
        WHEN r_score >= 3 AND f_score >= 3 THEN 'Loyal Customers'
        WHEN r_score >= 4 AND f_score <= 2 THEN 'Recent Customers'
        WHEN r_score <= 2 AND f_score >= 4 THEN 'At Risk'
        WHEN r_score <= 2 AND f_score <= 2 THEN 'Lost Customers'
        ELSE 'Potential Loyalists'
    END AS customer_segment
FROM rfm_scores
ORDER BY rfm_avg DESC;
```

---

## 🔍 Funnel Analysis

```sql
SELECT 
    COUNT(DISTINCT CASE WHEN step = 'visit' THEN user_id END) AS visitors,
    COUNT(DISTINCT CASE WHEN step = 'signup' THEN user_id END) AS signups,
    COUNT(DISTINCT CASE WHEN step = 'first_purchase' THEN user_id END) AS buyers,
    COUNT(DISTINCT CASE WHEN step = 'repeat_purchase' THEN user_id END) AS repeat_buyers,
    -- Conversion rates
    COUNT(DISTINCT CASE WHEN step = 'signup' THEN user_id END) 
        / COUNT(DISTINCT CASE WHEN step = 'visit' THEN user_id END) * 100 AS visit_to_signup_pct
FROM user_funnel_events
WHERE event_date >= '2024-01-01';
```

---

## 🔗 Related
- [[sql/window-functions|Window Functions]] — Core of most analytical patterns
- [[sql/ctes|CTEs]] — Structure complex analytical queries
- [[statistics/index|Statistics]] — Concepts behind the analysis
- [[python/eda-workflow|EDA in Python]] — Complement SQL analysis with Python
