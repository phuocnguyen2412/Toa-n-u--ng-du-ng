function primeFactors(n: number): Record<number, number> {
    let i = 2;
    const factors: Record<number, number> = {};

    while (i * i <= n) {
        while (n % i === 0) {
            if (factors[i]) {
                factors[i] += 1;
            } else {
                factors[i] = 1;
            }
            n /= i;
        }
        i += 1;
    }

    if (n > 1) {
        factors[n] = 1;
    }

    return factors;
}
export function displayFactors(factors: Record<number, number>): string {
    const result: string[] = [];

    for (const prime in factors) {
        const exponent = factors[prime];
        if (exponent === 1) {
            result.push(`${prime}`);
        } else {
            result.push(`${prime}^${exponent}`);
        }
    }

    return result.join(" . ");
}

export default primeFactors;
