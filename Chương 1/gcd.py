def gcd(a: int, b: int) -> int:
    """Tính ước số chung lớn nhất (USCLN) của a và b."""
    return a if b == 0 else gcd(b, a % b)

def extended_gcd(a: int, b: int) -> dict:
    """
    Tính USCLN của a và b, đồng thời tìm x, y thỏa mãn:
    ax + by = gcd(a, b)
    """
    if b == 0:
        return {"gcd": a, "x": 1, "y": 0}
    result = extended_gcd(b, a % b)
    gcd_val, x1, y1 = result["gcd"], result["x"], result["y"]
    x = y1
    y = x1 - (a // b) * y1
    return {"gcd": gcd_val, "x": x, "y": y}
