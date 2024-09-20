const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  loginId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  role: { type: String, default: 'user' } // 'admin' or 'user'
});

module.exports = mongoose.model('User', userSchema);


