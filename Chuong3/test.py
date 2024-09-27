def closest_pair(points):
    def distance(p1, p2):
        return ((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2) ** 0.5

    def closest_pair_rec(points_sorted_x, points_sorted_y):
        n = len(points_sorted_x)
        if n <= 3:
            # Nếu chỉ có 3 điểm hoặc ít hơn, tính khoảng cách brute force
            return min(
                (
                    distance(points_sorted_x[i], points_sorted_x[j]),
                    points_sorted_x[i],
                    points_sorted_x[j],
                )
                for i in range(n)
                for j in range(i + 1, n)
            )

        # Chia đôi tập điểm
        mid = n // 2
        midpoint = points_sorted_x[mid]

        # Chia các điểm theo hoành độ và tung độ
        left_x = points_sorted_x[:mid]
        right_x = points_sorted_x[mid:]
        left_y = list(filter(lambda p: p[0] <= midpoint[0], points_sorted_y))
        right_y = list(filter(lambda p: p[0] > midpoint[0], points_sorted_y))

        # Gọi đệ quy
        d_left = closest_pair_rec(left_x, left_y)
        d_right = closest_pair_rec(right_x, right_y)

        # Tìm khoảng cách nhỏ hơn
        d_min = min(d_left, d_right, key=lambda x: x[0])

        # Tìm các điểm gần đường chia
        strip = [p for p in points_sorted_y if abs(p[0] - midpoint[0]) < d_min[0]]

        # Kiểm tra các điểm gần đường chia (theo trục y)
        for i in range(len(strip)):
            for j in range(i + 1, min(i + 7, len(strip))):
                d_strip = distance(strip[i], strip[j])
                if d_strip < d_min[0]:
                    d_min = (d_strip, strip[i], strip[j])

        return d_min

    # Sắp xếp các điểm theo tọa độ x và y
    points_sorted_x = sorted(points, key=lambda p: p[0])
    points_sorted_y = sorted(points, key=lambda p: p[1])

    return closest_pair_rec(points_sorted_x, points_sorted_y)


print(
    closest_pair(
        [
            [0, 0],
            [3, 4],
            [7, 1],
            [8, 7],
            [2, 2],
            [5, 5],
        ]
    )
)
