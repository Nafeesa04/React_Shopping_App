const jwt = require('jsonwebtoken');

// Auth Middleware to verify JWT Token
const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extract the token from the 'Bearer <token>' format
  const token = authHeader.split(' ')[1]; 
  
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET,{ expiresIn: '30m' });
    req.user = {
      _id: decoded.id,  // Ensure _id is set correctly here
      role: decoded.role
    };
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

// Admin Middleware to check if user is admin
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };


