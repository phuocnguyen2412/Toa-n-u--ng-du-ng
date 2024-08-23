export function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}
export function extendedGCD(
    a: number,
    b: number
): { gcd: number; x: number; y: number } {
    if (b === 0) {
        return { gcd: a, x: 1, y: 0 };
    }
    const { gcd, x: x1, y: y1 } = extendedGCD(b, a % b);
    const x = y1;
    const y = x1 - Math.floor(a / b) * y1;
    return { gcd, x, y };
}
