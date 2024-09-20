import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const handleAdmin = () =>{
    navigate('/admin');
  }
  useEffect(() => {
    // Fetch orders when component mounts
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/orders/all', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}` // Adjust token retrieval if necessary
          }
        });
        setOrders(response.data); // Set the orders data in the state
      } catch (error) {
        alert(error.response?.data?.message || 'Error fetching orders'); // Display error using alert
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-container">
      <h1>All Orders</h1>
      <button className="admin-order-button" onClick={handleAdmin}>Admin Dashboard</button>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.productId}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.userId}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewOrders;
