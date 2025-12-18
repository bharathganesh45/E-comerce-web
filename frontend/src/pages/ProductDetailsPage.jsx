import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch {
        setError("Unable to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/product/${id}` } });
      return;
    }
    await addItem(product._id, quantity);
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="ttb-container py-5 text-center text-muted">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="ttb-container py-5 text-center text-muted">
        {error || "Product not found"}
      </div>
    );
  }

  return (
    <div className="ttb-container py-4">
      <div className="row g-4">
        <div className="col-md-5">
          <div className="card border-0 shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="card-img-top"
              style={{ objectFit: "cover", maxHeight: 360 }}
            />
          </div>
        </div>
        <div className="col-md-7">
          <h4 className="fw-semibold mb-1">{product.name}</h4>
          <div className="small text-muted mb-2">
            {product.brand} • {product.category}
          </div>
          <div className="d-flex align-items-center mb-2">
            <span className="ttb-rating me-2">
              ★ {product.rating?.toFixed(1) || "0.0"}
            </span>
            <span className="small text-muted">
              ({product.numReviews} reviews)
            </span>
          </div>
          <div className="h4 mb-3">₹{product.price}</div>

          <p className="small text-muted mb-3">{product.description}</p>

          <div className="d-flex align-items-center mb-3">
            <span className="me-2 small text-muted">Quantity</span>
            <input
              type="number"
              min="1"
              max={product.countInStock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value) || 1)}
              className="form-control form-control-sm"
              style={{ width: 80 }}
            />
          </div>

          <button
            className="btn btn-primary rounded-pill px-4"
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
          >
            {product.countInStock === 0 ? "Out of stock" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;


