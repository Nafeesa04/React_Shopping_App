import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
 // const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage after login

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleBuyNow = async (productId) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
  
    if (!token) {
      alert('You must log in to place an order.');
      navigate('/login');
      return;
    }
  
    const quantity = prompt('Enter the quantity:');
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      alert('Invalid quantity');
      return;
    }
  
    try {
      const response = await axios.post(
        '/orders/place',
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert('Order placed successfully');
      navigate('/order-invoice', { state: { order: response.data.order } });
    } catch (err) {
      console.error('Error placing order:', err);
      alert('You must Login to place order');
      navigate('/login');
    }
  };
  
  

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-container">
      <h2>Products</h2>
      <input
        className="search"
        type="text"
        placeholder="Search Products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredProducts.length === 0 ? (
          <p>No products found</p>  // Show message when no products match the search
        ) : (
          filteredProducts.map((product) => (
            <li key={product._id}>
              <td>{product.productName}</td> 
              <td>Description: {product.description}</td>
              <td>Features: {product.features}</td>
              <td>Price: ${product.price}</td>
              <td>{product.status}</td>
              <button className="buy-now"
                onClick={() => handleBuyNow(product._id, product.quantity)}
                disabled={product.quantity === 0} // Disable button if out of stock
              >
                {product.quantity > 0 ? 'Buy Now' : 'Out of Stock'}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ProductsPage;
