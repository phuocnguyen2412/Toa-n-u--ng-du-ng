import math


def distance(p1, p2):
    return math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2 + (p1[2] - p2[2]) ** 2)

# Hàm brute-force tính khoảng cách nhỏ nhất trong 3 điểm
def brute_force(points):
    min_dist = float('inf')
    min_pair = None
    for i in range(len(points)):
        for j in range(i + 1, len(points)):
            d = distance(points[i], points[j])
            if d < min_dist:
                min_dist = d
                min_pair = (points[i], points[j])
    return min_dist, min_pair

def closest_recursive(points_sorted_by_x, points_sorted_by_y):
    if len(points_sorted_by_x) <= 3:
        return brute_force(points_sorted_by_x)

    mid = len(points_sorted_by_x) // 2
    left_sorted_by_x = points_sorted_by_x[:mid]
    right_sorted_by_x = points_sorted_by_x[mid:]

    # Sắp xếp lại các điểm theo trục y
    left_sorted_by_y = []
    right_sorted_by_y = []
    for p in points_sorted_by_y:
        if p[0] < left_sorted_by_x[-1][0]:
            left_sorted_by_y.append(p)
        else:
            right_sorted_by_y.append(p)

    # Tìm khoảng cách nhỏ nhất trong hai nhóm
    left_min_dist, left_pair = closest_recursive(left_sorted_by_x, left_sorted_by_y)
    right_min_dist, right_pair = closest_recursive(right_sorted_by_x, right_sorted_by_y)

    # Khoảng cách nhỏ nhất giữa 2 nhóm
    if left_min_dist < right_min_dist:
        min_dist = left_min_dist
        min_pair = left_pair
    else:
        min_dist = right_min_dist
        min_pair = right_pair

    # Tạo danh sách các điểm trong vùng gần giữa
    strip = []
    for p in points_sorted_by_y:
        if abs(p[0] - points_sorted_by_x[mid][0]) < min_dist:
            strip.append(p)

    # Tìm khoảng cách trong vùng gần giữa
    min_dist_strip = min_dist
    min_pair_strip = min_pair
    for i in range(len(strip)):
        for j in range(i + 1, len(strip)):
            if strip[j][1] - strip[i][1] > min_dist:
                break
            d = distance(strip[i], strip[j])
            if d < min_dist_strip:
                min_dist_strip = d
                min_pair_strip = (strip[i], strip[j])

    if min_dist_strip < min_dist:
        return min_dist_strip, min_pair_strip
    else:
        return min_dist, min_pair

def closest_pair(points):
    # Sắp xếp các điểm theo trục x
    points.sort(key=lambda x: x[0])

    # Khởi tạo danh sách điểm sắp xếp theo trục y
    points_sorted_by_y = sorted(points, key=lambda x: x[1])

    # Gọi hàm đệ quy để tìm khoảng cách nhỏ nhất
    return closest_recursive(points, points_sorted_by_y)



points = [
    (0, 0, 1),
    (3, 4, 2),
    (7, 1, 3),
    (8, 7, 4),
    (2, 2, 5),
    (5, 5, 5),
]

result = closest_pair(points)
print(f"Khoảng cách nhỏ nhất là: {result[0]}")
print(f"Cặp điểm gần nhất là: {result[1]}")
