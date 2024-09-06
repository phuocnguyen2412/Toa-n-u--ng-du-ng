import { det, subtract, multiply, identity, Matrix, solve } from 'mathjs';

function calculateEigen(A: number[][]): { eigenvalues: number[], eigenvectors: number[][] } {
    const n = A.length;
    const I_n = identity(n);
    let eigenvalues: number[] = [];

    // Tính trị riêng (eigenvalues) bằng cách giải phương trình đặc trưng det(A - λI) = 0
    for (let lambda = -100; lambda <= 100; lambda++) {
        const A_lambdaI = subtract(matrix(A), multiply(lambda, I_n));
        const determinant = det(A_lambdaI);
        if (Math.abs(determinant) < 1e-6) { // nếu định thức gần bằng 0
            eigenvalues.push(lambda);
        }
    }

    // Tính vector riêng (eigenvectors) cho mỗi trị riêng
    let eigenvectors: number[][] = eigenvalues.map(lambda => {
        const A_lambdaI = subtract(matrix(A), multiply(lambda, I_n));
        // Giải hệ phương trình (A - λI)v = 0
        const zeroVector = new Array(n).fill(0);
        const v = solve(A_lambdaI, zeroVector);
        return v.valueOf() as number[];
    });

    return { eigenvalues, eigenvectors };
}

// Ví dụ về ma trận A
const A = [
    [4, 1],
    [2, 3]
];

const result = calculateEigen(A);

console.log("Eigenvalues:", result.eigenvalues);
console.log("Eigenvectors:", result.eigenvectors);
