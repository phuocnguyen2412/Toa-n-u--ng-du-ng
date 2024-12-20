import numpy as np

def eigen_decomposition(matrix):
    """
    Phân rã ma trận thành V, D và V_inverse sao cho A = V * D * V_inv
    :param matrix: Ma trận vuông cần phân rã
    :return: Ma trận V, D và V_inverse
    """
    # Tính trị riêng và vector riêng
    eigenvalues, eigenvectors = np.linalg.eig(matrix)

    # Tạo ma trận đường chéo D từ trị riêng
    D = np.diag(eigenvalues)

    # Ma trận V là ma trận các vector riêng
    V = eigenvectors

    # Tính nghịch đảo của V
    V_inv = np.linalg.inv(V)

    # Kiểm tra: Tái tạo lại ma trận A
    A_reconstructed = V @ D @ V_inv

    # In kết quả
    print("Ma trận ban đầu (A):")
    print(matrix)
    print("\nMa trận V (Vector riêng - các cột):")
    print(V)
    print("\nMa trận D (Trị riêng trên đường chéo):")
    print(D)
    print("\nMa trận V nghịch đảo (V_inv):")
    print(V_inv)
    print("\nKiểm tra A = V * D * V_inv:")
    print(A_reconstructed)

    return V, D, V_inv

# Ma trận ví dụ (ma trận vuông)
A = np.array([[4, -2],
              [1,  1]])

# Thực hiện phân rã
V, D, V_inv = eigen_decomposition(A)
