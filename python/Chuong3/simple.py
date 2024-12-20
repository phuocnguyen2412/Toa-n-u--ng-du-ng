from scipy.optimize import linprog

# 1. Hệ số của hàm mục tiêu
c = [5, 4, 5, 2, 1, 3]  # Hệ số của x1, x2, ..., x6 (cần minimize)

# 2. Hệ số của các ràng buộc phương trình (Ax = b)
A_eq = [
    [2, 4, 3, 1, 0, 0],  # Phương trình 1: 2x1 + 4x2 + 3x3 + x4 = 52
    [4, 2, 3, 0, 1, 0],  # Phương trình 2: 4x1 + 2x2 + 3x3 + x5 = 60
    [3, 0, 1, 0, 0, 1],  # Phương trình 3: 3x1 + x3 + x6 = 36
]

b_eq = [52, 60, 36]  # Các vế phải của phương trình ràng buộc

# 3. Điều kiện không âm (x >= 0)
x_bounds = [(0, None)] * 6  # Tất cả biến x1..x6 đều >= 0

# 4. Giải bài toán tối ưu bằng hàm linprog
result = linprog(c, A_eq=A_eq, b_eq=b_eq, bounds=x_bounds, method='highs')

# 5. In kết quả
if result.success:
    print("Giá trị tối ưu của hàm mục tiêu:", result.fun)
    print("Giá trị của các biến x1, x2, ..., x6:")
    for i, x in enumerate(result.x, start=1):
        print(f"x{i} = {x:.2f}")
else:
    print("Không tìm thấy nghiệm tối ưu.")
