import React,{useState} from "react";
import FormStyle from "./createProduct.module.css";
import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL;

function createProduct({children, className}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = { name, price, description }; // Prepare JSON payload
  
    try {
        console.log("data", payload);

        const response = await axios.post(`${URL}/api/products/`, payload, {
            headers: {
                'Content-Type': 'application/json', // Set JSON Content-Type
            },
        });

        alert("Product added successfully");

        // Reset form
        setName("");
        setPrice("");
        setDescription("");
    } catch (error) {
        console.error("Error adding product:", error.response?.data || error.message);
        alert("Error adding product");
    }
};


  return(
    <div className={`main-container ${className}`}>
      <div className={`form-container ${className}`}>
      <form className={`${FormStyle.form} ${className}`} onSubmit={handleSubmit}>
        <div className={`input-group ${className}`}>
          <input
            id="name"
            name="name"
            className={`${FormStyle.inputfield} ${className}`}
            type="text"
            placeholder="Productname"
            maxLength={50}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="name">name</label>
        </div>
        <div className={`input-group ${className}`}>
          <input
            id="price"
            name="price"
            className={`${FormStyle.inputfield} ${className}`}
            type="number"
            placeholder="price"
            maxLength={20}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label htmlFor="description">price</label>
        </div>
        <div className={`input-group ${className}`}>
          <textarea
            id="description"
            name="description"
            className={`${FormStyle.inputfield} ${className}`}
            type="text"
            placeholder="description"
            maxLength={200}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label htmlFor="password">description</label>
        </div>

        <button type="submit" className={`${FormStyle.submitButton} ${className}`}>
          Submit
        </button>
      </form>
      
      </div>
    </div>
  );
}

export default createProduct;