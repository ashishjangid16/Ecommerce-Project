import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // optional loader

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/products");

        // Fallback in case `res.data.products` is undefined
        const fetchedProducts = res.data?.products || [];

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

      {loading && <div className="text-center">Loading products...</div>}

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">
                  {product.description?.slice(0, 60)}...
                </p>
                <p className="fw-bold text-success">₹{product.price}</p>
                <button className="btn btn-primary w-100">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
