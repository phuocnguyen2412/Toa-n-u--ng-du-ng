import det from "./det";
import ChuyenViMatrix from "./MaTranChuyenVi";
function CofactorMatrix(matrix: number[][]): number[][] {
    const n = matrix.length;
    const cofactorMatrix: number[][] = [];

    for (let i = 0; i < n; i++) {
        const row: number[] = [];
        for (let j = 0; j < n; j++) {
            const subMatrix = matrix
                .filter((_, rowIndex) => rowIndex !== i)
                .map((row) => row.filter((_, colIndex) => colIndex !== j));
            row.push(det(subMatrix) * ((i + j) % 2 === 0 ? 1 : -1));
        }
        cofactorMatrix.push(row);
    }

    return cofactorMatrix;
}

export function NghichDaoMatrix(matrix: number[][]): number[][] | null {
    const dinhthuc = det(matrix);
    if (dinhthuc === 0) {
        return null;
    }

    const cofactor = CofactorMatrix(matrix);
    const chuyenViMatrix = ChuyenViMatrix(cofactor);
    const result = chuyenViMatrix.map((row) =>
        row.map((value) => value / dinhthuc)
    );

    return result;
}

const matrix = [
    [1, 2, 3],
    [0, 1, 4],
    [5, 6, 0],
];

const nghichdaoMatrix = NghichDaoMatrix(matrix);

if (nghichdaoMatrix) {
    console.log("Ma trận nghịch đảo là:");
    console.log(nghichdaoMatrix);
} else {
    console.log("Ma trận không khả nghịch");
}
