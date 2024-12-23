import math
def distance(a, b):
    return math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)

# Hàm tính tích chéo
def cross(o, a, b):
    """Tính tích chéo OA x OB nếu kết quả > 0 là góc lồi, < 0 là góc lõm, = 0 là thẳng."""
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

def convex_hull_perimeter(points):
    n = len(points)
    if n < 2:
        return 0
    perimeter = 0
    for i in range(n):
        j = (i + 1) % n
        perimeter += distance(points[i], points[j])
    return perimeter

# Hàm tính diện tích đa giác
def polygon_area(points):
    n = len(points)
    if n < 3:
        return 0
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
    (-4, 2), (-3, -2), (-1, 4), (-1, -4), (0, 0), (1, -2), (1, -4),
    (-2, 3), (3, 4), (5, 2)
]

# Tính bao lồi
hull = convex_hull(points)
print("Bao lồi:", hull)

# Tính diện tích bao lồi
area = polygon_area(hull)
print("Diện tích bao lồi:", area)

#tính chu vi bao lồi
perimeter = convex_hull_perimeter(hull)
print("Chu vi bao lồi:", perimeter)