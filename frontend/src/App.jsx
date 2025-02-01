import React from 'react';
import {BrowserRouter ,Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './components/contexts/CartContext';
import SigninSignup from './pages/SigninSignupPage/SigninSignupPage';
import Home from './pages/HomePage/Home';
import Cart from './pages/CartPage/CartPage';
import AddProduct from './pages/addProduct/AddProductPage';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
          <Routes>
            <Route path="/SigninSignup" element={<SigninSignup />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/" element={<Navigate to="/SigninSignup" />} />
          </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;