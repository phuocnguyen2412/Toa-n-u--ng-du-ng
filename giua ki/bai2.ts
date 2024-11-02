function det(matrix: number[][]): number {
    const n = matrix.length;
    if (n === 1) return matrix[0][0];
    if (n === 2)
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

    let result = 0;
    for (let i = 0; i < n; i++) {
        const subMatrix = matrix
            .slice(1)
            .map((row) => row.filter((_, colIndex) => colIndex !== i));
        result += matrix[0][i] * det(subMatrix) * (i % 2 === 0 ? 1 : -1);
    }
    return result;
}

export function maTranDonVi(size: number): number[][] {
    return Array.from({ length: size }, (_, i) =>
        Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
    );
}

export function truMaTran(A: number[][], B: number[][]): number[][] {
    return A.map((row, i) => row.map((value, j) => value - B[i][j]));
}

// Hàm tìm chỉ số riêng (eigenvalue) bằng cách giải phương trình đặc trưng
export function timGiaTriRieng(A: number[][]): number[] {
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
        if (Math.abs(determinant) < 1e-5) {
            eigenvalues.push(λ);
        }
    }

    return eigenvalues;
}

// Hàm tìm vectơ riêng (eigenvector) tương ứng với eigenvalue
export function timVectoRieng(A: number[][], eigenvalue: number): number[][] {
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
export function giaiPTGauss(matrix: number[][]): number[] {
    const n = matrix.length;
    const m = matrix[0].length;
    // Biến đổi ma trận thành dạng bậc thang
    for (let i = 0; i < n; i++) {
        // Tìm pivot
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(matrix[k][i]) > Math.abs(matrix[maxRow][i])) {
                maxRow = k;
            }
        }
        // Kiểm tra nếu pivot là zero (ma trận singular)
        if (Math.abs(matrix[maxRow][i]) < 1e-10) continue;
        // Hoán đổi hàng
        [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
        // Đưa về dạng bậc thang
        for (let k = i + 1; k < n; k++) {
            const factor = matrix[k][i] / matrix[i][i];
            for (let j = i; j < m; j++) {
                matrix[k][j] -= factor * matrix[i][j];
            }
        }
    }
    // Tìm nghiệm không tầm thường (back substitution)
    const solution: number[] = new Array(n).fill(0);
    solution[n - 1] = 1; // Chọn một giá trị tự do cho nghiệm cuối cùng
    for (let i = n - 2; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < n; j++) {
            sum += matrix[i][j] * solution[j];
        }
        if (Math.abs(matrix[i][i]) > 1e-10) {
            // Kiểm tra nếu hệ số không là zero
            solution[i] = -sum / matrix[i][i];
        } else {
            solution[i] = 1; // Chọn giá trị tự do cho biến không cơ bản
        }
    }
    return solution;
}

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

const chuyenViMaTran = (matrix: number[][]): number[][] => {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};

function nhanMaTran(A: number[][], B: number[][]): number[][] {
    const result = Array(A.length)
        .fill(0)
        .map(() => Array(B[0].length).fill(0));
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B[0].length; j++) {
            for (let k = 0; k < A[0].length; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return result;
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
    [1, 0],
    [0, 1],
];

const { U, Sigma, V } = phanRaSVD(A);

console.log("U:", U);
console.log("Sigma:", Sigma);
console.log("V:", V);
