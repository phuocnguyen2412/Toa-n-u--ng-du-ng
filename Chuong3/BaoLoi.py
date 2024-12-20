import math


# Hàm tính tích chéo 
def cross(o, a, b):
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])


# Hàm tính diện tích đa giác
def polygon_area(points):
    n = len(points)
    area = 0
    for i in range(n):
        j = (i + 1) % n
        area += points[i][0] * points[j][1] - points[j][0] * points[i][1]
    return abs(area) / 2.0


# Hàm tính bao lồi
def convex_hull(points):
    points = sorted(points)  # Sắp xếp các điểm theo hoành độ và tung độ
    lower = []
    for p in points:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)

    upper = []
    for p in reversed(points):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)

    return lower[:-1] + upper[:-1]  # Loại bỏ điểm trùng ở đầu và cuối


# Ví dụ sử dụng
points = [
    (1, 2),
    (2, 5),
    (3, 4),
    (4, 3),
    (5, 4),
    (6, 1),
    (7, 5),
]

# Tính bao lồi
hull = convex_hull(points)
print("Bao lồi:", hull)

# Tính diện tích bao lồi
area = polygon_area(hull)
print("Diện tích bao lồi:", area)
