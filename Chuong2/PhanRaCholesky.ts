import det from "./det";
import { isMatranDoiXung } from "./KiemTraMaTranDoiXung";

function isMaTranVuong(A: number[][]): boolean {
    const numRows = A.length;
    return A.every((row) => row.length === numRows);
}

function isMatranXacDinhDuong(A: number[][]): boolean {
    const n = A.length;

    for (let i = 1; i <= n; i++) {
        const subMatrix = A.slice(0, i).map((row) => row.slice(0, i));
        const determinant = det(subMatrix);
        if (determinant <= 0) {
            return false;
        }
    }

    return true;
}

function canApplyCholesky(A: number[][]): boolean {
    return isMaTranVuong(A) && isMatranDoiXung(A) && isMatranXacDinhDuong(A);
}
function PhanRaCholesky(A: number[][]): number[][] | null {
    if (!canApplyCholesky(A)) {
        return null;
    }

    const n = A.length;
    const L: number[][] = Array(n)
        .fill(0)
        .map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            let sum = 0;

            if (i === j) {
                // Đường chéo chính
                for (let k = 0; k < j; k++) {
                    sum += Math.pow(L[j][k], 2);
                }
                L[i][j] = Math.sqrt(A[i][i] - sum);
            } else {
                // Các phần tử khác đường chéo
                for (let k = 0; k < j; k++) {
                    sum += L[i][k] * L[j][k];
                }
                L[i][j] = (A[i][j] - sum) / L[j][j];
            }
        }
    }

    return L;
}

// Ví dụ về ma trận A
const A = [
    [25, 15, -5],
    [15, 18, 0],
    [-5, 0, 11],
];
const maTranPhanRa = PhanRaCholesky(A);
if (maTranPhanRa) {
    maTranPhanRa.forEach((row) => console.log(row));
} else {
    console.log("không tồn tại ma trận phân rã");
}
