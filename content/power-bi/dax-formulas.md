---
title: DAX Formulas
tags:
  - power-bi
  - dax
  - measures
---

# DAX Formulas

DAX (Data Analysis Expressions) is the formula language of Power BI. It's similar to Excel functions but works on **entire columns and tables**, not individual cells.

> The most important distinction in DAX: **Calculated Columns** vs **Measures**.

---

## Calculated Columns vs Measures

| | Calculated Column | Measure |
|--|--|--|
| **When computed** | At data load/refresh | At query time |
| **Stored in** | Data model (uses RAM) | Computed on demand |
| **Context** | Row context | Filter context |
| **Use for** | Categorization, flags | Aggregations, KPIs |
| **Example** | `Profit Margin %` per row | `Total Revenue` |

---

## 📊 Basic Measures

```dax
-- Count
Total Orders = COUNTROWS(Orders)
Unique Customers = DISTINCTCOUNT(Orders[CustomerID])

-- Sum
Total Revenue = SUM(Orders[Revenue])
Total Cost = SUMX(Orders, Orders[Quantity] * Orders[UnitCost])

-- Average
Avg Order Value = AVERAGE(Orders[OrderAmount])
Avg Order Value = DIVIDE([Total Revenue], [Total Orders])

-- Min/Max
Largest Order = MAX(Orders[OrderAmount])
First Sale Date = MIN(Orders[OrderDate])
```

---

## 🔢 CALCULATE — The Most Important DAX Function

`CALCULATE` evaluates an expression in a **modified filter context**.

```dax
-- Sales for a specific category
Electronics Revenue = 
    CALCULATE([Total Revenue], Products[Category] = "Electronics")

-- Sales excluding a region
Revenue Excl. North = 
    CALCULATE([Total Revenue], NOT Regions[Region] = "North")

-- Remove all filters (grand total)
All Time Revenue = CALCULATE([Total Revenue], ALL(Orders))

-- Revenue for current year
CY Revenue = 
    CALCULATE([Total Revenue], YEAR(Orders[OrderDate]) = YEAR(TODAY()))
```

---

## ⏰ Time Intelligence Functions

These require a **Date table** with every date (no gaps!).

```dax
-- Year-to-Date
Revenue YTD = TOTALYTD([Total Revenue], DateTable[Date])

-- Month-to-Date
Revenue MTD = TOTALMTD([Total Revenue], DateTable[Date])

-- Quarter-to-Date
Revenue QTD = TOTALQTD([Total Revenue], DateTable[Date])

-- Same period last year
Revenue SPLY = 
    CALCULATE([Total Revenue], SAMEPERIODLASTYEAR(DateTable[Date]))

-- Year-over-Year Growth %
YoY Growth % = 
    DIVIDE([Total Revenue] - [Revenue SPLY], [Revenue SPLY], 0)

-- Previous month
Revenue Prev Month = 
    CALCULATE([Total Revenue], PREVIOUSMONTH(DateTable[Date]))

-- Month-over-Month Growth
MoM Growth = 
    DIVIDE([Total Revenue] - [Revenue Prev Month], [Revenue Prev Month], 0)

-- Rolling 3 months
Revenue Rolling 3M = 
    CALCULATE([Total Revenue], 
        DATESINPERIOD(DateTable[Date], LASTDATE(DateTable[Date]), -3, MONTH))

-- Running total
Revenue Running Total = 
    CALCULATE([Total Revenue], 
        DATESYTD(DateTable[Date]))
```

---

## 🎯 Ranking and TOP N

```dax
-- Rank products by revenue
Product Revenue Rank = 
    RANKX(
        ALL(Products[ProductName]),
        [Total Revenue],
        ,
        DESC,
        Dense
    )

-- Is top 10?
Is Top 10 Product = 
    IF([Product Revenue Rank] <= 10, "Top 10", "Others")

-- Top 10 revenue (for cards)
Top 10 Revenue = 
    CALCULATE(
        [Total Revenue],
        TOPN(10, ALL(Products), [Total Revenue])
    )
```

---

## 💡 Conditional Measures

```dax
-- SWITCH (like CASE WHEN in SQL)
Customer Tier = 
    SWITCH(
        TRUE(),
        [Customer LTV] >= 50000, "Platinum",
        [Customer LTV] >= 20000, "Gold",
        [Customer LTV] >= 5000,  "Silver",
        "Bronze"
    )

-- IF with measure
Profit Status = 
    IF([Profit Margin %] > 0, "Profitable", "Loss-Making")
```

---

## 📈 Cumulative / Running Total

```dax
Cumulative Revenue = 
    CALCULATE(
        [Total Revenue],
        FILTER(
            ALL(DateTable),
            DateTable[Date] <= MAX(DateTable[Date])
        )
    )
```

---

## 🛠️ DIVIDE — Always Use Instead of /

```dax
-- BAD: Can return error if denominator is 0
Conversion Rate = [Purchasers] / [Visitors]

-- GOOD: Returns 0 (or custom value) if denominator is 0
Conversion Rate = DIVIDE([Purchasers], [Visitors], 0)
```

---

## 🔗 Related
- [[power-bi/data-modeling|Data Modeling]] — DAX only works well with a good model
- [[power-bi/power-query|Power Query]] — Prepare data before DAX
- [[sql/window-functions|SQL Window Functions]] — SQL equivalent of DAX time intelligence
