import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderInvoice = () => {
  const { state } = useLocation();
  const { order } = state || {};

  if (!order) {
    return <p>No order details available</p>;
  }

  return (
    <div className="invoice-container">
      <h2>Order Invoice</h2>
      <p>Product Name: {order.productName}</p>
      <p>Quantity: {order.quantity}</p>
      <p>Total Price: ${order.totalPrice}</p>
      <p>Order ID: {order._id}</p>
    </div>
  );
};

export default OrderInvoice;