---
title: Hypothesis Testing
tags:
  - statistics
  - hypothesis-testing
  - p-value
  - ab-testing
---

# Hypothesis Testing

Hypothesis testing lets you determine whether observed differences in data are **statistically significant** or just random chance.

---

## 🧪 The Framework

1. **H₀ (Null Hypothesis)** — The default assumption. "There is no effect / no difference."
2. **H₁ (Alternative Hypothesis)** — What you're trying to prove. "There IS an effect / difference."
3. **Significance Level (α)** — Threshold for rejecting H₀. Usually α = 0.05 (5%).
4. **p-value** — Probability of seeing results as extreme as yours, assuming H₀ is true.
   - If p-value < α → **Reject H₀** (result is statistically significant)
   - If p-value ≥ α → **Fail to reject H₀** (not enough evidence)

> "Statistically significant" does NOT mean practically significant! A tiny difference can be statistically significant with a large sample.

---

## 📊 Choosing the Right Test

```
What's your question?
│
├── Comparing MEANS
│   ├── 1 group vs. known value → One-sample t-test
│   ├── 2 groups (independent) → Two-sample t-test
│   ├── 2 groups (paired/before-after) → Paired t-test
│   └── 3+ groups → ANOVA (then Tukey post-hoc)
│
├── Comparing PROPORTIONS
│   ├── 2 proportions → Two-proportion z-test
│   └── Categories × Groups → Chi-square test
│
└── Relationship between VARIABLES
    └── Two variables → Correlation (Pearson or Spearman)
```

---

## 👥 Two-Sample t-Test (Most Common)

"Is the mean of group A significantly different from group B?"

```python
from scipy import stats
import numpy as np

# Example: Did a new product page increase average order value?
control = [45, 52, 48, 61, 39, 55, 47, 58, 44, 51]  # Old page
treatment = [55, 63, 58, 71, 49, 65, 57, 68, 54, 61]  # New page

# Assumptions check:
# 1. Data is approximately normal (or large sample)
# 2. Variance is roughly equal (or use Welch's t-test with equal_var=False)

t_stat, p_value = stats.ttest_ind(control, treatment, equal_var=False)  # Welch's

print(f"Control mean: {np.mean(control):.2f}")
print(f"Treatment mean: {np.mean(treatment):.2f}")
print(f"t-statistic: {t_stat:.4f}")
print(f"p-value: {p_value:.4f}")
print(f"Significant at α=0.05: {p_value < 0.05}")
```

---

## 🔠 Chi-Square Test (Categorical Data)

"Is there a relationship between two categorical variables?"

```python
from scipy.stats import chi2_contingency
import pandas as pd

# Example: Is conversion rate different between age groups?
contingency_table = pd.DataFrame({
    'Converted': [45, 72, 33],
    'Not Converted': [155, 228, 167]
}, index=['18-25', '26-40', '40+'])

chi2, p_value, dof, expected = chi2_contingency(contingency_table)

print(f"Chi-square statistic: {chi2:.4f}")
print(f"p-value: {p_value:.4f}")
print(f"Degrees of freedom: {dof}")
print(f"Significant at α=0.05: {p_value < 0.05}")
```

---

## 🅰️🅱️ A/B Testing Framework

```python
import numpy as np
from scipy import stats

def ab_test(control_conversions, control_size, 
            treatment_conversions, treatment_size, alpha=0.05):
    """
    Two-proportion z-test for A/B testing.
    """
    p_control = control_conversions / control_size
    p_treatment = treatment_conversions / treatment_size
    
    # Pooled proportion
    p_pooled = (control_conversions + treatment_conversions) / (control_size + treatment_size)
    
    # Standard error
    se = np.sqrt(p_pooled * (1 - p_pooled) * (1/control_size + 1/treatment_size))
    
    # Z-statistic
    z_stat = (p_treatment - p_control) / se
    
    # P-value (two-tailed)
    p_value = 2 * (1 - stats.norm.cdf(abs(z_stat)))
    
    # Confidence interval for difference
    se_diff = np.sqrt(p_control*(1-p_control)/control_size + 
                      p_treatment*(1-p_treatment)/treatment_size)
    ci_lower = (p_treatment - p_control) - 1.96 * se_diff
    ci_upper = (p_treatment - p_control) + 1.96 * se_diff
    
    # Relative lift
    lift = (p_treatment - p_control) / p_control * 100
    
    print(f"Control conversion rate: {p_control:.2%}")
    print(f"Treatment conversion rate: {p_treatment:.2%}")
    print(f"Relative lift: {lift:+.1f}%")
    print(f"95% CI for difference: [{ci_lower:.3f}, {ci_upper:.3f}]")
    print(f"Z-statistic: {z_stat:.4f}")
    print(f"P-value: {p_value:.4f}")
    print(f"Significant: {'✅ YES' if p_value < alpha else '❌ NO'}")
    
    return p_value < alpha

# Usage
ab_test(
    control_conversions=230, control_size=1000,
    treatment_conversions=265, treatment_size=1000
)
```

---

## 🔗 Related
- [[statistics/probability-basics|Probability]] — Foundation of hypothesis testing
- [[statistics/descriptive-stats|Descriptive Stats]] — Understand data before testing
- [[sql/sql-for-analytics|SQL Analytics]] — Funnel analysis before A/B testing
