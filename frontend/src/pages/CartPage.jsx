import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function CartPage() {
  const { cart, totalItems, totalPrice, updateItem, removeItem } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/checkout" } });
    } else {
      navigate("/checkout");
    }
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="ttb-container py-5 text-center text-muted">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="ttb-container py-4">
      <div className="row g-4">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="fw-semibold mb-3">
                Cart ({totalItems} item{totalItems > 1 ? "s" : ""})
              </h6>
              {cart.items.map((item) => (
                <div
                  key={item.product._id}
                  className="d-flex align-items-center border-bottom py-3 gap-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    style={{ width: 80, height: 80, objectFit: "cover" }}
                    className="rounded"
                  />
                  <div className="flex-grow-1">
                    <div className="small fw-semibold">
                      {item.product.name}
                    </div>
                    <div className="small text-muted mb-1">
                      {item.product.brand}
                    </div>
                    <div className="small fw-semibold">₹{item.price}</div>
                  </div>
                  <div className="d-flex flex-column align-items-end gap-2">
                    <div className="input-group input-group-sm" style={{ width: 110 }}>
                      <span className="input-group-text">Qty</span>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(
                            item.product._id,
                            Number(e.target.value) || 1
                          )
                        }
                        className="form-control"
                      />
                    </div>
                    <button
                      className="btn btn-link btn-sm text-danger p-0"
                      onClick={() => removeItem(item.product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="fw-semibold mb-3">Price details</h6>
              <div className="d-flex justify-content-between small mb-2">
                <span>Items ({totalItems})</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="d-flex justify-content-between small mb-2">
                <span>Delivery</span>
                <span className="text-success">Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-semibold mb-3">
                <span>Total amount</span>
                <span>₹{totalPrice}</span>
              </div>
              <button
                className="btn btn-primary w-100 rounded-pill"
                onClick={handleCheckout}
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;


