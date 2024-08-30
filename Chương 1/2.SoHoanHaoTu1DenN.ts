import TongCacUocSoCuaN from "./TongCacUocSoCuaN";
import isPrime from "./isPrime";
const isPerfect = (n: number): boolean => {
    return n === TongCacUocSoCuaN(n) - n;
};
const n = 9000;
const result: number[] = [];
for (let i = 1; i < n; i++) {
    if (isPerfect(i)) result.push(i);
}
console.log(result);
const max = result[result.length - 1];
function findClosestPrime(M: number): number {
    let closestPrime = M;

    // Check upwards
    let i = M;
    while (true) {
        if (isPrime(i)) {
            closestPrime = i;
            break;
        }
        i++;
    }

    // Check downwards
    i = M - 1;
    while (i > 1) {
        if (isPrime(i) && M - i < M - closestPrime) {
            closestPrime = i;
            break;
        }
        if (M - i > M - closestPrime) return closestPrime;
        i--;
    }

    return closestPrime;
}
console.log(findClosestPrime(max));
