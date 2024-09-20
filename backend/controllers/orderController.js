const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const produceMessage = require('../kafka/producer');
// Place an order (for authenticated users only)
exports.placeOrder = async (req, res) => {
  try {
    
    const { productId, quantity } = req.body;
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Check if the product exists using its ObjectId
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product has sufficient quantity
    if (product.quantity < quantity) {
      return res.status(400).json({ message: 'Product not available in the requested quantity' });
    }

    // Calculate total price
    const totalPrice = product.price * quantity;

    // Create a new order
    const newOrder = new Order({
      productId: product._id, // Use the product's ObjectId
      productName: product.productName, // Add the productName to the order
      quantity,
      totalPrice,
      userId: req.user._id // Get the user's ID from the token
    });

    // Save the order
    await newOrder.save();
    
    // Update product stock
    product.quantity -= quantity;
    
    await product.save();
    await produceMessage('order-topic', JSON.stringify(newOrder));

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get orders for the authenticated user (users can only view their own orders)
exports.getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }); // Find orders by userId
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all orders (only admin can view all orders)
exports.getAllOrders = async (req, res) => {
  try {
    // Check if the user has an admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access only' });
    }

    const orders = await Order.find({}); // Fetch all orders
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
