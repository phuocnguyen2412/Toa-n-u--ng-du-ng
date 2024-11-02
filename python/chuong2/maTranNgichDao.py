import numpy as np


# Hàm tính ma trận nghịch đảo
def nghichDaoMaTran(A):
    try:
        return np.linalg.inv(A)
    except np.linalg.LinAlgError:
        return None


# Ví dụ sử dụng
A = np.array([[1, 2, 3], [0, 1, 4], [5, 6, 0]])

maTranNghichDao = nghichDaoMaTran(A)

if maTranNghichDao is not None:
    print("Ma trận nghịch đảo của A là:")
    print(maTranNghichDao)
else:
    print("Ma trận A không khả nghịch.")
