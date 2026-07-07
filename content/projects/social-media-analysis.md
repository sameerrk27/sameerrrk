---
title: Social Media Campaign Performance Analysis
tags:
  - projects
  - sql
  - power-bi
  - python
  - marketing-analytics
---

# Social Media Campaign Performance Analysis

**Tools:** SQL, Power BI, Python
**Domain:** Marketing Analytics

---

## 📊 Project Overview

Developed a Power BI Dashboard to track social media performance metrics across multiple platforms. Used SQL for analytical queries and Python for data preprocessing.

---

## 📈 Key Results

- **12%** improvement in campaign efficiency
- Real-time monitoring of audience demographics
- Conversion trend analysis across platforms

---

## 📊 Metrics Tracked

| Metric | Description |
|--------|-------------|
| Impressions | Total ad views |
| Clicks | Number of link clicks |
| CTR | Click-Through Rate (Clicks/Impressions) |
| Engagement Rate | (Likes + Comments + Shares) / Impressions |
| CPC | Cost Per Click |
| CPM | Cost Per 1000 Impressions |
| ROAS | Return on Ad Spend |

---

## 🛠️ SQL Analysis

```sql
-- Identify high-performing ad creatives
WITH campaign_metrics AS (
    SELECT 
        campaign_id,
        creative_id,
        platform,
        SUM(impressions) AS total_impressions,
        SUM(clicks) AS total_clicks,
        SUM(conversions) AS total_conversions,
        SUM(spend) AS total_spend,
        SUM(clicks) / NULLIF(SUM(impressions), 0) * 100 AS ctr,
        SUM(conversions) / NULLIF(SUM(clicks), 0) * 100 AS cvr,
        SUM(revenue) / NULLIF(SUM(spend), 0) AS roas
    FROM ad_performance
    WHERE date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    GROUP BY campaign_id, creative_id, platform
)
SELECT *,
    RANK() OVER (PARTITION BY platform ORDER BY roas DESC) AS roas_rank
FROM campaign_metrics
WHERE total_impressions > 1000
ORDER BY roas DESC
LIMIT 20;
```

---

## 🐍 Python Preprocessing

```python
import pandas as pd
import numpy as np

# Load raw data from multiple platforms
facebook_df = pd.read_csv('facebook_ads.csv')
instagram_df = pd.read_csv('instagram_ads.csv')
google_df = pd.read_csv('google_ads.csv')

# Standardize column names
column_mapping = {
    'date': 'date', 'spend': 'cost',
    'reach': 'impressions', 'link_clicks': 'clicks'
}
facebook_df = facebook_df.rename(columns=column_mapping)
facebook_df['platform'] = 'Facebook'

# Combine all platforms
df = pd.concat([facebook_df, instagram_df, google_df], ignore_index=True)

# Calculate derived metrics
df['ctr'] = df['clicks'] / df['impressions'] * 100
df['cpc'] = df['cost'] / df['clicks'].replace(0, np.nan)
df['roas'] = df['revenue'] / df['cost'].replace(0, np.nan)

# Export for Power BI
df.to_csv('combined_ad_data.csv', index=False)
```

---

## 🔗 Related Skills Used
- [[sql/sql-for-analytics|SQL Analytics]] — Campaign performance queries
- [[python/pandas-essentials|Pandas]] — Data preprocessing
- [[power-bi/dax-formulas|DAX]] — Dashboard metrics
- [[statistics/hypothesis-testing|A/B Testing]] — Compare campaign variants
