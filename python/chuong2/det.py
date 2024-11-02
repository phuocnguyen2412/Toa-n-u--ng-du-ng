import numpy as np


# Hàm tính định thức của ma trận
def tinhDinhThuc(A):
    return np.linalg.det(A)


# Ví dụ sử dụng
A = np.array([[1, 2, 3], [0, 1, 4], [5, 6, 0]])

dinhThuc = tinhDinhThuc(A)
print("Định thức của ma trận A là:", dinhThuc)
