import math
from tri_rieng_vecto_rieng import find_all_eigenvalues_and_eigenvectors

def chuyen_vi_ma_tran(A):
    n, m = len(A), len(A[0])
    return [[A[j][i] for j in range(n)] for i in range(m)]


def nhan_ma_tran(A, B):
    n, m, p = len(A), len(B), len(B[0])
    result = [[0] * p for _ in range(n)]
    for i in range(n):
        for j in range(p):
            result[i][j] = sum(A[i][k] * B[k][j] for k in range(m))
    return result


def ma_tran_vecto_rieng(vecto_rieng):
    n = len(vecto_rieng)
    ma_tran = [[0 for _ in range(n)] for _ in range(n)]
    for i in range(n):
        for j in range(n):
            ma_tran[j][i] = vecto_rieng[i][j]
    return ma_tran


def ma_tran_duong_cheo(gia_tri):
    n = len(gia_tri)
    ma_tran = [[0 for _ in range(n)] for _ in range(n)]
    for i in range(n):
        ma_tran[i][i] = gia_tri[i]
    return ma_tran



# Hàm phân rã giá trị kỳ dị (SVD)
def phan_ra_svd(A):
    # Tính A^T * A
    At = chuyen_vi_ma_tran(A)
    AtA = nhan_ma_tran(At, A)


    gia_tri_rieng_V, vecto_rieng_V = find_all_eigenvalues_and_eigenvectors(AtA)

    V = ma_tran_vecto_rieng(vecto_rieng_V)


    AAt = nhan_ma_tran(A, At)

    gia_tri_rieng_U, vecto_rieng_U = find_all_eigenvalues_and_eigenvectors(AAt)


    U = ma_tran_vecto_rieng(vecto_rieng_U)

    Sigma = ma_tran_duong_cheo([math.sqrt(gia_tri) for gia_tri in gia_tri_rieng_V])

    return U, Sigma, V



# Ma trận A đầu vào
A = [
    [1, 2, 3],
    [4, 5, 6]
]

# Phân rã SVD
U, Sigma, V = phan_ra_svd(A)

# Kết quả
print("U:")
for row in U:
    print(row)

print("\nSigma:")
for row in Sigma:
    print(row)

print("\nV:")
for row in V:
    print(row)
