import numpy as np

# Bài toán tối ưu tuyến tính
c = np.array([5, 4, 5, 2, 1, 3])  # Hệ số của hàm mục tiêu
A = np.array([
    [2, 4, 3, 1, 0, 0],  # Ràng buộc 1
    [4, 2, 3, 0, 1, 0],  # Ràng buộc 2
    [3, 0, 1, 0, 0, 1],  # Ràng buộc 3
])

b = np.array([52, 60, 36])  # Các vế phải

# Bước 2: Khởi tạo bảng Simplex
m, n = A.shape
# Thêm các biến slack vào ma trận A
A = np.hstack((A, np.eye(m)))
# Thêm các hệ số cho các biến slack (các biến này không ảnh hưởng đến hàm mục tiêu)
c = np.concatenate((c, np.zeros(m)))

# Tạo bảng Simplex
tableau = np.hstack((A, np.reshape(b, (m, 1))))
tableau = np.vstack((tableau, np.concatenate((c, [0]))))  # Thêm hàng cho hàm mục tiêu
print(tableau)
# Phương pháp Simplex
def simplex(tableau):
    m, n = tableau.shape

    while True:
        # Tìm cột pivot: chọn cột có giá trị âm lớn nhất trong hàng hàm mục tiêu
        pivot_col = np.argmin(tableau[-1, :-1])

        # Nếu tất cả các giá trị trong hàng hàm mục tiêu >= 0 thì dừng lại
        if tableau[-1, pivot_col] >= 0:
            break

        # Tìm hàng pivot: chọn hàng có tỉ lệ b/cột pivot nhỏ nhất
        ratios = tableau[:-1, -1] / tableau[:-1, pivot_col]
        ratios[ratios < 0] = np.inf  # Bỏ qua các tỉ lệ âm
        pivot_row = np.argmin(ratios)

        # Chia hàng pivot để biến pivot trở thành 1
        tableau[pivot_row] /= tableau[pivot_row, pivot_col]

        # Cập nhật các hàng khác
        for i in range(m + 1):
            if i != pivot_row:
                tableau[i] -= tableau[i, pivot_col] * tableau[pivot_row]

    return tableau

# Tính toán bảng Simplex
tableau = simplex(tableau)

# Trích xuất giá trị tối ưu và nghiệm
optimal_value = tableau[-1, -1]
solution = tableau[:-1, -1]

# In kết quả
print(f"Giá trị tối ưu của hàm mục tiêu: {optimal_value:.2f}")
print("Giá trị của các biến x1, x2, ..., x6:")
for i in range(len(solution)):
    print(f"x{i+1} = {solution[i]:.2f}")
