type Point3D = {
    x: number;
    y: number;
    z: number;
};

function distance(point1: Point3D, point2: Point3D): number {
    const { x: x1, y: y1, z: z1 } = point1;
    const { x: x2, y: y2, z: z2 } = point2;
    return Math.sqrt(
        Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
    );
}

function bruteForce(
    points: Point3D[],
    left: number,
    right: number
): { distance: number; points: [Point3D, Point3D] } {
    let minDist = Infinity;
    let closestPoints: [Point3D, Point3D] = [points[left], points[left + 1]];

    for (let i = left; i <= right; i++) {
        for (let j = i + 1; j <= right; j++) {
            const dist = distance(points[i], points[j]);
            if (dist < minDist) {
                minDist = dist;
                closestPoints = [points[i], points[j]];
            }
        }
    }

    return { distance: minDist, points: closestPoints };
}

function stripClosest(
    strip: Point3D[],
    d: number,
    closestPoints: [Point3D, Point3D]
): { distance: number; points: [Point3D, Point3D] } {
    let minDist = d;
    let minPoints = closestPoints;

    strip.sort((a, b) => a.y - b.y);

    for (let i = 0; i < strip.length; i++) {
        for (
            let j = i + 1;
            j < strip.length && strip[j].y - strip[i].y < minDist;
            j++
        ) {
            const dist = distance(strip[i], strip[j]);
            if (dist < minDist) {
                minDist = dist;
                minPoints = [strip[i], strip[j]];
            }
        }
    }

    return { distance: minDist, points: minPoints };
}

function closestUtil(
    points: Point3D[],
    left: number,
    right: number
): { distance: number; points: [Point3D, Point3D] } {
    if (right - left <= 3) {
        return bruteForce(points, left, right);
    }

    const mid = Math.floor((left + right) / 2);
    const midPoint = points[mid];

    const dl = closestUtil(points, left, mid);
    const dr = closestUtil(points, mid + 1, right);

    let d = dl.distance < dr.distance ? dl : dr;

    const strip: Point3D[] = [];
    for (let i = left; i <= right; i++) {
        if (Math.abs(points[i].x - midPoint.x) < d.distance) {
            strip.push(points[i]);
        }
    }

    return stripClosest(strip, d.distance, d.points);
}

function closest(points: Point3D[]): {
    distance: number;
    points: [Point3D, Point3D];
} {
    points.sort((a, b) => a.x - b.x);

    return closestUtil(points, 0, points.length - 1);
}

const points: Point3D[] = [
    { x: 0, y: 0, z: 1 },
    { x: 3, y: 4, z: 2 },
    { x: 7, y: 1, z: 3 },
    { x: 8, y: 7, z: 4 },
    { x: 2, y: 2, z: 5 },
    { x: 5, y: 5, z: 5 },
];

const result = closest(points);
console.log("Khoảng cách ngắn nhất giữa 2 điểm là:", result);
