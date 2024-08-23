const euclid = (n: number, m: number): number => {
    if (m == 0) return n;
    else {
        return euclid(m, n % m);
    }
};
