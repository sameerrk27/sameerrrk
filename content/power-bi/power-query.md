---
title: Power Query (M Language)
tags:
  - power-bi
  - power-query
  - etl
  - m-language
---

# Power Query (M Language)

Power Query is Power BI's **ETL (Extract, Transform, Load)** tool. Every transformation you do in the Power Query Editor generates M code behind the scenes.

---

## 🔄 Common Transformations

### In the Power Query UI (no code needed):
1. **Remove columns** — Right-click → Remove
2. **Rename columns** — Double-click column header
3. **Change data type** — Click the type icon left of column name
4. **Filter rows** — Click dropdown on column header
5. **Remove duplicates** — Right-click → Remove Duplicates
6. **Unpivot columns** — Select columns → Transform → Unpivot
7. **Split column** — Transform → Split Column → By Delimiter
8. **Merge queries** — Home → Merge Queries (like JOIN)
9. **Append queries** — Home → Append Queries (like UNION)

---

## 📝 M Language Basics

Every Power Query step is M code. You can see it in View → Advanced Editor.

```m
// Basic M structure
let
    // Step 1: Connect to source
    Source = Csv.Document(File.Contents("C:\data.csv"), [Delimiter=",", Columns=5, Encoding=65001, QuoteStyle=QuoteStyle.None]),
    
    // Step 2: Use first row as headers
    PromotedHeaders = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    
    // Step 3: Change types
    ChangedTypes = Table.TransformColumnTypes(PromotedHeaders, {
        {"OrderDate", type date}, 
        {"Revenue", type number},
        {"Quantity", Int64.Type}
    }),
    
    // Step 4: Filter rows
    FilteredRows = Table.SelectRows(ChangedTypes, each [Revenue] > 0),
    
    // Step 5: Add custom column
    AddedColumn = Table.AddColumn(FilteredRows, "Profit", each [Revenue] - [Cost]),
    
    // Step 6: Rename column
    RenamedColumns = Table.RenameColumns(AddedColumn, {{"OldName", "NewName"}})

in
    RenamedColumns
```

---

## 🔧 Useful M Functions

```m
// Conditional column (IF THEN ELSE)
AddedCustom = Table.AddColumn(PreviousStep, "CustomerTier", each 
    if [TotalSpend] >= 50000 then "Platinum"
    else if [TotalSpend] >= 20000 then "Gold"
    else if [TotalSpend] >= 5000 then "Silver"
    else "Bronze")

// Text operations
= Text.Upper([Name])
= Text.Lower([Email])
= Text.Trim([ProductName])          // Remove whitespace
= Text.Start([SKU], 3)              // First 3 characters
= Text.End([Code], 4)               // Last 4 characters
= Text.Contains([Description], "sale", Comparer.OrdinalIgnoreCase)
= Text.Replace([Phone], "-", "")    // Remove dashes

// Date operations
= Date.Year([OrderDate])
= Date.Month([OrderDate])
= Date.MonthName([OrderDate])
= Date.DayOfWeek([OrderDate], Day.Monday)   // 0=Mon, 6=Sun
= Date.AddDays([OrderDate], 30)
= Duration.Days(Date.From(DateTime.LocalNow()) - [OrderDate])  // Days ago

// Number operations
= Number.Round([Price], 2)
= Number.Abs([Variance])

// Table operations
= Table.RowCount(Source)    // Count rows
= Table.ColumnCount(Source) // Count columns
```

---

## 📁 Combining Multiple Files (Folder)

```m
// Load all CSV files from a folder
let
    Source = Folder.Files("C:\Data\Monthly Sales\"),
    
    // Filter to only .csv files
    FilteredFiles = Table.SelectRows(Source, each Text.EndsWith([Name], ".csv")),
    
    // Add a column to track which file each row came from
    AddedFilename = Table.AddColumn(FilteredFiles, "SourceFile", each [Name]),
    
    // Load content of each file
    RemovedOtherColumns = Table.SelectColumns(AddedFilename, {"Content", "SourceFile"}),
    
    // Expand CSV content
    ImportedCSV = Table.AddColumn(RemovedOtherColumns, "Data", 
        each Csv.Document([Content], [Delimiter=",", Encoding=65001])),
    
    ExpandedData = Table.ExpandTableColumn(ImportedCSV, "Data", 
        Table.ColumnNames(ImportedCSV{0}[Data]))

in
    ExpandedData
```

---

## 💡 Performance Tips

1. **Filter early** — Apply row filters as early as possible; don't load data you don't need
2. **Remove columns early** — Drop unnecessary columns at the beginning of your query
3. **Avoid complex calculated columns in Power Query** — Do heavy lifting in DAX instead
4. **Use native SQL queries** — When connecting to databases, write the SQL directly vs. loading the whole table
5. **Disable query load** — For staging queries, uncheck "Enable load to report" to prevent them from adding to the model

```m
// Native SQL query (much faster than loading full table)
let
    Source = Sql.Database("server.database.windows.net", "SalesDB"),
    Query = Value.NativeQuery(Source, 
        "SELECT customer_id, SUM(revenue) as total_revenue 
         FROM orders 
         WHERE order_date >= '2024-01-01'
         GROUP BY customer_id")
in
    Query
```

---

## 🔗 Related
- [[power-bi/data-modeling|Data Modeling]] — Power Query feeds the data model
- [[power-bi/dax-formulas|DAX]] — Calculated measures built on top of Power Query-prepared data
- [[sql/index|SQL]] — Same concepts, different syntax
