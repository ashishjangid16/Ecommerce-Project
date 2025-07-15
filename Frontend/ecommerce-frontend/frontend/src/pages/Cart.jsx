import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cart.map((item) => (
          <div key={item._id} className="card mb-3 p-3">
            <div className="row g-0 align-items-center">
              <div className="col-md-2">
                <img
                  src={item.image}
                  className="img-fluid rounded-start"
                  alt={item.title}
                />
              </div>
              <div className="col-md-10 ps-3">
                <h5>{item.title}</h5>
                <p className="text-muted mb-1">{item.description}</p>
                <p className="fw-bold">₹{item.price}</p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="btn btn-danger btn-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
