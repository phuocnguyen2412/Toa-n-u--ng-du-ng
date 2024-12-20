from isPerfect import is_perfect_number
N = 10000
for i in range(1, N + 1):
    if is_perfect_number(i):
        print(i)
