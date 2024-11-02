# Hàm cài đặt thuật toán Euclid mở rộng để tìm gcd và nghịch đảo modulo
def extendedEuclid(a, b):
    if b == 0:
        return a, 1, 0
    gcd, x1, y1 = extendedEuclid(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    return gcd, x, y


# Hàm giải hệ phương trình thặng dư Trung Hoa
def giaiHePhuongTrinhTrungHoa(a, m):
    x = 0
    M = 1
    # Tính M = m1 * m2 * ... * mk
    for mi in m:
        M *= mi
    # Tính nghiệm của hệ
    for ai, mi in zip(a, m):
        Mi = M // mi
        gcd, inv, _ = extendedEuclid(Mi, mi)
        if gcd != 1:
            return None
        x += ai * inv * Mi
    return x % M, M  # Trả về k và M để biểu diễn x ≡ k (mod M)


# Nhập danh sách a1, a2,..., ak và m1,..., mk
a = [4, 5, 8, 9]
m = [5, 7, 9, 11]

# Giải hệ phương trình thặng dư Trung Hoa
ketQua = giaiHePhuongTrinhTrungHoa(a, m)
if ketQua is not None:
    x, M = ketQua
    print(f"Nghiệm của hệ thặng dư Trung Hoa là: x ≡ {x} (mod {M})")
else:
    print("Không thể giải hệ thặng dư Trung Hoa.")
