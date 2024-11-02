# Hàm cài đặt thuật toán Euclid mở rộng để tìm gcd và nghịch đảo modulo
def extendedEuclid(a, b):
    if b == 0:
        return a, 1, 0
    gcd, x1, y1 = extendedEuclid(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    return gcd, x, y


# Hàm giải phương trình Diophantine
def giaiPhuongTrinhDiophantine(a, b, c):
    gcd, x, y = extendedEuclid(a, b)

    # Nếu c không chia hết cho gcd(a, b), thì không có nghiệm
    if c % gcd != 0:
        return None

    # Nhân x và y với c/gcd để có nghiệm cụ thể
    x *= c // gcd
    y *= c // gcd

    # Hệ số k
    a_div_gcd = a // gcd
    b_div_gcd = b // gcd

    # Trả về nghiệm tổng quát: x = x0 + k * (b / gcd), y = y0 - k * (a / gcd)
    return x, y, b_div_gcd, a_div_gcd


# Nhập các hệ số a, b, c của phương trình ax + by = c
a = int(input("Nhập hệ số a: "))
b = int(input("Nhập hệ số b: "))
c = int(input("Nhập hệ số c: "))

# Giải phương trình Diophantine
nghiem = giaiPhuongTrinhDiophantine(a, b, c)

if nghiem is not None:
    x, y, k_x, k_y = nghiem
    print(
        f"Nghiệm nguyên của phương trình là: x = {x} + r * {k_x}, y = {y} - r * {k_y}"
    )
else:
    print("Phương trình vô nghiệm.")
