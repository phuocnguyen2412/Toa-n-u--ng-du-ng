from matrix import det as determinant, transpose, get_minor


def cofactor_matrix(matrix):
    """Tính ma trận phần bù đại số."""
    n = len(matrix)
    cofactor = []
    for row in range(n):
        cofactor_row = []
        for col in range(n):
            minor = get_minor(matrix, row, col)
            cofactor_row.append(((-1) ** (row + col)) * determinant(minor))
        cofactor.append(cofactor_row)
    return cofactor


def inverse_matrix(matrix):
    """Tính ma trận nghịch đảo của ma trận vuông."""
    det = determinant(matrix)
    if det == 0:
        raise Exception("Ma trận không khả nghịch (định thức bằng 0).")

    cofactor = cofactor_matrix(matrix)
    adjugate = transpose(cofactor)
    inverse = [
        [adjugate[i][j] / det for j in range(len(matrix))] for i in range(len(matrix))
    ]
    return inverse


matrix = [[1, 3, 2, 1], [0, 1, -1, -1], [0, 0, 1, 3], [0, 0, 0, 1]]
try:
    print(inverse_matrix(matrix))
except Exception as e:
    print(f"Lỗi: {e}")