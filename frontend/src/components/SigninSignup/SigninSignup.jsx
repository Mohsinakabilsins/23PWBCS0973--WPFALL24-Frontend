import React, { useState } from "react";
import FormStyle from "./SiginSignup.module.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URL = import.meta.env.VITE_BACKEND_URL;

if (!URL) {
  console.log('Environment variables:', import.meta.env);
  throw new Error("VITE_BACKEND_URL is not defined in the environment file");
}

function SigninSignup({ children, className }) {
    const [pageState, setPageState] = useState("signup");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Password does not match");
            return;
        }

        // Signup request
        await axios.post(`${URL}/api/users/`, { username, password })
            .then(response => {
                console.log("Signup successful", response.data);

                setUsername("");
                setPassword("");
                setConfirmPassword("");
            })
            .catch(error => {
                console.error("Error during signup", error);
            });

        handleLogin(event); // Automatically log in after signup
    };

    const handleLogin = (event) => {
      event.preventDefault();

      const loginData = {
          username,
          password
      };

      console.log("Login data", loginData);

      // Login request
      axios.post(`${URL}/api/users/signin`, loginData)
          .then(response => {
              console.log("Login successful", response.data);

              if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
              }

              setUsername("");
              setPassword("");

              navigate('/Home');
          })
          .catch(error => {
              console.error("Error during login", error);
              alert('Login failed. Please check your credentials.');
          });
    };

    return (
        <div className={`main-container ${className}`}>
            <div className={`form-container ${className}`}>
                <form
                    className={`${FormStyle.form} ${className}`}
                    onSubmit={pageState === "login" ? handleLogin : handleSubmit}
                >
                    <div className={`input-group ${className}`}>
                        <input
                            id="username"
                            name="username"
                            className={`${FormStyle.inputfield} ${className}`}
                            type="text"
                            placeholder="Username"
                            maxLength={20}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label htmlFor="username">Username</label>
                    </div>

                    <div className={`input-group ${className}`}>
                        <input
                            id="password"
                            name="password"
                            className={`${FormStyle.inputfield} ${className}`}
                            type="password"
                            placeholder="Password"
                            maxLength={20}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password</label>
                    </div>

                    {pageState === "signup" && (
                        <div className={`input-group ${className}`}>
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                className={`${FormStyle.inputfield} ${className}`}
                                type="password"
                                placeholder="Confirm Password"
                                maxLength={20}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="confirm_password">Confirm Password</label>
                        </div>
                    )}

                    <button type="submit" className={`${FormStyle.submitButton} ${className}`}>
                        Submit
                    </button>
                </form>

                <button
                    type="button"
                    onClick={() => setPageState(pageState === "login" ? "signup" : "login")}
                    className={`${FormStyle.buttonStyle} ${className}`}
                >
                    {pageState === "login" ? "Signup" : "Login"}
                </button>
            </div>
        </div>
    );
}

export default SigninSignup;
