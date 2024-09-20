export function giaiPTGauss(matrix: number[][]): number[] {
    const n = matrix.length;
    const m = matrix[0].length;

    // Biến đổi ma trận thành dạng bậc thang
    for (let i = 0; i < n; i++) {
        // Tìm pivot
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(matrix[k][i]) > Math.abs(matrix[maxRow][i])) {
                maxRow = k;
            }
        }
        [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]]; // Hoán đổi hàng

        // Đưa về dạng bậc thang
        for (let k = i + 1; k < n; k++) {
            const factor = matrix[k][i] / matrix[i][i];
            for (let j = i; j < m; j++) {
                matrix[k][j] -= factor * matrix[i][j];
            }
        }
    }

    // Tìm nghiệm không tầm thường
    const solution: number[] = new Array(n).fill(0);
    solution[n - 1] = 1; // Chọn một giá trị tự do cho nghiệm cuối cùng (để tránh tất cả bằng 0)

    for (let i = n - 2; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < n; j++) {
            sum += matrix[i][j] * solution[j];
        }
        solution[i] = -sum / matrix[i][i]; // Giải ngược
    }

    return solution;
}