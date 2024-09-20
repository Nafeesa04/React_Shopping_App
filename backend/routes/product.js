const express = require('express');
const { addProduct, updateProduct, deleteProduct, getAllProducts,getProductById } = require('../controllers/productController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllProducts); // Public route
router.post('/add', authMiddleware, adminMiddleware, addProduct);
router.get('/:id',authMiddleware, adminMiddleware, getProductById);
router.put('/update/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
