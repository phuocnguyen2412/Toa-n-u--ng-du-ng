from matrix import is_positive_definite, is_symmetric, is_square_matrix
import math


def cholesky_decomposition(matrix: list[list[float]]) -> list[list[float]]:
    """Phân rã Cholesky của ma trận vuông đối xứng xác định dương."""
    if not is_symmetric(matrix):
        raise Exception("Ma trận không đối xứng!")
    if not is_positive_definite(matrix):
        raise Exception("Ma trận không xác định dương!")
    if not is_square_matrix(matrix):
        raise Exception("Ma trận không vuông!")
    n = len(matrix)
    # Tạo ma trận L ban đầu với các phần tử bằng 0
    L = [[0.0] * n for _ in range(n)]

    for i in range(n):
        for j in range(i + 1):
            sum_k = sum(L[i][k] * L[j][k] for k in range(j))

            if i == j:  # Phần tử đường chéo
                L[i][j] = math.sqrt(matrix[i][i] - sum_k)
            else:  # Phần tử không nằm trên đường chéo
                L[i][j] = (matrix[i][j] - sum_k) / L[j][j]

    return L


matrix = [
    [25, 15, -5],
    [15, 18, 0],
    [-5, 0, 11],
]


result = cholesky_decomposition(matrix)

try:
    result = cholesky_decomposition(matrix)
    print("Ma trận L (Cholesky decomposition):")
    for row in result:
        print(row)
except Exception as e:
    print(f"Lỗi: {e}")
