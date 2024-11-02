function phanTichUocNguyenTo(n: number): Record<number, number> {
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
function displayFactors(factors: Record<number, number>): string {
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

function isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    let i = 5;
    while (i * i <= num) {
        if (num % i === 0) return false;
        i += 1;
    }
    return true;
}

function findClosestPrime(M: number): number {
    let low = M - 1;
    let high = M + 1;

    while (1) {
        if (isPrime(high)) {
            return high;
        }

        if (isPrime(low)) {
            return low;
        }
        high++;
        low--;
    }

    return -1;
}
const N = 20000;
if (findClosestPrime(N))
    console.log(`Số nguyên tố gần ${N} nhất là: `, findClosestPrime(N));
else console.log("Không tìm được số nguyên tố gần N");
