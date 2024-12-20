import numpy as np


def grad(w):
    N = Xbar.shape[0]
    return 1 / N * Xbar.T.dot(Xbar.dot(w) - y)


def myGradientDescent(w_init, grad, alpha, loop=1000, esilon=1e-4):
    w = [w_init]
    for i in range(loop):
        w_new = w[-1] - alpha * grad(w[-1])
        if np.linalg.norm(grad(w_new)) / len(w_new) < esilon:
            break
        w.append(w_new)
    return (w, i)


def l(w):
    """Hàm này tính giá trị hàm chi phí (loss function) tại một điểm 𝑤"""
    N = Xbar.shape[0]
    return 0.5 / N * np.linalg.norm(Xbar.dot(w) - y, 2) ** 2


X = np.random.rand(1000, 1)
"""y=4+3X với một chút nhiễu (noise)."""
y = 4 + 3 * X + 0.2 * np.random.randn(1000, 1)  # noise added
# Building Xbar
one = np.ones((X.shape[0], 1))
Xbar = np.concatenate((one, X), axis=1)
# Gradient descent
w_init = np.array([[2], [1]])
learning_rate = 0.1
loop = 10000
esilon = 1e-4
(w, it) = myGradientDescent(w_init, grad, learning_rate, loop, esilon)

print("Phương pháp GradientDescent: w = ", w[-1].T)
print(
    f"sau {it+1} iterations, l = {l(w[-1])} ",
)
