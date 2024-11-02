type Diem3D = {
    x: number;
    y: number;
    z: number;
};

function khoangCach(diem1: Diem3D, diem2: Diem3D): number {
    const { x: x1, y: y1, z: z1 } = diem1;
    const { x: x2, y: y2, z: z2 } = diem2;
    return Math.sqrt(
        Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
    );
}

function timBangManh(
    diem: Diem3D[],
    trai: number,
    phai: number
): { khoangCach: number; diem: [Diem3D, Diem3D] } {
    let minDist = Infinity;
    let diemGanNhat: [Diem3D, Diem3D] = [diem[trai], diem[trai + 1]];

    for (let i = trai; i <= phai; i++) {
        for (let j = i + 1; j <= phai; j++) {
            const dist = khoangCach(diem[i], diem[j]);
            if (dist < minDist) {
                minDist = dist;
                diemGanNhat = [diem[i], diem[j]];
            }
        }
    }

    return { khoangCach: minDist, diem: diemGanNhat };
}

function stripGanNhat(
    strip: Diem3D[],
    d: number,
    diemGanNhat: [Diem3D, Diem3D]
): { khoangCach: number; diem: [Diem3D, Diem3D] } {
    let minDist = d;
    let diemMin = diemGanNhat;

    strip.sort((a, b) => a.y - b.y);

    for (let i = 0; i < strip.length; i++) {
        for (
            let j = i + 1;
            j < strip.length && strip[j].y - strip[i].y < minDist;
            j++
        ) {
            const dist = khoangCach(strip[i], strip[j]);
            if (dist < minDist) {
                minDist = dist;
                diemMin = [strip[i], strip[j]];
            }
        }
    }

    return { khoangCach: minDist, diem: diemMin };
}

function timDiemGanNhat(
    diem: Diem3D[],
    trai: number,
    phai: number
): { khoangCach: number; diem: [Diem3D, Diem3D] } {
    if (phai - trai <= 3) {
        return timBangManh(diem, trai, phai);
    }

    const giua = Math.floor((trai + phai) / 2);
    const diemGiua = diem[giua];

    const dl = timDiemGanNhat(diem, trai, giua);
    const dr = timDiemGanNhat(diem, giua + 1, phai);

    let d = dl.khoangCach < dr.khoangCach ? dl : dr;

    const strip: Diem3D[] = [];
    for (let i = trai; i <= phai; i++) {
        if (Math.abs(diem[i].x - diemGiua.x) < d.khoangCach) {
            strip.push(diem[i]);
        }
    }

    return stripGanNhat(strip, d.khoangCach, d.diem);
}

function diemGanNhat(diem: Diem3D[]): {
    khoangCach: number;
    diem: [Diem3D, Diem3D];
} {
    diem.sort((a, b) => a.x - b.x);

    return timDiemGanNhat(diem, 0, diem.length - 1);
}

const diem1: Diem3D[] = [
    { x: 0, y: 0, z: 1 },
    { x: 3, y: 4, z: 2 },
    { x: 7, y: 1, z: 3 },
    { x: 8, y: 7, z: 4 },
    { x: 2, y: 2, z: 5 },
    { x: 5, y: 5, z: 5 },
];

const ketQua = diemGanNhat(diem1);
console.log("Khoảng cách ngắn nhất giữa 2 điểm là:", ketQua);
