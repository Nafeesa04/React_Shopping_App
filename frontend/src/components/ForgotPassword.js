import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email.');
      return;
    }

    try {
      const response = await axios.post('/auth/request-password-reset', { email });
      // Simulate token receipt, this is where you'd normally trigger email
      if (response.data.token) {
        alert(`Password reset token: ${response.data.token}`);  // Token received successfully
        navigate(`/reset-password/${response.data.token}`);  // Redirect to reset password page
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error requesting password reset');
    }
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" >
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button onClick={handleForgotPassword}>Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
