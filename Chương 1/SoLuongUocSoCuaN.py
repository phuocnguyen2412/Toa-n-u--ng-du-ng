from primeFactors import prime_factors


def SoLuongUocSo(n: int) -> int:
    """
    Tính số lượng ước số của một số nguyên dương n.
    :param n: Số nguyên dương cần tính số lượng ước số.
    :return: Số lượng ước số.
    """
    if n <= 0:
        raise ValueError("n phải là số nguyên dương.")

    factor = prime_factors(n)
    result = 1
    for _, b in factor.items():
        result *= b + 1
    return result


print(SoLuongUocSo(84))
