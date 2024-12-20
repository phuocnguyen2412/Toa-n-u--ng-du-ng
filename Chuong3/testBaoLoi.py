from scipy.spatial import ConvexHull
import numpy as np

# Dữ liệu đầu vào
diem = [
    (1, 2),
    (2, 5),
    (3, 4),
    (4, 3),
    (5, 4),
    (6, 1),
    (7, 5),
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
dien_tich = hull.area  # Diện tích
print("Diện tích bao lồi là:", dien_tich)

# Nếu cần vẽ bao lồi:
import matplotlib.pyplot as plt

plt.plot(diem_array[:, 0], diem_array[:, 1], "o", label="Các điểm ban đầu")
for simplex in hull.simplices:
    plt.plot(diem_array[simplex, 0], diem_array[simplex, 1], "k-")
plt.fill(bao_loi[:, 0], bao_loi[:, 1], alpha=0.3, label="Bao lồi")
plt.legend()
plt.show()
