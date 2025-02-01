import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ItemGrid.module.css";
import { useCart } from '../contexts/CartContext';

const URL = import.meta.env.VITE_BACKEND_URL;

function ItemGrid() {
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(0);
    const { setCartItems, setTotalPrice } = useCart();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${URL}/api/products/getProducts`);

                setItems(response.data.products || []);
            } catch (error) {
                setItems([]);
            }
        };
        
        fetchProducts();
    }, [count]);

    const addToCart = async (productId) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                toast.error("Please login to add items to cart");
                return;
            }
    
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            
            const response = await axios.put(
                `${URL}/api/cart/updateCart`, 
                { productId, quantity: 1 },
                config
            );
    
            if (response.data) {
                const { data } = await axios.get(`${URL}/api/cart/getCart`, config);

                setCartItems(data.products || []);
                setTotalPrice(data.totalPrice || 0);
            }

            setCount(count + 1);
            alert("Product added to Cart");
        } catch (err) {
            console.error("Error adding to cart:", err);
            if (err.response?.status === 401) {
                alert("Please login to add items to cart");
            } else {
                alert("Error adding item to cart. Please try again.");
            }
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`${URL}/api/products/${productId}`);
            if(response.status === 200) {
                alert("Product deleted successfully");
                setCount(count + 1);
            }
        } catch (error) {
            console.error("Error deleting product", error);
            alert("Failed to delete product");
        }
    };


    return (
        <div className={styles.container}>
            <h1>Products List</h1>
            <div className={styles.itemGrid}>
                {items.length === 0 ? (
                    <p>No products available</p>
                ) : (
                    items.map((item) => (
                        <div key={item._id} className={styles.itemCard}>
                            <h2 className={styles.itemName}>{item.name}</h2>
                            <p className={styles.itemDescription}>{item.description}</p>
                            <p className={styles.itemPrice}>${item.price}</p>
                            <button 
                                className={styles.addToCartButton} 
                                onClick={() => addToCart(item._id)}
                            >
                                Add to Cart
                            </button><br/><br/>

                            <button 
                                className={styles.deleteButton}
                                onClick={() => deleteProduct(item._id)}
                            >
                                Delete Product
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ItemGrid;