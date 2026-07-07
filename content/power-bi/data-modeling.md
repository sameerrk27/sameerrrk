---
title: Power BI Data Modeling
tags:
  - power-bi
  - data-modeling
  - star-schema
---

# Power BI Data Modeling

A good data model is the **foundation of every Power BI report**. Bad models lead to slow reports, wrong numbers, and frustrated users.

---

## ⭐ Star Schema — The Gold Standard

```
                 ┌─────────────────┐
                 │  DimDate        │
                 │  DateKey (PK)   │
                 │  Year, Month... │
                 └────────┬────────┘
                          │
┌─────────────┐    ┌──────┴──────┐    ┌──────────────────┐
│ DimCustomer │    │  FactOrders │    │  DimProduct      │
│ CustomerKey │◄───┤ OrderID(PK) ├───►│  ProductKey (PK) │
│ Name, City  │    │ DateKey(FK) │    │  Name, Category  │
└─────────────┘    │ CustomerKey │    └──────────────────┘
                   │ ProductKey  │
                   │ Quantity    │
                   │ Revenue     │
                   └─────────────┘
```

**Rules of Star Schema:**
- **One fact table** (orders, transactions, events)
- **Multiple dimension tables** (date, customer, product, etc.)
- **One-to-many relationships** from dimension to fact
- All foreign keys in fact table
- Dimensions are "wide" (many descriptive columns)
- Fact tables are "tall" (many rows, few columns)

---

## 🔗 Relationships

### Setting Up Relationships
- **Single direction** (→) — Default and recommended
- **Bidirectional** (↔) — Use sparingly; can cause ambiguity
- **Active vs Inactive** — Only one active relationship between tables; use USERELATIONSHIP() in DAX for inactive ones

### Cardinality Types
| Type | Example | When |
|------|---------|------|
| One-to-Many (1:*) | 1 Customer → Many Orders | Most common, use this |
| Many-to-Many (*:*) | Products ↔ Orders via bridge | Use bridge table instead |
| One-to-One (1:1) | Customer ↔ CustomerDetails | Consider merging tables |

### The Many-to-Many Solution (Bridge Table)
```
Students ──→ StudentCourses ←── Courses
(1)            (many)            (1)
```

---

## 📅 Creating a Date Table (Required!)

Every Power BI model needs a complete date table for time intelligence.

```dax
DateTable = 
ADDCOLUMNS(
    CALENDAR(DATE(2020, 1, 1), DATE(2026, 12, 31)),
    "Year", YEAR([Date]),
    "Quarter", "Q" & QUARTER([Date]),
    "Month Num", MONTH([Date]),
    "Month Name", FORMAT([Date], "MMMM"),
    "Month Short", FORMAT([Date], "MMM"),
    "Week Num", WEEKNUM([Date]),
    "Day of Week", FORMAT([Date], "dddd"),
    "Is Weekend", IF(WEEKDAY([Date]) IN {1, 7}, TRUE, FALSE),
    "Is Current Month", IF(EOMONTH([Date], 0) = EOMONTH(TODAY(), 0), TRUE, FALSE),
    "Year-Month", FORMAT([Date], "YYYY-MM"),
    "Fiscal Year", IF(MONTH([Date]) >= 4, YEAR([Date]), YEAR([Date]) - 1)  -- April FY start
)
```

Then:
1. Mark the table as a Date Table (Table Tools → Mark as Date Table)
2. Connect DateTable[Date] to your fact table's date column

---

## 🏗️ Best Practices

### Do This:
- ✅ Star schema with one fact table
- ✅ One active relationship between any two tables
- ✅ Date table marked as date table
- ✅ Hide foreign key columns in fact table
- ✅ Sort Month Name by Month Number
- ✅ All measures in a dedicated Measures table

### Avoid This:
- ❌ Snowflake schema (adds complexity, rarely needed in Power BI)
- ❌ Many-to-many relationships without a bridge table
- ❌ Bidirectional relationships as default
- ❌ Calculated columns that could be measures
- ❌ Flat tables (one huge table with everything)

---

## 🔗 Related
- [[power-bi/dax-formulas|DAX]] — Works best with proper star schema
- [[power-bi/power-query|Power Query]] — Transform data into star schema shape
- [[sql/index|SQL]] — Design concepts come from relational database theory
