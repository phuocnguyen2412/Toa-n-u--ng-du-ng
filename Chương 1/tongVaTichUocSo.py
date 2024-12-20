from primeFactors import prime_factors
from SoLuongUocSoCuaN import SoLuongUocSo


def tongUocSoNguyenTo(n):
    factors = prime_factors(n)
    sum = 1
    for factor, power in factors.items():
        sum *= (factor ** (power + 1) - 1) / (factor - 1)
    return sum


def tichUocSoNguyenTo(n):
    so_luong_uoc = SoLuongUocSo(n)
    return n ** (so_luong_uoc / 2)


print(tongUocSoNguyenTo(84))
print(tichUocSoNguyenTo(84))
