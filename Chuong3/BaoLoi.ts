type Point = {
    x: number;
    y: number;
};

function computeOrientation(p: Point, q: Point, r: Point): number {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0; // thẳng hàng
    return val > 0 ? 1 : -1; // 1: ngược chiều kim đồng hồ, -1: cùng chiều kim đồng hồ
}

function distanceSquared(p: Point, q: Point): number {
    return (p.x - q.x) ** 2 + (p.y - q.y) ** 2;
}

function convexHull(points: Point[]): Point[] {
    const n = points.length;
    if (n < 3) return [];
    let p0 = points[0];
    for (let i = 1; i < n; i++) {
        if (
            points[i].y < p0.y ||
            (points[i].y === p0.y && points[i].x < p0.x)
        ) {
            p0 = points[i];
        }
    }

    points.sort((a, b) => {
        const o = computeOrientation(p0, a, b);
        if (o === 0) {
            return distanceSquared(p0, a) - distanceSquared(p0, b);
        }
        return o === 1 ? -1 : 1;
    });

    const hull: Point[] = [];
    for (const p of points) {
        while (
            hull.length >= 2 &&
            computeOrientation(
                hull[hull.length - 2],
                hull[hull.length - 1],
                p
            ) !== 1
        ) {
            hull.pop();
        }
        hull.push(p);
    }

    return hull;
}

function DienTich(points: Point[]): number {
    const n = points.length;
    let area = 0;

    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        area += points[i].x * points[j].y - points[j].x * points[i].y;
    }

    return Math.abs(area) / 2;
}

const points: Point[] = [
    { x: 0, y: 3 },
    { x: 2, y: 3 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 0 },
    { x: 0, y: 0 },
    { x: 3, y: 3 },
];


const hull = convexHull(points);
console.log("Các điểm trên bao lồi là:", hull);


const area = DienTich(hull);
console.log("Diện tích bao lồi là:", area);
