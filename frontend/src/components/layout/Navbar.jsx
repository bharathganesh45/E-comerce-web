import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white ttb-navbar sticky-top">
      <div className="container-fluid ttb-container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          Time<span className="text-dark">To</span>Buy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#ttbNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="ttbNavbar">
          <ul className="navbar-nav me-auto align-items-center gap-2">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Products
              </Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/checkout">
                  Checkout
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
          <form className="d-flex mx-auto my-2 my-lg-0 ttb-search-input">
            <input
              className="form-control form-control-sm me-2 rounded-pill"
              type="search"
              placeholder="Search for watches, clocks and more"
              aria-label="Search"
              disabled
            />
          </form>
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/cart">
                <span className="position-relative me-1">
                  <i className="bi bi-cart3 fs-5"></i>
                  {totalItems > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalItems}
                    </span>
                  )}
                </span>
                <span className="d-none d-md-inline">Cart</span>
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-outline-secondary btn-sm dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    {user?.name}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  to="/login"
                  className="btn btn-primary btn-sm rounded-pill px-3"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


