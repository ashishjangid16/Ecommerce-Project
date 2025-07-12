import { Product } from "../models/product.model.js";

// Create product (admin only)
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock } = req.body;
    const imageUrl = req.file?.path;

    const product = await Product.create({
      title, description, price, category, stock, imageUrl
    });

    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(500).json({ message: "Product creation failed", error: err.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
};

// Get single product
export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.status(200).json(product);
};

// Update product
export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, {
    ...req.body,
    ...(req.file && { imageUrl: req.file.path }),
  }, { new: true });

  res.status(200).json({ message: "Product updated", product });
};

// Delete product
export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Product deleted" });
};
