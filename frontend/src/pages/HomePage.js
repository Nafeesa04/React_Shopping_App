import React from 'react';
import { useNavigate } from 'react-router-dom';

  
const HomePage = () => {
  const navigate = useNavigate();
  const handleShopNow = () => {
    navigate('/products');
};
  
  return (
    <>
      
      <main>
        <p>Welcome to our store! Discover amazing products.</p>
        <button onClick={handleShopNow}>Shop Now</button>
      </main>
     
    </>
  );
};

export default HomePage;