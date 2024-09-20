import React from 'react';
import { Link,useNavigate  } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const navigate = useNavigate();;

  const handleLogout = () => {
    // Clear user authentication data
    localStorage.removeItem('token'); // or sessionStorage.removeItem('token');
    
    alert('You have logged out successfully.');
    // Redirect to the home page or login page
   navigate('/');
  };
  return (
    <>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/admin/login">Admin Login</Link>
      <button className="logout" onClick={handleLogout}>Logout</button>
      
    </nav>
    </>
  );
};

export default Navbar;
