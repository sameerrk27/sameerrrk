---
title: VLOOKUP & XLOOKUP
tags:
  - excel
  - vlookup
  - xlookup
  - lookup-functions
---

# VLOOKUP & XLOOKUP

Lookup functions let you **pull data from one table into another** — the Excel equivalent of a JOIN.

---

## VLOOKUP

```
=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
```

| Parameter | Description |
|-----------|-------------|
| `lookup_value` | What you're looking for |
| `table_array` | Where to look (range or named range) |
| `col_index_num` | Which column to return (1 = first column) |
| `range_lookup` | `FALSE` = exact match (almost always use this!) |

### Example
```excel
=VLOOKUP(A2, Products!$A:$D, 3, FALSE)
```
*Look up the product ID in A2 in the Products sheet (columns A–D), and return the value from column 3 (Product Name).*

### Common Errors:
- `#N/A` → Value not found. Use `=IFERROR(VLOOKUP(...), "Not Found")`
- `#REF!` → Column index is larger than the table
- Wrong value → Forgot `FALSE` at the end → approximate match!

### VLOOKUP Limitations:
- ❌ Can only look to the **right** (lookup column must be the first column)
- ❌ Slow on very large datasets
- ❌ Breaking when you insert columns in the lookup table

---

## XLOOKUP (Modern Replacement)

XLOOKUP (Excel 365 / 2021+) solves all VLOOKUP limitations.

```
=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])
```

### Example
```excel
=XLOOKUP(A2, Products!A:A, Products!C:C, "Not Found")
```
*Find A2 in the Products ID column, return the value from Products Category column. If not found, return "Not Found".*

### Why XLOOKUP is Better:
- ✅ Can look **left or right**
- ✅ Return **multiple columns** at once
- ✅ Built-in `if_not_found` parameter (no IFERROR needed)
- ✅ Exact match by default
- ✅ Faster than VLOOKUP
- ✅ Works with sorted data for faster lookups

### Multiple Column Return
```excel
=XLOOKUP(A2, Products!A:A, Products!B:D)
```
*Returns columns B, C, and D — all at once!*

---

## INDEX + MATCH (Classic Power User Combo)

Works in all Excel versions, very flexible:

```
=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))
```

```excel
=INDEX(Products!C:C, MATCH(A2, Products!A:A, 0))
```

### Why INDEX-MATCH:
- ✅ Can look in any direction
- ✅ Doesn't break when columns are inserted
- ✅ Slightly faster than VLOOKUP on large data
- ✅ Can do two-way lookups:

```excel
=INDEX(DataTable, MATCH(RowValue, RowHeaders, 0), MATCH(ColValue, ColHeaders, 0))
```

---

## Two-Way Lookup (XLOOKUP inside XLOOKUP)

```excel
=XLOOKUP(B1, ColHeaders, XLOOKUP(A1, RowHeaders, DataRange))
```
*Look up both a row value and a column value simultaneously.*

---

## 🔗 Related
- [[excel/pivot-tables|Pivot Tables]] — Another way to combine and summarize data
- [[sql/joins|SQL Joins]] — The professional equivalent of VLOOKUP
- [[python/pandas-essentials|Pandas merge()]] — Python equivalent
