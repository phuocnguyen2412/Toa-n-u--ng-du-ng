import primeFactors from "./primeFactor";

const TongCacUocSoCuaN = (n: number): number => {
    let tong = 0;
    for (let i = 1; i <= n / 2; i++) {
        if (n % i === 0) tong += i;
    }
    return tong + n;
};
console.log(TongCacUocSoCuaN(20000));
const TichCacUocSoCuaN = (n: number): number => {
    let tich = 1;
    for (let i = 1; i <= n / 2; i++) {
        if (n % i === 0) tich *= i;
    }
    return tich * n;
};
console.log(TongCacUocSoCuaN(20000));
console.log(TichCacUocSoCuaN(20000));

export default TongCacUocSoCuaN;
