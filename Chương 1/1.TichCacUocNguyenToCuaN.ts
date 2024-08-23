import primeFactors, { displayFactors } from "./primeFactor";



const inputList = [20, 30, 60, 70, 100, 13];
for (const input of inputList) {
    const factors = primeFactors(input);
    const factorString = displayFactors(factors);
    console.log(`${input} = ${factorString}`);
}
