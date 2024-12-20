from gcd import extended_gcd


def solveDiophantine(a, b, c):

    result = extended_gcd(a, b)
    gcd, x, y = result["gcd"], result["x"], result["y"]
    
    if c % gcd != 0:
        print("Phương trình vô nghiệm")

    x0 = x * (c / gcd)
    y0 = y * (c / gcd)
    
    print(
        f"Nghiệm nguyên của phương trình là: x = {x0} + r.{b}/{gcd}, y = {y0} - r.{a}/{gcd}"
    )

solveDiophantine(7.0, 11.0, 13.0)