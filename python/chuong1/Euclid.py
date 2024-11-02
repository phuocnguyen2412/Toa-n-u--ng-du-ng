# Hàm cài đặt thuật toán Euclid
def euclidGCD(a, b):
    while b != 0:
        a, b = b, a % b
    return a


# Nhập hai số và tính GCD
a = int(input("Nhập số a: "))
b = int(input("Nhập số b: "))
ketQua = euclidGCD(a, b)
print(f"Ước chung lớn nhất của {a} và {b} là: {ketQua}")
