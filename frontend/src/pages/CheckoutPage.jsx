import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function CheckoutPage() {
  const { totalItems, totalPrice } = useCart();
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await axios.post("/api/orders/checkout", form, {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });
      navigate(`/order/${res.data.orderId}`, {
        state: { totalPrice: res.data.totalPrice },
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to place order. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ttb-container py-4">
      <div className="row g-4">
        <div className="col-md-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="fw-semibold mb-3">Shipping address</h6>
              {error && (
                <div className="alert alert-danger py-2 small">{error}</div>
              )}
              <form onSubmit={handleSubmit} className="small">
                <div className="mb-2">
                  <label className="form-label">Full name</label>
                  <input
                    className="form-control form-control-sm"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Address line 1</label>
                  <input
                    className="form-control form-control-sm"
                    name="addressLine1"
                    value={form.addressLine1}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Address line 2</label>
                  <input
                    className="form-control form-control-sm"
                    name="addressLine2"
                    value={form.addressLine2}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label className="form-label">City</label>
                    <input
                      className="form-control form-control-sm"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">State</label>
                    <input
                      className="form-control form-control-sm"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Postal code</label>
                    <input
                      className="form-control form-control-sm"
                      name="postalCode"
                      value={form.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Country</label>
                    <input
                      className="form-control form-control-sm"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm rounded-pill mt-2 px-4"
                  disabled={submitting}
                >
                  {submitting ? "Placing order..." : "Pay & place order (mock)"}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="fw-semibold mb-3">Order summary</h6>
              <div className="d-flex justify-content-between small mb-2">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="d-flex justify-content-between small mb-2">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="d-flex justify-content-between small mb-2">
                <span>Delivery</span>
                <span className="text-success">Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-semibold">
                <span>Total payable</span>
                <span>₹{totalPrice}</span>
              </div>
              <p className="small text-muted mt-2 mb-0">
                This is a mock payment. No real transaction will happen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;


