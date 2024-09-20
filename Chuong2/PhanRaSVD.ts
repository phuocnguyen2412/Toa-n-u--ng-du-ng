// Hàm nhân hai ma trận
import { nhanMaTran } from "./NhanMaTran";
import { findEigenvalues, findEigenvectors } from "./TriRiengVaVectoRieng";
import chuyenViMaTrix from "./MaTranChuyenVi";
function eigenvectorMatrix(eigenvectors: number[][][]): number[][] {
    const n = eigenvectors.length;
    const matrix = Array(n)
        .fill(0)
        .map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix[j][i] = eigenvectors[i][0][j];
        }
    }

    return matrix;
}

// Hàm tạo ma trận đường chéo từ danh sách các giá trị riêng
function diagonalMatrix(values: number[]): number[][] {
    const n = values.length;
    const matrix = Array(n)
        .fill(0)
        .map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        matrix[i][i] = values[i];
    }

    return matrix;
}

// Hàm tìm tất cả vectơ riêng cho mỗi giá trị riêng (cần có hàm `findEigenvectors` đã định nghĩa)
function findAllEigenvectors(
    A: number[][],
    eigenvalues: number[]
): number[][][] {
    return eigenvalues.map((eigenvalue) => findEigenvectors(A, eigenvalue));
}

// Hàm phân rã giá trị kỳ dị (SVD)
function svd(A: number[][]): {
    U: number[][];
    Sigma: number[][];
    V: number[][];
} {
    const n = A.length;

    // Tính A^T * A
    const At = chuyenViMaTrix(A);
    const AtA = nhanMaTran(At, A);

    // Tính các chỉ số riêng và vectơ riêng của A^T * A
    const eigenvalues_V = findEigenvalues(AtA);
    const eigenvectors_V = findAllEigenvectors(AtA, eigenvalues_V);

    // Tạo ma trận V từ các vectơ riêng
    const V = eigenvectorMatrix(eigenvectors_V);

    // Tính A * A^T
    const AAt = nhanMaTran(A, At);

    // Tính các chỉ số riêng và vectơ riêng của A * A^T
    const eigenvalues_U = findEigenvalues(AAt);
    const eigenvectors_U = findAllEigenvectors(AAt, eigenvalues_U);

    // Tạo ma trận U từ các vectơ riêng
    const U = eigenvectorMatrix(eigenvectors_U);

    // Tạo ma trận Sigma (đường chéo với căn bậc hai của các chỉ số riêng của A^T * A)
    const Sigma = diagonalMatrix(eigenvalues_V.map(Math.sqrt));

    return { U, Sigma, V };
}




const A = [
    [1, 0, 0],
    [0, 2, 0],
    [0, 0, 3],
];

const { U, Sigma, V } = svd(A);

console.log("U:", U);
console.log("Sigma:", Sigma);
console.log("V:", V);
