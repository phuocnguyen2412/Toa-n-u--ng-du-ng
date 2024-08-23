import { extendedGCD, gcd } from "./gcd";


function ThangDuTrungHoa(a: number[], m: number[]) {
    const n = a.length;


    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (gcd(m[i], m[j]) !== 1) {
                console.log(
                    "Các mô-đun không nguyên tố cùng nhau. Không thể áp dụng định lý thặng dư Trung Hoa."
                );
                console.log("Không tìm được nghiệm.");
                return null;
            }
        }
    }

    let x = 0;
    let M = 1;

 
    for (let i = 0; i < n; i++) {
        M *= m[i];
    }

    for (let i = 0; i < n; i++) {
        const Mi = M / m[i];
        const { x: inverse, y: _ } = extendedGCD(Mi, m[i]);
        x = (x + a[i] * Mi * inverse) % M;
    }

   
    const result = (x + M) % M;

    console.log(
        `Nghiệm của hệ phương trình thặng dư Trung Hoa là x = ${result}(mod${M})`
    );
}

// Ví dụ sử dụng:
(() => {
    const a = [2, 3, 5]; // Danh sách a1, a2, ..., ak
    const m = [3, 5, 7]; // Danh sách m1, m2, ..., mk

    ThangDuTrungHoa(a, m);
})();
