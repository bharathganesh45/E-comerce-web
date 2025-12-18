import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [featuredRes, allRes] = await Promise.all([
          axios.get("/api/products/featured"),
          axios.get("/api/products"),
        ]);
        setFeatured(featuredRes.data);
        setAllProducts(allRes.data);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="ttb-container py-5 text-center text-muted">
        Loading products...
      </div>
    );
  }

  return (
    <div className="ttb-container py-4">
      <section className="mb-4">
        <div className="row g-3">
          <div className="col-md-3 d-none d-md-block">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h6 className="fw-semibold mb-3">Shop by category</h6>
                <ul className="list-unstyled small mb-0">
                  <li className="mb-1">Watches</li>
                  <li className="mb-1">Smartwatches</li>
                  <li className="mb-1">Clocks</li>
                  <li className="mb-1">Shoes</li>
                  <li className="mb-1">Electronics</li>
                  <li className="mb-1">Clothes</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card border-0 bg-primary text-white">
              <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between">
                <div>
                  <h5 className="fw-semibold mb-1">Time for an upgrade</h5>
                  <p className="mb-0 small text-white-50">
                    Explore curated watches and clocks handpicked for you.
                  </p>
                </div>
                <div className="mt-3 mt-md-0">
                  <span className="badge bg-light text-primary ttb-badge-pill px-3 py-2">
                    Free shipping on orders above ₹999
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0 fw-semibold">Featured picks</h6>
        </div>
        <div className="row g-3">
          {featured.map((p) => (
            <div className="col-6 col-md-3" key={p._id}>
              <Link
                to={`/product/${p._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card border-0 shadow-sm ttb-product-card h-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="card-img-top ttb-product-img"
                  />
                  <div className="card-body">
                    <h6 className="card-title small mb-1 text-truncate">
                      {p.name}
                    </h6>
                    <div className="fw-semibold mb-1">₹{p.price}</div>
                    <div className="ttb-rating">
                      ★ {p.rating?.toFixed(1) || "0.0"}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0 fw-semibold">All products</h6>
        </div>
        <div className="row g-3">
          {allProducts.map((p) => (
            <div className="col-6 col-md-3" key={p._id}>
              <Link
                to={`/product/${p._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card border-0 shadow-sm ttb-product-card h-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="card-img-top ttb-product-img"
                  />
                  <div className="card-body">
                    <h6 className="card-title small mb-1 text-truncate">
                      {p.name}
                    </h6>
                    <div className="fw-semibold mb-1">₹{p.price}</div>
                    <div className="ttb-rating">
                      ★ {p.rating?.toFixed(1) || "0.0"}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;


