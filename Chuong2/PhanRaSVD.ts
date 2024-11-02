import { nhanMaTran } from "./NhanMaTran";
import { timGiaTriRieng, timVectoRieng } from "./TriRiengVaVectoRieng";
import chuyenViMaTran from "./MaTranChuyenVi";

// Hàm tạo ma trận vectơ riêng từ danh sách vectơ riêng
function maTranVectoRieng(vectoRieng: number[][][]): number[][] {
    const n = vectoRieng.length;
    const maTran = Array(n)
        .fill(0)
        .map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            maTran[j][i] = vectoRieng[i][0][j];
        }
    }

    return maTran;
}

// Hàm tạo ma trận đường chéo từ danh sách các giá trị riêng
function maTranDuongCheo(giaTri: number[]): number[][] {
    const n = giaTri.length;
    const maTran = Array(n)
        .fill(0)
        .map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        maTran[i][i] = giaTri[i];
    }

    return maTran;
}

// Hàm tìm tất cả vectơ riêng cho mỗi giá trị riêng
function timTatCaVectoRieng(
    A: number[][],
    giaTriRieng: number[]
): number[][][] {
    return giaTriRieng.map((giaTri) => timVectoRieng(A, giaTri));
}

// Hàm phân rã giá trị kỳ dị (SVD)
function phanRaSVD(A: number[][]): {
    U: number[][];
    Sigma: number[][];
    V: number[][];
} {
    const n = A.length;

    // Tính A^T * A
    const At = chuyenViMaTran(A);
    const AtA = nhanMaTran(At, A);

    // Tính các chỉ số riêng và vectơ riêng của A^T * A
    const giaTriRieng_V = timGiaTriRieng(AtA);
    const vectoRieng_V = timTatCaVectoRieng(AtA, giaTriRieng_V);

    // Tạo ma trận V từ các vectơ riêng
    const V = maTranVectoRieng(vectoRieng_V);

    // Tính A * A^T
    const AAt = nhanMaTran(A, At);

    // Tính các chỉ số riêng và vectơ riêng của A * A^T
    const giaTriRieng_U = timGiaTriRieng(AAt);
    const vectoRieng_U = timTatCaVectoRieng(AAt, giaTriRieng_U);

    // Tạo ma trận U từ các vectơ riêng
    const U = maTranVectoRieng(vectoRieng_U);

    // Tạo ma trận Sigma (đường chéo với căn bậc hai của các chỉ số riêng của A^T * A)
    const Sigma = maTranDuongCheo(giaTriRieng_V.map(Math.sqrt));

    return { U, Sigma, V };
}

const A = [
    [1, 2, 3],
    [4, 5, 6],
];

const { U, Sigma, V } = phanRaSVD(A);

console.log("U:", U);
console.log("Sigma:", Sigma);
console.log("V:", V);
