import Product from "../models/Product.js";

const createProduct = async (req, res) => {
  if (!req.body) {
    console.log('No form data received');
    return res.status(400).json({ error: "No form data received" });
  }
  const { name, price, stock, description } = req.body;
  const imageUrl = req.file?.path;

  if (!name || !price || !stock || !imageUrl) {
    console.log('Missing fields:', { name, price, stock, imageUrl });
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const newProduct = new Product({
      name,
      price,
      stock,
      imageUrl,
      description
    });
    await newProduct.save();
    console.log('Product created:', newProduct);
    res.status(201).json({
      success: true,
      newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, error: "Internal server error", details: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, image } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, quantity, image },
      { new: true }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    res.status(200).json({ success: true, updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export { createProduct, getProductById, updateProduct, deleteProduct, getAllProducts };
