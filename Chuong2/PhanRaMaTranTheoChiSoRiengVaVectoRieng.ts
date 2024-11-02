import { NghichDaoMatrix } from "./MaTranNghichDao";
import { timGiaTriRieng, timVectoRieng } from "./TriRiengVaVectoRieng";

// Hàm thực hiện phân rã giá trị riêng
export function phanRaGiaTriRieng(
    A: number[][]
): { V: number[][]; Lambda: number[][] } | null {
    const giaTriRieng = timGiaTriRieng(A);
    const n = A.length;

    // Tạo ma trận Lambda đường chéo chứa các chỉ số riêng (eigenvalues)
    const Lambda = Array.from({ length: n }, (_, i) =>
        Array.from({ length: n }, (_, j) => (i === j ? giaTriRieng[i] : 0))
    );

    // Tạo ma trận V từ các vectơ riêng
    const V = giaTriRieng.map((λ) => timVectoRieng(A, λ)[0]);

    // Tìm ma trận nghịch đảo của V
    const V_nghichDao = NghichDaoMatrix(V);
    if (!V_nghichDao) {
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

const ketQua = phanRaGiaTriRieng(B);

if (ketQua) {
    const { V, Lambda } = ketQua;
    console.log("Ma trận V (các vectơ riêng):", V);
    console.log("Ma trận Lambda (các chỉ số riêng):", Lambda);
    console.log("Ma trận V-1", NghichDaoMatrix(V));
} else {
    console.log("Không thể thực hiện phân rã chỉ số riêng.");
}
