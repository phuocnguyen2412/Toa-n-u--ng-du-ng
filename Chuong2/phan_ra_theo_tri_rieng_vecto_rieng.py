from inverse_matrix import inverse_matrix as inverse
from tri_rieng_vecto_rieng import find_all_eigenvalues_and_eigenvectors
def eigen_decomposition(matrix):
    n = len(matrix)
    eigenvalues, eigenvectors = find_all_eigenvalues_and_eigenvectors(matrix)
    # Xây dựng ma trận V và D
    V = [list(col) for col in zip(*eigenvectors)]  # Chuyển vector riêng thành ma trận V
    D = [[eigenvalues[i] if i == j else 0 for j in range(n)] for i in range(n)]  # Ma trận đường chéo

    # Tính V_inverse
    V_inverse = inverse(V)

    # In kết quả
    print("Ma trận ban đầu (A):")
    print(matrix)
    print("\nMa trận V (Vector riêng - các cột):")
    for row in V:
        print(row)
    print("\nMa trận D (Trị riêng trên đường chéo):")
    for row in D:
        print(row)
    print("\nMa trận V nghịch đảo (V_inv):")
    for row in V_inverse:
        print(row)

A = [
    [4, -2],
    [1, 1]
]
eigen_decomposition(A)