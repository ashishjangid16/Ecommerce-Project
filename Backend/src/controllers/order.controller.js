import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";

export const placeOrder = async (req, res) => {
  const userId = req.user.id;
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

  // Clear cart after order
  cart.items = [];
  await cart.save();

  res.status(201).json({ message: "Order placed", order });
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate("products.product");
  res.status(200).json(orders);
};
