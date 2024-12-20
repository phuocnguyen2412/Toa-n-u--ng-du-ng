from gcd import gcd, extended_gcd


def chinese_remainder_theorem(a: list[int], m: list[int]):
    """
    Giải hệ phương trình thặng dư Trung Hoa.
    :param a: Danh sách các số dư.
    :param m: Danh sách các mô-đun.
    """
    n = len(a)

    # Kiểm tra tính nguyên tố cùng nhau của các mô-đun
    for i in range(n):
        for j in range(i + 1, n):
            if gcd(m[i], m[j]) != 1:
                print(
                    "Các mô-đun không nguyên tố cùng nhau. Không thể áp dụng định lý thặng dư Trung Hoa."
                )
                print("Không tìm được nghiệm.")

    x = 0
    M = 1

    # Tính tích tất cả các mô-đun
    for mi in m:
        M *= mi

    # Tính nghiệm
    for i in range(n):
        Mi = M // m[i]
        inverse = extended_gcd(Mi, m[i])["x"]
        x = (x + a[i] * Mi * inverse) % M

    result = (x + M) % M

    print(f"Nghiệm của hệ phương trình thặng dư Trung Hoa là x = {result} (mod {M})")


a = [4, 5, 8, 9]
m = [5, 7, 9, 11]

chinese_remainder_theorem(a, m)
