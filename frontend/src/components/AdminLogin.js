import React, { useState } from 'react';
import axios from '../utils/axios'; // assuming axios is configured
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('auth/admin/login', { adminId, password });

      // Assuming the backend returns a token if credentials are valid
      localStorage.setItem('adminToken', data.token);
      console.log("token:",data.token)
      alert('Login successful');
      navigate('/admin');
    } catch (err) {
      console.error(err);
      setErrorMessage('Invalid admin credentials');
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>
      <h2>Admin Login</h2>
       
          <label htmlFor="adminId">Admin ID:</label>
          <input
            type="text"
            id="adminId"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required
          />
        
      
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
         {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
