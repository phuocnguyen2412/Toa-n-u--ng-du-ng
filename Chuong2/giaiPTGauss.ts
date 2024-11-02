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
        // Kiểm tra nếu pivot là zero (ma trận singular)
        if (Math.abs(matrix[maxRow][i]) < 1e-10) continue;
        // Hoán đổi hàng
        [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];
        // Đưa về dạng bậc thang
        for (let k = i + 1; k < n; k++) {
            const factor = matrix[k][i] / matrix[i][i];
            for (let j = i; j < m; j++) {
                matrix[k][j] -= factor * matrix[i][j];
            }
        }
    }
    // Tìm nghiệm không tầm thường (back substitution)
    const solution: number[] = new Array(n).fill(0);
    solution[n - 1] = 1; // Chọn một giá trị tự do cho nghiệm cuối cùng
    for (let i = n - 2; i >= 0; i--) {
        let sum = 0;
        for (let j = i + 1; j < n; j++) {
            sum += matrix[i][j] * solution[j];
        }
        if (Math.abs(matrix[i][i]) > 1e-10) {
            // Kiểm tra nếu hệ số không là zero
            solution[i] = -sum / matrix[i][i];
        } else {
            solution[i] = 1; // Chọn giá trị tự do cho biến không cơ bản
        }
    }
    return solution;
}
