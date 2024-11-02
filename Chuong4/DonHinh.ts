type MaTran = number[][];
type Vecto = number[];

interface BieuDienTuyenTinh {
    c: Vecto;
    A: MaTran;
    b: Vecto;
}

function khoiTaoMaTran(bt: BieuDienTuyenTinh) {
    let { c, A, b } = bt;
    
    

    let bang: MaTran = A.map((row, i) => {
        return row.concat([b[i]]);
    });

    bang.push(c.concat([0]));

    console.log("Ma trận khởi tạo: ", bang);
    return bang;
}

function donHinh(
    bt: BieuDienTuyenTinh
): { loiGiai: Vecto; giaTric: number } | null {
    let { c, A } = bt;
    const bang = khoiTaoMaTran(bt);

    const soA = A.length;
    const soBien = c.length;

    while (true) {
        // Tìm cột trục (phần tử âm nhất trong hàng mục tiêu)
        let minCol = bang[soA]
            .slice(0, soBien + soA)
            .reduce((chiSoMin, giaTri, chiSo, arr) => {
                return giaTri < arr[chiSoMin] ? chiSo : chiSoMin;
            }, 0);
        console.log("cotTruc: ", minCol);

        if (bang[soA][minCol] >= 0) break; // Đã tìm thấy giải pháp tối ưu

        // Tìm hàng trục
        let tiLe = bang.map((hang, i) => {
            if (i === soA || hang[minCol] <= 0) return Infinity;
            return hang[hang.length - 1] / hang[minCol];
        });
        console.log("tiLe: ", tiLe);

        let minRow = tiLe.reduce((chiSoMin, giaTri, chiSo, arr) => {
            return giaTri < arr[chiSoMin] ? chiSo : chiSoMin;
        }, 0);
        console.log("minRow: ", minRow);

        if (tiLe[minRow] === Infinity) return null;

        // Thực hiện phép biến đổi trục
        let giaTriTruc = bang[minRow][minCol];
        bang[minRow] = bang[minRow].map((x) => x / giaTriTruc);
        bang.forEach((hang, i) => {
            if (i !== minRow) {
                let heSo = hang[minCol];
                hang.forEach((_, j) => {
                    hang[j] -= heSo * bang[minRow][j];
                });
            }
        });
        console.log("--------------------------------");
    }
    console.log("Bang cuoi cung: ", bang);

    // Rút ra lời giải và giá trị mục tiêu
    let loiGiai = Array(soBien).fill(0);
    for (let i = 0; i < soA; i++) {
        let cotTruc = bang[i].findIndex(
            (giaTri, chiSo) => chiSo < soBien && giaTri === 1
        );
        if (cotTruc !== -1) loiGiai[cotTruc] = bang[i][bang[i].length - 1];
    }

    let giaTric = bang[soA][bang[soA].length - 1];
    return { loiGiai, giaTric };
}

const bt: BieuDienTuyenTinh = {
    c: [-0, 6, 5, -64, -4, 0, 0],
    A: [
        [-1 / 3, -2, -1, 12, 1, 0, 0],
        [1 / 2, -1, -1 / 6, 2 / 3, 0, 1, 0],
        [0, 1, 1, -9, 0, 0, 1],
    ],
    b: [7, 10, 12],
};

const result = donHinh(bt);

if (result) {
    console.log("Tìm thấy giải pháp tối ưu:");
    console.log("Lời giải:", result!.loiGiai);
    console.log("Giá trị mục tiêu:", result!.giaTric);
} else {
    console.log("Bài toán không bị chặn.");
}
