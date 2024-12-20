import numpy as np


# Hàm tính định thức của ma trận
def tinhDinhThuc(A):
    return np.linalg.det(A)


def transpose(matrix: list[list[float]]) -> list[list[float]]:
    return [[row[col_index] for row in matrix] for col_index in range(len(matrix[0]))]


# Ví dụ sử dụng
A = np.array([[1, 2, 3], [0, 1, 4], [5, 6, 0]])

dinhThuc = tinhDinhThuc(A)
print("Định thức của ma trận A là:", dinhThuc)

transposed = transpose(A)
print("Ma trận chuyển vị là:")
for row in transposed:
    print(row)
