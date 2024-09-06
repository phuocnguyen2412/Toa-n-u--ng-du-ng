const ChuyenViMatrix = (matrix: number[][]): number[][] => {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};
export const isMatranDoiXung = (A: number[][]): boolean => {
    const n = A.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (A[i][j] !== A[j][i]) {
                return false;
            }
        }
    }
    return true;
};
export default ChuyenViMatrix;
