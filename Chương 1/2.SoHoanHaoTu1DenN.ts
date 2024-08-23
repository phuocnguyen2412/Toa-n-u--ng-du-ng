import TongCacUocSoCuaN from "./TongCacUocSoCuaN";

const isPerfect = (n: number): boolean => {
    return n === TongCacUocSoCuaN(n);
};
const input: number[] = [6, 28, 59];
for (const n of input) {
    const result: number[] = [];
    for (let i = 1; i <= n; i++) {
        if (isPerfect(i)) result.push(i);
    }
    console.log(result);
}
