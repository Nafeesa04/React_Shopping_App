import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const DeleteProduct = () => {
  const [productId, setProductId] = useState('');
  const navigate = useNavigate();

  // Function to handle product deletion
  const handleDeleteProduct = async () => {
    if (!productId) {
      alert('Please enter a product ID');
      return;
    }

    try {
      // Sending DELETE request to the backend
      await axios.delete(`/products/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      // Success alert
      alert('Product deleted successfully!');
      setProductId(''); // Clear the input field
      navigate('/admin');
    } catch (error) {
      // Handle errors, if any
      alert(error.response?.data?.message || 'Error deleting product');
    }
  };

  return (
    <div className="delete-product-container">
      <h2>Delete Product</h2>

      {/* Input field to enter Product ID */}
      <div>
        <label>Enter Product ID:</label>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Enter Product ID"
        />
        <button onClick={handleDeleteProduct}>Delete Product</button>
      </div>
    </div>
  );
};

export default DeleteProduct;
