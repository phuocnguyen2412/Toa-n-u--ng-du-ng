import primeFactors from "./primeFactor";

const TongCacUocSoCuaN = (n: number): number => {
    const factors = primeFactors(n);
    let tong = 0;
    for (const factor in factors) {
        tong += +factor;
    }
    return tong;
};
export default TongCacUocSoCuaN