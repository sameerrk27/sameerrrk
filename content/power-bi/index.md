---
title: Power BI
tags:
  - power-bi
  - visualization
  - dashboard
---

# Power BI

Power BI is **Microsoft's business intelligence tool** for creating interactive dashboards and reports. It's one of the most in-demand BI tools for data analysts.

---

## 📚 Topics in This Section

- [[power-bi/dax-formulas|DAX Formulas]] — Calculated columns, measures, time intelligence
- [[power-bi/data-modeling|Data Modeling]] — Star schema, relationships, cardinality
- [[power-bi/power-query|Power Query]] — M language, data transformation, ETL

---

## 🏗️ Power BI Architecture

```
Data Sources (Excel, SQL, APIs, CSVs)
         ↓
   Power Query (ETL)
         ↓
   Data Model (Tables + Relationships)
         ↓
   DAX (Calculations + Measures)
         ↓
   Visualizations + Reports
         ↓
   Dashboard (Pinned visuals)
```

---

## ✅ Best Practices Checklist

- [ ] Star schema data model (fact + dimension tables)
- [ ] All measures in a dedicated "Measures" table
- [ ] Use implicit relationships — avoid many-to-many
- [ ] Name measures clearly: `Total Revenue` not `Revenue`
- [ ] Use comments in DAX: `-- This calculates YTD`
- [ ] Format numbers: currency, percentages, thousands separator
- [ ] Consistent color palette across all visuals
- [ ] Use bookmarks for drillthrough navigation
- [ ] Row-level security (RLS) for sensitive data

---

## 🔗 My Power BI Projects

- [[projects/shopify-dashboard|Shopify Sales Dashboard]] — $4.18M+ net sales tracked
- [[projects/social-media-analysis|Social Media Campaign Dashboard]] — 12% efficiency improvement

---

## 🔗 Related
- [[sql/index|SQL]] — Power BI can query databases directly
- [[statistics/index|Statistics]] — Understand what your dashboards are measuring
