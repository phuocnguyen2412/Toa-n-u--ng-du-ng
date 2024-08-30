import primeFactors from "./primeFactor";

const TongCacUocSoCuaN = (n: number): number => {
    let tong = 0;
    for (let i = 1; i <= n / 2; i++) {
        if (n % i === 0) tong += i;
    }
    return tong + n;
};
console.log(TongCacUocSoCuaN(6));

export default TongCacUocSoCuaN;
