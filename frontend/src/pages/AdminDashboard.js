import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin token exists in localStorage
    const adminToken = localStorage.getItem('adminToken');

    if (!adminToken) {
      alert('Unauthorized. Please login as admin.');
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={() => navigate('/products/add')}>Add Products</button>
      <button onClick={() => navigate('/orders/all')}>View Orders</button>
      <button onClick={() => navigate('/products/update/:id')}>Update Product</button>
      <button onClick={() => navigate('/delete-product')}>Delete Product</button>
    </div>
  );
};

export default AdminDashboard;

