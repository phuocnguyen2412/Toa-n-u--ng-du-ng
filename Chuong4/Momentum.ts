function f(x: number): number {
    return (Math.exp(2 * x) + 3 * x * x + 8 * x) / (35 - x) - 5 * x;
}

function df(x: number): number {
    return (2 * Math.exp(2 * x) * (35 - x) + (3 * x ** 2 + 8 * x + Math.exp(2 * x)) / (35 - x)**2 - 5) / (35 - x)
}

function gradientDescentWithMomentum(
    initialX: number,
    learningRate: number,
    momentum: number,
    maxIterations: number,
    epsilon: number
): number {
    let x = initialX;
    let v = 0;
    
    for(let i = 0; i < maxIterations; i++) {
        const gradient = df(x);
        v = momentum * v - learningRate * gradient;
        x += v;
        if (Math.abs(gradient) < epsilon) {
            break;
        }
    }
    

    return x;
}

// Thiết lập tham số
const initialX = 0;
const learningRate = 0.001;
const momentum = 0.1;
const maxIterations = 1000;
const epsilon = 1e-5;

// Tìm giá trị tối ưu của x
const optimalX = gradientDescentWithMomentum(
    initialX,
    learningRate,
    momentum,
    maxIterations,
    epsilon
);
const optimalValue = f(optimalX);

console.log("Giá trị x tối ưu:", optimalX);
console.log("Giá trị nhỏ nhất của f(x):", optimalValue);
