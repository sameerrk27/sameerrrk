---
title: Advanced Excel Functions
tags:
  - excel
  - advanced-functions
  - formulas
---

# Advanced Excel Functions

These functions take your Excel skills from intermediate to expert level.

---

## SUMIFS / COUNTIFS / AVERAGEIFS

The "S" versions (with S at the end) support **multiple conditions**.

```excel
-- SUMIFS: Sum values where multiple conditions are true
=SUMIFS(sum_range, criteria_range1, criteria1, [range2, criteria2, ...])

-- Example: Total revenue for Product A in Q1 from North region
=SUMIFS(Revenue_Col, Product_Col, "Product A", Quarter_Col, "Q1", Region_Col, "North")

-- COUNTIFS: Count rows matching multiple conditions
=COUNTIFS(Status_Col, "Active", Age_Col, ">=25", Age_Col, "<=40")

-- AVERAGEIFS: Average where conditions are met
=AVERAGEIFS(Salary_Col, Department_Col, "Sales", Rating_Col, ">=4")
```

---

## Dynamic Array Functions (Excel 365)

These functions **spill** results into multiple cells automatically.

```excel
-- FILTER: Extract rows that meet conditions
=FILTER(DataRange, (Category_Col="Electronics")*(Revenue_Col>1000), "No results")

-- SORT: Sort a range dynamically
=SORT(DataRange, 3, -1)  -- Sort by column 3, descending

-- UNIQUE: Get unique values from a range
=UNIQUE(Category_Col)

-- SEQUENCE: Generate a sequence of numbers
=SEQUENCE(10)           -- 1 to 10
=SEQUENCE(5, 3)         -- 5 rows × 3 columns grid

-- SORTBY: Sort by another column
=SORTBY(NameRange, RevenueRange, -1)  -- Sort names by revenue (desc)
```

---

## TEXT Functions

```excel
=LEFT(A2, 3)           -- First 3 characters
=RIGHT(A2, 4)          -- Last 4 characters
=MID(A2, 5, 3)         -- 3 characters starting at position 5
=LEN(A2)               -- Length of string
=TRIM(A2)              -- Remove leading/trailing spaces
=UPPER(A2)             -- UPPERCASE
=LOWER(A2)             -- lowercase
=PROPER(A2)            -- Title Case
=CONCATENATE(A2," ",B2) -- Join strings (or use A2&" "&B2)
=TEXTJOIN(", ",TRUE,A2:A10) -- Join range with delimiter

-- Extract from a delimiter
=LEFT(A2, FIND("-",A2)-1)   -- Text before "-"
=MID(A2, FIND("@",A2)+1, LEN(A2))  -- Text after "@"

-- Text to Number
=VALUE(A2)
=NUMBERVALUE(A2, ".", ",")   -- Handle different decimal separators
```

---

## DATE Functions

```excel
=TODAY()                    -- Today's date
=NOW()                      -- Current date and time
=DATE(2024, 12, 31)         -- Create a date from year, month, day
=YEAR(A2)                   -- Extract year
=MONTH(A2)                  -- Extract month number
=DAY(A2)                    -- Extract day
=TEXT(A2, "MMMM YYYY")      -- Format date as "December 2024"
=WEEKDAY(A2, 2)             -- Day of week (1=Mon with mode 2)
=WORKDAY(A2, 5)             -- Date 5 working days from A2
=NETWORKDAYS(A2, B2)        -- Working days between two dates
=EDATE(A2, 3)               -- Date 3 months from A2
=EOMONTH(A2, 0)             -- Last day of A2's month
=DATEDIF(A2, TODAY(), "D")  -- Days between two dates
=DATEDIF(A2, TODAY(), "M")  -- Months between two dates
=DATEDIF(A2, TODAY(), "Y")  -- Years between two dates
```

---

## Conditional Logic

```excel
=IF(A2>100, "High", IF(A2>50, "Medium", "Low"))  -- Nested IF

-- IFS (Excel 2016+) — cleaner than nested IFs
=IFS(A2>=90, "A", A2>=80, "B", A2>=70, "C", A2>=60, "D", TRUE, "F")

-- SWITCH — like CASE WHEN
=SWITCH(A2, 1, "January", 2, "February", 3, "March", "Other")

-- AND / OR
=IF(AND(A2>50, B2="Active"), "Qualify", "No")
=IF(OR(A2="VIP", A2="Premium"), "Priority", "Standard")

-- IFERROR — handle errors
=IFERROR(VLOOKUP(A2, Table, 2, 0), "Not Found")

-- ISBLANK
=IF(ISBLANK(A2), "Missing", A2)
```

---

## 🔗 Related
- [[excel/pivot-tables|Pivot Tables]] — Combine with GETPIVOTDATA
- [[excel/vlookup-xlookup|VLOOKUP & XLOOKUP]] — Essential lookup functions
- [[sql/aggregations|SQL Aggregations]] — SQL equivalent of SUMIFS, COUNTIFS
