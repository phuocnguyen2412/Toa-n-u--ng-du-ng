import primeFactors, { displayFactors } from "./primeFactor";

const inputList = [20000];
for (const input of inputList) {
    const factors = primeFactors(input);
    const factorString = displayFactors(factors);
    console.log(`${input} = ${factorString}`);
}
