def prime_factors(n: int) -> dict[int, int]:
    """
    Tính các thừa số nguyên tố của số n và trả về dưới dạng từ điển
    với thừa số làm key và số mũ làm value.
    """
    i = 2
    factors = {}

    while i * i <= n:
        while n % i == 0:
            if i in factors:
                factors[i] += 1
            else:
                factors[i] = 1
            n //= i
        i += 1

    if n > 1:
        factors[n] = 1

    return factors


def display_factors(factors: dict[int, int]) -> str:
    """
    Hiển thị các thừa số nguyên tố dưới dạng chuỗi, ví dụ: "2^3 . 3^1".
    """
    result = []
    for prime, exponent in factors.items():
        if exponent == 1:
            result.append(f"{prime}")
        else:
            result.append(f"{prime}^{exponent}")

    return " . ".join(result)



