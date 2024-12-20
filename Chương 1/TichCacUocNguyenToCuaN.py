from primeFactors import prime_factors, display_factors


input_list = [20000]

for input_number in input_list:
    factors = prime_factors(input_number)
    factor_string = display_factors(factors)
    print(f"{input_number} = {factor_string}")
