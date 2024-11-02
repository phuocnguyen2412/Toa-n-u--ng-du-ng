import numpy as np

# Ma trận đầu vào
A = np.array([[4, -2], [1, 1]])

# Phân rã thành eigenvalues và eigenvectors
eigenvalues, eigenvectors = np.linalg.eig(A)

# In kết quả
print("Eigenvalues:")
print(eigenvalues)

print("\nEigenvectors:")
print(eigenvectors)
