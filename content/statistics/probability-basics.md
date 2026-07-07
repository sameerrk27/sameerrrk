---
title: Probability Basics
tags:
  - statistics
  - probability
  - distributions
---

# Probability Basics

Probability is the mathematical study of **uncertainty**. It underpins all of statistics and machine learning.

---

## 📊 Key Distributions

### Normal Distribution (Bell Curve)
```python
from scipy.stats import norm
import numpy as np
import matplotlib.pyplot as plt

# 68-95-99.7 Rule (Empirical Rule)
# ±1σ contains 68.27% of data
# ±2σ contains 95.45% of data
# ±3σ contains 99.73% of data

mu, sigma = 100, 15  # Mean and std dev (like IQ scores)

# Probability of scoring between 85 and 115 (±1σ)
prob = norm.cdf(115, mu, sigma) - norm.cdf(85, mu, sigma)
print(f"P(85 < X < 115) = {prob:.4f}")  # ~68.27%

# What score is in the top 5%?
top_5_pct = norm.ppf(0.95, mu, sigma)
print(f"Top 5% score: {top_5_pct:.1f}")
```

### Binomial Distribution (Success/Failure)
```python
from scipy.stats import binom

# Probability of getting exactly k successes in n trials with probability p
n = 10   # trials
p = 0.3  # success probability
k = 3    # successes

prob = binom.pmf(k, n, p)
print(f"P(X = {k}) = {prob:.4f}")

# At most 3 successes
prob_leq3 = binom.cdf(3, n, p)
print(f"P(X ≤ 3) = {prob_leq3:.4f}")
```

### Poisson Distribution (Count of Events)
```python
from scipy.stats import poisson

# Events per unit time (e.g., calls per hour)
lambda_rate = 5  # average 5 calls per hour

# Probability of exactly k events
for k in range(10):
    prob = poisson.pmf(k, lambda_rate)
    print(f"P(X={k}) = {prob:.4f}")
```

---

## 🔄 Bayes' Theorem

P(A|B) = P(B|A) × P(A) / P(B)

Real example: Medical testing

```python
# Disease affects 1% of population
p_disease = 0.01

# Test is 95% accurate (true positive rate)
p_positive_given_disease = 0.95

# Test has 5% false positive rate
p_positive_given_no_disease = 0.05

# What's the probability of having the disease given a positive test?
p_no_disease = 1 - p_disease
p_positive = (p_positive_given_disease * p_disease + 
              p_positive_given_no_disease * p_no_disease)

p_disease_given_positive = (p_positive_given_disease * p_disease) / p_positive

print(f"P(disease | positive test): {p_disease_given_positive:.2%}")
# Result: ~16% — even with a positive test!
# This is why base rates matter in screening.
```

---

## 🔗 Related
- [[statistics/hypothesis-testing|Hypothesis Testing]] — Applied probability
- [[statistics/descriptive-stats|Descriptive Stats]] — Understanding data distributions
- [[machine-learning/classification|Classification]] — Probabilistic classifiers
