import React, { useState } from 'react';
import axios from '../utils/axios'; 
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('available');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken'); // Retrieve token
    if (!token) {
      alert('You are not authenticated. Please log in again.');
      return;
    
    }
    

    try {
      await axios.post('/products/add', {
        productName,
        description,
        features,
        price: Number(price),
        quantity: Number(quantity),
        status,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMessage('Product added successfully'); // Set success message
      setErrorMessage(''); // Clear any previous error message
      setTimeout(() => {
        navigate('/admin');
      }, 2000);// Navigate to the admin dashboard 
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('Failed to add product');
      setSuccessMessage(''); 
    }
  };

  return (
    <div className="add-product-container">
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form className="add-product-form" onSubmit={handleSubmit}>
        <h2>Add Product</h2>
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        
        <label htmlFor="description">Description:</label>
        <textarea 
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="features">Features:</label>
        <textarea
          id="features"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          required
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="available">Available</option>
          <option value="hurryUp">Hurry Up to Purchase</option>
          <option value="unavailable">Out of Stock</option>
        </select>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProducts;
