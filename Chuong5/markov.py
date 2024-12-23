# Dữ liệu lịch sử ăn sáng
data = [
    'Banh my', 'Pho', 'Bun', 'Pizza', 'Banh my', 'Pho', 'Bun', 'Pizza',
    'Pizza', 'Banh my', 'Banh my', 'Pho', 'Banh my', 'Pho', 'Banh my', 'Pho'
]

# Khởi tạo ma trận trạng thái
states = list(set(data))  # Các trạng thái duy nhất
state_counts = {state: {} for state in states}  # Đếm số lần chuyển trạng thái

# Xây dựng ma trận chuyển trạng thái
for state in states:
    for next_state in states:
        state_counts[state][next_state] = 0  # Khởi tạo bộ đếm

# Đếm số lần chuyển đổi giữa các trạng thái
for i in range(len(data) - 1):
    current_state = data[i]
    next_state = data[i + 1]
    state_counts[current_state][next_state] += 1

# Tính xác suất chuyển trạng thái
P = {state: {} for state in states}
for state, transitions in state_counts.items():
    total = sum(transitions.values())
    for next_state, count in transitions.items():
        P[state][next_state] = count / total if total > 0 else 0

#In kết quả
print("Ma trận trạng thái P:")
for state, transitions in P.items():
    print(f"{state}: {transitions}")

# Tính xác suất để hôm nay ăn 'Pho' biết hôm qua ăn 'Banh my'
previous_state = 'Banh my'
current_state = 'Pho'
probability = P.get(previous_state, {}).get(current_state, 0)



print(f"\nXác suất để hôm nay ăn 'Pho' biết hôm qua ăn 'Banh my': {probability:.4f}")

