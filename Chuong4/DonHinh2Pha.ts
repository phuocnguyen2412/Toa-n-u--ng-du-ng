type Matrix = number[][];

// Tạo bảng đơn hình từ các hệ số
const table: Matrix = [
    [1, 2, -1, 0, 0, 0, 0], // Hệ số của hàm mục tiêu (với biến giả)
    [-1, 4, -2, 1, 0, 0, 6], // Ràng buộc 1 sau khi thêm biến giả
    [1, 1, 2, 0, -1, 0, 6], // Ràng buộc 2 với biến giả
    [2, -1, 2, 0, 0, 1, 4], // Ràng buộc 3 với biến giả
];



function findEnteringVariableIndex(cost: number[]): number | null {
    let minValue = Math.min(...cost);
    return minValue < 0 ? cost.indexOf(minValue) : null;
}

function findLeavingVariableIndex(
    table: Matrix,
    columnIndex: number
): number | null {
    let minRatio = Infinity;
    let leavingRow: number | null = null;

    for (let i = 1; i < table.length; i++) {
        const row = table[i];
        const ratio = row[row.length - 1] / row[columnIndex];
        if (row[columnIndex] > 0 && ratio < minRatio) {
            minRatio = ratio;
            leavingRow = i;
        }
    }
    return leavingRow;
}

function pivot(table: Matrix, pivotRow: number, pivotCol: number): void {
    const pivotValue = table[pivotRow][pivotCol];
    for (let j = 0; j < table[pivotRow].length; j++) {
        table[pivotRow][j] /= pivotValue;
    }
    for (let i = 0; i < table.length; i++) {
        if (i !== pivotRow) {
            const factor = table[i][pivotCol];
            for (let j = 0; j < table[i].length; j++) {
                table[i][j] -= factor * table[pivotRow][j];
            }
        }
    }
}

function phaseOne(table: Matrix): boolean {
    while (true) {
        const enteringVarIndex = findEnteringVariableIndex(table[0]);
        if (enteringVarIndex === null) break;

        const leavingVarIndex = findLeavingVariableIndex(
            table,
            enteringVarIndex
        );
        if (leavingVarIndex === null) {
            throw new Error("Không có giới hạn dưới - bài toán không khả thi");
        }

        pivot(table, leavingVarIndex, enteringVarIndex);
    }
    return true;
}

function removeArtificialVariables(table: Matrix): void {
    // Loại bỏ các cột tương ứng với biến giả
    for (let j = table[0].length - 2; j >= 0; j--) {
        if (table[0][j] === 0) {
            for (let i = 0; i < table.length; i++) {
                table[i].splice(j, 1);
            }
        }
    }
}

function updateObjectiveCoefficients(
    table: Matrix,
    originalObjective: number[]
): void {
    // Thay thế hệ số hàm mục tiêu cho bài toán gốc
    for (let j = 0; j < originalObjective.length; j++) {
        table[0][j] = -originalObjective[j];
    }
}

function phaseTwo(table: Matrix): number[] {
    while (true) {
        const enteringVarIndex = findEnteringVariableIndex(table[0]);
        if (enteringVarIndex === null) break;

        const leavingVarIndex = findLeavingVariableIndex(
            table,
            enteringVarIndex
        );
        if (leavingVarIndex === null) {
            throw new Error(
                "Không có giới hạn dưới - bài toán không bị chặn dưới"
            );
        }

        pivot(table, leavingVarIndex, enteringVarIndex);
    }

    return table.slice(1).map((row) => row[row.length - 1]);
}

function twoPhaseSimplex(table: Matrix, originalObjective: number[]): number[] {
    console.log("Bắt đầu pha 1...");
    if (!phaseOne(table)) {
        throw new Error("Bài toán không khả thi");
    }

    console.log("Loại bỏ các biến giả...");
    removeArtificialVariables(table);

    console.log("Chuyển sang pha 2...");
    updateObjectiveCoefficients(table, originalObjective);

    return phaseTwo(table);
}

// Định nghĩa hệ số hàm mục tiêu gốc cho bài toán ban đầu
const originalObjective = [1, 2, -1]; // hệ số của x1, x2, x3 trong hàm mục tiêu gốc

try {
    const solution = twoPhaseSimplex(table, originalObjective);
    console.log("Giá trị tối ưu:", solution);
} catch (error) {
    console.error(error);
}
