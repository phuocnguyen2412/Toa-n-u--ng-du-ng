function aMuMModN(a: number, m: number, n: number): number {
    let result = 1;
    a = a % n;

    while (m > 0) {
        if (m % 2 === 1) {
            result = (result * a) % n;
        }

        m = Math.floor(m / 2);
        a = (a * a) % n;
    }

    return result;
}

// Example usage:
(() => {
    const a = 3;
    const m = 3;
    const n = 4;
    console.log(aMuMModN(a, m, n));
})();
