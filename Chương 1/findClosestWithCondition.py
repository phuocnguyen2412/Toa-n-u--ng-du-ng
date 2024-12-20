from is_prime import is_prime


def findClosestPrime(N, condition):
    low = N - 1
    high = N + 1

    while True:
        if condition(high):
            return high

        if condition(low):
            return low

        high += 1
        low -= 1


print(findClosestPrime(10, is_prime))
