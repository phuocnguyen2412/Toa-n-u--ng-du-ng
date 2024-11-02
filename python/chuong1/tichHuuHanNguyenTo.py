# Hàm kiểm tra một số có phải số nguyên tố không
def laSoNguyenTo(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True


# Hàm tính tích hữu hạn của các số nguyên tố từ 2 đến n
def tichSoNguyenTo(n):
    tich = 1
    for i in range(2, n + 1):
        if laSoNguyenTo(i):
            tich *= i
    return tich


# Nhập giá trị n từ người dùng
n = int(input("Nhập n: "))
ketQua = tichSoNguyenTo(n)
print(f"Tích của các số nguyên tố từ 2 đến {n} là: {ketQua}")
