const express = require('express');
const { requestPasswordReset, resetPassword, registerUser, loginUser, loginAdmin } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin/login', loginAdmin); // Admin login route
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);


module.exports = router;


