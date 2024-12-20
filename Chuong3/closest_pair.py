import math


class Diem3D:
    def __init__(self, x: float, y: float, z: float):
        self.x = x
        self.y = y
        self.z = z


class ClosestPair:
    def __init__(self, danh_sach_diem: list[Diem3D]):
        self.danh_sach_diem = danh_sach_diem

    @staticmethod
    def khoang_cach(diem1: Diem3D, diem2: Diem3D) -> float:
        """
        Tính khoảng cách giữa hai điểm trong không gian 3D.
        """
        return math.sqrt(
            (diem2.x - diem1.x) ** 2
            + (diem2.y - diem1.y) ** 2
            + (diem2.z - diem1.z) ** 2
        )

    def tim_bang_manh(self, trai: int, phai: int) -> dict:
        """
        Tìm khoảng cách ngắn nhất giữa hai điểm bằng phương pháp brute force.
        """
        min_dist = float("inf")
        diem_gan_nhat = (self.danh_sach_diem[trai], self.danh_sach_diem[trai + 1])

        for i in range(trai, phai + 1):
            for j in range(i + 1, phai + 1):
                dist = self.khoang_cach(self.danh_sach_diem[i], self.danh_sach_diem[j])
                if dist < min_dist:
                    min_dist = dist
                    diem_gan_nhat = (self.danh_sach_diem[i], self.danh_sach_diem[j])

        return {"khoang_cach": min_dist, "diem": diem_gan_nhat}

    def strip_gan_nhat(
        self, strip: list[Diem3D], d: float, diem_gan_nhat: tuple
    ) -> dict:
        """
        Tìm khoảng cách ngắn nhất giữa các điểm trong strip.
        """
        min_dist = d
        diem_min = diem_gan_nhat

        strip.sort(key=lambda p: p.y)

        for i in range(len(strip)):
            for j in range(i + 1, len(strip)):
                if strip[j].y - strip[i].y >= min_dist:
                    break
                dist = self.khoang_cach(strip[i], strip[j])
                if dist < min_dist:
                    min_dist = dist
                    diem_min = (strip[i], strip[j])

        return {"khoang_cach": min_dist, "diem": diem_min}

    def tim_diem_gan_nhat(self, trai: int, phai: int) -> dict:
        """
        Hàm đệ quy tìm khoảng cách ngắn nhất giữa hai điểm.
        """
        if phai - trai <= 3:
            return self.tim_bang_manh(trai, phai)

        giua = (trai + phai) // 2
        diem_giua = self.danh_sach_diem[giua]

        dl = self.tim_diem_gan_nhat(trai, giua)
        dr = self.tim_diem_gan_nhat(giua + 1, phai)

        d = dl if dl["khoang_cach"] < dr["khoang_cach"] else dr

        strip = [
            self.danh_sach_diem[i]
            for i in range(trai, phai + 1)
            if abs(self.danh_sach_diem[i].x - diem_giua.x) < d["khoang_cach"]
        ]

        return self.strip_gan_nhat(strip, d["khoang_cach"], d["diem"])

    def diem_gan_nhat(self) -> dict:
        """
        Hàm chính để tìm khoảng cách ngắn nhất giữa hai điểm.
        """
        self.danh_sach_diem.sort(key=lambda p: p.x)
        return self.tim_diem_gan_nhat(0, len(self.danh_sach_diem) - 1)


# Dữ liệu đầu vào
diem = [
    Diem3D(0, 0, 1),
    Diem3D(3, 4, 2),
    Diem3D(7, 1, 3),
    Diem3D(8, 7, 4),
    Diem3D(2, 2, 5),
    Diem3D(5, 5, 5),
]

# Tìm kết quả
solution = ClosestPair(diem)
ket_qua = solution.diem_gan_nhat()

print(
    "Khoảng cách ngắn nhất giữa 2 điểm là:",
    ket_qua["khoang_cach"],
    "giữa các điểm",
    f"({ket_qua['diem'][0].x}, {ket_qua['diem'][0].y}, {ket_qua['diem'][0].z}) và "
    f"({ket_qua['diem'][1].x}, {ket_qua['diem'][1].y}, {ket_qua['diem'][1].z})",
)
