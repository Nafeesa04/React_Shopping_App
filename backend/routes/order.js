const express = require('express');
const { placeOrder, getOrdersByUser, getAllOrders } = require('../controllers/orderController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/place', authMiddleware, placeOrder);
router.get('/myorders', authMiddleware, getOrdersByUser);
router.get('/all', authMiddleware, getAllOrders); // Admin can view all orders

module.exports = router;

