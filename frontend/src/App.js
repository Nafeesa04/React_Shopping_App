import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import AddProducts from './components/AddProducts';
import ProductsPage from './pages/ProductsPage';
import AdminLogin from './components/AdminLogin';
import OrderInvoice from './components/OrderInvoice';
import ViewOrders from './components/ViewOrders';
import UpdateProduct from './components/UpateProduct';
import DeleteProduct from './components/DeleteProduct';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/order-invoice" element={<OrderInvoice />} />
            <Route path="/products/add" element={<AddProducts />} />
            <Route path="/orders/all" element={<ViewOrders/>}/>
            <Route path="/products/update/:id" element={<UpdateProduct/>}/>
            <Route path="/delete-product" element={<DeleteProduct/>}/>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
        <ToastContainer />
      <Footer />
    </Router>
  );
};

export default App;




