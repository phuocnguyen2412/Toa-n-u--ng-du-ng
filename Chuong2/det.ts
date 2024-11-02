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

export default det;
console.log(
    det([
        [1, 2, 3],
        [0, 1, 4],
        [5, 6, 0],
    ])
);
