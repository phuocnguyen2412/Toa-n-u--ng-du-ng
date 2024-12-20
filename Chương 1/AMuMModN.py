def a_mu_m_mod_n(a: float, m: int, n: int) -> int:
    """
    Tính a^m mod n.
    :param a: Số cơ sở.
    :param m: Số mũ.
    :param n: Số mô-đun.
    :return: Kết quả a^m mod n.
    """
    result = 1
    a = a % n

    while m > 0:
        if m % 2 == 1:
            result = (result * a) % n
        m = m // 2
        a = (a * a) % n

    return result
