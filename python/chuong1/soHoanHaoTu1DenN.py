# Hàm kiểm tra số hoàn hảo
def laSoHoanHao(n):
    tongUoc = 1
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            tongUoc += i
            if i != n // i:
                tongUoc += n // i
    return tongUoc == n


# Tìm tất cả các số hoàn hảo từ 1 đến n
def timSoHoanHao(n):
    cacSoHoanHao = []
    for i in range(2, n + 1):
        if laSoHoanHao(i):
            cacSoHoanHao.append(i)
    return cacSoHoanHao


# Nhập giá trị n từ người dùng
n = int(input("Nhập n: "))
ketQua = timSoHoanHao(n)
print(f"Các số hoàn hảo từ 1 đến {n}: {ketQua}")
