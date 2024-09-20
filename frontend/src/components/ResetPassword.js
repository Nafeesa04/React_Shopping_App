import React, { useState } from 'react';
import axios from '../utils/axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();  // Get token from the URL
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await axios.post(`/auth/reset-password/${token}`, { newPassword });
      alert('Password has been reset successfully');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div className="reset-password-container">
      <form className="reset-password-form">
      <h2>Reset Password</h2>
      <div className="reset">
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      
      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      </div>
      <button onClick={handleResetPassword}>Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
