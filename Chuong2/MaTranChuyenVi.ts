const ChuyenViMatrix = (matrix: number[][]): number[][] => {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};

export default ChuyenViMatrix;
