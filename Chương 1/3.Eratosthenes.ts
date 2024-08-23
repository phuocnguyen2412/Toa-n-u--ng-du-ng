function sieveOfEratosthenes(n: number): boolean[] {
    const primes: boolean[] = new Array(n + 1).fill(true);
    primes[0] = primes[1] = false; // 0 và 1 không phải là số nguyên tố

    for (let p = 2; p * p <= n; p++) {
        if (primes[p]) {
            // Đánh dấu các bội số của p bắt đầu từ p^2 là không phải số nguyên tố
            for (let i = p * p; i <= n; i += p) {
                primes[i] = false;
            }
        }
    }

    return primes;
}

function displayPrimes(primes: boolean[]): void {
    let soluong = 0;
    primes.forEach((isPrime, num) => {
        if (isPrime) {
            soluong++;
            console.log(num);
        }
    });
    console.log("Số lượng số nguyên tố là: " + soluong);
}

function main() {
    const n = 10000;
    const primes = sieveOfEratosthenes(n);

    console.log(`Các số nguyên tố nhỏ hơn hoặc bằng ${n}:`);
    displayPrimes(primes);
}

main();
