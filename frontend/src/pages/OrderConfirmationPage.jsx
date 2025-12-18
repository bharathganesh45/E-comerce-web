import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

function OrderConfirmationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        });
        setOrder(res.data);
      } catch {
        // fall back to navigation if cannot load
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, accessToken]);

  const totalPrice =
    order?.totalPrice || location.state?.totalPrice || 0;

  if (loading) {
    return (
      <div className="ttb-container py-5 text-center text-muted">
        Loading your order...
      </div>
    );
  }

  return (
    <div className="ttb-container py-4">
      <div className="card border-0 shadow-sm mx-auto" style={{ maxWidth: 520 }}>
        <div className="card-body text-center">
          <div className="display-6 text-success mb-2">✓</div>
          <h5 className="fw-semibold mb-1">Payment successful</h5>
          <p className="small text-muted mb-3">
            Your order has been placed successfully.
          </p>
          <div className="border rounded-3 p-3 text-start small mb-3">
            <div className="d-flex justify-content-between mb-1">
              <span>Order ID</span>
              <span className="fw-semibold">{id}</span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span>Amount paid</span>
              <span className="fw-semibold">₹{totalPrice}</span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span>Payment status</span>
              <span className="badge bg-success ttb-badge-pill">Paid (mock)</span>
            </div>
          </div>
          <button
            className="btn btn-primary btn-sm rounded-pill px-4 me-2"
            onClick={() => navigate("/")}
          >
            Continue shopping
          </button>
          <button
            className="btn btn-outline-secondary btn-sm rounded-pill px-4"
            onClick={() => navigate("/cart")}
          >
            View cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;


