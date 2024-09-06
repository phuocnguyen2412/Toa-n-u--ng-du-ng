import { eigs, Matrix, matrix } from "mathjs";

// Hàm phân rã ma trận bằng giá trị riêng và vector riêng
function eigenDecomposition(A: number[][]) {
    // Chuyển ma trận đầu vào thành dạng Matrix của mathjs
    const mathMatrix = matrix(A);

    // Sử dụng eigs() để tính giá trị riêng và vector riêng
    const result = eigs(mathMatrix);

    // Trích xuất giá trị riêng và vector riêng
    const eigenvalues = result.values as number[]; // Giá trị riêng đã ở dạng mảng
    const eigenvectors = result.eigenvectors; // Chuyển ma trận vector riêng về mảng 2D

    return {
        eigenvalues,
        eigenvectors,
    };
}

// Ví dụ ma trận A
const A: number[][] = [
    [4, 2],
    [1, 3],
];

// Phân rã ma trận
const result = eigenDecomposition(A);

console.log("Giá trị riêng:", result.eigenvalues);
console.log("Vector riêng:\n", result.eigenvectors);
