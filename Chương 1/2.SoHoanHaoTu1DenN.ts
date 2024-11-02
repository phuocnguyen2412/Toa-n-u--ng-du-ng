import TongCacUocSoCuaN from "./TongCacUocSoCuaN";
import isPrime from "./isPrime";
import { sum } from "./sum";
function findClosestPrime(M: number): number {
    let low = M - 1;
    let high = M + 1;

    while (1) {
        if (high % 5 == 0) {
            return high;
        }

        if (low % 5 == 0) {
            return low;
        }
        high++;
        low--;
    }

    return -1;
}

const isPerfect = (n: number): boolean => {
    return n === TongCacUocSoCuaN(n) - n;
};
const n = 20000;
const result: number[] = [];
for (let i = 1; i < n; i++) {
    if (isPerfect(i)) result.push(i);
}
console.log(result);
const max = result[result.length - 1];
console.log("tong: ", sum(result));

console.log(findClosestPrime(max));
