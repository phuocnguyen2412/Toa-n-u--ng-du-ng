import numpy as np


# Định nghĩa hàm f(x) và đạo hàm của nó (gradient)
def f(x):
    return x**2 - 4 * x + 4  # Ví dụ: hàm chi phí f(x) = x^2 - 4x + 4


def gradient_f(x):
    return 2 * x - 4  # Đạo hàm của f(x): f'(x) = 2x - 4


# Gradient Descent
def gradient_descent(f, grad_f, x_init, learning_rate, num_iterations, epsilon):
    x = x_init
    for i in range(num_iterations):
        grad = grad_f(x)  # Tính gradient tại điểm x
        x = x - learning_rate * grad

        print(f"Iteration {i}: x = {x}, f(x) = {f(x)}")

        if abs(grad) < epsilon:
            print(f"Gradient nhỏ hơn {epsilon}, dừng quá trình.")
            break

    return x


# Các tham số
learning_rate = 0.1  # Tốc độ học
num_iterations = 1000  # Số lần lặp
epsilon = 1e-5  # Sai số nhỏ cho điều kiện dừng
x_init = 0  # Điểm khởi tạo

# Chạy gradient descent
x_min = gradient_descent(f, gradient_f, x_init, learning_rate, num_iterations, epsilon)

print(f"Giá trị tối ưu của x: {x_min}")
