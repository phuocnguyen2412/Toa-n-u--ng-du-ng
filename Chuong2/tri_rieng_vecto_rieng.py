import math

from matrix import is_square_matrix
# Nhân ma trận với vecto
def matrix_vector_multiply(matrix, vector):
    result = [0] * len(matrix)
    for i in range(len(matrix)):
        result[i] = sum(matrix[i][j] * vector[j] for j in range(len(matrix[0])))
    return result


# Chuẩn hóa vecto
def normalize_vector(vector):
    norm = math.sqrt(sum(x**2 for x in vector))
    return [x / norm for x in vector]


# Phương pháp Power Iteration để tìm trị riêng lớn nhất và vecto riêng
def power_iteration(matrix, max_iter=1000, tol=1e-6):
    n = len(matrix)
    # Khởi tạo vecto ngẫu nhiên
    vector = [1] * n
    prev_vector = vector[:]
    eigenvalue = 0

    for _ in range(max_iter):
        # Nhân ma trận với vecto
        vector = matrix_vector_multiply(matrix, vector)
        # Chuẩn hóa vecto
        vector = normalize_vector(vector)
        # Tính trị riêng xấp xỉ (xấp xỉ trị riêng lớn nhất)
        eigenvalue = sum(
            vector[i] * matrix[i][j] * vector[j] for i in range(n) for j in range(n)
        ) / sum(vector[i] ** 2 for i in range(n))

        # Kiểm tra điều kiện dừng
        if all(abs(vector[i] - prev_vector[i]) < tol for i in range(n)):
            break

        prev_vector = vector[:]

    return eigenvalue, vector


# Hàm giải hệ phương trình (A - λI) * v = 0 để tìm vecto riêng
def find_eigenvector(matrix, eigenvalue):
    n = len(matrix)
    # Tạo ma trận A - λI
    I = [[1 if i == j else 0 for j in range(n)] for i in range(n)]
    A_lambda = [
        [matrix[i][j] - eigenvalue * I[i][j] for j in range(n)] for i in range(n)
    ]

    # Giải hệ phương trình (A - λI) * v = 0, sử dụng phương pháp Gauss hoặc lặp lại
    v = [1] * n  # Khởi tạo vecto ngẫu nhiên
    for _ in range(100):
        v_new = matrix_vector_multiply(A_lambda, v)
        norm = math.sqrt(sum(val**2 for val in v_new))
        v_new = [val / norm for val in v_new]  # Chuẩn hóa vecto
        if all(abs(v_new[i] - v[i]) < 1e-6 for i in range(n)):
            break
        v = v_new
    return v


def find_all_eigenvalues_and_eigenvectors(matrix):
    if not is_square_matrix(matrix):
        raise Exception("Ma trận không phải là ma trận vuông")
    n = len(matrix)
    eigenvalues = []
    eigenvectors = []

    for _ in range(n):
        # Tìm trị riêng lớn nhất
        eigenvalue, eigenvector = power_iteration(matrix)
        eigenvalues.append(eigenvalue)
        eigenvectors.append(find_eigenvector(matrix, eigenvalue))

        # Loại bỏ trị riêng đã tìm được khỏi ma trận bằng cách thực hiện phép trừ cho ma trận A
        for i in range(n):
            for j in range(n):
                matrix[i][j] -= eigenvalue * eigenvector[i] * eigenvector[j]

    return eigenvalues, eigenvectors



matrix = [[4, -2, 2], [1, 3, 3], [2, 5, 3]]
try:
    eigenvalues, eigenvectors = find_all_eigenvalues_and_eigenvectors(matrix)
except:
    print("Ma trận không phải là ma trận vuông")
    exit()

print("Các trị riêng:")
for eigenvalue in eigenvalues:
    print(eigenvalue)

print("\nCác vecto riêng tương ứng:")
for eigenvector in eigenvectors:
    print(eigenvector)

