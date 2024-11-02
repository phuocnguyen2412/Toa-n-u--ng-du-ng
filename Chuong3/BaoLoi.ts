type Diem = {
    x: number;
    y: number;
};

function tinhHuong(p: Diem, q: Diem, r: Diem): number {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0; // thẳng hàng
    return val > 0 ? 1 : -1; // 1: ngược chiều kim đồng hồ, -1: cùng chiều kim đồng hồ
}

function khoangCachBinhPhuong(p: Diem, q: Diem): number {
    return (p.x - q.x) ** 2 + (p.y - q.y) ** 2;
}

function timBaoLoi(diem: Diem[]): Diem[] {
    const n = diem.length;
    if (n < 3) return [];
    let p0 = diem[0];
    for (let i = 1; i < n; i++) {
        if (diem[i].y < p0.y || (diem[i].y === p0.y && diem[i].x < p0.x)) {
            p0 = diem[i];
        }
    }

    diem.sort((a, b) => {
        const o = tinhHuong(p0, a, b);
        if (o === 0) {
            return khoangCachBinhPhuong(p0, a) - khoangCachBinhPhuong(p0, b);
        }
        return o === 1 ? -1 : 1;
    });

    const baoLoi: Diem[] = [];
    for (const p of diem) {
        while (
            baoLoi.length >= 2 &&
            tinhHuong(
                baoLoi[baoLoi.length - 2],
                baoLoi[baoLoi.length - 1],
                p
            ) !== 1
        ) {
            baoLoi.pop();
        }
        baoLoi.push(p);
    }

    return baoLoi;
}

function tinhDienTich(diem: Diem[]): number {
    const n = diem.length;
    let dienTich = 0;

    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        dienTich += diem[i].x * diem[j].y - diem[j].x * diem[i].y;
    }

    return Math.abs(dienTich) / 2;
}

const diem: Diem[] = [
    { x: 1, y: 2 },
    { x: 2, y: 5 },
    { x: 3, y: 4 },
    { x: 4, y: 3 },
    { x: 5, y: 4 },
    { x: 6, y: 1 },
    { x: 7, y: 5 },
];

const baoLoi = timBaoLoi(diem);
console.log("Các điểm trên bao lồi là:", baoLoi);

const dienTich = tinhDienTich(baoLoi);
console.log("Diện tích bao lồi là:", dienTich);
