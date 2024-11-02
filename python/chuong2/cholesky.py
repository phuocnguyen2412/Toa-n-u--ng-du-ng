import numpy as np


# Hàm thực hiện phân rã Cholesky
def cholesky_decomposition(A):
    n = len(A)
    L = np.zeros((n, n))

    for i in range(n):
        for j in range(i + 1):
            sum_k = sum(L[i][k] * L[j][k] for k in range(j))

            if i == j:
                L[i][j] = np.sqrt(A[i][i] - sum_k)
            else:
                L[i][j] = (A[i][j] - sum_k) / L[j][j]

    return L


# Ví dụ sử dụng
A = np.array([[25, 15, -5], [15, 18, 0], [-5, 0, 11]])

L = cholesky_decomposition(A)

print("Ma trận tam giác dưới L:")
print(L)

print("\nKiểm tra lại (L * L.T):")
print(np.dot(L, L.T))
