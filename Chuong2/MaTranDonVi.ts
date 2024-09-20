export function maTranDonVi(size: number): number[][] {
    return Array.from({ length: size }, (_, i) =>
        Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
    );
}