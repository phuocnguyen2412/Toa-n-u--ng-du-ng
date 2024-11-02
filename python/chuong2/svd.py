import numpy as np

# Ma trận đầu vào
A = np.array([[1, -8], [0, 1], [1, 0]])

# Phân rã SVD
U, S, Vt = np.linalg.svd(A)

# In kết quả
print("U:", U)


print("Sigma:", S)


print("Vt:", Vt)
