from scipy.spatial import ConvexHull
import numpy as np

# Dữ liệu đầu vào
diem = [
    (-4, 2), (-3, -2), (-1, 4),(-1,-4), (0, 0), (1, -2), (1, -4), (-2, 3), (3, 4), (5,2)
]

# Chuyển danh sách điểm thành mảng NumPy
diem_array = np.array(diem)

# Tìm bao lồi
hull = ConvexHull(diem_array)

# Lấy các điểm trên bao lồi
bao_loi = diem_array[hull.vertices]
print("Các điểm trên bao lồi là:")
for point in bao_loi:
    print(tuple(point))

# Tính diện tích bao lồi
dien_tich = hull.volume  # Diện tích
print("Diện tích bao lồi là:", dien_tich)

chu_vi = hull.area  # Chu vi
print("Chu vi bao lồi là:", chu_vi)

