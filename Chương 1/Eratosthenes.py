def sieve_of_eratosthenes(n: int):
    """
    Tìm tất cả các số nguyên tố từ 2 đến n sử dụng thuật toán Sàng Eratosthenes.
    :param n: Số nguyên dương lớn nhất cần kiểm tra.
    """
    # Tạo một danh sách đánh dấu, ban đầu tất cả đều là số nguyên tố (False: nguyên tố, True: không phải nguyên tố)
    is_prime = [False] * (n + 1)

    for i in range(2, int(n**0.5) + 1):
        if not is_prime[i]:
            for j in range(i * 2, n + 1, i):
                is_prime[j] = True

    # In các số nguyên tố
    primes = [i for i in range(2, n + 1) if not is_prime[i]]
    print(" ".join(map(str, primes)))


sieve_of_eratosthenes(50)
