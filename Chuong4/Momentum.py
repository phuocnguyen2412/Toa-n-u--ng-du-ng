import numpy as np
import math




def grad(x, y):
    sigmoid = 1 / (1 + math.exp(-x))
    if y == 1:
        grad_x = -(1 / math.log(10)) * sigmoid * math.exp(-x)
    elif y == 0:
        grad_x = (1 / math.log(10)) * sigmoid
    grad_y = 0
    return np.array([grad_x, grad_y])

# Hàm chi phí f(x, y)
def cost(x, y):
    if y == 1:
        return -math.log(1 / (1 + math.exp(-x)), 10)
    elif y == 0:
        return -math.log(1 - 1 / (1 + math.exp(-x)), 10)

# Kiểm tra hội tụ
def has_converged(grad_value, threshold=0.001):
    return np.linalg.norm(grad_value) < threshold

# Gradient Descent with Momentum
def GD_momentum(theta_init, v_init, learning_rate=0.1, beta=0.4, iteration=10000):
    global it
    theta = [np.array(theta_init)]
    v_old = np.array(v_init)
    for it in range(iteration):
        grad_val = grad(theta[-1][0], theta[-1][1])
        v_new = beta * v_old + learning_rate * grad_val
        theta_new = theta[-1] - v_new
        theta.append(theta_new)
        if has_converged(grad_val):
            break
        v_old = v_new
    return theta, it


theta_init = [5, 1]
v_init = [0, 0]
(theta, it) = GD_momentum(theta_init, v_init, learning_rate=0.1, beta=0.4, iteration=30000)
x_min, y_min = theta[-1]

print(
    f"Momentum Solution: x = {x_min}, y = {y_min}, cost = {cost(x_min, y_min)}, grad = {grad(x_min, y_min)} obtained after {it} iterations"

)
