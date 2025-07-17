import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";


// 🔒 PLACE ORDER (uses Cart)
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user?.id || "64ab2c13c567f342b1c9d123"; // 👈 fallback for testing

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: userId,
      products: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount,
    });

    // Clear cart after order placed
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });

  } catch (err) {
    console.error("❌ Order placement error:", err);
    res.status(500).json({ message: "Server error during placing order" });
  }
};

// ✅ CREATE ORDER (manual version from frontend payload)
export const createOrder = async (req, res) => {
  try {
    const { cartItems, totalAmount, shippingAddress } = req.body;
    const userId = req.user?._id; // or use req.userId fallback

    const order = await Order.create({
      user: userId,
      cartItems,
      totalAmount,
      shippingAddress,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error("Order creation failed:", err);
    res.status(500).json({ success: false, message: "Order failed" });
  }
};


// 📦 MY ORDERS (user's past orders)
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user?.id || "64ab2c13c567f342b1c9d123";

    const orders = await Order.find({ user: userId }).populate("products.product");

    res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Fetch orders failed:", err);
    res.status(500).json({ message: "Unable to fetch orders" });
  }
};
