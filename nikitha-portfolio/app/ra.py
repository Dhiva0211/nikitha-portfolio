import numpy as np

def qprimaldual_neg(
    routes,         # list[list[int]]: routes[r] = list of links used by session r
    d,              # np.array shape (L,): d_l parameters in capacity d_l (1 - w_l)
    K,              # np.array shape (R,): K_r thresholds in sum log w_l >= K_r
    iters=20000,
    tol=1e-8,
    # step sizes (can be scalars or arrays)
    k_lambda=5e-6,  # matches the paper's order of magnitude :contentReference[oaicite:5]{index=5}
    k_mu=1e-2,      # :contentReference[oaicite:6]{index=6}
    k_w=5e-5,       # :contentReference[oaicite:7]{index=7}
    # initial values
    w0=0.967,       # paper uses w_l(t=0)=0.967 :contentReference[oaicite:8]{index=8}
    seed=7,
):
    """
    Implements the paper's QPrimalDual updates (14)-(17) for U_neg.
    Returns (R, w, lam, mu).
    """
    rng = np.random.default_rng(seed)

    Rn = len(routes)
    Ln = len(d)

    # Build incidence: sessions_using_link[l] = list of r
    sessions_using_link = [[] for _ in range(Ln)]
    for r, path in enumerate(routes):
        for l in path:
            sessions_using_link[l].append(r)

    # init
    w = np.full(Ln, float(w0))
    lam = rng.random(Ln) * 0.1 + 1e-3   # positive
    mu = rng.random(Rn) * 0.1 + 1e-3    # positive
    R = rng.random(Rn) * 0.1 + 1e-3     # positive

    # Helpers
    def route_prod_w(r):
        prod = 1.0
        for l in routes[r]:
            prod *= w[l]
        return prod

    def sum_lambda_on_route(r):
        return sum(lam[l] for l in routes[r])

    # Main loop
    for t in range(iters):
        w_prev = w.copy()
        R_prev = R.copy()
        lam_prev = lam.copy()
        mu_prev = mu.copy()

        # Precompute W_r = prod_{l in r} w_l
        W = np.array([route_prod_w(r) for r in range(Rn)])

        # --- I. Link price updates (14) ---
        # lam_l <- max(lam_l + k_lambda*(sum_{r:l in r} R_r - d_l(1-w_l)), 0)
        for l in range(Ln):
            sum_R = sum(R[r] for r in sessions_using_link[l])
            lam_dot = (sum_R - d[l] * (1.0 - w[l]))
            lam[l] = max(lam[l] + k_lambda * lam_dot, 0.0)

        # --- II. Session rate updates (15) ---
        # For U_neg: U = log(R) + log(3W-1) => f_r = dU/dR = 1/R
        # So f_r(R)=sum_lambda => 1/R = sum_lambda => R = 1/sum_lambda
        eps = 1e-12
        for r in range(Rn):
            s = sum_lambda_on_route(r)
            R[r] = 1.0 / max(s, eps)

        # --- III. Fidelity price update (16) ---
        # mu_r <- max(mu_r + k_mu*(K_r - sum_{l in r} log w_l), 0)
        for r in range(Rn):
            sum_logw = sum(np.log(max(w[l], eps)) for l in routes[r])
            mu_dot = (K[r] - sum_logw)
            mu[r] = max(mu[r] + k_mu * mu_dot, 0.0)

        # Recompute W after w changes (w update uses fl which depends on W and w)
        W = np.array([route_prod_w(r) for r in range(Rn)])

        # --- IV. Link Werner parameter update (17) ---
        # w_dot_l = -d_l * lam_l + sum_{r:l in r} f_l(r) + sum_{r:l in r} mu_r / w_l
        # For U_neg: dU/dw_l = 3W_r / ( w_l * (3W_r - 1) )
        for l in range(Ln):
            fl_sum = 0.0
            mu_sum = 0.0
            wl = max(w[l], eps)

            for r in sessions_using_link[l]:
                # Ensure log argument is positive: 3W_r - 1 > 0  (W_r > 1/3)
                denom = max(3.0 * W[r] - 1.0, 1e-12)
                fl = 3.0 * W[r] / (wl * denom)
                fl_sum += fl
                mu_sum += mu[r]

            w_dot = (-d[l] * lam[l]) + fl_sum + (mu_sum / wl)
            w_bar = max(w[l] + k_w * w_dot, 0.0)
            w[l] = min(w_bar, 1.0)

        # --- Convergence check ---
        delta = max(
            np.max(np.abs(w - w_prev)),
            np.max(np.abs(R - R_prev)),
            np.max(np.abs(lam - lam_prev)),
            np.max(np.abs(mu - mu_prev)),
        )
        if delta < tol:
            break

    return R, w, lam, mu


if __name__ == "__main__":
    # ---------------- Example you can replace ----------------
    # 3 links, 2 sessions:
    # r0 uses links [0,1], r1 uses links [1,2] (they share link 1)
    routes = [
        [0, 1],
        [1, 2],
    ]
    L = 3
    d = np.array([100.0, 60.0, 100.0])  # link capacities scale

    # K_r controls minimum end-to-end Werner parameter via sum log w >= K_r
    # Example: require prod w >= exp(K). If you want prod w >= 0.80, set K = log(0.80)
    K = np.array([np.log(0.80), np.log(0.80)])

    R, w, lam, mu = qprimaldual_neg(routes, d, K, iters=200000, tol=1e-10)

    print("Final link Werner parameters w_l:", w)
    print("Final session rates R_r:", R)
    print("Final link prices lambda_l:", lam)
    print("Final fidelity prices mu_r:", mu)

    # Quick feasibility checks for QNUM constraints:
    # (5) sum_{r:l in r} R_r <= d_l (1 - w_l)
    # (6) sum_{l in r} log w_l >= K_r
    print("\nFeasibility checks:")
    for l in range(L):
        sum_R = sum(R[r] for r in range(len(routes)) if l in routes[r])
        cap = d[l] * (1.0 - w[l])
        print(f"Link {l}: sum_R={sum_R:.6f}, cap={cap:.6f}, ok={sum_R <= cap + 1e-6}")

    for r, path in enumerate(routes):
        sum_logw = sum(np.log(max(w[l], 1e-12)) for l in path)
        print(f"Session {r}: sum_logw={sum_logw:.6f}, K={K[r]:.6f}, ok={sum_logw + 1e-6 >= K[r]}")
