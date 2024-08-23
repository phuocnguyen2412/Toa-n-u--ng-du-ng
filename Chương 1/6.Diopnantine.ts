import { extendedGCD } from "./gcd";


function solveDiophantine(a: number, b: number, c: number): void {
    const { gcd, x, y } = extendedGCD(a, b);

    if (c % gcd !== 0) {
        console.log("Phương trình vô nghiệm.");
        return;
    }

    const x0 = x * (c / gcd);
    const y0 = y * (c / gcd);

    console.log(
        `Nghiệm nguyên của phương trình là: x = ${x0} + r.${b}/${gcd}, y = ${y0} - r.${a}/${gcd}`
    );
}

// Ví dụ sử dụng:

solveDiophantine(7, 11, 13);
