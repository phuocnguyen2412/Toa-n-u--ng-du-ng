const func = (x: number) => x ** 2 - 3 * x + 3;

function daoHam(f: (x: number) => number, x: number, h: number = 0.00001) {
    return (f(x + h) - f(x - h)) / (2 * h);
}

function gradientDescent(
    f: (x: number) => number,
    x0: number,
    learningRate: number,
    epsilon: number = 10 ** -6
) {
    let x = x0;

    while (true) {
        const dx = daoHam(f, x);
        x = x - learningRate * dx;
        if (Math.abs(dx) < epsilon) {
            break;
        }
    }
    return x;
}
console.log(gradientDescent(func, 10, 0.1));
