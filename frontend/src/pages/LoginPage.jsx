import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to login. Please check credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ttb-container py-5" style={{ maxWidth: 420 }}>
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="fw-semibold mb-3">Login</h5>
          {error && (
            <div className="alert alert-danger py-2 small">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="small">
            <div className="mb-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control form-control-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control form-control-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-sm rounded-pill px-4 mt-2"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="small text-muted mt-3 mb-0">
            New to Time To Buy?{" "}
            <Link to="/signup" className="text-decoration-none">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;


