---
title: Pivot Tables
tags:
  - excel
  - pivot-tables
  - summarization
---

# Pivot Tables

Pivot Tables are Excel's most powerful feature for **summarizing and analyzing large datasets**.

---

## 🏗️ Creating a Pivot Table

1. **Select your data** (any cell in the dataset)
2. **Insert → PivotTable** → Choose "New Worksheet"
3. **Drag fields** to: Rows, Columns, Values, Filters

### Field Areas:
- **Rows** — What to group by (vertically)
- **Columns** — What to group by (horizontally, cross-tab)
- **Values** — What to calculate (SUM, COUNT, AVERAGE, etc.)
- **Filters** — Add a slicer/filter on top

---

## 📊 Common Pivot Table Patterns

### Sales by Category and Month
```
Rows:     Category
Columns:  Month (from Date)
Values:   SUM of Revenue
```

### Top Products by Revenue
```
Rows:     Product Name
Values:   SUM of Revenue
Sort:     Largest to Smallest on Revenue
Show Top: 10 items
```

### Customer Count by Region and Segment
```
Rows:     Region
Columns:  Customer Segment
Values:   COUNT of Customer ID (unique: DISTINCT COUNT)
```

---

## ⚙️ Value Field Settings

Right-click any value → **Value Field Settings**:

| Summary Function | Use When |
|-----------------|---------|
| Sum | Total revenue, total units |
| Count | Count orders, records |
| Count Numbers | Count non-blank numeric values |
| Average | Average order value |
| Max/Min | Peak sales, lowest price |
| StdDev | Variability analysis |

### Show Values As:
- **% of Grand Total** → Each cell as % of total
- **% of Row Total** → Breakdown within each row
- **% of Column Total** → Breakdown within each column
- **Running Total** → Cumulative sum
- **Difference From** → Change vs. previous period
- **Rank** → Rank within category

---

## 🔄 Refresh & Update

When source data changes:
- **Ctrl + Alt + F5** → Refresh all
- **Right-click PivotTable → Refresh**
- **Analyze tab → Refresh → Refresh All**

---

## 📅 Date Grouping

Right-click any date in Row/Column area → **Group**:
- Group by: Seconds, Minutes, Hours, Days, Months, Quarters, Years
- This lets you analyze monthly or quarterly trends automatically

---

## 📊 PivotCharts

Insert → PivotChart (while inside a PivotTable):
- Chart updates automatically when PivotTable filters change
- Great for dashboards with slicers

---

## 🔗 Related
- [[excel/vlookup-xlookup|VLOOKUP & XLOOKUP]] — Often combined with pivot tables
- [[power-bi/index|Power BI]] — Interactive pivot tables at enterprise scale
- [[sql/aggregations|SQL GROUP BY]] — The SQL equivalent of pivot tables
