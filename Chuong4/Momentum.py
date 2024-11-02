import numpy as np

# Định nghĩa hàm f(x)
def f(x):
    return (np.exp(2 * x) + 3 * x ** 2 + 8 * x) / (35 - x) - 5 * x

# Tính đạo hàm của hàm f(x)
def f_prime(x):
    return (2 * np.exp(2 * x) * (35 - x) + (3 * x ** 2 + 8 * x + np.exp(2 * x)) / (35 - x)**2 - 5) / (35 - x)

# Gradient Descent với Momentum
def gradient_descent_momentum(learning_rate, beta, initial_x, N, epsilon):
    x = initial_x
    v = 0  # Khởi tạo momentum
    for i in range(N):
        grad = f_prime(x)
        v = beta * v + (1 - beta) * grad  # Tính momentum
        x_new = x - learning_rate * v
        if abs(x_new - x) < epsilon:  # Kiểm tra điều kiện hội tụ
            break
        x = x_new
    return x, f(x)

# Tham số cho thuật toán
learning_rate = 0.001  # Tốc độ học
beta = 0.1  # Hệ số momentum
initial_x = 0  # Điểm khởi tạo
N = 1000  # Số bước lặp tối đa
epsilon = 1e-5  # Sai số

# Tính giá trị nhỏ nhất
min_x, min_f = gradient_descent_momentum(learning_rate, beta, initial_x, N, epsilon)

print("Giá trị nhỏ nhất của f(x):", min_f)
print("Tại x:", min_x)
