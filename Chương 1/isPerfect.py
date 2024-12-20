def is_perfect_number(num: int) -> bool:
    if num <= 1:
        return False
    
    divisor_sum = sum(i for i in range(1, num // 2 + 1) if num % i == 0)
    
    return divisor_sum == num