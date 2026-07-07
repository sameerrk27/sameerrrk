---
title: Shopify Sales & Customer Funnel Dashboard
tags:
  - projects
  - power-bi
  - dax
  - dashboard
---

# Shopify Sales & Customer Funnel Dashboard

**Tools:** Power BI, DAX, Data Modeling, Excel
**Domain:** E-Commerce Analytics

---

## 📊 Project Overview

Built a comprehensive Power BI dashboard for Shopify sales and customer funnel analysis. The dashboard enables real-time tracking of key e-commerce KPIs and customer behavior patterns.

---

## 🎯 Key Metrics Tracked

| Metric | Value |
|--------|-------|
| Net Sales | $4.18M+ |
| Average Order Value | $562.6 |
| Total Customers | 4,431 |
| Repeat Purchase Rate | 46% |

---

## 🛠️ Technical Approach

### Data Pipeline
1. **Extracted** raw Shopify export data (orders, customers, products)
2. **Transformed** in Power Query — cleaned missing values, standardized date formats
3. **Modeled** in star schema: FactOrders, DimCustomer, DimProduct, DimDate
4. **Analyzed** with DAX measures

### Key DAX Measures
```dax
-- Net Sales
Net Sales = SUMX(Orders, Orders[Quantity] * Orders[Unit Price] * (1 - Orders[Discount]))

-- Customer Repeat Rate
Repeat Rate = 
    DIVIDE(
        CALCULATE(DISTINCTCOUNT(Orders[CustomerID]), Orders[OrderCount] > 1),
        DISTINCTCOUNT(Orders[CustomerID])
    )

-- Average Order Value
AOV = DIVIDE([Net Sales], [Total Orders])

-- Customer Lifetime Value (simple)
Customer LTV = 
    AVERAGEX(
        VALUES(Customers[CustomerID]),
        CALCULATE(SUM(Orders[Revenue]))
    )
```

---

## 💡 Key Insights

1. **46% repeat purchase rate** — strong customer loyalty; focus on retaining the other 54%
2. **Top payment method** insights revealed opportunities to optimize checkout
3. **Regional sales mapping** showed underperforming areas for targeted marketing
4. **Product performance analysis** identified top 20% of products driving 80% of revenue (Pareto)

---

## 📚 Skills Used

- [[power-bi/dax-formulas|DAX Formulas]] — Custom KPI measures
- [[power-bi/data-modeling|Data Modeling]] — Star schema design
- [[power-bi/power-query|Power Query]] — Data cleaning and transformation
- [[sql/aggregations|SQL Aggregations]] — Pre-aggregation in source queries

---

## 🔗 Links
- [View Code on GitHub](https://github.com/sameerrk27)
- 🌐 [View Dashboard](https://sameerrk27.github.io)
