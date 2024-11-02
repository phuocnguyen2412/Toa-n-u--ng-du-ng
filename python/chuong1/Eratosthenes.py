# Hàm thực hiện sàng Eratosthenes
def sangEratosthenes(n):
    soNguyenTo = [True] * (n + 1)
    soNguyenTo[0], soNguyenTo[1] = False, False
    for i in range(2, int(n**0.5) + 1):
        if soNguyenTo[i]:
            for j in range(i * i, n + 1, i):
                soNguyenTo[j] = False
    return [i for i in range(n + 1) if soNguyenTo[i]]


# Nhập n và thực hiện sàng Eratosthenes
n = 100000000
soNguyenTo = sangEratosthenes(n)
print(f"Đã tìm được {len(soNguyenTo)} số nguyên tố đến {n}")
