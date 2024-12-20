import numpy as np
from numpy import linalg as LA


A = [
    [1, 2, 3],
    [4, 5, 6]
]

U, S, V = LA.svd(A)

# Checking if U, V are orthogonal and S is a diagonal matrix with
# nonnegative decreasing elements
# Kết quả
print("U:")
for row in U:
    print(row)

print("\nSigma:")
for row in S:
    print(row)

print("\nV:")
for row in V:
    print(row)



