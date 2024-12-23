import numpy as np
from scipy.spatial import distance

diem = [
    (0, 0, 1),
    (3, 4, 2),
    (7, 1, 3),
    (8, 7, 4),
    (2, 2, 5),
    (5, 5, 5),
]

diem_array = np.array(diem)

# Tính ma trận khoảng cách Euclid giữa các điểm
khoang_cach = distance.cdist(diem_array, diem_array, 'euclidean')

# Đặt khoảng cách của các điểm với chính nó thành vô cực để không tính chúng
np.fill_diagonal(khoang_cach, np.inf)

# Tìm chỉ số của hai điểm có khoảng cách nhỏ nhất
i, j = np.unravel_index(np.argmin(khoang_cach), khoang_cach.shape)

# Lấy cặp điểm gần nhất và khoảng cách nhỏ nhất
diem_gan_nhat = (diem[i], diem[j])
khoang_cach_nhat = khoang_cach[i, j]

# Kết quả
print("Cặp điểm gần nhất là:", diem_gan_nhat)
print("Khoảng cách giữa chúng là:", khoang_cach_nhat)
