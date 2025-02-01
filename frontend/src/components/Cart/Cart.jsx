import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Cart.module.css";
import { useCart } from '../contexts/CartContext';

const URL = import.meta.env.VITE_BACKEND_URL;

function Cart({ className }) {
    const { cartItems, setCartItems, totalPrice, setTotalPrice } = useCart();
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetchCart();
        const timer = setInterval(() => {
            setCount((prevCount) => prevCount + 1);
        }, 2000);

        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
    }, [count]); // Empty dependency array ensures the interval is set only once

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            
            const response = await axios.get(`${URL}/api/cart/getCart`, config);
            setCartItems(response.data.products);
            setTotalPrice(response.data.totalPrice);
        } catch (error) {
            console.error("Error fetching cart", error);
            if (error.response?.status === 401) {
                alert("Please login to view your cart");
            }
        }
    };

    const updateQuantity = async (productId, quantity) => {
      if (quantity < 1) return;
      
      const updatedItems = cartItems.map(item => 
          item.productId === productId 
              ? { ...item, quantity } 
              : item
      );
      setCartItems(updatedItems);
      
      try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('No token found');
          
          await axios.put(
              `${URL}/api/cart/updateCart`,
              { productId, quantity },
              { headers: { Authorization: `Bearer ${token}` }}
          );

          console.log("product quantity updated");

      } catch (error) {
          // Revert on failure
          fetchCart();
          alert('Failed to update quantity');
      }
  };

    const removeItem = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            await axios.put(`${URL}/api/cart/deleteItem`, {productId},config);
            fetchCart();
        } catch (error) {
            console.error("Error removing item", error);
        }
    };

    return (
        <div className={`${styles.cart} ${className}`}>
            <h1>Cart</h1>
            <div>
                {(!cartItems || cartItems.length === 0) ? (
                    <p> cart is empty</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.productId}>
                                    <td>{item.name}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                                        />
                                    </td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => removeItem(item.productId)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <h2>Total Price: ${totalPrice}</h2>
        </div>
    );
}

export default Cart;