import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  imageUrl: String,
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 1,
  },
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
