import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/products");

        // Use res.data directly if it's already an array
        const fetchedProducts = Array.isArray(res.data)
          ? res.data
          : [];

        setProducts(fetchedProducts);
        setError("");
      } catch (err) {
        console.error("Product fetch failed:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">All Products</h2>

      {/* View Cart Button */}
      <div className="text-end mb-4">
        <Link to="/cart" className="btn btn-outline-secondary">
          View Cart 🛒
        </Link>
      </div>

      {/* Loading and Error */}
      {loading && <div className="text-center">Loading products...</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* Product Grid */}
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={
                  product.image ||
                  "https://res.cloudinary.com/dipl3qujh/image/upload/v1752663541/Ecommerce/sye8hf3szdgx8rezpy29.png"
                }
                className="card-img-top"
                alt={product.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">
                  {product.description?.slice(0, 60)}...
                </p>
                <p className="fw-bold text-success">₹{product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="btn btn-primary w-100"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
