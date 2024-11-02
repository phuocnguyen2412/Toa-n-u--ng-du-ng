from scipy.optimize import linprog

# Hệ số của hàm mục tiêu
c = [-5, -8, 0, 0]  # Ví dụ với hàm mục tiêu max z = x1 + 2*x2, chuyển thành min -x1 - 2*x2

# Hệ số của ràng buộc bất đẳng thức (dạng Ax <= b)
A = [ [1, 2, 1, 0],
    [1, 1, 0, 1],]
b = [1, 2]

# Giải bài toán quy hoạch tuyến tính
result = linprog(c, A_ub=A, b_ub=b, method="simplex")

# Hiển thị kết quả
if result.success:
    print("Giá trị tối ưu của hàm mục tiêu:", -result.fun)  # Đổi dấu vì đã dùng dạng min
    print("Giá trị của các biến quyết định (x):", result.x)
else:
    print("Không tìm thấy nghiệm tối ưu")
