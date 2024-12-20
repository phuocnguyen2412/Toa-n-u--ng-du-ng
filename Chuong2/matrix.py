import math


def det(matrix: list[list[float]]) -> float:
    n = len(matrix)

    if n == 1:
        return matrix[0][0]

    if n == 2:
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]

    result = 0
    for i in range(n):

        sub_matrix = [row[:i] + row[i + 1 :] for row in matrix[1:]]

        result += matrix[0][i] * det(sub_matrix) * (-1 if i % 2 else 1)

    return result


def is_positive_definite(matrix: list[list[float]]) -> bool:
    """Kiểm tra ma trận có xác định dương không bằng cách thử tính các định thức con."""

    n = len(matrix)
    for i in range(1, n + 1):
        sub_matrix = [[matrix[r][c] for c in range(i)] for r in range(i)]
        if det(sub_matrix) <= 0:
            return False
    return True


def is_square_matrix(matrix: list[list[float]]) -> bool:
    """Kiểm tra ma trận có phải là ma trận vuông hay không."""
    num_rows = len(matrix)
    for row in matrix:
        if len(row) != num_rows:
            return False
    return True


def is_symmetric(matrix: list[list[float]]) -> bool:
    """Kiểm tra ma trận có đối xứng không."""
    n = len(matrix)
    for i in range(n):
        for j in range(n):
            if matrix[i][j] != matrix[j][i]:
                return False
    return True


def get_minor(matrix, row, col):
    """Trả về ma trận con bằng cách loại bỏ hàng row và cột col."""
    return [r[:col] + r[col + 1 :] for r in (matrix[:row] + matrix[row + 1 :])]


def transpose(matrix: list[list[float]]) -> list[list[float]]:
    return [[row[col_index] for row in matrix] for col_index in range(len(matrix[0]))]


def dot_product(vector1, vector2):
    """Tính tích vô hướng của 2 vector."""
    return sum(x * y for x, y in zip(vector1, vector2))


def scalar_multiply(scalar, matrix):
    """Nhân ma trận với một hằng số."""
    return [[scalar * cell for cell in row] for row in matrix]


def subtract_matrices(A, B):
    """Trừ 2 ma trận."""
    return [[A[i][j] - B[i][j] for j in range(len(A[0]))] for i in range(len(A))]


def matrix_multiply(A, B):
    """Nhân hai ma trận A và B."""
    rows_A, cols_A = len(A), len(A[0])
    rows_B, cols_B = len(B), len(B[0])

    if cols_A != rows_B:
        raise ValueError("Ma trận không thể nhân được")

    result = [[0] * cols_B for _ in range(rows_A)]
    for i in range(rows_A):
        for j in range(cols_B):
            result[i][j] = sum(A[i][k] * B[k][j] for k in range(cols_A))
    return result

def identity_matrix(n):
    return [[1 if i == j else 0 for j in range(n)] for i in range(n)]

matrix = [[1, 2, 3], [0, 1, 4], [5, 6, 0]]


print("Determinant của ma trận là:", det(matrix))
print("transpose: ", transpose(matrix))
