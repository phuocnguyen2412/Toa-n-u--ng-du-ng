
import { NghichDaoMatrix } from "./MaTranNghichDao";
import { findEigenvalues, findEigenvectors } from "./TriRiengVaVectoRieng";



// Hàm thực hiện phân rã giá trị riêng
export function eigendecomposition(
    A: number[][]
): { V: number[][]; Lambda: number[][] } | null {
    const eigenvalues = findEigenvalues(A);
    const n = A.length;

    // Tạo ma trận Lambda đường chéo chứa các eigenvalues
    const Lambda = Array.from({ length: n }, (_, i) =>
        Array.from({ length: n }, (_, j) => (i === j ? eigenvalues[i] : 0))
    );

    // Tạo ma trận V từ các eigenvectors
    const V = eigenvalues.map((λ) => findEigenvectors(A, λ)[0]);

    // Tìm ma trận nghịch đảo của V
    const V_inv = NghichDaoMatrix(V);
    if (!V_inv) {
        console.log("Ma trận vectơ riêng không khả nghịch");
        return null;
    }

    return { V, Lambda };
}

// Ví dụ sử dụng
const B = [
    [2, 1],
    [1, 2],
];

const result = eigendecomposition(B);

if (result) {
    const { V, Lambda } = result;
    console.log("Ma trận V (các vectơ riêng):", V);
    console.log("Ma trận Lambda (các chỉ số riêng):", Lambda);
    console.log("Ma trận V-1", NghichDaoMatrix(V));
} else {
    console.log("Không thể thực hiện phân rã chỉ số riêng.");
}
