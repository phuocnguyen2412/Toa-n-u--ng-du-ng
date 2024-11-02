// Hàm để phân tích số n thành các thừa số nguyên tố
function phanTichThuaSoNguyenTo(n: number): Record<number, number> {
    const factors: Record<number, number> = {};
    let divisor = 2;

    while (n >= 2) {
        if (n % divisor === 0) {
            factors[divisor] = (factors[divisor] || 0) + 1;
            n /= divisor;
        } else {
            divisor++;
        }
    }

    return factors;
}

function dinhDangThuaSoNguyenTo(n: number): string {
    const factors = phanTichThuaSoNguyenTo(n);

    const formatted = Object.keys(factors)
        .map((prime) => `${prime}^${factors[Number(prime)]}`)
        .join(".");

    return `${n} = ${formatted}`;
}

// Hàm tính tổng các ước số
function tongUocSo(n: number): number {
    const factors = phanTichThuaSoNguyenTo(n);
    let sum = 1;

    for (const prime in factors) {
        const alpha = factors[prime];
        sum *= (Math.pow(Number(prime), alpha + 1) - 1) / (Number(prime) - 1);
    }

    return sum;
}

// Hàm tính số lượng các ước
function soLuongUocSo(n: number): number {
    const factors = phanTichThuaSoNguyenTo(n);
    return Object.values(factors).reduce((acc, alpha) => acc * (alpha + 1), 1);
}

// Hàm tính tích các ước số
function tichUocSo(n: number): number {
    const tau = soLuongUocSo(n);
    return Math.pow(n, tau / 2);
}

// Kiểm tra với n = 20000
const n = 20000;
console.log(dinhDangThuaSoNguyenTo(n));
console.log(`Tổng các ước số của ${n} là: ${tongUocSo(n)}`);
console.log(`Tích các ước số của ${n} là: ${tichUocSo(n)}`);
