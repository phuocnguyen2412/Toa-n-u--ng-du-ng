// Hàm tính định thức của ma trận
import { truMaTran } from "./TruMaTran";
import { maTranDonVi } from "./MaTranDonVi";
import { giaiPTGauss } from "./giaiPTGauss";
import det from "./det";

// Hàm tìm chỉ số riêng (eigenvalue) bằng cách giải phương trình đặc trưng
export function findEigenvalues(A: number[][]): number[] {
    const n = A.length;
    const eigenvalues: number[] = [];

    for (let λ = -10; λ <= 10; λ += 0.1) {
        // Giả sử dải giá trị cho λ
        const I = maTranDonVi(n);
        const A_minus_lambda_I = truMaTran(
            A,
            I.map((row) => row.map((x) => x * λ))
        );
        const determinant = det(A_minus_lambda_I);
        if (Math.abs(determinant) < 1e-6) {
            eigenvalues.push(λ);
        }
    }

    return eigenvalues;
}



// Hàm tìm vectơ riêng (eigenvector) tương ứng với eigenvalue
export function findEigenvectors(
    A: number[][],
    eigenvalue: number
): number[][] {
    const n = A.length;
    const I = maTranDonVi(n);
    const A_minus_lambda_I = truMaTran(
        A,
        I.map((row) => row.map((x) => x * eigenvalue))
    );

    // Thêm cột 0 vào ma trận để giải hệ phương trình (A - λI)v = 0
    const augmentedMatrix = A_minus_lambda_I.map((row) => [...row, 0]);

    // Giải hệ phương trình
    const eigenvector = giaiPTGauss(augmentedMatrix);

    return [eigenvector];
}

// Ví dụ sử dụng
const A = [
    [2, 1],
    [1, 2],
];

const eigenvalues = findEigenvalues(A);
console.log("Eigenvalues:", eigenvalues);

eigenvalues.forEach((λ) => {
    const eigenvectors = findEigenvectors(A, λ);
    console.log(`Eigenvector for λ = ${λ}:`, eigenvectors);
});
