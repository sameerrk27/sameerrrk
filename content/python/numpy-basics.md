---
title: NumPy Basics
tags:
  - python
  - numpy
  - arrays
---

# NumPy Basics

NumPy is the **foundation of scientific computing in Python**. Pandas is built on top of NumPy. Understanding NumPy makes you faster with Pandas and Machine Learning.

---

## 🔢 Creating Arrays

```python
import numpy as np

# From lists
arr = np.array([1, 2, 3, 4, 5])
arr_2d = np.array([[1, 2, 3], [4, 5, 6]])

# Special arrays
np.zeros((3, 4))          # 3×4 array of zeros
np.ones((2, 3))           # 2×3 array of ones
np.full((3, 3), 7)        # 3×3 array of 7s
np.eye(4)                 # 4×4 identity matrix
np.arange(0, 10, 2)       # [0, 2, 4, 6, 8]
np.linspace(0, 1, 11)     # 11 evenly spaced points from 0 to 1

# Random arrays
np.random.seed(42)
np.random.rand(3, 4)              # Uniform [0, 1)
np.random.randn(3, 4)             # Standard normal
np.random.randint(0, 100, (5, 5)) # Random integers
```

---

## 🧮 Vectorized Operations

NumPy is fast because operations apply to **entire arrays at once** — no Python loops needed.

```python
arr = np.array([1, 2, 3, 4, 5])

# Element-wise operations (broadcasting)
arr * 2              # [2, 4, 6, 8, 10]
arr ** 2             # [1, 4, 9, 16, 25]
arr + 10             # [11, 12, 13, 14, 15]
np.sqrt(arr)         # [1.0, 1.41, 1.73, 2.0, 2.24]
np.log(arr)          # Natural log
np.exp(arr)          # e^x

# Two arrays
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
a + b                # [5, 7, 9]
a * b                # [4, 10, 18]
np.dot(a, b)         # Dot product = 32
```

---

## 📊 Statistics with NumPy

```python
data = np.array([23, 45, 12, 67, 34, 89, 21, 56, 78, 43])

np.mean(data)           # Mean
np.median(data)         # Median
np.std(data)            # Standard deviation
np.var(data)            # Variance
np.min(data), np.max(data)
np.percentile(data, [25, 50, 75])   # Quartiles
np.corrcoef(data1, data2)           # Correlation matrix
```

---

## 🎯 Boolean Indexing

```python
arr = np.array([10, 25, 5, 30, 15, 40])

# Filter
arr[arr > 20]              # [25, 30, 40]
arr[(arr > 10) & (arr < 35)]   # [25, 30, 15]

# Count
np.sum(arr > 20)           # 3
np.mean(arr > 20)          # 0.5 (50% are > 20)
np.where(arr > 20)         # Indices where True

# Replace with condition
arr_copy = arr.copy()
arr_copy[arr_copy > 30] = 30   # Cap at 30 (Winsorization)
```

---

## 🔗 Related
- [[python/pandas-essentials|Pandas]] — Built on NumPy
- [[machine-learning/index|Machine Learning]] — NumPy arrays are the input to ML models
- [[statistics/index|Statistics]] — The math NumPy implements
