export function truMaTran(A: number[][], B: number[][]): number[][] {
    return A.map((row, i) => row.map((value, j) => value - B[i][j]));
}
