def euclid(a, b):
    while b != 0:
        a, b = b, a % b
    return a


print(euclid(110, 50))
