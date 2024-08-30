import det from "./det";

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

function ChuyenViMatrix(matrix: number[][]): number[][] {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

function NghichDaoMatrix(matrix: number[][]): number[][] | null {
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
    [1, 3, 2, 1],
    [0, 1, -1, -1],
    [0, 0, 1, 3],
    [0, 0, 0, 1],
];

const nghichdaoMatrix = NghichDaoMatrix(matrix);

if (nghichdaoMatrix) {
    console.log("Ma trận nghịch đảo là:");
    console.log(nghichdaoMatrix);
} else {
    console.log("Ma trận không khả nghịch");
}
