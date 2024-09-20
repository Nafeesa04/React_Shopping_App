import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const [productId, setProductId] = useState('');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [updatedProduct, setUpdatedProduct] = useState({
    productName: '',
    price: '',
    description: '',
    quantity: '',
    status: ''
  });

  // Step 1: Fetch the product by ID
  const handleFetchProduct = async () => {
    if (!productId) {
      alert('Please enter a product ID');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      setProductData(response.data); // Set the fetched product data
      setUpdatedProduct({
        productName: response.data.productName,
        price: response.data.price,
        description: response.data.description,
        quantity: response.data.quantity,
        status: response.data.status
      });
      setLoading(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Error fetching product');
      setLoading(false);
    }
  };

  // Step 2: Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  // Step 3: Update the product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/products/update/${productId}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      alert('Product updated successfully!');
      navigate('/admin');
    } catch (error) {
      alert(error.response?.data?.message || 'Error updating product');
    }
  };

  return (
    <div className="update-product-container">
      <h2>Update Product</h2>

      {/* Step 4: Prompt for Product ID */}
      <div>
        <label>Enter Product ID:</label>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Enter Product ID"
        />
        <button onClick={handleFetchProduct}>Fetch Product</button>
      </div>

      {/* Step 5: Display form when product is fetched */}
      {loading ? (
        <p>Loading...</p>
      ) : productData ? (
        <form onSubmit={handleUpdateProduct}>
          <div>
            <label>Product Name:</label>
            <input
              type="text"
              name="productName"
              value={updatedProduct.productName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={updatedProduct.description}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={updatedProduct.price}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={updatedProduct.quantity}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Status:</label>
            <select
              name="status"
              value={updatedProduct.status}
              onChange={handleInputChange}
            >
              <option value="">Select Status</option>
              <option value="Available">AVAILABLE</option>
              <option value="Out of Stock">OUT OF STOCK</option>
              <option value="hurryUp">HURRY UP TO PURCHASE</option>
            </select>
          </div>

          

          <button type="submit">Update Product</button>
        </form>
      ) : (
        <p>No product fetched yet. Enter a valid Product ID.</p>
      )}
    </div>
  );
};

export default UpdateProduct;
