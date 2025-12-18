import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signup(name, email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to sign up. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ttb-container py-5" style={{ maxWidth: 420 }}>
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="fw-semibold mb-3">Create an account</h5>
          {error && (
            <div className="alert alert-danger py-2 small">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="small">
            <div className="mb-2">
              <label className="form-label">Name</label>
              <input
                className="form-control form-control-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                minLength={6}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-sm rounded-pill px-4 mt-2"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>
          <p className="small text-muted mt-3 mb-0">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;


