const Product = require('../models/productModel');

exports.addProduct = async (req, res) => {
  const { productName, description, features, price, quantity, status } = req.body;
  
  const newProduct = new Product({ productName, description, features, price, quantity, status });
  await newProduct.save();

  res.status(201).json({ message: 'Product added successfully' });
};

// Fetch product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.productName = req.body.productName || product.productName;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    product.quantity = req.body.quantity || product.quantity;
    product.status = req.body.status || product.status;

    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);

  res.json({ message: 'Product deleted successfully' });
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};
